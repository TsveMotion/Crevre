'use client'

import React from 'react'

const ValueProposition = () => {
  const benefits = [
    {
      icon: '⚡',
      title: 'Early Access',
      description: 'Get first dibs on limited drops before they sell out to the public.'
    },
    {
      icon: '👀',
      title: 'Sneak Peeks',
      description: 'Behind-the-scenes looks at our design process and upcoming releases.'
    },
    {
      icon: '🏷️',
      title: 'Exclusive Discounts',
      description: 'Member-only pricing and special offers you won\'t find anywhere else.'
    },
    {
      icon: '🎯',
      title: 'Limited Drops',
      description: 'Access to rare, limited-quantity pieces that define streetwear culture.'
    }
  ]

  return (
    <section className="section-padding py-20 bg-crevre-black">
      <div className="max-w-6xl mx-auto">
        {/* Main Value Prop */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-8">
            Crevre isn't just <span className="text-crevre-gold">fashion</span> — it's <span className="text-crevre-gold">culture</span>
          </h2>
          
          <p className="text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed">
            Get exclusive early access to our launch drop, discounts, and behind-the-scenes looks. 
            Only for email insiders who understand that streetwear is more than clothing—it's a statement.
          </p>

          <div className="inline-block bg-gradient-to-r from-crevre-gold/20 to-transparent border border-crevre-gold/30 rounded-full px-8 py-4">
            <span className="text-crevre-gold font-semibold text-lg">
              💎 Premium Members Get 48-Hour Head Start
            </span>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="bg-crevre-gray border border-gray-700 rounded-xl p-6 text-center hover:border-crevre-gold/50 transition-all duration-300 hover:transform hover:scale-105"
            >
              <div className="text-4xl mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-bold text-white mb-3">{benefit.title}</h3>
              <p className="text-gray-400 leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-crevre-gold/10 via-crevre-gold/5 to-transparent border border-crevre-gold/20 rounded-2xl p-8 max-w-3xl mx-auto">
            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
              Ready to join the culture?
            </h3>
            <p className="text-gray-300 mb-6">
              Over 2,500 streetwear enthusiasts are already on the list. 
              Don't miss out on the drop that everyone will be talking about.
            </p>
            <button
              onClick={() => {
                const formElement = document.getElementById('signup-form')
                formElement?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="btn-primary"
            >
              Secure Your Spot
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ValueProposition
