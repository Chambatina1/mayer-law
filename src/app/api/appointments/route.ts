import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, practiceArea, date, time, notes } = body

    if (!name || !email || !phone || !practiceArea || !date || !time) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const appointment = await db.appointment.create({
      data: {
        name,
        email,
        phone,
        practiceArea,
        date,
        time,
        status: 'pending',
        notes: notes || null,
      },
    })

    return NextResponse.json(appointment, { status: 201 })
  } catch (error) {
    console.error('Error creating appointment:', error)
    return NextResponse.json(
      { error: 'Failed to create appointment' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const appointments = await db.appointment.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(appointments)
  } catch (error) {
    console.error('Error fetching appointments:', error)
    return NextResponse.json(
      { error: 'Failed to fetch appointments' },
      { status: 500 }
    )
  }
}
