// Form submit handler with validation and feedback

import { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, onAuthStateChanged, signOut } from './firebase-setup.js';

// Modal + form handlers
window.addEventListener('DOMContentLoaded', () => {
  // Modal open/close code...
  document.getElementById('login-form').addEventListener('submit', e => {
    // firebase login
  });
  // signup & reset handlers...
  onAuthStateChanged(auth, user => {
    // show/hide dashboard
  });
});

const form = document.getElementById("contact-form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!form.checkValidity()) {
    alert("Please fill in all required fields correctly.");
    return;
  }
  alert("Thanks for contacting NurtuRise Advisory. We'll get back to you soon!");
  form.reset();
});

// ScrollReveal animations
ScrollReveal().reveal('section', {
  delay: 300,
  duration: 800,
  distance: '30px',
  origin: 'bottom',
  easing: 'ease-in-out',
  reset: false
});

// Mobile menu toggle
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Hide mobile menu when clicking a link
navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});

// Light/Dark mode toggle
const modeToggle = document.getElementById("mode-toggle");
modeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  // Save preference in localStorage
  if (document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
});

// Load saved theme on page load
window.addEventListener("load", () => {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
  }
});

// Scroll-to-top button
const scrollTopBtn = document.getElementById("scrollTopBtn");
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollTopBtn.classList.add("show");
  } else {
    scrollTopBtn.classList.remove("show");
  }
});
scrollTopBtn.addEventListener("click", (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


// // LOGIN FEATURE
// document.getElementById("login-form").addEventListener("submit", function (e) {
//   e.preventDefault();
//   const email = this.querySelector("input[type='email']").value;
//   const password = this.querySelector("input[type='password']").value;

//   if (email === "client@nurturise.com" && password === "welcome123") {
//     document.getElementById("login-status").textContent = "Login successful!";
//   } else {
//     document.getElementById("login-status").textContent = "Invalid credentials.";
//   }
// });
