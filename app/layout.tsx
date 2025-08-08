import type { Metadata } from 'next'
import './globals.css'

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#D4AF37',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://crevre.com'),
  title: 'Crevre - Premium Fashion Collection | September 1st Launch 2025',
  description: 'Discover Crevre\'s exclusive premium fashion collection launching September 1st, 2025. Timeless elegance meets contemporary style. Join our launch list for early access to luxury streetwear, designer clothing, and exclusive pieces.',
  keywords: 'Crevre, premium fashion, luxury streetwear, designer clothing, exclusive collection, September 2025 launch, timeless elegance, contemporary fashion, high-end streetwear, fashion brand, limited edition clothing, premium apparel',
  authors: [{ name: 'Crevre Fashion' }],
  creator: 'Crevre',
  publisher: 'Crevre',
  robots: 'index, follow',
  category: 'Fashion',
  classification: 'Fashion & Style',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://crevre.com',
    title: 'Crevre - Premium Fashion Collection | September 1st Launch 2025',
    description: 'Discover Crevre\'s exclusive premium fashion collection launching September 1st, 2025. Timeless elegance meets contemporary style.',
    siteName: 'Crevre',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Crevre Premium Fashion Collection - September 2025 Launch',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Crevre - Premium Fashion Collection | September 1st Launch 2025',
    description: 'Discover exclusive premium fashion launching September 1st, 2025. Timeless elegance meets contemporary style.',
    images: ['/twitter-image.jpg'],
    creator: '@crevrewear',
    site: '@crevrewear',
  },
  alternates: {
    canonical: 'https://crevre.com',
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
