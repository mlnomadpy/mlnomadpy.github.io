# Writing in the portfolio

The writing workspace generates static `/blog/` pages using Astro + MDX, the portfolio's actual CSS, and the shared navigation JSON. It uses the same www canonical origin and Person/WebSite IDs. The 24 reviewed personal writeups have been imported with owner approval; technical drafts and visualization collections remain outside publication inputs. No client router, Latin web fonts, analytics, or runtime JavaScript is loaded by the writing index.

**Blog** (`/blog/`) and **Writeups** (`/writeups/`) have separate main navigation links, listings, RSS feeds and article breadcrumbs. The legacy `/blog/writeups/` pages redirect to the corresponding canonical pages. The old RSS endpoint remains available with the same item IDs. The search index covers both sections.

`approved-posts.json` records **24 approved writeups**, authorized by Taha on November 5, 2026. Keep the separate review checkout and `.blog-review/` outside publication inputs. A legacy `draft: false` is never approval, and `SHOW_DRAFTS` has no effect here. The manifest filters the MDX loader before compilation, so excluded posts do not generate client components or routes.

## After the owner selects a piece

1. Review the exact post and its dependency closure: imported components, images, data, links, math, and companion relationships. A companion requires its own decision. Do not copy the old repository or its full history/public directory.
2. Copy only the approved piece to `content/blog/<slug>.mdx` or `content/writeups/<slug>.mdx`, preserving its original URL. Frontmatter needs `title`, `description`, an actual ISO `pubDate`, and `draft: false`. Use `updatedDate` only for a real revision. Set `hasMath: true` for math CSS. An optional `image` must be a relevant local image with an `imageAlt`.
3. Add an explicit manifest record with `id` (`blog/<slug>` or `writeups/<slug>`), `approvedBy: "Taha Bouhsine"`, `approvedOn` (ISO date), `sourceRevision` (40-character original commit SHA), and `contentSha256` (SHA-256 of the exact imported MDX bytes). This is recorded from the owner's decision; do not create approvals on their behalf. Changes to approved bytes require review and a new hash.
4. Import only necessary, reviewed components/assets. There is intentionally no writing public directory. Use bundled asset imports or reviewed root public assets. Do not import another unapproved MDX file through an approved component. Existing Astro visualization components can be brought over for a selected piece without porting them to Vue. Preserve their visibility, reduced-motion and teardown behavior.
5. Run `npm run build && npm run check` on Node 24. Inspect desktop/mobile layout, math, resource links, keyboard navigation and interactive panels before deployment. The generated index, article routes, search JSON, RSS and schema all use the approved collection. The build verifies these against the manifest.

## Schema and publication checks

The empty Blog index has a CollectionPage, Blog, empty ItemList, BreadcrumbList, and shared Person/WebSite; it advertises no BlogPosting. The Writeups index has its own CollectionPage and ItemList. Approved technical articles get BlogPosting; personal writeups get Article linked to their own collection. Both preserve the visible headline, description, author, original publication date, and optional real revision date/image. No placeholder articles, invented dates or claims are generated.

`npm run check:blog` tests approval failures and does an isolated real Astro build with synthetic approved/unapproved fixtures, including a deliberately invalid import in the unapproved piece. It confirms exclusion even with `SHOW_DRAFTS=true`, separates technical and personal listings/feeds, and verifies that revoking approval removes previously built content. The temporary files are removed; fixtures never enter production output. The artifact checker also checks routes, article schema, feed, search, sitemap and links, and requires a zero-runtime-JS index.

## Production ownership

The portfolio owns `/blog/` and `/writeups/`. The separate `mlnomadpy/blog` Pages project must be disabled during cutover so it cannot shadow this build. Its source, history and deployment branch are retained. See `docs/writeups-publication.md` for publication scope and rollback details. The generated `/blog/sitemap-0.xml` preserves the existing sitemap address with only technical blog URLs. The main sitemap includes both sections.
