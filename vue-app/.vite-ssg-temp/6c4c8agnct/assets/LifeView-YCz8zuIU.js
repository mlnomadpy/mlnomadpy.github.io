import { mergeProps, useSSRContext, resolveComponent } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderClass, ssrRenderAttr, ssrRenderList, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "../main.mjs";
import "vite-ssg";
import "vue-router";
import "@vueuse/head";
import "buffer";
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
      validator: (value) => ["top", "bottom"].includes(value)
    }
  },
  emits: ["select"],
  methods: {
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
    }
  }
};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({
    class: ["timeline-event", [
      `category-${$props.event.category}`,
      $props.position
    ]],
    tabindex: "0",
    role: "button",
    "aria-label": `${$props.event.title}, ${$props.event.date}. Click to view details`
  }, _attrs))} data-v-8c861a49><div class="timeline-dot" aria-hidden="true" data-v-8c861a49><i class="${ssrRenderClass($options.getCategoryIcon($props.event.category))}" data-v-8c861a49></i></div><div class="event-connector" aria-hidden="true" data-v-8c861a49></div><div class="event-card" data-v-8c861a49><div class="event-header" data-v-8c861a49><span class="event-date" data-v-8c861a49>${ssrInterpolate($props.event.date)}</span><i class="${ssrRenderClass([$options.getCategoryIcon($props.event.category), "category-icon"])}" aria-hidden="true" data-v-8c861a49></i></div><h3 class="event-title" data-v-8c861a49>${ssrInterpolate($props.event.title)}</h3>`);
  if ($props.event.location) {
    _push(`<div class="event-location" data-v-8c861a49><i class="fas fa-map-marker-alt" aria-hidden="true" data-v-8c861a49></i> ${ssrInterpolate($props.event.location)}</div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div></div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/life/LifeTimelineEvent.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const LifeTimelineEvent = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1], ["__scopeId", "data-v-8c861a49"]]);
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
      selectedEvent: null,
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
    },
    selectEvent(event) {
      this.selectedEvent = event;
      document.body.style.overflow = "hidden";
    },
    closeModal() {
      this.selectedEvent = null;
      document.body.style.overflow = "";
    },
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
    }
  },
  mounted() {
    this.loadLifeData();
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_LifeToolbar = resolveComponent("LifeToolbar");
  const _component_LifeTimelineEvent = resolveComponent("LifeTimelineEvent");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "life view-container" }, _attrs))} data-v-24a1a89c><div class="section-content" data-v-24a1a89c><h1 class="resp-heading" data-v-24a1a89c>Life</h1><div class="life-container" data-v-24a1a89c>`);
  if ($data.isLoading) {
    _push(`<div class="loading-container" role="status" aria-live="polite" data-v-24a1a89c><div class="loader" data-v-24a1a89c></div><p data-v-24a1a89c>Loading life events...</p></div>`);
  } else if ($data.error) {
    _push(`<div class="error-container" role="alert" data-v-24a1a89c><div class="error-icon" data-v-24a1a89c><i class="fas fa-exclamation-circle" aria-hidden="true" data-v-24a1a89c></i></div><h3 data-v-24a1a89c>${ssrInterpolate($data.error)}</h3><button class="retry-btn" data-v-24a1a89c><i class="fas fa-redo" aria-hidden="true" data-v-24a1a89c></i> Retry </button></div>`);
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
    _push(`<div class="timeline-scroll-container smooth-scroll" data-v-24a1a89c><div class="timeline-track" data-v-24a1a89c><div class="timeline-line" aria-hidden="true" data-v-24a1a89c></div><!--[-->`);
    ssrRenderList($data.filteredEvents, (event, index) => {
      _push(ssrRenderComponent(_component_LifeTimelineEvent, {
        key: event.id,
        event,
        position: index % 2 === 0 ? "top" : "bottom",
        onSelect: $options.selectEvent
      }, null, _parent));
    });
    _push(`<!--]-->`);
    if ($data.filteredEvents.length === 0) {
      _push(`<div class="no-events" role="status" data-v-24a1a89c><div class="no-events-icon" data-v-24a1a89c><i class="fas fa-search" aria-hidden="true" data-v-24a1a89c></i></div><h3 data-v-24a1a89c>No events found</h3><p data-v-24a1a89c>Try selecting a different category</p><button class="reset-filter-btn" data-v-24a1a89c><i class="fas fa-redo" aria-hidden="true" data-v-24a1a89c></i> Show All Events </button></div>`);
    } else {
      _push(`<!---->`);
    }
    _push(`</div></div><!--]-->`);
  }
  _push(`</div>`);
  if ($data.selectedEvent) {
    _push(`<div class="modal-overlay" data-v-24a1a89c><div class="modal-content glass-card" data-v-24a1a89c><button class="close-btn" aria-label="Close details" data-v-24a1a89c><i class="fas fa-times" data-v-24a1a89c></i></button><div class="modal-header" data-v-24a1a89c><span class="modal-date" data-v-24a1a89c>${ssrInterpolate($data.selectedEvent.date)}</span><span class="modal-category" data-v-24a1a89c><i class="${ssrRenderClass($options.getCategoryIcon($data.selectedEvent.category))}" data-v-24a1a89c></i> ${ssrInterpolate($options.formatCategory($data.selectedEvent.category))}</span></div><h2 class="modal-title" data-v-24a1a89c>${ssrInterpolate($data.selectedEvent.title)}</h2>`);
    if ($data.selectedEvent.location) {
      _push(`<div class="modal-location" data-v-24a1a89c><i class="fas fa-map-marker-alt" data-v-24a1a89c></i> ${ssrInterpolate($data.selectedEvent.location)}</div>`);
    } else {
      _push(`<!---->`);
    }
    if ($data.selectedEvent.image) {
      _push(`<div class="modal-image" data-v-24a1a89c><img${ssrRenderAttr("src", $data.selectedEvent.image)}${ssrRenderAttr("alt", $data.selectedEvent.title)} loading="lazy" data-v-24a1a89c></div>`);
    } else {
      _push(`<!---->`);
    }
    _push(`<div class="modal-body" data-v-24a1a89c><p class="modal-description" data-v-24a1a89c>${ssrInterpolate($data.selectedEvent.description)}</p>`);
    if ($data.selectedEvent.highlights) {
      _push(`<div class="modal-highlights" data-v-24a1a89c><h4 data-v-24a1a89c><i class="fas fa-star" data-v-24a1a89c></i> Highlights</h4><ul data-v-24a1a89c><!--[-->`);
      ssrRenderList($data.selectedEvent.highlights, (highlight, i) => {
        _push(`<li data-v-24a1a89c>${ssrInterpolate(highlight)}</li>`);
      });
      _push(`<!--]--></ul></div>`);
    } else {
      _push(`<!---->`);
    }
    if ($data.selectedEvent.link) {
      _push(`<a${ssrRenderAttr("href", $data.selectedEvent.link)} class="modal-link" target="_blank" rel="noopener noreferrer" data-v-24a1a89c><i class="fas fa-external-link-alt" data-v-24a1a89c></i> Learn More </a>`);
    } else {
      _push(`<!---->`);
    }
    _push(`</div></div></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/LifeView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const LifeView = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-24a1a89c"]]);
export {
  LifeView as default
};
