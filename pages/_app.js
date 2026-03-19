import "../styles/globals.css";
import { useEffect, useRef } from "react";
import Lenis from "lenis";

export default function App({ Component, pageProps }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (reduceMotion) return;

    document.documentElement.classList.add("lenis");

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      smoothTouch: false,
      wheelMultiplier: 0.9,
    });

    lenisRef.current = lenis;

    let cleanupScrollTrigger = null;
    (async () => {
      try {
        const gsapMod = await import("gsap");
        const stMod = await import("gsap/ScrollTrigger");
        const gsap = gsapMod.default ?? gsapMod;
        const ScrollTrigger = stMod.ScrollTrigger ?? stMod.default ?? stMod;

        gsap.registerPlugin(ScrollTrigger);

        // Keep ScrollTrigger in sync with Lenis' RAF-driven scrolling.
        const onLenisScroll = () => ScrollTrigger.update();
        lenis.on("scroll", onLenisScroll);

        const onGsapTick = (t) => {
          // GSAP ticker uses seconds; Lenis expects ms.
          lenis.raf(t * 1000);
        };
        gsap.ticker.add(onGsapTick);
        gsap.ticker.lagSmoothing(0);

        cleanupScrollTrigger = () => {
          try {
            gsap.ticker.remove(onGsapTick);
            lenis.off("scroll", onLenisScroll);
          } catch {
            // no-op
          }
        };

        // Refresh triggers after first frame (layout/images may settle).
        requestAnimationFrame(() => ScrollTrigger.refresh());
      } catch {
        // If GSAP isn't available, just skip integration.
      }
    })();

    return () => {
      cleanupScrollTrigger?.();
      lenis.destroy();
      lenisRef.current = null;
      document.documentElement.classList.remove("lenis");
    };
  }, []);

  return <Component {...pageProps} />;
}