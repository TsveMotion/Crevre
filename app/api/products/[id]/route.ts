import { NextRequest, NextResponse } from 'next/server'
import { ObjectId, WithId } from 'mongodb'
import clientPromise from '@/lib/mongodb'
import { Product, ProductDoc, COLLECTIONS } from '@/lib/models'

interface RouteParams {
  params: {
    id: string
  }
}

// GET - Fetch single product by ID
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = params

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid product ID' },
        { status: 400 }
      )
    }

    const client = await clientPromise
    const db = client.db('crevre')
    const products = db.collection<ProductDoc>(COLLECTIONS.PRODUCTS)

    const product = await products.findOne({ _id: new ObjectId(id) })

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    // Convert ObjectId to string for client
    const clientProduct: Product = {
      ...product,
      _id: product._id.toString()
    }

    return NextResponse.json(clientProduct)

  } catch (error) {
    console.error('Product fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    )
  }
}

// PUT - Update product
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = params
    const updateData = await request.json()

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid product ID' },
        { status: 400 }
      )
    }

    const client = await clientPromise
    const db = client.db('crevre')
    const products = db.collection<ProductDoc>(COLLECTIONS.PRODUCTS)

    // Prepare update object (exclude _id and createdAt)
    const { _id, createdAt, ...updateFields } = updateData
    
    const updateObject = {
      ...updateFields,
      updatedAt: new Date()
    }

    // If price is being updated, ensure it's a number
    if (updateObject.price) {
      updateObject.price = parseFloat(updateObject.price)
    }

    const result = await products.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateObject }
    )

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    // Fetch and return updated product
    const updatedProduct = await products.findOne({ _id: new ObjectId(id) })
    
    if (!updatedProduct) {
      return NextResponse.json(
        { error: 'Product not found after update' },
        { status: 404 }
      )
    }

    // Convert ObjectId to string for client
    const clientProduct: Product = {
      ...updatedProduct,
      _id: updatedProduct._id.toString()
    }

    return NextResponse.json({
      message: 'Product updated successfully',
      product: clientProduct
    })

  } catch (error) {
    console.error('Product update error:', error)
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    )
  }
}

// DELETE - Delete product
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = params

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid product ID' },
        { status: 400 }
      )
    }

    const client = await clientPromise
    const db = client.db('crevre')
    const products = db.collection<ProductDoc>(COLLECTIONS.PRODUCTS)

    const result = await products.deleteOne({ _id: new ObjectId(id) })

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      message: 'Product deleted successfully'
    })

  } catch (error) {
    console.error('Product deletion error:', error)
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    )
  }
}
