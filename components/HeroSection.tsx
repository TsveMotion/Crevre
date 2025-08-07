'use client'

import React from 'react'
import Image from 'next/image'

const HeroSection = () => {
  const scrollToForm = () => {
    const formElement = document.getElementById('signup-form')
    formElement?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full">
          <div className="absolute inset-0 bg-gradient-to-br from-crevre-black/80 via-crevre-gray/60 to-crevre-black/90 z-10" />
          {/* Placeholder for hero image */}
          <div className="w-full h-full bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
            <div className="text-center text-gray-500">
              <div className="w-32 h-32 mx-auto mb-4 bg-crevre-gold/20 rounded-lg flex items-center justify-center">
                <span className="text-4xl">👕</span>
              </div>
              <p className="text-sm">Hero Image Placeholder<br />1920x1080 recommended</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-20 text-center section-padding max-w-6xl mx-auto">
        <div className="animate-fade-in">
          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black mb-6 leading-tight">
            <span className="block text-white">Join the</span>
            <span className="block text-crevre-gold animate-pulse-glow">EXCLUSIVE</span>
            <span className="block text-white">Drop List for</span>
            <span className="block text-crevre-gold font-black tracking-wider">CREVRE</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl sm:text-2xl lg:text-3xl text-gray-300 mb-8 max-w-4xl mx-auto font-light">
            Be the First to Access Limited Streetwear
          </p>

          {/* Launch Date */}
          <div className="inline-block bg-crevre-gold/10 border border-crevre-gold/30 rounded-full px-6 py-3 mb-8">
            <p className="text-crevre-gold font-semibold text-lg">
              🔥 Launching August 9th • Limited Quantities
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
