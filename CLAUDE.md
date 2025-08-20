# Mobile2025 - ACP Conference Website

## Project Overview
This is a website for the Association of Community Publishers (ACP) 2025 Annual Conference & Trade Show. It's a static HTML website built using the Bootstrap-based "TheEvent" template from BootstrapMade, now featuring a custom modular header navigation system.

## Project Structure
- **Main entry point**: `index.html` - Main conference website
- **Conference pages**: Multiple pages including speaker details, events, and daily schedules
- **Modular header system**: Custom component-based header shared across all pages
- **Assets**: `/assets/` directory containing CSS, JS, images, and vendor libraries
- **Forms**: `/forms/` directory with contact form PHP handler
- **Images**: Primary image directory at `/img/` with additional assets in `/assets/img/`

## Modular Header System
The site now uses a modular header component system:
- **Header component**: `/assets/components/header.html` - Shared HTML structure
- **Header styles**: `/assets/components/header.css` - Component-specific CSS
- **Header loader**: `/assets/js/header-loader.js` - JavaScript for dynamic loading
- **Features**:
  - Responsive design with hamburger menu below 715px
  - Logo text hidden below 875px breakpoint
  - Consistent bright white navigation items
  - Bootstrap offcanvas mobile navigation
  - Smooth scroll effects and anchor linking

## Technology Stack
- **Frontend**: HTML5, CSS3, JavaScript
- **Framework**: Bootstrap 5.3.3
- **Fonts**: Google Fonts (Roboto, Raleway)
- **Vendor Libraries**:
  - Bootstrap Icons
  - AOS (Animate On Scroll)
  - GLightbox (image lightbox)
  - Swiper (sliders/carousels)
- **Backend**: PHP (for contact forms)
- **Architecture**: Component-based modular system

## Key Features
- Modular header navigation system shared across all pages
- Responsive conference website design
- Speaker profiles and details
- Event schedule with multiple days
- Venue information and galleries
- Hotel accommodation information
- Registration functionality
- Contact forms
- Mobile-optimized navigation with offcanvas menu

## Development Notes
- Uses custom CSS classes with `acp-` prefix to avoid conflicts
- Modular header allows single-point updates across all pages
- Bootstrap grid system for responsive layout
- Template originally from BootstrapMade (TheEvent template)
- Custom branding for Association of Community Publishers
- Includes favicon and Apple touch icons
- All pages use header-placeholder div for component loading

## File Organization
- **Components**: `/assets/components/` - Modular header system
- **Images**: Primary location at `/img/` with some assets in `/assets/img/`
- **JavaScript**: Custom header loader plus vendor libraries in `/assets/js/`
- **CSS**: Component styles plus main stylesheet in `/assets/css/`
- **Forms**: Server-side contact handling in `/forms/`

## Git Repository
- Current branch: `main`
- Repository cleaned of orphaned template and test files
- Modular header system implemented and tested across all pages