import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function InnerPageHero({ eyebrow, title, subtitle, breadcrumb }) {
  return (
    <section className="py-20 md:py-32 text-center bg-surface/20 border-b border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 radial-glow-bg" />
      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-6 md:px-12"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {eyebrow && (
          <p className="font-mono text-accent text-xs tracking-[0.2em] uppercase mb-4">
            {eyebrow}
          </p>
        )}
        <h1 className="font-syne text-4xl md:text-6xl font-black text-text">
          {title}
        </h1>
        {subtitle && (
          <p className="text-muted mt-4 max-w-lg mx-auto text-lg">
            {subtitle}
          </p>
        )}
        {breadcrumb && (
          <p className="font-mono text-muted text-xs mt-6 tracking-wider">
            <Link to="/" className="hover:text-accent transition-colors">Home</Link>
            {' / '}
            <span className="text-text">{breadcrumb}</span>
          </p>
        )}
      </motion.div>
    </section>
  );
}
