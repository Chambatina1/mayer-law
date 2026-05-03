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
        {/* Ocean gradient background */}
        <div className="bg-gradient-to-br from-charcoal via-[#2a4a5e] to-[#1a3a4e] py-16 sm:py-20 lg:py-24" />

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center"
        >
          <p className="text-sm tracking-[0.15em] uppercase text-dusty-rose mb-4 font-medium">
            Flexible, Value-Driven Approach
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Ready to Take the Next Step?
          </h2>
          <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
            Client-focused solutions tailored to your needs. Attorney Nicole Mayer is available for consultation to discuss your case.
          </p>
          <Button
            size="lg"
            onClick={() => setView('booking')}
            className="bg-dusty-rose hover:bg-deep-rose text-white rounded-full px-8 py-6 text-base font-semibold shadow-xl hover:shadow-2xl transition-all group"
          >
            Schedule a Consultation
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          <p className="text-white/40 text-xs mt-4 tracking-wide">
            100% No Obligation
          </p>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
