import { useState, useEffect, useCallback } from 'react';

export default function TouchRipple() {
  const [ripples, setRipples] = useState([]);

  const triggerTouch = useCallback((x, y) => {
    const id = Date.now();
    setRipples(prev => [...prev, { id, x, y }]);
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== id));
    }, 600);
  }, []);

  useEffect(() => {
    if (window.matchMedia('(pointer: fine)').matches) return;

    const handleTouch = (e) => {
      const touch = e.touches[0];
      triggerTouch(touch.clientX, touch.clientY);
    };
    window.addEventListener('touchstart', handleTouch, { passive: true });
    return () => window.removeEventListener('touchstart', handleTouch);
  }, [triggerTouch]);

  if (ripples.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9996]">
      {ripples.map(ripple => (
        <div
          key={ripple.id}
          style={{ position: 'absolute', left: ripple.x, top: ripple.y }}
        >
          <div
            className="absolute rounded-full border-2 border-accent"
            style={{
              width: 40,
              height: 40,
              transform: 'translate(-50%, -50%)',
              animation: 'touch-ripple 0.5s ease-out forwards',
            }}
          />
          {/* 4 cardinal spark dots */}
          {[0, 90, 180, 270].map((angle, i) => (
            <div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full bg-accent"
              style={{
                transform: `translate(-50%, -50%)`,
                animation: `touch-spark-${angle} 0.4s ease-out forwards`,
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
