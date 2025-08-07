'use client'

import React from 'react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-crevre-black border-t border-gray-800">
      <div className="section-padding py-16">
        <div className="max-w-6xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-10 h-10 bg-crevre-gold rounded-lg flex items-center justify-center">
                  <span className="text-crevre-black font-black text-xl">C</span>
                </div>
                <span className="text-2xl font-black tracking-wider text-white">
                  CREVRE
                </span>
              </div>
              <p className="text-gray-400 text-lg max-w-md mb-6 leading-relaxed">
                Premium streetwear that defines culture. Every piece tells a story, 
                every drop makes a statement. Join the movement.
              </p>
              <div className="flex space-x-4">
                <a 
                  href="https://instagram.com/crevrewear" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-crevre-gray border border-gray-600 rounded-lg flex items-center justify-center text-gray-400 hover:text-crevre-gold hover:border-crevre-gold/50 transition-all duration-300"
                >
                  📷
                </a>
                <a 
                  href="https://tiktok.com/@crevrewear" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-crevre-gray border border-gray-600 rounded-lg flex items-center justify-center text-gray-400 hover:text-crevre-gold hover:border-crevre-gold/50 transition-all duration-300"
                >
                  🎵
                </a>
                <a 
                  href="https://twitter.com/crevrewear" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-crevre-gray border border-gray-600 rounded-lg flex items-center justify-center text-gray-400 hover:text-crevre-gold hover:border-crevre-gold/50 transition-all duration-300"
                >
                  🐦
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-bold text-lg mb-6">Quick Links</h4>
              <ul className="space-y-4">
                <li>
                  <button 
                    onClick={() => {
                      const formElement = document.getElementById('signup-form')
                      formElement?.scrollIntoView({ behavior: 'smooth' })
                    }}
                    className="text-gray-400 hover:text-crevre-gold transition-colors duration-300"
                  >
                    Join Drop List
                  </button>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-crevre-gold transition-colors duration-300">
                    About Crevre
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-crevre-gold transition-colors duration-300">
                    Size Guide
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-crevre-gold transition-colors duration-300">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-white font-bold text-lg mb-6">Legal</h4>
              <ul className="space-y-4">
                <li>
                  <a href="/privacy-policy" className="text-gray-400 hover:text-crevre-gold transition-colors duration-300">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/terms-of-service" className="text-gray-400 hover:text-crevre-gold transition-colors duration-300">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="/shipping-returns" className="text-gray-400 hover:text-crevre-gold transition-colors duration-300">
                    Shipping & Returns
                  </a>
                </li>
                <li>
                  <a href="/cookie-policy" className="text-gray-400 hover:text-crevre-gold transition-colors duration-300">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Launch Countdown */}
          <div className="bg-gradient-to-r from-crevre-gold/10 via-crevre-gold/5 to-transparent border border-crevre-gold/20 rounded-xl p-6 mb-12">
            <div className="text-center">
              <h4 className="text-crevre-gold font-bold text-lg mb-2">
                🚀 Launch Countdown
              </h4>
              <p className="text-white font-semibold text-xl">
                August 9th, 2025 • Limited Quantities
              </p>
              <p className="text-gray-400 mt-2">
                Don't miss out on the drop everyone will be talking about
              </p>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-800">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} Crevre. All rights reserved. Made with passion for streetwear culture.
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <span className="text-gray-400">🔒 Secure checkout</span>
              <span className="text-gray-400">📦 Worldwide shipping</span>
              <span className="text-gray-400">💯 Authentic guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
