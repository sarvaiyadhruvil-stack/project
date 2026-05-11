import { motion } from 'framer-motion';
import NeonButton from '../../ui/NeonButton';

export default function CTABanner() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-bg" />
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, rgba(0,200,255,0.08) 0%, transparent 60%)' }} />
      <div className="absolute inset-0 dot-grid-bg opacity-30" />

      <motion.div
        className="relative z-10 max-w-2xl mx-auto px-6 md:px-12 text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="font-syne text-4xl md:text-6xl font-black text-text">
          Ready to Transform Your Home?
        </h2>
        <p className="text-muted mt-4 text-lg">
          Join thousands of smart homeowners and experience the future of living.
        </p>
        <div className="mt-10">
          <NeonButton variant="filled" spark size="lg">
            Request a Demo →
          </NeonButton>
        </div>
      </motion.div>
    </section>
  );
}
