// login-signup.js
// JS for login and signup wireframes. All logic is modular and ready for backend integration.

// --- LOGIN PAGE LOGIC ---
export function handleLoginForm(submitCallback) {
  const loginForm = document.getElementById("loginForm");
  if (!loginForm) return;
  loginForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    const email = loginForm.email.value.trim();
    const password = loginForm.password.value;
    if (typeof submitCallback === "function") {
      submitCallback({ email, password });
      return;
    }
    // Backend API call
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        showPopup(data.message || "Login successful!", true);
        // Redirect or further logic here
      } else {
        showPopup(data.error || "Login failed.", false);
      }
    } catch (err) {
      showPopup("Network error. Please try again.", false);
    }
  });

  // Forgot password link
  const forgotLink = document.getElementById("forgotPassword");
  if (forgotLink) {
    forgotLink.addEventListener("click", function (e) {
      e.preventDefault();
      showPopup("Forgot password clicked. Backend logic needed.", false);
    });
  }
}

// --- SIGNUP PAGE LOGIC ---
export function handleSignupForm(submitCallback) {
  const signupForm = document.querySelector(".signup-card form");
  if (!signupForm) return;
  signupForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    const name = signupForm.querySelector('input[type="text"]').value.trim();
    const email = signupForm.querySelector('input[type="email"]').value.trim();
    const password = signupForm.querySelector('input[type="password"]').value;
    if (typeof submitCallback === "function") {
      submitCallback({ name, email, password });
      return;
    }
    // Backend API call
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        showPopup(data.message || "Signup successful!", true);
        // Redirect or further logic here
      } else {
        showPopup(data.error || "Signup failed.", false);
      }
    } catch (err) {
      showPopup("Network error. Please try again.", false);
    }
  });
}

// --- INIT LOGIC ---
function showPopup(message, isSuccess) {
  let popup = document.getElementById("custom-popup");
  if (!popup) {
    popup = document.createElement("div");
    popup.id = "custom-popup";
    popup.innerHTML =
      '<span id="custom-popup-message"></span><button id="custom-popup-close">OK</button>';
    document.body.appendChild(popup);
    document.getElementById("custom-popup-close").onclick = function () {
      popup.style.display = "none";
    };
  }
  const msgSpan = document.getElementById("custom-popup-message");
  msgSpan.textContent = message;
  popup.style.display = "flex";
  popup.style.background = isSuccess ? "#e6ffed" : "#ffe6e6";
  popup.style.color = "#222";
  popup.style.position = "fixed";
  popup.style.top = "50%";
  popup.style.left = "50%";
  popup.style.transform = "translate(-50%, -50%)";
  popup.style.padding = "2rem 2.5rem";
  popup.style.borderRadius = "16px";
  popup.style.boxShadow = "0 2px 16px rgba(0,0,0,0.12)";
  popup.style.zIndex = "9999";
  popup.style.flexDirection = "column";
  popup.style.alignItems = "center";
  popup.style.justifyContent = "center";
  popup.style.fontSize = "1.1rem";
  document.getElementById("custom-popup-close").style.marginTop = "1.2rem";
  document.getElementById("custom-popup-close").style.padding = "0.5rem 1.2rem";
  document.getElementById("custom-popup-close").style.border = "none";
  document.getElementById("custom-popup-close").style.borderRadius = "8px";
  document.getElementById("custom-popup-close").style.background = isSuccess
    ? "#4a90e2"
    : "#e24a4a";
  document.getElementById("custom-popup-close").style.color = "#fff";
  document.getElementById("custom-popup-close").style.cursor = "pointer";
}
// Call these functions in each page as needed
// Example usage for login page:
// import { handleLoginForm } from './login-signup.js';
// handleLoginForm();
// Example usage for signup page:
// import { handleSignupForm } from './login-signup.js';
// handleSignupForm();
