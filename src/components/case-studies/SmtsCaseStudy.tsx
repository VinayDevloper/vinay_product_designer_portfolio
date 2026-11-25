import React, { useState, useEffect, useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  AnimatePresence
} from 'framer-motion';
import { ProjectItem, PROJECTS } from '../../data/content';
import { FadeUp } from '../Shared';
import {
  ArrowLeft,
  ArrowUpRight,
  ArrowRight,
  ExternalLink,
  ShieldAlert,
  Sparkles,
  Layers,
  Compass,
  Monitor,
  CheckCircle2,
  GitBranch,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Play,
  Type
} from 'lucide-react';

interface SmtsCaseStudyProps {
  project: ProjectItem;
  onBack: () => void;
  onSelectProject: (p: ProjectItem) => void;
}

const DEFAULT_PROTOTYPE_URL =
  'https://ai.studio/apps/958a6fa2-a01d-4c8a-aca8-4d5b8bb2fafd?fullscreenApplet=true';

const FRICTION_TO_FIX = [
  {
    area: 'Navigation & Onboarding',
    before: 'Fishbowl Classic buried daily tasks across 7 nested module groups and dense tables.',
    after: 'Separated daily floor ops (Logistics, Purchase, MES) from Admin inside a clean fixed sidebar.'
  },
  {
    area: 'Floor Putaway & Speed',
    before: 'Modal dropdowns clipped mid-scroll and plugin updates required full server restarts.',
    after: 'Downward portal bin pickers, 1-click open rack pills, and fixed top-right primary CTAs.'
  },
  {
    area: 'Traceability & Quality',
    before: 'Lot history lived in disconnected reports with no visual farm-to-retail genealogy.',
    after: 'Embedded bidirectional lot trace linking green bean POs, QA holds, and retail bags.'
  },
  {
    area: 'Pricing & Audit Integrity',
    before: 'Sales views exposed internal margins, and cycle counts revealed expected quantities.',
    after: 'Customer-safe invoice breakdowns, List ≥ Floor validation, and blind cycle counting.'
  }
];

const COMPETITIVE_INSIGHTS = [
  {
    name: 'Fishbowl Classic',
    tag: 'Client Baseline',
    gap: 'Deep QuickBooks & stock engine, but steep onboarding and dated grids.',
    takeaway: 'Keep backend rigor while organizing screens around floor tasks.'
  },
  {
    name: 'Katana & MRPeasy',
    tag: 'Visual MRP',
    gap: 'Clean shop-floor UI, yet traceability sits behind pricey add-on tiers.',
    takeaway: 'Bake lot tracking and expiry visibility into core screens by default.'
  },
  {
    name: 'Odoo & NetSuite',
    tag: 'Enterprise ERP',
    gap: 'Strong QA rules, but heavy 6–8 week setup slows mid-size teams.',
    takeaway: 'Use progressive disclosure: 1-step daily actions with optional depth.'
  },
  {
    name: 'FoodLogiQ & Batch',
    tag: 'Recall Tools',
    gap: 'Strong recall chains, but disconnected from daily ERP stock moves.',
    takeaway: 'Tie lot genealogy directly to Receiving, Roasting & Dispatch scans.'
  }
];

const WORKFLOW_PIPELINE = [
  { step: '01', title: 'Receiving & QA', detail: 'PO scan → Lab check → Lot & SSCC-18' },
  { step: '02', title: 'Putaway & Bins', detail: 'Portal bin picker & rack allocation' },
  { step: '03', title: 'Roasting (MES)', detail: 'Consume raw lots → Output batch lot' },
  { step: '04', title: 'Packaging & FG', detail: 'Case creation → Finished pallet lot' },
  { step: '05', title: 'Dispatch & Trace', detail: 'Verify load → Bidirectional trace' }
];

const IA_GROUPS = [
  {
    group: 'Daily Floor Execution',
    modules: ['Dashboard Overview', 'Logistics & Bins', 'Roasting (MES)', 'Quality Holds'],
    rationale: 'Top-pinned for warehouse staff, roasters, and Q-graders performing time-sensitive scans.'
  },
  {
    group: 'Supply, Audit & Governance',
    modules: ['Purchase & POs', 'Sales & Pricing', 'Universal Trace', 'Master Data & Admin'],
    rationale: 'Structured for buyers, ops leads, and auditors without crowding floor operators.'
  }
];

interface ModuleScreen {
  id: string;
  step: string;
  shortLabel: string;
  title: string;
  src: string;
  summary: string;
  problemSolved: string;
  uxDecision: string;
}

const MODULE_SCREENS: ModuleScreen[] = [
  {
    id: 'dashboard',
    step: '01',
    shortLabel: 'Dashboard',
    title: 'Operational Command Dashboard',
    src: '/assets/aistudio/image_38e2b8ea.png',
    summary:
      'Gives shift leads an instant 3-second overview of raw stock, active roast jobs, QA holds, and priority floor actions.',
    problemSolved:
      'Replaced scattered morning checks across 4 separate reports with a single shift command view and global ⌘K / Alt+S scan shortcuts.',
    uxDecision:
      'Placed Low Stock and amber Quality Hold alerts directly below the 4 key KPIs so quarantined green coffee lots never slip into production.'
  },
  {
    id: 'logistics',
    step: '02',
    shortLabel: 'Logistics',
    title: 'Logistics & Serialized Lot Browser',
    src: '/assets/aistudio/image_f9dd2c04.png',
    summary:
      'Unifies stock lookup, dock receiving, pallet putaway, transfers, shipping, and blind cycle counting in one tabbed workspace.',
    problemSolved:
      'Fixed clipped bin dropdowns and multi-window switching by consolidating 6 warehouse queues with clear FEFO Next and Quarantine states.',
    uxDecision:
      'Paired monospace bin coordinates (WH1-ZA-A01-R01-B01) and SSCC-18 pallet IDs with a dedicated Floor Scan Mode button at the top right.'
  },
  {
    id: 'master-data',
    step: '03',
    shortLabel: 'Master Data',
    title: 'Unified Master Data Architecture',
    src: '/assets/aistudio/image_9c61b8d5.png',
    summary:
      'Standardizes parts, SKUs, storage bins, suppliers, customers, carriers, and UOM conversions under one predictable table layout.',
    problemSolved:
      'Eliminated inconsistent legacy setup dialogs and hidden unit conversions (lb ↔ bag-60kg) that caused receiving quantity errors.',
    uxDecision:
      'Exposed UOM conversions, default bin assignments, tabular unit costs, and Mandatory QA badges inline with consistent view/edit/delete actions.'
  },
  {
    id: 'purchasing',
    step: '04',
    shortLabel: 'Purchasing',
    title: 'Purchasing & Approval Controls',
    src: '/assets/aistudio/image_26eae8fe.png',
    summary:
      'Connects committed spend visibility with fast purchase order tracking and threshold-based approval controls.',
    problemSolved:
      'Removed multi-step approval detours by surfacing >$5,000 Pending Authorization orders right above the PO ledger with a 1-click Approve CTA.',
    uxDecision:
      'Highlighted high-value approval gates in amber and grouped quick status filters (Active, Needs Approval, In Transit, Received) above the table.'
  },
  {
    id: 'traceability',
    step: '05',
    shortLabel: 'Traceability',
    title: 'Universal Lot Trace & Recall Explorer',
    src: '/assets/aistudio/image_5e15c4bd.png',
    summary:
      'Delivers instant bidirectional farm-to-retail lot genealogy, mock recall rehearsals, and FSMA 204 compliance dossiers.',
    problemSolved:
      'Replaced manual spreadsheet cross-referencing during mock recalls with a single lookup across Lot#, PO#, Work Order, Case ID, and Sales Order.',
    uxDecision:
      'Structured the trace into 4 stage summary cards followed by a chronological custody chain showing verified supplier COAs and remaining stock.'
  }
];

interface ModuleScreenShowcaseProps {
  screen: ModuleScreen;
  index: number;
  reduceMotion: boolean;
  onInspect: (index: number) => void;
  registerRef: (id: string, el: HTMLDivElement | null) => void;
}

const ModuleScreenShowcase: React.FC<ModuleScreenShowcaseProps> = ({
  screen,
  index,
  reduceMotion,
  onInspect,
  registerRef
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'center center']
  });

  const frameScale = useTransform(scrollYProgress, [0, 1], [0.97, 1]);
  const frameY = useTransform(scrollYProgress, [0, 1], [24, 0]);
  const frameOpacity = useTransform(scrollYProgress, [0, 0.35, 1], [0.75, 0.95, 1]);

  return (
    <div
      id={`module-${screen.id}`}
      ref={(el) => {
        cardRef.current = el;
        registerRef(screen.id, el);
      }}
      className="scroll-mt-28 rounded-3xl border border-line bg-surface/40 overflow-hidden m3-elevation-1"
    >
      {/* Large Full-Width Desktop Screen Frame */}
      <div className="bg-gradient-to-br from-[#09101d] via-[#0f1d34] to-[#162d4e] p-3 sm:p-6 lg:p-8 border-b border-line/60">
        <motion.button
          type="button"
          onClick={() => onInspect(index)}
          style={
            reduceMotion
              ? undefined
              : {
                  scale: frameScale,
                  y: frameY,
                  opacity: frameOpacity
                }
          }
          aria-label={`Inspect ${screen.title} fullscreen`}
          className="group relative w-full rounded-xl sm:rounded-2xl overflow-hidden shadow-[0_24px_60px_-12px_rgba(0,0,0,0.7)] ring-1 ring-white/20 bg-white block text-left cursor-zoom-in focus-visible:outline-2 focus-visible:outline-lime"
        >
          <img
            src={screen.src}
            alt={screen.title}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="w-full h-auto block transition-transform duration-500 ease-out group-hover:scale-[1.01]"
          />
          <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0B1324]/85 backdrop-blur-md border border-white/20 text-xs font-medium text-white opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-200">
            <Maximize2 size={12} />
            <span>View Fullscreen</span>
          </span>
        </motion.button>
      </div>

      {/* Clean, Simple, Reader-Friendly Explanation */}
      <div className="p-6 sm:p-8 lg:px-10 space-y-5">
        <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2">
          <div className="space-y-1">
            <div className="text-xs font-mono text-accenttext font-semibold">
              {screen.step} · {screen.shortLabel}
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-ink tracking-tight">
              {screen.title}
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-mut font-light max-w-xl leading-relaxed">
            {screen.summary}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 pt-4 border-t border-line/60">
          <div className="space-y-1">
            <div className="text-xs font-semibold text-ink">Problem Solved</div>
            <p className="text-xs sm:text-sm text-mut font-light leading-relaxed">
              {screen.problemSolved}
            </p>
          </div>
          <div className="space-y-1">
            <div className="text-xs font-semibold text-ink">Key UX Decision</div>
            <p className="text-xs sm:text-sm text-mut font-light leading-relaxed">
              {screen.uxDecision}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function SmtsCaseStudy({
  project,
  onBack,
  onSelectProject
}: SmtsCaseStudyProps): React.JSX.Element {
  const currentIndex = PROJECTS.findIndex((p) => p.id === project.id);
  const nextProject = PROJECTS[(currentIndex + 1) % PROJECTS.length];
  const prototypeUrl = project.prototypeUrl || DEFAULT_PROTOTYPE_URL;

  const reduceMotion = Boolean(useReducedMotion());
  const moduleRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const [activeModuleId, setActiveModuleId] = useState<string>('dashboard');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Track which module is currently in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          setActiveModuleId(visible[0].target.id.replace('module-', ''));
        }
      },
      {
        rootMargin: '-25% 0px -45% 0px',
        threshold: [0.15, 0.4, 0.7]
      }
    );

    MODULE_SCREENS.forEach((m) => {
      const el = moduleRefs.current[m.id];
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Lightbox keyboard navigation
  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev === null ? null : (prev + 1) % MODULE_SCREENS.length));
      }
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) =>
          prev === null ? null : (prev - 1 + MODULE_SCREENS.length) % MODULE_SCREENS.length
        );
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [lightboxIndex]);

  const activeModule = MODULE_SCREENS.find((m) => m.id === activeModuleId) || MODULE_SCREENS[0];

  const scrollToModule = (id: string) => {
    const el = document.getElementById(`module-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    }
  };

  return (
    <article className="min-h-screen bg-bg text-ink pb-24 pt-20 sm:pt-24 selection:bg-lime selection:text-black">
      {/* Clean Top Floating M3 Glass Bar (No Cluttered Progress Line) */}
      <div className="sticky top-4 z-40 px-4 sm:px-8 max-w-6xl mx-auto">
        <div className="flex items-center justify-between gap-4 px-4 py-2 rounded-full border border-line bg-surface/85 backdrop-blur-xl m3-elevation-2">
          <button
            onClick={onBack}
            data-testid="casestudy-back-btn"
            className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium text-mut hover:text-ink hover:bg-white/5 transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0"
          >
            <ArrowLeft size={13} className="transition-transform group-hover:-translate-x-1" />
            <span>All Projects</span>
          </button>

          <span className="text-xs font-medium text-faint hidden md:inline-block truncate">
            SMTS Warehouse · <span className="text-ink/85">{activeModule.step} {activeModule.shortLabel}</span>
          </span>

          <a
            href={prototypeUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="smts-top-prototype-btn"
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-lime text-black text-xs font-semibold hover:brightness-110 active:scale-95 transition-all shadow-xs whitespace-nowrap shrink-0"
          >
            <span>Interactive Prototype</span>
            <ExternalLink size={12} />
          </a>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-6 space-y-12 sm:space-y-16">
        {/* ─── 1. ENTERPRISE UX HERO ─────────────────────────────────────── */}
        <motion.section
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl overflow-hidden bg-gradient-to-br from-[#0B1324] via-[#0c2544] to-[#005082] text-white p-6 sm:p-10 border border-white/15 shadow-xl"
        >
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <div className="text-xs font-mono uppercase tracking-wider text-[#bae6fd]/90">
                Enterprise WMS &amp; MES · UX Architecture Case Study
              </div>

              <h1 className="text-2xl sm:text-4xl font-bold tracking-tight leading-[1.15] text-white">
                SMTS Warehouse — Turning Complex Floor Logistics into a Traceable Workspace
              </h1>

              <p className="text-xs sm:text-sm text-slate-200/90 leading-relaxed font-light max-w-xl">
                A desktop-first product redesign uniting dock receiving, coffee roasting operations, QA quarantine holds, and FSMA 204 lot traceability across 9 operational modules.
              </p>

              {/* Quick Project Context Strip */}
              <div className="grid grid-cols-3 gap-2.5 pt-1 text-[11px] border-t border-white/15">
                <div className="pt-2">
                  <div className="text-slate-300/70 font-mono text-[10px] uppercase">Role</div>
                  <div className="font-medium text-white">Product Designer</div>
                </div>
                <div className="pt-2">
                  <div className="text-slate-300/70 font-mono text-[10px] uppercase">Users</div>
                  <div className="font-medium text-white">Floor Staff, QA &amp; Ops</div>
                </div>
                <div className="pt-2">
                  <div className="text-slate-300/70 font-mono text-[10px] uppercase">Scope</div>
                  <div className="font-medium text-white">9 WMS/MES Modules</div>
                </div>
              </div>

              {/* Interactive Prototype Primary Action + Quick Screen Jump */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href={prototypeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="smts-hero-prototype-btn"
                  className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-lime text-black text-xs sm:text-sm font-semibold hover:brightness-105 active:scale-95 transition-all shadow-md whitespace-nowrap"
                >
                  <Play size={13} className="fill-current" />
                  <span>Open Interactive Prototype</span>
                  <ArrowUpRight
                    size={14}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>

                <button
                  type="button"
                  onClick={() => scrollToModule('dashboard')}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-white/25 bg-white/10 hover:bg-white/15 text-xs font-medium text-white transition-colors cursor-pointer whitespace-nowrap"
                >
                  <span>Explore 5 Core Screens</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <button
                type="button"
                onClick={() => setLightboxIndex(0)}
                aria-label="Inspect SMTS Operational Command Dashboard fullscreen"
                className="group relative w-full rounded-2xl overflow-hidden border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.45)] bg-[#0f172a] block cursor-zoom-in text-left"
              >
                <div className="flex items-center gap-1.5 px-3 py-2 bg-[#0b1220] border-b border-white/10">
                  <span className="w-2 h-2 rounded-full bg-white/25" />
                  <span className="w-2 h-2 rounded-full bg-white/25" />
                  <span className="w-2 h-2 rounded-full bg-white/25" />
                  <span className="ml-2 text-[10px] font-mono text-slate-300/75 truncate">
                    SMTS Warehouse · Operational Command Dashboard
                  </span>
                </div>
                <img
                  src="/assets/aistudio/image_38e2b8ea.png"
                  alt="SMTS Warehouse Operational Command Dashboard"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto block transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </button>
            </div>
          </div>
        </motion.section>

        {/* ─── 2. BASELINE FRICTION → UX DECISIONS ──────────────────────── */}
        <FadeUp y={20}>
          <section className="space-y-4">
            <div className="space-y-1">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink">
                From Legacy Fishbowl Friction to Focused Workflows
              </h2>
              <p className="text-xs sm:text-sm text-mut font-light max-w-3xl">
                The client previously relied on <strong className="text-ink font-medium">Fishbowl Classic</strong>—powerful under the hood, yet slow on the floor. Every UX decision targeted a concrete operational bottleneck.
              </p>
            </div>

            <div className="rounded-3xl border border-line bg-surface/40 overflow-hidden m3-elevation-1 divide-y divide-line/60">
              <div className="hidden md:grid grid-cols-12 gap-5 px-5 py-3 bg-surface/80 text-[10px] font-mono uppercase tracking-wider text-faint">
                <div className="col-span-3">Workflow Area</div>
                <div className="col-span-4">Legacy Pain Point</div>
                <div className="col-span-5 text-accenttext">SMTS UX Decision</div>
              </div>

              {FRICTION_TO_FIX.map((row) => (
                <div
                  key={row.area}
                  className="grid md:grid-cols-12 gap-2.5 md:gap-5 px-5 py-3.5 items-start hover:bg-surface/60 transition-colors"
                >
                  <div className="md:col-span-3 text-xs sm:text-sm font-semibold text-ink">
                    {row.area}
                  </div>
                  <div className="md:col-span-4 text-xs text-mut font-light leading-relaxed">
                    <span className="md:hidden font-mono text-[10px] uppercase text-faint block mb-0.5">
                      Legacy Friction:
                    </span>
                    {row.before}
                  </div>
                  <div className="md:col-span-5 text-xs text-ink/90 font-light leading-relaxed flex items-start gap-2">
                    <CheckCircle2 size={13} className="text-emerald-400 shrink-0 mt-0.5 hidden md:block" />
                    <div>
                      <span className="md:hidden font-mono text-[10px] uppercase text-accenttext block mb-0.5">
                        UX Decision:
                      </span>
                      {row.after}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </FadeUp>

        {/* ─── 3. COMPETITIVE BENCHMARKING + IA + PIPELINE ──────────────── */}
        <FadeUp y={20}>
          <section className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink">
                Research Insights, IA &amp; Floor Pipeline
              </h2>
              <p className="text-xs sm:text-sm text-mut font-light">
                Benchmarked leading WMS, MRP, and recall tools to organize 9 modules cleanly around daily floor muscle memory.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              {COMPETITIVE_INSIGHTS.map((item) => (
                <div
                  key={item.name}
                  className="p-4 rounded-2xl border border-line bg-surface/40 space-y-2 m3-elevation-1"
                >
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-accenttext">
                      {item.tag}
                    </div>
                    <div className="text-sm font-bold text-ink">{item.name}</div>
                  </div>
                  <p className="text-xs text-mut leading-relaxed font-light">
                    <strong className="text-ink/80 font-medium">Gap: </strong>
                    {item.gap}
                  </p>
                  <p className="text-xs text-ink/90 leading-relaxed font-light pt-2 border-t border-line/50">
                    <strong className="text-accenttext font-medium">Takeaway: </strong>
                    {item.takeaway}
                  </p>
                </div>
              ))}
            </div>

            {/* Two-Tier Information Architecture Card */}
            <div className="grid md:grid-cols-2 gap-4">
              {IA_GROUPS.map((g) => (
                <div
                  key={g.group}
                  className="p-4 sm:p-5 rounded-2xl border border-line bg-surface/50 space-y-2.5"
                >
                  <div className="flex items-center gap-2 text-xs font-semibold text-ink">
                    <GitBranch size={13} className="text-accenttext" />
                    <span>{g.group}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {g.modules.map((m) => (
                      <span
                        key={m}
                        className="px-2.5 py-0.5 rounded-lg border border-line bg-bg/60 text-[11px] text-ink/90"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-mut font-light leading-relaxed">
                    {g.rationale}
                  </p>
                </div>
              ))}
            </div>

            {/* 5-Stage Connected Traceability Pipeline */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
              {WORKFLOW_PIPELINE.map((w, idx) => (
                <div
                  key={w.step}
                  className="p-3.5 rounded-2xl border border-line bg-surface/50 space-y-1 hover:border-lime/40 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold text-accenttext tabular-nums">{w.step}</span>
                    {idx < WORKFLOW_PIPELINE.length - 1 && (
                      <ArrowRight size={12} className="text-faint hidden sm:block" />
                    )}
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-ink">{w.title}</div>
                  <p className="text-[11px] text-mut font-light leading-snug">{w.detail}</p>
                </div>
              ))}
            </div>
          </section>
        </FadeUp>

        {/* ─── 4. FULL-WIDTH DESKTOP SCREEN WALKTHROUGH ─────────────────── */}
        <section className="space-y-6">
          <FadeUp y={20}>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-accenttext font-semibold">
                  <Monitor size={13} />
                  <span>Screen-by-Screen UX Walkthrough</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink">
                  Core Screens &amp; Design Decisions
                </h2>
                <p className="text-xs sm:text-sm text-mut font-light max-w-2xl">
                  Full-width desktop screens so every table, alert, and traceability flow stays clear and legible.
                </p>
              </div>

              {/* Interactive Module Quick-Jump Bar */}
              <nav
                aria-label="Jump to module screen"
                className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl border border-line bg-surface/60 shrink-0"
              >
                {MODULE_SCREENS.map((m) => {
                  const isActive = activeModuleId === m.id;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => scrollToModule(m.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                        isActive
                          ? 'bg-lime text-black font-semibold shadow-xs'
                          : 'text-mut hover:text-ink hover:bg-white/5'
                      }`}
                    >
                      {m.step} {m.shortLabel}
                    </button>
                  );
                })}
              </nav>
            </div>
          </FadeUp>

          <div className="space-y-10">
            {MODULE_SCREENS.map((screen, idx) => (
              <ModuleScreenShowcase
                key={screen.id}
                screen={screen}
                index={idx}
                reduceMotion={reduceMotion}
                onInspect={(i) => setLightboxIndex(i)}
                registerRef={(id, el) => {
                  moduleRefs.current[id] = el;
                }}
              />
            ))}
          </div>
        </section>

        {/* ─── 5. DESIGN SYSTEM: COLORS, TYPOGRAPHY & GUARDRAILS ────────── */}
        <FadeUp y={20}>
          <section className="grid lg:grid-cols-3 gap-5">
            {/* Color Semantics */}
            <div className="p-6 rounded-3xl border border-line bg-surface/50 space-y-3.5 m3-elevation-1">
              <div className="flex items-center gap-2 text-sm font-bold text-ink">
                <Layers size={15} className="text-accenttext" />
                <span>Color Semantics</span>
              </div>
              <div className="grid grid-cols-2 gap-2.5 text-xs">
                {[
                  { name: 'Deep Navy Sidebar', hex: '#0F172A' },
                  { name: 'Operational Blue', hex: '#00619A' },
                  { name: 'Quarantine Amber', hex: '#F59E0B' },
                  { name: 'QA Passed Green', hex: '#10B981' }
                ].map((c) => (
                  <div key={c.name} className="p-2.5 rounded-xl border border-line bg-bg/40 flex items-center gap-2.5">
                    <span className="w-4 h-4 rounded-md border border-black/15 shrink-0" style={{ backgroundColor: c.hex }} />
                    <div className="min-w-0">
                      <div className="font-medium text-ink truncate text-[11px]">{c.name}</div>
                      <div className="font-mono text-[10px] text-faint">{c.hex}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Typography System (Concise & Essential) */}
            <div className="p-6 rounded-3xl border border-line bg-surface/50 space-y-3.5 m3-elevation-1">
              <div className="flex items-center gap-2 text-sm font-bold text-ink">
                <Type size={15} className="text-accenttext" />
                <span>Typography</span>
              </div>
              <div className="space-y-2.5 text-xs">
                <div className="pb-2 border-b border-line/50">
                  <div className="font-semibold text-ink">Plus Jakarta Sans <span className="text-faint font-normal">(400–700)</span></div>
                  <div className="text-mut font-light">Primary UI, navigation &amp; readable tables</div>
                </div>
                <div className="pb-2 border-b border-line/50">
                  <div className="font-mono font-medium text-ink">JetBrains Mono <span className="text-faint font-normal">(400–600)</span></div>
                  <div className="text-mut font-light">Lot #s, SKUs, bin codes &amp; tabular numbers</div>
                </div>
                <div>
                  <div className="font-semibold text-ink">Helvetica &amp; Courier</div>
                  <div className="text-mut font-light">Standard Type1 fonts for COA PDF exports</div>
                </div>
              </div>
            </div>

            {/* Error Prevention */}
            <div className="p-6 rounded-3xl border border-line bg-surface/50 space-y-2.5 m3-elevation-1 flex flex-col justify-center">
              <div className="flex items-center gap-2 text-sm font-bold text-ink">
                <ShieldAlert size={15} className="text-accenttext" />
                <span>Tabular Clarity &amp; Guardrails</span>
              </div>
              <p className="text-xs sm:text-sm text-mut font-light leading-relaxed">
                Paired <strong className="text-ink font-medium">Plus Jakarta Sans</strong> with tabular <strong className="text-ink font-medium">JetBrains Mono</strong> across bin coordinates (<code className="text-ink">WH1-ZA-A01</code>), SSCC-18 pallet IDs, and currency columns so dense ledgers stay effortless to scan under shift pressure.
              </p>
            </div>
          </section>
        </FadeUp>

        <FadeUp y={20}>
          <section className="rounded-3xl border border-lime/25 bg-gradient-to-br from-surface/80 via-surface/50 to-lime/[0.04] p-6 sm:p-8 space-y-6 m3-elevation-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-accenttext font-semibold">
                  <Sparkles size={13} />
                  <span>Outcomes &amp; Interactive Build</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-ink">
                  Key Takeaways &amp; Interactive Prototype
                </h2>
              </div>

              <a
                href={prototypeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-lime text-black text-xs font-semibold hover:brightness-105 active:scale-95 transition-all shadow-xs whitespace-nowrap shrink-0 w-fit"
              >
                <Play size={12} className="fill-current" />
                <span>Try Interactive Prototype</span>
                <ExternalLink size={12} />
              </a>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl border border-line bg-bg/50 space-y-1">
                <div className="text-sm font-semibold text-ink">Workflow-First Clarity</div>
                <p className="text-xs text-mut font-light leading-relaxed">
                  Reorganized 9 complex WMS domains into predictable daily views, cutting navigation hunting across roles.
                </p>
              </div>
              <div className="p-4 rounded-2xl border border-line bg-bg/50 space-y-1">
                <div className="text-sm font-semibold text-ink">Built-In Guardrails</div>
                <p className="text-xs text-mut font-light leading-relaxed">
                  Designed out floor slip-ups—clipped bin pickers, exposed invoice margins, and uncounted reconciliations.
                </p>
              </div>
              <div className="p-4 rounded-2xl border border-line bg-bg/50 space-y-1">
                <div className="text-sm font-semibold text-ink">Traceability Readiness</div>
                <p className="text-xs text-mut font-light leading-relaxed">
                  Structured farm-to-retail lot linking directly inside operations for FSMA 204 &amp; mock recalls.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-line/60 space-y-1">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-ink font-semibold">
                <Compass size={13} className="text-accenttext" />
                <span>Next Validation Step (V2)</span>
              </div>
              <p className="text-xs sm:text-sm text-mut font-light leading-relaxed">
                Timed floor usability sessions with RF barcode scanners—benchmarking Direct Pallet Putaway speed, testing the live <code className="text-ink">Cmd+K</code> lot lookup palette, and validating offline aisle sync.
              </p>
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

      {/* ─── FULLSCREEN SCREEN INSPECTOR LIGHTBOX ──────────────────────── */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setLightboxIndex(null)}
            className="fixed inset-0 z-[120] bg-black/90 backdrop-blur-md flex flex-col justify-between p-4 sm:p-8"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="flex items-center justify-between gap-4 max-w-6xl w-full mx-auto text-white"
            >
              <div className="min-w-0">
                <div className="text-[11px] font-mono text-lime uppercase tracking-wider">
                  Module {MODULE_SCREENS[lightboxIndex].step} · {MODULE_SCREENS[lightboxIndex].shortLabel}
                </div>
                <div className="text-sm sm:text-lg font-semibold truncate">
                  {MODULE_SCREENS[lightboxIndex].title}
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={prototypeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-lime text-black text-xs font-semibold hover:brightness-105 transition-all"
                >
                  <span>Interactive Prototype</span>
                  <ExternalLink size={12} />
                </a>
                <button
                  type="button"
                  onClick={() => setLightboxIndex(null)}
                  aria-label="Close screen preview"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-white cursor-pointer transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-6xl w-full mx-auto my-auto flex items-center justify-center gap-3"
            >
              <button
                type="button"
                aria-label="Previous module screen"
                onClick={() =>
                  setLightboxIndex((lightboxIndex - 1 + MODULE_SCREENS.length) % MODULE_SCREENS.length)
                }
                className="hidden sm:flex w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 items-center justify-center text-white shrink-0 cursor-pointer transition-colors"
              >
                <ChevronLeft size={18} />
              </button>

              <motion.div
                key={MODULE_SCREENS[lightboxIndex].id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
                className="rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-white max-h-[78vh]"
              >
                <img
                  src={MODULE_SCREENS[lightboxIndex].src}
                  alt={MODULE_SCREENS[lightboxIndex].title}
                  referrerPolicy="no-referrer"
                  className="max-h-[78vh] w-auto object-contain block"
                />
              </motion.div>

              <button
                type="button"
                aria-label="Next module screen"
                onClick={() => setLightboxIndex((lightboxIndex + 1) % MODULE_SCREENS.length)}
                className="hidden sm:flex w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 items-center justify-center text-white shrink-0 cursor-pointer transition-colors"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            <div
              onClick={(e) => e.stopPropagation()}
              className="flex items-center justify-center gap-2 max-w-6xl w-full mx-auto"
            >
              {MODULE_SCREENS.map((m, idx) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setLightboxIndex(idx)}
                  className={`px-3 py-1 rounded-full text-[11px] font-medium transition-colors cursor-pointer ${
                    idx === lightboxIndex
                      ? 'bg-lime text-black font-semibold'
                      : 'bg-white/10 text-white/75 hover:bg-white/20'
                  }`}
                >
                  {m.step} {m.shortLabel}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}
