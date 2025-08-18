class PortfolioApp {
  constructor() {
    this.lastScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    this.navbarHidden = false;
    this.scrollThreshold = 10;
    this.navbarHeight = 0;
    this.scrollingDown = false;
    this.init();
  }

  init() {
    this.setupInstantNavScroll();
    this.setupNavbarScrollEffect();
    this.setupAdvancedScrollAnimations();
    this.setupContactForm();
    this.setupTypewriterEffects();
    this.setupManilaClock();
    this.setupHoverEffects();
    this.setupSkillBarAnimations();
    this.setupProjectsCarousel();
    this.setupProjectModals();
    this.setupEnhancedNavbar?.();
    this.setupSuperBouncyButton();
    this.setupAutoHideNavbar();
  }

  setupAutoHideNavbar() {
    const navbar = document.querySelector(".navbar");
    if (!navbar) return;

    this.navbarHeight = navbar.offsetHeight;
    let ticking = false;

    const handleScroll = () => {
      const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
      const scrollDifference = currentScrollPosition - this.lastScrollPosition;

      // Always show at top of page
      if (currentScrollPosition <= 50) {
        navbar.style.transform = "translateY(0)";
        navbar.classList.add("scrolled");
        this.navbarHidden = false;
        this.lastScrollPosition = currentScrollPosition;
        ticking = false;
        return;
      }

      // Ignore small scrolls
      if (Math.abs(scrollDifference) < this.scrollThreshold) {
        ticking = false;
        return;
      }

      // Determine scroll direction
      this.scrollingDown = scrollDifference > 0;

      // Scrolling down - hide navbar
      if (this.scrollingDown && !this.navbarHidden) {
        navbar.style.transform = `translateY(-${this.navbarHeight}px)`;
        this.navbarHidden = true;
      } 
      // Scrolling up - show navbar
      else if (!this.scrollingDown && this.navbarHidden) {
        navbar.style.transform = "translateY(0)";
        this.navbarHidden = false;
      }

      this.lastScrollPosition = currentScrollPosition;
      ticking = false;
    };

    window.addEventListener("scroll", () => {
      if (!ticking) {
        window.requestAnimationFrame(handleScroll);
        ticking = true;
      }
    });

    // Initialize navbar position and transition
    navbar.style.transition = "transform 0.3s ease";
    navbar.style.willChange = "transform";
  }

  setupInstantNavScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        const href = anchor.getAttribute("href");
        if (!href || href === "#") return;
        const target = document.querySelector(href);
        if (!target) return;

        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        if (history.pushState) history.pushState(null, "", href);
      });
    });
  }

  setupSuperBouncyButton() {
    const discoverBtn = document.getElementById("discoverBtn");
    if (!discoverBtn) return;

    discoverBtn.addEventListener("click", (e) => {
      e.preventDefault();

      discoverBtn.style.animation = "none";
      discoverBtn.offsetHeight;
      discoverBtn.style.animation =
        "clickBounce 0.6s ease, continuousBounce 2s ease-in-out infinite 0.6s";

      setTimeout(() => {
        const target = document.querySelector(discoverBtn.getAttribute("href"));
        if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);
    });
  }

  setupNavbarScrollEffect() {
    const navbar = document.querySelector(".navbar");
    if (!navbar) return;

    let ticking = false;
    const updateNavbar = () => {
      if (window.scrollY > 50) navbar.classList.add("scrolled");
      else navbar.classList.remove("scrolled");
      ticking = false;
    };

    window.addEventListener("scroll", () => {
      if (!ticking) {
        window.requestAnimationFrame(updateNavbar);
        ticking = true;
      }
    });

    updateNavbar();
  }

  setupAdvancedScrollAnimations() {
    const observerOptions = {
      threshold: 0.15,
      rootMargin: "0px 0px -100px 0px",
    };

    const educationObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add("animate-in");
          }, index * 150);
        }
      });
    }, observerOptions);

    const seminarsObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add("animate-in");
          }, index * 100);
        }
      });
    }, observerOptions);

    const generalObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animated");
          if (entry.target.classList.contains("skill-progress-bar")) {
            const targetWidth = entry.target.getAttribute("data-progress");
            entry.target.style.width = targetWidth;
          }
        }
      });
    }, observerOptions);

    document.querySelectorAll(".timeline-item").forEach((el) =>
      educationObserver.observe(el)
    );
    document.querySelectorAll(".seminar-item").forEach((el) =>
      seminarsObserver.observe(el)
    );
    document
      .querySelectorAll(".animate-on-scroll:not(.timeline-item):not(.seminar-item)")
      .forEach((el) => generalObserver.observe(el));
  }

  setupContactForm() {
    const contactForm = document.querySelector(".contact-form form");
    if (!contactForm) return;

    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const button = contactForm.querySelector(".btn-contact");
      const originalText = button.textContent;
      const formData = new FormData(contactForm);

      if (
        !formData.get("name") ||
        !formData.get("email") ||
        !formData.get("message")
      ) {
        this.showFormMessage(button, "Please fill all fields", false);
        return;
      }

      button.textContent = "Sending...";
      button.disabled = true;

      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        this.showFormMessage(button, "Message Sent!", true);
        contactForm.reset();
      } catch (_) {
        this.showFormMessage(button, "Error Sending", false);
      } finally {
        setTimeout(() => {
          button.textContent = originalText;
          button.disabled = false;
        }, 2000);
      }
    });
  }

  showFormMessage(button, message, isSuccess) {
    button.textContent = message;
    button.style.background = isSuccess
      ? "var(--spotify-gradient)"
      : "var(--error-color)";
    button.style.color = isSuccess ? "#0f0f0f" : "#fff";
  }

  setupTypewriterEffects() {
    const typingElement = document.getElementById("typing-text");
    if (!typingElement) return;

    const roles = ["WEB DEVELOPER", "COMPUTER ENGINEER"];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const typeEffect = () => {
      const currentRole = roles[roleIndex];

      if (isDeleting) {
        typingElement.textContent = currentRole.substring(0, charIndex--);
      } else {
        typingElement.textContent = currentRole.substring(0, charIndex++);
      }

      if (!isDeleting && charIndex === currentRole.length) {
        setTimeout(() => {
          isDeleting = true;
        }, 1100);
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }

      setTimeout(typeEffect, isDeleting ? 55 : 95);
    };

    typeEffect();
  }

  setupManilaClock() {
    const timeElement = document.getElementById("manilaTime");
    const dateElement = document.getElementById("manilaDate");
    if (!timeElement || !dateElement) return;

    const update = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString("en-US", {
        timeZone: "Asia/Manila",
        hour12: true,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      const dateString = now.toLocaleDateString("en-US", {
        timeZone: "Asia/Manila",
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      timeElement.textContent = timeString;
      dateElement.textContent = dateString;
    };

    update();
    setInterval(update, 1000);
  }

  setupHoverEffects() {
    const logo = document.querySelector(".navbar-brand-container");
    if (logo) {
      logo.addEventListener("mouseenter", () => {
        logo.style.transform = "scale(1.05)";
        logo.style.transition = "transform 0.3s ease";
      });
      logo.addEventListener("mouseleave", () => {
        logo.style.transform = "scale(1)";
      });
    }

    document.addEventListener("mouseover", (e) => {
      const interactive = e.target.closest("a, button, .hover-effect");
      if (interactive) interactive.style.transition = "all 0.2s ease";
    });
  }

  setupSkillBarAnimations() {
    const bars = document.querySelectorAll(".skill-progress-bar");
    if (!bars.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const width = entry.target.getAttribute("data-progress");
            entry.target.style.width = width;
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    bars.forEach((bar) => {
      bar.style.width = "0";
      observer.observe(bar);
    });
  }

  setupProjectsCarousel() {
    const track = document.querySelector(".carousel-track");
    const carousel = document.querySelector(".projects-carousel");
    if (!track || !carousel) return;

    track.innerHTML += track.innerHTML;

    carousel.addEventListener("mouseenter", () => {
      track.style.animationPlayState = "paused";
    });

    carousel.addEventListener("mouseleave", () => {
      track.style.animationPlayState = "running";
    });

    carousel.addEventListener("touchstart", () => {
      track.style.animationPlayState = "paused";
    });

    carousel.addEventListener("touchend", () => {
      setTimeout(() => {
        track.style.animationPlayState = "running";
      }, 100);
    });
  }

  setupProjectModals() {
    const projectCards = document.querySelectorAll(".project-card");
    if (!projectCards.length) return;

    projectCards.forEach((card) => {
      card.addEventListener("click", () => {
        const projectId = card.getAttribute("data-project");
        const projectInfo = document.querySelector(
          `#projectData .project-info[data-project="${projectId}"]`
        );

        if (projectInfo) {
          card.classList.add("loading");

          const projectName =
            projectInfo.querySelector(".project-name").textContent;
          const projectDescription =
            projectInfo.querySelector(".project-description").textContent;
          const projectImages = Array.from(
            projectInfo.querySelectorAll(".project-images img")
          ).map((img) => img.src);
          const projectTechnologies = projectInfo
            .querySelector(".project-technologies")
            .textContent.split(", ");

          document.getElementById("projectModalTitle").textContent = projectName;
          document.getElementById("projectModalName").textContent = projectName;
          document.getElementById("projectModalDescription").textContent =
            projectDescription;

          const images = [
            document.getElementById("mockupImage1"),
            document.getElementById("mockupImage2"),
            document.getElementById("mockupImage3"),
          ];

          images.forEach((img, index) => {
            if (projectImages[index]) {
              img.style.opacity = "0.5";
              img.src = projectImages[index];
              img.onload = () => {
                img.style.opacity = "1";
                img.style.transition = "opacity 0.3s ease";
              };
            }
          });

          const techContainer = document.getElementById("projectModalTech");
          techContainer.innerHTML = "";
          projectTechnologies.forEach((tech) => {
            const badge = document.createElement("span");
            badge.className = "badge bg-success";
            badge.textContent = tech.trim();
            techContainer.appendChild(badge);
          });

          setTimeout(() => {
            card.classList.remove("loading");
          }, 500);

          const modalElement = document.getElementById("projectModal");
          const modal = window.bootstrap.Modal.getOrCreateInstance(modalElement);
          modal.show();

          modalElement.addEventListener(
            "shown.bs.modal",
            () => {
              this.initializeCarousel();
            },
            { once: true }
          );
        }
      });
    });
  }

  initializeCarousel() {
    const slides = document.querySelectorAll(".mockup-slide");
    const indicators = document.querySelectorAll(".indicator");
    const prevBtn = document.querySelector(".carousel-control.prev");
    const nextBtn = document.querySelector(".carousel-control.next");
    let currentSlide = 0;

    const showSlide = (index) => {
      slides.forEach((slide, i) => {
        slide.classList.toggle("active", i === index);
      });
      indicators.forEach((indicator, i) => {
        indicator.classList.toggle("active", i === index);
      });
      currentSlide = index;
    };

    const nextSlide = () => {
      const next = (currentSlide + 1) % slides.length;
      showSlide(next);
    };

    const prevSlide = () => {
      const prev = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(prev);
    };

    if (prevBtn) prevBtn.addEventListener("click", prevSlide);
    if (nextBtn) nextBtn.addEventListener("click", nextSlide);

    indicators.forEach((indicator, index) => {
      indicator.addEventListener("click", () => showSlide(index));
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new PortfolioApp();
});

// When hiding:
navbar.classList.add('hide');

// When showing:
navbar.classList.remove('hide');