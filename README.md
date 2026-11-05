# Taha Bouhsine’s personal site

Research, poems, talks, music, and a little about the person behind them.

The portfolio uses Vue 3 and Vite SSG; the writing workspace uses Astro and MDX. One build assembles both into static HTML in `dist/`, with shared navigation, styles, and author identity. Writing contains separate Blog (`/blog/`) and Writeups (`/blog/writeups/`) sections; the 24 reviewed writeups are approved for publication, while technical blog drafts remain unpublished.

## Develop

Use Node 24 (`nvm use` reads `.nvmrc`). The patched Astro renderer requires a newer runtime than the old portfolio did.

```sh
npm ci
npm run dev
```

## Verify and preview

```sh
npm run build
npm run check
npm run serve
```

`check` verifies generated pages, internal links, asset references, metadata, complete poem text, discoverable lazy-loaded recording players, and every page’s JSON-LD. Schema checks use a reviewed subset of the official Schema.org vocabulary and check the rendered content as well as the graph. They also run in the existing deploy workflow. See [structured-data validation](docs/structured-data-validation.md) for coverage and external test results.

SEO checks also verify unique search metadata, social previews, image and font assets, fragment links, sitemap coverage, and discovery within three clicks. Run `npm run check:seo` against an existing build. See the [SEO audit](docs/seo-audit.md) for the Search Console baseline, fixes, and production follow-up.

The [November performance and blog migration audit](docs/performance-and-blog-migration-audit.md) records live measurements and a selective migration plan. `python3 scripts/review-blog.py ../blog-review-source` (requires PyYAML) generates an unpublished editorial review in ignored `.blog-review/`. No old post is approved for migration by default; the review is outside the site's build inputs.

Before shipping, also inspect desktop and mobile layouts, keyboard navigation, search, browser Back, and the CV print layout.

## Edit content

- `src/data/poetry.json`: poems. Preserve the original wording, line breaks, dates, and language labels.
- `src/data/talk-art.json`: local thumbnail paths for the recording library; artwork is in `public/talk-art/`.
- `src/utils/searchMeta.js`: concise search titles and complete snippet excerpts; original session names and URLs stay in `talks.json`.
- `src/data/talks.json`: talk descriptions and resource links. Existing title-derived URLs are preserved; changing a title also changes its URL, so add a redirect when renaming.
- `src/data/video-metadata.json`: verified recording upload timestamps and durations, with YouTube source URLs and verification dates. When adding a recording, check its original upload metadata rather than guessing from the talk date.
- `src/data/publications.json`: papers shown on Research.
- `src/data/about-me-data.js`: CV experience, education, and credentials.
- `src/data/reading.js`: only approved, migrated blog articles; currently empty.
- `src/views/AboutMeView.vue`: personal introduction. Use real details rather than inventing biographical scenes.
- `src/assets/site.css`: layout, typography, and visual styles.
- `src/assets/fonts.css`: self-hosted Arabic and Tifinagh fonts with `font-display: swap`; original font licenses are in `public/fonts/`.
- `src/utils/structuredData.js`: shared page-specific JSON-LD builders. Keep entities consistent with the visible content; run `npm run build && npm run check` after changes.

Recording pages include native lazy-loaded YouTube privacy-enhanced players so crawlers can discover the video without clicking. They do not autoplay; a visit to a recording page can contact YouTube. Spotify loads after a visitor requests its player. The homepage film and its poster are served locally. The poster has a high-priority preload; automatic playback waits for the first paint, respects reduced motion and data saving, and pauses offscreen or in a hidden tab. A visitor can play it manually; manual pause persists across navigation. The original source video is retained in `src/assets/background-video.mp4`, and the smaller delivery copy is in `public/background-video.mp4`. The portrait appears on About. Navigation within the portfolio uses Vue; links to the static writing section use normal document navigation with the same visual shell.

## Deploy

The existing GitHub Actions workflow builds both workspaces, validates the combined artifact, and publishes pushes to `master`. The custom domain is configured in `CNAME`. Run build and content checks before pushing. The site has not been deployed by making local changes.

`public/sitemap-index.xml` also references standalone projects on the same domain; preserve those entries when changing the portfolio sitemap.

`scripts/generate-sitemap.mjs` derives `dist/sitemap.xml` from the generated HTML canonicals, excluding errors and deduplicating aliases. It deliberately omits `lastmod` until trustworthy per-page modification dates are available.

## Curated writing integration

`npm run dev` runs Astro on port 4321 and proxies `/blog/` through Vite. `npm run build` builds both workspaces, assembles the writing into `dist/blog/`, and regenerates the canonical sitemap. `npm run serve` previews the complete artifact.

See [writing publication rules](writing/README.md) before importing any article. `writing/approved-posts.json` records the owner’s November 5, 2026 approval of all 24 reviewed writeups, with their original publication dates. Old `draft: false` flags and `SHOW_DRAFTS` do not approve publication. The portfolio now owns the complete `/blog/` output. See [the publication record](docs/writeups-publication.md) for cutover and rollback details.

See the [implementation and validation record](docs/blog-integration.md) for the performance changes, schema checks and publication safeguards.
