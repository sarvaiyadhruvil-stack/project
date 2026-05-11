import { motion } from 'framer-motion';
import SectionHeading from '../../ui/SectionHeading';

const milestones = [
  { year: '2019', title: 'The Spark', desc: 'Founded with a vision to make smart homes accessible and affordable for every Indian household.' },
  { year: '2020', title: 'First 100 Homes', desc: 'Deployed smart automation systems in 100 homes across Mumbai, Bandra, proving the concept at scale.' },
  { year: '2021', title: 'Voice Integration', desc: 'Launched deep integration with Alexa, Google Home, and Siri — making voice control seamless.' },
  { year: '2022', title: 'Franchise Launch', desc: 'Opened our franchise program, expanding to 3 new cities with dedicated partners.' },
  { year: '2023', title: 'Market Expansion', desc: 'Proudly automated 250+ homes, 150+ offices, and 20+ clubs across the country in 2023 alone.' },
  { year: '2024', title: 'AI-Powered Modes', desc: 'Introduced AI-driven automation modes that learn and adapt to individual household routines.' },
];

export default function Timeline() {
  return (
    <section className="py-16 md:py-24 bg-surface/20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionHeading
          eyebrow="OUR JOURNEY"
          title="How We Got Here."
        />

        <div className="mt-16 relative">
          {/* Center Line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-accent/30 -translate-x-1/2" />
          {/* Mobile Left Line */}
          <div className="md:hidden absolute left-4 top-0 bottom-0 w-[2px] bg-accent/30" />

          <div className="space-y-12">
            {milestones.map((m, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={i}
                  className={`relative flex items-start gap-8 ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  } flex-row`}
                  initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  {/* Dot */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-accent border-2 border-bg z-10 top-2" />

                  {/* Card */}
                  <div className={`glass-card p-6 ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${isLeft ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'}`}>
                    <p className="font-mono text-accent text-sm mb-1">{m.year}</p>
                    <h3 className="font-syne text-xl font-bold text-text mb-2">{m.title}</h3>
                    <p className="text-muted text-sm leading-relaxed">{m.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
