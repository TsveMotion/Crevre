import React from 'react'
import { Metadata } from 'next'
import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import EmailSignupForm from '../../../components/EmailSignupForm'
import Link from 'next/link'

interface PreviewPageProps {
  params: {
    category: string
  }
}

export async function generateMetadata({ params }: PreviewPageProps): Promise<Metadata> {
  const category = params.category
  const categoryName = category.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ')

  return {
    title: `${categoryName} - Crevre Premium Fashion | Exclusive Luxury Streetwear Preview`,
    description: `Preview our exclusive ${categoryName} collection launching September 2024. Premium luxury streetwear pieces coming soon. Join our notification list for early access.`,
    keywords: `Crevre ${categoryName}, premium streetwear, luxury fashion, exclusive clothing, fashion preview, early access`,
    robots: 'index, follow',
    authors: [{ name: 'Crevre Fashion' }],
    openGraph: {
      title: `${categoryName} - Crevre Premium Fashion`,
      description: `Preview our exclusive ${categoryName} collection launching September 2024.`,
      type: 'website',
      url: `https://crevre.com/preview/${category}`,
      images: [
        {
          url: '/LogoLong2.png',
          width: 1200,
          height: 630,
          alt: 'Crevre Premium Fashion Logo'
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: `${categoryName} - Crevre Premium Fashion`,
      description: `Preview our exclusive ${categoryName} collection launching September 2024.`,
      images: ['/LogoLong2.png']
    }
  }
}

const PreviewPage = ({ params }: PreviewPageProps) => {
  const category = params.category
  const categoryName = category.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ')

  // Mock preview items for different categories
  const getPreviewItems = () => {
    const baseItems = [
      {
        name: `Premium ${categoryName} Item 1`,
        price: '£45-£85',
        description: 'Luxury materials meet exclusive design',
        comingSoon: true
      },
      {
        name: `Exclusive ${categoryName} Piece`,
        price: '£55-£95',
        description: 'Limited edition upcoming release',
        comingSoon: true
      },
      {
        name: `Designer ${categoryName}`,
        price: '£65-£125',
        description: 'Premium quality streetwear',
        comingSoon: true
      }
    ]

    return baseItems
  }

  const getCategoryIcon = () => {
    switch (category) {
      case 't-shirts': return '👕'
      case 'hoodies': return '👘'
      case 'sweats': return '👕'
      case 'joggers': return '👖'
      case 'shorts': return '🩳'
      case 'womens': 
      case 'women-s-collection': return '👗'
      case 'caps-beanies': 
      case 'caps-and-beanies': return '🧢'
      case 'accessories': return '🎒'
      case 'kids': return '🧸'
      case 'sale': return '🔥'
      case 'gift-cards': return '🎁'
      case 'limited-edition': return '💎'
      default: return '✨'
    }
  }

  const previewItems = getPreviewItems()

  return (
    <>
      <Header />
      <main className="min-h-screen bg-crevre-white">
        {/* Hero Section */}
        <section className="pt-8 pb-16 bg-gradient-to-br from-crevre-ivory to-crevre-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="text-6xl mb-6">{getCategoryIcon()}</div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-crevre-charcoal mb-6 tracking-tight">
                {categoryName} <span className="text-crevre-gold">Preview</span>
              </h1>
              <p className="text-xl md:text-2xl text-crevre-charcoal/70 max-w-3xl mx-auto leading-relaxed mb-8">
                Exclusive luxury pieces launching September 2024
              </p>
              <div className="inline-flex items-center px-6 py-3 bg-crevre-gold/20 border border-crevre-gold/30 rounded-full text-crevre-gold font-medium">
                <span className="w-2 h-2 bg-crevre-gold rounded-full animate-pulse mr-3"></span>
                Coming Soon - Get Notified Below
              </div>
            </div>

            {/* Preview Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {previewItems.map((item, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="aspect-square bg-crevre-gray flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl mb-4">{getCategoryIcon()}</div>
                      <span className="text-crevre-charcoal/50 text-sm">Preview Image</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-display font-semibold text-crevre-charcoal mb-2">
                      {item.name}
                    </h3>
                    <p className="text-sm text-crevre-charcoal/70 mb-3">
                      {item.description}
                    </p>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-lg font-semibold text-crevre-gold">
                        {item.price}
                      </span>
                      <span className="text-xs bg-crevre-gold/20 text-crevre-gold px-2 py-1 rounded-full">
                        Preview Only
                      </span>
                    </div>
                    <button 
                      onClick={() => {
                        const emailSection = document.querySelector('.email-signup-section')
                        emailSection?.scrollIntoView({ behavior: 'smooth' })
                      }}
                      className="block w-full text-center bg-crevre-charcoal hover:bg-crevre-gold text-white py-3 rounded-sm transition-colors font-medium"
                    >
                      Get Launch Notification
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Features */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="text-center">
                <div className="w-16 h-16 bg-crevre-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⚡</span>
                </div>
                <h3 className="text-lg font-display font-semibold text-crevre-charcoal mb-2">
                  VIP Early Access
                </h3>
                <p className="text-crevre-charcoal/70 text-sm">
                  Get 24-hour exclusive access before public launch
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-crevre-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💎</span>
                </div>
                <h3 className="text-lg font-display font-semibold text-crevre-charcoal mb-2">
                  Premium Quality
                </h3>
                <p className="text-crevre-charcoal/70 text-sm">
                  Luxury materials and exclusive design details
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-crevre-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="text-lg font-display font-semibold text-crevre-charcoal mb-2">
                  Limited Quantities
                </h3>
                <p className="text-crevre-charcoal/70 text-sm">
                  Exclusive pieces with limited production runs
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Email Signup Section */}
        <section className="py-16 bg-crevre-charcoal email-signup-section">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
              Get Notified First
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Join our exclusive list and be the first to shop {categoryName.toLowerCase()} when we launch in September 2024
            </p>
            <EmailSignupForm />
          </div>
        </section>

        {/* Related Collections */}
        <section className="py-16 bg-crevre-ivory">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-display font-bold text-crevre-charcoal text-center mb-12">
              Explore More Collections
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link 
                href="/preview/t-shirts"
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow text-center group"
              >
                <div className="text-3xl mb-4">👕</div>
                <h3 className="font-display font-semibold text-crevre-charcoal mb-2 group-hover:text-crevre-gold transition-colors">
                  T-Shirts
                </h3>
                <p className="text-sm text-crevre-charcoal/70">
                  Premium basics
                </p>
              </Link>

              <Link 
                href="/preview/hoodies"
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow text-center group"
              >
                <div className="text-3xl mb-4">👘</div>
                <h3 className="font-display font-semibold text-crevre-charcoal mb-2 group-hover:text-crevre-gold transition-colors">
                  Hoodies
                </h3>
                <p className="text-sm text-crevre-charcoal/70">
                  Luxury comfort
                </p>
              </Link>

              <Link 
                href="/preview/womens"
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow text-center group"
              >
                <div className="text-3xl mb-4">👗</div>
                <h3 className="font-display font-semibold text-crevre-charcoal mb-2 group-hover:text-crevre-gold transition-colors">
                  Women's
                </h3>
                <p className="text-sm text-crevre-charcoal/70">
                  Exclusive feminine
                </p>
              </Link>

              <Link 
                href="/preview/accessories"
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow text-center group"
              >
                <div className="text-3xl mb-4">🎒</div>
                <h3 className="font-display font-semibold text-crevre-charcoal mb-2 group-hover:text-crevre-gold transition-colors">
                  Accessories
                </h3>
                <p className="text-sm text-crevre-charcoal/70">
                  Complete the look
                </p>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default PreviewPage
