import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const [totalClients, totalAppointments, pendingAppointments, confirmedAppointments, totalReviews, avgRating, totalDocuments, totalMessages, unreadMessages, contactSubmissions] = await Promise.all([
      db.client.count(),
      db.appointment.count(),
      db.appointment.count({ where: { status: 'pending' } }),
      db.appointment.count({ where: { status: 'confirmed' } }),
      db.review.count(),
      db.review.aggregate({ _avg: { rating: true } }),
      db.clientDocument.count(),
      db.clientMessage.count(),
      db.clientMessage.count({ where: { read: false } }),
      db.contactSubmission.count({ where: { read: false } }),
    ])

    const recentAppointments = await db.appointment.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
      include: { documents: true },
    })

    return NextResponse.json({
      totalClients,
      totalAppointments,
      pendingAppointments,
      confirmedAppointments,
      totalReviews,
      avgRating: avgRating._avg.rating || 0,
      totalDocuments,
      totalMessages,
      unreadMessages,
      unreadContactSubmissions: contactSubmissions,
      recentAppointments,
    })
  } catch (error) {
    console.error('Error fetching admin stats:', error)
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 })
  }
}
