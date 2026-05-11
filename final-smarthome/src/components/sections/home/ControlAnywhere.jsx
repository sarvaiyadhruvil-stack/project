import { motion } from 'framer-motion';
import { Smartphone, Wifi, Globe } from 'lucide-react';
import SectionHeading from '../../ui/SectionHeading';
import StatCounter from '../../ui/StatCounter';

export default function ControlAnywhere() {
  return (
    <section className="py-16 md:py-24 bg-surface/20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <SectionHeading
              align="left"
              eyebrow="REMOTE ACCESS"
              title="Control From Anywhere in the World."
            />
            <p className="text-muted mt-6 leading-relaxed">
              Whether you're at the office, traveling abroad, or just in the next room — your smart home is always at your fingertips. Real-time control, live monitoring, and instant alerts, all from your phone.
            </p>

            <div className="grid grid-cols-3 gap-4 mt-10">
              <StatCounter value={250} suffix="+" label="Projects" />
              <StatCounter value={1000} suffix="+" label="Devices" />
              <StatCounter value={10} label="Cities" />
            </div>

            <div className="flex items-center gap-4 mt-8">
              <div className="glass-card px-4 py-2 flex items-center gap-2 text-sm text-muted">
                <Smartphone size={16} className="text-accent" />
                iOS & Android
              </div>
              <div className="glass-card px-4 py-2 flex items-center gap-2 text-sm text-muted">
                <Globe size={16} className="text-accent" />
                Smart Remote
              </div>
            </div>
          </motion.div>

          {/* Right - Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <img
              src="/mobile.jpeg"
              alt="Mobile App Interface"
              className="w-64 md:w-72 rounded-[40px] shadow-[0_0_60px_rgba(0,200,255,0.1)] border-2 border-white/10 object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
