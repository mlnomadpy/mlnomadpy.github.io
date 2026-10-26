import { ViteSSG } from "vite-ssg";
import App from "./App.vue";
import { routes } from "./router";
import "./assets/site.css";
import "./assets/fonts.css";

export const createApp = ViteSSG(
  App,
  {
    routes,
    base: import.meta.env.BASE_URL,
    scrollBehavior(to, from, savedPosition) {
      if (savedPosition) return savedPosition;
      if (to.path === from.path && to.fullPath !== from.fullPath && !to.hash)
        return false;
      if (to.hash) return { el: to.hash, top: 24 };
      return { top: 0 };
    },
  },
  ({ router, isClient }) => {
    if (isClient)
      router.afterEach((to, from) => {
        if (to.path === from.path) return;
        requestAnimationFrame(() =>
          document.querySelector("main")?.focus({ preventScroll: true }),
        );
      });
  },
);
