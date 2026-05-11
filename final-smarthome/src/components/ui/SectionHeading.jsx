import { motion } from 'framer-motion';

export default function SectionHeading({ eyebrow, title, subtitle, align = 'center' }) {
  const alignClass = align === 'center' ? 'text-center' : 'text-left';
  const dividerClass = align === 'center' ? 'mx-auto' : '';

  return (
    <motion.div
      className={alignClass}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      viewport={{ once: true }}
    >
      {eyebrow && (
        <p className="font-mono text-accent text-xs tracking-[0.2em] uppercase mb-2">
          {eyebrow}
        </p>
      )}
      <h2 className="font-syne text-3xl md:text-5xl font-bold text-text">
        {title}
      </h2>
      <div className={`w-16 h-[2px] bg-accent mt-4 ${dividerClass}`} />
      {subtitle && (
        <p className="text-muted mt-4 max-w-xl mx-auto">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
