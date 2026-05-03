'use client'

import AnimatedCounter from '@/components/shared/AnimatedCounter'
import SectionWrapper from '@/components/shared/SectionWrapper'

const stats = [
  { value: 2000, suffix: '+', label: 'Consultations' },
  { value: 93, suffix: '%', label: 'Success Rate' },
  { value: 20, suffix: '+', label: 'Years Experience' },
  { value: 20, prefix: '$', suffix: 'M+', label: 'Recovered' },
]

export default function StatsSection() {
  return (
    <SectionWrapper id="stats" className="bg-beige/50">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <AnimatedCounter
              end={stat.value}
              suffix={stat.suffix}
              prefix={stat.prefix || ''}
              className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-soft-gold mb-2"
            />
            <p className="text-medium-gray text-sm font-medium tracking-wide uppercase">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  )
}
