import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, Box, Layers, Info, Phone, Download } from 'lucide-react';

const navLinks = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/products', label: 'Products', icon: Box },
  { path: '/solutions', label: 'Solutions', icon: Layers },
  { path: '/about', label: 'About', icon: Info },
  { path: '/contact', label: 'Contact', icon: Phone },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 bg-[#040B1F] md:bg-[#040B1F]/60 md:backdrop-blur-md border-b border-white/5"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-16">
        {/* Logo/Brand */}
        <Link to="/" className="flex items-center gap-2 z-[60]">
          <img
            src="/logo.png"
            alt="Smart Home"
            className="h-32 md:h-36 w-auto object-contain"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'block';
            }}
          />
          {/* Fallback text — hidden when logo loads */}
          <span
            className="font-syne font-bold text-xl text-accent"
            style={{ display: 'none' }}
          >
            Smart<span className="text-text">Home</span>
          </span>
          <span className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-accent shadow-[0_0_8px_rgba(0,200,255,0.6)]" />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium transition-colors duration-300 ${location.pathname === link.path ? 'text-accent' : 'text-muted hover:text-accent'
                }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <Link
          to="/contact"
          className="hidden md:block border border-accent text-accent px-5 py-2 rounded-full text-sm hover:bg-accent/10 transition-all duration-300"
        >
          Get Started
        </Link>
        {/* Catalogue Download Button */}
        <a
          href="/catalogue.pdf"
          download="catalogue.pdf"
          className="hidden md:inline-block border border-accent text-accent px-5 py-2 rounded-full text-sm hover:bg-accent/10 transition-all duration-300 ml-4"
        >
          Catalogue
        </a>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-text z-[80]"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Slide-out Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              className="fixed inset-0 bg-[#020510] z-[55]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />

            {/* Slide-out panel from right */}
            <motion.div
              className="fixed top-0 right-0 h-full w-[280px] z-[60] flex flex-col"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            >
              {/* Solid background */}
              <div className="absolute inset-0 bg-[#020510] border-l border-white/10" />

              {/* Panel content */}
              <div className="relative z-10 flex flex-col h-full px-6 py-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-10">
                  <div>
                    <p className="text-xs font-mono text-accent uppercase tracking-[0.2em]">Navigate</p>
                    <h3 className="font-syne text-xl font-bold text-white mt-1">Menu</h3>
                  </div>
                  <motion.button
                    onClick={() => setMobileOpen(false)}
                    className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white/60 hover:text-white hover:border-accent/50 transition-all duration-300"
                    whileTap={{ scale: 0.9 }}
                  >
                    <X size={18} />
                  </motion.button>
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-gradient-to-r from-accent/40 via-white/10 to-transparent mb-6" />

                {/* Nav links */}
                <div className="flex flex-col gap-2">
                  {navLinks.map((link, i) => {
                    const isActive = location.pathname === link.path;
                    const Icon = link.icon;
                    return (
                      <motion.div
                        key={link.path}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.06, duration: 0.3 }}
                      >
                        <Link
                          to={link.path}
                          onClick={() => setMobileOpen(false)}
                          className={`flex items-center gap-4 w-full px-4 py-4 rounded-xl transition-all duration-300 ${
                            isActive
                              ? 'bg-[#0B1633] border border-accent shadow-[0_0_20px_rgba(var(--accent-rgb),0.15)]'
                              : 'bg-[#111A33] border border-[#1E2B4D] hover:bg-[#1A2542] hover:border-[#2D3F66]'
                          }`}
                        >
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-300 ${
                            isActive ? 'bg-[#152347]' : 'bg-[#1A2542]'
                          }`}>
                            <Icon size={18} className={`transition-colors duration-300 ${isActive ? 'text-accent' : 'text-white/40'}`} />
                          </div>
                          <span className={`text-sm font-semibold transition-colors duration-300 ${
                            isActive ? 'text-accent' : 'text-white/80'
                          }`}>
                            {link.label}
                          </span>
                          {isActive && (
                            <motion.div
                              className="ml-auto w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_rgba(var(--accent-rgb),0.6)]"
                              layoutId="activeNavDot"
                            />
                          )}
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-gradient-to-r from-white/10 via-white/5 to-transparent my-6" />

                {/* Catalogue Download */}
                <motion.a
                  href="/catalogue.pdf"
                  download="catalogue.pdf"
                  className="flex items-center gap-4 w-full px-4 py-4 rounded-xl bg-[#0F1E3B] border border-[#213B6B] hover:bg-[#15274C] transition-all duration-300"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.06, duration: 0.3 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <div className="w-10 h-10 rounded-lg bg-[#15274C] flex items-center justify-center shrink-0">
                    <Download size={18} className="text-accent" />
                  </div>
                  <span className="text-sm font-semibold text-accent">Catalogue</span>
                </motion.a>

                {/* Bottom branding */}
                <div className="mt-auto pt-6 border-t border-white/5">
                  <p className="text-xs text-white/30 font-mono text-center">
                    SmartHome — Intelligently Alive
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
