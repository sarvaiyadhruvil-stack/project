import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import NeonButton from '../../ui/NeonButton';
import SectionHeading from '../../ui/SectionHeading';

const tiers = [
  {
    name: 'Starter',
    investment: '₹5L – ₹10L',
    features: ['1 City License', 'Basic Training Kit', 'Marketing Materials', 'Phone Support', 'Product Catalog'],
    popular: false,
  },
  {
    name: 'Growth',
    investment: '₹10L – ₹25L',
    features: ['3 City License', 'Advanced Training', 'Marketing + Lead Gen', 'Dedicated Manager', 'Product Catalog', 'Demo Room Setup'],
    popular: true,
  },
  {
    name: 'Premium',
    investment: '₹25L – ₹50L',
    features: ['Unlimited Cities', 'Full Training Academy', 'Complete Marketing Suite', 'Priority Support 24/7', 'Exclusive Products', 'Demo Room + Experience Center'],
    popular: false,
  },
];

export default function InvestmentTiers() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionHeading
          eyebrow="INVESTMENT PLANS"
          title="Choose Your Path."
          subtitle="Flexible investment tiers designed for every level of ambition."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {tiers.map((tier, i) => (
            <motion.div
              key={i}
              className={`glass-card p-8 relative ${tier.popular ? 'border-accent' : ''}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              {tier.popular && (
                <span className="absolute -top-3 right-6 bg-accent text-bg text-xs font-bold px-3 py-1 rounded-full">
                  Most Popular
                </span>
              )}
              <h3 className="font-syne text-2xl font-bold text-text">{tier.name}</h3>
              <p className="text-accent font-mono text-lg mt-2">{tier.investment}</p>
              <div className="space-y-3 mt-6">
                {tier.features.map((f, j) => (
                  <div key={j} className="flex items-center gap-2">
                    <Check size={16} className="text-accent flex-shrink-0" />
                    <span className="text-text text-sm">{f}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <NeonButton variant={tier.popular ? 'filled' : 'outlined'} spark={tier.popular} className="w-full">
                  Get Started
                </NeonButton>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
