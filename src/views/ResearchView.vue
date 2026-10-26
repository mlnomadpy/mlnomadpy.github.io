<template>
  <div class="collection-page wrap research-page">
    <header class="collection-heading research-heading">
      <div>
        <h1>Research</h1>
        <p>What shape does learning leave behind?</p>
      </div>
      <figure class="geometry-sketch">
        <svg
          viewBox="0 0 360 130"
          role="img"
          aria-label="Conceptual sketch: observations becoming a geometric representation"
        >
          <g fill="none" stroke="currentColor" stroke-width="1.2">
            <path d="M18 101Q56 82 99 108M26 45Q74 23 109 52" opacity=".3" />
            <path d="M134 66h54m-8-5 8 5-8 5" />
            <ellipse
              cx="263"
              cy="58"
              rx="57"
              ry="39"
              transform="rotate(-18 263 58)"
              stroke-dasharray="3 5"
              opacity=".55"
            />
            <path
              d="m234 71 24-38 35 29-59 9 35 27 24-36m-35-29 11 65"
              opacity=".4"
            />
          </g>
          <g fill="currentColor">
            <circle cx="37" cy="66" r="3" />
            <circle cx="59" cy="39" r="3" />
            <circle cx="89" cy="74" r="3" />
            <circle cx="69" cy="97" r="3" />
            <circle cx="105" cy="47" r="3" />
            <circle cx="234" cy="71" r="4" />
            <circle cx="258" cy="33" r="4" />
            <circle cx="293" cy="62" r="4" />
            <circle cx="269" cy="98" r="4" />
          </g>
          <text
            x="144"
            y="48"
            fill="currentColor"
            font-family="Georgia, serif"
            font-style="italic"
            font-size="17"
          >
            φ
          </text>
        </svg>
      </figure>
    </header>
    <div class="research-desk">
      <section class="desk-notebook" aria-labelledby="notes-title">
        <div class="desk-section-heading">
          <h2 id="notes-title">Notebook</h2>
          <a href="https://www.tahabouhsine.com/blog/">All writing</a>
        </div>
        <article class="notebook-entry" v-for="post in reading" :key="post.url">
          <h3>
            <a :href="post.url">{{ post.title }}</a>
          </h3>
          <p>{{ post.note }}</p>
        </article>
        <nav class="desk-links" aria-label="Research elsewhere">
          <router-link to="/talks">Workshops &amp; recordings</router-link
          ><a href="https://github.com/mlnomadpy">Code on GitHub</a>
        </nav>
      </section>
      <section class="desk-papers" aria-labelledby="papers-title">
        <div class="desk-section-heading">
          <h2 id="papers-title">Papers</h2>
          <a href="https://scholar.google.com/citations?user=IsBjb3EAAAAJ"
            >Google Scholar</a
          >
        </div>
        <ol class="paper-register">
          <li v-for="paper in publications" :key="paper.link">
            <span class="paper-year">{{
              paper.presented.split(" ").at(-1)
            }}</span>
            <div>
              <h3>
                <a :href="paper.link">{{ paper.title }}</a>
              </h3>
              <p>{{ paper.publisher }}</p>
            </div>
          </li>
        </ol>
      </section>
    </div>
  </div>
</template>
<script setup>
import publications from "@/data/publications.json";
import { reading } from "@/data/reading";
import { researchCollection } from "@/utils/structuredData";
import { usePageMeta } from "@/composables/usePageMeta";
usePageMeta(
  "Research & papers",
  "Research and writing by Taha Bouhsine on representation learning, interpretable neural networks, kernels, atmospheric visibility, and satellite imagery.",
  { structuredData: researchCollection(publications, reading) },
);
</script>
