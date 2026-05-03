'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAppStore } from '@/store/useAppStore'
import SectionWrapper from '@/components/shared/SectionWrapper'

export default function CTABanner() {
  const { setView } = useAppStore()

  return (
    <SectionWrapper noPadding className="overflow-hidden">
      <div className="relative">
        {/* Gradient background */}
        <div className="bg-gradient-to-br from-dusty-rose via-deep-rose to-dark-rose py-16 sm:py-20 lg:py-24" />

        {/* Pattern overlay */}
        <div className="absolute inset-0 pattern-warm opacity-20" />

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center"
        >
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Ready to take the next step?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
            Schedule a free consultation with Attorney Nicole Mayer and discover how we can help protect your rights.
          </p>
          <Button
            size="lg"
            onClick={() => setView('booking')}
            className="bg-white text-charcoal hover:bg-cream rounded-full px-8 py-6 text-base font-semibold shadow-xl hover:shadow-2xl transition-all group"
          >
            Schedule Free Consultation
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
