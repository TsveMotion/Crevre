import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { Product, ProductDoc, COLLECTIONS } from '@/lib/models'
import { ObjectId } from 'mongodb'

// GET - Fetch all products
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const featured = searchParams.get('featured')
    const category = searchParams.get('category')
    const limit = parseInt(searchParams.get('limit') || '50')
    const skip = parseInt(searchParams.get('skip') || '0')

    const client = await clientPromise
    const db = client.db('crevre')
    const products = db.collection<ProductDoc>(COLLECTIONS.PRODUCTS)

    // Build filter object
    const filter: any = {}
    if (status) filter.status = status
    if (featured !== null) filter.featured = featured === 'true'
    if (category) filter.category = category

    const productList = await products
      .find(filter)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip)
      .toArray()

    // Convert ObjectIds to strings for client
    const clientProducts: Product[] = productList.map(product => ({
      ...product,
      _id: product._id.toString()
    }))

    const total = await products.countDocuments(filter)

    return NextResponse.json({
      products: clientProducts,
      total,
      page: Math.floor(skip / limit) + 1,
      totalPages: Math.ceil(total / limit)
    })

  } catch (error) {
    console.error('Products fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}

// POST - Create new product
export async function POST(request: NextRequest) {
  try {
    const productData = await request.json()

    // Validate required fields
    if (!productData.name || !productData.price) {
      return NextResponse.json(
        { error: 'Name and price are required' },
        { status: 400 }
      )
    }

    const client = await clientPromise
    const db = client.db('crevre')
    const products = db.collection<ProductDoc>(COLLECTIONS.PRODUCTS)

    const newProduct: ProductDoc = {
      name: productData.name,
      description: productData.description || '',
      price: parseFloat(productData.price),
      category: productData.category || 'general',
      images: productData.images || [],
      variants: productData.variants || { size: [], color: [] },
      inventory: {
        inStock: productData.inventory?.inStock ?? true,
        quantity: productData.inventory?.quantity || 0
      },
      status: productData.status || 'draft',
      featured: productData.featured || false,
      tags: productData.tags || [],
      createdAt: new Date(),
      updatedAt: new Date()
    }

    const result = await products.insertOne(newProduct)

    // Create client-side product format
    const clientProduct: Product = {
      ...newProduct,
      _id: result.insertedId.toString()
    }

    return NextResponse.json(
      { 
        message: 'Product created successfully',
        productId: result.insertedId.toString(),
        product: clientProduct
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('Product creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    )
  }
}
