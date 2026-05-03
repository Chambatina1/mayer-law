import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const clients = await db.client.findMany({
      orderBy: { lastActivity: 'desc' },
      include: {
        documents: true,
        messages: true,
        invoices: true,
      },
    })
    return NextResponse.json(clients)
  } catch (error) {
    console.error('Error fetching clients:', error)
    return NextResponse.json({ error: 'Failed to fetch clients' }, { status: 500 })
  }
}
