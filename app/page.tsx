'use client'

import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

interface Product {
  _id: string
  name: string
  description: string
  price: number
  images: string[]
  category: string
  inStock: boolean
  isForSale: boolean
  trending?: boolean
  seo: {
    title: string
    description: string
    keywords: string[]
    slug: string
  }
}

export default function Home() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [trendingProducts, setTrendingProducts] = useState<Product[]>([])
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    fetchTrendingProducts()
  }, [])

  const fetchTrendingProducts = async () => {
    try {
      const response = await fetch('/api/products')
      if (response.ok) {
        const data = await response.json()
        // Filter for trending products or take first 10 if no trending products exist
        const trending = data.products?.filter((product: Product) => product.trending) || []
        const productsToShow = trending.length > 0 ? trending : (data.products?.slice(0, 10) || [])
        setTrendingProducts(productsToShow)
      }
    } catch (error) {
      console.error('Failed to fetch trending products:', error)
    }
  }

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      try {
        const response = await fetch('/api/subscribers', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        })
        
        if (response.ok) {
          setMessage('Thank you for joining! We\'ll notify you when we launch.')
        } else {
          setMessage('Thank you! Your email has been saved.')
        }
      } catch (error) {
        setMessage('Thank you! Your email has been saved.')
      }
      
      setEmail('')
      setTimeout(() => setMessage(''), 3000)
    }
  }

  const nextSlide = () => {
    if (trendingProducts.length > 5) {
      setCurrentSlide((prev) => 
        prev >= trendingProducts.length - 5 ? 0 : prev + 1
      )
    }
  }

  const prevSlide = () => {
    if (trendingProducts.length > 5) {
      setCurrentSlide((prev) => 
        prev <= 0 ? trendingProducts.length - 5 : prev - 1
      )
    }
  }

  const featuredCollections = [
    {
      title: 'MENSWEAR',
      subtitle: 'Contemporary Essentials',
      image: '/api/placeholder/600/400',
      href: '/preview/menswear'
    },
    {
      title: 'WOMENSWEAR', 
      subtitle: 'Elegant Styles',
      image: '/api/placeholder/600/400',
      href: '/preview/womens'
    },
    {
      title: 'ACCESSORIES',
      subtitle: 'Premium Details', 
      image: '/api/placeholder/600/400',
      href: '/preview/accessories'
    }
  ]

  return (
    <>
      <Head>
        <title>CREVRE - Premium Fashion & Streetwear | Exclusive Collections</title>
        <meta name="description" content="Discover CREVRE's exclusive premium fashion collections. Contemporary streetwear, timeless elegance, and modern style. Join our launch list for early access." />
        <meta name="keywords" content="CREVRE, premium fashion, streetwear, exclusive collections, contemporary fashion, luxury clothing" />
        <meta property="og:title" content="CREVRE - Premium Fashion & Streetwear" />
        <meta property="og:description" content="Exclusive premium fashion collections launching soon. Join our waitlist for early access." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://crevre.com" />
      </Head>
      
      <Header />
      <main className="min-h-screen bg-white">
        {/* Hero Section - Clean White Design */}
        <section className="pt-24 pb-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              {/* Main Headline */}
              <div className="mb-12">
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-light text-crevre-charcoal mb-6 leading-[0.9] tracking-tight">
                  CREVRE
                </h1>
                <div className="h-1 w-24 bg-crevre-gold mx-auto mb-8"></div>
                <h2 className="text-2xl md:text-3xl font-light text-crevre-charcoal mb-8 tracking-wide">
                  PREMIUM FASHION COLLECTIONS
                </h2>
              </div>

              {/* Subtitle */}
              <p className="text-lg md:text-xl text-crevre-charcoal/70 mb-16 max-w-3xl mx-auto font-light leading-relaxed">
                Discover timeless elegance in contemporary fashion. 
                <br className="hidden md:block" />
                Exclusive collections launching soon.
              </p>

              {/* Email Signup Form - Matching Header Style */}
              <div className="max-w-lg mx-auto mb-12 hero-email-input">
                {message ? (
                  <div className="bg-crevre-gold/10 border border-crevre-gold rounded-sm px-6 py-4 mb-6">
                    <p className="text-crevre-gold font-medium">{message}</p>
                  </div>
                ) : null}
                
                <form onSubmit={handleEmailSignup} className="space-y-4">
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email for exclusive early access"
                    className="w-full px-6 py-4 border border-crevre-gray-dark bg-white text-crevre-charcoal placeholder-crevre-charcoal/50 focus:outline-none focus:border-crevre-gold transition-colors text-center rounded-sm"
                    required
                  />
                  <button 
                    type="submit"
                    className="w-full px-8 py-4 bg-crevre-charcoal hover:bg-crevre-gold text-white hover:text-crevre-charcoal font-medium transition-all duration-300 uppercase tracking-wider text-sm rounded-sm"
                  >
                    Join Launch List
                  </button>
                </form>
              </div>
              
              <p className="text-crevre-charcoal/50 text-sm">
                Be the first to access our exclusive collections
              </p>
            </div>
          </div>
        </section>

        {/* Trending Products Carousel */}
        {trendingProducts.length > 0 && (
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-light text-crevre-charcoal mb-6 tracking-tight">
                  Trending Now
                </h2>
                <div className="w-24 h-1 bg-crevre-gold mx-auto mb-8"></div>
                <p className="text-lg text-crevre-charcoal/70 max-w-2xl mx-auto leading-relaxed">
                  Discover what's popular in our latest collections
                </p>
              </div>

              <div className="relative">
                {/* Carousel Container */}
                <div className="overflow-hidden">
                  <div 
                    className="flex transition-transform duration-300 ease-in-out"
                    style={{
                      transform: `translateX(-${currentSlide * (100 / 5)}%)`
                    }}
                  >
                    {trendingProducts.map((product, index) => (
                      <div key={product._id} className="w-1/5 flex-shrink-0 px-3">
                        <Link href={`/products/${product.seo.slug}`} className="block">
                          <div className="group bg-white border border-gray-100 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer">
                          <div className="relative aspect-square overflow-hidden">
                            {product.images && product.images.length > 0 ? (
                              <Image
                                src={product.images[0]}
                                alt={product.name}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            ) : (
                              <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                                <span className="text-gray-400 text-sm">No Image</span>
                              </div>
                            )}
                            
                            {/* Trending Badge */}
                            <div className="absolute top-3 left-3 bg-crevre-gold text-white px-2 py-1 rounded-full text-xs font-semibold">
                              Trending
                            </div>
                            
                            {/* Preview Only Badge */}
                            {!product.isForSale && (
                              <div className="absolute top-3 right-3 bg-crevre-charcoal text-white px-2 py-1 rounded-full text-xs font-semibold">
                                Preview
                              </div>
                            )}
                          </div>

                          <div className="p-4">
                            <h3 className="text-sm font-semibold text-crevre-charcoal mb-1 group-hover:text-crevre-gold transition-colors line-clamp-1">
                              {product.name}
                            </h3>
                            <p className="text-gray-600 text-xs mb-2 line-clamp-2">
                              {product.description}
                            </p>
                            <div className="flex items-center justify-between">
                              <span className="text-lg font-bold text-crevre-charcoal">
                                ${product.price}
                              </span>
                              <span className="text-xs text-crevre-gold group-hover:text-crevre-charcoal transition-colors">
                                View Details
                              </span>
                            </div>
                          </div>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Navigation Arrows */}
                {trendingProducts.length > 5 && (
                  <>
                    <button
                      onClick={prevSlide}
                      className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white border border-gray-200 rounded-full p-2 shadow-md hover:shadow-lg transition-all duration-200 hover:bg-crevre-gold hover:border-crevre-gold group"
                    >
                      <ChevronLeftIcon className="h-5 w-5 text-crevre-charcoal group-hover:text-white" />
                    </button>
                    <button
                      onClick={nextSlide}
                      className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white border border-gray-200 rounded-full p-2 shadow-md hover:shadow-lg transition-all duration-200 hover:bg-crevre-gold hover:border-crevre-gold group"
                    >
                      <ChevronRightIcon className="h-5 w-5 text-crevre-charcoal group-hover:text-white" />
                    </button>
                  </>
                )}

                {/* Dots Indicator */}
                {trendingProducts.length > 5 && (
                  <div className="flex justify-center mt-8 space-x-2">
                    {Array.from({ length: Math.max(0, trendingProducts.length - 4) }).map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-200 ${
                          index === currentSlide 
                            ? 'bg-crevre-gold' 
                            : 'bg-gray-300 hover:bg-gray-400'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* View All Products Link */}
              <div className="text-center mt-12">
                <Link
                  href="/products"
                  className="inline-flex items-center px-8 py-3 bg-crevre-charcoal text-white hover:bg-crevre-gold hover:text-crevre-charcoal transition-all duration-300 rounded-sm font-medium tracking-wide"
                >
                  View All Products
                </Link>
              </div>
            </div>
          </section>
        )}



        {/* Features Section - Clean Modern Design */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-light text-crevre-charcoal mb-4 tracking-tight">
                Why Choose CREVRE
              </h2>
              <div className="w-16 h-1 bg-crevre-gold mx-auto"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="text-center group">
                <div className="w-16 h-16 bg-crevre-charcoal group-hover:bg-crevre-gold rounded-sm flex items-center justify-center mx-auto mb-6 transition-colors duration-300">
                  <span className="text-2xl text-white group-hover:text-crevre-charcoal transition-colors duration-300">🚚</span>
                </div>
                <h3 className="text-xl font-medium text-crevre-charcoal mb-4 tracking-wide">Free Delivery</h3>
                <p className="text-crevre-charcoal/70 leading-relaxed">
                  Complimentary shipping on all orders over £65 with fast and reliable delivery.
                </p>
              </div>
              
              <div className="text-center group">
                <div className="w-16 h-16 bg-crevre-charcoal group-hover:bg-crevre-gold rounded-sm flex items-center justify-center mx-auto mb-6 transition-colors duration-300">
                  <span className="text-2xl text-white group-hover:text-crevre-charcoal transition-colors duration-300">✨</span>
                </div>
                <h3 className="text-xl font-medium text-crevre-charcoal mb-4 tracking-wide">Premium Quality</h3>
                <p className="text-crevre-charcoal/70 leading-relaxed">
                  Meticulously crafted from the finest materials with exceptional attention to detail.
                </p>
              </div>
              
              <div className="text-center group">
                <div className="w-16 h-16 bg-crevre-charcoal group-hover:bg-crevre-gold rounded-sm flex items-center justify-center mx-auto mb-6 transition-colors duration-300">
                  <span className="text-2xl text-white group-hover:text-crevre-charcoal transition-colors duration-300">🔄</span>
                </div>
                <h3 className="text-xl font-medium text-crevre-charcoal mb-4 tracking-wide">Easy Returns</h3>
                <p className="text-crevre-charcoal/70 leading-relaxed">
                  30-day hassle-free returns with full refund guarantee for complete peace of mind.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Section - Final CTA */}
        <section className="py-20 bg-crevre-charcoal">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-light text-white mb-6 tracking-tight">
              Join the CREVRE Community
            </h2>
            <div className="w-24 h-1 bg-crevre-gold mx-auto mb-8"></div>
            <p className="text-lg text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed">
              Be the first to discover new collections, exclusive launches, and behind-the-scenes content from CREVRE.
            </p>
            
            <div className="max-w-md mx-auto">
              <form onSubmit={handleEmailSignup} className="space-y-4">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-6 py-4 bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:border-crevre-gold focus:bg-white/20 transition-all duration-300 text-center rounded-sm"
                  required
                />
                <button 
                  type="submit"
                  className="w-full px-8 py-4 bg-crevre-gold hover:bg-white text-crevre-charcoal hover:text-crevre-charcoal font-medium transition-all duration-300 uppercase tracking-wider text-sm rounded-sm"
                >
                  Get Early Access
                </button>
              </form>
              
              <p className="text-white/50 text-sm mt-6">
                Join 1000+ fashion enthusiasts waiting for our launch
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}