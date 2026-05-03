'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Lock, Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAppStore } from '@/store/useAppStore'
import { toast } from 'sonner'

export default function AdminLogin() {
  const { adminLogin, setView } = useAppStore()
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!password) { toast.error('Please enter the admin password.'); return }
    setLoading(true)
    try {
      const res = await fetch('/api/auth/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      if (res.ok) {
        adminLogin()
        toast.success('Welcome, Admin!')
      } else {
        toast.error('Invalid password.')
      }
    } catch {
      toast.error('Authentication failed.')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-8 sm:p-10 max-w-sm w-full border border-beige text-center"
      >
        <div className="w-14 h-14 rounded-2xl bg-beige flex items-center justify-center mx-auto mb-6">
          <Lock className="w-6 h-6 text-soft-gold" />
        </div>
        <h1 className="font-serif text-2xl font-bold text-charcoal mb-2">Admin Access</h1>
        <p className="text-medium-gray text-sm mb-6">Enter the admin password to continue.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Label htmlFor="admin-pw" className="sr-only">Password</Label>
            <Input
              id="admin-pw"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-beige focus:border-soft-gold rounded-xl pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-medium-gray hover:text-charcoal"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          <Button type="submit" disabled={loading} className="w-full bg-charcoal hover:bg-charcoal/90 text-white rounded-xl py-5 font-medium">
            {loading ? 'Verifying...' : 'Sign In'}
          </Button>
        </form>

        <div className="mt-6 pt-6 border-t border-beige">
          <Button variant="ghost" onClick={() => setView('website')} className="text-medium-gray hover:text-charcoal">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
