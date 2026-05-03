'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Mail, Lock, UserPlus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAppStore } from '@/store/useAppStore'
import { toast } from 'sonner'

export default function PortalLogin() {
  const { login, setView } = useAppStore()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  const [regName, setRegName] = useState('')
  const [regPhone, setRegPhone] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) { toast.error('Please enter your email.'); return }
    setLoading(true)
    try {
      const res = await fetch('/api/client/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (res.ok) {
        const data = await res.json()
        login(data.client.email, data.client.name, data.client.id)
        toast.success(`Welcome back, ${data.client.name}!`)
      } else {
        toast.error('Login failed. Please try again.')
      }
    } catch {
      toast.error('Something went wrong.')
    }
    setLoading(false)
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!regName || !email) { toast.error('Please fill in all fields.'); return }
    setLoading(true)
    try {
      const res = await fetch('/api/client/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: regName, email, phone: regPhone }),
      })
      if (res.ok) {
        const data = await res.json()
        login(data.email, data.name, data.id)
        toast.success('Account created successfully!')
      } else {
        const data = await res.json()
        toast.error(data.error || 'Registration failed.')
      }
    } catch {
      toast.error('Something went wrong.')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-8 sm:p-10 max-w-md w-full border border-beige"
      >
        <div className="text-center mb-8">
          <div className="gold-accent-line mx-auto mb-4" />
          <h1 className="font-serif text-2xl font-bold text-charcoal mb-2">
            {showRegister ? 'Create Account' : 'Client Portal'}
          </h1>
          <p className="text-medium-gray text-sm">
            {showRegister ? 'Register to access your case dashboard.' : 'Sign in to access your dashboard.'}
          </p>
        </div>

        {showRegister ? (
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <Label htmlFor="reg-name" className="text-charcoal text-sm font-medium mb-1.5 block">Full Name *</Label>
              <Input
                id="reg-name"
                placeholder="Your name"
                value={regName}
                onChange={(e) => setRegName(e.target.value)}
                className="border-beige focus:border-soft-gold rounded-xl"
              />
            </div>
            <div>
              <Label htmlFor="reg-email" className="text-charcoal text-sm font-medium mb-1.5 block">Email *</Label>
              <Input
                id="reg-email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-beige focus:border-soft-gold rounded-xl"
              />
            </div>
            <div>
              <Label htmlFor="reg-phone" className="text-charcoal text-sm font-medium mb-1.5 block">Phone</Label>
              <Input
                id="reg-phone"
                type="tel"
                placeholder="(555) 000-0000"
                value={regPhone}
                onChange={(e) => setRegPhone(e.target.value)}
                className="border-beige focus:border-soft-gold rounded-xl"
              />
            </div>
            <Button type="submit" disabled={loading} className="w-full bg-soft-gold hover:bg-warm-gold text-white rounded-xl py-6 font-medium">
              {loading ? 'Creating...' : <><UserPlus className="w-4 h-4 mr-2" />Create Account</>}
            </Button>
            <button type="button" onClick={() => setShowRegister(false)} className="w-full text-center text-sm text-medium-gray hover:text-soft-gold transition-colors">
              Already have an account? Sign in
            </button>
          </form>
        ) : (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="portal-email" className="text-charcoal text-sm font-medium mb-1.5 block">Email Address</Label>
              <Input
                id="portal-email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-beige focus:border-soft-gold rounded-xl"
              />
            </div>
            <Button type="submit" disabled={loading} className="w-full bg-soft-gold hover:bg-warm-gold text-white rounded-xl py-6 font-medium">
              {loading ? 'Signing in...' : <><Mail className="w-4 h-4 mr-2" />Send Magic Link</>}
            </Button>
            <p className="text-center text-xs text-light-gray">We&apos;ll auto-create an account if you&apos;re new.</p>
            <button type="button" onClick={() => setShowRegister(true)} className="w-full text-center text-sm text-medium-gray hover:text-soft-gold transition-colors">
              New client? Register here
            </button>
          </form>
        )}

        <div className="mt-6 pt-6 border-t border-beige">
          <Button
            variant="ghost"
            onClick={() => setView('website')}
            className="w-full text-medium-gray hover:text-charcoal"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Website
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
