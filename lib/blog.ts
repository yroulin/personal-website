import { createReader } from "@keystatic/core/reader";
import config from "@/keystatic.config";
import { publishedPosts } from "./blog-policy";

const reader = createReader(process.cwd(), config);

export async function getPosts() {
  return publishedPosts(await reader.collections.posts.all());
}

export async function getPost(slug: string) {
  return (await getPosts()).find((post) => post.slug === slug) ?? null;
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    day: "numeric", month: "long", year: "numeric", timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}
