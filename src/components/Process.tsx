import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { process } from '../data/content';

gsap.registerPlugin(ScrollTrigger);

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const path = lineRef.current;
      if (path) {
        const length = path.getTotalLength();
        path.style.strokeDasharray = String(length);
        path.style.strokeDashoffset = String(length);
        gsap.to(path, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: '.process-timeline',
            start: 'top 70%',
            end: 'bottom 70%',
            scrub: 0.6,
          },
        });
      }

      gsap.from('.process-step', {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.2,
        scrollTrigger: { trigger: '.process-timeline', start: 'top 75%' },
      });

      gsap.from('.process-header', {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 75%' },
      });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="process" className="relative py-30 grain-overlay">
      <div className="container-wide">
        <div className="process-header mx-auto mb-20 max-w-3xl text-center">
          <span className="section-label justify-center">
            <span className="h-px w-8 bg-accent" />
            How We Work
          </span>
          <h2 className="text-section-title text-ink-primary text-balance">
            A process built on{' '}
            <span className="italic text-accent">trust.</span>
          </h2>
          <p className="mt-6 text-body-lg text-ink-muted text-pretty">
            Four phases, each with clear deliverables. You always know where we are and what comes
            next.
          </p>
        </div>

        <div className="process-timeline relative">
          {/* SVG line - desktop */}
          <svg
            className="absolute left-1/2 top-0 h-full -translate-x-1/2 hidden lg:block"
            width="2"
            height="100%"
            viewBox="0 0 2 1000"
            preserveAspectRatio="none"
            fill="none"
          >
            <path
              ref={lineRef}
              d="M1 0 L1 1000"
              stroke="rgb(var(--color-accent))"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>

          {/* Mobile line */}
          <div className="absolute left-6 top-0 h-full w-px bg-ink-muted/10 lg:hidden" />

          <div className="space-y-16 lg:space-y-24">
            {process.map((item, i) => {
              const Icon = item.icon;
              const isLeft = i % 2 === 0;
              return (
                <div
                  key={item.step}
                  className={`process-step relative flex flex-col gap-6 lg:flex-row lg:items-center ${
                    isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                >
                  <div className="flex-1 pl-16 lg:pl-0">
                    <div className={`lg:max-w-md ${isLeft ? 'lg:text-right' : 'lg:text-left'}`}>
                      <span className="font-serif text-6xl text-accent/30">{item.step}</span>
                      <h3 className="mt-2 text-card-title font-serif text-ink-primary">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-ink-muted text-pretty">{item.description}</p>
                    </div>
                  </div>

                  <div className="absolute left-6 top-2 lg:relative lg:left-auto lg:top-auto">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-accent bg-bg-dominant text-accent">
                      <Icon className="h-5 w-5" strokeWidth={1.5} />
                    </div>
                  </div>

                  <div className="hidden flex-1 lg:block" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
