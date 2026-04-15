/* ============================================================
   Jeet Joshi — Portfolio
   Minimal Interactions
   ============================================================ */

'use strict';

/* --- Nav scroll state -------------------------------------- */
(function initNavScroll() {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // Run once on load
})();

/* --- Mobile menu ------------------------------------------- */
(function initMobileMenu() {
  const btn    = document.querySelector('.nav__hamburger');
  const menu   = document.querySelector('.nav__mobile');
  const links  = document.querySelectorAll('.nav__mobile-link');
  if (!btn || !menu) return;

  const toggle = (open) => {
    btn.classList.toggle('open', open);
    menu.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
    btn.setAttribute('aria-expanded', open);
  };

  btn.addEventListener('click', () => {
    toggle(!btn.classList.contains('open'));
  });

  links.forEach(link => {
    link.addEventListener('click', () => toggle(false));
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') toggle(false);
  });
})();

/* --- Scroll reveal ----------------------------------------- */
window.revealElements = function() {
  const elements = document.querySelectorAll('.reveal:not(.visible)');
  if (!elements.length) return;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    elements.forEach(el => observer.observe(el));
  } else {
    elements.forEach(el => el.classList.add('visible'));
  }
};

// Initial run
window.revealElements();

/* --- Smooth external link handling ------------------------- */
(function initExternalLinks() {
  document.querySelectorAll('a[href^="http"]').forEach(link => {
    if (!link.href.includes(window.location.hostname)) {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    }
  });
})();
