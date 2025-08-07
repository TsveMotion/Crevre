import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

// Simple admin authentication - in production, use proper authentication
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'crevre2024'

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      // Create a simple auth token (in production, use proper JWT)
      const authToken = Buffer.from(`${username}:${Date.now()}`).toString('base64')
      
      const response = NextResponse.json(
        { message: 'Authentication successful' },
        { status: 200 }
      )

      // Set HTTP-only cookie for security
      response.cookies.set('admin-auth', authToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 // 24 hours
      })

      return response
    } else {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }
  } catch (error) {
    console.error('Auth error:', error)
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    )
  }
}

// Logout endpoint
export async function DELETE() {
  const response = NextResponse.json({ message: 'Logged out successfully' })
  response.cookies.delete('admin-auth')
  return response
}
