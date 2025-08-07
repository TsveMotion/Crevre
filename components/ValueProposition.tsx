'use client'

import React from 'react'

const ValueProposition = () => {
  const benefits = [
    {
      icon: '✨',
      title: 'Early Access',
      description: 'Get first access to curated collections before they launch to the public.'
    },
    {
      icon: '🎨',
      title: 'Curated Collections',
      description: 'Exclusive looks at our design process and upcoming timeless pieces.'
    },
    {
      icon: '💎',
      title: 'Member Privileges',
      description: 'VIP pricing and special member benefits exclusively for our community.'
    },
    {
      icon: '🏆',
      title: 'Premium Quality',
      description: 'Access to limited-edition pieces that define contemporary elegance.'
    }
  ]

  return (
    <section className="section-padding py-20 bg-crevre-ivory">
      <div className="max-w-6xl mx-auto">
        {/* Main Value Prop */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-display font-semibold text-crevre-charcoal mb-8">
            Crevre isn't just <span className="text-crevre-gold">fashion</span> — it's <span className="text-crevre-gold">elegance</span>
          </h2>
          
          <p className="text-xl lg:text-2xl text-crevre-charcoal/80 max-w-4xl mx-auto mb-12 leading-relaxed font-light">
            Get exclusive early access to our launch collection, member privileges, and curated content. 
            Only for those who understand that fashion is more than clothing—it's timeless elegance.
          </p>

          <div className="inline-block bg-crevre-white border border-crevre-gold/30 rounded-sm px-8 py-4 shadow-md">
            <span className="text-crevre-gold font-medium text-lg">
              ✨ Premium Members Get 48-Hour Head Start
            </span>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="bg-crevre-white border border-crevre-gold/20 rounded-sm p-8 text-center hover:border-crevre-gold/40 hover:shadow-lg transition-all duration-300"
            >
              <div className="text-4xl mb-6">{benefit.icon}</div>
              <h3 className="text-xl font-display font-semibold text-crevre-charcoal mb-4">{benefit.title}</h3>
              <p className="text-crevre-charcoal/70 leading-relaxed font-light">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-crevre-white border border-crevre-gold/20 rounded-sm p-12 max-w-3xl mx-auto shadow-lg">
            <h3 className="text-2xl lg:text-3xl font-display font-semibold text-crevre-charcoal mb-6">
              Ready to join the exclusive community?
            </h3>
            <p className="text-crevre-charcoal/80 mb-8 font-light leading-relaxed">
              Over 2,500 discerning individuals are already on the list. 
              Don't miss the collection that defines contemporary elegance.
            </p>
            <button
              onClick={() => {
                // Scroll to hero section email input
                const heroSection = document.querySelector('.hero-email-input')
                if (heroSection) {
                  heroSection.scrollIntoView({ behavior: 'smooth' })
                } else {
                  // Fallback: scroll to top
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }
              }}
              className="btn-primary"
            >
              Secure Your Access
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ValueProposition
