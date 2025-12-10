import { resolveComponent, mergeProps, withCtx, createTextVNode, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderList, ssrRenderClass } from "vue/server-renderer";
import { _ as _export_sfc } from "../main.mjs";
import "vite-ssg";
import "vue-router";
import "@vueuse/head";
import "buffer";
const _sfc_main = {
  name: "PoetryDetailsView",
  props: ["id"],
  data() {
    return {
      poem: null,
      loading: true,
      error: null
    };
  },
  watch: {
    id: {
      immediate: true,
      handler() {
        this.loadPoem();
      }
    }
  },
  methods: {
    async loadPoem() {
      this.loading = true;
      this.error = null;
      try {
        const poetryData = await import("./poetry-DaRPo7Xl.js");
        const poems = poetryData.default || poetryData;
        const foundPoem = poems.find((p) => p.id === this.id);
        if (foundPoem) {
          this.poem = foundPoem;
        } else {
          this.error = "Poem not found";
        }
      } catch (err) {
        console.error("Error loading poem:", err);
        this.error = "Failed to load poem details";
      } finally {
        this.loading = false;
      }
    },
    isRTL(text) {
      if (!text) return false;
      const rtlRegex = /[\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC]/;
      return rtlRegex.test(text);
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_router_link = resolveComponent("router-link");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "poetry-details-view view-container" }, _attrs))} data-v-cf895ed6><div class="section-content scrollable-content smooth-scroll" data-v-cf895ed6>`);
  if ($data.loading) {
    _push(`<div class="loading-container" data-v-cf895ed6><div class="loader" data-v-cf895ed6></div><p data-v-cf895ed6>Loading poem...</p></div>`);
  } else if ($data.error) {
    _push(`<div class="error-container" data-v-cf895ed6><i class="fas fa-exclamation-circle" data-v-cf895ed6></i><h3 data-v-cf895ed6>${ssrInterpolate($data.error)}</h3><button class="retry-btn" data-v-cf895ed6>Retry</button>`);
    _push(ssrRenderComponent(_component_router_link, {
      to: "/poetry",
      class: "back-link"
    }, {
      default: withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(`Back to Poetry`);
        } else {
          return [
            createTextVNode("Back to Poetry")
          ];
        }
      }),
      _: 1
    }, _parent));
    _push(`</div>`);
  } else if ($data.poem) {
    _push(`<div class="poetry-details-content" data-v-cf895ed6>`);
    _push(ssrRenderComponent(_component_router_link, {
      to: "/poetry",
      class: "back-btn"
    }, {
      default: withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(`<i class="fas fa-arrow-left" data-v-cf895ed6${_scopeId}></i> Back to Poetry `);
        } else {
          return [
            createVNode("i", { class: "fas fa-arrow-left" }),
            createTextVNode(" Back to Poetry ")
          ];
        }
      }),
      _: 1
    }, _parent));
    _push(`<div class="poetry-hero" data-v-cf895ed6><div class="hero-content" data-v-cf895ed6><div class="meta-badges" data-v-cf895ed6><!--[-->`);
    ssrRenderList($data.poem.language, (lang) => {
      _push(`<span class="lang-badge" data-v-cf895ed6>${ssrInterpolate(lang)}</span>`);
    });
    _push(`<!--]--></div><h1 data-v-cf895ed6>${ssrInterpolate($data.poem.title)}</h1><div class="hero-meta" data-v-cf895ed6><span class="date" data-v-cf895ed6><i class="fas fa-calendar-alt" data-v-cf895ed6></i> ${ssrInterpolate($data.poem.date)}</span></div></div></div><div class="content-container" data-v-cf895ed6><div class="poem-card glass-card" data-v-cf895ed6>`);
    if ($data.poem.description) {
      _push(`<div class="description-text" data-v-cf895ed6><p data-v-cf895ed6>${ssrInterpolate($data.poem.description)}</p></div>`);
    } else {
      _push(`<!---->`);
    }
    _push(`<div class="poem-body" data-v-cf895ed6><!--[-->`);
    ssrRenderList($data.poem.content, (line, index) => {
      _push(`<!--[-->`);
      if (line.type === "divider") {
        _push(`<div class="content-divider" data-v-cf895ed6><span data-v-cf895ed6>✦</span></div>`);
      } else {
        _push(`<p class="${ssrRenderClass([{ "rtl": $options.isRTL(line.text) }, "verse"])}" data-v-cf895ed6>${ssrInterpolate(line.text)}</p>`);
      }
      _push(`<!--]-->`);
    });
    _push(`<!--]--></div></div></div></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/PoetryDetailsView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const PoetryDetailsView = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-cf895ed6"]]);
export {
  PoetryDetailsView as default
};
