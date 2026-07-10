import { Github, Instagram } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div>
        <p className="terminal-label">// end of file</p>
        <p>© {new Date().getFullYear()} SIRIUS</p>
      </div>
      <div className="site-footer__links">
        <a href="https://github.com/SiriusW823" target="_blank" rel="noreferrer">
          <Github aria-hidden="true" /> GitHub
        </a>
        <a href="https://www.instagram.com/s1rius_w" target="_blank" rel="noreferrer">
          <Instagram aria-hidden="true" /> Instagram
        </a>
      </div>
    </footer>
  );
}
