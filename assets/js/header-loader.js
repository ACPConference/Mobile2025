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
    document.querySelectorAll('a[href*="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        const hashIndex = href.indexOf('#');
        
        if (hashIndex !== -1) {
          const hash = href.substring(hashIndex);
          const target = document.querySelector(hash);
          
          // Only prevent default if target exists on current page
          if (target && (href.startsWith('#') || href.startsWith(window.location.pathname) || href.startsWith('index.html'))) {
            e.preventDefault();
            target.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        }
      });
    });

    // Note: Active navigation logic removed - all nav items stay bright white

    console.log('ACP Header loaded and initialized successfully');
  }

  // Load header when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadHeader);
  } else {
    loadHeader();
  }

})();