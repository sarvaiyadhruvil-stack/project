import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import SectionHeading from '../../ui/SectionHeading';

const testimonials = [
  {
    quote: "SmartHome transformed our apartment into a sci-fi dream. The voice controls are incredibly responsive, and the automation modes are a game-changer for our daily routine.",
    name: "Priya Sharma",
    role: "Homeowner, Mumbai, Bandra",
    avatar: "PS",
  },
  {
    quote: "The energy savings alone paid for the installation within 6 months. But what really impressed us was how intuitive everything is — even my parents use it effortlessly.",
    name: "Arjun Patel",
    role: "Tech Entrepreneur, Ahmedabad",
    avatar: "AP",
  },
  {
    quote: "As a franchise partner, the ROI exceeded all expectations. SmartHome's support team is outstanding, and the technology practically sells itself.",
    name: "Rahul Mehta",
    role: "Franchise Partner, Delhi",
    avatar: "RM",
  },
  {
    quote: "We installed SmartHome in our boutique hotel and our guest satisfaction scores jumped 40%. The dashboard gives us complete control over every room.",
    name: "Anita Desai",
    role: "Hotel Owner, Jaipur",
    avatar: "AD",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const next = () => {
    setDirection(1);
    setCurrent(prev => (prev + 1) % testimonials.length);
  };
  const prev = () => {
    setDirection(-1);
    setCurrent(prev => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const variants = {
    enter: (dir) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
  };

  const handlePanEnd = (e, { offset }) => {
    if (offset.x < -50) next();
    else if (offset.x > 50) prev();
  };

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionHeading
          eyebrow="TESTIMONIALS"
          title="Trusted by 250+ Customers."
        />

        <div className="max-w-2xl mx-auto mt-16 relative">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="glass-card p-8 md:p-10 text-center"
              onPanEnd={handlePanEnd}
            >
              <Quote className="text-accent w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="text-text text-lg leading-relaxed">
                {testimonials[current].quote}
              </p>
              <div className="mt-8 flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-accent2 flex items-center justify-center text-bg font-bold text-sm">
                  {testimonials[current].avatar}
                </div>
                <p className="font-semibold text-text">{testimonials[current].name}</p>
                <p className="text-muted text-sm">{testimonials[current].role}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-muted hover:text-accent hover:border-accent transition-all duration-300"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${i === current ? 'bg-accent w-6' : 'bg-white/20 hover:bg-white/40'
                    }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-muted hover:text-accent hover:border-accent transition-all duration-300"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
