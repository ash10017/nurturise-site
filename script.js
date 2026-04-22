// Navbar scroll shadow
const navbar = document.querySelector('.navbar');
if (navbar) {
  const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// Mobile menu toggle
const menuToggle = document.getElementById('menu-toggle');
const navLinks   = document.getElementById('nav-links');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.setAttribute('aria-expanded', navLinks.classList.contains('active'));
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('active'));
  });
}

// Dark mode toggle
const modeToggle = document.getElementById('mode-toggle');
if (modeToggle) {
  modeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
  });
}

// Load saved theme on page load
window.addEventListener('load', () => {
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
  }
});

// Contact form (if present)
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    if (!contactForm.checkValidity()) {
      alert('Please fill all required fields.');
      return;
    }
    alert("Thanks for reaching out. We'll be in touch!");
    contactForm.reset();
  });
}

// ScrollReveal animations (guard against pages that don't load the library)
if (typeof ScrollReveal !== 'undefined') {
  const sr = ScrollReveal({
    distance: '28px',
    duration: 860,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    origin: 'bottom',
    reset: false,
  });

  sr.reveal('.deck-section', { interval: 80 });
  sr.reveal('#value .value-box', { interval: 110 });
  sr.reveal('#engagement .engagement-card', { interval: 110 });
  sr.reveal('.journey-step-node', { distance: '0', scale: 0.93, interval: 110 });
  sr.reveal('.contact-card', { interval: 130 });
  sr.reveal('.founder-preview-card', { interval: 130 });
  sr.reveal('.founder-full-card', { interval: 130 });
  sr.reveal('.journey-card', { interval: 100 });
}

// Active section highlight (home page scroll spy)
const pageSections = document.querySelectorAll('section[data-section]');
const navAnchors   = document.querySelectorAll('.nav-links a');

function updateActiveNav() {
  let currentSection = '';
  pageSections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 160) {
      currentSection = section.getAttribute('data-section');
    }
  });

  navAnchors.forEach(link => {
    link.classList.remove('active');
    if (currentSection && link.getAttribute('href')?.includes(currentSection)) {
      link.classList.add('active');
    }
  });

  if (window.scrollY < 300) {
    document.querySelector('.nav-home')?.classList.add('active');
  }
}

if (pageSections.length) {
  window.addEventListener('scroll', updateActiveNav, { passive: true });
  window.addEventListener('load', updateActiveNav);
}
