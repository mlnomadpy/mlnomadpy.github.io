import { readFileSync, existsSync, realpathSync } from "node:fs";
import { createHash } from "node:crypto";
import { resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

export const writingRoot = fileURLToPath(new URL("../", import.meta.url));
export const postPath = (id) => "/" + id + "/";

export function approvedPosts(root = writingRoot) {
  const manifest = JSON.parse(
    readFileSync(resolve(root, "approved-posts.json"), "utf8"),
  );
  if (manifest.version !== 1 || !Array.isArray(manifest.posts))
    throw new Error("Invalid publication manifest");
  const ids = new Set();
  return manifest.posts.map((entry) => {
    if (
      !/^(blog|writeups)\/[a-z0-9]+(?:-[a-z0-9]+)*$/.test(entry.id) ||
      entry.id === "blog/writeups" ||
      ids.has(entry.id)
    )
      throw new Error("Invalid or duplicate approved post ID: " + entry.id);
    ids.add(entry.id);
    if (
      entry.approvedBy !== "Taha Bouhsine" ||
      !/^\d{4}-\d{2}-\d{2}$/.test(entry.approvedOn || "") ||
      !/^[a-f0-9]{40}$/.test(entry.sourceRevision || "") ||
      !/^[a-f0-9]{64}$/.test(entry.contentSha256 || "")
    )
      throw new Error(
        "Missing explicit owner approval and source evidence: " + entry.id,
      );
    const contentRoot = resolve(root, "content");
    const path = resolve(contentRoot, entry.id + ".mdx");
    if (
      !existsSync(path) ||
      !realpathSync(path).startsWith(realpathSync(contentRoot) + sep)
    )
      throw new Error(
        "Approved content missing or outside content directory: " + entry.id,
      );
    const body = readFileSync(path);
    if (createHash("sha256").update(body).digest("hex") !== entry.contentSha256)
      throw new Error("Content changed since approval: " + entry.id);
    return { ...entry, path, url: postPath(entry.id) };
  });
}

export function writeupRedirects(posts = approvedPosts()) {
  const destinations = [
    "/writeups/",
    ...posts.filter((p) => p.id.startsWith("writeups/")).map((p) => p.url),
  ];
  return Object.fromEntries(
    destinations.map((path) => ["/blog" + path.slice(0, -1), path]),
  );
}
