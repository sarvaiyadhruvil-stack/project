import { useEffect, useState, useRef } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function ElectricCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isFine, setIsFine] = useState(false);

  const springX = useSpring(0, { stiffness: 120, damping: 18 });
  const springY = useSpring(0, { stiffness: 120, damping: 18 });

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    setIsFine(true);
    document.body.style.cursor = 'none';

    const handleMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      springX.set(e.clientX);
      springY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const handleDown = () => {
      setIsClicking(true);
      setTimeout(() => setIsClicking(false), 150);
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mousedown', handleDown);

    return () => {
      document.body.style.cursor = '';
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mousedown', handleDown);
    };
  }, []);

  useEffect(() => {
    if (!isFine) return;

    const handleHover = (e) => {
      const isClickable = e.target.closest('a, button, .glass-card, [data-cursor="pointer"]');
      setIsHovering(!!isClickable);
    };

    window.addEventListener('mouseover', handleHover);
    return () => window.removeEventListener('mouseover', handleHover);
  }, [isFine]);

  if (!isFine || !visible) return null;

  const ringSize = isClicking ? 80 : isHovering ? 60 : 40;

  return (
    <>
      {/* Layer 1 — Small electric dot */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          transform: `translate(${position.x - 6}px, ${position.y - 6}px)`,
          width: 12,
          height: 12,
          borderRadius: '50%',
          backgroundColor: '#00C8FF',
          boxShadow: '0 0 8px #00C8FF, 0 0 16px #00C8FF',
          mixBlendMode: 'screen',
        }}
      />


    </>
  );
}
