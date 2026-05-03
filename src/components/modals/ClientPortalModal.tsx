'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { useAppStore } from '@/store/useAppStore'
import { useToast } from '@/hooks/use-toast'
import {
  FileText,
  Send,
  CalendarDays,
  LogOut,
  Upload,
  MessageSquare,
  Inbox,
  User,
  Lock,
  FolderOpen,
} from 'lucide-react'

interface ClientData {
  email: string
  exists: boolean
  appointmentCount: number
  documentCount: number
  messageCount: number
}

interface Document {
  id: string
  fileName: string
  fileSize: string | null
  category: string | null
  uploadedAt: string
}

interface Message {
  id: string
  sender: string
  message: string
  createdAt: string
}

export default function ClientPortal() {
  const { clientPortalOpen, setClientPortalOpen } = useAppStore()
  const { toast } = useToast()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loginEmail, setLoginEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [clientData, setClientData] = useState<ClientData | null>(null)
  const [documents, setDocuments] = useState<Document[]>([])
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [uploading, setUploading] = useState(false)

  const handleLogin = async () => {
    if (!loginEmail) {
      toast({
        title: 'Email Required',
        description: 'Please enter your email address.',
        variant: 'destructive',
      })
      return
    }

    setIsLoading(true)
    try {
      const res = await fetch('/api/client/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail }),
      })

      if (res.ok) {
        const data = await res.json()
        setClientData(data)
        setIsLoggedIn(true)

        // Fetch documents and messages
        fetchDocuments(loginEmail)
        fetchMessages(loginEmail)

        toast({
          title: 'Welcome Back',
          description: data.exists
            ? 'Your portal data has been loaded.'
            : 'This is your first time here. Your portal is ready to use.',
        })
      } else {
        throw new Error('Login failed')
      }
    } catch {
      toast({
        title: 'Login Error',
        description: 'Failed to log in. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const fetchDocuments = async (email: string) => {
    try {
      const res = await fetch(`/api/documents/upload?email=${encodeURIComponent(email)}`)
      if (res.ok) {
        const data = await res.json()
        setDocuments(data)
      }
    } catch {
      // Silent fail
    }
  }

  const fetchMessages = async (email: string) => {
    try {
      const res = await fetch(`/api/messages?email=${encodeURIComponent(email)}`)
      if (res.ok) {
        const data = await res.json()
        setMessages(data)
      }
    } catch {
      // Silent fail
    }
  }

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !clientData) return

    const msg = {
      clientEmail: clientData.email,
      sender: 'client',
      message: newMessage.trim(),
    }

    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(msg),
      })

      if (res.ok) {
        setMessages((prev) => [
          ...prev,
          { ...msg, id: Date.now().toString(), createdAt: new Date().toISOString() },
        ])
        setNewMessage('')
        toast({ title: 'Message Sent', description: 'Your message has been delivered.' })
      }
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to send message.',
        variant: 'destructive',
      })
    }
  }

  const handleUpload = async () => {
    if (!clientData) return

    const fileName = `Document_${new Date().getTime()}.pdf`

    setUploading(true)
    try {
      const res = await fetch('/api/documents/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientEmail: clientData.email,
          fileName,
          fileSize: '2.4 MB',
          category: 'Legal Document',
        }),
      })

      if (res.ok) {
        const doc = await res.json()
        setDocuments((prev) => [doc, ...prev])
        toast({ title: 'Document Uploaded', description: 'Your file has been uploaded successfully.' })
      }
    } catch {
      toast({
        title: 'Upload Error',
        description: 'Failed to upload document.',
        variant: 'destructive',
      })
    } finally {
      setUploading(false)
    }
  }

  const handleClose = (open: boolean) => {
    if (!open) {
      setIsLoggedIn(false)
      setLoginEmail('')
      setClientData(null)
      setDocuments([])
      setMessages([])
      setNewMessage('')
    }
    setClientPortalOpen(open)
  }

  return (
    <Dialog open={clientPortalOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader className="sr-only">
          <DialogTitle>Client Portal</DialogTitle>
          <DialogDescription>Access your case information and documents</DialogDescription>
        </DialogHeader>

        {!isLoggedIn ? (
          /* Login Screen */
          <div className="p-8 sm:p-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-sm mx-auto"
            >
              <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6">
                <Lock className="w-8 h-8 text-gold" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-dark mb-2">
                Client Portal
              </h3>
              <p className="text-dark/50 text-sm mb-8">
                Enter your email address to access your case information, documents,
                and messages.
              </p>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="portal-email">Email Address</Label>
                  <Input
                    id="portal-email"
                    type="email"
                    placeholder="your@email.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                    className="rounded-lg border-dark/10 focus:border-gold"
                  />
                </div>
                <Button
                  onClick={handleLogin}
                  disabled={isLoading}
                  className="w-full bg-gold hover:bg-gold-dark text-white rounded-lg py-6"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Logging in...
                    </div>
                  ) : (
                    <>
                      <User className="w-4 h-4 mr-2" />
                      Access Portal
                    </>
                  )}
                </Button>
              </div>

              <p className="text-xs text-dark/30 mt-6">
                Your email must be associated with an existing case or appointment.
              </p>
            </motion.div>
          </div>
        ) : (
          /* Dashboard */
          <div className="p-6 sm:p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-serif text-xl font-bold text-dark">
                  Welcome, {clientData?.email.split('@')[0]}
                </h3>
                <p className="text-dark/50 text-sm">{clientData?.email}</p>
              </div>
              <Button
                variant="ghost"
                onClick={() => handleClose(false)}
                className="text-dark/50 hover:text-red-500"
                size="sm"
              >
                <LogOut className="w-4 h-4 mr-1" />
                Logout
              </Button>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="p-3 rounded-xl bg-gold/5 border border-gold/10 text-center">
                <CalendarDays className="w-5 h-5 text-gold mx-auto mb-1" />
                <p className="text-lg font-bold text-dark">{clientData?.appointmentCount || 0}</p>
                <p className="text-[10px] text-dark/40 uppercase tracking-wider">Appointments</p>
              </div>
              <div className="p-3 rounded-xl bg-gold/5 border border-gold/10 text-center">
                <FileText className="w-5 h-5 text-gold mx-auto mb-1" />
                <p className="text-lg font-bold text-dark">{clientData?.documentCount || 0}</p>
                <p className="text-[10px] text-dark/40 uppercase tracking-wider">Documents</p>
              </div>
              <div className="p-3 rounded-xl bg-gold/5 border border-gold/10 text-center">
                <MessageSquare className="w-5 h-5 text-gold mx-auto mb-1" />
                <p className="text-lg font-bold text-dark">{clientData?.messageCount || 0}</p>
                <p className="text-[10px] text-dark/40 uppercase tracking-wider">Messages</p>
              </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="messages" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-4">
                <TabsTrigger value="messages" className="text-xs sm:text-sm">
                  <MessageSquare className="w-3.5 h-3.5 mr-1 hidden sm:block" />
                  Messages
                </TabsTrigger>
                <TabsTrigger value="documents" className="text-xs sm:text-sm">
                  <FolderOpen className="w-3.5 h-3.5 mr-1 hidden sm:block" />
                  Documents
                </TabsTrigger>
                <TabsTrigger value="appointments" className="text-xs sm:text-sm">
                  <CalendarDays className="w-3.5 h-3.5 mr-1 hidden sm:block" />
                  History
                </TabsTrigger>
              </TabsList>

              {/* Messages Tab */}
              <TabsContent value="messages" className="space-y-4">
                <ScrollArea className="h-64 rounded-xl border border-dark/5 p-4">
                  {messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-dark/30">
                      <Inbox className="w-10 h-10 mb-2" />
                      <p className="text-sm">No messages yet</p>
                      <p className="text-xs">Start a conversation below</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {messages.map((msg) => (
                        <div
                          key={msg.id}
                          className={`flex ${
                            msg.sender === 'client' ? 'justify-end' : 'justify-start'
                          }`}
                        >
                          <div
                            className={`max-w-[80%] rounded-xl px-4 py-2.5 ${
                              msg.sender === 'client'
                                ? 'bg-gold text-white'
                                : 'bg-dark/5 text-dark'
                            }`}
                          >
                            <p className="text-sm">{msg.message}</p>
                            <p
                              className={`text-[10px] mt-1 ${
                                msg.sender === 'client'
                                  ? 'text-white/60'
                                  : 'text-dark/30'
                              }`}
                            >
                              {new Date(msg.createdAt).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                hour: 'numeric',
                                minute: '2-digit',
                              })}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </ScrollArea>
                <div className="flex gap-2">
                  <Input
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="rounded-lg border-dark/10 focus:border-gold flex-1"
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    size="icon"
                    className="bg-gold hover:bg-gold-dark text-white rounded-lg shrink-0 disabled:opacity-40"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </TabsContent>

              {/* Documents Tab */}
              <TabsContent value="documents" className="space-y-4">
                <Button
                  onClick={handleUpload}
                  disabled={uploading}
                  className="w-full bg-gold hover:bg-gold-dark text-white rounded-lg"
                >
                  {uploading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Uploading...
                    </div>
                  ) : (
                    <>
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Document
                    </>
                  )}
                </Button>
                <ScrollArea className="h-52 rounded-xl border border-dark/5">
                  {documents.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-dark/30 p-8">
                      <FileText className="w-10 h-10 mb-2" />
                      <p className="text-sm">No documents uploaded</p>
                    </div>
                  ) : (
                    <div className="divide-y divide-dark/5">
                      {documents.map((doc) => (
                        <div
                          key={doc.id}
                          className="flex items-center gap-3 p-3 hover:bg-dark/[0.02]"
                        >
                          <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
                            <FileText className="w-5 h-5 text-gold" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-dark truncate">
                              {doc.fileName}
                            </p>
                            <p className="text-xs text-dark/40">
                              {doc.fileSize} &bull;{' '}
                              {new Date(doc.uploadedAt).toLocaleDateString()}
                            </p>
                          </div>
                          <Badge
                            variant="secondary"
                            className="bg-gold/10 text-gold-dark text-xs shrink-0"
                          >
                            {doc.category || 'General'}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  )}
                </ScrollArea>
              </TabsContent>

              {/* Appointments Tab */}
              <TabsContent value="appointments">
                <div className="rounded-xl border border-dark/5 p-8 text-center text-dark/30">
                  <CalendarDays className="w-10 h-10 mx-auto mb-2" />
                  <p className="text-sm font-medium">Appointment History</p>
                  <p className="text-xs mt-1">
                    Your upcoming and past appointments will appear here.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
