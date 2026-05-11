import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import NeonButton from '../../ui/NeonButton';
import { sendWhatsAppMessage } from '../../../services/whatsappService';

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    
    const message = `*New Contact Inquiry*\n\n*Name:* ${form.name}\n*Email:* ${form.email}\n*Subject:* ${form.subject}\n*Message:* ${form.message}`;
    
    try {
      // Send to both numbers in the background
      await Promise.all([
        sendWhatsAppMessage("918454821043", message),
        sendWhatsAppMessage("918169307587", message)
      ]);
      setSubmitted(true);
    } catch (error) {
      alert("There was an issue sending your request. Please try again or use the WhatsApp button below.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="glass-card p-8 md:p-10">
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form
              key="form"
              className="space-y-4"
              onSubmit={handleSubmit}
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <input className="neon-input" placeholder="Your Name" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
              <input className="neon-input" type="email" placeholder="Your Email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
              <input className="neon-input" placeholder="Subject" required value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} />
              <textarea className="neon-input" rows={5} placeholder="Your Message" required value={form.message} onChange={e => setForm({...form, message: e.target.value})} />
              <NeonButton 
                variant="filled" 
                spark 
                className="w-full mt-2" 
                type="submit"
                disabled={isSending}
              >
                {isSending ? "Sending..." : "Send Message"}
              </NeonButton>
            </motion.form>
          ) : (
            <motion.div
              key="success"
              className="text-center py-16"
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
              <h3 className="font-syne text-2xl font-bold text-text">Message Sent!</h3>
              <p className="text-muted mt-2">We'll get back to you shortly.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
