import Head from "next/head";
import { useMemo, useRef, useState, useEffect } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import {
  SiAngular,
  SiBootstrap,
  SiCss,
  SiExpress,
  SiHtml5,
  SiJavascript,
  SiNextdotjs,
  SiNodedotjs,
  SiReact,
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
  "HTML",
  "CSS",
  "Bootstrap",
  "JavaScript",
  "React",
  "Next.js",
  "Node.js",
  "Express",
  "Angular",
];

const skillIcons = {
  HTML: SiHtml5,
  CSS: SiCss,
  Bootstrap: SiBootstrap,
  JavaScript: SiJavascript,
  React: SiReact,
  "Next.js": SiNextdotjs,
  "Node.js": SiNodedotjs,
  Express: SiExpress,
  Angular: SiAngular,
};

const experiences = [
  {
    period: "September 2025 - Present · Ease My Expo",
    role: "Tech Lead",
    description:
      "Leading the team, building our main web app from scratch using React and Node.js. Maintained and built new features for the Angular + Spring Boot dashboard and created multiple dashboards with tools like Flask and React.",
  },
  {
    period: "April 2025 – September 2025 · Elikem (Nokia IT)",
    role: "Sr. Frontend Developer",
    description:
      "Leading the team, building our main web app from scratch using React and Node.js. Maintained and built new features for the Angular + Spring Boot dashboard and created multiple dashboards with tools like Flask and React.",
  },
  {
    period: "Aug 2023 – April 2025 · Elikem (Nokia IT)",
    role: "Frontend Developer",
    description:
      "Leading the team, building our main web app from scratch using React and Node.js. Maintained and built new features for the Angular + Spring Boot dashboard and created multiple dashboards with tools like Flask and React.",
  },
  {
    period: "Feb 2021 – Apr 2021 · Lido Learning",
    role: "Business Development Associate",
    description:
      "First to clear the on-ground training phase on the first day itself with the highest package sold — an intense crash course in understanding people, communication and trust.",
  },
  {
    period: "Jun 2018 · CNH Industrials",
    role: "R&D Operations Bay Summer Intern",
    description:
      "Created a practical checklist for evaluating engineering drawings that helped seniors review their work before formal evaluation — small process improvements with a big impact on quality.",
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
    const ids = SECTION_IDS.map((id) => `section-${id}`);
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];
        if (!visible?.target?.id) return;
        setActiveSection(visible.target.id.replace("section-", ""));
      },
      { threshold: [0.35, 0.5, 0.65] }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
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
        <title>Ritvick Pant · Frontend Engineer</title>
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
              <div style={{ fontSize: "0.75rem", color: "#9ca3af" }}>
                Frontend Engineer
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
                I&apos;m <span>Ritvick</span>, an engineer who loves{" "}
                <span>delightful interfaces</span>.
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
              Tech lead focused on shipping reliable products (and building AI features that stay usable in the real world).
            </p>
          </div>

          <div className="about-summary" aria-hidden="true">
            <span className="about-chip">Tech Leadership</span>
            <span className="about-chip">AI Product Delivery</span>
            <span className="about-chip">Pragmatic Engineering</span>
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
          title="Personal projects that helped me practice the frontend stack."
        >
          {projects.map((project) => (
            <article key={project.href} className="card-glass project-card">
              <div className="hcard-top">
                <div>
                  <p className="card-pill">{project.badge}</p>
                  <h3 className="hcard-title">{project.displayTitle ?? project.title}</h3>
                </div>
                <div className="hcard-actions">
                  <a
                    className="btn-small"
                    href={project.href}
                    target={project.external ? "_blank" : "_self"}
                    rel={project.external ? "noreferrer" : undefined}
                  >
                    {project.external ? "Visit" : "Open"}
                  </a>
                </div>
              </div>
              <div className="project-card-body">
                <div className="project-card-text">
                  <p className="card-body">{project.description}</p>
                  <ul className="project-points">
                    <li>Built with vanilla JS, HTML and CSS.</li>
                    <li>Focus on core frontend skills: layout, state and interaction.</li>
                  </ul>
                </div>
                {project.image && (
                  <div className="project-card-media">
                    <img
                      src={project.image}
                      alt={project.displayTitle ?? project.title}
                      className="project-thumb"
                    />
                  </div>
                )}
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
              <a href="mailto:ritvickp9@gmail.com" className="card-badge">
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
              <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.85rem" }}>
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

