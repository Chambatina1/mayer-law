'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import SectionWrapper from '@/components/shared/SectionWrapper'
import { Shield, Target, Scale } from 'lucide-react'

const promises = [
  { icon: Target, title: 'Resourceful', desc: 'Creative strategies tailored to your unique situation.' },
  { icon: Shield, title: 'Relentless', desc: 'Unwavering commitment to achieving the best outcome.' },
  { icon: Scale, title: 'Representation', desc: 'Skilled advocacy at every stage of your case.' },
]

const credentials = [
  '20+ Years Experience',
  'Florida Bar Member',
  '2,000+ Consultations',
  '$20M+ Recovered',
]

export default function AboutSection() {
  return (
    <SectionWrapper id="about">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Photo */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/mayer-assets/attorney.jpg"
              alt="Attorney Nicole Mayer"
              fill
              className="object-cover object-top"
              priority
            />
          </div>
          {/* Decorative accent */}
          <div className="absolute -bottom-4 -right-4 w-full h-full rounded-2xl border-2 border-soft-gold/30 -z-10" />
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="gold-accent-line mb-6" />

          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal mb-6">
            About Nicole Mayer
          </h2>

          <p className="text-medium-gray leading-relaxed mb-4">
            With over 20 years of legal experience, Nicole Mayer founded Mayer Law in 2020 with a clear mission: to provide resourceful and relentless representation for individuals across Florida.
          </p>
          <p className="text-medium-gray leading-relaxed mb-8">
            Her practice focuses on consumer finance, education law and civil rights, personal injury, and general litigation. Nicole&apos;s approach is straightforward — she listens, she strategizes, and she fights for results.
          </p>

          {/* 3R Promise */}
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            {promises.map((p) => (
              <div key={p.title} className="text-center sm:text-left p-4 rounded-xl bg-beige/50">
                <p.icon className="w-6 h-6 text-soft-gold mx-auto sm:mx-0 mb-2" />
                <h4 className="font-serif font-semibold text-charcoal text-sm mb-1">{p.title}</h4>
                <p className="text-medium-gray text-xs leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>

          {/* Credentials */}
          <div className="flex flex-wrap gap-2">
            {credentials.map((c) => (
              <span
                key={c}
                className="inline-block px-4 py-1.5 rounded-full bg-beige/60 text-dark-gold text-xs font-medium tracking-wide"
              >
                {c}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
