# HERO SECTION CHANGE — SCROLL VIDEO HERO

> Only modify `src/components/sections/home/Hero.jsx`. Nothing else.

---

## Video File
Place at: `/public/videos/hero.mp4`

---

## What To Build

Replace the entire JSX inside `Hero.jsx` with a fullscreen scroll-driven video hero.

### Structure
```
<section> (pinned by GSAP ScrollTrigger)
  <video>          ← background, scrubbed by scroll
  <div>            ← dark overlay
  <div>            ← content: company name + heading + changing subtext + buttons + scroll indicator
</section>
```

### Video Setup
- `<video ref={videoRef} src="/videos/hero.mp4" autoPlay muted loop playsInline`
- `className="absolute inset-0 w-full h-full object-cover z-0"`
- Scrub video with scroll:
```js
ScrollTrigger.create({
  trigger: sectionRef.current,
  start: 'top top',
  end: '+=300%',
  pin: true,
  scrub: 1,
  onUpdate: (self) => {
    if (videoRef.current) {
      videoRef.current.currentTime = self.progress * videoRef.current.duration;
    }
  }
});
```

### Overlay
- `absolute inset-0 bg-[#040B1F]/50 z-10`

### Content (z-20, centered)
1. **Company name:** `APEX SMART HOME` — Space Mono, `text-xs md:text-sm tracking-[0.3em] text-accent uppercase mb-6`
2. **H1:** `"Your Home, Intelligently Alive"` — Syne Black, `text-5xl md:text-7xl font-black leading-tight`. "Intelligently" keeps `glow-text` class.
3. **Scroll-changing subtext** — 4 phrases, swap on scroll progress:
   - 0–25%: `"Transform your living space with AI-powered automation."`
   - 25–50%: `"Control every light, lock, and curtain from anywhere."`
   - 50–75%: `"Intelligent scenes that adapt to your lifestyle."`
   - 75–100%: `"Welcome to the future of home living."`
   - Detect active phrase from `self.progress` in the ScrollTrigger `onUpdate`
   - Animate swap with Framer `AnimatePresence` — `opacity 0→1, y: 10→0, duration: 0.4s`
   - Style: `text-muted text-lg md:text-xl max-w-lg mx-auto mt-4 text-center`
4. **Buttons** — keep exactly as they were (`Request a Demo` + `See How It Works`)
5. **Scroll indicator** — keep exactly as it was

### Cleanup
```js
useEffect(() => {
  // ... gsap setup
  return () => ScrollTrigger.getAll().forEach(t => t.kill());
}, []);
```

### Mobile
- On mobile (`window.innerWidth < 768`): disable scroll scrub, video just plays normally (`autoPlay loop`), subtext stays on phrase 1 static, no pinning
```js
if (window.innerWidth < 768) return; // skip ScrollTrigger setup
```

---

## Do Not Touch
- Everything below Hero in `Home.jsx`
- All other pages
- All other components
- `tailwind.config.js`, `globals.css`, `App.jsx`
