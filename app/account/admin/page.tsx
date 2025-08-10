'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

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

// User data type for current user
type User = {
  id: string
  email: string
  firstName: string
  lastName: string
  joinedAt: string
  isAdmin: boolean
}

const AdminDashboard = () => {
  const router = useRouter()
  
  // Auth state
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthorized, setIsAuthorized] = useState(false)

  // Admin state
  const [activeAdminTab, setActiveAdminTab] = useState<'products' | 'subscribers' | 'users' | 'drop-email'>('products')
  const [products, setProducts] = useState<Product[]>([])
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [filteredSubscribers, setFilteredSubscribers] = useState<Subscriber[]>([])
  const [users, setUsers] = useState<DatabaseUser[]>([])
  const [filteredUsers, setFilteredUsers] = useState<DatabaseUser[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [adminLoading, setAdminLoading] = useState(false)
  
  // Drop Email tab state
  const [dropEmailHTML, setDropEmailHTML] = useState('')
  const [dropEmailSubject, setDropEmailSubject] = useState('')
  const [sendToAll, setSendToAll] = useState(false)
  const [selectedEmails, setSelectedEmails] = useState([])
  
  // Product search and sort
  const [productSearchQuery, setProductSearchQuery] = useState('')
  const [productSortBy, setProductSortBy] = useState('name')
  const [filteredProducts, setFilteredProducts] = useState([])
  
  // Image upload state
  const [productImages, setProductImages] = useState([])
  const [imagePreviewUrls, setImagePreviewUrls] = useState([])
  
  // Modal states
  const [showProductForm, setShowProductForm] = useState(false)
  const [showUserForm, setShowUserForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [editingUser, setEditingUser] = useState<DatabaseUser | null>(null)
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

  const [userForm, setUserForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    isAdmin: false
  })

  // Check authentication on mount
  useEffect(() => {
    const checkAuth = () => {
      const userData = localStorage.getItem('crevre_user')
      if (userData) {
        try {
          const user = JSON.parse(userData)
          setCurrentUser(user)
          if (user.isAdmin) {
            setIsAuthorized(true)
          } else {
            // Redirect non-admin users
            router.push('/account')
          }
        } catch (e) {
          localStorage.removeItem('crevre_user')
          router.push('/account')
        }
      } else {
        // Redirect unauthenticated users
        router.push('/account')
      }
      setIsLoading(false)
    }
    checkAuth()
  }, [router])

  // Fetch data when tab changes
  useEffect(() => {
    if (isAuthorized && currentUser?.isAdmin) {
      if (activeAdminTab === 'products') {
        fetchProducts()
      } else if (activeAdminTab === 'subscribers') {
        fetchSubscribers()
      } else if (activeAdminTab === 'users') {
        fetchUsers()
      }
    }
  }, [activeAdminTab, isAuthorized, currentUser])

  // Filter data when search query changes
  useEffect(() => {
    // Include the hardcoded admin user from .env if the current user is admin
    let allUsers = [...users]
    if (currentUser?.id === 'admin') {
      const adminUser = {
        _id: 'admin',
        email: 'crevre@crevre.com',
        firstName: 'Admin',
        lastName: 'User', 
        isAdmin: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      allUsers = [adminUser, ...users.filter(u => u._id !== 'admin')]
    }

    if (searchQuery.trim() === '') {
      setFilteredSubscribers(subscribers)
      setFilteredUsers(allUsers)
    } else {
      setFilteredSubscribers(subscribers.filter(sub => 
        sub.email.toLowerCase().includes(searchQuery.toLowerCase())
      ))
      setFilteredUsers(allUsers.filter(user => 
        user.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.lastName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
      ))
    }
  }, [searchQuery, subscribers, users, currentUser])

  // Filter and sort products
  useEffect(() => {
    let filtered = [...products]
    
    if (productSearchQuery.trim()) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(productSearchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(productSearchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(productSearchQuery.toLowerCase())
      )
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (productSortBy) {
        case 'name':
          return a.name.localeCompare(b.name)
        case 'price':
          return parseFloat(a.price.toString()) - parseFloat(b.price.toString())
        case 'created':
          return new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime()
        case 'category':
          return a.category.localeCompare(b.category)
        default:
          return 0
      }
    })

    setFilteredProducts(filtered)
  }, [productSearchQuery, productSortBy, products])

  // Image handling functions
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    if (files.length === 0) return

    // Create preview URLs
    const previewUrls = files.map((file: File) => URL.createObjectURL(file))
    setImagePreviewUrls(prev => [...prev, ...previewUrls])
    setProductImages(prev => [...prev, ...files])
  }



  const removeImage = (index: number) => {
    const newPreviews = [...imagePreviewUrls]
    const newImages = [...productImages]
    
    // Revoke the URL to free memory
    URL.revokeObjectURL(newPreviews[index])
    
    newPreviews.splice(index, 1)
    newImages.splice(index, 1)
    
    setImagePreviewUrls(newPreviews)
    setProductImages(newImages)
    
    // Update form images array
    setProductForm(prev => ({
      ...prev,
      images: newPreviews
    }))
  }

  // CSV Export functions
  const exportToCSV = (data, filename) => {
    if (!data.length) return
    
    const csvHeader = Object.keys(data[0]).join(',') + '\n'
    const csvRows = data.map(row => 
      Object.values(row).map(value => 
        `"${String(value).replace(/"/g, '""')}"`
      ).join(',')
    ).join('\n')
    
    const csvContent = csvHeader + csvRows
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    link.click()
    URL.revokeObjectURL(url)
  }

  const exportUsers = () => {
    const userData = filteredUsers.map(user => ({
      Name: `${user.firstName} ${user.lastName}`,
      Email: user.email,
      Role: user.isAdmin ? 'Admin' : 'User',
      Created: new Date(user.createdAt).toLocaleDateString(),
      Status: 'Active'
    }))
    exportToCSV(userData, `crevre-users-${new Date().toISOString().split('T')[0]}.csv`)
  }

  const exportProducts = () => {
    const productData = filteredProducts.map(product => ({
      Name: product.name,
      Price: `£${product.price}`,
      Category: product.category,
      Status: product.status,
      'Sale Status': product.saleStatus,
      Featured: product.featured ? 'Yes' : 'No',
      Created: product.createdAt ? new Date(product.createdAt).toLocaleDateString() : 'N/A'
    }))
    exportToCSV(productData, `crevre-products-${new Date().toISOString().split('T')[0]}.csv`)
  }

  const exportSubscribers = () => {
    const subscriberData = filteredSubscribers.map(sub => ({
      Email: sub.email,
      Source: sub.source,
      Status: sub.status,
      'Subscribed Date': 'N/A' // Using N/A for now since subscriber type doesn't include createdAt
    }))
    exportToCSV(subscriberData, `crevre-subscribers-${new Date().toISOString().split('T')[0]}.csv`)
  }

  // Email sending functions
  const sendWelcomeEmail = async (email) => {
    setAdminLoading(true)
    try {
      const response = await fetch('/api/send-welcome', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })

      if (response.ok) {
        alert(`Welcome email sent successfully to ${email}!`)
      } else {
        alert('Failed to send welcome email')
      }
    } catch (error) {
      console.error('Error sending welcome email:', error)
      alert('Error sending welcome email')
    } finally {
      setAdminLoading(false)
    }
  }

  const sendDropEmail = async () => {
    if (!dropEmailSubject.trim() || !dropEmailHTML.trim()) {
      alert('Please fill in both subject and email content')
      return
    }

    setAdminLoading(true)
    try {
      const emailList = sendToAll 
        ? filteredSubscribers.filter(s => s.status === 'active').map(s => s.email)
        : selectedEmails

      const response = await fetch('/api/send-drop-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          emails: emailList,
          subject: dropEmailSubject,
          htmlContent: dropEmailHTML
        })
      })

      if (response.ok) {
        alert(`Email sent successfully to ${emailList.length} recipients!`)
        setDropEmailHTML('')
        setDropEmailSubject('')
        setSelectedEmails([])
      } else {
        alert('Failed to send drop email')
      }
    } catch (error) {
      console.error('Error sending drop email:', error)
      alert('Error sending drop email')
    } finally {
      setAdminLoading(false)
    }
  }

  // Fetch functions
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

  // Delete functions
  const deleteSubscriber = async (subscriberId: string) => {
    if (!confirm('Are you sure you want to delete this subscriber?')) return
    
    try {
      const response = await fetch(`/api/subscribers/${subscriberId}`, {
        method: 'DELETE'
      })
      
      if (response.ok) {
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

  // User form functions
  const handleUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (userForm.password !== userForm.confirmPassword) {
      alert('Passwords do not match')
      return
    }
    
    setAdminLoading(true)
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName: userForm.firstName,
          lastName: userForm.lastName,
          email: userForm.email,
          password: userForm.password,
          isAdmin: userForm.isAdmin
        })
      })
      
      if (response.ok) {
        fetchUsers()
        resetUserForm()
        alert('User created successfully')
      } else {
        const data = await response.json()
        alert(data.error || 'Failed to create user')
      }
    } catch (error) {
      console.error('Failed to create user:', error)
      alert('Failed to create user')
    }
    setAdminLoading(false)
  }

  const resetUserForm = () => {
    setUserForm({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      isAdmin: false
    })
    setShowUserForm(false)
    setEditingUser(null)
  }

  // Product form functions
  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setAdminLoading(true)
    
    try {
      let finalImageUrls = [...productForm.images]
      
      // Upload new images if any
      if (productImages.length > 0) {
        const formData = new FormData()
        productImages.forEach((file) => {
          formData.append('images', file)
        })
        
        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          body: formData
        })
        
        if (uploadResponse.ok) {
          const uploadData = await uploadResponse.json()
          // Extract URLs from the uploaded images
          const newImageUrls = uploadData.images?.map((img: any) => img.url) || []
          finalImageUrls = [...(editingProduct?.images || []), ...newImageUrls]
        } else {
          throw new Error('Failed to upload images')
        }
      }
      
      const productData = {
        ...productForm,
        price: parseFloat(productForm.price),
        images: finalImageUrls,
        seo: {
          ...productForm.seo,
          keywords: productForm.seo.keywords.split(',').map(k => k.trim()).filter(k => k)
        }
      }
      
      const url = editingProduct ? `/api/products/${editingProduct._id}` : '/api/products'
      const method = editingProduct ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(productData)
      })
      
      if (response.ok) {
        fetchProducts()
        resetProductForm()
        alert(editingProduct ? 'Product updated successfully' : 'Product created successfully')
      } else {
        const data = await response.json()
        alert(data.error || 'Failed to save product')
      }
    } catch (error) {
      console.error('Failed to save product:', error)
      alert('Failed to save product: ' + error.message)
    }
    setAdminLoading(false)
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
    
    // Clear image states
    setImagePreviewUrls([])
    setProductImages([])
    
    setShowProductForm(false)
    setEditingProduct(null)
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
    
    // Load existing images for preview
    setImagePreviewUrls(product.images || [])
    setProductImages([]) // Clear file objects as these are existing URLs
    
    setShowProductForm(true)
  }

  const deleteProduct = async (productId: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return
    
    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: 'DELETE'
      })
      
      if (response.ok) {
        fetchProducts()
        alert('Product deleted successfully')
      } else {
        alert('Failed to delete product')
      }
    } catch (error) {
      console.error('Failed to delete product:', error)
      alert('Failed to delete product')
    }
  }

  if (isLoading) {
    return (
      <div className="bg-white min-h-screen">
        <div className="flex items-center justify-center min-h-screen">
          <div className="w-8 h-8 border-4 border-crevre-gold border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    )
  }

  if (!isAuthorized) {
    return (
      <div className="bg-white min-h-screen">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-crevre-charcoal mb-4">Access Denied</h1>
            <p className="text-gray-600 mb-4">You don't have permission to access this page.</p>
            <Link 
              href="/account"
              className="px-6 py-3 bg-crevre-gold hover:bg-crevre-gold-dark text-crevre-charcoal font-medium rounded-sm transition-colors"
            >
              Back to Account
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="bg-gray-900 text-white p-8 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-crevre-gold rounded-full flex items-center justify-center">
                <span className="text-3xl text-crevre-charcoal">⚡</span>
              </div>
              <div>
                <h1 className="text-4xl font-bold tracking-wide">CREVRE Admin Dashboard</h1>
                <p className="text-gray-300 text-lg">Complete management control</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-300">Welcome back,</p>
                <p className="font-medium">{currentUser?.firstName} {currentUser?.lastName}</p>
              </div>
              <Link
                href="/account"
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-sm transition-colors"
              >
                Back to Account
              </Link>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-8">
          <button
            onClick={() => setActiveAdminTab('products')}
            className={`px-6 py-3 rounded-sm font-medium transition-colors ${
              activeAdminTab === 'products'
                ? 'bg-crevre-gold text-crevre-charcoal'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Products ({products.length})
          </button>
          <button
            onClick={() => setActiveAdminTab('subscribers')}
            className={`px-6 py-3 rounded-sm font-medium transition-colors ${
              activeAdminTab === 'subscribers'
                ? 'bg-crevre-gold text-crevre-charcoal'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Email List ({subscribers.length})
          </button>
          <button
            onClick={() => setActiveAdminTab('users')}
            className={`px-6 py-3 rounded-sm font-medium transition-colors ${
              activeAdminTab === 'users'
                ? 'bg-crevre-gold text-crevre-charcoal'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Users ({filteredUsers.length})
          </button>
          <button
            onClick={() => setActiveAdminTab('drop-email')}
            className={`px-6 py-3 rounded-sm font-medium transition-colors ${
              activeAdminTab === 'drop-email'
                ? 'bg-crevre-gold text-crevre-charcoal'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Drop Email
          </button>
        </div>

        {/* Content */}
        <div className="bg-white border border-gray-200 rounded-b-lg">
          {/* Products Tab */}
          {activeAdminTab === 'products' && (
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-crevre-charcoal">Product Management</h2>
                <div className="flex space-x-3">
                  <button
                    onClick={exportProducts}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-sm transition-colors"
                  >
                    Export CSV
                  </button>
                  <button
                    onClick={() => setShowProductForm(true)}
                    className="px-6 py-3 bg-crevre-gold hover:bg-crevre-gold-dark text-crevre-charcoal font-medium rounded-sm transition-colors"
                  >
                    Add New Product
                  </button>
                </div>
              </div>

              {/* Search and Sort Controls */}
              <div className="flex gap-4 mb-6">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Search products by name, description, or category..."
                    value={productSearchQuery}
                    onChange={(e) => setProductSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-crevre-gold"
                  />
                </div>
                <select
                  value={productSortBy}
                  onChange={(e) => setProductSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-crevre-gold"
                >
                  <option value="name">Sort by Name</option>
                  <option value="price">Sort by Price</option>
                  <option value="created">Sort by Date Created</option>
                  <option value="category">Sort by Category</option>
                </select>
              </div>

              {/* Products List */}
              <div className="space-y-4">
                {adminLoading ? (
                  <div className="text-center py-12">
                    <div className="w-8 h-8 border-4 border-crevre-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-crevre-charcoal">Loading products...</p>
                  </div>
                ) : filteredProducts.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">
                      {productSearchQuery ? 'No products match your search.' : 'No products found. Create your first product!'}
                    </p>
                  </div>
                ) : (
                  <div className="grid gap-6">
                    {products.map((product) => (
                      <div key={product._id} className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold text-crevre-charcoal mb-2">{product.name}</h3>
                            <p className="text-crevre-charcoal/70 mb-4">{product.description}</p>
                            <div className="flex items-center space-x-6 text-sm text-crevre-charcoal/60">
                              <span className="font-medium">£{product.price}</span>
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                product.status === 'active' ? 'bg-green-100 text-green-800' :
                                product.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {product.status}
                              </span>
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                product.saleStatus === 'for-sale' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                              }`}>
                                {product.saleStatus}
                              </span>
                              {product.featured && (
                                <span className="px-3 py-1 rounded-full text-xs font-medium bg-crevre-gold/20 text-crevre-charcoal">
                                  Featured
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <button 
                              onClick={() => editProduct(product)}
                              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded transition-colors"
                            >
                              Edit
                            </button>
                            <button 
                              onClick={() => deleteProduct(product._id)}
                              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm rounded transition-colors"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Form Modal */}
              {showProductForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                  <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-2xl font-bold text-crevre-charcoal">
                        {editingProduct ? 'Edit Product' : 'Create New Product'}
                      </h3>
                      <button
                        onClick={resetProductForm}
                        className="text-gray-500 hover:text-gray-700 text-2xl"
                      >
                        ×
                      </button>
                    </div>

                    <form onSubmit={handleProductSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Product Name *</label>
                          <input
                            type="text"
                            required
                            value={productForm.name}
                            onChange={(e) => setProductForm({...productForm, name: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-crevre-gold"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Price (£) *</label>
                          <input
                            type="number"
                            step="0.01"
                            required
                            value={productForm.price}
                            onChange={(e) => setProductForm({...productForm, price: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-crevre-gold"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                        <textarea
                          required
                          rows={4}
                          value={productForm.description}
                          onChange={(e) => setProductForm({...productForm, description: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-crevre-gold"
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
                            <option value="bags">Bags</option>
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

                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="featured"
                          checked={productForm.featured}
                          onChange={(e) => setProductForm({...productForm, featured: e.target.checked})}
                          className="mr-2"
                        />
                        <label htmlFor="featured" className="text-sm font-medium text-gray-700">Featured Product</label>
                      </div>

                      {/* Image Upload Section */}
                      <div className="border-t pt-6">
                        <h4 className="text-lg font-medium text-crevre-charcoal mb-4">Product Images</h4>
                        
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Upload Images</label>
                          <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-crevre-gold file:text-crevre-charcoal hover:file:bg-crevre-gold-dark"
                          />
                          <p className="mt-1 text-sm text-gray-500">Upload multiple images (JPG, PNG, GIF)</p>
                        </div>

                        {/* Image Previews */}
                        {imagePreviewUrls.length > 0 && (
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {imagePreviewUrls.map((url, index) => (
                              <div key={index} className="relative group">
                                <img
                                  src={url}
                                  alt={`Preview ${index + 1}`}
                                  className="w-full h-32 object-cover rounded-lg border-2 border-gray-200"
                                />
                                <button
                                  type="button"
                                  onClick={() => removeImage(index)}
                                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  ×
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* SEO Section */}
                      <div className="border-t pt-6">
                        <h4 className="text-lg font-medium text-crevre-charcoal mb-4">SEO Settings</h4>
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
                            rows={3}
                            value={productForm.seo.description}
                            onChange={(e) => setProductForm({...productForm, seo: {...productForm.seo, description: e.target.value}})}
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

                      <div className="flex justify-end space-x-4 pt-6">
                        <button
                          type="button"
                          onClick={resetProductForm}
                          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-sm hover:bg-gray-50 transition-colors"
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
            </div>
          )}

          {/* Subscribers Tab */}
          {activeAdminTab === 'subscribers' && (
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-crevre-charcoal">Email List Management</h2>
                <button className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-sm transition-colors">
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-crevre-gold"
                />
              </div>

              {/* Subscribers List */}
              <div className="space-y-4">
                {adminLoading ? (
                  <div className="text-center py-12">
                    <div className="w-8 h-8 border-4 border-crevre-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-crevre-charcoal">Loading subscribers...</p>
                  </div>
                ) : filteredSubscribers.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">
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
                        <div className="text-crevre-charcoal font-medium">{subscriber.email}</div>
                        <div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
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
              <div className="mt-8 grid grid-cols-3 gap-4">
                <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 text-center">
                  <div className="text-3xl font-bold text-crevre-charcoal">{subscribers.length}</div>
                  <div className="text-sm text-crevre-charcoal/60 mt-1">Total Subscribers</div>
                </div>
                <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 text-center">
                  <div className="text-3xl font-bold text-green-600">
                    {subscribers.filter(s => s.status === 'active').length}
                  </div>
                  <div className="text-sm text-crevre-charcoal/60 mt-1">Active</div>
                </div>
                <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 text-center">
                  <div className="text-3xl font-bold text-red-600">
                    {subscribers.filter(s => s.status === 'unsubscribed').length}
                  </div>
                  <div className="text-sm text-crevre-charcoal/60 mt-1">Unsubscribed</div>
                </div>
              </div>
            </div>
          )}

          {/* Users Tab */}
          {activeAdminTab === 'users' && (
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-crevre-charcoal">User Management</h2>
                <button
                  onClick={() => setShowUserForm(true)}
                  className="px-6 py-3 bg-crevre-gold hover:bg-crevre-gold-dark text-crevre-charcoal font-medium rounded-sm transition-colors"
                >
                  Create New User
                </button>
              </div>

              {/* Search */}
              <div className="mb-6">
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-crevre-gold"
                />
              </div>

              {/* Users List */}
              <div className="space-y-4">
                {adminLoading ? (
                  <div className="text-center py-12">
                    <div className="w-8 h-8 border-4 border-crevre-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-crevre-charcoal">Loading users...</p>
                  </div>
                ) : filteredUsers.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">
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
                        <div className="text-crevre-charcoal font-medium">
                          {user.firstName} {user.lastName}
                        </div>
                        <div className="text-crevre-charcoal">{user.email}</div>
                        <div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            user.isAdmin ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                            {user.isAdmin ? 'Admin' : 'User'}
                          </span>
                        </div>
                        <div className="text-crevre-charcoal/70">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </div>
                        <div>
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
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
              <div className="mt-8 grid grid-cols-3 gap-4">
                <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 text-center">
                  <div className="text-3xl font-bold text-crevre-charcoal">{users.length}</div>
                  <div className="text-sm text-crevre-charcoal/60 mt-1">Total Users</div>
                </div>
                <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 text-center">
                  <div className="text-3xl font-bold text-red-600">
                    {users.filter(u => u.isAdmin).length}
                  </div>
                  <div className="text-sm text-crevre-charcoal/60 mt-1">Admins</div>
                </div>
                <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 text-center">
                  <div className="text-3xl font-bold text-blue-600">
                    {users.filter(u => !u.isAdmin).length}
                  </div>
                  <div className="text-sm text-crevre-charcoal/60 mt-1">Regular Users</div>
                </div>
              </div>

              {/* User Form Modal */}
              {showUserForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                  <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-2xl font-bold text-crevre-charcoal">
                        {editingUser ? 'Edit User' : 'Create New User'}
                      </h3>
                      <button
                        onClick={resetUserForm}
                        className="text-gray-500 hover:text-gray-700 text-2xl"
                      >
                        ×
                      </button>
                    </div>

                    <form onSubmit={handleUserSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                          <input
                            type="text"
                            required
                            value={userForm.firstName}
                            onChange={(e) => setUserForm({...userForm, firstName: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-crevre-gold"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                          <input
                            type="text"
                            required
                            value={userForm.lastName}
                            onChange={(e) => setUserForm({...userForm, lastName: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-crevre-gold"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                        <input
                          type="email"
                          required
                          value={userForm.email}
                          onChange={(e) => setUserForm({...userForm, email: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-crevre-gold"
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Password *</label>
                          <input
                            type="password"
                            required
                            minLength={6}
                            value={userForm.password}
                            onChange={(e) => setUserForm({...userForm, password: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-crevre-gold"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password *</label>
                          <input
                            type="password"
                            required
                            minLength={6}
                            value={userForm.confirmPassword}
                            onChange={(e) => setUserForm({...userForm, confirmPassword: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-crevre-gold"
                          />
                        </div>
                      </div>

                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="isAdmin"
                          checked={userForm.isAdmin}
                          onChange={(e) => setUserForm({...userForm, isAdmin: e.target.checked})}
                          className="mr-3 w-4 h-4 text-crevre-gold border-gray-300 rounded focus:ring-crevre-gold"
                        />
                        <label htmlFor="isAdmin" className="text-sm font-medium text-gray-700">
                          Administrator Role
                        </label>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-sm">
                        <p className="text-sm text-gray-600">
                          <strong>Note:</strong> {userForm.isAdmin ? 'This user will have full administrator privileges including access to this dashboard.' : 'This user will have standard user privileges with access to their account page only.'}
                        </p>
                      </div>

                      <div className="flex justify-end space-x-4 pt-6">
                        <button
                          type="button"
                          onClick={resetUserForm}
                          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-sm hover:bg-gray-50 transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={adminLoading}
                          className="px-6 py-2 bg-crevre-gold hover:bg-crevre-gold-dark text-crevre-charcoal font-medium rounded-sm transition-colors disabled:opacity-50"
                        >
                          {adminLoading ? 'Creating...' : (editingUser ? 'Update User' : 'Create User')}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Subscribers Tab */}
          {/* Subscribers Tab */}
          {activeAdminTab === 'subscribers' && (
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-crevre-charcoal">Email Subscriber Management</h2>
                <button
                  onClick={exportSubscribers}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-sm transition-colors"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-crevre-gold"
                />
              </div>

              {/* Subscribers List */}
              <div className="space-y-4">
                {adminLoading ? (
                  <div className="text-center py-12">
                    <div className="w-8 h-8 border-4 border-crevre-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-crevre-charcoal">Loading subscribers...</p>
                  </div>
                ) : filteredSubscribers.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">
                      {searchQuery ? 'No subscribers match your search.' : 'No subscribers found.'}
                    </p>
                  </div>
                ) : (
                  <div className="bg-white rounded-lg border border-gray-200">
                    <div className="grid grid-cols-6 gap-4 p-4 bg-gray-50 font-medium text-sm text-gray-600 border-b">
                      <div>Email</div>
                      <div>Status</div>
                      <div>Source</div>
                      <div>Subscribed Date</div>
                      <div>Welcome Email</div>
                      <div>Actions</div>
                    </div>
                    {filteredSubscribers.map((subscriber) => (
                      <div key={subscriber._id} className="grid grid-cols-6 gap-4 p-4 border-b border-gray-100 hover:bg-gray-50 items-center">
                        <div className="text-crevre-charcoal font-medium">{subscriber.email}</div>
                        <div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
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
                            onClick={() => sendWelcomeEmail(subscriber.email)}
                            disabled={adminLoading}
                            className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-xs rounded transition-colors disabled:opacity-50"
                          >
                            Send Welcome
                          </button>
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
              <div className="mt-8 grid grid-cols-3 gap-4">
                <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 text-center">
                  <div className="text-3xl font-bold text-crevre-charcoal">{subscribers.length}</div>
                  <div className="text-sm text-crevre-charcoal/60 mt-1">Total Subscribers</div>
                </div>
                <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 text-center">
                  <div className="text-3xl font-bold text-green-600">
                    {subscribers.filter(s => s.status === 'active').length}
                  </div>
                  <div className="text-sm text-crevre-charcoal/60 mt-1">Active</div>
                </div>
                <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 text-center">
                  <div className="text-3xl font-bold text-red-600">
                    {subscribers.filter(s => s.status === 'unsubscribed').length}
                  </div>
                  <div className="text-sm text-crevre-charcoal/60 mt-1">Unsubscribed</div>
                </div>
              </div>
            </div>
          )}

          {/* Drop Email Tab */}
          {activeAdminTab === 'drop-email' && (
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-crevre-charcoal">Drop Email Campaign</h2>
                <div className="text-sm text-gray-600">
                  Send custom HTML emails to subscribers
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Email Composer */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Subject *</label>
                    <input
                      type="text"
                      value={dropEmailSubject}
                      onChange={(e) => setDropEmailSubject(e.target.value)}
                      placeholder="Enter email subject line..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-crevre-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">HTML + CSS Content *</label>
                    <textarea
                      value={dropEmailHTML}
                      onChange={(e) => setDropEmailHTML(e.target.value)}
                      placeholder="Paste your HTML + CSS email content here..."
                      rows={20}
                      className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-crevre-gold font-mono text-sm"
                    />
                    <p className="mt-1 text-sm text-gray-500">
                      Include inline CSS or style tags. HTML will be sent as-is.
                    </p>
                  </div>

                  {/* Recipient Selection */}
                  <div className="border-t pt-6">
                    <h4 className="text-lg font-medium text-crevre-charcoal mb-4">Recipients</h4>
                    
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="send-to-all"
                          checked={sendToAll}
                          onChange={(e) => setSendToAll(e.target.checked)}
                          className="mr-3 w-4 h-4 text-crevre-gold border-gray-300 focus:ring-crevre-gold"
                        />
                        <label htmlFor="send-to-all" className="text-sm font-medium text-gray-700">
                          Send to all active subscribers ({subscribers.filter(s => s.status === 'active').length} recipients)
                        </label>
                      </div>
                      
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="send-to-selected"
                          checked={!sendToAll}
                          onChange={(e) => setSendToAll(!e.target.checked)}
                          className="mr-3 w-4 h-4 text-crevre-gold border-gray-300 focus:ring-crevre-gold"
                        />
                        <label htmlFor="send-to-selected" className="text-sm font-medium text-gray-700">
                          Send to selected emails
                        </label>
                      </div>

                      {!sendToAll && (
                        <div className="ml-7">
                          <textarea
                            value={selectedEmails.join(', ')}
                            onChange={(e) => setSelectedEmails(e.target.value.split(',').map(email => email.trim()).filter(email => email))}
                            placeholder="Enter email addresses separated by commas..."
                            rows={3}
                            className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-crevre-gold"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Send Button */}
                  <div className="flex justify-end space-x-4 pt-6">
                    <button
                      onClick={() => {
                        setDropEmailHTML('')
                        setDropEmailSubject('')
                        setSelectedEmails([])
                        setSendToAll(false)
                      }}
                      className="px-6 py-2 border border-gray-300 text-gray-700 rounded-sm hover:bg-gray-50 transition-colors"
                    >
                      Clear All
                    </button>
                    <button
                      onClick={sendDropEmail}
                      disabled={adminLoading || !dropEmailSubject.trim() || !dropEmailHTML.trim()}
                      className="px-6 py-2 bg-crevre-gold hover:bg-crevre-gold-dark text-crevre-charcoal font-medium rounded-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {adminLoading ? 'Sending...' : 'Send Email Campaign'}
                    </button>
                  </div>
                </div>

                {/* Email Preview */}
                <div>
                  <h4 className="text-lg font-medium text-crevre-charcoal mb-4">Email Preview</h4>
                  <div className="border border-gray-300 rounded-sm h-96 overflow-auto bg-white">
                    {dropEmailHTML.trim() ? (
                      <div 
                        className="p-4" 
                        dangerouslySetInnerHTML={{ __html: dropEmailHTML }}
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-500">
                        <p>Enter HTML content to see preview</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-4 p-4 bg-gray-50 rounded-sm">
                    <h5 className="font-medium text-crevre-charcoal mb-2">Email Details:</h5>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p><strong>Subject:</strong> {dropEmailSubject || 'No subject'}</p>
                      <p><strong>Recipients:</strong> {sendToAll ? `All subscribers (${subscribers.filter(s => s.status === 'active').length})` : `Selected emails (${selectedEmails.length})`}</p>
                      <p><strong>Content Length:</strong> {dropEmailHTML.length} characters</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
