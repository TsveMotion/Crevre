'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'

interface Product {
  _id: string
  name: string
  description: string
  price: number
  category: string
  status: 'active' | 'draft' | 'archived'
  saleStatus: 'for-sale' | 'preview-only'
  featured: boolean
  images: string[]
  seo: {
    title: string
    description: string
    keywords: string[]
    slug: string
  }
  createdAt: string
  updatedAt: string
}

const ProductShowcase = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [showEmailSignup, setShowEmailSignup] = useState(false)
  const [email, setEmail] = useState('')
  const [emailMessage, setEmailMessage] = useState('')

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products?status=active&limit=6')
      if (response.ok) {
        const data = await response.json()
        setProducts(data.products)
      }
    } catch (error) {
      console.error('Failed to fetch products:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product)
    if (product.saleStatus === 'preview-only') {
      setShowEmailSignup(true)
    }
  }

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email, 
          source: `product_preview_${selectedProduct?._id}` 
        }),
      })

      if (response.ok) {
        setEmailMessage('🎉 Perfect! We\'ll notify you when this drops on September 1st!')
        setEmail('')
      } else {
        setEmailMessage('Something went wrong. Please try again.')
      }
    } catch (error) {
      setEmailMessage('Something went wrong. Please try again.')
    }
  }

  const handleAddToCart = (product: Product) => {
    // Placeholder for add to cart functionality
    alert(`"${product.name}" would be added to cart! (Checkout not implemented yet)`)
  }

  const closeModal = () => {
    setSelectedProduct(null)
    setShowEmailSignup(false)
    setEmailMessage('')
    setEmail('')
  }

  if (loading) {
    return (
      <section className="section-padding py-20 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-crevre-gold border-t-transparent mx-auto"></div>
          <p className="text-crevre-charcoal/60 mt-4">Loading collection...</p>
        </div>
      </section>
    )
  }

  return (
    <section className="section-padding py-20 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-semibold text-crevre-charcoal mb-6">
            Featured Collection
          </h2>
          <p className="text-xl text-crevre-charcoal/70 max-w-2xl mx-auto font-light">
            Premium pieces crafted for those who appreciate timeless elegance and contemporary style
          </p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-crevre-charcoal/60 text-lg">No products available yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product._id}
                className="group cursor-pointer bg-crevre-ivory/30 border border-crevre-gold/20 rounded-sm overflow-hidden hover:shadow-xl transition-all duration-500 hover:scale-105"
                onClick={() => handleProductClick(product)}
              >
                {/* Product Image */}
                <div className="relative aspect-square overflow-hidden bg-crevre-ivory">
                  {product.images && product.images.length > 0 ? (
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-crevre-gold/10 to-crevre-gold/5">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-crevre-gold/20 rounded-sm flex items-center justify-center mx-auto mb-4">
                          <span className="text-2xl">👔</span>
                        </div>
                        <p className="text-crevre-charcoal/60">Preview Image</p>
                      </div>
                    </div>
                  )}
                  
                  {/* Sale Status Badge */}
                  <div className="absolute top-4 left-4">
                    {product.saleStatus === 'preview-only' ? (
                      <span className="bg-crevre-gold/90 text-white px-3 py-1 rounded-sm text-xs font-medium">
                        Preview Only
                      </span>
                    ) : (
                      <span className="bg-green-600/90 text-white px-3 py-1 rounded-sm text-xs font-medium">
                        Available Now
                      </span>
                    )}
                  </div>

                  {product.featured && (
                    <div className="absolute top-4 right-4">
                      <span className="bg-crevre-charcoal/90 text-white px-3 py-1 rounded-sm text-xs font-medium">
                        Featured
                      </span>
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <h3 className="text-xl font-display font-semibold text-crevre-charcoal mb-2 group-hover:text-crevre-gold transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-crevre-charcoal/70 text-sm mb-4 line-clamp-2 font-light">
                    {product.description || 'Premium quality piece from our exclusive collection'}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-display font-bold text-crevre-gold">
                      ${product.price}
                    </span>
                    <span className="text-xs text-crevre-charcoal/60 uppercase tracking-wide">
                      {product.category}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Product Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50" onClick={closeModal}>
          <div className="bg-white rounded-sm max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="relative">
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center text-crevre-charcoal hover:text-crevre-gold transition-all"
              >
                ×
              </button>

              {/* Product Image */}
              <div className="aspect-video bg-crevre-ivory">
                {selectedProduct.images && selectedProduct.images.length > 0 ? (
                  <img
                    src={selectedProduct.images[0]}
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-crevre-gold/20 rounded-sm flex items-center justify-center mx-auto mb-4">
                        <span className="text-3xl">👔</span>
                      </div>
                      <p className="text-crevre-charcoal/60">Preview Image</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Product Details */}
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-3xl font-display font-semibold text-crevre-charcoal mb-2">
                      {selectedProduct.name}
                    </h2>
                    <span className="text-3xl font-display font-bold text-crevre-gold">
                      ${selectedProduct.price}
                    </span>
                  </div>
                  <span className="bg-crevre-gold/10 text-crevre-gold px-4 py-2 rounded-sm text-sm font-medium">
                    {selectedProduct.category}
                  </span>
                </div>

                <p className="text-crevre-charcoal/80 mb-8 leading-relaxed">
                  {selectedProduct.description || 'Premium quality piece from our exclusive collection. Crafted with attention to detail and designed for those who appreciate timeless elegance.'}
                </p>

                {/* Action Buttons */}
                {selectedProduct.saleStatus === 'for-sale' ? (
                  <button
                    onClick={() => handleAddToCart(selectedProduct)}
                    className="w-full bg-crevre-gold hover:bg-crevre-gold-dark text-white py-4 rounded-sm font-medium text-lg transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    Add to Cart
                  </button>
                ) : (
                  <div className="space-y-6">
                    <div className="bg-crevre-gold/10 border border-crevre-gold/30 rounded-sm p-6 text-center">
                      <h3 className="text-lg font-display font-semibold text-crevre-gold mb-2">
                        🚀 Coming September 1st!
                      </h3>
                      <p className="text-crevre-charcoal/70 mb-4">
                        This item is currently in preview. Join our launch list to be notified when it becomes available!
                      </p>
                    </div>

                    {!emailMessage ? (
                      <form onSubmit={handleEmailSignup} className="flex flex-col sm:flex-row gap-4">
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email for launch notification"
                          className="flex-1 px-4 py-3 border border-crevre-gold/30 rounded-sm focus:outline-none focus:ring-2 focus:ring-crevre-gold"
                          required
                        />
                        <button
                          type="submit"
                          className="bg-crevre-gold hover:bg-crevre-gold-dark text-white px-6 py-3 rounded-sm font-medium transition-all duration-300"
                        >
                          Notify Me
                        </button>
                      </form>
                    ) : (
                      <div className="text-center py-4">
                        <p className={`font-medium ${
                          emailMessage.includes('🎉') ? 'text-green-600' : 'text-red-500'
                        }`}>
                          {emailMessage}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default ProductShowcase
