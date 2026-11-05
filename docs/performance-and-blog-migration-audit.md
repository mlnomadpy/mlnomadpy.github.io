# Performance and blog migration audit — 2026-11-01

Implementation follow-up: [performance fixes and curated writing foundation](blog-integration.md). The findings below record the pre-implementation baseline.

The portfolio is already fast in the sampled live tests. The worthwhile work is more precise image delivery, a stable blog font/layout system, and a coherent reading experience. A language rewrite is not justified by these measurements. Consolidating the writing into this repository is sensible, with explicit editorial selection before any article import.

This change contains audit documentation and a local review generator only. No portfolio UI, deployed content, publication settings, routes, or deployment workflows were changed. Nothing was committed or pushed during this audit.

## Live measurements

Google PageSpeed Insights / Lighthouse 13.6.0, November 1. Mobile uses its emulated Moto G Power and Slow 4G profile. Each row is one run, not a median or a guarantee for every device. All tested URLs reported **No Data** for real-user field measurements. Lab Total Blocking Time is not an INP measurement, and these runs do not establish a field Core Web Vitals pass.

| Live page | Device | Performance | LCP | TBT | CLS | Accessibility |
| --- | --- | ---: | ---: | ---: | ---: | ---: |
| [Home](https://pagespeed.web.dev/analysis/https-www-tahabouhsine-com/gchopriy8b?form_factor=mobile) | Mobile | 100 | 1.4 s | 0 ms | 0 | 100 |
| [Talks](https://pagespeed.web.dev/analysis/https-www-tahabouhsine-com-talks/2bvn3l2zup?form_factor=mobile) | Mobile | 100 | 0.9 s | 0 ms | 0 | 100 |
| [JAX recording](https://pagespeed.web.dev/analysis/https-www-tahabouhsine-com-talks-menadd-intro-to-jax-flax/777s54a4ln?form_factor=mobile) | Mobile | 100 | 1.5 s | 70 ms | 0 | 100 |
| [Blog index](https://pagespeed.web.dev/analysis/https-www-tahabouhsine-com-blog/mz7ue0dl3e?form_factor=mobile) | Mobile | 95 | 1.7 s | 0 ms | 0.139 | 92 |
| [Finite-kernel article](https://pagespeed.web.dev/analysis/https-www-tahabouhsine-com-blog-what-a-finite-kernel-buys-an-mlp/w5wq46wlbd?form_factor=mobile) | Mobile | 99 | 2.0 s | 0 ms | 0.014 | 95 |
| [Home](https://pagespeed.web.dev/analysis/https-www-tahabouhsine-com/gchopriy8b?form_factor=desktop) | Desktop | 100 | 0.3 s | 0 ms | 0 | 100 |

The five mobile URLs are representative samples; the remaining pages were not individually benchmarked. This is a performance audit and migration assessment, not a new proof audit of every technical article.

Additional evidence: the existing portfolio build checks passed for 45 documents / 44 canonical pages, including content, assets, schema, links, and sitemap. Local build sizes: entry JavaScript 151,353 bytes (56,591 bytes with local gzip), shared CSS 29,045 bytes (6,885 gzip). These gzip figures describe local compression, not observed wire transfer. Other views already split into small route chunks. The largest generated HTML is Talks, 64,660 bytes.

## Prioritized improvements

| Priority | Finding and evidence | Recommended change | Acceptance check |
| --- | --- | --- | --- |
| High | Blog index CLS is 0.139. Lighthouse attributes 0.138 to the title and identifies Inter/Lora font changes. Its head imports Inter, JetBrains Mono, four Lora styles, and KaTeX on every page. | Share the portfolio shell and typography; reserve heading geometry or use matched fallback font metrics. Load code/math fonts and CSS only where used. If retaining Lora, preload only the face needed above the fold and retest. | Repeated cold mobile loads keep CLS below 0.1, ideally below 0.05, with readable fallback text. |
| Medium | Talk `sizes` says 100vw / 50vw / 33vw, but the CSS thumbnail columns are 82 / 105 / 100 / 132px at the corresponding breakpoints. A live 1280px, DPR 2 browser chose 960px artwork for a 132px slot. Lighthouse flagged about 1,053 KiB of possible image savings. | Match `sizes` to those actual slots and add a smaller 264–320px image candidate. Preserve larger images for recording/social use. The existing 480px set is already substantially smaller than the 960px set. | Inspect `currentSrc` on cold loads at each breakpoint and DPR; compare actual transferred bytes, sharpness, and LCP. Lighthouse's savings estimate is not a promised byte reduction. |
| Medium | Blog accessibility scores are 92 / 95. Lighthouse flags contrast and color-only links on the index, plus heading sequence on the article. | Bring links, muted text, and heading structure into the shared visual system. Keep a comfortable reading width and visible focus indicators. | Keyboard and manual contrast checks, plus repeated automated checks on both themes if both are retained. |
| Medium | The representative article has estimated unused JS of 62 KiB and render-blocking savings of 440ms. The repository has 244 visualization components; the inventoried posts directly import 209 distinct ones. Several existing helpers already defer data and stop detached animations. | Preserve that lazy lifecycle behavior. Import visualization code/data only on the relevant article, start expensive computation near visibility or on interaction, and stop it when hidden. Do not attach all visualizations to a shared application bundle. | Test article load before scrolling, play/pause, multiple visible panels, reduced motion, navigation teardown, and mobile interaction traces. Initial-load TBT alone does not measure live training cost. |
| Low | The film is the largest homepage asset: 2,009,854 bytes, H.264 1280×720, approximately 15.7 seconds. It already uses a small WebP poster, no preload, and a reduced-motion check. Lighthouse's homepage LCP discovery finding concerns the poster. Source has no offscreen/hidden-tab pause handler. | Keep the film and its feeling. Give the poster an early, route-specific high-priority preload; consider pausing the video while the hero is offscreen or the tab is hidden, while preserving manual pause state. A smaller video alternative is optional and needs visual comparison. | Film still starts and resumes correctly; manual pause and reduced motion win; no unnecessary playback offscreen. Measure bytes separately from LCP. |
| Low / hosting | Public HEAD requests for the film, entry JS, and blog HTML return `Cache-Control: max-age=600`. Lighthouse flags cache lifetimes. | Treat this as a hosting/CDN decision if return-visit transfer becomes material. Use long immutable caching for fingerprinted assets on a host that supports it; keep HTML revalidation appropriate. A Netlify-style `_headers` file is not a GitHub Pages solution. | Verify actual response headers and repeat-visit transfers after any hosting change. Do not add cache-busting URLs to the film. |
| Low / deliberate tradeoff | The native recording player contributes estimated unused JS of 530 KiB and two long tasks, while this run still scores 100 with 70ms TBT. | Retain the current discoverable lazy-loaded player unless video discovery priorities change. Removing the iframe behind a click would reverse a deliberate indexing improvement from the previous audit. | Keep visible player HTML aligned with VideoObject and verify live Google video detection after any player change. |

## Why the blog transition feels disconnected

The portfolio uses Vue / Vite SSG with a compact personal navigation and the existing warm, dark styling. The blog is a separate Astro application: a different brand heading, nine navigation destinations, three Latin font families, light/dark behavior, a separate About page, and its own client navigation and deployment. A normal link crosses between applications. Moving folders into one repository by itself would not fix those differences.

The blog also sets its site origin to `https://tahabouhsine.com`, while the portfolio uses `https://www.tahabouhsine.com`. Its canonical and article entities derive from that setting. Consolidation should use the verified www origin consistently.

Recommended destination: **one repository, shared shell, one canonical origin, one coordinated deployment, with selected writing under `/blog/`**. Keep the current portfolio's visual character and original video. Give writing a focused article layout rather than carrying over the old blog's entire navigation.

Reuse Astro's MDX/math/visualization support. Astro can render Vue components through its official integration, allowing existing interactive pieces to survive while the shared layout is introduced. A single Astro site is a reasonable eventual home; a staged build of the existing Vue portfolio plus a curated Astro writing package is a lower-risk intermediate step. Choose the implementation after the first approved articles establish which components are actually needed. There is no need to port 244 Astro visualizations into Vue or Rust to achieve a coherent experience.

## Editorial inventory and review

Source: `mlnomadpy/blog` revision `91097822996155d168932edef65c6a89836b5369`. A separate sparse checkout is at `../blog-review-source`, outside the portfolio repository. It is a review copy, not an import or merged history.

- **91 pieces:** 67 technical posts and 24 personal writeups.
- **29 declared explainer/companion pairs:** 38 technical editorial units if each pair is reviewed together. Both pages still require an individual decision; keeping one never silently approves the other.
- **3 existing drafts:** modality-gap-complementary, patches-in-conversation, simo2-geometry-by-construction. Their source descriptions name unresolved scope/evidence issues. Their draft status remains visible in the inventory.
- The source public directory contains 440 files totaling about 128 MB. This is a repository asset inventory, **not a claim that a visitor downloads 128 MB**. Copy only the dependency closure of selected posts, after checking their actual runtime paths.
- The old repository already contains an August editorial plan recording corrections and consolidation. That history is useful context, not a fresh quality endorsement or authorization to republish.

The local review lists title, summary, source date, approximate prose word count, direct visualization-import count, bibliography-entry count, companion relationship, and original/source links. Counts are descriptive, not quality scores. No article body is copied into portfolio `src/` or `public/`.

```sh
python3 scripts/review-blog.py ../blog-review-source
python3 -m http.server 4176 --bind 127.0.0.1 --directory .blog-review
```

The generator needs PyYAML; it does not run in the site build or CI. Open `http://127.0.0.1:4176/`. Filter technical posts or personal writeups, mark Keep / Revise / Archive, add notes, and **Export decisions**. Choices persist in this browser, keyed to the source revision; export a backup before changing browsers or clearing storage. All 91 items are initially unreviewed. The page cannot publish, delete, or modify the old site. Generated JSON/CSV/HTML is in ignored `.blog-review/`, outside every production input directory.

## Migration sequence after selection

1. Review the corpus in small batches. Decide what sounds like you and what you can still stand behind. Check proofs, measurements, citations, runnable code, and dates for selected technical posts; check voice, relevance, and desired public context for personal writing. Preserve poems' original wording. Revise and unreviewed items stay out.
2. Build a shared writing shell locally using an explicitly approved sample. Preserve current styles and film; use the same main navigation and footer. Test one prose article and one selected interactive article before generalizing.
3. Use a dedicated allowlist with exact post IDs, source revisions, and owner decisions. **Default empty.** Legacy `draft: false` never authorizes import. Copy only approved article bodies and necessary assets/components into the new repository; do not merge the old repository's complete history or bulk-copy its public directory.
4. Have the build select from that allowlist at every output: detail routes, HTML, article lists, search index, RSS, sitemap, related links, series, social images, and downloadable raw content. Add a built-artifact assertion that unapproved post URLs and source bodies are absent. No environment flag may publish the review archive.
5. Keep selected existing `/blog/<slug>/` and `/blog/writeups/<slug>/` URLs where practical. Review internal links, companions, old redirect aliases, citations, diagrams, math, schema, feeds, and asset paths for each chosen piece. Keep actual original publication dates; add revision dates only for real edits. Use the portfolio's www Person/WebSite identity.
6. Plan excluded URLs explicitly. Leave the current site alone until cutover; archive decisions do not delete it today. At cutover, genuinely retired URLs should return 404/410, and merged articles should map to relevant destinations. Do not redirect every excluded post to the homepage or publish empty placeholder articles. GitHub Pages' HTML redirects are not server-level 301s; account for that hosting constraint if URLs must change.
7. Coordinate ownership of `/blog/` with the existing blog Pages project and disable its old publishing workflow only at the approved cutover. Otherwise two deployments can keep serving different versions. Keep a rollback copy, validate live paths, and update sitemap references only when the new content is ready.

## Verification and sources

Completed: live mobile tests for five representative URLs; desktop Home; source/build/resource inspection; public cache headers; metadata inventory of every blog/writeup source file; portfolio `npm run check`; local review search, decision persistence, JSON export, and final zero-selected state. No application performance fixes or content migration were applied in this audit.

Audit captures are in ignored `.seo-audit/performance-2026-11-01.json`; the review inventory is in `.blog-review/inventory.json` and `.blog-review/inventory.csv`. Local review screenshot: `blog-editorial-review.png` in the chat's visualization directory.

- [Core Web Vitals and the limits of lab measurement](https://web.dev/articles/vitals)
- [Astro's official Vue integration](https://docs.astro.build/en/guides/integrations-guide/vue/)
- [Google's URL mapping, staged migration, and retired-page guidance](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes)
- [GitHub Pages user sites and project sites](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages)
- [Custom domains inherited by project sites](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/about-custom-domains-and-github-pages)
