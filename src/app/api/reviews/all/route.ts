import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const reviews = await db.review.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(reviews)
  } catch (error) {
    console.error('Error fetching all reviews:', error)
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 })
  }
}
