'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { Users, TrendingUp, Clock, DollarSign } from 'lucide-react'

const stats = [
  {
    icon: Users,
    value: 2000,
    suffix: '+',
    label: 'Client Consultations',
    description: 'Individuals and families served',
  },
  {
    icon: TrendingUp,
    value: 93,
    suffix: '%',
    label: 'Successful Cases',
    description: 'Proven track record of success',
  },
  {
    icon: Clock,
    value: 20,
    suffix: '+',
    label: 'Years Experience',
    description: 'Of dedicated legal practice',
  },
  {
    icon: DollarSign,
    value: 20,
    prefix: '$',
    suffix: 'M+',
    label: 'Recovered for Clients',
    description: 'In settlements and verdicts',
  },
]

function AnimatedCounter({
  value,
  suffix = '',
  prefix = '',
  duration = 2,
}: {
  value: number
  suffix?: string
  prefix?: string
  duration?: number
}) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return

    let startTime: number | null = null
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * value))
      if (progress < 1) {
        requestAnimationFrame(step)
      }
    }
    requestAnimationFrame(step)
  }, [isInView, value, duration])

  return (
    <span ref={ref} className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-gold">
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  )
}

export default function StatsSection() {
  return (
    <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 section-pattern" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-gold text-sm font-semibold tracking-[0.2em] uppercase mb-4">
            By The Numbers
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-dark mb-6">
            Our Track Record
          </h2>
          <div className="w-16 h-1 bg-gold mx-auto" />
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center group"
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-gold/20 transition-colors">
                  <Icon className="w-7 h-7 text-gold-dark" />
                </div>

                {/* Counter */}
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  prefix={stat.prefix}
                />

                {/* Label */}
                <p className="font-serif text-lg font-semibold text-dark mt-3 mb-1">
                  {stat.label}
                </p>
                <p className="text-dark/50 text-sm">{stat.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
