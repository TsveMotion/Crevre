import React from 'react'
import type { Metadata } from 'next'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Premium Fashion Collection | Luxury Streetwear & Contemporary Elegance - Crevre',
  description: 'Discover Crevre\'s premium fashion collection. Luxury streetwear, contemporary elegance, and timeless pieces for the modern fashion enthusiast.',
  keywords: 'premium fashion, luxury streetwear, contemporary fashion, high-end clothing, designer fashion, exclusive collection, timeless elegance',
}

export default function FashionPage() {
  return (
    <main className="min-h-screen bg-crevre-white">
      <Header />
      
      <section className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl sm:text-6xl font-display font-semibold text-crevre-charcoal mb-6 text-center">
            Premium <span className="text-crevre-gold">Fashion</span>
          </h1>
          <p className="text-xl text-crevre-charcoal/80 max-w-3xl mx-auto text-center mb-12">
            Explore our curated collection of luxury streetwear and contemporary pieces that define modern elegance.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link href="/fashion/luxury-streetwear">
              <div className="bg-crevre-ivory border border-crevre-gold/20 rounded-sm p-8 hover:shadow-xl transition-all">
                <h2 className="text-2xl font-display font-semibold text-crevre-charcoal mb-4">Luxury Streetwear</h2>
                <p className="text-crevre-charcoal/70">Premium streetwear that combines comfort with sophisticated design.</p>
              </div>
            </Link>
            
            <Link href="/fashion/premium-collections">
              <div className="bg-crevre-ivory border border-crevre-gold/20 rounded-sm p-8 hover:shadow-xl transition-all">
                <h2 className="text-2xl font-display font-semibold text-crevre-charcoal mb-4">Premium Collections</h2>
                <p className="text-crevre-charcoal/70">Exclusive pieces crafted for those who appreciate timeless elegance.</p>
              </div>
            </Link>
            
            <Link href="/fashion/contemporary-elegance">
              <div className="bg-crevre-ivory border border-crevre-gold/20 rounded-sm p-8 hover:shadow-xl transition-all">
                <h2 className="text-2xl font-display font-semibold text-crevre-charcoal mb-4">Contemporary Elegance</h2>
                <p className="text-crevre-charcoal/70">Modern designs that redefine contemporary fashion standards.</p>
              </div>
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  )
}
