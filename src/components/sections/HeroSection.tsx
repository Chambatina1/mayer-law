'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useAppStore } from '@/store/useAppStore'
import Image from 'next/image'
import { ArrowRight, CalendarDays } from 'lucide-react'

export default function HeroSection() {
  const { setAppointmentModalOpen, setSelectedPracticeArea } = useAppStore()

  const handleScrollTo = (id: string) => {
    const el = document.querySelector(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <Image
        src="/hero-bg.png"
        alt=""
        fill
        className="object-cover object-center"
        priority
        sizes="100vw"
      />

      {/* Overlay */}
      <div className="hero-overlay absolute inset-0" />

      {/* Decorative gold accent line */}
      <div className="absolute top-0 left-1/2 w-px h-24 bg-gradient-to-b from-gold/60 to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/40 bg-gold/10 backdrop-blur-sm mb-8"
        >
          <div className="w-2 h-2 rounded-full bg-gold animate-pulse" />
          <span className="text-gold-light text-sm font-medium tracking-wide">
            Resourcefully Relentless Representation
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
        >
          Through individual action,{' '}
          <span className="text-gold-light">or class action,</span>
          <br />
          <span className="text-gold-gradient">WE TAKE ACTION.</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="text-white/80 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Mayer Law handles a variety of legal matters with a commitment to
          protecting your rights. Whether you&apos;re facing an unfair financial
          practice, discrimination, or a personal injury, we&apos;re here to fight
          for you.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            onClick={() => setAppointmentModalOpen(true)}
            className="bg-gold hover:bg-gold-dark text-white rounded-full px-8 py-6 text-base shadow-lg hover:shadow-xl hover:shadow-gold/20 transition-all group"
          >
            <CalendarDays className="w-5 h-5 mr-2" />
            Contact Us to Schedule a Consultation
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            variant="outline"
            onClick={() => handleScrollTo('#practice-areas')}
            className="border-white/30 text-white hover:bg-white/10 rounded-full px-8 py-6 text-base backdrop-blur-sm transition-all"
          >
            View Practice Areas
          </Button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2"
          >
            <div className="w-1 h-2 bg-gold rounded-full" />
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  )
}
