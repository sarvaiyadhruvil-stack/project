import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, X, Lightbulb, Thermometer, Shield, Blinds, LayoutGrid } from 'lucide-react';

const tabs = [
  { label: 'All', icon: LayoutGrid },
  { label: 'Lighting', icon: Lightbulb },
  { label: 'Climate', icon: Thermometer },
  { label: 'Security', icon: Shield },
  { label: 'Curtains', icon: Blinds },
];

export default function FilterTabs({ activeTab, setActiveTab }) {
  const [panelOpen, setPanelOpen] = useState(false);

  const handleSelect = (tab) => {
    setActiveTab(tab);
    setPanelOpen(false);
  };

  return (
    <>
      {/* ── Desktop: Horizontal tabs (unchanged) ── */}
      <div className="hidden md:block mt-8 mb-12">
        <div className="flex gap-3">
          {tabs.map(tab => (
            <motion.button
              key={tab.label}
              onClick={() => setActiveTab(tab.label)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium border cursor-pointer transition-all duration-300 ${
                activeTab === tab.label
                  ? 'bg-accent text-bg border-accent shadow-[0_0_20px_rgba(var(--accent-rgb),0.3)]'
                  : 'text-muted border-white/10 hover:text-text hover:border-white/20 bg-white/5'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tab.label}
            </motion.button>
          ))}
        </div>
      </div>

      {/* ── Mobile: Floating filter button ── */}
      <div className="md:hidden mt-6 mb-8 flex items-center justify-between">
        <p className="text-xs font-mono text-muted uppercase tracking-widest">
          Category: <span className="text-accent font-semibold">{activeTab}</span>
        </p>
        <motion.button
          onClick={() => setPanelOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-accent/40 bg-accent/10 text-accent text-sm font-medium backdrop-blur-sm"
          whileTap={{ scale: 0.95 }}
        >
          <SlidersHorizontal size={16} />
          Filter
        </motion.button>
      </div>

      {/* ── Mobile: Slide-out panel from right ── */}
      <AnimatePresence>
        {panelOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPanelOpen(false)}
            />

            {/* Panel */}
            <motion.div
              className="fixed top-0 right-0 h-full w-[280px] z-[70] flex flex-col"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            >
              {/* Glass background */}
              <div className="absolute inset-0 bg-[#0A1229]/95 backdrop-blur-2xl border-l border-white/10" />
              
              {/* Decorative glow */}
              <div className="absolute top-1/4 -left-20 w-40 h-40 bg-accent/20 rounded-full blur-[80px] pointer-events-none" />
              <div className="absolute bottom-1/3 right-0 w-32 h-32 bg-accent2/15 rounded-full blur-[60px] pointer-events-none" />

              {/* Panel content */}
              <div className="relative z-10 flex flex-col h-full px-6 py-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-10">
                  <div>
                    <p className="text-xs font-mono text-accent uppercase tracking-[0.2em]">Filter By</p>
                    <h3 className="font-syne text-xl font-bold text-white mt-1">Categories</h3>
                  </div>
                  <motion.button
                    onClick={() => setPanelOpen(false)}
                    className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white/60 hover:text-white hover:border-accent/50 transition-all duration-300"
                    whileTap={{ scale: 0.9 }}
                  >
                    <X size={18} />
                  </motion.button>
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-gradient-to-r from-accent/40 via-white/10 to-transparent mb-6" />

                {/* Filter options */}
                <div className="flex flex-col gap-2">
                  {tabs.map((tab, i) => {
                    const isActive = activeTab === tab.label;
                    const Icon = tab.icon;
                    return (
                      <motion.button
                        key={tab.label}
                        onClick={() => handleSelect(tab.label)}
                        className={`flex items-center gap-4 w-full px-4 py-4 rounded-xl text-left transition-all duration-300 ${
                          isActive
                            ? 'bg-accent/15 border border-accent/40 shadow-[0_0_20px_rgba(var(--accent-rgb),0.15)]'
                            : 'bg-white/[0.03] border border-transparent hover:bg-white/[0.06] hover:border-white/10'
                        }`}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.06, duration: 0.3 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-300 ${
                          isActive ? 'bg-accent/20' : 'bg-white/5'
                        }`}>
                          <Icon size={18} className={`transition-colors duration-300 ${isActive ? 'text-accent' : 'text-white/40'}`} />
                        </div>
                        <div className="flex-1">
                          <span className={`text-sm font-semibold transition-colors duration-300 ${
                            isActive ? 'text-accent' : 'text-white/80'
                          }`}>
                            {tab.label}
                          </span>
                        </div>
                        {isActive && (
                          <motion.div
                            className="w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_rgba(var(--accent-rgb),0.6)]"
                            layoutId="activeFilterDot"
                          />
                        )}
                      </motion.button>
                    );
                  })}
                </div>

                {/* Bottom info */}
                <div className="mt-auto pt-6 border-t border-white/5">
                  <p className="text-xs text-white/30 font-mono text-center">
                    Tap to filter products
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
