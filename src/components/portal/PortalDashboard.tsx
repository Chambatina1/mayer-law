'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowLeft, Calendar, FileText, MessageSquare, DollarSign,
  Clock, Upload, Send, Download, File, Trash2, X, Check
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { useAppStore } from '@/store/useAppStore'
import { toast } from 'sonner'

interface DashboardData {
  stats: {
    activeCases: number
    upcomingAppointments: number
    totalDocuments: number
  }
  appointments: Array<{
    id: string; service: string; date: string; time: string; status: string; notes?: string
  }>
  messages: Array<{
    id: string; sender: string; message: string; createdAt: string
  }>
  documents: Array<{
    id: string; fileName: string; fileSize?: string; category?: string; uploadedAt: string
  }>
  invoices: Array<{
    id: string; amount: number; status: string; description?: string; date: string
  }>
}

const defaultData: DashboardData = {
  stats: { activeCases: 0, upcomingAppointments: 0, totalDocuments: 0 },
  appointments: [],
  messages: [],
  documents: [],
  invoices: [],
}

export default function PortalDashboard() {
  const { clientEmail, clientName, setView, logout } = useAppStore()
  const [data, setData] = useState<DashboardData>(defaultData)
  const [activeTab, setActiveTab] = useState('messages')
  const [messageInput, setMessageInput] = useState('')
  const [sendingMsg, setSendingMsg] = useState(false)

  const fetchData = async () => {
    if (!clientEmail) return
    try {
      const res = await fetch(`/api/client/dashboard?email=${encodeURIComponent(clientEmail)}`)
      if (res.ok) {
        const d = await res.json()
        setData(d)
      }
    } catch { /* silent */ }
  }

  useEffect(() => {
    const load = () => { void fetchData() }
    load()
  }, [clientEmail])

  const sendMessage = async () => {
    if (!messageInput.trim() || !clientEmail) return
    setSendingMsg(true)
    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clientEmail, sender: 'client', message: messageInput }),
      })
      if (res.ok) {
        setMessageInput('')
        fetchData()
      }
    } catch { /* silent */ }
    setSendingMsg(false)
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !clientEmail) return
    const reader = new FileReader()
    reader.onload = async () => {
      try {
        const res = await fetch('/api/documents/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            clientEmail,
            fileName: file.name,
            fileSize: `${(file.size / 1024).toFixed(0)} KB`,
            category: 'Case Documents',
            fileData: reader.result,
          }),
        })
        if (res.ok) {
          toast.success('Document uploaded!')
          fetchData()
        }
      } catch { toast.error('Upload failed.') }
    }
    reader.readAsDataURL(file)
    e.target.value = ''
  }

  const handleCancelAppointment = async (id: string) => {
    try {
      const res = await fetch(`/api/appointments/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'cancelled' }),
      })
      if (res.ok) { toast.success('Appointment cancelled.'); fetchData() }
    } catch { toast.error('Failed to cancel.') }
  }

  const statCards = [
    { label: 'Active Cases', value: data.stats.activeCases, icon: FileText, color: 'bg-soft-rose/50 text-dark-gold' },
    { label: 'Upcoming', value: data.stats.upcomingAppointments, icon: Calendar, color: 'bg-sage/50 text-dark-gold' },
    { label: 'Documents', value: data.stats.totalDocuments, icon: File, color: 'bg-beige text-dark-gold' },
  ]

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-beige">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Button variant="ghost" onClick={logout} className="text-medium-gray hover:text-charcoal">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Logout
          </Button>
          <h1 className="font-serif text-lg font-semibold text-charcoal">Client Portal</h1>
          <Button variant="ghost" onClick={() => setView('website')} className="text-medium-gray hover:text-charcoal">
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Welcome */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="font-serif text-2xl font-bold text-charcoal mb-1">
            Welcome, {clientName}
          </h2>
          <p className="text-medium-gray">Here&apos;s an overview of your case.</p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {statCards.map((s) => (
            <div key={s.label} className="bg-white rounded-2xl p-5 border border-beige">
              <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center mb-3`}>
                <s.icon className="w-5 h-5" />
              </div>
              <p className="font-serif text-2xl font-bold text-charcoal">{s.value}</p>
              <p className="text-xs text-medium-gray">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          <Button
            variant="outline"
            onClick={() => { const input = document.getElementById('doc-upload') as HTMLInputElement; input?.click() }}
            className="border-beige text-charcoal hover:bg-beige rounded-xl py-5 text-xs sm:text-sm"
          >
            <Upload className="w-4 h-4 mr-1 sm:mr-2" />
            Upload Doc
          </Button>
          <input id="doc-upload" type="file" className="hidden" accept=".pdf,.doc,.docx,.jpg,.png" onChange={handleFileUpload} />
          <Button
            variant="outline"
            onClick={() => setView('booking')}
            className="border-beige text-charcoal hover:bg-beige rounded-xl py-5 text-xs sm:text-sm"
          >
            <Calendar className="w-4 h-4 mr-1 sm:mr-2" />
            Schedule
          </Button>
          <Button
            variant="outline"
            onClick={() => setActiveTab('messages')}
            className="border-beige text-charcoal hover:bg-beige rounded-xl py-5 text-xs sm:text-sm"
          >
            <MessageSquare className="w-4 h-4 mr-1 sm:mr-2" />
            Message
          </Button>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-beige/50 w-full justify-start rounded-xl h-auto p-1 flex-wrap">
            <TabsTrigger value="messages" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm text-xs sm:text-sm px-3 sm:px-4">
              Messages
            </TabsTrigger>
            <TabsTrigger value="documents" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm text-xs sm:text-sm px-3 sm:px-4">
              Documents
            </TabsTrigger>
            <TabsTrigger value="appointments" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm text-xs sm:text-sm px-3 sm:px-4">
              Appointments
            </TabsTrigger>
            <TabsTrigger value="invoices" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm text-xs sm:text-sm px-3 sm:px-4">
              Invoices
            </TabsTrigger>
          </TabsList>

          {/* Messages Tab */}
          <TabsContent value="messages">
            <div className="bg-white rounded-2xl border border-beige overflow-hidden">
              <div className="h-80 max-h-96 overflow-y-auto p-4 space-y-3">
                {data.messages.length === 0 ? (
                  <div className="text-center text-light-gray py-12">
                    <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-30" />
                    <p className="text-sm">No messages yet. Start the conversation!</p>
                  </div>
                ) : (
                  data.messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.sender === 'client' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                        msg.sender === 'client'
                          ? 'bg-soft-gold text-white rounded-br-md'
                          : 'bg-cream text-charcoal rounded-bl-md'
                      }`}>
                        <p className="text-sm">{msg.message}</p>
                        <p className={`text-[10px] mt-1 ${msg.sender === 'client' ? 'text-white/60' : 'text-light-gray'}`}>
                          {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          <span className="ml-1.5">{msg.sender === 'client' ? 'You' : 'Attorney'}</span>
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <div className="border-t border-beige p-3 flex gap-2">
                <Input
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                  placeholder="Type a message..."
                  className="border-beige focus:border-soft-gold rounded-xl flex-1"
                />
                <Button onClick={sendMessage} disabled={sendingMsg || !messageInput.trim()} size="icon" className="bg-soft-gold hover:bg-warm-gold text-white rounded-xl shrink-0">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents">
            <div className="bg-white rounded-2xl border border-beige overflow-hidden">
              <div className="max-h-96 overflow-y-auto">
                {data.documents.length === 0 ? (
                  <div className="text-center text-light-gray py-12">
                    <File className="w-8 h-8 mx-auto mb-2 opacity-30" />
                    <p className="text-sm mb-3">No documents uploaded yet.</p>
                    <Button size="sm" onClick={() => { const input = document.getElementById('doc-upload') as HTMLInputElement; input?.click() }} className="bg-soft-gold text-white rounded-full">
                      <Upload className="w-3 h-3 mr-1" /> Upload
                    </Button>
                  </div>
                ) : (
                  <div className="divide-y divide-beige">
                    {data.documents.map((doc) => (
                      <div key={doc.id} className="flex items-center gap-3 px-4 py-3 hover:bg-cream/50 transition-colors">
                        <File className="w-5 h-5 text-soft-gold shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-charcoal truncate">{doc.fileName}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            {doc.fileSize && <span className="text-xs text-light-gray">{doc.fileSize}</span>}
                            {doc.category && (
                              <Badge variant="secondary" className="text-[10px] px-2 py-0 bg-beige text-dark-gold">
                                {doc.category}
                              </Badge>
                            )}
                          </div>
                        </div>
                        {doc.fileData && (
                          <a href={doc.fileData} download={doc.fileName} className="text-soft-gold hover:text-warm-gold">
                            <Download className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Appointments Tab */}
          <TabsContent value="appointments">
            <div className="bg-white rounded-2xl border border-beige overflow-hidden">
              <div className="max-h-96 overflow-y-auto">
                {data.appointments.length === 0 ? (
                  <div className="text-center text-light-gray py-12">
                    <Calendar className="w-8 h-8 mx-auto mb-2 opacity-30" />
                    <p className="text-sm">No appointments scheduled.</p>
                  </div>
                ) : (
                  <div className="divide-y divide-beige">
                    {data.appointments.map((apt) => (
                      <div key={apt.id} className="flex items-center justify-between px-4 py-3 hover:bg-cream/50 transition-colors">
                        <div className="flex items-center gap-3">
                          <Calendar className="w-5 h-5 text-soft-gold shrink-0" />
                          <div>
                            <p className="text-sm font-medium text-charcoal">{apt.service}</p>
                            <p className="text-xs text-medium-gray">{apt.date} at {apt.time}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="secondary"
                            className={`text-[10px] px-2 py-0 ${
                              apt.status === 'confirmed' ? 'bg-sage/50 text-dark-gold' :
                              apt.status === 'pending' ? 'bg-beige text-dark-gold' :
                              apt.status === 'completed' ? 'bg-beige/50 text-medium-gray' :
                              'bg-soft-rose/50 text-red-600'
                            }`}
                          >
                            {apt.status}
                          </Badge>
                          {(apt.status === 'confirmed' || apt.status === 'pending') && (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleCancelAppointment(apt.id)}
                              className="text-light-gray hover:text-red-500 text-xs h-7"
                            >
                              Cancel
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Invoices Tab */}
          <TabsContent value="invoices">
            <div className="bg-white rounded-2xl border border-beige overflow-hidden">
              <div className="max-h-96 overflow-y-auto">
                {data.invoices.length === 0 ? (
                  <div className="text-center text-light-gray py-12">
                    <DollarSign className="w-8 h-8 mx-auto mb-2 opacity-30" />
                    <p className="text-sm">No invoices yet.</p>
                  </div>
                ) : (
                  <div className="divide-y divide-beige">
                    {data.invoices.map((inv) => (
                      <div key={inv.id} className="flex items-center justify-between px-4 py-3 hover:bg-cream/50 transition-colors">
                        <div className="flex items-center gap-3">
                          <DollarSign className="w-5 h-5 text-soft-gold shrink-0" />
                          <div>
                            <p className="text-sm font-medium text-charcoal">
                              ${inv.amount.toFixed(2)}
                            </p>
                            <p className="text-xs text-medium-gray">{inv.description || inv.date}</p>
                          </div>
                        </div>
                        <Badge
                          variant="secondary"
                          className={`text-[10px] px-2 py-0 ${
                            inv.status === 'paid' ? 'bg-sage/50 text-dark-gold' : 'bg-beige text-dark-gold'
                          }`}
                        >
                          {inv.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
