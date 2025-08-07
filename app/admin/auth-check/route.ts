import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic' // Mark as dynamic route to handle cookies properly

export async function GET(request: NextRequest) {
  try {
    // Get the auth cookie directly from the request
    const authCookie = request.cookies.get('admin-auth')?.value
    
    if (!authCookie) {
      console.log('No authentication cookie found')
      return NextResponse.json(
        { authenticated: false, error: 'No authentication cookie found' },
        { status: 401 }
      )
    }

    // Decode and validate the auth token
    try {
      const decoded = Buffer.from(authCookie, 'base64').toString()
      const [username, timestamp] = decoded.split(':')
      
      console.log(`Auth check: Username=${username}, Token timestamp=${timestamp}`)
      
      // Check if token is expired (24 hours)
      const tokenAge = Date.now() - parseInt(timestamp)
      const maxAge = 24 * 60 * 60 * 1000 // 24 hours in milliseconds
      
      if (tokenAge > maxAge) {
        console.log(`Token expired: age=${tokenAge}ms, max=${maxAge}ms`)
        return NextResponse.json(
          { authenticated: false, error: 'Authentication token expired' },
          { status: 401 }
        )
      }
      
      // Verify username matches expected admin username
      const expectedUsername = process.env.ADMIN_USERNAME || 'admin'
      console.log(`Comparing username: ${username} vs expected: ${expectedUsername}`)
      
      if (username === expectedUsername) {
        console.log('Authentication successful')
        return NextResponse.json({ authenticated: true })
      } else {
        console.log('Invalid username')
        return NextResponse.json(
          { authenticated: false, error: 'Invalid username' },
          { status: 401 }
        )
      }
    } catch (decodeError) {
      console.error('Token decode error:', decodeError)
      return NextResponse.json(
        { authenticated: false, error: 'Invalid authentication token format' },
        { status: 401 }
      )
    }
  } catch (error) {
    console.error('Auth check error:', error)
    return NextResponse.json(
      { authenticated: false, error: 'Authentication check failed' },
      { status: 500 }
    )
  }
}
