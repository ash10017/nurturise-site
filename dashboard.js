import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

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
const db = getFirestore(app);

// Elements
const logoutBtn = document.getElementById("logout-btn");
const userEmailSpan = document.getElementById("user-email");
const userRoleSpan = document.getElementById("user-role");
const settingsNameInput = document.getElementById("settings-name");
const settingsEmailInput = document.getElementById("settings-email");
const saveSettingsBtn = document.getElementById("save-settings");

const tabs = document.querySelectorAll("#tabs .tab");
const tabContents = document.querySelectorAll(".tab-content");

// Tab switching logic
tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    // Remove active class from all tabs and contents
    tabs.forEach(t => t.classList.remove("active"));
    tabContents.forEach(c => c.classList.remove("active"));
    // Add active to clicked tab and corresponding content
    tab.classList.add("active");
    const tabName = tab.getAttribute("data-tab");
    document.getElementById(tabName).classList.add("active");
  });
});

// Load user data and populate dashboard
onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "index.html";
    return;
  }

  // Show user's email
  userEmailSpan.textContent = user.email;

  // Load Firestore user doc
  try {
    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (userDoc.exists()) {
      const data = userDoc.data();
      // Display role if present
      userRoleSpan.textContent = data.role || "User";
      // Populate settings inputs
      settingsNameInput.value = data.name || "";
      settingsEmailInput.value = user.email; // default to auth email
    } else {
      userRoleSpan.textContent = "User";
      settingsNameInput.value = "";
      settingsEmailInput.value = user.email;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    userRoleSpan.textContent = "User";
  }
});

// Logout handler
logoutBtn.addEventListener("click", () => {
  signOut(auth).then(() => {
    window.location.href = "index.html";
  });
});

// Save settings handler (update Firestore user doc)
saveSettingsBtn.addEventListener("click", async () => {
  const user = auth.currentUser;
  if (!user) {
    alert("No user logged in.");
    return;
  }

  const newName = settingsNameInput.value.trim();
  const newEmail = settingsEmailInput.value.trim();

  if (!newEmail) {
    alert("Email cannot be empty.");
    return;
  }

  try {
    // Update Firestore user doc with new name (you can expand this as needed)
    await setDoc(doc(db, "users", user.uid), { name: newName }, { merge: true });
    alert("Settings saved successfully!");
  } catch (err) {
    alert("Failed to save settings: " + err.message);
  }
});
