import type { Metadata } from "next";
import Link from "next/link";
import { formatDate, getPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog | Yves Roulin",
  description: "Notes on frontend development, open source, and building for the web.",
};

export default async function BlogPage() {
  const posts = await getPosts();
  return (
    <>
      <header className="blog-intro">
        <p className="hero-eyebrow">Notes & ideas</p>
        <h1>Blog</h1>
        <p>On building for the web, open source, and things worth figuring out.</p>
      </header>
      {posts.length ? (
        <ol className="blog-list">
          {posts.map(({ slug, entry }) => (
            <li key={slug}>
              <Link href={`/blog/${slug}`} className="blog-post-link">
                <time dateTime={entry.date!}>{formatDate(entry.date!)}</time>
                <h2>{entry.title}<span aria-hidden="true"> ↗</span></h2>
                <p>{entry.description}</p>
                {entry.tags.length > 0 && <ul className="blog-tags" aria-label="Topics">{entry.tags.map((tag, index) => <li key={`${tag}-${index}`}>{tag}</li>)}</ul>}
              </Link>
            </li>
          ))}
        </ol>
      ) : (
        <div className="blog-empty"><h2>No articles yet.</h2><p>The first one will appear here when it&apos;s published.</p></div>
      )}
    </>
  );
}
