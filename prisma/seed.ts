import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seed() {
  // Create default site settings
  await prisma.siteSettings.upsert({
    where: { id: 'main' },
    update: {},
    create: {
      id: 'main',
      heroHeadline: 'Resourcefully Relentless.',
      heroSubtitle: 'Protecting your rights with determination and care.',
      aboutBio: 'Founded by Nicole Mayer in 2020, Mayer Law brings over 20 years of legal experience to every case. Specializing in Consumer Finance, Education Law & Civil Rights, Personal Injury, and General Litigation, we are committed to providing resourceful and relentless representation for individuals across Florida.',
      phone: '(352) 494-3657',
      email: 'Nicole@MayerLawFlorida.com',
      address: 'Maitland, Florida',
      primaryColor: '#C9A96E',
      secondaryColor: '#8B7355',
      bgColor: '#FDF8F0',
      sectionOrder: 'hero,practice,about,stats,testimonials,cta,contact',
    },
  })

  // Create demo client
  await prisma.client.upsert({
    where: { email: 'demo@mayerlawflorida.com' },
    update: {},
    create: {
      name: 'John Doe',
      email: 'demo@mayerlawflorida.com',
      phone: '(352) 555-0100',
    },
  })

  const demoClient = await prisma.client.findUnique({
    where: { email: 'demo@mayerlawflorida.com' },
  })

  // Create demo appointments
  if (demoClient) {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 3)
    const nextWeek = new Date()
    nextWeek.setDate(nextWeek.getDate() + 7)

    await prisma.appointment.createMany({
      data: [
        {
          name: 'John Doe',
          email: 'demo@mayerlawflorida.com',
          phone: '(352) 555-0100',
          service: 'Consumer Finance Law',
          date: tomorrow.toISOString().split('T')[0],
          time: '10:00 AM',
          status: 'confirmed',
          notes: 'Initial consultation regarding debt collection practices.',
        },
        {
          name: 'John Doe',
          email: 'demo@mayerlawflorida.com',
          phone: '(352) 555-0100',
          service: 'Personal Injury',
          date: '2024-12-15',
          time: '2:00 PM',
          status: 'completed',
          notes: null,
        },
      ],
    })

    // Create demo documents
    await prisma.clientDocument.createMany({
      data: [
        {
          clientId: demoClient.id,
          fileName: 'contract_agreement.pdf',
          fileSize: '2.4 MB',
          category: 'Case Documents',
        },
        {
          clientId: demoClient.id,
          fileName: 'medical_records.pdf',
          fileSize: '1.8 MB',
          category: 'Evidence',
        },
        {
          clientId: demoClient.id,
          fileName: 'client_intake_form.pdf',
          fileSize: '350 KB',
          category: 'Forms',
        },
      ],
    })

    // Create demo messages
    await prisma.clientMessage.createMany({
      data: [
        {
          clientId: demoClient.id,
          sender: 'attorney',
          message: 'Hello John, thank you for choosing Mayer Law. I have reviewed your case documents and would like to schedule a call to discuss next steps.',
        },
        {
          clientId: demoClient.id,
          sender: 'client',
          message: 'Thank you, Nicole. I appreciate your prompt response. I am available anytime this week.',
        },
        {
          clientId: demoClient.id,
          sender: 'attorney',
          message: 'Great! I have scheduled our consultation for this Thursday at 10:00 AM. Please bring any additional documentation you may have.',
        },
      ],
    })

    // Create demo invoices
    await prisma.invoice.createMany({
      data: [
        {
          clientId: demoClient.id,
          amount: 250.0,
          status: 'paid',
          description: 'Initial consultation fee',
          date: '2025-01-15',
        },
        {
          clientId: demoClient.id,
          amount: 1500.0,
          status: 'pending',
          description: 'Case review and document preparation',
          date: '2025-02-01',
        },
      ],
    })
  }

  // Seed the 6 testimonials
  const testimonials = [
    {
      clientName: 'Brittany Roberson',
      email: 'brittany@example.com',
      rating: 5,
      service: 'Consumer Finance Law',
      text: 'Nicole demonstrated incredible expertise and professionalism throughout my case. Her attention to detail and outstanding legal knowledge led to a fantastic result. I could not have asked for a better attorney.',
      recommend: true,
      featured: true,
    },
    {
      clientName: 'Heather McKenzie',
      email: 'heather@example.com',
      rating: 5,
      service: 'Education Law & Civil Rights',
      text: 'I am so grateful for the opportunity to continue my nursing career. Nicole fought for me when it felt like no one else would. Her glowing representation changed the trajectory of my professional life.',
      recommend: true,
      featured: true,
    },
    {
      clientName: 'Ray Lau',
      email: 'ray@example.com',
      rating: 5,
      service: 'Education Law & Civil Rights',
      text: 'Nicole provided exceptional guidance through the IEP process for my child. She was empathetic, thorough, and truly understood our family\'s needs. Her advocacy made all the difference.',
      recommend: true,
      featured: true,
    },
    {
      clientName: 'Tresha Thompson',
      email: 'tresha@example.com',
      rating: 5,
      service: 'General Litigation & Consulting',
      text: 'Nicole\'s knowledge and detailed research were instrumental in achieving a successful settlement for my case. She kept me informed every step of the way and delivered results beyond my expectations.',
      recommend: true,
      featured: false,
    },
    {
      clientName: 'Karina Calderon',
      email: 'karina@example.com',
      rating: 5,
      service: 'Education Law & Civil Rights',
      text: 'Nicole saved my career. Her representation in my NCLEX case was nothing short of remarkable. She is a fierce advocate who truly cares about her clients and their futures.',
      recommend: true,
      featured: false,
    },
    {
      clientName: 'Bianca Vinas',
      email: 'bianca@example.com',
      rating: 5,
      service: 'Personal Injury',
      text: 'Working with Nicole was a transformative experience. She is a strong-willed advocate who remains calm under pressure. Her strategic approach to my personal injury case resulted in a fair and just outcome.',
      recommend: true,
      featured: false,
    },
  ]

  for (const t of testimonials) {
    const shareLink = `review-${t.email.replace(/[@.]/g, '-')}`
    const existing = await prisma.review.findUnique({ where: { shareLink } })
    if (!existing) {
      await prisma.review.create({
        data: { ...t, shareLink },
      })
    }
  }

  console.log('✅ Seed data created successfully!')
}

seed()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
