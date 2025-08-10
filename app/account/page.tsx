'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Head from 'next/head'

// User data type
type User = {
  id: string
  email: string
  firstName: string
  lastName: string
  joinedAt: string
  isAdmin: boolean
}

// Database User type
type DatabaseUser = {
  _id: string
  firstName: string
  lastName: string
  email: string
  isAdmin: boolean
  createdAt: string
  updatedAt: string
}

// Admin data types
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

interface Subscriber {
  _id: string
  email: string
  subscribedAt: string
  status: 'active' | 'unsubscribed'
  source: string
}

const AccountPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showLogin, setShowLogin] = useState(true)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    confirmPassword: ''
  })
  const [formErrors, setFormErrors] = useState<string[]>([])
  const [formMessage, setFormMessage] = useState('')

  // Admin and user management state
  const [showAdminDashboard, setShowAdminDashboard] = useState(false)
  const [activeAdminTab, setActiveAdminTab] = useState<'products' | 'subscribers' | 'users'>('products')
  const [products, setProducts] = useState<Product[]>([])
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [filteredSubscribers, setFilteredSubscribers] = useState<Subscriber[]>([])
  const [users, setUsers] = useState<DatabaseUser[]>([])
  const [filteredUsers, setFilteredUsers] = useState<DatabaseUser[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [adminLoading, setAdminLoading] = useState(false)
  const [showProductForm, setShowProductForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  // Product form state
  const [productForm, setProductForm] = useState<{
    name: string;
    description: string;
    price: string;
    category: string;
    status: 'active' | 'draft' | 'archived';
    saleStatus: 'for-sale' | 'preview-only';
    featured: boolean;
    images: string[];
    seo: {
      title: string;
      description: string;
      keywords: string;
      slug: string;
    };
  }>({
    name: '',
    description: '',
    price: '',
    category: 'clothing',
    status: 'draft',
    saleStatus: 'preview-only',
    featured: false,
    images: [],
    seo: {
      title: '',
      description: '',
      keywords: '',
      slug: ''
    }
  })

  // Admin credentials from env
  const adminCredentials = {
    username: 'crevre@crevre.com',
    password: 'crevre'
  }

  // Check if user is already logged in on mount
  useEffect(() => {
    const checkAuthStatus = () => {
      const userData = localStorage.getItem('crevre_user')
      if (userData) {
        try {
          const user = JSON.parse(userData)
          setCurrentUser(user)
          setIsLoggedIn(true)
        } catch (e) {
          localStorage.removeItem('crevre_user')
        }
      }
      setIsLoading(false)
    }
    checkAuthStatus()
  }, [])

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setFormErrors([])
  }

  // Validate form
  const validateForm = () => {
    const errors: string[] = []
    
    if (!formData.email) errors.push('Email is required')
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.push('Email is invalid')
    
    if (!formData.password) errors.push('Password is required')
    else if (formData.password.length < 6) errors.push('Password must be at least 6 characters')
    
    if (!showLogin) {
      if (!formData.firstName) errors.push('First name is required')
      if (!formData.lastName) errors.push('Last name is required')
      if (formData.password !== formData.confirmPassword) errors.push('Passwords do not match')
    }
    
    setFormErrors(errors)
    return errors.length === 0
  }

  // Handle login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setFormErrors([])
    setFormMessage('')
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      })

      const data = await response.json()

      if (response.ok) {
        // Store user session
        localStorage.setItem('crevre_user', JSON.stringify(data.user))
        setCurrentUser(data.user)
        setIsLoggedIn(true)
        setFormMessage(data.user.isAdmin ? 'Welcome back, Admin!' : 'Welcome back!')
        
        // Clear form
        setFormData({
          email: '',
          password: '',
          firstName: '',
          lastName: '',
          confirmPassword: ''
        })
      } else {
        setFormErrors([data.error || 'Login failed'])
      }
    } catch (error) {
      console.error('Login error:', error)
      setFormErrors(['Network error. Please try again.'])
    }
  }

  // Handle signup
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setFormErrors([])
    setFormMessage('')
    
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password
        })
      })

      const data = await response.json()

      if (response.ok) {
        // Store user session
        localStorage.setItem('crevre_user', JSON.stringify(data.user))
        setCurrentUser(data.user)
        setIsLoggedIn(true)
        setFormMessage('Account created successfully! Welcome to CREVRE.')
        
        // Clear form
        setFormData({
          email: '',
          password: '',
          firstName: '',
          lastName: '',
          confirmPassword: ''
        })
      } else {
        setFormErrors([data.error || 'Signup failed'])
      }
    } catch (error) {
      console.error('Signup error:', error)
      setFormErrors(['Network error. Please try again.'])
    }
  }

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('crevre_user')
    setCurrentUser(null)
    setIsLoggedIn(false)
    setFormData({
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      confirmPassword: ''
    })
    setFormMessage('You have been logged out successfully.')
  }

  // Admin useEffects
  useEffect(() => {
    if (currentUser?.isAdmin && showAdminDashboard) {
      if (activeAdminTab === 'products') {
        fetchProducts()
      } else if (activeAdminTab === 'subscribers') {
        fetchSubscribers()
      } else if (activeAdminTab === 'users') {
        fetchUsers()
      }
    }
  }, [activeAdminTab, currentUser, showAdminDashboard])
  
  // Filter subscribers and users when search query changes
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredSubscribers(subscribers)
      setFilteredUsers(users)
    } else {
      const query = searchQuery.toLowerCase()
      const filteredSubs = subscribers.filter(subscriber => 
        subscriber.email.toLowerCase().includes(query) ||
        subscriber.source.toLowerCase().includes(query) ||
        subscriber.status.toLowerCase().includes(query)
      )
      setFilteredSubscribers(filteredSubs)
      
      const filteredUsrs = users.filter(user => 
        user.email.toLowerCase().includes(query) ||
        user.firstName.toLowerCase().includes(query) ||
        user.lastName.toLowerCase().includes(query)
      )
      setFilteredUsers(filteredUsrs)
    }
  }, [searchQuery, subscribers, users])

  // Admin functions
  const fetchProducts = async () => {
    setAdminLoading(true)
    try {
      const response = await fetch('/api/products')
      if (response.ok) {
        const data = await response.json()
        setProducts(data.products)
      }
    } catch (error) {
      console.error('Failed to fetch products:', error)
    }
    setAdminLoading(false)
  }

  const fetchSubscribers = async () => {
    setAdminLoading(true)
    try {
      const response = await fetch('/api/subscribers')
      if (response.ok) {
        const data = await response.json()
        setSubscribers(data.subscribers)
        setFilteredSubscribers(data.subscribers)
      }
    } catch (error) {
      console.error('Failed to fetch subscribers:', error)
    }
    setAdminLoading(false)
  }

  const fetchUsers = async () => {
    setAdminLoading(true)
    try {
      const response = await fetch('/api/users')
      if (response.ok) {
        const data = await response.json()
        setUsers(data.users)
        setFilteredUsers(data.users)
      }
    } catch (error) {
      console.error('Failed to fetch users:', error)
    }
    setAdminLoading(false)
  }

  const deleteSubscriber = async (subscriberId: string) => {
    if (!confirm('Are you sure you want to delete this subscriber?')) return
    
    try {
      const response = await fetch(`/api/subscribers/${subscriberId}`, {
        method: 'DELETE'
      })
      
      if (response.ok) {
        // Refresh subscribers list
        fetchSubscribers()
        alert('Subscriber deleted successfully')
      } else {
        alert('Failed to delete subscriber')
      }
    } catch (error) {
      console.error('Failed to delete subscriber:', error)
      alert('Failed to delete subscriber')
    }
  }

  const deleteUser = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return
    
    try {
      const response = await fetch(`/api/users?id=${userId}`, {
        method: 'DELETE'
      })
      
      if (response.ok) {
        // Refresh users list
        fetchUsers()
        alert('User deleted successfully')
      } else {
        alert('Failed to delete user')
      }
    } catch (error) {
      console.error('Failed to delete user:', error)
      alert('Failed to delete user')
    }
  }

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setAdminLoading(true)

    try {
      const url = editingProduct ? `/api/products/${editingProduct._id}` : '/api/products'
      const method = editingProduct ? 'PUT' : 'POST'

      // Generate slug from name if not provided
      const slug = productForm.seo.slug || productForm.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...productForm,
          price: parseFloat(productForm.price),
          seo: {
            ...productForm.seo,
            slug,
            keywords: productForm.seo.keywords.split(',').map(k => k.trim()).filter(k => k)
          }
        })
      })

      if (response.ok) {
        await fetchProducts()
        resetProductForm()
      } else {
        const error = await response.json()
        alert(error.error || 'Failed to save product')
      }
    } catch (error) {
      console.error('Product save error:', error)
      alert('Network error occurred')
    }
    setAdminLoading(false)
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    const formData = new FormData()
    Array.from(files).forEach((file) => {
      formData.append('images', file)
    })

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      if (response.ok) {
        const data = await response.json()
        if (data.success && data.images) {
          // Extract URLs from the response images array
          const imageUrls = data.images.map((img: any) => img.url)
          setProductForm(prev => ({
            ...prev,
            images: [...prev.images, ...imageUrls]
          }))
        } else {
          alert('Failed to upload images: Invalid response')
        }
      } else {
        const errorData = await response.json()
        alert(`Failed to upload images: ${errorData.error || 'Unknown error'}`)
      }
    } catch (error) {
      console.error('Image upload error:', error)
      alert('Failed to upload images')
    }
  }

  const removeImage = (index: number) => {
    setProductForm(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }))
  }

  const editProduct = (product: Product) => {
    setEditingProduct(product)
    setProductForm({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      category: product.category,
      status: product.status,
      saleStatus: product.saleStatus,
      featured: product.featured,
      images: product.images,
      seo: {
        title: product.seo.title,
        description: product.seo.description,
        keywords: product.seo.keywords.join(', '),
        slug: product.seo.slug
      }
    })
    setShowProductForm(true)
  }

  const deleteProduct = async (productId: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return

    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        await fetchProducts()
      } else {
        alert('Failed to delete product')
      }
    } catch (error) {
      console.error('Delete product error:', error)
      alert('Failed to delete product')
    }
  }

  const resetProductForm = () => {
    setProductForm({
      name: '',
      description: '',
      price: '',
      category: 'clothing',
      status: 'draft',
      saleStatus: 'preview-only',
      featured: false,
      images: [],
      seo: {
        title: '',
        description: '',
        keywords: '',
        slug: ''
      }
    })
    setEditingProduct(null)
    setShowProductForm(false)
  }

  const exportSubscribers = () => {
    const csv = subscribers.map(sub => 
      `${sub.email},${sub.status},${sub.source},${new Date(sub.subscribedAt).toLocaleDateString()}`
    ).join('\n')
    const csvContent = 'Email,Status,Source,Subscribed Date\n' + csv
    
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `subscribers-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  if (isLoading) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-white flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-crevre-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-crevre-charcoal">Loading your account...</p>
          </div>
        </main>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>{isLoggedIn ? `${currentUser?.firstName}'s Account` : 'Login & Signup'} - CREVRE Premium Fashion</title>
        <meta name="description" content={isLoggedIn ? "Manage your CREVRE account and access exclusive fashion collections." : "Login or create your CREVRE account for exclusive access to premium fashion collections."} />
        <meta name="keywords" content="CREVRE account, login, signup, premium fashion, exclusive access" />
        <meta property="og:title" content={isLoggedIn ? "Your CREVRE Account" : "Join CREVRE - Premium Fashion"} />
        <meta property="og:description" content="Access exclusive premium fashion collections and early drops at CREVRE." />
        <meta property="og:type" content="website" />
        <meta name="robots" content="index, follow" />
      </Head>
      
      <Header />
      <main className="min-h-screen bg-white">
        {isLoggedIn ? (
          // User Dashboard
          <section className="pt-24 pb-20 bg-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Welcome Header */}
              <div className="text-center mb-16">
                <h1 className="text-4xl md:text-6xl font-light text-crevre-charcoal mb-6 leading-[0.9] tracking-tight">
                  Welcome back, <span className="text-crevre-gold">{currentUser?.firstName}</span>
                </h1>
                <div className="h-1 w-24 bg-crevre-gold mx-auto mb-8"></div>
                <p className="text-lg text-crevre-charcoal/70 max-w-2xl mx-auto leading-relaxed">
                  Your exclusive access to CREVRE's premium fashion collections
                </p>
                {currentUser?.isAdmin && (
                  <div className="mt-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-red-100 text-red-800 border border-red-200">
                      Administrator
                    </span>
                  </div>
                )}
              </div>

              {/* Success Message */}
              {formMessage && (
                <div className="max-w-md mx-auto mb-12">
                  <div className="bg-crevre-gold/10 border border-crevre-gold rounded-sm px-6 py-4">
                    <p className="text-crevre-gold font-medium text-center">{formMessage}</p>
                  </div>
                </div>
              )}

              {/* Account Info */}
              <div className="bg-gray-50 rounded-sm p-8 mb-16">
                <h2 className="text-2xl font-medium text-crevre-charcoal mb-6 tracking-wide">Account Information</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-crevre-charcoal/70 mb-1">Full Name</label>
                    <p className="text-crevre-charcoal">{currentUser?.firstName} {currentUser?.lastName}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-crevre-charcoal/70 mb-1">Email</label>
                    <p className="text-crevre-charcoal">{currentUser?.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-crevre-charcoal/70 mb-1">Member Since</label>
                    <p className="text-crevre-charcoal">
                      {currentUser?.joinedAt ? new Date(currentUser.joinedAt).toLocaleDateString('en-GB', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      }) : 'N/A'}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-crevre-charcoal/70 mb-1">Status</label>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-crevre-gold/10 text-crevre-gold border border-crevre-gold/20">
                      {currentUser?.isAdmin ? 'Administrator' : 'VIP Early Access'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Account Features */}
              <div className="grid md:grid-cols-3 gap-8 mb-16">
                <div className="bg-white rounded-sm shadow-sm border border-gray-200 p-8 text-center group hover:shadow-md transition-shadow">
                  <div className="w-16 h-16 bg-crevre-charcoal group-hover:bg-crevre-gold rounded-sm flex items-center justify-center mx-auto mb-6 transition-colors duration-300">
                    <span className="text-2xl text-white group-hover:text-crevre-charcoal transition-colors duration-300">🔔</span>
                  </div>
                  <h3 className="text-xl font-medium text-crevre-charcoal mb-4 tracking-wide">Launch Notifications</h3>
                  <p className="text-crevre-charcoal/70 leading-relaxed">
                    Get instant notifications for new drops and exclusive launches.
                  </p>
                </div>

                <div className="bg-white rounded-sm shadow-sm border border-gray-200 p-8 text-center group hover:shadow-md transition-shadow">
                  <div className="w-16 h-16 bg-crevre-charcoal group-hover:bg-crevre-gold rounded-sm flex items-center justify-center mx-auto mb-6 transition-colors duration-300">
                    <span className="text-2xl text-white group-hover:text-crevre-charcoal transition-colors duration-300">⭐</span>
                  </div>
                  <h3 className="text-xl font-medium text-crevre-charcoal mb-4 tracking-wide">VIP Early Access</h3>
                  <p className="text-crevre-charcoal/70 leading-relaxed">
                    Shop premium collections 24 hours before public release.
                  </p>
                </div>

                <div className="bg-white rounded-sm shadow-sm border border-gray-200 p-8 text-center group hover:shadow-md transition-shadow">
                  <div className="w-16 h-16 bg-crevre-charcoal group-hover:bg-crevre-gold rounded-sm flex items-center justify-center mx-auto mb-6 transition-colors duration-300">
                    <span className="text-2xl text-white group-hover:text-crevre-charcoal transition-colors duration-300">💎</span>
                  </div>
                  <h3 className="text-xl font-medium text-crevre-charcoal mb-4 tracking-wide">Exclusive Content</h3>
                  <p className="text-crevre-charcoal/70 leading-relaxed">
                    Behind-the-scenes content and styling tips from our team.
                  </p>
                </div>
              </div>

              {/* Admin Access */}
              {currentUser?.isAdmin && (
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-crevre-gold rounded-lg p-12 mb-16 text-center">
                  <div className="w-24 h-24 bg-crevre-gold rounded-full flex items-center justify-center mx-auto mb-8">
                    <span className="text-4xl text-crevre-charcoal">⚡</span>
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-4 tracking-wide">Administrator Access</h2>
                  <p className="text-gray-300 mb-8 text-lg">Manage products, users, and email subscribers</p>
                  <Link
                    href="/account/admin"
                    className="inline-block px-8 py-4 bg-crevre-gold hover:bg-crevre-gold-dark text-crevre-charcoal font-bold text-lg rounded-sm transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    View ADMIN Dashboard
                  </Link>
                </div>
              )}

              {/* Admin Dashboard */}
              {currentUser?.isAdmin && showAdminDashboard && (
                <div className="bg-white border border-gray-200 rounded-lg shadow-lg mb-16">
                  <div className="bg-gray-900 text-white p-8 rounded-t-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-crevre-gold rounded-full flex items-center justify-center">
                          <span className="text-2xl text-crevre-charcoal">⚡</span>
                        </div>
                        <div>
                          <h2 className="text-3xl font-bold tracking-wide">CREVRE Admin Dashboard</h2>
                          <p className="text-gray-300">Complete management control</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setShowAdminDashboard(false)}
                        className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-sm transition-colors"
                      >
                        Close Dashboard
                      </button>
                    </div>
                  </div>

                  {/* Admin Tab Navigation */}
                  <div className="bg-gray-50 p-6">
                    <nav className="flex space-x-1">
                      <button
                        onClick={() => setActiveAdminTab('products')}
                        className={`px-6 py-3 rounded-lg font-medium text-sm transition-all ${
                          activeAdminTab === 'products'
                            ? 'bg-crevre-gold text-crevre-charcoal shadow-md'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-white'
                        }`}
                      >
                        Products ({products.length})
                      </button>
                      <button
                        onClick={() => setActiveAdminTab('subscribers')}
                        className={`px-6 py-3 rounded-lg font-medium text-sm transition-all ${
                          activeAdminTab === 'subscribers'
                            ? 'bg-crevre-gold text-crevre-charcoal shadow-md'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-white'
                        }`}
                      >
                        Email List ({subscribers.length})
                      </button>
                      <button
                        onClick={() => setActiveAdminTab('users')}
                        className={`px-6 py-3 rounded-lg font-medium text-sm transition-all ${
                          activeAdminTab === 'users'
                            ? 'bg-crevre-gold text-crevre-charcoal shadow-md'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-white'
                        }`}
                      >
                        Users ({users.length})
                      </button>
                    </nav>
                  </div>

                  {/* Products Tab */}
                  {activeAdminTab === 'products' && (
                    <div>
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-semibold text-crevre-charcoal">Product Management</h3>
                        <button
                          onClick={() => setShowProductForm(true)}
                          className="px-4 py-2 bg-crevre-gold hover:bg-crevre-gold-dark text-crevre-charcoal font-medium rounded-sm transition-colors"
                        >
                          Add New Product
                        </button>
                      </div>

                      {/* Product Form Modal */}
                      {showProductForm && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-screen overflow-y-auto">
                            <div className="flex justify-between items-center mb-6">
                              <h4 className="text-xl font-semibold text-crevre-charcoal">
                                {editingProduct ? 'Edit Product' : 'Add New Product'}
                              </h4>
                              <button
                                onClick={resetProductForm}
                                className="text-gray-500 hover:text-gray-700"
                              >
                                ×
                              </button>
                            </div>

                            <form onSubmit={handleProductSubmit} className="space-y-6">
                              <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                                  <input
                                    type="text"
                                    value={productForm.name}
                                    onChange={(e) => setProductForm({...productForm, name: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-crevre-gold"
                                    required
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">Price (£)</label>
                                  <input
                                    type="number"
                                    step="0.01"
                                    value={productForm.price}
                                    onChange={(e) => setProductForm({...productForm, price: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-crevre-gold"
                                    required
                                  />
                                </div>
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                                <textarea
                                  value={productForm.description}
                                  onChange={(e) => setProductForm({...productForm, description: e.target.value})}
                                  rows={4}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-crevre-gold"
                                  required
                                />
                              </div>

                              <div className="grid md:grid-cols-3 gap-6">
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                                  <select
                                    value={productForm.category}
                                    onChange={(e) => setProductForm({...productForm, category: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-crevre-gold"
                                  >
                                    <option value="clothing">Clothing</option>
                                    <option value="accessories">Accessories</option>
                                    <option value="shoes">Shoes</option>
                                  </select>
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                                  <select
                                    value={productForm.status}
                                    onChange={(e) => setProductForm({...productForm, status: e.target.value as 'active' | 'draft' | 'archived'})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-crevre-gold"
                                  >
                                    <option value="draft">Draft</option>
                                    <option value="active">Active</option>
                                    <option value="archived">Archived</option>
                                  </select>
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">Sale Status</label>
                                  <select
                                    value={productForm.saleStatus}
                                    onChange={(e) => setProductForm({...productForm, saleStatus: e.target.value as 'for-sale' | 'preview-only'})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-crevre-gold"
                                  >
                                    <option value="preview-only">Preview Only</option>
                                    <option value="for-sale">For Sale</option>
                                  </select>
                                </div>
                              </div>

                              <div>
                                <label className="flex items-center space-x-2">
                                  <input
                                    type="checkbox"
                                    checked={productForm.featured}
                                    onChange={(e) => setProductForm({...productForm, featured: e.target.checked})}
                                    className="rounded border-gray-300"
                                  />
                                  <span className="text-sm font-medium text-gray-700">Featured Product</span>
                                </label>
                              </div>

                              {/* SEO Section */}
                              <div className="border-t pt-6">
                                <h5 className="text-lg font-medium text-crevre-charcoal mb-4">SEO Settings</h5>
                                <div className="grid md:grid-cols-2 gap-6">
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">SEO Title</label>
                                    <input
                                      type="text"
                                      value={productForm.seo.title}
                                      onChange={(e) => setProductForm({...productForm, seo: {...productForm.seo, title: e.target.value}})}
                                      className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-crevre-gold"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">URL Slug</label>
                                    <input
                                      type="text"
                                      value={productForm.seo.slug}
                                      onChange={(e) => setProductForm({...productForm, seo: {...productForm.seo, slug: e.target.value}})}
                                      className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-crevre-gold"
                                    />
                                  </div>
                                </div>
                                <div className="mt-4">
                                  <label className="block text-sm font-medium text-gray-700 mb-2">SEO Description</label>
                                  <textarea
                                    value={productForm.seo.description}
                                    onChange={(e) => setProductForm({...productForm, seo: {...productForm.seo, description: e.target.value}})}
                                    rows={3}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-crevre-gold"
                                  />
                                </div>
                                <div className="mt-4">
                                  <label className="block text-sm font-medium text-gray-700 mb-2">Keywords (comma-separated)</label>
                                  <input
                                    type="text"
                                    value={productForm.seo.keywords}
                                    onChange={(e) => setProductForm({...productForm, seo: {...productForm.seo, keywords: e.target.value}})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-crevre-gold"
                                  />
                                </div>
                              </div>

                              {/* Images Section */}
                              <div className="border-t pt-6">
                                <h5 className="text-lg font-medium text-crevre-charcoal mb-4">Product Images</h5>
                                <div className="mb-4">
                                  <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-crevre-gold"
                                  />
                                </div>
                                {productForm.images.length > 0 && (
                                  <div className="grid grid-cols-3 gap-4">
                                    {productForm.images.map((image, index) => (
                                      <div key={index} className="relative">
                                        <img src={image} alt={`Product ${index + 1}`} className="w-full h-24 object-cover rounded" />
                                        <button
                                          type="button"
                                          onClick={() => removeImage(index)}
                                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
                                        >
                                          ×
                                        </button>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>

                              <div className="flex justify-end space-x-4">
                                <button
                                  type="button"
                                  onClick={resetProductForm}
                                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-sm hover:bg-gray-50"
                                >
                                  Cancel
                                </button>
                                <button
                                  type="submit"
                                  disabled={adminLoading}
                                  className="px-6 py-2 bg-crevre-gold hover:bg-crevre-gold-dark text-crevre-charcoal font-medium rounded-sm transition-colors disabled:opacity-50"
                                >
                                  {adminLoading ? 'Saving...' : (editingProduct ? 'Update Product' : 'Create Product')}
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      )}

                      {/* Products List */}
                      <div className="space-y-4">
                        {adminLoading ? (
                          <div className="text-center py-8">
                            <div className="w-8 h-8 border-4 border-crevre-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                            <p className="text-crevre-charcoal">Loading products...</p>
                          </div>
                        ) : products.length === 0 ? (
                          <div className="text-center py-8">
                            <p className="text-gray-500">No products found. Create your first product!</p>
                          </div>
                        ) : (
                          products.map((product) => (
                            <div key={product._id} className="bg-white border border-gray-200 rounded-lg p-6">
                              <div className="flex justify-between items-start mb-4">
                                <div className="flex-1">
                                  <h4 className="text-lg font-semibold text-crevre-charcoal">{product.name}</h4>
                                  <p className="text-crevre-charcoal/70 mb-2">{product.description}</p>
                                  <div className="flex items-center space-x-4 text-sm text-crevre-charcoal/60">
                                    <span>£{product.price}</span>
                                    <span>•</span>
                                    <span className={`px-2 py-1 rounded text-xs ${
                                      product.status === 'active' ? 'bg-green-100 text-green-800' :
                                      product.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                                      'bg-gray-100 text-gray-800'
                                    }`}>
                                      {product.status}
                                    </span>
                                    <span>•</span>
                                    <span className={`px-2 py-1 rounded text-xs ${
                                      product.saleStatus === 'for-sale' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                                    }`}>
                                      {product.saleStatus}
                                    </span>
                                    {product.featured && <span className="px-2 py-1 bg-gold-100 text-gold-800 rounded text-xs">Featured</span>}
                                  </div>
                                </div>
                                <div className="flex space-x-2">
                                  <button
                                    onClick={() => editProduct(product)}
                                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200"
                                  >
                                    Edit
                                  </button>
                                  <button
                                    onClick={() => deleteProduct(product._id)}
                                    className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200"
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                              {product.images.length > 0 && (
                                <div className="flex space-x-2">
                                  {product.images.slice(0, 3).map((image, index) => (
                                    <img key={index} src={image} alt={`${product.name} ${index + 1}`} className="w-16 h-16 object-cover rounded" />
                                  ))}
                                  {product.images.length > 3 && (
                                    <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center text-gray-500 text-xs">
                                      +{product.images.length - 3}
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}

                  {/* Subscribers Tab */}
                  {activeAdminTab === 'subscribers' && (
                    <div>
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-semibold text-crevre-charcoal">Email List Management</h3>
                        <button
                          onClick={exportSubscribers}
                          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-sm transition-colors"
                        >
                          Export CSV
                        </button>
                      </div>

                      {/* Search */}
                      <div className="mb-6">
                        <input
                          type="text"
                          placeholder="Search subscribers..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-crevre-gold"
                        />
                      </div>

                      {/* Subscribers List */}
                      <div className="space-y-4">
                        {adminLoading ? (
                          <div className="text-center py-8">
                            <div className="w-8 h-8 border-4 border-crevre-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                            <p className="text-crevre-charcoal">Loading subscribers...</p>
                          </div>
                        ) : filteredSubscribers.length === 0 ? (
                          <div className="text-center py-8">
                            <p className="text-gray-500">
                              {searchQuery ? 'No subscribers match your search.' : 'No subscribers found.'}
                            </p>
                          </div>
                        ) : (
                          <div className="bg-white rounded-lg border border-gray-200">
                            <div className="grid grid-cols-5 gap-4 p-4 bg-gray-50 font-medium text-sm text-gray-600 border-b">
                              <div>Email</div>
                              <div>Status</div>
                              <div>Source</div>
                              <div>Subscribed Date</div>
                              <div>Actions</div>
                            </div>
                            {filteredSubscribers.map((subscriber) => (
                              <div key={subscriber._id} className="grid grid-cols-5 gap-4 p-4 border-b border-gray-100 hover:bg-gray-50 items-center">
                                <div className="text-crevre-charcoal">{subscriber.email}</div>
                                <div>
                                  <span className={`px-2 py-1 rounded text-xs ${
                                    subscriber.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                  }`}>
                                    {subscriber.status}
                                  </span>
                                </div>
                                <div className="text-crevre-charcoal/70">{subscriber.source}</div>
                                <div className="text-crevre-charcoal/70">
                                  {new Date(subscriber.subscribedAt).toLocaleDateString()}
                                </div>
                                <div>
                                  <button
                                    onClick={() => deleteSubscriber(subscriber._id)}
                                    className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-xs rounded transition-colors"
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Subscribers Summary */}
                      <div className="mt-6 grid grid-cols-3 gap-4">
                        <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
                          <div className="text-2xl font-bold text-crevre-charcoal">{subscribers.length}</div>
                          <div className="text-sm text-crevre-charcoal/60">Total Subscribers</div>
                        </div>
                        <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
                          <div className="text-2xl font-bold text-green-600">
                            {subscribers.filter(s => s.status === 'active').length}
                          </div>
                          <div className="text-sm text-crevre-charcoal/60">Active</div>
                        </div>
                        <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
                          <div className="text-2xl font-bold text-red-600">
                            {subscribers.filter(s => s.status === 'unsubscribed').length}
                          </div>
                          <div className="text-sm text-crevre-charcoal/60">Unsubscribed</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Users Tab */}
                  {activeAdminTab === 'users' && (
                    <div className="p-8">
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-2xl font-bold text-crevre-charcoal">User Management</h3>
                        <div className="text-sm text-gray-600">
                          Total Users: {users.length}
                        </div>
                      </div>

                      {/* Search */}
                      <div className="mb-6">
                        <input
                          type="text"
                          placeholder="Search users..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-crevre-gold"
                        />
                      </div>

                      {/* Users List */}
                      <div className="space-y-4">
                        {adminLoading ? (
                          <div className="text-center py-8">
                            <div className="w-8 h-8 border-4 border-crevre-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                            <p className="text-crevre-charcoal">Loading users...</p>
                          </div>
                        ) : filteredUsers.length === 0 ? (
                          <div className="text-center py-8">
                            <p className="text-gray-500">
                              {searchQuery ? 'No users match your search.' : 'No users found.'}
                            </p>
                          </div>
                        ) : (
                          <div className="bg-white rounded-lg border border-gray-200">
                            <div className="grid grid-cols-6 gap-4 p-4 bg-gray-50 font-medium text-sm text-gray-600 border-b">
                              <div>Name</div>
                              <div>Email</div>
                              <div>Role</div>
                              <div>Created</div>
                              <div>Status</div>
                              <div>Actions</div>
                            </div>
                            {filteredUsers.map((user) => (
                              <div key={user._id} className="grid grid-cols-6 gap-4 p-4 border-b border-gray-100 hover:bg-gray-50 items-center">
                                <div className="text-crevre-charcoal">
                                  {user.firstName} {user.lastName}
                                </div>
                                <div className="text-crevre-charcoal">{user.email}</div>
                                <div>
                                  <span className={`px-2 py-1 rounded text-xs ${
                                    user.isAdmin ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                                  }`}>
                                    {user.isAdmin ? 'Admin' : 'User'}
                                  </span>
                                </div>
                                <div className="text-crevre-charcoal/70">
                                  {new Date(user.createdAt).toLocaleDateString()}
                                </div>
                                <div>
                                  <span className="px-2 py-1 rounded text-xs bg-green-100 text-green-800">
                                    Active
                                  </span>
                                </div>
                                <div>
                                  {!user.isAdmin && (
                                    <button
                                      onClick={() => deleteUser(user._id)}
                                      className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-xs rounded transition-colors"
                                    >
                                      Delete
                                    </button>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Users Summary */}
                      <div className="mt-6 grid grid-cols-3 gap-4">
                        <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
                          <div className="text-2xl font-bold text-crevre-charcoal">{users.length}</div>
                          <div className="text-sm text-crevre-charcoal/60">Total Users</div>
                        </div>
                        <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
                          <div className="text-2xl font-bold text-red-600">
                            {users.filter(u => u.isAdmin).length}
                          </div>
                          <div className="text-sm text-crevre-charcoal/60">Admins</div>
                        </div>
                        <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
                          <div className="text-2xl font-bold text-blue-600">
                            {users.filter(u => !u.isAdmin).length}
                          </div>
                          <div className="text-sm text-crevre-charcoal/60">Regular Users</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Quick Actions */}
              <div className="text-center">
                <h2 className="text-3xl font-light text-crevre-charcoal mb-8 tracking-tight">Quick Actions</h2>
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                  <Link 
                    href="/"
                    className="px-8 py-4 bg-crevre-charcoal hover:bg-crevre-gold text-white hover:text-crevre-charcoal font-medium transition-all duration-300 uppercase tracking-wider text-sm rounded-sm"
                  >
                    Browse Collections
                  </Link>
                  <Link 
                    href="/preview/new-arrivals"
                    className="px-8 py-4 border border-crevre-charcoal text-crevre-charcoal hover:bg-crevre-charcoal hover:text-white font-medium transition-all duration-300 uppercase tracking-wider text-sm rounded-sm"
                  >
                    Preview New Arrivals
                  </Link>
                </div>
                <button 
                  onClick={handleLogout}
                  className="text-crevre-charcoal/60 hover:text-crevre-gold transition-colors text-sm underline"
                >
                  Logout
                </button>
              </div>
            </div>
          </section>
        ) : (
          // Login/Signup Forms
          <section className="pt-24 pb-20 bg-white">
            <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
              {/* Header */}
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-light text-crevre-charcoal mb-6 leading-[0.9] tracking-tight">
                  {showLogin ? 'Welcome Back' : 'Join CREVRE'}
                </h1>
                <div className="h-1 w-16 bg-crevre-gold mx-auto mb-6"></div>
                <p className="text-lg text-crevre-charcoal/70 leading-relaxed">
                  {showLogin 
                    ? 'Access your exclusive account' 
                    : 'Create your account for exclusive access'
                  }
                </p>
              </div>

              {/* Toggle Buttons */}
              <div className="flex bg-gray-100 rounded-sm p-1 mb-8">
                <button 
                  onClick={() => {
                    setShowLogin(true)
                    setFormErrors([])
                    setFormMessage('')
                  }}
                  className={`flex-1 px-4 py-3 rounded-sm text-sm font-medium transition-all duration-300 ${
                    showLogin 
                      ? 'bg-white text-crevre-charcoal shadow-sm' 
                      : 'text-crevre-charcoal/60 hover:text-crevre-charcoal'
                  }`}
                >
                  Login
                </button>
                <button 
                  onClick={() => {
                    setShowLogin(false)
                    setFormErrors([])
                    setFormMessage('')
                  }}
                  className={`flex-1 px-4 py-3 rounded-sm text-sm font-medium transition-all duration-300 ${
                    !showLogin 
                      ? 'bg-white text-crevre-charcoal shadow-sm' 
                      : 'text-crevre-charcoal/60 hover:text-crevre-charcoal'
                  }`}
                >
                  Sign Up
                </button>
              </div>

              {/* Error Messages */}
              {formErrors.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-sm px-4 py-3 mb-6">
                  {formErrors.map((error, index) => (
                    <p key={index} className="text-red-700 text-sm">{error}</p>
                  ))}
                </div>
              )}

              {/* Form */}
              <form onSubmit={showLogin ? handleLogin : handleSignup} className="space-y-6">
                {!showLogin && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-crevre-charcoal mb-2">
                        First Name
                      </label>
                      <input 
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 bg-white text-crevre-charcoal focus:outline-none focus:border-crevre-gold transition-colors rounded-sm"
                        required={!showLogin}
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-crevre-charcoal mb-2">
                        Last Name
                      </label>
                      <input 
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 bg-white text-crevre-charcoal focus:outline-none focus:border-crevre-gold transition-colors rounded-sm"
                        required={!showLogin}
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-crevre-charcoal mb-2">
                    Email Address
                  </label>
                  <input 
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 bg-white text-crevre-charcoal focus:outline-none focus:border-crevre-gold transition-colors rounded-sm"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-crevre-charcoal mb-2">
                    Password
                  </label>
                  <input 
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 bg-white text-crevre-charcoal focus:outline-none focus:border-crevre-gold transition-colors rounded-sm"
                    required
                    minLength={6}
                  />
                </div>

                {!showLogin && (
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-crevre-charcoal mb-2">
                      Confirm Password
                    </label>
                    <input 
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 bg-white text-crevre-charcoal focus:outline-none focus:border-crevre-gold transition-colors rounded-sm"
                      required={!showLogin}
                    />
                  </div>
                )}

                <button 
                  type="submit"
                  className="w-full px-8 py-4 bg-crevre-charcoal hover:bg-crevre-gold text-white hover:text-crevre-charcoal font-medium transition-all duration-300 uppercase tracking-wider text-sm rounded-sm"
                >
                  {showLogin ? 'Login' : 'Create Account'}
                </button>
              </form>

              {/* Admin Login Hint */}
              {showLogin && (
                <div className="mt-6 p-4 bg-gray-50 rounded-sm">
                  <p className="text-xs text-crevre-charcoal/60 text-center">
                    Admin users can login with their admin credentials
                  </p>
                </div>
              )}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  )
}

export default AccountPage
