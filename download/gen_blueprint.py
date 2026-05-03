from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.colors import HexColor
from reportlab.lib.units import inch
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable, PageBreak

# Colors
CHARCOAL = HexColor('#2C2525')
DUSTY_ROSE = HexColor('#C17B6E')
BLUSH = HexColor('#F0E6E0')
SAND = HexColor('#E0D5CF')
MEDIUM_GRAY = HexColor('#8A7E7A')
WHITE = HexColor('#FFFFFF')
LIGHT_BLUSH = HexColor('#FDF9F7')

doc = SimpleDocTemplate(
    '/home/z/my-project/download/MAYER_LAW_PROJECT_BLUEPRINT.pdf',
    pagesize=letter,
    topMargin=0.5*inch, bottomMargin=0.5*inch,
    leftMargin=0.6*inch, rightMargin=0.6*inch,
    title='Mayer Law - Complete Project Blueprint',
    author='Mayer Law Project',
)

styles = getSampleStyleSheet()

title_style = ParagraphStyle('T', parent=styles['Title'], fontName='Helvetica-Bold', fontSize=28, textColor=CHARCOAL, spaceAfter=6, alignment=TA_CENTER, leading=34)
subtitle_style = ParagraphStyle('ST', parent=styles['Normal'], fontName='Helvetica', fontSize=11, textColor=MEDIUM_GRAY, spaceAfter=20, alignment=TA_CENTER, leading=14)
h1_style = ParagraphStyle('H1', parent=styles['Heading1'], fontName='Helvetica-Bold', fontSize=16, textColor=DUSTY_ROSE, spaceBefore=20, spaceAfter=10, leading=20)
h2_style = ParagraphStyle('H2', parent=styles['Heading2'], fontName='Helvetica-Bold', fontSize=13, textColor=CHARCOAL, spaceBefore=14, spaceAfter=6, leading=16)
body_style = ParagraphStyle('B', parent=styles['Normal'], fontName='Helvetica', fontSize=9.5, textColor=CHARCOAL, spaceAfter=6, leading=13, alignment=TA_JUSTIFY)
code_style = ParagraphStyle('C', parent=styles['Code'], fontName='Courier', fontSize=7.5, textColor=CHARCOAL, backColor=LIGHT_BLUSH, borderPadding=6, spaceAfter=8, leading=9.5, leftIndent=10, rightIndent=10)
bullet_style = ParagraphStyle('BL', parent=body_style, leftIndent=20, bulletIndent=8, spaceAfter=3)
check_style = ParagraphStyle('CK', parent=body_style, leftIndent=20, bulletIndent=8, spaceAfter=2, fontSize=9, leading=12)
small_style = ParagraphStyle('SM', parent=body_style, fontSize=8, textColor=MEDIUM_GRAY, spaceAfter=3, leading=10)

def make_table(data, col_widths, header_bg=DUSTY_ROSE):
    t = Table(data, colWidths=col_widths)
    style_cmds = [
        ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
        ('FONTNAME', (0,1), (-1,-1), 'Helvetica'),
        ('FONTSIZE', (0,0), (-1,-1), 9),
        ('TEXTCOLOR', (0,0), (-1,0), WHITE),
        ('BACKGROUND', (0,0), (-1,0), header_bg),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [LIGHT_BLUSH, WHITE]),
        ('GRID', (0,0), (-1,-1), 0.5, SAND),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('LEFTPADDING', (0,0), (-1,-1), 6),
    ]
    t.setStyle(TableStyle(style_cmds))
    return t

e = []

# COVER
e.append(Spacer(1, 2*inch))
e.append(Paragraph('MAYER LAW', title_style))
e.append(Spacer(1, 4))
e.append(Paragraph('Complete Project Blueprint', ParagraphStyle('CS', parent=title_style, fontSize=18, textColor=DUSTY_ROSE, spaceAfter=12)))
e.append(HRFlowable(width='30%', thickness=2, color=DUSTY_ROSE, spaceAfter=16, spaceBefore=8))
e.append(Paragraph('Professional Ecosystem for Nicole Mayer, Esq.', subtitle_style))
e.append(Paragraph('Maitland, Florida  |  (352) 494-3657  |  Nicole@MayerLawFlorida.com', small_style))
e.append(Spacer(1, 1*inch))

status_data = [
    ['STATUS', '85% COMPLETE - READY TO FINALIZE'],
    ['DATE', 'May 3, 2026'],
    ['PATH', '/home/z/my-project/'],
    ['PRIORITY', 'Connect page.tsx View Router (single task)'],
]
e.append(make_table(status_data, [1.2*inch, 5*inch]))
e.append(PageBreak())

# 1. CLIENT CONTEXT
e.append(Paragraph('1. CLIENT CONTEXT', h1_style))
e.append(HRFlowable(width='100%', thickness=1, color=DUSTY_ROSE, spaceAfter=10))

client_data = [
    ['Field', 'Value'],
    ['Firm Name', 'Mayer Law'],
    ['Attorney', 'Nicole Mayer (20+ years experience, founded 2020)'],
    ['Location', 'Maitland, Florida, USA'],
    ['Phone', '(352) 494-3657'],
    ['Email', 'Nicole@MayerLawFlorida.com'],
    ['Current Website', 'mayerlawflorida.com'],
]
e.append(make_table(client_data, [1.8*inch, 4.5*inch]))
e.append(Spacer(1, 10))

e.append(Paragraph('Practice Areas', h2_style))
areas = [
    '1. Consumer Finance Law - "Your rights. Our fight."',
    '2. Education Law &amp; Civil Rights - "Equal treatment. No exceptions."',
    '3. Personal Injury - "You deserve better."',
    '4. General Litigation &amp; Consulting - "Practical solutions. Skilled advocacy."',
]
for a in areas:
    e.append(Paragraph(a, bullet_style))

e.append(Paragraph('The 3R Promise: Resourceful | Relentless | Representation', h2_style))
e.append(Paragraph('Resourceful: Finding quick and clever ways to overcome difficulties. Relentless: No abatement of severity, intensity, or pace. Representation: Standing for another with full rights and obligations. This brand identity defines Mayer Law and should be reflected throughout the website.', body_style))

e.append(Paragraph('Stats', h2_style))
stats = [['2,000+', 'Consultations'], ['93%', 'Success Rate'], ['20+', 'Years'], ['$20M+', 'Recovered']]
e.append(make_table(stats, [1.2*inch, 2.3*inch]*2))

e.append(PageBreak())

# 2. PALETTE
e.append(Paragraph('2. SELECTED PALETTE: BLUSH &amp; CHARCOAL', h1_style))
e.append(HRFlowable(width='100%', thickness=1, color=DUSTY_ROSE, spaceAfter=10))
e.append(Paragraph('The user chose this palette because it conveys warmth, sophistication, and calm. It reflects the approachable yet professional nature of Mayer Law.', body_style))

palette = [
    ['Color', 'Hex Code', 'Usage'],
    ['Blush White', '#FBF7F4', 'Main background'],
    ['Warm Charcoal', '#2C2525', 'Primary text'],
    ['Dusty Rose', '#C17B6E', 'Buttons, accents, CTAs'],
    ['Deep Rose', '#A8645A', 'Hover states'],
    ['Dark Rose', '#8B5248', 'Gradient endpoints'],
    ['Light Blush', '#F0E6E0', 'Card backgrounds, secondary'],
    ['Sand', '#E0D5CF', 'Borders, inputs, subtle bg'],
    ['Sage', '#C8C0B8', 'Success states, completed steps'],
    ['Medium Gray', '#8A7E7A', 'Secondary/muted text'],
]
e.append(make_table(palette, [1.8*inch, 1.2*inch, 3.3*inch]))
e.append(Spacer(1, 8))
e.append(Paragraph('Typography: Playfair Display (serif) for headings, Inter (sans-serif) for body text. Loaded via next/font/google.', body_style))

e.append(PageBreak())

# 3. STATUS
e.append(Paragraph('3. PROJECT STATUS', h1_style))
e.append(HRFlowable(width='100%', thickness=1, color=DUSTY_ROSE, spaceAfter=10))

e.append(Paragraph('ALREADY BUILT (85%)', h2_style))
completed = [
    'Infrastructure: Next.js 16 + Tailwind 4 + shadcn/ui + Prisma SQLite + Zustand + framer-motion',
    'CSS Theme: Full Blush &amp; Charcoal palette in globals.css with custom utility classes',
    'Database: 9 Prisma models (Appointment, AppointmentDocument, Review, Client, ClientDocument, ClientMessage, Invoice, ContactSubmission, SiteSettings)',
    'API Routes (18): appointments, contact, reviews, client, documents, messages, settings, admin - all functional',
    'Website Components (9): Header, Hero, PracticeAreas, About, Stats, Testimonials, CTABanner, Contact, Footer',
    'Booking System (438 lines): 5-step flow with full client intake (address, urgency, docs, consent)',
    'Client Portal (553 lines): Login + Dashboard with Messages, Documents, Appointments, Invoices tabs',
    'Admin Panel (653 lines): Login + Dashboard with 6 management tabs (Appearance, Content, Blocks, etc.)',
    'Review System (242 lines): Star rating + share link + social sharing',
    'Shared Components (3): AnimatedCounter, SectionWrapper, StarRating',
    'Zustand Store (134 lines): Complete state management with all booking intake fields',
    'Assets (16 files): Real logo, favicon, attorney photo from mayerlawflorida.com + 12 abstract images',
    'Seed Data: 6 testimonials + demo client + default site settings',
]
for c in completed:
    e.append(Paragraph('[x] ' + c, check_style))

e.append(Spacer(1, 10))
e.append(Paragraph('REMAINING (15%) - SINGLE TASK', h2_style))
e.append(Paragraph('[ ] REWRITE src/app/page.tsx', ParagraphStyle('R', parent=check_style, textColor=HexColor('#C0392B'))))
e.append(Paragraph('Replace the current palette selector (601 lines) with the View Router that connects all 18 ecosystem components. See Section 4 for exact code.', ParagraphStyle('RD', parent=small_style, leftIndent=30)))

e.append(Spacer(1, 8))
e.append(Paragraph('POST-CONNECTION STEPS', h2_style))
post = [
    'Run: bun run db:push &amp;&amp; bun run db:generate',
    'Run seed script to populate testimonials + demo data',
    'Verify: bun run lint (0 errors expected)',
    'Check: tail -20 dev.log (200 responses)',
    'Test each view: website, booking, review, portal, admin',
    'Optional: Create public/manifest.json for PWA',
]
for p in post:
    e.append(Paragraph('[ ] ' + p, check_style))

e.append(PageBreak())

# 4. PAGE.TSX TEMPLATE
e.append(Paragraph('4. HOW TO CONNECT PAGE.TSX', h1_style))
e.append(HRFlowable(width='100%', thickness=1, color=DUSTY_ROSE, spaceAfter=10))
e.append(Paragraph('Replace the entire content of src/app/page.tsx with this View Router. This is the ONLY remaining code task.', body_style))

code = (
    "'use client'<br/>"
    "import { AnimatePresence, motion } from 'framer-motion'<br/>"
    "import { useAppStore } from '@/store/useAppStore'<br/><br/>"
    "// Website sections<br/>"
    "import Header from '@/components/website/Header'<br/>"
    "import HeroSection from '@/components/website/HeroSection'<br/>"
    "import PracticeAreasSection from '@/components/website/PracticeAreasSection'<br/>"
    "import AboutSection from '@/components/website/AboutSection'<br/>"
    "import StatsSection from '@/components/website/StatsSection'<br/>"
    "import TestimonialsSection from '@/components/website/TestimonialsSection'<br/>"
    "import CTABanner from '@/components/website/CTABanner'<br/>"
    "import ContactSection from '@/components/website/ContactSection'<br/>"
    "import Footer from '@/components/website/Footer'<br/><br/>"
    "// Other views<br/>"
    "import BookingPage from '@/components/booking/BookingPage'<br/>"
    "import ReviewForm from '@/components/review/ReviewForm'<br/>"
    "import PortalLogin from '@/components/portal/PortalLogin'<br/>"
    "import PortalDashboard from '@/components/portal/PortalDashboard'<br/>"
    "import AdminLogin from '@/components/admin/AdminLogin'<br/>"
    "import AdminDashboard from '@/components/admin/AdminDashboard'<br/><br/>"
    "function WebsiteView() {<br/>"
    "&nbsp;&nbsp;return (<br/>"
    "&nbsp;&nbsp;&nbsp;&nbsp;&lt;div className='min-h-screen flex flex-col'&gt;<br/>"
    "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;Header /&gt;<br/>"
    "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;main className='flex-1'&gt;<br/>"
    "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;HeroSection /&gt;&lt;PracticeAreasSection /&gt;<br/>"
    "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;AboutSection /&gt;&lt;StatsSection /&gt;<br/>"
    "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;TestimonialsSection /&gt;&lt;CTABanner /&gt;<br/>"
    "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;ContactSection /&gt;<br/>"
    "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/main&gt;<br/>"
    "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;Footer /&gt;<br/>"
    "&nbsp;&nbsp;&nbsp;&nbsp;&lt;/div&gt;<br/>"
    "&nbsp;&nbsp;)<br/>"
    "}<br/><br/>"
    "export default function Home() {<br/>"
    "&nbsp;&nbsp;const { currentView } = useAppStore()<br/>"
    "&nbsp;&nbsp;const { isLoggedIn, isAdminLoggedIn } = useAppStore()<br/>"
    "&nbsp;&nbsp;return (<br/>"
    "&nbsp;&nbsp;&nbsp;&nbsp;&lt;AnimatePresence mode='wait'&gt;<br/>"
    "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;motion.div key={currentView}<br/>"
    "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;initial={{ opacity: 0 }} animate={{ opacity: 1 }}<br/>"
    "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;exit={{ opacity: 0 }} transition={{ duration: 0.3 }}&gt;<br/>"
    "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{currentView === 'website' &amp;&amp; &lt;WebsiteView /&gt;}<br/>"
    "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{currentView === 'booking' &amp;&amp; &lt;BookingPage /&gt;}<br/>"
    "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{currentView === 'review' &amp;&amp; &lt;ReviewForm /&gt;}<br/>"
    "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{currentView === 'portal' &amp;&amp; (isLoggedIn ? &lt;PortalDashboard /&gt; : &lt;PortalLogin /&gt;)}<br/>"
    "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{currentView === 'admin' &amp;&amp; (isAdminLoggedIn ? &lt;AdminDashboard /&gt; : &lt;AdminLogin /&gt;)}<br/>"
    "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/motion.div&gt;<br/>"
    "&nbsp;&nbsp;&nbsp;&nbsp;&lt;/AnimatePresence&gt;<br/>"
    "&nbsp;&nbsp;)<br/>"
    "}"
)
e.append(Paragraph(code, code_style))

e.append(PageBreak())

# 5. ARCHITECTURE
e.append(Paragraph('5. ECOSYSTEM ARCHITECTURE (5 VIEWS)', h1_style))
e.append(HRFlowable(width='100%', thickness=1, color=DUSTY_ROSE, spaceAfter=10))

views = [
    ('View 1: Public Website (Default)',
     'Sticky header with real Mayer Law logo, nav, Book a Call CTA, phone, Client Portal link, mobile menu. Hero section with abstract background and powerful headline. 4 Practice Area cards with hover effects. About section with real attorney photo. Animated stats counters. Testimonial carousel with 6 reviews. CTA banner. Contact form with validation. Professional footer.'),
    ('View 2: Booking System',
     'Cal.com-style 5-step flow: Step 1: Select service from 4 elegant cards. Step 2: Pick date from shadcn Calendar (weekends disabled). Step 3: Choose time slot (9AM-5PM, 30min intervals). Step 4: Complete client intake form with name, email, phone, full address, case description, urgency slider (1-5), document upload, consent checkboxes. Step 5: Review and confirm with calendar link option.'),
    ('View 3: Review System',
     'Star rating (1-5 interactive), service category dropdown, written review textarea, recommendation toggle. Thank you screen with shareable link, copy-to-clipboard button, and social media sharing icons (Facebook, Google, LinkedIn).'),
    ('View 4: Client Portal',
     'Email-based login (auto-registers new users). Dashboard with stats cards and quick actions. Tabs: Messages (chat interface), Documents (upload/download with categories: Case Documents, Forms, Evidence, Correspondence), Appointments (manage upcoming + history), Invoices (payment status tracking).'),
    ('View 5: Admin Panel',
     'Password protected (mayer2025). Dashboard with metrics and recent activity. Tabs: Appearance (live color pickers for 3 colors), Content (text editors for hero, about, contact), Blocks (toggle section visibility), Appointments (table with confirm/cancel actions), Reviews (feature/hide/respond), Clients (list with full profile view including timeline, documents, notes), Messages (contact submissions).'),
]
for title, desc in views:
    e.append(Paragraph(title, h2_style))
    e.append(Paragraph(desc, body_style))

e.append(PageBreak())

# 6. CREDENTIALS
e.append(Paragraph('6. CREDENTIALS &amp; ACCESS', h1_style))
e.append(HRFlowable(width='100%', thickness=1, color=DUSTY_ROSE, spaceAfter=10))

creds = [
    ['Access', 'Credential'],
    ['Admin Panel', 'Password: mayer2025'],
    ['Client Portal Demo', 'Email: demo@mayerlawflorida.com'],
    ['Dev Server', 'Port 3000 (auto-started)'],
    ['Database', 'SQLite via Prisma'],
    ['DB Sync', 'bun run db:push'],
    ['DB Generate', 'bun run db:generate'],
    ['Seed Data', 'bun run prisma/seed.ts'],
    ['Lint Check', 'bun run lint'],
    ['Dev Log', 'tail -20 dev.log'],
    ['Project Path', '/home/z/my-project/'],
]
e.append(make_table(creds, [1.8*inch, 4.5*inch]))

e.append(Spacer(1, 16))
e.append(Paragraph('7. KEY FEATURES THAT AUTOMATE NICOLE\'S WORK', h1_style))
e.append(HRFlowable(width='100%', thickness=1, color=DUSTY_ROSE, spaceAfter=10))

features = [
    ('Online Booking', 'Clients book consultations independently without phone calls'),
    ('Smart Client Intake', 'Maximum client info collected: address, case details, urgency, documents'),
    ('Automated Reminders', '24h and 1h before appointment reminders built into confirmation'),
    ('Document Portal', 'Clients upload/download files organized by category without email chaos'),
    ('Direct Messaging', 'Chat interface between attorney and each client'),
    ('Review System', 'Capture reviews + shareable links + social media distribution'),
    ('Admin Panel', 'Nicole edits colors, texts, images, and content without a developer'),
    ('Client Profiles', 'Complete history per client: appointments, messages, docs, invoices'),
    ('Invoice Tracking', 'Visual payment status management (pending/paid)'),
    ('PWA Ready', 'Works as a mobile app from home screen'),
]
for i, (feat, desc) in enumerate(features, 1):
    e.append(Paragraph(f'<b>{i}.</b> <b>{feat}</b> - {desc}', bullet_style))

e.append(Spacer(1, 20))
e.append(HRFlowable(width='40%', thickness=1, color=SAND, spaceAfter=8))
e.append(Paragraph('End of Blueprint. All source code at /home/z/my-project/', small_style))

doc.build(e)
print('PDF generated: /home/z/my-project/download/MAYER_LAW_PROJECT_BLUEPRINT.pdf')
