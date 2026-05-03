'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Lightbulb, Target, Users, Award, BookOpen, Briefcase } from 'lucide-react'

const threeRPromise = [
  {
    word: 'Resourceful',
    icon: Lightbulb,
    description:
      'Finding quick and clever ways to overcome difficulties. We approach every case with creative strategies and innovative solutions to achieve the best outcomes.',
  },
  {
    word: 'Relentless',
    icon: Target,
    description:
      'Showing no abatement of severity, intensity, or pace. We pursue justice with unwavering determination and never give up on our clients\' cases.',
  },
  {
    word: 'Representation',
    icon: Users,
    description:
      'Standing for another with full rights and obligations. We are your voice in the legal system, committed to protecting your interests at every turn.',
  },
]

const timeline = [
  { year: '2004', event: 'Began legal career', icon: BookOpen },
  { year: '2010', event: 'Specialized in Consumer Finance & Civil Rights', icon: Briefcase },
  { year: '2020', event: 'Founded Mayer Law in Maitland, Florida', icon: Award },
  { year: '2025', event: '20+ years of dedicated legal service', icon: Lightbulb },
]

export default function AboutSection() {
  return (
    <section id="about" className="py-20 lg:py-28 bg-dark section-pattern">
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
            About Us
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Meet Attorney Nicole Mayer
          </h2>
          <div className="w-16 h-1 bg-gold mx-auto" />
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative aspect-[3/4] max-w-md mx-auto lg:mx-0 rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/attorney-nicole.png"
                alt="Attorney Nicole Mayer"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Gold overlay at bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-dark/80 to-transparent" />
            </div>
            {/* Gold accent border */}
            <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-gold/30 rounded-2xl -z-10" />

            {/* Experience badge */}
            <div className="absolute -bottom-6 -right-6 bg-gold text-white rounded-xl p-4 shadow-xl">
              <div className="text-center">
                <span className="font-serif text-3xl font-bold">20+</span>
                <p className="text-xs font-medium opacity-90">Years</p>
              </div>
            </div>
          </motion.div>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="font-serif text-2xl lg:text-3xl font-bold text-white mb-6">
              A Legacy of <span className="text-gold">Dedication</span> & Justice
            </h3>
            <div className="space-y-4 text-white/70 leading-relaxed">
              <p>
                Nicole Mayer is the founder and lead attorney at Mayer Law, established in
                2020 in Maitland, Florida. With over 20 years of legal experience, Attorney
                Mayer has built a reputation for providing resourceful and relentless
                representation to clients across the state.
              </p>
              <p>
                Throughout her career, Nicole has been committed to fighting for the rights
                of individuals who have been wronged by unfair financial practices,
                discrimination, or negligence. Her approach combines sharp legal acumen with
                genuine compassion for her clients.
              </p>
              <p>
                Whether navigating complex class action litigation or providing personalized
                attention to individual cases, Attorney Mayer brings the same level of
                dedication and expertise to every matter she handles.
              </p>
            </div>

            {/* Credentials */}
            <div className="mt-8 flex flex-wrap gap-4">
              <div className="px-4 py-2 rounded-full border border-gold/30 text-gold text-sm font-medium">
                Licensed Florida Attorney
              </div>
              <div className="px-4 py-2 rounded-full border border-gold/30 text-gold text-sm font-medium">
                Consumer Finance Specialist
              </div>
              <div className="px-4 py-2 rounded-full border border-gold/30 text-gold text-sm font-medium">
                Civil Rights Advocate
              </div>
            </div>
          </motion.div>
        </div>

        {/* The 3R Promise */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <span className="inline-block text-gold text-sm font-semibold tracking-[0.2em] uppercase mb-4">
              Our Brand Identity
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl font-bold text-white">
              The <span className="text-gold">3R</span> Promise
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {threeRPromise.map((item, index) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.word}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="text-center p-8 rounded-2xl bg-dark-lighter/50 border border-white/5 hover:border-gold/30 transition-all duration-300 group"
                >
                  <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-gold/20 transition-colors">
                    <Icon className="w-8 h-8 text-gold" />
                  </div>
                  <h4 className="font-serif text-2xl font-bold text-gold mb-4">
                    {item.word}
                  </h4>
                  <p className="text-white/60 leading-relaxed">{item.description}</p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <span className="inline-block text-gold text-sm font-semibold tracking-[0.2em] uppercase mb-4">
              Career Journey
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl font-bold text-white">
              Experience <span className="text-gold">Timeline</span>
            </h3>
          </div>

          <div className="relative">
            {/* Center line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gold/20 -translate-x-1/2" />

            <div className="space-y-8 md:space-y-0">
              {timeline.map((item, index) => {
                const Icon = item.icon
                const isLeft = index % 2 === 0
                return (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`relative flex items-center mb-8 md:mb-12 ${
                      isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                  >
                    {/* Content */}
                    <div className={`flex-1 ${isLeft ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'} pl-12 md:pl-0`}>
                      <span className="text-gold font-serif text-xl font-bold">
                        {item.year}
                      </span>
                      <p className="text-white/70 mt-1">{item.event}</p>
                    </div>

                    {/* Center dot */}
                    <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-10 h-10 rounded-full bg-dark border-2 border-gold flex items-center justify-center z-10">
                      <Icon className="w-4 h-4 text-gold" />
                    </div>

                    {/* Spacer */}
                    <div className="flex-1 hidden md:block" />
                  </motion.div>
                )
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
