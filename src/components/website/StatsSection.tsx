'use client'

import { motion } from 'framer-motion'
import { Users, Award, Clock, DollarSign } from 'lucide-react'
import SectionWrapper from '@/components/shared/SectionWrapper'
import AnimatedCounter from '@/components/shared/AnimatedCounter'

const stats = [
  {
    icon: Users,
    value: 2000,
    suffix: '+',
    label: 'Consultations',
    description: 'Clients served with dedication',
  },
  {
    icon: Award,
    value: 93,
    suffix: '%',
    label: 'Success Rate',
    description: 'Proven track record',
  },
  {
    icon: Clock,
    value: 20,
    suffix: '+',
    label: 'Years Experience',
    description: 'In legal practice',
  },
  {
    icon: DollarSign,
    value: 20,
    suffix: 'M+',
    label: 'Recovered',
    description: 'For our clients',
  },
]

export default function StatsSection() {
  return (
    <SectionWrapper className="bg-blush">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-dusty-rose mb-3">
            By The Numbers
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal">
            Results That Speak
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white rounded-2xl p-6 text-center border border-sand shadow-sm"
            >
              <div className="w-12 h-12 rounded-xl bg-blush flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-6 h-6 text-dusty-rose" />
              </div>
              <div className="font-serif text-3xl sm:text-4xl font-bold text-charcoal mb-1">
                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              </div>
              <p className="font-semibold text-sm text-charcoal mb-1">{stat.label}</p>
              <p className="text-xs text-medium-gray">{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
