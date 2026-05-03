'use client'

import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StarRatingProps {
  rating: number
  maxRating?: number
  size?: 'sm' | 'md' | 'lg'
  interactive?: boolean
  onRate?: (rating: number) => void
  className?: string
}

export default function StarRating({
  rating,
  maxRating = 5,
  size = 'md',
  interactive = false,
  onRate,
  className,
}: StarRatingProps) {
  const sizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  }

  return (
    <div className={cn('flex items-center gap-0.5', className)} role={interactive ? 'radiogroup' : 'img'} aria-label={`${rating} out of ${maxRating} stars`}>
      {Array.from({ length: maxRating }, (_, i) => {
        const filled = i < rating
        return (
          <button
            key={i}
            type="button"
            disabled={!interactive}
            onClick={() => interactive && onRate?.(i + 1)}
            className={cn(
              'transition-colors duration-150',
              interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'
            )}
            aria-label={filled ? `${i + 1} star filled` : `${i + 1} star empty`}
          >
            <Star
              className={cn(
                sizes[size],
                'transition-colors',
                filled
                  ? 'fill-dusty-rose text-dusty-rose'
                  : 'fill-transparent text-sand'
              )}
            />
          </button>
        )
      })}
    </div>
  )
}
