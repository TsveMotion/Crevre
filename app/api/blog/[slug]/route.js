import { NextResponse } from 'next/server'
import clientPromise from '../../../../lib/mongodb'

export async function GET(request, { params }) {
  try {
    const client = await clientPromise
    const db = client.db('crevre')
    
    const { slug } = params
    
    // Get the blog post by slug
    const post = await db.collection('blogPosts').findOne({ slug })
    
    if (!post) {
      return NextResponse.json({
        success: false,
        error: 'Blog post not found'
      }, { status: 404 })
    }
    
    // Get related posts based on tags and category
    const relatedPosts = await db.collection('blogPosts').find({
      $and: [
        { slug: { $ne: slug } }, // Exclude current post
        {
          $or: [
            { category: post.category },
            { tags: { $in: post.tags } }
          ]
        }
      ]
    }).limit(3).toArray()
    
    // Update related posts in the current post if needed
    const relatedPostSlugs = relatedPosts.map(p => p.slug)
    if (post.relatedPosts?.length !== relatedPostSlugs.length || 
        !post.relatedPosts?.every(slug => relatedPostSlugs.includes(slug))) {
      await db.collection('blogPosts').updateOne(
        { slug },
        { $set: { relatedPosts: relatedPostSlugs } }
      )
    }
    
    return NextResponse.json({
      success: true,
      post: {
        ...post,
        relatedPosts: relatedPosts
      }
    })
  } catch (error) {
    console.error('Failed to fetch blog post:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch blog post'
    }, { status: 500 })
  }
}
