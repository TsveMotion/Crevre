'use client'

import React, { useState, useEffect } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'

interface BlogPost {
  _id?: string
  id: string
  title: string
  excerpt: string
  content?: string
  image: string
  date: string
  readTime: string
  category: string
  slug: string
  author: string
  tags: string[]
  relatedPosts?: string[]
  seo: {
    title: string
    description: string
    keywords: string[]
  }
}

const defaultBlogPosts: BlogPost[] = [
  {
    id: 'fashion-trends-2024',
    title: 'Fashion Trends 2024: What\'s Defining Contemporary Elegance',
    excerpt: 'Explore the fashion trends that are shaping 2024, from sustainable luxury to minimalist streetwear aesthetics.',
    image: 'https://picsum.photos/400/300?random=1',
    date: '2024-08-01',
    readTime: '5 min read',
    category: 'Trends',
    slug: 'fashion-trends-2024',
    author: 'CREVRE Team',
    tags: ['fashion', 'trends', '2024', 'contemporary', 'elegance'],
    seo: {
      title: 'Fashion Trends 2024: Contemporary Elegance Guide',
      description: 'Discover the top fashion trends shaping 2024, from sustainable luxury to minimalist streetwear.',
      keywords: ['fashion trends 2024', 'contemporary fashion', 'luxury fashion', 'minimalist style']
    }
  },
  {
    id: 'luxury-fashion-guide',
    title: 'The Ultimate Guide to Luxury Fashion Investment Pieces',
    excerpt: 'Learn how to build a timeless wardrobe with premium pieces that stand the test of time and elevate your style.',
    image: 'https://picsum.photos/400/300?random=2',
    date: '2024-07-28',
    readTime: '8 min read',
    category: 'Guide',
    slug: 'luxury-fashion-guide',
    author: 'CREVRE Team',
    tags: ['luxury', 'investment', 'wardrobe', 'premium', 'timeless'],
    seo: {
      title: 'Ultimate Luxury Fashion Investment Guide - CREVRE',
      description: 'Build a timeless wardrobe with our guide to luxury fashion investment pieces.',
      keywords: ['luxury fashion', 'investment pieces', 'premium wardrobe', 'timeless fashion']
    }
  },
  {
    id: 'sustainable-fashion',
    title: 'Sustainable Fashion: The Future of Premium Clothing',
    excerpt: 'Discover how luxury brands are embracing sustainability without compromising on quality and style.',
    image: 'https://picsum.photos/400/300?random=3',
    date: '2024-07-25',
    readTime: '6 min read',
    category: 'Sustainability',
    slug: 'sustainable-fashion',
    author: 'CREVRE Team',
    tags: ['sustainable', 'eco-friendly', 'luxury', 'premium', 'future'],
    seo: {
      title: 'Sustainable Fashion: The Future of Premium Clothing',
      description: 'Learn how luxury brands embrace sustainability while maintaining quality and style.',
      keywords: ['sustainable fashion', 'eco-friendly clothing', 'premium sustainability', 'luxury fashion']
    }
  },
  {
    id: 'minimalist-fashion-guide',
    title: 'The Art of Minimalist Fashion: Building a Timeless Wardrobe',
    excerpt: 'Master the art of minimalist fashion with our comprehensive guide to building a curated wardrobe with versatile pieces.',
    image: 'https://picsum.photos/400/300?random=4',
    date: '2024-08-05',
    readTime: '7 min read',
    category: 'Style Guide',
    slug: 'minimalist-fashion-guide',
    author: 'CREVRE Team',
    tags: ['minimalist', 'timeless', 'wardrobe', 'versatile', 'style'],
    seo: {
      title: 'Minimalist Fashion Guide: Build a Timeless Wardrobe',
      description: 'Master minimalist fashion with our guide to building a curated, versatile wardrobe.',
      keywords: ['minimalist fashion', 'timeless wardrobe', 'capsule wardrobe', 'minimal style']
    }
  },
  {
    id: 'fashion-week-insights-2024',
    title: 'Fashion Week Insights 2024: Key Trends from Paris, Milan & New York',
    excerpt: 'Get exclusive insights from Fashion Week 2024 and discover the key trends shaping the future of luxury fashion.',
    image: 'https://picsum.photos/400/300?random=5',
    date: '2024-08-03',
    readTime: '6 min read',
    category: 'Fashion Week',
    slug: 'fashion-week-insights-2024',
    author: 'CREVRE Team',
    tags: ['fashion week', 'paris', 'milan', 'new york', 'trends'],
    seo: {
      title: 'Fashion Week 2024: Key Trends from Paris, Milan & NYC',
      description: 'Exclusive insights from Fashion Week 2024 and the trends shaping luxury fashion.',
      keywords: ['fashion week 2024', 'paris fashion week', 'milan fashion week', 'luxury trends']
    }
  },
  {
    id: 'color-psychology-fashion',
    title: 'Color Psychology in Fashion: How Colors Influence Style and Mood',
    excerpt: 'Understand the powerful impact of color in fashion and learn how to use color psychology to enhance your personal style.',
    image: 'https://picsum.photos/400/300?random=6',
    date: '2024-08-02',
    readTime: '4 min read',
    category: 'Psychology',
    slug: 'color-psychology-fashion',
    author: 'CREVRE Team',
    tags: ['color', 'psychology', 'style', 'mood', 'personal'],
    seo: {
      title: 'Color Psychology in Fashion: Style & Mood Guide',
      description: 'Learn how color psychology influences fashion and enhances your personal style.',
      keywords: ['color psychology', 'fashion psychology', 'style colors', 'fashion mood']
    }
  }
]

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(defaultBlogPosts)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBlogPosts()
  }, [])

  const fetchBlogPosts = async () => {
    try {
      const response = await fetch('/api/blog')
      if (response.ok) {
        const data = await response.json()
        if (data.posts && data.posts.length > 0) {
          setBlogPosts(data.posts)
        }
      }
    } catch (error) {
      console.error('Failed to fetch blog posts:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>CREVRE Fashion Blog - Style Insights & Trends | Premium Fashion</title>
        <meta name="description" content="Discover the latest fashion trends, style guides, and expert insights from CREVRE. Premium fashion knowledge and contemporary elegance tips." />
        <meta name="keywords" content="fashion blog, style trends, premium fashion, CREVRE insights, fashion guide, luxury style" />
        <meta property="og:title" content="CREVRE Fashion Blog - Style Insights & Trends" />
        <meta property="og:description" content="Expert fashion insights and premium style guides from CREVRE." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://crevre.com/blog" />
      </Head>
      
      <Header />
      <main className="min-h-screen bg-white">
      
        {/* Hero Section - Matching Homepage Style */}
        <section className="pt-24 pb-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              {/* Main Headline - Same as Homepage */}
              <div className="mb-12">
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-light text-crevre-charcoal mb-6 leading-[0.9] tracking-tight">
                  CREVRE
                </h1>
                <div className="h-1 w-24 bg-crevre-gold mx-auto mb-8"></div>
                <h2 className="text-2xl md:text-3xl font-light text-crevre-charcoal mb-8 tracking-wide">
                  FASHION INSIGHTS
                </h2>
              </div>

              {/* Subtitle */}
              <p className="text-lg md:text-xl text-crevre-charcoal/70 mb-16 max-w-3xl mx-auto font-light leading-relaxed">
                Discover the latest trends, style guides, and expert insights 
                <br className="hidden md:block" />
                from the world of premium fashion and contemporary elegance.
              </p>
            </div>
          </div>
        </section>

        {/* Featured Articles Section - Matching Homepage Product Grid Style */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-light text-crevre-charcoal mb-6 tracking-tight">
                Latest Insights
              </h2>
              <div className="w-24 h-1 bg-crevre-gold mx-auto mb-8"></div>
              <p className="text-lg text-crevre-charcoal/70 max-w-2xl mx-auto leading-relaxed">
                Expert fashion insights and premium style guides
              </p>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-crevre-gold mx-auto"></div>
                <p className="text-crevre-charcoal/60 mt-4">Loading articles...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogPosts.map((post, index) => (
                  <Link key={post.id} href={`/blog/${post.slug || post.id}`}>
                    <article className="group cursor-pointer">
                      <div className="relative aspect-[4/3] overflow-hidden mb-6">
                        <Image
                          src={post.image}
                          alt={post.title}
                          width={400}
                          height={300}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          priority={index < 3}
                          placeholder="blur"
                          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                        />
                        <div className="absolute top-4 left-4">
                          <span className="bg-white/90 backdrop-blur-sm text-crevre-charcoal px-3 py-1 text-xs font-medium tracking-wide uppercase">
                            {post.category}
                          </span>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex items-center text-xs text-crevre-charcoal/60 space-x-2">
                          <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                          <span>•</span>
                          <span>{post.readTime}</span>
                        </div>
                        
                        <h3 className="text-xl font-light text-crevre-charcoal group-hover:text-crevre-gold transition-colors duration-300 leading-tight">
                          {post.title}
                        </h3>
                        
                        <p className="text-crevre-charcoal/70 font-light leading-relaxed text-sm line-clamp-3">
                          {post.excerpt}
                        </p>
                        
                        <div className="flex flex-wrap gap-2 pt-2">
                          {post.tags?.slice(0, 3).map((tag) => (
                            <span key={tag} className="text-xs text-crevre-charcoal/50 bg-crevre-charcoal/5 px-2 py-1">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Related Posts Section for SEO Inter-linking */}
        <section className="py-16 bg-crevre-charcoal/5">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-light text-crevre-charcoal mb-6 tracking-tight">
                You Might Also Like
              </h2>
              <div className="w-16 h-1 bg-crevre-gold mx-auto"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {blogPosts.slice(0, 3).map((post) => (
                <Link key={`related-${post.id}`} href={`/blog/${post.slug || post.id}`} className="group">
                  <article className="bg-white p-6 hover:shadow-lg transition-shadow duration-300">
                    <div className="aspect-[16/9] overflow-hidden mb-4">
                      <Image
                        src={post.image}
                        alt={post.title}
                        width={400}
                        height={225}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                      />
                    </div>
                    <h3 className="text-lg font-light text-crevre-charcoal group-hover:text-crevre-gold transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-crevre-charcoal/60 text-sm mt-2">
                      {post.category} • {post.readTime}
                    </p>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Signup - Matching Homepage Style */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-light text-crevre-charcoal mb-6 tracking-tight">
                Stay Informed
              </h2>
              <div className="w-24 h-1 bg-crevre-gold mx-auto mb-8"></div>
              <p className="text-lg text-crevre-charcoal/70 mb-16 max-w-2xl mx-auto font-light leading-relaxed">
                Get the latest fashion insights and style guides 
                <br className="hidden md:block" />
                delivered directly to your inbox.
              </p>
              
              <div className="max-w-lg mx-auto">
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
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
