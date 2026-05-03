'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import SectionWrapper from '@/components/shared/SectionWrapper'
import Image from 'next/image'
import { useAppStore } from '@/store/useAppStore'

const practiceAreas = [
  {
    title: 'Consumer Finance Law',
    tagline: 'Your rights. Our fight.',
    description: 'Protecting consumers from unfair practices, debt collection abuses, and financial exploitation. We hold corporations accountable.',
    image: '/mayer-assets/practice-consumer.png',
    details: ['Debt Collection Defense', 'Credit Reporting Errors', 'Consumer Fraud', 'Contract Disputes'],
  },
  {
    title: 'Education Law & Civil Rights',
    tagline: 'Equal treatment. No exceptions.',
    description: 'Defending students and professionals in education disputes, licensing matters, and civil rights violations across Florida.',
    image: '/mayer-assets/practice-education.png',
    details: ['IEP & 504 Advocacy', 'Employment Disputes', 'Discrimination Claims', 'Licensing Defense'],
  },
  {
    title: 'Personal Injury',
    tagline: 'You deserve better.',
    description: 'Fighting for full compensation when negligence causes harm. Medical bills, lost wages, and pain — we build your strongest case.',
    image: '/mayer-assets/practice-injury.png',
    details: ['Auto Accidents', 'Slip & Fall', 'Medical Negligence', 'Wrongful Death'],
  },
  {
    title: 'General Litigation & Consulting',
    tagline: 'Practical solutions. Skilled advocacy.',
    description: 'Strategic legal counsel and courtroom representation across a broad range of civil matters. Creative strategies, proven results.',
    image: '/mayer-assets/practice-litigation.png',
    details: ['Civil Litigation', 'Business Disputes', 'Contract Review', 'Legal Strategy'],
  },
]

export default function PracticeAreasSection() {
  const { setView } = useAppStore()

  const handleLearnMore = (areaTitle: string) => {
    setTimeout(() => {
      setView('booking')
    }, 300)
  }

  return (
    <SectionWrapper id="practice-areas" className="bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12 lg:mb-16">
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-dusty-rose mb-3">
            What We Do
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal mb-4">
            Practice Areas
          </h2>
          <div className="accent-line mx-auto" />
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {practiceAreas.map((area, i) => (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div
                className="group bg-white border border-sand rounded-2xl overflow-hidden h-full transition-all duration-300 hover:border-dusty-rose hover:shadow-lg hover:shadow-dusty-rose/10 hover:-translate-y-1 cursor-pointer"
                onClick={() => handleLearnMore(area.title)}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={area.image}
                    alt={area.title}
                    width={600}
                    height={300}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 to-transparent" />
                  <div className="absolute bottom-4 left-5 right-5">
                    <h3 className="font-serif text-xl font-bold text-white drop-shadow-sm">
                      {area.title}
                    </h3>
                    <p className="text-white/80 text-sm font-medium">
                      {area.tagline}
                    </p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6">
                  <p className="text-medium-gray text-sm leading-relaxed mb-4">
                    {area.description}
                  </p>

                  {/* Service tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {area.details.map((detail) => (
                      <span
                        key={detail}
                        className="text-xs px-2.5 py-1 bg-blush/60 text-charcoal/70 rounded-full font-medium"
                      >
                        {detail}
                      </span>
                    ))}
                  </div>

                  <Button
                    variant="ghost"
                    className="text-dusty-rose hover:text-deep-rose hover:bg-blush p-0 h-auto text-sm font-medium group/btn"
                  >
                    Schedule a Consultation
                    <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
