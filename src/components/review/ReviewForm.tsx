'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Send, Check, Copy, Share2, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import StarRating from '@/components/shared/StarRating'
import { useAppStore } from '@/store/useAppStore'
import { toast } from 'sonner'

const serviceOptions = [
  'Consumer Finance Law',
  'Education Law & Civil Rights',
  'Personal Injury',
  'General Litigation & Consulting',
]

export default function ReviewForm() {
  const { setView, setReviewShareLink } = useAppStore()
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({
    clientName: '',
    email: '',
    rating: 0,
    service: '',
    text: '',
    recommend: true,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.clientName || !form.email || form.rating === 0) {
      toast.error('Please provide your name, email, and rating.')
      return
    }
    setSubmitting(true)
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        const data = await res.json()
        setReviewShareLink(data.shareLink)
        setSubmitted(true)
        toast.success('Thank you for your review!')
      } else {
        toast.error('Failed to submit. Please try again.')
      }
    } catch {
      toast.error('Something went wrong.')
    }
    setSubmitting(false)
  }

  const copyLink = () => {
    const link = `${typeof window !== 'undefined' ? window.location.origin : ''}?review=${useAppStore.getState().reviewShareLink}`
    navigator.clipboard.writeText(link)
    toast.success('Link copied!')
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl p-8 sm:p-12 max-w-lg w-full border border-beige text-center"
        >
          <div className="w-16 h-16 rounded-full bg-sage/50 flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-dark-gold" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-charcoal mb-2">Thank You!</h2>
          <p className="text-medium-gray mb-8">
            Your review means a lot to us. Share it with others who might benefit from our services.
          </p>

          {/* Share link */}
          <div className="bg-cream rounded-xl p-4 mb-6">
            <p className="text-xs text-medium-gray mb-3">Shareable review link</p>
            <div className="flex gap-2">
              <Input
                readOnly
                value={`${typeof window !== 'undefined' ? window.location.origin : ''}?review=${useAppStore.getState().reviewShareLink}`}
                className="text-xs bg-white border-beige rounded-lg"
              />
              <Button onClick={copyLink} size="icon" className="shrink-0 bg-soft-gold hover:bg-warm-gold text-white rounded-lg">
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Social share */}
          <div className="flex justify-center gap-3 mb-8">
            {[
              { label: 'Facebook', color: 'bg-[#1877F2] hover:bg-[#166FE5]' },
              { label: 'Google', color: 'bg-[#4285F4] hover:bg-[#3B78DB]' },
              { label: 'LinkedIn', color: 'bg-[#0A66C2] hover:bg-[#004182]' },
            ].map((s) => (
              <button
                key={s.label}
                onClick={() => toast.info(`Sharing to ${s.label}...`)}
                className={`${s.color} text-white px-4 py-2 rounded-full text-xs font-medium transition-colors`}
              >
                <Share2 className="w-3 h-3 inline mr-1" />
                {s.label}
              </button>
            ))}
          </div>

          <Button onClick={() => { setReviewShareLink(null); setView('website') }} className="bg-soft-gold hover:bg-warm-gold text-white rounded-full px-8">
            Back to Home
          </Button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-beige">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <Button variant="ghost" onClick={() => setView('website')} className="text-medium-gray hover:text-charcoal">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="font-serif text-lg font-semibold text-charcoal">Share Your Experience</h1>
          <div className="w-16" />
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8">
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 sm:p-8 border border-beige space-y-6"
        >
          <div>
            <Label className="text-charcoal text-sm font-medium mb-2 block">Your Rating *</Label>
            <StarRating
              rating={form.rating}
              interactive
              onRate={(r) => setForm({ ...form, rating: r })}
              size={28}
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="rv-name" className="text-charcoal text-sm font-medium mb-1.5 block">Name *</Label>
              <Input
                id="rv-name"
                placeholder="Your name"
                value={form.clientName}
                onChange={(e) => setForm({ ...form, clientName: e.target.value })}
                className="border-beige focus:border-soft-gold rounded-xl"
              />
            </div>
            <div>
              <Label htmlFor="rv-email" className="text-charcoal text-sm font-medium mb-1.5 block">Email *</Label>
              <Input
                id="rv-email"
                type="email"
                placeholder="your@email.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="border-beige focus:border-soft-gold rounded-xl"
              />
            </div>
          </div>

          <div>
            <Label className="text-charcoal text-sm font-medium mb-1.5 block">Service Type</Label>
            <Select value={form.service} onValueChange={(v) => setForm({ ...form, service: v })}>
              <SelectTrigger className="border-beige rounded-xl">
                <SelectValue placeholder="Select a service..." />
              </SelectTrigger>
              <SelectContent>
                {serviceOptions.map((s) => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="rv-text" className="text-charcoal text-sm font-medium mb-1.5 block">
              Your Review <span className="text-medium-gray font-normal">(optional)</span>
            </Label>
            <Textarea
              id="rv-text"
              placeholder="Tell us about your experience..."
              rows={5}
              value={form.text}
              onChange={(e) => setForm({ ...form, text: e.target.value })}
              className="border-beige focus:border-soft-gold rounded-xl resize-none"
            />
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl bg-cream">
            <div>
              <p className="text-sm font-medium text-charcoal">Would you recommend Mayer Law Florida?</p>
              <p className="text-xs text-medium-gray">Your recommendation helps others.</p>
            </div>
            <Switch
              checked={form.recommend}
              onCheckedChange={(v) => setForm({ ...form, recommend: v })}
            />
          </div>

          <Button
            type="submit"
            disabled={submitting}
            className="w-full bg-soft-gold hover:bg-warm-gold text-white rounded-xl py-6 font-medium"
          >
            {submitting ? 'Submitting...' : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Submit Review
              </>
            )}
          </Button>
        </motion.form>
      </div>
    </div>
  )
}
