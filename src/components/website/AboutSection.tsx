'use client'

import { motion } from 'framer-motion'
import { Shield, Zap, Scale, Award, BookOpen } from 'lucide-react'
import SectionWrapper from '@/components/shared/SectionWrapper'
import Image from 'next/image'

const threeR = [
  {
    title: 'Resourceful',
    icon: Zap,
    description: 'Creative legal strategies tailored to your unique situation.',
  },
  {
    title: 'Relentless',
    icon: Shield,
    description: 'Unwavering commitment to achieving the best possible outcome.',
  },
  {
    title: 'Representation',
    icon: Scale,
    description: 'Skilled advocacy at every stage of your legal journey.',
  },
]

const credentials = [
  '20+ Years Experience',
  'Florida Licensed Attorney',
  'Founded 2020',
  'Member, Florida Bar',
]

export default function AboutSection() {
  return (
    <SectionWrapper id="about" className="bg-cream pattern-warm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative">
              <div className="absolute -inset-3 bg-gradient-to-br from-dusty-rose/20 to-sand rounded-2xl" />
              <Image
                src="/mayer-assets/attorney.jpg"
                alt="Attorney Nicole Mayer"
                width={500}
                height={600}
                className="relative rounded-2xl shadow-xl w-full h-auto object-cover aspect-[5/6]"
              />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-lg p-4 border border-sand">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-dusty-rose" />
                <div>
                  <p className="text-xs font-bold text-charcoal">20+ Years</p>
                  <p className="text-[10px] text-medium-gray">Legal Experience</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm font-medium tracking-[0.2em] uppercase text-dusty-rose mb-3">
              About Us
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal mb-4">
              Meet Nicole Mayer
            </h2>
            <div className="accent-line mb-6" />

            <p className="text-medium-gray leading-relaxed mb-4">
              Founded by Nicole Mayer in 2020, Mayer Law brings over 20 years of legal experience to every case. Based in Maitland, Florida, we specialize in Consumer Finance, Education Law & Civil Rights, Personal Injury, and General Litigation.
            </p>
            <p className="text-medium-gray leading-relaxed mb-8">
              Our approach is simple: we fight for what is right with resourceful strategies and relentless determination. Every client deserves an attorney who will go the distance — and that is exactly what we deliver.
            </p>

            {/* Credentials */}
            <div className="flex flex-wrap gap-2 mb-8">
              {credentials.map((cred) => (
                <span
                  key={cred}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-sand rounded-full text-xs font-medium text-charcoal"
                >
                  <BookOpen className="w-3 h-3 text-dusty-rose" />
                  {cred}
                </span>
              ))}
            </div>

            {/* 3R Promise */}
            <div className="bg-white rounded-2xl p-6 border border-sand">
              <h3 className="font-serif text-lg font-bold text-charcoal mb-4">
                The 3R Promise
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {threeR.map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 }}
                    className="text-center"
                  >
                    <div className="w-10 h-10 rounded-lg bg-blush flex items-center justify-center mx-auto mb-3">
                      <item.icon className="w-5 h-5 text-dusty-rose" />
                    </div>
                    <h4 className="font-bold text-sm text-charcoal mb-1">{item.title}</h4>
                    <p className="text-xs text-medium-gray">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  )
}
