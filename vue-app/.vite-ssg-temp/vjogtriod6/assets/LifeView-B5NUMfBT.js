import { mergeProps, useSSRContext, resolveComponent } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderClass, ssrRenderAttr, ssrRenderList, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "../main.mjs";
import "vite-ssg";
import "vue-router";
import "@vueuse/head";
const _sfc_main$2 = {
  name: "LifeToolbar",
  props: {
    totalEvents: {
      type: Number,
      default: 0
    },
    activeYearRange: {
      type: String,
      default: ""
    },
    showFilters: {
      type: Boolean,
      default: false
    },
    selectedCategory: {
      type: String,
      default: "all"
    },
    categories: {
      type: Array,
      default: () => []
    }
  },
  emits: ["update:showFilters", "update:selectedCategory", "reset-filters"],
  methods: {
    formatCategory(category) {
      return category.charAt(0).toUpperCase() + category.slice(1);
    }
  }
};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({
    class: "life-toolbar",
    role: "region",
    "aria-label": "Life events controls"
  }, _attrs))} data-v-6d3693d9><div class="toolbar-header" data-v-6d3693d9><div class="timeline-stats" aria-label="Timeline statistics" data-v-6d3693d9><span data-v-6d3693d9>${ssrInterpolate($props.totalEvents)} Events</span><span class="separator" aria-hidden="true" data-v-6d3693d9>•</span><span data-v-6d3693d9>${ssrInterpolate($props.activeYearRange)}</span></div><button class="${ssrRenderClass([{ active: $props.showFilters }, "filter-toggle-btn"])}"${ssrRenderAttr("aria-expanded", $props.showFilters)} aria-controls="filter-panel" title="Toggle Filters" data-v-6d3693d9><i class="fas fa-filter" aria-hidden="true" data-v-6d3693d9></i><span class="desktop-only" data-v-6d3693d9>Filters</span></button></div>`);
  if ($props.showFilters) {
    _push(`<div id="filter-panel" class="filter-panel glass-panel" role="region" aria-label="Category filters" data-v-6d3693d9><div class="filter-header" data-v-6d3693d9><h3 data-v-6d3693d9>Categories</h3>`);
    if ($props.selectedCategory !== "all") {
      _push(`<button class="clear-filters-btn" aria-label="Clear all filters" data-v-6d3693d9> Clear </button>`);
    } else {
      _push(`<!---->`);
    }
    _push(`</div><div class="filter-buttons" role="group" aria-label="Filter by category" data-v-6d3693d9><button class="${ssrRenderClass({ active: $props.selectedCategory === "all" })}"${ssrRenderAttr("aria-pressed", $props.selectedCategory === "all")} data-v-6d3693d9><i class="fas fa-globe" aria-hidden="true" data-v-6d3693d9></i> All </button><!--[-->`);
    ssrRenderList($props.categories, (category) => {
      _push(`<button class="${ssrRenderClass({ active: $props.selectedCategory === category.name })}"${ssrRenderAttr("aria-pressed", $props.selectedCategory === category.name)} data-v-6d3693d9><i class="${ssrRenderClass(category.icon)}" aria-hidden="true" data-v-6d3693d9></i> ${ssrInterpolate($options.formatCategory(category.name))}</button>`);
    });
    _push(`<!--]--></div></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/life/LifeToolbar.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const LifeToolbar = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender$2], ["__scopeId", "data-v-6d3693d9"]]);
const _sfc_main$1 = {
  name: "LifeTimelineEvent",
  props: {
    event: {
      type: Object,
      required: true
    },
    position: {
      type: String,
      required: true,
      validator: (value) => ["left", "right"].includes(value)
    },
    isExpanded: {
      type: Boolean,
      default: false
    }
  },
  emits: ["toggle-expand"],
  methods: {
    formatCategory(category) {
      return category.charAt(0).toUpperCase() + category.slice(1);
    },
    getCategoryIcon(category) {
      const iconMap = {
        education: "fas fa-graduation-cap",
        career: "fas fa-briefcase",
        milestone: "fas fa-flag",
        travel: "fas fa-plane",
        personal: "fas fa-heart",
        award: "fas fa-trophy",
        project: "fas fa-code",
        publication: "fas fa-book"
      };
      return iconMap[category] || "fas fa-star";
    },
    handleImageError(e) {
      e.target.src = "https://i.imgur.com/TwYAtdu.png";
    }
  }
};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({
    class: ["timeline-event", [
      $props.position,
      `category-${$props.event.category}`,
      { "expanded": $props.isExpanded }
    ]],
    tabindex: "0",
    role: "button",
    "aria-expanded": $props.isExpanded,
    "aria-label": `${$props.event.title}, ${$props.event.date}. Click to ${$props.isExpanded ? "collapse" : "expand"}`
  }, _attrs))} data-v-e924d5cf><div class="timeline-dot" aria-hidden="true" data-v-e924d5cf><i class="${ssrRenderClass($options.getCategoryIcon($props.event.category))}" data-v-e924d5cf></i></div><div class="event-card" data-v-e924d5cf><div class="event-date" data-v-e924d5cf>${ssrInterpolate($props.event.date)}</div><div class="event-category" data-v-e924d5cf><i class="${ssrRenderClass($options.getCategoryIcon($props.event.category))}" aria-hidden="true" data-v-e924d5cf></i> ${ssrInterpolate($options.formatCategory($props.event.category))}</div><h3 class="event-title" data-v-e924d5cf>${ssrInterpolate($props.event.title)}</h3><div class="event-location" data-v-e924d5cf><i class="fas fa-map-marker-alt" aria-hidden="true" data-v-e924d5cf></i> ${ssrInterpolate($props.event.location)}</div>`);
  if ($props.event.image) {
    _push(`<div class="event-image" data-v-e924d5cf><img${ssrRenderAttr("src", $props.event.image)}${ssrRenderAttr("alt", `Image for ${$props.event.title}`)} loading="lazy" data-v-e924d5cf></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`<p class="event-description" data-v-e924d5cf>${ssrInterpolate($props.event.description)}</p>`);
  if ($props.event.highlights && $props.isExpanded) {
    _push(`<div class="event-highlights" data-v-e924d5cf><h4 data-v-e924d5cf><i class="fas fa-star" aria-hidden="true" data-v-e924d5cf></i> Highlights</h4><ul data-v-e924d5cf><!--[-->`);
    ssrRenderList($props.event.highlights, (highlight, i) => {
      _push(`<li data-v-e924d5cf>${ssrInterpolate(highlight)}</li>`);
    });
    _push(`<!--]--></ul></div>`);
  } else {
    _push(`<!---->`);
  }
  if ($props.event.link && $props.isExpanded) {
    _push(`<a${ssrRenderAttr("href", $props.event.link)} class="event-link" target="_blank" rel="noopener noreferrer" aria-label="Learn more about this event (opens in new tab)" data-v-e924d5cf><i class="fas fa-external-link-alt" aria-hidden="true" data-v-e924d5cf></i> Learn More </a>`);
  } else {
    _push(`<!---->`);
  }
  _push(`<div class="expand-indicator" aria-hidden="true" data-v-e924d5cf><i class="${ssrRenderClass($props.isExpanded ? "fas fa-chevron-up" : "fas fa-chevron-down")}" data-v-e924d5cf></i> ${ssrInterpolate($props.isExpanded ? "Show Less" : "Show More")}</div></div></div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/life/LifeTimelineEvent.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const LifeTimelineEvent = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1], ["__scopeId", "data-v-e924d5cf"]]);
const _sfc_main = {
  name: "LifeView",
  components: {
    LifeToolbar,
    LifeTimelineEvent
  },
  data() {
    return {
      lifeEvents: [],
      filteredEvents: [],
      categories: [],
      selectedCategory: "all",
      expandedEvents: [],
      isLoading: true,
      error: null,
      showFilters: false
    };
  },
  computed: {
    activeYearRange() {
      if (this.lifeEvents.length === 0) return "";
      const years = this.lifeEvents.map((event) => {
        const dateStr = event.date.toString();
        if (dateStr.includes("-")) {
          return dateStr.split("-").map((y) => parseInt(y));
        }
        return [parseInt(dateStr)];
      }).flat().filter((year) => !isNaN(year));
      if (years.length === 0) return "";
      const minYear = Math.min(...years);
      const maxYear = Math.max(...years);
      return `${minYear}-${maxYear}`;
    }
  },
  methods: {
    async loadLifeData() {
      try {
        this.isLoading = true;
        this.error = null;
        const lifeData = await import("./life-D4lJpZvp.js");
        this.lifeEvents = lifeData.default || lifeData;
        this.lifeEvents.sort((a, b) => {
          const getLastYear = (date) => {
            if (typeof date !== "string") return 0;
            const parts = date.split("-");
            return parseInt(parts[parts.length - 1]);
          };
          const yearA = getLastYear(a.date);
          const yearB = getLastYear(b.date);
          return yearB - yearA;
        });
        const categoryIcons = {
          education: "fas fa-graduation-cap",
          career: "fas fa-briefcase",
          milestone: "fas fa-flag",
          travel: "fas fa-plane",
          personal: "fas fa-heart",
          award: "fas fa-trophy",
          project: "fas fa-code",
          publication: "fas fa-book"
        };
        const categoriesSet = new Set(this.lifeEvents.map((event) => event.category));
        this.categories = Array.from(categoriesSet).map((category) => ({
          name: category,
          icon: categoryIcons[category] || "fas fa-star"
        }));
        this.filteredEvents = [...this.lifeEvents];
        this.isLoading = false;
      } catch (error) {
        console.error("Error loading life data:", error);
        this.error = "Failed to load life events. Please try again later.";
        this.isLoading = false;
      }
    },
    filterByCategory(category) {
      this.selectedCategory = category;
      if (category === "all") {
        this.filteredEvents = [...this.lifeEvents];
      } else {
        this.filteredEvents = this.lifeEvents.filter((event) => event.category === category);
      }
      this.expandedEvents = [];
    },
    toggleEventExpansion(eventId) {
      const index = this.expandedEvents.indexOf(eventId);
      if (index === -1) {
        this.expandedEvents.push(eventId);
      } else {
        this.expandedEvents.splice(index, 1);
      }
    }
  },
  mounted() {
    this.loadLifeData();
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_LifeToolbar = resolveComponent("LifeToolbar");
  const _component_LifeTimelineEvent = resolveComponent("LifeTimelineEvent");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "life view-container" }, _attrs))} data-v-822f2b70><div class="section-content scrollable-content smooth-scroll" data-v-822f2b70><h1 class="resp-heading" data-v-822f2b70>Life</h1><div class="life-container" data-v-822f2b70>`);
  if ($data.isLoading) {
    _push(`<div class="loading-container" role="status" aria-live="polite" data-v-822f2b70><div class="loader" data-v-822f2b70></div><p data-v-822f2b70>Loading life events...</p></div>`);
  } else if ($data.error) {
    _push(`<div class="error-container" role="alert" data-v-822f2b70><div class="error-icon" data-v-822f2b70><i class="fas fa-exclamation-circle" aria-hidden="true" data-v-822f2b70></i></div><h3 data-v-822f2b70>${ssrInterpolate($data.error)}</h3><button class="retry-btn" data-v-822f2b70><i class="fas fa-redo" aria-hidden="true" data-v-822f2b70></i> Retry </button></div>`);
  } else {
    _push(`<!--[-->`);
    _push(ssrRenderComponent(_component_LifeToolbar, {
      totalEvents: $data.lifeEvents.length,
      activeYearRange: $options.activeYearRange,
      showFilters: $data.showFilters,
      "onUpdate:showFilters": ($event) => $data.showFilters = $event,
      selectedCategory: $data.selectedCategory,
      categories: $data.categories,
      "onUpdate:selectedCategory": $options.filterByCategory,
      onResetFilters: ($event) => $options.filterByCategory("all")
    }, null, _parent));
    _push(`<div class="timeline-container" data-v-822f2b70><div class="timeline-line" aria-hidden="true" data-v-822f2b70></div><!--[-->`);
    ssrRenderList($data.filteredEvents, (event, index) => {
      _push(ssrRenderComponent(_component_LifeTimelineEvent, {
        key: event.id,
        event,
        position: index % 2 === 0 ? "left" : "right",
        isExpanded: $data.expandedEvents.includes(event.id),
        onToggleExpand: ($event) => $options.toggleEventExpansion(event.id)
      }, null, _parent));
    });
    _push(`<!--]-->`);
    if ($data.filteredEvents.length === 0) {
      _push(`<div class="no-events" role="status" data-v-822f2b70><div class="no-events-icon" data-v-822f2b70><i class="fas fa-search" aria-hidden="true" data-v-822f2b70></i></div><h3 data-v-822f2b70>No events found</h3><p data-v-822f2b70>Try selecting a different category</p><button class="reset-filter-btn" data-v-822f2b70><i class="fas fa-redo" aria-hidden="true" data-v-822f2b70></i> Show All Events </button></div>`);
    } else {
      _push(`<!---->`);
    }
    _push(`</div><!--]-->`);
  }
  _push(`</div></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/LifeView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const LifeView = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-822f2b70"]]);
export {
  LifeView as default
};
