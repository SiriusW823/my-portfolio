import { Github, MapPin } from "lucide-react";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { useLanguage } from "@/context/LanguageContext";
import { evidence, localize, profile, skillGroups } from "@/data/siteContent";

export default function AboutPage() {
  const { language } = useLanguage();
  const isZh = language === "zh";

  const evidenceSections = [
    { key: "competitions", title: isZh ? "競賽與成果" : "Competitions & results", items: evidence.competitions },
    { key: "credentials", title: isZh ? "證照與檢定" : "Credentials", items: evidence.credentials },
    { key: "learning", title: isZh ? "課程與培訓" : "Learning", items: evidence.learning },
  ];

  return (
    <div className="site-page">
      <SiteHeader active="about" />
      <main id="main-content" className="section-shell page-main">
        <header className="page-intro about-intro">
          <div>
            <p className="terminal-prompt"><span className="terminal-accent">$</span> cat about.md</p>
            <h1>{isZh ? "關於 SIRIUS" : "About SIRIUS"}</h1>
            <p>{localize(profile.shortBio, language)}</p>
          </div>
          <div className="about-meta">
            <p><MapPin aria-hidden="true" />Taiwan</p>
            <a href="https://github.com/SiriusW823" target="_blank" rel="noreferrer"><Github aria-hidden="true" />github.com/SiriusW823</a>
          </div>
        </header>

        <section className="about-statement content-section">
          <p className="terminal-label">// how I work</p>
          <div>
            <h2>{isZh ? "我在意過程能不能被重現。" : "I care whether the process can be reproduced."}</h2>
            <p>{isZh ? "不論是 CTF、量子模型、聲音分析或硬體電路，我都會留下假設、測試條件、失敗原因與下一步。這個網站不是獎項清單，而是一份持續修正的工作紀錄。" : "Whether the work is a CTF challenge, a quantum model, audio analysis, or a hardware circuit, I document assumptions, test conditions, failures, and next steps. This site is a working record rather than an award wall."}</p>
          </div>
        </section>

        <section className="content-section">
          <div className="section-heading section-heading--stacked">
            <p className="terminal-label">01 / toolkit</p>
            <h2>{isZh ? "技能不是進度條" : "Skills without progress bars"}</h2>
          </div>
          <div className="skill-groups">
            {skillGroups.map((group) => (
              <div key={group.label}>
                <h3>{group.label}/</h3>
                <ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
              </div>
            ))}
          </div>
        </section>

        <section className="content-section">
          <div className="section-heading section-heading--stacked">
            <p className="terminal-label">02 / evidence</p>
            <h2>{isZh ? "可核對的學習軌跡" : "A traceable learning record"}</h2>
          </div>
          <div className="evidence-grid">
            {evidenceSections.map((section) => (
              <section key={section.key}>
                <h3>{section.title}</h3>
                <ul>{section.items.map((item) => <li key={item}>{item}</li>)}</ul>
              </section>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
