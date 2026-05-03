'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone, UserCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet'
import { useAppStore } from '@/store/useAppStore'
import Image from 'next/image'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Practice Areas', href: '#practice-areas' },
  { label: 'News', href: '#news' },
  { label: 'Contact', href: '#contact' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const { setAppointmentModalOpen, setClientPortalOpen } = useAppStore()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (href: string) => {
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gold/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault()
              handleNavClick('#home')
            }}
            className="flex items-center gap-3 shrink-0"
          >
            <Image
              src="/mayer-law-logo.png"
              alt="Mayer Law Logo"
              width={48}
              height={48}
              className="w-10 h-10 lg:w-12 lg:h-12"
            />
            <div className="flex flex-col">
              <span
                className={`font-serif text-xl lg:text-2xl font-bold tracking-wide transition-colors ${
                  scrolled ? 'text-dark' : 'text-white'
                }`}
              >
                MAYER LAW
              </span>
              <span
                className={`text-[10px] lg:text-xs tracking-[0.2em] uppercase transition-colors ${
                  scrolled ? 'text-gold' : 'text-gold-light'
                }`}
              >
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
                onClick={(e) => {
                  e.preventDefault()
                  handleNavClick(link.href)
                }}
                className={`text-sm font-medium tracking-wide hover:text-gold transition-colors ${
                  scrolled ? 'text-dark/80' : 'text-white/90'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:3524943657"
              className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                scrolled ? 'text-dark/70 hover:text-gold' : 'text-white/80 hover:text-gold-light'
              }`}
            >
              <Phone className="w-4 h-4" />
              (352) 494-3657
            </a>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setClientPortalOpen(true)}
              className={`rounded-full px-4 ${
                scrolled
                  ? 'border-gold text-gold hover:bg-gold hover:text-white'
                  : 'border-white/40 text-white hover:bg-white/10'
              }`}
            >
              <UserCircle className="w-4 h-4 mr-2" />
              Client Portal
            </Button>
            <Button
              onClick={() => setAppointmentModalOpen(true)}
              className="bg-gold hover:bg-gold-dark text-white rounded-full px-6 shadow-lg hover:shadow-xl transition-all"
              size="sm"
            >
              Schedule Consultation
            </Button>
          </div>

          {/* Mobile Menu */}
          <div className="flex lg:hidden items-center gap-2">
            <a
              href="tel:3524943657"
              className={`p-2 rounded-full transition-colors ${
                scrolled ? 'text-dark' : 'text-white'
              }`}
              aria-label="Call us"
            >
              <Phone className="w-5 h-5" />
            </a>
            <Sheet>
              <SheetTrigger asChild>
                <button
                  className={`p-2 rounded-lg transition-colors ${
                    scrolled ? 'text-dark hover:bg-dark/5' : 'text-white hover:bg-white/10'
                  }`}
                  aria-label="Open menu"
                >
                  <Menu className="w-6 h-6" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-white p-0">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <div className="flex flex-col h-full">
                  {/* Mobile Header */}
                  <div className="flex items-center gap-3 p-6 border-b border-gold/20">
                    <Image
                      src="/mayer-law-logo.png"
                      alt="Mayer Law Logo"
                      width={40}
                      height={40}
                      className="w-10 h-10"
                    />
                    <span className="font-serif text-xl font-bold text-dark">
                      MAYER LAW
                    </span>
                  </div>

                  {/* Mobile Nav Links */}
                  <nav className="flex-1 py-4" aria-label="Mobile navigation">
                    {navLinks.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        onClick={(e) => {
                          e.preventDefault()
                          handleNavClick(link.href)
                          const trigger = document.querySelector('[data-radix-collection-item]')?.closest('[role="dialog"]')?.querySelector('button[type="button"]') as HTMLButtonElement
                          trigger?.click()
                        }}
                        className="flex items-center px-6 py-4 text-dark/80 hover:text-gold hover:bg-gold/5 transition-colors text-base font-medium"
                      >
                        {link.label}
                      </a>
                    ))}
                  </nav>

                  {/* Mobile Footer */}
                  <div className="p-6 space-y-3 border-t border-gold/20">
                    <Button
                      variant="outline"
                      className="w-full border-gold text-gold hover:bg-gold hover:text-white rounded-full"
                      onClick={() => setClientPortalOpen(true)}
                    >
                      <UserCircle className="w-4 h-4 mr-2" />
                      Client Portal
                    </Button>
                    <Button
                      className="w-full bg-gold hover:bg-gold-dark text-white rounded-full shadow-lg"
                      onClick={() => setAppointmentModalOpen(true)}
                    >
                      Schedule Consultation
                    </Button>
                    <a
                      href="tel:3524943657"
                      className="flex items-center justify-center gap-2 py-3 text-sm text-dark/60"
                    >
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
