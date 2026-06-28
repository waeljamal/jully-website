/* =========================================
   AFRO HAIR ANKARA
   script.js - PART 1
   Core setup, preloader, navbar, mobile menu
========================================= */

document.addEventListener("DOMContentLoaded", () => {
  const preloader = document.getElementById("preloader");
  const header = document.getElementById("header");
  const menu = document.getElementById("menu");
  const mobileMenuBtn = document.querySelector(".mobile-menu");
  const navLinks = document.querySelectorAll(".nav-menu a");
  const heroVideo = document.querySelector(".hero-video");

  /* PRELOADER */
  window.addEventListener("load", () => {
    setTimeout(() => {
      if (preloader) {
        preloader.style.opacity = "0";
        preloader.style.visibility = "hidden";
      }

      if (heroVideo) {
        heroVideo.style.opacity = "0.72";
      }
    }, 900);
  });

  /* STICKY HEADER */
  const handleHeaderScroll = () => {
    if (!header) return;

    if (window.scrollY > 70) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", handleHeaderScroll);
  handleHeaderScroll();

  /* MOBILE MENU */
  if (mobileMenuBtn && menu) {
    mobileMenuBtn.addEventListener("click", () => {
      menu.classList.toggle("active");

      if (menu.classList.contains("active")) {
        mobileMenuBtn.textContent = "✕";
        document.body.style.overflow = "hidden";
      } else {
        mobileMenuBtn.textContent = "☰";
        document.body.style.overflow = "";
      }
    });
  }

  /* CLOSE MOBILE MENU WHEN CLICKING NAV LINK */
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (menu && menu.classList.contains("active")) {
        menu.classList.remove("active");
        document.body.style.overflow = "";

        if (mobileMenuBtn) {
          mobileMenuBtn.textContent = "☰";
        }
      }
    });
  });

  /* SMOOTH SCROLL WITH HEADER OFFSET */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const targetId = anchor.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const targetElement = document.querySelector(targetId);

      if (!targetElement) return;

      event.preventDefault();

      const headerOffset = 80;
      const targetPosition =
        targetElement.getBoundingClientRect().top + window.scrollY - headerOffset;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    });
  });

  /* ACTIVE NAVIGATION ON SCROLL */
  const sections = document.querySelectorAll("section[id]");

  const setActiveNavigation = () => {
    let currentSection = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 130;

      if (window.scrollY >= sectionTop) {
        currentSection = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");

      if (link.getAttribute("href") === `#${currentSection}`) {
        link.classList.add("active");
      }
    });
  };

  window.addEventListener("scroll", setActiveNavigation);
  setActiveNavigation();
  /* =========================================
     PART 2
     Scroll Reveal + Counters + Hero Effects
  ========================================= */

  /* SCROLL REVEAL */

  const revealElements = document.querySelectorAll(
    ".service-card, .gallery-item, .about-card, .stat-box"
  );

  const revealOnScroll = () => {
    const trigger = window.innerHeight * 0.88;

    revealElements.forEach((element) => {
      const top = element.getBoundingClientRect().top;

      if (top < trigger) {
        element.classList.add("show");
      }
    });
  };

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll();

  /* HERO PARALLAX */

  const hero = document.querySelector(".hero");

  window.addEventListener("scroll", () => {
    const y = window.scrollY;

    if (hero) {
      hero.style.backgroundPositionY = `${y * 0.5}px`;
    }
  });

  /* HERO VIDEO PLAY */

  if (heroVideo) {
    heroVideo.play().catch(() => {});
  }

  /* ANIMATED COUNTERS */

  const counters = document.querySelectorAll(".stat-box strong");

  let counterStarted = false;

  const startCounters = () => {
    if (counterStarted) return;

    const section = document.querySelector(".stats-grid");

    if (!section) return;

    if (section.getBoundingClientRect().top < window.innerHeight - 120) {

      counterStarted = true;

      counters.forEach((counter) => {

        const text = counter.textContent;

        const number = parseInt(text.replace(/\D/g, ""));

        if (isNaN(number)) return;

        let current = 0;

        const speed = Math.max(20, Math.floor(number / 40));

        const update = () => {

          current += speed;

          if (current >= number) {

            counter.textContent = text;

            return;

          }

          if (text.includes("+")) {

            counter.textContent = current + "+";

          }

          else {

            counter.textContent = current;

          }

          requestAnimationFrame(update);

        };

        update();

      });

    }

  };

  window.addEventListener("scroll", startCounters);

  startCounters();

  /* IMAGE HOVER EFFECT */

  document.querySelectorAll(".gallery-item img").forEach((img) => {

    img.addEventListener("mousemove", (e) => {

      const rect = img.getBoundingClientRect();

      const x = e.clientX - rect.left;

      const y = e.clientY - rect.top;

      img.style.transformOrigin = `${x}px ${y}px`;

    });

  });

  /* HERO BUTTON EFFECT */

  document.querySelectorAll(".btn").forEach((button) => {

    button.addEventListener("mouseenter", () => {

      button.style.transform = "translateY(-4px) scale(1.02)";

    });

    button.addEventListener("mouseleave", () => {

      button.style.transform = "";

    });

  });
     /* =========================================
     PART 3
     Cursor Glow + Gold Particles + Floating Lights
  ========================================= */

  /* CURSOR GOLD GLOW */
  const cursorGlow = document.createElement("div");
  cursorGlow.className = "cursor-glow";
  document.body.appendChild(cursorGlow);

  document.addEventListener("mousemove", (e) => {
    cursorGlow.style.left = `${e.clientX}px`;
    cursorGlow.style.top = `${e.clientY}px`;
  });

  /* GOLD CLICK PARTICLES */
  document.addEventListener("click", (e) => {
    for (let i = 0; i < 8; i++) {
      createGoldParticle(e.clientX, e.clientY);
    }
  });

  function createGoldParticle(x, y) {
    const particle = document.createElement("span");
    particle.className = "gold-particle";

    const size = Math.random() * 7 + 4;
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 90 + 30;

    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;

    particle.style.setProperty("--x", `${Math.cos(angle) * distance}px`);
    particle.style.setProperty("--y", `${Math.sin(angle) * distance}px`);

    document.body.appendChild(particle);

    setTimeout(() => {
      particle.remove();
    }, 850);
  }

  /* FLOATING GOLD LIGHTS */
  const lightsWrapper = document.createElement("div");
  lightsWrapper.className = "floating-lights";
  document.body.appendChild(lightsWrapper);

  for (let i = 0; i < 7; i++) {
    const light = document.createElement("span");

    light.style.left = `${Math.random() * 100}%`;
    light.style.top = `${Math.random() * 100}%`;
    light.style.animationDelay = `${Math.random() * 8}s`;
    light.style.animationDuration = `${10 + Math.random() * 15}s`;

    lightsWrapper.appendChild(light);
  }

  /* WHATSAPP PULSE */
  const whatsappButton = document.querySelector(".float-whatsapp");

  if (whatsappButton) {
    setInterval(() => {
      whatsappButton.classList.add("pulse");

      setTimeout(() => {
        whatsappButton.classList.remove("pulse");
      }, 900);
    }, 4000);
  }

  /* BACK TO TOP BUTTON */
  const backToTop = document.createElement("button");
  backToTop.className = "back-to-top";
  backToTop.innerHTML = "↑";
  document.body.appendChild(backToTop);

  window.addEventListener("scroll", () => {
    if (window.scrollY > 650) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
     /* =========================================
     PART 4
     Final Utilities + Close Main Function
  ========================================= */

  /* ADD ACTIVE STYLE SUPPORT */
  navLinks.forEach((link) => {
    link.addEventListener("mouseenter", () => {
      link.style.color = "#d4af37";
    });

    link.addEventListener("mouseleave", () => {
      if (!link.classList.contains("active")) {
        link.style.color = "";
      }
    });
  });

  /* COPY IBAN ON CLICK */
  const ibanBox = document.querySelector(".iban-box");

  if (ibanBox) {
    ibanBox.style.cursor = "pointer";
    ibanBox.title = "IBAN kopyalamak için tıklayın";

    ibanBox.addEventListener("click", () => {
      const iban = "TR46 0011 1000 0000 0152 0406 81";

      navigator.clipboard.writeText(iban).then(() => {
        showSmallToast("IBAN kopyalandı");
      });
    });
  }

  /* SMALL TOAST */
  function showSmallToast(message) {
    const toast = document.createElement("div");
    toast.className = "small-toast";
    toast.textContent = message;

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.classList.add("show");
    }, 50);

    setTimeout(() => {
      toast.classList.remove("show");

      setTimeout(() => {
        toast.remove();
      }, 400);
    }, 2200);
  }

  /* CURRENT YEAR */
  const yearSpan = document.querySelector("[data-year]");

  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

});
