import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Film, Moon, Shield, Sun, PartyPopper, Tv, Lamp, Lock, Eye, Wind, Power, Coffee, Music, Blinds } from 'lucide-react';
import SectionHeading from '../../ui/SectionHeading';

const modes = [
  {
    id: 'movie',
    name: 'Movie Mode',
    icon: Film,
    description: 'Dim the lights, close the curtains, and turn on the TV — all with a single command. Perfect for an immersive viewing experience.',
    devices: [
      { icon: Lamp, label: 'Dim Lights' },
      { icon: Blinds, label: 'Close Curtains' },
      { icon: Tv, label: 'TV On' },
      { icon: Wind, label: 'AC 24°C' },
    ],
  },
  {
    id: 'night',
    name: 'Night Mode',
    icon: Moon,
    description: 'Your home winds down with you. Lights off, doors locked, AC adjusted, and security sensors armed automatically.',
    devices: [
      { icon: Lamp, label: 'Lights Off' },
      { icon: Lock, label: 'Doors Locked' },
      { icon: Wind, label: 'AC 22°C' },
      { icon: Eye, label: 'Sensors On' },
    ],
  },
  {
    id: 'away',
    name: 'Away Mode',
    icon: Shield,
    description: 'Leaving home? Smart sensors arm themselves, cameras start recording, and power-saving mode kicks in.',
    devices: [
      { icon: Lock, label: 'All Locked' },
      { icon: Eye, label: 'Cameras On' },
      { icon: Power, label: 'Power Save' },
      { icon: Shield, label: 'Armed' },
    ],
  },
  {
    id: 'morning',
    name: 'Morning Mode',
    icon: Sun,
    description: 'Wake up to a perfectly lit room, fresh air, and your coffee brewing — all timed to your alarm.',
    devices: [
      { icon: Blinds, label: 'Open Curtains' },
      { icon: Lamp, label: 'Warm Lights' },
      { icon: Coffee, label: 'Coffee On' },
      { icon: Wind, label: 'Fresh Air' },
    ],
  },
  {
    id: 'party',
    name: 'Party Mode',
    icon: PartyPopper,
    description: 'Set the vibe with dynamic lighting, music-synced effects, and the perfect party atmosphere.',
    devices: [
      { icon: Lamp, label: 'RGB Lights' },
      { icon: Music, label: 'Music On' },
      { icon: Wind, label: 'AC 20°C' },
      { icon: Blinds, label: 'Curtains Open' },
    ],
  },
];

export default function AutomationModes() {
  const [activeMode, setActiveMode] = useState('movie');
  const active = modes.find(m => m.id === activeMode);

  return (
    <section className="py-16 md:py-24 relative">
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/5 blur-3xl pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <SectionHeading
          eyebrow="SMART AUTOMATION"
          title="Your Home Knows Your Routine."
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
                    ? 'border-l-accent text-text bg-accent/5'
                    : 'border-l-transparent text-muted hover:text-text'
                }`}
                whileHover={{ x: 4 }}
                layout
              >
                <mode.icon size={20} className={activeMode === mode.id ? 'text-accent' : ''} />
                <span className="font-syne font-bold text-sm">{mode.name}</span>
              </motion.button>
            ))}
          </div>

          {/* Active Mode Details */}
          <div className="md:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeMode}
                className="glass-card p-8 md:p-10"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center">
                    <active.icon className="text-accent w-7 h-7" />
                  </div>
                  <h3 className="font-syne text-2xl font-bold text-text">{active.name}</h3>
                </div>
                <p className="text-muted leading-relaxed mb-8">{active.description}</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {active.devices.map((device, i) => (
                    <motion.div
                      key={i}
                      className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/[0.02] border border-white/5"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <device.icon size={24} className="text-accent" />
                      <span className="text-text text-xs font-medium text-center">{device.label}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
