import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const supportsHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!supportsHover) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      cursorX += (mouseX - cursorX) * 0.2;
      cursorY += (mouseY - cursorY) * 0.2;
      cursor.style.left = `${cursorX}px`;
      cursor.style.top = `${cursorY}px`;
      raf = requestAnimationFrame(animate);
    };

    const onEnterLink = () => cursor.classList.add('hovering');
    const onLeaveLink = () => cursor.classList.remove('hovering');

    const links = document.querySelectorAll('a, button, [role="button"], input, select, textarea');
    links.forEach((link) => {
      link.addEventListener('mouseenter', onEnterLink);
      link.addEventListener('mouseleave', onLeaveLink);
    });

    window.addEventListener('mousemove', onMove);
    animate();

    return () => {
      window.removeEventListener('mousemove', onMove);
      if (raf) cancelAnimationFrame(raf);
      links.forEach((link) => {
        link.removeEventListener('mouseenter', onEnterLink);
        link.removeEventListener('mouseleave', onLeaveLink);
      });
    };
  }, []);

  return <div ref={cursorRef} className="custom-cursor hidden lg:block" />;
}
