'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ArrowLeft, Phone, Mail, User, MapPin, CheckCircle, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import SectionWrapper from '@/components/shared/SectionWrapper'
import Image from 'next/image'
import { useAppStore } from '@/store/useAppStore'

const practiceAreas = [
  {
    title: 'Consumer Finance Law',
    tagline: 'Your money. Your rights. We protect both.',
    description: 'If a bank, debt collector, or company has treated you unfairly, you have rights. We fight back when creditors break the rules, when your credit report is wrong, or when someone scams you out of your hard-earned money. You do not have to face financial bullies alone.',
    image: '/mayer-assets/practice-consumer-new.png',
    details: ['Debt Collection Abuse', 'Credit Report Errors', 'Consumer Fraud', 'Contract Disputes'],
    whatWeDo: 'We help you when banks, debt collectors, or companies treat you unfairly. Whether it\'s harassment from debt collectors, errors on your credit report, predatory lending, or outright scams — the law protects you, and we enforce those protections. Our attorney reviews every detail of your case to find the strongest path to resolution, whether through negotiation, dispute resolution, or litigation.',
    whoNeedsIt: 'Anyone who has been contacted aggressively by debt collectors, found errors on their credit report, been sold a defective product, or been the victim of a financial scam.',
    steps: [
      'Contact us — Call or fill out the form below with your financial situation details.',
      'Schedule a free initial consultation to discuss your case.',
      'Meet with Attorney Nicole Mayer to review documents and build a strategy.',
      'We take action — filing disputes, negotiating with creditors, or pursuing litigation on your behalf.',
    ],
  },
  {
    title: 'Education Law & Civil Rights',
    tagline: 'Every student deserves a fair chance.',
    description: 'When your child is not getting the support they need at school, or when you face discrimination at work or in public, the law is on your side. We help families navigate special education plans (IEP/504), fight discrimination, and defend professional licenses. Justice should not depend on who you are.',
    image: '/mayer-assets/practice-education-new.png',
    details: ['Special Education (IEP/504)', 'Employment Discrimination', 'Civil Rights Violations', 'Professional Licensing'],
    whatWeDo: 'We help families when schools don\'t provide the support children need — from Individualized Education Programs (IEPs) to 504 accommodations. We also fight employment discrimination, civil rights violations, and defend professional licenses. Every person deserves equal treatment under the law, regardless of background, disability, or circumstance.',
    whoNeedsIt: 'Parents whose children are not receiving appropriate educational support, individuals facing workplace discrimination, or professionals whose licenses are at risk.',
    steps: [
      'Contact us — Share your situation and what outcome you are seeking.',
      'Schedule a consultation to review school records, employment documents, or licensing issues.',
      'Meet with Attorney Mayer to understand your rights and evaluate your options.',
      'We advocate for you — attending meetings, filing complaints, or representing you in hearings.',
    ],
  },
  {
    title: 'Personal Injury',
    tagline: 'When you are hurt, we fight for what you deserve.',
    description: 'An accident can turn your life upside down — medical bills, lost wages, pain, and stress pile up fast. If someone else caused your injury, they should pay for it, not you. We build strong cases to get you the compensation you need to recover and move forward with your life.',
    image: '/mayer-assets/practice-injury-new.png',
    details: ['Car Accidents', 'Slip & Fall', 'Medical Malpractice', 'Wrongful Death'],
    whatWeDo: 'If you were hurt in an accident that wasn\'t your fault — a car crash, a slip and fall, medical negligence, or any other incident caused by someone else\'s carelessness — you deserve compensation. We investigate your case, gather evidence, negotiate with insurance companies, and take your case to trial if necessary to get you the best possible outcome.',
    whoNeedsIt: 'Anyone injured in an accident caused by another party\'s negligence, including car accidents, premises liability, medical malpractice, and wrongful death cases.',
    steps: [
      'Contact us — Tell us what happened. The sooner, the better for evidence preservation.',
      'Schedule a consultation so we can evaluate the strength of your case.',
      'Meet with Attorney Mayer to review medical records and discuss your recovery goals.',
      'We build your case — investigating, negotiating with insurers, and fighting for fair compensation.',
    ],
  },
  {
    title: 'General Litigation & Consulting',
    tagline: 'Smart legal solutions for real-life problems.',
    description: 'Not every legal problem fits into a neat category. Whether you have a business dispute, need a contract reviewed, or want strategic legal advice before making a big decision, we are here to help. Think of us as your legal partner — someone who explains things clearly and fights for your best outcome.',
    image: '/mayer-assets/practice-litigation-new.png',
    details: ['Business Disputes', 'Contract Review', 'Legal Strategy', 'Civil Litigation'],
    whatWeDo: 'For legal problems that don\'t fit a single category — business disputes, contract issues, landlord-tenant conflicts, or general civil litigation — we provide clear, strategic legal guidance. Whether you need a contract reviewed before signing, help resolving a business partnership dispute, or representation in civil court, we approach every case with creativity and determination.',
    whoNeedsIt: 'Business owners, professionals, or individuals facing legal disputes that require skilled negotiation, contract analysis, or civil litigation representation.',
    steps: [
      'Contact us — Describe your situation and what you hope to achieve.',
      'Schedule a consultation to discuss strategy and evaluate your legal options.',
      'Meet with Attorney Mayer for a thorough case review and action plan.',
      'We represent your interests — in negotiations, mediations, or court proceedings.',
    ],
  },
]

const GoogleLogo = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
)

export default function PracticeAreasSection() {
  const { setView, setActivePracticeArea, activePracticeArea } = useAppStore()
  const [intakeForm, setIntakeForm] = useState({
    name: '',
    phone: '',
    email: '',
    description: '',
    contactMethod: 'phone',
  })
  const [submitting, setSubmitting] = useState(false)

  const selectedArea = practiceAreas.find((a) => a.title === activePracticeArea)

  const handleCardClick = (areaTitle: string) => {
    setActivePracticeArea(areaTitle)
    // Scroll to the detail panel
    setTimeout(() => {
      const el = document.getElementById('practice-area-detail')
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }

  const handleBackToServices = () => {
    setActivePracticeArea(null)
    setTimeout(() => {
      const el = document.getElementById('practice-areas')
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }

  const handleIntakeChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setIntakeForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleIntakeSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!intakeForm.name || !intakeForm.phone || !intakeForm.email) {
      toast.error('Please fill in your name, phone, and email.')
      return
    }
    setSubmitting(true)
    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: intakeForm.name,
          email: intakeForm.email,
          phone: intakeForm.phone,
          service: activePracticeArea,
          notes: `[${intakeForm.contactMethod.toUpperCase()}] ${intakeForm.description}`,
        }),
      })
      if (res.ok) {
        toast.success('Consultation request sent! We will be in touch soon.')
        setIntakeForm({ name: '', phone: '', email: '', description: '', contactMethod: 'phone' })
      } else {
        toast.error('Failed to submit. Please try again.')
      }
    } catch {
      toast.error('Something went wrong. Please try again.')
    }
    setSubmitting(false)
  }

  return (
    <SectionWrapper id="practice-areas" className="bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12 lg:mb-16">
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-dusty-rose mb-3">
            How We Help You
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal mb-4">
            Our Legal Services
          </h2>
          <p className="text-medium-gray max-w-2xl mx-auto">
            Each service is designed to protect your rights and give you peace of mind. Click on any area to learn more and request a consultation.
          </p>
          <div className="accent-line mx-auto mt-4" />
        </div>

        {/* Cards grid */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 gap-8 transition-all duration-300 ${
          activePracticeArea ? 'opacity-50 pointer-events-none' : 'opacity-100'
        }`}>
          {practiceAreas.map((area, i) => (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div
                className={`group bg-white border rounded-2xl overflow-hidden h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer ${
                  activePracticeArea === area.title
                    ? 'border-dusty-rose shadow-lg shadow-dusty-rose/10'
                    : 'border-sand hover:border-dusty-rose hover:shadow-dusty-rose/10'
                }`}
                onClick={() => handleCardClick(area.title)}
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={area.image}
                    alt={area.title}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/20 to-transparent" />
                  <div className="absolute bottom-4 left-5 right-5">
                    <h3 className="font-serif text-xl font-bold text-white drop-shadow-sm">
                      {area.title}
                    </h3>
                    <p className="text-white/90 text-sm font-medium mt-1">
                      {area.tagline}
                    </p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6">
                  <p className="text-medium-gray text-sm leading-relaxed mb-4">
                    {area.description}
                  </p>

                  {/* Service tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {area.details.map((detail) => (
                      <span
                        key={detail}
                        className="text-xs px-2.5 py-1 bg-blush/60 text-charcoal/70 rounded-full font-medium"
                      >
                        {detail}
                      </span>
                    ))}
                  </div>

                  <Button
                    variant="ghost"
                    className="text-dusty-rose hover:text-deep-rose hover:bg-blush p-0 h-auto text-sm font-medium group/btn"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Detail Panel */}
        <AnimatePresence>
          {selectedArea && (
            <motion.div
              id="practice-area-detail"
              key="detail-panel"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="mt-10 border-t border-sand pt-10">
                {/* Back button */}
                <button
                  onClick={handleBackToServices}
                  className="flex items-center gap-2 text-sm text-medium-gray hover:text-dusty-rose transition-colors mb-8 group"
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  Back to Services
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 mb-12">
                  {/* Left: Image + Title */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="relative rounded-2xl overflow-hidden shadow-lg">
                      <Image
                        src={selectedArea.image}
                        alt={selectedArea.title}
                        width={700}
                        height={400}
                        className="w-full h-64 sm:h-80 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/20 to-transparent" />
                      <div className="absolute bottom-6 left-6 right-6">
                        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white drop-shadow-sm">
                          {selectedArea.title}
                        </h3>
                        <p className="text-white/90 text-base font-medium mt-1">
                          {selectedArea.tagline}
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Right: What We Do */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <h4 className="font-serif text-xl font-bold text-charcoal mb-3">What We Do</h4>
                    <p className="text-medium-gray leading-relaxed mb-6">
                      {selectedArea.whatWeDo}
                    </p>

                    <h4 className="font-serif text-lg font-bold text-charcoal mb-2">Who Needs This?</h4>
                    <p className="text-medium-gray text-sm leading-relaxed">
                      {selectedArea.whoNeedsIt}
                    </p>
                  </motion.div>
                </div>

                {/* Steps to Get Started */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-cream rounded-2xl p-6 sm:p-8 mb-12"
                >
                  <h4 className="font-serif text-xl font-bold text-charcoal mb-6 text-center">Steps to Get Started</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {selectedArea.steps.map((step, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-dusty-rose text-white flex items-center justify-center text-sm font-bold shrink-0">
                          {i + 1}
                        </div>
                        <p className="text-sm text-medium-gray leading-relaxed">{step}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Quick Intake Form */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="bg-white rounded-2xl border border-sand p-6 sm:p-8">
                    <div className="text-center mb-6">
                      <h4 className="font-serif text-xl font-bold text-charcoal mb-2">Request a Consultation</h4>
                      <p className="text-sm text-medium-gray">
                        Fill out this quick form and Attorney Nicole Mayer will reach out to you.
                      </p>
                      <p className="text-xs text-dusty-rose font-medium mt-1">
                        Service: {selectedArea.title}
                      </p>
                    </div>

                    <form onSubmit={handleIntakeSubmit} className="space-y-4 max-w-lg mx-auto">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="intake-name" className="text-sm font-medium text-charcoal">Name *</Label>
                          <Input
                            id="intake-name"
                            name="name"
                            required
                            value={intakeForm.name}
                            onChange={handleIntakeChange}
                            placeholder="Your name"
                            className="border-sand focus:border-dusty-rose focus:ring-dusty-rose bg-cream/50"
                          />
                        </div>
                        <div>
                          <Label htmlFor="intake-phone" className="text-sm font-medium text-charcoal">Phone *</Label>
                          <Input
                            id="intake-phone"
                            name="phone"
                            type="tel"
                            required
                            value={intakeForm.phone}
                            onChange={handleIntakeChange}
                            placeholder="(352) 000-0000"
                            className="border-sand focus:border-dusty-rose focus:ring-dusty-rose bg-cream/50"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="intake-email" className="text-sm font-medium text-charcoal">Email *</Label>
                        <Input
                          id="intake-email"
                          name="email"
                          type="email"
                          required
                          value={intakeForm.email}
                          onChange={handleIntakeChange}
                          placeholder="your@email.com"
                          className="border-sand focus:border-dusty-rose focus:ring-dusty-rose bg-cream/50"
                        />
                      </div>

                      <div>
                        <Label htmlFor="intake-desc" className="text-sm font-medium text-charcoal">Brief Description of Your Issue</Label>
                        <Textarea
                          id="intake-desc"
                          name="description"
                          rows={3}
                          value={intakeForm.description}
                          onChange={handleIntakeChange}
                          placeholder="Tell us briefly about your situation..."
                          className="border-sand focus:border-dusty-rose focus:ring-dusty-rose bg-cream/50 resize-none"
                        />
                      </div>

                      {/* Preferred contact method */}
                      <div>
                        <Label className="text-sm font-medium text-charcoal mb-2 block">Preferred Contact Method</Label>
                        <div className="flex flex-wrap gap-2">
                          {[
                            { value: 'phone', label: 'Phone', icon: Phone },
                            { value: 'email', label: 'Email', icon: Mail },
                            { value: 'in-person', label: 'In-Person', icon: MapPin },
                          ].map((method) => (
                            <button
                              key={method.value}
                              type="button"
                              onClick={() => setIntakeForm((prev) => ({ ...prev, contactMethod: method.value }))}
                              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                                intakeForm.contactMethod === method.value
                                  ? 'bg-dusty-rose text-white'
                                  : 'bg-cream text-medium-gray hover:bg-blush'
                              }`}
                            >
                              <method.icon className="w-4 h-4" />
                              {method.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3 pt-2">
                        <Button
                          type="submit"
                          disabled={submitting}
                          className="flex-1 bg-dusty-rose hover:bg-deep-rose text-white rounded-full py-5 text-base font-semibold"
                        >
                          {submitting ? (
                            'Submitting...'
                          ) : (
                            <>
                              <Send className="w-4 h-4 mr-2" />
                              Request Consultation
                            </>
                          )}
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setView('booking')}
                          className="rounded-full py-5 px-6 border-sand text-medium-gray hover:bg-cream"
                        >
                          <User className="w-4 h-4 mr-2" />
                          Full Booking
                        </Button>
                      </div>
                    </form>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pricing note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-xs sm:text-sm text-medium-gray italic">
            Attorney Nicole Mayer is available for consultation. All legal services have a fee — because quality legal representation is an investment in your future.
            <span className="block mt-1 text-dusty-rose font-medium">
              Contact us to discuss pricing for your specific case.
            </span>
          </p>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
