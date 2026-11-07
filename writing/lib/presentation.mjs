export function formatDate(value, options = {}) {
  return new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
    ...options,
  });
}

export function newestFirst(posts) {
  return [...posts].sort(
    (a, b) =>
      Date.parse(b.data.pubDate) - Date.parse(a.data.pubDate) ||
      a.id.localeCompare(b.id, "en"),
  );
}
