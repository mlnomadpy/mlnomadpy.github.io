# Portfolio SEO audit — 2026-10-26

## Result

The local portfolio has **44 unique indexable canonical pages**, plus an About alias and a noindex 404. All 44 pages pass the generated-HTML SEO and structured-data checks, are included exactly once in the sitemap, and are reachable within **two clicks** of Home. This audit fixed metadata, video discovery, asset delivery and resource-link issues without adding promotional copy or changing the original poems, talk names or URLs.

**The changes are local, not deployed.** The live portfolio still has its previous 42-URL sitemap; `/research` currently returns HTTP 404. Local correctness does not mean Google has indexed the new version.

## Scope and evidence

- Inspected every generated portfolio HTML document, source views, metadata builders, robots directives, sitemap generation, internal anchors and local rendering assets.
- Verified the public domain, redirects, missing-page response, robots.txt, main sitemap and all eight existing project sitemaps referenced by the master index.
- Read the existing verified Search Console **domain property**, then filtered indexing to the portfolio sitemap and performance to portfolio URLs. Other projects, including `/blog/` and `/wc26/`, were excluded from portfolio conclusions.
- Checked 40 distinct outbound destinations, excluding YouTube recordings already verified in the structured-data audit and platforms requiring interactive access. Rechecked apparent HTTP errors with GET before classifying links as broken.
- Tested representative page families in the browser at 390 pixels, including bilingual and Arabic poems, filtered talks, recording details, CV, and recovery from a missing talk. No horizontal overflow was found. Rechecked the native recording player after the final change.

## Search Console baseline

The portfolio sitemap report, last updated **October 22**, shows **15 indexed pages and 27 not indexed** out of 42 submitted URLs. Of the latter, **25 are “Discovered — currently not indexed”** and **2 are “Crawled — currently not indexed.”** This is a real indexing backlog; it is not evidence that robots.txt blocks these pages or that changing schema will automatically index them.

Discovered examples include `/aboutme`, `/poetry/ana_alkalam`, `/poetry/lguemra_moon` and several talks. The two crawled examples are:

- `/talks/30daysofml-mlready-nlp1-intro-to-nlp` — last crawled June 13, 2026.
- `/talks/ml-in-depth-2-deep-computer-vision-segmentation` — last crawled May 8, 2026.

The portfolio-only Web performance filter for **July 25–October 24** reports **42 clicks, about 1.45K impressions, 2.9% CTR and average position 5**. The leading reported query is “taha bouhsine” (26 clicks); many other visible queries use `site:`. These figures are a filtered baseline, not a clean measure of broad topic demand or a ranking forecast. Google warns that filtered totals may be partial.

The domain’s video report shows 8 indexed videos and no reported video exclusions as of October 21; these are not a count of all 27 local recording pages. Manual actions and Security issues both report **“No issues detected.”** Core Web Vitals provides no usable portfolio pass/fail result: mobile lists zero classified URLs, and desktop reports insufficient usage data. No field-performance improvement or Lighthouse score is claimed.

## Issues fixed

| Priority / impact | Evidence before | Fix and verification |
| --- | --- | --- |
| High: video discovery | Recording iframes were inserted only after a click. Google does not click to load videos. | All 27 recording pages now contain a visible native `iframe` in generated HTML, with `loading="lazy"`, the privacy-enhanced YouTube domain, and no autoplay. Checks match each player to its `VideoObject`. |
| Medium: misleading sitemap freshness | Every URL received the build timestamp as `lastmod`, plus default daily/priority hints. | Sitemap is generated from actual HTML canonicals and noindex state. Unverified modification dates and unused crawl hints were removed; all 44 canonical URLs appear once. |
| Medium: damaged snippets | All 32 talk descriptions were sliced at exactly 180 characters, frequently mid-word. | Complete opening sentences are preferred; longer excerpts end at word boundaries. All descriptions are unique, and regression tests cover excerpt behavior. |
| Medium: verbose search titles | 12 talk titles exceeded 70 characters; the longest was 136 including the author. | Editorial search titles foreground the subject while preserving visible session names and existing slugs. The longest resulting page title is 70 characters. This is an editorial choice, not a Google character-limit rule. |
| Medium: unnecessarily heavy images | Recording artwork totaled 5,364,684 bytes; portrait was 284,693 bytes. | Responsive WebP artwork totals 1,122,554 bytes at 960 pixels (**79% smaller**) or 476,466 bytes at 480 pixels (**91% smaller**). Portrait is 31,150 bytes (**89% smaller**). Original artwork files remain available. |
| Medium: loading priorities | All archive thumbnails were lazy, including the first visible row; motion-reduced visitors could still fetch video metadata. | First archive images load eagerly, the first has high fetch priority, later images remain lazy, and responsive source selection is browser-verified. Homepage video uses `preload="none"` and retains its motion check and playback control. Poster shrank from 92,589 to 63,460 bytes. |
| Medium: external font dependency | Every page requested a render-blocking Google Fonts stylesheet. | Existing Arabic and Tifinagh fonts are self-hosted as WOFF2, with Unicode subsets, `font-display: swap` and their original open licenses. Generated CSS references are checked for local asset availability. |
| Medium: broken code resources | Two old-username Gist URLs returned 404 on GET. GitHub’s public Gist API identified the current owner. | Both links now use the verified `mlnomadpy` owner URLs. |
| Low: notebook link quality | Notebook links used embed URLs or pinned session parameters. HEAD requests misleadingly reported 404; GET confirmed these were not all broken. | Fourteen notebook references now point to verified current `/code/skywolfmo/…` pages, covering 13 distinct notebooks. Author and notebook slugs were preserved. |
| Low: social previews | Every page used the generic card; image alternative text and site name were missing. | Recording pages use their own artwork. Open Graph and Twitter metadata agree with canonical/title/description, include image descriptions, and reset correctly between routes. Large search image previews are allowed. |
| Low: contextual discovery | About’s research mention was plain text. | It now links naturally to Research. The complete HTML link graph verifies every canonical page is within two clicks of Home, with no broken fragments or orphan pages. |

A recording detail visit can now contact YouTube before playback when its lazy-loaded player becomes visible. It still uses `youtube-nocookie.com` and does not autoplay. Spotify remains click-to-load. The homepage background film remains local.

## Checks already healthy

- Full text and meaningful links are present in pre-rendered HTML; content does not require a crawler to run JavaScript first.
- One H1 per page, descriptive heading hierarchy, unique canonical titles/descriptions, viewport metadata, and no mixed-content rendering references.
- HTTPS is accessible with certificate verification. HTTP www, HTTPS apex and the GitHub Pages origin resolve to the canonical HTTPS www homepage.
- robots.txt permits crawling. The master sitemap and all eight referenced project sitemaps return 200. Their entries are preserved.
- Real unknown URLs return 404 on the live host. Local preview fallback routes become noindex and remove stale structured data; valid-page navigation restores indexing metadata.
- The `/about` alias canonicalizes to `/aboutme`; errors and query variants are absent from the canonical sitemap. Talk filters keep the clean collection canonical while updating the visible list and schema.
- Images reserve dimensions and have alt attributes; decorative images use empty alt text. Arabic verse has language/direction attributes, and Darija/Tifinagh use appropriate language tags. Separate poems are not translations of each other, so invented hreflang pairs would be inappropriate.
- Original writing, research references, recordings, a factual CV, contact details and public professional profiles provide useful identity and expertise signals. No keyword stuffing, fabricated dates, extra marketing sections or artificial text-length targets were added.

## Verification and release follow-up

`npm run build` and `npm run check` pass. The latter includes content preservation, all-page schema checks, six focused regression tests across the schema/snippet suites, and the generated-HTML SEO audit. The existing deployment workflow runs the same checks. `npm run check:seo` can be run independently after building. Per-page metadata, link depth and validation results are written to ignored `.seo-audit/report.json`; captured live-check evidence is also in that ignored directory.

Remaining work depends on deployment and Google’s processing:

1. Publish the reviewed local changes through the existing deployment workflow.
2. Verify production `/research`, `/cv`, representative poem/talk pages, the 44-URL sitemap, recording thumbnails and the noindex 404. Retest a recording using Google’s live URL inspection and Rich Results Test, since local HTML tests do not establish public fetchability.
3. In the verified domain property, confirm the sitemap has been read again. Inspect About and the two crawled-but-unindexed talks; request indexing after the changed pages are live. Revisit the 25-page discovery backlog after recrawl. These Google-side states cannot be cleared by a local code change.
4. Compare portfolio-filtered search performance after sufficient new data, excluding unrelated projects and considering `site:` query noise. Evaluate real-user Core Web Vitals once enough data exists; run a production lab audit for diagnostics in the meantime.

The blog and sibling projects need their own audits before making domain-wide content or backlink claims. Google chooses indexing and search presentation; successful technical checks do not guarantee either.

## Primary references

- [JavaScript SEO and soft 404 handling](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics)
- [Sitemap construction and accurate lastmod values](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Title links](https://developers.google.com/search/docs/appearance/title-link) and [meta descriptions](https://developers.google.com/search/docs/appearance/snippet)
- [Video discovery and indexing](https://developers.google.com/search/docs/appearance/video) and [crawlable lazy loading](https://developers.google.com/search/docs/crawling-indexing/javascript/lazy-loading)
- [GitHub Pages custom 404 files](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-custom-404-page-for-your-github-pages-site)
- [Search Console portfolio sitemap report](https://search.google.com/search-console/index?resource_id=sc-domain%3Atahabouhsine.com&pages=SITEMAP&sitemap=https%3A%2F%2Fwww.tahabouhsine.com%2Fsitemap.xml) — requires owner access.
