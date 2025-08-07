import React from 'react'
import type { Metadata } from 'next'
import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Contemporary Elegance | Modern Luxury Fashion - Crevre',
  description: 'Discover Crevre\'s contemporary elegance collection. Modern luxury fashion that redefines sophistication with clean lines and timeless appeal.',
  keywords: 'contemporary elegance, modern luxury fashion, sophisticated design, contemporary style, elegant clothing, modern fashion, refined style',
}

export default function ContemporaryElegancePage() {
  return (
    <main className="min-h-screen bg-crevre-white">
      <Header />
      
      <section className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4">
          <nav className="mb-8">
            <div className="flex items-center space-x-2 text-sm text-crevre-charcoal/60">
              <Link href="/" className="hover:text-crevre-gold transition-colors">Home</Link>
              <span>→</span>
              <Link href="/fashion" className="hover:text-crevre-gold transition-colors">Fashion</Link>
              <span>→</span>
              <span>Contemporary Elegance</span>
            </div>
          </nav>

          <h1 className="text-4xl sm:text-5xl font-display font-semibold text-crevre-charcoal mb-6">
            Contemporary <span className="text-crevre-gold">Elegance</span>
          </h1>
          
          <p className="text-xl text-crevre-charcoal/80 mb-12 leading-relaxed">
            Modern sophistication redefined. Our contemporary elegance collection embodies the perfect balance between minimalist design and luxurious comfort, creating timeless pieces for the modern individual.
          </p>

          <div className="space-y-16 mb-16">
            <div>
              <h2 className="text-3xl font-display font-semibold text-crevre-charcoal mb-6 text-center">
                The Philosophy of Modern Elegance
              </h2>
              <p className="text-crevre-charcoal/70 text-center max-w-3xl mx-auto leading-relaxed">
                Contemporary elegance is about refined simplicity. It's the art of creating maximum impact with minimal elements, where every line, every cut, and every detail serves a purpose in achieving effortless sophistication.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-crevre-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-8 h-8 bg-crevre-gold rounded-full"></div>
                </div>
                <h3 className="text-xl font-display font-semibold text-crevre-charcoal mb-3">Clean Lines</h3>
                <p className="text-crevre-charcoal/70 text-sm">
                  Precise tailoring and thoughtful proportions create silhouettes that are both modern and timeless.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-crevre-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-8 h-8 bg-crevre-gold rounded-full"></div>
                </div>
                <h3 className="text-xl font-display font-semibold text-crevre-charcoal mb-3">Refined Materials</h3>
                <p className="text-crevre-charcoal/70 text-sm">
                  Premium fabrics selected for their texture, drape, and ability to maintain their elegance over time.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-crevre-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-8 h-8 bg-crevre-gold rounded-full"></div>
                </div>
                <h3 className="text-xl font-display font-semibold text-crevre-charcoal mb-3">Versatile Design</h3>
                <p className="text-crevre-charcoal/70 text-sm">
                  Pieces that transition seamlessly from day to evening, from casual to formal settings.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-crevre-ivory to-crevre-white border border-crevre-gold/20 rounded-sm p-8">
              <blockquote className="text-2xl font-light text-crevre-charcoal/80 text-center italic mb-4">
                "Elegance is not about being noticed, it's about being remembered."
              </blockquote>
              <p className="text-center text-crevre-charcoal/60 text-sm">
                — Crevre Design Philosophy
              </p>
            </div>
          </div>

          <div className="bg-crevre-ivory border border-crevre-gold/20 rounded-sm p-8 text-center">
            <h3 className="text-2xl font-display font-semibold text-crevre-charcoal mb-4">
              Experience Contemporary Elegance
            </h3>
            <p className="text-crevre-charcoal/80 mb-6">
              Join us for the September 1st launch and discover pieces that embody the essence of modern sophistication.
            </p>
            <Link href="/" className="btn-primary">
              Join the Launch
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  )
}
