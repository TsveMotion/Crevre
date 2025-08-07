'use client'

import React from 'react'

const SocialProof = () => {
  const testimonials = [
    {
      name: 'Alex Chen',
      handle: '@alexwears',
      text: 'Finally, a fashion brand that understands timeless elegance. The quality is exceptional and the designs are pure sophistication. Can\'t wait for the full collection! ✨',
      verified: true
    },
    {
      name: 'Jordan Smith',
      handle: '@jordanstyle',
      text: 'Been following Crevre since day one. Their attention to detail and refined aesthetic sets them apart from everything else in contemporary fashion.',
      verified: true
    },
    {
      name: 'Maya Rodriguez',
      handle: '@mayafits',
      text: 'Got the early preview pieces and I\'m obsessed. The fit, the materials, the whole aesthetic - this is what premium fashion should be. Everyone\'s asking where I got it!',
      verified: true
    }
  ]

  return (
    <section className="section-padding py-20 bg-crevre-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-display font-semibold text-crevre-charcoal mb-6">
            The Community is <span className="text-crevre-gold">Talking</span>
          </h2>
          <p className="text-xl text-crevre-charcoal/80 max-w-3xl mx-auto font-light leading-relaxed">
            Early members and fashion connoisseurs are already spreading the word. 
            See what they're saying about Crevre.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-crevre-ivory border border-crevre-gold/20 rounded-sm p-8 hover:border-crevre-gold/40 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-crevre-gold to-crevre-gold-dark rounded-sm flex items-center justify-center text-crevre-white font-display font-semibold shadow-sm">
                  {testimonial.name[0]}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-semibold text-crevre-charcoal">{testimonial.name}</h4>
                    {testimonial.verified && (
                      <div className="w-5 h-5 bg-crevre-gold rounded-full flex items-center justify-center">
                        <span className="text-crevre-white text-xs">✓</span>
                      </div>
                    )}
                  </div>
                  <p className="text-crevre-charcoal/60 text-sm">{testimonial.handle}</p>
                </div>
              </div>
              <p className="text-crevre-charcoal/80 leading-relaxed font-light">{testimonial.text}</p>
            </div>
          ))}
        </div>

        {/* Collection Showcase Section */}
        <div className="bg-crevre-ivory border border-crevre-gold/20 rounded-sm p-12 mb-12 shadow-sm">
          <div className="text-center mb-8">
            <h3 className="text-2xl lg:text-3xl font-display font-semibold text-crevre-charcoal mb-4">
              See Crevre in Action
            </h3>
            <p className="text-crevre-charcoal/80 font-light leading-relaxed">
              Discover how our community is styling our exclusive pieces
            </p>
          </div>

          {/* Collection Showcase Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div 
                key={i}
                className="aspect-square bg-crevre-white rounded-sm flex items-center justify-center border border-crevre-gold/20 hover:border-crevre-gold/40 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="text-center text-crevre-charcoal/60 group-hover:text-crevre-charcoal/80 transition-colors">
                  <div className="w-10 h-10 mx-auto mb-3 bg-crevre-gold/10 rounded-sm flex items-center justify-center shadow-sm">
                    <span className="text-xl">✨</span>
                  </div>
                  <p className="text-xs font-medium">Showcase {i}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Social Follow Section */}
        <div className="text-center bg-crevre-white border border-crevre-gold/20 rounded-sm p-12 shadow-lg">
          <h3 className="text-2xl lg:text-3xl font-display font-semibold text-crevre-charcoal mb-4">
            Follow us for Exclusive Content
          </h3>
          <p className="text-crevre-charcoal/80 mb-8 font-light leading-relaxed">
            Get curated content, styling inspiration, and first looks at new collections
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
            <a 
              href="https://instagram.com/crevrewear" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 bg-crevre-gold hover:bg-crevre-gold-dark text-crevre-white px-8 py-4 rounded-sm font-medium transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <span className="text-xl">📷</span>
              <span>@crevrewear</span>
            </a>
            
            <a 
              href="https://tiktok.com/@crevrewear" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 bg-crevre-charcoal hover:bg-crevre-charcoal/90 text-crevre-white px-8 py-4 rounded-sm font-medium transition-all duration-300 shadow-md hover:shadow-lg border border-crevre-gold/20"
            >
              <span className="text-xl">🎵</span>
              <span>@crevrewear</span>
            </a>
          </div>

          <p className="text-sm text-crevre-charcoal/60 mt-6">
            Join 15K+ members getting exclusive content and early previews
          </p>
        </div>
      </div>
    </section>
  )
}

export default SocialProof
