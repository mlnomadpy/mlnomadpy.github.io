<template>
  <section class="hero" :class="{ atmosphere: isMobile }">
    <!-- Background video (desktop/tablet); mobile falls back to atmosphere layers -->
    <video
      v-if="!isMobile"
      class="hero__video"
      autoplay
      muted
      loop
      playsinline
      preload="metadata"
      aria-hidden="true"
    >
      <source src="@/assets/background-video.mp4" type="video/mp4" onerror="this.parentElement.remove()">
    </video>
    <div class="hero__scrim" aria-hidden="true"></div>

    <div class="hero__content">
      <p class="hero__eyebrow">AI Researcher · Google Developer Expert · Founder @ Azetta AI</p>

      <h1 class="hero__title">Taha Bouhsine</h1>

      <p class="hero__sub">
        I build interpretable, efficient neural networks, researching
        representation learning and the geometry of how models understand the world.
      </p>

      <div class="hero__cta">
        <router-link to="/talks" class="btn btn--primary">
          <i class="fas fa-microphone" aria-hidden="true"></i>
          View talks &amp; research
        </router-link>
        <a
          href="https://linkedin.com/in/Tahabsn"
          target="_blank"
          rel="noopener noreferrer"
          class="btn btn--ghost"
        >
          Get in touch
        </a>
      </div>

      <SocialLinks />
    </div>
  </section>
</template>

<script>
import SocialLinks from '@/components/home/SocialLinks.vue';
import { useResponsive } from '@/composables/useResponsive';

export default {
  name: 'HeroSection',
  components: { SocialLinks },
  setup() {
    const { isMobile } = useResponsive();
    return { isMobile };
  },
};
</script>

<style scoped>
.hero {
  position: absolute;
  inset: 0;
  overflow: hidden;
  background: var(--bg);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

/* Background video */
.hero__video {
  position: absolute;
  top: 50%;
  left: 50%;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  object-fit: cover;
  transform: translate(-50%, -50%);
  z-index: 0;
}

/* Warm scrim: darkens for legibility and vignettes the video into the
   page so it blends with the Desert Obsidian background rather than
   sitting in a hard black box. */
.hero__scrim {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background:
    radial-gradient(120% 90% at 50% 38%, rgba(14, 11, 8, 0.30), rgba(14, 11, 8, 0.82) 100%),
    radial-gradient(60% 60% at 12% 0%, rgba(240, 178, 101, 0.10), transparent 60%),
    linear-gradient(to bottom, rgba(14, 11, 8, 0.45), rgba(14, 11, 8, 0.80));
}

.hero__content {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 760px;
  text-align: center;
  animation: hero-in 0.7s var(--ease) both;
}

.hero__eyebrow {
  font-family: var(--font-mono);
  font-size: var(--t-label);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--accent);
  margin: 0 0 20px;
}

.hero__title {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: var(--t-display);
  line-height: 1.04;
  letter-spacing: -0.02em;
  color: var(--fg);
  margin: 0;
}

.hero__sub {
  margin: 20px auto 0;
  max-width: 600px;
  font-family: var(--font-body);
  font-size: clamp(1rem, 2vw, 1.18rem);
  line-height: 1.6;
  color: var(--fg-dim);
}

.hero__cta {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  justify-content: center;
  margin: 32px 0 8px;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  padding: 13px 24px;
  border-radius: var(--radius-pill);
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 0.95rem;
  text-decoration: none;
  cursor: pointer;
  transition: transform var(--dur-fast) var(--ease),
              background var(--dur-fast) var(--ease),
              box-shadow var(--dur-fast) var(--ease),
              border-color var(--dur-fast) var(--ease);
}

.btn--primary {
  background: var(--accent);
  color: var(--on-accent);
  border: 1px solid var(--accent);
}
.btn--primary:hover {
  background: var(--accent-hover);
  transform: translateY(-2px);
  box-shadow: 0 12px 28px -10px rgba(240, 178, 101, 0.6);
}

.btn--ghost {
  background: transparent;
  color: var(--fg);
  border: 1px solid var(--line-strong);
}
.btn--ghost:hover {
  border-color: var(--accent);
  color: var(--accent);
  transform: translateY(-2px);
}

.btn:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
}

@keyframes hero-in {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}

@media (max-width: 600px) {
  .hero__cta { flex-direction: column; align-items: stretch; }
  .btn { justify-content: center; }
}
</style>
