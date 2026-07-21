<template>
  <div class="music view-container">
    <div class="section-content scrollable-content smooth-scroll custom-scroll">
      <div class="music-wrapper">
        <!-- Header -->
        <header class="music-header">
          <div class="music-badge" aria-hidden="true">
            <i class="fab fa-spotify"></i>
          </div>
          <h1 class="music-title">Music I Live With</h1>
          <p class="music-subtitle">
            A playlist I have been collecting across the years — songs that
            stuck with me through late nights, long roads, and everything
            in between.
          </p>
          <a
            class="music-cta"
            href="https://open.spotify.com/playlist/6ij2kgVUj9aRXpWOlE5CUF"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i class="fab fa-spotify" aria-hidden="true"></i>
            <span>Open in Spotify</span>
          </a>
        </header>

        <!-- Embedded player -->
        <div class="music-embed">
          <iframe
            title="Taha Bouhsine's playlist on Spotify"
            src="https://open.spotify.com/embed/playlist/6ij2kgVUj9aRXpWOlE5CUF?utm_source=generator&theme=0"
            width="100%"
            height="600"
            frameborder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useMeta } from '@/composables/useMeta';

export default {
  name: 'MusicView',
  mounted() {
    const { setPageMeta } = useMeta();
    setPageMeta({
      title: 'Music | Taha Bouhsine',
      description: 'A personal Spotify playlist Taha Bouhsine has collected across the years.',
      ogTitle: 'Music | Taha Bouhsine',
      ogDescription: 'A personal Spotify playlist collected across the years.'
    });
  }
}
</script>

<style scoped>
.view-container {
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
}

.scrollable-content {
  height: 100%;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 20px;
}

.music-wrapper {
  max-width: 820px;
  margin: 0 auto;
  width: 100%;
  padding: 40px 20px 80px;
}

/* Header */
.music-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.music-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: rgba(70, 194, 168, 0.1);
  border: 1px solid rgba(70, 194, 168, 0.3);
  color: var(--accent-2);
  font-size: 1.9rem;
  margin-bottom: 1.25rem;
}

.music-title {
  margin: 0 0 0.75rem;
  font-family: var(--font-display);
  font-size: var(--t-h1);
  font-weight: 700;
  color: var(--fg);
  line-height: 1.1;
}

.music-subtitle {
  margin: 0 auto 1.75rem;
  max-width: 560px;
  color: var(--fg-dim);
  font-size: 1rem;
  line-height: 1.65;
}

.music-cta {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 11px 22px;
  border-radius: var(--radius-pill);
  background: var(--accent-2);
  color: var(--on-accent);
  text-decoration: none;
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 0.92rem;
  transition: transform var(--dur-fast) var(--ease),
              box-shadow var(--dur-fast) var(--ease);
}

.music-cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 22px -8px rgba(70, 194, 168, 0.6);
}

/* Embed */
.music-embed {
  border-radius: 16px;
  overflow: hidden;
  box-shadow: var(--shadow-card);
  border: 1px solid var(--glass-border);
}

.music-embed iframe {
  display: block;
  border: 0;
}

@media (max-width: 768px) {
  .music-wrapper { padding: 24px 12px 60px; }
  .music-embed iframe { height: 480px; }
}
</style>
