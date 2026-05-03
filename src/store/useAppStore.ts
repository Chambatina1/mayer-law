import { create } from 'zustand'

interface AppState {
  // Mobile menu
  mobileMenuOpen: boolean
  setMobileMenuOpen: (open: boolean) => void

  // Appointment modal
  appointmentModalOpen: boolean
  setAppointmentModalOpen: (open: boolean) => void

  // Client portal modal
  clientPortalOpen: boolean
  setClientPortalOpen: (open: boolean) => void

  // News article modal
  selectedArticle: string | null
  setSelectedArticle: (article: string | null) => void

  // Active section for navigation highlighting
  activeSection: string
  setActiveSection: (section: string) => void

  // Practice area for appointment pre-selection
  selectedPracticeArea: string
  setSelectedPracticeArea: (area: string) => void
}

export const useAppStore = create<AppState>((set) => ({
  mobileMenuOpen: false,
  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),

  appointmentModalOpen: false,
  setAppointmentModalOpen: (open) => set({ appointmentModalOpen: open }),

  clientPortalOpen: false,
  setClientPortalOpen: (open) => set({ clientPortalOpen: open }),

  selectedArticle: null,
  setSelectedArticle: (article) => set({ selectedArticle: article }),

  activeSection: 'home',
  setActiveSection: (section) => set({ activeSection: section }),

  selectedPracticeArea: '',
  setSelectedPracticeArea: (area) => set({ selectedPracticeArea: area }),
}))
