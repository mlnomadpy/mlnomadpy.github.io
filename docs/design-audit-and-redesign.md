# Portfolio direction

Updated October 26, 2026.

This is a personal space for Taha’s research, writing, poems, and music. Its purpose is to let visitors spend time with the work and meet the person behind it.

## Principles

- Lead with a person and their interests. Keep credentials in a readable CV.
- Preserve multilingual poems as written. Let the poem begin before explaining it.
- Prefer concrete, supported facts to motivational biography or promotional claims.
- Put research papers and selected writing within easy reach.
- Keep normal page scrolling, native links, visible keyboard focus, and readable line lengths.
- Share one quiet palette and stylesheet; let content create differences between pages.
- Load third-party players only on request. Keep the original background film as part of the homepage’s feeling, with a pause control and reduced-motion fallback.

## Implementation

Home introduces Taha and links directly to selected writing, poetry, talks, and music. About is a single page. Research contains publications and blog links. CV holds experience, education, recognition, and certificates, with print styles. Talks keep search for a larger archive; Poetry has a simple index with actual excerpts. Existing poem and talk URLs remain intact.

## Content still worth revisiting with Taha

The About page uses only facts and ideas already present in the repository. Specific memories can be added when Taha supplies them. Talk dates are absent in the source and have not been invented. The publications page links to Scholar for a fuller bibliography. Existing CV dates and credentials should be maintained by their owner as circumstances change.

## Verification

The October 26 implementation passed the production build and generated-content checks for 45 content pages. Browser checks covered nine representative routes at 320, 768, and 1280 pixels without horizontal overflow, Arabic poem rendering, talk search and empty-state recovery, browser Back restoring a search, click-to-load YouTube and Spotify, the missing-poem page, and the keyboard skip link. The production browser console had no captured errors or warnings during that review. The poem, talk, and publication JSON records were preserved byte-for-byte. No Lighthouse score or physical-device certification is claimed.

The original night-scene background video was restored after Taha identified its feeling as important to the site. It now fills the homepage introduction, with a legibility overlay, explicit playback control, and poster-first rendering. Automatic playback waits for the reduced-motion preference check. The still portrait appears on About.

A further editorial pass shortened About into a portrait and a brief introduction, reduced repeated preambles on Research and Music, and made talk previews shorter while keeping their complete descriptions on the detail pages. The homepage introduction is a two-line sentence. Its video control uses a compact visible label with a full accessible name, and remembers a manual pause for the browser session.

## Collection layouts

Research now pairs notebook entries with a compact paper register and a conceptual representation sketch. Talks uses a two-column recording library with local thumbnails, search, and a series selector; both filters are retained in the URL. Poetry presents one featured bilingual sheet alongside four shorter previews. Music pairs a vinyl-sleeve illustration with a selection verified against the Spotify playlist; its full player still loads on request. Talk details put media beside notes, poem details have a collection rail on wider screens, and the CV places secondary material beside experience. All layouts collapse to normal document flow on narrow screens.

The collection redesign passed 21 browser layout checks across 320, 768, and 1280 pixel widths, plus series filtering, search recovery, deferred recording playback, and Back restoring search results. All 32 thumbnails loaded from local assets. The six featured music tracks were checked against the live embedded playlist.

## Landing page continuation

The sections below the original film now form one compact composition: two research entries with subject-specific SVG sketches, a bilingual poem sheet, a featured JAX/Flax recording drawn from the talk archive, and a small record vignette linking to Music. The featured recording uses the same local thumbnail map as the archive. The hero and its short introduction are retained. The new composition was checked at 320, 375, 768, and 1280 pixels, with no horizontal overflow or off-screen content blocks; all local illustrations loaded.
