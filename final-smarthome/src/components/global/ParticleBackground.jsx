import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import useMediaQuery from '../../hooks/useMediaQuery';

function Particles({ count }) {
  const meshRef = useRef();
  
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      pos[i] = (Math.random() - 0.5) * 20;
      pos[i + 1] = (Math.random() - 0.5) * 20;
      pos[i + 2] = (Math.random() - 0.5) * 10;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (!meshRef.current) return;
    // Rotate the entire particle cloud instead of updating every single point position
    meshRef.current.rotation.y += 0.0005;
    meshRef.current.rotation.x += 0.0002;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#00C8FF"
        size={0.6}
        transparent
        opacity={0.35}
        sizeAttenuation
      />
    </points>
  );
}

export default function ParticleBackground() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const count = isMobile ? 80 : 200;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <Particles count={count} />
      </Canvas>
    </div>
  );
}
