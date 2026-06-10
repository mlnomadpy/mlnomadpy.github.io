<template>
  <nav
    class="nav"
    :class="{ 'nav--scrolled': isScrolled }"
    role="navigation"
    aria-label="Main navigation"
  >
    <div class="nav__inner">
      <!-- Wordmark / home -->
      <router-link to="/" class="nav__brand" aria-label="Home, Taha Bouhsine">
        <span class="nav__mark" aria-hidden="true"></span>
        <span class="nav__name">Taha&nbsp;Bouhsine</span>
      </router-link>

      <!-- Primary destinations -->
      <ul class="nav__links">
        <li v-for="item in items" :key="item.label">
          <a v-if="item.href" :href="item.href" class="nav__link">
            <i :class="item.icon" aria-hidden="true"></i>
            <span class="nav__label">{{ item.label }}</span>
          </a>
          <router-link v-else :to="item.to" class="nav__link">
            <i :class="item.icon" aria-hidden="true"></i>
            <span class="nav__label">{{ item.label }}</span>
          </router-link>
        </li>
      </ul>

      <!-- Single CTA -->
      <a
        class="nav__cta"
        href="https://linkedin.com/in/Tahabsn"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i class="fas fa-paper-plane" aria-hidden="true"></i>
        <span>Get in touch</span>
      </a>
    </div>
  </nav>
</template>

<script>
import { throttle } from '@/utils/helpers';

export default {
  name: 'MainNavbar',
  data() {
    return {
      isScrolled: false,
      items: [
        { to: '/aboutme', label: 'About', icon: 'fas fa-user' },
        { to: '/talks', label: 'Talks', icon: 'fas fa-microphone' },
        { to: '/poetry', label: 'Poetry', icon: 'fas fa-feather-alt' },
        // Blog lives in a separate repo / Pages project at /blog.
        { href: 'https://www.tahabouhsine.com/blog', label: 'Blog', icon: 'fas fa-pen-nib' },
      ],
    };
  },
  methods: {
    handleScroll() {
      // Track inner scroll containers (route views) and the window.
      const inner = document.querySelector('.scrollable-content, .section-content');
      const y = (inner && inner.scrollTop) || window.scrollY || 0;
      this.isScrolled = y > 12;
    },
  },
  created() {
    this._throttledScroll = throttle(this.handleScroll, 100);
  },
  mounted() {
    window.addEventListener('scroll', this._throttledScroll, true);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this._throttledScroll, true);
  },
};
</script>

<style scoped>
.nav {
  position: sticky;
  top: 0;
  z-index: 1000;
  height: 64px;
  width: 100%;
  background: color-mix(in srgb, var(--bg) 82%, transparent);
  backdrop-filter: blur(14px) saturate(140%);
  -webkit-backdrop-filter: blur(14px) saturate(140%);
  border-bottom: 1px solid var(--line);
  transition: border-color var(--dur) var(--ease),
              background var(--dur) var(--ease);
}

.nav--scrolled {
  border-bottom-color: var(--line-strong);
  background: color-mix(in srgb, var(--bg) 92%, transparent);
}

.nav__inner {
  max-width: 1180px;
  height: 100%;
  margin: 0 auto;
  padding: 0 clamp(16px, 4vw, 32px);
  display: flex;
  align-items: center;
  gap: 16px;
}

/* --- Brand --- */
.nav__brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: var(--fg);
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 0.98rem;
  letter-spacing: -0.01em;
  white-space: nowrap;
}

.nav__mark {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 0 4px rgba(240, 178, 101, 0.18),
              0 0 14px rgba(240, 178, 101, 0.5);
  flex: none;
  transition: transform var(--dur) var(--ease);
}

.nav__brand:hover .nav__mark { transform: scale(1.18); }

/* --- Links --- */
.nav__links {
  display: flex;
  align-items: center;
  gap: 4px;
  list-style: none;
  margin: 0 auto 0 12px;
  padding: 0;
}

.nav__link {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  border-radius: var(--radius-sm);
  text-decoration: none;
  color: var(--fg-dim);
  font-family: var(--font-display);
  font-weight: 500;
  font-size: 0.92rem;
  transition: color var(--dur-fast) var(--ease),
              background var(--dur-fast) var(--ease);
}

.nav__link i { font-size: 0.92rem; opacity: 0.85; }

.nav__link:hover {
  color: var(--fg);
  background: var(--wash);
}

/* Active underline (single accent treatment) */
.nav__link::after {
  content: "";
  position: absolute;
  left: 14px;
  right: 14px;
  bottom: 2px;
  height: 2px;
  border-radius: 2px;
  background: var(--accent);
  transform: scaleX(0);
  transform-origin: center;
  transition: transform var(--dur) var(--ease);
}

.nav__link.router-link-active {
  color: var(--accent);
}
.nav__link.router-link-active::after { transform: scaleX(1); }

/* --- CTA --- */
.nav__cta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 9px 16px;
  border-radius: var(--radius-pill);
  background: var(--accent);
  color: var(--on-accent);
  text-decoration: none;
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 0.88rem;
  white-space: nowrap;
  transition: transform var(--dur-fast) var(--ease),
              background var(--dur-fast) var(--ease),
              box-shadow var(--dur-fast) var(--ease);
}

.nav__cta:hover {
  background: var(--accent-hover);
  transform: translateY(-1px);
  box-shadow: 0 8px 20px -8px rgba(240, 178, 101, 0.6);
}

.nav a:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
  border-radius: var(--radius-sm);
}

/* ============================================================
   Mobile: brand shortens, CTA becomes icon-only, labels move
   under icons so destinations stay discoverable on touch.
   ============================================================ */
@media (max-width: 720px) {
  .nav__name { display: none; }
  .nav__links { gap: 0; margin: 0 auto; }
  .nav__link { flex-direction: column; gap: 3px; padding: 6px 10px; }
  .nav__label { font-size: 0.62rem; letter-spacing: 0.02em; }
  .nav__link i { font-size: 1.05rem; }
  .nav__link::after { left: 50%; right: auto; width: 18px; transform: translateX(-50%) scaleX(0); }
  .nav__link.router-link-active::after { transform: translateX(-50%) scaleX(1); }
  .nav__cta span { display: none; }
  .nav__cta { padding: 9px 11px; }
}

@media (max-width: 380px) {
  .nav__inner { gap: 6px; padding: 0 10px; }
  .nav__link { padding: 6px 7px; }
}
</style>
