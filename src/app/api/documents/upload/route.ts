import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { clientEmail, fileName, fileSize, category, fileData } = body

    if (!clientEmail || !fileName) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const client = await db.client.findUnique({ where: { email: clientEmail } })
    if (!client) {
      return NextResponse.json({ error: 'Client not found' }, { status: 404 })
    }

    const document = await db.clientDocument.create({
      data: {
        clientId: client.id,
        fileName,
        fileSize: fileSize || null,
        category: category || null,
        fileData: fileData || null,
      },
    })

    return NextResponse.json(document, { status: 201 })
  } catch (error) {
    console.error('Error uploading document:', error)
    return NextResponse.json({ error: 'Failed to upload document' }, { status: 500 })
  }
}
