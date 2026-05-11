import { motion } from 'framer-motion';
import InnerPageHero from '../components/ui/InnerPageHero';
import ContactInfo from '../components/sections/contact/ContactInfo';
import ContactForm from '../components/sections/contact/ContactForm';
import MapSection from '../components/sections/contact/MapSection';

export default function Contact() {
  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      <InnerPageHero eyebrow="CONTACT" title="Get In Touch" subtitle="We're here to help you build your smart home." breadcrumb="Contact" />
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-16">
            <div className="md:col-span-2">
              <ContactInfo />
            </div>
            <div className="md:col-span-3">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
      <MapSection />
    </motion.main>
  );
}
