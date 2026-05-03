'use client'

import { motion } from 'framer-motion'
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'

const testimonials = [
  {
    name: 'Brittany Roberson',
    rating: 5,
    text: 'Nicole Mayer is an exceptional attorney. She handled my case with professionalism and genuine care. Her resourceful approach to my consumer finance issue exceeded all my expectations. I highly recommend Mayer Law!',
  },
  {
    name: 'Heather McKenzie',
    rating: 5,
    text: 'From our first consultation, I felt heard and valued. Attorney Mayer is relentless in her pursuit of justice. She kept me informed every step of the way and the outcome was better than I could have hoped for.',
  },
  {
    name: 'Ray Lau',
    rating: 5,
    text: 'Mayer Law provided outstanding representation during a very difficult time. Nicole\'s knowledge of education law and civil rights is impressive. She fought tirelessly for my family and achieved a great result.',
  },
  {
    name: 'Tresha Thompson',
    rating: 5,
    text: 'I was overwhelmed by my legal situation until I found Mayer Law. Nicole Mayer took the time to explain everything clearly and developed a strategy that led to a successful resolution. She truly goes above and beyond.',
  },
  {
    name: 'Karina Calderon',
    rating: 5,
    text: 'Professional, knowledgeable, and compassionate. Attorney Mayer made a stressful legal process manageable. Her dedication to her clients is evident in every interaction. I am incredibly grateful for her services.',
  },
  {
    name: 'Bianca Vinas',
    rating: 5,
    text: 'Mayer Law is the real deal. Nicole\'s expertise in personal injury law made all the difference in my case. She is a fierce advocate who genuinely cares about getting the best possible outcome for her clients.',
  },
]

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length)
  }, [])

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }, [])

  useEffect(() => {
    if (!isAutoPlaying) return
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [isAutoPlaying, next])

  const testimonial = testimonials[current]

  return (
    <section className="py-20 lg:py-28 bg-dark section-pattern">
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
            Client Reviews
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            What Our Clients Say
          </h2>
          <div className="w-16 h-1 bg-gold mx-auto" />
        </motion.div>

        {/* Testimonial Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <div className="relative">
            {/* Quote icon */}
            <Quote className="absolute -top-4 left-4 sm:left-8 w-12 h-12 text-gold/20" />

            <div className="bg-dark-lighter/50 border border-white/5 rounded-2xl p-8 sm:p-12 text-center">
              {/* Stars */}
              <div className="flex items-center justify-center gap-1 mb-6">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-gold text-gold"
                  />
                ))}
              </div>

              {/* Testimonial Text */}
              <motion.p
                key={current}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-white/80 text-lg sm:text-xl leading-relaxed mb-8 font-light italic"
              >
                &ldquo;{testimonial.text}&rdquo;
              </motion.p>

              {/* Client Name */}
              <motion.div
                key={`name-${current}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <div className="w-12 h-0.5 bg-gold mx-auto mb-4" />
                <p className="font-serif text-lg font-semibold text-gold">
                  {testimonial.name}
                </p>
              </motion.div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <Button
                variant="outline"
                size="icon"
                onClick={prev}
                className="rounded-full border-gold/30 text-gold hover:bg-gold/10 hover:text-gold h-10 w-10"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>

              {/* Dots */}
              <div className="flex items-center gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrent(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      index === current
                        ? 'bg-gold w-8'
                        : 'bg-white/20 hover:bg-white/40'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={next}
                className="rounded-full border-gold/30 text-gold hover:bg-gold/10 hover:text-gold h-10 w-10"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
