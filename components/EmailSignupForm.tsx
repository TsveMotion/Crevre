'use client'

import React, { useState } from 'react'

const EmailSignupForm = () => {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          source: 'landing-page'
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setIsSubmitted(true)
        setEmail('')
        console.log('Subscription successful:', data.message)
      } else {
        console.error('Subscription error:', data.error)
        alert(data.error || 'Failed to subscribe. Please try again.')
      }
    } catch (error) {
      console.error('Email submission error:', error)
      alert('Network error. Please check your connection and try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <div id="signup-form" className="section-padding py-20 bg-crevre-ivory">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-crevre-white border border-crevre-gold/20 rounded-sm p-12 shadow-lg">
            <div className="w-16 h-16 bg-crevre-gold rounded-sm flex items-center justify-center mx-auto mb-6 shadow-md">
              <span className="text-crevre-white text-2xl">✓</span>
            </div>
            <h2 className="text-3xl font-display font-semibold text-crevre-charcoal mb-4">
              Welcome to the Exclusive Collection! ✨
            </h2>
            <p className="text-crevre-charcoal/80 text-lg mb-6 font-light leading-relaxed">
              You're in! Get ready for exclusive early access, curated collections, and special member privileges. 
              Check your email for confirmation.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-crevre-charcoal/60">
              <span>✓ Early Access Confirmed</span>
              <span>✓ Exclusive Collections</span>
              <span>✓ Member Privileges</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <section id="signup-form" className="section-padding py-20 bg-crevre-ivory">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-4xl lg:text-5xl font-display font-semibold text-crevre-charcoal mb-6">
          Get <span className="text-crevre-gold">Exclusive Access</span>
        </h2>
        
        <p className="text-xl text-crevre-charcoal/80 mb-12 max-w-xl mx-auto font-light leading-relaxed">
          Join our exclusive community for early access to curated collections, 
          member privileges, and timeless fashion pieces.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email to get early access"
              required
              className="bg-crevre-white border-2 border-crevre-gray-dark focus:border-crevre-gold px-6 py-4 rounded-sm text-crevre-charcoal placeholder-crevre-charcoal/50 transition-all duration-300 flex-1 text-center sm:text-left shadow-sm focus:shadow-md outline-none"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !email}
              className="bg-crevre-gold hover:bg-crevre-gold-dark text-crevre-white px-8 py-4 rounded-sm font-medium tracking-wide transition-all duration-300 shadow-md hover:shadow-lg whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-crevre-white border-t-transparent mr-2"></div>
                  Joining...
                </div>
              ) : (
                'Join Collection'
              )}
            </button>
          </div>
          
          <p className="text-sm text-crevre-charcoal/60 max-w-md mx-auto">
            By joining, you agree to receive emails about our exclusive collections. 
            Unsubscribe anytime. No spam, just premium fashion content.
          </p>
        </form>

        {/* Social Stats */}
        <div className="flex justify-center items-center gap-8 mt-12 text-crevre-charcoal/60">
          <div className="text-center">
            <div className="text-2xl font-bold text-crevre-gold">2.5K+</div>
            <div className="text-sm">Already Joined</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-crevre-gold">48hrs</div>
            <div className="text-sm">Early Access</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-crevre-gold">VIP</div>
            <div className="text-sm">Member Benefits</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default EmailSignupForm
