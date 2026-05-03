'use client'

import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StarRatingProps {
  rating: number
  maxRating?: number
  size?: number
  interactive?: boolean
  onRate?: (rating: number) => void
  className?: string
}

export default function StarRating({
  rating,
  maxRating = 5,
  size = 18,
  interactive = false,
  onRate,
  className,
}: StarRatingProps) {
  return (
    <div className={cn('flex gap-0.5', className)}>
      {Array.from({ length: maxRating }, (_, i) => {
        const starValue = i + 1
        const isFilled = starValue <= rating

        return (
          <button
            key={i}
            type="button"
            disabled={!interactive}
            onClick={() => interactive && onRate?.(starValue)}
            className={cn(
              'transition-transform',
              interactive && 'cursor-pointer hover:scale-110 active:scale-95'
            )}
            aria-label={`${starValue} star${starValue > 1 ? 's' : ''}`}
          >
            <Star
              size={size}
              className={cn(
                'transition-colors',
                isFilled
                  ? 'fill-[#C9A96E] text-[#C9A96E]'
                  : interactive
                  ? 'text-[#A0A0A0] hover:text-[#C9A96E]'
                  : 'text-[#A0A0A0]'
              )}
            />
          </button>
        )
      })}
    </div>
  )
}
