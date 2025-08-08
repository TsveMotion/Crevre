'use client'

import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import EmailSignupForm from './EmailSignupForm'

interface Product {
  id: string
  name: string
  category: string
  price: string
  description: string
  image: string
  slug: string
}

const SearchResults = () => {
  const searchParams = useSearchParams()
  const query = searchParams?.get('q') || ''
  const [searchInput, setSearchInput] = useState(query)
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])

  // Mock product data for search
  const products: Product[] = [
    {
      id: '1',
      name: 'Premium Black T-Shirt',
      category: 'T-Shirts',
      price: '£55',
      description: 'Luxury cotton blend with exclusive Crevre design',
      image: '/api/placeholder/400/400',
      slug: 't-shirts'
    },
    {
      id: '2',
      name: 'Gold Logo Hoodie',
      category: 'Hoodies',
      price: '£95',
      description: 'Premium fleece hoodie with embroidered gold logo',
      image: '/api/placeholder/400/400',
      slug: 'hoodies'
    },
    {
      id: '3',
      name: 'Streetwear Joggers',
      category: 'Joggers',
      price: '£75',
      description: 'Comfort-fit joggers with luxury finish',
      image: '/api/placeholder/400/400',
      slug: 'joggers'
    },
    {
      id: '4',
      name: 'Women\'s Cropped Hoodie',
      category: 'Women\'s',
      price: '£85',
      description: 'Exclusive women\'s collection piece',
      image: '/api/placeholder/400/400',
      slug: 'womens'
    },
    {
      id: '5',
      name: 'Limited Edition Cap',
      category: 'Accessories',
      price: '£45',
      description: 'Exclusive cap with premium materials',
      image: '/api/placeholder/400/400',
      slug: 'caps-beanies'
    },
    {
      id: '6',
      name: 'Premium Shorts',
      category: 'Shorts',
      price: '£65',
      description: 'Summer collection premium shorts',
      image: '/api/placeholder/400/400',
      slug: 'shorts'
    },
    {
      id: '7',
      name: 'Kids Exclusive Tee',
      category: 'Kids',
      price: '£35',
      description: 'Premium quality for little ones',
      image: '/api/placeholder/400/400',
      slug: 'kids'
    },
    {
      id: '8',
      name: 'Luxury Sweatshirt',
      category: 'Sweats',
      price: '£105',
      description: 'Ultimate comfort meets luxury design',
      image: '/api/placeholder/400/400',
      slug: 'sweats'
    }
  ]

  useEffect(() => {
    if (query) {
      const filtered = products.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
      )
      setFilteredProducts(filtered)
    } else {
      setFilteredProducts([])
    }
  }, [query])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchInput.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchInput.trim())}`
    }
  }

  return (
    <div className="pt-8 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-crevre-charcoal mb-6">
            Search Our <span className="text-crevre-gold">Collection</span>
          </h1>
          <p className="text-xl text-crevre-charcoal/70 mb-8">
            Discover premium streetwear pieces coming September 2024
          </p>
          
          {/* Search Form */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
            <div className="flex">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search for t-shirts, hoodies, accessories..."
                className="flex-1 px-6 py-3 border border-crevre-gray-dark rounded-l-sm focus:outline-none focus:ring-2 focus:ring-crevre-gold focus:border-crevre-gold"
              />
              <button
                type="submit"
                className="px-8 py-3 bg-crevre-gold hover:bg-crevre-gold-dark text-white font-medium rounded-r-sm transition-colors"
              >
                Search
              </button>
            </div>
          </form>
        </div>

        {/* Search Results */}
        {query && (
          <div className="mb-12">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-display font-semibold text-crevre-charcoal">
                Search Results for "{query}"
              </h2>
              <span className="text-crevre-charcoal/70">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'result' : 'results'}
              </span>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                    <div className="aspect-square bg-crevre-gray flex items-center justify-center">
                      <span className="text-4xl text-crevre-charcoal/30">👕</span>
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-display font-semibold text-crevre-charcoal mb-2">
                        {product.name}
                      </h3>
                      <p className="text-sm text-crevre-charcoal/70 mb-3">
                        {product.description}
                      </p>
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-lg font-semibold text-crevre-gold">
                          {product.price}
                        </span>
                        <span className="text-xs bg-crevre-gold/20 text-crevre-gold px-2 py-1 rounded-full">
                          {product.category}
                        </span>
                      </div>
                      <Link
                        href={`/preview/${product.slug}`}
                        className="block w-full text-center bg-crevre-charcoal hover:bg-crevre-gold text-white py-3 rounded-sm transition-colors font-medium"
                      >
                        Preview & Get Notified
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-crevre-gold/10 rounded-full flex items-center justify-center mx-auto mb-8">
                  <span className="text-4xl">🔍</span>
                </div>
                <h3 className="text-2xl font-display font-semibold text-crevre-charcoal mb-4">
                  No results found for "{query}"
                </h3>
                <p className="text-lg text-crevre-charcoal/70 mb-8 max-w-2xl mx-auto">
                  Try searching for different terms like "t-shirt", "hoodie", "women's", or "accessories". 
                  Our full collection will be available at launch.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/preview/new-arrivals"
                    className="inline-flex items-center justify-center px-8 py-3 bg-crevre-gold hover:bg-crevre-gold-dark text-white font-medium rounded-sm transition-colors"
                  >
                    Browse All Previews
                  </Link>
                  <button
                    onClick={() => setSearchInput('')}
                    className="inline-flex items-center justify-center px-8 py-3 border border-crevre-gold text-crevre-gold hover:bg-crevre-gold hover:text-white font-medium rounded-sm transition-colors"
                  >
                    Clear Search
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Popular Categories */}
        <div className="mb-16">
          <h2 className="text-3xl font-display font-bold text-crevre-charcoal text-center mb-8">
            Popular Categories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['T-Shirts', 'Hoodies', 'Women\'s', 'Accessories'].map((category) => (
              <Link
                key={category}
                href={`/search?q=${encodeURIComponent(category)}`}
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow text-center group"
              >
                <div className="text-3xl mb-4">
                  {category === 'T-Shirts' && '👕'}
                  {category === 'Hoodies' && '👘'}
                  {category === 'Women\'s' && '👗'}
                  {category === 'Accessories' && '🎒'}
                </div>
                <h3 className="font-display font-semibold text-crevre-charcoal group-hover:text-crevre-gold transition-colors">
                  {category}
                </h3>
              </Link>
            ))}
          </div>
        </div>

        {/* Email Signup CTA */}
        <div className="bg-crevre-charcoal rounded-lg p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
            Get Notified When We Launch
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Be the first to shop these exclusive pieces when they become available
          </p>
          <EmailSignupForm />
        </div>
      </div>
    </div>
  )
}

export default SearchResults
