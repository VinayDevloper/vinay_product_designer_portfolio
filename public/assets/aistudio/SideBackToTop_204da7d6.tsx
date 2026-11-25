import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export default function SideBackToTop(): React.JSX.Element {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 320);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.25 }}
          onClick={scrollToTop}
          data-testid="side-back-to-top"
          aria-label="Back to top"
          className="fixed right-3 sm:right-5 bottom-8 sm:bottom-12 z-[70] group flex flex-col items-center gap-2.5 px-2 py-3.5 rounded-full border border-line bg-surface/80 backdrop-blur-xl hover:border-lime/40 hover:bg-surface text-mut hover:text-ink shadow-lg transition-all duration-300 active:scale-95 cursor-pointer"
        >
          <div className="w-6 h-6 rounded-full border border-line bg-bg/60 flex items-center justify-center text-faint group-hover:text-accenttext group-hover:border-lime/30 transition-colors">
            <ArrowUp size={12} className="transition-transform duration-300 group-hover:-translate-y-0.5" />
          </div>

          <span
            className="text-[10px] font-mono tracking-[0.2em] uppercase text-faint group-hover:text-accenttext transition-colors select-none"
            style={{
              writingMode: 'vertical-rl',
              transform: 'rotate(180deg)'
            }}
          >
            TOP
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
