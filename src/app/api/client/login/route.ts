import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email } = body

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Simple email-based login - check if client has any records
    const appointments = await db.appointment.findMany({
      where: { email },
      orderBy: { createdAt: 'desc' },
    })

    const documents = await db.clientDocument.findMany({
      where: { clientEmail: email },
      orderBy: { uploadedAt: 'desc' },
    })

    const messages = await db.clientMessage.findMany({
      where: { clientEmail: email },
      orderBy: { createdAt: 'desc' },
      take: 10,
    })

    // Return client data if any records exist
    const hasRecords = appointments.length > 0 || documents.length > 0 || messages.length > 0

    return NextResponse.json({
      success: true,
      email,
      exists: hasRecords,
      appointmentCount: appointments.length,
      documentCount: documents.length,
      messageCount: messages.length,
    })
  } catch (error) {
    console.error('Error during client login:', error)
    return NextResponse.json(
      { error: 'Login failed' },
      { status: 500 }
    )
  }
}
