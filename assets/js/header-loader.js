/**
 * ACP Header Component Loader
 * Loads the modular header component into pages
 */

(function() {
  'use strict';

  // Load header HTML
  async function loadHeader() {
    try {
      const response = await fetch('assets/components/header.html');
      if (!response.ok) {
        throw new Error(`Failed to load header: ${response.status}`);
      }
      const headerHTML = await response.text();
      
      // Insert header into placeholder
      const placeholder = document.getElementById('header-placeholder');
      if (placeholder) {
        placeholder.innerHTML = headerHTML;
        
        // Initialize header functionality after loading
        initializeHeader();
      } else {
        console.error('Header placeholder not found');
      }
    } catch (error) {
      console.error('Error loading header:', error);
    }
  }

  // Initialize header functionality
  function initializeHeader() {
    // Header scroll effect
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

    // Add scroll listeners
    document.addEventListener('scroll', toggleHeaderScrolled);
    window.addEventListener('load', toggleHeaderScrolled);

    // Smooth scrolling for anchor links
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

    // Active navigation highlighting
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

    // Add active nav listeners
    document.addEventListener('scroll', updateActiveNav);
    window.addEventListener('load', updateActiveNav);

    console.log('ACP Header loaded and initialized successfully');
  }

  // Load header when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadHeader);
  } else {
    loadHeader();
  }

})();