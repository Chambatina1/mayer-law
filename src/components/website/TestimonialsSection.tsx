'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Quote, ChevronLeft, ChevronRight, MessageSquarePlus } from 'lucide-react'
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
  createdAt: string
}

export default function TestimonialsSection() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const { setView } = useAppStore()

  useEffect(() => {
    fetch('/api/reviews')
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch(() => {})
  }, [])

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length)
  }, [reviews.length])

  const prev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length)
  }, [reviews.length])

  useEffect(() => {
    if (reviews.length <= 1) return
    const timer = setInterval(next, 6000)
    return () => clearInterval(timer)
  }, [reviews.length, next])

  if (reviews.length === 0) return null

  const currentReview = reviews[currentIndex]

  return (
    <SectionWrapper id="testimonials" className="bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-dusty-rose mb-3">
            Client Stories
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal mb-4">
            What Our Clients Say
          </h2>
          <div className="accent-line mx-auto" />
        </div>

        {/* Carousel */}
        <div className="max-w-3xl mx-auto">
          <div className="relative bg-cream rounded-2xl border border-sand p-8 sm:p-10 min-h-[280px] flex flex-col justify-center">
            {/* Quote icon */}
            <div className="absolute top-6 left-8">
              <Quote className="w-8 h-8 text-dusty-rose/30" />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentReview.id}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                {/* Stars */}
                <div className="flex justify-center mb-5">
                  <StarRating rating={currentReview.rating} size="lg" />
                </div>

                {/* Text */}
                <p className="text-charcoal text-base sm:text-lg leading-relaxed mb-6 italic">
                  &ldquo;{currentReview.text}&rdquo;
                </p>

                {/* Author */}
                <div>
                  <p className="font-bold text-charcoal">{currentReview.clientName}</p>
                  {currentReview.service && (
                    <p className="text-sm text-medium-gray">{currentReview.service}</p>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            {reviews.length > 1 && (
              <div className="flex items-center justify-between mt-8">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={prev}
                  className="text-medium-gray hover:text-dusty-rose hover:bg-blush rounded-full"
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>

                {/* Dots */}
                <div className="flex items-center gap-1.5">
                  {reviews.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentIndex(i)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        i === currentIndex
                          ? 'bg-dusty-rose w-6'
                          : 'bg-sand hover:bg-sage'
                      }`}
                      aria-label={`Go to review ${i + 1}`}
                    />
                  ))}
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={next}
                  className="text-medium-gray hover:text-dusty-rose hover:bg-blush rounded-full"
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            )}
          </div>

          {/* Share button */}
          <div className="text-center mt-8">
            <Button
              variant="outline"
              onClick={() => setView('review')}
              className="border-dusty-rose/30 text-dusty-rose hover:bg-dusty-rose hover:text-white rounded-full px-6"
            >
              <MessageSquarePlus className="w-4 h-4 mr-2" />
              Share Your Experience
            </Button>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
