# SMART HOME WEBSITE — FULL BUILD PROMPT
> Give this entire file to your AI agent as the build instruction.

---

## PROJECT OVERVIEW

Build a **complete, production-grade smart home automation company website** using **React + Vite**, **Tailwind CSS**, **Framer Motion**, **GSAP**, and **Three.js via React Three Fiber**. The site must feel like a premium, AAA-level product — think Apple meets cyberpunk. Every section must be fully finished, pixel-perfect, properly spaced, and mobile-responsive. No placeholders, no half-built components, no lorem ipsum in final sections.

---

## STEP 1 — DESIGN SYSTEM (DEFINE THIS FIRST, USE EVERYWHERE)

Before writing a single component, define a global design system in `tailwind.config.js` and `src/styles/globals.css`. Everything in the site derives from this system. Never hardcode hex values in JSX — always use the Tailwind config tokens.

### Color Tokens
```js
// tailwind.config.js
colors: {
  bg:         '#040B1F',
  surface:    '#070F2B',
  accent:     '#00C8FF',
  accent2:    '#0057FF',
  gold:       '#D4AF37',
  text:       '#E8F0FF',
  muted:      '#6B7FA3',
  glass:      'rgba(255,255,255,0.04)',
  border:     'rgba(255,255,255,0.08)',
  'border-glow': 'rgba(0,200,255,0.4)',
}
```

### Typography
Import via `<link>` in `index.html` — use `display=swap`:
- **Syne** (weights 700, 800) → all headings, display text
- **DM Sans** (weights 400, 500) → body copy, UI labels
- **Space Mono** (weight 400) → eyebrows, data, code labels, counters

```css
/* globals.css */
body {
  font-family: 'DM Sans', sans-serif;
  background-color: #040B1F;
  color: #E8F0FF;
}
h1, h2, h3, h4 { font-family: 'Syne', sans-serif; }
```

### Spacing — Use These Consistently Across Every Section
| Token | Value |
|---|---|
| Section vertical padding | `py-24` desktop / `py-16` mobile |
| Section container | `max-w-7xl mx-auto px-6 md:px-12` |
| Card inner padding | `p-6` or `p-8` |
| Grid gap | `gap-6 md:gap-8` |
| Heading → subtext | `mt-4` |
| Section title → content | `mt-12 md:mt-16` |

### Glass Card — Reuse This Class Everywhere
```css
/* globals.css */
.glass-card {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 16px;
  transition: all 0.3s ease;
}
.glass-card:hover {
  border-color: rgba(0, 200, 255, 0.4);
  box-shadow: 0 0 24px rgba(0, 200, 255, 0.15),
              inset 0 0 12px rgba(0, 200, 255, 0.04);
}
```

### Neon Glow Text
```css
.glow-text {
  color: #00C8FF;
  text-shadow: 0 0 20px rgba(0, 200, 255, 0.6),
               0 0 60px rgba(0, 200, 255, 0.2);
}
```

### Neon Input Style (for all forms)
```css
.neon-input {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.10);
  border-radius: 12px;
  padding: 12px 16px;
  color: #E8F0FF;
  width: 100%;
  transition: all 0.3s ease;
}
.neon-input::placeholder { color: #6B7FA3; }
.neon-input:focus {
  outline: none;
  border-color: #00C8FF;
  box-shadow: 0 0 0 3px rgba(0, 200, 255, 0.15);
}
```

---

## STEP 2 — GLOBAL LAYOUT RULES (ENFORCE ON EVERY PAGE)

1. Every section uses `max-w-7xl mx-auto px-6 md:px-12` — nothing ever touches the viewport edge on desktop.
2. No two adjacent sections look the same — alternate background treatments:
   - Solid: `bg-bg` (default)
   - Radial glow: `bg-bg` + `radial-gradient(ellipse at center, rgba(0,200,255,0.05) 0%, transparent 70%)`
   - Grid pattern: subtle dot-grid overlay via SVG background-image
3. Every section title block follows this structure, centered:
   ```jsx
   <p className="font-['Space_Mono'] text-accent text-xs tracking-[0.2em] uppercase mb-2">Eyebrow Label</p>
   <h2 className="font-['Syne'] text-3xl md:text-5xl font-bold text-text">Section Title</h2>
   <div className="w-16 h-[2px] bg-accent mx-auto mt-4" />
   <p className="text-muted mt-4 max-w-xl mx-auto">Subtitle sentence goes here.</p>
   ```
4. All scroll reveal animations use:
   ```jsx
   whileInView={{ opacity: 1, y: 0 }}
   initial={{ opacity: 0, y: 40 }}
   transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.1 }}
   viewport={{ once: true }}
   ```
5. All hover interactive elements include `transition-all duration-300` — never abrupt changes.

---

## STEP 3 — GLOBAL COMPONENTS

### `<Navbar />`
- Fixed top, full width
- `bg-[#040B1F]/60 backdrop-blur-md border-b border-white/5 z-50`
- **Left:** Brand logo — wordmark in Syne bold + small glowing cyan dot
- **Center (desktop):** Navigation links — `Home | About | Products | Solutions | Franchise | Dashboard | Contact`
  - Style: `text-sm font-medium text-muted hover:text-accent transition-colors duration-300`
- **Right (desktop):** CTA button — `border border-accent text-accent px-5 py-2 rounded-full text-sm hover:bg-accent/10 transition-all duration-300`
- **Mobile:** Hamburger icon → full-screen overlay menu (`bg-[#040B1F] fixed inset-0 z-50`) with links stacked vertically, center-aligned, `text-2xl`. Animate with Framer `AnimatePresence` sliding down from top.
- Navbar itself fades in on load: `initial={{ opacity:0, y:-20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6 }}`

---

### `<Footer />`
- `bg-surface border-t border-white/5 py-16`
- **4-column grid on desktop** (`grid-cols-4`), `grid-cols-2` on tablet, `grid-cols-1` on mobile
- Columns: Brand + tagline + socials | Quick Links | Products | Contact Info
- Bottom row: `border-t border-white/5 mt-12 pt-6 flex justify-between items-center`
  - Left: copyright text in Space Mono, muted
  - Right: social icon row with neon hover glow
- Social icons: use Lucide React icons, `hover:text-accent transition-colors`

---

### `<CursorGlow />` (render in App root)
- `fixed pointer-events-none z-30 w-72 h-72 rounded-full bg-accent/10 blur-3xl`
- Position follows mouse via `useMotionValue` + `useSpring({ stiffness: 80, damping: 20 })`
- **Only render on pointer:fine devices** — check `window.matchMedia('(pointer: fine)').matches`
- Offset position by `-144px` (half of 288px) so it centers on cursor

---

### `<ScrollProgressBar />`
- `fixed top-0 left-0 h-[2px] bg-accent z-50 origin-left`
- Width driven by Framer `useScroll` → `useTransform(scrollYProgress, [0,1], ['0%','100%'])`
- Apply as `scaleX` on a `motion.div` with `transformOrigin: 'left'`

---

### `<ParticleBackground />` (render behind all page content)
- Three.js `Points` with `BufferGeometry` — 200 points on desktop, 80 on mobile
- Points: `PointsMaterial` color `#00C8FF`, size 0.6, opacity 0.35, transparent
- Animation via `useFrame`: each point drifts slowly (add 0.0001–0.0003 per frame to x/y position, wrapping at bounds)
- Fixed canvas, `z-index: 0`, `pointer-events: none`
- Wrap in `<Suspense fallback={null}>` to avoid blocking render

---

### `<SparkEffect />` (golden click burst)
- Global context-based: `SparkContext` provides a `triggerSpark(x, y)` function
- Canvas element fixed to viewport, `pointer-events-none z-50`
- On `triggerSpark(x, y)`: spawn 24 particles from (x, y)
  - Each particle: random angle, velocity 2–6, color `#D4AF37` or `#FFD700`
  - Animate: position += velocity, velocity *= 0.92, opacity -= 0.025 per frame
  - Remove particle when opacity ≤ 0
- Render loop via `requestAnimationFrame`, clear canvas each frame
- `<NeonButton spark>` calls `triggerSpark` on click using the context

---

### `<NeonButton />` (reusable)
Props: `variant` (`filled` | `outlined`), `spark` (boolean), `onClick`, `children`, `size`

```jsx
// filled variant
className="bg-accent text-bg font-semibold px-6 py-3 rounded-full hover:shadow-[0_0_24px_rgba(0,200,255,0.5)] transition-all duration-300"

// outlined variant
className="border border-accent text-accent px-6 py-3 rounded-full hover:bg-accent/10 hover:shadow-[0_0_16px_rgba(0,200,255,0.3)] transition-all duration-300"
```

---

### `<SectionHeading />` (reusable)
```jsx
// Props: eyebrow, title, subtitle, align ('center' | 'left')
```
Always wrap in a `motion.div` with scroll reveal animation.

---

### `<StatCounter />` (reusable)
- Displays a number that counts up from 0 to `value` when in view
- Use Framer `useInView` + `useMotionValue` + `useTransform` for the count animation
- Duration: 2s ease-out
- Display formatted number (e.g. `1,000+`)

---

## STEP 4 — ROUTING

Use React Router v6. Setup in `App.jsx`:
```jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
  <Route path="/products" element={<Products />} />
  <Route path="/solutions" element={<Solutions />} />
  <Route path="/franchise" element={<Franchise />} />
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/contact" element={<Contact />} />
</Routes>
```

Init Lenis in `App.jsx`:
```jsx
useEffect(() => {
  const lenis = new Lenis({ lerp: 0.08 });
  function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
  requestAnimationFrame(raf);
  // Disable on mobile
  if (window.innerWidth < 768) lenis.destroy();
}, []);
```

---

## STEP 5 — PAGE: HOME (`/`)

### Section 1 — Hero
- `min-h-screen relative flex flex-col items-center justify-center overflow-hidden`
- **Background layer:** React Three Fiber canvas — render a particle field of 200 slow-drifting cyan dots connected by thin lines (use `THREE.Points` + `THREE.LineSegments`). Alternatively a low-poly floating house mesh with ambient neon lighting (point lights cyan + blue, `useFrame` for slow rotation). Canvas is `absolute inset-0 z-0`.
- **Gradient overlay:** `absolute inset-0 bg-gradient-to-b from-transparent via-bg/20 to-bg z-10 pointer-events-none`
- **Content (relative z-20, text-center, max-w-4xl mx-auto px-6):**
  - Eyebrow: `NEXT-GEN HOME AUTOMATION` — Space Mono, text-accent, `text-xs tracking-[0.25em] uppercase`
  - H1: `"Your Home, Intelligently Alive"` — Syne Black, `text-5xl md:text-7xl lg:text-8xl font-black leading-tight`. The word "Intelligently" gets class `glow-text`.
  - Subtext: `mt-6 text-muted text-lg md:text-xl max-w-lg mx-auto`
  - Buttons row: `mt-10 flex flex-col sm:flex-row gap-4 justify-center`
    - `<NeonButton variant="filled" spark>Request a Demo</NeonButton>`
    - `<NeonButton variant="outlined">See How It Works</NeonButton>`
  - Scroll indicator: `mt-16 flex flex-col items-center gap-2 text-muted text-xs`
    - Animated bouncing chevron-down icon (Framer `animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.4 }}`)
- **Framer entrance:** H1 words stagger in `y: 40 → 0, opacity: 0 → 1, delay: index * 0.08`

---

### Section 2 — Voice Control Showcase
- `py-24 relative overflow-hidden`
- Background: subtle radial glow from center
- `<SectionHeading eyebrow="AI VOICE CONTROL" title="Just Say the Word" subtitle="Control your entire home with natural voice commands." />`
- Below: 3 glass pill cards in a row (`grid-cols-1 md:grid-cols-3 gap-6 mt-16`)
  - Card 1: `"Alexa, Good Night"` — Icon: moon. Below: 3 micro-icons (curtains, lights off, AC adjust)
  - Card 2: `"Hey Google, Movie Mode"` — Icon: film. Below: 3 micro-icons (dim lights, curtains, TV)
  - Card 3: `"Set Away Mode"` — Icon: shield. Below: 3 micro-icons (lock, sensor, power)
- Each card: glass-card, pulsing cyan dot top-right (`animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 2 }}`), command text in Syne bold, micro-action icons row below in muted
- Hover: card lifts, border glows, micro-action labels fade in via `AnimatePresence`

---

### Section 3 — Feature Grid
- `py-24 bg-surface/30`
- `<SectionHeading eyebrow="CORE FEATURES" title="Everything Smart. All in One Place." />`
- Grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16`
- Cards: Smart Lights | Smart AC | Smart Curtains | Smart Locks
- Each card structure:
  ```jsx
  <motion.div className="glass-card p-8 flex flex-col items-start gap-4" whileHover={{ scale: 1.03, y: -4 }}>
    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
      <Icon className="text-accent w-6 h-6" />
    </div>
    <h3 className="font-['Syne'] text-xl font-bold text-text">Smart Lights</h3>
    <p className="text-muted text-sm leading-relaxed">Short 1–2 line feature description.</p>
  </motion.div>
  ```
- Stagger scroll reveal: each card `delay: index * 0.1`

---

### Section 4 — Automation Modes
- `py-24`
- `<SectionHeading eyebrow="SMART AUTOMATION" title="Your Home Knows Your Routine." />`
- Two-column layout on desktop (`grid-cols-5 gap-12 items-start mt-16`), stacked on mobile:
  - **Left col (2/5):** Stacked list of mode buttons — `Movie Mode | Night Mode | Away Mode | Morning Mode | Party Mode`
    - Each: glass pill, left border `border-l-2`. Active: `border-accent text-text`. Inactive: `border-transparent text-muted`
    - On click: set active mode state, Framer layout animation smoothly moves the active indicator
  - **Right col (3/5):** Glass card panel showing active mode details
    - Large icon (Lucide) + mode name in Syne bold + description paragraph
    - Row of 3–4 activated device icons with labels
    - `AnimatePresence mode="wait"` — content cross-fades on mode change
- Background: faint radial glow from right side

---

### Section 5 — Control From Anywhere
- `py-24 bg-surface/20`
- Two-column (`grid-cols-2 gap-16 items-center`), stacked on mobile (image first)
- **Left:**
  - `<SectionHeading align="left" eyebrow="REMOTE ACCESS" title="Control From Anywhere in the World." />`
  - Description paragraph
  - Stats row (3 counters): `1,000+ Homes | 4,000+ Devices | 5 Cities` — each in its own mini block with `<StatCounter />`
  - App store badges row (SVG badges, styled)
- **Right:** Phone mockup — CSS-drawn phone frame (`border-2 border-white/10 rounded-[40px] bg-surface p-2 w-64 mx-auto`) containing a mini UI of the app (glass panels, neon toggle rows)
- Scroll reveal: left slides from left, right slides from right

---

### Section 6 — Testimonials
- `py-24`
- `<SectionHeading eyebrow="TESTIMONIALS" title="Trusted by 1,000+ Homes." />`
- Carousel: one testimonial at a time, centered, max-w-2xl mx-auto
- Glass card: `p-10 text-center`
  - Large quote mark in accent color, `text-6xl font-['Syne']`
  - Quote text `text-text text-lg leading-relaxed mt-4`
  - Avatar circle + Name (`font-semibold text-text`) + Role (`text-muted text-sm`) — `mt-8`
- Navigation: prev/next arrows (outlined icon buttons, neon hover) + dot indicators below
- `AnimatePresence` with slide + fade (`x: 60 → 0, opacity: 0 → 1`)
- Touch swipe: add `onPanEnd` handler for mobile swipe navigation

---

### Section 7 — CTA Banner
- `py-32 relative overflow-hidden`
- Background: `bg-bg` + centered radial gradient `rgba(0,200,255,0.08)` + subtle dot-grid overlay SVG
- Content centered, max-w-2xl:
  - H2: `"Ready to Transform Your Home?"` — Syne, `text-4xl md:text-6xl font-black`
  - Subtext: muted, `mt-4`
  - `<NeonButton variant="filled" spark size="lg" className="mt-10">Request a Demo →</NeonButton>`
- No card or border — open, dramatic full-bleed section

---

## STEP 6 — PAGE: ABOUT (`/about`)

### Inner Page Hero (reusable pattern for all inner pages)
- `py-32 text-center bg-surface/20 border-b border-white/5`
- Eyebrow + H1 + short description
- Breadcrumb: `Home / About` in Space Mono, muted, small

### Section: Vision & Mission
- `py-24`
- Two glass cards side by side (`grid-cols-2 gap-8`), stacked on mobile
- Each card: `p-10 glass-card`, neon icon top, bold title, paragraph

### Section: Animated Timeline
- `py-24 bg-surface/20`
- `<SectionHeading eyebrow="OUR JOURNEY" title="How We Got Here." />`
- Vertical timeline (`mt-16 relative`): center vertical line `w-[2px] bg-accent/30 absolute left-1/2`
- Each milestone:
  - Alternates left and right of center line on desktop
  - Always left-aligned on mobile
  - Glass card with: year (Space Mono, neon), title (Syne bold), description (DM Sans muted)
  - Circle dot on the center line: `w-4 h-4 rounded-full bg-accent border-2 border-bg`
  - Scroll reveal: left items slide from left, right items slide from right

### Section: Stats Row
- `py-24`
- `grid-cols-2 md:grid-cols-4 gap-6 mt-12`
- Each: glass card, centered, neon icon, `<StatCounter />`, label below in muted

### Section: Team (optional)
- `py-24 bg-surface/20`
- `grid-cols-2 md:grid-cols-4 gap-6`
- Each card: avatar circle (gradient placeholder), name, role, socials

---

## STEP 7 — PAGE: PRODUCTS (`/products`)

### Filter Tabs
- `flex gap-3 flex-wrap mt-8 mb-12`
- Tabs: `All | Lighting | Climate | Security | Curtains`
- Each tab: `px-5 py-2 rounded-full text-sm font-medium border border-white/10 cursor-pointer transition-all duration-300`
- Active: `bg-accent text-bg border-accent`
- Inactive: `text-muted hover:text-text hover:border-white/20`
- On tab change: filter displayed products with `AnimatePresence`

### Product Grid
- `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8`
- Each card: `glass-card overflow-hidden group`
  - Image area: `aspect-[4/3] bg-gradient-to-br from-accent/10 to-accent2/5 relative overflow-hidden`
    - Product icon centered, large, neon colored
    - On group-hover: subtle scale `transform scale-110` on icon
  - Content: `p-6`
    - Category chip: `text-xs font-['Space_Mono'] border border-accent/40 text-accent px-3 py-1 rounded-full inline-block`
    - Product name: Syne bold, text-xl
    - Short spec line: muted, text-sm, `mt-2`
    - CTA row: `mt-6 flex justify-between items-center`
      - Price or "From ₹X,XXX" in text-text font-semibold
      - "View Details →" text-accent text-sm hover:underline
- 3D tilt on hover: CSS `perspective: 1000px` on wrapper, `transform: rotateX/Y` via `onMouseMove` listener (max ±8 degrees)

### Product Detail Modal
- Trigger on card click
- `AnimatePresence` — on desktop: fade-in centered overlay. On mobile: slide-up sheet
- Modal: `glass-card max-w-3xl w-full p-8 md:p-12 relative`
  - Close button top-right
  - Two-column on desktop: image left, details right
  - Full specs list, description, CTA button (neon filled, spark)

---

## STEP 8 — PAGE: SOLUTIONS (`/solutions`)

Four alternating sections — text + visual side by side:

### Pattern (repeat for each solution)
```
Section: Living Room Automation
Section: Bedroom Automation
Section: Security & Surveillance
Section: Energy Optimization
```

### Each Section Structure
- `py-24 border-t border-white/5`
- `grid-cols-2 gap-16 items-center` on desktop, stacked on mobile
- Alternates: even sections = text left + visual right / odd sections = visual left + text right
- **Text side:**
  - Eyebrow + H3 Syne bold `text-3xl md:text-4xl` + description paragraph
  - Feature list: `space-y-3 mt-6`
    - Each row: `flex items-start gap-3` — neon checkmark icon + text
  - `<NeonButton variant="outlined" className="mt-8">Learn More</NeonButton>`
- **Visual side:**
  - Glass card `aspect-square md:aspect-[4/3]` with:
    - Gradient bg from accent/10 to accent2/5
    - Large Lucide icon centered (80px, neon colored)
    - Subtle animated ring: `animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ repeat: Infinity, duration: 3 }}`
- Scroll reveal: text slides from its side, visual slides from opposite side

---

## STEP 9 — PAGE: FRANCHISE (`/franchise`)

### Hero (inner page hero pattern)
- Title: "Partner With Us"
- Subtitle: "Bring smart home automation to your city"

### Section: Why Franchise
- `grid-cols-1 md:grid-cols-3 gap-8`
- 3 glass cards: Low Investment | High Demand | Full Support — icon + title + paragraph

### Section: ROI Calculator
- `py-24 bg-surface/20`
- `<SectionHeading eyebrow="ESTIMATE YOUR EARNINGS" title="See Your Potential ROI." />`
- Single large glass card `max-w-3xl mx-auto p-10 mt-12`
  - Two inputs side by side on desktop:
    - **City Tier:** Select (`Tier 1 | Tier 2 | Tier 3`) — styled as neon select
    - **Investment Amount:** Range slider (`₹5L – ₹50L`) — `accent-color: #00C8FF`
  - Below: results panel `mt-8 grid-cols-3 gap-6`
    - Estimated Monthly Revenue (animates when inputs change)
    - Break-even Period
    - Year-1 ROI %
  - All numbers animate via Framer `useSpring` when value changes

### Section: Investment Tiers
- `grid-cols-1 md:grid-cols-3 gap-8`
- Cards: Starter | Growth | Premium
- Middle card: `border-accent` highlight, "Most Popular" badge top-right
- Each: title, price/investment range, list of inclusions (checkmarks), CTA button

### Section: Enquiry Form
- `py-24`
- Large glass card `max-w-2xl mx-auto p-10`
- Fields: Name | City | Phone | Investment Budget (select) | Message (textarea)
- All use `.neon-input` class
- Submit: `<NeonButton variant="filled" spark className="w-full mt-2">Submit Enquiry</NeonButton>`
- On submit: validate fields, show success state (replace form with animated checkmark + success message)

---

## STEP 10 — PAGE: CONTACT (`/contact`)

### Layout
- `py-24`
- `grid-cols-5 gap-16` on desktop, stacked on mobile

### Left column (col-span-2)
- `<SectionHeading align="left" eyebrow="GET IN TOUCH" title="We'd Love to Hear From You." />`
- Contact info items: `space-y-6 mt-10`
  - Each: `flex items-start gap-4` — glass pill `p-4 rounded-xl`, icon (neon), label (muted text-xs) + value (text-text font-medium)
  - Items: Address | Phone | Email | Office Hours
- WhatsApp CTA: `mt-8`
  - Button: `bg-[#25D366] text-white px-6 py-3 rounded-full flex items-center gap-2 font-semibold hover:shadow-[0_0_20px_rgba(37,211,102,0.4)] transition-all duration-300`
  - WhatsApp icon + "Chat on WhatsApp"

### Right column (col-span-3)
- Glass card `p-10`
- Form: Name | Email | Subject | Message (textarea `rows-5`)
- All `.neon-input` styled
- `<NeonButton variant="filled" spark className="w-full mt-2">Send Message</NeonButton>`
- Success state: `AnimatePresence` — form fades out, success message (checkmark + text) fades in

### Map Section
- `py-0 pb-24`
- Heading: "Find Us"
- Google Maps iframe wrapped in glass border `rounded-2xl overflow-hidden border border-white/10`
- Apply CSS filter to iframe wrapper: `filter: invert(0.9) hue-rotate(180deg) saturate(0.8)` for dark theme

### Floating WhatsApp Button (global, fixed bottom-right)
- `fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg hover:shadow-[0_0_20px_rgba(37,211,102,0.6)] transition-all duration-300`
- Tooltip on hover: "Chat with us!"
- `animate={{ scale: [1, 1.05, 1] }} transition={{ repeat: Infinity, duration: 2 }}` — subtle pulse

---

## STEP 11 — PAGE: DASHBOARD DEMO (`/dashboard`)

### Layout
- Full page, `pt-8 pb-24 px-6 md:px-12 max-w-7xl mx-auto`
- Page title section: `<SectionHeading eyebrow="LIVE DEMO" title="Smart Home Control Center." />`
- Main panel: `grid-cols-5 gap-8 mt-12`
  - Left (col-span-2): Controls panel
  - Right (col-span-3): Visualization + energy data

### Controls Panel (left, col-span-2)
- Glass card `p-8 sticky top-24`
- Grouped sections with `space-y-8`:
  - **"Living Room"** — subheading in Space Mono, neon, small. Then:
    - Toggle row: Lights — custom toggle switch (CSS, glows cyan when on)
    - Toggle row: TV
    - Slider: AC Temperature `18°C – 30°C` (neon styled range input)
    - Slider: Brightness `0–100%`
  - **"Bedroom"** — same toggle/slider pattern
  - **"Security"** — Lock/Unlock button, Sensor toggle, Camera toggle

### Toggle Switch Component
```jsx
// Custom CSS toggle — pill shape, bg-accent when on, bg-white/10 when off
// Transition: 0.3s all ease
// Thumb: white circle, translateX on state change
```

### Visualization Panel (right, col-span-3)
- React Three Fiber scene — isometric room or top-down floor plan
  - Three.js `BoxGeometry` rooms with `MeshStandardMaterial`
  - Point lights (intensity driven by React state — on=1.5, off=0, animated via `useSpring`)
  - Camera: fixed isometric angle
  - Floor: dark grid material
- Below 3D scene: Energy monitoring mini-panel
  - `"Current Usage: 2.4 kW"` — updates every 2s with randomized ±0.2 variation, animated via `useSpring`
  - Recharts `<AreaChart>` — 20 data points, auto-updating, neon cyan fill with gradient

### Mobile layout
- Controls below visualization
- Visualization: fixed height `h-64`, controls scroll below

---

## STEP 12 — SPECIAL EFFECTS IMPLEMENTATION

### Lenis Smooth Scroll
```js
// App.jsx — in useEffect
const lenis = new Lenis({ lerp: 0.08, smoothWheel: true });
function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
requestAnimationFrame(raf);
// Destroy on mobile
if (window.matchMedia('(max-width: 768px)').matches) lenis.destroy();
```

### Page Transitions
- Wrap `<Routes>` in `<AnimatePresence mode="wait">`
- Each page component wrapped in: `<motion.main initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration: 0.3 }}>`

---

## STEP 13 — MOBILE RESPONSIVENESS (MANDATORY)

Test at 375px, 390px, 430px. Every item below must work:

| Component | Mobile behavior |
|---|---|
| Navbar | Hamburger → full-screen overlay menu |
| Hero H1 | `text-4xl` max, centered |
| Feature grid | `grid-cols-1` |
| Voice showcase cards | `grid-cols-1` stacked |
| Two-column sections | Always stacked, visual on top |
| Testimonials | Touch-swipe with `onPanEnd` |
| Product modals | Bottom sheet style (slide up) |
| Dashboard | Controls below visualization |
| ROI Calculator | Inputs full width, stacked |
| Forms | All inputs `w-full` |
| CursorGlow | Disabled |
| Particle background | 80 particles max |
| Section padding | `py-16` instead of `py-24` |
| All font sizes | `clamp()` or `text-Xsm md:text-Xlg` pattern |
| Footer | `grid-cols-1` stacked |
| Floating WhatsApp | Stays fixed bottom-right, always visible |

---

## STEP 14 — PERFORMANCE REQUIREMENTS

- All Three.js scenes wrapped in `<Suspense fallback={<div className="animate-pulse bg-surface rounded-xl" />}>`
- Lazy-load all pages: `const Home = lazy(() => import('./pages/Home'))`
- Images: use `loading="lazy"` attribute
- Three.js models: low-poly only (< 5k vertices)
- Tailwind: JIT mode (default in v3), no unused CSS
- Framer Motion: import only what's needed (`import { motion } from 'framer-motion'`)
- Lenis destroyed on mobile to avoid performance issues
- `will-change: transform` applied to animated Framer elements

---

## STEP 15 — DEPENDENCIES

```json
{
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.26.0",
    "framer-motion": "^11.3.0",
    "gsap": "^3.12.5",
    "@gsap/react": "^2.1.1",
    "@react-three/fiber": "^8.17.0",
    "@react-three/drei": "^9.109.0",
    "three": "^0.167.0",
    "@react-spring/three": "^9.7.3",
    "lenis": "^1.1.9",
    "recharts": "^2.12.7",
    "lucide-react": "^0.438.0"
  },
  "devDependencies": {
    "vite": "^5.4.0",
    "@vitejs/plugin-react": "^4.3.1",
    "tailwindcss": "^3.4.10",
    "postcss": "^8.4.45",
    "autoprefixer": "^10.4.20"
  }
}
```

---

## STEP 16 — FILE STRUCTURE

```
src/
├── components/
│   ├── global/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── CursorGlow.jsx
│   │   ├── SparkEffect.jsx          ← context + canvas
│   │   ├── ParticleBackground.jsx
│   │   ├── ScrollProgressBar.jsx
│   │   └── FloatingWhatsApp.jsx
│   ├── ui/
│   │   ├── GlassCard.jsx
│   │   ├── NeonButton.jsx
│   │   ├── SectionHeading.jsx
│   │   ├── StatCounter.jsx
│   │   ├── ToggleSwitch.jsx
│   │   └── InnerPageHero.jsx
│   └── sections/
│       ├── home/
│       │   ├── Hero.jsx
│       │   ├── VoiceShowcase.jsx
│       │   ├── FeatureGrid.jsx
│       │   ├── AutomationModes.jsx
│       │   ├── ControlAnywhere.jsx
│       │   ├── Testimonials.jsx
│       │   └── CTABanner.jsx
│       ├── about/
│       │   ├── VisionMission.jsx
│       │   ├── Timeline.jsx
│       │   └── StatsRow.jsx
│       ├── products/
│       │   ├── FilterTabs.jsx
│       │   ├── ProductGrid.jsx
│       │   └── ProductModal.jsx
│       ├── solutions/
│       │   └── SolutionSection.jsx  ← reusable, used 4x
│       ├── franchise/
│       │   ├── WhyFranchise.jsx
│       │   ├── ROICalculator.jsx
│       │   ├── InvestmentTiers.jsx
│       │   └── FranchiseForm.jsx
│       ├── contact/
│       │   ├── ContactInfo.jsx
│       │   ├── ContactForm.jsx
│       │   └── MapSection.jsx
│       └── dashboard/
│           ├── ControlsPanel.jsx
│           ├── RoomVisualization.jsx
│           └── EnergyMonitor.jsx
├── pages/
│   ├── Home.jsx
│   ├── About.jsx
│   ├── Products.jsx
│   ├── Solutions.jsx
│   ├── Franchise.jsx
│   ├── Dashboard.jsx
│   └── Contact.jsx
├── hooks/
│   ├── useMediaQuery.js
│   ├── useSpark.js
│   └── useScrollProgress.js
├── context/
│   └── SparkContext.jsx
├── styles/
│   └── globals.css
├── App.jsx
└── main.jsx
```

---

## FINAL QUALITY CHECKLIST

Before considering the build done, verify every item:

**Layout & Spacing**
- [ ] No section ever touches the viewport edge — all use `max-w-7xl mx-auto px-6 md:px-12`
- [ ] Every section has `py-24` desktop / `py-16` mobile vertical padding
- [ ] No two adjacent sections share the same background treatment
- [ ] All grids use `gap-6 md:gap-8` — no cramped content anywhere
- [ ] Every text block follows the eyebrow → heading → body → CTA hierarchy

**Interaction & Animation**
- [ ] All hover states use `transition-all duration-300` — no abrupt changes
- [ ] All scroll reveals use `viewport={{ once: true }}` — don't re-animate on scroll back
- [ ] Click spark fires on all `<NeonButton spark>` clicks
- [ ] Page transitions are smooth (`AnimatePresence` mode="wait")
- [ ] Testimonial carousel works with both click and touch swipe

**Mobile**
- [ ] Tested at 375px — no horizontal overflow anywhere
- [ ] Navbar hamburger menu works and closes properly
- [ ] All two-column layouts stack correctly on mobile
- [ ] Product modal becomes bottom sheet on mobile
- [ ] All form inputs are `w-full` and properly sized for touch
- [ ] CursorGlow does not render on touch devices

**Performance**
- [ ] All pages are lazy-loaded
- [ ] All Three.js scenes have `<Suspense>` fallback
- [ ] Lenis is destroyed/disabled on mobile
- [ ] No console errors or warnings on load
- [ ] Fonts loaded with `display=swap` to prevent layout shift

**Completeness**
- [ ] All 7 pages are fully built — no "coming soon" or placeholder content
- [ ] Footer has real nav links (all routes connected)
- [ ] Forms have validation + success/error states
- [ ] Floating WhatsApp button is globally visible on all pages
- [ ] ScrollProgressBar is globally active on all pages
- [ ] All Tailwind custom colors defined in `tailwind.config.js` — no hardcoded hex in JSX

---

Build this as a complete, shippable website. The result should look and feel like a professionally designed ₹10L+ product. Every page fully built. Every component pixel-perfect. Every interaction smooth.
