'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import SectionWrapper from '@/components/shared/SectionWrapper'
import { useAppStore } from '@/store/useAppStore'
import Image from 'next/image'

const practiceAreas = [
  {
    title: 'Consumer Finance Law',
    tagline: 'Your rights matter.',
    description: 'Protecting consumers from unfair and deceptive practices by lenders, debt collectors, and financial institutions.',
    image: '/mayer-assets/icon-consumer.png',
    abstract: '/mayer-assets/docs-abstract.png',
  },
  {
    title: 'Education Law & Civil Rights',
    tagline: 'Equal treatment, no exceptions.',
    description: 'Fighting for students and professionals facing discrimination in education and licensing.',
    image: '/mayer-assets/icon-education.png',
    abstract: '/mayer-assets/justice-abstract.png',
  },
  {
    title: 'Personal Injury',
    tagline: 'You deserve fair compensation.',
    description: 'Dedicated representation for accident victims to secure the compensation they deserve.',
    image: '/mayer-assets/icon-injury.png',
    abstract: '/mayer-assets/gavel-abstract.png',
  },
  {
    title: 'General Litigation & Consulting',
    tagline: 'Practical solutions. Skilled advocacy.',
    description: 'Comprehensive legal services for individuals and businesses navigating complex disputes.',
    image: '/mayer-assets/handshake-abstract.png',
    abstract: '/mayer-assets/handshake-abstract.png',
  },
]

export default function PracticeAreasSection() {
  const { setView, setBookingService } = useAppStore()

  const handleLearnMore = (title: string) => {
    setBookingService(title)
    setView('booking')
  }

  return (
    <SectionWrapper id="practice-areas" className="bg-warm-white">
      <div className="text-center mb-12 md:mb-16">
        <div className="flex justify-center mb-4">
          <div className="gold-accent-line" />
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal mb-4">
          How We Help
        </h2>
        <p className="text-medium-gray text-lg max-w-xl mx-auto">
          Focused expertise where it matters most.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        {practiceAreas.map((area, index) => (
          <motion.div
            key={area.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group warm-card-hover bg-white rounded-2xl p-6 md:p-8 relative overflow-hidden"
          >
            {/* Abstract bg image */}
            <div className="absolute top-0 right-0 w-32 h-32 opacity-10 group-hover:opacity-20 transition-opacity">
              <Image src={area.abstract} alt="" width={128} height={128} className="w-full h-full object-cover" />
            </div>

            <div className="relative z-10">
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-beige/80 flex items-center justify-center mb-5">
                <Image src={area.image} alt={area.title} width={32} height={32} className="w-8 h-8 object-contain" />
              </div>

              <h3 className="font-serif text-xl font-semibold text-charcoal mb-2">
                {area.title}
              </h3>

              <p className="text-soft-gold font-medium text-sm mb-3">
                {area.tagline}
              </p>

              <p className="text-medium-gray text-sm leading-relaxed mb-5">
                {area.description}
              </p>

              <Button
                variant="ghost"
                className="text-soft-gold hover:text-warm-gold p-0 h-auto font-medium"
                onClick={() => handleLearnMore(area.title)}
              >
                Learn More
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  )
}
