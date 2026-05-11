import { motion } from 'framer-motion';
import { Headset, Activity, Clock, LifeBuoy, Star, Heart, UserCheck, ThumbsUp } from 'lucide-react';
import SectionHeading from '../../ui/SectionHeading';

const usps = [
  { text: "24/7 Dedicated Support – Anytime, Anywhere", icon: Headset },
  { text: "Zero Downtime Promise", icon: Activity },
  { text: "Within 24 Hours Service Guarantee", icon: Clock },
  { text: "Lifetime Technical Support", icon: LifeBuoy },
  { text: "Annual Maintenance with Priority Service", icon: Star },
  { text: "Smart Care Program", icon: Heart },
  { text: "Customer First Commitment", icon: UserCheck },
  { text: "Hassle-Free Service Experience", icon: ThumbsUp },
];

export default function USPShowcase() {
  return (
    <section className="py-24 md:py-24 py-16-mobile relative overflow-hidden">
      <div className="absolute inset-0 radial-glow-bg" />
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <SectionHeading
          eyebrow="OUR COMMITMENT"
          title="Why Choose Us"
          subtitle="Experience unparalleled service and support with our premium offerings."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {usps.map((usp, index) => (
            <motion.div
              key={index}
              className="glass-card p-8 relative cursor-pointer"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
            >
              {/* Pulsing dot */}
              <motion.div
                className="absolute top-4 right-4 w-2 h-2 rounded-full bg-accent"
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />

              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                <usp.icon className="text-accent w-6 h-6" />
              </div>

              <h3 className="font-syne text-xl font-bold text-text leading-tight">{usp.text}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
