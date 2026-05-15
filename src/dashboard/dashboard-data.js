export const PROJECT_NAME = "Project Vanguard";
export const MISSION_NAME = "Salto 1";
export const GITHUB_OWNER = "Thought-ed";
export const GITHUB_REPO_NAME = "project-vanguard";
export const REPOSITORY_URL = "https://github.com/Thought-ed/project-vanguard";

export const DASHBOARD_SECTIONS = [
  {
    id: "overview",
    navLabel: "Mission Dashboard",
    shortLabel: "MD",
    eyebrow: "Salto 1 Control",
    title: MISSION_NAME,
    summary: `${PROJECT_NAME} dashboard for the capstone rocketry workspace.`,
    detail: "Sections, links, and status cards.",
    heroImage: "./logo.png",
    stats: [
      { label: "State", value: "Init" },
      { label: "Phase", value: "Before Planning" },
      { label: "Focus", value: "Plan MC" },
    ],
    cards: [
      {
        kind: "status",
        title: "Current State",
        value: "Initialization",
        detail: "Nothing scheduled yet.",
        progress: 8,
        width: "wide",
      },
      {
        kind: "contacts",
        title: "Key Contacts",
        width: "third",
        people: [
          { name: "Pablo Guerrero", role: "Project Lead, Engineer", email: "pablo.guerrero@colegiocanadiense.edu.co" },
        ],
      },
      {
        kind: "list",
        title: "Launch Readiness Tracker",
        width: "half",
        items: [
          { label: "Placeholder task", meta: "placeholder", tone: "neutral" },
          { label: "Placeholder task", meta: "placeholder", tone: "neutral" },
          { label: "Placeholder task", meta: "placeholder", tone: "neutral" },
          { label: "Placeholder task", meta: "placeholder", tone: "neutral" },
          { label: "Placeholder task", meta: "placeholder", tone: "neutral" },
        ],
      },
      {
        kind: "list",
        title: "Upcoming Deadlines",
        width: "half",
        items: [
          { label: "Finish init", meta: "TBD", tone: "neutral" },
          { label: "Start planning", meta: "TBD", tone: "info" },
          { label: "Complete planning", meta: "TBD", tone: "info" },
        ],
      },
      {
        kind: "list",
        title: "Active Risks",
        width: "half",
        items: [
          { label: "Launch Site Height Risk", meta: "TBD", tone: "warn" },
          { label: "Recovery drift and failure", meta: "TBD", tone: "high" },
          { label: "Alternative launch sites", meta: "TBD", tone: "warn" },
          ],
      },
      {
        kind: "links",
        title: "Quick Links",
        width: "third",
        links: [
          { label: "Placeholder link", href: "#" },
          { label: "Placeholder link", href: "#" },
          { label: "Placeholder link", href: "#" },
          { label: "Placeholder link", href: "#" },
        ],
      },
    ],
  },
  {
    id: "propulsion",
    navLabel: "Propulsion",
    shortLabel: "PR",
    eyebrow: "Engineering System",
    title: "Propulsion",
    summary: "Propulsion selection.",
    detail: "No scheduled propulsion work yet.",
    heroImage: "./logo.png",
    stats: [
      { label: "Motor", value: "Placeholder" },
      { label: "Tests", value: "Placeholder" },
      { label: "Risk", value: "Placeholder" },
    ],
    cards: [
      {
        kind: "status",
        title: "Motor Shortlist",
        value: "None",
        detail: "No selections yet.",
        progress: 8,
        width: "half",
      },
      {
        kind: "list",
        title: "Test Log",
        width: "half",
        items: [
          { label: "None", meta: "TBD", tone: "neutral" },
        ],
      },
      {
        kind: "links",
        title: "Reference Files",
        width: "third",
        links: [
          { label: "Placeholder file", href: "#" },
        ],
      },
    ],
  },
  {
    id: "airframe",
    navLabel: "Airframe",
    shortLabel: "AF",
    eyebrow: "Engineering System",
    title: "Airframe",
    summary: "Placeholder airframe section.",
    detail: "No scheduled airframe work yet.",
    heroImage: "./logo.png",
    stats: [
      { label: "CAD", value: "nil" },
      { label: "Mass", value: "nil" },
      { label: "Stability", value: "nil" },
    ],
    cards: [
      {
        kind: "list",
        title: "Structural Checks",
        width: "half",
        items: [
          { label: "None", meta: "TBD", tone: "neutral" },
        ],
      },
      {
        kind: "status",
        title: "CAD Progress",
        value: "0",
        detail: "No progress tracked yet.",
        progress: 8,
        width: "half",
      },
      {
        kind: "links",
        title: "Documentation",
        width: "third",
        links: [
          { label: "Dimension set", href: "#" },
          { label: "Assembly notes", href: "#" },
        ],
      },
    ],
  },
  {
    id: "recovery",
    navLabel: "Recovery",
    shortLabel: "RC",
    eyebrow: "Engineering System",
    title: "Recovery",
    summary: "Recovery section.",
    detail: "No scheduled recovery work yet.",
    heroImage: "./logo.png",
    stats: [
      { label: "Deployment", value: "nil" },
      { label: "Canopy", value: "nil" },
      { label: "Risk", value: "Medium" },
    ],
    cards: [
      {
        kind: "status",
        title: "Deployment Confidence",
        value: "1",
        detail: "No tests scheduled yet.",
        progress: 8,
        width: "wide",
      },
      {
        kind: "list",
        title: "Recovery Checks",
        width: "half",
        items: [
          { label: "None", meta: "TBD", tone: "neutral" },
        ],
      },
      {
        kind: "links",
        title: "Evidence",
        width: "third",
        links: [
          { label: "Drop test clips", href: "#" },
          { label: "Recovery checklist", href: "#" },
        ],
      },
    ],
  },
  {
    id: "avionics",
    navLabel: "Avionics",
    shortLabel: "AV",
    eyebrow: "Engineering System",
    title: "Avionics",
    summary: "Avionics section.",
    detail: "No scheduled avionics work yet.",
    heroImage: "./logo.png",
    stats: [
      { label: "Altimeter", value: "None" },
      { label: "Wiring", value: "None" },
      { label: "Logs", value: "None" },
    ],
    cards: [
      {
        kind: "list",
        title: "Hardware Status",
        width: "half",
        items: [
          { label: "None", meta: "TBD", tone: "neutral" },
        ],
      },
      {
        kind: "status",
        title: "Integration Readiness",
        value: "None",
        detail: "No integration work tracked yet.",
        progress: 8,
        width: "half",
      },
      {
        kind: "links",
        title: "Files",
        width: "third",
        links: [
          { label: "Wiring diagram", href: "#" },
          { label: "Sensor checklist", href: "#" },
        ],
      },
    ],
  },
  {
    id: "simulation",
    navLabel: "Simulation",
    shortLabel: "SIM",
    eyebrow: "Analysis",
    title: "Simulation & Analysis",
    summary: "Simulation section.",
    detail: "No scheduled simulation work yet.",
    heroImage: "./logo.png",
    stats: [
      { label: "Model", value: "None" },
      { label: "Validation", value: "None" },
      { label: "Risk", value: "None" },
    ],
    cards: [
      {
        kind: "status",
        title: "Simulation Coverage",
        value: "0",
        detail: "No simulation progress tracked yet.",
        progress: 8,
        width: "half",
      },
      {
        kind: "list",
        title: "Analysis Queue",
        width: "half",
        items: [
          { label: "None", meta: "TBD", tone: "neutral" },
        ],
      },
      {
        kind: "links",
        title: "Models",
        width: "third",
        links: [
          { label: "OpenRocket file", href: "#" },
          { label: "RASAero notes", href: "#" },
        ],
      },
    ],
  },
  {
    id: "safety",
    navLabel: "Safety",
    shortLabel: "SF",
    eyebrow: "Compliance",
    title: "Safety & Compliance",
    summary: "Safety section.",
    detail: "No scheduled safety work yet.",
    heroImage: "./logo.png",
    stats: [
      { label: "Checklist", value: "None" },
      { label: "Field", value: "None" },
      { label: "Risk", value: "None" },
    ],
    cards: [
      {
        kind: "list",
        title: "Safety Review",
        width: "wide",
        items: [
          { label: "None", meta: "TBD", tone: "neutral" },
        ],
      },
      {
        kind: "links",
        title: "Compliance Files",
        width: "third",
        links: [
          { label: "Safety checklist", href: "#" },
          { label: "Field briefing", href: "#" },
        ],
      },
    ],
  },
  {
    id: "management",
    navLabel: "Project Management",
    shortLabel: "PM",
    eyebrow: "Operations",
    title: "Project Management",
    summary: "Management section.",
    detail: "No team schedule or deliverables are planned yet.",
    heroImage: "./logo.png",
    stats: [
      { label: "Investment", value: "Plausible" },
      { label: "Group Members", value: "Standby" },
      { label: "Meetings", value: "None" },
    ],
    cards: [
      {
        kind: "list",
        title: "Sprint Board",
        width: "half",
        items: [
          { label: "None", meta: "TBD", tone: "neutral" },
        ],
      },
      {
        kind: "list",
        title: "Recent Meeting Notes",
        width: "half",
        items: [
          { label: "None", meta: "TBD", tone: "neutral" },
          { label: "None", meta: "TBD", tone: "neutral" },
          { label: "None", meta: "TBD", tone: "neutral" },
        ],
      },
      {
        kind: "links",
        title: "Board Links",
        width: "third",
        links: [
          { label: "Tasks", href: "#" },
          { label: "Milestones", href: "#" },
          { label: "Meeting notes", href: "#" },
        ],
      },
    ],
  },
  {
    id: "deliverables",
    navLabel: "Academic & Deliverables",
    shortLabel: "DL",
    eyebrow: "Deliverables",
    title: "Academic & Deliverables",
    summary: "Deliverables section.",
    detail: "No deliverables are planned yet.",
    heroImage: "./logo.png",
    stats: [
      { label: "Report", value: "Placeholder" },
      { label: "Presentation", value: "Placeholder" },
      { label: "Evidence", value: "Placeholder" },
    ],
    cards: [
      {
        kind: "list",
        title: "Deliverable Checklist",
        width: "half",
        items: [
          { label: "Placeholder deliverable", meta: "TBD", tone: "neutral" },
          { label: "Placeholder deliverable", meta: "TBD", tone: "neutral" },
          { label: "Placeholder deliverable", meta: "TBD", tone: "neutral" },
        ],
      },
      {
        kind: "links",
        title: "Assets",
        width: "half",
        links: [
          { label: "Report draft", href: "#" },
          { label: "Booth visuals", href: "#" },
          { label: "Grading rubric", href: "#" },
        ],
      },
    ],
  },
  {
    id: "github",
    navLabel: "GitHub Repository",
    shortLabel: "GH",
    eyebrow: "Version Control",
    title: "GitHub Repository",
    summary: `${PROJECT_NAME} repository section.`,
    detail: `No repository workflow is scheduled yet for ${PROJECT_NAME}.`,
    heroImage: "./logo.png",
    stats: [
      { label: "Commits", value: "Placeholder" },
      { label: "Branches", value: "Placeholder" },
      { label: "Pull Requests", value: "Placeholder" },
    ],
    cards: [
      {
        kind: "repository",
        title: "Repository Summary",
        width: "wide",
        repoName: "thought-ed/project-vanguard",
        repoDescription: "Simulation files, docs, CAD, and code for Project Vanguard.",
        stats: [
          { label: "Commits", value: "Placeholder" },
          { label: "Branches", value: "Placeholder" },
          { label: "PRs", value: "3" },
          { label: "Contributors", value: "1" },
        ],
      },
      {
        kind: "links",
        title: "Repository Links",
        width: "third",
        links: [
          { label: "Open repository", href: REPOSITORY_URL },
          { label: "Issues", href: "#" },
          { label: "Pull requests", href: "#" },
        ],
      },
    ],
  },
];
