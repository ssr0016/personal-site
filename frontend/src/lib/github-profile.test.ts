import { afterEach, describe, expect, it, vi } from "vitest";
import { getPublicProfile, ProfileApiError } from "./github-profile";

afterEach(() => vi.unstubAllGlobals());

describe("getPublicProfile", () => {
  it("reads the actual public repository total from GitHub's profile", async () => {
    const fetch = vi.fn().mockResolvedValue(new Response(JSON.stringify({ login: "ssr0016", public_repos: 27 }), { status: 200 }));
    vi.stubGlobal("fetch", fetch);

    await expect(getPublicProfile()).resolves.toEqual({ publicRepos: 27, url: "https://github.com/ssr0016" });
    expect(fetch).toHaveBeenCalledWith("https://api.github.com/users/ssr0016", expect.objectContaining({
      headers: expect.objectContaining({ Accept: "application/vnd.github+json" }),
      next: { revalidate: 3600 },
    }));
  });

  it("reports non-success responses without displaying remote error text", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response('{"message":"private details"}', { status: 403 })));
    await expect(getPublicProfile()).rejects.toMatchObject({ name: "ProfileApiError", status: 403, message: "GitHub profile request failed" });
  });

  it.each(["not json", '{"login":"someone-else","public_repos":42}', '{"login":"ssr0016","public_repos":-1}', '{"login":"ssr0016","public_repos":"many"}'])(
    "rejects an invalid profile payload: %s", async (body) => {
      vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(body)));
      await expect(getPublicProfile()).rejects.toBeInstanceOf(ProfileApiError);
    },
  );

  it("turns network and timeout failures into a safe API error", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("connection secret")));
    await expect(getPublicProfile()).rejects.toMatchObject({ name: "ProfileApiError", message: "GitHub profile is unavailable" });
  });
});
