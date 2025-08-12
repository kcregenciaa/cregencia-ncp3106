/**
 * Main Application Script
 * Contains all interactive functionality for the portfolio
 */

class PortfolioApp {
  constructor() {
    this.init();
  }

  init() {
    // Initialize all components
    this.setupSmoothScrolling();
    this.setupNavbarScrollEffect();
    this.setupScrollAnimations();
    this.setupContactForm();
    this.setupTypewriterEffects();
    this.setupManilaClock();
    this.setupHoverEffects();
    this.setupSkillBarAnimations();
  }

  // Smooth scrolling for navigation links
  setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });

          // Update URL without page jump
          if (history.pushState) {
            history.pushState(null, null, anchor.getAttribute('href'));
          }
        }
      });
    });
  }

  // Navbar background change on scroll with throttle
  setupNavbarScrollEffect() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateNavbar = () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
      ticking = false;
    };

    window.addEventListener('scroll', () => {
      lastScrollY = window.scrollY;
      if (!ticking) {
        window.requestAnimationFrame(updateNavbar);
        ticking = true;
      }
    });
  }

  // Animate elements on scroll with Intersection Observer
  setupScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          
          // For skill bars specifically
          if (entry.target.classList.contains('skill-progress-bar')) {
            const targetWidth = entry.target.getAttribute('data-progress');
            entry.target.style.width = targetWidth;
          }
        }
      });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observer.observe(el);
    });
  }

  // Contact form handling with improved validation
  setupContactForm() {
    const contactForm = document.querySelector('.contact-form form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const button = contactForm.querySelector('.btn-contact');
      const originalText = button.textContent;
      const formData = new FormData(contactForm);

      // Simple validation
      if (!formData.get('name') || !formData.get('email') || !formData.get('message')) {
        this.showFormMessage(button, 'Please fill all fields', false);
        return;
      }

      button.textContent = 'Sending...';
      button.disabled = true;

      try {
        // In a real implementation, you would send the form data to a server
        // For demo purposes, we'll simulate a network request
        await this.simulateFormSubmission();
        this.showFormMessage(button, 'Message Sent!', true);
        contactForm.reset();
      } catch (error) {
        this.showFormMessage(button, 'Error Sending', false);
      } finally {
        setTimeout(() => {
          button.textContent = originalText;
          button.disabled = false;
        }, 2000);
      }
    });
  }

  simulateFormSubmission() {
    return new Promise((resolve) => {
      setTimeout(resolve, 1500);
    });
  }

  showFormMessage(button, message, isSuccess) {
    button.textContent = message;
    button.style.backgroundColor = isSuccess ? 'var(--success-color)' : 'var(--error-color)';
  }

  // Typewriter effects with queue system
  setupTypewriterEffects() {
    // Hero title typing effect
    const heroTitle = document.querySelector('.hero h1');
    const heroLead = document.querySelector('.hero .lead');
    const typingElement = document.getElementById('typing-text');

    if (heroTitle) {
      this.typeWriter(heroTitle, 'KEANE CREGENCIA', 150, () => {
        if (heroLead) {
          this.typeWriter(heroLead, 'Aspiring Computer Engineer & Full Stack Developer', 50);
        }
      });
    }

    // Rotating roles effect
    if (typingElement) {
      setTimeout(() => this.startRotatingRoles(), 2500);
    }
  }

  typeWriter(element, text, speed = 100, callback) {
    let i = 0;
    element.innerHTML = '';
    
    const type = () => {
      if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
        setTimeout(type, speed);
      } else if (callback) {
        callback();
      }
    };
    
    type();
  }

  startRotatingRoles() {
    const roles = ['WEB DEVELOPER', 'COMPUTER ENGINEER'];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingElement = document.getElementById('typing-text');
    
    if (!typingElement) return;

    const typeEffect = () => {
      const currentRole = roles[roleIndex];
      
      if (isDeleting) {
        typingElement.textContent = currentRole.substring(0, charIndex--);
      } else {
        typingElement.textContent = currentRole.substring(0, charIndex++);
      }

      if (!isDeleting && charIndex === currentRole.length) {
        setTimeout(() => isDeleting = true, 1500);
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }

      setTimeout(typeEffect, isDeleting ? 50 : 100);
    };

    typeEffect();
  }

  // Manila Time Clock with automatic DST adjustment
  setupManilaClock() {
    const timeElement = document.getElementById('manilaTime');
    const dateElement = document.getElementById('manilaDate');
    
    if (!timeElement || !dateElement) return;

    this.updateManilaTime(); // Initial call
    setInterval(this.updateManilaTime, 1000);
  }

  updateManilaTime() {
    const now = new Date();
    const options = {
      timeZone: 'Asia/Manila',
      hour12: true,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    };
    
    const timeString = now.toLocaleTimeString('en-US', options);
    const dateOptions = {
      timeZone: 'Asia/Manila',
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    
    const dateString = now.toLocaleDateString('en-US', dateOptions);
    
    const timeElement = document.getElementById('manilaTime');
    const dateElement = document.getElementById('manilaDate');
    
    if (timeElement) timeElement.textContent = timeString;
    if (dateElement) dateElement.textContent = dateString;
  }

  // Hover effects with event delegation
  setupHoverEffects() {
    const logo = document.querySelector('.navbar-brand-container');
    if (logo) {
      logo.addEventListener('mouseenter', () => {
        logo.style.transform = 'scale(1.05)';
        logo.style.transition = 'transform 0.3s ease';
      });
      
      logo.addEventListener('mouseleave', () => {
        logo.style.transform = 'scale(1)';
      });
    }

    // Add hover effect to all interactive elements
    document.addEventListener('mouseover', (e) => {
      const interactive = e.target.closest('a, button, .hover-effect');
      if (interactive) {
        interactive.style.transition = 'all 0.2s ease';
      }
    });
  }

  // Skill bar animations with performance optimization
  setupSkillBarAnimations() {
    const skillBars = document.querySelectorAll('.skill-progress-bar');
    if (!skillBars.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const targetWidth = entry.target.getAttribute('data-progress');
          entry.target.style.width = targetWidth;
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.5
    });

    skillBars.forEach(bar => {
      bar.style.width = '0';
      observer.observe(bar);
    });
  }
}

// Initialize the application when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  new PortfolioApp();
});

// Fallback for older browsers
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new PortfolioApp();
  });
} else {
  new PortfolioApp();
}





