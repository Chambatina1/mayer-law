import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()

async function main() {
  // Seed testimonials
  const testimonials = [
    {
      clientName: 'Sarah M.',
      email: 'sarah.m@example.com',
      rating: 5,
      service: 'Personal Injury',
      text: 'Nicole Mayer is absolutely incredible. After my car accident, she fought tirelessly to get me the compensation I deserved. She was always available to answer my questions and made me feel like my case was her top priority. I could not have asked for a better attorney.',
      recommend: true,
      featured: true,
      visible: true,
    },
    {
      clientName: 'James T.',
      email: 'james.t@example.com',
      rating: 5,
      service: 'Consumer Finance Law',
      text: 'I was being harassed by debt collectors and felt completely helpless. Nicole stepped in and immediately stopped the calls. She settled my case and saved me thousands. Her knowledge of consumer protection laws is unmatched.',
      recommend: true,
      featured: true,
      visible: true,
    },
    {
      clientName: 'Maria L.',
      email: 'maria.l@example.com',
      rating: 5,
      service: 'Education Law & Civil Rights',
      text: 'When my son was denied appropriate accommodations at school, Nicole took on the school district and won. She is passionate about civil rights and it shows in everything she does. We are forever grateful.',
      recommend: true,
      featured: true,
      visible: true,
    },
    {
      clientName: 'David R.',
      email: 'david.r@example.com',
      rating: 4,
      service: 'General Litigation & Consulting',
      text: 'Professional, knowledgeable, and truly dedicated to her clients. Nicole helped me navigate a complex contract dispute and achieved a favorable outcome. I highly recommend Mayer Law for any legal needs.',
      recommend: true,
      featured: false,
      visible: true,
    },
    {
      clientName: 'Patricia W.',
      email: 'patricia.w@example.com',
      rating: 5,
      service: 'Personal Injury',
      text: 'From the very first consultation, Nicole made me feel heard and supported. Her attention to detail and relentless pursuit of justice resulted in a settlement that exceeded my expectations. She is the best attorney I have ever worked with.',
      recommend: true,
      featured: true,
      visible: true,
    },
    {
      clientName: 'Robert K.',
      email: 'robert.k@example.com',
      rating: 5,
      service: 'Consumer Finance Law',
      text: 'Nicole helped me resolve a credit reporting error that had been affecting me for years. She was thorough, efficient, and kept me informed every step of the way. Her expertise in consumer finance is remarkable.',
      recommend: true,
      featured: false,
      visible: true,
    },
  ]

  for (const t of testimonials) {
    await db.review.create({ data: t })
  }

  // Seed demo client
  await db.client.create({
    data: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '(352) 555-0101',
      contactPref: 'email',
      streetAddress: '123 Oak Street',
      city: 'Maitland',
      state: 'FL',
      zip: '32751',
      county: 'Orange County',
      referralSource: 'Google',
      tags: 'Consumer Finance',
      notes: 'Demo client for testing purposes.',
    },
  })

  // Seed settings
  await db.siteSettings.create({
    data: {
      id: 'main',
      heroHeadline: 'Resourcefully Relentless.',
      heroSubtitle: 'Protecting your rights. Empowering your future.',
      aboutBio:
        'Founded by Nicole Mayer, Mayer Law brings over 20 years of legal experience to every case. Specializing in Consumer Finance, Education & Civil Rights, Personal Injury, and General Litigation, we are committed to providing resourceful and relentless representation for individuals across Florida. Our approach is personal — we treat every client like family and every case with the urgency it deserves.',
      phone: '(352) 494-3657',
      email: 'Nicole@MayerLawFlorida.com',
      address: 'Maitland, Florida',
      primaryColor: '#C17B6E',
      secondaryColor: '#F0E6E0',
      bgColor: '#FBF7F4',
    },
  })

  // Seed a demo appointment
  await db.appointment.create({
    data: {
      clientEmail: 'john.doe@example.com',
      clientName: 'John Doe',
      clientPhone: '(352) 555-0101',
      contactPref: 'email',
      streetAddress: '123 Oak Street',
      city: 'Maitland',
      state: 'FL',
      zip: '32751',
      county: 'Orange County',
      service: 'Consumer Finance Law',
      caseDescription: 'I am being contacted by a debt collector about a debt that I do not believe I owe. They have been calling multiple times a day.',
      issueDate: '2025-03-15',
      prevAttorney: false,
      courtDeadline: null,
      referralSource: 'Google',
      urgency: 4,
      consentGiven: true,
      privacyConsent: true,
      date: '2025-06-15',
      time: '10:00 AM',
      status: 'confirmed',
      notes: 'First consultation scheduled.',
      confirmedAt: new Date(),
    },
  })

  console.log('Seed data created successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })
