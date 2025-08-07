// MongoDB collection schemas and interfaces
import { ObjectId } from 'mongodb'

// Base interfaces for database documents (with ObjectId)
export interface EmailSubscriberDoc {
  email: string
  subscribedAt: Date
  source: string // 'landing-page', 'admin', etc.
  status: 'active' | 'unsubscribed'
  preferences?: {
    earlyAccess: boolean
    memberUpdates: boolean
    collectionLaunches: boolean
  }
}

export interface ProductDoc {
  name: string
  description: string
  price: number
  category: string
  images: string[] // URLs to product images
  variants?: {
    size: string[]
    color: string[]
  }
  inventory: {
    inStock: boolean
    quantity?: number
  }
  status: 'active' | 'draft' | 'archived'
  saleStatus: 'for-sale' | 'preview-only'
  seo: {
    title: string
    description: string
    keywords: string[]
    slug: string
  }
  createdAt: Date
  updatedAt: Date
  featured: boolean
  tags: string[]
}

export interface CollectionDoc {
  name: string
  description: string
  slug: string
  products: string[] // Product IDs
  featured: boolean
  launchDate?: Date
  status: 'active' | 'draft' | 'archived'
  createdAt: Date
  updatedAt: Date
}

// Client-side interfaces (with string _id for easier JSON serialization)
export interface EmailSubscriber extends EmailSubscriberDoc {
  _id: string
}

export interface Product extends ProductDoc {
  _id: string
}

export interface Collection extends CollectionDoc {
  _id: string
}

// Collection names
export const COLLECTIONS = {
  SUBSCRIBERS: 'subscribers',
  PRODUCTS: 'products',
  COLLECTIONS: 'collections'
} as const
