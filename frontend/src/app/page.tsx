import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getPublicProfile } from "../lib/github-profile";
import styles from "./home.module.css";

export const metadata: Metadata = {
  title: "ssr0016 | Hero at Rest",
  description: "Meet the builder behind the screen, and explore the work.",
};

// Render per request so an upstream outage at deploy time is not baked into the page.
// The successful GitHub response is still cached for an hour by the API client.
export const dynamic = "force-dynamic";

export default async function Home() {
  let publicRepos: number | null = null;
  let profileUrl = "https://github.com/ssr0016";

  try {
    const profile = await getPublicProfile();
    publicRepos = profile.publicRepos;
    profileUrl = profile.url;
  } catch (error) {
    // The portrait and navigation remain available if the upstream API is down.
    console.error("Could not load public profile", error);
  }

  return (
    <main className={styles.stage}>
      <div className={styles.rays} aria-hidden="true" />
      <div className={styles.halftone} aria-hidden="true" />
      <header className={styles.top}>
        <span className={styles.badge}>主人公 <i>SHUJINKŌ / PROTAGONIST</i></span>
        <span className={styles.topNote}>PERSONAL SITE <b>{"///"}</b> FILE 001</span>
      </header>
      <div className={styles.hero}>
        <div className={styles.copy}>
          <span className={styles.chapter}>01 — THE STORY STARTS HERE</span>
          <h1>HERO<br /><span>AT REST</span><i>!</i></h1>
          <p className={styles.subtitle}>休息 <strong>KYUSOKU / THE ONE BEHIND THE SCREEN</strong></p>
          <div className={styles.speech}>
            <span>ssr0016 SAYS:</span>
            <p>“No grand entrance.<br />Just a place to begin.”</p>
          </div>
        </div>
        <div className={styles.character}>
          <span className={styles.characterIndex} aria-hidden="true">01</span>
          <div className={styles.portraitWrap}>
            <Image
              src="/image.png"
              alt="Portrait of ssr0016, arms crossed, wearing glasses and a black shirt"
              fill
              priority
              sizes="(max-width: 700px) 92vw, 46vw"
              className={styles.portraitArt}
            />
          </div>
          <aside className={styles.stats} aria-label="Character profile">
            <small>CHARACTER DATA</small>
            <div><span>NAME</span><strong>ssr0016</strong></div>
            <div><span>CLASS</span><strong>Builder</strong></div>
            <div className={styles.repoStat}>
              <span>PUBLIC REPOS</span>
              <strong>{publicRepos === null ? "UNAVAILABLE" : publicRepos}</strong>
              <small>{publicRepos === null ? "GITHUB DATA TEMPORARILY UNAVAILABLE" : "LIVE DATA / GITHUB · UPDATED HOURLY"}</small>
            </div>
          </aside>
        </div>
      </div>
      <nav className={styles.tabs} aria-label="Site navigation">
        <Link href="/" aria-current="page" className={styles.active}>01 / HOME</Link>
        <a href={profileUrl} target="_blank" rel="noopener noreferrer">02 / PROFILE ↗</a>
        <a href={`${profileUrl}?tab=repositories`} target="_blank" rel="noopener noreferrer">03 / REPOS ↗</a>
        <small>THE STORY CONTINUES</small>
      </nav>
    </main>
  );
}