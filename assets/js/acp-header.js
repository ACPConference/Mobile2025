/**
 * ACP Header JavaScript
 * Compatible with new header structure
 */

(function() {
  "use strict";

  /**
   * Header scroll effect
   */
  function toggleHeaderScrolled() {
    const header = document.querySelector('.acp-header-new');
    if (header) {
      if (window.scrollY > 100) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
  }

  document.addEventListener('scroll', toggleHeaderScrolled);
  window.addEventListener('load', toggleHeaderScrolled);

  /**
   * Mobile nav functionality (Bootstrap handles the offcanvas)
   * This just ensures any additional mobile nav logic works
   */
  const mobileNavBtn = document.querySelector('.acp-mobile-menu-btn');
  if (mobileNavBtn) {
    // Bootstrap handles the offcanvas toggle automatically
    // Additional logic can go here if needed
  }

  /**
   * Smooth scrolling for anchor links
   */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  /**
   * Active navigation highlighting
   */
  function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.acp-nav-link');
    
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= (sectionTop - 200)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  document.addEventListener('scroll', updateActiveNav);
  window.addEventListener('load', updateActiveNav);

})();