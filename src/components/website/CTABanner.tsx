'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Phone, Mail, Calendar, Clock } from 'lucide-react'
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
          <p className="text-white/70 text-lg mb-4 max-w-xl mx-auto">
            Client-focused solutions tailored to your needs. Attorney Nicole Mayer is available for consultation to discuss your case.
          </p>

          {/* Key value reminders */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8 text-white/50 text-xs sm:text-sm">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              Most consultations are in-person
            </span>
            <span className="text-white/20">|</span>
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5" />
              Virtual appointments available
            </span>
          </div>

          <Button
            size="lg"
            onClick={() => setView('booking')}
            className="bg-dusty-rose hover:bg-deep-rose text-white rounded-full px-8 py-6 text-base font-semibold shadow-xl hover:shadow-2xl transition-all group"
          >
            <Calendar className="w-5 h-5 mr-2" />
            Schedule a Consultation
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>

          <p className="text-white/40 text-xs mt-6 max-w-md mx-auto leading-relaxed">
            100% No Obligation &middot; Free Honest Case Review<br />
            All legal services have a fee — investing in quality representation protects your future.
          </p>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
