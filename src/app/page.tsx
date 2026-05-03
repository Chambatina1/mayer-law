'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useAppStore } from '@/store/useAppStore'
import Header from '@/components/website/Header'
import HeroSection from '@/components/website/HeroSection'
import PracticeAreasSection from '@/components/website/PracticeAreasSection'
import AboutSection from '@/components/website/AboutSection'
import StatsSection from '@/components/website/StatsSection'
import TestimonialsSection from '@/components/website/TestimonialsSection'
import CTABanner from '@/components/website/CTABanner'
import ContactSection from '@/components/website/ContactSection'
import Footer from '@/components/website/Footer'
import BookingPage from '@/components/booking/BookingPage'
import ReviewForm from '@/components/review/ReviewForm'
import PortalLogin from '@/components/portal/PortalLogin'
import PortalDashboard from '@/components/portal/PortalDashboard'
import AdminLogin from '@/components/admin/AdminLogin'
import AdminDashboard from '@/components/admin/AdminDashboard'

function WebsiteView() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <PracticeAreasSection />
        <AboutSection />
        <StatsSection />
        <TestimonialsSection />
        <CTABanner />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}

export default function Home() {
  const { currentView, isLoggedIn } = useAppStore()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentView}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {currentView === 'website' && <WebsiteView />}
        {currentView === 'booking' && <BookingPage />}
        {currentView === 'review' && <ReviewForm />}
        {currentView === 'portal' && (isLoggedIn ? <PortalDashboard /> : <PortalLogin />)}
        {currentView === 'admin' && <AdminDashboard />}
      </motion.div>
    </AnimatePresence>
  )
}
