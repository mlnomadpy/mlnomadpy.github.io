import { ref, computed, watch, resolveComponent, mergeProps, withCtx, createTextVNode, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderClass, ssrRenderList, ssrRenderAttr } from "vue/server-renderer";
import { useHead } from "@vueuse/head";
import { useRoute } from "vue-router";
import { _ as _export_sfc } from "../main.mjs";
import "vite-ssg";
import "buffer";
const __default__ = {
  name: "ResearchDetailsView"
};
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __ssrInlineRender: true,
  props: ["id"],
  setup(__props) {
    const props = __props;
    useRoute();
    const item = ref(null);
    const loading = ref(true);
    const error = ref(null);
    const pageTitle = computed(() => item.value ? item.value.title : "Research Details");
    const pageDescription = computed(() => item.value ? item.value.summary : "Detailed view of research publication.");
    useHead({
      title: pageTitle,
      meta: [
        { name: "description", content: pageDescription },
        { property: "og:title", content: pageTitle },
        { property: "og:description", content: pageDescription }
      ]
    });
    watch(() => props.id, (newId) => {
      if (newId) loadResearch();
    }, { immediate: true });
    async function loadResearch() {
      loading.value = true;
      error.value = null;
      try {
        const researchData = await import("./research-CnMysvNl.js");
        const research = researchData.default || researchData;
        const foundItem = research.find((r) => r.id === props.id);
        if (foundItem) {
          item.value = foundItem;
        } else {
          error.value = "Research item not found";
        }
      } catch (err) {
        console.error("Error loading research:", err);
        error.value = "Failed to load research details";
      } finally {
        loading.value = false;
      }
    }
    function formatDetails(text) {
      if (!text) return "";
      return text.replace(/\n/g, "<br>");
    }
    function getCategoryIcon(category) {
      const icons = {
        "Machine Learning": "fas fa-brain",
        "Deep Learning": "fas fa-network-wired",
        "Computer Vision": "fas fa-eye",
        "Natural Language Processing": "fas fa-language",
        "Reinforcement Learning": "fas fa-robot",
        "Data Science": "fas fa-chart-line",
        "Explainable AI": "fas fa-lightbulb",
        "Neural Networks": "fas fa-project-diagram",
        "Signal Processing": "fas fa-wave-square"
      };
      return icons[category] || "fas fa-microscope";
    }
    function getLinkIcon(text) {
      const lower = text.toLowerCase();
      if (lower.includes("github") || lower.includes("repo") || lower.includes("code")) return "fab fa-github";
      if (lower.includes("arxiv") || lower.includes("paper") || lower.includes("preprint")) return "fas fa-file-alt";
      if (lower.includes("demo") || lower.includes("interactive")) return "fas fa-play-circle";
      if (lower.includes("video") || lower.includes("youtube")) return "fab fa-youtube";
      if (lower.includes("slide") || lower.includes("presentation")) return "fas fa-file-powerpoint";
      return "fas fa-external-link-alt";
    }
    function getLinkClass(text) {
      const lower = text.toLowerCase();
      if (lower.includes("github") || lower.includes("repo")) return "github";
      if (lower.includes("arxiv") || lower.includes("paper")) return "paper";
      if (lower.includes("demo")) return "demo";
      return "external";
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_router_link = resolveComponent("router-link");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "research-details-view view-container" }, _attrs))} data-v-7b4ce166><div class="section-content scrollable-content smooth-scroll" data-v-7b4ce166>`);
      if (loading.value) {
        _push(`<div class="loading-container" data-v-7b4ce166><div class="loader" data-v-7b4ce166></div><p data-v-7b4ce166>Loading research details...</p></div>`);
      } else if (error.value) {
        _push(`<div class="error-container" data-v-7b4ce166><i class="fas fa-exclamation-circle" data-v-7b4ce166></i><h3 data-v-7b4ce166>${ssrInterpolate(error.value)}</h3><button class="retry-btn" data-v-7b4ce166>Retry</button>`);
        _push(ssrRenderComponent(_component_router_link, {
          to: "/research",
          class: "back-link"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Back to Research`);
            } else {
              return [
                createTextVNode("Back to Research")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else if (item.value) {
        _push(`<div class="research-details-content" data-v-7b4ce166>`);
        _push(ssrRenderComponent(_component_router_link, {
          to: "/research",
          class: "back-btn"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<i class="fas fa-arrow-left" data-v-7b4ce166${_scopeId}></i> Back to Research `);
            } else {
              return [
                createVNode("i", { class: "fas fa-arrow-left" }),
                createTextVNode(" Back to Research ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<div class="research-hero" data-v-7b4ce166><div class="hero-content" data-v-7b4ce166><div class="category-badge" data-v-7b4ce166><i class="${ssrRenderClass(getCategoryIcon(item.value.category))}" data-v-7b4ce166></i> ${ssrInterpolate(item.value.category)}</div><h1 data-v-7b4ce166>${ssrInterpolate(item.value.title)}</h1><div class="hero-meta" data-v-7b4ce166><span class="author" data-v-7b4ce166><i class="fas fa-user" data-v-7b4ce166></i> ${ssrInterpolate(item.value.author)}</span><span class="year" data-v-7b4ce166><i class="fas fa-calendar-alt" data-v-7b4ce166></i> ${ssrInterpolate(item.value.year)}</span><span class="status" data-v-7b4ce166><i class="fas fa-info-circle" data-v-7b4ce166></i> ${ssrInterpolate(item.value.status)}</span></div></div></div><div class="content-container" data-v-7b4ce166><div class="description-card glass-card" data-v-7b4ce166><h2 data-v-7b4ce166>Abstract &amp; Details</h2><div class="description-text" data-v-7b4ce166><p class="summary-highlight" data-v-7b4ce166>${ssrInterpolate(item.value.summary)}</p><div class="details-body" data-v-7b4ce166>${formatDetails(item.value.details) ?? ""}</div></div></div>`);
        if (item.value.tags && item.value.tags.length) {
          _push(`<div class="tags-card glass-card" data-v-7b4ce166><h2 data-v-7b4ce166>Keywords</h2><div class="tags-list" data-v-7b4ce166><!--[-->`);
          ssrRenderList(item.value.tags, (tag, index) => {
            _push(`<span class="tag" data-v-7b4ce166>${ssrInterpolate(tag)}</span>`);
          });
          _push(`<!--]--></div></div>`);
        } else {
          _push(`<!---->`);
        }
        if (item.value.links && item.value.links.length) {
          _push(`<div class="resources-card glass-card" data-v-7b4ce166><h2 data-v-7b4ce166>Resources</h2><div class="links-grid" data-v-7b4ce166><!--[-->`);
          ssrRenderList(item.value.links, (link, index) => {
            _push(`<a${ssrRenderAttr("href", link.url)} target="_blank" class="${ssrRenderClass([getLinkClass(link.text), "resource-link"])}" data-v-7b4ce166><i class="${ssrRenderClass(getLinkIcon(link.text))}" data-v-7b4ce166></i><span data-v-7b4ce166>${ssrInterpolate(link.text)}</span></a>`);
          });
          _push(`<!--]--></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/ResearchDetailsView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ResearchDetailsView = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-7b4ce166"]]);
export {
  ResearchDetailsView as default
};
