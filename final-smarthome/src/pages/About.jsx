import { motion } from 'framer-motion';
import InnerPageHero from '../components/ui/InnerPageHero';
import VisionMission from '../components/sections/about/VisionMission';
import Timeline from '../components/sections/about/Timeline';
import StatsRow from '../components/sections/about/StatsRow';

export default function About() {
  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      <InnerPageHero eyebrow="ABOUT US" title="Our Story" subtitle="From a simple idea to 500+ smart homes across India." breadcrumb="About" />
      <VisionMission />
      <Timeline />
      <StatsRow />
    </motion.main>
  );
}
