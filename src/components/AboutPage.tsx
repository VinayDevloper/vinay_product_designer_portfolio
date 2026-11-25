import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { TOOLS, CERTIFICATIONS, EMAIL, SOCIALS, RESUME_PDF_URL } from '../data/content';
import { FadeUp, Serif } from './Shared';
import {
  ArrowLeft,
  ArrowUpRight,
  Code2,
  Sparkles,
  Leaf,
  Terminal,
  Cpu,
  Layers,
  Search,
  Compass,
  FileText,
  Award,
  Database,
  Server,
  GitBranch,
  Workflow
} from 'lucide-react';

interface AboutPageProps {
  onBackToHome: () => void;
  onOpenWorkPage?: () => void;
}

export default function AboutPage({
  onBackToHome,
  onOpenWorkPage
}: AboutPageProps): React.JSX.Element {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const whatIDo = [
    {
      num: "01",
      icon: Search,
      title: "Quantitative UX Research & Behavioral Synthesis",
      desc: "Rooting product decisions in real data rather than aesthetic assumptions. Conducting multi-city surveys (150+ respondents), task-completion audits, and cognitive friction mapping before designing a single frame."
    },
    {
      num: "02",
      icon: Layers,
      title: "Design Systems & Tokenized Architecture",
      desc: "Structuring scalable Figma libraries with Auto-Layout 5.0, component variants, and semantic tokens that map 1:1 to React props and Tailwind configuration for zero-ambiguity developer handoff."
    },
    {
      num: "03",
      icon: Code2,
      title: "Frontend Feasibility & Technical Translation",
      desc: "Armed with a B.Tech in Information Technology, I understand DOM rendering, API payload lifecycles, and edge states (empty, error, loading skeletons), speaking the exact language of engineering teams."
    },
    {
      num: "04",
      icon: Sparkles,
      title: "Interaction Choreography & Micro-Animations",
      desc: "Crafting tactile gesture responses, spring physics, and subtle micro-feedback that communicate system status effortlessly without visual clutter or latency."
    }
  ];

  return (
    <article className="min-h-screen bg-bg text-ink pb-32 pt-20 sm:pt-24 selection:bg-lime selection:text-black">
      {/* Top Glass Navigation Bar */}
      <div className="sticky top-4 z-40 px-4 sm:px-8 max-w-5xl mx-auto">
        <div className="flex items-center justify-between gap-4 px-4 py-2.5 rounded-full border border-line bg-surface/85 backdrop-blur-xl m3-elevation-2">
          <button
            onClick={onBackToHome}
            data-testid="about-back-btn"
            className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium text-mut hover:text-ink hover:bg-white/5 transition-all duration-200 cursor-pointer"
          >
            <ArrowLeft size={13} className="transition-transform group-hover:-translate-x-1" />
            <span>Home</span>
          </button>

          <span className="text-xs font-medium text-faint hidden sm:inline-block">
            About · Vinay Sawant
          </span>

          <div className="flex items-center gap-2">
            <a
              href={RESUME_PDF_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-line text-xs font-medium text-mut hover:text-ink transition-colors cursor-pointer"
            >
              <FileText size={13} className="text-accenttext" />
              <span>Resume</span>
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                onBackToHome();
                setTimeout(() => {
                  document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                }, 100);
              }}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-lime text-black text-xs font-semibold hover:brightness-110 active:scale-95 transition-all shadow-xs"
            >
              <span>Let&apos;s Connect</span>
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 sm:px-10 pt-10 sm:pt-16 space-y-16 sm:space-y-24">
        {/* Editorial Hero Block */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-lime/30 bg-lime/10 text-xs font-medium uppercase tracking-wider text-accenttext m3-elevation-1">
            <Compass size={13} />
            <span>Product Designer &amp; Problem Solver</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-ink leading-[1.08]">
            An engineering spine, rhythm in craft, and a relentless focus on <Serif>calm usability</Serif>.
          </h1>

          <p className="text-base sm:text-xl text-mut leading-relaxed max-w-3xl font-light">
            I’m Vinay Sawant — a Product Designer based in Maharashtra, India. I operate at the intersection of quantitative behavioral research, structured design systems, and frontend code reality.
          </p>
        </motion.div>

        {/* Studio Portrait & Editorial Bio Card (Clean — No LinkedIn Verified Widget) */}
        <FadeUp y={32}>
          <div className="grid md:grid-cols-12 gap-6 items-stretch">
            <div className="md:col-span-5 relative rounded-3xl border border-line overflow-hidden bg-surface/50 min-h-[300px] flex items-center justify-center p-4 m3-elevation-1">
              <img
                src="/images/portrait_studio.jpg"
                alt="Vinay Sawant — Product Designer"
                className="w-full h-auto max-h-[340px] object-cover rounded-2xl select-none"
              />
            </div>

            <div className="md:col-span-7 rounded-3xl border border-line bg-surface/50 p-7 sm:p-9 flex flex-col justify-between gap-6 m3-elevation-1">
              <div className="space-y-4">
                <div className="text-xs font-mono uppercase tracking-wider text-accenttext font-semibold">
                  Bio &amp; Focus
                </div>
                <h2 className="text-2xl sm:text-3xl font-semibold text-ink tracking-tight leading-snug">
                  Designing clear digital products backed by engineering reality.
                </h2>
                <p className="text-sm text-mut leading-relaxed font-light">
                  With a B.Tech in Information Technology and hands-on product experience, I design user flows, structured design systems, and high-density B2B/consumer interfaces that engineering teams can ship without friction.
                </p>
              </div>

              <div className="pt-4 border-t border-line/60 flex flex-wrap items-center justify-between gap-3 text-xs">
                <span className="font-mono text-faint">{EMAIL} · Maharashtra, India</span>
                <div className="flex items-center gap-3">
                  {SOCIALS.slice(0, 2).map((s) => (
                    <a
                      key={s.name}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accenttext hover:underline font-medium"
                    >
                      {s.name} ↗
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </FadeUp>

        {/* SECTION: WHAT I DO */}
        <FadeUp y={32} className="space-y-8">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-line bg-surface/70 text-xs font-mono uppercase tracking-wider text-accenttext">
              <Sparkles size={12} />
              <span>Core Specializations</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-semibold tracking-tight text-ink">
              What I Do
            </h2>
            <p className="text-sm sm:text-base text-mut font-light leading-relaxed max-w-2xl">
              Disciplined craft that spans the entire product lifecycle—from early messy ambiguity to production-grade implementation.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {whatIDo.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.num}
                  className="p-6 sm:p-7 rounded-3xl border border-line bg-surface/50 space-y-3 m3-elevation-1 hover:border-lime/40 hover:bg-surface/80 transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-xl border border-line bg-surface flex items-center justify-center text-accenttext">
                      <Icon size={18} />
                    </div>
                    <span className="font-mono text-xs font-semibold text-faint">{item.num}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-ink">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-mut leading-relaxed font-light">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </FadeUp>

        {/* SECTION: TECHNICAL UNDERSTANDING */}
        <FadeUp y={32} className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-line bg-bg text-xs font-mono text-accenttext">
                <Terminal size={13} />
                <span>Technical Understanding</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-semibold text-ink">
                Engineering Context That Shapes Better Design
              </h2>
            </div>
            <span className="text-xs font-mono text-faint">B.Tech in Information Technology</span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: Code2, label: 'Frontend', items: 'HTML, CSS, JavaScript, Responsive Layouts' },
              { icon: Server, label: 'Backend', items: 'Python, FastAPI, REST APIs, Authentication' },
              { icon: Database, label: 'Database', items: 'PostgreSQL, MySQL, Data Relationships' },
              { icon: GitBranch, label: 'Development', items: 'Git, GitHub, Postman, VS Code' },
              { icon: Workflow, label: 'Product Architecture', items: 'User Flows, Role-Based Systems, Workflow Design' },
              { icon: Layers, label: 'Design Handoff', items: 'Component Structure, Design Systems, Developer Collaboration' }
            ].map((tech) => {
              const Icon = tech.icon;
              return (
                <div
                  key={tech.label}
                  className="p-5 rounded-3xl border border-line bg-surface/50 space-y-2.5 m3-elevation-1 hover:border-lime/40 transition-colors"
                >
                  <div className="flex items-center gap-2 text-sm font-semibold text-ink">
                    <Icon size={15} className="text-accenttext" />
                    <span>{tech.label}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-mut font-light leading-relaxed">
                    {tech.items}
                  </p>
                </div>
              );
            })}
          </div>
        </FadeUp>

        {/* SECTION: BEYOND THE SCREEN (COMPACT + VISUAL) */}
        <FadeUp y={32}>
          <div className="rounded-3xl border border-line bg-surface/40 overflow-hidden m3-elevation-1 grid md:grid-cols-12 items-stretch">
            <div className="md:col-span-5 bg-bg">
              <img
                src="/images/beyond_tabla_nature.jpg"
                alt="Tabla, morning yoga and Sahyadri green hills"
                className="w-full h-full min-h-[220px] object-cover block"
                loading="lazy"
              />
            </div>

            <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-center space-y-3.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-lime/30 bg-lime/10 text-[11px] font-mono uppercase tracking-wider text-accenttext w-fit">
                <Leaf size={12} />
                <span>Beyond the Screen</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-semibold text-ink">
                Tabla, Yoga, Meditation &amp; Nature
              </h3>

              <p className="text-xs sm:text-sm text-mut font-light leading-relaxed">
                Outside of Figma and product workflows, I play the <strong className="text-ink font-medium">Tabla</strong>, practice daily <strong className="text-ink font-medium">Yoga and Meditation</strong>, and love spending quiet mornings around trees and mountains. Classical rhythm builds patience and pacing for interaction design, while meditation, yoga, and nature keep my mind calm when simplifying complex problems.
              </p>
            </div>
          </div>
        </FadeUp>

        {/* SECTION: CERTIFICATIONS */}
        <FadeUp y={32} className="space-y-6">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-accenttext font-semibold">
            <Award size={14} />
            <span>Certifications</span>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            {CERTIFICATIONS.map((cert) => (
              <div
                key={cert.id}
                className="rounded-3xl border border-line bg-surface/50 overflow-hidden flex flex-col justify-between m3-elevation-1"
              >
                {cert.image ? (
                  <div className="aspect-[16/10] bg-bg overflow-hidden border-b border-line/60">
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="w-full h-full object-cover block"
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <div className="aspect-[16/10] bg-gradient-to-br from-surface via-bg to-lime/[0.06] border-b border-line/60 p-4 flex flex-col justify-between">
                    <Award size={18} className="text-accenttext" />
                    <span className="text-[11px] font-mono text-faint">{cert.placeholderNote}</span>
                  </div>
                )}
                <div className="p-4 space-y-1">
                  <div className="text-[11px] font-mono text-faint">{cert.issuer} · {cert.date}</div>
                  <div className="text-xs sm:text-sm font-semibold text-ink leading-snug">{cert.title}</div>
                </div>
              </div>
            ))}
          </div>
        </FadeUp>

        {/* SECTION: TOOLS & WORKFLOW STACK */}
        <FadeUp y={32} className="space-y-8">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-line bg-surface/70 text-xs font-mono uppercase tracking-wider text-accenttext">
              <Cpu size={12} />
              <span>Proficiency &amp; Toolkit</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-semibold tracking-tight text-ink">
              Tools I Master &amp; Use Daily
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TOOLS.map((category) => (
              <div
                key={category.category}
                className="p-5 sm:p-6 rounded-3xl border border-line bg-surface/40 space-y-3 m3-elevation-1"
              >
                <h4 className="text-xs font-mono uppercase tracking-wider text-accenttext font-semibold">
                  {category.category}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {category.items.map((tool) => (
                    <span
                      key={tool}
                      className="px-3 py-1.5 rounded-full border border-line bg-surface/80 text-xs text-ink font-medium"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </FadeUp>

        {/* Bottom CTA to explore selected work */}
        <FadeUp y={32}>
          <div className="p-8 sm:p-10 rounded-3xl border border-line bg-surface/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 m3-elevation-1">
            <div className="space-y-1">
              <h3 className="text-xl sm:text-2xl font-semibold text-ink">Ready to explore my work?</h3>
              <p className="text-xs sm:text-sm text-mut font-light">
                Check out the full case studies across consumer mobile, healthcare, and enterprise field SaaS.
              </p>
            </div>

            <div className="flex items-center gap-3">
              {onOpenWorkPage && (
                <button
                  onClick={onOpenWorkPage}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-lime text-black font-semibold text-xs hover:brightness-105 active:scale-95 transition-all cursor-pointer shadow-xs"
                >
                  <span>Explore Case Studies</span>
                  <ArrowUpRight size={14} />
                </button>
              )}
            </div>
          </div>
        </FadeUp>
      </div>
    </article>
  );
}
