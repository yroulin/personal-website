type Post = {
  slug: string;
  entry: { published?: boolean; date: string | null };
};

export function publishedPosts<T extends Post>(posts: readonly T[]): T[] {
  return posts.filter(({ entry }) => {
    if (entry.published !== true || !entry.date || !/^\d{4}-\d{2}-\d{2}$/.test(entry.date)) return false;
    const date = new Date(`${entry.date}T00:00:00Z`);
    return Number.isFinite(date.valueOf()) && date.toISOString().slice(0, 10) === entry.date;
  }).sort((a, b) => b.entry.date!.localeCompare(a.entry.date!) || a.slug.localeCompare(b.slug));
}
