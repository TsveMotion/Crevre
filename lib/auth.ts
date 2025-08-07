import { cookies } from 'next/headers'

export function checkAdminAuth(): boolean {
  try {
    const cookieStore = cookies()
    const authCookie = cookieStore.get('admin-auth')
    
    if (!authCookie?.value) {
      return false
    }

    // Decode and validate the auth token
    const decoded = Buffer.from(authCookie.value, 'base64').toString()
    const [username, timestamp] = decoded.split(':')
    
    // Check if token is expired (24 hours)
    const tokenAge = Date.now() - parseInt(timestamp)
    const maxAge = 24 * 60 * 60 * 1000 // 24 hours in milliseconds
    
    if (tokenAge > maxAge) {
      return false
    }
    
    return username === (process.env.ADMIN_USERNAME || 'admin')
  } catch (error) {
    console.error('Auth check error:', error)
    return false
  }
}

export function getAuthStatus() {
  return checkAdminAuth()
}
