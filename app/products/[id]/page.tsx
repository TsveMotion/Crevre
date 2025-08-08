'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { ChevronLeftIcon, ChevronRightIcon, ShoppingCartIcon } from '@heroicons/react/24/outline'
import Header from '../../../components/Header'
import Footer from '../../../components/Footer'

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

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [email, setEmail] = useState('')
  const [emailMessage, setEmailMessage] = useState('')

  useEffect(() => {
    if (params.id) {
      fetchProductBySlug(params.id as string)
    }
  }, [params.id])

  const fetchProductBySlug = async (slug: string) => {
    try {
      const response = await fetch(`/api/products/by-slug/${slug}`)
      if (response.ok) {
        const data = await response.json()
        setProduct(data.product)
      } else {
        setError('Product not found')
      }
    } catch (err) {
      setError('Failed to load product')
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = () => {
    if (!product) return
    
    if (!product.isForSale) {
      alert('This product is coming soon! Please add your email below to get notified.')
      return
    }

    // Add to cart logic (placeholder for now)
    console.log('Adding to cart:', product)
    alert(`Added ${product.name} to cart!`)
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
          body: JSON.stringify({ 
            email,
            productInterest: product?.name 
          }),
        })
        
        setEmailMessage('Thank you! We\'ll notify you when this product becomes available.')
      } catch (error) {
        setEmailMessage('Thank you! We\'ll notify you when this product becomes available.')
      }
      
      setEmail('')
      setTimeout(() => setEmailMessage(''), 5000)
    }
  }

  const nextImage = () => {
    if (product?.images && product.images.length > 1) {
      setCurrentImageIndex((prev) => 
        prev >= product.images.length - 1 ? 0 : prev + 1
      )
    }
  }

  const prevImage = () => {
    if (product?.images && product.images.length > 1) {
      setCurrentImageIndex((prev) => 
        prev <= 0 ? product.images.length - 1 : prev - 1
      )
    }
  }

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-crevre-charcoal mx-auto"></div>
            <p className="mt-4 text-crevre-charcoal">Loading product...</p>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  if (error || !product) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-500 mb-4">{error}</p>
            <button 
              onClick={() => router.back()}
              className="text-crevre-gold hover:text-crevre-charcoal transition-colors"
            >
              ← Go Back
            </button>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <button 
            onClick={() => router.back()}
            className="flex items-center text-crevre-charcoal hover:text-crevre-gold transition-colors mb-8"
          >
            <ChevronLeftIcon className="h-5 w-5 mr-2" />
            Back to Products
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                {product.images && product.images.length > 0 ? (
                  <>
                    <Image
                      src={product.images[currentImageIndex]}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                    
                    {/* Image Navigation */}
                    {product.images.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-all"
                        >
                          <ChevronLeftIcon className="h-5 w-5 text-crevre-charcoal" />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-all"
                        >
                          <ChevronRightIcon className="h-5 w-5 text-crevre-charcoal" />
                        </button>
                      </>
                    )}

                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex space-x-2">
                      {product.trending && (
                        <div className="bg-crevre-gold text-white px-3 py-1 rounded-full text-sm font-semibold">
                          Trending
                        </div>
                      )}
                      {!product.isForSale && (
                        <div className="bg-crevre-charcoal text-white px-3 py-1 rounded-full text-sm font-semibold">
                          Preview Only
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-gray-400">No Image Available</span>
                  </div>
                )}
              </div>

              {/* Thumbnail Images */}
              {product.images && product.images.length > 1 && (
                <div className="flex space-x-2 overflow-x-auto">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden border-2 transition-all ${
                        index === currentImageIndex 
                          ? 'border-crevre-gold' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-crevre-charcoal mb-4">
                  {product.name}
                </h1>
                <p className="text-2xl font-semibold text-crevre-charcoal mb-6">
                  ${product.price}
                </p>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <div className="flex items-center space-x-4 mb-6">
                  <span className="text-sm font-medium text-gray-500">Category:</span>
                  <span className="text-sm text-crevre-charcoal bg-gray-100 px-3 py-1 rounded-full">
                    {product.category}
                  </span>
                  <span className={`text-sm px-3 py-1 rounded-full ${
                    product.inStock 
                      ? 'text-green-700 bg-green-100' 
                      : 'text-red-700 bg-red-100'
                  }`}>
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>

                {product.isForSale ? (
                  <button
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                    className={`w-full flex items-center justify-center space-x-3 px-8 py-4 rounded-lg font-medium text-lg transition-all ${
                      product.inStock
                        ? 'bg-crevre-charcoal text-white hover:bg-crevre-gold hover:text-crevre-charcoal'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <ShoppingCartIcon className="h-6 w-6" />
                    <span>{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
                  </button>
                ) : (
                  <div className="space-y-4">
                    <div className="bg-crevre-gold/10 border border-crevre-gold rounded-lg p-4">
                      <h3 className="font-semibold text-crevre-charcoal mb-2">
                        Coming Soon!
                      </h3>
                      <p className="text-sm text-crevre-charcoal/80">
                        This product is currently in preview mode. Join our launch list to be notified when it becomes available for purchase.
                      </p>
                    </div>

                    {emailMessage ? (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <p className="text-green-700 font-medium">{emailMessage}</p>
                      </div>
                    ) : (
                      <form onSubmit={handleEmailSignup} className="space-y-3">
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email to get notified"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-crevre-gold transition-colors"
                          required
                        />
                        <button
                          type="submit"
                          className="w-full bg-crevre-charcoal text-white py-3 rounded-lg hover:bg-crevre-gold hover:text-crevre-charcoal transition-all font-medium"
                        >
                          Notify Me When Available
                        </button>
                      </form>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
