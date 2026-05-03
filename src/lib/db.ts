// In-memory database for Vercel serverless compatibility
// Replaces Prisma/SQLite which needs persistent filesystem

interface Appointment {
  id: string; clientEmail: string; clientName: string; clientPhone: string
  contactPref?: string; streetAddress?: string; city?: string; state?: string
  zip?: string; county?: string; service: string; caseDescription: string
  issueDate?: string; prevAttorney?: boolean; courtDeadline?: string
  referralSource?: string; urgency?: number; consentGiven?: boolean
  privacyConsent?: boolean; date: string; time: string; status: string
  notes?: string; confirmedAt?: string; reminder24h?: boolean; reminder1h?: boolean
  createdAt: string; updatedAt: string; name: string; email: string; phone: string
}

interface Review {
  id: string; clientName: string; email: string; rating: number
  service?: string; text?: string; recommend?: boolean; featured: boolean
  visible: boolean; shareLink?: string; response?: string; createdAt: string
}

interface Client {
  id: string; name: string; email: string; phone?: string;
  contactPref?: string; streetAddress?: string; city?: string;
  state?: string; zip?: string; county?: string; referralSource?: string;
  tags?: string; notes?: string; lastActivity: string; createdAt: string
}

interface ClientDocument {
  id: string; clientId: string; fileName: string; fileSize?: string;
  category?: string; fileData?: string; uploadedAt: string
}

interface ClientMessage {
  id: string; clientId: string; sender: string; message: string;
  read: boolean; createdAt: string
}

interface Invoice {
  id: string; clientId: string; amount: number; status: string;
  description?: string; date: string; createdAt: string
}

interface ContactSubmission {
  id: string; name: string; email: string; phone?: string;
  message: string; read: boolean; createdAt: string
}

interface SiteSettings {
  id: string; heroHeadline: string; heroSubtitle: string; aboutBio: string;
  phone: string; email: string; address: string; primaryColor: string;
  secondaryColor: string; bgColor: string; sectionOrder: string; updatedAt: string
}

function cuid() {
  const timestamp = Math.floor(Date.now()).toString(36)
  const random = Math.random().toString(36).substring(2, 10)
  return `${timestamp}${random}`
}

function getStore<T>(key: string, defaults: T[]): T[] {
  if (typeof globalThis === 'undefined') return [...defaults]
  const k = `__mayer_law_${key}` as never
  if (!(globalThis as Record<string | symbol, unknown>)[k]) {
    (globalThis as Record<string | symbol, unknown>)[k] = [...defaults]
  }
  return (globalThis as Record<string | symbol, unknown>)[k] as T[]
}

function setStore<T>(key: string, data: T[]) {
  if (typeof globalThis === 'undefined') return
  const k = `__mayer_law_${key}` as never
  ;(globalThis as Record<string | symbol, unknown>)[k] = data
}

// Seed reviews
const seedReviews: Review[] = [
  {
    id: 'rev1', clientName: 'Maria G.', email: 'maria@example.com', rating: 5,
    service: 'Consumer Finance Law',
    text: 'Nicole fought tirelessly for my case. Her expertise and dedication gave me peace of mind during a very stressful time. I could not have asked for a better attorney.',
    recommend: true, featured: true, visible: true, shareLink: 'rev1',
    createdAt: '2024-09-15T10:00:00.000Z',
  },
  {
    id: 'rev2', clientName: 'James T.', email: 'james@example.com', rating: 5,
    service: 'Personal Injury',
    text: 'After my accident, Mayer Law took complete care of everything. Professional, compassionate, and they delivered real results. I highly recommend them to anyone.',
    recommend: true, featured: true, visible: true, shareLink: 'rev2',
    createdAt: '2024-10-20T14:00:00.000Z',
  },
  {
    id: 'rev3', clientName: 'Patricia R.', email: 'patricia@example.com', rating: 4,
    service: 'Education Law & Civil Rights',
    text: 'Nicole understood exactly what my child needed. She navigated the complex education system with ease and secured the accommodations we were fighting for.',
    recommend: true, featured: false, visible: true, shareLink: 'rev3',
    createdAt: '2024-11-05T09:00:00.000Z',
  },
  {
    id: 'rev4', clientName: 'David L.', email: 'david@example.com', rating: 5,
    service: 'General Litigation & Consulting',
    text: 'Resourcefully relentless is the perfect way to describe Nicole. She found creative solutions no one else considered. Outstanding legal representation.',
    recommend: true, featured: true, visible: true, shareLink: 'rev4',
    createdAt: '2024-12-01T11:00:00.000Z',
  },
]

export const db = {
  appointment: {
    findMany: async (opts?: { where?: Record<string, unknown>; orderBy?: Record<string, string> }) => {
      let results = getStore<Appointment>('appointments', [])
      if (opts?.where) {
        for (const [key, val] of Object.entries(opts.where)) {
          results = results.filter((r) => r[key] === val)
        }
      }
      if (opts?.orderBy) {
        const [field, dir] = Object.entries(opts.orderBy)[0]
        results.sort((a, b) => {
          const av = String(a[field as keyof Appointment] || '')
          const bv = String(b[field as keyof Appointment] || '')
          return dir === 'desc' ? bv.localeCompare(av) : av.localeCompare(bv)
        })
      }
      return results
    },
    findUnique: async (opts: { where: { id: string } }) => {
      const results = getStore<Appointment>('appointments', [])
      return results.find((r) => r.id === opts.where.id) || null
    },
    create: async (data: Record<string, unknown>) => {
      const now = new Date().toISOString()
      const record: Appointment = {
        id: cuid(),
        clientEmail: (data.clientEmail as string) || (data.email as string) || '',
        clientName: (data.clientName as string) || (data.name as string) || '',
        clientPhone: (data.clientPhone as string) || (data.phone as string) || '',
        service: (data.service as string) || '',
        caseDescription: (data.caseDescription as string) || (data.notes as string) || '',
        date: (data.date as string) || '',
        time: (data.time as string) || '',
        status: (data.status as string) || 'pending',
        name: (data.name as string) || (data.clientName as string) || '',
        email: (data.email as string) || (data.clientEmail as string) || '',
        phone: (data.phone as string) || (data.clientPhone as string) || '',
        contactPref: (data.contactPref as string) || 'email',
        streetAddress: data.streetAddress as string | undefined,
        city: data.city as string | undefined,
        state: (data.state as string) || 'FL',
        zip: data.zip as string | undefined,
        county: data.county as string | undefined,
        issueDate: data.issueDate as string | undefined,
        prevAttorney: data.prevAttorney as boolean | undefined,
        courtDeadline: data.courtDeadline as string | undefined,
        referralSource: data.referralSource as string | undefined,
        urgency: (data.urgency as number) || 3,
        consentGiven: data.consentGiven as boolean | undefined,
        privacyConsent: data.privacyConsent as boolean | undefined,
        notes: data.notes as string | undefined,
        confirmedAt: data.confirmedAt as string | undefined,
        reminder24h: data.reminder24h as boolean | undefined,
        reminder1h: data.reminder1h as boolean | undefined,
        createdAt: now,
        updatedAt: now,
      }
      const results = getStore<Appointment>('appointments', [])
      results.push(record)
      setStore('appointments', results)
      return record
    },
    update: async (opts: { where: { id: string }; data: Record<string, unknown> }) => {
      const results = getStore<Appointment>('appointments', [])
      const idx = results.findIndex((r) => r.id === opts.where.id)
      if (idx === -1) throw new Error('Not found')
      results[idx] = { ...results[idx], ...opts.data, updatedAt: new Date().toISOString() }
      setStore('appointments', results)
      return results[idx]
    },
  },

  review: {
    findMany: async (opts?: { where?: Record<string, unknown>; orderBy?: Record<string, string>; take?: number; skip?: number }) => {
      let results = getStore<Review>('reviews', seedReviews)
      if (opts?.where) {
        for (const [key, val] of Object.entries(opts.where)) {
          results = results.filter((r) => r[key] === val)
        }
      }
      if (opts?.orderBy) {
        const [field, dir] = Object.entries(opts.orderBy)[0]
        results.sort((a, b) => {
          const av = String(a[field as keyof Review] || '')
          const bv = String(b[field as keyof Review] || '')
          return dir === 'desc' ? bv.localeCompare(av) : av.localeCompare(bv)
        })
      }
      if (opts?.skip) results = results.slice(opts.skip)
      if (opts?.take) results = results.slice(0, opts.take)
      return results
    },
    create: async (data: Record<string, unknown>) => {
      const record: Review = {
        id: cuid(),
        clientName: (data.clientName as string) || '',
        email: (data.email as string) || '',
        rating: (data.rating as number) || 5,
        service: data.service as string | undefined,
        text: data.text as string | undefined,
        recommend: data.recommend as boolean | undefined,
        featured: (data.featured as boolean) || false,
        visible: (data.visible as boolean) ?? true,
        shareLink: cuid(),
        response: data.response as string | undefined,
        createdAt: new Date().toISOString(),
      }
      const results = getStore<Review>('reviews', seedReviews)
      results.unshift(record)
      setStore('reviews', results)
      return record
    },
    update: async (opts: { where: { id: string }; data: Record<string, unknown> }) => {
      const results = getStore<Review>('reviews', seedReviews)
      const idx = results.findIndex((r) => r.id === opts.where.id)
      if (idx === -1) throw new Error('Not found')
      results[idx] = { ...results[idx], ...opts.data }
      setStore('reviews', results)
      return results[idx]
    },
  },

  client: {
    findUnique: async (opts: { where: { email: string } }) => {
      const results = getStore<Client>('clients', [])
      return results.find((r) => r.email === opts.where.email) || null
    },
    findMany: async () => {
      return getStore<Client>('clients', [])
    },
    create: async (data: Record<string, unknown>) => {
      const now = new Date().toISOString()
      const record: Client = {
        id: cuid(),
        name: (data.name as string) || '',
        email: (data.email as string) || '',
        phone: data.phone as string | undefined,
        contactPref: (data.contactPref as string) || 'email',
        streetAddress: data.streetAddress as string | undefined,
        city: data.city as string | undefined,
        state: (data.state as string) || 'FL',
        zip: data.zip as string | undefined,
        county: data.county as string | undefined,
        referralSource: data.referralSource as string | undefined,
        tags: (data.tags as string) || '',
        notes: data.notes as string | undefined,
        lastActivity: now,
        createdAt: now,
      }
      const results = getStore<Client>('clients', [])
      results.push(record)
      setStore('clients', results)
      return record
    },
    update: async (opts: { where: { email: string }; data: Record<string, unknown> }) => {
      const results = getStore<Client>('clients', [])
      const idx = results.findIndex((r) => r.email === opts.where.email)
      if (idx === -1) throw new Error('Not found')
      results[idx] = { ...results[idx], ...opts.data, lastActivity: new Date().toISOString() }
      setStore('clients', results)
      return results[idx]
    },
  },

  clientDocument: {
    findMany: async (opts?: { where?: Record<string, unknown>; orderBy?: Record<string, string> }) => {
      let results = getStore<ClientDocument>('documents', [])
      if (opts?.where) {
        for (const [key, val] of Object.entries(opts.where)) {
          results = results.filter((r) => r[key] === val)
        }
      }
      return results
    },
    create: async (data: Record<string, unknown>) => {
      const record: ClientDocument = {
        id: cuid(),
        clientId: (data.clientId as string) || '',
        fileName: (data.fileName as string) || '',
        fileSize: data.fileSize as string | undefined,
        category: data.category as string | undefined,
        fileData: data.fileData as string | undefined,
        uploadedAt: new Date().toISOString(),
      }
      const results = getStore<ClientDocument>('documents', [])
      results.push(record)
      setStore('documents', results)
      return record
    },
  },

  clientMessage: {
    findMany: async (opts?: { where?: Record<string, unknown>; orderBy?: Record<string, string> }) => {
      let results = getStore<ClientMessage>('messages', [])
      if (opts?.where) {
        for (const [key, val] of Object.entries(opts.where)) {
          results = results.filter((r) => r[key] === val)
        }
      }
      return results
    },
    create: async (data: Record<string, unknown>) => {
      const record: ClientMessage = {
        id: cuid(),
        clientId: (data.clientId as string) || '',
        sender: (data.sender as string) || 'client',
        message: (data.message as string) || '',
        read: (data.read as boolean) || false,
        createdAt: new Date().toISOString(),
      }
      const results = getStore<ClientMessage>('messages', [])
      results.push(record)
      setStore('messages', results)
      return record
    },
  },

  invoice: {
    findMany: async (opts?: { where?: Record<string, unknown>; orderBy?: Record<string, string> }) => {
      let results = getStore<Invoice>('invoices', [])
      if (opts?.where) {
        for (const [key, val] of Object.entries(opts.where)) {
          results = results.filter((r) => r[key] === val)
        }
      }
      return results
    },
    create: async (data: Record<string, unknown>) => {
      const record: Invoice = {
        id: cuid(),
        clientId: (data.clientId as string) || '',
        amount: (data.amount as number) || 0,
        status: (data.status as string) || 'pending',
        description: data.description as string | undefined,
        date: (data.date as string) || new Date().toISOString().split('T')[0],
        createdAt: new Date().toISOString(),
      }
      const results = getStore<Invoice>('invoices', [])
      results.push(record)
      setStore('invoices', results)
      return record
    },
  },

  contactSubmission: {
    findMany: async (opts?: { orderBy?: Record<string, string> }) => {
      const results = getStore<ContactSubmission>('contacts', [])
      return results
    },
    create: async (data: Record<string, unknown>) => {
      const record: ContactSubmission = {
        id: cuid(),
        name: (data.name as string) || '',
        email: (data.email as string) || '',
        phone: data.phone as string | undefined,
        message: (data.message as string) || '',
        read: false,
        createdAt: new Date().toISOString(),
      }
      const results = getStore<ContactSubmission>('contacts', [])
      results.push(record)
      setStore('contacts', results)
      return record
    },
  },

  siteSettings: {
    findUnique: async () => {
      const results = getStore<SiteSettings>('settings', [])
      if (results.length === 0) {
        const defaults: SiteSettings = {
          id: 'main', heroHeadline: 'Resourcefully Relentless.',
          heroSubtitle: 'Protecting your rights. Empowering your future.',
          aboutBio: '', phone: '(352) 494-3657',
          email: 'Nicole@MayerLawFlorida.com', address: 'Maitland, Florida',
          primaryColor: '#C17B6E', secondaryColor: '#F0E6E0',
          bgColor: '#FBF7F4', sectionOrder: 'hero,practice,about,stats,testimonials,cta,contact',
          updatedAt: new Date().toISOString(),
        }
        setStore('settings', [defaults])
        return defaults
      }
      return results[0]
    },
    update: async (opts: { where: { id: string }; data: Record<string, unknown> }) => {
      const results = getStore<SiteSettings>('settings', [])
      if (results.length === 0) {
        const created: SiteSettings = {
          id: 'main', ...opts.data as Partial<SiteSettings>,
          updatedAt: new Date().toISOString(),
        } as SiteSettings
        setStore('settings', [created])
        return created
      }
      results[0] = { ...results[0], ...opts.data, updatedAt: new Date().toISOString() }
      setStore('settings', results)
      return results[0]
    },
  },
}
