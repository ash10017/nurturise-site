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
