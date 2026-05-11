import { motion } from 'framer-motion';
import SectionHeading from '../../ui/SectionHeading';

export default function MapSection() {
  return (
    <section className="pb-16 md:pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionHeading eyebrow="LOCATION" title="Find Us" />
        <div className="mt-12 rounded-2xl overflow-hidden border border-white/10">
          <div style={{ filter: 'invert(0.9) hue-rotate(180deg) saturate(0.8)' }}>
            <iframe
              title="SmartHome Location"
              src="https://maps.google.com/maps?q=Palanpur+Char+Rasta,+Palanpur,+Surat,+Gujarat+395009&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
