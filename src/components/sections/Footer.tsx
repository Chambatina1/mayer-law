'use client'

import { Phone, MapPin, Mail } from 'lucide-react'
import Image from 'next/image'

const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Practice Areas', href: '#practice-areas' },
  { label: 'News', href: '#news' },
  { label: 'Contact', href: '#contact' },
]

const practiceLinks = [
  'Consumer Finance Law',
  'Education Law & Civil Rights',
  'Personal Injury',
  'General Litigation & Consulting',
]

export default function Footer() {
  const handleNavClick = (href: string) => {
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="bg-dark border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <Image
                src="/mayer-law-logo.png"
                alt="Mayer Law Logo"
                width={40}
                height={40}
                className="w-10 h-10"
              />
              <div>
                <span className="font-serif text-xl font-bold text-white tracking-wide">
                  MAYER LAW
                </span>
                <span className="block text-[10px] tracking-[0.2em] uppercase text-gold">
                  P.A.
                </span>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              Resourcefully Relentless Representation. Through individual action, or
              class action, WE TAKE ACTION.
            </p>
            {/* Scales icon */}
            <Image
              src="/justice-scales.png"
              alt="Justice Scales"
              width={60}
              height={60}
              className="w-14 h-14 opacity-20"
            />
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-bold text-white mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault()
                      handleNavClick(link.href)
                    }}
                    className="text-white/50 hover:text-gold text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Practice Areas */}
          <div>
            <h4 className="font-serif text-lg font-bold text-white mb-6">
              Practice Areas
            </h4>
            <ul className="space-y-3">
              {practiceLinks.map((area) => (
                <li key={area}>
                  <span className="text-white/50 text-sm">{area}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-serif text-lg font-bold text-white mb-6">
              Contact Details
            </h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <span className="text-white/50 text-sm">
                  Maitland, Florida
                </span>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <a
                  href="tel:3524943657"
                  className="text-white/50 hover:text-gold text-sm transition-colors"
                >
                  (352) 494-3657
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <a
                  href="mailto:Nicole@MayerLawFlorida.com"
                  className="text-white/50 hover:text-gold text-sm transition-colors"
                >
                  Nicole@MayerLawFlorida.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs">
            &copy; 2025 Mayer Law. All Rights Reserved.
          </p>
          <div className="flex items-center gap-6 text-white/30 text-xs">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Disclaimer</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
