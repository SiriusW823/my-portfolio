import { useState } from "react";
import { Link } from "wouter";
import { Menu, X } from "lucide-react";
import LanguageToggle from "./LanguageToggle";
import { useLanguage } from "@/context/LanguageContext";

type ActivePage = "home" | "work" | "writing" | "about";

interface SiteHeaderProps {
  active: ActivePage;
}

export function SiteHeader({ active }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { language } = useLanguage();
  const isZh = language === "zh";
  const navItems: Array<{ key: ActivePage; href: string; label: string }> = [
    { key: "work", href: "/work", label: isZh ? "作品" : "Work" },
    { key: "writing", href: "/archives", label: isZh ? "文章" : "Writing" },
    { key: "about", href: "/about", label: isZh ? "關於" : "About" },
  ];

  return (
    <header className="site-header">
      <a className="skip-link" href="#main-content">
        {isZh ? "跳到主要內容" : "Skip to content"}
      </a>
      <div className="site-header__inner">
        <Link href="/">
          <a className={`site-mark ${active === "home" ? "is-active" : ""}`} aria-label={isZh ? "回到首頁" : "Home"}>
            <span aria-hidden="true">sirius@lab:</span><span className="terminal-accent">~$</span>
          </a>
        </Link>

        <nav className="desktop-nav" aria-label={isZh ? "主要導覽" : "Primary navigation"}>
          {navItems.map((item) => (
            <Link key={item.key} href={item.href}>
              <a className={active === item.key ? "is-active" : ""}>{item.label}</a>
            </Link>
          ))}
          <LanguageToggle />
        </nav>

        <div className="mobile-nav-controls">
          <LanguageToggle />
          <button
            type="button"
            className="icon-button"
            aria-label={menuOpen ? (isZh ? "關閉選單" : "Close menu") : (isZh ? "開啟選單" : "Open menu")}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav id="mobile-navigation" className="mobile-nav" aria-label={isZh ? "行動版導覽" : "Mobile navigation"}>
          {navItems.map((item) => (
            <Link key={item.key} href={item.href}>
              <a className={active === item.key ? "is-active" : ""} onClick={() => setMenuOpen(false)}>
                <span className="terminal-muted">./</span>{item.label.toLowerCase()}
              </a>
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
