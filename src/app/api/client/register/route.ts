import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, contactPref, streetAddress, city, state, zip, county } = body

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 })
    }

    const existing = await db.client.findUnique({ where: { email } })
    if (existing) {
      // Update existing client
      const updated = await db.client.update({
        where: { email },
        data: {
          name: name || existing.name,
          phone: phone || existing.phone,
          contactPref: contactPref || existing.contactPref,
          streetAddress: streetAddress || existing.streetAddress,
          city: city || existing.city,
          state: state || existing.state,
          zip: zip || existing.zip,
          county: county || existing.county,
        },
      })
      return NextResponse.json(updated, { status: 200 })
    }

    const client = await db.client.create({
      data: {
        name,
        email,
        phone: phone || null,
        contactPref: contactPref || 'email',
        streetAddress: streetAddress || undefined,
        city: city || undefined,
        state: state || 'FL',
        zip: zip || undefined,
        county: county || undefined,
      },
    })

    return NextResponse.json(client, { status: 201 })
  } catch (error) {
    console.error('Error registering client:', error)
    return NextResponse.json({ error: 'Failed to register' }, { status: 500 })
  }
}
