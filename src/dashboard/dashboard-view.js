import { DASHBOARD_SECTIONS, MISSION_NAME, PROJECT_NAME, GITHUB_OWNER, GITHUB_REPO_NAME } from "./dashboard-data.js";
import { loadGithubRepositoryStats } from "../github/github-api.js";

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderHeroStats(stats) {
  return stats
    .map(
      (stat) => `
        <li>
          <span>${escapeHtml(stat.label)}</span>
          <strong>${escapeHtml(stat.value)}</strong>
        </li>
      `,
    )
    .join("");
}

function renderListItems(items) {
  return items
    .map(
      (item) => `
        <li class="list-item list-item--${escapeHtml(item.tone || "neutral")}">
          <span class="list-item-label">${escapeHtml(item.label)}</span>
          <span class="list-item-meta">${escapeHtml(item.meta)}</span>
        </li>
      `,
    )
    .join("");
}

function renderPeople(people) {
  return people
    .map(
      (person) => `
        <li class="contact-row">
          <div class="contact-avatar" aria-hidden="true"></div>
          <div>
            <strong>${escapeHtml(person.name)}</strong>
            <span>${escapeHtml(person.role)}</span>
            <a href="mailto:${escapeHtml(person.email)}">${escapeHtml(person.email)}</a>
          </div>
        </li>
      `,
    )
    .join("");
}

function renderLinkItems(links) {
  return links
    .map(
      (link) => `
        <a class="link-row" href="${escapeHtml(link.href)}">
          <span>${escapeHtml(link.label)}</span>
          <span aria-hidden="true">→</span>
        </a>
      `,
    )
    .join("");
}

function renderCard(card) {
  const widthClass = card.width ? ` card--${card.width}` : "";

  if (card.kind === "status") {
    return `
      <article class="card dashboard-card card--status${widthClass}">
        <p class="card-label">${escapeHtml(card.title)}</p>
        <div class="status-row">
          <strong>${escapeHtml(card.value)}</strong>
          <span>${escapeHtml(card.detail)}</span>
        </div>
        <div class="meter" aria-hidden="true">
          <span style="width:${Math.max(0, Math.min(100, card.progress))}%"></span>
        </div>
        <p class="card-footnote">${escapeHtml(card.detail)}</p>
      </article>
    `;
  }

  if (card.kind === "contacts") {
    return `
      <article class="card dashboard-card${widthClass}">
        <p class="card-label">${escapeHtml(card.title)}</p>
        <ul class="contact-list">
          ${renderPeople(card.people || [])}
        </ul>
      </article>
    `;
  }

  if (card.kind === "list") {
    return `
      <article class="card dashboard-card${widthClass}">
        <p class="card-label">${escapeHtml(card.title)}</p>
        <ul class="list-card">
          ${renderListItems(card.items || [])}
        </ul>
      </article>
    `;
  }

  if (card.kind === "links") {
    return `
      <article class="card dashboard-card${widthClass}">
        <p class="card-label">${escapeHtml(card.title)}</p>
        <div class="link-list">
          ${renderLinkItems(card.links || [])}
        </div>
      </article>
    `;
  }

  if (card.kind === "repository") {
    return `
      <article class="card dashboard-card${widthClass}">
        <p class="card-label">${escapeHtml(card.title)}</p>
        <h3>${escapeHtml(card.repoName)}</h3>
        <p class="repository-description">${escapeHtml(card.repoDescription)}</p>
        <div class="repository-stats">
          ${(card.stats || [])
            .map(
              (stat) => `
                <div>
                  <strong>${escapeHtml(stat.value)}</strong>
                  <span>${escapeHtml(stat.label)}</span>
                </div>
              `,
            )
            .join("")}
        </div>
        <p class="repository-live-note">Live from the GitHub page when available.</p>
      </article>
    `;
  }

  return `
    <article class="card dashboard-card${widthClass}">
      <p class="card-label">${escapeHtml(card.title || "Card")}</p>
      <p>${escapeHtml(card.detail || "")}</p>
    </article>
  `;
}

function renderSidebar(sections, activeSectionId) {
  return sections
    .map((section) => {
      const isActive = section.id === activeSectionId;

      return `
        <button
          class="sidebar-link${isActive ? " is-active" : ""}"
          type="button"
          data-section="${escapeHtml(section.id)}"
          aria-pressed="${isActive ? "true" : "false"}"
        >
          <span class="sidebar-link-icon" aria-hidden="true">${escapeHtml(section.shortLabel)}</span>
          <span class="sidebar-link-copy">
            <strong>${escapeHtml(section.navLabel)}</strong>
            <small>${escapeHtml(section.eyebrow)}</small>
          </span>
        </button>
      `;
    })
    .join("");
}

function getSectionById(sectionId) {
  return DASHBOARD_SECTIONS.find((section) => section.id === sectionId) || DASHBOARD_SECTIONS[0];
}

function formatCount(value) {
  if (typeof value !== "number" || Number.isNaN(value)) {
    return "Placeholder";
  }

  return new Intl.NumberFormat("en-US").format(value);
}

function buildRepositoryCards(stats) {
  const section = getSectionById("github");

  return (section.cards || []).map((card) => {
    if (card.kind !== "repository") {
      return card;
    }

    return {
      ...card,
      stats: [
        { label: "Commits", value: formatCount(stats?.commits) },
        { label: "Branches", value: formatCount(stats?.branches) },
        { label: "PRs", value: formatCount(stats?.pullRequests) },
        { label: "Contributors", value: formatCount(stats?.contributors) },
      ],
    };
  });
}

export function createDashboardController({
  elements,
  onSignOut,
}) {
  const {
    dashboard,
    welcome,
    role,
    signOutButton,
    sidebarNav,
    sidebarToggle,
    sidebarBackdrop,
    dashboardTitle,
    dashboardSummary,
    sectionEyebrow,
    sectionTitle,
    sectionSummary,
    heroStats,
    sectionHeroImage,
    dashboardGrid,
  } = elements;

  const state = {
    activeSectionId: DASHBOARD_SECTIONS[0].id,
  };

  function setSidebarOpen(isOpen) {
    document.body.classList.toggle("sidebar-open", isOpen);
    sidebarToggle.setAttribute("aria-expanded", String(isOpen));
    sidebarBackdrop.hidden = !isOpen;
  }

  function closeSidebar() {
    setSidebarOpen(false);
  }

  function syncActiveSidebarItem() {
    sidebarNav.querySelectorAll("[data-section]").forEach((button) => {
      const isActive = button.getAttribute("data-section") === state.activeSectionId;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });
  }

  function renderSection(sectionId) {
    const section = getSectionById(sectionId);
    state.activeSectionId = section.id;

    dashboardTitle.textContent = section.title;
    dashboardSummary.textContent = section.summary;
    sectionEyebrow.textContent = section.eyebrow;
    sectionTitle.textContent = section.title;
    sectionSummary.textContent = section.detail;
    sectionHeroImage.src = section.heroImage;
    sectionHeroImage.alt = `${section.title} logo`;
    heroStats.innerHTML = renderHeroStats(section.stats || []);
    dashboardGrid.innerHTML = (section.cards || []).map(renderCard).join("");
    syncActiveSidebarItem();

    if (section.id === "github") {
      updateGithubRepositoryStats();
    }
  }

  function renderShell() {
    sidebarNav.innerHTML = renderSidebar(DASHBOARD_SECTIONS, state.activeSectionId);

    sidebarNav.querySelectorAll("[data-section]").forEach((button) => {
      button.addEventListener("click", () => {
        const sectionId = button.getAttribute("data-section");
        if (!sectionId) {
          return;
        }

        renderSection(sectionId);
        closeSidebar();
      });
    });
  }

  async function updateGithubRepositoryStats() {
    const repoCard = dashboardGrid.querySelector(".repository-stats");
    if (!repoCard) {
      return;
    }

    try {
      const stats = await loadGithubRepositoryStats({
        owner: GITHUB_OWNER,
        repo: GITHUB_REPO_NAME,
      });

      if (state.activeSectionId !== "github") {
        return;
      }

      const section = getSectionById("github");
      const repositoryCard = (buildRepositoryCards(stats).find((card) => card.kind === "repository") || section.cards[0]);
      const liveCardMarkup = renderCard(repositoryCard);
      const currentRepositoryCard = dashboardGrid.querySelector(".repository-stats")?.closest(".dashboard-card");

      if (currentRepositoryCard) {
        currentRepositoryCard.outerHTML = liveCardMarkup;
      }
    } catch (error) {
      console.error("Failed to load GitHub stats:", error);
    }
  }

  function show(session) {
    dashboard.hidden = false;
    welcome.textContent = `Welcome, ${session.name || session.email}`;
    role.textContent = `${session.role} access`;
    renderShell();
    renderSection(state.activeSectionId);
    closeSidebar();
  }

  function hide() {
    dashboard.hidden = true;
    closeSidebar();
  }

  sidebarToggle.addEventListener("click", () => {
    setSidebarOpen(!document.body.classList.contains("sidebar-open"));
  });

  sidebarBackdrop.addEventListener("click", closeSidebar);

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeSidebar();
    }
  });

  signOutButton.addEventListener("click", () => {
    if (typeof onSignOut === "function") {
      onSignOut();
    }
  });

  renderShell();

  return {
    show,
    hide,
    get activeSection() {
      return state.activeSectionId;
    },
    setActiveSection(sectionId) {
      renderSection(sectionId);
    },
  };
}

export { PROJECT_NAME, MISSION_NAME };
