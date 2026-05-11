import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, Thermometer, Blinds, Lock, ShieldCheck, Wifi, Camera, Speaker, Monitor, ToggleRight } from 'lucide-react';

const products = [
  {
    id: 1, name: 'Smart LED Panel', category: 'Lighting', icon: Lightbulb,
    image: '/smart_led_panel.png',
    spec: '16M colors | Wi-Fi + BLE | Voice Ready',
    desc: 'Premium smart LED panel with 16 million color options. Control via app, voice, or automation schedules. Dimmable, energy-efficient, compatible with all smart home ecosystems.',
    specs: ['16 Million Colors', 'Wi-Fi + Bluetooth', 'Voice Compatible', 'Energy Rating A++', '25,000hr Lifespan', 'Group Control'],
  },
  {
    id: 2, name: 'Smart Bulb RGB', category: 'Lighting', icon: Lightbulb,
    image: '/smart_bulb.png',
    spec: 'E27 Base | 9W | App Control',
    desc: 'Affordable smart RGB bulb with full spectrum colors and warm-to-cool white temperature adjustment. Perfect entry point to smart lighting.',
    specs: ['E27 Base', '9W Power', 'App + Voice Control', '800 Lumens', 'Scene Modes', 'Schedule Timer'],
  },
  {
    id: 3, name: 'Smart AC Controller', category: 'Climate', icon: Thermometer,
    image: '/smart_ac.png',
    spec: 'Universal IR | AI Climate',
    desc: 'Transform any AC into a smart AC. Uses infrared to control existing units with AI-driven temperature optimization and scheduling.',
    specs: ['Universal IR Blaster', 'AI Temperature', 'Energy Monitoring', 'Geofencing', 'Weekly Schedule', 'Humidity Sensor'],
  },
  {
    id: 4, name: 'Smart Thermostat Pro', category: 'Climate', icon: Thermometer,
    image: '/smart_thermostat.png',
    spec: 'OLED Display | Learning AI',
    desc: 'Professional-grade thermostat with OLED display and machine learning that adapts to your comfort patterns over time.',
    specs: ['OLED Touch Display', 'ML Algorithm', 'Multi-Zone', 'Energy Stats', 'Remote Sensors', 'Auto Schedule'],
  },
  {
    id: 5, name: 'Motorized Curtain Track', category: 'Curtains', icon: Blinds,
    image: '/motorized_curtain.png',
    spec: 'Silent Motor | Custom Length',
    desc: 'Whisper-quiet motorized curtain system with sunrise/sunset automation. Custom cut to any window size, easy retrofit installation.',
    specs: ['Silent DC Motor', 'Custom Length', 'Sunrise/Sunset', 'Touch Open/Close', 'Voice Control', 'Group Sync'],
  },
  {
    id: 6, name: 'Smart Door Lock X1', category: 'Security', icon: Lock,
    image: '/smartlock (3).png',
    spec: 'Fingerprint | PIN | App | Key',
    desc: 'Premium smart lock with 4-way access: fingerprint, PIN code, app control, and traditional key. Auto-lock and tamper alerts included.',
    specs: ['Fingerprint Sensor', '4-Way Access', 'Auto Lock', 'Tamper Alert', 'Guest Access', 'Activity Log'],
  },
  {
    id: 7, name: 'Motion Sensor Pro', category: 'Security', icon: ShieldCheck,
    image: '/motion_sensor.png',
    spec: 'PIR + mmWave | Dual Tech',
    desc: 'Dual-technology motion sensor combining PIR and mmWave radar for zero false alarms. Perfect for security and automation triggers.',
    specs: ['Dual Detection', 'Zero False Alarms', '12m Range', '180° FOV', 'Pet Immune', 'Battery 2yr'],
  },
  {
    id: 8, name: 'Smart Security Camera', category: 'Security', icon: Camera,
    image: '/CAMERA.jpg',
    spec: '2K HDR | Night Vision | AI',
    desc: 'Indoor/outdoor smart camera with 2K resolution, AI person detection, and 30-day cloud storage. Two-way audio and smart alerts.',
    specs: ['2K HDR Video', 'AI Detection', 'Night Vision', '2-Way Audio', 'Cloud + Local', 'Smart Alerts'],
  },
  {
    id: 9, name: 'Smart Speaker Hub', category: 'Climate', icon: Speaker,
    image: '/smart_speaker.png',
    spec: 'Central Hub | Hi-Fi Audio',
    desc: 'Central command hub with premium Hi-Fi audio. Controls all SmartHome devices and integrates with major voice assistants.',
    specs: ['Central Hub', 'Hi-Fi Audio', 'Multi-Room', 'Voice Control', 'Zigbee + Wi-Fi', 'Intercom'],
  },
  {
    id: 10, name: 'Smart LED Screen', category: 'Lighting', icon: Monitor,
    image: '/LED SCREEN.jpg',
    spec: '4K | Smart Touch | Dashboard',
    desc: 'Centralized smart home LED touch screen to control your entire ecosystem with an elegant dashboard interface.',
    specs: ['4K Resolution', 'Touch Screen', 'Ecosystem Integration', 'Wall-Mounted'],
  },
  {
    id: 11, name: 'Smart Switches', category: 'Lighting', icon: ToggleRight,
    image: '/SMART SWITCH.jpg',
    spec: 'Touch Panel | App Control',
    desc: 'Premium glass touch switches that seamlessly replace your traditional wall switches. Full app and voice control.',
    specs: ['Capacitive Touch', 'Wi-Fi Enabled', 'Voice Compatible', 'Retrofit'],
  },
];

export default function ProductGrid({ activeTab, onProductClick }) {
  const filtered = activeTab === 'All' ? products : products.filter(p => p.category === activeTab);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeTab}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        {filtered.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} onClick={() => onProductClick(product)} />
        ))}
      </motion.div>
    </AnimatePresence>
  );
}

function ProductCard({ product, index, onClick }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5; // Reduced intensity
    const rotateY = ((x - centerX) / centerX) * 5; // Reduced intensity
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className="glass-card overflow-hidden group cursor-pointer"
      style={{ transition: 'transform 0.15s ease-out, border-color 0.3s ease, box-shadow 0.3s ease' }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {/* Image Area */}
      <div className="aspect-[16/10] bg-[#0A1229] relative overflow-hidden flex items-center justify-center">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
        
        {product.image ? (
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
          />
        ) : (
          <product.icon className="text-accent w-20 h-20 opacity-60 group-hover:scale-110 transition-transform duration-500" />
        )}
        
        {/* Border accent */}
        <div className="absolute inset-0 border border-white/5 group-hover:border-accent/30 transition-colors duration-500 z-20" />
      </div>

      {/* Content */}
      <div className="p-6">
        <span className="text-xs font-mono border border-accent/40 text-accent px-3 py-1 rounded-full inline-block">
          {product.category}
        </span>
        <h3 className="font-syne text-xl font-bold text-text mt-3">{product.name}</h3>
        <p className="text-muted text-sm mt-2">{product.spec}</p>
        <div className="mt-6 flex items-center">
          <span className="text-accent text-sm font-mono tracking-widest uppercase group-hover:translate-x-1 transition-transform duration-300">
            Explore Innovation →
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export { products };
