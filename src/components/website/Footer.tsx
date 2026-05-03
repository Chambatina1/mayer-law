'use client'

import Image from 'next/image'
import { Phone, Mail, MapPin, ArrowUp } from 'lucide-react'
import { useAppStore } from '@/store/useAppStore'

const practiceAreaLinks = [
  'Consumer Finance Law',
  'Education Law & Civil Rights',
  'Personal Injury',
  'General Litigation',
]

export default function Footer() {
  const { setView } = useAppStore()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-charcoal text-white/70 py-12 md:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/mayer-assets/logo.png"
                alt="Mayer Law"
                width={40}
                height={40}
                className="w-10 h-10 brightness-0 invert"
              />
              <div>
                <span className="font-serif text-lg font-bold text-white block">MAYER LAW</span>
                <span className="text-[10px] tracking-[0.2em] uppercase text-soft-gold">P.A.</span>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-white/50">
              Resourcefully Relentless. Protecting your rights across Florida.
            </p>
          </div>

          {/* Practice Areas */}
          <div>
            <h4 className="font-semibold text-white text-sm uppercase tracking-wider mb-4">Practice Areas</h4>
            <ul className="space-y-2">
              {practiceAreaLinks.map((area) => (
                <li key={area}>
                  <button
                    onClick={() => {
                      setView('website')
                      setTimeout(() => {
                        const el = document.querySelector('#practice-areas')
                        if (el) el.scrollIntoView({ behavior: 'smooth' })
                      }, 100)
                    }}
                    className="text-sm text-white/50 hover:text-soft-gold transition-colors"
                  >
                    {area}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white text-sm uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['Home', 'About', 'Reviews', 'Contact'].map((link) => (
                <li key={link}>
                  <button
                    onClick={() => {
                      setView('website')
                      setTimeout(() => {
                        const id = link === 'Home' ? '#home' : link === 'About' ? '#about' : link === 'Reviews' ? '#testimonials' : '#contact'
                        const el = document.querySelector(id)
                        if (el) el.scrollIntoView({ behavior: 'smooth' })
                      }, 100)
                    }}
                    className="text-sm text-white/50 hover:text-soft-gold transition-colors"
                  >
                    {link}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => setView('booking')}
                  className="text-sm text-white/50 hover:text-soft-gold transition-colors"
                >
                  Book a Consultation
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white text-sm uppercase tracking-wider mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-soft-gold shrink-0" />
                <a href="tel:3524943657" className="text-sm text-white/50 hover:text-soft-gold transition-colors">
                  (352) 494-3657
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-soft-gold shrink-0" />
                <a href="mailto:Nicole@MayerLawFlorida.com" className="text-sm text-white/50 hover:text-soft-gold transition-colors break-all">
                  Nicole@MayerLawFlorida.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-soft-gold shrink-0 mt-0.5" />
                <span className="text-sm text-white/50">Maitland, Florida</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            © 2025 Mayer Law. All Rights Reserved.
          </p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setView('admin')}
              className="text-xs text-white/20 hover:text-white/40 transition-colors"
            >
              Admin
            </button>
            <button
              onClick={scrollToTop}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-soft-gold flex items-center justify-center transition-colors"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
