import { mergeProps, useSSRContext, resolveComponent, withCtx, createVNode } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrRenderClass, ssrRenderStyle, ssrRenderSlot, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "../main.mjs";
import { useHead } from "@vueuse/head";
import "vite-ssg";
import "vue-router";
const _sfc_main$6 = {
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
function _sfc_ssrRender$6(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "profile-card" }, _attrs))} data-v-a7521b32><div class="profile-image-container" data-v-a7521b32><div class="profile-background" data-v-a7521b32></div><div class="profile-image" data-v-a7521b32><img src="https://i.imgur.com/ScjU4Xr.png" alt="Taha Bouhsine" class="hover-effect" data-v-a7521b32></div></div><div class="profile-info" data-v-a7521b32><h2 class="profile-name" data-v-a7521b32>${ssrInterpolate($props.name)}</h2><h3 class="profile-title" data-v-a7521b32>${ssrInterpolate($props.nativeTitle)}</h3><p class="profile-tagline" data-v-a7521b32>${ssrInterpolate($props.tagline)}</p><div class="profile-quote" data-v-a7521b32><blockquote data-v-a7521b32>${ssrInterpolate($props.quote)}</blockquote></div><div class="social-links" data-v-a7521b32><!--[-->`);
  ssrRenderList($props.socialLinks, (link) => {
    _push(`<a${ssrRenderAttr("href", link.url)}${ssrRenderAttr("target", link.external ? "_blank" : void 0)}${ssrRenderAttr("rel", link.external ? "noopener noreferrer" : void 0)}${ssrRenderAttr("aria-label", link.name)}${ssrRenderAttr("title", link.name)} data-v-a7521b32><i class="${ssrRenderClass(link.icon)}" aria-hidden="true" data-v-a7521b32></i></a>`);
  });
  _push(`<!--]--></div></div></div>`);
}
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/about/ProfileCard.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const ProfileCard = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["ssrRender", _sfc_ssrRender$6], ["__scopeId", "data-v-a7521b32"]]);
const _sfc_main$5 = {
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
function _sfc_ssrRender$5(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({
    class: "tabs-navigation",
    role: "tablist",
    "aria-label": "About Me Sections"
  }, _attrs))} data-v-0986b31f><!--[-->`);
  ssrRenderList($props.tabs, (tab) => {
    _push(`<button class="${ssrRenderClass([{ "active": $props.activeTab === tab.id }, "tab-button"])}" role="tab"${ssrRenderAttr("aria-selected", $props.activeTab === tab.id)}${ssrRenderAttr("aria-controls", `panel-${tab.id}`)}${ssrRenderAttr("id", `tab-${tab.id}`)}${ssrRenderAttr("tabindex", $props.activeTab === tab.id ? 0 : -1)} data-v-0986b31f><i class="${ssrRenderClass(tab.icon)}" aria-hidden="true" data-v-0986b31f></i><span data-v-0986b31f>${ssrInterpolate(tab.label)}</span></button>`);
  });
  _push(`<!--]--></div>`);
}
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/about/TabNavigation.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const TabNavigation = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["ssrRender", _sfc_ssrRender$5], ["__scopeId", "data-v-0986b31f"]]);
const _sfc_main$4 = {
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
function _sfc_ssrRender$4(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "story-timeline-container" }, _attrs))} data-v-a1ce8593><div class="timeline-navigation" data-v-a1ce8593><!--[-->`);
  ssrRenderList($props.storyItems, (item, index) => {
    _push(`<div class="${ssrRenderClass([{ "active": $data.currentIndex === index }, "timeline-nav-item"])}" data-v-a1ce8593><div class="nav-indicator" data-v-a1ce8593><span data-v-a1ce8593>${ssrInterpolate(String(index + 1).padStart(2, "0"))}</span></div><div class="nav-label" data-v-a1ce8593>${ssrInterpolate(item.title)}</div></div>`);
  });
  _push(`<!--]--><div class="timeline-progress-bar" data-v-a1ce8593><div class="timeline-progress" style="${ssrRenderStyle({ width: `${($data.currentIndex + 1) / $props.storyItems.length * 100}%` })}" data-v-a1ce8593></div></div></div><div class="story-viewport" data-v-a1ce8593><!--[-->`);
  ssrRenderList($props.storyItems, (item, index) => {
    _push(`<div class="${ssrRenderClass([{ "active": $data.currentIndex === index }, "story-scene"])}"${ssrRenderAttr("id", `story-${item.id}`)} data-v-a1ce8593><div class="scene-background" style="${ssrRenderStyle({ backgroundImage: item.backgroundImage })}" data-v-a1ce8593><div class="scene-overlay" data-v-a1ce8593></div></div><div class="scene-content" data-v-a1ce8593><h3 data-v-a1ce8593>${ssrInterpolate(item.heading)}</h3><div class="scene-text" data-v-a1ce8593>${item.content ?? ""}</div><div class="scene-quote" data-v-a1ce8593>${ssrInterpolate(item.quote)}</div></div></div>`);
  });
  _push(`<!--]--></div><div class="story-controls" data-v-a1ce8593><button class="story-nav-btn prev-btn" data-v-a1ce8593><i class="fas fa-chevron-left" data-v-a1ce8593></i></button><div class="story-page-indicator" data-v-a1ce8593><span class="current-page" data-v-a1ce8593>${ssrInterpolate($data.currentIndex + 1)}</span>/<span class="total-pages" data-v-a1ce8593>${ssrInterpolate($props.storyItems.length)}</span></div><button class="story-nav-btn next-btn" data-v-a1ce8593><i class="fas fa-chevron-right" data-v-a1ce8593></i></button></div></div>`);
}
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/about/StoryTab.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const StoryTab = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["ssrRender", _sfc_ssrRender$4], ["__scopeId", "data-v-a1ce8593"]]);
const _sfc_main$3 = {
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
    }
  },
  computed: {
    listClass() {
      return `timeline-list-${this.type}`;
    }
  }
};
function _sfc_ssrRender$3(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "timeline-list" }, _attrs))} data-v-33e427fd>`);
  ssrRenderSlot(_ctx.$slots, "before-list", {}, null, _push, _parent);
  _push(`<div class="timeline-items" data-v-33e427fd><!--[-->`);
  ssrRenderList($props.items, (item, index) => {
    _push(`<div class="timeline-item" data-v-33e427fd>`);
    ssrRenderSlot(_ctx.$slots, "item", {
      item,
      index
    }, () => {
      _push(`<div class="timeline-header" data-v-33e427fd>`);
      if (item.period) {
        _push(`<div class="timeline-date" data-v-33e427fd>${ssrInterpolate(item.period)}</div>`);
      } else {
        _push(`<!---->`);
      }
      if (item.location) {
        _push(`<div class="timeline-location" data-v-33e427fd>${ssrInterpolate(item.location)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="timeline-content" data-v-33e427fd>`);
      if (item.title) {
        _push(`<h3 data-v-33e427fd>${ssrInterpolate(item.title)}</h3>`);
      } else {
        _push(`<!---->`);
      }
      if (item.subtitle) {
        _push(`<p class="timeline-subtitle" data-v-33e427fd>${ssrInterpolate(item.subtitle)}</p>`);
      } else {
        _push(`<!---->`);
      }
      if (item.description) {
        _push(`<p class="timeline-description" data-v-33e427fd>${ssrInterpolate(item.description)}</p>`);
      } else {
        _push(`<!---->`);
      }
      if (item.details && item.details.length) {
        _push(`<div class="timeline-details" data-v-33e427fd><ul data-v-33e427fd><!--[-->`);
        ssrRenderList(item.details, (detail, dIndex) => {
          _push(`<li data-v-33e427fd>${ssrInterpolate(detail)}</li>`);
        });
        _push(`<!--]--></ul></div>`);
      } else {
        _push(`<!---->`);
      }
      if (item.sections && item.sections.length) {
        _push(`<div class="timeline-sections" data-v-33e427fd><!--[-->`);
        ssrRenderList(item.sections, (section, sIndex) => {
          _push(`<div class="timeline-section" data-v-33e427fd><h4 class="section-title" data-v-33e427fd>${ssrInterpolate(section.title)}:</h4><ul class="section-details" data-v-33e427fd><!--[-->`);
          ssrRenderList(section.details, (detail, dIndex) => {
            _push(`<li data-v-33e427fd>${ssrInterpolate(detail)}</li>`);
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
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/about/TimelineList.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const TimelineList = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender$3], ["__scopeId", "data-v-33e427fd"]]);
const _sfc_main$2 = {
  name: "CardGrid",
  props: {
    items: {
      type: Array,
      required: true
    },
    type: {
      type: String,
      default: "default",
      validator: (value) => ["default", "certification", "award"].includes(value)
    }
  },
  computed: {
    gridClass() {
      return `card-grid-${this.type}`;
    }
  }
};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({
    class: ["card-grid", $options.gridClass]
  }, _attrs))} data-v-a1ef0b2a>`);
  ssrRenderSlot(_ctx.$slots, "before-grid", {}, null, _push, _parent);
  _push(`<div class="card-items" data-v-a1ef0b2a><!--[-->`);
  ssrRenderList($props.items, (item, index) => {
    _push(`<div class="card-item" data-v-a1ef0b2a>`);
    ssrRenderSlot(_ctx.$slots, "item", {
      item,
      index
    }, () => {
      if (item.icon) {
        _push(`<div class="card-icon" data-v-a1ef0b2a><i class="${ssrRenderClass(item.icon)}" data-v-a1ef0b2a></i></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="card-content" data-v-a1ef0b2a>`);
      if (item.title) {
        _push(`<h3 class="card-title" data-v-a1ef0b2a>${ssrInterpolate(item.title)}</h3>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="card-details" data-v-a1ef0b2a>`);
      if (item.subtitle) {
        _push(`<p class="card-subtitle" data-v-a1ef0b2a>${ssrInterpolate(item.subtitle)}</p>`);
      } else {
        _push(`<!---->`);
      }
      if (item.description) {
        _push(`<p class="card-description" data-v-a1ef0b2a>${ssrInterpolate(item.description)}</p>`);
      } else {
        _push(`<!---->`);
      }
      if (item.skills) {
        _push(`<p class="card-info" data-v-a1ef0b2a><i class="fas fa-tools" data-v-a1ef0b2a></i> ${ssrInterpolate(item.skills)}</p>`);
      } else {
        _push(`<!---->`);
      }
      if (item.issuer) {
        _push(`<p class="card-info" data-v-a1ef0b2a><i class="fas fa-building" data-v-a1ef0b2a></i> ${ssrInterpolate(item.issuer)}</p>`);
      } else {
        _push(`<!---->`);
      }
      if (item.date) {
        _push(`<p class="card-info" data-v-a1ef0b2a><i class="fas fa-calendar-alt" data-v-a1ef0b2a></i> ${ssrInterpolate(item.date)}</p>`);
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
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/about/CardGrid.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const CardGrid = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender$2], ["__scopeId", "data-v-a1ef0b2a"]]);
const _sfc_main$1 = {
  name: "ExperienceItem",
  props: {
    item: {
      type: Object,
      required: true
    }
  }
};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
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
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/about/ExperienceItem.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const ExperienceItem = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1], ["__scopeId", "data-v-fc19542d"]]);
const tabs = [
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
    content: `<p>Jake* of all trades, Master of Data Science. I've always been captivated by the beauty and transformative power of computing, driven to understand its inner workings, become part of its evolution, and contribute meaningful innovations. My journey as a researcher, engineer, and nomad has taken me across diverse realms of knowledge, fueled by an insatiable curiosity about machine learning and the quest to make artificial intelligence more transparent and interpretable.</p>
    <p>As founder and CEO of MLNomads and recognized Google Developer Expert in AI/ML, I've earned various titles. Yet beyond these labels exists someone navigating the complex intersections of technology, identity, and purpose. At my core, I build bridges—connecting mathematical foundations of machine learning with practical applications, linking opaque neural networks with interpretable models, and bridging the gap between what AI is today and what it could become tomorrow.</p>`,
    quote: "Beyond titles lies a person navigating the complex landscapes of technology, identity, and purpose."
  },
  {
    id: "philosophy",
    title: "Philosophy",
    heading: "My Philosophy in a Nutshell",
    backgroundImage: "url('/imgs/bg-philosophy.jpg'), linear-gradient(135deg, #4a3517 0%, #6b4b22 100%)",
    content: `<p>From a young age, I found myself making critical decisions without guidance, relying solely on intuition, dedication, and determination to overcome obstacles in my path. I've encountered numerous failures along the way but transformed each one into a learning opportunity, ensuring I never repeat the same mistakes twice.</p>
    <p>Through navigating these challenges, I've cultivated a profound passion for knowledge and learning that has shaped my character and contributed to my modest achievements. For me, the true fear isn't facing the unknown—it's losing the desire to seek knowledge in the first place.</p>
    <p>I am, above all, a lifelong learner with an unquenchable thirst for education. This love of learning sustains me and will continue to guide my journey for as long as I live. I'm grateful for every hardship that has shaped my path, as each challenge has deepened my appreciation for the world's beauty and complexity, reinforcing my commitment to continuous growth and understanding.</p>`,
    quote: "For me, it is not the unknown that I fear, but the loss of my desire to seek knowledge."
  },
  {
    id: "reflection",
    title: "Reflection",
    heading: "On Writing and Self-Reflection",
    backgroundImage: "url('/imgs/bg-reflection.jpg'), linear-gradient(135deg, #533e1e 0%, #785529 100%)",
    content: `<p>When quality mentorship and mental health education are inaccessible, we must discover alternative methods of self-care and growth. Writing has become my most powerful tool—a way to express and explore emotions, thoughts, and experiences with remarkable clarity.</p>
    <p>By committing thoughts to paper, we process and make sense of complex emotions in ways that verbal communication alone cannot achieve. Through consistent writing practice, patterns and themes emerge from our experiences, offering valuable insights into how events have shaped us and illuminating paths toward deeper self-understanding.</p>
    <p>Ultimately, writing serves as both a window to our inner world and a bridge to understanding others. This same philosophy guides my research approach: document meticulously, reflect honestly, refine continuously, and share generously. Through this process, both personal growth and scientific advancement become possible.</p>`,
    quote: "Writing is a window to our own minds and a bridge to understanding others."
  },
  {
    id: "journey",
    title: "Journey",
    heading: "How Did I Get Here?",
    backgroundImage: "url('/imgs/bg-journey.jpg'), linear-gradient(135deg, #5c4726 0%, #856030 100%)",
    content: `<p>I found myself at a crossroads—alone and separated from the people and things that once anchored my life. In that moment of stark clarity, I realized all I truly possessed were my mind, accumulated knowledge, and cultivated skills.</p>
    <p>Facing this loss and adversity, I embraced the belief that I could actively shape my destiny. Rather than settling for passive complaints about the world's imperfections, I channeled that dissatisfaction into curiosity and action, refusing to cling to empty ideals without backing them with concrete efforts.</p>
    <p>Throughout these challenges, I've remained faithful to my identity and heritage while pursuing my dream of becoming a research scientist from Tamazgha, using computer science as a force for positive change. Each algorithm I develop, model I train, and paper I publish represents another step on this journey—not merely advancing the field, but honoring my roots and inspiring others from similar backgrounds to pursue their ambitions regardless of their starting point.</p>`,
    quote: "Each algorithm I write is another step on this path—not just to advance the field, but to represent my roots."
  },
  {
    id: "path",
    title: "Path",
    heading: "Where Are You Headed? —Iskanmagar",
    backgroundImage: "url('/imgs/bg-path.jpg'), linear-gradient(135deg, #654f2d 0%, #926a36 100%)",
    content: `<p>As I navigate life's uncertain terrain, I find myself drawn to experiences that challenge and inspire growth. I'm not seeking a predetermined destination but am driven by an intrinsic desire to learn, evolve, and make meaningful contributions to the world around me.</p>
    <p>Rather than chasing the elusive concept of happiness, I deliberately seek out what I fear most—recognizing that true growth and fulfillment emerge from confronting these fears directly, not avoiding them. This approach has transformed obstacles into opportunities for profound development.</p>
    <p>I've come to understand that change represents the only true constant, and I embrace it wholeheartedly, recognizing the endless opportunities for learning and growth it presents. Throughout my journey, I continuously push beyond comfortable boundaries, constantly striving to improve and evolve.</p>
    <p>This philosophical approach shapes my current research focus on Neural Matter Networks, contrastive learning methods, and transparent AI systems—each representing another manifestation of my core values. By venturing into uncharted territories, confronting difficult challenges in our field, and persevering through complexity, I hope to emerge with valuable contributions that benefit both science and society.</p>`,
    quote: "I seek out the things that I fear the most, for it is in confronting these fears that I find true growth."
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
const certificationItems = [
  {
    title: "TensorFlow Developer Certificate",
    skills: "Deep Learning / TensorFlow / MLOps",
    issuer: "TensorFlow.org",
    date: "December 2021",
    icon: "fab fa-tensorflow"
  },
  {
    title: "Software Design and Architecture",
    skills: "Software Architecture / Design Patterns / UML",
    issuer: "University of Alberta",
    date: "October 2020",
    icon: "fas fa-sitemap"
  },
  {
    title: "Software Product Management Specialization",
    skills: "Scrum / Agile / Product Management",
    issuer: "University of Alberta",
    date: "August 2020",
    icon: "fas fa-tasks"
  },
  {
    title: "Deep Learning Specialization",
    skills: "Python / TensorFlow / Deep Learning",
    issuer: "deeplearning.ai",
    date: "July 2020",
    icon: "fas fa-brain"
  }
];
const awardItems = [
  {
    title: "AI/ML Google Developer Expert",
    description: "Recognition for expertise and contributions to the AI/ML community",
    icon: "fas fa-award"
  },
  {
    title: "Rowan Research Fellowship Award",
    description: "Award for research excellence at Rowan University",
    icon: "fas fa-medal"
  },
  {
    title: "Google Scholarship: Professional Certificate",
    description: "Recognition of professional development in Google technologies",
    icon: "fab fa-google"
  },
  {
    title: "Google Scholarship: TensorFlow Certificate",
    description: "Recognition of TensorFlow expertise and contributions",
    icon: "fab fa-tensorflow"
  }
];
const experienceItems = [
  {
    company: "MLNomads L.L.C",
    title: "Research Scientist/C.E.O",
    location: "MARLTON, NJ",
    period: "November 2024—Present",
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
const profileData = {
  name: "Taha Bouhsine",
  nativeTitle: "ⵉⵙⴽⴰⵏⵎⴰⴳⴰⵔ",
  tagline: "ML Researcher & Engineer | Google Developer Expert in AI/ML | CEO of MLNomads",
  quote: "I build bridges between mathematical foundations of machine learning and their practical applications, between black-box neural networks and cosmos-inspired safe and interpretable AI models",
  socialLinks: [
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
};
const _sfc_main = {
  name: "AboutMeView",
  components: {
    ProfileCard,
    TabNavigation,
    StoryTab,
    TimelineList,
    CardGrid,
    ExperienceItem
  },
  setup() {
    useHead({
      title: "About Me | Taha Bouhsine",
      meta: [
        { name: "description", content: "ML Researcher & Google Developer Expert in AI/ML. Building bridges between mathematical foundations of machine learning and their practical applications, between black-box neural networks and cosmos-inspired safe and interpretable AI models." },
        { property: "og:title", content: "About Taha Bouhsine | ML Researcher & Google Developer Expert" },
        { property: "og:description", content: "Learn about Taha Bouhsine, ML Researcher & Google Developer Expert in AI/ML, CEO of MLNomads, focused on interpretable AI models and safe AI systems." },
        { property: "twitter:title", content: "About Taha Bouhsine | ML Researcher & Google Developer Expert" },
        { property: "twitter:description", content: "Learn about Taha Bouhsine, ML Researcher & Google Developer Expert in AI/ML, CEO of MLNomads, focused on interpretable AI models and safe AI systems." }
      ],
      link: [
        { rel: "canonical", href: "https://mlnomadpy.github.io/about" }
      ]
    });
  },
  data() {
    return {
      activeTab: "story",
      tabs,
      storyItems,
      educationItems,
      certificationItems,
      awardItems,
      experienceItems,
      profileData
    };
  },
  methods: {
    setActiveTab(tab) {
      this.activeTab = tab;
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_profile_card = resolveComponent("profile-card");
  const _component_tab_navigation = resolveComponent("tab-navigation");
  const _component_story_tab = resolveComponent("story-tab");
  const _component_timeline_list = resolveComponent("timeline-list");
  const _component_card_grid = resolveComponent("card-grid");
  const _component_ExperienceItem = resolveComponent("ExperienceItem");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "about-me view-container" }, _attrs))} data-v-6108204c><div class="section-content scrollable-content smooth-scroll" data-v-6108204c><h1 data-v-6108204c>about me</h1><div class="story-wrapper" data-v-6108204c>`);
  _push(ssrRenderComponent(_component_profile_card, $data.profileData, null, _parent));
  _push(`<div class="content-tabs" data-v-6108204c><div class="tab-navigation-wrapper" data-v-6108204c>`);
  _push(ssrRenderComponent(_component_tab_navigation, {
    activeTab: $data.activeTab,
    tabs: $data.tabs,
    onTabChange: $options.setActiveTab
  }, null, _parent));
  _push(`</div><div class="tab-content" data-v-6108204c><div class="tab-panel" style="${ssrRenderStyle($data.activeTab === "story" ? null : { display: "none" })}" data-v-6108204c>`);
  _push(ssrRenderComponent(_component_story_tab, { storyItems: $data.storyItems }, null, _parent));
  _push(`</div><div class="tab-panel" style="${ssrRenderStyle($data.activeTab === "education" ? null : { display: "none" })}" data-v-6108204c>`);
  _push(ssrRenderComponent(_component_timeline_list, {
    items: $data.educationItems,
    type: "education"
  }, null, _parent));
  _push(`</div><div class="tab-panel" style="${ssrRenderStyle($data.activeTab === "certifications" ? null : { display: "none" })}" data-v-6108204c>`);
  _push(ssrRenderComponent(_component_card_grid, {
    items: $data.certificationItems,
    type: "certification"
  }, null, _parent));
  _push(`</div><div class="tab-panel" style="${ssrRenderStyle($data.activeTab === "awards" ? null : { display: "none" })}" data-v-6108204c>`);
  _push(ssrRenderComponent(_component_card_grid, {
    items: $data.awardItems,
    type: "award"
  }, null, _parent));
  _push(`</div><div class="tab-panel" style="${ssrRenderStyle($data.activeTab === "experience" ? null : { display: "none" })}" data-v-6108204c>`);
  _push(ssrRenderComponent(_component_timeline_list, {
    items: $data.experienceItems,
    type: "experience"
  }, {
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
  _push(`</div></div></div></div></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/AboutMeView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const AboutMeView = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-6108204c"]]);
export {
  AboutMeView as default
};
