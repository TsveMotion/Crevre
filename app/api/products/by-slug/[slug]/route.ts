import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'

interface RouteParams {
  params: {
    slug: string
  }
}

// GET - Fetch single product by slug
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { slug } = params

    if (!slug) {
      return NextResponse.json(
        { error: 'Slug parameter is required' },
        { status: 400 }
      )
    }

    const client = await clientPromise
    const db = client.db('crevre')
    const products = db.collection('products')

    // Find product by seo.slug
    const product = await products.findOne({ 'seo.slug': slug })

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      product: product
    })

  } catch (error) {
    console.error('Error fetching product by slug:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
