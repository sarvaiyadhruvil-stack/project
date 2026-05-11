import { useEffect, useRef } from 'react';
import { useInView, useMotionValue, useSpring } from 'framer-motion';

export default function StatCounter({ value, suffix = '', prefix = '', label }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: 2000, bounce: 0 });
  const displayRef = useRef(null);

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      if (displayRef.current) {
        displayRef.current.textContent = `${prefix}${Math.round(latest).toLocaleString()}${suffix}`;
      }
    });
    return unsubscribe;
  }, [springValue, prefix, suffix]);

  return (
    <div ref={ref} className="text-center">
      <div
        ref={displayRef}
        className="font-syne text-3xl md:text-4xl font-bold text-text"
      >
        {prefix}0{suffix}
      </div>
      {label && <p className="text-muted text-sm mt-2">{label}</p>}
    </div>
  );
}
