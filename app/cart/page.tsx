'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Head from 'next/head'

// Cart item type
type CartItem = {
  id: string
  name: string
  price: number
  quantity: number
  size: string
  color: string
  image: string
  category: string
}

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [message, setMessage] = useState('')

  // Sample items for demo (in real app, these would come from product pages)
  const sampleItems: CartItem[] = [
    {
      id: '1',
      name: 'Premium CREVRE T-Shirt',
      price: 55,
      quantity: 1,
      size: 'L',
      color: 'Black',
      image: '/api/placeholder/300/400',
      category: 'T-Shirts'
    },
    {
      id: '2',
      name: 'Luxury Oversized Hoodie',
      price: 95,
      quantity: 2,
      size: 'M',
      color: 'Charcoal',
      image: '/api/placeholder/300/400',
      category: 'Hoodies'
    }
  ]

  // Load cart on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('crevre_cart')
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart))
      } catch (e) {
        // If there's an error, populate with sample items for demo
        setCartItems(sampleItems)
        localStorage.setItem('crevre_cart', JSON.stringify(sampleItems))
      }
    } else {
      // For demo purposes, add sample items
      setCartItems(sampleItems)
      localStorage.setItem('crevre_cart', JSON.stringify(sampleItems))
    }
    setIsLoading(false)
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (cartItems.length >= 0) {
      localStorage.setItem('crevre_cart', JSON.stringify(cartItems))
    }
  }, [cartItems])

  // Update item quantity
  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id)
      return
    }
    setCartItems(items => 
      items.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    )
  }

  // Remove item from cart
  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id))
    setMessage('Item removed from cart')
    setTimeout(() => setMessage(''), 3000)
  }

  // Clear entire cart
  const clearCart = () => {
    setCartItems([])
    setMessage('Cart cleared')
    setTimeout(() => setMessage(''), 3000)
  }

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shipping = subtotal >= 65 ? 0 : 5.99
  const total = subtotal + shipping

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  if (isLoading) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-white flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-crevre-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-crevre-charcoal">Loading your cart...</p>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Head>
        <title>Shopping Cart ({totalItems}) - CREVRE Premium Fashion</title>
        <meta name="description" content="Your CREVRE shopping cart. Complete your order of premium fashion pieces and exclusive streetwear collections." />
        <meta name="keywords" content="CREVRE cart, shopping bag, premium fashion, checkout, luxury clothing" />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <Header />
      <main className="min-h-screen bg-white">
        {/* Header Section */}
        <section className="pt-24 pb-8 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-light text-crevre-charcoal mb-4 tracking-tight">
                Shopping Cart
              </h1>
              <div className="w-20 h-1 bg-crevre-gold mx-auto mb-6"></div>
              <p className="text-lg text-crevre-charcoal/70 max-w-2xl mx-auto">
                {totalItems > 0 ? `${totalItems} item${totalItems !== 1 ? 's' : ''} in your cart` : 'Your cart is empty'}
              </p>
            </div>

            {/* Success/Error Messages */}
            {message && (
              <div className="max-w-md mx-auto mb-8">
                <div className="bg-crevre-gold/10 border border-crevre-gold/30 text-crevre-charcoal px-4 py-3 rounded-sm text-center">
                  {message}
                </div>
              </div>
            )}
          </div>
        </section>

        {cartItems.length === 0 ? (
          // Empty Cart State
          <section className="pb-20 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <div className="bg-white rounded-lg p-12 shadow-lg border border-gray-200">
                <div className="w-24 h-24 bg-crevre-gold/10 rounded-full flex items-center justify-center mx-auto mb-8">
                  <span className="text-4xl">🛍️</span>
                </div>
                
                <h2 className="text-3xl font-light text-crevre-charcoal mb-4 tracking-tight">
                  Your bag is ready for luxury
                </h2>
                
                <p className="text-lg text-crevre-charcoal/70 mb-8 max-w-2xl mx-auto">
                  Discover our exclusive premium collection and fill your bag with luxury streetwear pieces.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link 
                    href="/"
                    className="inline-flex items-center justify-center px-8 py-3 bg-crevre-charcoal hover:bg-crevre-gold text-white hover:text-crevre-charcoal font-medium rounded-sm transition-all duration-300 uppercase tracking-wider"
                  >
                    Start Shopping
                  </Link>
                  <Link 
                    href="/account"
                    className="inline-flex items-center justify-center px-8 py-3 border border-crevre-charcoal text-crevre-charcoal hover:bg-crevre-charcoal hover:text-white font-medium rounded-sm transition-all duration-300 uppercase tracking-wider"
                  >
                    My Account
                  </Link>
                </div>
              </div>
            </div>
          </section>
        ) : (
          // Cart with Items
          <section className="pb-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-3 gap-12">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-medium text-crevre-charcoal tracking-wide">Cart Items</h2>
                    <button 
                      onClick={clearCart}
                      className="text-crevre-charcoal/60 hover:text-red-600 transition-colors text-sm underline"
                    >
                      Clear Cart
                    </button>
                  </div>

                  {cartItems.map((item) => (
                    <div key={item.id} className="bg-white border border-gray-200 rounded-sm p-6 shadow-sm">
                      <div className="flex gap-6">
                        {/* Product Image */}
                        <div className="w-24 h-32 bg-gray-100 rounded-sm flex-shrink-0 overflow-hidden">
                          <img 
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="text-lg font-medium text-crevre-charcoal">{item.name}</h3>
                              <p className="text-sm text-crevre-charcoal/60">{item.category}</p>
                            </div>
                            <button 
                              onClick={() => removeItem(item.id)}
                              className="text-crevre-charcoal/40 hover:text-red-600 transition-colors"
                              title="Remove item"
                            >
                              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>

                          <div className="flex items-center gap-4 mb-4">
                            <span className="text-sm text-crevre-charcoal/60">Size: {item.size}</span>
                            <span className="text-sm text-crevre-charcoal/60">Color: {item.color}</span>
                          </div>

                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                              <span className="text-sm text-crevre-charcoal/60">Qty:</span>
                              <div className="flex items-center border border-gray-300 rounded-sm">
                                <button 
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="px-3 py-1 text-crevre-charcoal hover:bg-gray-100 transition-colors"
                                  disabled={item.quantity <= 1}
                                >
                                  -
                                </button>
                                <span className="px-4 py-1 text-center min-w-[50px] text-crevre-charcoal">
                                  {item.quantity}
                                </span>
                                <button 
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="px-3 py-1 text-crevre-charcoal hover:bg-gray-100 transition-colors"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-lg font-medium text-crevre-charcoal">
                                £{(item.price * item.quantity).toFixed(2)}
                              </div>
                              <div className="text-sm text-crevre-charcoal/60">
                                £{item.price.toFixed(2)} each
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                  <div className="bg-gray-50 rounded-sm p-6 sticky top-6">
                    <h2 className="text-xl font-medium text-crevre-charcoal mb-6 tracking-wide">Order Summary</h2>
                    
                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between">
                        <span className="text-crevre-charcoal/70">Subtotal</span>
                        <span className="text-crevre-charcoal">£{subtotal.toFixed(2)}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-crevre-charcoal/70">Shipping</span>
                        <span className="text-crevre-charcoal">
                          {shipping === 0 ? 'Free' : `£${shipping.toFixed(2)}`}
                        </span>
                      </div>
                      
                      {subtotal < 65 && (
                        <div className="text-xs text-crevre-charcoal/60 bg-crevre-gold/10 p-3 rounded-sm">
                          Spend £{(65 - subtotal).toFixed(2)} more for free delivery
                        </div>
                      )}
                      
                      <div className="border-t border-gray-300 pt-4">
                        <div className="flex justify-between text-lg font-medium">
                          <span className="text-crevre-charcoal">Total</span>
                          <span className="text-crevre-charcoal">£{total.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>

                    <button className="w-full px-6 py-4 bg-crevre-charcoal hover:bg-crevre-gold text-white hover:text-crevre-charcoal font-medium transition-all duration-300 uppercase tracking-wider text-sm rounded-sm mb-4">
                      Proceed to Checkout
                    </button>
                    
                    <Link 
                      href="/"
                      className="w-full block text-center px-6 py-4 border border-crevre-charcoal text-crevre-charcoal hover:bg-crevre-charcoal hover:text-white font-medium transition-all duration-300 uppercase tracking-wider text-sm rounded-sm"
                    >
                      Continue Shopping
                    </Link>

                    {/* Security Features */}
                    <div className="mt-8 pt-6 border-t border-gray-300">
                      <h3 className="text-sm font-medium text-crevre-charcoal mb-4">Secure Checkout</h3>
                      <div className="space-y-2 text-xs text-crevre-charcoal/60">
                        <div className="flex items-center gap-2">
                          <span>🔒</span>
                          <span>256-bit SSL encryption</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span>🚚</span>
                          <span>Free delivery over £65</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span>↩️</span>
                          <span>30-day return policy</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Features Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-light text-crevre-charcoal mb-4 tracking-tight">Why Shop CREVRE</h2>
              <div className="w-16 h-1 bg-crevre-gold mx-auto"></div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
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
                  <span className="text-2xl text-white group-hover:text-crevre-charcoal transition-colors duration-300">🔒</span>
                </div>
                <h3 className="text-xl font-medium text-crevre-charcoal mb-4 tracking-wide">Secure Checkout</h3>
                <p className="text-crevre-charcoal/70 leading-relaxed">
                  Your payment information is protected with industry-leading security measures.
                </p>
              </div>
              
              <div className="text-center group">
                <div className="w-16 h-16 bg-crevre-charcoal group-hover:bg-crevre-gold rounded-sm flex items-center justify-center mx-auto mb-6 transition-colors duration-300">
                  <span className="text-2xl text-white group-hover:text-crevre-charcoal transition-colors duration-300">↩️</span>
                </div>
                <h3 className="text-xl font-medium text-crevre-charcoal mb-4 tracking-wide">Easy Returns</h3>
                <p className="text-crevre-charcoal/70 leading-relaxed">
                  30-day hassle-free returns with full refund guarantee for complete peace of mind.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default CartPage
