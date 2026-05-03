'use client'

import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react'
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
import { useState } from 'react'
import { useToast } from '@/hooks/use-toast'

const caseTypes = [
  'Consumer Finance Law',
  'Education Law & Civil Rights',
  'Personal Injury',
  'General Litigation & Consulting',
  'Other',
]

export default function ContactSection() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    caseType: '',
    message: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: 'Please fill in all required fields',
        description: 'Name, email, and message are required.',
        variant: 'destructive',
      })
      return
    }

    setIsSubmitting(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        toast({
          title: 'Message Sent Successfully',
          description: 'We will get back to you within 24 hours.',
        })
        setFormData({ name: '', email: '', phone: '', caseType: '', message: '' })
      } else {
        throw new Error('Failed to submit')
      }
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to send message. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Office Location',
      details: 'Maitland, Florida',
      subtitle: 'Serving all of Florida',
    },
    {
      icon: Phone,
      title: 'Phone',
      details: '(352) 494-3657',
      subtitle: 'Mon-Fri 9AM-5PM',
    },
    {
      icon: Mail,
      title: 'Email',
      details: 'Nicole@MayerLawFlorida.com',
      subtitle: 'We respond within 24 hours',
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: 'Monday - Friday',
      subtitle: '9:00 AM - 5:00 PM EST',
    },
  ]

  return (
    <section id="contact" className="py-20 lg:py-28 bg-[#f5f5f5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-gold text-sm font-semibold tracking-[0.2em] uppercase mb-4">
            Get In Touch
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-dark mb-6">
            Contact Us
          </h2>
          <div className="w-16 h-1 bg-gold mx-auto mb-6" />
          <p className="text-dark/60 text-lg max-w-2xl mx-auto">
            Ready to discuss your legal matter? Contact us today for a
            confidential consultation. We&apos;re here to help.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-6"
          >
            {contactInfo.map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.title}
                  className="flex items-start gap-4 p-4 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
                    <Icon className="w-6 h-6 text-gold-dark" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-dark text-sm">{item.title}</h4>
                    <p className="text-dark/80 text-sm mt-1">{item.details}</p>
                    <p className="text-dark/50 text-xs mt-0.5">{item.subtitle}</p>
                  </div>
                </div>
              )
            })}

            {/* Map placeholder */}
            <div className="rounded-xl overflow-hidden shadow-sm border border-dark/5">
              <div className="h-48 bg-gradient-to-br from-dark/5 to-gold/10 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-8 h-8 text-gold/40 mx-auto mb-2" />
                  <p className="text-dark/40 text-sm font-medium">
                    Maitland, Florida
                  </p>
                  <p className="text-dark/30 text-xs mt-1">
                    Interactive map coming soon
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 space-y-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">
                    Full Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="rounded-lg border-dark/10 focus:border-gold"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">
                    Email Address <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="rounded-lg border-dark/10 focus:border-gold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="(352) 000-0000"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="rounded-lg border-dark/10 focus:border-gold"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="caseType">Case Type</Label>
                  <Select
                    value={formData.caseType}
                    onValueChange={(value) =>
                      setFormData({ ...formData, caseType: value })
                    }
                  >
                    <SelectTrigger className="rounded-lg border-dark/10 focus:border-gold">
                      <SelectValue placeholder="Select a practice area" />
                    </SelectTrigger>
                    <SelectContent>
                      {caseTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">
                  Message <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="message"
                  placeholder="Tell us about your legal matter..."
                  rows={5}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="rounded-lg border-dark/10 focus:border-gold resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gold hover:bg-gold-dark text-white rounded-lg py-6 text-base shadow-lg hover:shadow-xl transition-all group"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </div>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </>
                )}
              </Button>

              <p className="text-xs text-dark/40 text-center">
                By submitting this form, you agree to our privacy policy. All
                communications are confidential.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
