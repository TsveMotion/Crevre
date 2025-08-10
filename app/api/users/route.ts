import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

// GET - Fetch all users
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '100')
    const skip = parseInt(searchParams.get('skip') || '0')

    const client = await clientPromise
    const db = client.db('crevre')
    const users = db.collection('users')

    const result = await users
      .find({}, { projection: { password: 0 } }) // Exclude password from results
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip)
      .toArray()

    const total = await users.countDocuments()
    const adminCount = await users.countDocuments({ isAdmin: true })

    return NextResponse.json({
      users: result,
      total,
      adminCount,
      page: Math.floor(skip / limit) + 1,
      totalPages: Math.ceil(total / limit)
    })

  } catch (error) {
    console.error('Users fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    )
  }
}

// DELETE - Remove a user
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('id')

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }

    const client = await clientPromise
    const db = client.db('crevre')
    const users = db.collection('users')

    const result = await users.deleteOne({ _id: new ObjectId(userId) })

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      message: 'User deleted successfully'
    })

  } catch (error) {
    console.error('User deletion error:', error)
    return NextResponse.json(
      { error: 'Failed to delete user' },
      { status: 500 }
    )
  }
}
