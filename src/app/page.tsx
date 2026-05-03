'use client'

import { useState, useCallback, useSyncExternalStore } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'
import { Check, Palette, Eye, ArrowRight } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

// ─── Palette Types ───────────────────────────────────────────────────────────

interface PaletteColors {
  background: string
  card: string
  primary: string
  secondary: string
  text: string
  muted: string
  border: string
  accent2?: string
}

interface Palette {
  id: string
  name: string
  colors: PaletteColors
  tagline: string
}

// ─── All 8 Palettes ──────────────────────────────────────────────────────────

const palettes: Palette[] = [
  {
    id: 'champagne',
    name: 'Champagne & Slate',
    tagline: 'Current — Warm & Classic',
    colors: {
      background: '#FDF8F0',
      card: '#FFFFFF',
      primary: '#C9A96E',
      secondary: '#F5EDE0',
      text: '#2D2D2D',
      muted: '#6B6B6B',
      border: '#E8D5D0',
    },
  },
  {
    id: 'navy',
    name: 'Ivory & Navy',
    tagline: 'Authoritative & Trustworthy',
    colors: {
      background: '#FAFAF7',
      card: '#FFFFFF',
      primary: '#1B3A5C',
      secondary: '#E8ECF1',
      text: '#1A1A2E',
      muted: '#6C7A89',
      border: '#D1D9E6',
    },
  },
  {
    id: 'olive',
    name: 'Olive & Cream',
    tagline: 'Natural & Grounded',
    colors: {
      background: '#F9F6F0',
      card: '#FFFFFF',
      primary: '#5C6B4F',
      secondary: '#E8E4DA',
      text: '#2D3028',
      muted: '#7A8172',
      border: '#D6D1C4',
    },
  },
  {
    id: 'terracotta',
    name: 'Terracotta & Linen',
    tagline: 'Warm & Approachable',
    colors: {
      background: '#FAF5F0',
      card: '#FFFFFF',
      primary: '#B8654A',
      secondary: '#F0E4D8',
      text: '#3D2B1F',
      muted: '#8A7368',
      border: '#DFD2C5',
    },
  },
  {
    id: 'plum',
    name: 'Plum & Pearl',
    tagline: 'Sophisticated & Elegant',
    colors: {
      background: '#F8F5F7',
      card: '#FFFFFF',
      primary: '#6B4C5A',
      secondary: '#E8E0E5',
      text: '#2D2433',
      muted: '#8A7B85',
      border: '#D9D0D6',
    },
  },
  {
    id: 'sage',
    name: 'Sage & Stone',
    tagline: 'Calm & Professional',
    colors: {
      background: '#F5F6F3',
      card: '#FFFFFF',
      primary: '#5A6B5E',
      secondary: '#E2E5DE',
      text: '#2A332C',
      muted: '#7A867C',
      border: '#D2D6CF',
    },
  },
  {
    id: 'midnight',
    name: 'Midnight & Gold',
    tagline: 'Luxurious & Powerful',
    colors: {
      background: '#F7F5F0',
      card: '#FFFFFF',
      primary: '#2C3E50',
      secondary: '#D4A84B',
      text: '#1A252F',
      muted: '#7F8C8D',
      border: '#D5CFC4',
      accent2: '#34495E',
    },
  },
  {
    id: 'blush',
    name: 'Blush & Charcoal',
    tagline: 'Modern & Inviting',
    colors: {
      background: '#FBF7F4',
      card: '#FFFFFF',
      primary: '#C17B6E',
      secondary: '#F0E6E0',
      text: '#2C2525',
      muted: '#8A7E7A',
      border: '#E0D5CF',
    },
  },
]

const STORAGE_KEY = 'mayer-law-selected-palette'

// ─── Swatch Component ────────────────────────────────────────────────────────

function Swatch({ color, label }: { color: string; label: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(color)
    setCopied(true)
    toast.success(`Copied ${color}`)
    setTimeout(() => setCopied(false), 1500)
  }, [color])

  return (
    <button
      onClick={handleCopy}
      className="group flex flex-col items-center gap-1.5 flex-shrink-0 cursor-pointer"
      title={`${label}: ${color} — Click to copy`}
    >
      <div
        className="w-9 h-9 rounded-lg border border-gray-200 shadow-sm transition-transform group-hover:scale-110"
        style={{ backgroundColor: color }}
      />
      <span className="text-[10px] text-gray-400 font-mono max-w-[52px] truncate">
        {copied ? 'Copied!' : color.slice(0, 7)}
      </span>
    </button>
  )
}

// ─── Mini Website Preview ────────────────────────────────────────────────────

function MiniPreview({ colors, name }: { colors: PaletteColors; name: string }) {
  return (
    <div
      className="rounded-lg overflow-hidden border shadow-sm"
      style={{ backgroundColor: colors.background, borderColor: colors.border }}
    >
      {/* Mini Nav */}
      <div
        className="flex items-center justify-between px-3 py-2"
        style={{ borderBottom: `1px solid ${colors.border}` }}
      >
        <div className="flex items-center gap-1.5">
          <div
            className="w-3.5 h-3.5 rounded-sm"
            style={{ backgroundColor: colors.primary }}
          />
          <span
            className="text-[9px] font-semibold tracking-wide"
            style={{ color: colors.text }}
          >
            MAYER LAW
          </span>
        </div>
        <div className="flex gap-2">
          <div className="w-8 h-1 rounded-full" style={{ backgroundColor: colors.muted, opacity: 0.4 }} />
          <div className="w-8 h-1 rounded-full" style={{ backgroundColor: colors.muted, opacity: 0.4 }} />
          <div className="w-8 h-1 rounded-full" style={{ backgroundColor: colors.muted, opacity: 0.4 }} />
        </div>
      </div>

      {/* Mini Hero */}
      <div
        className="px-4 py-5 text-center"
        style={{ backgroundColor: colors.secondary, borderTop: `2px solid ${colors.primary}` }}
      >
        <p
          className="text-[11px] font-bold leading-tight mb-1"
          style={{ color: colors.text, fontFamily: 'var(--font-playfair), Georgia, serif' }}
        >
          Resourcefully Relentless
        </p>
        <p className="text-[8px] leading-tight mb-2.5" style={{ color: colors.muted }}>
          Dedicated legal representation you can trust
        </p>
        <div className="flex gap-1.5 justify-center">
          <div
            className="px-3 py-1 rounded text-[8px] font-semibold"
            style={{ backgroundColor: colors.primary, color: '#FFFFFF' }}
          >
            Free Consultation
          </div>
          <div
            className="px-3 py-1 rounded text-[8px] font-medium"
            style={{
              backgroundColor: 'transparent',
              color: colors.primary,
              border: `1px solid ${colors.primary}`,
            }}
          >
            Learn More
          </div>
        </div>
      </div>

      {/* Mini Cards */}
      <div className="px-3 py-3">
        <div className="flex gap-2">
          {['Consumer Finance', 'Education Law', 'Personal Injury'].map((area) => (
            <div
              key={area}
              className="flex-1 rounded-md p-2 text-center"
              style={{
                backgroundColor: colors.card,
                border: `1px solid ${colors.border}`,
              }}
            >
              <div
                className="w-4 h-4 rounded-full mx-auto mb-1 opacity-60"
                style={{ backgroundColor: colors.primary }}
              />
              <p className="text-[6.5px] leading-tight font-medium" style={{ color: colors.text }}>
                {area}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Mini Footer */}
      <div
        className="px-3 py-1.5 flex justify-between"
        style={{ backgroundColor: colors.primary }}
      >
        <p className="text-[6px]" style={{ color: 'rgba(255,255,255,0.7)' }}>© 2025 Mayer Law</p>
        <p className="text-[6px]" style={{ color: 'rgba(255,255,255,0.7)' }}>Contact Us</p>
      </div>
    </div>
  )
}

// ─── Palette Card ────────────────────────────────────────────────────────────

function PaletteCard({
  palette,
  isSelected,
  onSelect,
  index,
}: {
  palette: Palette
  isSelected: boolean
  onSelect: (palette: Palette) => void
  index: number
}) {
  const c = palette.colors

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.07, ease: 'easeOut' }}
      whileHover={{ y: -4 }}
      className="h-full"
    >
      <Card
        className={`
          h-full flex flex-col overflow-hidden transition-all duration-300 relative
          ${isSelected
            ? 'ring-2 ring-amber-400 shadow-lg shadow-amber-100'
            : 'hover:shadow-md'
          }
        `}
      >
        {/* Selected Badge */}
        {isSelected && (
          <div className="absolute top-3 right-3 z-10">
            <Badge
              className="bg-amber-400 text-amber-900 border-amber-300 gap-1 text-[10px] px-2 py-0.5"
            >
              <Check className="w-3 h-3" />
              Currently Selected
            </Badge>
          </div>
        )}

        <CardHeader className="pb-2">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-base font-semibold" style={{ color: '#2D2D2D' }}>
                {palette.name}
              </CardTitle>
              <p className="text-xs mt-0.5" style={{ color: '#6B6B6B' }}>
                {palette.tagline}
              </p>
            </div>
            {palette.id === 'champagne' && (
              <Badge variant="outline" className="text-[10px] border-amber-300 text-amber-700 flex-shrink-0">
                Current
              </Badge>
            )}
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col gap-4 pt-0">
          {/* Color Swatches */}
          <div>
            <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-2 font-medium">
              Color Swatches
            </p>
            <div className="flex flex-wrap gap-2.5">
              <Swatch color={c.background} label="Background" />
              <Swatch color={c.card} label="Card" />
              <Swatch color={c.primary} label="Primary" />
              <Swatch color={c.secondary} label="Secondary" />
              <Swatch color={c.text} label="Text" />
              <Swatch color={c.muted} label="Muted" />
              <Swatch color={c.border} label="Border" />
              {c.accent2 && <Swatch color={c.accent2} label="Accent 2" />}
            </div>
          </div>

          {/* Mini Website Preview */}
          <div>
            <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-2 font-medium">
              Preview
            </p>
            <MiniPreview colors={c} name={palette.name} />
          </div>

          {/* Text Samples */}
          <div className="space-y-1.5">
            <p className="text-[10px] uppercase tracking-wider text-gray-400 font-medium">
              Typography
            </p>
            <div
              className="rounded-md p-2.5 space-y-1"
              style={{ backgroundColor: c.background, border: `1px solid ${c.border}` }}
            >
              <p
                className="text-xs font-bold"
                style={{ color: c.text, fontFamily: 'var(--font-playfair), Georgia, serif' }}
              >
                Heading Text
              </p>
              <p className="text-[10px]" style={{ color: c.muted }}>
                Body text appears here in muted color for readability.
              </p>
              <p className="text-[10px] font-medium" style={{ color: c.primary }}>
                Primary accent link text
              </p>
            </div>
          </div>
        </CardContent>

        <CardFooter className="pt-2">
          <Button
            onClick={() => onSelect(palette)}
            className={`
              w-full font-medium text-sm transition-all
              ${isSelected
                ? 'bg-amber-400 hover:bg-amber-500 text-amber-900'
                : ''
              }
            `}
            style={!isSelected ? {
              backgroundColor: '#2D2D2D',
              color: '#FFFFFF',
            } : undefined}
          >
            {isSelected ? (
              <>
                <Check className="w-4 h-4 mr-1" />
                Selected
              </>
            ) : (
              <>
                <Palette className="w-4 h-4 mr-1" />
                Select This Palette
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

// ─── Main Page ───────────────────────────────────────────────────────────────

function subscribeToStorage(callback: () => void) {
  window.addEventListener('storage', callback)
  return () => window.removeEventListener('storage', callback)
}

function getStorageSnapshot(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

function getServerSnapshot(): string | null {
  return null
}

export default function Home() {
  const storedJson = useSyncExternalStore(subscribeToStorage, getStorageSnapshot, getServerSnapshot)
  const [localSelection, setLocalSelection] = useState<string | null>(null)

  // Merge server/client: prefer local state (for instant updates), fall back to stored
  const selectedPaletteId = localSelection ?? (storedJson ? (() => { try { return JSON.parse(storedJson).paletteId } catch { return null } })() : null)
  const selectedPalette = palettes.find((p) => p.id === selectedPaletteId)

  const handleSelect = useCallback((palette: Palette) => {
    const data = {
      paletteId: palette.id,
      name: palette.name,
      colors: palette.colors,
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    setLocalSelection(palette.id)
    toast.success(`"${palette.name}" selected! Refresh to apply.`, {
      description: 'Your palette choice has been saved to local storage.',
      duration: 3000,
    })
  }, [])

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      {/* ── Header ── */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <div className="flex items-center gap-2.5 mb-0.5">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center">
                  <Eye className="w-4 h-4 text-white" />
                </div>
                <h1 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight">
                  Mayer Law
                  <span className="text-gray-400 font-normal ml-2 text-sm hidden sm:inline">
                    — Color Palette Selection
                  </span>
                </h1>
              </div>
              <p className="text-xs sm:text-sm text-gray-500 pl-[42px] sm:pl-[42px]">
                Choose the palette that best reflects your practice.
              </p>
            </div>
            {selectedPalette && (
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedPalette.id}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-2 sm:self-end"
                >
                  <div
                    className="w-5 h-5 rounded-md shadow-sm border border-gray-100"
                    style={{ backgroundColor: selectedPalette.colors.primary }}
                  />
                  <span className="text-xs font-medium text-gray-600">
                    Active: <span className="font-semibold text-gray-900">{selectedPalette.name}</span>
                  </span>
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </div>
      </header>

      {/* ── Main Content ── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Info Banner */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8 p-4 rounded-xl bg-white border border-gray-100 shadow-sm"
        >
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Palette className="w-4.5 h-4.5 text-amber-600" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-gray-900 mb-1">
                How to Choose
              </h2>
              <p className="text-xs text-gray-500 leading-relaxed">
                Each palette below shows a live preview of how it would look on the Mayer Law website.
                Click any color swatch to copy its hex code. Click <strong>&quot;Select This Palette&quot;</strong> to
                save your choice. The selected palette will be applied to the full site on refresh.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Palette Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
          {palettes.map((palette, i) => (
            <PaletteCard
              key={palette.id}
              palette={palette}
              isSelected={selectedPaletteId === palette.id}
              onSelect={handleSelect}
              index={i}
            />
          ))}
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-8" />
          <div className="flex flex-col items-center gap-3">
            <p className="text-sm text-gray-400">
              {selectedPaletteId
                ? `You've selected "${selectedPalette?.name}". This is saved in your browser's local storage.`
                : 'No palette selected yet. Click any card above to make your choice.'
              }
            </p>
            {selectedPaletteId && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const data = localStorage.getItem(STORAGE_KEY)
                  if (data) {
                    const parsed = JSON.parse(data)
                    navigator.clipboard.writeText(JSON.stringify(parsed, null, 2))
                    toast.success('Palette JSON copied to clipboard!')
                  }
                }}
                className="text-xs gap-1.5"
              >
                <ArrowRight className="w-3.5 h-3.5" />
                Copy Palette JSON
              </Button>
            )}
          </div>
        </motion.div>
      </main>

      {/* ── Footer ── */}
      <footer className="mt-auto border-t border-gray-100 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center">
          <p className="text-xs text-gray-400">
            Mayer Law — Color Palette Preview Tool · Selections stored in localStorage
          </p>
        </div>
      </footer>
    </div>
  )
}
