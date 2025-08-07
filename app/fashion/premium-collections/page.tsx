import React from 'react'
import type { Metadata } from 'next'
import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Premium Collections | Exclusive Designer Fashion - Crevre',
  description: 'Explore Crevre\'s premium collections. Exclusive designer pieces and luxury fashion for discerning individuals who appreciate exceptional quality.',
  keywords: 'premium collections, exclusive fashion, designer pieces, luxury clothing, high-end fashion, premium garments, exclusive designer wear',
}

export default function PremiumCollectionsPage() {
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
              <span>Premium Collections</span>
            </div>
          </nav>

          <h1 className="text-4xl sm:text-5xl font-display font-semibold text-crevre-charcoal mb-6">
            Premium <span className="text-crevre-gold">Collections</span>
          </h1>
          
          <p className="text-xl text-crevre-charcoal/80 mb-12 leading-relaxed">
            Curated exclusively for those who demand excellence. Our premium collections represent the pinnacle of contemporary fashion, combining exceptional craftsmanship with timeless design.
          </p>

          <div className="space-y-12 mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-2xl font-display font-semibold text-crevre-charcoal mb-4">Exceptional Craftsmanship</h2>
                <p className="text-crevre-charcoal/70">
                  Each piece in our premium collections is meticulously crafted by skilled artisans, ensuring every detail meets our exacting standards of quality and design.
                </p>
              </div>
              <div className="aspect-square bg-crevre-ivory rounded-sm"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <div className="aspect-square bg-crevre-ivory rounded-sm"></div>
              </div>
              <div className="order-1 md:order-2">
                <h2 className="text-2xl font-display font-semibold text-crevre-charcoal mb-4">Limited Editions</h2>
                <p className="text-crevre-charcoal/70">
                  Our premium collections feature limited edition pieces, ensuring exclusivity for our discerning clientele who appreciate rare and unique fashion.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-crevre-ivory border border-crevre-gold/20 rounded-sm p-8 text-center">
            <h3 className="text-2xl font-display font-semibold text-crevre-charcoal mb-4">
              Exclusive Access
            </h3>
            <p className="text-crevre-charcoal/80 mb-6">
              Join our exclusive list to receive first access to new premium collections and limited edition releases.
            </p>
            <Link href="/" className="btn-primary">
              Request Access
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  )
}
