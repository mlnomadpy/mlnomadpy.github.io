import { mergeProps, useSSRContext, resolveComponent } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderClass, ssrRenderList, ssrInterpolate, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "../main.mjs";
import "vite-ssg";
import "vue-router";
import "@vueuse/head";
const _sfc_main$4 = {
  name: "SearchBar",
  props: {
    value: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: "Search..."
    }
  },
  data() {
    return {
      query: this.value
    };
  },
  watch: {
    value(newValue) {
      this.query = newValue;
    }
  },
  methods: {
    onInput() {
      this.$emit("input", this.query);
    },
    clearSearch() {
      this.query = "";
      this.$emit("input", "");
      this.$emit("clear");
    }
  }
};
function _sfc_ssrRender$4(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "research-search" }, _attrs))} data-v-7afa3117><div class="search-container" data-v-7afa3117><i class="fas fa-search search-icon" data-v-7afa3117></i><input type="text"${ssrRenderAttr("value", $data.query)}${ssrRenderAttr("placeholder", $props.placeholder)} class="search-input" data-v-7afa3117>`);
  if ($data.query) {
    _push(`<button class="clear-search" data-v-7afa3117><i class="fas fa-times" data-v-7afa3117></i></button>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div></div>`);
}
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/research/SearchBar.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const SearchBar = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["ssrRender", _sfc_ssrRender$4], ["__scopeId", "data-v-7afa3117"]]);
const _sfc_main$3 = {
  name: "CategoryFilter",
  props: {
    categories: {
      type: Array,
      required: true
    },
    value: {
      type: String,
      default: "All"
    }
  },
  computed: {
    selectedCategory() {
      return this.value;
    }
  },
  methods: {
    selectCategory(category) {
      this.$emit("input", category);
    },
    getCategoryIcon(category) {
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
  }
};
function _sfc_ssrRender$3(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "filter-buttons" }, _attrs))} data-v-fe2a70e2><button class="${ssrRenderClass({ active: $options.selectedCategory === "All" })}" data-v-fe2a70e2><i class="fas fa-globe" data-v-fe2a70e2></i> All </button><!--[-->`);
  ssrRenderList($props.categories, (category) => {
    _push(`<button class="${ssrRenderClass({ active: $options.selectedCategory === category })}" data-v-fe2a70e2><i class="${ssrRenderClass($options.getCategoryIcon(category))}" data-v-fe2a70e2></i> ${ssrInterpolate(category)}</button>`);
  });
  _push(`<!--]--></div>`);
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/research/CategoryFilter.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const CategoryFilter = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender$3], ["__scopeId", "data-v-fe2a70e2"]]);
const _sfc_main$2 = {
  name: "ResearchCard",
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      expanded: false
    };
  },
  methods: {
    toggleExpanded() {
      this.expanded = !this.expanded;
      this.$emit("toggle-expanded", {
        id: this.item.id,
        expanded: this.expanded
      });
    },
    getCategoryIcon(category) {
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
  }
};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({
    class: ["research-card mobile-tap-highlight", { "expanded": $data.expanded, "resp-card": true }]
  }, _attrs))} data-v-0befe0da><div class="research-header" data-v-0befe0da><div class="research-icon" data-v-0befe0da><i class="${ssrRenderClass($options.getCategoryIcon($props.item.category))}" data-v-0befe0da></i></div><div class="research-category-tag" data-v-0befe0da>${ssrInterpolate($props.item.category)}</div><div class="research-meta" data-v-0befe0da><span class="research-year" data-v-0befe0da>${ssrInterpolate($props.item.year)}</span><span class="research-status" data-v-0befe0da>${ssrInterpolate($props.item.status)}</span></div><h3 class="research-title resp-text-lg" data-v-0befe0da>${ssrInterpolate($props.item.title)}</h3><p class="research-author resp-text-sm" data-v-0befe0da>${ssrInterpolate($props.item.author)}</p><p class="research-summary resp-text-md" data-v-0befe0da>${ssrInterpolate($props.item.summary)}</p><div class="research-tags resp-gap-sm" data-v-0befe0da><!--[-->`);
  ssrRenderList($props.item.tags, (tag, index) => {
    _push(`<span class="tag resp-text-sm" data-v-0befe0da>${ssrInterpolate(tag)}</span>`);
  });
  _push(`<!--]--></div><div class="expand-indicator" data-v-0befe0da><i class="${ssrRenderClass($data.expanded ? "fas fa-chevron-up" : "fas fa-chevron-down")}" data-v-0befe0da></i><span class="resp-text-sm" data-v-0befe0da>${ssrInterpolate($data.expanded ? "Less Details" : "More Details")}</span></div></div>`);
  if ($data.expanded) {
    _push(`<div class="research-details smooth-scroll" data-v-0befe0da><div class="details-content" data-v-0befe0da><h4 class="resp-text-lg" data-v-0befe0da>Abstract</h4><p class="resp-text-md" data-v-0befe0da>${ssrInterpolate($props.item.details)}</p>`);
    if ($props.item.links && $props.item.links.length) {
      _push(`<div class="research-links" data-v-0befe0da><h4 class="resp-text-lg" data-v-0befe0da>Resources</h4><ul data-v-0befe0da><!--[-->`);
      ssrRenderList($props.item.links, (link, index) => {
        _push(`<li data-v-0befe0da><a${ssrRenderAttr("href", link.url)} target="_blank" class="resource-link touch-friendly resp-text-sm" data-v-0befe0da><i class="fas fa-external-link-alt" data-v-0befe0da></i> ${ssrInterpolate(link.text)}</a></li>`);
      });
      _push(`<!--]--></ul></div>`);
    } else {
      _push(`<!---->`);
    }
    _push(`</div><button class="close-btn touch-friendly resp-text-sm" data-v-0befe0da><i class="fas fa-times" data-v-0befe0da></i> Close </button></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/research/ResearchCard.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const ResearchCard = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender$2], ["__scopeId", "data-v-0befe0da"]]);
const _sfc_main$1 = {
  name: "NoResults"
};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "no-results" }, _attrs))} data-v-2637bc2d><div class="no-results-icon" data-v-2637bc2d><i class="fas fa-search" data-v-2637bc2d></i></div><h3 data-v-2637bc2d>No matching research found</h3><p data-v-2637bc2d>Try adjusting your search or filters to find what you&#39;re looking for.</p><button class="reset-filters-btn" data-v-2637bc2d><i class="fas fa-redo" data-v-2637bc2d></i> Reset Filters </button></div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/research/NoResults.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const NoResults = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1], ["__scopeId", "data-v-2637bc2d"]]);
const _sfc_main = {
  name: "ResearchView",
  components: {
    SearchBar,
    CategoryFilter,
    ResearchCard,
    NoResults
  },
  data() {
    return {
      research: [],
      categories: [],
      selectedCategory: "All",
      expandedItems: [],
      searchQuery: "",
      showFilters: false
    };
  },
  computed: {
    filteredResearch() {
      if (!this.searchQuery && this.selectedCategory === "All") {
        return this.research;
      }
      return this.research.filter((item) => {
        const matchesCategory = this.selectedCategory === "All" || item.category === this.selectedCategory;
        if (!this.searchQuery) {
          return matchesCategory;
        }
        const query = this.searchQuery.toLowerCase();
        const matchesSearch = item.title.toLowerCase().includes(query) || item.author.toLowerCase().includes(query) || item.summary.toLowerCase().includes(query) || item.details && item.details.toLowerCase().includes(query) || item.tags && item.tags.some((tag) => tag.toLowerCase().includes(query));
        return matchesCategory && matchesSearch;
      });
    }
  },
  methods: {
    clearSearch() {
      this.searchQuery = "";
    },
    resetFilters() {
      this.searchQuery = "";
      this.selectedCategory = "All";
      this.expandedItems = [];
    },
    handleExpandToggle({ id, expanded }) {
      if (expanded) {
        this.expandedItems = [id];
      } else {
        const index = this.expandedItems.indexOf(id);
        if (index !== -1) {
          this.expandedItems.splice(index, 1);
        }
      }
    },
    async loadResearchData() {
      try {
        const researchData = await import("./research-CnMysvNl.js");
        this.research = researchData.default || researchData;
        const categoriesSet = new Set(this.research.map((item) => item.category));
        this.categories = Array.from(categoriesSet);
      } catch (error) {
        console.error("Error loading research data:", error);
      }
    }
  },
  mounted() {
    this.loadResearchData();
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_SearchBar = resolveComponent("SearchBar");
  const _component_CategoryFilter = resolveComponent("CategoryFilter");
  const _component_ResearchCard = resolveComponent("ResearchCard");
  const _component_NoResults = resolveComponent("NoResults");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "research view-container" }, _attrs))} data-v-434cbfb9><div class="section-content scrollable-content smooth-scroll" data-v-434cbfb9><h1 class="resp-heading" data-v-434cbfb9>Research</h1><div class="research-wrapper" data-v-434cbfb9><div class="research-toolbar" data-v-434cbfb9><div class="search-group" data-v-434cbfb9>`);
  _push(ssrRenderComponent(_component_SearchBar, {
    modelValue: $data.searchQuery,
    "onUpdate:modelValue": ($event) => $data.searchQuery = $event,
    placeholder: "Search papers...",
    onClear: $options.clearSearch,
    class: "flex-grow"
  }, null, _parent));
  _push(`<button class="${ssrRenderClass([{ active: $data.showFilters }, "filter-toggle-btn"])}" title="Toggle Filters" data-v-434cbfb9><i class="fas fa-filter" data-v-434cbfb9></i><span class="desktop-only" data-v-434cbfb9>Filters</span></button></div>`);
  if ($data.showFilters) {
    _push(`<div class="filter-panel glass-panel" data-v-434cbfb9><div class="filter-header" data-v-434cbfb9><h3 data-v-434cbfb9>Categories</h3>`);
    if ($data.selectedCategory !== "All") {
      _push(`<button class="clear-filters-btn" data-v-434cbfb9> Clear </button>`);
    } else {
      _push(`<!---->`);
    }
    _push(`</div>`);
    _push(ssrRenderComponent(_component_CategoryFilter, {
      modelValue: $data.selectedCategory,
      "onUpdate:modelValue": ($event) => $data.selectedCategory = $event,
      categories: $data.categories
    }, null, _parent));
    _push(`<div class="stats-summary" data-v-434cbfb9> Showing ${ssrInterpolate($options.filteredResearch.length)} of ${ssrInterpolate($data.research.length)} publications </div></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div>`);
  if ($options.filteredResearch.length) {
    _push(`<div class="research-grid" data-v-434cbfb9><!--[-->`);
    ssrRenderList($options.filteredResearch, (item) => {
      _push(ssrRenderComponent(_component_ResearchCard, {
        key: item.id,
        item,
        onToggleExpanded: $options.handleExpandToggle
      }, null, _parent));
    });
    _push(`<!--]--></div>`);
  } else {
    _push(ssrRenderComponent(_component_NoResults, { onReset: $options.resetFilters }, null, _parent));
  }
  _push(`</div></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/ResearchView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ResearchView = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-434cbfb9"]]);
export {
  ResearchView as default
};
