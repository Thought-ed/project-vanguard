export function createAuthController({
  googleClientId,
  allowedDomain,
  editorAllowlist = [],
  authorizationEndpoint = "",
  onAuthenticated,
  onError,
  onClearError,
}) {
  function decodeJwt(token) {
    if (typeof token !== "string") {
      throw new Error("Invalid JWT token type");
    }

    const parts = token.split(".");
    if (parts.length !== 3 || !parts[1]) {
      throw new Error("Malformed JWT token");
    }

    const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    // This decodes claims for client-side UI gating only.
    // Backend services must verify token signature and claims server-side.
    return JSON.parse(atob(base64));
  }

  function isAllowedViewer(email) {
    return typeof email === "string" && email.toLowerCase().endsWith(`@${allowedDomain}`);
  }

  function isAllowedEditor(email) {
    return editorAllowlist.includes(String(email).toLowerCase());
  }

  async function resolveRole(profile, idToken) {
    if (!isAllowedViewer(profile.email)) {
      return null;
    }

    if (isAllowedEditor(profile.email)) {
      return "Editor";
    }

    if (!authorizationEndpoint) {
      return "Viewer";
    }

    try {
      const response = await fetch(authorizationEndpoint, {
        headers: { Authorization: `Bearer ${idToken}` },
      });

      if (!response.ok) {
        return "Viewer";
      }

      const result = await response.json();
      return result.canEdit ? "Editor" : "Viewer";
    } catch {
      return "Viewer";
    }
  }

  async function handleCredentialResponse(response) {
    if (typeof onClearError === "function") {
      onClearError();
    }

    try {
      const profile = decodeJwt(response.credential);
      const resolvedRole = await resolveRole(profile, response.credential);

      if (!resolvedRole) {
        if (typeof onError === "function") {
          onError(`Access denied. Use a ${allowedDomain} account.`);
        }
        return;
      }

      if (typeof onAuthenticated === "function") {
        onAuthenticated({
          email: profile.email,
          name: profile.name,
          role: resolvedRole,
        });
      }
    } catch (error) {
      console.error("Sign-in handling error:", error);
      if (typeof onError === "function") {
        onError("Sign-in failed. Please try again.");
      }
    }
  }

  function bootstrap(buttonElement) {
    if (!googleClientId || googleClientId === "YOUR_GOOGLE_CLIENT_ID_HERE") {
      if (typeof onError === "function") {
        onError("Set a Google client ID in config.js before signing in.");
      }
      return;
    }

    if (!window.google || !window.google.accounts || !window.google.accounts.id) {
      if (typeof onError === "function") {
        onError("Google Sign-In failed to load.");
      }
      return;
    }

    if (!buttonElement) {
      if (typeof onError === "function") {
        onError("Sign-in button is missing from the page.");
      }
      return;
    }

    window.google.accounts.id.initialize({
      client_id: googleClientId,
      callback: handleCredentialResponse,
      hosted_domain: allowedDomain,
    });

    window.google.accounts.id.renderButton(buttonElement, {
      theme: "outline",
      size: "large",
      shape: "rectangular",
      width: 320,
    });
  }

  function signOut() {
    if (window.google && window.google.accounts && window.google.accounts.id) {
      window.google.accounts.id.disableAutoSelect();
    }
  }

  return {
    bootstrap,
    signOut,
  };
}
