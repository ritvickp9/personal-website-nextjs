import Head from "next/head";
import { useMemo, useRef, useState, useEffect } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import {
  SiBootstrap,
  SiCss,
  SiHtml5,
  SiJavascript,
  SiNextdotjs,
  SiNodedotjs,
  SiReact,
  SiTailwindcss,
  SiPython,
  SiMongodb,
  SiPostgresql,
  SiAngular,
  SiFastapi,
  SiFirebase,
} from "react-icons/si";
import { HorizontalScrollSection } from "../components/HorizontalScrollSection";
import { ExperienceBeam } from "../components/ExperienceBeam";

const projects = [
  {
    title: "rider-life",
    displayTitle: "Rider Life",
    description:
      "A Next.js powered site celebrating bikes and long rides, built to practice file‑based routing and deployment.",
    href: "https://rider-life-nextjs.vercel.app/",
    badge: "Next.js",
    external: true,
    image: "/images/rider-life.jpg",
  },
  {
    title: "Weather",
    displayTitle: "Weather App",
    description:
      "A simple forecast app that taught me about API integration, error states and loading skeletons.",
    href: "/projects/Weather/index.html",
    badge: "APIs",
    image: "/images/Weather.PNG",
  },
  {
    title: "Dice",
    displayTitle: "Dice Challenge",
    description:
      "A fun probability mini‑game exploring randomness, simple state, and subtle UI feedback.",
    href: "/projects/Dice Challenge/dicee.html",
    badge: "Mini game",
    image: "/images/Dice.PNG",
  },
  {
    title: "Drum",
    displayTitle: "Drum Kit",
    description:
      "A browser drum machine with keyboard bindings, snappy animations, and audio timing tweaks.",
    href: "/projects/Drum Kit/index.html",
    badge: "Rhythm",
    image: "/images/Drum.PNG",
  },
  {
    title: "Simon",
    displayTitle: "Simon Game",
    description:
      "A classic memory sequence game that pushed me to think about timers, game state, and UX pacing.",
    href: "/projects/Simon Game/index.html",
    badge: "Memory",
    image: "/images/Simon.PNG",
  },
];

const skills = [
  "JavaScript",
  "React",
  "Next.js",
  "Node.js",
  "Tailwind",
  "Python",
  "PostgreSQL",
  "MongoDB",
  "Angular",
  "FastAPI",
  "Firebase",
  "Superset",
];

const skillIcons = {
  JavaScript: SiJavascript,
  React: SiReact,
  "Next.js": SiNextdotjs,
  "Node.js": SiNodedotjs,
  Tailwind: SiTailwindcss,
  Python: SiPython,
  PostgreSQL: SiPostgresql,
  MongoDB: SiMongodb,
  Angular: SiAngular,
  FastAPI: SiFastapi,
  Firebase: SiFirebase,
};

const experiences = [
  {
    period: "September 2025 - Present · Ease My Expo",
    role: "Technology Lead",
    description: "Managing a cross-functional team to build & scale four core products. Built 'Communities', a serverless LinkedIn for Exhibitions. Built a GenAI prototype tool reducing design lead time from days to seconds.",
  },
  {
    period: "April 2025 – September 2025 · Nokia",
    role: "Sr. Frontend Developer",
    description: "Led migration and rebuild of the main telecom app to React & Node.js. Optimized existing Angular app by restructuring change detection strategies, reducing lag on complex tables by 50%.",
  },
  {
    period: "Aug 2023 – April 2025 · Nokia",
    role: "Frontend Developer",
    description: "Maintained Angular+Springboot web application, improving data processing efficiency by 75%. Built Geolytics for cell tower KPI analysis, improving turnaround by 67%.",
  },
];

const SECTION_IDS = ["hero", "about", "experience", "projects", "skills", "contact"];

export default function Home() {
  const shellRef = useRef(null);
  const laptopScroll = useRef({ current: 0 });
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: shellRef,
    offset: ["start start", "end end"],
  });

  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [navCompact, setNavCompact] = useState(false);

  useEffect(() => {
    setMounted(true);
    const unsubscribe = scrollYProgress.on("change", (value) => {
      laptopScroll.current = value;
    });
    return () => unsubscribe && unsubscribe();
  }, [scrollYProgress]);

  // Header mini-bar behavior: expand at top, compact after some scroll.
  useEffect(() => {
    if (shouldReduceMotion) return;

    let rafId = 0;
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setNavCompact(window.scrollY > 80);
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
    };
  }, [shouldReduceMotion]);

  useEffect(() => {
    if (shouldReduceMotion) return;
    document.documentElement.classList.toggle("nav-compact-vars", navCompact);
  }, [navCompact, shouldReduceMotion]);

  const heroParallax = useTransform(scrollYProgress, [0, 0.35], [0, -60]);
  const bgParallaxA = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const bgParallaxB = useTransform(scrollYProgress, [0, 1], [0, -220]);
  const bgParallaxC = useTransform(scrollYProgress, [0, 1], [0, -160]);

  useEffect(() => {
    const handleScroll = () => {
      let currentActive = "hero";
      let minDistance = Infinity;
      const scrollY = window.scrollY;
      const halfWindow = window.innerHeight / 2;

      SECTION_IDS.forEach((id) => {
        const el = document.getElementById(`section-${id}`);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        
        // If the center of the viewport is within the element's bounds, it's definitively active
        if (rect.top <= halfWindow && rect.bottom >= halfWindow) {
          currentActive = id;
          minDistance = 0; // Lock it in
        } else if (minDistance !== 0) {
          // Fallback: finding the closest element to the center
          const distance = Math.min(Math.abs(rect.top - halfWindow), Math.abs(rect.bottom - halfWindow));
          if (distance < minDistance) {
            minDistance = distance;
            currentActive = id;
          }
        }
      });

      setActiveSection(currentActive);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Init
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(`section-${id}`)?.scrollIntoView({ behavior: "smooth" });
  };

  const navLinks = useMemo(
    () => [
      { id: "about", label: "About" },
      { id: "experience", label: "Experience" },
      { id: "projects", label: "Projects" },
      { id: "skills", label: "Skills" },
      { id: "contact", label: "Contact" },
    ],
    []
  );

  return (
    <>
      <Head>
        <title>Ritvick Pant · Full Stack Developer</title>
      </Head>

      <div ref={shellRef} className="app-shell">
        {/* Ambient background layers */}
        {!shouldReduceMotion ? (
          <div className="ambient-bg" aria-hidden="true">
            <motion.span className="ambient-orb orb--a" style={{ y: bgParallaxA }} />
            <motion.span className="ambient-orb orb--b" style={{ y: bgParallaxB }} />
            <motion.span className="ambient-orb orb--c" style={{ y: bgParallaxC }} />
          </div>
        ) : null}

        {/* NAVBAR */}
        <header className={`nav-glass ${navCompact ? "nav-compact" : ""}`}>
          <div className="nav-logo">
            <div className="nav-badge">RP</div>
            <div className="nav-meta">
              <div style={{ fontSize: "0.9rem", fontWeight: 600 }}>Ritvick Pant</div>
              <div style={{ fontSize: "0.75rem", color: "var(--muted)", fontWeight: 500 }}>
                Full Stack Developer
              </div>
            </div>
          </div>

          <nav className="nav-links">
            {navLinks.map((link) => (
              <button
                key={link.id}
                type="button"
                className={`nav-link ${activeSection === link.id ? "is-active" : ""}`}
                onClick={() => scrollToSection(link.id)}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <a
            href="/RITVICK_PANT_SDE_Resume.pdf"
            className="pill-cta"
            download="RITVICK_PANT_SDE_Resume.pdf"
          >
            Download CV
          </a>
        </header>

        {/* Section indicator */}
        <aside className="section-indicator" aria-label="Page sections">
          {SECTION_IDS.map((id) => (
            <button
              key={id}
              type="button"
              className={`indicator-dot ${activeSection === id ? "is-active" : ""}`}
              onClick={() => scrollToSection(id)}
              aria-label={`Go to ${id}`}
            />
          ))}
        </aside>

        {/* HERO */}
        <motion.section
          id="section-hero"
          className="panel hero"
          style={{ y: heroParallax }}
          initial={shouldReduceMotion ? false : { opacity: 0, y: 40 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="hero-stage">
            <div className="hero-right">
              <div className="hero-avatar-wrap" aria-hidden="true">
                <img
                  src="/images/Ritvick-Avatar.webp"
                  alt="Ritvick avatar"
                  className="hero-avatar-img"
                />
              </div>
            </div>

            <div className="hero-copy">
              <h1 className="hero-title">
                I&apos;m <span>Ritvick</span>, a Full Stack Developer{" "}
                building <span>high-scale architecture</span>.
              </h1>
            </div>
          </div>
        </motion.section>

        {/* ABOUT */}
        <section id="section-about" className="panel section section--panel" aria-label="About">
          <div className="section-header">
            <div>
              <p className="section-kicker">About</p>
              <h2 className="section-title">A calm builder with a bias for UX.</h2>
            </div>
            <p className="section-subtitle">
              Full Stack Developer with a background in high-scale telecom (Nokia) and agile startup leadership. Specialized in shipping AI-integrated features from MVP to production.
            </p>
          </div>

          <div className="about-grid">
            <motion.article
              className="card-glass"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 14, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            >
              <p className="card-pill">Now</p>
              <h3 className="card-heading">Tech Lead & Engineering Manager</h3>
              <p className="card-body">
                I lead a team of developers and set the technical direction across our products.
                My day-to-day is a mix of architecture, delivery, and mentoring.
              </p>
            </motion.article>
            <motion.article
              className="card-glass"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 14, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.45, ease: "easeOut", delay: 0.05 }}
            >
              <p className="card-pill">Team</p>
              <h3 className="card-heading">Leadership that scales</h3>
              <ul className="about-points">
                <li>Hiring & onboarding, with clear technical growth paths.</li>
                <li>Code reviews, design reviews, and practical engineering standards.</li>
                <li>Turn ambiguity into roadmap-ready deliverables.</li>
              </ul>
            </motion.article>

            <motion.article
              className="card-glass"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 14, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.45, ease: "easeOut", delay: 0.1 }}
            >
              <p className="card-pill">AI</p>
              <h3 className="card-heading">Built 2-3 AI products</h3>
              <p className="card-body">
                I help our firm ship AI-powered features—pairing product thinking with engineering
                fundamentals like evaluation, reliability, and observability.
              </p>
            </motion.article>

            <motion.article
              className="card-glass"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 14, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.45, ease: "easeOut", delay: 0.15 }}
            >
              <p className="card-pill">Philosophy</p>
              <h3 className="card-heading">Pragmatic, user-first engineering</h3>
              <ul className="about-points">
                <li>Performance and accessibility baked in—not bolted on.</li>
                <li>Automate where it removes busywork and reduces risk.</li>
                <li>Clear documentation so teams move faster.</li>
              </ul>
            </motion.article>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section
          id="section-experience"
          className="panel section section--panel"
          aria-label="Work experience"
        >
          <div className="section-header">
            <div>
              <p className="section-kicker">Experience</p>
              <h2 className="section-title">Where I&apos;ve been learning by doing.</h2>
            </div>
          </div>


          
          <ExperienceBeam items={experiences} />
        </section>

        {/* PROJECTS – pinned panel, vertical scroll drives horizontal cards */}
        <HorizontalScrollSection
          id="section-projects"
          kicker="Projects"
          title="Personal projects that helped me practice."
        >
          {projects.map((project) => (
            <article key={project.href} className="glass-hover-card">
              {project.image && (
                <img
                  src={project.image}
                  alt={project.displayTitle ?? project.title}
                  className="ghc-bg-image"
                />
              )}
              <div className="ghc-glass-pane">
                <div className="ghc-pane-top">
                  <p className="ghc-badge">{project.badge}</p>
                  <a
                    className="ghc-cta"
                    href={project.href}
                    target={project.external ? "_blank" : "_self"}
                    rel={project.external ? "noreferrer" : undefined}
                  >
                    {project.external ? "Visit" : "Open"} ↗
                  </a>
                </div>
                <div>
                  <h3 className="ghc-title">{project.displayTitle ?? project.title}</h3>
                  <p className="ghc-desc">{project.description}</p>
                </div>
              </div>
            </article>
          ))}
        </HorizontalScrollSection>

        {/* SKILLS */}
        <section
          id="section-skills"
          className="panel section skills-section"
          aria-label="Skills"
        >
          <div className="section-header" style={{ justifyContent: "center" }}>
            <div style={{ textAlign: "center" }}>
              <p className="section-kicker">Tech Stack</p>
              <h2 className="section-title">Tools I&apos;m comfortable shipping with.</h2>
            </div>
          </div>

          <div className="skills-grid">
            {skills.map((skill) => {
              const Icon = skillIcons[skill];
              return (
                <motion.div
                  key={skill}
                  className="skill-card"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <div className="skill-icon" aria-hidden="true">
                    {Icon ? <Icon size={20} /> : null}
                  </div>
                  <span className="skill-label">{skill}</span>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* CONTACT */}
        <section
          id="section-contact"
          className="panel section section--panel"
          aria-label="Contact"
        >
          <div className="section-header">
            <div>
              <p className="section-kicker">Contact</p>
              <h2 className="section-title">
                Let&apos;s talk about your next interface.
              </h2>
            </div>
          </div>

          <div className="section-grid">
            <article className="card-glass">
              <p className="card-pill">Message</p>
              <h3 className="card-heading">Quick hello</h3>
              <p className="card-body">
                Have an idea, a role, or a project in mind? Send me a short note and
                I&apos;ll get back to you.
              </p>
              <a href="mailto:ritvickp9@gmail.com" className="pill-cta" style={{ marginTop: "1rem" }}>
                Email me
              </a>
            </article>

            <article className="card-glass">
              <p className="card-pill">Social</p>
              <h3 className="card-heading">Find me online</h3>
              <p className="card-body">
                I share experiments, code sketches and occasional thoughts on frontend
                craft.
              </p>
              <div style={{ display: "flex", gap: "1rem", marginTop: "1.25rem" }}>
                <a
                  href="https://www.linkedin.com/in/ritvick-pant/"
                  target="_blank"
                  rel="noreferrer"
                  className="footer-link"
                  aria-label="LinkedIn"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </a>
                <a
                  href="https://github.com/ritvickp9"
                  target="_blank"
                  rel="noreferrer"
                  className="footer-link"
                  aria-label="GitHub"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                </a>
              </div>
            </article>
          </div>
        </section>

        <footer className="footer">
          <span>© {new Date().getFullYear()} Ritvick Pant</span>
          <div className="footer-links">
            <a
              href="https://www.linkedin.com/in/ritvick-pant/"
              target="_blank"
              rel="noreferrer"
              className="footer-link"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/ritvickp9"
              target="_blank"
              rel="noreferrer"
              className="footer-link"
            >
              GitHub
            </a>
          </div>
        </footer>
      </div>
    </>
  );
}

