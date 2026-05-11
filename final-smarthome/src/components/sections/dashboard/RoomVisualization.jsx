import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function Room({ position, size, lightOn, lightColor = '#00C8FF', label }) {
  const lightRef = useRef();
  
  return (
    <group position={position}>
      {/* Floor */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={size} />
        <meshStandardMaterial color="#0a1628" side={THREE.DoubleSide} />
      </mesh>

      {/* Walls */}
      <mesh position={[0, size[1] / 4, -size[1] / 2]}>
        <planeGeometry args={[size[0], size[1] / 2]} />
        <meshStandardMaterial color="#0d1d3a" transparent opacity={0.6} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[-size[0] / 2, size[1] / 4, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[size[1], size[1] / 2]} />
        <meshStandardMaterial color="#0d1d3a" transparent opacity={0.6} side={THREE.DoubleSide} />
      </mesh>

      {/* Point Light */}
      <pointLight
        ref={lightRef}
        position={[0, 1.5, 0]}
        color={lightColor}
        intensity={lightOn ? 2 : 0}
        distance={5}
      />

      {/* Light indicator */}
      <mesh position={[0, 1.5, 0]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color={lightOn ? lightColor : '#333'} />
      </mesh>
    </group>
  );
}

function GridFloor() {
  return (
    <mesh position={[0, -0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[20, 20]} />
      <meshStandardMaterial color="#040B1F" />
    </mesh>
  );
}

export default function RoomVisualization({ state }) {
  return (
    <div className="glass-card overflow-hidden" style={{ height: '400px' }}>
      <Canvas
        camera={{ position: [6, 5, 6], fov: 45 }}
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
        gl={{ antialias: false, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.15} />
        <directionalLight position={[5, 5, 5]} intensity={0.3} />
        
        <GridFloor />
        
        {/* Living Room */}
        <Room
          position={[-2, 0, -1]}
          size={[3, 3]}
          lightOn={state.livingRoom.lights}
          lightColor="#00C8FF"
          label="Living Room"
        />
        
        {/* Bedroom */}
        <Room
          position={[2, 0, -1]}
          size={[2.5, 2.5]}
          lightOn={state.bedroom.lights}
          lightColor="#FFD700"
          label="Bedroom"
        />
        
        {/* Kitchen */}
        <Room
          position={[-2, 0, 2.5]}
          size={[3, 2]}
          lightOn={true}
          lightColor="#FF6B6B"
          label="Kitchen"
        />

        <OrbitControls
          enablePan={false}
          enableZoom={false}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 3}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}
