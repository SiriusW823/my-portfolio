import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { Link } from "wouter";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { useLanguage } from "@/context/LanguageContext";
import { localize, projects } from "@/data/siteContent";

function assetUrl(path: string) {
  return `${import.meta.env.BASE_URL}${path}`;
}

export default function WorkPage() {
  const { language } = useLanguage();
  const isZh = language === "zh";

  return (
    <div className="site-page">
      <SiteHeader active="work" />
      <main id="main-content" className="section-shell page-main">
        <header className="page-intro">
          <p className="terminal-prompt"><span className="terminal-accent">$</span> ls ./work</p>
          <h1>{isZh ? "作品與研究" : "Work & research"}</h1>
          <p>{isZh ? "這裡放的是可說明過程、取捨與結果的實作。每個專案都來自本機學習歷程報告或研究紀錄。" : "Projects with enough evidence to explain the process, trade-offs, and results, drawn from documented coursework and research."}</p>
        </header>

        <div className="work-grid">
          {projects.map((project, index) => (
            <article className="work-card" key={project.id}>
              {project.image && project.imageAlt ? (
                <div className="work-card__media">
                  <img src={assetUrl(project.image)} alt={localize(project.imageAlt, language)} loading={index > 1 ? "lazy" : "eager"} />
                </div>
              ) : (
                <div className="work-card__media work-card__media--code" aria-hidden="true">
                  <code>project/{project.id}</code>
                  <span>{project.year}</span>
                </div>
              )}
              <div className="work-card__body">
                <div className="project-row__meta"><span>{project.year}</span><span>{localize(project.status, language)}</span></div>
                <h2>{localize(project.title, language)}</h2>
                <p className="work-card__description">{localize(project.description, language)}</p>
                <p className="work-card__role"><strong>{isZh ? "負責：" : "Role: "}</strong>{localize(project.role, language)}</p>
                <ul className="highlight-list">
                  {project.highlights.map((highlight) => (
                    <li key={highlight.en}><CheckCircle2 aria-hidden="true" />{localize(highlight, language)}</li>
                  ))}
                </ul>
                <ul className="tag-list">
                  {project.tools.map((tool) => <li key={tool}>{tool}</li>)}
                </ul>
                {project.articleSlug && (
                  <Link href={`/archives/${project.articleSlug}`}>
                    <a className="text-link">{isZh ? "閱讀相關筆記" : "Read the related note"}<ArrowUpRight aria-hidden="true" /></a>
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
