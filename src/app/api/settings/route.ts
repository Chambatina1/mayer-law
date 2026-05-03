import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    let settings = await db.siteSettings.findUnique({ where: { id: 'main' } })
    if (!settings) {
      settings = await db.siteSettings.create({ data: { id: 'main' } })
    }
    return NextResponse.json(settings)
  } catch (error) {
    console.error('Error fetching settings:', error)
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const settings = await db.siteSettings.update({
      where: { id: 'main' },
      data: body,
    })
    return NextResponse.json(settings)
  } catch (error) {
    console.error('Error updating settings:', error)
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 })
  }
}
