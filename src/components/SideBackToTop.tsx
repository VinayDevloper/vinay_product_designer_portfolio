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
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-6 right-6 z-[70]"
        >
          {/* M3 Small FAB (Floating Action Button) with Level 3 Elevation */}
          <button
            type="button"
            onClick={scrollToTop}
            data-testid="side-back-to-top"
            aria-label="Back to top"
            className="flex items-center justify-center w-11 h-11 rounded-2xl bg-surface/90 hover:bg-surface border border-line text-ink hover:text-accenttext m3-elevation-2 hover:m3-elevation-3 transition-all duration-200 cursor-pointer backdrop-blur-md active:scale-95"
          >
            <ArrowUp size={18} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
