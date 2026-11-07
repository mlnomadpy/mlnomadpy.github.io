import {
  SITE_ORIGIN,
  PERSON_ID,
  WEBSITE_ID,
  ref,
  canonicalUrl,
  itemList,
  buildPageGraph,
} from "../../src/utils/structuredData.js";
import { postPath } from "./publication.mjs";
import { writingSections, postSection } from "./sections.mjs";

const blogId = canonicalUrl("/blog") + "#blog";
const writeupsId = canonicalUrl(writingSections.writeups.path) + "#webpage";
export function articleEntity(post) {
  const url = canonicalUrl(postPath(post.id));
  const personal = postSection(post) === "writeups";
  return {
    "@type": personal ? (post.data.schemaType ?? "Article") : "BlogPosting",
    "@id": url + "#article",
    url,
    name: post.data.title,
    headline: post.data.title,
    description: post.data.description,
    author: ref(PERSON_ID),
    publisher: ref(PERSON_ID),
    isPartOf: ref(personal ? writeupsId : blogId),
    mainEntityOfPage: ref(url + "#webpage"),
    inLanguage: "en",
    datePublished: post.data.pubDate,
    ...(post.data.genre ? { genre: post.data.genre } : {}),
    ...(post.data.updatedDate ? { dateModified: post.data.updatedDate } : {}),
    ...(post.data.image ? { image: SITE_ORIGIN + post.data.image } : {}),
  };
}
export function writingGraph(posts, post, section = "blog") {
  if (post) section = postSection(post);
  const info = writingSections[section];
  const collection =
    section === "blog"
      ? {
          "@type": "Blog",
          "@id": blogId,
          name: "Blog",
          url: canonicalUrl(info.path),
          author: ref(PERSON_ID),
          publisher: ref(PERSON_ID),
          isPartOf: ref(WEBSITE_ID),
        }
      : {
          "@type": "CollectionPage",
          "@id": writeupsId,
          name: "Writeups",
          url: canonicalUrl(info.path),
          author: ref(PERSON_ID),
          isPartOf: ref(WEBSITE_ID),
        };
  if (post) {
    const work = articleEntity(post);
    return buildPageGraph({
      path: postPath(post.id),
      title: post.data.title,
      description: post.data.description,
      mainEntity: ref(work["@id"]),
      entities: [collection, work],
      breadcrumbs: [
        { name: info.title, url: canonicalUrl(info.path) },
        { name: post.data.title, url: work.url },
      ],
    });
  }
  const entries = posts
    .filter((entry) => postSection(entry) === section)
    .map((entry) => {
      const url = canonicalUrl(postPath(entry.id));
      return {
        "@type": "WebPage",
        "@id": url + "#webpage",
        name: entry.data.title,
        url,
      };
    });
  const list = itemList(
    canonicalUrl(info.path) + "#posts",
    info.title,
    entries,
  );
  return buildPageGraph({
    path: info.path,
    title: info.title,
    description: info.description,
    pageType: "CollectionPage",
    mainEntity: ref(list["@id"]),
    ...(section === "blog" ? { about: ref(blogId) } : {}),
    hasPart: entries.map((entry) => ref(entry["@id"])),
    entities: [...(section === "blog" ? [collection] : []), list, ...entries],
  });
}
