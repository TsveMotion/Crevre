'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/admin/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      })

      if (response.ok) {
        // Redirect to admin dashboard
        router.push('/admin')
        router.refresh()
      } else {
        const data = await response.json()
        setError(data.error || 'Invalid credentials')
      }
    } catch (error) {
      console.error('Login error:', error)
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-crevre-white via-crevre-ivory to-crevre-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-crevre-gold to-crevre-gold-dark rounded-sm flex items-center justify-center shadow-sm">
              <span className="text-crevre-white font-display font-bold text-xl">C</span>
            </div>
            <span className="text-2xl font-display font-semibold tracking-wider text-crevre-charcoal">
              CREVRE
            </span>
          </div>
          <h1 className="text-3xl font-display font-semibold text-crevre-charcoal mb-2">
            Admin Login
          </h1>
          <p className="text-crevre-charcoal/70 font-light">
            Access the admin dashboard
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-crevre-white border border-crevre-gold/20 rounded-sm p-8 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-sm text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-crevre-charcoal mb-2">
                Username
              </label>
              <input
                type="text"
                value={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                className="w-full px-4 py-3 border-2 border-crevre-gray-dark focus:border-crevre-gold rounded-sm text-crevre-charcoal placeholder-crevre-charcoal/50 transition-all duration-300 outline-none"
                placeholder="Enter your username"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-crevre-charcoal mb-2">
                Password
              </label>
              <input
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                className="w-full px-4 py-3 border-2 border-crevre-gray-dark focus:border-crevre-gold rounded-sm text-crevre-charcoal placeholder-crevre-charcoal/50 transition-all duration-300 outline-none"
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-crevre-gold hover:bg-crevre-gold-dark text-crevre-white px-6 py-3 rounded-sm font-medium transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-crevre-white border-t-transparent mr-2"></div>
                  Signing in...
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-crevre-gold/10 text-center">
            <p className="text-sm text-crevre-charcoal/60">
              Default credentials: admin / crevre2024
            </p>
          </div>
        </div>

        {/* Back to site */}
        <div className="text-center mt-6">
          <button
            onClick={() => router.push('/')}
            className="text-crevre-charcoal/60 hover:text-crevre-gold transition-colors duration-300 font-light"
          >
            ← Back to Crevre
          </button>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin
