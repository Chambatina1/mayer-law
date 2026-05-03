'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SectionWrapperProps {
  children: React.ReactNode
  id?: string
  className?: string
  noPadding?: boolean
}

export default function SectionWrapper({
  children,
  id,
  className,
  noPadding = false,
}: SectionWrapperProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={cn(noPadding ? '' : 'py-16 sm:py-20 lg:py-24', className)}
    >
      {children}
    </motion.section>
  )
}
