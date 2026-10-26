import { plainText, talkSlug, talkExcerpt } from "./content.js";

export const SITE_ORIGIN = "https://www.tahabouhsine.com";
export const PERSON_ID = `${SITE_ORIGIN}/#person`;
export const WEBSITE_ID = `${SITE_ORIGIN}/#website`;
export const ref = (id) => ({ "@id": id });
export const absoluteUrl = (path) => new URL(path, `${SITE_ORIGIN}/`).href;
export function canonicalUrl(path = "/") {
  const pathname = path.split(/[?#]/)[0] || "/";
  return SITE_ORIGIN + (pathname === "/" ? "/" : pathname.replace(/\/+$/, ""));
}
export function serializeStructuredData(graph) {
  // JSON-LD is raw script text, not HTML: never allow a closing script tag.
  return JSON.stringify(graph)
    .replace(/</g, "\\u003c")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}
export function buildPageGraph({
  path,
  title,
  description,
  pageType = "WebPage",
  mainEntity,
  entities = [],
  breadcrumbs,
  inLanguage = "en",
  ...pageProperties
}) {
  const url = canonicalUrl(path);
  const page = {
    "@type": pageType,
    "@id": `${url}#webpage`,
    url,
    name: title,
    description,
    isPartOf: ref(WEBSITE_ID),
    author: ref(PERSON_ID),
    inLanguage,
    ...(mainEntity ? { mainEntity } : {}),
    ...pageProperties,
  };
  const graph = [
    {
      "@type": "Person",
      "@id": PERSON_ID,
      name: "Taha Bouhsine",
      alternateName: "MLNomadpy",
      url: `${SITE_ORIGIN}/aboutme`,
      image: `${SITE_ORIGIN}/portrait.webp`,
      email: "contact@tahabouhsine.com",
      sameAs: [
        "https://github.com/mlnomadpy",
        "https://linkedin.com/in/Tahabsn",
        "https://scholar.google.com/citations?user=IsBjb3EAAAAJ",
      ],
    },
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      url: `${SITE_ORIGIN}/`,
      name: "Taha Bouhsine",
      alternateName: "MLNomadpy",
      publisher: ref(PERSON_ID),
    },
    page,
    ...entities,
  ];
  if (url !== `${SITE_ORIGIN}/`) {
    const trail = [
      { name: "Taha Bouhsine", url: `${SITE_ORIGIN}/` },
      ...(breadcrumbs || [{ name: title, url }]),
    ];
    const id = `${url}#breadcrumbs`;
    graph.push({
      "@type": "BreadcrumbList",
      "@id": id,
      itemListElement: trail.map((entry, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: entry.name,
        item: entry.url,
      })),
    });
    page.breadcrumb = ref(id);
  }
  return { "@context": "https://schema.org", "@graph": graph };
}
export function itemList(id, name, items) {
  return {
    "@type": "ItemList",
    "@id": id,
    name,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: ref(item["@id"]),
    })),
  };
}
export function poemWork(poem, { fullText = false } = {}) {
  const url = canonicalUrl(`/poetry/${poem.id}`);
  return {
    "@type": "CreativeWork",
    "@id": `${url}#poem`,
    url,
    name: poem.title,
    genre: "Poetry",
    author: ref(PERSON_ID),
    inLanguage: poem.language.map(
      (language) =>
        ({ English: "en", Arabic: "ar", Darija: "ary-Latn" })[language] ||
        language,
    ),
    mainEntityOfPage: url,
    ...(fullText
      ? {
          text: poem.content
            .map((line) => (line.type === "divider" ? "" : line.text))
            .join("\n"),
        }
      : {}),
  };
}
export function poemCollection(poems) {
  const works = poems.map((poem) => poemWork(poem));
  const list = itemList(
    `${SITE_ORIGIN}/poetry#poems`,
    "Poems by Taha Bouhsine",
    works,
  );
  return {
    pageType: "CollectionPage",
    inLanguage: ["en", "ar", "ary-Latn"],
    mainEntity: ref(list["@id"]),
    entities: [list, ...works],
  };
}
export function poemDetail(poem) {
  if (!poem) return {};
  const work = poemWork(poem, { fullText: true });
  return {
    inLanguage: [...new Set(["en", ...work.inLanguage])],
    mainEntity: ref(work["@id"]),
    entities: [work],
    breadcrumbs: [
      { name: "Poems", url: `${SITE_ORIGIN}/poetry` },
      { name: poem.title, url: work.url },
    ],
  };
}
export function talkWork(talk, art = {}, { detail = false } = {}) {
  const url = canonicalUrl(`/talks/${talkSlug(talk.title)}`);
  const image = art[talk.title] || talk.thumbnail;
  return {
    "@type": "CreativeWork",
    "@id": `${url}#presentation`,
    url,
    name: talk.title,
    description: detail
      ? plainText(talk.description)
      : talkExcerpt(talk.description),
    genre: "Presentation",
    author: ref(PERSON_ID),
    mainEntityOfPage: url,
    ...(image ? { image: absoluteUrl(image) } : {}),
  };
}
export function talkCollection(talks, art) {
  const works = talks.map((talk) => talkWork(talk, art));
  const list = itemList(
    `${SITE_ORIGIN}/talks#sessions`,
    "Talks and workshops",
    works,
  );
  return {
    pageType: "CollectionPage",
    mainEntity: ref(list["@id"]),
    entities: [list, ...works],
  };
}
export function talkDetail(talk, art, metadata = {}) {
  if (!talk) return {};
  const work = talkWork(talk, art, { detail: true });
  const entities = [work];
  const id = talk.link?.match(
    /^https:\/\/www\.youtube\.com\/embed\/([\w-]+)$/,
  )?.[1];
  const verified = id ? metadata[id] : null;
  if (
    verified?.uploadDate &&
    verified.source === `https://www.youtube.com/watch?v=${id}`
  ) {
    const video = {
      "@type": "VideoObject",
      "@id": `${work.url}#recording`,
      name: talk.title,
      description: plainText(talk.description),
      url: verified.source,
      embedUrl: `https://www.youtube-nocookie.com/embed/${id}`,
      thumbnailUrl: [work.image],
      uploadDate: verified.uploadDate,
      ...(verified.duration ? { duration: verified.duration } : {}),
      mainEntityOfPage: work.url,
    };
    work.video = ref(video["@id"]);
    entities.push(video);
    // The verified timestamp comes from YouTube's publication metadata, not the talk date.
  }
  if (talk.slides) {
    const slides = {
      "@type": "PresentationDigitalDocument",
      "@id": `${work.url}#slides`,
      url: talk.slides,
      name: `Slides: ${talk.title}`,
      author: ref(PERSON_ID),
    };
    work.hasPart = ref(slides["@id"]);
    entities.push(slides);
  }
  return {
    mainEntity: ref(work["@id"]),
    entities,
    breadcrumbs: [
      { name: "Talks & workshops", url: `${SITE_ORIGIN}/talks` },
      { name: talk.title, url: work.url },
    ],
  };
}
export function researchCollection(publications, reading) {
  const papers = publications.map((paper) => ({
    "@type": "ScholarlyArticle",
    "@id": paper.link,
    url: paper.link,
    name: paper.title,
    headline: paper.title,
    author: ref(PERSON_ID),
    isPartOf: { "@type": "CreativeWork", name: paper.publisher },
  }));
  const list = itemList(
    `${SITE_ORIGIN}/research#papers`,
    "Research papers",
    papers,
  );
  const notes = reading.map((post) => ({
    "@type": "CreativeWork",
    "@id": post.url,
    url: post.url,
    name: post.title,
    description: post.note,
    author: ref(PERSON_ID),
  }));
  return {
    pageType: "CollectionPage",
    mainEntity: ref(list["@id"]),
    citation: papers.map((paper) => ref(paper["@id"])),
    mentions: notes.map((note) => ref(note["@id"])),
    entities: [list, ...papers, ...notes],
  };
}
export function playlistSchema(tracks, playlistUrl) {
  const id = `${SITE_ORIGIN}/music#playlist`;
  const recordings = tracks.map((track) => ({
    "@type": "MusicRecording",
    "@id": `${SITE_ORIGIN}/music#track-${talkSlug(track.title)}`,
    name: track.title,
    description: track.artist,
    isPartOf: ref(id),
  }));
  const playlist = {
    "@type": "MusicPlaylist",
    "@id": id,
    name: "git Motivated",
    url: playlistUrl,
    creator: ref(PERSON_ID),
    track: recordings.map((track) => ref(track["@id"])),
  };
  // The six visible selections are not the total track count. Taha curates the playlist, not the recordings.
  return {
    pageType: "CollectionPage",
    mainEntity: ref(id),
    entities: [playlist, ...recordings],
  };
}
