import { useState, useMemo } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import SectionHeading from '../../ui/SectionHeading';

export default function ROICalculator() {
  const [cityTier, setCityTier] = useState('Tier 1');
  const [investment, setInvestment] = useState(15);

  const results = useMemo(() => {
    const multipliers = { 'Tier 1': 1.8, 'Tier 2': 1.5, 'Tier 3': 1.2 };
    const mult = multipliers[cityTier];
    const monthlyRevenue = Math.round(investment * mult * 10000);
    const breakEven = Math.round(12 / mult);
    const yearROI = Math.round(((monthlyRevenue * 12 - investment * 100000) / (investment * 100000)) * 100);
    return { monthlyRevenue, breakEven, yearROI };
  }, [cityTier, investment]);

  return (
    <section className="py-16 md:py-24 bg-surface/20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionHeading
          eyebrow="ESTIMATE YOUR EARNINGS"
          title="See Your Potential ROI."
        />

        <div className="glass-card max-w-3xl mx-auto p-8 md:p-10 mt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-muted text-sm block mb-2">City Tier</label>
              <select
                value={cityTier}
                onChange={e => setCityTier(e.target.value)}
                className="neon-select"
              >
                <option>Tier 1</option>
                <option>Tier 2</option>
                <option>Tier 3</option>
              </select>
            </div>
            <div>
              <label className="text-muted text-sm block mb-2">
                Investment: <span className="text-accent font-mono">₹{investment}L</span>
              </label>
              <input
                type="range"
                min="5"
                max="50"
                value={investment}
                onChange={e => setInvestment(Number(e.target.value))}
                className="w-full accent-accent"
                style={{ accentColor: '#00C8FF' }}
              />
              <div className="flex justify-between text-xs text-muted mt-1">
                <span>₹5L</span>
                <span>₹50L</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <ResultBox label="Est. Monthly Revenue" value={`₹${results.monthlyRevenue.toLocaleString()}`} />
            <ResultBox label="Break-even Period" value={`${results.breakEven} months`} />
            <ResultBox label="Year-1 ROI" value={`${results.yearROI}%`} />
          </div>
        </div>
      </div>
    </section>
  );
}

function ResultBox({ label, value }) {
  return (
    <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4 text-center">
      <p className="text-muted text-xs font-mono mb-2">{label}</p>
      <motion.p
        className="font-syne text-2xl font-bold text-accent"
        key={value}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {value}
      </motion.p>
    </div>
  );
}
