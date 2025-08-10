import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '../../../../lib/mongodb'
import bcrypt from 'bcryptjs'

export async function POST(request) {
  try {
    const { email, password } = await request.json()

    // Validate input
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 })
    }

    // Check for admin login first
    if (email === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
      const adminUser = {
        id: 'admin',
        email: process.env.ADMIN_USERNAME,
        firstName: 'Admin',
        lastName: 'User',
        isAdmin: true,
        joinedAt: new Date().toISOString()
      }

      return NextResponse.json({
        message: 'Login successful',
        user: adminUser
      }, { status: 200 })
    }

    // Connect to MongoDB
    const client = await clientPromise
    const db = client.db('crevre')
    const users = db.collection('users')

    // Find user
    const user = await users.findOne({ email })
    if (!user) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })
    }

    // Return user without password
    const userResponse = {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isAdmin: user.isAdmin || false,
      joinedAt: user.createdAt ? (typeof user.createdAt === 'string' ? user.createdAt : user.createdAt.toISOString()) : new Date().toISOString()
    }

    return NextResponse.json({
      message: 'Login successful',
      user: userResponse
    }, { status: 200 })

  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
