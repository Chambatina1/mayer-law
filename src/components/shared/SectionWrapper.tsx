'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SectionWrapperProps {
  children: React.ReactNode
  id?: string
  className?: string
  noPadding?: boolean
}

export default function SectionWrapper({ children, id, className = '', noPadding = false }: SectionWrapperProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={cn(!noPadding && 'py-16 md:py-24 px-4 sm:px-6 lg:px-8', className)}
    >
      <div className="max-w-6xl mx-auto">
        {children}
      </div>
    </motion.section>
  )
}
