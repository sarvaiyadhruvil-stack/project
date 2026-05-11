import { motion } from 'framer-motion';
import { TrendingUp, Users, HeadphonesIcon } from 'lucide-react';
import SectionHeading from '../../ui/SectionHeading';

const reasons = [
  { icon: TrendingUp, title: 'Low Investment', desc: 'Start your smart home business with minimal capital. Our franchise model is designed for quick break-even and sustainable growth.' },
  { icon: Users, title: 'High Demand', desc: 'The smart home market is booming with 40%+ annual growth. Tap into a massive, underserved market with proven products.' },
  { icon: HeadphonesIcon, title: 'Full Support', desc: 'From training to marketing to technical support — we provide everything you need to succeed as a franchise partner.' },
];

export default function WhyFranchise() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionHeading
          eyebrow="WHY FRANCHISE"
          title="A Smart Investment."
          subtitle="Join the fastest-growing smart home automation franchise in India."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {reasons.map((r, i) => (
            <motion.div
              key={i}
              className="glass-card p-8"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                <r.icon className="text-accent w-6 h-6" />
              </div>
              <h3 className="font-syne text-xl font-bold text-text mb-3">{r.title}</h3>
              <p className="text-muted text-sm leading-relaxed">{r.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
