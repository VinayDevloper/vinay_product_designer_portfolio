import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProjectItem, PROJECTS } from '../../data/content';
import { FadeUp } from '../Shared';
import {
  ArrowLeft,
  ArrowUpRight,
  ExternalLink,
  Layers,
  Palette,
  Sparkles,
  Grid,
  Smartphone
} from 'lucide-react';

interface SpotifyCaseStudyProps {
  project: ProjectItem;
  onBack: () => void;
  onSelectProject: (p: ProjectItem) => void;
}

interface ScreenBreakdown {
  id: string;
  step: string;
  title: string;
  tag: string;
  src: string;
  goal: string;
  specs: string[];
  swatches: { hex: string; label: string }[];
  howDesigned: {
    label: string;
    detail: string;
  }[];
}

const SCREEN_BREAKDOWNS: ScreenBreakdown[] = [
  {
    id: 'splash',
    step: '01',
    title: 'Splash & Brand Entry',
    tag: 'Visual Anchor & Safe Areas',
    src: '/assets/aistudio/image_06513ce4.png',
    goal:
      'Practiced optical centering, restrained brand emphasis, and iOS system chrome alignment.',
    specs: ['390×844 iPhone Frame', 'Status Bar Component', 'Optical Centering'],
    swatches: [
      { hex: '#181414', label: 'Matte Base' },
      { hex: '#1ED760', label: 'Spotify Green' }
    ],
    howDesigned: [
      {
        label: 'Surface & Contrast',
        detail:
          'Used deep matte charcoal (#181414) rather than pure #000000 so the #1ED760 mark stands out cleanly without harsh halation.'
      },
      {
        label: 'iOS Chrome Components',
        detail:
          'Locked reusable Status Bar (12:45, signal/battery) and Home Indicator instances onto standard top/bottom safe-area guides.'
      }
    ]
  },
  {
    id: 'home',
    step: '02',
    title: 'Home Discovery Feed',
    tag: 'Auto-Layout & Card Density',
    src: '/assets/aistudio/image_90fd420c.png',
    goal:
      'Organized dense playlist shortcuts, editorial spotlight, docked mini-player, and bottom navigation cleanly.',
    specs: ['8px Gutter Grid', '4px Inner Radius', 'Fixed Bottom Bar'],
    swatches: [
      { hex: '#181414', label: 'Canvas' },
      { hex: '#2A2626', label: 'Tile Fill' },
      { hex: '#1ED760', label: 'Active Pill' }
    ],
    howDesigned: [
      {
        label: '2-Column Quick Grid',
        detail:
          'Built a 2×4 Auto-Layout tile grid (#2A2626 surface, 4px radius) with consistent 8px gutters for rapid thumb scanning.'
      },
      {
        label: 'Layered Navigation Zone',
        detail:
          'Paired top filter pills (All, Music, Podcasts) with a persistent mini-player floating neatly above the blurred bottom tab bar.'
      }
    ]
  },
  {
    id: 'search',
    step: '03',
    title: 'Search & Category Browse',
    tag: 'Color Coding & Artwork Masking',
    src: '/assets/aistudio/image_a6f2baef.png',
    goal:
      'Balanced a high-contrast search input with vibrant category tiles and textured Discover Weekly art.',
    specs: ['High-Contrast Search', '25° Cropped Art', '2-Col Browse'],
    swatches: [
      { hex: '#FFFFFF', label: 'Search Input' },
      { hex: '#EB5640', label: 'Category Tile' },
      { hex: '#649AED', label: 'Accent Blue' }
    ],
    howDesigned: [
      {
        label: 'Primary Search Affordance',
        detail:
          'Anchored a solid white search pill (#FFFFFF) at the top of the dark surface so the core action draws immediate focus.'
      },
      {
        label: 'Angled Artwork Clipping',
        detail:
          'Practiced frame clipping and 25° tilted album cover placement inside saturated genre cards (Music, Podcast, Live Events, I-Pop).'
      }
    ]
  },
  {
    id: 'track',
    step: '04',
    title: 'Single & Artist Playback View',
    tag: 'Typography Hierarchy & Actions',
    src: '/assets/aistudio/image_b3290d0d.png',
    goal:
      'Directed visual flow from album artwork to track title, primary green Play trigger, and artist credits.',
    specs: ['44px Touch Targets', 'Circular Avatars', 'Scroll Fade'],
    swatches: [
      { hex: '#181414', label: 'Background' },
      { hex: '#FFFFFF', label: 'Primary Title' },
      { hex: '#B3B3B3', label: 'Metadata' },
      { hex: '#1ED760', label: 'Play CTA' }
    ],
    howDesigned: [
      {
        label: 'Primary Action Separation',
        detail:
          'Placed the circular #1ED760 Play CTA on the right thumb arc beside Shuffle, separating it from secondary Save and Download icons.'
      },
      {
        label: 'Readable Credit Hierarchy',
        detail:
          'Combined overlapping circular artist avatars, muted secondary labels (#B3B3B3), and a subtle bottom fade to cue vertical scroll.'
      }
    ]
  }
];

const FIGMA_SHEETS = [
  {
    id: 'components',
    tab: '01 · Components & Icon Grid',
    title: 'Reusable Components, Status Bars & Icon Scale',
    note: 'Standardized 64px and 44px icon frames alongside reusable pill button states, circular play button, iOS status bars, and bottom tab bar variants.',
    src: '/assets/aistudio/image_3afba632.png'
  },
  {
    id: 'palette',
    tab: '02 · Color Palette Swatches',
    title: 'Dark-Mode Surface Ramp & Genre Accents',
    note: 'Organized core dark-surface steps (#181414 to #8C8A8A), signature Spotify green (#1ED760), and secondary category colors (#649AED, #EB5640, #F6C874, #A7C2D1, #D5F479, #E57BA1).',
    src: '/assets/aistudio/image_4438ed43.png'
  },
  {
    id: 'assets',
    tab: '03 · Album Art & Gradients',
    title: 'Curated Cover Art Grid & Grainy Gradient Backdrops',
    note: 'Prepared uniform square album cover crops and custom grainy textured Discover Weekly gradient backdrops inside structured Figma asset frames.',
    src: '/assets/aistudio/image_fde657a4.png'
  }
];

export default function SpotifyCaseStudy({
  project,
  onBack,
  onSelectProject
}: SpotifyCaseStudyProps): React.JSX.Element {
  const [activeSheetId, setActiveSheetId] = useState<string>(FIGMA_SHEETS[0].id);

  const activeSheet =
    FIGMA_SHEETS.find((s) => s.id === activeSheetId) || FIGMA_SHEETS[0];

  const currentIndex = PROJECTS.findIndex((p) => p.id === project.id);
  const nextProject = PROJECTS[(currentIndex + 1) % PROJECTS.length];

  return (
    <article className="min-h-screen bg-bg text-ink pb-24 pt-20 sm:pt-24 selection:bg-lime selection:text-black">
      {/* Top Floating M3 Glass Bar */}
      <div className="sticky top-4 z-40 px-4 sm:px-8 max-w-5xl mx-auto">
        <div className="flex items-center justify-between gap-4 px-4 py-2 rounded-full border border-line bg-surface/85 backdrop-blur-xl m3-elevation-2">
          <button
            onClick={onBack}
            data-testid="casestudy-back-btn"
            className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium text-mut hover:text-ink hover:bg-white/5 transition-all duration-200 cursor-pointer"
          >
            <ArrowLeft size={13} className="transition-transform group-hover:-translate-x-1" />
            <span>All Projects</span>
          </button>

          <span className="text-xs font-medium text-faint hidden md:inline-block">
            Spotify Mobile App · UI Replication Practice
          </span>

          {project.figma ? (
            <a
              href={project.figma}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#1ED760] text-black text-xs font-semibold hover:brightness-110 active:scale-95 transition-all shadow-xs"
            >
              <span>Open in Figma</span>
              <ExternalLink size={12} />
            </a>
          ) : (
            <button
              onClick={onBack}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-line text-xs font-medium text-mut hover:text-ink transition-colors cursor-pointer"
            >
              <span>Back</span>
            </button>
          )}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-5 sm:px-8 pt-6 space-y-12 sm:space-y-16">
        {/* ─── 1. COMPACT UI REPLICATION HERO ───────────────────────────── */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl overflow-hidden bg-gradient-to-br from-[#131614] via-[#122117] to-[#0c301b] text-white p-6 sm:p-9 border border-[#1ED760]/25 shadow-xl"
        >
          <div className="grid lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7 space-y-3.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1ED760]/15 border border-[#1ED760]/30 text-[#1ED760] text-[11px] font-medium">
                <span>Figma UI Replication · Guided by Saurabh Saini</span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-bold tracking-tight leading-[1.15] text-white">
                Spotify Mobile App — UI Replication, Components &amp; Layout Craft
              </h1>

              <p className="text-xs sm:text-sm text-slate-200/90 leading-relaxed font-light max-w-xl">
                A dedicated Figma practice study recreating 4 core Spotify iOS screens from scratch—focused on Auto-Layout spacing, 64px / 44px icon scales, reusable components, and dark-mode contrast under mentor <strong className="text-white font-medium">Saurabh Saini</strong>.
              </p>

              <div className="flex flex-wrap gap-2 pt-1 text-[11px]">
                <span className="px-3 py-1 rounded-full bg-white/10 text-white/90">
                  4 Replicated iOS Screens
                </span>
                <span className="px-3 py-1 rounded-full bg-white/10 text-white/90">
                  Auto-Layout &amp; 8px Grid
                </span>
                <span className="px-3 py-1 rounded-full bg-white/10 text-white/90">
                  Reusable Nav &amp; Pill Variants
                </span>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden border border-white/15 shadow-lg bg-[#080a09]">
                <img
                  src="/assets/aistudio/image_20cc059c.png"
                  alt="Spotify Mobile App UI Replication Showcase"
                  className="w-full h-auto block"
                />
              </div>
            </div>
          </div>
        </motion.section>

        {/* ─── 2. HIGH-CONTRAST SCREEN-BY-SCREEN BREAKDOWN ──────────────── */}
        <section className="space-y-6">
          <FadeUp y={20}>
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-accenttext font-semibold">
                <Smartphone size={13} />
                <span>Screen-by-Screen Study</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink">
                How Each Screen Was Structured in Figma
              </h2>
              <p className="text-xs sm:text-sm text-mut font-light">
                Presented on a bright tonal studio surface so every dark-mode edge, spacing detail, and typography layer stays crisp and clear in one view.
              </p>
            </div>
          </FadeUp>

          <div className="space-y-6">
            {SCREEN_BREAKDOWNS.map((screen) => (
              <motion.div
                key={screen.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.18 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="grid md:grid-cols-12 gap-0 overflow-hidden rounded-3xl border border-line bg-surface/45 m3-elevation-1"
              >
                {/* Bright Soft-Sage Studio Stage for Crisp Dark-UI Separation */}
                <div className="md:col-span-5 bg-gradient-to-br from-[#eef3ef] via-[#e2ebe5] to-[#d3e0d7] p-6 sm:p-7 flex items-center justify-center border-b md:border-b-0 md:border-r border-black/10">
                  <div className="rounded-[28px] p-[6px] bg-[#141615] ring-1 ring-black/25 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.45)]">
                    <img
                      src={screen.src}
                      alt={screen.title}
                      className="h-[380px] sm:h-[420px] w-auto object-contain rounded-[22px] block"
                    />
                  </div>
                </div>

                {/* Product-Designer Breakdown & Color/Grid Specs */}
                <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between gap-5">
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider">
                        <span className="text-[#1ED760] font-bold">Screen {screen.step}</span>
                        <span className="text-faint">·</span>
                        <span className="text-mut">{screen.tag}</span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-ink">
                        {screen.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-mut font-light leading-relaxed">
                        {screen.goal}
                      </p>
                    </div>

                    {/* Spec Badges */}
                    <div className="flex flex-wrap gap-1.5">
                      {screen.specs.map((spec) => (
                        <span
                          key={spec}
                          className="px-2.5 py-1 rounded-lg border border-line bg-bg/60 text-[11px] font-mono text-ink/85"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>

                    {/* 2 Structured Figma Decisions */}
                    <div className="grid sm:grid-cols-2 gap-3.5 pt-2 border-t border-line/60">
                      {screen.howDesigned.map((item) => (
                        <div
                          key={item.label}
                          className="p-4 rounded-2xl border border-line/80 bg-bg/50 space-y-1.5"
                        >
                          <div className="text-xs font-semibold text-ink">
                            {item.label}
                          </div>
                          <p className="text-xs text-mut font-light leading-relaxed">
                            {item.detail}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Color Swatch Reference Strip */}
                  <div className="pt-3 border-t border-line/60 flex flex-wrap items-center gap-3">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-faint">
                      Palette Used:
                    </span>
                    {screen.swatches.map((sw) => (
                      <div
                        key={sw.label}
                        className="inline-flex items-center gap-1.5 text-[11px] text-mut"
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-white/25 shrink-0"
                          style={{ backgroundColor: sw.hex }}
                        />
                        <span className="font-mono text-ink/90">{sw.hex}</span>
                        <span className="text-faint hidden sm:inline">({sw.label})</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ─── 3. FULL-CLARITY FIGMA FILE ARCHITECTURE (NO ZOOM NEEDED) ───── */}
        <FadeUp y={20}>
          <section className="space-y-5">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-accenttext font-semibold">
                <Layers size={13} />
                <span>Inside the Figma Workspace</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink">
                Components, Color Palette &amp; Visual Assets
              </h2>
              <p className="text-xs sm:text-sm text-mut font-light">
                Switch sheets below to inspect the full-resolution component system, swatch ramp, and album artwork assets directly on a high-contrast stage.
              </p>
            </div>

            {/* Interactive Sheet Tabs */}
            <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl border border-line bg-surface/60 w-fit max-w-full">
              {FIGMA_SHEETS.map((sheet) => {
                const isActive = sheet.id === activeSheet.id;
                return (
                  <button
                    key={sheet.id}
                    type="button"
                    onClick={() => setActiveSheetId(sheet.id)}
                    className={`relative px-4 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                      isActive ? 'text-black font-semibold' : 'text-mut hover:text-ink'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="spotifySheetTab"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                        className="absolute inset-0 rounded-xl bg-[#1ED760] shadow-xs"
                      />
                    )}
                    <span className="relative z-10 whitespace-nowrap">{sheet.tab}</span>
                  </button>
                );
              })}
            </div>

            {/* Large Crisp Studio Frame for Active Sheet */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSheet.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22 }}
                className="rounded-3xl border border-line bg-surface/45 overflow-hidden m3-elevation-1"
              >
                <div className="bg-gradient-to-br from-[#eef3ef] via-[#e2ebe5] to-[#d3e0d7] p-4 sm:p-7 flex items-center justify-center border-b border-black/10">
                  <div className="rounded-2xl overflow-hidden shadow-[0_20px_44px_-12px_rgba(0,0,0,0.4)] ring-1 ring-black/20 bg-[#181414] max-w-4xl w-full">
                    <img
                      src={activeSheet.src}
                      alt={activeSheet.title}
                      className="w-full max-h-[460px] object-contain block mx-auto"
                    />
                  </div>
                </div>

                <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <h3 className="text-base sm:text-lg font-bold text-ink">
                      {activeSheet.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-mut font-light leading-relaxed max-w-3xl">
                      {activeSheet.note}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </section>
        </FadeUp>

        {/* ─── 4. KEY TAKEAWAYS & MENTORSHIP CREDIT ────────────────────── */}
        <FadeUp y={20}>
          <section className="rounded-3xl border border-[#1ED760]/25 bg-gradient-to-br from-surface/80 via-surface/50 to-[#1ED760]/[0.05] p-6 sm:p-8 space-y-5 m3-elevation-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#1ED760] font-semibold">
                  <Sparkles size={13} />
                  <span>Key Practice Takeaways</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-ink">
                  Skills Sharpened in This Study
                </h2>
              </div>
              <span className="text-xs text-mut font-light">
                Guided by <strong className="text-ink font-medium">Saurabh Saini</strong>
              </span>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl border border-line bg-bg/50 space-y-1">
                <div className="text-sm font-semibold text-ink flex items-center gap-1.5">
                  <Grid size={14} className="text-[#1ED760]" />
                  <span>Auto-Layout &amp; Grids</span>
                </div>
                <p className="text-xs text-mut font-light leading-relaxed">
                  Learned consistent 8px vertical rhythm, nested frame constraints, and responsive padding across dense feeds.
                </p>
              </div>

              <div className="p-4 rounded-2xl border border-line bg-bg/50 space-y-1">
                <div className="text-sm font-semibold text-ink flex items-center gap-1.5">
                  <Layers size={14} className="text-[#1ED760]" />
                  <span>Component Variants</span>
                </div>
                <p className="text-xs text-mut font-light leading-relaxed">
                  Built reusable 64px / 44px icon sets, pill buttons, status bars, and bottom navigation bars cleanly.
                </p>
              </div>

              <div className="p-4 rounded-2xl border border-line bg-bg/50 space-y-1">
                <div className="text-sm font-semibold text-ink flex items-center gap-1.5">
                  <Palette size={14} className="text-[#1ED760]" />
                  <span>Dark-Mode Contrast</span>
                </div>
                <p className="text-xs text-mut font-light leading-relaxed">
                  Practiced pairing matte surfaces (#181414, #2A2626) with readable typography and high-clarity green CTAs.
                </p>
              </div>
            </div>
          </section>
        </FadeUp>

        {/* ─── NEXT CASE STUDY SWITCHER ─────────────────────────────────── */}
        <FadeUp y={20}>
          <div className="pt-8 border-t border-line space-y-5">
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
              className="group rounded-3xl border border-line bg-surface/40 p-6 sm:p-7 hover:bg-surface/80 hover:border-lime/40 transition-all duration-300 cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 m3-elevation-1 hover:m3-elevation-2"
            >
              <div className="space-y-1.5">
                <span className="text-xs font-medium text-accenttext">
                  {nextProject.category}
                </span>
                <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-ink group-hover:text-accenttext transition-colors">
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
