export const writingSections = {
  blog: {
    title: "Blog",
    path: "/blog/",
    intro: "Questions, worked through.",
    description:
      "Research notes and technical articles by Taha Bouhsine on neural networks, mathematics, and learning.",
    emptyTitle: "A fresh page.",
    emptyText: "New research notes will find their way here.",
  },
  writeups: {
    title: "Writeups",
    path: "/blog/writeups/",
    intro: "A life, written along the way.",
    description:
      "Personal essays and reflections by Taha Bouhsine on language, identity, belonging, and life along the way.",
    emptyTitle: "Room for a thought.",
    emptyText: "Personal essays will find their way here.",
  },
};
export const postSection = (post) =>
  post.id.startsWith("writeups/") ? "writeups" : "blog";
