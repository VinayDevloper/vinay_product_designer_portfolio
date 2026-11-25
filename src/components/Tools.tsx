import React from 'react';
import { TOOLS } from '../data/content';
import { SectionHead, Serif, FadeUp } from './Shared';
import { Sparkles } from 'lucide-react';

export default function Tools(): React.JSX.Element {
  return (
    <section id="tools" className="px-6 sm:px-12 lg:px-24 py-14 sm:py-20 border-t border-line bg-bg">
      <SectionHead
        label="Engineering Spine & Tools"
        title={
          <>
            Tools &amp; <Serif>workflow stack</Serif>.
          </>
        }
        sub="Design systems, prototyping, and front-end collaboration tools across the product lifecycle."
      />

      <div className="max-w-5xl mx-auto space-y-12">

        {/* Categorized Tools Grid */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-faint">
            <Sparkles size={12} className="text-accenttext" />
            <span>Core Toolset by Domain</span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TOOLS.map((t, i) => (
              <FadeUp key={t.category} delay={i * 0.05}>
                <div className="h-full p-6 rounded-3xl border border-line bg-surface/40 hover:bg-surface/70 hover:border-lime/30 transition-all duration-300 flex flex-col justify-between m3-elevation-1">
                  <div className="space-y-3">
                    <div className="text-xs font-mono font-semibold uppercase tracking-wider text-accenttext">
                      {t.category}
                    </div>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {t.items.map((item) => (
                        <span
                          key={item}
                          className="px-3 py-1 rounded-full border border-line bg-surface/90 text-xs font-medium text-ink hover:border-lime/40 transition-colors"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
