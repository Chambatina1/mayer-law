'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
import { Calendar } from '@/components/ui/calendar'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useAppStore } from '@/store/useAppStore'
import { useToast } from '@/hooks/use-toast'
import {
  Shield,
  GraduationCap,
  HeartPulse,
  Scale,
  ChevronRight,
  ChevronLeft,
  Check,
  CalendarDays,
  Clock,
  User,
  PartyPopper,
} from 'lucide-react'
import { format, addDays, isWeekend, isSameDay, isBefore, startOfDay } from 'date-fns'

const practiceAreas = [
  { name: 'Consumer Finance Law', icon: Shield },
  { name: 'Education Law & Civil Rights', icon: GraduationCap },
  { name: 'Personal Injury', icon: HeartPulse },
  { name: 'General Litigation & Consulting', icon: Scale },
]

const timeSlots = [
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
  '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM',
]

export default function AppointmentModal() {
  const { appointmentModalOpen, setAppointmentModalOpen, selectedPracticeArea, setSelectedPracticeArea } = useAppStore()
  const { toast } = useToast()
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [booking, setBooking] = useState({
    practiceArea: selectedPracticeArea || '',
    date: undefined as Date | undefined,
    time: '',
    name: '',
    email: '',
    phone: '',
  })

  const totalSteps = 4

  const canProceed = () => {
    switch (step) {
      case 1:
        return booking.practiceArea !== ''
      case 2:
        return booking.date !== undefined
      case 3:
        return booking.time !== ''
      case 4:
        return booking.name !== '' && booking.email !== '' && booking.phone !== ''
      default:
        return false
    }
  }

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: booking.name,
          email: booking.email,
          phone: booking.phone,
          practiceArea: booking.practiceArea,
          date: format(booking.date!, 'yyyy-MM-dd'),
          time: booking.time,
        }),
      })

      if (res.ok) {
        setStep(5) // Success step
        toast({
          title: 'Appointment Scheduled!',
          description: `Your consultation has been booked for ${format(booking.date!, 'MMMM d, yyyy')} at ${booking.time}.`,
        })
      } else {
        throw new Error('Failed to book')
      }
    } catch {
      toast({
        title: 'Booking Error',
        description: 'Failed to schedule appointment. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = (open: boolean) => {
    if (!open) {
      setStep(1)
      setBooking({
        practiceArea: '',
        date: undefined,
        time: '',
        name: '',
        email: '',
        phone: '',
      })
      setSelectedPracticeArea('')
    }
    setAppointmentModalOpen(open)
  }

  const stepLabels = ['Practice Area', 'Date', 'Time', 'Your Info']

  return (
    <Dialog open={appointmentModalOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader className="sr-only">
          <DialogTitle>Schedule a Consultation</DialogTitle>
          <DialogDescription>Book your appointment with Mayer Law</DialogDescription>
        </DialogHeader>

        <div className="p-6 sm:p-8">
          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {stepLabels.map((label, index) => (
              <div key={label} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      index + 1 < step
                        ? 'bg-gold text-white'
                        : index + 1 === step
                        ? 'bg-gold text-white ring-4 ring-gold/20'
                        : 'bg-dark/5 text-dark/30'
                    }`}
                  >
                    {index + 1 < step ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  <span
                    className={`text-[10px] mt-1 hidden sm:block ${
                      index + 1 === step ? 'text-gold font-semibold' : 'text-dark/30'
                    }`}
                  >
                    {label}
                  </span>
                </div>
                {index < stepLabels.length - 1 && (
                  <div
                    className={`w-8 sm:w-12 h-0.5 mx-1 transition-colors ${
                      index + 1 < step ? 'bg-gold' : 'bg-dark/10'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Step Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {step === 1 && (
                <div>
                  <div className="text-center mb-6">
                    <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
                      <Scale className="w-7 h-7 text-gold" />
                    </div>
                    <h3 className="font-serif text-xl font-bold text-dark">
                      Select Practice Area
                    </h3>
                    <p className="text-dark/50 text-sm mt-1">
                      What area of law do you need help with?
                    </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {practiceAreas.map((area) => {
                      const Icon = area.icon
                      const isSelected = booking.practiceArea === area.name
                      return (
                        <button
                          key={area.name}
                          onClick={() =>
                            setBooking({ ...booking, practiceArea: area.name })
                          }
                          className={`flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all ${
                            isSelected
                              ? 'border-gold bg-gold/5 shadow-sm'
                              : 'border-dark/5 hover:border-gold/30'
                          }`}
                        >
                          <div
                            className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                              isSelected ? 'bg-gold text-white' : 'bg-dark/5 text-dark/40'
                            }`}
                          >
                            <Icon className="w-5 h-5" />
                          </div>
                          <span
                            className={`text-sm font-medium ${
                              isSelected ? 'text-dark' : 'text-dark/70'
                            }`}
                          >
                            {area.name}
                          </span>
                          {isSelected && (
                            <Check className="w-4 h-4 text-gold ml-auto" />
                          )}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <div className="text-center mb-6">
                    <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
                      <CalendarDays className="w-7 h-7 text-gold" />
                    </div>
                    <h3 className="font-serif text-xl font-bold text-dark">
                      Pick a Date
                    </h3>
                    <p className="text-dark/50 text-sm mt-1">
                      Select your preferred consultation date
                    </p>
                  </div>
                  <div className="flex justify-center">
                    <Calendar
                      mode="single"
                      selected={booking.date}
                      onSelect={(date) => setBooking({ ...booking, date })}
                      disabled={(date) =>
                        isWeekend(date) || isBefore(date, startOfDay(new Date()))
                      }
                      className="rounded-xl border border-dark/5 p-3"
                    />
                  </div>
                  {booking.date && (
                    <p className="text-center text-sm text-gold font-medium mt-4">
                      Selected: {format(booking.date, 'EEEE, MMMM d, yyyy')}
                    </p>
                  )}
                </div>
              )}

              {step === 3 && (
                <div>
                  <div className="text-center mb-6">
                    <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
                      <Clock className="w-7 h-7 text-gold" />
                    </div>
                    <h3 className="font-serif text-xl font-bold text-dark">
                      Pick a Time
                    </h3>
                    <p className="text-dark/50 text-sm mt-1">
                      Available time slots for{' '}
                      {booking.date && format(booking.date, 'MMMM d')}
                    </p>
                  </div>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-64 overflow-y-auto">
                    {timeSlots.map((time) => {
                      const isSelected = booking.time === time
                      return (
                        <button
                          key={time}
                          onClick={() => setBooking({ ...booking, time })}
                          className={`py-2.5 px-3 rounded-lg text-sm font-medium transition-all border ${
                            isSelected
                              ? 'bg-gold text-white border-gold shadow-sm'
                              : 'border-dark/5 text-dark/60 hover:border-gold/30 hover:text-gold'
                          }`}
                        >
                          {time}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}

              {step === 4 && (
                <div>
                  <div className="text-center mb-6">
                    <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
                      <User className="w-7 h-7 text-gold" />
                    </div>
                    <h3 className="font-serif text-xl font-bold text-dark">
                      Your Information
                    </h3>
                    <p className="text-dark/50 text-sm mt-1">
                      Please provide your contact details
                    </p>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="appt-name">Full Name *</Label>
                      <Input
                        id="appt-name"
                        placeholder="John Doe"
                        value={booking.name}
                        onChange={(e) =>
                          setBooking({ ...booking, name: e.target.value })
                        }
                        className="rounded-lg border-dark/10 focus:border-gold"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="appt-email">Email Address *</Label>
                      <Input
                        id="appt-email"
                        type="email"
                        placeholder="john@example.com"
                        value={booking.email}
                        onChange={(e) =>
                          setBooking({ ...booking, email: e.target.value })
                        }
                        className="rounded-lg border-dark/10 focus:border-gold"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="appt-phone">Phone Number *</Label>
                      <Input
                        id="appt-phone"
                        type="tel"
                        placeholder="(352) 000-0000"
                        value={booking.phone}
                        onChange={(e) =>
                          setBooking({ ...booking, phone: e.target.value })
                        }
                        className="rounded-lg border-dark/10 focus:border-gold"
                      />
                    </div>

                    {/* Summary */}
                    <div className="p-4 rounded-xl bg-dark/[0.03] border border-dark/5 space-y-2">
                      <p className="text-xs font-semibold text-dark/50 uppercase tracking-wider">
                        Appointment Summary
                      </p>
                      <div className="flex justify-between text-sm">
                        <span className="text-dark/50">Practice Area:</span>
                        <span className="font-medium text-dark">
                          {booking.practiceArea}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-dark/50">Date:</span>
                        <span className="font-medium text-dark">
                          {booking.date && format(booking.date, 'MMMM d, yyyy')}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-dark/50">Time:</span>
                        <span className="font-medium text-dark">{booking.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === 5 && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-center py-8"
                >
                  <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                    <PartyPopper className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-dark mb-3">
                    Appointment Confirmed!
                  </h3>
                  <p className="text-dark/60 mb-6">
                    Your consultation has been successfully scheduled. We&apos;ll send a
                    confirmation email with all the details.
                  </p>
                  <div className="p-4 rounded-xl bg-gold/5 border border-gold/20 space-y-2 text-left max-w-xs mx-auto">
                    <div className="flex justify-between text-sm">
                      <span className="text-dark/50">Date:</span>
                      <span className="font-medium text-dark">
                        {booking.date && format(booking.date, 'MMMM d, yyyy')}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-dark/50">Time:</span>
                      <span className="font-medium text-dark">{booking.time}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-dark/50">Area:</span>
                      <span className="font-medium text-dark text-right max-w-[200px]">
                        {booking.practiceArea}
                      </span>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleClose(false)}
                    className="mt-8 bg-gold hover:bg-gold-dark text-white rounded-full px-8"
                  >
                    Done
                  </Button>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          {step < 5 && (
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-dark/5">
              <Button
                variant="ghost"
                onClick={step === 1 ? () => handleClose(false) : handleBack}
                className="text-dark/50 hover:text-dark"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                {step === 1 ? 'Cancel' : 'Back'}
              </Button>
              {step < totalSteps ? (
                <Button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="bg-gold hover:bg-gold-dark text-white rounded-full px-6 disabled:opacity-40"
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={!canProceed() || isSubmitting}
                  className="bg-gold hover:bg-gold-dark text-white rounded-full px-6 disabled:opacity-40"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Booking...
                    </div>
                  ) : (
                    <>
                      Confirm Booking
                      <Check className="w-4 h-4 ml-1" />
                    </>
                  )}
                </Button>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
