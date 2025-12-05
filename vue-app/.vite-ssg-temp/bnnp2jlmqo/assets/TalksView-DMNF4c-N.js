import { mergeProps, useSSRContext, resolveComponent } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderClass, ssrRenderList, ssrInterpolate, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "../main.mjs";
import "vite-ssg";
import "vue-router";
import "@vueuse/head";
const _sfc_main$2 = {
  name: "TalksToolbar",
  props: {
    searchQuery: {
      type: String,
      default: ""
    },
    showFilters: {
      type: Boolean,
      default: false
    },
    selectedTopic: {
      type: String,
      default: "All"
    },
    topics: {
      type: Array,
      default: () => []
    },
    filteredCount: {
      type: Number,
      default: 0
    },
    totalCount: {
      type: Number,
      default: 0
    }
  },
  emits: ["update:searchQuery", "update:showFilters", "update:selectedTopic", "clear-search", "reset-filters"]
};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({
    class: "talks-toolbar",
    role: "search",
    "aria-label": "Talks search and filters"
  }, _attrs))} data-v-cd06724b><div class="search-group" data-v-cd06724b><div class="search-container flex-grow" data-v-cd06724b><i class="fas fa-search search-icon" aria-hidden="true" data-v-cd06724b></i><input type="text"${ssrRenderAttr("value", $props.searchQuery)} placeholder="Search talks..." class="search-input" aria-label="Search talks by title, description, or venue" data-v-cd06724b>`);
  if ($props.searchQuery) {
    _push(`<button class="clear-search" aria-label="Clear search" data-v-cd06724b><i class="fas fa-times" aria-hidden="true" data-v-cd06724b></i></button>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div><button class="${ssrRenderClass([{ active: $props.showFilters }, "filter-toggle-btn"])}"${ssrRenderAttr("aria-expanded", $props.showFilters)} aria-controls="filter-panel" title="Toggle Filters" data-v-cd06724b><i class="fas fa-filter" aria-hidden="true" data-v-cd06724b></i><span class="desktop-only" data-v-cd06724b>Filters</span></button></div>`);
  if ($props.showFilters) {
    _push(`<div id="filter-panel" class="filter-panel glass-panel" role="region" aria-label="Topic filters" data-v-cd06724b><div class="filter-header" data-v-cd06724b><h3 data-v-cd06724b>Topics</h3>`);
    if ($props.selectedTopic !== "All") {
      _push(`<button class="clear-filters-btn" aria-label="Clear all filters" data-v-cd06724b> Clear </button>`);
    } else {
      _push(`<!---->`);
    }
    _push(`</div><div class="filter-buttons" role="group" aria-label="Filter by topic" data-v-cd06724b><button class="${ssrRenderClass({ active: $props.selectedTopic === "All" })}"${ssrRenderAttr("aria-pressed", $props.selectedTopic === "All")} data-v-cd06724b><i class="fas fa-globe" aria-hidden="true" data-v-cd06724b></i> All </button><!--[-->`);
    ssrRenderList($props.topics, (topic) => {
      _push(`<button class="${ssrRenderClass({ active: $props.selectedTopic === topic })}"${ssrRenderAttr("aria-pressed", $props.selectedTopic === topic)} data-v-cd06724b>${ssrInterpolate(topic)}</button>`);
    });
    _push(`<!--]--></div><div class="stats-summary" aria-live="polite" data-v-cd06724b> Showing ${ssrInterpolate($props.filteredCount)} of ${ssrInterpolate($props.totalCount)} talks </div></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/talks/TalksToolbar.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const TalksToolbar = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender$2], ["__scopeId", "data-v-cd06724b"]]);
const _sfc_main$1 = {
  name: "TalkCard",
  props: {
    talk: {
      type: Object,
      required: true
    }
  },
  emits: ["select"],
  methods: {
    formatDate(dateStr) {
      if (!dateStr || typeof dateStr !== "string") return dateStr;
      try {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const monthYearMatch = dateStr.match(/([A-Za-z]+)\s+(\d{4})/);
        if (monthYearMatch) {
          const monthName = monthYearMatch[1];
          const month = months.findIndex((m) => m.toLowerCase().startsWith(monthName.toLowerCase())) + 1;
          const year = monthYearMatch[2];
          return `${month < 10 ? "0" + month : month}/${year}`;
        }
        const date = new Date(dateStr);
        if (!isNaN(date.getTime())) {
          return `${date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1}/${date.getFullYear()}`;
        }
        return dateStr;
      } catch (e) {
        console.error("Error formatting date:", e);
        return dateStr;
      }
    },
    getThumbnailUrl(talk) {
      if (talk.image && talk.image.trim() !== "") {
        return talk.image;
      }
      if (talk.thumbnail && talk.thumbnail.trim() !== "") {
        return talk.thumbnail;
      }
      if (talk.video && talk.video.includes("youtube")) {
        const videoId = this.extractYouTubeId(talk.video);
        if (videoId) {
          return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
        }
      }
      return "https://i.imgur.com/TwYAtdu.png";
    },
    extractYouTubeId(url) {
      if (!url) return null;
      let videoId = null;
      if (url.includes("v=")) {
        videoId = url.split("v=")[1];
        const ampersandPosition = videoId.indexOf("&");
        if (ampersandPosition !== -1) {
          videoId = videoId.substring(0, ampersandPosition);
        }
      } else if (url.includes("youtu.be/")) {
        videoId = url.split("youtu.be/")[1];
      } else if (url.includes("embed/")) {
        videoId = url.split("embed/")[1];
      }
      return videoId;
    }
  }
};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({
    class: "talk-card",
    tabindex: "0",
    role: "button",
    "aria-label": `View details for ${$props.talk.title}`
  }, _attrs))} data-v-dccee329><div class="talk-card-image" data-v-dccee329><img${ssrRenderAttr("src", $options.getThumbnailUrl($props.talk))}${ssrRenderAttr("alt", `Thumbnail for ${$props.talk.title}`)} loading="lazy" data-v-dccee329><div class="talk-overlay-info" data-v-dccee329><div class="talk-date" data-v-dccee329>${ssrInterpolate($options.formatDate($props.talk.date))}</div><div class="talk-indicators" aria-hidden="true" data-v-dccee329>`);
  if ($props.talk.video) {
    _push(`<div class="indicator video-indicator" title="Watch video" data-v-dccee329><i class="fas fa-play-circle" data-v-dccee329></i></div>`);
  } else {
    _push(`<!---->`);
  }
  if ($props.talk.slides) {
    _push(`<div class="indicator slides-indicator" title="View slides" data-v-dccee329><i class="fas fa-file-powerpoint" data-v-dccee329></i></div>`);
  } else {
    _push(`<!---->`);
  }
  if ($props.talk.kaggle_notebook) {
    _push(`<div class="indicator notebook-indicator" title="Explore notebook" data-v-dccee329><i class="fas fa-laptop-code" data-v-dccee329></i></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div></div></div><div class="talk-card-content" data-v-dccee329><h3 data-v-dccee329>${ssrInterpolate($props.talk.title)}</h3><p class="talk-venue" data-v-dccee329><i class="fas fa-map-marker-alt" aria-hidden="true" data-v-dccee329></i> ${ssrInterpolate($props.talk.venue)}</p><div class="talk-tags" aria-label="Tags" data-v-dccee329><!--[-->`);
  ssrRenderList($props.talk.tags.slice(0, 3), (tag, index) => {
    _push(`<span class="tag" data-v-dccee329>${ssrInterpolate(tag)}</span>`);
  });
  _push(`<!--]-->`);
  if ($props.talk.tags.length > 3) {
    _push(`<span class="more-tags" data-v-dccee329>+${ssrInterpolate($props.talk.tags.length - 3)}</span>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div><div class="view-details" aria-hidden="true" data-v-dccee329><span data-v-dccee329>View Details</span><i class="fas fa-arrow-right" data-v-dccee329></i></div></div></div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/talks/TalkCard.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const TalkCard = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1], ["__scopeId", "data-v-dccee329"]]);
const _sfc_main = {
  name: "TalksView",
  components: {
    TalksToolbar,
    TalkCard
  },
  data() {
    return {
      talks: [],
      filteredTalks: [],
      topics: [],
      selectedTopic: "All",
      searchQuery: "",
      isLoading: true,
      error: null,
      showFilters: false
    };
  },
  watch: {
    searchQuery() {
      this.filterTalks();
    },
    selectedTopic() {
      this.filterTalks();
    }
  },
  methods: {
    filterTalks() {
      let result = this.selectedTopic === "All" ? this.talks : this.talks.filter((talk) => talk.tags.includes(this.selectedTopic));
      if (this.searchQuery.trim() !== "") {
        const query = this.searchQuery.toLowerCase();
        result = result.filter(
          (talk) => {
            var _a;
            return talk.title.toLowerCase().includes(query) || ((_a = talk.description) == null ? void 0 : _a.toLowerCase().includes(query)) || talk.venue.toLowerCase().includes(query) || talk.tags.some((tag) => tag.toLowerCase().includes(query));
          }
        );
      }
      this.filteredTalks = result;
    },
    clearSearch() {
      this.searchQuery = "";
    },
    resetFilters() {
      this.searchQuery = "";
      this.selectedTopic = "All";
    },
    openTalkDetails(talk) {
      const talkSlug = talk.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
      this.$router.push({ name: "TalkDetails", params: { id: talkSlug } });
    },
    processTagsFromData(talksData) {
      return talksData.map((talk) => {
        if (talk.tags && talk.tags.length > 0) {
          return talk;
        }
        const tags = [];
        if (talk.type) tags.push(talk.type);
        if (talk.organization) {
          const org = talk.organization.replace("@", "");
          tags.push(org);
        }
        const potentialTopics = ["AI", "ML", "NLP", "CV", "Vision", "GAN", "RL", "TensorFlow", "Keras", "JAX", "FLAX"];
        potentialTopics.forEach((topic) => {
          if (talk.title.includes(topic)) {
            tags.push(topic);
          }
        });
        if (tags.length === 0) tags.push("Other");
        return {
          ...talk,
          tags: [...new Set(tags)]
        };
      });
    },
    async loadTalksData() {
      try {
        this.isLoading = true;
        this.error = null;
        const talksData = await import("./talks-DvPJXkc9.js");
        const processedTalks = this.processTagsFromData(talksData.default || talksData);
        const talks = processedTalks.map((talk) => ({
          ...talk,
          venue: talk.organization || talk.venue || "Unknown venue",
          date: talk.date || "Unknown date",
          id: talk.id || `talk-${Math.random().toString(36).substr(2, 9)}`
        }));
        this.talks = talks;
        this.filteredTalks = talks;
        const allTags = talks.flatMap((talk) => talk.tags || []);
        const topicsSet = new Set(allTags);
        this.topics = Array.from(topicsSet);
        this.isLoading = false;
      } catch (error) {
        console.error("Error loading talks data:", error);
        this.error = "Failed to load talks data. Please try again later.";
        this.isLoading = false;
      }
    }
  },
  mounted() {
    this.loadTalksData();
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_TalksToolbar = resolveComponent("TalksToolbar");
  const _component_TalkCard = resolveComponent("TalkCard");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "talks view-container" }, _attrs))} data-v-33f50acb><div class="section-content scrollable-content smooth-scroll" data-v-33f50acb><h1 class="resp-heading" data-v-33f50acb>Talks</h1><div class="talks-wrapper" data-v-33f50acb>`);
  if ($data.isLoading) {
    _push(`<div class="loading-container" role="status" aria-live="polite" data-v-33f50acb><div class="loader" data-v-33f50acb></div><p data-v-33f50acb>Loading talks...</p></div>`);
  } else if ($data.error) {
    _push(`<div class="error-container" role="alert" data-v-33f50acb><div class="error-icon" data-v-33f50acb><i class="fas fa-exclamation-circle" aria-hidden="true" data-v-33f50acb></i></div><h3 data-v-33f50acb>${ssrInterpolate($data.error)}</h3><button class="retry-btn" data-v-33f50acb><i class="fas fa-redo" aria-hidden="true" data-v-33f50acb></i> Retry </button></div>`);
  } else {
    _push(`<!--[-->`);
    _push(ssrRenderComponent(_component_TalksToolbar, {
      searchQuery: $data.searchQuery,
      "onUpdate:searchQuery": ($event) => $data.searchQuery = $event,
      showFilters: $data.showFilters,
      "onUpdate:showFilters": ($event) => $data.showFilters = $event,
      selectedTopic: $data.selectedTopic,
      "onUpdate:selectedTopic": ($event) => $data.selectedTopic = $event,
      topics: $data.topics,
      filteredCount: $data.filteredTalks.length,
      totalCount: $data.talks.length,
      onClearSearch: $options.clearSearch,
      onResetFilters: $options.resetFilters
    }, null, _parent));
    if ($data.filteredTalks.length > 0) {
      _push(`<div class="talks-grid" data-v-33f50acb><!--[-->`);
      ssrRenderList($data.filteredTalks, (talk) => {
        _push(ssrRenderComponent(_component_TalkCard, {
          key: talk.id,
          talk,
          onSelect: $options.openTalkDetails
        }, null, _parent));
      });
      _push(`<!--]--></div>`);
    } else {
      _push(`<div class="no-talks-found" role="status" data-v-33f50acb><div class="no-results-icon" data-v-33f50acb><i class="fas fa-search" aria-hidden="true" data-v-33f50acb></i></div><h3 data-v-33f50acb>No matching talks found</h3><p data-v-33f50acb>Try adjusting your search or filters.</p><button class="reset-filters-btn" data-v-33f50acb><i class="fas fa-redo" aria-hidden="true" data-v-33f50acb></i> Reset Filters </button></div>`);
    }
    _push(`<!--]-->`);
  }
  _push(`</div></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/TalksView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const TalksView = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-33f50acb"]]);
export {
  TalksView as default
};
