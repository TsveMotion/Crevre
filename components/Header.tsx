'use client'

import Link from 'next/link'
import React, { useState, useEffect, useRef } from 'react'
// Custom SVG Icons
const ChevronDownIcon = ({ className }: { className: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
  </svg>
)

const MagnifyingGlassIcon = ({ className }: { className: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
  </svg>
)

const UserIcon = ({ className }: { className: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
  </svg>
)

const ShoppingBagIcon = ({ className }: { className: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119.993Z" />
  </svg>
)

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [cartCount, setCartCount] = useState(0)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const navigationItems = [
    {
      name: 'View All Products',
      href: '/products'
    }
  ]

  const scrollToForm = () => {
    const heroSection = document.querySelector('.hero-email-input')
    if (heroSection) {
      heroSection.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleDropdown = (itemName: string) => {
    setActiveDropdown(activeDropdown === itemName ? null : itemName)
  }

  const handleAccount = () => {
    window.location.href = '/account'
  }

  const handleCart = () => {
    window.location.href = '/cart'
  }

  const handleSearch = () => {
    const searchInput = prompt('Search for clothing previews:')
    if (searchInput) {
      window.location.href = `/search?q=${encodeURIComponent(searchInput)}`
    }
  }

  return (
    <>
      <header 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-crevre-gray-dark' 
            : 'bg-white/90 backdrop-blur-sm'
        }`}
      >
        {/* Top Bar */}
        <div className="bg-crevre-charcoal text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex justify-between items-center text-sm">
            <div className="flex items-center space-x-4">
              <span>🚚 Free delivery over £65</span>
            </div>
            <div className="flex items-center space-x-4">
              <button onClick={scrollToForm} className="hover:text-crevre-gold transition-colors">
                Get Notified
              </button>
              <span className="text-crevre-gray">|</span>
              <a href="https://www.instagram.com/crevre_wear/" target="_blank" rel="noopener noreferrer" className="hover:text-crevre-gold transition-colors">
                Instagram
              </a>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="bg-white border-b border-crevre-gray-dark">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Search */}
              <button 
                onClick={handleSearch}
                className="flex items-center hover:text-crevre-gold transition-colors cursor-pointer"
              >
                <MagnifyingGlassIcon className="h-5 w-5 text-crevre-charcoal mr-2" />
                <span className="text-crevre-charcoal text-sm">Search</span>
              </button>

              {/* Logo */}
              <div className="flex items-center ml-20">
                <Link href="/">
                <img 
                  src="/LogoLong2.png" 
                  alt="Crevre Logo" 
                  className="h-8 w-auto transition-all duration-300"
                />
                </Link>
              </div>

              {/* Account & Cart */}
              <div className="flex items-center space-x-6">
                <button 
                  onClick={handleAccount}
                  className="flex items-center space-x-1 text-crevre-charcoal hover:text-crevre-gold transition-colors"
                >
                  <UserIcon className="h-5 w-5" />
                  <span className="text-sm hidden sm:inline">Account</span>
                </button>
                
                <button 
                  onClick={handleCart}
                  className="flex items-center space-x-1 text-crevre-charcoal hover:text-crevre-gold transition-colors relative"
                >
                  <ShoppingBagIcon className="h-5 w-5" />
                  <span className="text-sm hidden sm:inline">Cart</span>
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-crevre-gold text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="bg-white border-b border-crevre-gray-dark" ref={dropdownRef}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center">
              <div className="flex justify-center">
                {navigationItems.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className="block py-4 text-sm font-medium text-crevre-charcoal hover:text-crevre-gold transition-colors"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Spacer to prevent content from hiding behind fixed header */}
      <div className="h-32"></div>
    </>
  )
}

export default Header
