import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

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

    return NextResponse.json(client)
  } catch (error) {
    console.error('Error fetching client profile:', error)
    return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { email, name, phone, contactPref, streetAddress, city, state, zip, county, referralSource, tags, notes } = body

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    const client = await db.client.update({
      where: { email },
      data: {
        ...(name && { name }),
        ...(phone !== undefined && { phone }),
        ...(contactPref && { contactPref }),
        ...(streetAddress !== undefined && { streetAddress }),
        ...(city !== undefined && { city }),
        ...(state && { state }),
        ...(zip !== undefined && { zip }),
        ...(county !== undefined && { county }),
        ...(referralSource !== undefined && { referralSource }),
        ...(tags !== undefined && { tags }),
        ...(notes !== undefined && { notes }),
      },
    })

    return NextResponse.json(client)
  } catch (error) {
    console.error('Error updating client profile:', error)
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 })
  }
}
