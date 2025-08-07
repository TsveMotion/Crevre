import type { Metadata } from 'next'
import './globals.css'

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#D4AF37',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://crevre.com'),
  title: 'Crevre - Exclusive Streetwear Drop | Early Access List',
  description: 'Join the exclusive Crevre drop list for limited streetwear releases. Get early access, discounts, and behind-the-scenes looks. Premium urban clothing launching August 9th.',
  keywords: 'streetwear, urban clothing, exclusive fashion drops, Crevre, limited edition, fashion launch, early access, premium streetwear',
  authors: [{ name: 'Crevre' }],
  creator: 'Crevre',
  publisher: 'Crevre',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://crevre.com',
    title: 'Crevre - Exclusive Streetwear Drop | Early Access List',
    description: 'Join the exclusive Crevre drop list for limited streetwear releases. Get early access, discounts, and behind-the-scenes looks.',
    siteName: 'Crevre',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Crevre Exclusive Streetwear',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Crevre - Exclusive Streetwear Drop',
    description: 'Join the exclusive drop list for limited streetwear releases.',
    images: ['/twitter-image.jpg'],
    creator: '@crevrewear',
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
