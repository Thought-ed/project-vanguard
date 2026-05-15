# Project Vanguard | Mission Control

Mission: Salto 1.

This repository contains the organized frontend shell for the rocketry workspace. The current state is a modular static site with a Google sign-in gate, a left-sidebar dashboard, and sectioned mission views.

## Current State

- Google sign-in gate is the landing page
- Dashboard shell appears only after sign-in
- Viewer access is restricted to the configured Google Workspace domain
- Editor role is gated by an allowlist, with optional backend authorization endpoint
- The browser code is split into smaller modules instead of one monolithic script

## Code Layout

- `src/main.js` bootstraps auth and dashboard wiring
- `src/auth/auth.js` handles Google sign-in, JWT decoding, and role resolution
- `src/dashboard/dashboard-view.js` renders the shell, sidebar, and section cards
- `src/dashboard/dashboard-data.js` stores the project labels and dashboard content model
- `config.js` holds the local Google client ID
- `index.html` loads the shell and module entrypoint
- `styles.css` contains the full mission-control visual system

## Local Setup

1. Create or update `config.js` in the repository root.
2. Add `window.APP_CONFIG = { googleClientId: "your-google-client-id" };` to that file.
3. Keep the Google Workspace domain and editor allowlist values aligned with your school accounts.
4. Serve the repository with a static local server or GitHub Pages.

## Notes

- The UI leads with Salto 1 and uses Project Vanguard as the project name.
- The logo asset is wired in from `logo.png`.
- The dashboard is still a static shell; backend APIs can be added later for live project data.


