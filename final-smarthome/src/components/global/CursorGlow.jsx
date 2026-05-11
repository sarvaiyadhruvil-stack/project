import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CursorGlow() {
  const [isPointerFine, setIsPointerFine] = useState(false);
  const cursorX = useMotionValue(-200);
  const cursorY = useMotionValue(-200);
  const springX = useSpring(cursorX, { stiffness: 80, damping: 20 });
  const springY = useSpring(cursorY, { stiffness: 80, damping: 20 });

  useEffect(() => {
    if (window.matchMedia('(pointer: fine)').matches) {
      setIsPointerFine(true);
    }
  }, []);

  useEffect(() => {
    if (!isPointerFine) return;
    const handleMouseMove = (e) => {
      cursorX.set(e.clientX - 144);
      cursorY.set(e.clientY - 144);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isPointerFine, cursorX, cursorY]);

  if (!isPointerFine) return null;

  return (
    <motion.div
      className="fixed pointer-events-none z-30 w-72 h-72 rounded-full bg-accent/10 blur-3xl"
      style={{ left: springX, top: springY }}
    />
  );
}
