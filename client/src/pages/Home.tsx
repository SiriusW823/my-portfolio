import {
  ArrowRight,
  FolderOpen,
  Github,
  Instagram,
  MapPin,
} from "lucide-react";
import { Link } from "wouter";
import IntroLoader from "@/components/IntroLoader";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { useLanguage } from "@/context/LanguageContext";
import {
  articleIndex,
  type ArticleCategory,
} from "@/data/articleIndex.generated";
import { localize, profile, skillGroups } from "@/data/siteContent";

const categoryLabels: Record<ArticleCategory, { zh: string; en: string }> = {
  security: { zh: "資安", en: "Security" },
  quantum: { zh: "量子", en: "Quantum" },
  "machine-learning": { zh: "機器學習", en: "Machine learning" },
  engineering: { zh: "工程", en: "Engineering" },
};

const POSTS_PER_HOME = 8;

export default function Home() {
  const { language } = useLanguage();
  const isZh = language === "zh";

  const sortedArticles = [...articleIndex].sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt)
  );
  const latestArticles = sortedArticles.slice(0, POSTS_PER_HOME);

  const categoryCounts = new Map<ArticleCategory, number>();
  for (const article of articleIndex) {
    categoryCounts.set(
      article.category,
      (categoryCounts.get(article.category) ?? 0) + 1
    );
  }
  const categories = Array.from(categoryCounts.entries()).sort(
    (a, b) => b[1] - a[1]
  );

  return (
    <div className="site-page">
      <IntroLoader />
      <SiteHeader active="home" />
      <main id="main-content" className="section-shell home-layout">
        <div className="home-feed">
          <header className="home-intro">
            <h1 className="home-intro__whoami">
              <span className="terminal-accent">$</span> whoami
              <span className="home-intro__cursor" aria-hidden="true">
                _
              </span>
            </h1>
            <ul className="skill-tiles" aria-label={isZh ? "技能" : "Skills"}>
              {skillGroups
                .flatMap(group => group.items)
                .map(skill => (
                  <li className="skill-tile" key={skill}>
                    {skill}
                  </li>
                ))}
            </ul>
            <p className="home-intro__note">
              {isZh
                ? "來自台灣的高中生，研究資安、量子運算與工程實作。"
                : "A high school student in Taiwan exploring cybersecurity, quantum computing, and hands-on engineering."}
            </p>
          </header>

          <section aria-label={isZh ? "最新文章" : "Latest posts"}>
            <div className="section-heading home-feed__heading">
              <p className="terminal-label">01 / latest posts</p>
              <Link href="/archives">
                <a className="text-link">
                  {isZh
                    ? `全部 ${articleIndex.length} 篇`
                    : `All ${articleIndex.length} posts`}
                  <ArrowRight aria-hidden="true" />
                </a>
              </Link>
            </div>

            <div className="post-card-list">
              {latestArticles.map(article => (
                <article className="post-card" key={article.slug}>
                  <div className="post-card__meta">
                    <time dateTime={article.publishedAt}>
                      {article.publishedAt}
                    </time>
                    <Link href={`/archives?category=${article.category}`}>
                      <a className="post-card__category">
                        {categoryLabels[article.category][isZh ? "zh" : "en"]}
                      </a>
                    </Link>
                  </div>
                  <h2>
                    <Link href={`/archives/${article.slug}`}>
                      <a>{article.title}</a>
                    </Link>
                  </h2>
                  <p className="post-card__summary">{article.summary}</p>
                  <div className="post-card__footer post-card__footer--right">
                    <span className="post-card__reading">
                      {article.readingMinutes} min
                    </span>
                  </div>
                </article>
              ))}
            </div>

            <Link href="/archives">
              <a className="button-link home-feed__more">
                {isZh ? "瀏覽所有文章" : "Browse all posts"}
                <ArrowRight aria-hidden="true" />
              </a>
            </Link>
          </section>
        </div>

        <aside className="home-sidebar">
          <section
            className="side-card profile-card"
            aria-label={isZh ? "作者資訊" : "Author profile"}
          >
            <div className="window-bar">
              <span />
              <span />
              <span />
              <code>profile.txt</code>
            </div>
            <div className="profile-card__body">
              <div className="profile-card__avatar" aria-hidden="true">
                S<span className="terminal-accent">_</span>
              </div>
              <h2>{profile.name}</h2>
              <p className="profile-card__tagline">
                {localize(profile.shortBio, language)}
              </p>
              <dl className="profile-card__stats profile-card__stats--two">
                <div>
                  <dt>{isZh ? "文章" : "posts"}</dt>
                  <dd>{articleIndex.length}</dd>
                </div>
                <div>
                  <dt>{isZh ? "分類" : "categories"}</dt>
                  <dd>{categories.length}</dd>
                </div>
              </dl>
              <p className="profile-card__location">
                <MapPin aria-hidden="true" />
                Taiwan
              </p>
              <div className="profile-card__links">
                <a
                  href="https://github.com/SiriusW823"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                >
                  <Github aria-hidden="true" />
                </a>
                <a
                  href="https://www.instagram.com/s1rius_w"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                >
                  <Instagram aria-hidden="true" />
                </a>
              </div>
            </div>
          </section>

          <section
            className="side-card"
            aria-label={isZh ? "分類" : "Categories"}
          >
            <h3 className="side-card__title">
              <FolderOpen aria-hidden="true" />
              {isZh ? "分類" : "Categories"}
            </h3>
            <ul className="side-cat-list">
              {categories.map(([category, count]) => (
                <li key={category}>
                  <Link href={`/archives?category=${category}`}>
                    <a>
                      <span>
                        {categoryLabels[category][isZh ? "zh" : "en"]}
                      </span>
                      <span className="side-count">{count}</span>
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </aside>
      </main>
      <SiteFooter />
    </div>
  );
}
