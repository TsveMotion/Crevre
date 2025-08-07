import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

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
      await mkdir(uploadDir, { recursive: true })
    } catch (error) {
      // Directory might already exist, that's fine
    }

    const uploadPromises = files.map(async (file) => {
      const buffer = Buffer.from(await file.arrayBuffer())
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '')}`
      const filePath = path.join(uploadDir, fileName)
      
      await writeFile(filePath, buffer)
      
      // Return the public URL for the uploaded file
      return `/uploads/${fileName}`
    })

    const urls = await Promise.all(uploadPromises)

    return NextResponse.json({
      success: true,
      urls
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Failed to upload images' },
      { status: 500 }
    )
  }
}
