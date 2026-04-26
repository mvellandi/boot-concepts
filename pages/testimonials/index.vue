<template>
  <div class="flex flex-col items-center bg-gray-850 pt-12 text-gray-200 lg:text-[17px]">
    <!-- Docs section -->
    <div class="flex flex-col items-center w-full px-8 py-16 xl:px-0 xl:max-w-[1100px]">
      <div class="mb-12 text-center">
        <h2 class="mb-3 text-3xl font-arcuata font-semibold text-white sm:text-4xl lg:text-5xl lg:mb-5">
          Customer Success Stories
        </h2>
        <p class="mx-auto max-w-2xl text-gray-300 text-balance md:text-xl">
          Not every organization will offer a quotable testimonial. This section flexes
          around what's actually available — so there's always something meaningful to show.
        </p>
      </div>

      <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div class="border border-gray-500 bg-gray-800/30 p-6">
          <div class="mb-3 uppercase font-semibold tracking-widest text-gold">Type 1:&nbsp; Testimonial</div>
          <h3 class="mb-2 text-balance text-xl font-semibold text-gray-50">Attributed quote</h3>
          <p class="text-gray-300">
            A direct quote from an individual at an organization. Attribution can be a named
            person, a role, or a generic spokesperson when confidentiality is required.
          </p>
        </div>
        <div class="border border-gray-500 bg-gray-800/30 p-6">
          <div class="mb-3 text-balance uppercase tracking-widest text-gold">Type 2:&nbsp; Case Study</div>
          <h3 class="mb-2 text-xl font-semibold text-gray-50">Org-level narrative</h3>
          <p class="text-gray-300">
            A short paragraph describing how an organization uses the platform and what
            changed. No individual quoted — only an org name and optionally a department byline.
          </p>
        </div>
        <div class="border border-gray-500 bg-gray-800/30 p-6">
          <div class="mb-3 text-balance uppercase tracking-widest text-gold">Type 3:&nbsp; Combined Use</div>
          <h3 class="mb-2 text-xl font-semibold text-gray-50">Quote + context</h3>
          <p class="text-gray-300">
            A brief quote paired with explanatory prose from Boot.dev. Useful when only a
            few words were provided — the added context fills in what the quote alone can't convey.
          </p>
        </div>
      </div>

    </div>

    <!-- Directional Arrow -->
    <div class="-mt-10 mb-2 conditional-arrow hidden justify-center min-[1400px]:-mt-5 min-[1400px]:mb-4">
      <div class="flex items-center justify-center w-13 h-13 rounded-full border-2 bg-gray-850" style="border-color: #8B5A2B; margin: 5px;">
        <svg class="w-8 h-8" fill="none" stroke="#8B5A2B" viewBox="0 0 24 24" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 5v14M5 12l7 7 7-7"/>
        </svg>
      </div>
    </div>

    <!-- Divider -->
    <div class="h-[23px] w-full bg-center bg-[url('/images/woodendivider.webp')]"></div>

    <!-- Companies strip -->
    <div class="flex flex-col items-center text-center mt-12">
      <h2 class="text-balance font-arcuata text-3xl leading-tight text-gray-50 md:text-4xl lg:text-[2.6rem] lg:max-w-2xl">
        Company Success Stories
      </h2>
    </div>
    <div class="w-full px-0 pt-6.5 pb-10">
      <TestimonialStrip>
        <TestimonialCard
          org="Acme Corp"
          person="Jordan Lee, Engineering Manager"
          quote="Our junior devs went from shaky fundamentals to confidently shipping backend features. The hands-on format is what made the difference."
        />
        <TestimonialCard
          org="Pinnacle Software"
          person="Dana Kim, L&D Lead"
          quote="We've tried video courses and bootcamps. Boot.dev is the first platform where completion rates didn't fall off a cliff after week one."
        />
        <TestimonialCard
          org="CloudOps Inc."
          person="Alex Rivera, DevOps Lead"
          quote="The infrastructure curriculum is genuinely current — Kubernetes, Docker, CI/CD. Our team isn't learning yesterday's stack."
        />
        <TestimonialCard
          org="Midsize SaaS Co."
          person="Sam Patel, CTO"
          quote="The ROI was immediate. Within a month of onboarding our IT staff, they were handling tasks that used to require contractor support."
        />
        <TestimonialCard
          org="Greenfield Ventures"
          person="Taylor Brooks, Head of Engineering"
          quote="Cost-effective and self-paced. Our engineers fit it around sprint cycles without any scheduling headaches."
        />
      </TestimonialStrip>
    </div>

    <!-- Divider -->
    <div class="h-[23px] w-full bg-center bg-[url('/images/woodendivider.webp')]"></div>

    <!-- Schools strip -->
    <div class="flex flex-col items-center text-center mt-12">
      <h2 class="text-balance font-arcuata text-3xl leading-tight text-gray-50 md:text-4xl lg:text-[2.6rem] lg:max-w-2xl">
        School Success Stories
      </h2>
    </div>
    <div class="w-full px-0 pt-6.5 pb-10">
      <TestimonialStrip>
        <TestimonialCard
          org="Lincoln High School"
          person="Sarah Chen, CS Instructor"
          quote="Boot.dev completely transformed how my students engage with programming. The gamified approach keeps them motivated in a way that textbooks never could."
        />
        <TestimonialCard
          org="Code for Teens Summer Camp"
          person="James Park, Lead Instructor"
          quote="Students who come in with zero experience are writing real programs by week two. The structured path removes all the guesswork for instructors."
        />
        <TestimonialCard
          org="Westside Academy"
          person="David Kim, AP CS Teacher"
          quote="I've tried a dozen platforms. Boot.dev is the only one where students actually ask to do more lessons outside of class time."
        />
        <TestimonialCard
          org="Girls Who Code Chapter"
          person="Priya Nair, Program Director"
          quote="The browser-based environment is a game changer. No setup, no configuration — students open a laptop and start coding immediately."
        />
        <TestimonialCard
          org="TechBridge After-School Program"
          person="Maria Torres, Curriculum Lead"
          quote="Our students come from under-resourced schools. Boot.dev's self-paced model lets each kid move at their own speed without anyone falling behind."
        />
      </TestimonialStrip>
    </div>

    <!-- Divider -->
    <div class="h-[23px] w-full bg-center bg-[url('/images/woodendivider.webp')]"></div>

    <div class="h-24"></div>
  </div>
</template>

<script setup lang="ts">
// Nuxt 3 auto-imports TestimonialCard and TestimonialStrip
</script>

<style scoped>
@media (min-width: 1280px) and (max-width: 1500px) {
  .conditional-arrow {
    display: flex;
  }
}
</style>
