import { writingSections } from "./sections.mjs";
import { publishedPosts } from "./posts";
import { SITE_ORIGIN, canonicalUrl } from "../../src/utils/structuredData.js";
import { postPath } from "./publication.mjs";
const escape = (s: string) =>
  s.replace(
    /[<>&"']/g,
    (c) =>
      ({
        "<": "&lt;",
        ">": "&gt;",
        "&": "&amp;",
        '"': "&quot;",
        "'": "&apos;",
      })[c]!,
  );
export async function sectionFeed(section: "blog" | "writeups") {
  const info = writingSections[section];
  const posts = (await publishedPosts(section)).sort(
    (a, b) => Date.parse(b.data.pubDate) - Date.parse(a.data.pubDate),
  );
  return new Response(
    '<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0"><channel><title>' +
      info.title +
      " by Taha Bouhsine</title><link>" +
      SITE_ORIGIN +
      info.path +
      "</link><description>" +
      escape(info.description) +
      "</description>" +
      posts
        .map((p) => {
          const url = canonicalUrl(postPath(p.id));
          // Keep existing subscriber IDs stable when the essay URL moves.
          const guid =
            section === "writeups"
              ? SITE_ORIGIN + "/blog" + postPath(p.id)
              : url;
          return `<item><title>${escape(p.data.title)}</title><link>${url}</link><guid isPermaLink="true">${guid}</guid><description>${escape(p.data.description)}</description><pubDate>${new Date(p.data.pubDate).toUTCString()}</pubDate></item>`;
        })
        .join("") +
      "</channel></rss>",
    { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } },
  );
}
