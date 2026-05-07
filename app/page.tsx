"use client";

import {
  useState,
  useEffect,
  useRef,
  createContext,
  useContext,
  ReactNode,
} from "react";
import { useTheme } from "next-themes";
import { motion, useScroll, useSpring, useInView } from "framer-motion";
import { Linkedin, Sun, Moon, Languages, Pause, Play } from "lucide-react";
import { contentData } from "@/lib/data";
import { ShuffleCards } from "@/components/ui/testimonial-cards";
import ParticlesComponent from "@/components/ui/particles-bg";

const MotionCtx = createContext(false);

function RevealDiv({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduced = useContext(MotionCtx);

  if (reduced) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function RevealLi({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduced = useContext(MotionCtx);

  if (reduced) {
    return (
      <li ref={ref} className={className}>
        {children}
      </li>
    );
  }

  return (
    <motion.li
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.li>
  );
}

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [lang, setLang] = useState<"en" | "es">("en");
  const [motionOff, setMotionOff] = useState(false);
  const { theme, setTheme } = useTheme();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setMotionOff(mq.matches);
    const handler = (e: MediaQueryListEvent) => setMotionOff(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const content = contentData[lang];
  if (!mounted) return null;

  return (
    <MotionCtx.Provider value={motionOff}>
      <ParticlesComponent />
      {!motionOff && (
        <motion.div
          className="scroll-progress"
          style={{ scaleX }}
          aria-hidden="true"
        />
      )}

      <header role="banner">
        <nav className="site-nav" aria-label="Site controls">
          <button
            className="nav-toggle"
            onClick={() => setLang((l) => (l === "en" ? "es" : "en"))}
            aria-label={`Switch to ${lang === "en" ? "Español" : "English"}`}
          >
            <Languages size={13} aria-hidden="true" />
            <span>{lang === "en" ? "ES" : "EN"}</span>
          </button>

          <span className="nav-divider" aria-hidden="true" />

          <button
            className="nav-toggle"
            onClick={() => setMotionOff((m) => !m)}
            aria-label={motionOff ? "Enable animations" : "Reduce motion"}
            aria-pressed={motionOff}
          >
            {motionOff ? (
              <Play size={13} aria-hidden="true" />
            ) : (
              <Pause size={13} aria-hidden="true" />
            )}
          </button>

          <span className="nav-divider" aria-hidden="true" />

          <button
            className="nav-toggle"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? (
              <Sun size={13} aria-hidden="true" />
            ) : (
              <Moon size={13} aria-hidden="true" />
            )}
          </button>
        </nav>
      </header>

      <main id="main" tabIndex={-1}>
        {/* Hero */}
        <section className="hero" aria-labelledby="hero-name">
          <RevealDiv>
            <p className="hero-eyebrow">{content.role}</p>
            <h1 id="hero-name" className="hero-name">
              Yves
              <br />
              Roulin
            </h1>
            <p className="hero-tagline">{content.desc}</p>
            <a
              href="https://www.linkedin.com/in/yvesroulin/"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-cta"
            >
              <Linkedin size={15} aria-hidden="true" />
              {content.connect}
            </a>
          </RevealDiv>
        </section>

        <div className="content">
          {/* About */}
          <section className="section" aria-labelledby="about-heading">
            <RevealDiv>
              <p className="section-marker" aria-hidden="true">
                01
              </p>
              <h2 id="about-heading" className="section-heading">
                {content.about}
              </h2>
              <p className="section-lead">{content.aboutDesc}</p>
            </RevealDiv>
          </section>

          {/* Interests */}
          <section className="section" aria-labelledby="interests-heading">
            <RevealDiv>
              <p className="section-marker" aria-hidden="true">
                02
              </p>
              <h2 id="interests-heading" className="section-heading">
                {content.interests}
              </h2>
            </RevealDiv>
            <ul className="interest-flow" aria-label={content.interests}>
              {content.interestList.map((item, i) => (
                <RevealLi
                  key={item.name}
                  delay={i * 0.035}
                  className="interest-chip"
                >
                  {item.name}
                </RevealLi>
              ))}
            </ul>
          </section>

          {/* Technologies */}
          <section className="section" aria-labelledby="tech-heading">
            <RevealDiv>
              <p className="section-marker" aria-hidden="true">
                03
              </p>
              <h2 id="tech-heading" className="section-heading">
                {content.techTitle}
              </h2>
            </RevealDiv>
            <ul className="tech-list" aria-label={content.techTitle}>
              {content.techList.map((tech, i) => (
                <RevealLi
                  key={tech.name}
                  delay={i * 0.04}
                  className="tech-entry"
                >
                  <span className="tech-name">{tech.name}</span>
                  <span className="tech-cat">{tech.category}</span>
                </RevealLi>
              ))}
            </ul>
          </section>

          {/* Projects */}
          <section className="section" aria-labelledby="projects-heading">
            <RevealDiv>
              <p className="section-marker" aria-hidden="true">
                04
              </p>
              <h2 id="projects-heading" className="section-heading">
                {content.projectsTitle}
              </h2>
            </RevealDiv>
            <ol className="projects-list" aria-label={content.projectsTitle}>
              {content.projectsList.map((project, i) => (
                <RevealLi
                  key={project.title}
                  delay={i * 0.07}
                  className="project-row"
                >
                  <span className="project-num" aria-hidden="true">
                    0{i + 1}
                  </span>
                  <div>
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-desc">{project.description}</p>
                    <div
                      className="project-tags"
                      aria-label="Technologies used"
                    >
                      {project.tags.map((tag) => (
                        <span key={tag} className="project-tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </RevealLi>
              ))}
            </ol>
          </section>

          {/* Testimonials */}
          <section className="section" aria-labelledby="testimonials-heading">
            <RevealDiv>
              <p className="section-marker" aria-hidden="true">
                05
              </p>
              <h2 id="testimonials-heading" className="section-heading">
                {lang === "en" ? "What people say" : "Lo que dicen"}
              </h2>
            </RevealDiv>
            <ShuffleCards />
          </section>

          {/* Contact */}
          <section className="section" aria-labelledby="contact-heading">
            <RevealDiv>
              <p className="section-marker" aria-hidden="true">
                06
              </p>
              <h2 id="contact-heading" className="section-heading">
                {content.contactTitle}
              </h2>
              <p className="section-lead">{content.talkDesc}</p>
              <a
                href="https://www.linkedin.com/in/yvesroulin/"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
              >
                <Linkedin size={20} aria-hidden="true" />
                /yvesroulin
                <span className="contact-arrow" aria-hidden="true">
                  ↗
                </span>
              </a>
            </RevealDiv>
          </section>
        </div>
      </main>

      <footer className="site-footer" role="contentinfo">
        <p className="footer-copy">
          &copy; {new Date().getFullYear()} Yves Roulin. {content.footer}
        </p>
        <a
          href="https://www.linkedin.com/in/yvesroulin/"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link"
        >
          LinkedIn
        </a>
      </footer>
    </MotionCtx.Provider>
  );
}
