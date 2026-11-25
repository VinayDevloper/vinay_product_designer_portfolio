import React from 'react';
import { motion } from 'framer-motion';

export const FadeUp: React.FC<{
  children: React.ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}> = ({ children, delay = 0, className = "", y = 32 }) => (
  <motion.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.15 }}
    transition={{ duration: 0.7, delay, ease: [0.2, 0, 0, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

export const SectionHead: React.FC<{
  label: string;
  title: React.ReactNode;
  sub?: string;
  index?: string;
}> = ({ label, title, sub }) => (
  <div className="mb-10 sm:mb-14">
    <FadeUp>
      {/* M3 Assist/Filter Chip Style Label */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-line bg-surface/80 text-xs font-medium uppercase tracking-wider text-accenttext mb-4 m3-elevation-1">
        <span className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse" />
        <span>{label}</span>
      </div>
    </FadeUp>
    <FadeUp delay={0.08}>
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.08] max-w-3xl text-ink">
        {title}
      </h2>
    </FadeUp>
    {sub && (
      <FadeUp delay={0.16}>
        <p className="mt-4 sm:mt-5 text-sm sm:text-base text-mut max-w-2xl leading-relaxed font-light">{sub}</p>
      </FadeUp>
    )}
  </div>
);

export const Serif: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <em className="font-serif italic font-normal text-ink">{children}</em>
);

export const Mark: React.FC<{ size?: number }> = ({ size = 28 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    aria-hidden="true"
    className="rounded-xl shadow-xs"
  >
    <rect width="64" height="64" rx="16" fill="var(--ink)" />
    <path
      d="M18 17 L32 47 L46 17"
      stroke="var(--bg)"
      strokeWidth="7"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="50" cy="43" r="4" fill="var(--lime)" />
  </svg>
);
