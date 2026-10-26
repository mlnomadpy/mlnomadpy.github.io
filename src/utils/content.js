export const talkSlug = (title) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
export const plainText = (html) =>
  (html || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
export const isArabic = (text) => /[\u0600-\u06ff]/.test(text || "");
export const poemLanguage = (poem, text) =>
  isArabic(text) ? "ar" : poem.language.includes("Darija") ? "ary-Latn" : "en";
export const gistUrl = (html) =>
  (html?.match(/src=['"]([^'"]+)['"]/)?.[1] || "").replace(/\.js$/, "");
export const recordingSrcset = (image) =>
  image?.endsWith("-960.webp")
    ? `${image.replace("-960.webp", "-480.webp")} 480w, ${image} 960w`
    : undefined;

// Keep the archive easy to scan; the complete description stays on the talk page.
export const talkExcerpt = (html) => {
  const words = plainText(html).split(/\s+/);
  return words.length > 32
    ? words
        .slice(0, 32)
        .join(" ")
        .replace(/[,:;]$/, "") + "…"
    : words.join(" ");
};
