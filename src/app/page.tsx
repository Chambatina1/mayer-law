'use client'

import Header from '@/components/sections/Header'
import HeroSection from '@/components/sections/HeroSection'
import PracticeAreasSection from '@/components/sections/PracticeAreasSection'
import AboutSection from '@/components/sections/AboutSection'
import StatsSection from '@/components/sections/StatsSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import NewsSection from '@/components/sections/NewsSection'
import ContactSection from '@/components/sections/ContactSection'
import Footer from '@/components/sections/Footer'
import AppointmentModal from '@/components/modals/AppointmentModal'
import ClientPortalModal from '@/components/modals/ClientPortalModal'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Sticky Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1">
        <HeroSection />
        <PracticeAreasSection />
        <AboutSection />
        <StatsSection />
        <TestimonialsSection />
        <NewsSection />
        <ContactSection />
      </main>

      {/* Sticky Footer */}
      <Footer />

      {/* Modals */}
      <AppointmentModal />
      <ClientPortalModal />
    </div>
  )
}
