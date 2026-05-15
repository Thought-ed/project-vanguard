import { createAuthController } from "./auth/auth.js";
import { createDashboardController } from "./dashboard/dashboard-view.js";

const authGate = document.getElementById("auth-gate");
const dashboard = document.getElementById("dashboard");
const errorMessage = document.getElementById("auth-error");
const googleSignInButton = document.getElementById("google-signin-button");

function setError(message) {
  errorMessage.textContent = message;
  errorMessage.hidden = false;
}

function clearError() {
  errorMessage.hidden = true;
  errorMessage.textContent = "";
}

function showAuthGate() {
  authGate.hidden = false;
  dashboardController.hide();
}

function handleAuthenticated(session) {
  clearError();
  authGate.hidden = true;
  dashboardController.show(session);
}

function handleSignOut() {
  authController.signOut();
  showAuthGate();
}

const dashboardController = createDashboardController({
  elements: {
    dashboard,
    welcome: document.getElementById("user-welcome"),
    role: document.getElementById("user-role"),
    signOutButton: document.getElementById("signout"),
    sidebarNav: document.getElementById("sidebar-nav"),
    sidebarToggle: document.getElementById("sidebar-toggle"),
    sidebarBackdrop: document.getElementById("sidebar-backdrop"),
    dashboardTitle: document.getElementById("dashboard-title"),
    dashboardSummary: document.getElementById("dashboard-summary"),
    sectionEyebrow: document.getElementById("section-eyebrow"),
    sectionTitle: document.getElementById("section-title"),
    sectionSummary: document.getElementById("section-summary"),
    heroStats: document.getElementById("hero-stats"),
    sectionHeroImage: document.getElementById("section-hero-image"),
    dashboardGrid: document.getElementById("dashboard-grid"),
  },
  onSignOut: handleSignOut,
});

const authController = createAuthController({
  googleClientId: window.APP_CONFIG?.googleClientId || window.GOOGLE_CLIENT_ID || "YOUR_GOOGLE_CLIENT_ID_HERE",
  allowedDomain: "colegiocanadiense.edu.co",
  editorAllowlist: ["pguerrerocuello@gmail.com", "pablo.guerrero@colegiocanadiense.edu.co", "sebastian.gutierrez@colegiocanadiense.edu.co"],
  authorizationEndpoint: "",
  onAuthenticated: handleAuthenticated,
  onError: setError,
  onClearError: clearError,
});

window.addEventListener("load", () => {
  authController.bootstrap(googleSignInButton);
});
