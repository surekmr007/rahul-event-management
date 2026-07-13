import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Monitor, Sparkles } from 'lucide-react';
import { navLinks } from '../data/content';
import { useTheme, type ThemeMode } from '../hooks/useTheme';
import { useScrollProgress, useActiveSection } from '../hooks/useScrollProgress';
import { scrollToId } from '../hooks/useSmoothScroll';
import { useMagnetic } from '../hooks/useMagnetic';

const themeOptions: { mode: ThemeMode; icon: typeof Sun; label: string }[] = [
  { mode: 'dark', icon: Moon, label: 'Dark' },
  { mode: 'light', icon: Sun, label: 'Light' },
  { mode: 'system', icon: Monitor, label: 'System' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { mode, setTheme } = useTheme();
  const progress = useScrollProgress();
  const activeSection = useActiveSection(navLinks.map((l) => l.id));
  const logoRef = useMagnetic<HTMLButtonElement>(0.15);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
  }, [menuOpen]);

  const handleNav = (id: string) => {
    setMenuOpen(false);
    setTimeout(() => scrollToId(id), menuOpen ? 300 : 0);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out-expo ${
          scrolled ? 'glass py-3' : 'py-5 bg-transparent'
        }`}
      >
        <div className="container-wide flex items-center justify-between">
          <button
            ref={logoRef}
            onClick={() => scrollToId('hero')}
            className="flex items-center gap-2.5 transition-transform"
            aria-label="Atelier Lumière home"
          >
            <Sparkles className="h-5 w-5 text-accent" strokeWidth={1.5} />
            <span className="font-serif text-xl tracking-tight">Atelier Lumière</span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNav(link.id)}
                className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                  activeSection === link.id ? 'text-accent' : 'text-ink-primary hover:text-accent'
                }`}
              >
                {link.label}
                <span
                  className={`absolute bottom-1 left-1/2 h-px bg-accent transition-all duration-300 ease-out-expo ${
                    activeSection === link.id ? 'w-4 -translate-x-1/2' : 'w-0 -translate-x-1/2'
                  }`}
                />
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {/* 3-way theme toggle */}
            <div className="flex items-center rounded-full border border-ink-muted/20 p-0.5">
              {themeOptions.map(({ mode: m, icon: Icon, label }) => (
                <button
                  key={m}
                  onClick={() => setTheme(m)}
                  className={`flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 ${
                    mode === m
                      ? 'bg-accent text-bg-dominant'
                      : 'text-ink-muted hover:text-ink-primary'
                  }`}
                  aria-label={`${label} theme`}
                  title={`${label} theme`}
                >
                  <Icon className="h-4 w-4" strokeWidth={1.5} />
                </button>
              ))}
            </div>

            <button
              onClick={() => handleNav('contact')}
              className="hidden sm:inline-flex btn-primary !px-5 !py-2.5 !text-xs"
            >
              Start a Project
            </button>

            <button
              onClick={() => setMenuOpen(true)}
              className="lg:hidden flex h-10 w-10 items-center justify-center rounded-full border border-ink-muted/20"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* Scroll progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-ink-muted/10">
          <div
            className="h-full bg-accent transition-[width] duration-75 ease-out"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </header>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-[60] lg:hidden transition-all duration-500 ease-out-expo ${
          menuOpen ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <div
          className="absolute inset-0 bg-bg-dominant/95 backdrop-blur-xl"
          onClick={() => setMenuOpen(false)}
        />
        <div
          className={`relative flex h-full flex-col items-center justify-center gap-2 transition-transform duration-500 ease-out-expo ${
            menuOpen ? 'translate-y-0' : '-translate-y-8'
          }`}
        >
          {navLinks.map((link, i) => (
            <button
              key={link.id}
              onClick={() => handleNav(link.id)}
              className="font-serif text-4xl text-ink-primary transition-colors hover:text-accent"
              style={{
                transitionDelay: menuOpen ? `${i * 60 + 100}ms` : '0ms',
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
              }}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => handleNav('contact')}
            className="btn-primary mt-8"
            style={{
              transitionDelay: menuOpen ? `${navLinks.length * 60 + 100}ms` : '0ms',
              opacity: menuOpen ? 1 : 0,
            }}
          >
            Start a Project
          </button>
        </div>
        <button
          onClick={() => setMenuOpen(false)}
          className="absolute top-6 right-6 flex h-12 w-12 items-center justify-center rounded-full border border-ink-muted/20"
          aria-label="Close menu"
        >
          <X className="h-6 w-6" strokeWidth={1.5} />
        </button>
      </div>
    </>
  );
}
