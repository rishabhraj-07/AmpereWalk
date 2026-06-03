import { useEffect, useRef } from "react";
import gsap from "gsap";

function canUseAnimatedCursor() {
  return (
    window.matchMedia("(pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function ExperienceLayer() {
  const cursorRef = useRef(null);
  const haloRef = useRef(null);

  useEffect(() => {
    if (!canUseAnimatedCursor()) return;

    const cursor = cursorRef.current;
    const halo = haloRef.current;
    if (!cursor || !halo) return;

    let cursorX = window.innerWidth / 2;
    let cursorY = window.innerHeight / 2;
    let haloX = cursorX;
    let haloY = cursorY;
    let rafId = 0;
    let isInteractive = false;

    const setInteractive = (value) => {
      if (isInteractive === value) return;
      isInteractive = value;
      cursor.classList.toggle("is-interactive", value);
      halo.classList.toggle("is-interactive", value);
    };

    const render = () => {
      haloX += (cursorX - haloX) * 0.18;
      haloY += (cursorY - haloY) * 0.18;

      cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;
      halo.style.transform = `translate3d(${haloX}px, ${haloY}px, 0) translate(-50%, -50%)`;
      rafId = requestAnimationFrame(render);
    };

    const handleMove = (event) => {
      cursorX = event.clientX;
      cursorY = event.clientY;
      setInteractive(Boolean(event.target.closest("a, button, input, textarea, select, [role='button'], .cursor-pointer")));
    };

    const handleLeave = () => {
      cursor.classList.remove("is-visible");
      halo.classList.remove("is-visible");
    };

    const handleEnter = () => {
      cursor.classList.add("is-visible");
      halo.classList.add("is-visible");
    };

    window.addEventListener("pointermove", handleMove, { passive: true });
    window.addEventListener("pointerleave", handleLeave);
    window.addEventListener("pointerenter", handleEnter);
    handleEnter();
    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerleave", handleLeave);
      window.removeEventListener("pointerenter", handleEnter);
    };
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const revealItems = gsap.utils.toArray("section > div, footer > div");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          gsap.fromTo(
            entry.target,
            { y: 24, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", overwrite: "auto" }
          );
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div ref={haloRef} className="aw-cursor-halo" aria-hidden="true" />
      <div ref={cursorRef} className="aw-cursor-dot" aria-hidden="true" />
    </>
  );
}
