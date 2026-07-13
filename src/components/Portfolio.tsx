import { useRef, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation, Autoplay } from 'swiper/modules';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft, ArrowRight, MapPin } from 'lucide-react';
import { portfolio } from '../data/content';
import type { Swiper as SwiperType } from 'swiper';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

gsap.registerPlugin(ScrollTrigger);

export default function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null);
  const swiperRef = useRef<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.from('.portfolio-header', {
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
    <section ref={sectionRef} id="portfolio" className="relative py-30 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-20 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 h-96 w-96 rounded-full bg-accent-secondary/5 blur-3xl" />
      </div>

      <div className="container-wide relative">
        <div className="portfolio-header mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <span className="section-label">
              <span className="h-px w-8 bg-accent" />
              Selected Work
            </span>
            <h2 className="text-section-title text-ink-primary text-balance">
              A portfolio of{' '}
              <span className="italic text-accent">moments.</span>
            </h2>
          </div>
          <p className="max-w-sm text-ink-muted text-pretty">
            Each event is a one-of-one. Browse a selection of recent productions across galas,
            weddings, and brand experiences.
          </p>
        </div>
      </div>

      <div className="relative px-4">
        <Swiper
          modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
          effect="coverflow"
          grabCursor
          centeredSlides
          slidesPerView={1.2}
          spaceBetween={24}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 120,
            modifier: 2.5,
            slideShadows: false,
          }}
          pagination={{ clickable: true, type: 'progressbar' }}
          autoplay={{ delay: 5000, disableOnInteraction: true, pauseOnMouseEnter: true }}
          onSwiper={(s) => {
            swiperRef.current = s;
            setIsBeginning(s.isBeginning);
            setIsEnd(s.isEnd);
          }}
          onSlideChange={(s) => {
            setIsBeginning(s.isBeginning);
            setIsEnd(s.isEnd);
          }}
          breakpoints={{
            640: { slidesPerView: 1.5 },
            768: { slidesPerView: 2.1 },
            1024: { slidesPerView: 2.5 },
            1280: { slidesPerView: 3 },
          }}
          className="!pb-16 !px-4"
        >
          {portfolio.map((item) => (
            <SwiperSlide key={item.title} className="swiper-coverflow">
              <article className="group relative aspect-[3/4] overflow-hidden rounded-2xl border border-ink-muted/10">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-dominant via-bg-dominant/30 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-6">
                  <span className="mb-2 inline-block rounded-full bg-accent/20 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-accent backdrop-blur-sm">
                    {item.category}
                  </span>
                  <h3 className="text-card-title font-serif text-ink-primary">{item.title}</h3>
                  <div className="mt-2 flex items-center gap-1.5 text-sm text-ink-muted">
                    <MapPin className="h-3.5 w-3.5" strokeWidth={1.5} />
                    {item.location}
                  </div>
                  <p className="mt-3 text-sm text-ink-muted text-pretty opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    {item.description}
                  </p>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="container-wide mt-4 flex items-center justify-between">
          <div className="flex gap-3">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              disabled={isBeginning}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-ink-muted/20 transition-all hover:border-accent hover:text-accent disabled:opacity-30 disabled:hover:border-ink-muted/20 disabled:hover:text-ink-primary"
              aria-label="Previous slide"
            >
              <ArrowLeft className="h-5 w-5" strokeWidth={1.5} />
            </button>
            <button
              onClick={() => swiperRef.current?.slideNext()}
              disabled={isEnd}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-ink-muted/20 transition-all hover:border-accent hover:text-accent disabled:opacity-30 disabled:hover:border-ink-muted/20 disabled:hover:text-ink-primary"
              aria-label="Next slide"
            >
              <ArrowRight className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </div>
          <span className="font-mono text-xs uppercase tracking-[0.15em] text-ink-muted">
            {portfolio.length} projects
          </span>
        </div>
      </div>
    </section>
  );
}
