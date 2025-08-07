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
    const formElement = document.getElementById('signup-form')
    formElement?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-crevre-black/95 backdrop-blur-md shadow-2xl' 
          : 'bg-transparent'
      }`}
    >
      <div className="section-padding py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-crevre-gold rounded-lg flex items-center justify-center">
            <span className="text-crevre-black font-black text-xl">C</span>
          </div>
          <span className="text-2xl font-black tracking-wider text-white">
            CREVRE
          </span>
        </div>

        {/* Get Notified Button */}
        <button
          onClick={scrollToForm}
          className="btn-primary animate-pulse-glow hidden sm:block"
        >
          Get Notified
        </button>

        {/* Mobile Button */}
        <button
          onClick={scrollToForm}
          className="btn-secondary text-sm px-4 py-2 sm:hidden"
        >
          Join Drop
        </button>
      </div>
    </header>
  )
}

export default Header
