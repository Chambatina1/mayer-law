import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ email: string }> }
) {
  try {
    const { email } = await params

    const client = await db.client.findUnique({
      where: { email },
      include: {
        documents: { orderBy: { uploadedAt: 'desc' } },
        messages: { orderBy: { createdAt: 'asc' } },
        invoices: { orderBy: { createdAt: 'desc' } },
      },
    })

    if (!client) {
      return NextResponse.json({ error: 'Client not found' }, { status: 404 })
    }

    const appointments = await db.appointment.findMany({
      where: { clientEmail: email },
      orderBy: { createdAt: 'desc' },
      include: { documents: true },
    })

    return NextResponse.json({ ...client, appointments })
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
