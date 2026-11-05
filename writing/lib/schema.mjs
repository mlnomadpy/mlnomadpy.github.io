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
const writeupsId = canonicalUrl("/blog/writeups") + "#webpage";
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
    mainEntityOfPage: url,
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
  const works = posts
    .filter((p) => postSection(p) === section)
    .map(articleEntity);
  const collection =
    section === "blog"
      ? {
          "@type": "Blog",
          "@id": blogId,
          name: "Blog",
          url: canonicalUrl(info.path),
          author: ref(PERSON_ID),
          publisher: ref(PERSON_ID),
          ...(works.length
            ? { blogPost: works.map((work) => ref(work["@id"])) }
            : {}),
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
  const list = itemList(canonicalUrl(info.path) + "#posts", info.title, works);
  return buildPageGraph({
    path: info.path,
    title: info.title,
    description: info.description,
    pageType: "CollectionPage",
    mainEntity: ref(section === "blog" ? blogId : list["@id"]),
    hasPart: works.map((work) => ref(work["@id"])),
    entities: [...(section === "blog" ? [collection] : []), list, ...works],
  });
}
