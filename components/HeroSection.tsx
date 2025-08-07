'use client'

import React from 'react'
import Image from 'next/image'

const HeroSection = () => {
  const scrollToForm = () => {
    const formElement = document.getElementById('signup-form')
    formElement?.scrollIntoView({ behavior: 'smooth' })
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
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-display mb-8 leading-tight">
            <span className="block text-crevre-charcoal font-light">Join the</span>
            <span className="block text-crevre-gold font-semibold tracking-wide">EXCLUSIVE</span>
            <span className="block text-crevre-charcoal font-light">Collection for</span>
            <span className="block text-crevre-gold font-bold tracking-wider">CREVRE</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl sm:text-2xl lg:text-3xl text-crevre-charcoal/80 mb-12 max-w-4xl mx-auto font-light tracking-wide">
            Discover Timeless Elegance in Contemporary Fashion
          </p>

          {/* Launch Date */}
          <div className="inline-block bg-crevre-gold/10 border border-crevre-gold/30 rounded-sm px-8 py-4 mb-12 shadow-sm">
            <p className="text-crevre-gold font-medium text-lg tracking-wide">
              ✨ Launching August 9th • Exclusive Collection
            </p>
          </div>

          {/* CTA Button */}
          <button
            onClick={scrollToForm}
            className="btn-primary text-xl px-12 py-5 animate-slide-up"
          >
            Join the Drop List
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
