'use client'

import React from 'react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const scrollToForm = () => {
    const heroSection = document.querySelector('.hero-email-input')
    if (heroSection) {
      heroSection.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <footer className="bg-white">
      {/* Top Bar - Similar to Header */}
      <div className="bg-crevre-charcoal text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col md:flex-row justify-between items-center text-sm">
          <div className="flex items-center space-x-4 mb-2 md:mb-0">
            <span>🚀 Launch: September 1st, 2025</span>
            <span className="text-crevre-gray">|</span>
            <span>🚚 Free delivery over £65</span>
          </div>
          <div className="flex items-center space-x-4">
            <button onClick={scrollToForm} className="hover:text-crevre-gold transition-colors">
              Get Launch Notifications
            </button>
            <span className="text-crevre-gray">|</span>
            <a href="https://www.instagram.com/crevre_wear/" target="_blank" rel="noopener noreferrer" className="hover:text-crevre-gold transition-colors">
              Instagram
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="border-t border-crevre-gray-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center mb-4">
                <img 
                  src="/LogoLong2.png" 
                  alt="Crevre Logo" 
                  className="h-8 w-auto"
                />
              </div>
              <p className="text-crevre-charcoal/60 text-sm mb-4">
                Premium fashion that defines elegance.
              </p>
              <div className="flex space-x-3">
                <a 
                  href="https://www.instagram.com/crevre_wear/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-crevre-charcoal/60 hover:text-crevre-gold transition-colors text-sm"
                >
                  Instagram
                </a>
              </div>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="text-crevre-charcoal font-medium mb-4">Shop</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/preview/new-arrivals" className="text-crevre-charcoal/60 hover:text-crevre-gold transition-colors">New Arrivals</a></li>
                <li><a href="/preview/menswear" className="text-crevre-charcoal/60 hover:text-crevre-gold transition-colors">Menswear</a></li>
                <li><a href="/preview/womens" className="text-crevre-charcoal/60 hover:text-crevre-gold transition-colors">Women's</a></li>
                <li><a href="/preview/accessories" className="text-crevre-charcoal/60 hover:text-crevre-gold transition-colors">Accessories</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-crevre-charcoal font-medium mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/contact" className="text-crevre-charcoal/60 hover:text-crevre-gold transition-colors">Contact Us</a></li>
                <li><a href="/size-guide" className="text-crevre-charcoal/60 hover:text-crevre-gold transition-colors">Size Guide</a></li>
                <li><a href="/shipping-returns" className="text-crevre-charcoal/60 hover:text-crevre-gold transition-colors">Shipping & Returns</a></li>
                <li><a href="/faq" className="text-crevre-charcoal/60 hover:text-crevre-gold transition-colors">FAQ</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-crevre-charcoal font-medium mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/privacy-policy" className="text-crevre-charcoal/60 hover:text-crevre-gold transition-colors">Privacy Policy</a></li>
                <li><a href="/terms-of-service" className="text-crevre-charcoal/60 hover:text-crevre-gold transition-colors">Terms of Service</a></li>
                <li><a href="/cookie-policy" className="text-crevre-charcoal/60 hover:text-crevre-gold transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-crevre-gray-dark mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-crevre-charcoal/60 text-sm mb-4 md:mb-0">
              © {currentYear} Crevre. All rights reserved.
            </div>
            <div className="flex items-center space-x-6 text-sm text-crevre-charcoal/60">
              <span>🔒 Secure checkout</span>
              <span>📦 Worldwide shipping</span>
              <span>💯 Authentic guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
