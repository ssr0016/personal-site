import { afterEach, describe, expect, it, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import Home from "./page";

afterEach(() => vi.unstubAllGlobals());

describe("homepage hero", () => {
  it("renders the chosen portrait-led direction and real public repo data", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(JSON.stringify({ login: "ssr0016", public_repos: 27 }))));
    const html = renderToStaticMarkup(await Home());
    expect(html).toContain("HERO");
    expect(html).toContain("AT REST");
    expect(html).toContain("休息");
    expect(html).toContain("KYUSOKU / THE ONE BEHIND THE SCREEN");
    expect(html).toContain("PUBLIC REPOS");
    expect(html).toContain("27");
    expect(html).toContain('href="https://github.com/ssr0016"');
    expect(html).toContain("02 / PROFILE ↗");
    expect(html).toContain('href="https://github.com/ssr0016?tab=repositories"');
    expect(html).toContain("%2Fimage.png");
    expect(html).not.toContain("/health");
    expect(html).not.toContain("PROTOTYPE");
  });

  it("renders an honest unavailable state without losing the hero when the API fails", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("offline")));
    const html = renderToStaticMarkup(await Home());
    expect(html).toContain("HERO");
    expect(html).toContain("UNAVAILABLE");
    expect(html).not.toContain("connection secret");
  });
});
