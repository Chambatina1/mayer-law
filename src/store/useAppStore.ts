import { create } from 'zustand'

interface AppState {
  // View management
  currentView: 'website' | 'booking' | 'portal' | 'admin' | 'review'
  setView: (view: AppState['currentView']) => void

  // Booking state — expanded for smart intake
  bookingStep: number
  selectedService: string
  selectedDate: string | undefined
  selectedTime: string
  bookingName: string
  bookingEmail: string
  bookingPhone: string
  contactPref: string
  streetAddress: string
  city: string
  state: string
  zip: string
  county: string
  caseDescription: string
  issueDate: string
  prevAttorney: boolean
  hasCourtDeadline: boolean
  courtDeadline: string
  referralSource: string
  urgency: number
  consentGiven: boolean
  privacyConsent: boolean
  uploadedFiles: { name: string; size: number; type: string; data: string }[]
  confirmChecked: boolean

  setBookingStep: (step: number) => void
  setBookingService: (service: string) => void
  setBookingDate: (date: string | undefined) => void
  setBookingTime: (time: string) => void
  setBookingField: (field: string, value: unknown) => void
  resetBooking: () => void

  // Client portal
  clientEmail: string | null
  clientName: string | null
  clientId: string | null
  isLoggedIn: boolean
  login: (email: string, name: string, id: string) => void
  logout: () => void

  // Admin
  isAdminLoggedIn: boolean
  adminLogin: () => void
  adminLogout: () => void

  // Review
  reviewShareLink: string | null
  setReviewShareLink: (link: string | null) => void

  // UI
  mobileMenuOpen: boolean
  toggleMobileMenu: () => void
  setMobileMenuOpen: (open: boolean) => void

  // Active section for smooth scroll
  activeSection: string
  setActiveSection: (section: string) => void

  // Practice area detail view
  activePracticeArea: string | null
  setActivePracticeArea: (area: string | null) => void
}

const bookingInitialState = {
  bookingStep: 1,
  selectedService: '',
  selectedDate: undefined,
  selectedTime: '',
  bookingName: '',
  bookingEmail: '',
  bookingPhone: '',
  contactPref: 'email',
  streetAddress: '',
  city: '',
  state: 'FL',
  zip: '',
  county: '',
  caseDescription: '',
  issueDate: '',
  prevAttorney: false,
  hasCourtDeadline: false,
  courtDeadline: '',
  referralSource: '',
  urgency: 3,
  consentGiven: false,
  privacyConsent: false,
  uploadedFiles: [] as { name: string; size: number; type: string; data: string }[],
  confirmChecked: false,
}

export const useAppStore = create<AppState>((set) => ({
  // View management
  currentView: 'website',
  setView: (view) => set({ currentView: view }),

  // Booking state
  ...bookingInitialState,
  setBookingStep: (step) => set({ bookingStep: step }),
  setBookingService: (service) => set({ selectedService: service }),
  setBookingDate: (date) => set({ selectedDate: date }),
  setBookingTime: (time) => set({ selectedTime: time }),
  setBookingField: (field, value) => set({ [field]: value }),
  resetBooking: () => set(bookingInitialState),

  // Client portal
  clientEmail: null,
  clientName: null,
  clientId: null,
  isLoggedIn: false,
  login: (email, name, id) => set({ isLoggedIn: true, clientEmail: email, clientName: name, clientId: id }),
  logout: () => set({ isLoggedIn: false, clientEmail: null, clientName: null, clientId: null }),

  // Admin
  isAdminLoggedIn: false,
  adminLogin: () => set({ isAdminLoggedIn: true }),
  adminLogout: () => set({ isAdminLoggedIn: false }),

  // Review
  reviewShareLink: null,
  setReviewShareLink: (link) => set({ reviewShareLink: link }),

  // UI
  mobileMenuOpen: false,
  toggleMobileMenu: () => set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen })),
  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),

  // Active section
  activeSection: 'home',
  setActiveSection: (section) => set({ activeSection: section }),

  // Practice area detail view
  activePracticeArea: null,
  setActivePracticeArea: (area) => set({ activePracticeArea: area }),
}))
