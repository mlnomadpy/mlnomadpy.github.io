import { publishedPosts } from "../../lib/posts";
import { postPath } from "../../lib/publication.mjs";
export async function GET() {
  const posts = await publishedPosts();
  return new Response(
    JSON.stringify(
      posts.map((p) => ({
        title: p.data.title,
        description: p.data.description,
        url: postPath(p.id),
      })),
    ),
    { headers: { "Content-Type": "application/json; charset=utf-8" } },
  );
}
