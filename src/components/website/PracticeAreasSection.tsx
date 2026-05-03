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
    description: 'Protecting consumers from unfair practices, debt collection abuses, and financial exploitation.',
    icon: '/mayer-assets/icon-consumer.png',
  },
  {
    title: 'Education Law & Civil Rights',
    tagline: 'Equal treatment. No exceptions.',
    description: 'Defending students and professionals in education disputes, licensing, and civil rights matters.',
    icon: '/mayer-assets/icon-education.png',
  },
  {
    title: 'Personal Injury',
    tagline: 'You deserve better.',
    description: 'Fighting for full compensation when negligence causes harm to you or your loved ones.',
    icon: '/mayer-assets/icon-injury.png',
  },
  {
    title: 'General Litigation & Consulting',
    tagline: 'Practical solutions. Skilled advocacy.',
    description: 'Strategic legal counsel and courtroom representation across a broad range of civil matters.',
    icon: '/mayer-assets/gavel-abstract.png',
  },
]

export default function PracticeAreasSection() {
  const { setView } = useAppStore()

  const handleLearnMore = (areaTitle: string) => {
    // Scroll to contact section and pre-fill the service interest
    const contactEl = document.querySelector('#contact')
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' })
    }
    // Also open booking with the area pre-selected
    setTimeout(() => {
      setView('booking')
    }, 600)
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {practiceAreas.map((area, i) => (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="group bg-white border border-sand rounded-2xl p-6 h-full transition-all duration-300 hover:border-dusty-rose hover:shadow-lg hover:shadow-dusty-rose/10 hover:-translate-y-1 cursor-pointer" onClick={() => handleLearnMore(area.title)}>
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-blush flex items-center justify-center mb-5 transition-colors group-hover:bg-dusty-rose/10">
                  <Image
                    src={area.icon}
                    alt={area.title}
                    width={32}
                    height={32}
                    className="w-8 h-8"
                  />
                </div>

                {/* Content */}
                <h3 className="font-serif text-lg font-bold text-charcoal mb-2">
                  {area.title}
                </h3>
                <p className="text-dusty-rose font-medium text-sm mb-3">
                  {area.tagline}
                </p>
                <p className="text-medium-gray text-sm leading-relaxed mb-5">
                  {area.description}
                </p>

                <Button
                  variant="ghost"
                  onClick={() => handleLearnMore(area.title)}
                  className="text-dusty-rose hover:text-deep-rose hover:bg-blush p-0 h-auto text-sm font-medium group/btn"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
