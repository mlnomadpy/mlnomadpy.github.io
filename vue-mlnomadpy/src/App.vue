<template>
  <div id="app">
    <Navbar />
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'

export default {
  name: 'App',
  components: {
    Navbar
  }
}
</script>

<style>
:root {
  --primary-bg: #412c0f;
  --primary-text: white;
  --accent-color: rgb(244, 165, 96);
}

body {
  margin: 0;
  padding: 0;
  font-family: 'Orbitron', sans-serif;
  background-color: var(--primary-bg);
  color: var(--primary-text);
}

/* Scrollbar styling */
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
</style> 