'use client'

import React, { useState, useEffect } from 'react'
import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import { ArrowLeftIcon, ShareIcon } from '@heroicons/react/24/outline'

interface BlogPost {
  _id?: string
  id: string
  title: string
  excerpt: string
  content: string
  image: string
  date: string
  readTime: string
  category: string
  slug: string
  author: string
  tags: string[]
  relatedPosts?: BlogPost[]
  seo: {
    title: string
    description: string
    keywords: string[]
  }
}

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const [post, setPost] = useState<BlogPost | null>(null)
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (params.slug) {
      fetchBlogPost(params.slug)
    }
  }, [params.slug])

  const fetchBlogPost = async (slug: string) => {
    try {
      const response = await fetch(`/api/blog/${slug}`)
      if (response.ok) {
        const data = await response.json()
        if (data.success && data.post) {
          setPost(data.post)
          setRelatedPosts(data.post.relatedPosts || [])
        } else {
          setError('Blog post not found')
        }
      } else {
        setError('Failed to load blog post')
      }
    } catch (error) {
      console.error('Failed to fetch blog post:', error)
      setError('Failed to load blog post')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-white pt-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-crevre-gold mx-auto mb-4"></div>
              <p className="text-crevre-charcoal/60">Loading article...</p>
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  if (error || !post) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-white pt-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center py-16">
              <h1 className="text-2xl font-light text-crevre-charcoal mb-4">
                {error || 'Blog post not found'}
              </h1>
              <Link href="/blog" className="text-crevre-gold hover:text-crevre-charcoal transition-colors">
                ← Back to Blog
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Head>
        <title>{post.seo.title}</title>
        <meta name="description" content={post.seo.description} />
        <meta name="keywords" content={post.seo.keywords.join(', ')} />
        <meta property="og:title" content={post.seo.title} />
        <meta property="og:description" content={post.seo.description} />
        <meta property="og:image" content={post.image} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href={`https://crevre.com/blog/${post.slug}`} />
      </Head>
      
      <Header />
      <main className="min-h-screen bg-white">
        {/* Article Header */}
        <article className="pt-24 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Navigation */}
            <div className="mb-8">
              <Link 
                href="/blog" 
                className="inline-flex items-center text-crevre-charcoal/60 hover:text-crevre-gold transition-colors font-light"
              >
                <ArrowLeftIcon className="w-4 h-4 mr-2" />
                Back to Blog
              </Link>
            </div>

            {/* Article Meta */}
            <div className="mb-8">
              <div className="flex items-center space-x-4 text-sm text-crevre-charcoal/60 mb-6">
                <span className="bg-crevre-gold/10 text-crevre-gold px-3 py-1 uppercase tracking-wide font-medium">
                  {post.category}
                </span>
                <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                <span>•</span>
                <span>{post.readTime}</span>
                <span>•</span>
                <span>By {post.author}</span>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-crevre-charcoal mb-8 leading-tight">
                {post.title}
              </h1>

              {/* Excerpt */}
              <p className="text-xl text-crevre-charcoal/70 font-light leading-relaxed mb-8">
                {post.excerpt}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {post.tags.map((tag) => (
                  <span key={tag} className="text-xs text-crevre-charcoal/50 bg-crevre-charcoal/5 px-3 py-1">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Featured Image */}
            <div className="aspect-[16/9] overflow-hidden mb-12">
              <Image
                src={post.image}
                alt={post.title}
                width={800}
                height={450}
                className="w-full h-full object-cover"
                priority
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              />
            </div>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              <div 
                className="text-crevre-charcoal leading-relaxed font-light"
                dangerouslySetInnerHTML={{ __html: post.content || post.excerpt }}
              />
            </div>

            {/* Share Section */}
            <div className="border-t border-crevre-charcoal/10 pt-8 mt-12">
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {post.tags.slice(0, 5).map((tag) => (
                    <span key={tag} className="text-sm text-crevre-charcoal/50 bg-crevre-charcoal/5 px-3 py-1">
                      #{tag}
                    </span>
                  ))}
                </div>
                <button className="flex items-center space-x-2 text-crevre-charcoal/60 hover:text-crevre-gold transition-colors">
                  <ShareIcon className="w-5 h-5" />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>
        </article>

        {/* Related Posts Section - SEO Inter-linking */}
        {relatedPosts.length > 0 && (
          <section className="py-16 bg-crevre-charcoal/5">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-light text-crevre-charcoal mb-6 tracking-tight">
                  Related Articles
                </h2>
                <div className="w-16 h-1 bg-crevre-gold mx-auto"></div>
                <p className="text-lg text-crevre-charcoal/70 mt-6 max-w-2xl mx-auto leading-relaxed">
                  Continue exploring fashion insights and style guides
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost) => (
                  <Link key={relatedPost.slug || relatedPost.id} href={`/blog/${relatedPost.slug || relatedPost.id}`} className="group">
                    <article className="bg-white hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                      <div className="aspect-[16/9] overflow-hidden">
                        <img
                          src={relatedPost.image}
                          alt={relatedPost.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex items-center text-xs text-crevre-charcoal/60 mb-3 space-x-2">
                          <span className="bg-crevre-gold/10 text-crevre-gold px-2 py-1 uppercase tracking-wide">
                            {relatedPost.category}
                          </span>
                          <span>•</span>
                          <span>{relatedPost.readTime}</span>
                        </div>
                        <h3 className="text-lg font-light text-crevre-charcoal group-hover:text-crevre-gold transition-colors line-clamp-2 mb-3">
                          {relatedPost.title}
                        </h3>
                        <p className="text-crevre-charcoal/60 text-sm line-clamp-2">
                          {relatedPost.excerpt}
                        </p>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Newsletter CTA - Matching Homepage Style */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-light text-crevre-charcoal mb-6 tracking-tight">
              Stay Updated with CREVRE
            </h2>
            <div className="w-16 h-1 bg-crevre-gold mx-auto mb-8"></div>
            <p className="text-lg text-crevre-charcoal/70 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
              Get the latest fashion insights, style guides, and exclusive content 
              <br className="hidden md:block" />
              delivered directly to your inbox.
            </p>
            
            <div className="max-w-md mx-auto">
              <form className="space-y-4">
                <input 
                  type="email" 
                  placeholder="Enter your email for fashion insights"
                  className="w-full px-6 py-4 border border-crevre-gray-dark bg-white text-crevre-charcoal placeholder-crevre-charcoal/50 focus:outline-none focus:border-crevre-gold transition-colors text-center rounded-sm"
                  required
                />
                <button 
                  type="submit"
                  className="w-full px-8 py-4 bg-crevre-charcoal hover:bg-crevre-gold text-white hover:text-crevre-charcoal font-medium transition-all duration-300 uppercase tracking-wider text-sm rounded-sm"
                >
                  Subscribe to Insights
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
