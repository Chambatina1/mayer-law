'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Send, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import SectionWrapper from '@/components/shared/SectionWrapper'

const contactInfo = [
  {
    icon: Phone,
    label: 'Call Us',
    value: '(352) 494-3657',
    href: 'tel:3524943657',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'Nicole@MayerLawFlorida.com',
    href: 'mailto:Nicole@MayerLawFlorida.com',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Maitland, Florida',
    href: 'https://maps.google.com/?q=Maitland,+Florida',
  },
]

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        setSubmitted(true)
        toast.success('Message sent! We will be in touch soon.')
        setFormData({ name: '', email: '', phone: '', message: '' })
        setTimeout(() => setSubmitted(false), 3000)
      }
    } catch {
      toast.error('Failed to send message. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <SectionWrapper id="contact" className="bg-cream">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-dusty-rose mb-3">
            Get In Touch
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal mb-4">
            Contact Us
          </h2>
          <div className="accent-line mx-auto" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-6"
          >
            {contactInfo.map((item) => (
              <div key={item.label} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-blush flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-dusty-rose" />
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-medium-gray mb-1">
                    {item.label}
                  </p>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-sm font-semibold text-charcoal hover:text-dusty-rose transition-colors"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-sm font-semibold text-charcoal">{item.value}</p>
                  )}
                </div>
              </div>
            ))}

            {/* Map link */}
            <a
              href="https://maps.google.com/?q=Maitland,+Florida"
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-xl border border-sand overflow-hidden h-48 bg-blush mt-6 hover:border-dusty-rose transition-colors group"
            >
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <MapPin className="w-8 h-8 text-dusty-rose/40 mx-auto mb-2 group-hover:text-dusty-rose transition-colors" />
                  <p className="text-sm text-medium-gray group-hover:text-dusty-rose transition-colors">Maitland, Florida</p>
                  <p className="text-xs text-medium-gray/60 mt-1">Click to open in Google Maps</p>
                </div>
              </div>
            </a>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl border border-sand p-6 sm:p-8 space-y-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium text-charcoal">
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="border-sand focus:border-dusty-rose focus:ring-dusty-rose bg-cream/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-charcoal">
                    Email *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="border-sand focus:border-dusty-rose focus:ring-dusty-rose bg-cream/50"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium text-charcoal">
                  Phone
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="(352) 000-0000"
                  className="border-sand focus:border-dusty-rose focus:ring-dusty-rose bg-cream/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-sm font-medium text-charcoal">
                  Message *
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="How can we help you?"
                  className="border-sand focus:border-dusty-rose focus:ring-dusty-rose bg-cream/50 resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={submitting || submitted}
                className={`w-full rounded-full py-6 text-base font-semibold transition-all ${
                  submitted
                    ? 'bg-sage text-charcoal'
                    : 'bg-dusty-rose hover:bg-deep-rose text-white'
                }`}
              >
                {submitted ? (
                  <>
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Message Sent!
                  </>
                ) : submitting ? (
                  'Sending...'
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  )
}
