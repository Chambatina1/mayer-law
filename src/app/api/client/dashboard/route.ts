import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')

    if (!email) {
      return NextResponse.json({ error: 'Missing client email' }, { status: 400 })
    }

    const client = await db.client.findUnique({ where: { email } })
    if (!client) {
      return NextResponse.json({ error: 'Client not found' }, { status: 404 })
    }

    const [appointments, documents, messages, invoices] = await Promise.all([
      db.appointment.findMany({
        where: { email },
        orderBy: { createdAt: 'desc' },
      }),
      db.clientDocument.findMany({
        where: { clientId: client.id },
        orderBy: { uploadedAt: 'desc' },
      }),
      db.clientMessage.findMany({
        where: { clientId: client.id },
        orderBy: { createdAt: 'asc' },
      }),
      db.invoice.findMany({
        where: { clientId: client.id },
        orderBy: { createdAt: 'desc' },
      }),
    ])

    return NextResponse.json({
      client: { id: client.id, name: client.name, email: client.email },
      stats: {
        activeCases: appointments.filter(a => a.status === 'confirmed' || a.status === 'pending').length,
        upcomingAppointments: appointments.filter(a => a.status === 'confirmed').length,
        totalDocuments: documents.length,
      },
      appointments,
      documents,
      messages,
      invoices,
    })
  } catch (error) {
    console.error('Error fetching dashboard:', error)
    return NextResponse.json({ error: 'Failed to fetch dashboard data' }, { status: 500 })
  }
}
