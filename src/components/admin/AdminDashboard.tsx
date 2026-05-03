'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import {
  X, BarChart3, Calendar, Star, Users, FileText, Settings,
  Palette, Type, Image, Layout, MessageSquare, Clock, Eye, EyeOff,
  Trash2, Check, RotateCcw, Download, ChevronRight, GripVertical, Share2, ExternalLink, TrendingUp
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Switch } from '@/components/ui/switch'
import StarRating from '@/components/shared/StarRating'
import { useAppStore } from '@/store/useAppStore'
import { toast } from 'sonner'

interface AdminData {
  appointments: Array<{ id: string; name: string; email: string; service: string; date: string; time: string; status: string }>
  reviews: Array<{ id: string; clientName: string; rating: number; service?: string; text?: string; featured: boolean; visible: boolean; response?: string }>
  clients: Array<{ id: string; name: string; email: string; _count?: { appointments: number } }>
  contactSubmissions: Array<{ id: string; name: string; email: string; message: string; read: boolean; createdAt: string }>
}

interface SiteSettings {
  heroHeadline: string
  heroSubtitle: string
  aboutBio: string
  phone: string
  email: string
  address: string
  primaryColor: string
  secondaryColor: string
  bgColor: string
  sectionOrder: string
}

const defaultSettings: SiteSettings = {
  heroHeadline: 'Resourcefully Relentless.',
  heroSubtitle: 'Protecting your rights with determination and care.',
  aboutBio: '',
  phone: '(352) 494-3657',
  email: 'Nicole@MayerLawFlorida.com',
  address: 'Maitland, Florida',
  primaryColor: '#C9A96E',
  secondaryColor: '#8B7355',
  bgColor: '#FDF8F0',
  sectionOrder: 'hero,practice,about,stats,testimonials,cta,contact',
}

const sectionOptions = [
  { id: 'hero', label: 'Hero Section' },
  { id: 'practice', label: 'Practice Areas' },
  { id: 'about', label: 'About Section' },
  { id: 'stats', label: 'Stats Section' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'cta', label: 'CTA Banner' },
  { id: 'contact', label: 'Contact Section' },
]

export default function AdminDashboard() {
  const { adminLogout, setView } = useAppStore()
  const [data, setData] = useState<AdminData>({ appointments: [], reviews: [], clients: [], contactSubmissions: [] })
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')

  const fetchData = useCallback(async () => {
    try {
      const [aptsRes, revsRes, clientsRes, settingsRes, contactsRes] = await Promise.all([
        fetch('/api/appointments'),
        fetch('/api/reviews/all'),
        fetch('/api/appointments'), // clients from appointments
        fetch('/api/settings'),
        fetch('/api/contact'),
      ])
      const [apts, revs, , sett, contacts] = await Promise.all([
        aptsRes.json(), revsRes.json(), clientsRes.json(), settingsRes.json(), contactsRes.ok() ? contactsRes.json() : [],
      ])
      // Extract unique clients from appointments
      const clientMap = new Map<string, { id: string; name: string; email: string; _count: { appointments: number } }>()
      apts.forEach((a: { id: string; name: string; email: string }) => {
        const existing = clientMap.get(a.email)
        if (existing) {
          existing._count.appointments++
        } else {
          clientMap.set(a.email, { id: a.id, name: a.name, email: a.email, _count: { appointments: 1 } })
        }
      })
      setData({
        appointments: apts,
        reviews: revs,
        clients: Array.from(clientMap.values()),
        contactSubmissions: contacts,
      })
      if (sett) setSettings(sett)
    } catch { /* silent */ }
    setLoading(false)
  }, [])

  useEffect(() => {
    const load = () => { void fetchData() }
    load()
  }, [fetchData])

  const saveSettings = async (updates: Partial<SiteSettings>) => {
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      })
      if (res.ok) {
        toast.success('Settings saved!')
        setSettings({ ...settings, ...updates })
      }
    } catch { toast.error('Failed to save.') }
  }

  const updateAppointment = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/appointments/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      if (res.ok) { toast.success('Updated!'); fetchData() }
    } catch { toast.error('Failed.') }
  }

  const updateReview = async (id: string, updates: Record<string, unknown>) => {
    try {
      const res = await fetch(`/api/reviews/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      })
      if (res.ok) { toast.success('Review updated!'); fetchData() }
    } catch { toast.error('Failed.') }
  }

  const applyThemeColors = () => {
    const root = document.documentElement
    root.style.setProperty('--color-soft-gold', settings.primaryColor)
    root.style.setProperty('--primary', settings.primaryColor)
    root.style.setProperty('--ring', settings.primaryColor)
    root.style.setProperty('--background', settings.bgColor)
    document.body.style.backgroundColor = settings.bgColor
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-medium-gray">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-beige">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BarChart3 className="w-5 h-5 text-soft-gold" />
            <h1 className="font-serif text-lg font-semibold text-charcoal">Admin Panel</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" onClick={() => { adminLogout(); setView('website') }} className="text-medium-gray hover:text-charcoal text-sm">
              Exit
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-beige/50 w-full justify-start rounded-xl h-auto p-1 flex-wrap gap-1">
            <TabsTrigger value="overview" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm text-xs px-3">
              Overview
            </TabsTrigger>
            <TabsTrigger value="appearance" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm text-xs px-3">
              <Palette className="w-3 h-3 mr-1" />Appearance
            </TabsTrigger>
            <TabsTrigger value="content" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm text-xs px-3">
              <Type className="w-3 h-3 mr-1" />Content
            </TabsTrigger>
            <TabsTrigger value="blocks" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm text-xs px-3">
              <Layout className="w-3 h-3 mr-1" />Blocks
            </TabsTrigger>
            <TabsTrigger value="appointments" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm text-xs px-3">
              <Calendar className="w-3 h-3 mr-1" />Appointments
            </TabsTrigger>
            <TabsTrigger value="reviews" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm text-xs px-3">
              <Star className="w-3 h-3 mr-1" />Reviews
            </TabsTrigger>
            <TabsTrigger value="clients" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm text-xs px-3">
              <Users className="w-3 h-3 mr-1" />Clients
            </TabsTrigger>
            <TabsTrigger value="messages" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm text-xs px-3">
              <MessageSquare className="w-3 h-3 mr-1" />Messages
            </TabsTrigger>
            <TabsTrigger value="social" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm text-xs px-3">
              <Share2 className="w-3 h-3 mr-1" />Social Media
            </TabsTrigger>
          </TabsList>

          {/* Overview */}
          <TabsContent value="overview">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
              {[
                { label: 'Total Appointments', value: data.appointments.length, icon: Calendar, color: 'bg-soft-gold/10 text-soft-gold' },
                { label: 'Reviews', value: data.reviews.length, icon: Star, color: 'bg-sage/20 text-dark-gold' },
                { label: 'Clients', value: data.clients.length, icon: Users, color: 'bg-soft-rose/20 text-dark-gold' },
                { label: 'Messages', value: data.contactSubmissions.length, icon: MessageSquare, color: 'bg-beige text-dark-gold' },
              ].map((s) => (
                <div key={s.label} className="bg-white rounded-2xl p-5 border border-beige">
                  <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center mb-3`}>
                    <s.icon className="w-5 h-5" />
                  </div>
                  <p className="font-serif text-2xl font-bold text-charcoal">{s.value}</p>
                  <p className="text-xs text-medium-gray">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl border border-beige mt-6 p-6">
              <h3 className="font-serif text-lg font-semibold text-charcoal mb-4">Recent Appointments</h3>
              <div className="max-h-80 overflow-y-auto space-y-3">
                {data.appointments.slice(0, 10).map((apt) => (
                  <div key={apt.id} className="flex items-center justify-between py-2 border-b border-beige/50 last:border-0">
                    <div>
                      <p className="text-sm font-medium text-charcoal">{apt.name}</p>
                      <p className="text-xs text-medium-gray">{apt.service} · {apt.date} at {apt.time}</p>
                    </div>
                    <Badge variant="secondary" className={`text-[10px] ${
                      apt.status === 'confirmed' ? 'bg-sage/50 text-dark-gold' :
                      apt.status === 'pending' ? 'bg-beige text-dark-gold' :
                      apt.status === 'completed' ? 'bg-beige/50 text-medium-gray' :
                      'bg-soft-rose/50 text-red-600'
                    }`}>
                      {apt.status}
                    </Badge>
                  </div>
                ))}
                {data.appointments.length === 0 && <p className="text-sm text-light-gray text-center py-4">No appointments yet.</p>}
              </div>
            </div>
          </TabsContent>

          {/* Appearance */}
          <TabsContent value="appearance">
            <div className="bg-white rounded-2xl border border-beige p-6 mt-6 space-y-6">
              <h3 className="font-serif text-lg font-semibold text-charcoal">Theme Customizer</h3>
              <div className="grid sm:grid-cols-3 gap-6">
                <div>
                  <Label className="text-sm font-medium text-charcoal mb-2 block">Primary Accent Color</Label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={settings.primaryColor}
                      onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })}
                      className="w-10 h-10 rounded-lg border border-beige cursor-pointer"
                    />
                    <Input value={settings.primaryColor} onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })} className="border-beige rounded-xl text-sm" />
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-charcoal mb-2 block">Secondary Accent Color</Label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={settings.secondaryColor}
                      onChange={(e) => setSettings({ ...settings, secondaryColor: e.target.value })}
                      className="w-10 h-10 rounded-lg border border-beige cursor-pointer"
                    />
                    <Input value={settings.secondaryColor} onChange={(e) => setSettings({ ...settings, secondaryColor: e.target.value })} className="border-beige rounded-xl text-sm" />
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-charcoal mb-2 block">Background Color</Label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={settings.bgColor}
                      onChange={(e) => setSettings({ ...settings, bgColor: e.target.value })}
                      className="w-10 h-10 rounded-lg border border-beige cursor-pointer"
                    />
                    <Input value={settings.bgColor} onChange={(e) => setSettings({ ...settings, bgColor: e.target.value })} className="border-beige rounded-xl text-sm" />
                  </div>
                </div>
              </div>

              {/* Live preview */}
              <div className="p-6 rounded-xl border border-beige" style={{ backgroundColor: settings.bgColor }}>
                <p className="font-serif text-lg font-bold mb-2" style={{ color: settings.primaryColor }}>Preview Heading</p>
                <div className="flex gap-3">
                  <div className="px-4 py-2 rounded-full text-white text-sm" style={{ backgroundColor: settings.primaryColor }}>Primary Button</div>
                  <div className="px-4 py-2 rounded-full text-sm border" style={{ borderColor: settings.primaryColor, color: settings.primaryColor }}>Secondary</div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button onClick={() => saveSettings({ primaryColor: settings.primaryColor, secondaryColor: settings.secondaryColor, bgColor: settings.bgColor })} className="bg-soft-gold hover:bg-warm-gold text-white rounded-xl">
                  Save Changes
                </Button>
                <Button onClick={() => { setSettings(defaultSettings); saveSettings(defaultSettings); applyThemeColors() }} variant="outline" className="border-beige rounded-xl">
                  <RotateCcw className="w-4 h-4 mr-2" />Reset to Default
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* Content Editor */}
          <TabsContent value="content">
            <div className="bg-white rounded-2xl border border-beige p-6 mt-6 space-y-6">
              <h3 className="font-serif text-lg font-semibold text-charcoal">Content Editor</h3>

              <div>
                <Label className="text-sm font-medium text-charcoal mb-1.5 block">Hero Headline</Label>
                <Input value={settings.heroHeadline} onChange={(e) => setSettings({ ...settings, heroHeadline: e.target.value })} className="border-beige rounded-xl" />
              </div>
              <div>
                <Label className="text-sm font-medium text-charcoal mb-1.5 block">Hero Subtitle</Label>
                <Textarea value={settings.heroSubtitle} onChange={(e) => setSettings({ ...settings, heroSubtitle: e.target.value })} rows={2} className="border-beige rounded-xl resize-none" />
              </div>
              <div>
                <Label className="text-sm font-medium text-charcoal mb-1.5 block">About Bio</Label>
                <Textarea value={settings.aboutBio} onChange={(e) => setSettings({ ...settings, aboutBio: e.target.value })} rows={4} className="border-beige rounded-xl resize-none" />
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium text-charcoal mb-1.5 block">Phone</Label>
                  <Input value={settings.phone} onChange={(e) => setSettings({ ...settings, phone: e.target.value })} className="border-beige rounded-xl" />
                </div>
                <div>
                  <Label className="text-sm font-medium text-charcoal mb-1.5 block">Email</Label>
                  <Input value={settings.email} onChange={(e) => setSettings({ ...settings, email: e.target.value })} className="border-beige rounded-xl" />
                </div>
                <div>
                  <Label className="text-sm font-medium text-charcoal mb-1.5 block">Address</Label>
                  <Input value={settings.address} onChange={(e) => setSettings({ ...settings, address: e.target.value })} className="border-beige rounded-xl" />
                </div>
              </div>

              <Button onClick={() => saveSettings({
                heroHeadline: settings.heroHeadline,
                heroSubtitle: settings.heroSubtitle,
                aboutBio: settings.aboutBio,
                phone: settings.phone,
                email: settings.email,
                address: settings.address,
              })} className="bg-soft-gold hover:bg-warm-gold text-white rounded-xl">
                Save Content
              </Button>
            </div>
          </TabsContent>

          {/* Blocks Manager */}
          <TabsContent value="blocks">
            <div className="bg-white rounded-2xl border border-beige p-6 mt-6 space-y-6">
              <h3 className="font-serif text-lg font-semibold text-charcoal">Section Visibility & Order</h3>
              <p className="text-sm text-medium-gray">Toggle visibility and drag to reorder homepage sections.</p>

              <div className="space-y-3">
                {sectionOptions.map((section) => {
                  const isEnabled = settings.sectionOrder.split(',').includes(section.id)
                  return (
                    <div key={section.id} className="flex items-center gap-4 p-4 rounded-xl border border-beige hover:border-soft-gold/30 transition-colors">
                      <GripVertical className="w-5 h-5 text-light-gray" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-charcoal">{section.label}</p>
                        <p className="text-xs text-light-gray">ID: {section.id}</p>
                      </div>
                      <Switch
                        checked={isEnabled}
                        onCheckedChange={(checked) => {
                          const current = settings.sectionOrder.split(',').filter(s => s !== section.id)
                          if (checked) current.push(section.id)
                          const newOrder = current.join(',')
                          setSettings({ ...settings, sectionOrder: newOrder })
                          saveSettings({ sectionOrder: newOrder })
                        }}
                      />
                    </div>
                  )
                })}
              </div>
            </div>
          </TabsContent>

          {/* Appointments */}
          <TabsContent value="appointments">
            <div className="bg-white rounded-2xl border border-beige p-6 mt-6">
              <h3 className="font-serif text-lg font-semibold text-charcoal mb-4">All Appointments</h3>
              <div className="max-h-[500px] overflow-y-auto">
                <table className="w-full text-sm">
                  <thead className="sticky top-0 bg-white">
                    <tr className="border-b border-beige">
                      <th className="text-left py-2 px-2 text-xs font-medium text-medium-gray">Client</th>
                      <th className="text-left py-2 px-2 text-xs font-medium text-medium-gray hidden sm:table-cell">Service</th>
                      <th className="text-left py-2 px-2 text-xs font-medium text-medium-gray hidden md:table-cell">Date</th>
                      <th className="text-left py-2 px-2 text-xs font-medium text-medium-gray">Status</th>
                      <th className="text-left py-2 px-2 text-xs font-medium text-medium-gray">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-beige/50">
                    {data.appointments.map((apt) => (
                      <tr key={apt.id} className="hover:bg-cream/50">
                        <td className="py-3 px-2">
                          <p className="font-medium text-charcoal">{apt.name}</p>
                          <p className="text-xs text-medium-gray">{apt.email}</p>
                        </td>
                        <td className="py-3 px-2 text-xs text-medium-gray hidden sm:table-cell">{apt.service}</td>
                        <td className="py-3 px-2 text-xs text-medium-gray hidden md:table-cell">{apt.date}<br />{apt.time}</td>
                        <td className="py-3 px-2">
                          <Badge variant="secondary" className={`text-[10px] ${
                            apt.status === 'confirmed' ? 'bg-sage/50 text-dark-gold' :
                            apt.status === 'pending' ? 'bg-beige text-dark-gold' :
                            apt.status === 'completed' ? 'bg-beige/50 text-medium-gray' :
                            'bg-soft-rose/50 text-red-600'
                          }`}>
                            {apt.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-2">
                          <div className="flex gap-1">
                            {apt.status !== 'confirmed' && apt.status !== 'completed' && (
                              <Button size="sm" variant="ghost" onClick={() => updateAppointment(apt.id, 'confirmed')} className="text-xs h-7 text-dark-gold hover:bg-sage/20">
                                <Check className="w-3 h-3" />
                              </Button>
                            )}
                            {apt.status !== 'cancelled' && (
                              <Button size="sm" variant="ghost" onClick={() => updateAppointment(apt.id, 'cancelled')} className="text-xs h-7 text-red-500 hover:bg-soft-rose/20">
                                <X className="w-3 h-3" />
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {data.appointments.length === 0 && <p className="text-sm text-light-gray text-center py-8">No appointments.</p>}
              </div>
            </div>
          </TabsContent>

          {/* Reviews */}
          <TabsContent value="reviews">
            <div className="bg-white rounded-2xl border border-beige p-6 mt-6">
              <h3 className="font-serif text-lg font-semibold text-charcoal mb-4">All Reviews</h3>
              <div className="max-h-[500px] overflow-y-auto space-y-4">
                {data.reviews.map((rev) => (
                  <div key={rev.id} className="p-4 rounded-xl border border-beige hover:border-soft-gold/30 transition-colors">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <p className="font-medium text-charcoal text-sm">{rev.clientName}</p>
                          <StarRating rating={rev.rating} size={14} />
                          {rev.featured && <Badge className="bg-soft-gold text-white text-[10px] px-2">Featured</Badge>}
                        </div>
                        {rev.text && <p className="text-sm text-medium-gray mb-2">&ldquo;{rev.text}&rdquo;</p>}
                        {rev.service && <p className="text-xs text-light-gray">{rev.service}</p>}

                        {/* Response */}
                        {rev.response && (
                          <div className="mt-3 p-3 bg-cream rounded-lg">
                            <p className="text-xs font-medium text-dark-gold mb-1">Attorney Response:</p>
                            <p className="text-xs text-medium-gray">{rev.response}</p>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col gap-2 shrink-0">
                        <Switch checked={rev.visible} onCheckedChange={(v) => updateReview(rev.id, { visible: v })} className="scale-75" />
                        <Switch checked={rev.featured} onCheckedChange={(v) => updateReview(rev.id, { featured: v })} className="scale-75" />
                      </div>
                    </div>

                    {/* Respond */}
                    <div className="mt-3 flex gap-2">
                      <Input
                        placeholder="Write a response..."
                        defaultValue={rev.response || ''}
                        className="border-beige rounded-lg text-xs flex-1"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && (e.target as HTMLInputElement).value) {
                            updateReview(rev.id, { response: (e.target as HTMLInputElement).value })
                          }
                        }}
                      />
                      <Button size="sm" onClick={(e) => {
                        const input = (e.currentTarget.parentElement?.querySelector('input') as HTMLInputElement)
                        if (input?.value) {
                          updateReview(rev.id, { response: input.value })
                        }
                      }} className="bg-soft-gold text-white text-xs rounded-lg shrink-0">
                        Reply
                      </Button>
                    </div>
                  </div>
                ))}
                {data.reviews.length === 0 && <p className="text-sm text-light-gray text-center py-8">No reviews.</p>}
              </div>
            </div>
          </TabsContent>

          {/* Clients */}
          <TabsContent value="clients">
            <div className="bg-white rounded-2xl border border-beige p-6 mt-6">
              <h3 className="font-serif text-lg font-semibold text-charcoal mb-4">Clients</h3>
              <div className="max-h-[500px] overflow-y-auto">
                <table className="w-full text-sm">
                  <thead className="sticky top-0 bg-white">
                    <tr className="border-b border-beige">
                      <th className="text-left py-2 px-3 text-xs font-medium text-medium-gray">Name</th>
                      <th className="text-left py-2 px-3 text-xs font-medium text-medium-gray">Email</th>
                      <th className="text-left py-2 px-3 text-xs font-medium text-medium-gray">Appointments</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-beige/50">
                    {data.clients.map((client) => (
                      <tr key={client.id} className="hover:bg-cream/50">
                        <td className="py-3 px-3 font-medium text-charcoal">{client.name}</td>
                        <td className="py-3 px-3 text-xs text-medium-gray">{client.email}</td>
                        <td className="py-3 px-3">
                          <Badge variant="secondary" className="bg-beige text-dark-gold text-[10px]">
                            {client._count?.appointments || 0}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {data.clients.length === 0 && <p className="text-sm text-light-gray text-center py-8">No clients.</p>}
              </div>
            </div>
          </TabsContent>

          {/* Social Media Monitoring */}
          <TabsContent value="social">
            <div className="bg-white rounded-2xl border border-beige p-6 mt-6 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-lg font-semibold text-charcoal">Social Media & Marketing</h3>
                <span className="text-xs text-medium-gray bg-cream px-3 py-1 rounded-full">Quick Overview</span>
              </div>

              {/* Social accounts */}
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { name: 'Facebook', handle: '@MayerLawFlorida', url: 'https://facebook.com/MayerLawFlorida', color: 'bg-blue-50 text-blue-600 border-blue-100', icon: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
                  { name: 'Instagram', handle: '@MayerLawFlorida', url: 'https://instagram.com/MayerLawFlorida', color: 'bg-pink-50 text-pink-600 border-pink-100', icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z' },
                  { name: 'TikTok', handle: '@MayerLawFlorida', url: 'https://tiktok.com/@MayerLawFlorida', color: 'bg-slate-50 text-slate-700 border-slate-200', icon: 'M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z' },
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-3 p-4 rounded-xl border ${social.color} hover:shadow-md transition-all group`}
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d={social.icon} /></svg>
                    <div className="flex-1">
                      <p className="font-medium text-sm text-charcoal">{social.name}</p>
                      <p className="text-xs text-medium-gray">{social.handle}</p>
                    </div>
                    <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                ))}
              </div>

              {/* Google Reviews link */}
              <div className="p-4 rounded-xl border border-beige bg-amber-50/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                    <div>
                      <p className="font-medium text-sm text-charcoal">Google Reviews</p>
                      <p className="text-xs text-medium-gray">Monitor and respond to client reviews</p>
                    </div>
                  </div>
                  <a
                    href="https://www.google.com/maps/place/Mayer+Law+P.A./@28.6278,-81.3635,15z"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-amber-600 hover:text-amber-700 font-medium flex items-center gap-1"
                  >
                    View <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Quick Marketing Actions */}
              <div>
                <h4 className="font-medium text-sm text-charcoal mb-3 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-dusty-rose" />
                  Quick Marketing Actions
                </h4>
                <div className="grid sm:grid-cols-2 gap-3">
                  <Button variant="outline" className="border-beige rounded-xl text-sm h-auto py-3 justify-start" onClick={() => setView('review')}>
                    <MessageSquare className="w-4 h-4 mr-2 text-dusty-rose" />
                    Request a Review
                  </Button>
                  <a
                    href="https://www.google.com/maps/place/Mayer+Law+P.A./@28.6278,-81.3635,15z"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-3 border border-beige rounded-xl text-sm hover:bg-cream transition-colors"
                  >
                    <Star className="w-4 h-4 text-amber-500" />
                    Share Google Review Link
                  </a>
                  <a
                    href="https://facebook.com/MayerLawFlorida"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-3 border border-beige rounded-xl text-sm hover:bg-cream transition-colors"
                  >
                    <Share2 className="w-4 h-4 text-blue-500" />
                    Share on Facebook
                  </a>
                  <Button variant="outline" className="border-beige rounded-xl text-sm h-auto py-3 justify-start" onClick={() => navigator.clipboard.writeText('https://my-project-steel-six.vercel.app')}>
                    <ExternalLink className="w-4 h-4 mr-2 text-dusty-rose" />
                    Copy Website Link
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Contact Messages */}
          <TabsContent value="messages">
            <div className="bg-white rounded-2xl border border-beige p-6 mt-6">
              <h3 className="font-serif text-lg font-semibold text-charcoal mb-4">Contact Messages</h3>
              <div className="max-h-[500px] overflow-y-auto space-y-4">
                {data.contactSubmissions.map((msg) => (
                  <div key={msg.id} className={`p-4 rounded-xl border transition-colors ${msg.read ? 'border-beige/50 bg-white' : 'border-soft-gold/30 bg-cream/50'}`}>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-medium text-charcoal text-sm">{msg.name}</p>
                        <p className="text-xs text-medium-gray">{msg.email}</p>
                      </div>
                      <p className="text-xs text-light-gray">{new Date(msg.createdAt).toLocaleDateString()}</p>
                    </div>
                    <p className="text-sm text-charcoal mt-2">{msg.message}</p>
                  </div>
                ))}
                {data.contactSubmissions.length === 0 && <p className="text-sm text-light-gray text-center py-8">No messages.</p>}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
