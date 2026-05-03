# MAYER LAW — COMPLETE PROJECT BLUEPRINT
## Ecosystemo Profesional para Nicole Mayer, Abogada en Florida

**Fecha:** 2026-05-03
**Estado:** 85% completado — Solo falta conectar page.tsx como router
**Proyecto:** `/home/z/my-project/`

---

## 1. CONTEXTO DEL CLIENTE

| Campo | Valor |
|-------|-------|
| **Nombre del bufete** | Mayer Law |
| **Abogada** | Nicole Mayer |
| **Ubicacion** | Maitland, Florida, USA |
| **Telefono** | (352) 494-3657 |
| **Email** | Nicole@MayerLawFlorida.com |
| **Website actual** | mayerlawflorida.com |
| **Anos de experiencia** | 20+ |
| **Fundado** | 2020 |

### Areas de Practica
1. **Consumer Finance Law** — "Your rights. Our fight."
2. **Education Law & Civil Rights** — "Equal treatment. No exceptions."
3. **Personal Injury** — "You deserve better."
4. **General Litigation & Consulting** — "Practical solutions. Skilled advocacy."

### La Promesa 3R
- **Resourceful** — Finding quick and clever ways to overcome difficulties
- **Relentless** — No abatement of severity, intensity, or pace
- **Representation** — Standing for another with full rights and obligations

### Estadisticas
- 2,000+ Client Consultations
- 93% Successful Cases
- 20+ Years Experience
- $20M+ Recovered for Clients

### Testimonios (6 reales, hacer seed en DB)
1. Brittany Roberson — 5 estrellas — expertise, professionalism, outstanding result
2. Heather McKenzie — 5 estrellas — grateful for nursing career opportunity
3. Ray Lau — 5 estrellas — IEP guidance, empathetic, thorough
4. Tresha Thompson — 5 estrellas — knowledgeable, detailed research, successful
5. Karina Calderon — 5 estrellas — career-saving, NCLEX case
6. Bianca Vinas — 5 estrellas — strong-willed advocate, calm under pressure

---

## 2. PALETA SELECCIONADA: BLUSH & CHARCOAL

La usuaria eligio esta paleta porque transmite calidez, sofisticacion y calma.

### Valores CSS (ya aplicados en globals.css)

```css
:root {
  --background: #FBF7F4;        /* blush white — fondo principal */
  --foreground: #2C2525;        /* warm charcoal — texto principal */
  --card: #FFFFFF;
  --card-foreground: #2C2525;
  --popover: #FDF9F7;
  --popover-foreground: #2C2525;
  --primary: #C17B6E;           /* dusty rose — botones, acentos */
  --primary-foreground: #FFFFFF;
  --secondary: #F0E6E0;         /* light blush — tarjetas, hover */
  --secondary-foreground: #2C2525;
  --muted: #F0E6E0;
  --muted-foreground: #8A7E7A;  /* texto secundario */
  --accent: #E0D5CF;            /* bordes, fondos sutiles */
  --accent-foreground: #2C2525;
  --destructive: #C0392B;
  --border: #E0D5CF;
  --input: #E0D5CF;
  --ring: #C17B6E;
}
```

### Colores Tailwind (ya configurados en @theme)
```
cream=#FBF7F4 | blush=#F0E6E0 | dusty-rose=#C17B6E | deep-rose=#A8645A
dark-rose=#8B5248 | charcoal=#2C2525 | warm-charcoal=#3D3535 | medium-gray=#8A7E7A
sand=#E0D5CF | sage=#C8C0B8 | white=#FFFFFF
```

### Tipografia
- **Headings:** Playfair Display (serif) — via `next/font/google`
- **Body:** Inter (sans-serif) — via `next/font/google`
- CSS vars: `--font-serif: var(--font-playfair)`, `--font-sans: var(--font-inter)`

---

## 3. ESTADO ACTUAL DEL PROYECTO (QUE EXISTE, QUE FALTA)

### COMPLETADO (✅)

#### Infraestructura
- [x] Proyecto Next.js 16 inicializado con App Router
- [x] Tailwind CSS 4 + shadcn/ui completo (50+ componentes)
- [x] Prisma ORM con SQLite configurado
- [x] Zustand store creado (`src/store/useAppStore.ts`)
- [x] Paleta Blush & Charcoal aplicada en `globals.css`
- [x] Schema de DB completo con 9 modelos
- [x] Seed script creado (`prisma/seed.ts`)

#### API Routes (18 endpoints creados)
- [x] `POST/GET /api/appointments` — Crear/listar citas con intake completo
- [x] `PATCH /api/appointments/[id]` — Actualizar estado, notas, recordatorios
- [x] `POST /api/contact` — Formulario de contacto
- [x] `POST /api/reviews` — Crear review
- [x] `GET /api/reviews` — Reviews publicos
- [x] `GET /api/reviews/all` — Todos los reviews (admin)
- [x] `PATCH /api/reviews/[id]` — Feature/hide review
- [x] `POST /api/client/login` — Login cliente
- [x] `POST /api/client/register` — Registro cliente
- [x] `GET /api/client/dashboard` — Datos del dashboard
- [x] `GET/PUT /api/client/profile` — Perfil del cliente
- [x] `POST /api/documents/upload` — Subir documento
- [x] `GET /api/documents` — Listar documentos
- [x] `POST /api/messages` — Enviar mensaje
- [x] `GET /api/messages` — Obtener mensajes
- [x] `GET/PUT /api/settings` — Configuracion del sitio
- [x] `POST /api/auth/admin` — Login admin (password: mayer2025)
- [x] `GET /api/admin/clients` — Lista clientes
- [x] `GET/PUT /api/admin/clients/[email]` — Perfil completo cliente
- [x] `GET /api/admin/stats` — Estadisticas dashboard

#### Componentes (18 archivos, ~3,300 lineas totales)
**Website (9 componentes):**
- [x] `Header.tsx` (177 lineas) — Sticky, logo real, nav, CTAs, menu movil
- [x] `HeroSection.tsx` (92 lineas) — Fondo abstracto, headline, 2 CTAs
- [x] `PracticeAreasSection.tsx` (98 lineas) — 4 tarjetas de servicios
- [x] `AboutSection.tsx` (132 lineas) — Foto real, bio, 3R Promise
- [x] `StatsSection.tsx` (76 lineas) — 4 contadores animados
- [x] `TestimonialsSection.tsx` (156 lineas) — Carrusel con 6 reviews
- [x] `CTABanner.tsx` (47 lineas) — Banner de accion
- [x] `ContactSection.tsx` (229 lineas) — Formulario + info contacto
- [x] `Footer.tsx` (149 lineas) — Links, contacto, copyright

**Booking (1 componente):**
- [x] `BookingPage.tsx` (438 lineas) — Sistema de citas 5 pasos con intake completo

**Client Portal (2 componentes):**
- [x] `PortalLogin.tsx` (161 lineas) — Login por email
- [x] `PortalDashboard.tsx` (392 lineas) — Dashboard con tabs (mensajes, docs, citas, facturas)

**Admin Panel (2 componentes):**
- [x] `AdminLogin.tsx` (86 lineas) — Login con password
- [x] `AdminDashboard.tsx` (567 lineas) — Dashboard completo con 6 tabs

**Review (1 componente):**
- [x] `ReviewForm.tsx` (242 lineas) — Formulario de review + share

**Shared (3 componentes):**
- [x] `AnimatedCounter.tsx` (60 lineas)
- [x] `SectionWrapper.tsx` (31 lineas)
- [x] `StarRating.tsx` (59 lineas)

#### Assets (16 archivos en /public/mayer-assets/)
- [x] `logo.png` — Logo real de Mayer Law (descargado de su web)
- [x] `favicon.png` — Favicon real
- [x] `attorney.jpg` — Foto real de Nicole Mayer (descargada de su web)
- [x] `about-img.png` — Imagen about de su web
- [x] `class-action.png` — Imagen de su web
- [x] `icon-consumer.png`, `icon-education.png`, `icon-injury.png` — Iconos de su web
- [x] `hero-bg.png` — Fondo abstracto elegante (IA generada, NO modelos)
- [x] `justice-abstract.png` — Simbolo de justicia minimalista
- [x] `gavel-abstract.png` — Martillo minimalista
- [x] `handshake-abstract.png` — Apreton de manos minimalista
- [x] `docs-abstract.png` — Documentos minimalista
- [x] `building-abstract.png` — Edificio minimalista
- [x] `pattern-bg.png` — Patron decorativo

### FALTA (❌)

#### CRITICO — UNICA TAREA PENDIENTE
- [ ] **REESCRIBIR `src/app/page.tsx`** — Actualmente muestra el selector de paletas (601 lineas).
  Debe ser reemplazado por el VIEW ROUTER que conecte los 18 componentes del ecosistema.

#### Despues de conectar page.tsx
- [ ] Ejecutar `bun run db:push` para asegurar que el schema esta sincronizado
- [ ] Ejecutar seed script para poblar la DB con testimonials y datos demo
- [ ] Verificar que dev server compila sin errores
- [ ] Probar cada vista: website, booking, review, portal, admin

#### Mejoras futuras (nice-to-have)
- [ ] Crear `public/manifest.json` para PWA (app movil)
- [ ] Agregar meta tags PWA en layout.tsx
- [ ] Sistema de notificaciones/recordatorios real
- [ ] Export de datos de cliente en PDF
- [ ] Integracion con Google Calendar API real

---

## 4. COMO CONECTAR PAGE.TSX (LA TAREA PRINCIPAL)

El archivo `src/app/page.tsx` debe ser reemplazado por un VIEW ROUTER:

```tsx
'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useAppStore } from '@/store/useAppStore'

// Website sections
import Header from '@/components/website/Header'
import HeroSection from '@/components/website/HeroSection'
import PracticeAreasSection from '@/components/website/PracticeAreasSection'
import AboutSection from '@/components/website/AboutSection'
import StatsSection from '@/components/website/StatsSection'
import TestimonialsSection from '@/components/website/TestimonialsSection'
import CTABanner from '@/components/website/CTABanner'
import ContactSection from '@/components/website/ContactSection'
import Footer from '@/components/website/Footer'

// Other views
import BookingPage from '@/components/booking/BookingPage'
import ReviewForm from '@/components/review/ReviewForm'
import PortalLogin from '@/components/portal/PortalLogin'
import PortalDashboard from '@/components/portal/PortalDashboard'
import AdminLogin from '@/components/admin/AdminLogin'
import AdminDashboard from '@/components/admin/AdminDashboard'

function WebsiteView() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <PracticeAreasSection />
        <AboutSection />
        <StatsSection />
        <TestimonialsSection />
        <CTABanner />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}

function BookingView() {
  return <BookingPage />
}

function ReviewView() {
  return <ReviewForm />
}

function PortalView() {
  const { isLoggedIn } = useAppStore()
  return isLoggedIn ? <PortalDashboard /> : <PortalLogin />
}

function AdminView() {
  const { isAdminLoggedIn } = useAppStore()
  return isAdminLoggedIn ? <AdminDashboard /> : <AdminLogin />
}

export default function Home() {
  const { currentView } = useAppStore()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentView}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {currentView === 'website' && <WebsiteView />}
        {currentView === 'booking' && <BookingView />}
        {currentView === 'review' && <ReviewView />}
        {currentView === 'portal' && <PortalView />}
        {currentView === 'admin' && <AdminView />}
      </motion.div>
    </AnimatePresence>
  )
}
```

---

## 5. ARQUITECTURA DEL ECOSISTEMA (5 VISTAS)

### Vista 1: Sitio Web Publico (default)
- Header sticky con logo, nav, "Book a Call" (dusty-rose), telefono, "Portal" link
- Hero con fondo abstracto, "Resourcefully Relentless.", 2 CTAs
- 4 Practice Area cards con hover effects
- About con foto real de Nicole Mayer
- Stats con contadores animados
- Testimonials carousel (6 reviews con estrellas)
- CTA Banner
- Contact form + info
- Footer

### Vista 2: Sistema de Citas (BOOKING)
Flujo de 5 pasos:
1. **Seleccionar servicio** — 4 tarjetas elegantes
2. **Elegir fecha** — Calendario (shadcn), fines de semana deshabilitados
3. **Elegir hora** — Slots de 30 min (9AM-5PM)
4. **Informacion del cliente** — Formulario completo:
   - Nombre, Email, Telefono, Metodo de contacto
   - Direccion completa, Condado (FL)
   - Descripcion del caso
   - Fecha del problema, Abogado previo, Deadline judicial
   - Fuente de referencia, Nivel de urgencia (1-5)
   - Subida de documentos
   - Checkboxes de consentimiento
5. **Confirmacion** — Resumen + "Confirm Booking" + "Add to Calendar"

### Vista 3: Sistema de Reviews
- Rating con estrellas (1-5)
- Categoria de servicio
- Review escrito (opcional)
- "Recomendaria?" toggle
- Pantalla de agradecimiento con link compartible + redes sociales

### Vista 4: Portal del Cliente
- Login por email (auto-registro)
- Dashboard: stats + quick actions
- Tabs:
  - **Mensajes** — Chat con abogada
  - **Documentos** — Subir/descargar, categorias
  - **Citas** — Historial + gestionar proximas
  - **Facturas** — Ver y rastrear pagos

### Vista 5: Panel de Admin (password: mayer2025)
- Dashboard con metricas
- Tabs:
  - **Apariencia** — Color pickers (3 colores)
  - **Contenido** — Editar textos (hero, about, contacto)
  - **Bloques** — Toggle secciones del homepage
  - **Citas** — Tabla con acciones (confirmar/cancelar)
  - **Reviews** — Gestionar (feature/hide)
  - **Clientes** — Lista + perfil completo
  - **Mensajes** — Submissions de contacto

---

## 6. BASE DE DATOS — Schema Completo

### Archivo: `prisma/schema.prisma`

**9 modelos:**

1. **Appointment** — Citas con intake completo del cliente
   - Info basica: clientEmail, clientName, clientPhone, contactPref
   - Direccion: streetAddress, city, state, zip, county
   - Caso: service, caseDescription, issueDate, prevAttorney, courtDeadline
   - Meta: referralSource, urgency (1-5), consentGiven, privacyConsent
   - Cita: date, time, status, notes, confirmedAt
   - Recordatorios: reminder24h, reminder1h
   - Relacion: AppointmentDocument[]

2. **AppointmentDocument** — Docs adjuntos a citas
   - appointmentId, fileName, fileSize, fileType, fileData (base64)

3. **Review** — Reviews de clientes
   - clientName, email, rating (1-5), service, text, recommend
   - Moderacion: featured, visible

4. **Client** — Perfil completo del cliente
   - Personal: name, email (unique), phone, contactPref
   - Direccion: streetAddress, city, state, zip, county
   - Meta: referralSource, tags, notes, lastActivity
   - Relaciones: documents[], messages[], invoices[]

5. **ClientDocument** — Documentos del portal
   - clientId, fileName, fileSize, category, fileData

6. **ClientMessage** — Mensajes chat
   - clientId, sender ("client"/"attorney"), message, read

7. **Invoice** — Facturas
   - clientId, amount, status, description, date

8. **ContactSubmission** — Formulario de contacto publico
   - name, email, phone, message, read

9. **SiteSettings** — Configuracion editabledesde admin
   - heroHeadline, heroSubtitle, aboutBio
   - phone, email, address
   - primaryColor, secondaryColor, bgColor

---

## 7. ZUSTAND STORE — Estado Global

**Archivo:** `src/store/useAppStore.ts`

### Estado principal:
```
currentView: 'website' | 'booking' | 'portal' | 'admin' | 'review'
```

### Estado de Booking (campos de intake):
```
bookingStep, selectedService, selectedDate, selectedTime,
bookingName, bookingEmail, bookingPhone, contactPref,
streetAddress, city, state, zip, county,
caseDescription, issueDate, prevAttorney, hasCourtDeadline, courtDeadline,
referralSource, urgency (1-5), consentGiven, privacyConsent,
uploadedFiles[], confirmChecked
```

### Estado Portal:
```
clientEmail, clientName, clientId, isLoggedIn
```

### Estado Admin:
```
isAdminLoggedIn
```

### UI:
```
mobileMenuOpen, activeSection, reviewShareLink
```

---

## 8. ESTRUCTURA DE ARCHIVOS

```
/home/z/my-project/
├── prisma/
│   ├── schema.prisma          ← 9 modelos, COMPLETO
│   └── seed.ts                ← Seed con testimonials + demo
├── public/
│   └── mayer-assets/          ← 16 archivos de assets
│       ├── logo.png           ← Logo real
│       ├── favicon.png        ← Favicon real
│       ├── attorney.jpg       ← Foto real de Nicole
│       ├── hero-bg.png        ← Fondo abstracto
│       └── ... (12 mas)
├── src/
│   ├── app/
│   │   ├── page.tsx           ← ⚠️ ACTUALMENTE MUESTRA SELECTOR DE PALETAS
│   │   ├── layout.tsx         ← Fonts, metadata, Toaster
│   │   ├── globals.css        ← Blush & Charcoal COMPLETO
│   │   └── api/               ← 18+ endpoints, COMPLETO
│   ├── components/
│   │   ├── website/           ← 9 componentes, COMPLETO
│   │   ├── booking/           ← 1 componente (438 lineas), COMPLETO
│   │   ├── portal/            ← 2 componentes, COMPLETO
│   │   ├── admin/             ← 2 componentes, COMPLETO
│   │   ├── review/            ← 1 componente, COMPLETO
│   │   ├── shared/            ← 3 componentes, COMPLETO
│   │   └── ui/                ← 50+ shadcn/ui components
│   ├── store/
│   │   └── useAppStore.ts     ← COMPLETO
│   ├── lib/
│   │   ├── db.ts              ← Prisma client
│   │   └── utils.ts           ← Utilidades
│   └── hooks/
│       ├── use-mobile.ts
│       └── use-toast.ts
└── package.json
```

---

## 9. CREDENCIALES Y DATOS DE ACCESO

| Acceso | Credencial |
|--------|-----------|
| Admin Panel | Password: `mayer2025` |
| Portal Cliente Demo | Email: `demo@mayerlawflorida.com` |
| Dev Server | Port 3000 (auto) |
| DB | SQLite via Prisma |
| DB Push | `bun run db:push` |
| DB Generate | `bun run db:generate` |
| Seed | `bun run prisma/seed.ts` |
| Lint | `bun run lint` |
| Dev Log | `tail -20 dev.log` |

---

## 10. PLAN DE ACCION PARA CONTINUAR

### Paso 1: Reconectar page.tsx (~15 min)
Reemplazar el contenido actual de `src/app/page.tsx` con el VIEW ROUTER
(plantilla en seccion 4 de este documento).

### Paso 2: Sincronizar DB (~5 min)
```bash
cd /home/z/my-project
bun run db:push
bun run db:generate
```

### Paso 3: Seed datos (~5 min)
Ejecutar seed script para poblar testimonials y datos demo.
Si seed.ts no funciona directamente, crear datos via API routes.

### Paso 4: Verificar (~10 min)
```bash
bun run lint
tail -20 dev.log
```
Probar cada vista en el preview panel.

### Paso 5: PWA (opcional, ~10 min)
Crear `public/manifest.json` con colores Blush & Charcoal.
Agregar meta tags en layout.tsx.

---

## 11. NOTAS DE DISENO IMPORTANTES

- **NO usar fotos de modelos IA** — Solo la foto real de Nicole (attorney.jpg)
- **Colores calidos pastel** — Crema, dusty rose, blush, arena
- **Mensajes cortos pero poderosos** — Menos texto, mas impacto
- **Estilo minimalista y elegante** — Calma, buen gusto, juicio
- **Tipografia:** Playfair Display para titulos, Inter para cuerpo
- **Animaciones sutiles** con framer-motion (fade-in, hover)
- **Responsive mobile-first** — sm, md, lg, xl breakpoints
- **Sticky footer** en la vista website
- **Scroll suave** entre secciones

---

## 12. CARACTERISTICAS CLAVE QUE AUTOMATIZAN LA VIDA DE NICOLE

1. **Citas en linea** — Clientes reservan sin llamadas telefonicas
2. **Intake inteligente** — Recopila maxima info del cliente automaticamente
3. **Recordatorios** — 24h y 1h antes de la cita
4. **Portal de documentos** — Clientes suben documentos sin email
5. **Mensajeria** — Chat directo con clientes
6. **Reviews automatizados** — Captura + compartir en redes
7. **Panel admin** — Nicole cambia colores, textos, imagenes sin developer
8. **Perfiles de cliente** — Historial completo de cada cliente
9. **Facturas** — Control visual de pagos
10. **PWA** — Funciona como app movil

---

*Documento generado automaticamente para referencia del proyecto.*
*Todo el codigo fuente esta en `/home/z/my-project/`*
