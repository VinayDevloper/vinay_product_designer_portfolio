import React, { useState, useEffect, useRef, useCallback } from 'react';
import { TESTIMONIALS, TestimonialItem } from '../data/content';
import { FadeUp } from './Shared';
import { Linkedin, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

function AvatarWithFallback({ item }: { item: TestimonialItem }): React.JSX.Element {
  const [failed, setFailed] = useState(false);
  const initials = item.name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  if (failed) {
    return (
      <div
        aria-label={item.name}
        className="w-12 h-12 rounded-full border border-line ring-2 ring-lime/20 bg-lime/15 text-accenttext font-semibold text-xs flex items-center justify-center shrink-0"
      >
        {initials}
      </div>
    );
  }

  return (
    <img
      src={item.avatar}
      alt={item.name}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className="w-12 h-12 rounded-full object-cover object-top border border-line ring-2 ring-lime/20 bg-white shrink-0"
      loading="lazy"
    />
  );
}

const SPEED_PX_PER_SEC = 42;

export default function Testimonials(): React.JSX.Element {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const firstSetRef = useRef<HTMLDivElement | null>(null);
  const offsetRef = useRef<number>(0);
  const targetNudgeRef = useRef<number | null>(null);
  const isPausedRef = useRef<boolean>(false);
  const touchStartX = useRef<number | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);

  const getSingleSetWidth = useCallback((): number => {
    if (!firstSetRef.current) return 0;
    return firstSetRef.current.getBoundingClientRect().width;
  }, []);

  const getCardStride = useCallback((): number => {
    const setWidth = getSingleSetWidth();
    if (!setWidth) return 384;
    return setWidth / TESTIMONIALS.length;
  }, [getSingleSetWidth]);

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(motionQuery.matches);
    const onMotionChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    motionQuery.addEventListener('change', onMotionChange);
    return () => motionQuery.removeEventListener('change', onMotionChange);
  }, []);

  useEffect(() => {
    let rafId = 0;
    let lastTime = performance.now();
    let lastReportedIdx = -1;

    const tick = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      const singleSetWidth = getSingleSetWidth();

      if (singleSetWidth > 0 && trackRef.current) {
        if (targetNudgeRef.current !== null) {
          const diff = targetNudgeRef.current - offsetRef.current;
          if (Math.abs(diff) < 0.75) {
            offsetRef.current = targetNudgeRef.current;
            targetNudgeRef.current = null;
          } else {
            offsetRef.current += diff * Math.min(1, dt * 10);
          }
        } else if (!isPausedRef.current && !prefersReducedMotion) {
          offsetRef.current += SPEED_PX_PER_SEC * dt;
        }

        // Wrap seamlessly across both duplicated sets
        if (offsetRef.current >= singleSetWidth) {
          offsetRef.current -= singleSetWidth;
          if (targetNudgeRef.current !== null) {
            targetNudgeRef.current -= singleSetWidth;
          }
        } else if (offsetRef.current < 0) {
          offsetRef.current += singleSetWidth;
          if (targetNudgeRef.current !== null) {
            targetNudgeRef.current += singleSetWidth;
          }
        }

        trackRef.current.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;

        const stride = singleSetWidth / TESTIMONIALS.length;
        const currentIdx = Math.floor((offsetRef.current + stride * 0.35) / stride) % TESTIMONIALS.length;
        if (currentIdx !== lastReportedIdx) {
          lastReportedIdx = currentIdx;
          setActiveIndex(currentIdx);
        }
      }

      rafId = window.requestAnimationFrame(tick);
    };

    rafId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(rafId);
  }, [getSingleSetWidth, prefersReducedMotion]);

  const handlePause = () => {
    isPausedRef.current = true;
  };

  const handleResume = () => {
    isPausedRef.current = false;
  };

  const handleStep = useCallback(
    (direction: 1 | -1) => {
      const stride = getCardStride();
      const base = targetNudgeRef.current !== null ? targetNudgeRef.current : offsetRef.current;
      targetNudgeRef.current = base + direction * stride;
    },
    [getCardStride]
  );

  const handleJumpTo = useCallback(
    (index: number) => {
      const stride = getCardStride();
      targetNudgeRef.current = index * stride;
    },
    [getCardStride]
  );

  const handleTouchStart = (e: React.TouchEvent) => {
    isPausedRef.current = true;
    touchStartX.current = e.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    isPausedRef.current = false;
    if (touchStartX.current === null) return;
    const endX = e.changedTouches[0]?.clientX ?? touchStartX.current;
    const diff = touchStartX.current - endX;
    touchStartX.current = null;
    if (Math.abs(diff) < 40) return;
    handleStep(diff > 0 ? 1 : -1);
  };

  const renderCard = (t: TestimonialItem, keyPrefix: string) => (
    <div
      key={`${keyPrefix}-${t.id}`}
      className="shrink-0 w-[300px] sm:w-[360px] lg:w-[390px] pr-6 flex"
      onMouseEnter={handlePause}
      onMouseLeave={handleResume}
      onFocusCapture={handlePause}
      onBlurCapture={handleResume}
    >
      <article
        data-testid={keyPrefix === 'a' ? `testimonial-${t.id}` : undefined}
        className="group relative w-full h-full rounded-3xl bg-surface/65 border border-line hover:border-lime/45 hover:bg-surface/95 transition-all duration-300 m3-elevation-1 hover:m3-elevation-2 p-6 sm:p-7 flex flex-col justify-between gap-6"
      >
        {/* Quote Badge + Narrative */}
        <div className="space-y-5">
          <div className="w-10 h-10 rounded-2xl bg-lime/12 border border-lime/25 text-accenttext flex items-center justify-center">
            <Quote size={17} className="fill-current" />
          </div>

          <p className="text-sm sm:text-[15px] leading-relaxed text-ink/90 font-light">
            “{t.quote}”
          </p>
        </div>

        {/* Author Row + LinkedIn Circle (Turns LinkedIn Blue on Hover) */}
        <div className="pt-5 border-t border-line/60 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3.5 min-w-0">
            <AvatarWithFallback item={t} />
            <div className="min-w-0">
              <h4 className="text-sm sm:text-[15px] font-semibold text-ink leading-snug truncate">
                {t.name}
              </h4>
              <p className="text-xs text-mut leading-snug mt-0.5 line-clamp-2">
                {t.role}
              </p>
            </div>
          </div>

          <a
            href={t.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${t.name} on LinkedIn`}
            title={`View ${t.name} on LinkedIn`}
            className="w-10 h-10 rounded-full border border-line bg-bg/70 text-mut hover:bg-[#0A66C2] hover:border-[#0A66C2] hover:text-white hover:scale-105 hover:shadow-[0_4px_14px_rgba(10,102,194,0.38)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A66C2] active:scale-95 transition-all duration-200 flex items-center justify-center shrink-0"
          >
            <Linkedin size={16} />
          </a>
        </div>
      </article>
    </div>
  );

  return (
    <section
      id="testimonials"
      className="px-6 sm:px-12 lg:px-24 py-14 sm:py-20 border-t border-line relative overflow-hidden bg-bg"
    >
      {/* Ambient subtle M3 glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[620px] h-[340px] bg-lime/[0.03] blur-[130px] rounded-full" />

      <div className="relative max-w-6xl mx-auto">
        {/* Centered Header */}
        <FadeUp className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-lime/30 bg-lime/10 text-accenttext text-xs font-medium m3-elevation-1">
            <Quote size={13} className="fill-current" />
            <span>Testimonials</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-ink text-balance">
            What People Say <span className="text-accenttext">About Me</span>
          </h2>

          <p className="text-sm sm:text-base text-mut font-light">
            Feedback from directors, engineers, and teammates I&apos;ve collaborated with.
          </p>
        </FadeUp>

        {/* Continuous Constant-Speed M3 Carousel */}
        <div
          role="region"
          aria-roledescription="carousel"
          aria-label="Colleague and leadership testimonials"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onKeyDown={(e) => {
            if (e.key === 'ArrowRight') {
              e.preventDefault();
              handleStep(1);
            } else if (e.key === 'ArrowLeft') {
              e.preventDefault();
              handleStep(-1);
            }
          }}
          className="relative"
        >
          {/* Soft edge fade viewport */}
          <div
            className="overflow-hidden py-2"
            style={{
              maskImage: 'linear-gradient(to right, transparent 0%, black 3%, black 97%, transparent 100%)',
              WebkitMaskImage:
                'linear-gradient(to right, transparent 0%, black 3%, black 97%, transparent 100%)'
            }}
          >
            <div ref={trackRef} className="flex items-stretch will-change-transform">
              <div ref={firstSetRef} className="flex items-stretch shrink-0">
                {TESTIMONIALS.map((t) => renderCard(t, 'a'))}
              </div>
              <div className="flex items-stretch shrink-0" aria-hidden="true">
                {TESTIMONIALS.map((t) => renderCard(t, 'b'))}
              </div>
            </div>
          </div>

          {/* M3 Pagination Dots + Prev/Next Controls (No numeric counter) */}
          <div className="mt-8 flex items-center justify-center sm:justify-between gap-4">
            <div className="hidden sm:block w-[98px]" aria-hidden="true" />

            {/* Interactive M3 Page Indicators */}
            <div className="flex items-center gap-1.5" role="tablist" aria-label="Testimonial slides">
              {TESTIMONIALS.map((t, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <button
                    key={t.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-label={`Jump to ${t.name} testimonial`}
                    onClick={() => handleJumpTo(idx)}
                    className="h-10 px-1 flex items-center justify-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime rounded-full"
                  >
                    <span
                      className={`block h-2 rounded-full transition-all duration-300 ${
                        isActive ? 'w-7 bg-lime' : 'w-2 bg-line hover:bg-mut'
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* M3 Navigation Icon Buttons */}
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => handleStep(-1)}
                aria-label="Previous testimonial"
                data-testid="testimonials-prev"
                className="w-11 h-11 rounded-full border border-line bg-surface/80 text-ink hover:border-lime/50 hover:bg-lime/10 hover:text-accenttext active:scale-95 transition-all duration-200 flex items-center justify-center cursor-pointer m3-elevation-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={() => handleStep(1)}
                aria-label="Next testimonial"
                data-testid="testimonials-next"
                className="w-11 h-11 rounded-full border border-line bg-surface/80 text-ink hover:border-lime/50 hover:bg-lime/10 hover:text-accenttext active:scale-95 transition-all duration-200 flex items-center justify-center cursor-pointer m3-elevation-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
