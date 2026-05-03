import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { clientEmail, sender, message } = body

    if (!clientEmail || !sender || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const client = await db.client.findUnique({ where: { email: clientEmail } })
    if (!client) {
      return NextResponse.json({ error: 'Client not found' }, { status: 404 })
    }

    const clientMessage = await db.clientMessage.create({
      data: {
        clientId: client.id,
        sender,
        message,
      },
    })

    return NextResponse.json(clientMessage, { status: 201 })
  } catch (error) {
    console.error('Error sending message:', error)
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
}

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

    const messages = await db.clientMessage.findMany({
      where: { clientId: client.id },
      orderBy: { createdAt: 'asc' },
    })

    return NextResponse.json(messages)
  } catch (error) {
    console.error('Error fetching messages:', error)
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 })
  }
}
