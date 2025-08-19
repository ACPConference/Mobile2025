/**
 * ACP Header Loader
 * Loads modular header components and handles scroll effects
 */

class ACPHeaderLoader {
  constructor() {
    this.isLoaded = false;
    this.init();
  }

  async init() {
    try {
      await this.loadHeader();
      this.setupScrollEffects();
      this.handleActiveNavigation();
      this.isLoaded = true;
      console.log('ACP Header loaded successfully');
    } catch (error) {
      console.error('Failed to load ACP Header:', error);
    }
  }

  async loadHeader() {
    const headerContainer = document.getElementById('acp-header-container');
    if (!headerContainer) {
      console.error('Header container not found. Please add <div id="acp-header-container"></div> to your HTML.');
      return;
    }

    try {
      const response = await fetch('components/header-acp.html');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const headerHTML = await response.text();
      headerContainer.innerHTML = headerHTML;
    } catch (error) {
      console.error('Error loading header component:', error);
      // Fallback: try relative path for subdirectory pages
      try {
        const fallbackResponse = await fetch('../components/header-acp.html');
        if (!fallbackResponse.ok) {
          throw new Error(`Fallback HTTP error! status: ${fallbackResponse.status}`);
        }
        const headerHTML = await fallbackResponse.text();
        headerContainer.innerHTML = headerHTML;
      } catch (fallbackError) {
        console.error('Fallback header loading also failed:', fallbackError);
      }
    }
  }

  setupScrollEffects() {
    const header = document.querySelector('.header-acp');
    if (!header) return;

    let isScrolled = false;

    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const shouldAddScrolled = scrollTop > 100;

      if (shouldAddScrolled && !isScrolled) {
        header.classList.add('scrolled');
        isScrolled = true;
      } else if (!shouldAddScrolled && isScrolled) {
        header.classList.remove('scrolled');
        isScrolled = false;
      }
    };

    // Throttle scroll events for better performance
    let ticking = false;
    const scrollListener = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', scrollListener);
    
    // Initial check
    handleScroll();
  }

  handleActiveNavigation() {
    // Get current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const currentHash = window.location.hash;

    // Wait a bit for DOM to be ready
    setTimeout(() => {
      this.updateActiveNav(currentPage, currentHash);
    }, 100);
  }

  updateActiveNav(currentPage, currentHash) {
    const navLinks = document.querySelectorAll('.header-acp__nav-link, .header-acp__dropdown-item, .header-acp__mobile-nav-link, .header-acp__mobile-dropdown-link');
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      
      const href = link.getAttribute('href');
      if (!href) return;

      // Check for exact page match
      if (href === currentPage || href.endsWith(currentPage)) {
        link.classList.add('active');
        return;
      }

      // Check for hash/anchor match on current page
      if (currentPage === 'index.html' || currentPage === '') {
        if (href === currentHash || (href.startsWith('#') && href === currentHash)) {
          link.classList.add('active');
        }
      }

      // Special case for home link
      if ((href === '#hero' || href === 'index.html#hero' || href === 'index.html') && 
          (currentPage === 'index.html' || currentPage === '')) {
        link.classList.add('active');
      }
    });
  }

  // Public method to update active navigation (useful for SPA-like behavior)
  setActiveNav(pageOrHash) {
    const currentPage = pageOrHash.includes('#') ? 'index.html' : pageOrHash;
    const currentHash = pageOrHash.includes('#') ? pageOrHash.split('#')[1] ? '#' + pageOrHash.split('#')[1] : '' : '';
    this.updateActiveNav(currentPage, currentHash);
  }

  // Public method to check if header is loaded
  isHeaderLoaded() {
    return this.isLoaded;
  }
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.acpHeader = new ACPHeaderLoader();
});

// Also initialize if script is loaded after DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    if (!window.acpHeader) {
      window.acpHeader = new ACPHeaderLoader();
    }
  });
} else {
  if (!window.acpHeader) {
    window.acpHeader = new ACPHeaderLoader();
  }
}