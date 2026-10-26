<template>
  <article class="collection-page wrap music-room">
    <header class="collection-heading">
      <div>
        <h1>Music I live with.</h1>
        <p>For late nights, long roads, and the way back.</p>
      </div>
    </header>
    <div class="music-desk">
      <div
        class="record-sleeve"
        role="img"
        aria-label="A vinyl record in a sleeve, labelled git Motivated"
      >
        <div class="vinyl">
          <div class="record-label">
            git<br />Motivated<span>MLNomadpy</span>
          </div>
        </div>
        <div class="sleeve-label">
          <span>A playlist, collected along the way.</span
          ><strong>git Motivated</strong><span>Taha Bouhsine</span>
        </div>
      </div>
      <section class="playlist-panel" aria-label="Playlist player">
        <iframe
          v-if="loaded"
          title="git Motivated — Taha Bouhsine’s Spotify playlist"
          src="https://open.spotify.com/embed/playlist/6ij2kgVUj9aRXpWOlE5CUF?theme=0"
          width="100%"
          height="440"
          allow="encrypted-media; fullscreen; picture-in-picture"
        ></iframe>
        <template v-else
          ><h2>On the playlist</h2>
          <ul class="track-list">
            <li v-for="track in tracks" :key="track.title">
              <span>{{ track.title }}</span
              ><small>{{ track.artist }}</small>
            </li>
          </ul></template
        >
        <div class="listen-actions">
          <button v-if="!loaded" class="listen-button" @click="loaded = true">
            <span aria-hidden="true">▶</span> Listen here</button
          ><a href="https://open.spotify.com/playlist/6ij2kgVUj9aRXpWOlE5CUF"
            >Open Spotify</a
          >
        </div>
      </section>
    </div>
  </article>
</template>
<script setup>
import { ref } from "vue";
import { playlistSchema } from "@/utils/structuredData";
import { usePageMeta } from "@/composables/usePageMeta";
const loaded = ref(false);
const tracks = [
  { title: "Friend Like Me", artist: "Chris Webby" },
  {
    title: "RISE",
    artist: "League of Legends, Mako, The Word Alive, The Glitch Mob",
  },
  { title: "Parade", artist: "Jacob Banks" },
  { title: "Car Radio", artist: "Twenty One Pilots" },
  { title: "Agharas", artist: "Dada, Iguidr" },
  { title: "Yek Yek", artist: "Draganov" },
];
usePageMeta(
  "Music I live with",
  "A personal playlist collected across the years by Taha Bouhsine.",
  {
    structuredData: playlistSchema(
      tracks,
      "https://open.spotify.com/playlist/6ij2kgVUj9aRXpWOlE5CUF",
    ),
  },
);
</script>
