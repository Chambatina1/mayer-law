import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone } = body

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 })
    }

    const existing = await db.client.findUnique({ where: { email } })
    if (existing) {
      return NextResponse.json({ error: 'An account with this email already exists' }, { status: 409 })
    }

    const client = await db.client.create({
      data: {
        name,
        email,
        phone: phone || null,
      },
    })

    return NextResponse.json(client, { status: 201 })
  } catch (error) {
    console.error('Error registering client:', error)
    return NextResponse.json({ error: 'Failed to register' }, { status: 500 })
  }
}
