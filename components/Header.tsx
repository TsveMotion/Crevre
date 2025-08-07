'use client'

import React, { useState, useEffect } from 'react'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToForm = () => {
    // Scroll to hero section email input
    const heroSection = document.querySelector('.hero-email-input')
    if (heroSection) {
      heroSection.scrollIntoView({ behavior: 'smooth' })
    } else {
      // Fallback: scroll to hero section
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-crevre-white/95 backdrop-blur-md shadow-lg border-b border-crevre-gray-dark' 
          : 'bg-transparent'
      }`}
    >
      <div className="section-padding py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-crevre-gold to-crevre-gold-dark rounded-sm flex items-center justify-center shadow-sm">
            <span className="text-crevre-white font-display font-bold text-xl">C</span>
          </div>
          <span className="text-2xl font-display font-semibold tracking-wider text-crevre-charcoal">
            CREVRE
          </span>
        </div>

        {/* Get Notified Button */}
        <button
          onClick={scrollToForm}
          className="bg-crevre-gold hover:bg-crevre-gold-dark text-crevre-white px-8 py-3 rounded-sm font-medium tracking-wide transition-all duration-300 shadow-md hover:shadow-lg hidden sm:block"
        >
          Get Notified
        </button>

        {/* Mobile Button */}
        <button
          onClick={scrollToForm}
          className="sm:hidden w-10 h-10 bg-crevre-gold hover:bg-crevre-gold-dark rounded-sm flex items-center justify-center transition-all duration-300 shadow-md"
        >
          <span className="text-crevre-white text-sm font-bold">→</span>
        </button>
      </div>
    </header>
  )
}

export default Header
