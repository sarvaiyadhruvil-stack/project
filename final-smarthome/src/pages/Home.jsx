import { motion } from 'framer-motion';
import Hero from '../components/sections/home/Hero';
import VoiceShowcase from '../components/sections/home/VoiceShowcase';
import USPShowcase from '../components/sections/home/USPShowcase';
import FeatureGrid from '../components/sections/home/FeatureGrid';
import AllUnderOneRoof from '../components/sections/home/AllUnderOneRoof';
import ControlAnywhere from '../components/sections/home/ControlAnywhere';
import Testimonials from '../components/sections/home/Testimonials';
import CTABanner from '../components/sections/home/CTABanner';

export default function Home() {
  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      <Hero />
      <VoiceShowcase />
      <USPShowcase />
      <FeatureGrid />
      <AllUnderOneRoof />
      <ControlAnywhere />
      <Testimonials />
      <CTABanner />
    </motion.main>
  );
}
