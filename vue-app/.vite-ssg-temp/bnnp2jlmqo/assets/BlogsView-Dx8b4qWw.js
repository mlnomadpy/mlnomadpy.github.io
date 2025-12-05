import { mergeProps, useSSRContext, resolveComponent } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "../main.mjs";
import "vite-ssg";
import "vue-router";
import "@vueuse/head";
const _sfc_main$1 = {
  name: "ConstructionMessage"
};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "construction-message glass-panel" }, _attrs))} data-v-a8e861db><div class="icon-container" data-v-a8e861db><i class="fas fa-pen-fancy" data-v-a8e861db></i></div><h2 data-v-a8e861db>Thoughts in Progress</h2><p data-v-a8e861db>I&#39;m currently curating a collection of articles on Machine Learning, AI ethics, and software engineering. Check back soon for deep dives and tutorials.</p><div class="newsletter-signup" data-v-a8e861db><p data-v-a8e861db>Want to be notified when I publish?</p><div class="input-group" data-v-a8e861db><input type="email" placeholder="Enter your email" disabled aria-label="Email address for newsletter subscription" data-v-a8e861db><button class="btn-primary" disabled data-v-a8e861db>Subscribe</button></div><span class="coming-soon-badge" data-v-a8e861db>Coming Soon</span></div></div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/blogs/ConstructionMessage.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const ConstructionMessage = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1], ["__scopeId", "data-v-a8e861db"]]);
const _sfc_main = {
  name: "BlogsView",
  components: {
    ConstructionMessage
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_ConstructionMessage = resolveComponent("ConstructionMessage");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "blogs view-container" }, _attrs))} data-v-42d5a212><div class="section-content scrollable-content smooth-scroll" data-v-42d5a212><h1 class="resp-heading" data-v-42d5a212>Blogs</h1><div class="blogs-container" data-v-42d5a212>`);
  _push(ssrRenderComponent(_component_ConstructionMessage, null, null, _parent));
  _push(`</div></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/BlogsView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const BlogsView = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-42d5a212"]]);
export {
  BlogsView as default
};
