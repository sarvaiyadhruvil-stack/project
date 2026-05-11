import { motion } from 'framer-motion';
import { Wifi, Link as LinkIcon, Hotel, Music, Briefcase, Home } from 'lucide-react';
import InnerPageHero from '../components/ui/InnerPageHero';
import SolutionSection from '../components/sections/solutions/SolutionSection';

const solutions = [
  {
    eyebrow: 'FLEXIBLE & INVISIBLE',
    title: 'Wireless Automation',
    description: 'Transform any existing space into a smart environment without breaking walls or rewiring. Our wireless solutions use advanced mesh networks to ensure fast, reliable, and secure communication between devices.',
    features: [
      'Zero-wiring retrofit installation',
      'Scalable mesh network topology',
      'Battery-powered sensor integration',
      'Real-time cloud synchronization',
      'Voice assistant compatibility',
      'Highly encrypted signal transmission'
    ],
    icon: Wifi,
    color: '#00C8FF', // Cyan
  },
  {
    eyebrow: 'ULTIMATE RELIABILITY',
    title: 'Wired Automation',
    description: 'The gold standard for new constructions and full renovations. Wired automation provides unmatched speed, security, and stability by physically connecting all devices to a centralized intelligent hub.',
    features: [
      'Zero-latency response times',
      'Interference-free communication',
      'Centralized equipment rack architecture',
      'Hardwired security integration',
      'KNX and robust proprietary protocols',
      'Future-proof cabling infrastructure'
    ],
    icon: LinkIcon,
    color: '#6366F1', // Indigo
  },
  {
    eyebrow: 'GUEST EXPERIENCE',
    title: 'Hotel Automation',
    description: 'Elevate hospitality by giving guests complete control over their environment. From welcome scenes to automated climate control, smart hotels reduce operational costs while maximizing guest satisfaction.',
    features: [
      'Automated "Welcome" & "Sleep" scenes',
      'Energy-saving occupancy sensors',
      'Centralized room management system',
      'Smart access control and locks',
      'Customized bedside control panels',
      'Integration with property management'
    ],
    icon: Hotel,
    color: '#10B981', // Emerald
  },
  {
    eyebrow: 'DYNAMIC AMBIENCE',
    title: 'Club Automation',
    description: 'Create unforgettable nightlife experiences with dynamic, synchronized control of lighting, audio, and climate. Shift the mood instantly from relaxed lounge to high-energy dance floor.',
    features: [
      'DMX lighting & laser synchronization',
      'Multi-zone audio routing & control',
      'Automated climate & ventilation',
      'One-touch preset party modes',
      'Energy usage optimization',
      'Centralized DJ/management dashboard'
    ],
    icon: Music,
    color: '#9F1239', // Rose
  },
  {
    eyebrow: 'SMART WORKSPACES',
    title: 'Office Automation',
    description: 'Boost productivity, enhance security, and reduce overhead costs. Smart offices adapt to how your team works, providing the perfect lighting, temperature, and presentation environments automatically.',
    features: [
      'Automated boardroom scenes',
      'Daylight harvesting & adaptive lighting',
      'Biometric & mobile access control',
      'Smart HVAC based on occupancy',
      'Automated shades & privacy glass',
      'Comprehensive energy analytics'
    ],
    icon: Briefcase,
    color: '#F59E0B', // Amber
  },
  {
    eyebrow: 'TOTAL COMFORT',
    title: 'Home Automation',
    description: 'Your entire home, synchronized to your lifestyle. Control lighting, climate, security, and entertainment from a single app, wall panel, or just your voice.',
    features: [
      'Multi-room distributed audio & video',
      'Automated smart blinds & curtains',
      'Intelligent climate control schedules',
      'Comprehensive security & surveillance',
      'Customizable mood & activity scenes',
      'Remote access from anywhere'
    ],
    icon: Home,
    color: '#8B5CF6', // Purple to differentiate from Wireless
  },
];

export default function Solutions() {
  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      <InnerPageHero 
        eyebrow="TOTAL SOLUTIONS" 
        title="All Under One Roof" 
        subtitle="Comprehensive, scalable, and intelligent automation systems for every environment." 
        breadcrumb="Solutions" 
      />
      {solutions.map((sol, i) => (
        <SolutionSection key={i} {...sol} reversed={i % 2 !== 0} index={i} />
      ))}
    </motion.main>
  );
}
