import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useCounter(
  target: number,
  options: { duration?: number; suffix?: string; prefix?: string } = {}
) {
  const ref = useRef<HTMLSpanElement>(null);
  const { duration = 2, suffix = '', prefix = '' } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      el.textContent = `${prefix}${target.toLocaleString()}${suffix}`;
      return;
    }

    const obj = { val: 0 };
    const ctx = gsap.context(() => {
      gsap.to(obj, {
        val: target,
        duration,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true,
        },
        onUpdate: () => {
          el.textContent = `${prefix}${Math.round(obj.val).toLocaleString()}${suffix}`;
        },
      });
    }, el);

    return () => ctx.revert();
  }, [target, duration, suffix, prefix]);

  return ref;
}
