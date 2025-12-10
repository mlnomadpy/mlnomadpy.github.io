import { a as getBlogById } from "./blog-loader-5S2wA13P.js";
import { resolveComponent, mergeProps, withCtx, createTextVNode, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
import { _ as _export_sfc } from "../main.mjs";
import "markdown-it";
import "markdown-it-katex";
import "gray-matter";
import "vite-ssg";
import "vue-router";
import "@vueuse/head";
import "buffer";
const _sfc_main = {
  name: "BlogDetailsView",
  props: ["id"],
  data() {
    return {
      post: null,
      loading: true,
      error: null
    };
  },
  watch: {
    id: {
      immediate: true,
      handler() {
        this.loadPost();
      }
    }
  },
  methods: {
    async loadPost() {
      this.loading = true;
      this.error = null;
      try {
        const post = await getBlogById(this.id);
        if (post) {
          this.post = post;
        } else {
          this.error = "Blog post not found";
        }
      } catch (err) {
        console.error("Error loading blog post:", err);
        this.error = "Failed to load blog post";
      } finally {
        this.loading = false;
      }
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_router_link = resolveComponent("router-link");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "blog-details-view view-container" }, _attrs))} data-v-52a2c05f><div class="section-content scrollable-content smooth-scroll" data-v-52a2c05f>`);
  if ($data.loading) {
    _push(`<div class="loading-container" data-v-52a2c05f><div class="loader" data-v-52a2c05f></div><p data-v-52a2c05f>Loading post...</p></div>`);
  } else if ($data.error) {
    _push(`<div class="error-container" data-v-52a2c05f><i class="fas fa-exclamation-circle" data-v-52a2c05f></i><h3 data-v-52a2c05f>${ssrInterpolate($data.error)}</h3><button class="retry-btn" data-v-52a2c05f>Retry</button>`);
    _push(ssrRenderComponent(_component_router_link, {
      to: "/blogs",
      class: "back-link"
    }, {
      default: withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(`Back to Blogs`);
        } else {
          return [
            createTextVNode("Back to Blogs")
          ];
        }
      }),
      _: 1
    }, _parent));
    _push(`</div>`);
  } else if ($data.post) {
    _push(`<div class="blog-content-wrapper" data-v-52a2c05f>`);
    _push(ssrRenderComponent(_component_router_link, {
      to: "/blogs",
      class: "back-btn"
    }, {
      default: withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(`<i class="fas fa-arrow-left" data-v-52a2c05f${_scopeId}></i> Back to Blogs `);
        } else {
          return [
            createVNode("i", { class: "fas fa-arrow-left" }),
            createTextVNode(" Back to Blogs ")
          ];
        }
      }),
      _: 1
    }, _parent));
    _push(`<article class="blog-article glass-card" data-v-52a2c05f><header class="blog-header" data-v-52a2c05f>`);
    if ($data.post.tags && $data.post.tags.length) {
      _push(`<div class="meta-tags" data-v-52a2c05f><!--[-->`);
      ssrRenderList($data.post.tags, (tag) => {
        _push(`<span class="tag" data-v-52a2c05f>${ssrInterpolate(tag)}</span>`);
      });
      _push(`<!--]--></div>`);
    } else {
      _push(`<!---->`);
    }
    _push(`<h1 data-v-52a2c05f>${ssrInterpolate($data.post.title)}</h1><div class="blog-meta" data-v-52a2c05f><span class="date" data-v-52a2c05f><i class="fas fa-calendar-alt" data-v-52a2c05f></i> ${ssrInterpolate($data.post.date)}</span>`);
    if ($data.post.author) {
      _push(`<span class="author" data-v-52a2c05f><i class="fas fa-user" data-v-52a2c05f></i> ${ssrInterpolate($data.post.author)}</span>`);
    } else {
      _push(`<!---->`);
    }
    _push(`</div></header><div class="markdown-body" data-v-52a2c05f>${$data.post.html ?? ""}</div></article></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/BlogDetailsView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const BlogDetailsView = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-52a2c05f"]]);
export {
  BlogDetailsView as default
};
