import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const contactItems = [
  { icon: MapPin, label: 'Address', value: 'V SQUARE, Shop No. - 121, Palanpur Char Rasta, Palanpur, Surat, Gujarat - 395009' },
  { icon: Phone, label: 'Phone', value: '+91 84548 21043 / +91 81693 07587' },
  { icon: Mail, label: 'Email', value: 'apexsmarthome@smarthome.in' },
  { icon: Clock, label: 'Office Hours', value: '24/7 hrs' },
];

export default function ContactInfo() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <p className="font-mono text-accent text-xs tracking-[0.2em] uppercase mb-2">GET IN TOUCH</p>
      <h2 className="font-syne text-3xl md:text-4xl font-bold text-text">We'd Love to Hear From You.</h2>
      <div className="w-16 h-[2px] bg-accent mt-4" />

      <div className="space-y-6 mt-10">
        {contactItems.map((item, i) => (
          <div key={i} className="flex items-start gap-4">
            <div className="glass-card p-4 rounded-xl flex-shrink-0">
              <item.icon className="text-accent w-5 h-5" />
            </div>
            <div>
              <p className="text-muted text-xs uppercase tracking-wider">{item.label}</p>
              <p className="text-text font-medium mt-1">{item.value}</p>
            </div>
          </div>
        ))}
      </div>

      <a
        href="https://wa.me/918454821043"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-full font-semibold hover:shadow-[0_0_20px_rgba(37,211,102,0.4)] transition-all duration-300 mt-8"
      >
        💬 Chat on WhatsApp
      </a>
    </motion.div>
  );
}
