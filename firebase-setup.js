import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

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

// LOGIN
document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const email = this.querySelector("input[type='email']").value;
  const password = this.querySelector("input[type='password']").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      document.getElementById("login-status").textContent = "Login successful!";
    })
    .catch((error) => {
      console.error(error);
      document.getElementById("login-status").textContent = "Invalid email or password.";
    });
});

// SIGNUP
document.getElementById("signup-btn").addEventListener("click", () => {
  const email = prompt("Enter your email for signup:");
  const password = prompt("Enter a password:");
  if (email && password) {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => alert("Signup successful! Please log in."))
      .catch((err) => alert("Signup failed: " + err.message));
  }
});

// PASSWORD RESET
document.getElementById("reset-btn").addEventListener("click", () => {
  const email = prompt("Enter your email to reset password:");
  if (email) {
    sendPasswordResetEmail(auth, email)
      .then(() => alert("Password reset email sent!"))
      .catch((err) => alert("Error: " + err.message));
  }
});

// LOGOUT
document.getElementById("logout").addEventListener("click", () => {
  signOut(auth).then(() => {
    document.getElementById("dashboard").style.display = "none";
    document.getElementById("login").style.display = "block";
  });
});

// AUTH STATE CHANGE
onAuthStateChanged(auth, (user) => {
  if (user) {
    document.getElementById("login").style.display = "none";
    document.getElementById("dashboard").style.display = "block";
    document.getElementById("user-email").textContent = user.email;
  } else {
    document.getElementById("dashboard").style.display = "none";
    document.getElementById("login").style.display = "block";
  }
});
