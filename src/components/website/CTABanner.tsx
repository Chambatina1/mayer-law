'use client'

import { motion } from 'framer-motion'
import { Calendar, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAppStore } from '@/store/useAppStore'

export default function CTABanner() {
  const { setView } = useAppStore()

  return (
    <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-soft-gold to-warm-gold" />
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 pattern-warm" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-3xl mx-auto text-center"
      >
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-4">
          Ready to take the next step?
        </h2>
        <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
          Schedule a free consultation and let us discuss how we can help you.
        </p>
        <Button
          size="lg"
          onClick={() => setView('booking')}
          className="bg-white text-soft-gold hover:bg-warm-white rounded-full px-8 py-6 text-base shadow-lg hover:shadow-xl transition-all font-medium"
        >
          <Calendar className="w-5 h-5 mr-2" />
          Book a Free Consultation
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </motion.div>
    </section>
  )
}
