import MarkdownIt from "markdown-it";
import katex from "markdown-it-katex";
import matter from "gray-matter";
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
});
md.use(katex);
async function getAllBlogs() {
  const modules = /* @__PURE__ */ Object.assign({ "/src/data/blogs/guess.md": () => import("./guess-DVXvOeJR.js").then((m) => m["default"]) });
  const blogs = [];
  for (const path in modules) {
    try {
      const content = await modules[path]();
      const { data, content: markdownContent } = matter(content);
      const id = path.split("/").pop().replace(".md", "");
      const excerpt = data.excerpt || markdownContent.replace(/[#*`]/g, "").split("\n").filter((line) => line.trim().length > 0).slice(0, 3).join(" ").slice(0, 200) + "...";
      blogs.push({
        id,
        title: data.title || id.replace(/-/g, " "),
        // Fallback title
        date: data.date || "Recent",
        tags: data.tags || [],
        ...data,
        excerpt
      });
    } catch (e) {
      console.error(`Error loading blog at ${path}:`, e);
    }
  }
  return blogs.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    if (isNaN(dateA) || isNaN(dateB)) return 0;
    return dateB - dateA;
  });
}
async function getBlogById(id) {
  try {
    const modules = /* @__PURE__ */ Object.assign({ "/src/data/blogs/guess.md": () => import("./guess-DVXvOeJR.js").then((m) => m["default"]) });
    const path = `/src/data/blogs/${id}.md`;
    if (!modules[path]) {
      console.error(`Blog not found: ${path}`);
      return null;
    }
    const content = await modules[path]();
    const { data, content: markdownContent } = matter(content);
    const html = md.render(markdownContent);
    return {
      id,
      title: data.title || id.replace(/-/g, " "),
      date: data.date || "Recent",
      tags: data.tags || [],
      ...data,
      html
    };
  } catch (e) {
    console.error(`Error loading blog ${id}:`, e);
    return null;
  }
}
export {
  getBlogById as a,
  getAllBlogs as g
};
