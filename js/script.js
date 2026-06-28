/* ===============================
   AFRO HAIR ANKARA - MAIN SCRIPT
================================ */

document.addEventListener("DOMContentLoaded", () => {
  const preloader = document.getElementById("preloader");
  const header = document.querySelector("header");
  const menu = document.getElementById("menu");
  const mobileMenu = document.querySelector(".mobile-menu");
  const video = document.querySelector("#home video");

  /* PRELOADER */
  window.addEventListener("load", () => {
    if (preloader) {
      preloader.style.opacity = "0";
      preloader.style.visibility = "hidden";
      preloader.style.transition = "0.6s ease";
    }

    if (video) {
      video.style.opacity = "1";
    }
  });

  /* STICKY HEADER */
  window.addEventListener("scroll", () => {
    if (window.scrollY > 80) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  /* MOBILE MENU */
  if (mobileMenu && menu) {
    mobileMenu.addEventListener("click", () => {
      menu.classList.toggle("active");
      mobileMenu.textContent = menu.classList.contains("active") ? "✕" : "☰";
    });

    document.querySelectorAll("#menu a").forEach((link) => {
      link.addEventListener("click", () => {
        menu.classList.remove("active");
        mobileMenu.textContent = "☰";
      });
    });
  }

  /* SCROLL REVEAL */
  const revealItems = document.querySelectorAll(
    ".service-card, .fade, .gallery-grid img, .gallery-grid video"
  );

  const revealOnScroll = () => {
    revealItems.forEach((item) => {
      const itemTop = item.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (itemTop < windowHeight - 90) {
        item.classList.add("show");
        item.classList.add("active");
      }
    });
  };

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll();

  /* SMOOTH ANCHOR OFFSET */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));

      if (target) {
        e.preventDefault();

        const offset = 80;
        const position = target.offsetTop - offset;

        window.scrollTo({
          top: position,
          behavior: "smooth",
        });
      }
    });
  });

  /* CINEMATIC CURSOR GLOW */
  const cursorGlow = document.createElement("div");
  cursorGlow.className = "cursor-glow";
  document.body.appendChild(cursorGlow);

  document.addEventListener("mousemove", (e) => {
    cursorGlow.style.left = `${e.clientX}px`;
    cursorGlow.style.top = `${e.clientY}px`;
  });

  /* GOLD PARTICLE ON CLICK */
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

  /* FLOATING LIGHTS */
  createFloatingLights();

  function createFloatingLights() {
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
  }

  /* WHATSAPP BUTTON PULSE */
  const whatsapp = document.querySelector(".whatsapp-button");

  if (whatsapp) {
    setInterval(() => {
      whatsapp.classList.add("pulse");

      setTimeout(() => {
        whatsapp.classList.remove("pulse");
      }, 900);
    }, 4000);
  }
});
