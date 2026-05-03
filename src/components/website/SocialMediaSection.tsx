'use client'

import { motion } from 'framer-motion'
import SectionWrapper from '@/components/shared/SectionWrapper'

const socialLinks = [
  {
    name: 'Facebook',
    handle: '@MayerLawFlorida',
    href: 'https://facebook.com/MayerLawFlorida',
    color: 'from-blue-500 to-blue-700',
    iconBg: 'bg-blue-500',
    description: 'Follow us for legal tips, case updates, and community news. Join thousands who trust Mayer Law.',
    icon: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
  },
  {
    name: 'Instagram',
    handle: '@MayerLawFlorida',
    href: 'https://instagram.com/MayerLawFlorida',
    color: 'from-pink-500 via-purple-500 to-orange-400',
    iconBg: 'bg-gradient-to-br from-pink-500 to-purple-600',
    description: 'Behind-the-scenes, client success stories, and legal education. See the human side of Mayer Law.',
    icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z',
  },
  {
    name: 'TikTok',
    handle: '@MayerLawFlorida',
    href: 'https://tiktok.com/@MayerLawFlorida',
    color: 'from-gray-900 via-gray-800 to-gray-900',
    iconBg: 'bg-gray-900',
    description: 'Short legal tips, myth-busting, and quick answers to your legal questions. Fun and informative.',
    icon: 'M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z',
  },
]

export default function SocialMediaSection() {
  return (
    <SectionWrapper id="social" className="bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-dusty-rose mb-3">
            Stay Connected
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal mb-4">
            Follow Us on Social Media
          </h2>
          <p className="text-medium-gray max-w-2xl mx-auto">
            Get legal tips, news, and updates from Attorney Nicole Mayer. We share knowledge so you can make informed decisions.
          </p>
          <div className="accent-line mx-auto mt-4" />
        </div>

        {/* Social cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {socialLinks.map((social, i) => (
            <motion.a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="group relative overflow-hidden rounded-2xl border border-sand hover:border-transparent hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Gradient top bar */}
              <div className={`h-2 bg-gradient-to-r ${social.color}`} />

              <div className="p-6 bg-white">
                {/* Icon + Name */}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 ${social.iconBg} rounded-xl flex items-center justify-center shadow-sm`}>
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d={social.icon} />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-charcoal">{social.name}</h3>
                    <p className="text-xs text-medium-gray">{social.handle}</p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-medium-gray leading-relaxed mb-4">
                  {social.description}
                </p>

                {/* CTA */}
                <div className="flex items-center gap-2 text-dusty-rose text-sm font-medium group-hover:gap-3 transition-all">
                  <span>Follow Us</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
