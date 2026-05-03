'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Quote, ChevronLeft, ChevronRight, MessageSquarePlus, ExternalLink, Star, X } from 'lucide-react'
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
  const [showGoogleModal, setShowGoogleModal] = useState(false)
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
  const googleMapsUrl = 'https://www.google.com/maps/place/Mayer+Law+P.A./@28.6278,-81.3635,15z'

  // Calculate average rating
  const avgRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : '0'

  return (
    <SectionWrapper id="testimonials" className="bg-cream">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header with Google Reviews badge */}
        <div className="text-center mb-12">
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-dusty-rose mb-3">
            Client Stories
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal mb-4">
            What Our Clients Say
          </h2>
          <div className="accent-line mx-auto mb-6" />

          {/* Google Reviews summary bar */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-4 bg-white rounded-full px-7 py-3.5 border border-sand shadow-md"
          >
            <div className="flex items-center gap-1">
              <svg className="w-7 h-7" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span className="font-bold text-charcoal text-sm">{avgRating}</span>
              <div className="flex items-center gap-0.5">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className={`w-3.5 h-3.5 ${i <= Math.round(Number(avgRating)) ? 'text-amber-400 fill-amber-400' : 'text-sage'}`} />
                ))}
              </div>
            </div>
            <div className="w-px h-5 bg-sage" />
            <span className="text-xs text-medium-gray font-bold">Google Reviews</span>
            <div className="w-px h-5 bg-sage" />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowGoogleModal(true)}
              className="text-dusty-rose hover:text-deep-rose hover:bg-blush h-auto p-1 rounded-full text-xs font-medium"
            >
              Read All <ExternalLink className="w-3 h-3 ml-1" />
            </Button>
          </motion.div>
        </div>

        {/* Carousel */}
        <div className="max-w-3xl mx-auto">
          <div className="relative bg-white rounded-2xl border border-sand p-8 sm:p-10 min-h-[280px] flex flex-col justify-center shadow-sm">
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
                          : 'bg-sage hover:bg-dusty-rose/50'
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
          <div className="text-center mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              variant="outline"
              onClick={() => setView('review')}
              className="border-dusty-rose/30 text-dusty-rose hover:bg-dusty-rose hover:text-white rounded-full px-6"
            >
              <MessageSquarePlus className="w-4 h-4 mr-2" />
              Share Your Experience
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowGoogleModal(true)}
              className="border-sand text-medium-gray hover:bg-white rounded-full px-6"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              See All Google Reviews
            </Button>
          </div>
        </div>

        {/* Always-visible Google Reviews strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <div className="bg-white rounded-2xl border border-sand p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <svg className="w-7 h-7" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-charcoal text-lg">{avgRating}</span>
                    <div className="flex items-center gap-0.5">
                      {[1,2,3,4,5].map(i => (
                        <Star key={i} className={`w-4 h-4 ${i <= Math.round(Number(avgRating)) ? 'text-amber-400 fill-amber-400' : 'text-sand'}`} />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-medium-gray">{reviews.length} reviews on Google</p>
                </div>
              </div>

              {/* Mini review previews */}
              <div className="hidden md:flex items-center gap-3 flex-1 justify-center max-w-md overflow-hidden">
                {reviews.slice(0, 3).map((review) => (
                  <div key={review.id} className="flex-shrink-0 max-w-[180px] p-2.5 bg-cream rounded-xl">
                    <div className="flex items-center gap-1 mb-1">
                      <StarRating rating={review.rating} size={10} />
                    </div>
                    <p className="text-[11px] text-medium-gray line-clamp-2 leading-snug">{review.text}</p>
                    <p className="text-[10px] font-medium text-charcoal mt-1">{review.clientName}</p>
                  </div>
                ))}
              </div>

              <Button
                onClick={() => window.open(googleMapsUrl, '_blank', 'noopener,noreferrer')}
                className="bg-white hover:bg-cream text-charcoal border border-sand rounded-full px-5 shadow-sm shrink-0"
              >
                <Star className="w-4 h-4 mr-2 text-amber-400 fill-amber-400" />
                Read on Google
                <ExternalLink className="w-3.5 h-3.5 ml-2" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Google Reviews Modal */}
      <AnimatePresence>
        {showGoogleModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-charcoal/60 backdrop-blur-sm"
            onClick={() => setShowGoogleModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setShowGoogleModal(false)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-cream transition-colors text-medium-gray"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center mb-6">
                <svg className="w-10 h-10 mx-auto mb-3" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <div className="flex items-center justify-center gap-2 mb-3">
                  <span className="font-bold text-2xl text-charcoal">{avgRating}</span>
                  <div className="flex flex-col items-start">
                    <div className="flex items-center gap-0.5">
                      {[1,2,3,4,5].map(i => (
                        <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                      ))}
                    </div>
                    <p className="text-xs text-medium-gray">{reviews.length} reviews</p>
                  </div>
                </div>
                <h3 className="font-serif text-2xl font-bold text-charcoal mb-2">
                  Mayer Law, P.A. on Google
                </h3>
                <p className="text-medium-gray text-sm">
                  Powered by Google &middot; Our clients speak for themselves. Read our reviews on Google.
                </p>
              </div>

              {/* Sample reviews preview */}
              <div className="space-y-3 mb-6 max-h-60 overflow-y-auto">
                {reviews.map((review) => (
                  <div key={review.id} className="p-3 bg-cream rounded-xl">
                    <div className="flex items-center gap-2 mb-1">
                      <StarRating rating={review.rating} size={12} />
                      <span className="text-xs font-medium text-charcoal">{review.clientName}</span>
                    </div>
                    <p className="text-xs text-medium-gray line-clamp-2">{review.text}</p>
                  </div>
                ))}
              </div>

              <Button
                onClick={() => window.open(googleMapsUrl, '_blank', 'noopener,noreferrer')}
                className="w-full bg-dusty-rose hover:bg-deep-rose text-white rounded-full py-5 font-semibold"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Read All Reviews on Google
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionWrapper>
  )
}
