import poetryData from "./poetry-DaRPo7Xl.js";
import { mergeProps, useSSRContext, resolveComponent } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "../main.mjs";
import "vite-ssg";
import "vue-router";
import "@vueuse/head";
import "buffer";
const _sfc_main$1 = {
  name: "PoetryCard",
  props: {
    poem: {
      type: Object,
      required: true
    }
  },
  methods: {
    navigateToDetails() {
      this.$router.push({
        name: "PoetryDetails",
        params: { id: this.poem.id }
      });
    }
  }
};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "poetry-card" }, _attrs))} data-v-5fd31110><div class="card-header" data-v-5fd31110><h3 data-v-5fd31110>${ssrInterpolate($props.poem.title)}</h3><div class="card-meta" data-v-5fd31110><!--[-->`);
  ssrRenderList($props.poem.language, (lang) => {
    _push(`<span class="language-badge" data-v-5fd31110>${ssrInterpolate(lang)}</span>`);
  });
  _push(`<!--]--><span class="date-badge" data-v-5fd31110>${ssrInterpolate($props.poem.date)}</span></div><div class="expand-toggle" data-v-5fd31110><i class="fas fa-arrow-right" data-v-5fd31110></i></div></div></div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/poetry/PoetryCard.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const PoetryCard = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1], ["__scopeId", "data-v-5fd31110"]]);
const _sfc_main = {
  name: "PoetryView",
  components: {
    PoetryCard
  },
  data() {
    return {
      poems: poetryData
    };
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_PoetryCard = resolveComponent("PoetryCard");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "poetry view-container" }, _attrs))} data-v-0ea7fe74><div class="section-content scrollable-content" data-v-0ea7fe74><div class="poetry-container" data-v-0ea7fe74><!--[-->`);
  ssrRenderList($data.poems, (poem) => {
    _push(ssrRenderComponent(_component_PoetryCard, {
      key: poem.id,
      poem
    }, null, _parent));
  });
  _push(`<!--]--></div></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/PoetryView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const PoetryView = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-0ea7fe74"]]);
export {
  PoetryView as default
};
