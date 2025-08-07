import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { COLLECTIONS } from '@/lib/models'

export const dynamic = 'force-dynamic' // Don't cache this API route

export async function GET(request: NextRequest) {
  try {
    // Connect to MongoDB
    const client = await clientPromise
    const db = client.db('crevre')
    const imagesCollection = db.collection(COLLECTIONS.IMAGES)
    
    // Get query parameters
    const searchParams = request.nextUrl.searchParams
    const limit = parseInt(searchParams.get('limit') || '50')
    const skip = parseInt(searchParams.get('skip') || '0')
    
    // Query images, newest first
    const images = await imagesCollection
      .find({})
      .sort({ uploadedAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray()
    
    // Count total images
    const total = await imagesCollection.countDocuments({})
    
    return NextResponse.json({
      images: images.map(img => ({
        ...img,
        _id: img._id.toString() // Convert ObjectId to string
      })),
      total,
      limit,
      skip
    })
  } catch (error) {
    console.error('Error fetching images:', error)
    return NextResponse.json(
      { error: 'Failed to fetch images' },
      { status: 500 }
    )
  }
}
