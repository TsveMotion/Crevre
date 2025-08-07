'use client'

import React, { useState } from 'react'

const EmailSignupForm = () => {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Placeholder for email provider integration (Mailchimp/ConvertKit/Beehiiv)
    // In production, replace with actual API call
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      console.log('Email submitted:', email)
      // TODO: Integrate with email provider
      // Example integrations:
      // - Mailchimp API
      // - ConvertKit API  
      // - Beehiiv API
      // - Custom backend endpoint
      
      setIsSubmitted(true)
      setEmail('')
    } catch (error) {
      console.error('Email submission error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <div id="signup-form" className="section-padding py-20 bg-crevre-gray">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-crevre-gold/10 border border-crevre-gold/30 rounded-2xl p-12">
            <div className="w-16 h-16 bg-crevre-gold rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-crevre-black text-2xl">✓</span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">
              Welcome to the Drop List! 🔥
            </h2>
            <p className="text-gray-300 text-lg mb-6">
              You're in! Get ready for exclusive early access, behind-the-scenes content, and special discounts. 
              Check your email for confirmation.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
              <span>✓ Early Access Confirmed</span>
              <span>✓ Exclusive Discounts</span>
              <span>✓ Behind-the-Scenes</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <section id="signup-form" className="section-padding py-20 bg-crevre-gray">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-4xl lg:text-5xl font-black text-white mb-6">
          Get <span className="text-crevre-gold">Exclusive Access</span>
        </h2>
        
        <p className="text-xl text-gray-300 mb-12 max-w-xl mx-auto">
          Join thousands getting early access to our limited streetwear drops, 
          exclusive discounts, and behind-the-scenes content.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email to get early access"
              required
              className="input-field flex-1 text-center sm:text-left"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !email}
              className="btn-primary whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-crevre-black border-t-transparent mr-2"></div>
                  Joining...
                </div>
              ) : (
                'Join the Drop'
              )}
            </button>
          </div>
          
          <p className="text-sm text-gray-400 max-w-md mx-auto">
            By joining, you agree to receive emails about our exclusive drops. 
            Unsubscribe anytime. No spam, just fire streetwear content.
          </p>
        </form>

        {/* Social Stats */}
        <div className="flex justify-center items-center gap-8 mt-12 text-gray-400">
          <div className="text-center">
            <div className="text-2xl font-bold text-crevre-gold">2.5K+</div>
            <div className="text-sm">Already Joined</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-crevre-gold">48hrs</div>
            <div className="text-sm">Early Access</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-crevre-gold">20%</div>
            <div className="text-sm">Exclusive Discount</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default EmailSignupForm
