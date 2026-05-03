'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft, ArrowRight, Check, Calendar, Clock, User, FileText, Phone,
  CreditCard, Users, Briefcase, AlertCircle, MapPin, Info
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Calendar as CalendarComponent } from '@/components/ui/calendar'
import { useAppStore } from '@/store/useAppStore'
import { toast } from 'sonner'
import { addDays, format, isWeekend, isBefore, startOfDay } from 'date-fns'
import Image from 'next/image'

const services = [
  { id: 'Consumer Finance Law', icon: '/mayer-assets/icon-consumer.png', tagline: 'Your rights matter.' },
  { id: 'Education Law & Civil Rights', icon: '/mayer-assets/icon-education.png', tagline: 'Equal treatment, no exceptions.' },
  { id: 'Personal Injury', icon: '/mayer-assets/icon-injury.png', tagline: 'You deserve fair compensation.' },
  { id: 'General Litigation & Consulting', icon: '/mayer-assets/handshake-abstract.png', tagline: 'Practical solutions. Skilled advocacy.' },
]

const serviceIconMap: Record<string, string> = {
  'Consumer Finance Law': '/mayer-assets/icon-consumer.png',
  'Education Law & Civil Rights': '/mayer-assets/icon-education.png',
  'Personal Injury': '/mayer-assets/icon-injury.png',
  'General Litigation & Consulting': '/mayer-assets/handshake-abstract.png',
}

const timeSlots = [
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
  '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM',
]

export default function BookingPage() {
  const {
    bookingStep, selectedService, selectedDate, selectedTime,
    bookingName, bookingEmail, bookingPhone, bookingNotes,
    setBookingStep, setBookingService, setBookingDate, setBookingTime,
    setBookingField, resetBooking, setView
  } = useAppStore()

  const [submitting, setSubmitting] = useState(false)

  const handleServiceSelect = (service: string) => {
    setBookingService(service)
    setBookingStep(2)
  }

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      const formatted = format(date, 'yyyy-MM-dd')
      setBookingDate(formatted)
      setBookingStep(3)
    }
  }

  const handleTimeSelect = (time: string) => {
    setBookingTime(time)
    setBookingStep(4)
  }

  const handleConfirm = async () => {
    if (!bookingName || !bookingEmail || !bookingPhone) {
      toast.error('Please fill in all required fields.')
      return
    }
    setSubmitting(true)
    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: bookingName,
          email: bookingEmail,
          phone: bookingPhone,
          service: selectedService,
          date: selectedDate,
          time: selectedTime,
          notes: bookingNotes || undefined,
        }),
      })
      if (res.ok) {
        setBookingStep(5)
      } else {
        toast.error('Failed to book. Please try again.')
      }
    } catch {
      toast.error('Something went wrong.')
    }
    setSubmitting(false)
  }

  const handleBack = () => {
    if (bookingStep === 1) {
      resetBooking()
      setView('website')
    } else {
      setBookingStep(bookingStep - 1)
    }
  }

  const handleFinish = () => {
    resetBooking()
    setView('website')
  }

  const disabledDays = (date: Date) => {
    return isWeekend(date) || isBefore(date, startOfDay(new Date()))
  }

  const parsedDate = useMemo(() => {
    if (selectedDate) return new Date(selectedDate + 'T00:00:00')
    return undefined
  }, [selectedDate])

  const steps = [
    { label: 'Service', icon: Briefcase },
    { label: 'Date', icon: Calendar },
    { label: 'Time', icon: Clock },
    { label: 'Details', icon: User },
    { label: 'Confirm', icon: Check },
  ]

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-beige">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <Button variant="ghost" onClick={handleBack} className="text-medium-gray hover:text-charcoal">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="font-serif text-lg font-semibold text-charcoal">Book a Consultation</h1>
          <div className="w-16" />
        </div>

        {/* Step indicator */}
        <div className="max-w-3xl mx-auto px-4 pb-4">
          <div className="flex items-center justify-between">
            {steps.map((step, i) => {
              const stepNum = i + 1
              const isActive = stepNum === bookingStep
              const isCompleted = stepNum < bookingStep

              return (
                <div key={step.label} className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all ${
                    isCompleted ? 'step-completed' : isActive ? 'step-active' : 'step-inactive'
                  }`}>
                    {isCompleted ? <Check className="w-4 h-4" /> : stepNum}
                  </div>
                  <span className={`hidden sm:inline text-xs font-medium ${
                    isActive ? 'text-soft-gold' : 'text-medium-gray'
                  }`}>
                    {step.label}
                  </span>
                  {i < steps.length - 1 && (
                    <div className={`hidden sm:block w-8 lg:w-16 h-0.5 ${
                      isCompleted ? 'bg-sage' : 'bg-beige'
                    }`} />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {/* Step 1: Select Service */}
          {bookingStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="font-serif text-2xl font-bold text-charcoal mb-2">What do you need help with?</h2>
              <p className="text-medium-gray mb-4">Choose a practice area for your consultation.</p>
              <div className="bg-cream rounded-xl p-4 mb-6 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blush flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-dusty-rose" />
                </div>
                <div>
                  <p className="text-sm font-medium text-charcoal">In-Person & Virtual Available</p>
                  <p className="text-xs text-medium-gray mt-0.5">Most clients prefer in-person consultations at our Maitland office. Virtual appointments are also available upon request.</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {services.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => handleServiceSelect(s.id)}
                    className={`warm-card-hover bg-white rounded-2xl p-6 text-left transition-all ${
                      selectedService === s.id ? 'border-soft-gold shadow-md' : ''
                    }`}
                  >
                    <div className="w-12 h-12 rounded-xl bg-beige/80 flex items-center justify-center mb-4">
                      <Image src={s.icon} alt="" width={28} height={28} className="w-7 h-7 object-contain" />
                    </div>
                    <h3 className="font-serif font-semibold text-charcoal text-sm mb-1">{s.id}</h3>
                    <p className="text-medium-gray text-xs">{s.tagline}</p>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2: Select Date */}
          {bookingStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="font-serif text-2xl font-bold text-charcoal mb-2">Choose a date</h2>
              <p className="text-medium-gray mb-8">Select your preferred date. Weekends are unavailable.</p>

              <div className="flex justify-center">
                <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-beige">
                  <CalendarComponent
                    mode="single"
                    selected={parsedDate}
                    onSelect={handleDateSelect}
                    disabled={disabledDays}
                    className="rounded-xl"
                    classNames={{
                      months: 'flex flex-col sm:flex-row gap-2',
                      month: 'flex flex-col',
                      month_caption: 'flex justify-center pt-1 relative items-center mb-4',
                      caption_label: 'text-sm font-medium text-charcoal',
                      nav: 'flex items-center gap-1',
                      nav_button: 'h-8 w-8 rounded-lg bg-beige/50 hover:bg-beige text-charcoal inline-flex items-center justify-center',
                      month_grid: 'w-full border-collapse',
                      weekdays: 'flex',
                      weekday: 'text-xs font-medium text-charcoal/60 w-9 text-center',
                      week: 'flex w-full mt-2',
                      day: 'h-9 w-9 text-center text-sm relative mx-auto',
                      day_button: 'h-9 w-9 rounded-lg hover:bg-beige/60 flex items-center justify-center text-charcoal',
                      selected: 'bg-soft-gold text-white hover:bg-soft-gold hover:text-white',
                      today: 'bg-beige/40',
                      disabled: 'text-medium-gray opacity-40',
                      outside: 'text-medium-gray opacity-30',
                      range_middle: 'bg-beige/30',
                    }}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3: Select Time */}
          {bookingStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="font-serif text-2xl font-bold text-charcoal mb-2">Pick a time</h2>
              <p className="text-medium-gray mb-2">
                {selectedDate && format(new Date(selectedDate + 'T00:00:00'), 'EEEE, MMMM d, yyyy')}
              </p>
              <p className="text-medium-gray text-sm mb-8">Available slots in 30-minute intervals, 9 AM – 5 PM.</p>

              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => handleTimeSelect(time)}
                    className={`py-3 px-2 rounded-xl text-sm font-medium text-center transition-all border-2 ${
                      selectedTime === time
                        ? 'border-soft-gold bg-soft-gold text-white'
                        : 'border-beige bg-white text-charcoal hover:border-soft-gold/50 hover:bg-soft-gold/5'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 4: Your Details */}
          {bookingStep === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="font-serif text-2xl font-bold text-charcoal mb-2">Your details</h2>
              <p className="text-medium-gray mb-8">Almost there! Tell us about yourself.</p>

              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-beige space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="bk-name" className="text-charcoal text-sm font-medium mb-1.5 block">Full Name *</Label>
                    <Input
                      id="bk-name"
                      placeholder="Your name"
                      value={bookingName}
                      onChange={(e) => setBookingField('bookingName', e.target.value)}
                      className="border-beige focus:border-soft-gold rounded-xl"
                    />
                  </div>
                  <div>
                    <Label htmlFor="bk-email" className="text-charcoal text-sm font-medium mb-1.5 block">Email *</Label>
                    <Input
                      id="bk-email"
                      type="email"
                      placeholder="your@email.com"
                      value={bookingEmail}
                      onChange={(e) => setBookingField('bookingEmail', e.target.value)}
                      className="border-beige focus:border-soft-gold rounded-xl"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="bk-phone" className="text-charcoal text-sm font-medium mb-1.5 block">Phone *</Label>
                  <Input
                    id="bk-phone"
                    type="tel"
                    placeholder="(555) 000-0000"
                    value={bookingPhone}
                    onChange={(e) => setBookingField('bookingPhone', e.target.value)}
                    className="border-beige focus:border-soft-gold rounded-xl"
                  />
                </div>
                <div>
                  <Label htmlFor="bk-notes" className="text-charcoal text-sm font-medium mb-1.5 block">
                    Brief case description <span className="text-medium-gray font-normal">(optional)</span>
                  </Label>
                  <Textarea
                    id="bk-notes"
                    placeholder="Tell us briefly about your situation..."
                    rows={4}
                    value={bookingNotes}
                    onChange={(e) => setBookingField('bookingNotes', e.target.value)}
                    className="border-beige focus:border-soft-gold rounded-xl resize-none"
                  />
                </div>

                <Button
                  onClick={handleConfirm}
                  disabled={submitting}
                  className="w-full bg-soft-gold hover:bg-warm-gold text-white rounded-xl py-6 font-medium"
                >
                  {submitting ? 'Booking...' : 'Confirm Booking'}
                  {!submitting && <ArrowRight className="w-4 h-4 ml-2" />}
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 5: Confirmation */}
          {bookingStep === 5 && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <div className="bg-white rounded-2xl p-8 sm:p-12 border border-beige text-center">
                <div className="w-16 h-16 rounded-full bg-sage/50 flex items-center justify-center mx-auto mb-6">
                  <Check className="w-8 h-8 text-dark-gold" />
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal mb-2">
                  Booking Confirmed!
                </h2>
                <p className="text-medium-gray mb-8">
                  We&apos;ve received your consultation request.
                </p>

                {/* Summary */}
                <div className="bg-cream rounded-xl p-6 text-left space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <Briefcase className="w-5 h-5 text-soft-gold shrink-0" />
                    <div>
                      <p className="text-xs text-medium-gray uppercase tracking-wider">Service</p>
                      <p className="text-sm font-medium text-charcoal">{selectedService}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-soft-gold shrink-0" />
                    <div>
                      <p className="text-xs text-medium-gray uppercase tracking-wider">Date</p>
                      <p className="text-sm font-medium text-charcoal">
                        {selectedDate && format(new Date(selectedDate + 'T00:00:00'), 'EEEE, MMMM d, yyyy')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-soft-gold shrink-0" />
                    <div>
                      <p className="text-xs text-medium-gray uppercase tracking-wider">Time</p>
                      <p className="text-sm font-medium text-charcoal">{selectedTime}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-soft-gold shrink-0" />
                    <div>
                      <p className="text-xs text-medium-gray uppercase tracking-wider">Name</p>
                      <p className="text-sm font-medium text-charcoal">{bookingName}</p>
                    </div>
                  </div>
                </div>

                {/* Reminders */}
                <div className="bg-beige/50 rounded-xl p-4 mb-4">
                  <p className="text-xs text-medium-gray font-medium mb-2">You&apos;ll receive reminders at:</p>
                  <div className="flex items-center justify-center gap-6 text-sm text-charcoal">
                    <span>24 hours before</span>
                    <span>1 hour before</span>
                  </div>
                </div>

                {/* Pricing note */}
                <div className="bg-dusty-rose/5 border border-dusty-rose/20 rounded-xl p-4 mb-8">
                  <div className="flex items-start gap-3">
                    <Info className="w-4 h-4 text-dusty-rose shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-medium text-charcoal">Consultation Fee</p>
                      <p className="text-xs text-medium-gray mt-0.5">All legal services have a fee. Attorney Mayer will discuss pricing during your consultation based on your specific case needs.</p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button
                    onClick={handleFinish}
                    className="bg-soft-gold hover:bg-warm-gold text-white rounded-full px-8"
                  >
                    Back to Home
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
