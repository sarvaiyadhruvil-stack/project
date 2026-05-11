import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import Navbar from './components/global/Navbar';
import Footer from './components/global/Footer';
import ElectricCursor from './components/global/ElectricCursor';
import ClickRipple from './components/global/ClickRipple';
import TouchRipple from './components/global/TouchRipple';
import ScrollProgressBar from './components/global/ScrollProgressBar';
import FloatingWhatsApp from './components/global/FloatingWhatsApp';
import { SparkProvider } from './context/SparkContext';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Products = lazy(() => import('./pages/Products'));
const Solutions = lazy(() => import('./pages/Solutions'));
const Franchise = lazy(() => import('./pages/Franchise'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Contact = lazy(() => import('./pages/Contact'));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/solutions" element={<Solutions />} />
        <Route path="/franchise" element={<Franchise />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </AnimatePresence>
  );
}

function LenisProvider({ children }) {
  useEffect(() => {
    if (window.matchMedia('(max-width: 768px)').matches) return;
    
    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true });
    
    // Fix 3d — Sync Lenis with Framer's scroll engine
    lenis.on('scroll', () => {
      window.dispatchEvent(new Event('scroll'));
    });
    
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return children;
}

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      <SparkProvider>
        <LenisProvider>
          <div className="relative min-h-screen bg-bg">
            <ElectricCursor />
            <ClickRipple />
            <TouchRipple />
            <ScrollProgressBar />
            <Navbar />
            <ScrollToTop />
            <Suspense fallback={<PageLoader />}>
              <AnimatedRoutes />
            </Suspense>
            <Footer />
            <FloatingWhatsApp />
          </div>
        </LenisProvider>
      </SparkProvider>
    </BrowserRouter>
  );
}
