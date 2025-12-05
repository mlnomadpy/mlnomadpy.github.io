<template>
  <div id="app">
    <MainNavbar />
    <main>
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<script>
import MainNavbar from '@/components/Navbar.vue'
import { useHead } from '@vueuse/head'

export default {
  name: 'App',
  components: {
    MainNavbar
  },
  setup() {
    useHead({
      title: 'Taha Bouhsine | ML Researcher & Google Developer Expert',
      titleTemplate: '%s | MLNomadpy',
      meta: [
        { name: 'description', content: 'Machine Learning Researcher & Engineer, Google Developer Expert in AI/ML, and CEO of MLNomads focusing on representation learning and interpretable AI models.' },
        { name: 'keywords', content: 'Machine Learning, Artificial Intelligence, AI Research, Taha Bouhsine, Google Developer Expert, MLNomads, Neural Networks, Interpretable AI' },
        { name: 'author', content: 'Taha Bouhsine' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=5.0' },
        
        // Open Graph
        { property: 'og:title', content: 'Taha Bouhsine | ML Researcher & Google Developer Expert' },
        { property: 'og:site_name', content: 'MLNomadpy' },
        { property: 'og:description', content: 'Machine Learning Researcher & Engineer, Google Developer Expert in AI/ML, and CEO of MLNomads focusing on representation learning and interpretable AI models.' },
        { property: 'og:image', content: 'https://i.imgur.com/ScjU4Xr.png' },
        { property: 'og:url', content: 'https://mlnomadpy.github.io/' },
        { property: 'og:type', content: 'website' },
        
        // Twitter Card
        { property: 'twitter:title', content: 'Taha Bouhsine | ML Researcher & Google Developer Expert' },
        { property: 'twitter:description', content: 'Machine Learning Researcher & Engineer, Google Developer Expert in AI/ML, and CEO of MLNomads.' },
        { property: 'twitter:image', content: 'https://i.imgur.com/ScjU4Xr.png' },
        { property: 'twitter:card', content: 'summary_large_image' }
      ],
      link: [
        { rel: 'canonical', href: 'https://mlnomadpy.github.io/' }
      ]
    })
  },
  mounted() {
    // Track page views with a simple analytics approach
    this.$router.afterEach((to) => {
      try {
        // You can replace this with a proper analytics setup later
        console.log(`Page visited: ${to.path}`);
        
        // Update canonical URL on page change
        const canonicalLink = document.querySelector('link[rel="canonical"]');
        if (canonicalLink) {
          canonicalLink.href = `https://mlnomadpy.github.io${to.path}`;
        }
      } catch (e) {
        console.error('Analytics error:', e);
      }
    });
  }
}
</script>

<style>
:root {
  --primary-bg: #412c0f;
  --primary-text: white;
  --accent-color: rgb(244, 165, 96);
  --container-width-desktop: 100%;
  --container-width-tablet: 100%;
  --container-width-mobile: 100%;
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  --mobile-side-margin: 8px;
  
  /* Base font sizes */
  --font-size-base: 16px;
  --font-size-h1: 2.5rem;
  --font-size-h2: 2rem;
  --font-size-h3: 1.75rem;
  --font-size-h4: 1.5rem;
  --font-size-p: 1rem;
  --line-height-p: 1.6;
}

*, *::before, *::after {
  box-sizing: border-box;
}

html, body {
  font-size: var(--font-size-base);
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
}

body {
  font-family: 'Orbitron', sans-serif;
  background-color: var(--primary-bg);
  color: var(--primary-text);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-size-adjust: 100%; /* Prevent browser from auto-adjusting text size */
  -webkit-text-size-adjust: 100%;
}

#app {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

main {
  flex: 1;
  width: 100%;
  height: calc(100% - 70px); /* Exact navbar height */
  max-width: 100%;
  position: relative;
  overflow: hidden;
}

/* Container now takes full viewport width/height */
.container {
  width: var(--container-width-desktop);
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

img, video, canvas {
  max-width: 100%;
  height: auto;
}

/* Scrollbar styling - only shown for elements with overflow if needed */
::-webkit-scrollbar {
  width: 12px;
}

::-webkit-scrollbar-thumb {
  background: rgb(244, 165, 96);
}

::-webkit-scrollbar-thumb:hover {
  background: #b08a68;
}

::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 6px;
}

/* Accessibility improvements */
a:focus, button:focus {
  outline: 2px solid var(--accent-color);
  outline-offset: 2px;
}

/* Skip to content link for keyboard users */
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--accent-color);
  color: var(--primary-bg);
  padding: 8px;
  z-index: 100;
  transition: top 0.3s ease;
}

.skip-link:focus {
  top: 0;
}

/* Responsive typography */
h1 {
  font-size: var(--font-size-h1);
  line-height: 1.2;
}

h2 {
  font-size: var(--font-size-h2);
  line-height: 1.3;
}

h3 {
  font-size: var(--font-size-h3);
  line-height: 1.4;
}

h4 {
  font-size: var(--font-size-h4);
  line-height: 1.4;
}

p, li, span, a, button, input, textarea, select, label {
  font-size: var(--font-size-p);
  line-height: var(--line-height-p);
}

/* Responsive breakpoints */
@media (max-width: 1200px) {
  :root {
    --font-size-base: 15px;
    --font-size-h1: 2.4rem;
    --font-size-h2: 1.9rem;
    --font-size-h3: 1.7rem;
    --font-size-h4: 1.45rem;
  }
}

@media (max-width: 992px) {
  :root {
    --font-size-base: 14px;
    --font-size-h1: 2.2rem;
    --font-size-h2: 1.8rem;
    --font-size-h3: 1.6rem;
    --font-size-h4: 1.4rem;
  }
  
  .container {
    width: var(--container-width-tablet);
  }
}

@media (max-width: 768px) {
  :root {
    --font-size-base: 16px;
    --font-size-h1: 2rem;
    --font-size-h2: 1.6rem;
    --font-size-h3: 1.4rem;
    --font-size-h4: 1.3rem;
    --font-size-p: 1rem;
    --line-height-p: 1.5;
  }
  
  .container {
    width: var(--container-width-mobile);
    padding-left: var(--mobile-side-margin);
    padding-right: var(--mobile-side-margin);
    max-width: 100%;
  }
  
  ::-webkit-scrollbar {
    width: 8px;
  }
  
  /* Make button text more readable */
  button, .btn, .button, a.button, input[type="button"], input[type="submit"] {
    font-size: 1.05rem !important; 
  }
}

@media (max-width: 480px) {
  :root {
    --font-size-base: 16px;
    --font-size-h1: 1.8rem;
    --font-size-h2: 1.5rem;
    --font-size-h3: 1.3rem;
    --font-size-h4: 1.2rem;
    --font-size-p: 1.05rem;
    --line-height-p: 1.5;
    --mobile-side-margin: 6px;
  }
  
  .container {
    padding-left: var(--mobile-side-margin);
    padding-right: var(--mobile-side-margin);
  }
  
  /* Increase text legibility for small screens */
  p, li, span, .text-content, .card-content {
    font-size: var(--font-size-p);
  }
  
  /* Ensure interactive elements have adequate touch targets */
  button, .btn, a.button, .nav-item, .clickable, input[type="button"], input[type="submit"] {
    min-height: 44px;
    min-width: 44px;
    padding: 8px 12px;
    font-size: 1.1rem !important;
  }
  
  /* Improve readability for form elements */
  input, select, textarea {
    font-size: 1.1rem !important;
  }
}

/* Additional breakpoint for very small devices */
@media (max-width: 360px) {
  :root {
    --font-size-base: 16px;
    --font-size-h1: 1.7rem;
    --font-size-h2: 1.4rem;
    --font-size-h3: 1.2rem;
    --font-size-h4: 1.1rem;
    --font-size-p: 1.1rem;
    --mobile-side-margin: 4px;
  }
  
  .container {
    padding-left: var(--mobile-side-margin);
    padding-right: var(--mobile-side-margin);
  }
  
  /* Optimize line heights for very small screens */
  p, li, .text-content {
    line-height: 1.4;
  }
}

/* Touch device optimizations */
@media (hover: none) {
  .navbar a:hover,
  button:hover {
    transform: none !important;
  }
  
  .clickable:active {
    transform: scale(0.97);
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  /* Already dark themed, but could add additional customizations */
}

/* Page Transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style> 