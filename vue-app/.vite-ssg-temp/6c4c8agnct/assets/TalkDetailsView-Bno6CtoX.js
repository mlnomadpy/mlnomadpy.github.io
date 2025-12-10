import { ref, computed, watch, resolveComponent, mergeProps, withCtx, createTextVNode, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderAttr } from "vue/server-renderer";
import { useHead } from "@vueuse/head";
import { useRoute } from "vue-router";
import { _ as _export_sfc } from "../main.mjs";
import "vite-ssg";
import "buffer";
const __default__ = {
  name: "TalkDetailsView"
};
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __ssrInlineRender: true,
  props: ["id"],
  setup(__props) {
    const props = __props;
    useRoute();
    const talk = ref(null);
    const loading = ref(true);
    const error = ref(null);
    const hasResources = computed(() => {
      const t = talk.value;
      return t && (t.slides || t.kaggle_notebook || t.github_gist || t.link && !t.link.includes("youtube"));
    });
    const hasDescription = computed(() => {
      const t = talk.value;
      if (!t || !t.description) return false;
      const desc = t.description.trim();
      return desc !== "" && desc !== "." && desc !== "TBD" && desc !== "<p>.</p>";
    });
    const pageTitle = computed(() => talk.value ? talk.value.title : "Talk Details");
    const pageDescription = computed(() => talk.value ? `Talk at ${talk.value.organization}: ${talk.value.title}` : "Presentation details");
    const pageImage = computed(() => talk.value ? talk.value.thumbnail : null);
    useHead({
      title: pageTitle,
      meta: [
        { name: "description", content: pageDescription },
        { property: "og:title", content: pageTitle },
        { property: "og:description", content: pageDescription },
        { property: "og:image", content: pageImage }
      ]
    });
    watch(() => props.id, (newId) => {
      if (newId) loadTalk();
    }, { immediate: true });
    async function loadTalk() {
      loading.value = true;
      error.value = null;
      console.log("Loading talk with ID:", props.id);
      try {
        const talksData = await import("./talks-DvPJXkc9.js");
        const talks = talksData.default || talksData;
        const slug = props.id;
        const foundTalk = talks.find((t) => {
          const tSlug = t.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
          return tSlug === slug;
        });
        console.log("Found talk:", foundTalk);
        if (foundTalk) {
          talk.value = foundTalk;
        } else {
          error.value = "Talk not found";
          console.warn("Talk not found for slug:", slug);
        }
      } catch (err) {
        console.error("Error loading talk:", err);
        error.value = "Failed to load talk details";
      } finally {
        loading.value = false;
      }
    }
    function extractGistUrl(gistHtml) {
      if (!gistHtml) return "#";
      const match = gistHtml.match(/src=['"]([^'"]+)['"]/);
      if (match) {
        return match[1].replace(".js", "");
      }
      return "#";
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_router_link = resolveComponent("router-link");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "talk-details-view view-container" }, _attrs))} data-v-e383edee><div class="section-content scrollable-content smooth-scroll" data-v-e383edee>`);
      if (loading.value) {
        _push(`<div class="loading-container" data-v-e383edee><div class="loader" data-v-e383edee></div><p data-v-e383edee>Loading talk details...</p></div>`);
      } else if (error.value) {
        _push(`<div class="error-container" data-v-e383edee><i class="fas fa-exclamation-circle" data-v-e383edee></i><h3 data-v-e383edee>${ssrInterpolate(error.value)}</h3><button class="retry-btn" data-v-e383edee>Retry</button>`);
        _push(ssrRenderComponent(_component_router_link, {
          to: "/talks",
          class: "back-link"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Back to Talks`);
            } else {
              return [
                createTextVNode("Back to Talks")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else if (talk.value) {
        _push(`<div class="talk-details-content" data-v-e383edee>`);
        _push(ssrRenderComponent(_component_router_link, {
          to: "/talks",
          class: "back-btn"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<i class="fas fa-arrow-left" data-v-e383edee${_scopeId}></i> Back to Talks `);
            } else {
              return [
                createVNode("i", { class: "fas fa-arrow-left" }),
                createTextVNode(" Back to Talks ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<div class="talk-hero" data-v-e383edee><div class="media-container" data-v-e383edee>`);
        if (talk.value.link && talk.value.link.includes("youtube")) {
          _push(`<iframe${ssrRenderAttr("src", talk.value.link)} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen class="hero-video" data-v-e383edee></iframe>`);
        } else {
          _push(`<img${ssrRenderAttr("src", talk.value.thumbnail)}${ssrRenderAttr("alt", talk.value.title)} class="hero-image" data-v-e383edee>`);
        }
        _push(`</div></div><div class="talk-header" data-v-e383edee><h1 data-v-e383edee>${ssrInterpolate(talk.value.title)}</h1><div class="meta-info" data-v-e383edee><span class="organization" data-v-e383edee><i class="fas fa-building" data-v-e383edee></i> ${ssrInterpolate(talk.value.organization)}</span>`);
        if (talk.value.type) {
          _push(`<span class="type" data-v-e383edee><i class="fas fa-tag" data-v-e383edee></i> ${ssrInterpolate(talk.value.type)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div><div class="content-container" data-v-e383edee>`);
        if (hasDescription.value) {
          _push(`<div class="description-card glass-card" data-v-e383edee><h2 data-v-e383edee>About this Talk</h2><div class="description-text" data-v-e383edee>${talk.value.description ?? ""}</div></div>`);
        } else {
          _push(`<!---->`);
        }
        if (hasResources.value) {
          _push(`<div class="resources-card glass-card" data-v-e383edee><h2 data-v-e383edee>Resources</h2><div class="links-grid" data-v-e383edee>`);
          if (talk.value.slides) {
            _push(`<a${ssrRenderAttr("href", talk.value.slides)} target="_blank" class="resource-link slides" data-v-e383edee><i class="fas fa-file-powerpoint" data-v-e383edee></i><span data-v-e383edee>Slides</span></a>`);
          } else {
            _push(`<!---->`);
          }
          if (talk.value.kaggle_notebook) {
            _push(`<a${ssrRenderAttr("href", talk.value.kaggle_notebook)} target="_blank" class="resource-link kaggle" data-v-e383edee><i class="fab fa-kaggle" data-v-e383edee></i><span data-v-e383edee>Kaggle Notebook</span></a>`);
          } else {
            _push(`<!---->`);
          }
          if (talk.value.github_gist) {
            _push(`<a${ssrRenderAttr("href", extractGistUrl(talk.value.github_gist))} target="_blank" class="resource-link github" data-v-e383edee><i class="fab fa-github" data-v-e383edee></i><span data-v-e383edee>Gist / Code</span></a>`);
          } else {
            _push(`<!---->`);
          }
          if (talk.value.link && !talk.value.link.includes("youtube")) {
            _push(`<a${ssrRenderAttr("href", talk.value.link)} target="_blank" class="resource-link external" data-v-e383edee><i class="fas fa-external-link-alt" data-v-e383edee></i><span data-v-e383edee>Watch Video</span></a>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/TalkDetailsView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const TalkDetailsView = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e383edee"]]);
export {
  TalkDetailsView as default
};
