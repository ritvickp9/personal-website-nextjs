import Head from "next/head";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const hiddenElements = document.querySelectorAll(".hidden");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        } else {
          entry.target.classList.remove("show");
        }
      });
    });
    hiddenElements.forEach((el) => observer.observe(el));

    const hiddenTextElements = document.querySelectorAll(".texthidden");
    const textObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("textshow");
        } else {
          entry.target.classList.remove("textshow");
        }
      });
    });
    hiddenTextElements.forEach((el) => textObserver.observe(el));

    if (window.ScrollMagic && window.TimelineMax) {
      const controller = new window.ScrollMagic.Controller();
      const timeline = new window.TimelineMax();

      timeline.to(".middle", 10, { y: -1800 });

      new window.ScrollMagic.Scene({
        triggerElement: "section",
        duration: "300%",
        triggerHook: 0,
      })
        .setTween(timeline)
        .setPin("section")
        .addTo(controller);
    }

    return () => {
      observer.disconnect();
      textObserver.disconnect();
    };
  }, []);

  return (
    <>
      <Head>
        <title>Ritvick Pant</title>
      </Head>
      <nav className="navbar navbar-expand-lg navbar-dark shadow-5-strong fixed-top">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            RP
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="/RITVICK PANT_WEB DEV.pdf"
                  download="RITVICK PANT_WEB DEV.pdf"
                >
                  CV-Download
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#contact-me">
                  Contact-Me
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#project">
                  Projects
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="top">
        <img
          src="/images/greg-rakozy-0LU4vO5iFpM-unsplash.jpg"
          alt="Greg Rakozy on Unsplash"
          className="background"
        />
        <div className="title">
          <h1>I&apos;m Ritvick</h1>
          <h2>an engineer</h2>
        </div>
      </div>
      <img className="rocket" src="/images/rocket.png" alt="Rocket" />

      <div className="transform">
        <div className="middle">
          <img
            className="mypic"
            src="/images/Ritvick Avatar.webp"
            alt="My Picture"
          />
          <h2>happy to see you, here&apos;s a peep into my life</h2>
        </div>
        <div className="workex">
          <img
            className="workPic hidden"
            src="/images/Ritvick workex.webp"
            alt=""
          />
          <div className="workexContent">
            <h1>Work Experience</h1>
            <div className="workexCard hidden">
              <div className="content">
                <div className="back">
                  <div className="back-content">
                    <i
                      className="fa-solid fa-tractor"
                      style={{ fontSize: "50px" }}
                    />
                    <strong>Jun 2018</strong>
                    <strong>CNH Industrials</strong>
                  </div>
                </div>
                <div className="front">
                  <div className="img">
                    <div className="circle" />
                    <div className="circle" id="right" />
                    <div className="circle" id="bottom" />
                  </div>

                  <div className="front-content">
                    <small className="badge">More</small>
                    <div className="description">
                      <div className="workexTitle">
                        <p className="workexTitle">
                          <strong>R&amp;D Operations Bay Summer Intern</strong>
                        </p>
                      </div>
                      <p>
                        My task was to create a checklist for evaluating the
                        engineering drawings my seniors made. This checklist
                        helped my seniors review their work before sending it
                        for formal evaluation
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="workexCard texthidden">
              <div className="content">
                <div className="back">
                  <div className="back-content">
                    <i
                      className="fas fa-chalkboard-teacher"
                      style={{ fontSize: "50px" }}
                    />
                    <strong>Feb 2021-Apr 2021</strong>
                    <strong>LIDO LEARNING</strong>
                  </div>
                </div>
                <div className="front">
                  <div className="img">
                    <div className="circle" />
                    <div className="circle" id="right" />
                    <div className="circle" id="bottom" />
                  </div>

                  <div className="front-content">
                    <small className="badge">More</small>
                    <div className="description">
                      <div className="workexTitle">
                        <p className="workexTitle">
                          <strong>Business Development Associate</strong>
                        </p>
                      </div>
                      <p>
                        First to clear the on-ground training phase on the first
                        day itself with the highest package sold
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="workexCard texthidden">
              <div className="content">
                <div className="back">
                  <div className="back-content">
                    <i
                      className="fas fa-laptop-code"
                      style={{ fontSize: "50px" }}
                    />
                    <strong>Aug 2023-Present</strong>
                    <strong>Elikem(Nokia IT)</strong>
                  </div>
                </div>
                <div className="front">
                  <div className="img">
                    <div className="circle" />
                    <div className="circle" id="right" />
                    <div className="circle" id="bottom" />
                  </div>

                  <div className="front-content">
                    <small className="badge">More</small>
                    <div className="description">
                      <div className="workexTitle">
                        <p className="workexTitle">
                          <strong>Frontend Developer</strong>
                        </p>
                      </div>
                      <p>
                        Leading the team, building our main web app from scratch
                        using React and NodeJs. Maintained and built new
                        features for the Angular + Springboot dashboard. Built
                        multiple dashboards using different technologies
                        (Flask, React, etc.)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="project">
        <h1>Personal Project Library</h1>
        <h2>
          These are some of the projects that helped me in learning frontend
          development
        </h2>
        <div className="row">
          <div className="column col-lg-4 col-md-4">
            <div className="card hidden">
              <img src="/images/Dice.PNG" alt="" />
              <a href="/projects/Dice Challenge/dicee.html" target="_blank">
                Dice Challenge
              </a>
            </div>
          </div>
          <div className="column col-lg-4 col-md-4">
            <div className="card hidden">
              <img src="/images/Drum.PNG" alt="" />
              <a href="/projects/Drum Kit/index.html" target="_blank">
                Drum Kit
              </a>
            </div>
          </div>
          <div className="column col-lg-4 col-md-4">
            <div className="card hidden">
              <img src="/images/Simon.PNG" alt="" />
              <a href="/projects/Simon Game/index.html" target="_blank">
                Simon Game
              </a>
            </div>
          </div>
          <div className="column col-lg-4 col-md-4">
            <div className="card hidden">
              <img src="/images/Tindog.PNG" alt="" />
              <a
                href="/projects/TinDog-Start-master/index.html"
                target="_blank"
              >
                TinDog
              </a>
            </div>
          </div>
          <div className="column col-lg-4 col-md-4">
            <div className="card hidden">
              <img src="/images/Weather.PNG" alt="" />
              <a href="/projects/Weather/index.html" target="_blank">
                Weather App
              </a>
            </div>
            <img
              className="studyPic hidden"
              src="/images/Ritvick Study.webp"
              alt=""
            />
          </div>
          <div className="column col-lg-4 col-md-4">
            <a href="https://rider-life-nextjs.vercel.app/" target="_blank">
              <div className="card hidden">
                <img src="/images/rider-life.jpg" alt="" />
                <p>Rider Life</p>
              </div>
            </a>
          </div>
        </div>
      </div>

      <div id="skills">
        <img
          className="skill1Pic hidden"
          src="/images/Ritvick skill1.webp"
          alt=""
        />
        <img
          className="skill2Pic texthidden"
          src="/images/Ritvick skill2.webp"
          alt=""
        />
        <div className="skillContent">
          <h1>Skills</h1>
          <div className="row">
            {[
              "HTML",
              "CSS",
              "Bootstrap",
              "Javascript",
              "EJS",
              "Node.Js",
              "Express",
              "React",
              "Angular",
            ].map((skill, index) => (
              <div
                key={skill}
                className="column col-lg-3 col-md-4"
              >
                <div className={index % 2 === 0 ? "card texthidden" : "card hidden"}>
                  <p>{skill}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div id="contact-me">
        <h2>Get In Touch</h2>
        <h3>For any further query feel free to contact me</h3>
        <p>
          Below are my socials where you can connect with me to know about all
          the future updates.
        </p>
        <br />

        <div className="contactCard">
          <span>Social</span>
          <a
            className="social-link"
            href="https://www.linkedin.com/in/ritvick-pant/"
          >
            <i className="fa-brands fa-linkedin" />
          </a>
          <a className="social-link" href="https://github.com/ritvickp9">
            <i className="fa-brands fa-github" />
          </a>
          <a className="social-link" href="mailto:ritvickp9@gmail.com">
            <i className="fa-solid fa-envelope" />
          </a>
        </div>
      </div>

      <footer>
        <a
          rel="noopener"
          className="fa-brands fa-footer fa-linkedin"
          href="https://www.linkedin.com/in/ritvick-pant/"
          target="_blank"
        />
        <a
          rel="noopener"
          className="fa-brands fa-footer fa-github"
          href="https://github.com/ritvickp9"
          target="_blank"
        />
        <a
          rel="noopener"
          className="fa-solid fa-footer fa-envelope"
          href="mailto:ritvickp9@gmail.com"
        />
        <p>Copyright @ Ritvick Pant 2023</p>
      </footer>
    </>
  );
}

