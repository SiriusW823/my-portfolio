import { BadgeCheck, Github, Instagram, MapPin } from "lucide-react";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { useLanguage } from "@/context/LanguageContext";
import { evidence, localize, profile, skillGroups } from "@/data/siteContent";

export default function AboutPage() {
  const { language } = useLanguage();
  const isZh = language === "zh";

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
            <a
              href="https://www.credly.com/users/sing-yun-wu"
              target="_blank"
              rel="noreferrer"
            >
              <BadgeCheck aria-hidden="true" />
              credly.com/users/sing-yun-wu
            </a>
            <a
              href="https://www.instagram.com/s1rius_w"
              target="_blank"
              rel="noreferrer"
            >
              <Instagram aria-hidden="true" />
              instagram.com/s1rius_w
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

        <section className="content-section">
          <div className="section-heading section-heading--stacked">
            <h2 className="terminal-heading">02 / evidence</h2>
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
