import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import NeonButton from '../../ui/NeonButton';
import SectionHeading from '../../ui/SectionHeading';
import { sendWhatsAppMessage } from '../../../services/whatsappService';

export default function FranchiseForm() {
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [form, setForm] = useState({ name: '', city: '', phone: '', budget: '', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    
    const message = `*New Franchise Enquiry*\n\n*Name:* ${form.name}\n*City:* ${form.city}\n*Phone:* ${form.phone}\n*Budget:* ${form.budget}\n*Message:* ${form.message}`;
    
    try {
      await Promise.all([
        sendWhatsAppMessage("918454821043", message),
        sendWhatsAppMessage("918169307587", message)
      ]);
      setSubmitted(true);
    } catch (error) {
      alert("Failed to send enquiry. Please check your connection or try again later.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="glass-card max-w-2xl mx-auto p-8 md:p-10">
          <SectionHeading eyebrow="BECOME A PARTNER" title="Franchise Enquiry" />

          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                className="mt-8 space-y-4"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
              >
                <input className="neon-input" placeholder="Full Name" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                <input className="neon-input" placeholder="City" required value={form.city} onChange={e => setForm({...form, city: e.target.value})} />
                <input className="neon-input" type="tel" placeholder="Phone Number" required value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
                <select className="neon-select" value={form.budget} onChange={e => setForm({...form, budget: e.target.value})} required>
                  <option value="" disabled>Select Investment Budget</option>
                  <option>₹5L – ₹10L</option>
                  <option>₹10L – ₹25L</option>
                  <option>₹25L – ₹50L</option>
                </select>
                <textarea className="neon-input" rows={4} placeholder="Your Message" value={form.message} onChange={e => setForm({...form, message: e.target.value})} />
                <NeonButton 
                  variant="filled" 
                  spark 
                  className="w-full mt-2" 
                  type="submit"
                  disabled={isSending}
                >
                  {isSending ? "Submitting..." : "Submit Enquiry"}
                </NeonButton>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                className="mt-8 text-center py-12"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                >
                  <CheckCircle className="text-accent w-16 h-16 mx-auto mb-4" />
                </motion.div>
                <h3 className="font-syne text-2xl font-bold text-text">Thank You!</h3>
                <p className="text-muted mt-2">We've received your enquiry. Our team will get back to you within 24 hours.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
