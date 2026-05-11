import { motion } from 'framer-motion';
import { Eye, Target } from 'lucide-react';

export default function VisionMission() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            className="glass-card p-10"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
              <Eye className="text-accent w-6 h-6" />
            </div>
            <h3 className="font-syne text-2xl font-bold text-text mb-4">Our Vision</h3>
            <p className="text-muted leading-relaxed">
              To create a world where every home is intelligently connected — where technology doesn't just automate, but anticipates, adapts, and enhances every moment of daily life. We envision smart homes becoming the standard, not the exception.
            </p>
          </motion.div>

          <motion.div
            className="glass-card p-10"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
              <Target className="text-accent w-6 h-6" />
            </div>
            <h3 className="font-syne text-2xl font-bold text-text mb-4">Our Mission</h3>
            <p className="text-muted leading-relaxed">
              To deliver affordable, premium-grade smart home solutions that seamlessly integrate into any living space. Through continuous innovation and exceptional service, we empower homeowners with complete control over their environment.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
