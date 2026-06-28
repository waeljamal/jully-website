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
