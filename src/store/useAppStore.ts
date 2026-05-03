import { create } from 'zustand'

interface AppState {
  // View management
  currentView: 'website' | 'booking' | 'portal' | 'admin' | 'review'
  setView: (view: AppState['currentView']) => void

  // Booking state
  bookingStep: number
  selectedService: string
  selectedDate: string | undefined
  selectedTime: string
  bookingName: string
  bookingEmail: string
  bookingPhone: string
  bookingNotes: string
  setBookingStep: (step: number) => void
  setBookingService: (service: string) => void
  setBookingDate: (date: string | undefined) => void
  setBookingTime: (time: string) => void
  setBookingDetails: (details: { name?: string; email?: string; phone?: string; notes?: string }) => void
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
}

const initialState = {
  bookingStep: 1,
  selectedService: '',
  selectedDate: undefined,
  selectedTime: '',
  bookingName: '',
  bookingEmail: '',
  bookingPhone: '',
  bookingNotes: '',
}

export const useAppStore = create<AppState>((set) => ({
  // View management
  currentView: 'website',
  setView: (view) => set({ currentView: view }),

  // Booking state
  ...initialState,
  setBookingStep: (step) => set({ bookingStep: step }),
  setBookingService: (service) => set({ selectedService: service }),
  setBookingDate: (date) => set({ selectedDate: date }),
  setBookingTime: (time) => set({ selectedTime: time }),
  setBookingDetails: (details) =>
    set((state) => ({
      bookingName: details.name ?? state.bookingName,
      bookingEmail: details.email ?? state.bookingEmail,
      bookingPhone: details.phone ?? state.bookingPhone,
      bookingNotes: details.notes ?? state.bookingNotes,
    })),
  resetBooking: () => set(initialState),

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
}))
