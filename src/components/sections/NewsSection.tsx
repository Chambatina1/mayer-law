'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, ArrowRight, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'

const articles = [
  {
    id: '1',
    title: 'Understanding Your Rights Under the Fair Debt Collection Practices Act',
    excerpt:
      'The FDCPA protects consumers from abusive, unfair, or deceptive practices by debt collectors. Learn what constitutes a violation and how you can fight back against unlawful collection tactics.',
    category: 'Consumer Finance',
    date: 'January 15, 2025',
    readTime: '5 min read',
  },
  {
    id: '2',
    title: 'Title IX Protections: What Every Student and Parent Should Know',
    excerpt:
      'Title IX prohibits sex-based discrimination in educational programs receiving federal funding. Discover your rights and the steps to take if you or your child has experienced discrimination at school.',
    category: 'Education Law',
    date: 'February 3, 2025',
    readTime: '7 min read',
  },
  {
    id: '3',
    title: 'Steps to Take After a Personal Injury: A Comprehensive Guide',
    excerpt:
      'After suffering a personal injury, the steps you take can significantly impact your ability to recover compensation. This guide covers everything from seeking medical treatment to preserving evidence.',
    category: 'Personal Injury',
    date: 'March 12, 2025',
    readTime: '6 min read',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

export default function NewsSection() {
  return (
    <section id="news" className="py-20 lg:py-28 bg-white section-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-gold text-sm font-semibold tracking-[0.2em] uppercase mb-4">
            Legal Insights
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-dark mb-6">
            News & Articles
          </h2>
          <div className="w-16 h-1 bg-gold mx-auto mb-6" />
          <p className="text-dark/60 text-lg max-w-2xl mx-auto">
            Stay informed with the latest legal news, insights, and guidance from
            our experienced team at Mayer Law.
          </p>
        </motion.div>

        {/* Articles Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {articles.map((article) => (
            <motion.div key={article.id} variants={cardVariants}>
              <Card className="group h-full border-0 shadow-sm hover:shadow-xl transition-all duration-500 rounded-xl overflow-hidden">
                {/* Article image placeholder with gradient */}
                <div className="h-48 bg-gradient-to-br from-dark/80 via-dark-lighter to-gold/20 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center">
                      <svg
                        viewBox="0 0 24 24"
                        className="w-8 h-8 text-gold/60"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                        />
                      </svg>
                    </div>
                  </div>
                  {/* Gold accent */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gold-dark via-gold to-gold-light" />
                </div>

                <CardContent className="p-6">
                  {/* Category Badge */}
                  <Badge
                    variant="secondary"
                    className="bg-gold/10 text-gold-dark hover:bg-gold/20 mb-4 text-xs font-medium"
                  >
                    {article.category}
                  </Badge>

                  {/* Title */}
                  <h3 className="font-serif text-lg font-bold text-dark mb-3 group-hover:text-gold-dark transition-colors leading-snug">
                    {article.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-dark/60 text-sm leading-relaxed mb-4">
                    {article.excerpt}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center justify-between pt-4 border-t border-dark/5">
                    <div className="flex items-center gap-4 text-xs text-dark/40">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {article.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {article.readTime}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      className="text-gold hover:text-gold-dark hover:bg-gold/10 p-0 h-auto text-sm group/btn"
                    >
                      Read More
                      <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
