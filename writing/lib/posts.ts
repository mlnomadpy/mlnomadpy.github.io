import { getCollection } from "astro:content";
import approvals from "../approved-posts.json";
// An empty publication list is intentional, in development as well as production.
export async function publishedPosts(section?: "blog" | "writeups") {
  const posts = approvals.posts.length ? await getCollection("posts") : [];
  return section
    ? posts.filter((post) => post.id.startsWith(section + "/"))
    : posts;
}
