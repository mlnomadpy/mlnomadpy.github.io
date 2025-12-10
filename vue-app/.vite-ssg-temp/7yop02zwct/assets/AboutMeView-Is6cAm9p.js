import { mergeProps, useSSRContext, resolveComponent, withCtx, createVNode, createTextVNode } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrRenderClass, ssrRenderStyle, ssrRenderSlot, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "../main.mjs";
import { C as CompactList } from "./CompactList-CHM5pdaJ.js";
import { useHead } from "@vueuse/head";
import "vite-ssg";
import "vue-router";
import "buffer";
const _sfc_main$7 = {
  name: "ProfileCard",
  props: {
    name: {
      type: String,
      default: "Taha Bouhsine"
    },
    nativeTitle: {
      type: String,
      default: "ⵉⵙⴽⴰⵏⵎⴰⴳⴰⵔ"
    },
    tagline: {
      type: String,
      default: "ML Researcher & Engineer | Google Developer Expert in AI/ML | CEO of MLNomads"
    },
    quote: {
      type: String,
      default: "I build bridges between mathematical foundations of machine learning and their practical applications, between black-box neural networks and cosmos-inspired safe and interpretable AI models"
    },
    socialLinks: {
      type: Array,
      default: () => [
        {
          name: "Google Scholar",
          url: "https://scholar.google.com/",
          icon: "fas fa-graduation-cap",
          external: true
        },
        {
          name: "GitHub",
          url: "https://github.com/mlnomadpy",
          icon: "fab fa-github",
          external: true
        },
        {
          name: "LinkedIn",
          url: "https://linkedin.com/in/Tahabsn",
          icon: "fab fa-linkedin",
          external: true
        },
        {
          name: "Email",
          url: "mailto:tahabhs14@gmail.com",
          icon: "fas fa-envelope",
          external: false
        },
        {
          name: "Personal Website",
          url: "https://www.tahabouhsine.com",
          icon: "fas fa-globe",
          external: true
        }
      ]
    }
  },
  mounted() {
    this.$nextTick(() => {
      const socialLinks = this.$el.querySelectorAll(".social-links a");
      socialLinks.forEach((link, index) => {
        link.style.opacity = "0";
        link.style.transform = "translateY(20px)";
        setTimeout(() => {
          link.style.transition = "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
          link.style.opacity = "1";
          link.style.transform = "translateY(0)";
        }, 300 + index * 100);
      });
    });
  }
};
function _sfc_ssrRender$7(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "profile-card" }, _attrs))} data-v-104e5c2f><div class="profile-image-container" data-v-104e5c2f><div class="profile-background" data-v-104e5c2f></div><div class="profile-image" data-v-104e5c2f><img src="https://i.imgur.com/ScjU4Xr.png" alt="Taha Bouhsine" class="hover-effect" data-v-104e5c2f></div></div><div class="profile-info" data-v-104e5c2f><h2 class="profile-name" data-v-104e5c2f>${ssrInterpolate($props.name)}</h2><h3 class="profile-title" data-v-104e5c2f>${ssrInterpolate($props.nativeTitle)}</h3><p class="profile-tagline" data-v-104e5c2f>${ssrInterpolate($props.tagline)}</p><div class="profile-quote" data-v-104e5c2f><blockquote data-v-104e5c2f>${ssrInterpolate($props.quote)}</blockquote></div><div class="social-links" data-v-104e5c2f><!--[-->`);
  ssrRenderList($props.socialLinks, (link) => {
    _push(`<a${ssrRenderAttr("href", link.url)}${ssrRenderAttr("target", link.external ? "_blank" : void 0)}${ssrRenderAttr("rel", link.external ? "noopener noreferrer" : void 0)}${ssrRenderAttr("aria-label", link.name)}${ssrRenderAttr("title", link.name)} data-v-104e5c2f><i class="${ssrRenderClass(link.icon)}" aria-hidden="true" data-v-104e5c2f></i></a>`);
  });
  _push(`<!--]--></div></div></div>`);
}
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/about/ProfileCard.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const ProfileCard = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["ssrRender", _sfc_ssrRender$7], ["__scopeId", "data-v-104e5c2f"]]);
const _sfc_main$6 = {
  name: "TabNavigation",
  props: {
    activeTab: {
      type: String,
      required: true
    },
    tabs: {
      type: Array,
      required: true
    }
  }
};
function _sfc_ssrRender$6(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({
    class: "tabs-navigation",
    role: "tablist",
    "aria-label": "About Me Sections"
  }, _attrs))} data-v-737aa0fa><!--[-->`);
  ssrRenderList($props.tabs, (tab) => {
    _push(`<button class="${ssrRenderClass([{ "active": $props.activeTab === tab.id }, "tab-button"])}" role="tab"${ssrRenderAttr("aria-selected", $props.activeTab === tab.id)}${ssrRenderAttr("aria-controls", `panel-${tab.id}`)}${ssrRenderAttr("id", `tab-${tab.id}`)}${ssrRenderAttr("tabindex", $props.activeTab === tab.id ? 0 : -1)} data-v-737aa0fa><i class="${ssrRenderClass(tab.icon)}" aria-hidden="true" data-v-737aa0fa></i><span data-v-737aa0fa>${ssrInterpolate(tab.label)}</span></button>`);
  });
  _push(`<!--]--></div>`);
}
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/about/TabNavigation.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const TabNavigation = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["ssrRender", _sfc_ssrRender$6], ["__scopeId", "data-v-737aa0fa"]]);
const _sfc_main$5 = {
  name: "StoryTab",
  props: {
    storyItems: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      currentIndex: 0
    };
  },
  methods: {
    setActiveStory(index) {
      this.currentIndex = index;
    },
    navigateStory(direction) {
      let newIndex = this.currentIndex + direction;
      if (newIndex < 0) newIndex = this.storyItems.length - 1;
      if (newIndex >= this.storyItems.length) newIndex = 0;
      this.currentIndex = newIndex;
    }
  },
  mounted() {
    this.keyListener = (e) => {
      if (e.key === "ArrowRight") {
        this.navigateStory(1);
      } else if (e.key === "ArrowLeft") {
        this.navigateStory(-1);
      }
    };
    document.addEventListener("keydown", this.keyListener);
  },
  beforeUnmount() {
    document.removeEventListener("keydown", this.keyListener);
  }
};
function _sfc_ssrRender$5(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "story-timeline-container" }, _attrs))} data-v-1a5d52a5><div class="story-viewport" data-v-1a5d52a5><!--[-->`);
  ssrRenderList($props.storyItems, (item, index) => {
    _push(`<div class="${ssrRenderClass([{ "active": $data.currentIndex === index }, "story-scene"])}"${ssrRenderAttr("id", `story-${item.id}`)} data-v-1a5d52a5><div class="scene-background" style="${ssrRenderStyle({ backgroundImage: item.backgroundImage })}" data-v-1a5d52a5><div class="scene-overlay" data-v-1a5d52a5></div></div><div class="scene-content" data-v-1a5d52a5><h3 data-v-1a5d52a5>${ssrInterpolate(item.heading)}</h3><div class="scene-text" data-v-1a5d52a5>${item.content ?? ""}</div><div class="scene-quote" data-v-1a5d52a5>${ssrInterpolate(item.quote)}</div></div></div>`);
  });
  _push(`<!--]--></div><div class="story-controls" data-v-1a5d52a5><button class="story-nav-btn prev-btn" aria-label="Previous Story" data-v-1a5d52a5><i class="fas fa-chevron-left" data-v-1a5d52a5></i></button><div class="carousel-indicators" data-v-1a5d52a5><!--[-->`);
  ssrRenderList($props.storyItems, (item, index) => {
    _push(`<button class="${ssrRenderClass([{ "active": $data.currentIndex === index }, "indicator-dot"])}"${ssrRenderAttr("aria-label", `Go to story ${index + 1}`)}${ssrRenderAttr("title", item.title)} data-v-1a5d52a5></button>`);
  });
  _push(`<!--]--></div><button class="story-nav-btn next-btn" aria-label="Next Story" data-v-1a5d52a5><i class="fas fa-chevron-right" data-v-1a5d52a5></i></button></div></div>`);
}
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/about/StoryTab.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const StoryTab = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["ssrRender", _sfc_ssrRender$5], ["__scopeId", "data-v-1a5d52a5"]]);
const _sfc_main$4 = {
  name: "TimelineList",
  props: {
    items: {
      type: Array,
      required: true
    },
    type: {
      type: String,
      default: "default",
      validator: (value) => ["default", "education", "experience", "certification"].includes(value)
    },
    title: {
      type: String,
      default: ""
    },
    icon: {
      type: String,
      default: ""
    }
  },
  computed: {
    listClass() {
      return `timeline-list-${this.type}`;
    }
  }
};
function _sfc_ssrRender$4(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "timeline-list" }, _attrs))} data-v-1f7c790e>`);
  if ($props.title) {
    _push(`<div class="list-section-header" data-v-1f7c790e>`);
    if ($props.icon) {
      _push(`<i class="${ssrRenderClass($props.icon)}" data-v-1f7c790e></i>`);
    } else {
      _push(`<!---->`);
    }
    _push(`<h2 data-v-1f7c790e>${ssrInterpolate($props.title)}</h2></div>`);
  } else {
    _push(`<!---->`);
  }
  ssrRenderSlot(_ctx.$slots, "before-list", {}, null, _push, _parent);
  _push(`<div class="timeline-items" data-v-1f7c790e><!--[-->`);
  ssrRenderList($props.items, (item, index) => {
    _push(`<div class="timeline-item" data-v-1f7c790e>`);
    ssrRenderSlot(_ctx.$slots, "item", {
      item,
      index
    }, () => {
      _push(`<div class="timeline-header" data-v-1f7c790e>`);
      if (item.period) {
        _push(`<div class="timeline-date" data-v-1f7c790e>${ssrInterpolate(item.period)}</div>`);
      } else {
        _push(`<!---->`);
      }
      if (item.location) {
        _push(`<div class="timeline-location" data-v-1f7c790e>${ssrInterpolate(item.location)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="timeline-content" data-v-1f7c790e>`);
      if (item.title) {
        _push(`<h3 data-v-1f7c790e>${ssrInterpolate(item.title)}</h3>`);
      } else {
        _push(`<!---->`);
      }
      if (item.subtitle) {
        _push(`<p class="timeline-subtitle" data-v-1f7c790e>${ssrInterpolate(item.subtitle)}</p>`);
      } else {
        _push(`<!---->`);
      }
      if (item.description) {
        _push(`<p class="timeline-description" data-v-1f7c790e>${ssrInterpolate(item.description)}</p>`);
      } else {
        _push(`<!---->`);
      }
      if (item.details && item.details.length) {
        _push(`<div class="timeline-details" data-v-1f7c790e><ul data-v-1f7c790e><!--[-->`);
        ssrRenderList(item.details, (detail, dIndex) => {
          _push(`<li data-v-1f7c790e>${ssrInterpolate(detail)}</li>`);
        });
        _push(`<!--]--></ul></div>`);
      } else {
        _push(`<!---->`);
      }
      if (item.sections && item.sections.length) {
        _push(`<div class="timeline-sections" data-v-1f7c790e><!--[-->`);
        ssrRenderList(item.sections, (section, sIndex) => {
          _push(`<div class="timeline-section" data-v-1f7c790e><h4 class="section-title" data-v-1f7c790e>${ssrInterpolate(section.title)}:</h4><ul class="section-details" data-v-1f7c790e><!--[-->`);
          ssrRenderList(section.details, (detail, dIndex) => {
            _push(`<li data-v-1f7c790e>${ssrInterpolate(detail)}</li>`);
          });
          _push(`<!--]--></ul></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    }, _push, _parent);
    _push(`</div>`);
  });
  _push(`<!--]--></div>`);
  ssrRenderSlot(_ctx.$slots, "after-list", {}, null, _push, _parent);
  _push(`</div>`);
}
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/about/TimelineList.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const TimelineList = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["ssrRender", _sfc_ssrRender$4], ["__scopeId", "data-v-1f7c790e"]]);
const _sfc_main$3 = {
  name: "CardGrid",
  props: {
    items: {
      type: Array,
      required: true
    },
    type: {
      type: String,
      default: "default",
      validator: (value) => ["default", "certification", "award", "skill"].includes(value)
    },
    title: {
      type: String,
      default: ""
    },
    icon: {
      type: String,
      default: ""
    }
  },
  computed: {
    gridClass() {
      return `card-grid-${this.type}`;
    }
  }
};
function _sfc_ssrRender$3(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({
    class: ["card-grid", $options.gridClass]
  }, _attrs))} data-v-c795f838>`);
  if ($props.title) {
    _push(`<div class="grid-section-header" data-v-c795f838>`);
    if ($props.icon) {
      _push(`<i class="${ssrRenderClass($props.icon)}" data-v-c795f838></i>`);
    } else {
      _push(`<!---->`);
    }
    _push(`<h2 data-v-c795f838>${ssrInterpolate($props.title)}</h2></div>`);
  } else {
    _push(`<!---->`);
  }
  ssrRenderSlot(_ctx.$slots, "before-grid", {}, null, _push, _parent);
  _push(`<div class="card-items" data-v-c795f838><!--[-->`);
  ssrRenderList($props.items, (item, index) => {
    _push(`<div class="card-item" data-v-c795f838>`);
    ssrRenderSlot(_ctx.$slots, "item", {
      item,
      index
    }, () => {
      if (item.icon) {
        _push(`<div class="card-icon" data-v-c795f838><i class="${ssrRenderClass(item.icon)}" data-v-c795f838></i></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="card-content" data-v-c795f838>`);
      if (item.title) {
        _push(`<h3 class="card-title" data-v-c795f838>${ssrInterpolate(item.title)}</h3>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="card-details" data-v-c795f838>`);
      if (item.subtitle) {
        _push(`<p class="card-subtitle" data-v-c795f838>${ssrInterpolate(item.subtitle)}</p>`);
      } else {
        _push(`<!---->`);
      }
      if (item.description) {
        _push(`<p class="card-description" data-v-c795f838>${ssrInterpolate(item.description)}</p>`);
      } else {
        _push(`<!---->`);
      }
      if (item.skills) {
        _push(`<p class="card-info" data-v-c795f838><i class="fas fa-tools" data-v-c795f838></i> ${ssrInterpolate(item.skills)}</p>`);
      } else {
        _push(`<!---->`);
      }
      if (item.issuer) {
        _push(`<p class="card-info" data-v-c795f838><i class="fas fa-building" data-v-c795f838></i> ${ssrInterpolate(item.issuer)}</p>`);
      } else {
        _push(`<!---->`);
      }
      if (item.date) {
        _push(`<p class="card-info" data-v-c795f838><i class="fas fa-calendar-alt" data-v-c795f838></i> ${ssrInterpolate(item.date)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    }, _push, _parent);
    _push(`</div>`);
  });
  _push(`<!--]--></div>`);
  ssrRenderSlot(_ctx.$slots, "after-grid", {}, null, _push, _parent);
  _push(`</div>`);
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/about/CardGrid.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const CardGrid = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender$3], ["__scopeId", "data-v-c795f838"]]);
const _sfc_main$2 = {
  name: "ExperienceItem",
  props: {
    item: {
      type: Object,
      required: true
    }
  }
};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "experience-item-content" }, _attrs))} data-v-fc19542d><div class="experience-header" data-v-fc19542d><div class="experience-date-location" data-v-fc19542d><span class="experience-date" data-v-fc19542d>${ssrInterpolate($props.item.period)}</span><span class="experience-location" data-v-fc19542d>${ssrInterpolate($props.item.location)}</span></div><div class="experience-title-company" data-v-fc19542d><h3 class="experience-title" data-v-fc19542d>${ssrInterpolate($props.item.title)}</h3><div class="experience-company" data-v-fc19542d>${ssrInterpolate($props.item.company)}</div></div></div><div class="experience-content" data-v-fc19542d>`);
  if ($props.item.sections && $props.item.sections.length > 0) {
    _push(`<div class="experience-sections" data-v-fc19542d><!--[-->`);
    ssrRenderList($props.item.sections, (section, sIndex) => {
      _push(`<div class="experience-section" data-v-fc19542d><h4 class="section-title" data-v-fc19542d>${ssrInterpolate(section.title)}:</h4><ul class="section-details" data-v-fc19542d><!--[-->`);
      ssrRenderList(section.details, (detail, dIndex) => {
        _push(`<li data-v-fc19542d>${ssrInterpolate(detail)}</li>`);
      });
      _push(`<!--]--></ul></div>`);
    });
    _push(`<!--]--></div>`);
  } else {
    _push(`<ul class="experience-responsibilities" data-v-fc19542d><!--[-->`);
    ssrRenderList($props.item.details, (detail, dIndex) => {
      _push(`<li data-v-fc19542d>${ssrInterpolate(detail)}</li>`);
    });
    _push(`<!--]--></ul>`);
  }
  _push(`</div></div>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/about/ExperienceItem.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const ExperienceItem = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender$2], ["__scopeId", "data-v-fc19542d"]]);
const _sfc_main$1 = {
  name: "DetailModal",
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  emits: ["close"],
  mounted() {
    document.body.style.overflow = "hidden";
  },
  beforeUnmount() {
    document.body.style.overflow = "";
  }
};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "modal-backdrop" }, _attrs))} data-v-4851e886><div class="modal-content" role="dialog" aria-modal="true" data-v-4851e886><button class="close-btn" aria-label="Close details" data-v-4851e886><i class="fas fa-times" data-v-4851e886></i></button><div class="modal-header" data-v-4851e886><div class="header-main" data-v-4851e886><h2 class="modal-title" data-v-4851e886>${ssrInterpolate($props.item.title)}</h2><div class="modal-meta" data-v-4851e886>`);
  if ($props.item.period) {
    _push(`<span class="meta-tag date" data-v-4851e886><i class="far fa-calendar-alt" data-v-4851e886></i> ${ssrInterpolate($props.item.period)}</span>`);
  } else {
    _push(`<!---->`);
  }
  if ($props.item.location) {
    _push(`<span class="meta-tag location" data-v-4851e886><i class="fas fa-map-marker-alt" data-v-4851e886></i> ${ssrInterpolate($props.item.location)}</span>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div></div>`);
  if ($props.item.subtitle || $props.item.company) {
    _push(`<h3 class="modal-subtitle" data-v-4851e886>${ssrInterpolate($props.item.subtitle || $props.item.company)}</h3>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div><div class="modal-body scrollable-custom" data-v-4851e886>`);
  if ($props.item.description) {
    _push(`<p class="description" data-v-4851e886>${ssrInterpolate($props.item.description)}</p>`);
  } else {
    _push(`<!---->`);
  }
  if ($props.item.details && $props.item.details.length) {
    _push(`<div class="details-list" data-v-4851e886><h4 data-v-4851e886>Key Highlights</h4><ul data-v-4851e886><!--[-->`);
    ssrRenderList($props.item.details, (detail, i) => {
      _push(`<li data-v-4851e886>${ssrInterpolate(detail)}</li>`);
    });
    _push(`<!--]--></ul></div>`);
  } else {
    _push(`<!---->`);
  }
  if ($props.item.sections && $props.item.sections.length) {
    _push(`<div class="sections-list" data-v-4851e886><!--[-->`);
    ssrRenderList($props.item.sections, (section, sIndex) => {
      _push(`<div class="detail-section" data-v-4851e886><h4 data-v-4851e886>${ssrInterpolate(section.title)}</h4><ul data-v-4851e886><!--[-->`);
      ssrRenderList(section.details, (detail, dIndex) => {
        _push(`<li data-v-4851e886>${ssrInterpolate(detail)}</li>`);
      });
      _push(`<!--]--></ul></div>`);
    });
    _push(`<!--]--></div>`);
  } else {
    _push(`<!---->`);
  }
  if ($props.item.skills || $props.item.tags && $props.item.tags.length) {
    _push(`<div class="skills-section" data-v-4851e886><h4 data-v-4851e886>${ssrInterpolate($props.item.skills ? "Skills" : "Tags")}</h4><div class="skills-tags" data-v-4851e886>`);
    if ($props.item.skills) {
      _push(`<span class="skill-tag" data-v-4851e886>${ssrInterpolate($props.item.skills)}</span>`);
    } else {
      _push(`<!---->`);
    }
    _push(`<!--[-->`);
    ssrRenderList($props.item.tags, (tag) => {
      _push(`<span class="skill-tag" data-v-4851e886>${ssrInterpolate(tag)}</span>`);
    });
    _push(`<!--]--></div></div>`);
  } else {
    _push(`<!---->`);
  }
  if ($props.item.links || $props.item.url || $props.item.link) {
    _push(`<div class="modal-actions" data-v-4851e886>`);
    if ($props.item.url || $props.item.link) {
      _push(`<a${ssrRenderAttr("href", $props.item.url || $props.item.link)} target="_blank" rel="noopener noreferrer" class="action-btn" data-v-4851e886> Visit Link <i class="fas fa-external-link-alt" data-v-4851e886></i></a>`);
    } else {
      _push(`<!---->`);
    }
    if ($props.item.links) {
      _push(`<!--[-->`);
      ssrRenderList($props.item.links, (linkItem, lIndex) => {
        _push(`<a${ssrRenderAttr("href", linkItem.url)} target="_blank" rel="noopener noreferrer" class="action-btn" data-v-4851e886>${ssrInterpolate(linkItem.text)} <i class="fas fa-external-link-alt" data-v-4851e886></i></a>`);
      });
      _push(`<!--]-->`);
    } else {
      _push(`<!---->`);
    }
    _push(`</div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div></div></div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/about/DetailModal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const DetailModal = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1], ["__scopeId", "data-v-4851e886"]]);
const tabs = [
  { id: "identity", label: "Identity", icon: "fas fa-id-card" },
  { id: "story", label: "My Story", icon: "fas fa-book-open" },
  { id: "education", label: "Education", icon: "fas fa-graduation-cap" },
  { id: "certifications", label: "Certifications", icon: "fas fa-certificate" },
  { id: "awards", label: "Awards", icon: "fas fa-award" },
  { id: "experience", label: "Experience", icon: "fas fa-briefcase" }
];
const storyItems = [
  {
    id: "origins",
    title: "Origins",
    heading: "Who am I?",
    backgroundImage: "url('/imgs/bg-origins.jpg'), linear-gradient(135deg, #412c0f 0%, #5a421c 100%)",
    content: `<p>I didn't start with a roadmap; I started with curiosity. Growing up in Tamazgha, the world outside felt vast and full of secrets I was desperate to uncover. My journey wasn't about following a set path, but about asking "why" and "how"—a relentless need to peel back the layers of the ordinary to find the wonder underneath.</p>
    <p>Today, people might define me by my work, but at my core, I am still that curious kid, a "Nomad" navigating the landscapes of life. I am driven not by a need to conquer, but by a need to understand—to build bridges between where I came from and where I am going, and to find meaning in the spaces between.</p>`,
    quote: "The titles are just waypoints. The real journey is the relentless pursuit of understanding."
  },
  {
    id: "philosophy",
    title: "Philosophy",
    heading: "My Philosophy in a Nutshell",
    backgroundImage: "url('/imgs/bg-philosophy.jpg'), linear-gradient(135deg, #4a3517 0%, #6b4b22 100%)",
    content: `<p>I learned early on that if you wait for a guide, you might never leave the starting line. Navigating life without a clear map meant I had to build my own compass. Failures weren't setbacks; they were lessons—essential steps in the long walk of personal growth. I made a pact with myself: never fear the stumble, only the refusal to get back up.</p>
    <p>My philosophy is simple: remain perpetually curious. The moment we think we know enough is the moment we stop growing. I don't fear the unknown; I fear the stagnation of comfort. This hunger for knowledge isn't about status or achievement; it's the fuel that sustains my spirit and gives meaning to the struggle.</p>`,
    quote: "I don't fear the unknown. I fear the loss of the hunger to seek the unknown."
  },
  {
    id: "reflection",
    title: "Reflection",
    heading: "The Engineering of the Soul",
    backgroundImage: "url('/imgs/bg-reflection.jpg'), linear-gradient(135deg, #533e1e 0%, #785529 100%)",
    content: `<p>In moments of isolation, when the noise of the world faded, I found my strongest ally in writing. It became more than just a habit; it was a sanctuary. By forcing my thoughts onto paper, I could take the vague, overwhelming anxieties of life and give them shape, understanding them rather than running from them.</p>
    <p>This introspection is how I ground myself. It bridges the gap between what I feel and what I understand, allowing me to transform raw emotion into clarity and purpose. Writing is the act of listening to one's own life, ensuring that no lesson is lost to the chaos of the everyday.</p>`,
    quote: "Writing is how I listen to my own life and compile my experiences into wisdom."
  },
  {
    id: "journey",
    title: "Journey",
    heading: "The Crossroads",
    backgroundImage: "url('/imgs/bg-journey.jpg'), linear-gradient(135deg, #5c4726 0%, #856030 100%)",
    content: `<p>There was a defining moment where I stood at a crossroads—separated from everything familiar, with nothing but my own resolve. It was terrifying, but it was also the moment I truly became free. I realized that while I couldn't control the circumstances around me, I had absolute dominion over my response.</p>
    <p>I channeled that energy into moving forward. Every step I took wasn't just a motion—it was an assertion of existence. My journey from the mountains of North Africa to where I stand today is a testament to the power of resilience. I carry my roots with me, proving that where we start does not dictate where we end, and that ambition, when coupled with action, can bridge any divide.</p>`,
    quote: "Every step is a proof that where you start doesn't dictate where you end."
  },
  {
    id: "path",
    title: "Path",
    heading: "Where to Next? —Iskanmagar",
    backgroundImage: "url('/imgs/bg-path.jpg'), linear-gradient(135deg, #654f2d 0%, #926a36 100%)",
    content: `<p>I don't have a fixed coordinate for the destination. The spirit of "Iskanmagar" guides me—the belief that the path itself is the destination. I find myself drawn not to the easy comforts, but to the challenges that scare me. I've learned that fear is often just a compass pointing towards where I need to grow next.</p>
    <p>I'm not chasing a static state of happiness, but a dynamic state of evolution. The goal is to keep moving, to keep learning, and to ensure that with every step, I'm staying true to the curiosity that started it all. As long as there are questions left to answer, my journey continues.</p>`,
    quote: "I embrace the fear, for it is the only reliable compass pointing toward growth."
  }
];
const educationItems = [
  {
    period: "2024",
    title: "Master of Science in Electrical and Computer Engineering",
    subtitle: "Henry M. Rowan College of Engineering, Rowan University",
    description: "December 2024"
  },
  {
    period: "2022",
    title: "Master of Science in Data Science",
    subtitle: "Faculty of Science Agadir, Ibnou Zohr University",
    description: "July 2022"
  },
  {
    period: " 2020",
    title: "Bachelor of Science in Mathematics and Computer Science",
    subtitle: "Faculty of Science Agadir, Ibnou Zohr University",
    description: "September 2020"
  }
];
const certificates = [
  {
    title: "TensorFlow Developer Certificate",
    subtitle: "TensorFlow.org",
    period: "December 2021",
    skills: "Deep Learning / TensorFlow / MLOps",
    issuer: "TensorFlow.org",
    date: "December 2021",
    icon: "fab fa-tensorflow",
    link: "https://www.credential.net/truncated-url-placeholder"
  },
  {
    title: "Software Design and Architecture",
    subtitle: "University of Alberta",
    period: "October 2020",
    skills: "Software Architecture / Design Patterns / UML",
    issuer: "University of Alberta",
    date: "October 2020",
    icon: "fas fa-sitemap"
  },
  {
    title: "Software Product Management Specialization",
    subtitle: "University of Alberta",
    period: "August 2020",
    skills: "Scrum / Agile / Product Management",
    issuer: "University of Alberta",
    date: "August 2020",
    icon: "fas fa-tasks"
  },
  {
    title: "Deep Learning Specialization",
    subtitle: "deeplearning.ai",
    period: "July 2020",
    skills: "Python / TensorFlow / Deep Learning",
    issuer: "deeplearning.ai",
    date: "July 2020",
    icon: "fas fa-brain"
  }
];
const awardItems = [
  {
    title: "AI/ML Google Developer Expert",
    subtitle: "Google Developers",
    period: "2023 - Present",
    description: "Recognition for expertise and contributions to the AI/ML community",
    icon: "fas fa-award",
    link: "https://g.dev/tahabouhsine"
  },
  {
    title: "Rowan Research Fellowship Award",
    subtitle: "Rowan University",
    period: "2023",
    description: "Award for research excellence at Rowan University",
    icon: "fas fa-medal"
  },
  {
    title: "Google Scholarship: Professional Certificate",
    subtitle: "Google",
    period: "2019",
    description: "Recognition of professional development in Google technologies",
    icon: "fab fa-google"
  },
  {
    title: "Google Scholarship: TensorFlow Certificate",
    subtitle: "Google",
    period: "2020",
    description: "Recognition of TensorFlow expertise and contributions",
    icon: "fab fa-tensorflow"
  }
];
const experienceItems = [
  {
    company: "Azetta.ai",
    title: "Research Scientist/Co-Founder",
    location: "San Francisco, CA",
    period: "September 2025—Present",
    sections: [
      {
        title: "R&D",
        details: [
          "Pioneering Physics-Inspired AI architectures for white-box intelligence",
          "Developing deep learning models with physical constraints for inherent interpretability",
          "Advancing the theoretical foundations of Neural-Matter Networks and safe AI"
        ]
      },
      {
        title: "Products",
        details: [
          "CosmaDB: The physics-inspired vector database for infinite-scale high-dimensional data",
          "OmniEm: Omnilingual embedding models for universal semantic understanding",
          "Periodica: Continuous explainability and monitoring platform for AI observability"
        ]
      }
    ]
  },
  {
    company: "MLNomads L.L.C",
    title: "Research Scientist/C.E.O",
    location: "San Francisco, CA",
    period: "November 2024—September 2025",
    sections: [
      {
        title: "R&D",
        details: [
          "Pre-Training next generation of white box neural networks architecture using Neural-Matter Networks",
          "Pre-training and Fine-Tuning deep learning models using SimO2 and AFCL frameworks",
          "Building Security pipelines to Audit the model weights to detect potential vulnerabilities"
        ]
      },
      {
        title: "Tech",
        details: [
          "bashnota: Building next generation platform for building and training AI System for modern non-linear workflow (Jupyter Notebooks Alternative)",
          "AtomicVDB: a state-of-the art Vector Database built on top of jax",
          "LocalAgents.ts: a typescript library for building LLM agents on your browser"
        ]
      }
    ]
  },
  {
    company: "Rowan University - College of Science and Mathematics",
    title: "Lecturer / Adjunct Faculty",
    location: "Glassboro, NJ",
    period: "September 2023–December 2024",
    details: [
      "Teaching 300-level course in Cyber Security",
      "Developing curriculum and course materials",
      "Mentoring students in computer science and cybersecurity"
    ]
  },
  {
    company: "Henry M.Rowan College of Engineering / Federal Aviation Administration",
    title: "Machine Learning Graduate Research Assistant",
    location: "Glassboro, NJ",
    period: "January 2023–December 2024",
    details: [
      "Developed a cutting-edge multimodal system for in-flight atmospheric visibility estimation (collaboration with Rowan University and US Federal Aviation Administration)",
      "Specialized in Multimodal Deep Learning techniques and applications",
      "Utilized X-Plane to create a comprehensive dataset for in-flight visibility estimation"
    ]
  },
  {
    company: "Henry M.Rowan College of Engineering / Federal Aviation Administration",
    title: "Machine Learning Engineer Intern",
    location: "Glassboro, NJ",
    period: "February 2022–July 2022",
    details: [
      "Developed an atmospheric visibility estimation system using RGB image-based approaches",
      "Led the project from problem framing and in-depth research to dataset curation, model development, training, and evaluation"
    ]
  },
  {
    company: "IRF-SIC Laboratory",
    title: "Satellite Imagery Machine Learning Engineer Intern",
    location: "Agadir, Morocco",
    period: "February 2022–July 2022",
    details: [
      "Responsible for problem framing, model structuring, and implementation",
      "Developed an AI-based system for change detection in Argania forests using satellite imagery"
    ]
  },
  {
    company: "Freelancer / Consultant",
    title: "Software Engineer",
    location: "Agadir, Morocco",
    period: "July 2016–Present",
    details: [
      "Full Stack Web Development services for various clients",
      "Android application development and deployment",
      "AI Engineering and machine learning solutions",
      "Technical consulting and project management"
    ]
  }
];
const skillGroups = [
  {
    title: "Machine Learning & AI",
    icon: "fas fa-brain",
    skills: [
      "Deep Learning (TensorFlow, PyTorch)",
      "Computer Vision",
      "NLP (Transformers, LLMs)",
      "MLOps",
      "Generative AI"
    ]
  },
  {
    title: "Software Engineering",
    icon: "fas fa-laptop-code",
    skills: [
      "Python",
      "JavaScript/TypeScript",
      "Vue.js",
      "React",
      "Node.js",
      "Docker",
      "Kubernetes"
    ]
  },
  {
    title: "Research",
    icon: "fas fa-search",
    skills: [
      "Technical Writing",
      "Experiment Design",
      "Data Analysis",
      "Algorithm Development",
      "Mathematical Modeling"
    ]
  }
];
const profileData = {
  name: "Taha Bouhsine",
  nativeTitle: "ⵉⵙⴽⴰⵏⵎⴰⴳⴰⵔ",
  tagline: "ML Researcher & Engineer | Google Developer Expert in AI/ML | Azetta.ai Co-Founder",
  quote: "I build bridges between mathematical foundations of machine learning and their practical applications, between black-box neural networks and cosmos-inspired safe and interpretable AI models",
  socialLinks: [
    {
      name: "Google Scholar",
      url: "https://scholar.google.com/citations?user=IsBjb3EAAAAJ&hl=en&oi=ao",
      icon: "fas fa-graduation-cap",
      external: true
    },
    {
      name: "GitHub",
      url: "https://github.com/mlnomadpy",
      icon: "fab fa-github",
      external: true
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/Tahabsn",
      icon: "fab fa-linkedin",
      external: true
    },
    {
      name: "Email",
      url: "mailto:contact@tahabouhsine.com",
      icon: "fas fa-envelope",
      external: false
    },
    {
      name: "Personal Website",
      url: "https://www.tahabouhsine.com",
      icon: "fas fa-globe",
      external: true
    }
  ]
};
const _sfc_main = {
  name: "AboutMeView",
  components: {
    ProfileCard,
    TabNavigation,
    StoryTab,
    TimelineList,
    CompactList,
    CardGrid,
    ExperienceItem,
    DetailModal
  },
  setup() {
    useHead({
      title: "About Taha Bouhsine | ML Researcher & Engineer",
      meta: [
        { name: "description", content: "Learn about Taha Bouhsine, his story, experience, and skills in Machine Learning and AI." },
        { property: "og:title", content: "About Taha Bouhsine" },
        { property: "og:description", content: "ML Researcher & Engineer | Google Developer Expert in AI/ML" },
        { rel: "canonical", href: "https://www.tahabouhsine.com/about" }
      ]
    });
    return {
      tabs,
      storyItems,
      skillGroups,
      certificates,
      educationItems,
      awardItems,
      experienceItems,
      profileData
    };
  },
  data() {
    return {
      activeTab: "identity",
      viewMode: "list",
      // 'list' or 'timeline'
      selectedItem: null
    };
  },
  methods: {
    setActiveTab(tab) {
      if (this.activeTab !== tab) {
        this.activeTab = tab;
        this.selectedItem = null;
        if (window.innerWidth < 768) {
          const contentArea = this.$el.querySelector(".tab-content-area");
          if (contentArea) {
            setTimeout(() => {
              contentArea.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 100);
          }
        }
      }
    },
    toggleViewMode() {
      this.viewMode = this.viewMode === "list" ? "timeline" : "list";
    },
    openDetail(item) {
      this.selectedItem = item;
    },
    closeDetail() {
      this.selectedItem = null;
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_tab_navigation = resolveComponent("tab-navigation");
  const _component_profile_card = resolveComponent("profile-card");
  const _component_story_tab = resolveComponent("story-tab");
  const _component_compact_list = resolveComponent("compact-list");
  const _component_timeline_list = resolveComponent("timeline-list");
  const _component_ExperienceItem = resolveComponent("ExperienceItem");
  const _component_card_grid = resolveComponent("card-grid");
  const _component_detail_modal = resolveComponent("detail-modal");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "about-me view-container" }, _attrs))} data-v-6792b46c><div class="section-content scrollable-content smooth-scroll" data-v-6792b46c><div class="unified-card" data-v-6792b46c><main class="content-section" data-v-6792b46c><div class="tabs-container" data-v-6792b46c>`);
  _push(ssrRenderComponent(_component_tab_navigation, {
    activeTab: $data.activeTab,
    tabs: $setup.tabs,
    onTabChange: $options.setActiveTab
  }, null, _parent));
  _push(`</div><div class="tab-content-area" data-v-6792b46c>`);
  if ($data.activeTab === "identity") {
    _push(`<div class="tab-panel identity-panel" data-v-6792b46c>`);
    _push(ssrRenderComponent(_component_profile_card, $setup.profileData, null, _parent));
    _push(`</div>`);
  } else if ($data.activeTab === "story") {
    _push(`<div class="tab-panel" data-v-6792b46c>`);
    _push(ssrRenderComponent(_component_story_tab, { storyItems: $setup.storyItems }, null, _parent));
    _push(`</div>`);
  } else if ($data.activeTab === "education") {
    _push(`<div class="tab-panel" data-v-6792b46c>`);
    if ($data.viewMode === "list") {
      _push(ssrRenderComponent(_component_compact_list, {
        title: "Education",
        icon: "fas fa-graduation-cap",
        items: $setup.educationItems,
        onItemClick: $options.openDetail
      }, {
        controls: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<button class="view-toggle-btn" title="Switch to Timeline View" data-v-6792b46c${_scopeId}><i class="fas fa-stream" data-v-6792b46c${_scopeId}></i> Timeline </button>`);
          } else {
            return [
              createVNode("button", {
                class: "view-toggle-btn",
                onClick: $options.toggleViewMode,
                title: "Switch to Timeline View"
              }, [
                createVNode("i", { class: "fas fa-stream" }),
                createTextVNode(" Timeline ")
              ], 8, ["onClick"])
            ];
          }
        }),
        _: 1
      }, _parent));
    } else {
      _push(ssrRenderComponent(_component_timeline_list, {
        title: "Education",
        icon: "fas fa-graduation-cap",
        items: $setup.educationItems
      }, {
        "before-list": withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="list-controls-bar" data-v-6792b46c${_scopeId}><button class="view-toggle-btn active" title="Switch to List View" data-v-6792b46c${_scopeId}><i class="fas fa-list" data-v-6792b46c${_scopeId}></i> Compact List </button></div>`);
          } else {
            return [
              createVNode("div", { class: "list-controls-bar" }, [
                createVNode("button", {
                  class: "view-toggle-btn active",
                  onClick: $options.toggleViewMode,
                  title: "Switch to List View"
                }, [
                  createVNode("i", { class: "fas fa-list" }),
                  createTextVNode(" Compact List ")
                ], 8, ["onClick"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    }
    _push(`</div>`);
  } else if ($data.activeTab === "experience") {
    _push(`<div class="tab-panel" data-v-6792b46c>`);
    if ($data.viewMode === "list") {
      _push(ssrRenderComponent(_component_compact_list, {
        title: "Experience",
        icon: "fas fa-briefcase",
        items: $setup.experienceItems,
        onItemClick: $options.openDetail
      }, {
        controls: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<button class="view-toggle-btn" title="Switch to Timeline View" data-v-6792b46c${_scopeId}><i class="fas fa-stream" data-v-6792b46c${_scopeId}></i> Timeline </button>`);
          } else {
            return [
              createVNode("button", {
                class: "view-toggle-btn",
                onClick: $options.toggleViewMode,
                title: "Switch to Timeline View"
              }, [
                createVNode("i", { class: "fas fa-stream" }),
                createTextVNode(" Timeline ")
              ], 8, ["onClick"])
            ];
          }
        }),
        _: 1
      }, _parent));
    } else {
      _push(ssrRenderComponent(_component_timeline_list, {
        title: "Experience",
        icon: "fas fa-briefcase",
        items: $setup.experienceItems
      }, {
        "before-list": withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="list-controls-bar" data-v-6792b46c${_scopeId}><button class="view-toggle-btn active" title="Switch to List View" data-v-6792b46c${_scopeId}><i class="fas fa-list" data-v-6792b46c${_scopeId}></i> Compact List </button></div>`);
          } else {
            return [
              createVNode("div", { class: "list-controls-bar" }, [
                createVNode("button", {
                  class: "view-toggle-btn active",
                  onClick: $options.toggleViewMode,
                  title: "Switch to List View"
                }, [
                  createVNode("i", { class: "fas fa-list" }),
                  createTextVNode(" Compact List ")
                ], 8, ["onClick"])
              ])
            ];
          }
        }),
        item: withCtx(({ item }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_ExperienceItem, { item }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_ExperienceItem, { item }, null, 8, ["item"])
            ];
          }
        }),
        _: 1
      }, _parent));
    }
    _push(`</div>`);
  } else if ($data.activeTab === "awards") {
    _push(`<div class="tab-panel" data-v-6792b46c>`);
    if ($data.viewMode === "list") {
      _push(ssrRenderComponent(_component_compact_list, {
        title: "Honors & Awards",
        icon: "fas fa-trophy",
        items: $setup.awardItems,
        onItemClick: $options.openDetail
      }, {
        controls: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<button class="view-toggle-btn" title="Switch to Timeline View" data-v-6792b46c${_scopeId}><i class="fas fa-stream" data-v-6792b46c${_scopeId}></i> Timeline </button>`);
          } else {
            return [
              createVNode("button", {
                class: "view-toggle-btn",
                onClick: $options.toggleViewMode,
                title: "Switch to Timeline View"
              }, [
                createVNode("i", { class: "fas fa-stream" }),
                createTextVNode(" Timeline ")
              ], 8, ["onClick"])
            ];
          }
        }),
        _: 1
      }, _parent));
    } else {
      _push(ssrRenderComponent(_component_timeline_list, {
        title: "Honors & Awards",
        icon: "fas fa-trophy",
        items: $setup.awardItems
      }, {
        "before-list": withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="list-controls-bar" data-v-6792b46c${_scopeId}><button class="view-toggle-btn active" title="Switch to List View" data-v-6792b46c${_scopeId}><i class="fas fa-list" data-v-6792b46c${_scopeId}></i> Compact List </button></div>`);
          } else {
            return [
              createVNode("div", { class: "list-controls-bar" }, [
                createVNode("button", {
                  class: "view-toggle-btn active",
                  onClick: $options.toggleViewMode,
                  title: "Switch to List View"
                }, [
                  createVNode("i", { class: "fas fa-list" }),
                  createTextVNode(" Compact List ")
                ], 8, ["onClick"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    }
    _push(`</div>`);
  } else if ($data.activeTab === "skills") {
    _push(`<div class="tab-panel" data-v-6792b46c>`);
    _push(ssrRenderComponent(_component_card_grid, {
      title: "Skills & Technologies",
      icon: "fas fa-code",
      items: $setup.skillGroups,
      type: "skill"
    }, null, _parent));
    _push(`</div>`);
  } else if ($data.activeTab === "certifications") {
    _push(`<div class="tab-panel" data-v-6792b46c>`);
    if ($data.viewMode === "list") {
      _push(ssrRenderComponent(_component_compact_list, {
        title: "Certifications",
        icon: "fas fa-certificate",
        items: $setup.certificates,
        onItemClick: $options.openDetail
      }, {
        controls: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<button class="view-toggle-btn" title="Switch to Grid View" data-v-6792b46c${_scopeId}><i class="fas fa-th-large" data-v-6792b46c${_scopeId}></i> Grid </button>`);
          } else {
            return [
              createVNode("button", {
                class: "view-toggle-btn",
                onClick: $options.toggleViewMode,
                title: "Switch to Grid View"
              }, [
                createVNode("i", { class: "fas fa-th-large" }),
                createTextVNode(" Grid ")
              ], 8, ["onClick"])
            ];
          }
        }),
        _: 1
      }, _parent));
    } else {
      _push(ssrRenderComponent(_component_card_grid, {
        title: "Certifications",
        icon: "fas fa-certificate",
        items: $setup.certificates,
        type: "certification"
      }, {
        "before-grid": withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="list-controls-bar" data-v-6792b46c${_scopeId}><button class="view-toggle-btn active" title="Switch to List View" data-v-6792b46c${_scopeId}><i class="fas fa-list" data-v-6792b46c${_scopeId}></i> Compact List </button></div>`);
          } else {
            return [
              createVNode("div", { class: "list-controls-bar" }, [
                createVNode("button", {
                  class: "view-toggle-btn active",
                  onClick: $options.toggleViewMode,
                  title: "Switch to List View"
                }, [
                  createVNode("i", { class: "fas fa-list" }),
                  createTextVNode(" Compact List ")
                ], 8, ["onClick"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    }
    _push(`</div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div></main></div></div>`);
  if ($data.selectedItem) {
    _push(ssrRenderComponent(_component_detail_modal, {
      item: $data.selectedItem,
      onClose: $options.closeDetail
    }, null, _parent));
  } else {
    _push(`<!---->`);
  }
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/AboutMeView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const AboutMeView = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-6792b46c"]]);
export {
  AboutMeView as default
};
