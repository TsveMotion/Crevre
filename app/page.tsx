import React from 'react'
import Header from '../components/Header'
import HeroSection from '../components/HeroSection'
import ProductShowcase from '../components/ProductShowcase'
import ValueProposition from '../components/ValueProposition'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-crevre-white">
      <Header />
      <HeroSection />
      <ProductShowcase />
      <ValueProposition />
      <Footer />
    </main>
  )
}
