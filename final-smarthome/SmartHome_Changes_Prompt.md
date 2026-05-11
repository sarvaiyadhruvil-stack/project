# SMART HOME WEBSITE — CHANGE REQUEST PROMPT
> Apply ONLY the changes listed below. Do NOT touch anything else in the codebase. All existing pages, sections, components, layout rules, design system, spacing, and animations remain exactly as built.

---

## CHANGE 1 — City: Bangalore → Mumbai Bandra

Find every instance of "Bangalore" or "Bengaluru" in the entire codebase — including hardcoded text in components, data arrays, config files, and any mock data strings — and replace with **"Mumbai, Bandra"**.

This includes but is not limited to:
- Stats sections ("5 Cities" copy remains, but if Bangalore appears as an example city, change it)
- Contact page address
- Any franchise page city references
- Any meta tags, SEO titles, or description strings
- Footer address block

Do a full codebase search (`grep -r "Bangalore" && grep -r "Bengaluru"`) to catch everything.

---

## CHANGE 2 — Logo: Loading Screen + Navbar

### 2a — Loading Screen (Splash Screen)

Create a new component: `src/components/global/SplashScreen.jsx`

**Behavior:**
- Renders on top of everything when the app first loads
- Shows for ~2.2 seconds, then animates out and unmounts
- Controlled by state in `App.jsx`: `const [loading, setLoading] = useState(true)` → set to false after 2200ms in a `useEffect`
- Use `AnimatePresence` in `App.jsx` to animate it out

**Visual:**
- `fixed inset-0 z-[9999] flex items-center justify-center bg-[#040B1F]`
- Center: the business logo image (`/public/logo.png` — see logo placement note below)
- Logo: `<img src="/logo.png" alt="Logo" className="w-40 md:w-56 object-contain" />`
- Below logo: thin neon cyan progress bar that fills left to right over 2 seconds
  - `h-[2px] bg-accent/20 rounded-full w-48 mt-6 overflow-hidden`
  - Inner fill: `motion.div` with `initial={{ width:'0%' }} animate={{ width:'100%' }} transition={{ duration: 2, ease:'linear' }}`
- Framer exit animation on the whole splash: `exit={{ opacity: 0 }} transition={{ duration: 0.4 }}`
- Do NOT add any text, taglines, or extra elements — just logo + progress bar

**Logo file placement:**
- Place the logo file at `/public/logo.png`
- The user will drop their logo file into the `/public/` folder with the filename `logo.png`
- If the file is not present yet, use a placeholder: a div with the company name in Syne bold, neon cyan — this will auto-replace once the real logo.png is added

### 2b — Navbar Logo (top left)

In `src/components/global/Navbar.jsx`, replace the current text/wordmark on the left with:

```jsx
<Link to="/" className="flex items-center">
  <img
    src="/logo.png"
    alt="Apex Smart Home"
    className="h-9 w-auto object-contain"
    onError={(e) => {
      // Fallback if logo.png not found
      e.target.style.display = 'none';
      e.target.nextSibling.style.display = 'block';
    }}
  />
  {/* Fallback text — hidden when logo loads */}
  <span
    className="font-['Syne'] font-bold text-xl text-accent hidden"
    style={{ display: 'none' }}
  >
    Apex<span className="text-text">.</span>
  </span>
</Link>
```

- Logo height fixed at `h-9` (36px) on desktop, `h-8` on mobile — never distorted
- `object-contain` ensures correct aspect ratio regardless of logo dimensions
- The `onError` fallback shows the text wordmark if `logo.png` is missing

---

## CHANGE 3 — Fix Glitchy Animations

Apply these fixes across the entire codebase. Do not change what any animation does — only fix the glitchiness.

### Fix 3a — Add `will-change` to all Framer motion elements
Every `<motion.div>` that uses `y`, `x`, `scale`, or `opacity` animations must have:
```jsx
style={{ willChange: 'transform, opacity' }}
```

### Fix 3b — Fix scroll reveal animations
Every `whileInView` animation must have `viewport={{ once: true, margin: "-80px" }}`.
Remove any that are missing `once: true` — repeated triggering on scroll-back causes flicker.

### Fix 3c — Stagger parent must use `variants`
Any section that staggers children must use the Framer `variants` pattern — not inline delays on each child. Replace this pattern:
```jsx
// WRONG — causes stagger glitch
<motion.div delay={index * 0.1} whileInView={...}>
```
With:
```jsx
// CORRECT
const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } }
};
const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

<motion.div variants={containerVariants} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}>
  {items.map(item => (
    <motion.div variants={itemVariants}>{item}</motion.div>
  ))}
</motion.div>
```

### Fix 3d — Lenis + Framer conflict
In `App.jsx`, after Lenis is initialized, sync it with Framer's scroll engine:
```js
lenis.on('scroll', () => {
  // Keep Framer scroll hooks in sync
  window.dispatchEvent(new Event('scroll'));
});
```

### Fix 3e — Three.js canvas flicker
Wrap every `<Canvas>` (React Three Fiber) with:
```jsx
<Canvas
  dpr={[1, 2]}
  performance={{ min: 0.5 }}
  gl={{ antialias: false, powerPreference: 'high-performance' }}
>
```
And add `frameloop="demand"` to any canvas that doesn't need continuous animation (static scenes).

### Fix 3f — AnimatePresence key prop
Every component inside `<AnimatePresence>` must have a unique `key` prop. Check the testimonials carousel, product modal, automation modes panel, and mobile navbar — add keys everywhere they are missing.

### Fix 3g — Reduce motion for users who prefer it
Add to `globals.css`:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## CHANGE 4 — Cursor: Electric Cursor + Click/Touch Animation

### 4a — Replace CursorGlow with Electric Cursor

Delete the existing `CursorGlow.jsx` and replace with `src/components/global/ElectricCursor.jsx`.

**Cursor design — two-layer system:**

**Layer 1 — Small electric dot (follows cursor exactly, no lag):**
- `12px × 12px` circle, `bg-accent` (solid cyan), `rounded-full`
- Position: raw `mousemove` coordinates (no spring — instant follow)
- `box-shadow: 0 0 8px #00C8FF, 0 0 16px #00C8FF`
- `mix-blend-mode: screen`

**Layer 2 — Outer electric ring (follows with slight lag):**
- `40px × 40px` circle, transparent fill, `border-2 border-accent/60`, `rounded-full`
- Position: `useSpring({ stiffness: 120, damping: 18 })` for smooth lag
- On hover over clickable elements (buttons, links, cards): ring expands to `60px × 60px` and `border-accent` full opacity
- On click: ring briefly scales to `80px` then back

**Electric arc effect on hover:**
- When cursor hovers over a `<NeonButton>` or `.glass-card`, add a faint animated arc/spark around the outer ring using a CSS `@keyframes` rotating conic-gradient border — creates an "electric" rotating arc feel:
```css
@keyframes electric-arc {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
```
- The arc is a `::before` pseudo-element on the outer ring div, `border-top: 2px solid #00C8FF`, rotating continuously at 1.2s linear infinite

**Detection for clickable hover:**
```js
useEffect(() => {
  const clickables = document.querySelectorAll('a, button, .glass-card, [data-cursor="pointer"]');
  clickables.forEach(el => {
    el.addEventListener('mouseenter', () => setIsHovering(true));
    el.addEventListener('mouseleave', () => setIsHovering(false));
  });
}, []);
```

**Only render on `pointer: fine` devices (desktop only):**
```js
if (!window.matchMedia('(pointer: fine)').matches) return null;
// Also hide default cursor:
document.body.style.cursor = 'none';
```

---

### 4b — Click Animation (Desktop)

On every mouse click anywhere on the page, emit a burst of electric sparks from the click position.

Create `src/components/global/ClickRipple.jsx`:

**Effect:** At click coordinates, render:
1. A cyan ripple circle that expands from 0 to 80px and fades (`scale: 0→1, opacity: 1→0, duration: 0.5s`)
2. 8 small electric particle lines radiating outward (like short sparks shooting in 8 directions)
   - Each: `2px × 8px` cyan bar, rotated to its direction, `translateY: 0 → -24px` + `opacity: 1 → 0` over 0.4s
   - Colors: alternate `#00C8FF` and `#ffffff`

**Implementation:**
```jsx
// Global click listener in App.jsx or ClickRipple context
window.addEventListener('click', (e) => {
  triggerRipple(e.clientX, e.clientY);
});
```

Render ripples via a canvas or absolutely-positioned `div` array managed in state. Remove each ripple element after its animation completes (400ms timeout).

---

### 4c — Touch Animation (Mobile)

On touch devices (`pointer: coarse`), on every `touchstart` event, show a touch feedback circle:

Create the touch handler in `src/components/global/TouchRipple.jsx`:

**Effect:** At touch point:
- A `40px × 40px` circle, `border-2 border-accent`, appears at touch position
- Expands to `80px × 80px` while fading out over 0.5s
- 4 small spark dots shoot outward in cardinal directions, each fading over 0.4s

**Implementation:**
```jsx
useEffect(() => {
  const handleTouch = (e) => {
    const touch = e.touches[0];
    triggerTouch(touch.clientX, touch.clientY);
  };
  window.addEventListener('touchstart', handleTouch, { passive: true });
  return () => window.removeEventListener('touchstart', handleTouch);
}, []);
```

Do NOT disable scroll or interfere with native touch behavior. Use `passive: true` on the event listener.

---

## PRODUCT PHOTOS — WHERE TO ADD THEM (READ THIS)

### Where to place photo files:
```
/public/products/
├── smart-lights.jpg
├── smart-ac.jpg
├── smart-curtains.jpg
├── smart-locks.jpg
├── smart-switch.jpg
├── smart-sensor.jpg
└── [any other product].jpg
```

### Recommended photo dimensions:
- **Aspect ratio: 4:3** (e.g. 800×600px or 1200×900px)
- Minimum resolution: 800×600px
- Format: JPG (preferred for photos) or PNG (for transparent bg product shots)
- File size: keep under 300KB per image (compress with squoosh.app or tinypng.com before adding)

### Where they appear in code:
In `src/components/sections/products/ProductGrid.jsx`, each product card has an image area:
```jsx
// Current placeholder:
<div className="aspect-[4/3] bg-gradient-to-br from-accent/10 to-accent2/5 flex items-center justify-center">
  <Icon className="w-16 h-16 text-accent" />
</div>

// Replace with real photo when available:
<img
  src="/products/smart-lights.jpg"
  alt="Smart Lights"
  className="w-full h-full object-cover aspect-[4/3]"
  loading="lazy"
/>
```

### Will the agent fix the ratio automatically?
**No — you will need to do this yourself**, but it's a 2-minute job:
1. Drop your photo into `/public/products/`
2. In `ProductGrid.jsx`, swap the `<div>` placeholder with the `<img>` tag shown above
3. The `aspect-[4/3]` class on the parent container and `object-cover` on the image handle all cropping and ratio automatically — your photo will fit perfectly regardless of its original dimensions

The agent has already built the container with the correct aspect ratio. You are only swapping one element.

---

## SUMMARY OF WHAT NOT TO CHANGE

- All page layouts, section order, and content
- The entire design system (colors, typography, spacing tokens)
- Tailwind config
- All existing section components (Hero, FeatureGrid, Testimonials, etc.)
- The glassmorphism card styles
- Lenis smooth scroll setup
- All page routes
- The footer structure
- The floating WhatsApp button
- The scroll progress bar
- Any SEO or meta tags (other than city name per Change 1)
- The dashboard demo
- The franchise ROI calculator
- All form logic and validation
