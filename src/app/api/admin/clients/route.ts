import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const clients = await db.client.findMany()
    const appointments = await db.appointment.findMany({})

    // Add appointment count to each client
    const clientsWithCount = clients.map(client => ({
      ...client,
      _count: {
        appointments: appointments.filter(a => a.clientEmail === client.email || a.email === client.email).length,
      },
    }))

    return NextResponse.json(clientsWithCount)
  } catch (error) {
    console.error('Error fetching clients:', error)
    return NextResponse.json({ error: 'Failed to fetch clients' }, { status: 500 })
  }
}
