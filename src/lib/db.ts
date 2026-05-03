// Dual-mode database for Mayer Law
// ────────────────────────────────────────────────────────────────────
// - Vercel (Node.js serverless): In-memory storage
//   → Public site works without any filesystem dependency
//   → Data is ephemeral (reviews seed data included)
//
// - Local (Bun on lawyer's computer): SQLite via bun:sqlite
//   → Persistent storage in data/mayer_law.db
//   → All client data stays on the lawyer's computer
//   → Set DATABASE_TYPE=sqlite in .env.local (default for local)
//
// The API is identical regardless of backend: db.appointment.findMany(), etc.

// ─── Types ──────────────────────────────────────────────────────────

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

// ─── Utilities ──────────────────────────────────────────────────────

function cuid(): string {
  const timestamp = Math.floor(Date.now()).toString(36)
  const random = Math.random().toString(36).substring(2, 10)
  return `${timestamp}${random}`
}

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

// ─── Detect mode ────────────────────────────────────────────────────

const IS_SQLITE = process.env.DATABASE_TYPE === 'sqlite' && typeof Bun !== 'undefined'

// ─── SQLite Backend (Bun only — lawyer's local computer) ───────────

let sqliteDb: import('bun:sqlite').Database | null = null
let sqliteReady = false

function getSqlite(): import('bun:sqlite').Database | null {
  if (sqliteReady) return sqliteDb
  sqliteReady = true

  if (!IS_SQLITE) return null

  try {
    const { Database } = require('bun:sqlite') as { Database: new (path: string) => import('bun:sqlite').Database }
    const { mkdirSync, existsSync } = require('fs') as typeof import('fs')
    const { join } = require('path') as typeof import('path')

    const dataDir = join(process.cwd(), 'data')
    if (!existsSync(dataDir)) mkdirSync(dataDir, { recursive: true })

    const dbPath = join(dataDir, 'mayer_law.db')
    sqliteDb = new Database(dbPath, { create: true })

    // Enable WAL for performance
    sqliteDb.exec('PRAGMA journal_mode = WAL')

    // Create tables (each stores records as JSON for schema flexibility)
    sqliteDb.exec(`
      CREATE TABLE IF NOT EXISTS store_appointments (id TEXT PRIMARY KEY, data TEXT NOT NULL);
      CREATE TABLE IF NOT EXISTS store_reviews (id TEXT PRIMARY KEY, data TEXT NOT NULL);
      CREATE TABLE IF NOT EXISTS store_clients (id TEXT PRIMARY KEY, data TEXT NOT NULL);
      CREATE TABLE IF NOT EXISTS store_documents (id TEXT PRIMARY KEY, data TEXT NOT NULL);
      CREATE TABLE IF NOT EXISTS store_messages (id TEXT PRIMARY KEY, data TEXT NOT NULL);
      CREATE TABLE IF NOT EXISTS store_invoices (id TEXT PRIMARY KEY, data TEXT NOT NULL);
      CREATE TABLE IF NOT EXISTS store_contacts (id TEXT PRIMARY KEY, data TEXT NOT NULL);
      CREATE TABLE IF NOT EXISTS store_settings (id TEXT PRIMARY KEY, data TEXT NOT NULL);
    `)

    // Seed reviews if empty
    const count = sqliteDb.query('SELECT COUNT(*) as c FROM store_reviews').get() as { c: number }
    if (count.c === 0) {
      const stmt = sqliteDb.prepare('INSERT INTO store_reviews (id, data) VALUES ($id, $data)')
      for (const r of seedReviews) {
        stmt.run({ $id: r.id, $data: JSON.stringify(r) })
      }
    }

    console.log(`[DB] SQLite mode — data stored in ${dbPath}`)
    return sqliteDb
  } catch (err) {
    console.error('[DB] Failed to init SQLite, falling back to memory:', err)
    return null
  }
}

function sqliteAll<T>(table: string): T[] {
  const db = getSqlite()
  if (!db) return []
  return (db.query(`SELECT data FROM ${table}`).all() as { data: string }[]).map(r => JSON.parse(r.data) as T)
}

function sqliteById<T>(table: string, id: string): T | null {
  const db = getSqlite()
  if (!db) return null
  const row = db.query(`SELECT data FROM ${table} WHERE id = ?`).get(id) as { data: string } | undefined
  return row ? (JSON.parse(row.data) as T) : null
}

function sqlitePut<T extends Record<string, unknown>>(table: string, record: T): T {
  const db = getSqlite()
  if (!db) return record
  db.query(`INSERT OR REPLACE INTO ${table} (id, data) VALUES ($id, $data)`).run({
    $id: record.id, $data: JSON.stringify(record),
  })
  return record
}

function sqlitePatch(table: string, id: string, patch: Record<string, unknown>): Record<string, unknown> | null {
  const db = getSqlite()
  if (!db) return null
  const existing = sqliteById<Record<string, unknown>>(table, id)
  if (!existing) return null
  const updated = { ...existing, ...patch }
  db.query(`UPDATE ${table} SET data = $data WHERE id = $id`).run({ $id: id, $data: JSON.stringify(updated) })
  return updated
}

function sqliteRemove(table: string, id: string): boolean {
  const db = getSqlite()
  if (!db) return false
  const result = db.query(`DELETE FROM ${table} WHERE id = ?`).run(id)
  return result.changes > 0
}

// ─── In-Memory Backend (Vercel / Node.js serverless) ────────────────

function memGet<T>(key: string, defaults: T[]): T[] {
  if (typeof globalThis === 'undefined') return [...defaults]
  const k = `__mayer_law_${key}` as never
  if (!(globalThis as Record<string | symbol, unknown>)[k]) {
    (globalThis as Record<string | symbol, unknown>)[k] = [...defaults]
  }
  return (globalThis as Record<string | symbol, unknown>)[k] as T[]
}

function memSet<T>(key: string, data: T[]): void {
  if (typeof globalThis === 'undefined') return
  const k = `__mayer_law_${key}` as never
  ;(globalThis as Record<string | symbol, unknown>)[k] = data
}

// ─── Unified DB API ─────────────────────────────────────────────────

export const db = {
  appointment: {
    findMany: async (opts?: { where?: Record<string, unknown>; orderBy?: Record<string, string> }) => {
      if (IS_SQLITE) {
        let results = sqliteAll<Appointment>('store_appointments')
        if (opts?.where) {
          for (const [key, val] of Object.entries(opts.where)) {
            results = results.filter((r) => r[key as keyof Appointment] === val)
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
      }
      let results = memGet<Appointment>('appointments', [])
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
      if (IS_SQLITE) return sqliteById<Appointment>('store_appointments', opts.where.id)
      const results = memGet<Appointment>('appointments', [])
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
      if (IS_SQLITE) return sqlitePut('store_appointments', record as unknown as Record<string, unknown>) as unknown as Appointment
      const results = memGet<Appointment>('appointments', [])
      results.push(record)
      memSet('appointments', results)
      return record
    },
    update: async (opts: { where: { id: string }; data: Record<string, unknown> }) => {
      if (IS_SQLITE) {
        const updated = sqlitePatch('store_appointments', opts.where.id, { ...opts.data, updatedAt: new Date().toISOString() })
        if (!updated) throw new Error('Not found')
        return updated as unknown as Appointment
      }
      const results = memGet<Appointment>('appointments', [])
      const idx = results.findIndex((r) => r.id === opts.where.id)
      if (idx === -1) throw new Error('Not found')
      results[idx] = { ...results[idx], ...opts.data, updatedAt: new Date().toISOString() }
      memSet('appointments', results)
      return results[idx]
    },
    delete: async (opts: { where: { id: string } }) => {
      if (IS_SQLITE) {
        const removed = sqliteRemove('store_appointments', opts.where.id)
        if (!removed) throw new Error('Not found')
        return true
      }
      const results = memGet<Appointment>('appointments', [])
      const idx = results.findIndex((r) => r.id === opts.where.id)
      if (idx === -1) throw new Error('Not found')
      results.splice(idx, 1)
      memSet('appointments', results)
      return true
    },
  },

  review: {
    findMany: async (opts?: { where?: Record<string, unknown>; orderBy?: Record<string, string>; take?: number; skip?: number }) => {
      if (IS_SQLITE) {
        let results = sqliteAll<Review>('store_reviews')
        if (opts?.where) {
          for (const [key, val] of Object.entries(opts.where)) {
            results = results.filter((r) => r[key as keyof Review] === val)
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
      }
      let results = memGet<Review>('reviews', seedReviews)
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
      if (IS_SQLITE) return sqlitePut('store_reviews', record as unknown as Record<string, unknown>) as unknown as Review
      const results = memGet<Review>('reviews', seedReviews)
      results.unshift(record)
      memSet('reviews', results)
      return record
    },
    update: async (opts: { where: { id: string }; data: Record<string, unknown> }) => {
      if (IS_SQLITE) {
        const updated = sqlitePatch('store_reviews', opts.where.id, opts.data)
        if (!updated) throw new Error('Not found')
        return updated as unknown as Review
      }
      const results = memGet<Review>('reviews', seedReviews)
      const idx = results.findIndex((r) => r.id === opts.where.id)
      if (idx === -1) throw new Error('Not found')
      results[idx] = { ...results[idx], ...opts.data }
      memSet('reviews', results)
      return results[idx]
    },
  },

  client: {
    findUnique: async (opts: { where: { email: string } }) => {
      if (IS_SQLITE) {
        const all = sqliteAll<Client>('store_clients')
        return all.find(r => r.email === opts.where.email) || null
      }
      const results = memGet<Client>('clients', [])
      return results.find((r) => r.email === opts.where.email) || null
    },
    findMany: async () => {
      if (IS_SQLITE) return sqliteAll<Client>('store_clients')
      return memGet<Client>('clients', [])
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
      if (IS_SQLITE) return sqlitePut('store_clients', record as unknown as Record<string, unknown>) as unknown as Client
      const results = memGet<Client>('clients', [])
      results.push(record)
      memSet('clients', results)
      return record
    },
    update: async (opts: { where: { email: string }; data: Record<string, unknown> }) => {
      if (IS_SQLITE) {
        const all = sqliteAll<Client>('store_clients')
        const idx = all.findIndex(r => r.email === opts.where.email)
        if (idx === -1) throw new Error('Not found')
        const updated = { ...all[idx], ...opts.data, lastActivity: new Date().toISOString() }
        return sqlitePut('store_clients', updated as unknown as Record<string, unknown>) as unknown as Client
      }
      const results = memGet<Client>('clients', [])
      const idx = results.findIndex((r) => r.email === opts.where.email)
      if (idx === -1) throw new Error('Not found')
      results[idx] = { ...results[idx], ...opts.data, lastActivity: new Date().toISOString() }
      memSet('clients', results)
      return results[idx]
    },
  },

  clientDocument: {
    findMany: async (opts?: { where?: Record<string, unknown>; orderBy?: Record<string, string> }) => {
      if (IS_SQLITE) {
        let results = sqliteAll<ClientDocument>('store_documents')
        if (opts?.where) {
          for (const [key, val] of Object.entries(opts.where)) {
            results = results.filter((r) => r[key as keyof ClientDocument] === val)
          }
        }
        return results
      }
      let results = memGet<ClientDocument>('documents', [])
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
      if (IS_SQLITE) return sqlitePut('store_documents', record as unknown as Record<string, unknown>) as unknown as ClientDocument
      const results = memGet<ClientDocument>('documents', [])
      results.push(record)
      memSet('documents', results)
      return record
    },
  },

  clientMessage: {
    findMany: async (opts?: { where?: Record<string, unknown>; orderBy?: Record<string, string> }) => {
      if (IS_SQLITE) {
        let results = sqliteAll<ClientMessage>('store_messages')
        if (opts?.where) {
          for (const [key, val] of Object.entries(opts.where)) {
            results = results.filter((r) => r[key as keyof ClientMessage] === val)
          }
        }
        return results
      }
      let results = memGet<ClientMessage>('messages', [])
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
      if (IS_SQLITE) return sqlitePut('store_messages', record as unknown as Record<string, unknown>) as unknown as ClientMessage
      const results = memGet<ClientMessage>('messages', [])
      results.push(record)
      memSet('messages', results)
      return record
    },
  },

  invoice: {
    findMany: async (opts?: { where?: Record<string, unknown>; orderBy?: Record<string, string> }) => {
      if (IS_SQLITE) {
        let results = sqliteAll<Invoice>('store_invoices')
        if (opts?.where) {
          for (const [key, val] of Object.entries(opts.where)) {
            results = results.filter((r) => r[key as keyof Invoice] === val)
          }
        }
        return results
      }
      let results = memGet<Invoice>('invoices', [])
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
      if (IS_SQLITE) return sqlitePut('store_invoices', record as unknown as Record<string, unknown>) as unknown as Invoice
      const results = memGet<Invoice>('invoices', [])
      results.push(record)
      memSet('invoices', results)
      return record
    },
  },

  contactSubmission: {
    findMany: async () => {
      if (IS_SQLITE) return sqliteAll<ContactSubmission>('store_contacts')
      return memGet<ContactSubmission>('contacts', [])
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
      if (IS_SQLITE) return sqlitePut('store_contacts', record as unknown as Record<string, unknown>) as unknown as ContactSubmission
      const results = memGet<ContactSubmission>('contacts', [])
      results.push(record)
      memSet('contacts', results)
      return record
    },
  },

  siteSettings: {
    findUnique: async () => {
      const defaults: SiteSettings = {
        id: 'main', heroHeadline: 'Resourcefully Relentless.',
        heroSubtitle: 'Protecting your rights. Empowering your future.',
        aboutBio: '', phone: '(352) 494-3657',
        email: 'Nicole@MayerLawFlorida.com', address: 'Maitland, Florida',
        primaryColor: '#C17B6E', secondaryColor: '#F0E6E0',
        bgColor: '#FBF7F4', sectionOrder: 'hero,practice,about,stats,testimonials,cta,contact',
        updatedAt: new Date().toISOString(),
      }
      if (IS_SQLITE) {
        const row = sqliteById<SiteSettings>('store_settings', 'main')
        if (row) return row
        return sqlitePut('store_settings', defaults as unknown as Record<string, unknown>) as unknown as SiteSettings
      }
      const results = memGet<SiteSettings>('settings', [])
      if (results.length === 0) {
        memSet('settings', [defaults])
        return defaults
      }
      return results[0]
    },
    update: async (opts: { where: { id: string }; data: Record<string, unknown> }) => {
      if (IS_SQLITE) {
        const existing = sqliteById<SiteSettings>('store_settings', opts.where.id)
        const updated = existing
          ? { ...existing, ...opts.data, updatedAt: new Date().toISOString() }
          : { id: opts.where.id, ...opts.data, updatedAt: new Date().toISOString() } as SiteSettings
        return sqlitePut('store_settings', updated as unknown as Record<string, unknown>) as unknown as SiteSettings
      }
      const results = memGet<SiteSettings>('settings', [])
      if (results.length === 0) {
        const created: SiteSettings = {
          id: 'main', ...opts.data as Partial<SiteSettings>,
          updatedAt: new Date().toISOString(),
        } as SiteSettings
        memSet('settings', [created])
        return created
      }
      results[0] = { ...results[0], ...opts.data, updatedAt: new Date().toISOString() }
      memSet('settings', results)
      return results[0]
    },
  },
}
