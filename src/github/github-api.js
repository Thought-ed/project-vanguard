const GITHUB_API_BASE = "https://api.github.com";

function parseLastPageCount(linkHeader) {
  if (typeof linkHeader !== "string" || !linkHeader) {
    return null;
  }

  const lastLink = linkHeader
    .split(",")
    .map((part) => part.trim())
    .find((part) => part.includes('rel="last"'));

  if (!lastLink) {
    return null;
  }

  const match = lastLink.match(/[?&]page=(\d+)/);
  if (!match) {
    return null;
  }

  return Number(match[1]);
}

async function fetchJson(url) {
  const response = await fetch(url, {
    headers: {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  if (!response.ok) {
    throw new Error(`GitHub API request failed with ${response.status}`);
  }

  return response;
}

async function countPaginatedItems(url) {
  const response = await fetchJson(`${url}${url.includes("?") ? "&" : "?"}per_page=1`);
  const linkHeader = response.headers.get("link");
  const lastPage = parseLastPageCount(linkHeader);

  if (lastPage) {
    return lastPage;
  }

  const items = await response.json();
  return Array.isArray(items) ? items.length : 0;
}

async function countPullRequests(owner, repo) {
  const response = await fetchJson(
    `${GITHUB_API_BASE}/search/issues?q=repo:${owner}/${repo}+type:pr`,
  );
  const payload = await response.json();
  return Number(payload.total_count || 0);
}

export async function loadGithubRepositoryStats({ owner, repo }) {
  const [commits, branches, pullRequests, contributors] = await Promise.all([
    countPaginatedItems(`${GITHUB_API_BASE}/repos/${owner}/${repo}/commits`),
    countPaginatedItems(`${GITHUB_API_BASE}/repos/${owner}/${repo}/branches`),
    countPullRequests(owner, repo),
    countPaginatedItems(`${GITHUB_API_BASE}/repos/${owner}/${repo}/contributors?anon=1`),
  ]);

  return {
    commits,
    branches,
    pullRequests,
    contributors,
  };
}
