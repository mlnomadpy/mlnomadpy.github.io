export const writingSections = {
  blog: {
    title: "Blog",
    path: "/blog/",
    intro: "Questions, worked through.",
    description:
      "Research notes and technical articles by Taha Bouhsine on neural networks, mathematics, and learning.",
    emptyTitle: "These notes are being revised.",
    emptyText: "In the meantime, there are personal essays to read.",
  },
  writeups: {
    title: "Writeups",
    path: "/writeups/",
    intro: "A life, written along the way.",
    description:
      "Personal essays and reflections by Taha Bouhsine on language, identity, belonging, and life along the way.",
    emptyTitle: "Room for a thought.",
    emptyText: "Personal essays will find their way here.",
  },
};
export const postSection = (post) =>
  post.id.startsWith("writeups/") ? "writeups" : "blog";
