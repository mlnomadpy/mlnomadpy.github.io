# Portfolio performance fixes and curated writing foundation

Historical implementation record from November 1, 2026; the later [writeup publication](writeups-publication.md) supersedes the empty-manifest and cutover status below.

Implemented locally on November 1, 2026. The source blog and its live Pages deployment remain unchanged; this integration has not been committed, pushed, or deployed.

## Performance changes

- Talk thumbnails now declare their actual 82/105/100/132px layout slots. New 320px WebP files total **279,272 bytes**, compared with **1,122,554 bytes** for the 960px set: a **75.1% reduction** for the full set. Desktop (132px slot, DPR 2) and mobile (105px slot) browser checks select the 320px candidate. Larger sources remain available where warranted.
- The original background film is retained. Its poster gets a high-priority, homepage-only preload. Automatic video playback waits for page load and paint, honors reduced motion and data saving, and pauses outside the hero or in a hidden tab. Manual pause survives navigation; manual play remains available. Browser checks verified autoplay, offscreen pause/resume, and pause persistence.
- The new writing index uses Georgia and the portfolio's system UI stack. It loads **no runtime JavaScript and no Latin web fonts**, eliminating the old blog heading's late Inter/Lora font swap from this implementation. Math CSS/fonts are restricted to articles that need them. The original blog's stylesheet and analytics were not imported.
- Updated the static build tools and head manager to patched releases. Node 24 is documented and configured for CI; `.nvmrc` selects it locally. After the update, `npm audit` reported **zero vulnerabilities**. The head-manager migration uses `innerHTML` for safely serialized JSON-LD and preserves the neutral error-page marker.

The public site's previous Lighthouse measurements are a baseline, not post-deployment scores for these local changes. GitHub Pages still controls the ten-minute cache response headers; changing those would require a hosting/CDN change. The existing native YouTube embeds are preserved for video discovery, with their existing third-party cost.

## Integrated writing foundation

- Astro workspace in this repository; one root build assembles its static output into `dist/blog/` after the Vue portfolio build.
- Same CSS, navigation data, footer, colors, author identity, and www canonical origin. The index is a quiet empty notebook rather than a list of legacy material. Links between writing and the portfolio remain on the same local site.
- Ready article renderer for approved MDX, code, math, and subsequently reviewed Astro visualization components. No old article bodies, writeups, experiment datasets, or visualization collections were copied.
- Shared Person/WebSite graph plus CollectionPage, Blog, ItemList and breadcrumbs on the index. Future approved articles receive BlogPosting metadata matching visible headline, author and dates. The empty index emits no fictional BlogPosting.
- RSS, metadata-only search JSON, main canonical sitemap, and compatibility `/blog/sitemap-0.xml` are generated from the same approved collection.

## Publication boundary

`writing/approved-posts.json` contains **zero entries**. Explicit owner approval, original source revision and an exact content SHA-256 are required before a post can enter the content loader. Neither old `draft: false` flags nor `SHOW_DRAFTS=true` bypass it. The original two featured legacy links were removed from Home/Research; no unapproved article remains promoted there or in their schema.

An isolated integration test builds synthetic approved and unapproved MDX. The unapproved piece includes both a private-text sentinel and an invalid component import, proving it is excluded before compilation. The test runs with `SHOW_DRAFTS=true` and checks output files, route exclusion, math rendering, RSS, search and article schema. Fixtures stay in a temporary directory and are removed.

The artifact checker verifies the exact approved article routes, schema URLs, feed items, search entries and sitemap, rejects source MDX and unapproved writing links, and prevents a second public directory from bypassing publication selection. See [publication rules](../writing/README.md) for the future import process.

## Validation

- Combined build and full check suite passed: **46 canonical pages**, 47 generated documents with schema, one excluded 404, 27 recording pages; sitemap exact, all canonical pages reachable within two clicks.
- Schema.org Validator accepted the actual blog graph: **0 errors, 0 warnings**. Local schema validation also covers the BlogPosting renderer and publication dates through synthetic fixtures.
- Desktop and 390px mobile writing layouts checked: no horizontal overflow. Verified shared navigation, correct author/canonical metadata, and one JSON-LD graph after Vue navigation.
- Development and production preview routes checked separately; the production preview serves assembled HTML rather than proxying to the Astro dev server.

Preview: `http://127.0.0.1:4175/blog/`. The existing editorial selector remains at `http://127.0.0.1:4176/` while its server is running. It records decisions only; it cannot publish them.

Production cutover remains separate. Before deploying `/blog/`, coordinate the old blog Pages project, decide retired/merged URL behavior, retain rollback evidence, and validate the live sitemap and canonical URLs. No production settings were changed here.

## Blog and writeups remain distinct

Writing is the shared navigation entry, with Blog (`/blog/`) for technical posts and Writeups (`/blog/writeups/`) for personal essays. Both keep the portfolio style and have independent listings, descriptions and RSS feeds. Technical articles use BlogPosting; personal writeups use Article and their own collection/breadcrumbs. Both indexes remain empty until explicitly approved pieces are selected. Integration tests include one synthetic piece in each section and assert that neither leaks into the other listing or feed.
