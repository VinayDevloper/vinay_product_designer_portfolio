import React, { useRef, useEffect, useState, useCallback } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  AnimatePresence
} from 'framer-motion';
import { EMAIL, IMAGES } from '../data/content';
import { Serif } from './Shared';
import { SocialIcons } from './Navbar';
import { ArrowDown, Mail } from 'lucide-react';

const ease: [number, number, number, number] = [0.2, 0, 0, 1];
const MAX_AUTO_HINTS = 3;

type ExpressionMode = 'curious' | 'hint-below' | 'warm-smile';

const Line: React.FC<{ children: React.ReactNode; delay: number }> = ({ children, delay }) => (
  <span className="block overflow-hidden">
    <motion.span
      initial={{ y: "110%" }}
      animate={{ y: 0 }}
      transition={{ duration: 0.85, delay, ease }}
      className="block"
    >
      {children}
    </motion.span>
  </span>
);

const HeroActions: React.FC<{
  onCopyEmail: () => void;
  onExploreHover?: (hovering: boolean) => void;
  className?: string;
}> = ({ onCopyEmail, onExploreHover, className = "" }) => (
  <div className={className}>
    {/* M3 Action Buttons: Filled primary button + Outlined button */}
    <div className="flex flex-wrap items-center gap-3 mb-5">
      <a
        href="#work"
        onClick={(e) => {
          e.preventDefault();
          document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" });
        }}
        onMouseEnter={() => onExploreHover?.(true)}
        onMouseLeave={() => onExploreHover?.(false)}
        data-testid="hero-explore-work"
        className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-lime text-black font-semibold text-xs sm:text-sm hover:brightness-105 active:scale-95 transition-all duration-200 m3-elevation-1 hover:m3-elevation-2"
      >
        <span>Explore Selected Work</span>
        <ArrowDown size={14} className="transition-transform group-hover:translate-y-0.5" />
      </a>

      <button
        type="button"
        data-testid="hero-copy-email"
        onClick={onCopyEmail}
        className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-line bg-surface/60 backdrop-blur-md text-xs sm:text-sm font-medium text-mut hover:text-ink hover:border-lime/40 hover:bg-surface active:scale-95 transition-all duration-200 cursor-pointer"
      >
        <Mail size={14} className="text-accenttext" />
        <span>{EMAIL}</span>
      </button>
    </div>

    {/* Location badge & social links */}
    <div className="flex flex-wrap items-center gap-3 sm:gap-5 pt-1">
      <div className="inline-flex items-center gap-2 text-xs font-mono text-mut">
        <span className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse" />
        <span>Based in Maharashtra, India</span>
      </div>
      <span className="text-line hidden sm:inline">|</span>
      <SocialIcons />
    </div>
  </div>
);

export default function Hero({
  theme = 'dark',
  onCopyEmail
}: {
  theme?: 'dark' | 'light';
  onCopyEmail: () => void;
}): React.JSX.Element {
  const ref = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const isLight = theme === 'light';

  const [portraitReady, setPortraitReady] = useState(false);
  const [expression, setExpression] = useState<ExpressionMode>('curious');
  const [showCue, setShowCue] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);
  const [isHoveringPortrait, setIsHoveringPortrait] = useState(false);
  const [isHoveringExplore, setIsHoveringExplore] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Refs for natural, non-looping hint orchestration (max 3 times)
  const hintCountRef = useRef<number>(0);
  const hintActiveRef = useRef<boolean>(false);
  const lastHintEndedAtRef = useRef<number>(0);
  const hasMovedSinceLastHintRef = useRef<boolean>(true);
  const lastPointerPosRef = useRef<{ x: number; y: number } | null>(null);
  const holdTimerRef = useRef<number | null>(null);
  const cueDelayTimerRef = useRef<number | null>(null);
  const hintEndTimerRef = useRef<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const txtY = useTransform(scrollYProgress, [0, 1], [0, -12]);

  // Smooth pupil-only tracking motion values (body stays completely stationary)
  const normX = useMotionValue(0);
  const normY = useMotionValue(0);

  const pupilX = useSpring(
    useTransform(normX, [-1, 1], [-21, 17]),
    { stiffness: 185, damping: 24, mass: 0.48 }
  );
  const pupilY = useSpring(
    useTransform(normY, [-1, 1], [-15, 16]),
    { stiffness: 185, damping: 24, mass: 0.48 }
  );

  // Mark portrait ready immediately if already cached/complete, or decode cleanly
  useEffect(() => {
    const el = imgRef.current;
    if (el && el.complete && el.naturalWidth > 0) {
      setPortraitReady(true);
    }
  }, []);

  // Respect reduced motion preference
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const clearHintTimers = useCallback(() => {
    if (holdTimerRef.current !== null) {
      window.clearTimeout(holdTimerRef.current);
      holdTimerRef.current = null;
    }
    if (cueDelayTimerRef.current !== null) {
      window.clearTimeout(cueDelayTimerRef.current);
      cueDelayTimerRef.current = null;
    }
    if (hintEndTimerRef.current !== null) {
      window.clearTimeout(hintEndTimerRef.current);
      hintEndTimerRef.current = null;
    }
  }, []);

  const triggerNaturalDownwardHint = useCallback(() => {
    if (prefersReducedMotion) return;
    if (hintActiveRef.current) return;
    if (hintCountRef.current >= MAX_AUTO_HINTS) return;
    if (!hasMovedSinceLastHintRef.current && hintCountRef.current > 0) return;

    const now = Date.now();
    if (lastHintEndedAtRef.current > 0 && now - lastHintEndedAtRef.current < 4500) {
      return;
    }

    // Only trigger when Hero is actually visible in the viewport
    if (window.scrollY > window.innerHeight * 0.6) return;

    hintActiveRef.current = true;
    hintCountRef.current += 1;
    hasMovedSinceLastHintRef.current = false;

    // 1. Eyes naturally glance downward toward the case studies first
    setExpression('hint-below');
    normX.set(-0.38);
    normY.set(0.94);

    // 2. Cue gently appears 160ms after the eyes look down
    cueDelayTimerRef.current = window.setTimeout(() => {
      setShowCue(true);
    }, 160);

    // 3. Hold calmly, then settle back naturally without looping
    hintEndTimerRef.current = window.setTimeout(() => {
      hintActiveRef.current = false;
      lastHintEndedAtRef.current = Date.now();
      setShowCue(false);
      setExpression(isHoveringPortrait ? 'warm-smile' : 'curious');
      if (!isHoveringPortrait) {
        normX.set(0);
        normY.set(0.08);
      }
    }, 2700);
  }, [prefersReducedMotion, normX, normY, isHoveringPortrait]);

  const scheduleHoldHint = useCallback(
    (delayMs: number) => {
      if (prefersReducedMotion) return;
      if (hintCountRef.current >= MAX_AUTO_HINTS) return;
      if (hintActiveRef.current) return;
      if (!hasMovedSinceLastHintRef.current && hintCountRef.current > 0) return;

      if (holdTimerRef.current !== null) {
        window.clearTimeout(holdTimerRef.current);
      }
      holdTimerRef.current = window.setTimeout(() => {
        triggerNaturalDownwardHint();
      }, delayMs);
    },
    [prefersReducedMotion, triggerNaturalDownwardHint]
  );

  // Natural eye blink cadence
  useEffect(() => {
    if (prefersReducedMotion) return;
    let blinkTimeout: number | undefined;
    const interval = window.setInterval(() => {
      setIsBlinking(true);
      blinkTimeout = window.setTimeout(() => setIsBlinking(false), 140);
    }, 3800);
    return () => {
      window.clearInterval(interval);
      if (blinkTimeout) window.clearTimeout(blinkTimeout);
    };
  }, [prefersReducedMotion]);

  // Trigger initial gentle downward hint once after landing if user holds cursor steady
  useEffect(() => {
    if (prefersReducedMotion) return;
    scheduleHoldHint(2100);
    return () => clearHintTimers();
  }, [prefersReducedMotion, scheduleHoldHint, clearHintTimers]);

  // Hovering "Explore Selected Work" gives immediate subtle downward gaze
  useEffect(() => {
    if (isHoveringExplore) {
      setExpression('hint-below');
      normX.set(-0.45);
      normY.set(0.95);
      if (hintCountRef.current < MAX_AUTO_HINTS && !hintActiveRef.current) {
        triggerNaturalDownwardHint();
      }
    } else if (!hintActiveRef.current) {
      setExpression(isHoveringPortrait ? 'warm-smile' : 'curious');
    }
  }, [isHoveringExplore, isHoveringPortrait, normX, normY, triggerNaturalDownwardHint]);

  // Global cursor tracking: follows mouse smoothly; holding mouse still triggers natural hint (up to 3 times)
  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      const prevPos = lastPointerPosRef.current;
      const dist = prevPos
        ? Math.hypot(e.clientX - prevPos.x, e.clientY - prevPos.y)
        : 999;

      // Ignore tiny sub-10px trackpad micro-drift while holding steady
      if (dist < 10) return;

      lastPointerPosRef.current = { x: e.clientX, y: e.clientY };

      // Purposeful movement unlocks next natural hold-hint (if < 3 used)
      if (dist > 22) {
        hasMovedSinceLastHintRef.current = true;
      }

      // If user actively moves away during an auto-hint, smoothly return gaze to pointer
      if (hintActiveRef.current && dist > 28) {
        if (cueDelayTimerRef.current !== null) window.clearTimeout(cueDelayTimerRef.current);
        if (hintEndTimerRef.current !== null) window.clearTimeout(hintEndTimerRef.current);
        hintActiveRef.current = false;
        lastHintEndedAtRef.current = Date.now();
        setShowCue(false);
      }

      const el = portraitRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width * 0.5;
      const cy = rect.top + rect.height * 0.36;

      const dx = (e.clientX - cx) / Math.max(window.innerWidth * 0.42, 260);
      const dy = (e.clientY - cy) / Math.max(window.innerHeight * 0.42, 220);

      if (!isHoveringExplore && !hintActiveRef.current) {
        normX.set(Math.max(-1, Math.min(1, dx)));
        normY.set(Math.max(-1, Math.min(1, dy)));
        setExpression(isHoveringPortrait ? 'warm-smile' : 'curious');
      }

      // When user stops and holds the mouse steady, trigger next natural hint (quicker on portrait hover)
      if (!isHoveringExplore && hintCountRef.current < MAX_AUTO_HINTS) {
        scheduleHoldHint(isHoveringPortrait ? 900 : 1850);
      }
    };

    const handleMouseLeave = () => {
      if (holdTimerRef.current !== null) {
        window.clearTimeout(holdTimerRef.current);
      }
      if (!hintActiveRef.current) {
        normX.set(0);
        normY.set(0.08);
        setExpression('curious');
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [prefersReducedMotion, normX, normY, isHoveringExplore, isHoveringPortrait, scheduleHoldHint]);

  const showWarmSmile = expression === 'warm-smile' || expression === 'hint-below';

  return (
    <section
      id="home"
      ref={ref}
      className="relative flex flex-col justify-start pt-24 sm:pt-28 md:pt-32 lg:pt-36 pb-8 sm:pb-12 px-6 sm:px-12 lg:px-24 overflow-hidden"
    >
      <div className="w-full grid md:grid-cols-12 gap-6 lg:gap-10 items-start">
        {/* Left Column: Headline, Bio, and Desktop CTAs */}
        <motion.div style={{ y: txtY }} className="md:col-span-7 order-1 flex flex-col justify-start">
          <h1
            data-testid="hero-headline"
            className="text-3xl sm:text-5xl lg:text-[3.8rem] xl:text-[4.2rem] leading-[1.04] tracking-tighter font-semibold mb-4 sm:mb-5 text-ink"
          >
            <Line delay={0.1}>Turning complex</Line>
            <Line delay={0.22}>problems into</Line>
            <Line delay={0.34}>
              <Serif>calm, intuitive</Serif>&nbsp;digital
            </Line>
            <Line delay={0.46}>products.</Line>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55, ease }}
            className="text-sm sm:text-base lg:text-lg leading-relaxed text-mut max-w-xl mb-4 sm:mb-6 font-light"
          >
            I’m Vinay Sawant — Product Designer bridging user research, systems thinking, and engineering reality. Crafting intuitive consumer mobile apps, enterprise SaaS, and scalable design systems that users love and developers enjoy building.
          </motion.p>

          {/* Action CTAs for Tablet and Desktop */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7, ease }}
            className="hidden md:block"
          >
            <HeroActions
              onCopyEmail={onCopyEmail}
              onExploreHover={setIsHoveringExplore}
            />
          </motion.div>
        </motion.div>

        {/* Right Column: Unified Expressive Character Portrait across Both Dark & Light Themes */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.25, ease }}
          className="md:col-span-5 order-2 flex flex-col items-center md:items-end justify-start relative w-full pt-1 md:pt-0"
        >
          {/* Warm dark-mode rim halo behind the character so hair & outlines pop cleanly on #050505 */}
          <div
            className={`absolute -inset-2 sm:-inset-4 rounded-full bg-gradient-to-tr from-lime/18 via-amber-400/12 to-transparent blur-[65px] pointer-events-none transition-opacity duration-300 ${
              isLight ? 'opacity-0' : 'opacity-100'
            }`}
          />

          {/* Stationary Portrait Frame (Consistent scale & zero box movement across both themes) */}
          <div
            ref={portraitRef}
            data-testid="hero-portrait"
            onMouseEnter={() => {
              setIsHoveringPortrait(true);
              if (!hintActiveRef.current) {
                setExpression('warm-smile');
              }
              if (hintCountRef.current < MAX_AUTO_HINTS) {
                hasMovedSinceLastHintRef.current = true;
                scheduleHoldHint(850);
              }
            }}
            onMouseLeave={() => {
              setIsHoveringPortrait(false);
              if (!hintActiveRef.current) {
                setExpression('curious');
              }
            }}
            className="relative w-full max-w-[250px] sm:max-w-[290px] md:max-w-[330px] lg:max-w-[365px] xl:max-w-[385px] flex items-end justify-center md:justify-end"
          >
            <div
              className="relative w-full aspect-[1176/1337] select-none pointer-events-none"
              style={{
                maskImage: "linear-gradient(to bottom, black 0%, black 85%, transparent 99%)",
                WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 85%, transparent 99%)"
              }}
            >
              {/* Soft silhouette placeholder while WebP downloads so eyes never float alone */}
              {!portraitReady && (
                <div
                  aria-hidden="true"
                  className="absolute inset-x-8 top-6 bottom-8 rounded-[42%] bg-gradient-to-b from-lime/12 via-surface/50 to-transparent animate-pulse"
                />
              )}

              <picture className="block w-full h-full">
                <source srcSet={IMAGES.portraitLight} type="image/webp" />
                <img
                  ref={imgRef}
                  src={IMAGES.portraitLightFallback}
                  alt="Vinay Sawant — Illustrated Character Portrait"
                  width={880}
                  height={1000}
                  loading="eager"
                  decoding="sync"
                  fetchPriority="high"
                  referrerPolicy="no-referrer"
                  onLoad={() => setPortraitReady(true)}
                  onError={(e) => {
                    if (e.currentTarget.src !== window.location.origin + IMAGES.portraitLightFallback) {
                      e.currentTarget.src = IMAGES.portraitLightFallback;
                    }
                    setPortraitReady(true);
                  }}
                  className={`w-full h-full object-contain object-bottom block transition-opacity duration-300 ${
                    portraitReady ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </picture>

              {/* Synchronized SVG Face Expression Layer (only shown once portrait image is ready) */}
              <svg
                viewBox="0 0 1176 1337"
                className={`absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-300 ${
                  portraitReady ? 'opacity-100' : 'opacity-0'
                }`}
                aria-hidden="true"
              >
                <defs>
                  <filter id="sclera-soft" x="-40%" y="-40%" width="180%" height="180%">
                    <feGaussianBlur stdDeviation="2.8" />
                  </filter>
                  <filter id="blush-soft" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="10" />
                  </filter>
                  <clipPath id="left-eye-clip">
                    <ellipse cx="492" cy="427" rx="31" ry="26" />
                  </clipPath>
                  <clipPath id="right-eye-clip">
                    <ellipse cx="630" cy="408" rx="31" ry="26" />
                  </clipPath>
                </defs>

                {/* Softly cover static pupils with exact sclera tone (#fde0bc) */}
                <ellipse
                  cx="510"
                  cy="429"
                  rx="18"
                  ry="25"
                  fill="#fde0bc"
                  filter="url(#sclera-soft)"
                />
                <ellipse
                  cx="627"
                  cy="407"
                  rx="16"
                  ry="22"
                  fill="#fde0bc"
                  filter="url(#sclera-soft)"
                />

                {/* Warm cheek glow during warm-smile / hint-below expression */}
                <motion.g
                  animate={{ opacity: showWarmSmile ? 0.28 : 0.08 }}
                  transition={{ duration: 0.45 }}
                >
                  <ellipse cx="468" cy="472" rx="22" ry="12" fill="#f06b42" filter="url(#blush-soft)" />
                  <ellipse cx="662" cy="450" rx="22" ry="12" fill="#f06b42" filter="url(#blush-soft)" />
                </motion.g>

                {/* Live cursor-following Left Pupil */}
                <g clipPath="url(#left-eye-clip)">
                  <motion.g style={{ x: pupilX, y: pupilY }}>
                    <ellipse cx="498" cy="427" rx="10.5" ry="15.5" fill="#140e0a" />
                    <circle cx="494.5" cy="421" r="2.7" fill="#fde0bc" opacity="0.92" />
                  </motion.g>

                  {/* Happy lower-eyelid smile squint */}
                  <motion.path
                    d="M 455 446 Q 492 434 528 446 L 528 470 L 455 470 Z"
                    fill="#fdb975"
                    animate={{
                      y: expression === 'warm-smile' ? -5 : 14,
                      opacity: expression === 'warm-smile' ? 0.92 : 0
                    }}
                    transition={{ duration: 0.25 }}
                  />

                  {/* Natural upper-eyelid blink */}
                  <motion.rect
                    x="456"
                    y="394"
                    width="74"
                    height="68"
                    fill="#fdb975"
                    style={{ originY: 0, transformBox: 'fill-box' }}
                    animate={{ scaleY: isBlinking ? 1 : 0 }}
                    transition={{ duration: 0.08 }}
                  />
                </g>

                {/* Live cursor-following Right Pupil */}
                <g clipPath="url(#right-eye-clip)">
                  <motion.g style={{ x: pupilX, y: pupilY }}>
                    <ellipse cx="628" cy="408" rx="10" ry="15" fill="#140e0a" />
                    <circle cx="624.5" cy="402" r="2.5" fill="#fde0bc" opacity="0.92" />
                  </motion.g>

                  {/* Happy lower-eyelid smile squint */}
                  <motion.path
                    d="M 594 427 Q 630 415 666 427 L 666 452 L 594 452 Z"
                    fill="#fdb975"
                    animate={{
                      y: expression === 'warm-smile' ? -5 : 14,
                      opacity: expression === 'warm-smile' ? 0.92 : 0
                    }}
                    transition={{ duration: 0.25 }}
                  />

                  {/* Natural upper-eyelid blink */}
                  <motion.rect
                    x="594"
                    y="376"
                    width="74"
                    height="68"
                    fill="#fdb975"
                    style={{ originY: 0, transformBox: 'fill-box' }}
                    animate={{ scaleY: isBlinking ? 1 : 0 }}
                    transition={{ duration: 0.08 }}
                  />
                </g>

                {/* Subtle warm mouth smile corner accent */}
                <motion.path
                  d="M 604 560 Q 614 557 620 550"
                  fill="none"
                  stroke="#2a160c"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  animate={{ opacity: showWarmSmile ? 0.75 : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </svg>
            </div>

            {/* Natural, non-looping clickable downward cue (appears up to 3 times on mouse hold) */}
            <AnimatePresence>
              {showCue && (
                <motion.button
                  type="button"
                  initial={{ opacity: 0, y: 6, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.96 }}
                  transition={{ duration: 0.28, ease }}
                  onClick={() => {
                    setShowCue(false);
                    hintActiveRef.current = false;
                    document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hidden sm:inline-flex items-center gap-1.5 absolute bottom-2 left-0 px-3.5 py-1.5 rounded-full bg-surface border border-line text-xs font-medium text-ink hover:border-lime/50 hover:text-accenttext transition-colors cursor-pointer m3-elevation-2 z-10"
                >
                  <span>Case studies below</span>
                  <ArrowDown size={12} className="text-accenttext" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {/* Action CTAs for Mobile Screens */}
          <div className="block md:hidden w-full mt-5">
            <HeroActions
              onCopyEmail={onCopyEmail}
              onExploreHover={setIsHoveringExplore}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
