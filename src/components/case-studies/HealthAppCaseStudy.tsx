import React from 'react';
import { motion } from 'framer-motion';
import { ProjectItem, PROJECTS } from '../../data/content';
import { FadeUp } from '../Shared';
import {
  ArrowLeft,
  ArrowUpRight,
  ExternalLink,
  CheckCircle2,
  ArrowDown
} from 'lucide-react';

interface HealthAppCaseStudyProps {
  project: ProjectItem;
  onBack: () => void;
  onSelectProject: (p: ProjectItem) => void;
}

export default function HealthAppCaseStudy({
  project,
  onBack,
  onSelectProject
}: HealthAppCaseStudyProps): React.JSX.Element {
  const currentIndex = PROJECTS.findIndex((p) => p.id === project.id);
  const nextProject = PROJECTS[(currentIndex + 1) % PROJECTS.length];

  const scrollToImpacts = () => {
    document.getElementById('health-impacts')?.scrollIntoView({ behavior: 'smooth' });
  };

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
            Swasthyasaathi · Health App Case Study
          </span>

          <div className="flex items-center gap-2">
            {project.figma && (
              <a
                href={project.figma}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-lime text-black text-xs font-semibold hover:brightness-110 active:scale-95 transition-all shadow-xs"
              >
                <span>Open in Figma</span>
                <ExternalLink size={12} />
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-5 sm:px-8 pt-8 space-y-16 sm:space-y-24">
        {/* ─── 1. GOLDEN HERO BANNER (Exact PDF Header) ─────────────────── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-[#d98a18] via-[#eab140] to-[#f4e7c5] text-[#1a1405] p-8 sm:p-14 md:p-16 text-center shadow-xl"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/10 text-[#2b1d02] text-xs font-medium mb-6">
            <span>Casestudy · Ayurvedic &amp; Modern Wellness</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.12] max-w-3xl mx-auto mb-6 text-[#1a1405]">
            Built a modern health app that turns 2,000+ years of Ayurveda into simple, everyday wellness for young Indians.
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-[#3d2e0b]/90 max-w-2xl mx-auto leading-relaxed mb-8 font-normal">
            Young Indians still lack a health app that unites modern wellness with simple, familiar Ayurvedic guidance. Today&apos;s platforms are jargon-heavy and fail to give clear, personalized, symptom-based routines in users&apos; own language.
          </p>

          <button
            type="button"
            onClick={scrollToImpacts}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1a1405] text-[#f5d07a] text-xs sm:text-sm font-semibold hover:bg-black transition-all cursor-pointer shadow-md"
          >
            <span>Explore the Case Study</span>
            <ArrowDown size={14} />
          </button>
        </motion.section>

        {/* ─── 2. THE IMPACTS: BEFORE vs AFTER ──────────────────────────── */}
        <FadeUp y={28}>
          <section id="health-impacts" className="space-y-8">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink">
              The Impacts
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {/* BEFORE */}
              <div className="rounded-3xl border border-line bg-surface/60 p-6 sm:p-8 space-y-5 m3-elevation-1">
                <div className="text-center">
                  <span className="inline-block px-3 py-1 rounded-full bg-red-500/10 text-red-400 text-xs font-bold uppercase tracking-wider mb-1">
                    BEFORE
                  </span>
                  <h3 className="text-base font-semibold text-ink">The Fragmented Experience</h3>
                </div>

                {/* Diagram */}
                <div className="rounded-2xl bg-[#f9f6ef] text-[#1c1917] p-5 border border-black/10 space-y-4">
                  <div className="grid grid-cols-2 gap-2.5 text-[11px] font-medium">
                    <div className="p-2.5 rounded-xl bg-white border border-black/10 flex items-center gap-2 shadow-2xs">
                      <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">G</span>
                      <span>Google Search</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white border border-black/10 flex items-center gap-2 shadow-2xs">
                      <span className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold">▶</span>
                      <span>YouTube Videos</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white border border-black/10 flex items-center gap-2 shadow-2xs">
                      <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold">✎</span>
                      <span>Random Blogs</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white border border-black/10 flex items-center gap-2 shadow-2xs">
                      <span className="w-5 h-5 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold">☺</span>
                      <span>Family Advice</span>
                    </div>
                  </div>
                  <div className="text-center text-xs font-semibold text-red-600 bg-red-50 py-2 rounded-xl border border-red-200">
                    Confused User &amp; Contradictory Advice
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-mut text-center italic font-light">
                  “Users jumped between YouTube, blogs, and family advice for every minor issue.”
                </p>
              </div>

              {/* AFTER */}
              <div className="rounded-3xl border border-lime/30 bg-surface/60 p-6 sm:p-8 space-y-5 m3-elevation-1">
                <div className="text-center">
                  <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
                    AFTER
                  </span>
                  <h3 className="text-base font-semibold text-ink">The Unified Experience</h3>
                </div>

                {/* Flow Diagram */}
                <div className="rounded-2xl bg-[#f9f6ef] text-[#1c1917] p-5 border border-emerald-500/30 space-y-4">
                  <div className="grid grid-cols-4 gap-2 text-[11px] font-semibold text-center">
                    <div className="p-3 rounded-xl bg-white border border-emerald-200 shadow-2xs flex flex-col items-center gap-1">
                      <span className="text-lg">🩺</span>
                      <span>Symptom</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white border border-emerald-200 shadow-2xs flex flex-col items-center gap-1">
                      <span className="text-lg">🧘</span>
                      <span>Yoga</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white border border-emerald-200 shadow-2xs flex flex-col items-center gap-1">
                      <span className="text-lg">🍲</span>
                      <span>Food</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white border border-emerald-200 shadow-2xs flex flex-col items-center gap-1">
                      <span className="text-lg">🛡️</span>
                      <span>Doctor Safety</span>
                    </div>
                  </div>
                  <div className="text-center text-xs font-semibold text-emerald-700 bg-emerald-50 py-2 rounded-xl border border-emerald-200">
                    Calm, Guided Daily Wellness Flow
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-mut text-center italic font-light">
                  “One app gives symptom guidance + yoga + food + doctor safety line in a single flow.”
                </p>
              </div>
            </div>

            {/* ─── MEASURABLE OUTCOMES & USER VALUE (2x2 Grid) ────────── */}
            <div className="space-y-4 pt-4">
              <h3 className="text-lg font-semibold text-ink">Measurable Outcomes and User Value</h3>
              <div className="grid md:grid-cols-2 gap-5">
                {/* 1. Reduced User Effort */}
                <div className="p-6 rounded-3xl border border-line bg-surface/50 space-y-4 m3-elevation-1">
                  <div className="flex items-center gap-2 text-base font-semibold text-ink">
                    <span>⚡ Reduced User Effort</span>
                  </div>
                  <div className="rounded-xl bg-[#faf8f3] text-[#1c1917] p-4 border border-black/10 space-y-2.5 text-xs">
                    <div className="font-semibold text-center text-[11px] uppercase tracking-wider text-black/60">
                      Efficiency Comparison
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="w-24 text-[11px] text-black/70">Multiple Searches</span>
                        <div className="flex-1 bg-black/10 rounded-full h-3 overflow-hidden">
                          <div className="bg-red-400 h-full w-[80%]" />
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-24 text-[11px] font-semibold text-emerald-700">Swasthyasaathi</span>
                        <div className="flex-1 bg-black/10 rounded-full h-3 overflow-hidden">
                          <div className="bg-emerald-500 h-full w-[35%]" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-mut font-light">
                    The new flow cuts multiple Google searches down to one guided routine for personalized yoga and food advice.
                  </p>
                </div>

                {/* 2. Improved Health Decisions */}
                <div className="p-6 rounded-3xl border border-line bg-surface/50 space-y-4 m3-elevation-1">
                  <div className="flex items-center gap-2 text-base font-semibold text-ink">
                    <span>🩺 Improved Health Decisions</span>
                  </div>
                  <div className="rounded-xl bg-[#faf8f3] text-[#1c1917] p-4 border border-black/10 flex items-center justify-center gap-6 text-xs font-semibold">
                    <div className="px-4 py-2.5 rounded-xl bg-red-50 border border-red-200 text-red-700">Over-Reacting</div>
                    <span className="text-black/40">⚖️</span>
                    <div className="px-4 py-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800">Ignoring Risks</div>
                  </div>
                  <p className="text-xs sm:text-sm text-mut font-light">
                    A clear “When to see a doctor” step prevents both over-reacting and overlooking serious symptoms.
                  </p>
                </div>

                {/* 3. Growth Opportunities */}
                <div className="p-6 rounded-3xl border border-line bg-surface/50 space-y-4 m3-elevation-1">
                  <div className="flex items-center gap-2 text-base font-semibold text-ink">
                    <span>📈 Growth Opportunities</span>
                  </div>
                  <div className="rounded-xl bg-[#faf8f3] text-[#1c1917] p-4 border border-black/10 flex items-center justify-around text-xs font-medium">
                    <span className="px-3 py-1.5 rounded-lg bg-emerald-100 text-emerald-800">Habit Cues ↑</span>
                    <span className="px-3 py-1.5 rounded-lg bg-amber-100 text-amber-800">Churn ↓</span>
                    <span className="px-3 py-1.5 rounded-lg bg-blue-100 text-blue-800">Daily Retention</span>
                  </div>
                  <p className="text-xs sm:text-sm text-mut font-light">
                    Could boost daily use with habit cues and cut churn through familiar Ayurvedic guidance.
                  </p>
                </div>

                {/* 4. Streamlined Experience */}
                <div className="p-6 rounded-3xl border border-line bg-surface/50 space-y-4 m3-elevation-1">
                  <div className="flex items-center gap-2 text-base font-semibold text-ink">
                    <span>✨ Streamlined Experience</span>
                  </div>
                  <div className="rounded-xl bg-[#faf8f3] text-[#1c1917] p-4 border border-black/10 flex items-center justify-between text-[11px] font-medium">
                    <span>Scattered Info</span>
                    <span>→</span>
                    <span className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-semibold">One Daily Plan</span>
                  </div>
                  <p className="text-xs sm:text-sm text-mut font-light">
                    Grouped scattered information into one daily plan → fewer context switches for users.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </FadeUp>

        {/* ─── 3. UNDERSTANDING THE INDIAN HEALTH USER ──────────────────── */}
        <FadeUp y={28}>
          <section className="space-y-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink">
                Understanding the Indian Health User
              </h2>
              <p className="text-sm text-mut mt-1">
                Connecting user actions, qualitative feedback, and key design insights.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 items-stretch">
              {/* Survey Chart Card */}
              <div className="p-6 rounded-3xl border border-line bg-surface/60 space-y-4 m3-elevation-1">
                <div className="text-xs font-mono uppercase tracking-wider text-accenttext font-semibold">
                  WHEN YOU FEEL UNWELL, YOUR FIRST MOVE IS TO...
                </div>
                <div className="space-y-3 text-xs pt-2">
                  {[
                    { label: "Google Search / Self-research", pct: "50%", color: "bg-blue-500" },
                    { label: "Consult a Doctor directly", pct: "25%", color: "bg-emerald-500" },
                    { label: "Try a Home Remedy", pct: "12.5%", color: "bg-amber-500" },
                    { label: "Ask Family / Friends", pct: "12.5%", color: "bg-purple-500" }
                  ].map((item) => (
                    <div key={item.label} className="space-y-1">
                      <div className="flex justify-between text-ink/90 font-medium">
                        <span>{item.label}</span>
                        <span className="font-mono">{item.pct}</span>
                      </div>
                      <div className="w-full h-2.5 bg-surface rounded-full overflow-hidden border border-line">
                        <div className={`h-full ${item.color}`} style={{ width: item.pct }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interview Quote + Insights */}
              <div className="flex flex-col justify-between gap-4">
                <div className="p-6 rounded-3xl border border-lime/30 bg-lime/[0.06] space-y-3 m3-elevation-1">
                  <div className="text-2xl text-accenttext font-serif leading-none">“</div>
                  <p className="text-sm sm:text-base font-medium text-ink leading-relaxed">
                    Suggest logical reason for particular disease... when we give user clarity about the scenario that automatically built the user trust
                  </p>
                  <div className="text-xs font-mono text-accenttext">— UX Interview</div>
                </div>

                <div className="p-5 rounded-3xl border border-line bg-surface/50 space-y-2.5 m3-elevation-1">
                  <div className="text-xs font-semibold uppercase tracking-wider text-ink">
                    Key Behavioral Insights:
                  </div>
                  <ul className="space-y-1.5 text-xs text-mut">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-lime" />
                      <span>Clear explanation + logic, not just recommendations</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-lime" />
                      <span>Symptom-first decision making</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-lime" />
                      <span>Cultural compatibility required</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </FadeUp>

        {/* ─── 4. COMPETITIVE ANALYSIS ─────────────────────────────────── */}
        <FadeUp y={28}>
          <section className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink">
              Competitive Analysis
            </h2>

            <div className="grid md:grid-cols-3 gap-5">
              {/* AyuRythm */}
              <div className="p-6 rounded-3xl border border-line bg-surface/50 space-y-4 m3-elevation-1">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-ink">AyuRythm</h3>
                    <div className="text-xs font-mono text-amber-400">2.9 / 5 ★</div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 text-[11px] font-medium">
                    Ayurvedik Pulse
                  </span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="font-semibold text-red-400">Critical Issues Discovered:</div>
                  <p className="text-mut">Users complain about irrelevant suggestions and broken guidance.</p>
                  <p className="text-mut italic">Customer Support: “No way to chat with team also, can only send email!”</p>
                </div>
                <div className="space-y-1.5 text-xs pt-2 border-t border-line/60">
                  <div className="font-semibold text-emerald-400">What Users Like:</div>
                  <ul className="space-y-1 text-mut">
                    <li>• “Excellent Digital Ayurveda concept”</li>
                    <li>• Personalized holistic wellness plans</li>
                    <li>• Educational content about Ayurveda</li>
                  </ul>
                </div>
              </div>

              {/* Practo */}
              <div className="p-6 rounded-3xl border border-line bg-surface/50 space-y-4 m3-elevation-1">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-ink">Practo</h3>
                    <div className="text-xs font-mono text-blue-400">4.5 / 5 ★</div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 text-[11px] font-medium">
                    Consultation
                  </span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="font-semibold text-red-400">User Pain Points:</div>
                  <p className="text-mut">“Be ready to be harassed by SMS + calls nuisance by Practo”</p>
                  <p className="text-mut">No traditional/Ayurvedic medicine integration</p>
                </div>
                <div className="space-y-1.5 text-xs pt-2 border-t border-line/60">
                  <div className="font-semibold text-emerald-400">Strengths:</div>
                  <ul className="space-y-1 text-mut">
                    <li>• AI-powered symptom checker</li>
                    <li>• Comprehensive healthcare platform</li>
                  </ul>
                </div>
              </div>

              {/* Ada Health */}
              <div className="p-6 rounded-3xl border border-line bg-surface/50 space-y-4 m3-elevation-1">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-ink">Ada Health</h3>
                    <div className="text-xs font-mono text-emerald-400">4.6 / 5 ★</div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[11px] font-medium">
                    Symptom Checker
                  </span>
                </div>
                <div className="space-y-1.5 text-xs">
                  <div className="font-semibold text-emerald-400">Strong Points:</div>
                  <ul className="space-y-1 text-mut">
                    <li>• Very accurate symptom checker</li>
                    <li>• Excellent UX and AI technology</li>
                    <li>• 24/7 access &amp; multilingual support</li>
                  </ul>
                </div>
                <div className="space-y-1.5 text-xs pt-2 border-t border-line/60">
                  <div className="font-semibold text-red-400">Limitations for Indian Market:</div>
                  <ul className="space-y-1 text-mut">
                    <li>• No Ayurvedic/traditional medicine</li>
                    <li>• No Indian food or cultural customization</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </FadeUp>


        {/* ─── 6. HEALTH APP ARCHITECTURE & PROJECT DETAILS ────────────── */}
        <FadeUp y={28}>
          <section className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink">
              Health App Architecture
            </h2>

            {/* Architecture Flowchart Card */}
            <div className="rounded-3xl border border-line bg-[#faf8f3] text-[#1c1917] p-6 sm:p-8 space-y-6 overflow-x-auto">
              {/* Legend */}
              <div className="flex flex-wrap gap-3 text-[11px] font-medium pb-4 border-b border-black/10">
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-xs bg-amber-200 border border-amber-400" /> Entry Navigation</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-xs bg-blue-200 border border-blue-400" /> User Profile</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-xs bg-pink-200 border border-pink-400" /> Core Features</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-xs bg-purple-200 border border-purple-400" /> Preferences</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-xs bg-emerald-200 border border-emerald-400" /> Tracking Modules</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-xs bg-orange-200 border border-orange-400" /> Recommendations</span>
              </div>

              {/* Nodes Visualization */}
              <div className="min-w-[640px] space-y-5 text-xs font-medium">
                {/* Initial Flow */}
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1.5 rounded-lg bg-amber-100 border border-amber-300">Initial Entry Flow</span>
                  <span>→</span>
                  <span className="px-3 py-1.5 rounded-lg bg-blue-100 border border-blue-300">Splash Screen</span>
                  <span>→</span>
                  <span className="px-3 py-1.5 rounded-lg bg-blue-100 border border-blue-300">Onboarding</span>
                  <span>→</span>
                  <span className="px-3 py-1.5 rounded-lg bg-purple-100 border border-purple-300">Language</span>
                  <span>→</span>
                  <span className="px-3 py-1.5 rounded-lg bg-blue-100 border border-blue-300">Profile Setup</span>
                  <span>→</span>
                  <span className="px-3.5 py-2 rounded-xl bg-amber-300 border border-amber-500 font-bold">Home Dashboard</span>
                </div>

                {/* Branches */}
                <div className="grid grid-cols-3 gap-4 pt-2 border-t border-black/10">
                  <div className="p-3.5 rounded-xl bg-pink-50 border border-pink-200 space-y-2">
                    <div className="font-bold text-pink-900">Symptom Engine</div>
                    <div className="flex flex-wrap gap-1.5 text-[11px]">
                      <span className="px-2 py-0.5 bg-white rounded border border-pink-200">Symptom Checker</span>
                      <span>→</span>
                      <span className="px-2 py-0.5 bg-white rounded border border-pink-200">Analysis Result</span>
                    </div>
                    <div className="grid grid-cols-2 gap-1 text-[10px]">
                      <span className="px-2 py-1 rounded bg-orange-100 border border-orange-300">Suggest Food</span>
                      <span className="px-2 py-1 rounded bg-orange-100 border border-orange-300">Suggest Remedy</span>
                      <span className="px-2 py-1 rounded bg-orange-100 border border-orange-300">Suggest Exercise</span>
                      <span className="px-2 py-1 rounded bg-orange-100 border border-orange-300">Suggest Tips</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 space-y-2">
                    <div className="font-bold text-emerald-900">Tracking Modules</div>
                    <div className="grid grid-cols-2 gap-1.5 text-[11px]">
                      <span className="px-2 py-1 rounded bg-white border border-emerald-200">😴 Sleep</span>
                      <span className="px-2 py-1 rounded bg-white border border-emerald-200">💧 Water</span>
                      <span className="px-2 py-1 rounded bg-white border border-emerald-200">🧘 Exercise</span>
                      <span className="px-2 py-1 rounded bg-white border border-emerald-200">🍲 Meals</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 space-y-2">
                    <div className="font-bold text-blue-900">Profile &amp; Utility</div>
                    <div className="flex flex-wrap gap-1.5 text-[11px]">
                      <span className="px-2 py-1 rounded bg-white border border-blue-200">AI Chat Assistant</span>
                      <span className="px-2 py-1 rounded bg-white border border-blue-200">Edit Profile</span>
                      <span className="px-2 py-1 rounded bg-white border border-blue-200">Settings</span>
                      <span className="px-2 py-1 rounded bg-white border border-blue-200">Notifications</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Project Info Footer Bar */}
            <div className="p-5 rounded-2xl border border-line bg-surface/60 grid sm:grid-cols-3 gap-4 text-xs">
              <div>
                <span className="text-faint block font-mono uppercase text-[10px]">Project Type</span>
                <span className="font-semibold text-ink">Self-initiated UX Case Study - Mobile Health App (Concept)</span>
              </div>
              <div>
                <span className="text-faint block font-mono uppercase text-[10px]">Role</span>
                <span className="font-semibold text-ink">UX / UI Designer (solo)</span>
              </div>
              <div>
                <span className="text-faint block font-mono uppercase text-[10px]">Tools</span>
                <span className="font-semibold text-ink">Figma, FigJam, Maze (testing), Notion, Google Forms</span>
              </div>
            </div>
          </section>
        </FadeUp>

        {/* ─── 6. EARLY LOW-FIDELITY WIREFRAMES ────────────────────────── */}
        <FadeUp y={28}>
          <section className="space-y-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink">
                Early Low-Fidelity Wireframes
              </h2>
              <p className="text-sm text-mut mt-1">
                Quick sketches helped me test layout ideas, identify issues early, and refine the flow before moving to digital wireframes.
              </p>
            </div>

            <div className="rounded-3xl border border-line bg-surface/40 p-3 sm:p-5 overflow-hidden m3-elevation-1">
              <img
                src="/assets/aistudio/image_683457ba.png"
                alt="Early Low-Fidelity Paper Wireframes"
                className="w-full h-auto rounded-2xl object-contain"
                loading="lazy"
              />
            </div>
          </section>
        </FadeUp>

        {/* ─── 7. HIGH FIDELITY SCREENS + ANNOTATIONS ──────────────────── */}
        <FadeUp y={28}>
          <section className="space-y-12">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink">
              High Fidelity Screens
            </h2>

            {/* SCREEN 1: SPLASH SCREEN */}
            <div className="grid md:grid-cols-12 gap-8 items-center p-6 sm:p-8 rounded-3xl border border-line bg-surface/40 m3-elevation-1">
              <div className="md:col-span-5 flex justify-center">
                <img
                  src="/assets/aistudio/image_6c0b9379.png"
                  alt="Swasthyasaathi Splash Screen"
                  className="w-full max-w-[260px] h-auto rounded-2xl shadow-2xl border border-line/60"
                  loading="lazy"
                />
              </div>
              <div className="md:col-span-7 space-y-4">
                <span className="text-xs font-mono text-accenttext uppercase">Splash Screen</span>
                <div className="space-y-3 text-xs sm:text-sm">
                  <div className="p-3.5 rounded-2xl bg-bg/40 border border-line">
                    <strong className="text-ink block mb-0.5">Color:</strong>
                    <span className="text-mut">The gradient, echoing the colors of the Indian flag, immediately establishes the brand&apos;s national identity and target market for rapid recognition and trust among local users.</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-bg/40 border border-line">
                    <strong className="text-ink block mb-0.5">Lotus:</strong>
                    <span className="text-mut">Lotus symbol signals purity and well-being, giving the brand deep Indian cultural roots.</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-bg/40 border border-line">
                    <strong className="text-ink block mb-0.5">Typography:</strong>
                    <span className="text-mut">Regional-style font makes the brand feel authentically Indian and instantly familiar.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* SCREEN 2: HOME SCREEN */}
            <div className="grid md:grid-cols-12 gap-8 items-start p-6 sm:p-8 rounded-3xl border border-line bg-surface/40 m3-elevation-1">
              <div className="md:col-span-5 flex justify-center">
                <img
                  src="/assets/aistudio/image_d2c529b2.png"
                  alt="Swasthyasaathi Home Screen"
                  className="w-full max-w-[270px] h-auto rounded-2xl shadow-2xl border border-line/60"
                  loading="lazy"
                />
              </div>
              <div className="md:col-span-7 space-y-4 md:sticky md:top-24">
                <span className="text-xs font-mono text-accenttext uppercase">Home Screen</span>
                <div className="space-y-3 text-xs sm:text-sm">
                  <div className="p-3.5 rounded-2xl bg-bg/40 border border-line">
                    <strong className="text-ink block mb-0.5">Swipe to Start Exercise:</strong>
                    <span className="text-mut">Uses a simple, modern gesture to make beginning a workout effortless and reduce friction.</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-bg/40 border border-line">
                    <strong className="text-ink block mb-0.5">Core Medical Utility:</strong>
                    <span className="text-mut">“Start symptom check” gives users an instant entry to self-assessment, while Swasthya Mitra AI gives 24/7 access to answers and continuous wellness support.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* SCREEN 3: MENU SCREEN */}
            <div className="grid md:grid-cols-12 gap-8 items-center p-6 sm:p-8 rounded-3xl border border-line bg-surface/40 m3-elevation-1">
              <div className="md:col-span-5 flex justify-center">
                <img
                  src="/assets/aistudio/image_a9fbb891.png"
                  alt="Swasthyasaathi Menu Screen"
                  className="w-full max-w-[240px] h-auto rounded-2xl shadow-2xl border border-line/60"
                  loading="lazy"
                />
              </div>
              <div className="md:col-span-7 space-y-4">
                <span className="text-xs font-mono text-accenttext uppercase">Menu Screen</span>
                <div className="space-y-3 text-xs sm:text-sm">
                  <div className="p-3.5 rounded-2xl bg-bg/40 border border-line">
                    <strong className="text-ink block mb-0.5">Profile &amp; Cultural Identity:</strong>
                    <span className="text-mut">Mandala around the profile photo adds cultural depth and reinforces a holistic wellness identity. Showing name and email builds clear user ownership.</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-bg/40 border border-line">
                    <strong className="text-ink block mb-0.5">Core Utility &amp; Navigation:</strong>
                    <span className="text-mut">Top placement of “Prakriti Assessment” promotes frequent use of the app&apos;s core Ayurvedic constitution feature.</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-bg/40 border border-line">
                    <strong className="text-ink block mb-0.5">Design &amp; Exit Strategy (Divider):</strong>
                    <span className="text-mut">Ornamental traditional dividers add a layer of cultural sophistication while visually separating utility groups.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* SCREEN 4 & 5: TRACKER PAGES (Daily Reflection + Add Symptoms) */}
            <div className="grid md:grid-cols-2 gap-6 items-start">
              {/* Tracker Reflection */}
              <div className="p-6 rounded-3xl border border-line bg-surface/40 space-y-5 m3-elevation-1">
                <span className="text-xs font-mono text-accenttext uppercase block">Tracker Page · Habit &amp; Progress</span>
                <div className="flex justify-center">
                  <img
                    src="/assets/aistudio/image_b6aae7f0.png"
                    alt="Today's Reflection Tracker Screen"
                    className="w-full max-w-[270px] h-auto rounded-2xl shadow-2xl border border-line/60"
                    loading="lazy"
                  />
                </div>
                <p className="text-xs sm:text-sm text-mut font-light">
                  <strong className="text-ink">Habit Tracking:</strong> Circular progress rings provide immediate quantitative feedback while simple steppers keep daily habit logging effortless.
                </p>
              </div>

              {/* Add Symptoms */}
              <div className="p-6 rounded-3xl border border-line bg-surface/40 space-y-5 m3-elevation-1">
                <span className="text-xs font-mono text-accenttext uppercase block">Tracker Page · Add Symptoms</span>
                <div className="flex justify-center">
                  <img
                    src="/assets/aistudio/image_b53a07e1.png"
                    alt="Add Symptoms Screen"
                    className="w-full max-w-[270px] h-auto rounded-2xl shadow-2xl border border-line/60"
                    loading="lazy"
                  />
                </div>
                <p className="text-xs sm:text-sm text-mut font-light">
                  <strong className="text-ink">Efficient Input Interface:</strong> Chose text search + quick tags for faster, higher accuracy input—avoiding low-utility 3D body models. “Myself vs Someone else” cleanly separates proxy data for better AI training.
                </p>
              </div>
            </div>

            {/* SCREEN 6: EXERCISE SCREEN */}
            <div className="grid md:grid-cols-12 gap-8 items-start p-6 sm:p-8 rounded-3xl border border-line bg-surface/40 m3-elevation-1">
              <div className="md:col-span-5 flex justify-center">
                <img
                  src="/assets/aistudio/image_220e48f1.png"
                  alt="Yoga and Pranayam Exercise Screen"
                  className="w-full max-w-[270px] h-auto rounded-2xl shadow-2xl border border-line/60"
                  loading="lazy"
                />
              </div>
              <div className="md:col-span-7 space-y-4 md:sticky md:top-24">
                <span className="text-xs font-mono text-accenttext uppercase">Exercise Screen</span>
                <div className="space-y-3 text-xs sm:text-sm">
                  <div className="p-3.5 rounded-2xl bg-bg/40 border border-line">
                    <strong className="text-ink block mb-0.5">Authenticity &amp; Trust:</strong>
                    <span className="text-mut">“Certified” badge builds instant trust by signaling verified, credible Ayurvedic &amp; Yoga guidance.</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-bg/40 border border-line">
                    <strong className="text-ink block mb-0.5">Progressive Disclosure &amp; Credibility:</strong>
                    <span className="text-mut">“View” button keeps the interface uncluttered while revealing instructions and verified source links on tap.</span>
                  </div>
                </div>

                {project.figma && (
                  <a
                    href={project.figma}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-lime text-black text-xs font-semibold hover:brightness-105 transition-all"
                  >
                    <span>Explore the complete interactive flow</span>
                    <ExternalLink size={12} />
                  </a>
                )}
              </div>
            </div>
          </section>
        </FadeUp>

        {/* ─── 9. DESIGN SYSTEM ─────────────────────────────────────────── */}
        <FadeUp y={28}>
          <section className="space-y-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink">
                Design System
              </h2>
              <p className="text-sm text-mut mt-1">
                A scalable system built for consistency across the Swasthya app.
              </p>
            </div>

            {/* Color System Swatches */}
            <div className="p-6 rounded-3xl border border-line bg-surface/50 space-y-5">
              <h3 className="text-base font-semibold text-ink">Health App Color System</h3>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-[11px]">
                <div className="p-3 rounded-xl border border-line bg-bg/40 space-y-1.5">
                  <div className="h-6 rounded bg-[#FF9933]" />
                  <div className="font-semibold text-ink">Primary Saffron</div>
                  <div className="text-faint">CTA buttons, highlights</div>
                </div>
                <div className="p-3 rounded-xl border border-line bg-bg/40 space-y-1.5">
                  <div className="h-6 rounded bg-[#138808]" />
                  <div className="font-semibold text-ink">Primary Green</div>
                  <div className="text-faint">Success, health cues</div>
                </div>
                <div className="p-3 rounded-xl border border-line bg-bg/40 space-y-1.5">
                  <div className="h-6 rounded bg-[#FFD700]" />
                  <div className="font-semibold text-ink">Ayurvedic Gold</div>
                  <div className="text-faint">Premium wisdom</div>
                </div>
                <div className="p-3 rounded-xl border border-line bg-bg/40 space-y-1.5">
                  <div className="h-6 rounded bg-[#D97706]" />
                  <div className="font-semibold text-ink">Turmeric Yellow</div>
                  <div className="text-faint">Cultural highlights</div>
                </div>
                <div className="p-3 rounded-xl border border-line bg-bg/40 space-y-1.5">
                  <div className="h-6 rounded bg-[#DC2626]" />
                  <div className="font-semibold text-ink">Kumkum Red</div>
                  <div className="text-faint">Alerts &amp; motifs</div>
                </div>
              </div>
            </div>

            {/* Typography & Components */}
            <div className="space-y-6">
              <div className="p-6 rounded-3xl border border-line bg-surface/50 space-y-3 text-xs">
                <h3 className="text-base font-semibold text-ink">Typography Scale</h3>
                <div className="grid sm:grid-cols-2 gap-2 text-mut font-mono text-[11px]">
                  <div><strong className="text-ink">Display Large:</strong> 32px / 38px lh / 0.5px tracking</div>
                  <div><strong className="text-ink">Display Medium:</strong> 28px / 34px lh / 0.25px tracking</div>
                  <div><strong className="text-ink">H1–H4 Headings:</strong> 20px–14px · Inter SemiBold / Medium</div>
                  <div><strong className="text-ink">Body Styles:</strong> 16px–12px · Lexend Bold / Regular</div>
                </div>
              </div>

              <div className="p-6 rounded-3xl border border-line bg-surface/50 space-y-4">
                <div>
                  <h3 className="text-base font-semibold text-ink">Component Library (50+ Reusable Components)</h3>
                  <p className="text-xs text-mut mt-1 font-light">
                    Standardized cards, tracker widgets, bilingual Hindi/English radio options, symptom pills, action buttons, and custom icons.
                  </p>
                </div>
                <div className="rounded-2xl bg-white p-4 sm:p-6 border border-line/60 overflow-hidden">
                  <img
                    src="/assets/aistudio/image_80f1a12a.png"
                    alt="Swasthyasaathi UI Component Library"
                    className="w-full h-auto object-contain"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </section>
        </FadeUp>

        {/* ─── 10. FEW DESIGN ITERATIONS ────────────────────────────────── */}
        <FadeUp y={28}>
          <section className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink">
              Few Design Iterations
            </h2>

            <div className="grid md:grid-cols-12 gap-8 items-start p-6 sm:p-8 rounded-3xl border border-line bg-surface/40 m3-elevation-1">
              <div className="md:col-span-6">
                <div className="rounded-2xl bg-white p-4 sm:p-6 border border-line/60 overflow-hidden shadow-md">
                  <img
                    src="/assets/aistudio/image_b71e0880.png"
                    alt="Design Iterations Before and After Screens"
                    className="w-full h-auto object-contain"
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="md:col-span-6 space-y-4 md:sticky md:top-24">
                {[
                  {
                    title: "Card Revisions — What Changed & Why",
                    points: [
                      "Replaced decorative cards with scannable layout.",
                      "Standardized CTA placement for quick action.",
                      "Refined visual balance (image, spacing) for clearer scanning."
                    ]
                  },
                  {
                    title: "Navigation Iterations — What Changed & Why",
                    points: [
                      "Added clear labels to improve recognition and reduce icon ambiguity.",
                      "Highlighted selected states so users always know where they are.",
                      "Standardized spacing and layout for quicker, more reliable tapping."
                    ]
                  },
                  {
                    title: "Recommendations Screen — What Changed & Why",
                    points: [
                      "Replaced dense, image-heavy cards with cleaner categories to reduce user fatigue.",
                      "Added clear labels and item counts for quicker understanding of each section.",
                      "Used a simpler, color-coded layout to make scanning and navigation more intuitive."
                    ]
                  }
                ].map((iter) => (
                  <div key={iter.title} className="p-5 rounded-2xl border border-line bg-surface/60 space-y-2.5">
                    <h3 className="text-base font-semibold text-ink">{iter.title}</h3>
                    <ul className="space-y-1.5 text-xs text-mut font-light">
                      {iter.points.map((pt) => (
                        <li key={pt} className="flex items-start gap-2">
                          <CheckCircle2 size={13} className="text-lime shrink-0 mt-0.5" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </FadeUp>

        {/* ─── 11. KEY LEARNINGS ────────────────────────────────────────── */}
        <FadeUp y={28}>
          <section className="p-6 sm:p-10 rounded-3xl border border-lime/30 bg-surface/60 space-y-6 m3-elevation-1">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink">
              Key Learnings
            </h2>
            <ul className="space-y-3 text-xs sm:text-sm text-mut font-light">
              {[
                "Starting with low-fidelity exploration prevents early fixation and keeps the design system from blocking real problem-solving.",
                "AI is useful for speed and ideation, but strong design decisions still require human judgment.",
                "Clear documentation throughout the project avoids confusion and builds a reliable design narrative.",
                "Maintaining a consistent timeline and updating it regularly keeps the project focused and realistic.",
                "Scattered notes or writing across multiple places leads to misalignment—centralized documentation is essential."
              ].map((learning) => (
                <li key={learning} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-lime mt-2 shrink-0" />
                  <span className="leading-relaxed text-ink/90">{learning}</span>
                </li>
              ))}
            </ul>
            <div className="pt-4 border-t border-line text-center">
              <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/15 text-emerald-400 font-mono text-xs font-semibold">
                Project Summary Completed !!
              </span>
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
