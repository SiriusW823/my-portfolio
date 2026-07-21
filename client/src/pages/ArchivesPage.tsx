import { useState } from "react";
import { ArrowRight, Search } from "lucide-react";
import { Link } from "wouter";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { useLanguage } from "@/context/LanguageContext";
import {
  articleIndex,
  type ArticleCategory,
  type ArticleSummary,
} from "@/data/articleIndex.generated";

type CategoryFilter = "all" | ArticleCategory;

const categoryLabels: Record<CategoryFilter, { zh: string; en: string }> = {
  all: { zh: "全部", en: "All" },
  security: { zh: "資安", en: "Security" },
  quantum: { zh: "量子", en: "Quantum" },
  "machine-learning": { zh: "機器學習", en: "Machine learning" },
  engineering: { zh: "工程", en: "Engineering" },
};

function readInitialFilters(): { category: CategoryFilter; query: string } {
  if (typeof window === "undefined") return { category: "all", query: "" };
  const params = new URLSearchParams(window.location.search);
  const categoryParam = params.get("category");
  const category =
    categoryParam && categoryParam in categoryLabels
      ? (categoryParam as CategoryFilter)
      : "all";
  return { category, query: params.get("q") ?? "" };
}

function groupByYear(
  articles: ArticleSummary[]
): Array<[string, ArticleSummary[]]> {
  const groups = new Map<string, ArticleSummary[]>();
  for (const article of articles) {
    const year = article.publishedAt.slice(0, 4);
    const list = groups.get(year) ?? [];
    list.push(article);
    groups.set(year, list);
  }
  return Array.from(groups.entries())
    .sort((a, b) => b[0].localeCompare(a[0]))
    .map(([year, list]) => [
      year,
      list.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)),
    ]);
}

export default function ArchivesPage() {
  const { language } = useLanguage();
  const isZh = language === "zh";
  const initialFilters = readInitialFilters();
  const [query, setQuery] = useState(initialFilters.query);
  const [category, setCategory] = useState<CategoryFilter>(
    initialFilters.category
  );
  const normalizedQuery = query.trim().toLowerCase();
  const filteredArticles = articleIndex.filter(article => {
    const matchesCategory = category === "all" || article.category === category;
    const searchableText =
      `${article.title} ${article.summary} ${article.tags.join(" ")}`.toLowerCase();
    return (
      matchesCategory &&
      (!normalizedQuery || searchableText.includes(normalizedQuery))
    );
  });
  const yearGroups = groupByYear(filteredArticles);

  return (
    <div className="site-page">
      <SiteHeader active="writing" />
      <main id="main-content" className="section-shell page-main">
        <header className="page-intro page-intro--with-count">
          <div>
            <p className="terminal-prompt">
              <span className="terminal-accent">$</span> find ./notes -type f
            </p>
            <h1>{isZh ? "文章與筆記" : "Writing & notes"}</h1>
            <p>
              {isZh
                ? "CTF 解題、量子運算、機器學習與工程研究；所有內容都能直接在站內完整閱讀。"
                : "CTF writeups, quantum computing, machine learning, and engineering research, all available as complete on-site notes."}
            </p>
          </div>
          <span
            className="large-count"
            aria-label={
              isZh
                ? `${articleIndex.length} 篇文章`
                : `${articleIndex.length} articles`
            }
          >
            {articleIndex.length}
          </span>
        </header>

        <section
          className="archive-tools"
          aria-label={isZh ? "文章篩選" : "Article filters"}
        >
          <label className="search-field">
            <Search aria-hidden="true" />
            <span className="sr-only">
              {isZh ? "搜尋文章" : "Search articles"}
            </span>
            <input
              value={query}
              onChange={event => setQuery(event.target.value)}
              placeholder={
                isZh
                  ? "搜尋標題、摘要或標籤"
                  : "Search titles, summaries, or tags"
              }
            />
          </label>
          <div
            className="filter-tabs"
            role="group"
            aria-label={isZh ? "依分類篩選" : "Filter by category"}
          >
            {(Object.keys(categoryLabels) as CategoryFilter[]).map(key => (
              <button
                type="button"
                key={key}
                className={category === key ? "is-active" : ""}
                aria-pressed={category === key}
                onClick={() => setCategory(key)}
              >
                {categoryLabels[key][isZh ? "zh" : "en"]}
              </button>
            ))}
          </div>
        </section>

        <p className="result-count" aria-live="polite">
          {isZh
            ? `顯示 ${filteredArticles.length} 篇`
            : `${filteredArticles.length} article${filteredArticles.length === 1 ? "" : "s"}`}
        </p>

        <div className="archive-timeline">
          {yearGroups.map(([year, articles]) => (
            <section
              key={year}
              className="year-group"
              aria-label={isZh ? `${year} 年文章` : `Posts from ${year}`}
            >
              <h2 className="year-group__label">
                {year}
                <span className="year-group__count">({articles.length})</span>
              </h2>
              <div className="year-group__list">
                {articles.map(article => (
                  <article key={article.slug} className="timeline-row">
                    <time
                      className="timeline-row__date"
                      dateTime={article.publishedAt}
                    >
                      {article.publishedAt.slice(5)}
                    </time>
                    <div className="timeline-row__content">
                      <h3>
                        <Link href={`/archives/${article.slug}`}>
                          <a>{article.title}</a>
                        </Link>
                      </h3>
                      <p className="timeline-row__summary">{article.summary}</p>
                      <div className="timeline-row__footer">
                        <span className="timeline-row__category">
                          {categoryLabels[article.category][isZh ? "zh" : "en"]}
                        </span>
                        <span>{article.readingMinutes} min read</span>
                        <Link href={`/archives/${article.slug}`}>
                          <a className="text-link">
                            {isZh ? "閱讀" : "Read"}
                            <ArrowRight aria-hidden="true" />
                          </a>
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
          {filteredArticles.length === 0 && (
            <div className="empty-state">
              <p className="terminal-label">0 results</p>
              <h2>{isZh ? "沒有符合的文章" : "No matching notes"}</h2>
              <button
                type="button"
                className="text-link"
                onClick={() => {
                  setQuery("");
                  setCategory("all");
                }}
              >
                {isZh ? "清除篩選" : "Clear filters"}
              </button>
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
