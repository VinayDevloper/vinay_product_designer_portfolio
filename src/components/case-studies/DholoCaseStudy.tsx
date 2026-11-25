import React from 'react';
import { motion } from 'framer-motion';
import { ProjectItem, PROJECTS } from '../../data/content';
import { FadeUp } from '../Shared';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';

interface DholoCaseStudyProps {
  project: ProjectItem;
  onBack: () => void;
  onSelectProject: (p: ProjectItem) => void;
}

export default function DholoCaseStudy({
  project,
  onBack,
  onSelectProject
}: DholoCaseStudyProps): React.JSX.Element {
  const currentIndex = PROJECTS.findIndex((p) => p.id === project.id);
  const nextProject = PROJECTS[(currentIndex + 1) % PROJECTS.length];

  return (
    <article className="min-h-screen bg-bg text-ink pb-32 pt-20 sm:pt-24 selection:bg-lime selection:text-black">
      {/* Top Floating Glass Bar */}
      <div className="sticky top-4 z-40 px-4 sm:px-8 max-w-5xl mx-auto">
        <div className="flex items-center justify-between gap-4 px-4 py-2.5 rounded-full border border-line bg-surface/85 backdrop-blur-xl m3-elevation-2">
          <button
            onClick={onBack}
            data-testid="casestudy-back-btn"
            className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium text-mut hover:text-ink hover:bg-white/5 transition-all duration-200 cursor-pointer"
          >
            <ArrowLeft size={13} className="transition-transform group-hover:-translate-x-1" />
            <span>All Projects</span>
          </button>

          <span className="text-xs font-medium text-faint hidden md:inline-block">
            Dholo Mobile App · UI/UX Casestudy
          </span>

          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-line text-xs font-medium text-mut hover:text-ink transition-colors cursor-pointer"
          >
            <span>Back</span>
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-5 sm:px-8 pt-8 space-y-16 sm:space-y-20">
        {/* ─── 1. TOP MINT-GREEN HEADER BANNER (Exact PDF Header) ─────── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl overflow-hidden bg-gradient-to-br from-[#D7E9E4] via-[#c7e0d9] to-[#a7d0c5] text-[#052931] p-8 sm:p-12 md:p-14 shadow-xl border border-[#3C8677]/30"
        >
          <div className="flex items-center gap-2.5 mb-6">
            <span className="w-6 h-6 rounded-full bg-[#07697D] text-white flex items-center justify-center text-xs font-bold">
              D
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#07697D]">
              Dholo Mobile App UI/UX Casestudy
            </span>
          </div>

          <div className="grid md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7 space-y-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] text-[#04232a]">
                Dholo: Laundry &amp; Ironing Service for Urban Residences
              </h1>
              <div className="text-lg sm:text-xl font-medium text-[#07697D]">
                Tap. Wash. Repeat.
              </div>
            </div>
            <div className="md:col-span-5 flex justify-center">
              <img
                src="/assets/aistudio/image_ef9d0b57.png"
                alt="Dholo iOS Laundry App Splash"
                className="w-full max-w-[210px] sm:max-w-[230px] h-auto drop-shadow-2xl"
              />
            </div>
          </div>
        </motion.section>

        {/* ─── 2. PROJECT OVERVIEW & PROBLEM STATEMENT ─────────────────── */}
        <FadeUp y={28}>
          <section className="grid md:grid-cols-2 gap-6">
            <div className="p-7 rounded-3xl border border-line bg-surface/50 space-y-4 m3-elevation-1">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-ink">Project Overview</h2>
                <div className="px-3 py-1.5 rounded-xl bg-[#D7E9E4] text-[#07697D] font-bold text-xs">
                  Dholo iOS
                </div>
              </div>
              <p className="text-sm text-mut leading-relaxed font-light">
                Dholo is an iOS app that connects hostel, PG, and flat residents in Tier 1 &amp; 2 cities with trusted laundry and ironing services. It solves the common issues of unavailability and inconvenience through a simple, user-friendly platform.
              </p>
            </div>

            <div className="p-7 rounded-3xl border border-line bg-surface/50 space-y-4 m3-elevation-1">
              <h2 className="text-2xl font-bold text-ink">Problem Statement</h2>
              <p className="text-sm text-mut leading-relaxed font-light">
                Finding quick, reliable, and affordable laundry and ironing services is a daily struggle for hostel, PG, and flat residents. Dholo bridges this gap, connecting users with nearby service providers seamlessly through a simple, user-friendly app.
              </p>
            </div>
          </section>
        </FadeUp>

        {/* ─── 3. DESIGN THINKING PROCESS (5 STAGES) ───────────────────── */}
        <FadeUp y={28}>
          <section className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink">
              Design Thinking Process
            </h2>

            <div className="grid md:grid-cols-3 gap-5">
              {/* Empathize */}
              <div className="p-6 rounded-3xl border border-line bg-surface/50 space-y-3 m3-elevation-1">
                <div className="inline-block px-3 py-1 rounded-full bg-[#07697D]/20 text-[#3C8677] dark:text-[#7fd4c2] text-xs font-bold">
                  1. Empathize
                </div>
                <div className="text-xs space-y-2">
                  <div className="font-semibold text-ink">Observed Pain Points:</div>
                  <ul className="space-y-1 text-mut">
                    <li>• No reliable laundry near hostels/PGs</li>
                    <li>• Inconsistent pricing, delays, and damaged clothes</li>
                    <li>• Offline tracking is a hassle</li>
                  </ul>
                  <div className="font-semibold text-ink pt-1">User Needs (Assumed):</div>
                  <ul className="space-y-1 text-mut">
                    <li>• On-demand scheduling</li>
                    <li>• Transparent pricing &amp; Real-time tracking</li>
                  </ul>
                </div>
              </div>

              {/* Define */}
              <div className="p-6 rounded-3xl border border-line bg-surface/50 space-y-3 m3-elevation-1">
                <div className="inline-block px-3 py-1 rounded-full bg-[#07697D]/20 text-[#3C8677] dark:text-[#7fd4c2] text-xs font-bold">
                  2. Define
                </div>
                <div className="text-xs space-y-2">
                  <div className="font-semibold text-ink">Problem Statement:</div>
                  <p className="text-mut leading-relaxed">
                    Residents in Tier 1 &amp; 2 cities struggle to access trustworthy, affordable, and timely laundry/ironing services due to fragmented providers and lack of digital solutions.
                  </p>
                </div>
              </div>

              {/* Ideate */}
              <div className="p-6 rounded-3xl border border-line bg-surface/50 space-y-3 m3-elevation-1">
                <div className="inline-block px-3 py-1 rounded-full bg-[#07697D]/20 text-[#3C8677] dark:text-[#7fd4c2] text-xs font-bold">
                  3. Ideate
                </div>
                <div className="text-xs space-y-2">
                  <div className="font-semibold text-ink">Solutions Brainstormed:</div>
                  <ul className="space-y-1 text-mut">
                    <li>• App-based booking with time slots</li>
                    <li>• Partner with local vendors for hyperlocal service</li>
                    <li>• Transparent pricing calculator (weight/garment type)</li>
                    <li>• In-app payment &amp; tracking (like food delivery apps)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              {/* Prototype */}
              <div className="p-6 rounded-3xl border border-line bg-surface/50 space-y-3 m3-elevation-1">
                <div className="inline-block px-3 py-1 rounded-full bg-[#07697D]/20 text-[#3C8677] dark:text-[#7fd4c2] text-xs font-bold">
                  4. Prototype
                </div>
                <div className="text-xs space-y-2">
                  <div className="font-semibold text-ink">iOS-Centric Approach:</div>
                  <ul className="space-y-1 text-mut">
                    <li>• Designed for iPhone 16 Pro screen size</li>
                    <li>• Followed Apple’s Human Interface Guidelines (tab bars, SF Pro font)</li>
                    <li>• Prioritized minimalistic approach</li>
                  </ul>
                </div>
              </div>

              {/* Iteration */}
              <div className="p-6 rounded-3xl border border-lime/30 bg-surface/50 space-y-3 m3-elevation-1">
                <div className="inline-block px-3 py-1 rounded-full bg-lime/20 text-accenttext text-xs font-bold">
                  5. Iteration &amp; iOS HIG Compliance
                </div>
                <div className="text-xs space-y-2">
                  <ul className="space-y-1.5 text-mut">
                    <li>• During heuristic review, discovered mid-fi screens were still using Android’s Roboto and inconsistent spacing, breaking iOS Human Interface Guidelines.</li>
                    <li>• Switched all body and headline text to San Francisco &amp; New York and aligned font weights to HIG recommendations.</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </FadeUp>

        {/* ─── 4. TARGET AUDIENCE & USER PERSONAS ──────────────────────── */}
        <FadeUp y={28}>
          <section className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink">
                Target Audience
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl border border-line bg-surface/50 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#D7E9E4] text-[#07697D] flex items-center justify-center font-bold text-lg shrink-0">
                    🎓
                  </div>
                  <div>
                    <div className="font-semibold text-ink text-sm">Students in hostels/PGs</div>
                    <div className="text-xs text-mut">18–24 years</div>
                  </div>
                </div>
                <div className="p-5 rounded-2xl border border-line bg-surface/50 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#D7E9E4] text-[#07697D] flex items-center justify-center font-bold text-lg shrink-0">
                    💼
                  </div>
                  <div>
                    <div className="font-semibold text-ink text-sm">Professionals in flats</div>
                    <div className="text-xs text-mut">25–35 years</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-5">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink">
                User Persona
              </h2>

              <div className="rounded-3xl border border-line bg-white p-4 sm:p-8 overflow-hidden m3-elevation-1">
                <img
                  src="/assets/aistudio/image_f7eb0c37.png"
                  alt="User Persona - Aarav Sharma"
                  className="w-full max-w-3xl mx-auto h-auto object-contain"
                  loading="lazy"
                />
              </div>
            </div>
          </section>
        </FadeUp>

        {/* ─── 5. USERFLOW ─────────────────────────────────────────────── */}
        <FadeUp y={28}>
          <section className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink">
              Userflow
            </h2>
            <div className="rounded-3xl border border-line bg-white p-4 sm:p-6 overflow-hidden m3-elevation-1">
              <img
                src="/assets/aistudio/image_68515588.png"
                alt="Dholo App Userflow Diagram"
                className="w-full h-auto object-contain"
                loading="lazy"
              />
            </div>
          </section>
        </FadeUp>

        {/* ─── 6. HIGH FIDELITY SCREENS ────────────────────────────────── */}
        <FadeUp y={28}>
          <section className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink">
              High Fidelity Screens (iPhone 16 Pro · iOS HIG)
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
              {[
                { label: "1. Login screen", src: "/assets/aistudio/image_a147347a.png" },
                { label: "2. Home screen", src: "/assets/aistudio/image_0947dcae.png" },
                { label: "3. Booking screen", src: "/assets/aistudio/image_2c00fde3.png" },
                { label: "4. Search screen", src: "/assets/aistudio/image_952066b8.png" },
                { label: "5. Adding Cloth screen", src: "/assets/aistudio/image_a29acba6.png" },
                { label: "6. Scheduling screen", src: "/assets/aistudio/image_519946eb.png" },
                { label: "7. History screen", src: "/assets/aistudio/image_2a937700.png" }
              ].map((screen) => (
                <div
                  key={screen.label}
                  className="p-4 rounded-3xl border border-line bg-surface/40 flex flex-col items-center gap-3 m3-elevation-1"
                >
                  <img
                    src={screen.src}
                    alt={screen.label}
                    className="w-full max-w-[210px] h-auto drop-shadow-xl"
                    loading="lazy"
                  />
                  <span className="text-xs font-medium text-ink text-center">
                    {screen.label}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </FadeUp>

        {/* ─── 6. DESIGN SYSTEM (COLOR STYLE, TEXT STYLE, GRID) ────────── */}
        <FadeUp y={28}>
          <section className="space-y-8">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink">
              Design System
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Color Style */}
              <div className="p-6 rounded-3xl border border-line bg-surface/50 space-y-4 m3-elevation-1">
                <h3 className="text-base font-semibold text-ink">Colour Style</h3>
                <div className="grid grid-cols-2 gap-2.5 text-xs">
                  {[
                    { name: "Dark Cyan Blue (Primary)", hex: "#07697D" },
                    { name: "Pale Aqua (Secondary)", hex: "#D7E9E4" },
                    { name: "Muted Teal", hex: "#3C8677" },
                    { name: "Fresh Lime Green", hex: "#ADEF76" },
                    { name: "Warning/Error Red", hex: "#D32F2F" },
                    { name: "Pure Black & White", hex: "#000000" }
                  ].map((c) => (
                    <div key={c.name} className="p-2.5 rounded-xl border border-line bg-bg/40 flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-lg border border-black/15 shrink-0" style={{ backgroundColor: c.hex }} />
                      <div className="min-w-0">
                        <div className="font-medium text-ink truncate text-[11px]">{c.name}</div>
                        <div className="font-mono text-[10px] text-faint">{c.hex}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Typography & Layout Grid */}
              <div className="p-6 rounded-3xl border border-line bg-surface/50 space-y-4 m3-elevation-1">
                <h3 className="text-base font-semibold text-ink">Text Style &amp; Layout Grid</h3>
                <div className="space-y-2 text-xs">
                  <div><strong className="text-ink">Heading:</strong> <span className="text-mut">SF Pro Display Bold · Sans-Serif · 26px–28px</span></div>
                  <div><strong className="text-ink">Title:</strong> <span className="text-mut">SF Pro Text Semibold · Sans-Serif · 18px–20px</span></div>
                  <div><strong className="text-ink">Subheading:</strong> <span className="text-mut">New York Medium · Serif · 16px–18px</span></div>
                  <div><strong className="text-ink">Body:</strong> <span className="text-mut">New York Regular · Serif · 16px</span></div>
                </div>
                <div className="pt-2 border-t border-line/60">
                  <div className="text-[11px] text-faint mb-2">iOS 4-Column Layout Grid Visualization</div>
                  <div className="grid grid-cols-4 gap-2 h-8">
                    <div className="bg-pink-500/20 rounded" />
                    <div className="bg-pink-500/20 rounded" />
                    <div className="bg-pink-500/20 rounded" />
                    <div className="bg-pink-500/20 rounded" />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </FadeUp>

        {/* ─── 7. CONSTRAINTS, RESOURCES, SCOPE & CONCLUSION ─────────────── */}
        <FadeUp y={28}>
          <section className="space-y-6">
            <div className="grid md:grid-cols-3 gap-5 text-xs">
              <div className="p-6 rounded-3xl border border-red-500/25 bg-red-500/[0.03] space-y-2">
                <div className="font-bold text-red-400 text-sm">Constraints</div>
                <ul className="space-y-1 text-mut">
                  <li>• No Android version</li>
                  <li>• No real-time logistics or map tracking yet</li>
                  <li>• No deep UX research conducted</li>
                </ul>
              </div>

              <div className="p-6 rounded-3xl border border-emerald-500/25 bg-emerald-500/[0.03] space-y-2">
                <div className="font-bold text-emerald-400 text-sm">Available Resources</div>
                <ul className="space-y-1 text-mut">
                  <li>• Unsplash</li>
                  <li>• iOS Human Interface Guidelines</li>
                  <li>• Iconify</li>
                </ul>
              </div>

              <div className="p-6 rounded-3xl border border-line bg-surface/50 space-y-2">
                <div className="font-bold text-ink text-sm">Tools &amp; Prototype</div>
                <p className="text-mut">Figma · FigJam</p>
                <div className="pt-1 text-accenttext font-medium">
                  iPhone 16 Pro Interactive UI Flow
                </div>
              </div>
            </div>

            {/* Scope of Improvement */}
            <div className="p-6 sm:p-8 rounded-3xl border border-amber-500/30 bg-amber-500/[0.04] space-y-3 text-xs sm:text-sm">
              <h3 className="text-lg font-bold text-amber-400">Scope of Improvement</h3>
              <p className="text-mut">While the design now follows HIG standards, future iterations could explore:</p>
              <ul className="space-y-1.5 text-ink/90">
                <li>• Enhanced accessibility support (e.g., Dynamic Type, VoiceOver)</li>
                <li>• Dark Mode compatibility</li>
                <li>• Usability testing across more device sizes</li>
              </ul>
            </div>

          </section>
        </FadeUp>

        {/* Next Project Switcher */}
        <FadeUp y={28}>
          <div className="pt-10 border-t border-line space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-wider text-faint">
                Next Case Study
              </span>
              <button
                onClick={onBack}
                className="text-xs font-medium text-accenttext hover:underline cursor-pointer"
              >
                Back to All Projects ↑
              </button>
            </div>

            <div
              onClick={() => onSelectProject(nextProject)}
              className="group rounded-3xl border border-line bg-surface/40 p-6 sm:p-8 hover:bg-surface/80 hover:border-lime/40 transition-all duration-300 cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 m3-elevation-1 hover:m3-elevation-2"
            >
              <div className="space-y-2">
                <span className="text-xs font-medium text-accenttext">
                  {nextProject.category}
                </span>
                <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-ink group-hover:text-accenttext transition-colors">
                  {nextProject.title}
                </h3>
                <p className="text-xs sm:text-sm text-mut max-w-lg line-clamp-1 font-light">
                  {nextProject.summary}
                </p>
              </div>

              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-surface border border-line text-xs font-semibold text-ink group-hover:bg-lime group-hover:text-black group-hover:border-lime transition-all duration-300 shrink-0">
                <span>View Project</span>
                <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </article>
  );
}
