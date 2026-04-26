import { _ as __nuxt_component_0 } from './nuxt-link-CGB6kfhw.mjs';
import { mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';

const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_NuxtLink = __nuxt_component_0;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex min-h-screen flex-col items-center justify-center" }, _attrs))}><div class="text-center"><h1 class="mb-12 text-5xl font-semibold tracking-tight text-gray-100"> Concepts </h1><nav class="flex flex-col gap-8">`);
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: "/testimonials",
    class: "border border-gray-600 bg-gray-800 px-6 py-3 text-sm text-gray-200 transition-colors hover:bg-gray-700 hover:text-white"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` Testimonials `);
      } else {
        return [
          createTextVNode(" Testimonials ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<span class="cursor-default border border-gray-700 bg-gray-800/40 px-6 py-3 text-sm text-gray-500"> More coming soon </span></nav></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { index as default };
//# sourceMappingURL=index-irGAyjhi.mjs.map
