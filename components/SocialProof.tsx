'use client'

import React from 'react'

const SocialProof = () => {
  const testimonials = [
    {
      name: 'Alex Chen',
      handle: '@alexwears',
      text: 'Finally, a streetwear brand that gets it. The quality is unmatched and the designs are pure fire. Can\'t wait for the full drop! 🔥',
      verified: true
    },
    {
      name: 'Jordan Smith',
      handle: '@jordanstyle',
      text: 'Been following Crevre since day one. Their attention to detail and cultural understanding sets them apart from everything else in the game.',
      verified: true
    },
    {
      name: 'Maya Rodriguez',
      handle: '@mayafits',
      text: 'Got the early preview pieces and I\'m obsessed. The fit, the materials, the whole vibe - this is what streetwear should be. Everyone\'s asking where I got it!',
      verified: true
    }
  ]

  return (
    <section className="section-padding py-20 bg-crevre-gray">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-6">
            The Culture is <span className="text-crevre-gold">Talking</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Early testers and streetwear influencers are already spreading the word. 
            See what they're saying about Crevre.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-crevre-black border border-gray-700 rounded-xl p-6 hover:border-crevre-gold/50 transition-all duration-300 hover:transform hover:scale-105"
            >
              <div className="flex items-start space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-crevre-gold to-yellow-600 rounded-full flex items-center justify-center text-crevre-black font-bold">
                  {testimonial.name[0]}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-bold text-white">{testimonial.name}</h4>
                    {testimonial.verified && (
                      <div className="w-5 h-5 bg-crevre-gold rounded-full flex items-center justify-center">
                        <span className="text-crevre-black text-xs">✓</span>
                      </div>
                    )}
                  </div>
                  <p className="text-gray-400 text-sm">{testimonial.handle}</p>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed">{testimonial.text}</p>
            </div>
          ))}
        </div>

        {/* Instagram Placeholder Section */}
        <div className="bg-gradient-to-r from-crevre-black to-crevre-gray border border-gray-700 rounded-2xl p-8 mb-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
              See Crevre in Action
            </h3>
            <p className="text-gray-300">
              Check out how early testers are styling our preview pieces
            </p>
          </div>

          {/* Instagram Posts Placeholder Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div 
                key={i}
                className="aspect-square bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg flex items-center justify-center border border-gray-600 hover:border-crevre-gold/50 transition-all duration-300 group"
              >
                <div className="text-center text-gray-400 group-hover:text-gray-300 transition-colors">
                  <div className="w-8 h-8 mx-auto mb-2 bg-crevre-gold/20 rounded-lg flex items-center justify-center">
                    <span className="text-lg">📸</span>
                  </div>
                  <p className="text-xs">IG Post {i}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Social Follow Section */}
        <div className="text-center bg-gradient-to-r from-crevre-gold/10 via-crevre-gold/5 to-transparent border border-crevre-gold/20 rounded-2xl p-8">
          <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
            Follow us for Sneak Peeks
          </h3>
          <p className="text-gray-300 mb-8">
            Get behind-the-scenes content, styling tips, and first looks at new pieces
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
            <a 
              href="https://instagram.com/crevrewear" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-pink-700 hover:to-purple-700 transition-all duration-300 hover:scale-105"
            >
              <span className="text-xl">📷</span>
              <span>@crevrewear</span>
            </a>
            
            <a 
              href="https://tiktok.com/@crevrewear" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 bg-gradient-to-r from-gray-800 to-gray-900 text-white px-8 py-4 rounded-lg font-semibold hover:from-gray-900 hover:to-black transition-all duration-300 hover:scale-105 border border-gray-600"
            >
              <span className="text-xl">🎵</span>
              <span>@crevrewear</span>
            </a>
          </div>

          <p className="text-sm text-gray-400 mt-6">
            Join 15K+ followers getting exclusive content and early previews
          </p>
        </div>
      </div>
    </section>
  )
}

export default SocialProof
