import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { EmailSubscriber, COLLECTIONS } from '@/lib/models'

// GET - Fetch all subscribers
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const limit = parseInt(searchParams.get('limit') || '100')
    const skip = parseInt(searchParams.get('skip') || '0')

    const client = await clientPromise
    const db = client.db('crevre')
    const subscribers = db.collection<EmailSubscriber>(COLLECTIONS.SUBSCRIBERS)

    // Build filter object
    const filter: any = {}
    if (status) filter.status = status

    const result = await subscribers
      .find(filter)
      .sort({ subscribedAt: -1 })
      .limit(limit)
      .skip(skip)
      .toArray()

    const total = await subscribers.countDocuments(filter)
    const activeCount = await subscribers.countDocuments({ status: 'active' })

    return NextResponse.json({
      subscribers: result,
      total,
      activeCount,
      page: Math.floor(skip / limit) + 1,
      totalPages: Math.ceil(total / limit)
    })

  } catch (error) {
    console.error('Subscribers fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch subscribers' },
      { status: 500 }
    )
  }
}
