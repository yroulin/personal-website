import Link from "next/link";
import { BlogThemeToggle } from "@/components/blog-theme-toggle";
import "./blog.css";

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="blog-shell">
      <a className="blog-skip" href="#blog-main">Skip to content</a>
      <header className="blog-nav">
        <Link href="/" className="blog-home">Yves Roulin<span> / Blog</span></Link>
        <BlogThemeToggle />
      </header>
      <main id="blog-main" tabIndex={-1}>{children}</main>
      <footer className="blog-footer">
        <Link href="/">Back to portfolio</Link>
        <span>Yves Roulin</span>
      </footer>
    </div>
  );
}
