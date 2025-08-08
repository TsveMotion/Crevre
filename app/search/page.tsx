import React, { Suspense } from 'react'
import { Metadata } from 'next'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import SearchResults from '../../components/SearchResults'

export const metadata: Metadata = {
  title: 'Search Results - Crevre Premium Fashion | Find Luxury Streetwear',
  description: 'Search through our exclusive collection of premium streetwear and luxury fashion pieces. Find the perfect clothing previews and get notified when they launch.',
  keywords: 'Crevre search, premium streetwear search, luxury clothing finder, fashion search, exclusive collection',
  robots: 'index, follow',
  authors: [{ name: 'Crevre Fashion' }],
  openGraph: {
    title: 'Search Results - Crevre Premium Fashion',
    description: 'Search through our exclusive collection of premium streetwear and luxury fashion pieces.',
    type: 'website',
    url: 'https://crevre.com/search',
    images: [
      {
        url: '/LogoLong2.png',
        width: 1200,
        height: 630,
        alt: 'Crevre Premium Fashion Logo'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Search Results - Crevre Premium Fashion',
    description: 'Search through our exclusive collection of premium streetwear and luxury fashion pieces.',
    images: ['/LogoLong2.png']
  }
}

const SearchPage = () => {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-crevre-white">
        <Suspense fallback={
          <div className="pt-8 pb-16">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-2 border-crevre-gold border-t-transparent mx-auto mb-4"></div>
                <p className="text-crevre-charcoal/70">Searching our collection...</p>
              </div>
            </div>
          </div>
        }>
          <SearchResults />
        </Suspense>
      </main>
      <Footer />
    </>
  )
}

export default SearchPage
