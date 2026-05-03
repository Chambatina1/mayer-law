'use client'

import { motion } from 'framer-motion'
import { Calendar, ArrowDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAppStore } from '@/store/useAppStore'
import Image from 'next/image'

export default function HeroSection() {
  const { setView } = useAppStore()

  const scrollToSection = (id: string) => {
    const el = document.querySelector(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/mayer-assets/hero-bg.png"
          alt=""
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 hero-warm-overlay" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* Decorative line */}
          <div className="flex justify-center mb-6">
            <div className="gold-accent-line" />
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-charcoal leading-tight mb-6">
            Resourcefully
            <span className="text-gold-gradient block sm:inline"> Relentless.</span>
          </h1>

          <p className="text-lg sm:text-xl text-medium-gray max-w-2xl mx-auto mb-10 leading-relaxed">
            Protecting your rights with determination and care across Florida.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => setView('booking')}
              className="bg-soft-gold hover:bg-warm-gold text-white rounded-full px-8 py-6 text-base shadow-lg hover:shadow-xl transition-all"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Schedule a Consultation
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => scrollToSection('#practice-areas')}
              className="border-soft-gold text-dark-gold hover:bg-soft-gold hover:text-white rounded-full px-8 py-6 text-base transition-all"
            >
              View Practice Areas
            </Button>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <button
            onClick={() => scrollToSection('#practice-areas')}
            className="text-medium-gray hover:text-soft-gold transition-colors"
            aria-label="Scroll down"
          >
            <ArrowDown className="w-6 h-6" />
          </button>
        </motion.div>
      </div>
    </section>
  )
}
