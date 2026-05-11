import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, ShieldCheck, Zap, Cpu, ArrowLeft } from 'lucide-react';
import NeonButton from '../../ui/NeonButton';
import useMediaQuery from '../../../hooks/useMediaQuery';
import { sendWhatsAppMessage } from '../../../services/whatsappService';

// Ambient background components
const AmbientGlow = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <motion.div
      className="absolute -top-1/4 -left-1/4 w-[150vw] h-[150vh] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/10 via-background to-background opacity-70"
      animate={{
        scale: [1, 1.1, 1],
        opacity: [0.5, 0.7, 0.5],
        rotate: [0, 5, -5, 0],
      }}
      transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
    />
    <motion.div
      className="absolute top-[20%] right-[10%] w-[40vw] h-[40vw] rounded-full bg-accent2/10 blur-[120px]"
      animate={{
        x: [0, 50, -50, 0],
        y: [0, -50, 50, 0],
      }}
      transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
    />
    <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay"></div>
  </div>
);

export default function ProductModal({ product, onClose }) {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [showForm, setShowForm] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  const handleAcquireSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    
    const message = `*New Product Acquisition Request*\n\n*Product:* ${product.name}\n*Category:* ${product.category}\n\n*Operator Name:* ${formData.name}\n*Email:* ${formData.email}\n*Phone:* ${formData.phone}\n*Address:* ${formData.address}`;
    
    try {
      await Promise.all([
        sendWhatsAppMessage("918454821043", message),
        sendWhatsAppMessage("918169307587", message)
      ]);
      setIsSubmitted(true);
    } catch (error) {
      alert("Failed to transmit request. Please try again or contact us directly.");
    } finally {
      setIsSending(false);
    }
  };

  if (!product) return null;

  // Animation variants
  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemFadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.4 } }}
        onClick={onClose}
      >
        <AmbientGlow />

        <motion.div
          className="relative w-full h-full md:h-screen flex flex-col md:flex-row overflow-y-auto md:overflow-hidden"
          style={{ WebkitOverflowScrolling: 'touch' }}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0, transition: { duration: 0.3 } }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          onClick={e => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="fixed top-4 right-4 md:top-10 md:right-10 w-10 h-10 md:w-14 md:h-14 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-accent bg-black/40 backdrop-blur-md transition-all duration-300 z-50 group pointer-events-auto"
          >
            <X size={isMobile ? 20 : 24} className="group-hover:rotate-90 transition-transform duration-300" />
            <div className="absolute inset-0 rounded-full border border-accent/0 group-hover:border-accent/100 scale-110 group-hover:scale-100 transition-all duration-300" />
          </button>

          {/* Left Side: Massive Image/Visuals */}
          <div className="w-full md:w-1/2 h-[35vh] md:h-full relative flex items-center justify-center p-4 md:p-20 shrink-0">
            {/* Decorative tech lines */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
              <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
              <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-accent2 to-transparent" />
            </div>

            <motion.div 
              className="relative z-10 w-full h-full max-h-[800px] flex items-center justify-center"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              {product.image ? (
                <motion.img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-contain drop-shadow-[0_0_40px_rgba(var(--accent-rgb),0.3)]"
                  initial={{ scale: 1.1, opacity: 0, filter: 'blur(20px)' }}
                  animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
                  transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
                />
              ) : (
                <motion.div
                  initial={{ scale: 0.5, opacity: 0, rotate: -15, filter: 'blur(20px)' }}
                  animate={{ scale: 1, opacity: 1, rotate: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.8, type: "spring", delay: 0.2 }}
                  className="relative"
                >
                  <div className="absolute inset-0 bg-accent/20 blur-3xl rounded-full" />
                  <product.icon className="text-accent w-48 h-48 opacity-80 relative z-10 drop-shadow-[0_0_20px_rgba(0,183,255,0.8)]" />
                </motion.div>
              )}
            </motion.div>

            {/* Glowing orbit around image */}
            <motion.div 
              className="absolute w-[80%] h-[80%] border border-accent/20 rounded-full border-dashed"
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
            />
          </div>

          {/* Right Side: Vast Description Area / Acquisition Form */}
          <div className="w-full md:w-1/2 flex-1 md:h-full overflow-y-auto px-5 py-8 md:p-20 flex flex-col justify-start md:justify-center pb-24 md:pb-20 scrollbar-hide space-y-8 md:space-y-12 z-10 relative">
            <AnimatePresence mode="wait">
              {!showForm ? (
                <motion.div 
                  key="specs"
                  variants={staggerContainer} 
                  initial="hidden" 
                  animate="show" 
                  exit={{ opacity: 0, x: -20, transition: { duration: 0.3 } }}
                  className="max-w-2xl"
                >
                  <motion.div variants={itemFadeUp} className="mb-4 flex items-center gap-4 border-l-2 border-accent pl-4">
                    <span className="text-sm font-mono tracking-widest text-accent uppercase">{product.category}</span>
                    <span className="w-full h-px bg-white/10 block flex-1"></span>
                  </motion.div>
                  
                  <motion.h3 variants={itemFadeUp} className="font-syne text-3xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60 mb-4 md:mb-6 drop-shadow-lg">
                    {product.name}
                  </motion.h3>
                  
                  {/* Price removed as requested */}
                  
                  <motion.p variants={itemFadeUp} className="text-muted text-sm md:text-xl leading-relaxed font-light mb-6 md:mb-12">
                    {product.desc}
                  </motion.p>

                  {/* Specs Grid */}
                  <motion.div variants={itemFadeUp} className="grid grid-cols-2 gap-3 md:gap-6 mb-8 md:mb-16">
                    {product.specs?.map((spec, i) => (
                      <motion.div 
                        key={i} 
                        className="flex items-start gap-2 md:gap-4 p-3 md:p-4 rounded-xl bg-white/5 border border-white/10 hover:border-accent/40 hover:bg-white/10 transition-colors duration-300"
                        whileHover={{ scale: 1.02, y: -2 }}
                      >
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                          <Cpu size={14} className="text-accent md:w-[18px] md:h-[18px]" />
                        </div>
                        <div>
                          <h4 className="text-white/90 font-medium text-xs md:text-base leading-tight mt-0.5 md:mt-1">{spec}</h4>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>

                  <motion.div variants={itemFadeUp} className="flex flex-col sm:flex-row gap-3 md:gap-6">
                    <NeonButton 
                      variant="filled" 
                      spark 
                      className="w-full sm:w-auto px-8 md:px-12 py-3.5 md:py-5 text-base md:text-lg"
                      onClick={() => setShowForm(true)}
                    >
                      Acquire Technology
                    </NeonButton>
                    <button className="px-6 md:px-8 py-3.5 md:py-5 rounded-full border border-white/20 text-white hover:bg-white/5 transition-colors font-mono text-xs md:text-sm tracking-widest uppercase">
                      View Full Specs
                    </button>
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div 
                  key="form"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="max-w-xl w-full"
                >
                  <button 
                    onClick={() => setShowForm(false)}
                    className="flex items-center gap-2 text-muted hover:text-accent font-mono text-sm uppercase tracking-widest mb-8 transition-colors"
                  >
                    <ArrowLeft size={16} /> Back to Details
                  </button>

                  <h3 className="font-syne text-3xl md:text-5xl font-bold text-white mb-4">
                    Initiate Acquisition
                  </h3>
                  <p className="text-muted text-lg mb-10">
                    Provide your credentials below to acquire <span className="text-accent font-medium">{product.name}</span>.
                  </p>

                  {!isSubmitted ? (
                    <form 
                      className="space-y-6"
                      onSubmit={handleAcquireSubmit}
                    >
                      <div className="space-y-2">
                        <label className="text-sm font-mono text-white/70 uppercase px-2">Operator Name</label>
                        <input 
                          required 
                          type="text" 
                          className="neon-input" 
                          placeholder="Enter your full name" 
                          value={formData.name}
                          onChange={e => setFormData({...formData, name: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-mono text-white/70 uppercase px-2">Comms Link (Email)</label>
                        <input 
                          required 
                          type="email" 
                          className="neon-input" 
                          placeholder="system@example.com" 
                          value={formData.email}
                          onChange={e => setFormData({...formData, email: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-mono text-white/70 uppercase px-2">Frequency Unit (Phone)</label>
                        <input 
                          required 
                          type="tel" 
                          className="neon-input" 
                          placeholder="+1 (234) 567-8900" 
                          value={formData.phone}
                          onChange={e => setFormData({...formData, phone: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-mono text-white/70 uppercase px-2">Delivery Coordinates</label>
                        <textarea 
                          required 
                          rows={3} 
                          className="neon-input resize-none" 
                          placeholder="Provide full address layout..."
                          value={formData.address}
                          onChange={e => setFormData({...formData, address: e.target.value})}
                        ></textarea>
                      </div>

                      <div className="pt-6">
                        <NeonButton 
                          type="submit" 
                          variant="filled" 
                          spark 
                          className="w-full text-lg py-5"
                          disabled={isSending}
                        >
                          {isSending ? "Transmitting..." : "Confirm & Transmit Data"}
                        </NeonButton>
                      </div>
                    </form>
                  ) : (
                    <motion.div 
                      className="text-center py-16 px-8 rounded-2xl border border-accent/30 bg-accent/5 backdrop-blur-sm"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      <div className="w-20 h-20 mx-auto rounded-full bg-accent/20 flex items-center justify-center mb-6">
                        <Check size={40} className="text-accent" />
                      </div>
                      <h4 className="font-syne text-2xl font-bold text-white mb-2">Transmission Successful</h4>
                      <p className="text-muted mb-8">Your request for {product.name} has been securely logged. Our specialists will contact you shortly.</p>
                      <button 
                        onClick={() => {
                          setIsSubmitted(false);
                          setShowForm(false);
                        }}
                        className="text-accent hover:text-white transition-colors uppercase font-mono text-sm tracking-wider"
                      >
                        Return to Catalog
                      </button>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

