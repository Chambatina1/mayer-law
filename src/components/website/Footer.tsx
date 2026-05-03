'use client'

import Image from 'next/image'
import { Phone, Mail, MapPin } from 'lucide-react'
import { useAppStore } from '@/store/useAppStore'

const footerLinks = {
  navigation: [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#practice-areas' },
    { label: 'Reviews', href: '#testimonials' },
    { label: 'Contact', href: '#contact' },
  ],
  practiceAreas: [
    'Consumer Finance Law',
    'Education Law & Civil Rights',
    'Personal Injury',
    'General Litigation',
  ],
  practiceAreaLinks: [
    { name: 'Consumer Finance Law', href: '#practice-areas' },
    { name: 'Education Law & Civil Rights', href: '#practice-areas' },
    { name: 'Personal Injury', href: '#practice-areas' },
    { name: 'General Litigation', href: '#practice-areas' },
  ],
}

export default function Footer() {
  const { setView } = useAppStore()

  const handleNavClick = (href: string) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="bg-charcoal text-white/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <Image
                src="/mayer-assets/logo.png"
                alt="Mayer Law"
                width={40}
                height={40}
                className="w-10 h-10 brightness-0 invert"
              />
              <div>
                <p className="font-serif text-lg font-bold text-white">MAYER LAW</p>
                <p className="text-[10px] tracking-[0.2em] uppercase text-dusty-rose">P.A.</p>
              </div>
            </div>
            <p className="text-sm text-white/50 leading-relaxed mb-4">
              Resourcefully Relentless legal representation for individuals across Florida.
            </p>
            <div className="space-y-2">
              <a href="tel:3524943657" className="flex items-center gap-2 text-sm text-white/60 hover:text-dusty-rose transition-colors">
                <Phone className="w-4 h-4" />
                (352) 494-3657
              </a>
              <a href="mailto:Nicole@MayerLawFlorida.com" className="flex items-center gap-2 text-sm text-white/60 hover:text-dusty-rose transition-colors">
                <Mail className="w-4 h-4" />
                Nicole@MayerLawFlorida.com
              </a>
              <a
                href="https://maps.google.com/?q=Maitland,+Florida"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-white/60 hover:text-dusty-rose transition-colors"
              >
                <MapPin className="w-4 h-4" />
                Maitland, Florida
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-2">
              {footerLinks.navigation.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault()
                      handleNavClick(link.href)
                    }}
                    className="text-sm text-white/50 hover:text-dusty-rose transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Practice Areas */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Practice Areas</h4>
            <ul className="space-y-2">
              {footerLinks.practiceAreaLinks.map((area) => (
                <li key={area.name}>
                  <a
                    href={area.href}
                    onClick={(e) => {
                      e.preventDefault()
                      handleNavClick(area.href)
                    }}
                    className="text-sm text-white/50 hover:text-dusty-rose transition-colors"
                  >
                    {area.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setView('booking')}
                  className="text-sm text-white/50 hover:text-dusty-rose transition-colors"
                >
                  Schedule Consultation
                </button>
              </li>
              <li>
                <button
                  onClick={() => setView('portal')}
                  className="text-sm text-white/50 hover:text-dusty-rose transition-colors"
                >
                  Client Portal
                </button>
              </li>
              <li>
                <button
                  onClick={() => setView('review')}
                  className="text-sm text-white/50 hover:text-dusty-rose transition-colors"
                >
                  Leave a Review
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} Mayer Law, P.A. All rights reserved.
          </p>
          <button
            onClick={() => setView('admin')}
            className="text-xs text-white/20 hover:text-white/40 transition-colors"
          >
            Admin
          </button>
        </div>
      </div>
    </footer>
  )
}
