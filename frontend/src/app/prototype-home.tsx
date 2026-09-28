"use client";

// THROWAWAY PROTOTYPE: Four portrait-led homepage heroes on /, switched with ?variant=.
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import styles from "./prototype-home.module.css";

type Variant = "A" | "B" | "C" | "d";
type LiveStatus = { online: boolean; label: string };

const variants: Variant[] = ["A", "B", "C", "d"];
const names: Record<Variant, string> = {
  A: "The Interruption",
  B: "Quiet Interface",
  C: "Character Select",
  d: "Anime Splash",
};

function Portrait({ className = "" }: { className?: string }) {
  return (
    <Image
      src="/image.png"
      alt="Portrait of the site owner, arms crossed, in glasses and a black shirt, framed by a white glow"
      fill
      priority
      sizes="(max-width: 700px) 92vw, 46vw"
      className={`${styles.portrait} ${className}`}
    />
  );
}

function LiveReadout({ status }: { status: LiveStatus }) {
  return (
    <span className={styles.liveReadout}>
      <span className={`${styles.liveDot} ${status.online ? styles.online : ""}`} />
      API /health · {status.label}
    </span>
  );
}

// A: Editorial interruption. Portrait is the interruption; choices are secondary.
function VariantA({ status }: { status: LiveStatus }) {
  return (
    <section className={`${styles.stage} ${styles.stageA}`} aria-label="Variant A: The Interruption">
      <header className={styles.aMasthead}>
        <span className={styles.aMark}>ssr<span>0016</span><i>●</i></span>
        <span className={styles.aMastRight}>PERSONAL SITE <b>/</b> HOME</span>
      </header>
      <div className={styles.aGrid}>
        <div className={styles.aCopy}>
          <div className={styles.aIssue}>CHARACTER FILE <span>001 / ACTIVE</span></div>
          <h1 className={styles.aTitle}>THE<br /><em>HERO</em><br />AT REST<span className={styles.aPeriod}>.</span></h1>
          <p className={styles.aDeck}>A personal corner of the internet. A quiet moment before the next chapter.</p>
          <div className={styles.aCommand} aria-label="Homepage hero composition notes">
            <span className={styles.aCommandTag}>SELECT A DIRECTION</span>
            <strong>PORTRAIT FIRST</strong><span className={styles.aArrow}>↗</span>
          </div>
        </div>
        <div className={styles.aImageField}>
          <div className={styles.aOrangeShape} />
          <div className={styles.aImage}><Portrait /></div>
          <span className={styles.aVertical}>THE BUILDER / IDLE ANIMATION 01</span>
          <span className={styles.aImageNumber}>01</span>
        </div>
      </div>
      <footer className={styles.aFooter}>
        <span>PORTRAIT STUDY — ANGULAR / EDITORIAL</span>
        <LiveReadout status={status} />
        <span>SCROLL TO EXPLORE ↓</span>
      </footer>
    </section>
  );
}

// B: Minimal HUD. The dossier and live signal lead; portrait is contained.
function VariantB({ status }: { status: LiveStatus }) {
  return (
    <section className={`${styles.stage} ${styles.stageB}`} aria-label="Variant B: Quiet Interface">
      <header className={styles.bHeader}>
        <span className={styles.bLogo}>ssr0016 <span>/ archive</span></span>
        <span>HOME&nbsp; / &nbsp;001</span>
      </header>
      <div className={styles.bBody}>
        <aside className={styles.bRail} aria-hidden="true"><span>01</span><div /><span>03</span></aside>
        <div className={styles.bImageWrap}>
          <div className={styles.bImage}><Portrait /></div>
          <p className={styles.bCaption}>FIG 01. THE AUTHOR, AT REST</p>
        </div>
        <div className={styles.bCopy}>
          <p className={styles.bKicker}>PERSONAL ARCHIVE &nbsp;—&nbsp; 001</p>
          <h1>A place to<br /><i>begin again.</i></h1>
          <div className={styles.bRule} />
          <p className={styles.bDescription}>Behind the screen is a person, not a dashboard. This is the first frame of a personal site still becoming itself.</p>
          <div className={styles.bIndex}>
            <div><span>SUBJECT</span><strong>ssr0016</strong></div>
            <div><span>POSTURE</span><strong>At rest</strong></div>
            <div><span>CONNECTION</span><strong><LiveReadout status={status} /></strong></div>
          </div>
          <p className={styles.bFootnote}>No journal entries connected in this prototype.</p>
        </div>
      </div>
      <footer className={styles.bFooter}><span>PORTRAIT / INTERFACE STUDY</span><span>MONOCHROME · STEEL · WARMTH</span></footer>
    </section>
  );
}

// C: Tactical character select. Commands and dialogue frame the portrait.
function VariantC({ status }: { status: LiveStatus }) {
  return (
    <section className={`${styles.stage} ${styles.stageC}`} aria-label="Variant C: Character Select">
      <header className={styles.cTop}>
        <span className={styles.cEmblem}>✧ <strong>CHARACTER SELECT</strong></span>
        <span>PERSONAL SITE <i>／</i> CHAPTER 00</span>
      </header>
      <div className={styles.cBody}>
        <div className={styles.cCard}>
          <div className={styles.cCardTop}><span>NO. 001</span><span>AVAILABLE</span></div>
          <div className={styles.cImage}><Portrait /></div>
          <div className={styles.cCardBottom}><span>THE BUILDER</span><strong>ssr0016</strong></div>
        </div>
        <div className={styles.cPanel}>
          <p className={styles.cOverline}>A NEW FILE HAS BEEN FOUND</p>
          <h1>Choose your<br /><em>starting point.</em></h1>
          <div className={styles.cCommands} aria-label="Hero content hierarchy">
            <div className={styles.cSelected}><span>▶</span> Meet the person <small>01</small></div>
            <div><span>◇</span> See the work <small>02</small></div>
            <div><span>◇</span> Read the journal <small>03</small></div>
          </div>
          <div className={styles.cStatus}>
            <span>WORLD STATUS</span>
            <LiveReadout status={status} />
          </div>
        </div>
      </div>
      <div className={styles.cDialogue}><span>ssr0016</span><p>“No grand entrance. Just a place to begin.”</p><i>▼</i></div>
      <footer className={styles.cFooter}>PROTOTYPE UI · COMMANDS ARE COMPOSITION STUDIES, NOT LIVE ROUTES</footer>
    </section>
  );
}

// D: Persona 5-inspired anime splash: diagonal field, character art, stats, speech and angular tabs.
function VariantD({ status }: { status: LiveStatus }) {
  return (
    <section className={`${styles.stage} ${styles.stageD}`} aria-label="Variant D: Anime Splash">
      <div className={styles.dRays} aria-hidden="true" />
      <div className={styles.dHalftone} aria-hidden="true" />
      <header className={styles.dTop}>
        <span className={styles.dBadge}>主人公 <i>SHUJINKŌ / PROTAGONIST</i></span>
        <span>PERSONAL SITE <b>{"///"}</b> FILE 001</span>
      </header>
      <div className={styles.dHero}>
        <div className={styles.dCopy}>
          <span className={styles.dChapter}>01 — THE STORY STARTS HERE</span>
          <h1>HERO<br /><span>AT REST</span><i>!</i></h1>
          <p className={styles.dSubtitle}>主人公 <strong>SHUJINKŌ</strong> / THE ONE BEHIND THE SCREEN</p>
          <div className={styles.dSpeech}>
            <span>ssr0016 SAYS:</span>
            <p>“No grand entrance.<br />Just a place to begin.”</p>
          </div>
        </div>
        <div className={styles.dCharacter}>
          <span className={styles.dCharacterIndex}>01</span>
          <div className={styles.dPortraitWrap}>
            <Portrait className={styles.dPortraitArt} />
          </div>
          <aside className={styles.dStats} aria-label="Character stats, prototype-only values">
            <small>CHARACTER DATA / UI SAMPLE</small>
            <div><span>NAME</span><strong>ssr0016</strong></div>
            <div><span>CLASS</span><strong>Builder</strong></div>
            <div><span>LVL</span><strong>001</strong></div>
            <div className={styles.dMeterRow}><span>HP</span><b className={styles.dMeter}><i /></b></div>
            <div className={styles.dMeterRow}><span>MP</span><b className={styles.dMeter}><i /></b></div>
            <div className={styles.dConnection}>
              <span>CONNECTION</span>
              <strong>{status.online ? "OK" : status.label.toUpperCase()}</strong>
              <small>LIVE /health</small>
            </div>
          </aside>
        </div>
      </div>
      <nav className={styles.dTabs} aria-label="Concept-only menu tabs">
        <span className={styles.dTabActive}>01 / HOME</span>
        <span>02 / ABOUT</span>
        <span>03 / JOURNAL</span>
        <small>MENU STUDY / NO LIVE ROUTES</small>
      </nav>
    </section>
  );
}

export default function PrototypeHome({
  initialVariant,
  status,
}: {
  initialVariant: Variant;
  status: LiveStatus;
}) {
  const router = useRouter();
  const [variant, setVariant] = useState<Variant>(initialVariant);

  const changeVariant = useCallback((next: Variant) => {
    setVariant(next);
    const params = new URLSearchParams(window.location.search);
    params.set("variant", next);
    router.replace(`${window.location.pathname}?${params.toString()}`, { scroll: false });
  }, [router]);

  const cycle = useCallback((direction: number) => {
    const currentIndex = variants.indexOf(variant);
    changeVariant(variants[(currentIndex + direction + variants.length) % variants.length]);
  }, [changeVariant, variant]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      if (target?.closest("input, textarea, select, [contenteditable]")) return;
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault();
        cycle(event.key === "ArrowRight" ? 1 : -1);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [cycle]);

  return (
    <main className={`${styles.prototype} ${variant === "d" ? styles.prototypeD : ""}`}>
      <div className={styles.questionBar}>
        <span>PROTOTYPE / ONE QUESTION</span>
        <p>Anong itsura ng homepage hero kapag RPG-style, gamit ang portrait ko?</p>
        <span className={styles.questionEnd}>/ · {variant.toUpperCase()}</span>
      </div>
      {variant === "A" && <VariantA status={status} />}
      {variant === "B" && <VariantB status={status} />}
      {variant === "C" && <VariantC status={status} />}
      {variant === "d" && <VariantD status={status} />}
      {process.env.NODE_ENV !== "production" && (
        <nav className={styles.switcher} aria-label="Prototype variants">
          <button onClick={() => cycle(-1)} aria-label="Previous variant">←</button>
          <div><small>VARIANT {variant.toUpperCase()} / 04</small><strong>{names[variant]}</strong></div>
          <button onClick={() => cycle(1)} aria-label="Next variant">→</button>
        </nav>
      )}
    </main>
  );
}
