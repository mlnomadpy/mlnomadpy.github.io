import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderClass, ssrInterpolate, ssrRenderSlot, ssrRenderList } from "vue/server-renderer";
import { _ as _export_sfc } from "../main.mjs";
const _sfc_main = {
  name: "CompactList",
  props: {
    items: {
      type: Array,
      required: true
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
  emits: ["item-click"]
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "compact-list" }, _attrs))} data-v-815c59c0>`);
  if ($props.title) {
    _push(`<div class="list-header" data-v-815c59c0>`);
    if ($props.icon) {
      _push(`<i class="${ssrRenderClass($props.icon)}" data-v-815c59c0></i>`);
    } else {
      _push(`<!---->`);
    }
    _push(`<h2 data-v-815c59c0>${ssrInterpolate($props.title)}</h2><div class="list-controls" data-v-815c59c0>`);
    ssrRenderSlot(_ctx.$slots, "controls", {}, null, _push, _parent);
    _push(`</div></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`<div class="list-items" data-v-815c59c0><!--[-->`);
  ssrRenderList($props.items, (item, index) => {
    _push(`<div class="list-item" role="button" tabindex="0" data-v-815c59c0><div class="item-main" data-v-815c59c0><div class="item-title-row" data-v-815c59c0><h3 class="item-title" data-v-815c59c0>${ssrInterpolate(item.title)}</h3>`);
    if (item.period) {
      _push(`<span class="item-date" data-v-815c59c0>${ssrInterpolate(item.period)}</span>`);
    } else {
      _push(`<!---->`);
    }
    _push(`</div><div class="item-subtitle-row" data-v-815c59c0><span class="item-subtitle" data-v-815c59c0>${ssrInterpolate(item.subtitle || item.company)}</span>`);
    if (item.location) {
      _push(`<span class="item-location" data-v-815c59c0><i class="fas fa-map-marker-alt" data-v-815c59c0></i> ${ssrInterpolate(item.location)}</span>`);
    } else {
      _push(`<!---->`);
    }
    _push(`</div></div><div class="item-arrow" data-v-815c59c0><i class="fas fa-chevron-right" data-v-815c59c0></i></div></div>`);
  });
  _push(`<!--]--></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/about/CompactList.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const CompactList = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-815c59c0"]]);
export {
  CompactList as C
};
