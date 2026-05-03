'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Menu, Phone, Calendar, UserCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet'
import { useAppStore } from '@/store/useAppStore'
import Image from 'next/image'

const socialLinks = [
  { name: 'Facebook', href: 'https://facebook.com/MayerLawFlorida', icon: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
  { name: 'Instagram', href: 'https://instagram.com/MayerLawFlorida', icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z' },
  { name: 'TikTok', href: 'https://tiktok.com/@MayerLawFlorida', icon: 'M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z' },
]

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
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-sand'
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
              <span className={`font-serif text-xl lg:text-2xl font-bold tracking-wide ${scrolled ? 'text-charcoal' : 'text-white'}`}>
                MAYER LAW
              </span>
              <span className="text-[10px] lg:text-xs tracking-[0.2em] uppercase text-dusty-rose">
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
                className={`text-sm font-medium tracking-wide transition-colors ${scrolled ? 'text-charcoal/70 hover:text-dusty-rose' : 'text-white/70 hover:text-white'}`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Social icons */}
            <div className="flex items-center gap-1.5 mr-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-1.5 rounded-full transition-colors ${scrolled ? 'text-charcoal/40 hover:text-dusty-rose hover:bg-blush' : 'text-white/40 hover:text-white hover:bg-white/10'}`}
                  aria-label={social.name}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d={social.icon} /></svg>
                </a>
              ))}
            </div>

            <a
              href="tel:3524943657"
              className={`flex items-center gap-2 text-sm font-medium transition-colors mr-1 ${scrolled ? 'text-medium-gray hover:text-dusty-rose' : 'text-white/70 hover:text-white'}`}
            >
              <Phone className="w-4 h-4" />
              (352) 494-3657
            </a>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setView('portal')}
              className={`rounded-full px-3 ${scrolled ? 'text-medium-gray hover:text-dusty-rose' : 'text-white/70 hover:text-white'}`}
            >
              <UserCircle className="w-4 h-4 mr-1.5" />
              Portal
            </Button>
            <Button
              onClick={() => setView('booking')}
              className="bg-dusty-rose hover:bg-deep-rose text-white rounded-full px-5 shadow-sm hover:shadow-md transition-all"
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
              className={`p-2 rounded-full ${scrolled ? 'text-charcoal' : 'text-white'}`}
              aria-label="Call us"
            >
              <Phone className="w-5 h-5" />
            </a>
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <button
                  className={`p-2 rounded-lg transition-colors ${scrolled ? 'text-charcoal hover:bg-blush/50' : 'text-white hover:bg-white/10'}`}
                  aria-label="Open menu"
                >
                  <Menu className="w-6 h-6" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-white p-0">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <div className="flex flex-col h-full">
                  <div className="flex items-center gap-3 p-6 border-b border-sand">
                    <Image src="/mayer-assets/logo.png" alt="Mayer Law" width={40} height={40} className="w-10 h-10" />
                    <span className="font-serif text-xl font-bold text-charcoal">MAYER LAW</span>
                  </div>

                  <nav className="flex-1 py-4" aria-label="Mobile navigation">
                    {navLinks.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
                        className="flex items-center px-6 py-4 text-charcoal/80 hover:text-dusty-rose hover:bg-blush/30 transition-colors text-base font-medium"
                      >
                        {link.label}
                      </a>
                    ))}
                  </nav>

                  {/* Social links in mobile */}
                  <div className="px-6 py-3 border-t border-sand">
                    <div className="flex items-center gap-3">
                      {socialLinks.map((social) => (
                        <a
                          key={social.name}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-full text-charcoal/40 hover:text-dusty-rose hover:bg-blush/30 transition-colors"
                          aria-label={social.name}
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d={social.icon} /></svg>
                        </a>
                      ))}
                    </div>
                  </div>

                  <div className="p-6 space-y-3 border-t border-sand">
                    <Button variant="ghost" className="w-full text-medium-gray hover:text-dusty-rose rounded-full" onClick={() => { setView('portal'); setMobileMenuOpen(false) }}>
                      <UserCircle className="w-4 h-4 mr-2" />
                      Client Portal
                    </Button>
                    <Button
                      className="w-full bg-dusty-rose hover:bg-deep-rose text-white rounded-full shadow-lg"
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
