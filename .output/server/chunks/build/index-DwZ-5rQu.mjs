import { defineComponent, mergeProps, withCtx, createVNode, ref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrRenderSlot, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
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

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "TestimonialStrip",
  __ssrInlineRender: true,
  setup(__props) {
    ref(null);
    const isDragging = ref(false);
    ref(0);
    ref(0);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative box-border px-[50px]" }, _attrs))} data-v-31a17fd9><button aria-label="Previous" class="absolute left-0 top-1/2 z-10 flex h-9 w-9 -translate-y-[60%] cursor-pointer items-center justify-center border border-gold bg-[rgba(32,35,48,0.85)] text-lg text-gold" data-v-31a17fd9> ‹ </button><div class="${ssrRenderClass([isDragging.value ? "cursor-grabbing select-none" : "cursor-grab", "track-scroll flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 pl-4 pt-2"])}" data-v-31a17fd9>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div><button aria-label="Next" class="absolute right-0 top-1/2 z-10 flex h-9 w-9 -translate-y-[60%] cursor-pointer items-center justify-center border border-gold bg-[rgba(32,35,48,0.85)] text-lg text-gold" data-v-31a17fd9> › </button></div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/TestimonialStrip.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$2, [["__scopeId", "data-v-31a17fd9"]]), { __name: "TestimonialStrip" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "TestimonialCard",
  __ssrInlineRender: true,
  props: {
    org: {},
    person: {},
    quote: {},
    avatar: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex w-[254px] shrink-0 snap-start flex-col gap-[14px] border-2 border-gold bg-[rgba(32,35,48,0.75)] p-5 sm:w-[300px]" }, _attrs))}><div class="flex items-center gap-3">`);
      if (__props.avatar) {
        _push(`<img${ssrRenderAttr("src", __props.avatar)}${ssrRenderAttr("alt", __props.org)} class="h-12 w-12 shrink-0 rounded-full object-cover">`);
      } else {
        _push(`<div data-testid="avatar-placeholder" class="h-12 w-12 shrink-0 rounded-full bg-[#3c424f]"></div>`);
      }
      _push(`<div><div class="text-[15px] font-semibold leading-[1.3] text-white">${ssrInterpolate(__props.org)}</div><div class="mt-[3px] text-[13px] text-[#919dab]">${ssrInterpolate(__props.person)}</div></div></div><p class="m-0 text-[16px] leading-[1.5] tracking-[0.3px] text-slate-200">${ssrInterpolate(__props.quote)}</p></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/TestimonialCard.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_1 = Object.assign(_sfc_main$1, { __name: "TestimonialCard" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_TestimonialStrip = __nuxt_component_0;
      const _component_TestimonialCard = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-gray-850 pt-12 text-gray-200" }, _attrs))}><div class="mx-auto max-w-4xl px-8 py-16"><div class="mb-10 text-center"><h2 class="mb-3 text-3xl font-arcuata font-semibold text-gray-100 lg:text-5xl"> Customer Success Stories </h2><p class="mx-auto max-w-2xl text-gray-400"> Not every organization will offer a quotable testimonial. This section flexes around what&#39;s actually available — so there&#39;s always something meaningful to show. </p></div><div class="grid grid-cols-1 gap-6 md:grid-cols-3"><div class="border border-gray-500 bg-gray-800/30 p-6"><div class="mb-3 uppercase tracking-widest text-gold">Type 1 — Testimonial</div><h3 class="mb-2 text-xl font-semibold text-gray-100">Attributed quote</h3><p class="text-gray-400"> A direct quote from an individual at an organization. Attribution can be a named person, a role, or a generic spokesperson when confidentiality is required. </p></div><div class="border border-gray-500 bg-gray-800/30 p-6"><div class="mb-3 uppercase tracking-widest text-gold">Type 2 — Micro Case Study</div><h3 class="mb-2 text-xl font-semibold text-gray-100">Org-level narrative</h3><p class="text-gray-400"> A short paragraph describing how an organization uses the platform and what changed. No individual quoted — only an org name and optionally a department byline. </p></div><div class="border border-gray-500 bg-gray-800/30 p-6"><div class="mb-3 uppercase tracking-widest text-gold">Type 3 — Combined</div><h3 class="mb-2 text-xl font-semibold text-gray-100">Quote + context</h3><p class="text-gray-400"> A brief quote paired with explanatory prose from Boot.dev. Useful when only a few words were provided — the added context fills in what the quote alone can&#39;t convey. </p></div></div><div class="mt-8 border border-dashed border-gray-600 p-5 text-gray-400"><span class="font-medium text-gray-300">On the heading:</span> &quot;What X Has Told Us&quot; works when all entries are direct quotes. When the mix includes &quot;What X Has Told Us&quot; works when all entries are direct quotes. When the mix includes case studies or anonymous proof, the title would be adjusted. </div></div><div class="h-[23px] w-full bg-center bg-[url(&#39;/images/woodendivider.webp&#39;)]"></div><div class="flex flex-col items-center text-center mt-12"><h2 class="max-w-xs text-balance font-arcuata text-3xl leading-tight text-gray-100 lg:max-w-2xl lg:text-4xl pt-8 mb-0"> What Companies Have Told Us </h2></div><div class="mx-auto max-w-[1600px] px-6 pt-[26px] pb-10">`);
      _push(ssrRenderComponent(_component_TestimonialStrip, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_TestimonialCard, {
              org: "Acme Corp",
              person: "Jordan Lee, Engineering Manager",
              quote: "Our junior devs went from shaky fundamentals to confidently shipping backend features. The hands-on format is what made the difference."
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_TestimonialCard, {
              org: "Pinnacle Software",
              person: "Dana Kim, L&D Lead",
              quote: "We've tried video courses and bootcamps. Boot.dev is the first platform where completion rates didn't fall off a cliff after week one."
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_TestimonialCard, {
              org: "CloudOps Inc.",
              person: "Alex Rivera, DevOps Lead",
              quote: "The infrastructure curriculum is genuinely current — Kubernetes, Docker, CI/CD. Our team isn't learning yesterday's stack."
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_TestimonialCard, {
              org: "Midsize SaaS Co.",
              person: "Sam Patel, CTO",
              quote: "The ROI was immediate. Within a month of onboarding our IT staff, they were handling tasks that used to require contractor support."
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_TestimonialCard, {
              org: "Greenfield Ventures",
              person: "Taylor Brooks, Head of Engineering",
              quote: "Cost-effective and self-paced. Our engineers fit it around sprint cycles without any scheduling headaches."
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_TestimonialCard, {
                org: "Acme Corp",
                person: "Jordan Lee, Engineering Manager",
                quote: "Our junior devs went from shaky fundamentals to confidently shipping backend features. The hands-on format is what made the difference."
              }),
              createVNode(_component_TestimonialCard, {
                org: "Pinnacle Software",
                person: "Dana Kim, L&D Lead",
                quote: "We've tried video courses and bootcamps. Boot.dev is the first platform where completion rates didn't fall off a cliff after week one."
              }),
              createVNode(_component_TestimonialCard, {
                org: "CloudOps Inc.",
                person: "Alex Rivera, DevOps Lead",
                quote: "The infrastructure curriculum is genuinely current — Kubernetes, Docker, CI/CD. Our team isn't learning yesterday's stack."
              }),
              createVNode(_component_TestimonialCard, {
                org: "Midsize SaaS Co.",
                person: "Sam Patel, CTO",
                quote: "The ROI was immediate. Within a month of onboarding our IT staff, they were handling tasks that used to require contractor support."
              }),
              createVNode(_component_TestimonialCard, {
                org: "Greenfield Ventures",
                person: "Taylor Brooks, Head of Engineering",
                quote: "Cost-effective and self-paced. Our engineers fit it around sprint cycles without any scheduling headaches."
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="h-[23px] w-full bg-center bg-[url(&#39;/images/woodendivider.webp&#39;)]"></div><div class="flex flex-col items-center text-center mt-12"><h2 class="max-w-xs text-balance font-arcuata text-3xl leading-tight text-gray-100 lg:max-w-2xl lg:text-4xl"> What Schools Have Told Us </h2></div><div class="mx-auto max-w-[1600px] px-6 pt-[26px] pb-10">`);
      _push(ssrRenderComponent(_component_TestimonialStrip, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_TestimonialCard, {
              org: "Lincoln High School",
              person: "Sarah Chen, CS Instructor",
              quote: "Boot.dev completely transformed how my students engage with programming. The gamified approach keeps them motivated in a way that textbooks never could."
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_TestimonialCard, {
              org: "Code for Teens Summer Camp",
              person: "James Park, Lead Instructor",
              quote: "Students who come in with zero experience are writing real programs by week two. The structured path removes all the guesswork for instructors."
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_TestimonialCard, {
              org: "Westside Academy",
              person: "David Kim, AP CS Teacher",
              quote: "I've tried a dozen platforms. Boot.dev is the only one where students actually ask to do more lessons outside of class time."
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_TestimonialCard, {
              org: "Girls Who Code Chapter",
              person: "Priya Nair, Program Director",
              quote: "The browser-based environment is a game changer. No setup, no configuration — students open a laptop and start coding immediately."
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_TestimonialCard, {
              org: "TechBridge After-School Program",
              person: "Maria Torres, Curriculum Lead",
              quote: "Our students come from under-resourced schools. Boot.dev's self-paced model lets each kid move at their own speed without anyone falling behind."
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_TestimonialCard, {
                org: "Lincoln High School",
                person: "Sarah Chen, CS Instructor",
                quote: "Boot.dev completely transformed how my students engage with programming. The gamified approach keeps them motivated in a way that textbooks never could."
              }),
              createVNode(_component_TestimonialCard, {
                org: "Code for Teens Summer Camp",
                person: "James Park, Lead Instructor",
                quote: "Students who come in with zero experience are writing real programs by week two. The structured path removes all the guesswork for instructors."
              }),
              createVNode(_component_TestimonialCard, {
                org: "Westside Academy",
                person: "David Kim, AP CS Teacher",
                quote: "I've tried a dozen platforms. Boot.dev is the only one where students actually ask to do more lessons outside of class time."
              }),
              createVNode(_component_TestimonialCard, {
                org: "Girls Who Code Chapter",
                person: "Priya Nair, Program Director",
                quote: "The browser-based environment is a game changer. No setup, no configuration — students open a laptop and start coding immediately."
              }),
              createVNode(_component_TestimonialCard, {
                org: "TechBridge After-School Program",
                person: "Maria Torres, Curriculum Lead",
                quote: "Our students come from under-resourced schools. Boot.dev's self-paced model lets each kid move at their own speed without anyone falling behind."
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="h-[23px] w-full bg-center bg-[url(&#39;/images/woodendivider.webp&#39;)]"></div><div class="h-24"></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/testimonials/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-DwZ-5rQu.mjs.map
