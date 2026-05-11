import { motion } from 'framer-motion';
import InnerPageHero from '../components/ui/InnerPageHero';
import WhyFranchise from '../components/sections/franchise/WhyFranchise';
import ROICalculator from '../components/sections/franchise/ROICalculator';
import InvestmentTiers from '../components/sections/franchise/InvestmentTiers';
import FranchiseForm from '../components/sections/franchise/FranchiseForm';

export default function Franchise() {
  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      <InnerPageHero eyebrow="FRANCHISE" title="Partner With Us" subtitle="Bring smart home automation to your city." breadcrumb="Franchise" />
      <WhyFranchise />
      <ROICalculator />
      <InvestmentTiers />
      <FranchiseForm />
    </motion.main>
  );
}
