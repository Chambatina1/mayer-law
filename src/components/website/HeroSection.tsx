'use client'

import { motion } from 'framer-motion'
import { Calendar, ArrowRight, Phone, Mail, MapPin } from 'lucide-react'
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
      {/* Ocean background */}
      <div className="absolute inset-0">
        <img
          src="/mayer-assets/ocean-bg-hero.png"
          alt=""
          className="w-full h-full object-cover"
        />
        {/* Light overlay for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/20 to-white/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* Top badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-5 py-2 bg-white/80 backdrop-blur-md border border-charcoal/10 rounded-full text-charcoal text-xs sm:text-sm tracking-wider uppercase mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            HERE FOR YOU
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-charcoal leading-tight mb-4"
          >
            <span className="text-rose-gradient">Available For Consultation</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xl sm:text-2xl text-charcoal font-medium mb-2"
          >
            Resourcefully Relentless Legal Representation
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-base sm:text-lg text-charcoal/70 max-w-2xl mx-auto mb-8 leading-relaxed"
          >
            Protecting your rights. Empowering your future.
          </motion.p>

          {/* Value proposition badges */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-10"
          >
            {[
              '100% No Obligation',
              'Free Honest Case Review',
              'Flexible, Value-Driven Approach',
              'Client-Focused Solutions',
            ].map((phrase) => (
              <span
                key={phrase}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-charcoal/10 rounded-full text-charcoal text-xs sm:text-sm font-medium"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-dusty-rose" />
                {phrase}
              </span>
            ))}
          </motion.div>

          {/* Main CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
          >
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
              className="rounded-full px-8 py-6 text-base border-charcoal/30 text-charcoal hover:bg-charcoal/10 transition-all"
            >
              View Our Services
            </Button>
          </motion.div>

          {/* Three ways to reach us */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <p className="text-charcoal/50 text-xs tracking-[0.2em] uppercase mb-5 font-medium">
              Three Ways to Reach Us
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Phone */}
              <a
                href="tel:3524943657"
                className="group flex flex-col items-center gap-2 p-5 bg-white/80 backdrop-blur-sm border border-charcoal/10 rounded-2xl hover:bg-white hover:border-charcoal/20 transition-all"
              >
                <div className="w-12 h-12 rounded-full bg-dusty-rose/80 flex items-center justify-center group-hover:bg-dusty-rose transition-colors">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <p className="text-charcoal text-sm font-semibold">Call Us Directly</p>
                <p className="text-charcoal/60 text-xs">(352) 494-3657</p>
              </a>

              {/* Email */}
              <a
                href="mailto:Nicole@MayerLawFlorida.com"
                className="group flex flex-col items-center gap-2 p-5 bg-white/80 backdrop-blur-sm border border-charcoal/10 rounded-2xl hover:bg-white hover:border-charcoal/20 transition-all"
              >
                <div className="w-12 h-12 rounded-full bg-dusty-rose/80 flex items-center justify-center group-hover:bg-dusty-rose transition-colors">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <p className="text-charcoal text-sm font-semibold">Send an Email</p>
                <p className="text-charcoal/60 text-xs">Nicole@MayerLawFlorida.com</p>
              </a>

              {/* In-Person / Online */}
              <button
                onClick={() => setView('booking')}
                className="group flex flex-col items-center gap-2 p-5 bg-white/80 backdrop-blur-sm border border-charcoal/10 rounded-2xl hover:bg-white hover:border-charcoal/20 transition-all"
              >
                <div className="w-12 h-12 rounded-full bg-dusty-rose/80 flex items-center justify-center group-hover:bg-dusty-rose transition-colors">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <p className="text-charcoal text-sm font-semibold">Book Online</p>
                <p className="text-charcoal/60 text-xs">In-Person & Virtual</p>
              </button>
            </div>
          </motion.div>

          {/* Consultation note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.6 }}
            className="mt-8 text-charcoal/40 text-xs tracking-wide max-w-md mx-auto"
          >
            Most clients prefer in-person consultations. Virtual appointments also available upon request.
          </motion.p>
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
            className="w-6 h-10 border-2 border-charcoal/30 rounded-full flex justify-center pt-2"
          >
            <div className="w-1.5 h-1.5 bg-charcoal/60 rounded-full" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
