import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, CheckCircle2, AlertCircle, Loader2, Mail, Phone, MapPin } from 'lucide-react';
import { supabase } from '../lib/supabase';

gsap.registerPlugin(ScrollTrigger);

type FormState = {
  name: string;
  email: string;
  phone: string;
  event_type: string;
  event_date: string;
  guest_count: string;
  budget: string;
  message: string;
};

type Status = 'idle' | 'submitting' | 'success' | 'error';

const eventTypes = ['Wedding', 'Corporate', 'Gala Dinner', 'Private Celebration', 'Other'];
const budgetRanges = ['Under €10k', '€10k–€25k', '€25k–€50k', '€50k–€100k', '€100k+'];

const initialState: FormState = {
  name: '',
  email: '',
  phone: '',
  event_type: '',
  event_date: '',
  guest_count: '',
  budget: '',
  message: '',
};

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [form, setForm] = useState<FormState>(initialState);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.from('.contact-header', {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 75%' },
      });
      gsap.from('.contact-info', {
        x: -40,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.contact-grid', start: 'top 80%' },
      });
      gsap.from('.form-field', {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        stagger: 0.08,
        scrollTrigger: { trigger: '.contact-form', start: 'top 80%' },
      });
    }, section);
    return () => ctx.revert();
  }, []);

  const update = (key: keyof FormState, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'submitting') return;

    if (!form.name.trim() || !form.email.trim() || !form.event_type || !form.message.trim()) {
      setStatus('error');
      setErrorMsg('Please fill in your name, email, event type, and message.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setStatus('error');
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    setStatus('submitting');
    setErrorMsg('');

    try {
      const { error } = await supabase.from('enquiries').insert({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim() || null,
        event_type: form.event_type,
        event_date: form.event_date || null,
        guest_count: form.guest_count ? parseInt(form.guest_count, 10) : null,
        budget: form.budget || null,
        message: form.message.trim(),
      });

      if (error) throw error;

      setStatus('success');
      setForm(initialState);
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  };

  return (
    <section ref={sectionRef} id="contact" className="relative py-30 grain-overlay">
      <div className="container-wide">
        <div className="contact-header mx-auto mb-16 max-w-3xl text-center">
          <span className="section-label justify-center">
            <span className="h-px w-8 bg-accent" />
            Start a Conversation
          </span>
          <h2 className="text-section-title text-ink-primary text-balance">
            Let's create something{' '}
            <span className="italic text-accent">unforgettable.</span>
          </h2>
          <p className="mt-6 text-body-lg text-ink-muted text-pretty">
            Tell us about your event. We respond to every enquiry within two business days.
          </p>
        </div>

        <div className="contact-grid grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
          {/* Contact info */}
          <div className="contact-info space-y-8">
            <div className="rounded-2xl border border-ink-muted/10 bg-bg-surface/40 p-8">
              <h3 className="font-serif text-2xl text-ink-primary">The Studio</h3>
              <div className="mt-6 space-y-5">
                <a
                  href="mailto:hello@atelierlumiere.com"
                  className="flex items-center gap-4 text-ink-muted transition-colors hover:text-accent"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-accent/10 text-accent">
                    <Mail className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-wider text-ink-muted/60">Email</p>
                    <p className="text-ink-primary">hello@atelierlumiere.com</p>
                  </div>
                </a>

                <a
                  href="tel:+33145000000"
                  className="flex items-center gap-4 text-ink-muted transition-colors hover:text-accent"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-accent/10 text-accent">
                    <Phone className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-wider text-ink-muted/60">Phone</p>
                    <p className="text-ink-primary">+33 1 45 00 00 00</p>
                  </div>
                </a>

                <div className="flex items-center gap-4 text-ink-muted">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-accent/10 text-accent">
                    <MapPin className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-wider text-ink-muted/60">Studio</p>
                    <p className="text-ink-primary">12 Rue Saint-Marc, 75002 Paris</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-accent/20 bg-accent/5 p-8">
              <p className="font-serif text-lg text-ink-primary">Booking window</p>
              <p className="mt-2 text-sm text-ink-muted">
                We accept a limited number of events per year to ensure each receives our full
                attention. Currently booking 6–18 months out.
              </p>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="contact-form rounded-2xl border border-ink-muted/10 bg-bg-surface/40 p-8 sm:p-10"
          >
            {status === 'success' ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-success/15 text-success">
                  <CheckCircle2 className="h-10 w-10" strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-3xl text-ink-primary">Thank you.</h3>
                <p className="mt-3 max-w-sm text-ink-muted text-pretty">
                  Your enquiry has been received. A member of our studio will be in touch within two
                  business days.
                </p>
                <button onClick={() => setStatus('idle')} className="btn-ghost mt-8">
                  Send Another Enquiry
                </button>
              </div>
            ) : (
              <div className="space-y-5">
                <div className="form-field grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-2 block font-mono text-[10px] uppercase tracking-wider text-ink-muted">
                      Full Name *
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => update('name', e.target.value)}
                      className="w-full rounded-lg border border-ink-muted/15 bg-bg-dominant/50 px-4 py-3 text-ink-primary placeholder:text-ink-muted/40 transition-colors focus:border-accent focus:outline-none"
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-2 block font-mono text-[10px] uppercase tracking-wider text-ink-muted">
                      Email *
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => update('email', e.target.value)}
                      className="w-full rounded-lg border border-ink-muted/15 bg-bg-dominant/50 px-4 py-3 text-ink-primary placeholder:text-ink-muted/40 transition-colors focus:border-accent focus:outline-none"
                      placeholder="jane@email.com"
                    />
                  </div>
                </div>

                <div className="form-field grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="phone" className="mb-2 block font-mono text-[10px] uppercase tracking-wider text-ink-muted">
                      Phone
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => update('phone', e.target.value)}
                      className="w-full rounded-lg border border-ink-muted/15 bg-bg-dominant/50 px-4 py-3 text-ink-primary placeholder:text-ink-muted/40 transition-colors focus:border-accent focus:outline-none"
                      placeholder="+33 6 00 00 00 00"
                    />
                  </div>
                  <div>
                    <label htmlFor="event_type" className="mb-2 block font-mono text-[10px] uppercase tracking-wider text-ink-muted">
                      Event Type *
                    </label>
                    <select
                      id="event_type"
                      required
                      value={form.event_type}
                      onChange={(e) => update('event_type', e.target.value)}
                      className="w-full rounded-lg border border-ink-muted/15 bg-bg-dominant/50 px-4 py-3 text-ink-primary transition-colors focus:border-accent focus:outline-none"
                    >
                      <option value="">Select...</option>
                      {eventTypes.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-field grid gap-5 sm:grid-cols-3">
                  <div>
                    <label htmlFor="event_date" className="mb-2 block font-mono text-[10px] uppercase tracking-wider text-ink-muted">
                      Event Date
                    </label>
                    <input
                      id="event_date"
                      type="date"
                      value={form.event_date}
                      onChange={(e) => update('event_date', e.target.value)}
                      className="w-full rounded-lg border border-ink-muted/15 bg-bg-dominant/50 px-4 py-3 text-ink-primary transition-colors focus:border-accent focus:outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="guest_count" className="mb-2 block font-mono text-[10px] uppercase tracking-wider text-ink-muted">
                      Guests
                    </label>
                    <input
                      id="guest_count"
                      type="number"
                      min="1"
                      value={form.guest_count}
                      onChange={(e) => update('guest_count', e.target.value)}
                      className="w-full rounded-lg border border-ink-muted/15 bg-bg-dominant/50 px-4 py-3 text-ink-primary placeholder:text-ink-muted/40 transition-colors focus:border-accent focus:outline-none"
                      placeholder="100"
                    />
                  </div>
                  <div>
                    <label htmlFor="budget" className="mb-2 block font-mono text-[10px] uppercase tracking-wider text-ink-muted">
                      Budget
                    </label>
                    <select
                      id="budget"
                      value={form.budget}
                      onChange={(e) => update('budget', e.target.value)}
                      className="w-full rounded-lg border border-ink-muted/15 bg-bg-dominant/50 px-4 py-3 text-ink-primary transition-colors focus:border-accent focus:outline-none"
                    >
                      <option value="">Select...</option>
                      {budgetRanges.map((b) => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-field">
                  <label htmlFor="message" className="mb-2 block font-mono text-[10px] uppercase tracking-wider text-ink-muted">
                    Tell us about your event *
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => update('message', e.target.value)}
                    className="w-full resize-none rounded-lg border border-ink-muted/15 bg-bg-dominant/50 px-4 py-3 text-ink-primary placeholder:text-ink-muted/40 transition-colors focus:border-accent focus:outline-none"
                    placeholder="Share your vision, venue ideas, and anything that inspires you..."
                  />
                </div>

                {status === 'error' && (
                  <div className="form-field flex items-center gap-3 rounded-lg border border-error/30 bg-error/10 px-4 py-3 text-sm text-error">
                    <AlertCircle className="h-5 w-5 shrink-0" strokeWidth={1.5} />
                    {errorMsg}
                  </div>
                )}

                <div className="form-field">
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="btn-primary w-full sm:w-auto disabled:opacity-60 disabled:hover:scale-100"
                  >
                    {status === 'submitting' ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2} />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" strokeWidth={1.5} />
                        Send Enquiry
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
