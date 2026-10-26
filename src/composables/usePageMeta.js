import { computed, unref } from "vue";
import { useHead } from "@vueuse/head";
import { useRoute } from "vue-router";
import {
  buildPageGraph,
  serializeStructuredData,
  absoluteUrl,
} from "@/utils/structuredData";
export function usePageMeta(title, description, options = {}) {
  const route = useRoute();
  useHead(
    computed(() => {
      const name = unref(title);
      const text = unref(description);
      const image = absoluteUrl(unref(options.image) || "/social.png");
      const imageAlt =
        unref(options.imageAlt) ||
        "Taha Bouhsine — research, poems, and the long road";
      return {
        title: name,
        script: [
          {
            key: "portfolio-schema",
            id: "portfolio-schema",
            // Own the same head node on errors, replacing any home-page
            // JSON-LD delivered by a static host's SPA fallback document.
            type: unref(options.noindex)
              ? "application/json"
              : "application/ld+json",
            children: unref(options.noindex)
              ? "{}"
              : serializeStructuredData(
                  buildPageGraph({
                    path: route.path,
                    title: name,
                    description: text,
                    ...(unref(options.structuredData) || {}),
                  }),
                ),
          },
        ],
        meta: [
          { name: "description", content: text },
          { property: "og:title", content: name + " | Taha Bouhsine" },
          { property: "og:description", content: text },
          { property: "og:type", content: "website" },
          { property: "og:site_name", content: "Taha Bouhsine" },
          {
            property: "og:image",
            content: image,
          },
          { property: "og:image:alt", content: imageAlt },
          { name: "twitter:card", content: "summary_large_image" },
          { name: "twitter:title", content: name + " | Taha Bouhsine" },
          { name: "twitter:description", content: text },
          {
            name: "twitter:image",
            content: image,
          },
          { name: "twitter:image:alt", content: imageAlt },
          {
            name: "robots",
            content: unref(options.noindex)
              ? "noindex, follow"
              : "index, follow, max-image-preview:large",
          },
        ],
      };
    }),
  );
}
