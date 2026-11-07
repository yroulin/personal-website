import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Markdoc from "@markdoc/markdoc";
import React from "react";
import { formatDate, getPost, getPosts } from "@/lib/blog";

export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await getPosts();
  // Next.js static export needs one parameter even before the first article.
  // This reserved slug renders the not-found page, never an article.
  return posts.length ? posts.map(({ slug }) => ({ slug })) : [{ slug: "_empty" }];
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost((await params).slug);
  if (!post) notFound();
  return {
    title: `${post.entry.title} | Yves Roulin`,
    description: post.entry.description,
    openGraph: { title: post.entry.title, description: post.entry.description, type: "article", publishedTime: `${post.entry.date}T00:00:00Z`, tags: [...post.entry.tags] },
  };
}

export default async function ArticlePage({ params }: Props) {
  const post = await getPost((await params).slug);
  if (!post) notFound();
  const { entry } = post;
  const { node } = await entry.content();
  const errors = Markdoc.validate(node);
  if (errors.length) throw new Error(`Invalid article content: ${post.slug}`);

  return (
    <article className="blog-article">
      <Link href="/blog" className="blog-back">← All articles</Link>
      <header className="blog-article-header">
        <time dateTime={entry.date!}>{formatDate(entry.date!)}</time>
        <h1>{entry.title}</h1>
        <p className="blog-description">{entry.description}</p>
        {entry.tags.length > 0 && <ul className="blog-tags" aria-label="Topics">{entry.tags.map((tag, index) => <li key={`${tag}-${index}`}>{tag}</li>)}</ul>}
      </header>
      {entry.coverImage && (
        // Local content images are copied directly into the static export.
        // eslint-disable-next-line @next/next/no-img-element
        <img className="blog-cover" src={entry.coverImage} alt={entry.coverImageAlt} />
      )}
      <div className="blog-prose">{Markdoc.renderers.react(Markdoc.transform(node), React)}</div>
      <Link href="/blog" className="blog-back">← All articles</Link>
    </article>
  );
}
