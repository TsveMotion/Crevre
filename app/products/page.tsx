'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCartIcon } from '@heroicons/react/24/outline'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

interface Product {
  _id: string
  name: string
  description: string
  price: number
  images: string[]
  category: string
  inStock: boolean
  isForSale: boolean
  seoTitle?: string
  seoDescription?: string
  trending?: boolean
  seo: {
    title: string
    description: string
    keywords: string[]
    slug: string
  }
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products')
      if (response.ok) {
        const data = await response.json()
        setProducts(data.products || [])
      } else {
        setError('Failed to load products')
      }
    } catch (err) {
      setError('Network error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = (product: Product) => {
    if (!product.isForSale) {
      // Show email signup for preview-only products
      alert('This product is coming soon! Join our launch list to get notified.')
      return
    }
    
    // Add to cart logic (placeholder for now)
    console.log('Adding to cart:', product)
    alert(`Added ${product.name} to cart!`)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-crevre-charcoal mx-auto"></div>
            <p className="mt-4 text-crevre-charcoal">Loading products...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <p className="text-red-500">{error}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white">
        {/* Header */}
        <div className="bg-crevre-charcoal text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">All Products</h1>
              <p className="text-xl text-gray-300">Discover our premium fashion collections</p>
            </div>
          </div>
        </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No products available yet.</p>
            <p className="text-gray-500 mt-2">Check back soon for our latest collections!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <Link key={product._id} href={`/products/${product.seo.slug}`} className="group">
                <div className="relative bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                  {/* Product Image */}
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
                        <span className="text-gray-400">No Image</span>
                      </div>
                    )}
                    
                    {/* Trending Badge */}
                    {product.trending && (
                      <div className="absolute top-3 left-3 bg-crevre-gold text-white px-2 py-1 rounded-full text-xs font-semibold">
                        Trending
                      </div>
                    )}
                    
                    {/* Preview Only Badge */}
                    {!product.isForSale && (
                      <div className="absolute top-3 right-3 bg-crevre-charcoal text-white px-2 py-1 rounded-full text-xs font-semibold">
                        Preview
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-crevre-charcoal mb-2 group-hover:text-crevre-gold transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {product.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-xl font-bold text-crevre-charcoal">
                          ${product.price}
                        </span>
                        {product.inStock ? (
                          <span className="text-green-600 text-sm">In Stock</span>
                        ) : (
                          <span className="text-red-500 text-sm">Out of Stock</span>
                        )}
                      </div>
                      
                      <button
                        onClick={() => handleAddToCart(product)}
                        disabled={!product.inStock}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                          product.inStock
                            ? 'bg-crevre-charcoal text-white hover:bg-crevre-gold'
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        <ShoppingCartIcon className="h-4 w-4" />
                        <span className="text-sm">
                          {product.isForSale ? 'Add to Cart' : 'Notify Me'}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      </div>
      <Footer />
    </>
  )
}
