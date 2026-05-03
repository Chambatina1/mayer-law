'use client'

import { motion } from 'framer-motion'
import { Calendar, ArrowRight } from 'lucide-react'
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
      {/* Background image with blush overlay */}
      <div className="absolute inset-0">
        <img
          src="/mayer-assets/hero-bg.png"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="hero-warm-overlay absolute inset-0" />
      </div>

      {/* Subtle pattern */}
      <div className="pattern-warm absolute inset-0" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* Accent line */}
          <div className="accent-line mx-auto mb-8" />

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-charcoal leading-tight mb-6">
            Resourcefully{' '}
            <span className="text-rose-gradient">Relentless.</span>
          </h1>

          <p className="text-lg sm:text-xl text-medium-gray max-w-2xl mx-auto mb-10 leading-relaxed">
            Protecting your rights. Empowering your future.
          </p>

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
              className="rounded-full px-8 py-6 text-base border-charcoal/20 text-charcoal hover:bg-charcoal hover:text-white transition-all"
            >
              View Practice Areas
            </Button>
          </div>
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
            className="w-6 h-10 border-2 border-dusty-rose/40 rounded-full flex justify-center pt-2"
          >
            <div className="w-1.5 h-1.5 bg-dusty-rose rounded-full" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
