import { ArrowUp, Instagram, Facebook, Linkedin, Sparkles } from 'lucide-react';
import { scrollToId } from '../hooks/useSmoothScroll';
import { useScrollProgress } from '../hooks/useScrollProgress';
import { navLinks } from '../data/content';

export default function Footer() {
  const progress = useScrollProgress();
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const dashoffset = circumference * (1 - progress);

  return (
    <footer className="relative border-t border-ink-muted/10 py-16 grain-overlay">
      <div className="container-wide">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5">
              <Sparkles className="h-5 w-5 text-accent" strokeWidth={1.5} />
              <span className="font-serif text-xl tracking-tight">Atelier Lumière</span>
            </div>
            <p className="mt-4 max-w-xs text-sm text-ink-muted text-pretty">
              A luxury event management studio crafting unforgettable experiences since 2011.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-muted/15 transition-all hover:border-accent hover:text-accent"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" strokeWidth={1.5} />
              </a>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-muted/15 transition-all hover:border-accent hover:text-accent"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" strokeWidth={1.5} />
              </a>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-muted/15 transition-all hover:border-accent hover:text-accent"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.15em] text-ink-muted/60">
              Navigate
            </p>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToId(link.id)}
                    className="text-sm text-ink-muted transition-colors hover:text-accent"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.15em] text-ink-muted/60">
              Services
            </p>
            <ul className="space-y-3">
              {['Weddings', 'Corporate', 'Galas', 'Private Events'].map((s) => (
                <li key={s}>
                  <button
                    onClick={() => scrollToId('services')}
                    className="text-sm text-ink-muted transition-colors hover:text-accent"
                  >
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.15em] text-ink-muted/60">
              Studio
            </p>
            <address className="space-y-3 not-italic">
              <p className="text-sm text-ink-muted">12 Rue Saint-Marc<br />75002 Paris, France</p>
              <a href="mailto:hello@atelierlumiere.com" className="block text-sm text-ink-muted transition-colors hover:text-accent">
                hello@atelierlumiere.com
              </a>
              <a href="tel:+33145000000" className="block text-sm text-ink-muted transition-colors hover:text-accent">
                +33 1 45 00 00 00
              </a>
            </address>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-ink-muted/10 pt-8 sm:flex-row">
          <p className="font-mono text-xs text-ink-muted/60">
            © {new Date().getFullYear()} Atelier Lumière. All rights reserved.
          </p>
          <button
            onClick={() => scrollToId('hero')}
            className="group flex items-center gap-2 text-sm text-ink-muted transition-colors hover:text-accent"
          >
            Back to top
            <span className="relative flex h-10 w-10 items-center justify-center">
              <svg className="absolute inset-0 -rotate-90" width="40" height="40" viewBox="0 0 40 40">
                <circle
                  cx="20"
                  cy="20"
                  r={radius}
                  fill="none"
                  stroke="rgb(var(--color-text-muted) / 0.15)"
                  strokeWidth="2"
                />
                <circle
                  cx="20"
                  cy="20"
                  r={radius}
                  fill="none"
                  stroke="rgb(var(--color-accent))"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={dashoffset}
                  style={{ transition: 'stroke-dashoffset 0.1s linear' }}
                />
              </svg>
              <ArrowUp className="h-4 w-4 transition-colors group-hover:text-accent" strokeWidth={1.5} />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
