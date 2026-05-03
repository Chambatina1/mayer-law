'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Phone, Mail, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import SectionWrapper from '@/components/shared/SectionWrapper'
import { toast } from 'sonner'

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' })
  const [sending, setSending] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields.')
      return
    }
    setSending(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        toast.success('Thank you! We\'ll be in touch soon.')
        setFormData({ name: '', email: '', phone: '', message: '' })
      } else {
        toast.error('Something went wrong. Please try again.')
      }
    } catch {
      toast.error('Failed to send message. Please try again.')
    }
    setSending(false)
  }

  return (
    <SectionWrapper id="contact" className="bg-cream">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <div className="gold-accent-line" />
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal mb-4">
          Get in Touch
        </h2>
        <p className="text-medium-gray text-lg max-w-xl mx-auto">
          We&apos;re here to listen and help.
        </p>
      </div>

      <div className="grid lg:grid-cols-5 gap-12">
        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-3 space-y-5"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name" className="text-charcoal text-sm font-medium mb-1.5 block">Name *</Label>
              <Input
                id="name"
                placeholder="Your name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-white border-beige focus:border-soft-gold rounded-xl"
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-charcoal text-sm font-medium mb-1.5 block">Email *</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-white border-beige focus:border-soft-gold rounded-xl"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="phone" className="text-charcoal text-sm font-medium mb-1.5 block">Phone</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="(555) 000-0000"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="bg-white border-beige focus:border-soft-gold rounded-xl"
            />
          </div>
          <div>
            <Label htmlFor="message" className="text-charcoal text-sm font-medium mb-1.5 block">Message *</Label>
            <Textarea
              id="message"
              placeholder="Briefly describe your situation..."
              rows={5}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="bg-white border-beige focus:border-soft-gold rounded-xl resize-none"
            />
          </div>
          <Button
            type="submit"
            disabled={sending}
            className="bg-soft-gold hover:bg-warm-gold text-white rounded-full px-8 py-6 shadow-sm hover:shadow-md transition-all"
          >
            {sending ? (
              <span className="flex items-center gap-2">Sending...</span>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </>
            )}
          </Button>
        </motion.form>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 space-y-8"
        >
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-beige/80 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-soft-gold" />
              </div>
              <div>
                <p className="font-medium text-charcoal">Phone</p>
                <a href="tel:3524943657" className="text-medium-gray hover:text-soft-gold transition-colors">
                  (352) 494-3657
                </a>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-beige/80 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-soft-gold" />
              </div>
              <div>
                <p className="font-medium text-charcoal">Email</p>
                <a href="mailto:Nicole@MayerLawFlorida.com" className="text-medium-gray hover:text-soft-gold transition-colors break-all">
                  Nicole@MayerLawFlorida.com
                </a>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-beige/80 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-soft-gold" />
              </div>
              <div>
                <p className="font-medium text-charcoal">Office</p>
                <p className="text-medium-gray">Maitland, Florida</p>
              </div>
            </div>
          </div>

          {/* Map placeholder */}
          <div className="rounded-2xl overflow-hidden bg-beige/50 h-48 flex items-center justify-center border border-beige">
            <div className="text-center text-medium-gray">
              <MapPin className="w-8 h-8 mx-auto mb-2 text-soft-gold/50" />
              <p className="text-sm">Maitland, Florida</p>
            </div>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
