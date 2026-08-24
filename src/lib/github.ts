import type { GitHubRepo } from "@/lib/types";
import { getConfig } from "@/lib/data";

// Feature-flagged, fails gracefully. This is a data-layer stub only —
// no UI is wired to it yet. When the GitHub Explorer (Section 16) is built,
// it should call fetchGitHubRepos() and render the `error` fallback message
// rather than a raw API error, per Section 38.

interface GitHubFetchResult {
  repos: GitHubRepo[];
  error: string | null;
}

export async function fetchGitHubRepos(): Promise<GitHubFetchResult> {
  const { username } = getConfig().github;

  try {
    const res = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=12`,
      {
        headers: { Accept: "application/vnd.github+json" },
        next: { revalidate: 3600 }
      }
    );

    if (!res.ok) {
      return {
        repos: [],
        error: "GitHub data is temporarily unavailable. Explore the featured projects instead."
      };
    }

    const data = await res.json();

    const repos: GitHubRepo[] = data.map((repo: any) => ({
      name: repo.name,
      description: repo.description,
      language: repo.language,
      stargazersCount: repo.stargazers_count,
      forksCount: repo.forks_count,
      updatedAt: repo.updated_at,
      htmlUrl: repo.html_url
    }));

    return { repos, error: null };
  } catch {
    return {
      repos: [],
      error: "GitHub data is temporarily unavailable. Explore the featured projects instead."
    };
  }
}
