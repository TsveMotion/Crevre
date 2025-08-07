import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir, access, constants } from 'fs/promises'
import path from 'path'
import { existsSync } from 'fs'
import clientPromise from '@/lib/mongodb'
import { COLLECTIONS, ImageDoc } from '@/lib/models'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const files = formData.getAll('images') as File[]

    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'No images provided' }, { status: 400 })
    }

    // Connect to MongoDB
    const client = await clientPromise
    const db = client.db('crevre')
    const imagesCollection = db.collection(COLLECTIONS.IMAGES)

    // Ensure uploads directory exists
    const uploadDir = path.join(process.cwd(), 'public', 'uploads')
    try {
      if (!existsSync(uploadDir)) {
        await mkdir(uploadDir, { recursive: true })
        console.log(`Created uploads directory at ${uploadDir}`)
      }
      
      // Check if directory is writable
      await access(uploadDir, constants.W_OK)
    } catch (error) {
      console.error(`Directory error: ${error}`)
      return NextResponse.json(
        { error: `Upload directory issue: ${error}` },
        { status: 500 }
      )
    }

    // Get auth info for tracking uploads
    const authCookie = request.cookies.get('admin-auth')?.value
    let uploadedBy = 'anonymous'
    if (authCookie) {
      try {
        const decoded = Buffer.from(authCookie, 'base64').toString()
        const [username] = decoded.split(':')
        uploadedBy = username || 'admin'
      } catch (e) {
        // Keep default anonymous if auth parsing fails
      }
    }

    const uploadPromises = files.map(async (file, index) => {
      try {
        // Validate file type (allow any image type)
        if (!file.type.startsWith('image/')) {
          throw new Error(`File ${index + 1} is not an image type (${file.type})`)
        }

        // Create a safe filename with timestamp to avoid collisions
        const timestamp = Date.now()
        const randomString = Math.random().toString(36).substring(2, 10)
        const fileExtension = file.name.split('.').pop() || 'jpg'
        const safeBaseName = file.name.replace(/[^a-zA-Z0-9.-]/g, '').replace(/\..+$/, '')
        const fileName = `${timestamp}-${randomString}-${safeBaseName}.${fileExtension}`
        const filePath = path.join(uploadDir, fileName)
        
        // Convert file to buffer and write to disk
        const buffer = Buffer.from(await file.arrayBuffer())
        await writeFile(filePath, buffer)
        
        // Verify file was written successfully
        await access(filePath, constants.F_OK)
        
        // Create image metadata document for MongoDB
        const imageDoc: ImageDoc = {
          filename: fileName,
          originalName: file.name,
          url: `/uploads/${fileName}`,
          mimeType: file.type,
          size: file.size,
          uploadedAt: new Date(),
          uploadedBy: uploadedBy,
          tags: [],
          alt: `Uploaded image: ${file.name}`
        }

        // Save metadata to MongoDB
        const result = await imagesCollection.insertOne(imageDoc)
        console.log(`Successfully uploaded and saved to DB: ${imageDoc.url} with ID: ${result.insertedId}`)
        
        return {
          id: result.insertedId.toString(),
          url: imageDoc.url,
          filename: imageDoc.filename,
          originalName: imageDoc.originalName,
          size: imageDoc.size,
          mimeType: imageDoc.mimeType
        }
      } catch (fileError) {
        console.error(`Error uploading file ${index}: ${fileError}`)
        throw new Error(`Failed to upload file ${index + 1}: ${fileError}`)
      }
    })

    try {
      const uploadedImages = await Promise.all(uploadPromises)
      
      return NextResponse.json({
        success: true,
        images: uploadedImages,
        message: `Successfully uploaded ${uploadedImages.length} image(s)`
      })
    } catch (promiseError) {
      console.error(`Promise error: ${promiseError}`)
      return NextResponse.json(
        { error: `Upload process failed: ${promiseError.message}` },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error(`General upload error: ${error}`)
    return NextResponse.json(
      { error: `Failed to upload images: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    )
  }
}
