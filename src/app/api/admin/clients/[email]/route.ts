import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ email: string }> }
) {
  try {
    const { email } = await params

    const client = await db.client.findUnique({ where: { email } })

    if (!client) {
      return NextResponse.json({ error: 'Client not found' }, { status: 404 })
    }

    const [appointments, documents, messages, invoices] = await Promise.all([
      db.appointment.findMany({
        where: { clientEmail: email },
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

    return NextResponse.json({ ...client, appointments, documents, messages, invoices })
  } catch (error) {
    console.error('Error fetching client:', error)
    return NextResponse.json({ error: 'Failed to fetch client' }, { status: 500 })
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ email: string }> }
) {
  try {
    const { email } = await params
    const body = await request.json()
    const { notes, tags } = body

    const client = await db.client.update({
      where: { email },
      data: {
        ...(notes !== undefined && { notes }),
        ...(tags !== undefined && { tags }),
      },
    })

    return NextResponse.json(client)
  } catch (error) {
    console.error('Error updating client:', error)
    return NextResponse.json({ error: 'Failed to update client' }, { status: 500 })
  }
}
