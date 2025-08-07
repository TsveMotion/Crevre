import React from 'react'
import type { Metadata } from 'next'
import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Luxury Streetwear Collection | Premium Urban Fashion - Crevre',
  description: 'Discover Crevre\'s luxury streetwear collection. Premium urban fashion that combines comfort with sophisticated design and contemporary elegance.',
  keywords: 'luxury streetwear, premium urban fashion, high-end streetwear, designer street fashion, contemporary streetwear, exclusive urban wear',
}

export default function LuxuryStreetwearPage() {
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
              <span>Luxury Streetwear</span>
            </div>
          </nav>

          <h1 className="text-4xl sm:text-5xl font-display font-semibold text-crevre-charcoal mb-6">
            Luxury <span className="text-crevre-gold">Streetwear</span>
          </h1>
          
          <p className="text-xl text-crevre-charcoal/80 mb-12 leading-relaxed">
            Where urban culture meets sophisticated design. Our luxury streetwear collection redefines casual elegance with premium materials and contemporary aesthetics.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-2xl font-display font-semibold text-crevre-charcoal mb-4">Premium Materials</h2>
              <p className="text-crevre-charcoal/70 mb-6">
                Every piece is crafted from the finest materials, ensuring both comfort and durability while maintaining the sophisticated aesthetic that defines luxury streetwear.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-display font-semibold text-crevre-charcoal mb-4">Contemporary Design</h2>
              <p className="text-crevre-charcoal/70 mb-6">
                Our designs blend traditional streetwear silhouettes with modern tailoring techniques, creating pieces that are both timeless and on-trend.
              </p>
            </div>
          </div>

          <div className="bg-crevre-ivory border border-crevre-gold/20 rounded-sm p-8 text-center">
            <h3 className="text-2xl font-display font-semibold text-crevre-charcoal mb-4">
              Coming September 1st
            </h3>
            <p className="text-crevre-charcoal/80 mb-6">
              Be among the first to experience our luxury streetwear collection. Get exclusive early access to our launch.
            </p>
            <Link href="/" className="btn-primary">
              Get Early Access
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  )
}
