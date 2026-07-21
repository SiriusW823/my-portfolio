import { BadgeCheck, ExternalLink, Github, MapPin } from "lucide-react";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { useLanguage } from "@/context/LanguageContext";
import { credlyBadges, credlyProfileUrl } from "@/data/credlyBadges";
import { evidence, localize, profile, skillGroups } from "@/data/siteContent";

export default function AboutPage() {
  const { language } = useLanguage();
  const isZh = language === "zh";
  const assetBase = import.meta.env.BASE_URL;

  const evidenceSections = [
    {
      key: "competitions",
      title: isZh ? "競賽與成果" : "Competitions & results",
      items: evidence.competitions,
    },
    {
      key: "credentials",
      title: isZh ? "證照與檢定" : "Credentials",
      items: evidence.credentials,
    },
    {
      key: "learning",
      title: isZh ? "課程與培訓" : "Learning",
      items: evidence.learning,
    },
  ];

  return (
    <div className="site-page">
      <SiteHeader active="about" />
      <main id="main-content" className="section-shell page-main">
        <header className="page-intro about-intro">
          <div>
            <p className="terminal-prompt">
              <span className="terminal-accent">$</span> cat about.md
            </p>
            <h1>{isZh ? "關於 SIRIUS" : "About SIRIUS"}</h1>
            <p>{localize(profile.shortBio, language)}</p>
          </div>
          <div className="about-meta">
            <p>
              <MapPin aria-hidden="true" />
              Taiwan
            </p>
            <a
              href="https://github.com/SiriusW823"
              target="_blank"
              rel="noreferrer"
            >
              <Github aria-hidden="true" />
              github.com/SiriusW823
            </a>
          </div>
        </header>

        <section className="content-section">
          <div className="section-heading section-heading--stacked">
            <h2 className="terminal-heading">01 / toolkit</h2>
          </div>
          <div className="skill-groups">
            {skillGroups.map(group => (
              <div key={group.label}>
                <h3>{group.label}/</h3>
                <ul>
                  {group.items.map(item => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section
          className="content-section credential-section"
          aria-labelledby="credly-heading"
        >
          <div className="section-heading credential-heading">
            <div>
              <p className="terminal-label">verified / public</p>
              <h2 id="credly-heading" className="terminal-heading">
                02 / badges
              </h2>
            </div>
            <a
              className="text-link"
              href={credlyProfileUrl}
              target="_blank"
              rel="noreferrer"
            >
              {isZh ? "查看公開 Credly 檔案" : "Open public Credly profile"}
              <ExternalLink aria-hidden="true" />
            </a>
          </div>
          <p className="credential-intro">
            {isZh
              ? "這些徽章由發證單位透過 Credly 驗證；點選任一徽章可前往公開檔案核對。"
              : "These badges are issuer-verified through Credly. Open any badge to confirm it on the public profile."}
          </p>
          <div className="credly-badge-grid">
            {credlyBadges.map(badge => (
              <a
                className="credly-badge-card"
                href={credlyProfileUrl}
                target="_blank"
                rel="noreferrer"
                key={badge.name}
                aria-label={`${badge.name} — ${isZh ? "在 Credly 驗證" : "verify on Credly"}`}
              >
                <div className="credly-badge-card__image">
                  <img
                    src={`${assetBase}${badge.image}`}
                    alt=""
                    loading="lazy"
                  />
                </div>
                <div className="credly-badge-card__copy">
                  <span>
                    <BadgeCheck aria-hidden="true" />
                    {badge.issuer}
                  </span>
                  <h3>{badge.name}</h3>
                  <time dateTime={badge.issued}>
                    {isZh ? `發證 ${badge.issued}` : `Issued ${badge.issued}`}
                  </time>
                </div>
                <ExternalLink
                  className="credly-badge-card__link-icon"
                  aria-hidden="true"
                />
              </a>
            ))}
          </div>
        </section>

        <section className="content-section">
          <div className="section-heading section-heading--stacked">
            <h2 className="terminal-heading">03 / evidence</h2>
          </div>
          <div className="evidence-grid">
            {evidenceSections.map(section => (
              <section key={section.key}>
                <h3>{section.title}</h3>
                <ul>
                  {section.items.map(item => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
