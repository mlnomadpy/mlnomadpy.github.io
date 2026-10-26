import { readFileSync } from "node:fs";
const vocabulary = JSON.parse(
  readFileSync(new URL("../schema-vocabulary.json", import.meta.url), "utf8"),
);
const array = (value) => (Array.isArray(value) ? value : [value]);
const isUrl = (value) => {
  try {
    const u = new URL(value);
    return ["https:", "http:", "mailto:"].includes(u.protocol);
  } catch {
    return false;
  }
};
const subtype = (actual, expected) =>
  actual === expected ||
  (vocabulary.types[actual] || []).some((parent) => subtype(parent, expected));
const validTimestamp = (value) => {
  if (
    typeof value !== "string" ||
    !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:Z|[+-]\d{2}:\d{2})$/.test(value) ||
    Number.isNaN(Date.parse(value))
  )
    return false;
  const [year, month, day] = value.slice(0, 10).split("-").map(Number);
  const probe = new Date(Date.UTC(year, month - 1, day));
  return (
    probe.getUTCFullYear() === year &&
    probe.getUTCMonth() === month - 1 &&
    probe.getUTCDate() === day
  );
};
export function validateGraph(document, { pageUrl } = {}) {
  const errors = [];
  const fail = (message) => errors.push(message);
  if (document["@context"] !== "https://schema.org")
    fail("Use the canonical Schema.org context");
  if (!Array.isArray(document["@graph"]) || !document["@graph"].length)
    return ["Missing non-empty @graph"];
  const nodes = new Map();
  const index = (object) => {
    if (!object || typeof object !== "object") return;
    if (Array.isArray(object)) return object.forEach(index);
    if (object["@id"] && object["@type"]) {
      if (!isUrl(object["@id"]))
        fail(`Relative or invalid @id: ${object["@id"]}`);
      if (nodes.has(object["@id"])) fail(`Duplicate @id: ${object["@id"]}`);
      nodes.set(object["@id"], object);
    }
    Object.values(object).forEach(index);
  };
  index(document["@graph"]);
  const targetTypes = (object) =>
    array(
      (object["@type"] ? object : nodes.get(object["@id"]))?.["@type"] || [],
    );
  const accepts = (value, range) => {
    if (value && typeof value === "object")
      return targetTypes(value).some((type) => subtype(type, range));
    // Google's BreadcrumbList specification explicitly permits an absolute URL as item.
    if (range === "Thing" && typeof value === "string" && isUrl(value))
      return true;
    if (range === "Text") return typeof value === "string";
    if (range === "URL") return typeof value === "string" && isUrl(value);
    if (range === "Integer") return Number.isInteger(value);
    if (range === "Number")
      return typeof value === "number" && Number.isFinite(value);
    if (range === "Boolean") return typeof value === "boolean";
    if (range === "DateTime") return validTimestamp(value);
    if (range === "Duration")
      return (
        typeof value === "string" &&
        /^PT(?=\d)(?:\d+H)?(?:\d+M)?(?:\d+(?:\.\d+)?S)?$/.test(value)
      );
    return false;
  };
  const visit = (object) => {
    if (!object || typeof object !== "object") return;
    if (Array.isArray(object)) return object.forEach(visit);
    if (!object["@type"]) {
      if (
        Object.keys(object).length !== 1 ||
        !object["@id"] ||
        !nodes.has(object["@id"])
      )
        fail(`Unresolved or untyped entity: ${JSON.stringify(object)}`);
      return;
    }
    const types = array(object["@type"]);
    for (const type of types)
      if (!(type in vocabulary.types))
        fail(`Unknown or unreviewed type: ${type}`);
    const label = object["@id"] || object.name || types.join(",");
    for (const [property, value] of Object.entries(object)) {
      if (["@type", "@id"].includes(property)) continue;
      const term = vocabulary.properties[property];
      if (!term) {
        fail(`${label}: unknown or unreviewed property ${property}`);
        continue;
      }
      if (
        !types.some((type) =>
          term.domains.some((domain) => subtype(type, domain)),
        )
      )
        fail(`${label}: ${property} is outside its Schema.org domain`);
      for (const item of array(value))
        if (!term.ranges.some((range) => accepts(item, range)))
          fail(
            `${label}: invalid range/value for ${property}: ${JSON.stringify(item).slice(0, 150)}`,
          );
      visit(value);
    }
    if (types.includes("ProfilePage")) {
      const entity =
        object.mainEntity &&
        (nodes.get(object.mainEntity["@id"]) || object.mainEntity);
      if (
        !entity ||
        !["Person", "Organization"].some((type) =>
          targetTypes(entity).includes(type),
        ) ||
        !(entity.name || entity.alternateName)
      )
        fail(`${label}: ProfilePage needs an identified mainEntity`);
    }
    if (types.includes("VideoObject")) {
      for (const field of ["name", "thumbnailUrl", "uploadDate"])
        if (
          !object[field] ||
          (Array.isArray(object[field]) && !object[field].length)
        )
          fail(`${label}: Google video required property ${field} is missing`);
      if (!object.embedUrl) fail(`${label}: recording needs an embedUrl`);
    }
    if (types.includes("ItemList") || types.includes("BreadcrumbList")) {
      if (!Array.isArray(object.itemListElement))
        fail(`${label}: itemListElement must be an array`);
      else {
        object.itemListElement.forEach((item, index) => {
          if (item["@type"] !== "ListItem" || item.position !== index + 1)
            fail(`${label}: list positions must be consecutive`);
        });
        if (
          types.includes("ItemList") &&
          object.numberOfItems !== object.itemListElement.length
        )
          fail(`${label}: numberOfItems does not match the list`);
        if (
          types.includes("BreadcrumbList") &&
          (object.itemListElement.length < 2 ||
            object.itemListElement.some(
              (item) => !item.name || !isUrl(item.item),
            ))
        )
          fail(`${label}: breadcrumbs need named absolute URLs`);
      }
    }
  };
  document["@graph"].forEach(visit);
  if (pageUrl) {
    const page = nodes.get(pageUrl + "#webpage");
    if (!page || page.url !== pageUrl)
      fail("WebPage identity must match the canonical URL");
    if (page && (!page.isPartOf || !nodes.has(page.isPartOf["@id"])))
      fail("WebPage must reference its WebSite");
  }
  return errors;
}
