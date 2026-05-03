import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email } = body

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    let client = await db.client.findUnique({
      where: { email },
    })

    if (!client) {
      client = await db.client.create({
        data: {
          name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
          email,
        },
      })
    }

    const appointments = await db.appointment.findMany({
      where: { clientEmail: email },
      orderBy: { createdAt: 'desc' },
    })

    const documents = await db.clientDocument.findMany({
      where: { clientId: client.id },
      orderBy: { uploadedAt: 'desc' },
    })

    const messages = await db.clientMessage.findMany({
      where: { clientId: client.id },
      orderBy: { createdAt: 'asc' },
    })

    const invoices = await db.invoice.findMany({
      where: { clientId: client.id },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({
      success: true,
      client: {
        id: client.id,
        name: client.name,
        email: client.email,
        phone: client.phone,
      },
      appointments,
      documents,
      messages,
      invoices,
    })
  } catch (error) {
    console.error('Error during client login:', error)
    return NextResponse.json({ error: 'Login failed' }, { status: 500 })
  }
}
