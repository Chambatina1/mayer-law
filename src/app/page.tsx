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
import SocialMediaSection from '@/components/website/SocialMediaSection'
import ContactSection from '@/components/website/ContactSection'
import Footer from '@/components/website/Footer'
import BookingPage from '@/components/booking/BookingPage'
import ReviewForm from '@/components/review/ReviewForm'
import PortalLogin from '@/components/portal/PortalLogin'
import PortalDashboard from '@/components/portal/PortalDashboard'
import AdminLogin from '@/components/admin/AdminLogin'
import AdminDashboard from '@/components/admin/AdminDashboard'

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
}

function WebsiteView() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <PracticeAreasSection />
        <StatsSection />
        <AboutSection />
        <TestimonialsSection />
        <SocialMediaSection />
        <CTABanner />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}

export default function Home() {
  const { currentView, isLoggedIn, isAdminLoggedIn } = useAppStore()

  return (
    <AnimatePresence mode="wait">
      {currentView === 'website' && (
        <motion.div
          key="website"
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.3 }}
          className="min-h-screen bg-cream"
        >
          <WebsiteView />
        </motion.div>
      )}

      {currentView === 'booking' && (
        <motion.div
          key="booking"
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.3 }}
        >
          <BookingPage />
        </motion.div>
      )}

      {currentView === 'review' && (
        <motion.div
          key="review"
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.3 }}
        >
          <ReviewForm />
        </motion.div>
      )}

      {currentView === 'portal' && (
        <motion.div
          key="portal"
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.3 }}
        >
          {isLoggedIn ? <PortalDashboard /> : <PortalLogin />}
        </motion.div>
      )}

      {currentView === 'admin' && (
        <motion.div
          key="admin"
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.3 }}
        >
          {isAdminLoggedIn ? <AdminDashboard /> : <AdminLogin />}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
