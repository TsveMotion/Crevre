import React from 'react'
import Header from '../components/Header'
import HeroSection from '../components/HeroSection'
import VisualShowcase from '../components/VisualShowcase'
import EmailSignupForm from '../components/EmailSignupForm'
import ValueProposition from '../components/ValueProposition'
import SocialProof from '../components/SocialProof'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-crevre-white">
      <Header />
      <HeroSection />
      <VisualShowcase />
      <EmailSignupForm />
      <ValueProposition />
      <SocialProof />
      <Footer />
    </main>
  )
}
