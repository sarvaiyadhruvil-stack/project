import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import NeonButton from '../../ui/NeonButton';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 60;
const FRAME_PATH = (n) => `/frames/frame_${String(n).padStart(4, '0')}.jpg`;

export default function Hero() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const frameRef = useRef(0);
  const rafRef = useRef(null);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const phrases = [
    "Transform your living space with AI-powered automation.",
    "Control every light, lock, and curtain from anywhere.",
    "Intelligent scenes that adapt to your lifestyle.",
    "Welcome to the future of home living."
  ];

  // Preload all frames
  useEffect(() => {
    let loadedCount = 0;
    const images = [];

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = FRAME_PATH(i);
      img.onload = () => {
        loadedCount++;
        if (loadedCount === TOTAL_FRAMES) {
          imagesRef.current = images;
          setLoaded(true);
          
          // Initial canvas size
          if (canvasRef.current) {
            canvasRef.current.width = window.innerWidth;
            canvasRef.current.height = window.innerHeight;
          }
          
          drawFrame(0);
        }
      };
      images.push(img);
    }
  }, []);

  const drawFrame = (index) => {
    const canvas = canvasRef.current;
    const img = imagesRef.current[index];
    if (!canvas || !img) return;

    const ctx = canvas.getContext('2d');
    
    // Cover fit — same as object-cover
    const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
    const x = (canvas.width - img.width * scale) / 2;
    const y = (canvas.height - img.height * scale) / 2;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
  };

  // Smooth frame rendering via RAF
  const renderFrame = (targetFrame) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      drawFrame(targetFrame);
    });
  };

  useEffect(() => {
    if (!loaded) return;

    // Removed static frame check so mobile also gets scroll animation

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: '+=150%',
      pin: true,
      scrub: 1,
      onUpdate: (self) => {
        // Map scroll progress to frame index
        const targetFrame = Math.min(
          TOTAL_FRAMES - 1,
          Math.floor(self.progress * TOTAL_FRAMES)
        );

        if (targetFrame !== frameRef.current) {
          frameRef.current = targetFrame;
          renderFrame(targetFrame);
        }

        // Phrases
        const p = self.progress;
        if (p < 0.25) setPhraseIndex(0);
        else if (p < 0.5) setPhraseIndex(1);
        else if (p < 0.75) setPhraseIndex(2);
        else setPhraseIndex(3);
      }
    });

    // Redraw on resize
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
      drawFrame(frameRef.current);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      trigger.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
      window.removeEventListener('resize', handleResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [loaded]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Canvas frame sequence */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-0"
      />

      {/* Loading state while frames preload */}
      {!loaded && (
        <div className="absolute inset-0 bg-bg z-0 flex items-center justify-center">
          <div className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-accent rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 2, ease: 'easeInOut' }}
            />
          </div>
        </div>
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-[#040B1F]/50 z-10" />

      {/* Content */}
      <div className="relative z-20 text-center px-6 w-full max-w-4xl mx-auto flex flex-col items-center justify-center mt-[-40px]">
        <h2 className="font-syne text-4xl md:font-mono md:text-sm md:tracking-[0.3em] font-black md:font-normal text-white md:text-accent uppercase mb-6 glow-text">
          APEX SMART HOME
        </h2>

        <h1 className="hidden md:block font-syne text-4xl md:text-7xl font-black leading-tight text-white max-w-4xl mx-auto">
          Your Home, <br className="md:hidden" />
          <span className="glow-text">Intelligently</span> Alive
        </h1>

        <div className="hidden md:flex mt-8 h-20 md:h-12 relative w-full items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={phraseIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="text-muted text-lg md:text-xl max-w-lg mx-auto text-center absolute"
            >
              {phrases[phraseIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        <div className="hidden md:flex mt-10 flex-col sm:flex-row gap-4 justify-center">
          <NeonButton 
            variant="outlined"
            onClick={() => {
              const el = document.getElementById('voice-showcase');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            See How It Works
          </NeonButton>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="hidden md:flex absolute bottom-12 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-muted text-xs z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <span className="font-mono tracking-wider">SCROLL DOWN</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.4 }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
}