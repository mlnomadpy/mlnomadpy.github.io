import { resolveComponent, mergeProps, withCtx, createTextVNode, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderAttr } from "vue/server-renderer";
import { _ as _export_sfc } from "../main.mjs";
import "vite-ssg";
import "vue-router";
import "@vueuse/head";
const _sfc_main = {
  name: "TalkDetailsView",
  props: ["id"],
  data() {
    return {
      talk: null,
      loading: true,
      error: null
    };
  },
  computed: {
    hasResources() {
      return this.talk && (this.talk.slides || this.talk.kaggle_notebook || this.talk.github_gist || this.talk.link && !this.talk.link.includes("youtube"));
    }
  },
  watch: {
    id: {
      immediate: true,
      handler() {
        this.loadTalk();
      }
    }
  },
  methods: {
    extractGistUrl(gistHtml) {
      const match = gistHtml.match(/src=['"]([^'"]+)['"]/);
      if (match) {
        return match[1].replace(".js", "");
      }
      return "#";
    },
    async loadTalk() {
      this.loading = true;
      this.error = null;
      try {
        const talksData = await import("./talks-DvPJXkc9.js");
        const talks = talksData.default || talksData;
        const slug = this.id;
        const foundTalk = talks.find((t) => {
          const tSlug = t.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
          return tSlug === slug;
        });
        if (foundTalk) {
          this.talk = foundTalk;
        } else {
          this.error = "Talk not found";
        }
      } catch (err) {
        console.error(err);
        this.error = "Failed to load talk details";
      } finally {
        this.loading = false;
      }
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_router_link = resolveComponent("router-link");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "talk-details-view view-container" }, _attrs))} data-v-a2226d3f><div class="section-content scrollable-content smooth-scroll" data-v-a2226d3f>`);
  if ($data.loading) {
    _push(`<div class="loading-container" data-v-a2226d3f><div class="loader" data-v-a2226d3f></div><p data-v-a2226d3f>Loading talk details...</p></div>`);
  } else if ($data.error) {
    _push(`<div class="error-container" data-v-a2226d3f><i class="fas fa-exclamation-circle" data-v-a2226d3f></i><h3 data-v-a2226d3f>${ssrInterpolate($data.error)}</h3><button class="retry-btn" data-v-a2226d3f>Retry</button>`);
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
  } else if ($data.talk) {
    _push(`<div class="talk-content" data-v-a2226d3f>`);
    _push(ssrRenderComponent(_component_router_link, {
      to: "/talks",
      class: "back-btn"
    }, {
      default: withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(`<i class="fas fa-arrow-left" data-v-a2226d3f${_scopeId}></i> Back to Talks `);
        } else {
          return [
            createVNode("i", { class: "fas fa-arrow-left" }),
            createTextVNode(" Back to Talks ")
          ];
        }
      }),
      _: 1
    }, _parent));
    _push(`<div class="talk-hero" data-v-a2226d3f><div class="media-container" data-v-a2226d3f>`);
    if ($data.talk.link && $data.talk.link.includes("youtube")) {
      _push(`<iframe${ssrRenderAttr("src", $data.talk.link)} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen class="hero-video" data-v-a2226d3f></iframe>`);
    } else {
      _push(`<img${ssrRenderAttr("src", $data.talk.thumbnail)}${ssrRenderAttr("alt", $data.talk.title)} class="hero-image" data-v-a2226d3f>`);
    }
    _push(`</div></div><div class="talk-header" data-v-a2226d3f><h1 data-v-a2226d3f>${ssrInterpolate($data.talk.title)}</h1><div class="meta-info" data-v-a2226d3f><span class="organization" data-v-a2226d3f><i class="fas fa-building" data-v-a2226d3f></i> ${ssrInterpolate($data.talk.organization)}</span>`);
    if ($data.talk.type) {
      _push(`<span class="type" data-v-a2226d3f><i class="fas fa-tag" data-v-a2226d3f></i> ${ssrInterpolate($data.talk.type)}</span>`);
    } else {
      _push(`<!---->`);
    }
    _push(`</div></div><div class="content-container" data-v-a2226d3f><div class="description-card glass-card" data-v-a2226d3f><h2 data-v-a2226d3f>About this Talk</h2><div class="description-text" data-v-a2226d3f>${$data.talk.description ?? ""}</div></div>`);
    if ($options.hasResources) {
      _push(`<div class="resources-card glass-card" data-v-a2226d3f><h2 data-v-a2226d3f>Resources</h2><div class="links-grid" data-v-a2226d3f>`);
      if ($data.talk.slides) {
        _push(`<a${ssrRenderAttr("href", $data.talk.slides)} target="_blank" class="resource-link slides" data-v-a2226d3f><i class="fas fa-file-powerpoint" data-v-a2226d3f></i><span data-v-a2226d3f>Slides</span></a>`);
      } else {
        _push(`<!---->`);
      }
      if ($data.talk.kaggle_notebook) {
        _push(`<a${ssrRenderAttr("href", $data.talk.kaggle_notebook)} target="_blank" class="resource-link kaggle" data-v-a2226d3f><i class="fab fa-kaggle" data-v-a2226d3f></i><span data-v-a2226d3f>Kaggle Notebook</span></a>`);
      } else {
        _push(`<!---->`);
      }
      if ($data.talk.github_gist) {
        _push(`<a${ssrRenderAttr("href", $options.extractGistUrl($data.talk.github_gist))} target="_blank" class="resource-link github" data-v-a2226d3f><i class="fab fa-github" data-v-a2226d3f></i><span data-v-a2226d3f>Gist / Code</span></a>`);
      } else {
        _push(`<!---->`);
      }
      if ($data.talk.link && !$data.talk.link.includes("youtube")) {
        _push(`<a${ssrRenderAttr("href", $data.talk.link)} target="_blank" class="resource-link external" data-v-a2226d3f><i class="fas fa-external-link-alt" data-v-a2226d3f></i><span data-v-a2226d3f>Watch Video</span></a>`);
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
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/TalkDetailsView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const TalkDetailsView = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-a2226d3f"]]);
export {
  TalkDetailsView as default
};
