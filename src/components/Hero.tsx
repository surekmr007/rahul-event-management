import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, Star } from 'lucide-react';
import { scrollToId } from '../hooks/useSmoothScroll';
import { useMagnetic } from '../hooks/useMagnetic';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const midRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const ctaRef = useMagnetic<HTMLButtonElement>(0.25);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.from('.hero-line', {
        yPercent: 100,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.out',
        stagger: 0.15,
        delay: 0.3,
      });
      gsap.from('.hero-fade', {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.1,
        delay: 0.8,
      });

      gsap.to(bgRef.current, {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top top', end: 'bottom top', scrub: true },
      });
      gsap.to(midRef.current, {
        yPercent: 18,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top top', end: 'bottom top', scrub: true },
      });
      gsap.to(contentRef.current, {
        yPercent: -15,
        opacity: 0.3,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top top', end: 'bottom top', scrub: true },
      });
      gsap.to(overlayRef.current, {
        opacity: 1,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top top', end: 'bottom top', scrub: true },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="hero" className="relative h-[100svh] overflow-hidden grain-overlay">
      {/* Background layer */}
      <div ref={bgRef} className="absolute inset-0 will-parallax">
        <img
          src="https://images.pexels.com/photos/2606877/pexels-photo-2606877.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Elegant event hall with warm lighting"
          className="h-full w-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
      </div>

      {/* Gradient overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-gradient-to-b from-bg-dominant/40 via-bg-dominant/30 to-bg-dominant"
        style={{ opacity: 0.6 }}
      />

      {/* Mid layer: floating decorative elements */}
      <div ref={midRef} className="absolute inset-0 will-parallax pointer-events-none">
        <div className="absolute top-[20%] right-[8%] h-32 w-32 rounded-full border border-accent/20 animate-float" />
        <div
          className="absolute bottom-[25%] left-[6%] h-20 w-20 rounded-full border border-accent/15 animate-float"
          style={{ animationDelay: '2s' }}
        />
        <div className="absolute top-[35%] left-[15%] h-2 w-2 rounded-full bg-accent/40 animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-[40%] right-[20%] h-2 w-2 rounded-full bg-accent/40 animate-float" style={{ animationDelay: '3s' }} />
      </div>

      {/* Content layer */}
      <div
        ref={contentRef}
        className="relative z-10 flex h-full flex-col items-center justify-center text-center will-parallax"
      >
        <div className="hero-fade mb-6 flex items-center gap-2 rounded-full border border-ink-muted/20 px-4 py-1.5 backdrop-blur-sm">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-3 w-3 fill-accent text-accent" />
            ))}
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">
            Voted Best Event Studio 2025
          </span>
        </div>

        <h1 className="overflow-hidden px-4 text-hero font-serif text-ink-primary text-balance">
          <span className="block overflow-hidden">
            <span className="hero-line inline-block">Events that become</span>
          </span>
          <span className="block overflow-hidden">
            <span className="hero-line inline-block italic text-accent">memories.</span>
          </span>
        </h1>

        <p className="hero-fade mt-8 max-w-xl px-6 text-body-lg text-ink-muted text-pretty">
          We are a luxury event management studio crafting unforgettable experiences through
          meticulous design and flawless execution.
        </p>

        <div className="hero-fade mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <button ref={ctaRef} onClick={() => scrollToId('contact')} className="btn-primary">
            Plan Your Event
          </button>
          <button onClick={() => scrollToId('portfolio')} className="btn-ghost">
            View Portfolio
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => scrollToId('about')}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-2 text-ink-muted transition-colors hover:text-accent"
        aria-label="Scroll to explore"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.2em]">Scroll</span>
        <ArrowDown className="h-4 w-4 animate-bounce-slow" strokeWidth={1.5} />
      </button>
    </section>
  );
}
