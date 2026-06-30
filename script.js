// Mobile menu toggle
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }));
  // Close the mobile menu on resize back to desktop, so it doesn't get
  // stuck open if the user rotates their device or resizes the window.
  window.addEventListener('resize', () => {
    if (window.innerWidth > 720 && nav.classList.contains('open')) {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
}

// Reveal-on-scroll animation, with safe fallbacks:
// - if the browser has no IntersectionObserver support, or
// - if the user has requested reduced motion,
// content is shown immediately instead of staying invisible forever.
const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealEls = document.querySelectorAll('.reveal');

if (prefersReducedMotion || !('IntersectionObserver' in window)) {
  revealEls.forEach(el => el.classList.add('visible'));
} else {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => observer.observe(el));

  // Safety net: if for any reason an element never intersects, reveal
  // everything after a short delay so content is never permanently hidden.
  window.addEventListener('load', () => {
    setTimeout(() => {
      revealEls.forEach(el => el.classList.add('visible'));
    }, 3000);
  });
}
