const PROFILE_URL = "https://api.github.com/users/ssr0016";
const PUBLIC_URL = "https://github.com/ssr0016";

export class ProfileApiError extends Error {
  constructor(message: string, public readonly status?: number) {
    super(message);
    this.name = "ProfileApiError";
  }
}

export async function getPublicProfile(): Promise<{ publicRepos: number; url: string }> {
  let response: Response;
  try {
    response = await fetch(PROFILE_URL, {
      headers: { Accept: "application/vnd.github+json" },
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(3000),
    });
  } catch {
    throw new ProfileApiError("GitHub profile is unavailable");
  }

  if (!response.ok) {
    throw new ProfileApiError("GitHub profile request failed", response.status);
  }

  let payload: unknown;
  try {
    payload = await response.json();
  } catch {
    throw new ProfileApiError("GitHub profile returned invalid data");
  }

  if (typeof payload !== "object" || payload === null || !("login" in payload) ||
    payload.login !== "ssr0016" || !("public_repos" in payload) ||
    typeof payload.public_repos !== "number" || !Number.isSafeInteger(payload.public_repos) || payload.public_repos < 0) {
    throw new ProfileApiError("GitHub profile returned invalid data");
  }

  return { publicRepos: payload.public_repos, url: PUBLIC_URL };
}
