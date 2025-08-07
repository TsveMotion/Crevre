import React from 'react'
import type { Metadata } from 'next'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Crevre Blog - Fashion Insights & Style Trends | Premium Fashion Content',
  description: 'Discover the latest fashion trends, style guides, and luxury fashion insights from Crevre. Expert advice on contemporary elegance, premium streetwear, and timeless fashion.',
  keywords: 'fashion blog, style trends, luxury fashion, fashion insights, premium streetwear, contemporary fashion, fashion guide, style advice, fashion news, luxury brands',
  openGraph: {
    title: 'Crevre Blog - Fashion Insights & Style Trends',
    description: 'Discover the latest fashion trends and luxury fashion insights from Crevre.',
    type: 'website',
  },
}

const blogPosts = [
  {
    id: 'fashion-trends-2024',
    title: 'Fashion Trends 2024: What\'s Defining Contemporary Elegance',
    excerpt: 'Explore the fashion trends that are shaping 2024, from sustainable luxury to minimalist streetwear aesthetics.',
    image: 'https://picsum.photos/400/300?random=1',
    date: '2024-08-01',
    readTime: '5 min read',
    category: 'Trends'
  },
  {
    id: 'luxury-fashion-guide',
    title: 'The Ultimate Guide to Luxury Fashion Investment Pieces',
    excerpt: 'Learn how to build a timeless wardrobe with premium pieces that stand the test of time and elevate your style.',
    image: 'https://picsum.photos/400/300?random=2',
    date: '2024-07-28',
    readTime: '8 min read',
    category: 'Guide'
  },
  {
    id: 'sustainable-fashion',
    title: 'Sustainable Fashion: The Future of Premium Clothing',
    excerpt: 'Discover how luxury brands are embracing sustainability without compromising on quality and style.',
    image: 'https://picsum.photos/400/300?random=3',
    date: '2024-07-25',
    readTime: '6 min read',
    category: 'Sustainability'
  },
  {
    id: 'minimalist-fashion-guide',
    title: 'The Art of Minimalist Fashion: Building a Timeless Wardrobe',
    excerpt: 'Master the art of minimalist fashion with our comprehensive guide to building a curated wardrobe with versatile pieces.',
    image: 'https://picsum.photos/400/300?random=4',
    date: '2024-08-05',
    readTime: '7 min read',
    category: 'Style Guide'
  },
  {
    id: 'fashion-week-insights-2024',
    title: 'Fashion Week Insights 2024: Key Trends from Paris, Milan & New York',
    excerpt: 'Get exclusive insights from Fashion Week 2024 and discover the key trends shaping the future of luxury fashion.',
    image: 'https://picsum.photos/400/300?random=5',
    date: '2024-08-03',
    readTime: '9 min read',
    category: 'Industry Insights'
  },
  {
    id: 'color-psychology-fashion',
    title: 'Color Psychology in Fashion: How Colors Influence Style & Perception',
    excerpt: 'Discover the power of color psychology in fashion and how different colors influence perception, mood, and personal style.',
    image: 'https://picsum.photos/400/300?random=6',
    date: '2024-08-02',
    readTime: '8 min read',
    category: 'Psychology'
  }
]

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-crevre-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-b from-crevre-ivory to-crevre-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-semibold text-crevre-charcoal mb-6">
            Fashion <span className="text-crevre-gold">Insights</span>
          </h1>
          <p className="text-lg sm:text-xl text-crevre-charcoal/80 max-w-2xl mx-auto font-light">
            Discover the latest trends, style guides, and expert insights from the world of premium fashion and contemporary elegance.
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.id}`}>
                <article className="bg-white border border-crevre-gold/20 rounded-sm overflow-hidden hover:shadow-xl hover:border-crevre-gold/40 transition-all duration-300 cursor-pointer group">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="bg-crevre-gold/10 text-crevre-gold px-3 py-1 rounded-sm text-xs font-medium">
                        {post.category}
                      </span>
                      <div className="text-xs text-crevre-charcoal/60 flex items-center gap-2">
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    <h2 className="text-xl font-display font-semibold text-crevre-charcoal mb-3 group-hover:text-crevre-gold transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-crevre-charcoal/70 text-sm leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-crevre-ivory">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-display font-semibold text-crevre-charcoal mb-4">
            Stay Updated
          </h2>
          <p className="text-crevre-charcoal/80 mb-8">
            Get the latest fashion insights and exclusive content delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-crevre-gold/30 rounded-sm focus:outline-none focus:ring-2 focus:ring-crevre-gold text-crevre-charcoal"
            />
            <button className="bg-crevre-gold hover:bg-crevre-gold-dark text-white px-6 py-3 rounded-sm font-medium transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
