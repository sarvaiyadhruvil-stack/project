import { motion } from 'framer-motion';
import { Home, Cpu, Zap, Users } from 'lucide-react';
import SectionHeading from '../../ui/SectionHeading';
import StatCounter from '../../ui/StatCounter';

const stats = [
  { icon: Home, value: 500, suffix: '+', label: 'Smart Homes' },
  { icon: Cpu, value: 2500, suffix: '+', label: 'Devices Connected' },
  { icon: Zap, value: 40, suffix: '%', label: 'Energy Saved' },
];

export default function StatsRow() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              className="glass-card p-6 text-center"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <stat.icon className="text-accent w-6 h-6" />
              </div>
              <StatCounter value={stat.value} suffix={stat.suffix} label={stat.label} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
