// ScrollReveal animations
ScrollReveal().reveal('.deck-section', {
  distance: '40px',
  duration: 900,
  easing: 'ease-out',
  origin: 'bottom',
  interval: 120
});

// Mobile menu toggle
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}

// Close mobile menu on link click
if (navLinks) {
  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
    });
  });
}

// Dark mode toggle
const modeToggle = document.getElementById("mode-toggle");

if (modeToggle) {
  modeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    localStorage.setItem(
      "theme",
      document.body.classList.contains("dark") ? "dark" : "light"
    );
  });
}

// Load saved theme
window.addEventListener("load", () => {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
  }
});

// Contact form (if present)
const contactForm = document.getElementById("contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", e => {
    e.preventDefault();
    if (!contactForm.checkValidity()) {
      alert("Please fill all required fields.");
      return;
    }
    alert("Thanks for reaching out. We'll be in touch!");
    contactForm.reset();
  });
}

// Enhanced animations for key homepage sections
ScrollReveal().reveal('#value .value-box', {
  distance: '24px',
  duration: 800,
  easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  origin: 'bottom',
  interval: 120
});

ScrollReveal().reveal('#engagement .engagement-card', {
  distance: '24px',
  duration: 800,
  easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  origin: 'bottom',
  interval: 120
});

/* =====================================================
   ACTIVE SECTION HIGHLIGHT (INDEX PAGE ONLY)
   ===================================================== */

const pageSections = document.querySelectorAll("section[data-section]");
const navAnchors = document.querySelectorAll(".nav-links a");

function updateActiveNav() {
  let currentSection = "";

  pageSections.forEach(section => {
    const sectionTop = section.offsetTop - 160;
    if (window.scrollY >= sectionTop) {
      currentSection = section.getAttribute("data-section");
    }
  });

  navAnchors.forEach(link => {
    link.classList.remove("active");

    if (
      currentSection &&
      link.getAttribute("href").includes(currentSection)
    ) {
      link.classList.add("active");
    }
  });

  // Default to Home when near top
  if (window.scrollY < 300) {
    document.querySelector(".nav-home")?.classList.add("active");
  }
}

window.addEventListener("scroll", updateActiveNav);
window.addEventListener("load", updateActiveNav);

ScrollReveal().reveal('.journey-step-node', {
  distance: '0',
  scale: 0.92,
  duration: 900,
  easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  interval: 120
});

