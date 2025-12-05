import { ViteSSG } from "vite-ssg";
import { createWebHashHistory } from "vue-router";
import { resolveComponent, mergeProps, withCtx, createVNode, useSSRContext, resolveDynamicComponent, Transition, createBlock, openBlock } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrRenderVNode, ssrRenderAttr } from "vue/server-renderer";
import { useHead } from "@vueuse/head";
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$4 = {
  name: "MainNavbar",
  data() {
    return {
      isScrolled: false,
      scrollProgress: 0
    };
  },
  methods: {
    closeMenuIfOpen() {
    },
    handleScroll() {
      this.isScrolled = window.scrollY > 50;
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      this.scrollProgress = winScroll / height * 100;
    }
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }
};
function _sfc_ssrRender$4(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_router_link = resolveComponent("router-link");
  _push(`<nav${ssrRenderAttrs(mergeProps({
    class: ["mlnomadpy-navbar", { "scrolled": $data.isScrolled }],
    role: "navigation",
    "aria-label": "Main navigation"
  }, _attrs))} data-v-2886bc88><div class="navbar-container" data-v-2886bc88><div id="nav-links" class="nav-links" data-v-2886bc88>`);
  _push(ssrRenderComponent(_component_router_link, {
    to: "/aboutme",
    onClick: $options.closeMenuIfOpen,
    class: "nav-item",
    title: "About Me"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div class="nav-icon" data-v-2886bc88${_scopeId}><i class="fas fa-user" aria-hidden="true" data-v-2886bc88${_scopeId}></i></div><span class="sr-only" data-v-2886bc88${_scopeId}>About Me</span>`);
      } else {
        return [
          createVNode("div", { class: "nav-icon" }, [
            createVNode("i", {
              class: "fas fa-user",
              "aria-hidden": "true"
            })
          ]),
          createVNode("span", { class: "sr-only" }, "About Me")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_router_link, {
    to: "/research",
    onClick: $options.closeMenuIfOpen,
    class: "nav-item",
    title: "Research"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div class="nav-icon" data-v-2886bc88${_scopeId}><i class="fas fa-flask" aria-hidden="true" data-v-2886bc88${_scopeId}></i></div><span class="sr-only" data-v-2886bc88${_scopeId}>Research</span>`);
      } else {
        return [
          createVNode("div", { class: "nav-icon" }, [
            createVNode("i", {
              class: "fas fa-flask",
              "aria-hidden": "true"
            })
          ]),
          createVNode("span", { class: "sr-only" }, "Research")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_router_link, {
    to: "/talks",
    onClick: $options.closeMenuIfOpen,
    class: "nav-item",
    title: "Talks"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div class="nav-icon" data-v-2886bc88${_scopeId}><i class="fas fa-microphone" aria-hidden="true" data-v-2886bc88${_scopeId}></i></div><span class="sr-only" data-v-2886bc88${_scopeId}>Talks</span>`);
      } else {
        return [
          createVNode("div", { class: "nav-icon" }, [
            createVNode("i", {
              class: "fas fa-microphone",
              "aria-hidden": "true"
            })
          ]),
          createVNode("span", { class: "sr-only" }, "Talks")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_router_link, {
    to: "/",
    id: "home-link",
    class: "home nav-item",
    onClick: $options.closeMenuIfOpen,
    title: "Home"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div class="home-icon-container" data-v-2886bc88${_scopeId}><i class="fas fa-home" aria-hidden="true" data-v-2886bc88${_scopeId}></i></div><span class="sr-only" data-v-2886bc88${_scopeId}>Home</span>`);
      } else {
        return [
          createVNode("div", { class: "home-icon-container" }, [
            createVNode("i", {
              class: "fas fa-home",
              "aria-hidden": "true"
            })
          ]),
          createVNode("span", { class: "sr-only" }, "Home")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_router_link, {
    to: "/poetry",
    onClick: $options.closeMenuIfOpen,
    class: "nav-item",
    title: "Poetry"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div class="nav-icon" data-v-2886bc88${_scopeId}><i class="fas fa-feather-alt" aria-hidden="true" data-v-2886bc88${_scopeId}></i></div><span class="sr-only" data-v-2886bc88${_scopeId}>Poetry</span>`);
      } else {
        return [
          createVNode("div", { class: "nav-icon" }, [
            createVNode("i", {
              class: "fas fa-feather-alt",
              "aria-hidden": "true"
            })
          ]),
          createVNode("span", { class: "sr-only" }, "Poetry")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_router_link, {
    to: "/blogs",
    onClick: $options.closeMenuIfOpen,
    class: "nav-item",
    title: "Blogs"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div class="nav-icon" data-v-2886bc88${_scopeId}><i class="fas fa-pen-nib" aria-hidden="true" data-v-2886bc88${_scopeId}></i></div><span class="sr-only" data-v-2886bc88${_scopeId}>Blogs</span>`);
      } else {
        return [
          createVNode("div", { class: "nav-icon" }, [
            createVNode("i", {
              class: "fas fa-pen-nib",
              "aria-hidden": "true"
            })
          ]),
          createVNode("span", { class: "sr-only" }, "Blogs")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_router_link, {
    to: "/life",
    onClick: $options.closeMenuIfOpen,
    class: "nav-item",
    title: "Life"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div class="nav-icon" data-v-2886bc88${_scopeId}><i class="fas fa-heart" aria-hidden="true" data-v-2886bc88${_scopeId}></i></div><span class="sr-only" data-v-2886bc88${_scopeId}>Life</span>`);
      } else {
        return [
          createVNode("div", { class: "nav-icon" }, [
            createVNode("i", {
              class: "fas fa-heart",
              "aria-hidden": "true"
            })
          ]),
          createVNode("span", { class: "sr-only" }, "Life")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div></div><div class="scroll-progress" style="${ssrRenderStyle({ width: $data.scrollProgress + "%" })}" data-v-2886bc88></div></nav>`);
}
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/Navbar.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const MainNavbar = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["ssrRender", _sfc_ssrRender$4], ["__scopeId", "data-v-2886bc88"]]);
const _sfc_main$3 = {
  name: "App",
  components: {
    MainNavbar
  },
  setup() {
    useHead({
      title: "Taha Bouhsine | ML Researcher & Google Developer Expert",
      titleTemplate: "%s | MLNomadpy",
      meta: [
        { name: "description", content: "Machine Learning Researcher & Engineer, Google Developer Expert in AI/ML, and CEO of MLNomads focusing on representation learning and interpretable AI models." },
        { name: "keywords", content: "Machine Learning, Artificial Intelligence, AI Research, Taha Bouhsine, Google Developer Expert, MLNomads, Neural Networks, Interpretable AI" },
        { name: "author", content: "Taha Bouhsine" },
        { name: "viewport", content: "width=device-width, initial-scale=1.0, maximum-scale=5.0" },
        // Open Graph
        { property: "og:title", content: "Taha Bouhsine | ML Researcher & Google Developer Expert" },
        { property: "og:site_name", content: "MLNomadpy" },
        { property: "og:description", content: "Machine Learning Researcher & Engineer, Google Developer Expert in AI/ML, and CEO of MLNomads focusing on representation learning and interpretable AI models." },
        { property: "og:image", content: "https://i.imgur.com/ScjU4Xr.png" },
        { property: "og:url", content: "https://mlnomadpy.github.io/" },
        { property: "og:type", content: "website" },
        // Twitter Card
        { property: "twitter:title", content: "Taha Bouhsine | ML Researcher & Google Developer Expert" },
        { property: "twitter:description", content: "Machine Learning Researcher & Engineer, Google Developer Expert in AI/ML, and CEO of MLNomads." },
        { property: "twitter:image", content: "https://i.imgur.com/ScjU4Xr.png" },
        { property: "twitter:card", content: "summary_large_image" }
      ],
      link: [
        { rel: "canonical", href: "https://mlnomadpy.github.io/" }
      ]
    });
  },
  mounted() {
    this.$router.afterEach((to) => {
      try {
        console.log(`Page visited: ${to.path}`);
        const canonicalLink = document.querySelector('link[rel="canonical"]');
        if (canonicalLink) {
          canonicalLink.href = `https://mlnomadpy.github.io${to.path}`;
        }
      } catch (e) {
        console.error("Analytics error:", e);
      }
    });
  }
};
function _sfc_ssrRender$3(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_MainNavbar = resolveComponent("MainNavbar");
  const _component_router_view = resolveComponent("router-view");
  _push(`<div${ssrRenderAttrs(mergeProps({ id: "app" }, _attrs))}>`);
  _push(ssrRenderComponent(_component_MainNavbar, null, null, _parent));
  _push(`<main>`);
  _push(ssrRenderComponent(_component_router_view, null, {
    default: withCtx(({ Component }, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(``);
        ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(Component), null, null), _parent2, _scopeId);
      } else {
        return [
          createVNode(Transition, {
            name: "fade",
            mode: "out-in"
          }, {
            default: withCtx(() => [
              (openBlock(), createBlock(resolveDynamicComponent(Component)))
            ]),
            _: 2
          }, 1024)
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</main></div>`);
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/App.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const App = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender$3]]);
const _sfc_main$2 = {
  name: "SocialLinks"
};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "social-icons" }, _attrs))} data-v-b351dbb2><a href="https://scholar.google.com/citations?hl=en&amp;user=IsBjb3EAAAAJ" target="_blank" aria-label="Google Scholar" class="social-link" data-v-b351dbb2><i class="fas fa-graduation-cap" data-v-b351dbb2></i></a><a href="https://github.com/mlnomadpy" target="_blank" aria-label="GitHub" class="social-link" data-v-b351dbb2><i class="fab fa-github" data-v-b351dbb2></i></a><a href="https://linkedin.com/in/Tahabsn" target="_blank" aria-label="LinkedIn" class="social-link" data-v-b351dbb2><i class="fab fa-linkedin" data-v-b351dbb2></i></a><a href="mailto:contact@tahabouhsine.com" aria-label="Email" class="social-link" data-v-b351dbb2><i class="fas fa-envelope" data-v-b351dbb2></i></a><a href="https://www.tahabouhsine.com" target="_blank" aria-label="Personal Website" class="social-link" data-v-b351dbb2><i class="fas fa-globe" data-v-b351dbb2></i></a></div>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/home/SocialLinks.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const SocialLinks = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender$2], ["__scopeId", "data-v-b351dbb2"]]);
const _imports_0 = "/assets/background-video-CHy6DrbX.mp4";
const _sfc_main$1 = {
  name: "HeroSection",
  components: {
    SocialLinks
  }
};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_SocialLinks = resolveComponent("SocialLinks");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "hero-sec" }, _attrs))} data-v-211f213d><video autoplay muted loop playsinline data-v-211f213d><source${ssrRenderAttr("src", _imports_0)} type="video/mp4" onerror="this.parentElement.remove()" data-v-211f213d></video><div class="center-content" data-v-211f213d><div class="circle-text" data-v-211f213d><h1 data-v-211f213d>Taha Bouhsine</h1><p data-v-211f213d>ML Researcher &amp; Engineer</p><a href="https://linkedin.com/in/Tahabsn" target="_blank" class="join-btn" data-v-211f213d>Connect</a>`);
  _push(ssrRenderComponent(_component_SocialLinks, null, null, _parent));
  _push(`</div></div></div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/home/HeroSection.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const HeroSection = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1], ["__scopeId", "data-v-211f213d"]]);
const _sfc_main = {
  name: "HomeView",
  components: {
    HeroSection
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_HeroSection = resolveComponent("HeroSection");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "home" }, _attrs))} data-v-d29dbeeb>`);
  _push(ssrRenderComponent(_component_HeroSection, null, null, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/HomeView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const HomeView = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-d29dbeeb"]]);
const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView
  },
  {
    path: "/aboutme",
    name: "aboutme",
    component: () => import("./assets/AboutMeView-B-O9YA-P.js")
  },
  {
    path: "/research",
    name: "research",
    component: () => import("./assets/ResearchView-jj5xYo8t.js")
  },
  {
    path: "/talks",
    name: "talks",
    component: () => import("./assets/TalksView-DMNF4c-N.js")
  },
  {
    path: "/talks/:id",
    name: "TalkDetails",
    component: () => import("./assets/TalkDetailsView-DJgJ74Bs.js"),
    props: true
  },
  {
    path: "/poetry",
    name: "poetry",
    component: () => import("./assets/PoetryView-DHm9HRS0.js")
  },
  {
    path: "/blogs",
    name: "blogs",
    component: () => import("./assets/BlogsView-Dx8b4qWw.js")
  },
  {
    path: "/life",
    name: "life",
    component: () => import("./assets/LifeView-B5NUMfBT.js")
  }
];
const createApp = ViteSSG(
  App,
  {
    routes,
    base: "/",
    history: createWebHashHistory()
  },
  ({ app, router, routes: routes2, isClient, initialState }) => {
  }
);
export {
  _export_sfc as _,
  createApp
};
