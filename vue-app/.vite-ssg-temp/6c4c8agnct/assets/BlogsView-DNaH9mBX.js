import { g as getAllBlogs } from "./blog-loader-5S2wA13P.js";
import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderClass, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { _ as _export_sfc } from "../main.mjs";
import "markdown-it";
import "markdown-it-katex";
import "gray-matter";
import "vite-ssg";
import "vue-router";
import "@vueuse/head";
import "buffer";
const _sfc_main = {
  name: "BlogsView",
  data() {
    return {
      blogs: [],
      loading: true,
      searchQuery: "",
      viewMode: "list"
    };
  },
  computed: {
    filteredBlogs() {
      if (!this.searchQuery) return this.blogs;
      const query = this.searchQuery.toLowerCase();
      return this.blogs.filter(
        (blog) => blog.title.toLowerCase().includes(query) || blog.excerpt.toLowerCase().includes(query) || blog.tags && blog.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }
  },
  async mounted() {
    try {
      this.blogs = await getAllBlogs();
    } catch (error) {
      console.error("Failed to load blogs:", error);
    } finally {
      this.loading = false;
    }
  },
  methods: {
    navigateToBlog(id) {
      this.$router.push({
        name: "BlogDetails",
        params: { id }
      });
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "blogs view-container" }, _attrs))} data-v-d8554a75><div class="section-content scrollable-content smooth-scroll custom-scroll" data-v-d8554a75><h1 class="resp-heading" data-v-d8554a75>Blogs</h1><div class="blogs-wrapper" data-v-d8554a75><div class="blogs-toolbar" data-v-d8554a75><div class="search-box" data-v-d8554a75><i class="fas fa-search" data-v-d8554a75></i><input type="text"${ssrRenderAttr("value", $data.searchQuery)} placeholder="Search blogs..." data-v-d8554a75></div><div class="view-toggle" data-v-d8554a75><button class="${ssrRenderClass({ active: $data.viewMode === "grid" })}" title="Grid View" data-v-d8554a75><i class="fas fa-th-large" data-v-d8554a75></i></button><button class="${ssrRenderClass({ active: $data.viewMode === "list" })}" title="List View" data-v-d8554a75><i class="fas fa-list" data-v-d8554a75></i></button></div></div>`);
  if ($data.loading) {
    _push(`<div class="loading-state" data-v-d8554a75><div class="loader" data-v-d8554a75></div><p data-v-d8554a75>Loading posts...</p></div>`);
  } else if ($options.filteredBlogs.length === 0) {
    _push(`<div class="empty-state" data-v-d8554a75><i class="fas fa-feather-alt" data-v-d8554a75></i><p data-v-d8554a75>No blog posts found.</p></div>`);
  } else if ($data.viewMode === "grid") {
    _push(`<div class="blogs-grid" data-v-d8554a75><!--[-->`);
    ssrRenderList($options.filteredBlogs, (blog) => {
      _push(`<div class="blog-card glass-card" data-v-d8554a75><div class="blog-card-content" data-v-d8554a75><div class="blog-meta" data-v-d8554a75>`);
      if (blog.author) {
        _push(`<span class="author" data-v-d8554a75>by ${ssrInterpolate(blog.author)}</span>`);
      } else {
        _push(`<!---->`);
      }
      if (blog.tags && blog.tags.length) {
        _push(`<div class="tags" data-v-d8554a75><!--[-->`);
        ssrRenderList(blog.tags.slice(0, 2), (tag) => {
          _push(`<span class="tag-sm" data-v-d8554a75>${ssrInterpolate(tag)}</span>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><h2 data-v-d8554a75>${ssrInterpolate(blog.title)}</h2><div class="read-more" data-v-d8554a75><span data-v-d8554a75>Read Article</span><i class="fas fa-arrow-right" data-v-d8554a75></i></div></div></div>`);
    });
    _push(`<!--]--></div>`);
  } else {
    _push(`<div class="blogs-list" data-v-d8554a75><!--[-->`);
    ssrRenderList($options.filteredBlogs, (blog) => {
      _push(`<div class="blog-list-item glass-card" data-v-d8554a75><h3 class="list-title" data-v-d8554a75>${ssrInterpolate(blog.title)}</h3><i class="fas fa-chevron-right list-arrow" data-v-d8554a75></i></div>`);
    });
    _push(`<!--]--></div>`);
  }
  _push(`</div></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/BlogsView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const BlogsView = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-d8554a75"]]);
export {
  BlogsView as default
};
