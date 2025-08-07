'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

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

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState<'products' | 'subscribers'>('products')
  const [products, setProducts] = useState<Product[]>([])
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [filteredSubscribers, setFilteredSubscribers] = useState<Subscriber[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [showProductForm, setShowProductForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const router = useRouter()

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

  // Check authentication on mount
  useEffect(() => {
    checkAuth()
  }, [])

  useEffect(() => {
    if (isAuthenticated && activeTab === 'products') {
      fetchProducts()
    } else if (isAuthenticated && activeTab === 'subscribers') {
      fetchSubscribers()
    }
  }, [activeTab, isAuthenticated])
  
  // Filter subscribers when search query changes
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredSubscribers(subscribers)
    } else {
      const query = searchQuery.toLowerCase()
      const filtered = subscribers.filter(subscriber => 
        subscriber.email.toLowerCase().includes(query) ||
        subscriber.source.toLowerCase().includes(query) ||
        subscriber.status.toLowerCase().includes(query)
      )
      setFilteredSubscribers(filtered)
    }
  }, [searchQuery, subscribers])

  const checkAuth = async () => {
    try {
      // Check if admin-auth cookie exists
      const response = await fetch('/admin/auth-check')
      if (response.ok) {
        setIsAuthenticated(true)
      } else {
        router.push('/admin/login')
      }
    } catch (error) {
      console.error('Auth check failed:', error)
      router.push('/admin/login')
    }
  }

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/products')
      if (response.ok) {
        const data = await response.json()
        setProducts(data.products)
      }
    } catch (error) {
      console.error('Failed to fetch products:', error)
    }
    setLoading(false)
  }

  const fetchSubscribers = async () => {
    setLoading(true)
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
    setLoading(false)
  }

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

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
    setLoading(false)
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
        // Handle the new MongoDB image response format
        const newImageUrls = data.images ? data.images.map((img: any) => img.url) : []
        setProductForm({
          ...productForm,
          images: [...productForm.images, ...newImageUrls]
        })
      } else {
        alert('Failed to upload images')
      }
    } catch (error) {
      console.error('Image upload error:', error)
      alert('Failed to upload images')
    }
  }

  const removeImage = (index: number) => {
    setProductForm({
      ...productForm,
      images: productForm.images.filter((_, i) => i !== index)
    })
  }

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product)
    setProductForm({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      category: product.category,
      status: product.status,
      saleStatus: product.saleStatus || 'preview-only',
      featured: product.featured,
      images: product.images || [],
      seo: {
        title: product.seo?.title || '',
        description: product.seo?.description || '',
        keywords: product.seo?.keywords?.join(', ') || '',
        slug: product.seo?.slug || ''
      }
    })
    setShowProductForm(true)
  }

  const handleDeleteProduct = async (productId: string) => {
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
      console.error('Delete error:', error)
      alert('Network error occurred')
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

  const handleDeleteSubscriber = async (subscriberId: string) => {
    if (!confirm('Are you sure you want to delete this subscriber?')) return

    try {
      const response = await fetch(`/api/subscribers/${subscriberId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        await fetchSubscribers()
      } else {
        alert('Failed to delete subscriber')
      }
    } catch (error) {
      console.error('Delete error:', error)
      alert('Network error occurred')
    }
  }

  const exportSubscribersToCSV = () => {
    // Create CSV content
    const headers = ['Email', 'Status', 'Source', 'Subscribed Date']
    const csvContent = [
      headers.join(','),
      ...filteredSubscribers.map(sub => [
        sub.email,
        sub.status,
        sub.source,
        new Date(sub.subscribedAt).toLocaleDateString()
      ].join(','))
    ].join('\n')

    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.setAttribute('href', url)
    link.setAttribute('download', `crevre-subscribers-${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleLogout = async () => {
    try {
      await fetch('/admin/auth', { method: 'DELETE' })
      router.push('/admin/login')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  // Show loading while checking authentication
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-crevre-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-crevre-gold border-t-transparent mx-auto mb-4"></div>
          <p className="text-crevre-charcoal/60">Checking authentication...</p>
        </div>
      </div>
    )
  }

  // If not authenticated, the useEffect will redirect to login
  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-crevre-white">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-display font-semibold text-crevre-charcoal mb-4">
              Crevre Admin Dashboard
            </h1>
            <p className="text-crevre-charcoal/70 font-light">
              Manage your products and subscribers
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-crevre-charcoal/60 hover:text-crevre-charcoal border border-crevre-gold/20 hover:border-crevre-gold/40 rounded-sm transition-all duration-300"
          >
            Sign Out
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-8 bg-crevre-gray p-1 rounded-sm w-fit">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-6 py-3 rounded-sm font-medium transition-all duration-200 ${
              activeTab === 'products'
                ? 'bg-crevre-gold text-crevre-white shadow-sm'
                : 'text-crevre-charcoal hover:bg-crevre-gold/10'
            }`}
          >
            Products ({products.length})
          </button>
          <button
            onClick={() => setActiveTab('subscribers')}
            className={`px-6 py-3 rounded-sm font-medium transition-all duration-200 ${
              activeTab === 'subscribers'
                ? 'bg-crevre-gold text-crevre-white shadow-sm'
                : 'text-crevre-charcoal hover:bg-crevre-gold/10'
            }`}
          >
            Subscribers ({subscribers.length})
          </button>
        </div>

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-display font-semibold text-crevre-charcoal">
                Products
              </h2>
              <button
                onClick={() => setShowProductForm(true)}
                className="bg-crevre-gold hover:bg-crevre-gold-dark text-crevre-white px-6 py-3 rounded-sm font-medium transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Add New Product
              </button>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-crevre-gold border-t-transparent mx-auto"></div>
                <p className="text-crevre-charcoal/60 mt-4">Loading products...</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {products.map((product) => (
                  <div key={product._id} className="bg-crevre-ivory border border-crevre-gold/20 rounded-sm p-6 hover:shadow-md transition-all duration-300">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-display font-semibold text-crevre-charcoal">
                            {product.name}
                          </h3>
                          <span className={`px-3 py-1 rounded-sm text-xs font-medium ${
                            product.status === 'active' ? 'bg-green-100 text-green-800' :
                            product.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {product.status}
                          </span>
                          {product.featured && (
                            <span className="px-3 py-1 bg-crevre-gold/20 text-crevre-gold rounded-sm text-xs font-medium">
                              Featured
                            </span>
                          )}
                        </div>
                        <p className="text-crevre-charcoal/70 mb-2 font-light">
                          {product.description || 'No description'}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-crevre-charcoal/60">
                          <span className="font-medium text-crevre-gold">£{product.price}</span>
                          <span>Category: {product.category}</span>
                          <span>Created: {new Date(product.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditProduct(product)}
                          className="px-4 py-2 bg-crevre-charcoal/10 hover:bg-crevre-charcoal/20 text-crevre-charcoal rounded-sm text-sm transition-all duration-200"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product._id)}
                          className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-sm text-sm transition-all duration-200"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {products.length === 0 && (
                  <div className="text-center py-12 text-crevre-charcoal/60">
                    <p className="font-light">No products found. Create your first product to get started!</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Subscribers Tab */}
        {activeTab === 'subscribers' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-display font-semibold text-crevre-charcoal">
                Email Subscribers
              </h2>
              <div className="flex gap-3">
                <button
                  onClick={() => exportSubscribersToCSV()}
                  className="bg-crevre-charcoal hover:bg-crevre-charcoal/80 text-white px-4 py-2 rounded-sm text-sm transition-all duration-200 flex items-center gap-2"
                >
                  <span>Export CSV</span>
                </button>
              </div>
            </div>
            
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search subscribers by email, source, or status..."
                  className="w-full px-4 py-3 pl-10 border-2 border-crevre-gray-dark focus:border-crevre-gold rounded-sm text-crevre-charcoal placeholder-crevre-charcoal/50 transition-all duration-300 outline-none"
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-crevre-charcoal/50">
                  🔍
                </div>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-crevre-charcoal/50 hover:text-crevre-charcoal"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
            
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-crevre-gold border-t-transparent mx-auto"></div>
                <p className="text-crevre-charcoal/60 mt-4">Loading subscribers...</p>
              </div>
            ) : (
              <div className="bg-crevre-white border border-crevre-gold/20 rounded-sm overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-crevre-ivory">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-display font-semibold text-crevre-charcoal">
                          Email
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-display font-semibold text-crevre-charcoal">
                          Status
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-display font-semibold text-crevre-charcoal">
                          Source
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-display font-semibold text-crevre-charcoal">
                          Subscribed
                        </th>
                        <th className="px-6 py-4 text-center text-sm font-display font-semibold text-crevre-charcoal">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-crevre-gold/10">
                      {filteredSubscribers.map((subscriber) => (
                        <tr key={subscriber._id} className="hover:bg-crevre-ivory/50 transition-colors duration-200">
                          <td className="px-6 py-4 text-sm text-crevre-charcoal font-medium">
                            {subscriber.email}
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-sm text-xs font-medium ${
                              subscriber.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {subscriber.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-crevre-charcoal/70">
                            {subscriber.source}
                          </td>
                          <td className="px-6 py-4 text-sm text-crevre-charcoal/70">
                            {new Date(subscriber.subscribedAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 text-center">
                            <button
                              onClick={() => handleDeleteSubscriber(subscriber._id)}
                              className="px-3 py-1 bg-red-100 hover:bg-red-200 text-red-700 rounded-sm text-xs transition-all duration-200"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {filteredSubscribers.length === 0 && (
                  <div className="text-center py-12 text-crevre-charcoal/60">
                    {subscribers.length === 0 ? (
                      <p className="font-light">No subscribers yet. Share your landing page to get started!</p>
                    ) : (
                      <p className="font-light">No subscribers match your search criteria.</p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Product Form Modal */}
        {showProductForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-crevre-white rounded-sm p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <h3 className="text-2xl font-display font-semibold text-crevre-charcoal mb-6">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h3>
              
              <form onSubmit={handleProductSubmit} className="space-y-6">
                {/* Basic Product Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-crevre-charcoal mb-2">
                      Product Name *
                    </label>
                    <input
                      type="text"
                      value={productForm.name}
                      onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-crevre-gray-dark focus:border-crevre-gold rounded-sm text-crevre-charcoal placeholder-crevre-charcoal/50 transition-all duration-300 outline-none"
                      placeholder="Enter product name"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-crevre-charcoal mb-2">
                      Description
                    </label>
                    <textarea
                      value={productForm.description}
                      onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-crevre-gray-dark focus:border-crevre-gold rounded-sm text-crevre-charcoal placeholder-crevre-charcoal/50 transition-all duration-300 outline-none"
                      placeholder="Enter product description"
                      rows={3}
                    />
                  </div>
                </div>

                {/* Product Images */}
                <div>
                  <label className="block text-sm font-medium text-crevre-charcoal mb-2">
                    Product Images
                  </label>
                  <div className="space-y-4">
                    {productForm.images.length > 0 && (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {productForm.images.map((image, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={image}
                              alt={`Product ${index + 1}`}
                              className="w-full h-24 object-cover rounded-sm border border-crevre-gold/20"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="w-full px-4 py-3 border-2 border-dashed border-crevre-gold/30 focus:border-crevre-gold rounded-sm text-crevre-charcoal transition-all duration-300 outline-none file:mr-4 file:py-2 file:px-4 file:rounded-sm file:border-0 file:text-sm file:font-medium file:bg-crevre-gold file:text-white hover:file:bg-crevre-gold-dark"
                    />
                    <p className="text-xs text-crevre-charcoal/60">Upload multiple images. First image will be the main product image.</p>
                  </div>
                </div>

                {/* Pricing and Category */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-crevre-charcoal mb-2">
                      Price (£) *
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={productForm.price}
                      onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-crevre-gray-dark focus:border-crevre-gold rounded-sm text-crevre-charcoal placeholder-crevre-charcoal/50 transition-all duration-300 outline-none"
                      placeholder="0.00"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-crevre-charcoal mb-2">
                      Category
                    </label>
                    <select
                      value={productForm.category}
                      onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-crevre-gray-dark focus:border-crevre-gold rounded-sm text-crevre-charcoal transition-all duration-300 outline-none"
                    >
                      <option value="clothing">Clothing</option>
                      <option value="accessories">Accessories</option>
                      <option value="footwear">Footwear</option>
                      <option value="bags">Bags</option>
                      <option value="jewelry">Jewelry</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-crevre-charcoal mb-2">
                      Sale Status *
                    </label>
                    <select
                      value={productForm.saleStatus}
                      onChange={(e) => setProductForm({ ...productForm, saleStatus: e.target.value as 'for-sale' | 'preview-only' })}
                      className="w-full px-4 py-3 border-2 border-crevre-gray-dark focus:border-crevre-gold rounded-sm text-crevre-charcoal transition-all duration-300 outline-none"
                    >
                      <option value="preview-only">Preview Only (Email Signup)</option>
                      <option value="for-sale">For Sale (Add to Cart)</option>
                    </select>
                  </div>
                </div>

                {/* Status and Featured */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-crevre-charcoal mb-2">
                      Status
                    </label>
                    <select
                      value={productForm.status}
                      onChange={(e) => setProductForm({ ...productForm, status: e.target.value as 'active' | 'draft' | 'archived' })}
                      className="w-full px-4 py-3 border-2 border-crevre-gray-dark focus:border-crevre-gold rounded-sm text-crevre-charcoal transition-all duration-300 outline-none"
                    >
                      <option value="draft">Draft</option>
                      <option value="active">Active</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>

                  <div className="flex items-center pt-6">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={productForm.featured}
                        onChange={(e) => setProductForm({ ...productForm, featured: e.target.checked })}
                        className="w-5 h-5 text-crevre-gold border-2 border-crevre-gray-dark rounded focus:ring-crevre-gold"
                      />
                      <span className="ml-3 text-sm font-medium text-crevre-charcoal">
                        Featured Product
                      </span>
                    </label>
                  </div>
                </div>

                {/* SEO Section */}
                <div className="border-t border-crevre-gold/20 pt-6">
                  <h4 className="text-lg font-display font-semibold text-crevre-charcoal mb-4">
                    SEO Optimization 🚀
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-crevre-charcoal mb-2">
                        SEO Title (for Google)
                      </label>
                      <input
                        type="text"
                        value={productForm.seo.title}
                        onChange={(e) => setProductForm({ ...productForm, seo: { ...productForm.seo, title: e.target.value } })}
                        className="w-full px-4 py-3 border-2 border-crevre-gray-dark focus:border-crevre-gold rounded-sm text-crevre-charcoal placeholder-crevre-charcoal/50 transition-all duration-300 outline-none"
                        placeholder="Enter SEO title (60 chars max)"
                        maxLength={60}
                      />
                      <p className="text-xs text-crevre-charcoal/60 mt-1">{productForm.seo.title.length}/60 characters</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-crevre-charcoal mb-2">
                        Meta Description (for Google)
                      </label>
                      <textarea
                        value={productForm.seo.description}
                        onChange={(e) => setProductForm({ ...productForm, seo: { ...productForm.seo, description: e.target.value } })}
                        className="w-full px-4 py-3 border-2 border-crevre-gray-dark focus:border-crevre-gold rounded-sm text-crevre-charcoal placeholder-crevre-charcoal/50 transition-all duration-300 outline-none"
                        placeholder="Enter meta description for search results (160 chars max)"
                        rows={2}
                        maxLength={160}
                      />
                      <p className="text-xs text-crevre-charcoal/60 mt-1">{productForm.seo.description.length}/160 characters</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-crevre-charcoal mb-2">
                        SEO Keywords (comma-separated)
                      </label>
                      <input
                        type="text"
                        value={productForm.seo.keywords}
                        onChange={(e) => setProductForm({ ...productForm, seo: { ...productForm.seo, keywords: e.target.value } })}
                        className="w-full px-4 py-3 border-2 border-crevre-gray-dark focus:border-crevre-gold rounded-sm text-crevre-charcoal placeholder-crevre-charcoal/50 transition-all duration-300 outline-none"
                        placeholder="fashion, streetwear, premium clothing, luxury"
                      />
                      <p className="text-xs text-crevre-charcoal/60 mt-1">Help your product rank higher in Google searches</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-crevre-charcoal mb-2">
                        URL Slug
                      </label>
                      <input
                        type="text"
                        value={productForm.seo.slug}
                        onChange={(e) => setProductForm({ ...productForm, seo: { ...productForm.seo, slug: e.target.value } })}
                        className="w-full px-4 py-3 border-2 border-crevre-gray-dark focus:border-crevre-gold rounded-sm text-crevre-charcoal placeholder-crevre-charcoal/50 transition-all duration-300 outline-none"
                        placeholder="Auto-generated from product name"
                      />
                      <p className="text-xs text-crevre-charcoal/60 mt-1">Leave blank to auto-generate from product name</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={resetProductForm}
                    className="flex-1 px-6 py-3 border-2 border-crevre-gold text-crevre-gold hover:bg-crevre-gold hover:text-crevre-white rounded-sm font-medium transition-all duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-crevre-gold hover:bg-crevre-gold-dark text-crevre-white px-6 py-3 rounded-sm font-medium transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Saving...' : editingProduct ? 'Update Product' : 'Add Product'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminPage
