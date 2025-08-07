'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import LaunchCountdown from './LaunchCountdown'

const HeroSection = () => {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')

  const scrollToForm = () => {
    const formElement = document.getElementById('signup-form')
    formElement?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsSubmitting(true)
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email, 
          source: 'hero_signup' 
        }),
      })

      if (response.ok) {
        setMessage('🎉 Welcome! You\'re on the exclusive launch list.')
        setEmail('')
      } else {
        setMessage('Something went wrong. Please try again.')
      }
    } catch (error) {
      setMessage('Something went wrong. Please try again.')
    }
    setIsSubmitting(false)
  }

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-crevre-white via-crevre-ivory to-crevre-white">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full">
          {/* Elegant geometric pattern */}
          <div className="absolute top-20 right-20 w-64 h-64 border border-crevre-gold/20 rotate-45 rounded-lg" />
          <div className="absolute bottom-32 left-16 w-32 h-32 bg-crevre-gold/5 rounded-full" />
          <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-crevre-gold rounded-full animate-pulse" />
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-crevre-gold rounded-full animate-pulse" style={{animationDelay: '1s'}} />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-20 text-center section-padding max-w-6xl mx-auto">
        <div className="animate-fade-in">
          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-display mb-6 sm:mb-8 leading-tight">
            <span className="block text-crevre-charcoal font-light">Join the</span>
            <span className="block text-crevre-gold font-semibold tracking-wide">EXCLUSIVE</span>
            <span className="block text-crevre-charcoal font-light">Collection for</span>
            <span className="block text-crevre-gold font-bold tracking-wider">CREVRE</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-crevre-charcoal/80 mb-8 sm:mb-12 max-w-4xl mx-auto font-light tracking-wide px-4">
            Discover Timeless Elegance in Contemporary Fashion
          </p>

          {/* Launch Countdown */}
          <LaunchCountdown />

          {/* Email Signup Form */}
          <div className="max-w-lg mx-auto mb-6 sm:mb-8 hero-email-input px-4">
            <form onSubmit={handleEmailSubmit} className="flex flex-col gap-3 sm:gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email for exclusive access"
                className="w-full px-4 sm:px-6 py-4 sm:py-5 bg-white/90 border border-crevre-gold/30 rounded-sm text-crevre-charcoal placeholder-crevre-charcoal/60 focus:outline-none focus:ring-2 focus:ring-crevre-gold focus:border-transparent text-lg sm:text-xl shadow-sm font-medium"
                required
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary text-base sm:text-lg px-6 sm:px-8 py-4 w-full sm:w-auto mx-auto disabled:opacity-50"
              >
                {isSubmitting ? 'Joining...' : 'Join Launch List'}
              </button>
            </form>
            {message && (
              <p className={`mt-3 text-center font-medium ${
                message.includes('🎉') ? 'text-green-600' : 'text-red-500'
              }`}>
                {message}
              </p>
            )}
          </div>

          {/* Secondary CTA */}
          <button
            onClick={scrollToForm}
            className="text-crevre-gold hover:text-crevre-gold-dark transition-colors duration-300 text-base sm:text-lg font-medium underline underline-offset-4 mb-4"
          >
            Learn More About Collection
          </button>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 mt-12 text-gray-400">
            <div className="flex items-center space-x-2">
              <span className="text-crevre-gold">✓</span>
              <span>Free to Join</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-crevre-gold">✓</span>
              <span>Early Access</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-crevre-gold">✓</span>
              <span>Exclusive Discounts</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-crevre-gold">✓</span>
              <span>Behind-the-Scenes</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-crevre-gold rounded-full flex justify-center">
          <div className="w-1 h-3 bg-crevre-gold rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
