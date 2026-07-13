import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { testimonials } from '../data/content';

gsap.registerPlugin(ScrollTrigger);

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.from('.testimonials-header', {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 75%' },
      });
      gsap.from('.testimonial-card', {
        y: 60,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.testimonial-card', start: 'top 80%' },
      });
    }, section);
    return () => ctx.revert();
  }, []);

  const next = () => setActive((a) => (a + 1) % testimonials.length);
  const prev = () => setActive((a) => (a - 1 + testimonials.length) % testimonials.length);

  const current = testimonials[active];

  return (
    <section ref={sectionRef} id="testimonials" className="relative py-30 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/2606877/pexels-photo-2606877.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt=""
          className="h-full w-full object-cover opacity-15"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-bg-dominant via-bg-dominant/85 to-bg-dominant" />
      </div>

      <div className="container-wide relative">
        <div className="testimonials-header mx-auto mb-16 max-w-3xl text-center">
          <span className="section-label justify-center">
            <span className="h-px w-8 bg-accent" />
            Client Voices
          </span>
          <h2 className="text-section-title text-ink-primary text-balance">
            Words from those{' '}
            <span className="italic text-accent">who were there.</span>
          </h2>
        </div>

        <div className="testimonial-card mx-auto max-w-3xl">
          <div className="relative rounded-3xl border border-ink-muted/10 bg-bg-surface/60 p-10 backdrop-blur-md sm:p-14">
            <Quote className="absolute top-8 left-8 h-12 w-12 text-accent/15" strokeWidth={1} />

            <div className="relative">
              <div className="mb-6 flex justify-center gap-1">
                {Array.from({ length: current.rating }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                ))}
              </div>

              <blockquote
                key={active}
                className="text-center text-body-lg font-serif italic text-ink-primary text-pretty"
              >
                "{current.quote}"
              </blockquote>

              <div className="mt-8 text-center">
                <p className="font-serif text-xl text-ink-primary">{current.name}</p>
                <p className="mt-1 font-mono text-xs uppercase tracking-[0.15em] text-ink-muted">
                  {current.role}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={prev}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-ink-muted/20 transition-all hover:border-accent hover:text-accent"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === active ? 'w-8 bg-accent' : 'w-2 bg-ink-muted/30 hover:bg-ink-muted/50'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-ink-muted/20 transition-all hover:border-accent hover:text-accent"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
