'use client'

import React from 'react'

const VisualShowcase = () => {
  return (
    <section className="section-padding py-20 bg-crevre-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-display font-semibold text-crevre-charcoal mb-6">
            Premium <span className="text-crevre-gold">Fashion</span> Redefined
          </h2>
          <p className="text-xl text-crevre-charcoal/80 max-w-3xl mx-auto font-light leading-relaxed">
            Every piece tells a story. Every collection makes a statement. 
            Discover what's coming in our exclusive launch collection.
          </p>
        </div>

        {/* Main Featured Visual */}
        <div className="relative mb-16 group">
          <div className="relative aspect-video lg:aspect-[21/9] bg-gradient-to-br from-crevre-ivory to-crevre-white rounded-sm overflow-hidden border border-crevre-gold/20 shadow-lg">
            {/* Elegant placeholder for main collection image */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-crevre-charcoal/60">
                <div className="w-24 h-24 mx-auto mb-6 bg-crevre-gold/10 rounded-sm flex items-center justify-center shadow-sm">
                  <span className="text-5xl">✨</span>
                </div>
                <h3 className="text-2xl font-display font-semibold mb-2">Featured Collection Visual</h3>
                <p className="text-lg font-light">Elegant lifestyle showcase</p>
                <p className="text-sm mt-2 text-crevre-charcoal/40">Recommended: 2400x1080px</p>
              </div>
            </div>
            
            {/* Subtle overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-crevre-white/30 via-transparent to-transparent" />
            
            {/* Badge */}
            <div className="absolute top-6 left-6 bg-crevre-gold text-crevre-white px-6 py-2 rounded-sm font-medium text-sm shadow-md">
              ARRIVING AUG 9TH
            </div>
            
            {/* Bottom Info */}
            <div className="absolute bottom-6 left-6 text-crevre-charcoal">
              <h3 className="text-2xl font-display font-semibold mb-2">Launch Collection Preview</h3>
              <p className="text-crevre-charcoal/80 font-light">Limited quantities • Premium materials • Timeless designs</p>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: 'Signature Hoodie', price: 'From $89' },
            { name: 'Urban Tee Collection', price: 'From $45' },
            { name: 'Limited Bomber', price: 'From $149' },
            { name: 'Accessories Pack', price: 'From $29' }
          ].map((item, index) => (
            <div 
              key={index}
              className="group relative aspect-square bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden border border-gray-600 hover:border-crevre-gold/50 transition-all duration-300"
            >
              {/* Placeholder for product images */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <div className="w-12 h-12 mx-auto mb-3 bg-crevre-gold/20 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">👕</span>
                  </div>
                  <p className="text-sm">Product {index + 1}</p>
                  <p className="text-xs text-gray-500">500x500px</p>
                </div>
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-crevre-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                <h4 className="font-bold text-sm mb-1">{item.name}</h4>
                <p className="text-crevre-gold text-xs">{item.price}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-gray-300 text-lg mb-6">
            Want first access to these exclusive pieces?
          </p>
          <button
            onClick={() => {
              const formElement = document.getElementById('signup-form')
              formElement?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="btn-primary"
          >
            Join the Drop List
          </button>
        </div>
      </div>
    </section>
  )
}

export default VisualShowcase
