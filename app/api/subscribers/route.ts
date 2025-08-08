import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { EmailSubscriber, EmailSubscriberDoc, COLLECTIONS } from '@/lib/models'

// GET - Fetch all subscribers
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const limit = parseInt(searchParams.get('limit') || '100')
    const skip = parseInt(searchParams.get('skip') || '0')

    const client = await clientPromise
    const db = client.db('crevre')
    const subscribers = db.collection<EmailSubscriberDoc>(COLLECTIONS.SUBSCRIBERS)

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

// POST - Add new subscriber
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, productInterest } = body

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    const client = await clientPromise
    const db = client.db('crevre')
    const subscribers = db.collection<EmailSubscriberDoc>(COLLECTIONS.SUBSCRIBERS)

    // Check if email already exists
    const existingSubscriber = await subscribers.findOne({ email })
    
    if (existingSubscriber) {
      // Update existing subscriber with new product interest if provided
      if (productInterest && !existingSubscriber.productInterests?.includes(productInterest)) {
        await subscribers.updateOne(
          { email },
          { 
            $addToSet: { productInterests: productInterest },
            $set: { lastUpdated: new Date() }
          }
        )
      }
      
      return NextResponse.json({
        message: 'Email already subscribed',
        subscriber: existingSubscriber
      })
    }

    // Create new subscriber
    const newSubscriber: EmailSubscriberDoc = {
      email,
      status: 'active',
      source: productInterest ? 'product-interest' : 'general-signup',
      subscribedAt: new Date(),
      lastUpdated: new Date(),
      productInterests: productInterest ? [productInterest] : [],
      tags: [],
      metadata: {
        ipAddress: request.headers.get('x-forwarded-for') || 'unknown',
        userAgent: request.headers.get('user-agent') || 'unknown'
      }
    }

    const result = await subscribers.insertOne(newSubscriber)

    return NextResponse.json({
      message: 'Successfully subscribed',
      subscriber: { ...newSubscriber, _id: result.insertedId.toString() }
    }, { status: 201 })

  } catch (error) {
    console.error('Subscriber creation error:', error)
    return NextResponse.json(
      { error: 'Failed to save subscription' },
      { status: 500 }
    )
  }
}
