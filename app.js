const CONFIG = {
  googleClientId: "REPLACE_WITH_GOOGLE_CLIENT_ID.apps.googleusercontent.com",
  allowedDomain: "school.edu.co",
  editorAllowlist: ["advisor@school.edu.co", "lead.student@school.edu.co"],
  authorizationEndpoint: "",
};

const authGate = document.getElementById("auth-gate");
const dashboard = document.getElementById("dashboard");
const errorMessage = document.getElementById("auth-error");
const welcome = document.getElementById("user-welcome");
const role = document.getElementById("user-role");
const signOutButton = document.getElementById("signout");

const SESSION_KEY = "mission-control-session";

function decodeJwt(token) {
  if (typeof token !== "string") {
    throw new Error("Missing JWT token");
  }

  const parts = token.split(".");
  if (parts.length !== 3 || !parts[1]) {
    throw new Error("Malformed JWT token");
  }

  const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
  return JSON.parse(atob(base64));
}

function setError(message) {
  errorMessage.textContent = message;
  errorMessage.hidden = false;
}

function clearError() {
  errorMessage.hidden = true;
  errorMessage.textContent = "";
}

function isAllowedViewer(email) {
  return typeof email === "string" && email.toLowerCase().endsWith(`@${CONFIG.allowedDomain}`);
}

function isAllowedEditor(email) {
  return CONFIG.editorAllowlist.includes(String(email).toLowerCase());
}

async function resolveRole(profile, idToken) {
  if (!isAllowedViewer(profile.email)) {
    return null;
  }

  if (isAllowedEditor(profile.email)) {
    return "Editor";
  }

  if (!CONFIG.authorizationEndpoint) {
    return "Viewer";
  }

  const response = await fetch(CONFIG.authorizationEndpoint, {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });

  if (!response.ok) {
    return "Viewer";
  }

  const result = await response.json();
  return result.canEdit ? "Editor" : "Viewer";
}

function saveSession(session) {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

function readSession() {
  const saved = sessionStorage.getItem(SESSION_KEY);
  if (!saved) {
    return null;
  }

  try {
    return JSON.parse(saved);
  } catch {
    sessionStorage.removeItem(SESSION_KEY);
    return null;
  }
}

function renderAuthenticatedView(session) {
  authGate.hidden = true;
  dashboard.hidden = false;
  clearError();

  welcome.textContent = `Welcome, ${session.name || session.email}`;
  role.textContent = `${session.role} access`;
}

function renderSignedOutView() {
  sessionStorage.removeItem(SESSION_KEY);
  authGate.hidden = false;
  dashboard.hidden = true;
}

async function handleCredentialResponse(response) {
  clearError();

  try {
    const profile = decodeJwt(response.credential);
    const resolvedRole = await resolveRole(profile, response.credential);

    if (!resolvedRole) {
      setError(`Access denied. Use a ${CONFIG.allowedDomain} account.`);
      return;
    }

    const session = {
      email: profile.email,
      name: profile.name,
      role: resolvedRole,
    };

    saveSession(session);
    renderAuthenticatedView(session);
  } catch {
    setError("Sign-in failed. Please try again.");
  }
}

function bootstrapGoogleSignIn() {
  if (!window.google || !window.google.accounts || !window.google.accounts.id) {
    setError("Google Sign-In failed to load.");
    return;
  }

  window.google.accounts.id.initialize({
    client_id: CONFIG.googleClientId,
    callback: handleCredentialResponse,
    hosted_domain: CONFIG.allowedDomain,
  });

  window.google.accounts.id.renderButton(document.getElementById("google-signin-button"), {
    theme: "outline",
    size: "large",
    shape: "rectangular",
    width: 320,
  });
}

window.addEventListener("load", () => {
  const savedSession = readSession();
  if (savedSession) {
    renderAuthenticatedView(savedSession);
  }

  bootstrapGoogleSignIn();
});

signOutButton.addEventListener("click", () => {
  if (window.google && window.google.accounts && window.google.accounts.id) {
    window.google.accounts.id.disableAutoSelect();
  }
  renderSignedOutView();
});
