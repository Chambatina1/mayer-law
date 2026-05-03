import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const [clients, appointments, reviews, documents, messages, contacts] = await Promise.all([
      db.client.findMany(),
      db.appointment.findMany({}),
      db.review.findMany({}),
      db.clientDocument.findMany({}),
      db.clientMessage.findMany({}),
      db.contactSubmission.findMany(),
    ])

    const pendingAppointments = appointments.filter(a => a.status === 'pending').length
    const confirmedAppointments = appointments.filter(a => a.status === 'confirmed').length
    const avgRating = reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0
    const unreadMessages = messages.filter(m => !m.read).length
    const unreadContacts = contacts.filter(c => !c.read).length
    const recentAppointments = appointments.slice(0, 5)

    return NextResponse.json({
      totalClients: clients.length,
      totalAppointments: appointments.length,
      pendingAppointments,
      confirmedAppointments,
      totalReviews: reviews.length,
      avgRating,
      totalDocuments: documents.length,
      totalMessages: messages.length,
      unreadMessages,
      unreadContactSubmissions: unreadContacts,
      recentAppointments,
    })
  } catch (error) {
    console.error('Error fetching admin stats:', error)
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 })
  }
}
