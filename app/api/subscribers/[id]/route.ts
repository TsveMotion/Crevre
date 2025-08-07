import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { COLLECTIONS } from '@/lib/models'
import { ObjectId } from 'mongodb'

// DELETE - Remove a subscriber by ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id
    
    // Validate ObjectId
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid subscriber ID' },
        { status: 400 }
      )
    }

    const client = await clientPromise
    const db = client.db('crevre')
    const subscribers = db.collection(COLLECTIONS.SUBSCRIBERS)

    const result = await subscribers.deleteOne({ _id: new ObjectId(id) })

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: 'Subscriber not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete subscriber error:', error)
    return NextResponse.json(
      { error: 'Failed to delete subscriber' },
      { status: 500 }
    )
  }
}
