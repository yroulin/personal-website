import assert from "node:assert/strict";
import test from "node:test";
import { publishedPosts } from "../lib/blog-policy.ts";

test("only explicitly published articles with a valid date are visible", () => {
  const post = (slug, published, date) => ({ slug, entry: { published, date } });
  assert.deepEqual(publishedPosts([
    post("draft", false, "2026-11-07"),
    post("missing-status", undefined, "2026-11-07"),
    post("missing-date", true, null),
    post("invalid-date", true, "2026-02-30"),
    post("older", true, "2026-10-01"),
    post("newer", true, "2026-11-07"),
  ]).map(({ slug }) => slug), ["newer", "older"]);
});

test("an empty collection is supported and sorting does not mutate input", () => {
  assert.deepEqual(publishedPosts([]), []);
  const posts = [
    { slug: "a", entry: { published: true, date: "2026-01-01" } },
    { slug: "b", entry: { published: true, date: "2026-02-01" } },
  ];
  publishedPosts(posts);
  assert.equal(posts[0].slug, "a");
});

test("dates are descriptive, not a scheduling mechanism", () => {
  const posts = [{ slug: "future", entry: { published: true, date: "2099-01-01" } }];
  assert.equal(publishedPosts(posts).length, 1);
});
