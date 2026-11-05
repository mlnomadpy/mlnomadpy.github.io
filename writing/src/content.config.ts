import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import { approvedPosts } from "../lib/publication.mjs";

const approved = approvedPosts();
const posts = defineCollection({
  // Filter the inputs, not merely the routes: unapproved MDX must not compile
  // client components or leak prose into search / feed / build artifacts.
  loader: approved.length
    ? glob({ base: "./content", pattern: approved.map((p) => p.id + ".mdx") })
    : {
        name: "empty-publication-list",
        load: async ({ store }) => {
          store.clear();
        },
      },
  schema: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    pubDate: z
      .string()
      .refine(
        (v) =>
          /^\d{4}-\d{2}-\d{2}(?:T.*)?$/.test(v) && !Number.isNaN(Date.parse(v)),
        "Use an actual ISO publication date",
      ),
    updatedDate: z.string().optional(),
    draft: z.literal(false),
    image: z.string().startsWith("/").optional(),
    imageAlt: z.string().optional(),
    hasMath: z.boolean().default(false),
    schemaType: z.enum(["Article", "CreativeWork"]).default("Article"),
    genre: z.string().optional(),
  }),
});
export const collections = { posts };
