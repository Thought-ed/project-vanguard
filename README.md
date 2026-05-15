# Capstone Rocketry Mission Control (Initial Implementation)

This repository now includes an initial GitHub Pages frontend shell aligned with `plan.md`:

- Google sign-in gate as the landing page
- Dashboard shell shown only after sign-in
- Viewer access restricted to the configured Google Workspace domain
- Editor role gated by an allowlist, with optional backend authorization endpoint

## Quick setup

1. Open `app.js`.
2. Update `CONFIG.googleClientId` with your Google OAuth client ID.
3. Keep `CONFIG.allowedDomain` as your school domain (for example `school.edu.co`).
4. Update `CONFIG.editorAllowlist` with the emails that should have edit access.
5. (Optional) Set `CONFIG.authorizationEndpoint` to a backend API that returns `{ "canEdit": true|false }`.

## Deploy on GitHub Pages

Publish the repository root as a static site in GitHub Pages settings.
