'use client'

import { motion } from 'framer-motion'
import { Shield, GraduationCap, HeartPulse, Scale, ArrowRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useAppStore } from '@/store/useAppStore'

const practiceAreas = [
  {
    icon: Shield,
    title: 'Consumer Finance Law',
    description:
      'Protecting consumers and ethical businesses from unfair, deceptive, or fraudulent financial practices. We fight against predatory lending, debt collection abuse, and financial fraud.',
    color: 'from-gold/20 to-gold/5',
  },
  {
    icon: GraduationCap,
    title: 'Education Law & Civil Rights',
    description:
      'Fighting discrimination in schools and workplaces. We advocate for equal access to education, Title IX compliance, and protection of civil rights under federal and state law.',
    color: 'from-gold/20 to-gold/5',
  },
  {
    icon: HeartPulse,
    title: 'Personal Injury',
    description:
      'Providing compassionate representation for physical, emotional, or reputational injuries. We seek fair compensation and hold responsible parties accountable for their actions.',
    color: 'from-gold/20 to-gold/5',
  },
  {
    icon: Scale,
    title: 'General Litigation & Consulting',
    description:
      'Comprehensive legal representation and expert consulting services. From pre-litigation strategy to courtroom advocacy, we deliver results-driven legal solutions.',
    color: 'from-gold/20 to-gold/5',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

export default function PracticeAreasSection() {
  const { setAppointmentModalOpen, setSelectedPracticeArea } = useAppStore()

  const handleSchedule = (area: string) => {
    setSelectedPracticeArea(area)
    setAppointmentModalOpen(true)
  }

  return (
    <section id="practice-areas" className="py-20 lg:py-28 bg-white section-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-gold text-sm font-semibold tracking-[0.2em] uppercase mb-4">
            What We Do
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-dark mb-6">
            Practice Areas
          </h2>
          <div className="w-16 h-1 bg-gold mx-auto mb-6" />
          <p className="text-dark/60 text-lg max-w-2xl mx-auto leading-relaxed">
            Mayer Law provides dedicated legal representation across multiple practice
            areas, always with a focus on achieving the best possible outcomes for our clients.
          </p>
        </motion.div>

        {/* Practice Area Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
        >
          {practiceAreas.map((area) => {
            const Icon = area.icon
            return (
              <motion.div key={area.title} variants={cardVariants}>
                <Card className="group relative overflow-hidden border-0 bg-white shadow-sm hover:shadow-xl transition-all duration-500 rounded-xl h-full">
                  {/* Gold top accent */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold-dark via-gold to-gold-light transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                  <CardContent className="p-6 lg:p-8 h-full flex flex-col">
                    {/* Icon */}
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${area.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-7 h-7 text-gold-dark" />
                    </div>

                    {/* Title */}
                    <h3 className="font-serif text-xl lg:text-2xl font-bold text-dark mb-4 group-hover:text-gold-dark transition-colors">
                      {area.title}
                    </h3>

                    {/* Description */}
                    <p className="text-dark/60 leading-relaxed mb-6 flex-1">
                      {area.description}
                    </p>

                    {/* CTA */}
                    <Button
                      variant="ghost"
                      onClick={() => handleSchedule(area.title)}
                      className="self-start text-gold hover:text-gold-dark hover:bg-gold/10 p-0 h-auto group/btn"
                    >
                      Schedule Consultation
                      <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
