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

  useLayoutEffect(() => {
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    const section = sectionRef.current;
    const sticky = stickyRef.current;
    const track = trackRef.current;
    if (!section || !sticky || !track) return undefined;

    if (reduceMotion) {
      setScrollLen(0);
      gsap.set(track, { clearProps: "x" });
      return undefined;
    }

    let tl;

    const setup = () => {
      ScrollTrigger.getAll()
        .filter((t) => t?.vars?.trigger === section || t?.vars?.pin === sticky)
        .forEach((t) => t.kill());
      tl?.kill();

      const viewportWidth = sticky.clientWidth;
      const contentWidth = track.scrollWidth;
      const maxX = Math.max(0, contentWidth - viewportWidth);
      setScrollLen(maxX);

      gsap.set(track, { x: 0 });

      if (maxX <= 1) return;

      const navH = Number.parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue("--navH")
      );
      const startOffset = Number.isFinite(navH) ? navH : 0;

      tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: `top top+=${startOffset}`,
          end: `+=${maxX}`,
          scrub: 1,
          pin: sticky,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(track, { x: -maxX, ease: "none" }, 0);
      requestAnimationFrame(() => ScrollTrigger.refresh());
    };

    setup();
    window.addEventListener("resize", setup);

    return () => {
      window.removeEventListener("resize", setup);
      ScrollTrigger.getAll()
        .filter((t) => t?.vars?.trigger === section || t?.vars?.pin === sticky)
        .forEach((t) => t.kill());
      tl?.kill();
    };
  }, []);

  return (
    <section
      id={id}
      ref={sectionRef}
      className="section section--panel section--horizontal"
      style={{ ["--horizontalScrollLength"]: `${scrollLen}px` }}
    >
      <div
        className="horizontal-sticky"
        ref={stickyRef}
      >
        <div className="section-header">
          <div>
            <p className="section-kicker">{kicker}</p>
            <h2 className="section-title">{title}</h2>
          </div>
          <p className="section-subtitle">Scroll to explore →</p>
        </div>

        <div
          className="horizontal-track"
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

