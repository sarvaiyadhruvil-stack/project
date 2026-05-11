import { motion } from 'framer-motion';
import { Lightbulb, Thermometer, Blinds, Lock } from 'lucide-react';
import SectionHeading from '../../ui/SectionHeading';

const features = [
  {
    icon: Lightbulb,
    title: 'Smart Lights',
    desc: 'Automate your lighting with schedules, voice control, and adaptive brightness that adjusts to your mood.',
  },
  {
    icon: Thermometer,
    title: 'Smart AC',
    desc: 'AI-driven climate control that learns your preferences and optimizes energy consumption automatically.',
  },
  {
    icon: Blinds,
    title: 'Smart Curtains',
    desc: 'Motorized curtains that respond to sunrise, sunset, and your personalized schedules.',
  },
  {
    icon: Lock,
    title: 'Smart Locks',
    desc: 'Secure your home with biometric, PIN, and remote-controlled smart door locks.',
  },
];

export default function FeatureGrid() {
  return (
    <section className="py-16 md:py-24 bg-surface/30">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionHeading
          eyebrow="CORE FEATURES"
          title="Everything Smart. All in One Place."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="glass-card p-8 flex flex-col items-start gap-4"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03, y: -4 }}
            >
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                <feature.icon className="text-accent w-6 h-6" />
              </div>
              <h3 className="font-syne text-xl font-bold text-text">{feature.title}</h3>
              <p className="text-muted text-sm leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
