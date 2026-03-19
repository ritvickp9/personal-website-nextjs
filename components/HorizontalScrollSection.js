import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Pinned Projects section: vertical scroll drives horizontal card movement
export function HorizontalScrollSection({ id, title, kicker, children }) {
  const sectionRef = useRef(null);
  const stickyRef = useRef(null);
  const trackRef = useRef(null);
  const [scrollLen, setScrollLen] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useLayoutEffect(() => {
    const mobileMq = typeof window !== "undefined" ? window.matchMedia?.("(max-width: 720px)") : null;
    const computeIsMobile = () => setIsMobile(Boolean(mobileMq?.matches));
    computeIsMobile();
    // Safari/iOS uses addListener/removeListener
    if (mobileMq?.addEventListener) mobileMq.addEventListener("change", computeIsMobile);
    else mobileMq?.addListener?.(computeIsMobile);

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    const section = sectionRef.current;
    const sticky = stickyRef.current;
    const track = trackRef.current;
    if (!section || !sticky || !track) return undefined;

    const killExisting = () => {
      ScrollTrigger.getAll()
        .filter((t) => t?.vars?.trigger === section || t?.vars?.pin === sticky)
        .forEach((t) => t.kill());
    };

    if (reduceMotion || mobileMq?.matches) {
      setScrollLen(0);
      killExisting();
      gsap.set(track, { x: 0, clearProps: "transform" });
      return () => {
        if (mobileMq?.removeEventListener) mobileMq.removeEventListener("change", computeIsMobile);
        else mobileMq?.removeListener?.(computeIsMobile);
      };
    }

    let tween;
    let trigger;

    const setup = () => {
      killExisting();
      tween?.kill();
      trigger?.kill();

      const viewportWidth = sticky.clientWidth;
      const contentWidth = track.scrollWidth;
      const maxX = Math.max(0, contentWidth - viewportWidth);

      gsap.set(track, { x: 0 });

      if (maxX <= 1) {
        setScrollLen(0);
        return;
      }

      const navH = Number.parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue("--navH")
      );
      const startOffset = Number.isFinite(navH) ? navH : 0;

      try {
        tween = gsap.to(track, { x: -maxX, ease: "none", paused: true });
        trigger = ScrollTrigger.create({
          trigger: section,
          start: `top top+=${startOffset}`,
          end: `+=${maxX}`,
          scrub: 1,
          pin: sticky,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          animation: tween,
        });
        setScrollLen(maxX);
      } catch {
        // If ScrollTrigger isn't available in this runtime, fail gracefully.
        tween?.kill();
        trigger?.kill();
        setScrollLen(0);
        gsap.set(track, { x: 0 });
      }

      requestAnimationFrame(() => ScrollTrigger.refresh());
    };

    setup();
    window.addEventListener("resize", setup);

    // Images can change card sizes after initial measure (esp. in production).
    const imgs = Array.from(track.querySelectorAll("img"));
    const onImgLoad = () => setup();
    imgs.forEach((img) => {
      if (!img.complete) img.addEventListener("load", onImgLoad, { once: true });
    });

    return () => {
      window.removeEventListener("resize", setup);
      if (mobileMq?.removeEventListener) mobileMq.removeEventListener("change", computeIsMobile);
      else mobileMq?.removeListener?.(computeIsMobile);
      imgs.forEach((img) => img.removeEventListener("load", onImgLoad));
      killExisting();
      tween?.kill();
      trigger?.kill();
    };
  }, [isMobile]);

  return (
    <section
      id={id}
      ref={sectionRef}
      className="section section--panel section--horizontal"
      style={{ ["--horizontalScrollLength"]: `${scrollLen}px` }}
    >
      <div className={isMobile ? "horizontal-sticky horizontal-sticky--mobile" : "horizontal-sticky"} ref={stickyRef}>
        <div className="section-header">
          <div>
            <p className="section-kicker">{kicker}</p>
            <h2 className="section-title">{title}</h2>
          </div>
          <p className="section-subtitle">{isMobile ? "Swipe to explore →" : "Scroll to explore →"}</p>
        </div>

        <div
          className={isMobile ? "horizontal-track horizontal-track--mobile" : "horizontal-track"}
          ref={trackRef}
          tabIndex={0}
          aria-label="Project cards (horizontal rail)"
        >
          {children}
        </div>
      </div>
    </section>
  );
}

