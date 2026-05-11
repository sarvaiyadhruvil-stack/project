import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wifi, Link as LinkIcon, Hotel, Music, Briefcase, Home, Zap, Shield, Check, Star, Settings, Activity } from 'lucide-react';
import SectionHeading from '../../ui/SectionHeading';

const modes = [
  {
    id: 'wireless',
    name: 'WIRELESS AUTOMATION',
    icon: Wifi,
    color: '#00C8FF', // Cyan
    glow: 'rgba(0, 200, 255, 0.4)',
    description: 'Smart. Seamless. Wireless Freedom.',
    features: [
      { icon: Zap, label: 'Smart' },
      { icon: Activity, label: 'Seamless' },
      { icon: Wifi, label: 'Wireless' },
      { icon: Shield, label: 'Freedom' },
    ],
  },
  {
    id: 'wired',
    name: 'WIRED AUTOMATION',
    icon: LinkIcon,
    color: '#6366F1', // Indigo
    glow: 'rgba(99, 102, 241, 0.4)',
    description: 'Stable. Reliable. Always Connected.',
    features: [
      { icon: Settings, label: 'Stable' },
      { icon: Check, label: 'Reliable' },
      { icon: LinkIcon, label: 'Connected' },
      { icon: Zap, label: 'Wired' },
    ],
  },
  {
    id: 'hotel',
    name: 'HOTEL AUTOMATION',
    icon: Hotel,
    color: '#10B981', // Emerald/Greenish
    glow: 'rgba(16, 185, 129, 0.4)',
    description: 'Elevate Guest Experience. Enhance Operations.',
    features: [
      { icon: Star, label: 'Experience' },
      { icon: Settings, label: 'Operations' },
      { icon: Hotel, label: 'Guest' },
      { icon: Zap, label: 'Elevate' },
    ],
  },
  {
    id: 'club',
    name: 'CLUB AUTOMATION',
    icon: Music,
    color: '#9F1239', // Maroon/Rose
    glow: 'rgba(159, 18, 57, 0.4)',
    description: 'Smart Ambience. Dynamic Control. Unforgettable Experiences.',
    features: [
      { icon: Music, label: 'Ambience' },
      { icon: Activity, label: 'Control' },
      { icon: Star, label: 'Dynamic' },
      { icon: Zap, label: 'Unforgettable' },
    ],
  },
  {
    id: 'office',
    name: 'OFFICE AUTOMATION',
    icon: Briefcase,
    color: '#F59E0B', // Amber/Yellowish
    glow: 'rgba(245, 158, 11, 0.4)',
    description: 'Boost Productivity. Smart Workspaces. Better Tomorrow.',
    features: [
      { icon: Briefcase, label: 'Productivity' },
      { icon: Settings, label: 'Workspaces' },
      { icon: Activity, label: 'Tomorrow' },
      { icon: Zap, label: 'Boost' },
    ],
  },
  {
    id: 'home',
    name: 'HOME AUTOMATION',
    icon: Home,
    color: '#00C8FF', // Accent
    glow: 'rgba(0, 200, 255, 0.4)',
    description: 'One Touch. Total Comfort. Total Control.',
    features: [
      { icon: Home, label: 'One Touch' },
      { icon: Check, label: 'Comfort' },
      { icon: Activity, label: 'Control' },
      { icon: Zap, label: 'Total' },
    ],
  },
];

export default function AllUnderOneRoof() {
  const [activeMode, setActiveMode] = useState('wireless');
  const active = modes.find(m => m.id === activeMode);

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Dynamic Glow Background */}
      <motion.div 
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl pointer-events-none opacity-20"
        animate={{ backgroundColor: active.color }}
        transition={{ duration: 0.8 }}
      />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <SectionHeading
          eyebrow="TOTAL SOLUTIONS"
          title="All Under One Roof"
        />

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12 items-start mt-16">
          {/* Mode Buttons */}
          <div className="md:col-span-2 space-y-3">
            {modes.map(mode => (
              <motion.button
                key={mode.id}
                onClick={() => setActiveMode(mode.id)}
                className={`w-full text-left glass-card p-4 flex items-center gap-3 border-l-2 transition-all duration-300 ${
                  activeMode === mode.id
                    ? 'text-text bg-white/[0.03]'
                    : 'border-l-transparent text-muted hover:text-text'
                }`}
                style={{ 
                  borderLeftColor: activeMode === mode.id ? mode.color : 'transparent',
                  boxShadow: activeMode === mode.id ? `0 0 20px ${mode.glow}` : 'none'
                }}
                whileHover={{ x: 4 }}
              >
                <mode.icon size={20} style={{ color: activeMode === mode.id ? mode.color : 'inherit' }} />
                <span className="font-syne font-bold text-sm uppercase tracking-wider">{mode.name}</span>
              </motion.button>
            ))}
          </div>

          {/* Active Mode Details */}
          <div className="md:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeMode}
                className="glass-card p-8 md:p-10 border border-white/10 relative overflow-hidden"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Subtle corner glow */}
                <div 
                  className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl opacity-20"
                  style={{ backgroundColor: active.color }}
                />

                <div className="flex items-center gap-4 mb-6">
                  <div 
                    className="w-14 h-14 rounded-xl flex items-center justify-center transition-colors duration-500"
                    style={{ backgroundColor: `${active.color}20` }} // 20 hex for 12% opacity
                  >
                    <active.icon style={{ color: active.color }} className="w-7 h-7" />
                  </div>
                  <h3 className="font-syne text-2xl font-bold text-text uppercase tracking-widest">{active.name}</h3>
                </div>
                
                <p className="text-muted leading-relaxed mb-8 text-lg font-light">
                  {active.description}
                </p>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {active.features.map((feature, i) => (
                    <motion.div
                      key={i}
                      className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/[0.02] border border-white/5 transition-all duration-300"
                      style={{ borderColor: 'rgba(255,255,255,0.05)' }}
                      whileHover={{ borderColor: active.color, backgroundColor: `${active.color}05` }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <feature.icon size={24} style={{ color: active.color }} />
                      <span className="text-text text-xs font-medium text-center tracking-tighter">{feature.label}</span>
                    </motion.div>
                  ))}
                </div>
                
                {/* Visual accent */}
                <div className="mt-10 pt-8 border-t border-white/5">
                  <div 
                    className="flex items-center gap-3 font-mono text-xs tracking-widest uppercase transition-colors duration-500"
                    style={{ color: `${active.color}80` }} // 80 hex for 50% opacity
                  >
                    <span className="w-8 h-px" style={{ backgroundColor: `${active.color}40` }} />
                    Advanced Smart Infrastructure
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
