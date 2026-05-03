'use client'

import { motion } from 'framer-motion'
import { Calendar, ArrowRight, Phone, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAppStore } from '@/store/useAppStore'

export default function HeroSection() {
  const { setView } = useAppStore()

  const handleNavClick = (href: string) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Ocean gradient background */}
      <div className="absolute inset-0">
        <img
          src="/mayer-assets/ocean-gradient-bg.png"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/30 via-charcoal/20 to-charcoal/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* Accent line */}
          <div className="accent-line mx-auto mb-6" />

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-sm sm:text-base tracking-[0.15em] uppercase text-dusty-rose mb-4 font-medium"
          >
            Mayer Law Is Here For You
          </motion.p>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            Resourcefully{' '}
            <span className="text-rose-gradient">Relentless.</span>
          </h1>

          <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-4 leading-relaxed">
            Protecting your rights. Empowering your future.
          </p>

          {/* Key value props */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mb-10 text-white/70 text-sm">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-dusty-rose" />
              Flexible, Value-Driven Approach
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-dusty-rose" />
              Client-Focused Solutions
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-dusty-rose" />
              100% No Obligation
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              onClick={() => setView('booking')}
              size="lg"
              className="bg-dusty-rose hover:bg-deep-rose text-white rounded-full px-8 py-6 text-base shadow-lg hover:shadow-xl transition-all group"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Schedule Consultation
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => handleNavClick('#practice-areas')}
              className="rounded-full px-8 py-6 text-base border-white/30 text-white hover:bg-white hover:text-charcoal transition-all"
            >
              View Practice Areas
            </Button>
          </div>

          {/* Direct contact */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mt-8 text-white/60 text-sm"
          >
            <a href="tel:3524943657" className="flex items-center gap-2 hover:text-white transition-colors">
              <Phone className="w-4 h-4" />
              (352) 494-3657
            </a>
            <a href="mailto:Nicole@MayerLawFlorida.com" className="flex items-center gap-2 hover:text-white transition-colors">
              <Mail className="w-4 h-4" />
              Nicole@MayerLawFlorida.com
            </a>
          </motion.div>

          {/* Available for consultation badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="mt-8 inline-block"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/90 text-xs sm:text-sm tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-sage animate-pulse" />
              Available for Consultation
            </span>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2"
          >
            <div className="w-1.5 h-1.5 bg-white/60 rounded-full" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
