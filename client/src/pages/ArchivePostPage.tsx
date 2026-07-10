import { useEffect } from "react";
import { ArrowLeft, ArrowUpRight, Clock3 } from "lucide-react";
import { Streamdown } from "streamdown";
import { Link, useLocation } from "wouter";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { useLanguage } from "@/context/LanguageContext";
import { articles } from "@/data/articles.generated";

const legacySlugs: Record<string, string> = {
  "01-18": "fhctf-writeup",
  "2025-eis": "eis-formulas",
  "2025-quantum-terms": "quantum-glossary",
};

export default function ArchivePostPage() {
  const { language } = useLanguage();
  const isZh = language === "zh";
  const [location] = useLocation();
  const requestedSlug = location.split("/").filter(Boolean).at(-1) ?? "";
  const slug = legacySlugs[requestedSlug] ?? requestedSlug;
  const article = articles.find((item) => item.slug === slug);

  useEffect(() => {
    if (!article) return;
    const previousTitle = document.title;
    document.title = `${article.title} — SIRIUS`;
    return () => { document.title = previousTitle; };
  }, [article]);

  if (!article) {
    return (
      <div className="site-page">
        <SiteHeader active="writing" />
        <main id="main-content" className="section-shell page-main empty-state">
          <p className="terminal-label">404 / note not found</p>
          <h1>{isZh ? "找不到這篇文章" : "This note does not exist"}</h1>
          <Link href="/archives"><a className="button-link">{isZh ? "返回文章列表" : "Back to writing"}</a></Link>
        </main>
      </div>
    );
  }

  return (
    <div className="site-page">
      <SiteHeader active="writing" />
      <main id="main-content" className="article-shell">
        <Link href="/archives"><a className="article-back"><ArrowLeft aria-hidden="true" />{isZh ? "全部文章" : "All writing"}</a></Link>
        <header className="article-header">
          <div className="article-header__meta">
            <span>{article.category.replace("-", " ")}</span>
            <time dateTime={article.updatedAt}>{article.updatedAt}</time>
            <span><Clock3 aria-hidden="true" />{article.readingMinutes} min</span>
          </div>
          <h1>{article.title}</h1>
          <p>{article.summary}</p>
          {article.sourceUrl && (
            <a className="text-link" href={article.sourceUrl} target="_blank" rel="noreferrer">
              {isZh ? "查看 HackMD 原文" : "View original on HackMD"}<ArrowUpRight aria-hidden="true" />
            </a>
          )}
        </header>

        <article className="article-body">
          <Streamdown>{article.content}</Streamdown>
        </article>

        <nav className="article-end" aria-label={isZh ? "文章結尾導覽" : "End of article navigation"}>
          <span className="terminal-label">// eof</span>
          <Link href="/archives"><a className="button-link">{isZh ? "回到文章列表" : "Back to writing"}<ArrowLeft aria-hidden="true" /></a></Link>
        </nav>
      </main>
      <SiteFooter />
    </div>
  );
}
