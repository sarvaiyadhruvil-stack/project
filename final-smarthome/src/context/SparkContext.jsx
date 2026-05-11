import { createContext, useContext, useRef, useEffect, useCallback } from 'react';

const SparkContext = createContext(null);

export function SparkProvider({ children }) {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animFrameRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesRef.current = particlesRef.current.filter(p => p.opacity > 0);

      particlesRef.current.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.92;
        p.vy *= 0.92;
        p.vy += 0.1;
        p.opacity -= 0.025;
        p.size *= 0.97;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color.replace('1)', `${p.opacity})`);
        ctx.fill();
      });

      animFrameRef.current = requestAnimationFrame(animate);
    };
    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  const triggerSpark = useCallback((x, y) => {
    const colors = ['rgba(212,175,55,1)', 'rgba(255,215,0,1)', 'rgba(0,200,255,1)'];
    for (let i = 0; i < 24; i++) {
      const angle = (Math.PI * 2 * i) / 24 + (Math.random() - 0.5) * 0.5;
      const velocity = 2 + Math.random() * 4;
      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity,
        size: 2 + Math.random() * 3,
        opacity: 1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
  }, []);

  return (
    <SparkContext.Provider value={{ triggerSpark }}>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-50"
        style={{ width: '100vw', height: '100vh' }}
      />
      {children}
    </SparkContext.Provider>
  );
}

export function useSpark() {
  return useContext(SparkContext);
}

export default SparkContext;
