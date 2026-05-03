'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Menu, Phone, Calendar, UserCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet'
import { useAppStore } from '@/store/useAppStore'
import Image from 'next/image'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#practice-areas' },
  { label: 'Reviews', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const { setView, mobileMenuOpen, setMobileMenuOpen } = useAppStore()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-beige'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); handleNavClick('#home') }}
            className="flex items-center gap-3 shrink-0"
          >
            <Image
              src="/mayer-assets/logo.png"
              alt="Mayer Law Logo"
              width={48}
              height={48}
              className="w-10 h-10 lg:w-12 lg:h-12"
            />
            <div className="flex flex-col">
              <span className={`font-serif text-xl lg:text-2xl font-bold tracking-wide transition-colors ${scrolled ? 'text-charcoal' : 'text-charcoal'}`}>
                MAYER LAW
              </span>
              <span className="text-[10px] lg:text-xs tracking-[0.2em] uppercase text-soft-gold">
                P.A.
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
                className="text-sm font-medium tracking-wide text-charcoal/70 hover:text-soft-gold transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:3524943657"
              className="flex items-center gap-2 text-sm font-medium text-medium-gray hover:text-soft-gold transition-colors mr-1"
            >
              <Phone className="w-4 h-4" />
              (352) 494-3657
            </a>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setView('portal')}
              className="text-medium-gray hover:text-soft-gold rounded-full px-3"
            >
              <UserCircle className="w-4 h-4 mr-1.5" />
              Portal
            </Button>
            <Button
              onClick={() => setView('booking')}
              className="bg-soft-gold hover:bg-warm-gold text-white rounded-full px-5 shadow-sm hover:shadow-md transition-all"
              size="sm"
            >
              <Calendar className="w-4 h-4 mr-1.5" />
              Book a Call
            </Button>
          </div>

          {/* Mobile Menu */}
          <div className="flex lg:hidden items-center gap-2">
            <a
              href="tel:3524943657"
              className="p-2 rounded-full text-charcoal"
              aria-label="Call us"
            >
              <Phone className="w-5 h-5" />
            </a>
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <button
                  className="p-2 rounded-lg text-charcoal hover:bg-beige/50 transition-colors"
                  aria-label="Open menu"
                >
                  <Menu className="w-6 h-6" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-white p-0">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <div className="flex flex-col h-full">
                  <div className="flex items-center gap-3 p-6 border-b border-beige">
                    <Image src="/mayer-assets/logo.png" alt="Mayer Law" width={40} height={40} className="w-10 h-10" />
                    <span className="font-serif text-xl font-bold text-charcoal">MAYER LAW</span>
                  </div>

                  <nav className="flex-1 py-4" aria-label="Mobile navigation">
                    {navLinks.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
                        className="flex items-center px-6 py-4 text-charcoal/80 hover:text-soft-gold hover:bg-beige/30 transition-colors text-base font-medium"
                      >
                        {link.label}
                      </a>
                    ))}
                  </nav>

                  <div className="p-6 space-y-3 border-t border-beige">
                    <Button variant="ghost" className="w-full text-medium-gray hover:text-soft-gold rounded-full" onClick={() => { setView('portal'); setMobileMenuOpen(false) }}>
                      <UserCircle className="w-4 h-4 mr-2" />
                      Client Portal
                    </Button>
                    <Button
                      className="w-full bg-soft-gold hover:bg-warm-gold text-white rounded-full shadow-lg"
                      onClick={() => { setView('booking'); setMobileMenuOpen(false) }}
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Book a Call
                    </Button>
                    <a href="tel:3524943657" className="flex items-center justify-center gap-2 py-3 text-sm text-medium-gray">
                      <Phone className="w-4 h-4" />
                      (352) 494-3657
                    </a>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  )
}
