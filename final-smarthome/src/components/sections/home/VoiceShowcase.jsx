import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Moon, Film, Shield, Lamp, Wind, Tv, Eye, Lock, Power, BatteryCharging } from 'lucide-react';
import SectionHeading from '../../ui/SectionHeading';

const voiceCommands = [
  {
    command: '"Alexa, Good Night"',
    icon: Moon,
    actions: [
      { icon: Lamp, label: 'Lights Off' },
      { icon: Wind, label: 'AC Adjust' },
      { icon: Lock, label: 'Doors Locked' },
    ],
  },
  {
    command: '"Alexa, Movie Mode"',
    icon: Film,
    actions: [
      { icon: Lamp, label: 'Dim Lights' },
      { icon: Tv, label: 'TV On' },
      { icon: Wind, label: 'Curtains Close' },
    ],
  },
  {
    command: '"Alexa, Set Away Mode"',
    icon: Shield,
    actions: [
      { icon: Lock, label: 'All Locked' },
      { icon: Eye, label: 'Sensors On' },
      { icon: Power, label: 'Power Save' },
    ],
  },
];

export default function VoiceShowcase() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section id="voice-showcase" className="py-24 md:py-24 py-16-mobile relative overflow-hidden">
      <div className="absolute inset-0 radial-glow-bg" />
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <SectionHeading
          eyebrow="AI VOICE CONTROL"
          title="Just Say the Word"
          subtitle="Control your entire home with natural voice commands."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {voiceCommands.map((cmd, index) => (
            <motion.div
              key={index}
              className="glass-card p-8 relative cursor-pointer"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Pulsing dot */}
              <motion.div
                className="absolute top-4 right-4 w-2 h-2 rounded-full bg-accent"
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />

              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                <cmd.icon className="text-accent w-6 h-6" />
              </div>

              <h3 className="font-syne text-xl font-bold text-text">{cmd.command}</h3>

              <AnimatePresence>
                {hoveredIndex === index && (
                  <motion.div
                    className="flex items-center gap-4 mt-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {cmd.actions.map((action, i) => (
                      <div key={i} className="flex flex-col items-center gap-1">
                        <action.icon size={16} className="text-muted" />
                        <span className="text-muted text-[10px] font-mono">{action.label}</span>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {hoveredIndex !== index && (
                <div className="flex items-center gap-4 mt-4">
                  {cmd.actions.map((action, i) => (
                    <div key={i} className="flex flex-col items-center gap-1 opacity-40">
                      <action.icon size={16} className="text-muted" />
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
