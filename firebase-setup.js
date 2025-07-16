import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCrJeeVMCASB568y3FGzsi6NfzxQ8X66dE",
  authDomain: "nurturise-5346e.firebaseapp.com",
  projectId: "nurturise-5346e",
  storageBucket: "nurturise-5346e.appspot.com",
  messagingSenderId: "504041696106",
  appId: "1:504041696106:web:d9fd2858a34a3197695313"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {
  auth, signInWithEmailAndPassword, createUserWithEmailAndPassword,
  sendPasswordResetEmail, onAuthStateChanged, signOut
};

// LOGIN
const loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = this.querySelector("input[type='email']").value;
    const password = this.querySelector("input[type='password']").value;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        document.getElementById("login-status").textContent = "Login successful! Redirecting...";
        setTimeout(() => {
          window.location.href = "dashboard.html"; // Redirect to dashboard
        }, 1000);
      })
      .catch((error) => {
        console.error(error);
        document.getElementById("login-status").textContent = "Invalid email or password.";
      });
  });
}

// SIGNUP
const signupBtn = document.getElementById("signup-btn");
if (signupBtn) {
  signupBtn.addEventListener("click", () => {
    const email = prompt("Enter your email for signup:");
    const password = prompt("Enter a password:");
    if (email && password) {
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => alert("Signup successful! Please log in."))
        .catch((err) => alert("Signup failed: " + err.message));
    }
  });
}

// PASSWORD RESET
const resetBtn = document.getElementById("reset-btn");
if (resetBtn) {
  resetBtn.addEventListener("click", () => {
    const email = prompt("Enter your email to reset password:");
    if (email) {
      sendPasswordResetEmail(auth, email)
        .then(() => alert("Password reset email sent!"))
        .catch((err) => alert("Error: " + err.message));
    }
  });
}

// LOGOUT (on dashboard.html)
const logoutBtn = document.getElementById("logout");
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    signOut(auth).then(() => {
      window.location.href = "index.html"; // Go back to homepage after logout
    });
  });
}

// Optional: auth guard for dashboard
if (window.location.pathname.includes("dashboard.html")) {
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      window.location.href = "index.html"; // force back to homepage if not logged in
    } else {
      const emailDisplay = document.getElementById("user-email");
      if (emailDisplay) emailDisplay.textContent = user.email;
    }
  });
}
