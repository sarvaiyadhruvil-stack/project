import { motion } from 'framer-motion';
import { Check, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SolutionSection({ eyebrow, title, description, features, icon: Icon, color, reversed, index }) {
  // Convert hex color to rgba for glows
  const hexToRgb = (hex) => {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '0,200,255';
  };
  
  const rgbColor = hexToRgb(color);

  return (
    <section className={`py-20 md:py-32 border-t border-white/5 relative overflow-hidden ${index === 0 ? 'border-t-0' : ''}`}>
      {/* Background ambient glow based on solution color */}
      <div 
        className={`absolute top-1/2 ${reversed ? '-left-1/4' : '-right-1/4'} -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[120px] pointer-events-none opacity-10`}
        style={{ backgroundColor: color }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center ${reversed ? 'lg:direction-rtl' : ''}`}>
          
          {/* Text Content Side */}
          <motion.div
            className={reversed ? 'lg:order-2' : 'lg:order-1'}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px" style={{ backgroundColor: color }} />
              <p className="font-mono text-xs tracking-[0.25em] uppercase font-bold" style={{ color: color }}>
                {eyebrow}
              </p>
            </div>
            
            <h3 className="font-syne text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {title}
            </h3>
            
            <p className="text-white/60 text-lg md:text-xl leading-relaxed mb-10 font-light">
              {description}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 mb-12">
              {features.map((f, i) => (
                <motion.div 
                  key={i} 
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <div 
                    className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ backgroundColor: `rgba(${rgbColor}, 0.15)`, border: `1px solid rgba(${rgbColor}, 0.3)` }}
                  >
                    <Check size={12} style={{ color: color }} strokeWidth={3} />
                  </div>
                  <span className="text-white/80 text-sm md:text-base">{f}</span>
                </motion.div>
              ))}
            </div>
            
            <Link to="/contact">
              <motion.button 
                className="group relative px-8 py-4 bg-white/5 border border-white/10 rounded-full font-syne font-bold text-white overflow-hidden transition-all duration-500 hover:border-transparent flex items-center gap-3"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `linear-gradient(90deg, ${color}00, ${color}30, ${color}00)` }}
                />
                <span className="relative z-10">Discuss Project</span>
                <ChevronRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
          </motion.div>

          {/* Visual Showcase Side */}
          <motion.div
            className={reversed ? 'lg:order-1' : 'lg:order-2'}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="relative aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden group">
              {/* Complex Glass Container */}
              <div className="absolute inset-0 bg-[#040B1F]/40 backdrop-blur-2xl border border-white/10 rounded-3xl" />
              
              {/* Inner ambient gradients */}
              <div 
                className="absolute -top-1/2 -right-1/2 w-full h-full rounded-full blur-3xl opacity-20 transition-transform duration-1000 group-hover:scale-110"
                style={{ backgroundColor: color }}
              />
              <div 
                className="absolute -bottom-1/2 -left-1/2 w-full h-full rounded-full blur-3xl opacity-20 transition-transform duration-1000 group-hover:scale-110"
                style={{ backgroundColor: color }}
              />

              {/* Grid overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_70%)]" />

              {/* Central Element */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  {/* Rotating rings */}
                  <motion.div 
                    className="absolute inset-[-40px] rounded-full border border-dashed opacity-30"
                    style={{ borderColor: color }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.div 
                    className="absolute inset-[-80px] rounded-full border border-white/5"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full" style={{ backgroundColor: color, boxShadow: `0 0 10px ${color}` }} />
                  </motion.div>
                  
                  {/* Main Icon Container */}
                  <div 
                    className="relative w-32 h-32 rounded-2xl flex items-center justify-center backdrop-blur-md bg-white/5 border border-white/10 shadow-2xl transition-transform duration-500 group-hover:scale-105"
                    style={{ boxShadow: `0 0 40px rgba(${rgbColor}, 0.2)` }}
                  >
                    <Icon className="w-16 h-16 drop-shadow-2xl" style={{ color: color }} />
                  </div>
                </div>
              </div>

              {/* Decorative data floating widgets */}
              <motion.div 
                className="absolute top-8 right-8 glass-card px-4 py-2 rounded-lg border border-white/10 flex items-center gap-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: color }} />
                <span className="text-xs font-mono text-white/70">System Active</span>
              </motion.div>

              <motion.div 
                className="absolute bottom-8 left-8 glass-card px-4 py-2 rounded-lg border border-white/10 flex flex-col gap-1"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <span className="text-[10px] font-mono text-white/40 uppercase">Efficiency</span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map(bar => (
                    <div key={bar} className="w-1.5 h-4 rounded-full bg-white/10 overflow-hidden relative">
                      <motion.div 
                        className="absolute bottom-0 w-full" 
                        style={{ backgroundColor: color }}
                        initial={{ height: 0 }}
                        whileInView={{ height: `${60 + Math.random() * 40}%` }}
                        transition={{ duration: 1, delay: 0.8 + (bar * 0.1) }}
                      />
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
