import { useEffect, useRef, useState } from "react";
import "./App.css";
import * as React from "react";

type Project = {
  id: number;
  title: string;
  description: string;
  techStack: string[];
  codeUrl?: string;
  demoUrl?: string;
};

const projects: Project[] = [
  {
    id: 1,
    title: "Realtime Collaboration Board",
    description:
      "A Trello-style kanban board with realtime multiplayer updates, optimistic UI, and keyboard-first workflows for power users.",
    techStack: ["TypeScript", "React", "WebSockets", "Node.js"],
    codeUrl: "#",
    demoUrl: "#",
  },
  {
    id: 2,
    title: "Developer Portfolio Generator",
    description:
      "CLI and web UI that generate and deploy a polished portfolio site from a GitHub profile and a few prompts.",
    techStack: ["Vite", "React", "Tailwind CSS", "GitHub API"],
    codeUrl: "#",
    demoUrl: "#",
  },
  {
    id: 3,
    title: "Engineering Metrics Dashboard",
    description:
      "Aggregates CI, deployment, and issue data into a single dashboard for tracking engineering health over time.",
    techStack: ["TypeScript", "React", "D3.js", "REST APIs"],
    codeUrl: "#",
    demoUrl: "#",
  },
];

const RESUME_URL = "/resume.pdf";
const CONTACT_EMAIL = "placeholder@example.com";

function App() {
  const [arrowInTopHalf, setArrowInTopHalf] = useState(true);
  const scrollRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    const updateArrowPosition = () => {
      const node = scrollRef.current;
      if (!node) return;

      const rect = node.getBoundingClientRect();
      const arrowCenterY = rect.top + rect.height / 2;
      const viewportMid = window.innerHeight / 2;

      setArrowInTopHalf(arrowCenterY < viewportMid);
    };

    updateArrowPosition();
    window.addEventListener("scroll", updateArrowPosition);
    window.addEventListener("resize", updateArrowPosition);

    return () => {
      window.removeEventListener("scroll", updateArrowPosition);
      window.removeEventListener("resize", updateArrowPosition);
    };
  }, []);

  const handleHeroScrollClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault();
    if (arrowInTopHalf) {
      // Arrow is visually near the hero = scroll to the very top of the page
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Arrow is in the lower half = scroll down to projects
      const targetElement = document.getElementById("projects");
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };
  return (
    <div className='app'>
      <header className='header'>
        <div className='header__inner'>
          <nav className='navbar' aria-label='Back to top'>
              <a className='nav__link nav__link--primary' href='#hero' aria-label='Back to top'>
                  Home
              </a>
              <a className='nav__link nav__link--primary' href='#projects'>
                  Projects
              </a>
          </nav>
          <div className='nav-actions'>
            <a
              href={RESUME_URL}
              className='btn btn--secondary nav__cta'
              target='_blank'
              rel='noopener noreferrer'
            >
              GitHub
            </a>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className='btn btn--primary nav__cta'
            >
              Contact Me
            </a>
          </div>
        </div>
      </header>

      <main>
        <section
          id='hero'
          className='section section--hero'
          aria-label='Introduction'
        >
          <div className='section__inner section__inner--hero'>
            <div className='hero__content'>
              <h1 className='hero__title'>Connor Wallis</h1>
              <p className='hero__subtitle hero__subtitle--below'>
                Software engineer
              </p>
              <p className='hero__description'>
                I design, build, and ship end-to-end features in modern
                TypeScript and React stacks, with a focus on clean architecture,
                performance, and great developer experience.
              </p>
              <div className='hero__actions'>
                <a
                  href={RESUME_URL}
                  className='btn btn--secondary'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  GitHub
                </a>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className='btn btn--primary'
                >
                  Contact Me
                </a>
              </div>
              <a
                ref={scrollRef}
                href={arrowInTopHalf ? "#projects" : "#hero"}
                className='hero__scroll'
                aria-label={
                  arrowInTopHalf
                    ? "Scroll to projects section"
                    : "Scroll back to hero section"
                }
                onClick={handleHeroScrollClick}
              >
                <span className='hero__scroll-icon'>
                  {arrowInTopHalf ? "↑" : "↓"}
                </span>
              </a>
            </div>
          </div>
        </section>

        <section
          id='projects'
          className='section'
          aria-labelledby='projects-heading'
        >
          <div className='section__inner'>
            <header className='projects-header'>
              <h2 id='projects-heading' className='projects-header__title'>
                Projects
              </h2>
              <p className='projects-header__subtitle'>
                A few representative projects that highlight how I think about
                product engineering, performance, and developer experience.
              </p>
            </header>

            <div className='projects-grid'>
              {projects.map((project) => (
                <article key={project.id} className='project-card'>
                  <h3 className='project-card__title'>{project.title}</h3>
                  <p className='project-card__description'>
                    {project.description}
                  </p>
                  <ul
                    className='pill-list project-card__pills'
                    aria-label='Tech stack'
                  >
                    {project.techStack.map((tech) => (
                      <li key={tech} className='pill pill--subtle'>
                        {tech}
                      </li>
                    ))}
                  </ul>
                  {(project.codeUrl || project.demoUrl) && (
                    <div className='project-card__links'>
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          className='project-link'
                          aria-label={`${project.title} live demo (opens in a new tab)`}
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          Live demo
                        </a>
                      )}
                      {project.codeUrl && (
                        <a
                          href={project.codeUrl}
                          className='project-link'
                          aria-label={`${project.title} source code (opens in a new tab)`}
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          View code
                        </a>
                      )}
                    </div>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className='app-footer'>
        <div className='app-footer__inner'>
          <p className='app-footer__text'>
            © {new Date().getFullYear()} Connor. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
