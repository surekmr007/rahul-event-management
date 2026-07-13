import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { services } from '../data/content';

gsap.registerPlugin(ScrollTrigger);

function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[number];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const Icon = service.icon;

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const supportsHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!supportsHover) return;

    const onMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateZ(0)`;
    };
    const onLeave = () => {
      card.style.transform = 'perspective(800px) rotateY(0) rotateX(0)';
    };

    card.addEventListener('mousemove', onMove);
    card.addEventListener('mouseleave', onLeave);
    return () => {
      card.removeEventListener('mousemove', onMove);
      card.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="service-card group relative overflow-hidden rounded-2xl border border-ink-muted/10 bg-bg-surface/40 p-8 transition-all duration-500 ease-out-expo hover:border-accent/30 hover:bg-bg-surface/70"
      style={{ transformStyle: 'preserve-3d', transition: 'transform 0.4s ease-out, border-color 0.4s, background-color 0.4s' }}
    >
      <span className="absolute -top-4 right-4 font-serif text-8xl text-ink-muted/5 select-none">
        {String(index + 1).padStart(2, '0')}
      </span>

      <div className="relative z-10">
        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-accent/10 text-accent transition-all duration-500 group-hover:bg-accent group-hover:text-bg-dominant">
          <Icon className="h-6 w-6" strokeWidth={1.5} />
        </div>

        <h3 className="text-card-title font-serif text-ink-primary">{service.title}</h3>

        <p className="mt-4 text-pretty text-ink-muted leading-relaxed">{service.description}</p>

        <div className="mt-6 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.15em] text-ink-muted/60">
          <span className="h-px w-6 bg-accent/40" />
          {service.duration}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-accent/10 via-transparent to-transparent" />
      </div>
    </div>
  );
}

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.from('.service-card', {
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: { trigger: '.services-grid', start: 'top 80%' },
      });
      gsap.from('.services-header', {
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
    <section ref={sectionRef} id="services" className="relative py-30">
      <div className="container-wide">
        <div className="services-header mx-auto mb-16 max-w-3xl text-center">
          <span className="section-label justify-center">
            <span className="h-px w-8 bg-accent" />
            What We Do
          </span>
          <h2 className="text-section-title text-ink-primary text-balance">
            Six disciplines,{' '}
            <span className="italic text-accent">one standard.</span>
          </h2>
          <p className="mt-6 text-body-lg text-ink-muted text-pretty">
            From the first idea to the final toast, we manage every aspect of your event with the
            same obsessive care.
          </p>
        </div>

        <div className="services-grid grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
