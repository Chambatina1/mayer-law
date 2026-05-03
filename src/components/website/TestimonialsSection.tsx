'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { Button } from '@/components/ui/button'
import StarRating from '@/components/shared/StarRating'
import SectionWrapper from '@/components/shared/SectionWrapper'
import { useAppStore } from '@/store/useAppStore'

interface Review {
  id: string
  clientName: string
  rating: number
  service?: string | null
  text?: string | null
}

export default function TestimonialsSection() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const { setView } = useAppStore()

  useEffect(() => {
    fetch('/api/reviews')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setReviews(data)
      })
      .catch(console.error)
  }, [])

  const next = useCallback(() => {
    setCurrentIndex((i) => (i + 1) % reviews.length)
  }, [reviews.length])

  const prev = useCallback(() => {
    setCurrentIndex((i) => (i - 1 + reviews.length) % reviews.length)
  }, [reviews.length])

  useEffect(() => {
    if (reviews.length <= 1) return
    const interval = setInterval(next, 6000)
    return () => clearInterval(interval)
  }, [next, reviews.length])

  if (reviews.length === 0) return null

  const review = reviews[currentIndex]

  return (
    <SectionWrapper id="testimonials" className="bg-warm-white">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <div className="gold-accent-line" />
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal mb-4">
          Client Stories
        </h2>
        <p className="text-medium-gray text-lg max-w-xl mx-auto">
          Real results from real people.
        </p>
      </div>

      {/* Carousel */}
      <div className="relative max-w-3xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={review.id}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-2xl p-8 md:p-12 shadow-sm text-center"
          >
            <Quote className="w-8 h-8 text-soft-gold/30 mx-auto mb-6" />
            <p className="text-charcoal text-lg md:text-xl leading-relaxed mb-6 font-light italic">
              &ldquo;{review.text}&rdquo;
            </p>
            <StarRating rating={review.rating} size={18} className="justify-center mb-4" />
            <p className="font-serif font-semibold text-charcoal">{review.clientName}</p>
            {review.service && (
              <p className="text-medium-gray text-sm mt-1">{review.service}</p>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        {reviews.length > 1 && (
          <div className="flex items-center justify-center gap-4 mt-8">
            <Button
              variant="ghost"
              size="icon"
              onClick={prev}
              className="rounded-full text-medium-gray hover:text-soft-gold hover:bg-beige/50"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            <div className="flex gap-2">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === currentIndex ? 'bg-soft-gold w-6' : 'bg-light-gray'
                  }`}
                  aria-label={`Go to review ${i + 1}`}
                />
              ))}
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={next}
              className="rounded-full text-medium-gray hover:text-soft-gold hover:bg-beige/50"
              aria-label="Next review"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        )}
      </div>

      {/* Share CTA */}
      <div className="text-center mt-10">
        <Button
          variant="ghost"
          className="text-soft-gold hover:text-warm-gold font-medium"
          onClick={() => setView('review')}
        >
          Share your experience →
        </Button>
      </div>
    </SectionWrapper>
  )
}
