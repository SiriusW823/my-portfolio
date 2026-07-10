import { ArrowRight, BookOpen, CircleDot, Github } from "lucide-react";
import { Link } from "wouter";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { useLanguage } from "@/context/LanguageContext";
import { articleIndex } from "@/data/articleIndex.generated";
import { localize, profile, projects } from "@/data/siteContent";

export default function Home() {
  const { language } = useLanguage();
  const isZh = language === "zh";
  const featuredProjects = projects.slice(0, 3);
  const latestArticles = articleIndex.slice(0, 4);

  return (
    <div className="site-page">
      <SiteHeader active="home" />
      <main id="main-content">
        <section className="hero-shell section-shell">
          <div className="hero-copy">
            <p className="terminal-prompt"><span className="terminal-accent">$</span> whoami</p>
            <h1>{isZh ? "把好奇心做成能被驗證的系統。" : "Turning curiosity into systems that can be tested."}</h1>
            <p className="hero-intro">{localize(profile.shortBio, language)}</p>
            <div className="hero-actions">
              <Link href="/work">
                <a className="button-link button-link--primary">
                  {isZh ? "看作品" : "View work"}<ArrowRight aria-hidden="true" />
                </a>
              </Link>
              <Link href="/archives">
                <a className="button-link">
                  {isZh ? "讀研究與解題筆記" : "Read notes"}<BookOpen aria-hidden="true" />
                </a>
              </Link>
            </div>
          </div>

          <aside className="now-panel" aria-label={isZh ? "目前狀態" : "Current status"}>
            <div className="window-bar"><span /><span /><span /><code>now.txt</code></div>
            <div className="now-panel__body">
              <p className="terminal-label">{isZh ? "目前進行" : "CURRENTLY"}</p>
              <p>{localize(profile.current, language)}</p>
              <dl>
                <div><dt>notes</dt><dd>{articleIndex.length}</dd></div>
                <div><dt>builds</dt><dd>{projects.length}</dd></div>
                <div><dt>ctf</dt><dd>16 / 80</dd></div>
              </dl>
              <p className="status-line"><CircleDot aria-hidden="true" /> {isZh ? "持續更新實驗與失敗紀錄" : "Logging experiments and failures as they happen"}</p>
            </div>
          </aside>
        </section>

        <section className="section-shell content-section">
          <div className="section-heading">
            <div>
              <p className="terminal-label">01 / selected work</p>
              <h2>{isZh ? "不是概念圖，是做過的東西" : "Built work, not concept pieces"}</h2>
            </div>
            <Link href="/work"><a className="text-link">{isZh ? "全部作品" : "All work"}<ArrowRight aria-hidden="true" /></a></Link>
          </div>

          <div className="project-list project-list--home">
            {featuredProjects.map((project, index) => (
              <article className="project-row" key={project.id}>
                <div className="project-row__index">0{index + 1}</div>
                <div className="project-row__content">
                  <div className="project-row__meta"><span>{project.year}</span><span>{localize(project.status, language)}</span></div>
                  <h3>{localize(project.title, language)}</h3>
                  <p>{localize(project.description, language)}</p>
                  <ul className="tag-list" aria-label={isZh ? "使用工具" : "Tools used"}>
                    {project.tools.slice(0, 5).map((tool) => <li key={tool}>{tool}</li>)}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section-shell content-section two-column-section">
          <div className="section-heading section-heading--stacked">
            <p className="terminal-label">02 / latest writing</p>
            <h2>{isZh ? "研究、實驗與解題紀錄" : "Research, experiments, and writeups"}</h2>
            <p>{isZh ? "文章從 HackMD 整理為站內閱讀版本，可搜尋、分類，也保留原始來源。" : "Notes are synced from HackMD into searchable, readable on-site articles with links back to the originals."}</p>
          </div>
          <div className="article-index">
            {latestArticles.map((article) => (
              <Link key={article.slug} href={`/archives/${article.slug}`}>
                <a className="article-index__item">
                  <span className="article-index__date">{article.updatedAt}</span>
                  <span className="article-index__title">{article.title}</span>
                  <span className="article-index__time">{article.readingMinutes} min</span>
                  <ArrowRight aria-hidden="true" />
                </a>
              </Link>
            ))}
            <Link href="/archives"><a className="text-link article-index__all">{isZh ? `瀏覽全部 ${articleIndex.length} 篇` : `Browse all ${articleIndex.length} notes`}<ArrowRight aria-hidden="true" /></a></Link>
          </div>
        </section>

        <section className="section-shell contact-strip">
          <div>
            <p className="terminal-label">03 / source</p>
            <h2>{isZh ? "程式、研究與持續更新" : "Code, research, and ongoing work"}</h2>
          </div>
          <a className="button-link" href="https://github.com/SiriusW823" target="_blank" rel="noreferrer">
            <Github aria-hidden="true" />GitHub
          </a>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
