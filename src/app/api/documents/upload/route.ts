import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { clientEmail, fileName, fileSize, category } = body

    if (!clientEmail || !fileName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const document = await db.clientDocument.create({
      data: {
        clientEmail,
        fileName,
        fileSize: fileSize || null,
        category: category || null,
      },
    })

    return NextResponse.json(document, { status: 201 })
  } catch (error) {
    console.error('Error uploading document:', error)
    return NextResponse.json(
      { error: 'Failed to upload document' },
      { status: 500 }
    )
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const clientEmail = searchParams.get('email')

    if (!clientEmail) {
      return NextResponse.json(
        { error: 'Missing client email' },
        { status: 400 }
      )
    }

    const documents = await db.clientDocument.findMany({
      where: { clientEmail },
      orderBy: { uploadedAt: 'desc' },
    })

    return NextResponse.json(documents)
  } catch (error) {
    console.error('Error fetching documents:', error)
    return NextResponse.json(
      { error: 'Failed to fetch documents' },
      { status: 500 }
    )
  }
}
