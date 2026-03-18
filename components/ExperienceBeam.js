import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

function clamp01(n) {
  return Math.min(1, Math.max(0, n));
}

function ExperienceSideCard({
  item,
  sideClass,
  enterX,
  scrollProgress,
  start,
  end,
  reduceMotion,
}) {
  const opacity = useTransform(scrollProgress, [start, end], [0, 1]);
  const x = useTransform(scrollProgress, [start, end], [enterX, 0]);
  const y = useTransform(scrollProgress, [start, end], [14, 0]);

  return (
    <motion.div
      className={`exp-card ${sideClass}`}
      style={reduceMotion ? { opacity: 1, x: 0, y: 0 } : { opacity, x, y }}
    >
      <p className="section-kicker exp-card-kicker">{item.period}</p>
      <h3 className="card-heading exp-card-heading">{item.role}</h3>
      <p className="card-body exp-card-body">{item.description}</p>
    </motion.div>
  );
}

export function ExperienceBeam({ items }) {
  const sectionRef = useRef(null);
  const beamOuterRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const [travelPx, setTravelPx] = useState(520);

  const sweepHeight = 170; // must match CSS height

  useEffect(() => {
    const el = beamOuterRef.current;
    if (!el) return;

    const measure = () => {
      const h = el.getBoundingClientRect().height;
      const next = Math.max(0, h - sweepHeight);
      setTravelPx(next);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 70%", "end 30%"],
  });

  const glowY = useTransform(scrollYProgress, [0, 1], [0, travelPx]);

  const count = items.length;
  const denom = count <= 1 ? 1 : count - 1;

  return (
    <div ref={sectionRef} className="exp-beam-section" aria-label="Experience">
      <div className="exp-beam-bg" aria-hidden="true">
        <div className="exp-beam-track-outer" ref={beamOuterRef}>
          <div className="exp-beam-track" />
          <motion.div
            className="exp-beam-sweep"
            style={{ y: reduceMotion ? 0 : glowY }}
            aria-hidden="true"
          />
        </div>
      </div>

      <div className="exp-items">
        {items.map((item, i) => {
          const isRight = i % 2 === 0;
          const t = denom <= 0 ? 0 : i / denom;
          const start = clamp01(t - 0.18);
          const end = clamp01(t + 0.08);

          return (
            <div key={item.title + i} className="exp-row">
              {/* Left slot */}
              {!isRight ? (
                <ExperienceSideCard
                  item={item}
                  sideClass="exp-card--left"
                  enterX={-120}
                  scrollProgress={scrollYProgress}
                  start={start}
                  end={end}
                  reduceMotion={reduceMotion}
                />
              ) : (
                <div className="exp-spacer" aria-hidden="true" />
              )}

              {/* Middle slot (keeps grid aligned with the beam track) */}
              <div className="exp-mid" aria-hidden="true" />

              {/* Right slot */}
              {isRight ? (
                <ExperienceSideCard
                  item={item}
                  sideClass="exp-card--right"
                  enterX={120}
                  scrollProgress={scrollYProgress}
                  start={start}
                  end={end}
                  reduceMotion={reduceMotion}
                />
              ) : (
                <div className="exp-spacer" aria-hidden="true" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

