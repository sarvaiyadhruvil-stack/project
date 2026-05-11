import { useState, useEffect, useCallback } from 'react';

export default function ClickRipple() {
  const [ripples, setRipples] = useState([]);

  const triggerRipple = useCallback((x, y) => {
    const id = Date.now();
    setRipples(prev => [...prev, { id, x, y }]);
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== id));
    }, 500);
  }, []);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    
    const handleClick = (e) => {
      triggerRipple(e.clientX, e.clientY);
    };
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [triggerRipple]);

  if (ripples.length === 0) return null;

  const sparkAngles = [0, 45, 90, 135, 180, 225, 270, 315];

  return (
    <div className="fixed inset-0 pointer-events-none z-[9996]">
      {ripples.map(ripple => (
        <div key={ripple.id} style={{ position: 'absolute', left: ripple.x, top: ripple.y }}>
          {/* Expanding ripple circle */}
          <div
            className="absolute rounded-full border-2 border-accent"
            style={{
              width: 0,
              height: 0,
              transform: 'translate(-50%, -50%)',
              animation: 'click-ripple 0.5s ease-out forwards',
            }}
          />
          {/* 8 spark lines */}
          {sparkAngles.map((angle, i) => (
            <div
              key={i}
              className="absolute"
              style={{
                width: 2,
                height: 8,
                left: -1,
                top: -4,
                backgroundColor: i % 2 === 0 ? '#00C8FF' : '#ffffff',
                transform: `rotate(${angle}deg)`,
                transformOrigin: 'center center',
                animation: `click-spark-${angle} 0.4s ease-out forwards`,
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
