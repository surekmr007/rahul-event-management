import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles } from 'lucide-react';
import { stats, featureIcons } from '../data/content';
import { useCounter } from '../hooks/useCounter';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const counters = stats.map((s) => useCounter(s.value, { suffix: s.suffix }));

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.from(imageRef.current, {
        yPercent: 15,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 75%' },
      });
      gsap.from('.about-text-line', {
        yPercent: 100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: { trigger: textRef.current, start: 'top 80%' },
      });
      gsap.from('.feature-item', {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        stagger: 0.1,
        scrollTrigger: { trigger: '.feature-grid', start: 'top 85%' },
      });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="relative py-30 grain-overlay">
      <div className="container-wide">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Image side */}
          <div ref={imageRef} className="relative will-parallax">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <img
                src="https://images.pexels.com/photos/169198/pexels-photo-169198.jpeg?auto=compress&cs=tinysrgb&w=900"
                alt="Elegant table setting at an Atelier Lumière event"
                className="h-full w-full object-cover transition-transform duration-700 ease-out-expo hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-dominant/60 via-transparent to-transparent" />
            </div>
            {/* Floating accent card */}
            <div className="absolute -bottom-6 -right-4 rounded-2xl border border-ink-muted/10 bg-bg-surface/90 p-5 backdrop-blur-md sm:-right-6">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
                  <Sparkles className="h-5 w-5 text-accent" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="font-serif text-2xl text-ink-primary">14 years</p>
                  <p className="font-mono text-[10px] uppercase tracking-wider text-ink-muted">
                    Of craft
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Text side */}
          <div ref={textRef} className="flex flex-col justify-center">
            <span className="section-label">
              <span className="h-px w-8 bg-accent" />
              About the Studio
            </span>

            <h2 className="text-section-title text-ink-primary text-balance">
              <span className="block overflow-hidden">
                <span className="about-text-line inline-block">We design moments</span>
              </span>
              <span className="block overflow-hidden">
                <span className="about-text-line inline-block italic text-accent">worth remembering.</span>
              </span>
            </h2>

            <div className="mt-6 space-y-4 text-body-lg text-ink-muted text-pretty">
              <p className="overflow-hidden">
                <span className="about-text-line inline-block">
                  Founded in 2011, Atelier Lumière began as a two-person studio with a simple belief:
                  events are not logistics — they are stories told in space and time.
                </span>
              </p>
              <p className="overflow-hidden">
                <span className="about-text-line inline-block">
                  Today we are a team of twenty designers, producers, and dreamers who have brought
                  over 250 events to life across Europe and beyond. Our work has been recognised by
                  the industry, but our proudest measure is the referrals we receive from guests who
                  became clients.
                </span>
              </p>
            </div>

            {/* Feature grid */}
            <div className="feature-grid mt-10 grid grid-cols-2 gap-4">
              {featureIcons.map((Icon, i) => (
                <div
                  key={i}
                  className="feature-item flex items-center gap-3 rounded-xl border border-ink-muted/10 bg-bg-surface/50 p-4 transition-colors hover:border-accent/30"
                >
                  <Icon className="h-5 w-5 text-accent" strokeWidth={1.5} />
                  <span className="text-sm text-ink-muted">
                    {['Award-winning', 'Heart-led', 'On time, always', 'Full-service'][i]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="mt-22 grid grid-cols-2 gap-8 border-t border-ink-muted/10 pt-12 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <div key={i} className="text-center lg:text-left">
              <p className="font-serif text-5xl text-accent lg:text-6xl">
                <span ref={counters[i]}>0</span>
              </p>
              <p className="mt-2 font-mono text-xs uppercase tracking-[0.15em] text-ink-muted">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
