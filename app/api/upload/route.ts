import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir, access, constants } from 'fs/promises'
import path from 'path'
import { existsSync } from 'fs'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const files = formData.getAll('images') as File[]

    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'No images provided' }, { status: 400 })
    }

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

    const uploadPromises = files.map(async (file, index) => {
      try {
        // Create a safe filename with timestamp to avoid collisions
        const timestamp = Date.now()
        const randomString = Math.random().toString(36).substring(2, 10)
        const safeFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '')
        const fileName = `${timestamp}-${randomString}-${safeFileName}`
        const filePath = path.join(uploadDir, fileName)
        
        // Convert file to buffer and write to disk
        const buffer = Buffer.from(await file.arrayBuffer())
        await writeFile(filePath, buffer)
        
        // Verify file was written successfully
        await access(filePath, constants.F_OK)
        
        // Return the absolute URL for the uploaded file
        const fileUrl = `/uploads/${fileName}`
        console.log(`Successfully uploaded: ${fileUrl}`)
        return fileUrl
      } catch (fileError) {
        console.error(`Error uploading file ${index}: ${fileError}`)
        throw new Error(`Failed to upload file ${index}: ${fileError}`)
      }
    })

    try {
      const urls = await Promise.all(uploadPromises)
      
      return NextResponse.json({
        success: true,
        urls
      })
    } catch (promiseError) {
      console.error(`Promise error: ${promiseError}`)
      return NextResponse.json(
        { error: `Upload process failed: ${promiseError}` },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error(`General upload error: ${error}`)
    return NextResponse.json(
      { error: `Failed to upload images: ${error}` },
      { status: 500 }
    )
  }
}
