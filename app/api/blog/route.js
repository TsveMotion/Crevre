import { NextResponse } from 'next/server'
import clientPromise from '../../../lib/mongodb'

export async function GET(request) {
  try {
    const client = await clientPromise
    const db = client.db('crevre')
    
    // Get all blog posts, sorted by date (newest first)
    const posts = await db.collection('blogPosts').find({}).sort({ date: -1 }).toArray()
    
    return NextResponse.json({
      success: true,
      posts: posts
    })
  } catch (error) {
    console.error('Failed to fetch blog posts:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch blog posts'
    }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const client = await clientPromise
    const db = client.db('crevre')
    
    const body = await request.json()
    const { 
      title, 
      excerpt, 
      content, 
      image, 
      category, 
      slug, 
      author, 
      tags, 
      readTime, 
      seo,
      relatedPosts 
    } = body
    
    // Validate required fields
    if (!title || !excerpt || !content || !category || !slug) {
      return NextResponse.json({
        success: false,
        error: 'Missing required fields'
      }, { status: 400 })
    }
    
    // Create blog post object
    const blogPost = {
      title,
      excerpt,
      content,
      image: image || 'https://picsum.photos/400/300?random=' + Date.now(),
      category,
      slug,
      author: author || 'CREVRE Team',
      tags: tags || [],
      readTime: readTime || '5 min read',
      date: new Date().toISOString().split('T')[0],
      createdAt: new Date(),
      updatedAt: new Date(),
      seo: seo || {
        title: title,
        description: excerpt,
        keywords: tags || []
      },
      relatedPosts: relatedPosts || [],
      published: true
    }
    
    // Check if slug already exists
    const existingPost = await db.collection('blogPosts').findOne({ slug })
    if (existingPost) {
      return NextResponse.json({
        success: false,
        error: 'Blog post with this slug already exists'
      }, { status: 400 })
    }
    
    // Insert the blog post
    const result = await db.collection('blogPosts').insertOne(blogPost)
    
    if (result.insertedId) {
      return NextResponse.json({
        success: true,
        message: 'Blog post created successfully',
        id: result.insertedId,
        post: { ...blogPost, _id: result.insertedId }
      })
    } else {
      throw new Error('Failed to insert blog post')
    }
    
  } catch (error) {
    console.error('Failed to create blog post:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to create blog post'
    }, { status: 500 })
  }
}

export async function PUT(request) {
  try {
    const client = await clientPromise
    const db = client.db('crevre')
    const { ObjectId } = require('mongodb')
    
    const body = await request.json()
    const { id, ...updateData } = body
    
    if (!id) {
      return NextResponse.json({
        success: false,
        error: 'Blog post ID is required'
      }, { status: 400 })
    }
    
    // Update the blog post
    const result = await db.collection('blogPosts').updateOne(
      { _id: new ObjectId(id) },
      { 
        $set: {
          ...updateData,
          updatedAt: new Date()
        }
      }
    )
    
    if (result.modifiedCount === 1) {
      return NextResponse.json({
        success: true,
        message: 'Blog post updated successfully'
      })
    } else {
      return NextResponse.json({
        success: false,
        error: 'Blog post not found or no changes made'
      }, { status: 404 })
    }
    
  } catch (error) {
    console.error('Failed to update blog post:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to update blog post'
    }, { status: 500 })
  }
}
