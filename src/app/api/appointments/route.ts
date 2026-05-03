import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      clientName, clientEmail, clientPhone, contactPref,
      streetAddress, city, state, zip, county,
      service, caseDescription, issueDate, prevAttorney,
      hasCourtDeadline, courtDeadline, referralSource, urgency,
      consentGiven, privacyConsent, date, time, documents,
    } = body

    if (!clientName || !clientEmail || !clientPhone || !service || !caseDescription || !date || !time) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (!consentGiven || !privacyConsent) {
      return NextResponse.json({ error: 'Consent is required' }, { status: 400 })
    }

    // Create or update client
    await db.client.upsert({
      where: { email: clientEmail },
      update: {
        name: clientName,
        phone: clientPhone,
        contactPref: contactPref || 'email',
        streetAddress: streetAddress || undefined,
        city: city || undefined,
        state: state || 'FL',
        zip: zip || undefined,
        county: county || undefined,
        referralSource: referralSource || undefined,
        tags: service,
      },
      create: {
        name: clientName,
        email: clientEmail,
        phone: clientPhone,
        contactPref: contactPref || 'email',
        streetAddress: streetAddress || undefined,
        city: city || undefined,
        state: state || 'FL',
        zip: zip || undefined,
        county: county || undefined,
        referralSource: referralSource || undefined,
        tags: service,
      },
    })

    const appointment = await db.appointment.create({
      data: {
        clientEmail,
        clientName,
        clientPhone,
        contactPref: contactPref || 'email',
        streetAddress: streetAddress || undefined,
        city: city || undefined,
        state: state || 'FL',
        zip: zip || undefined,
        county: county || undefined,
        service,
        caseDescription,
        issueDate: issueDate || undefined,
        prevAttorney: prevAttorney || false,
        courtDeadline: hasCourtDeadline ? courtDeadline : null,
        referralSource: referralSource || undefined,
        urgency: urgency || 3,
        consentGiven: true,
        privacyConsent: true,
        date,
        time,
        status: 'confirmed',
        confirmedAt: new Date(),
      },
    })

    // Create documents if provided
    if (documents && Array.isArray(documents) && documents.length > 0) {
      await db.appointmentDocument.createMany({
        data: documents.map((doc: { fileName: string; fileSize?: string; fileType?: string; fileData?: string }) => ({
          appointmentId: appointment.id,
          fileName: doc.fileName,
          fileSize: doc.fileSize,
          fileType: doc.fileType,
          fileData: doc.fileData,
        })),
      })
    }

    return NextResponse.json(appointment, { status: 201 })
  } catch (error) {
    console.error('Error creating appointment:', error)
    return NextResponse.json({ error: 'Failed to create appointment' }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const email = searchParams.get('email')

    const where: Record<string, unknown> = {}
    if (status) where.status = status
    if (email) where.clientEmail = email

    const appointments = await db.appointment.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: { documents: true },
    })
    return NextResponse.json(appointments)
  } catch (error) {
    console.error('Error fetching appointments:', error)
    return NextResponse.json({ error: 'Failed to fetch appointments' }, { status: 500 })
  }
}
