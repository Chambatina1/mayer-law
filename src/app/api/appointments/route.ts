import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      name, email, phone, service, notes, date, time,
      clientName, clientEmail, clientPhone,
    } = body

    const finalName = name || clientName || ''
    const finalEmail = email || clientEmail || ''
    const finalPhone = phone || clientPhone || ''
    const finalService = service || ''
    const finalNotes = notes || ''
    const finalDate = date || ''
    const finalTime = time || ''

    if (!finalName || !finalEmail || !finalPhone || !finalService || !finalDate || !finalTime) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Create or update client
    const existingClient = await db.client.findUnique({ where: { email: finalEmail } })
    if (existingClient) {
      await db.client.update({
        where: { email: finalEmail },
        data: { name: finalName, phone: finalPhone },
      })
    } else {
      await db.client.create({
        data: { name: finalName, email: finalEmail, phone: finalPhone },
      })
    }

    const appointment = await db.appointment.create({
      data: {
        name: finalName,
        email: finalEmail,
        phone: finalPhone,
        clientName: finalName,
        clientEmail: finalEmail,
        clientPhone: finalPhone,
        service: finalService,
        caseDescription: finalNotes,
        notes: finalNotes,
        date: finalDate,
        time: finalTime,
        status: 'confirmed',
      },
    })

    return NextResponse.json(appointment, { status: 201 })
  } catch (error) {
    console.error('Error creating appointment:', error)
    return NextResponse.json({ error: 'Failed to create appointment' }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const email = searchParams.get('email')

    const where: Record<string, unknown> = {}
    if (status) where.status = status
    if (email) where.clientEmail = email

    const appointments = await db.appointment.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(appointments)
  } catch (error) {
    console.error('Error fetching appointments:', error)
    return NextResponse.json({ error: 'Failed to fetch appointments' }, { status: 500 })
  }
}
