<template>
  <div class="flex flex-col items-center bg-gray-850 pt-12 text-gray-200 lg:text-[17px]">
    <!-- Docs section -->
    <div class="flex flex-col items-center w-full px-8 py-16 xl:px-0 xl:max-w-[1100px]">
      <div class="mb-12 text-center">
        <h2 class="mb-3 text-3xl font-arcuata font-semibold text-white sm:text-4xl lg:text-5xl lg:mb-5">
          Customer Success Stories
        </h2>
        <p class="mx-auto max-w-2xl text-gray-300 text-balance md:text-xl md:leading-8">
          While not everyone can offer a great quotable testimonial, "mini cupcakes" can be made with:
        </p>
      </div>

      <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div class="border border-gray-500 bg-gray-800/30 p-6">
          <div class="mb-3 uppercase font-semibold tracking-widest text-gold">Type 1:&nbsp; Testimonial</div>
          <p class="text-gray-300">
            A direct quote from an individual at an organization. It could be a named
            person, a role, or a generic spokesperson when confidentiality is required.
          </p>
        </div>
        <div class="border border-gray-500 bg-gray-800/30 p-6">
          <div class="mb-3 text-balance uppercase tracking-widest text-gold">Type 2:&nbsp; Case Study</div>
          <p class="text-gray-300">
            A short paragraph about how an organization uses Boot.dev and possible results. No person quoted — only an org name and optionally a department byline.
          </p>
        </div>
        <div class="border border-gray-500 bg-gray-800/30 p-6">
          <div class="mb-3 text-balance uppercase tracking-widest text-gold">Type 3:&nbsp; Combined Use</div>
          <p class="text-gray-300">
            A brief quote paired with descriptive text. Useful when only a few words were provided, with the added context filling in the blanks.
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
          subhead="Jordan Lee, Engineering Manager"
          quote="Our junior devs went from shaky fundamentals to confidently shipping backend features. The hands-on format is what made the difference."
        />
        <TestimonialCard
          org="Pinnacle Software"
          subhead="Dana Kim, L&D Lead"
          quote="Completion rates didn't fall off a cliff after week one."
          description="After trying video courses and bootcamps, Pinnacle adopted Boot.dev across its L&D program and saw retention hold steady through the full curriculum."
        />
        <TestimonialCard
          org="CloudOps Inc."
          subhead="Alex Rivera, DevOps Lead"
          quote="The infrastructure curriculum is genuinely current — Kubernetes, Docker, CI/CD. Our team isn't learning yesterday's stack."
        />
        <TestimonialCard
          org="Midsize SaaS Co."
          subhead="Amsterdam, The Netherlands"
          description="After onboarding their internal IT staff to Boot.dev, the team began handling infrastructure tasks that previously required outside contractors — reducing spend within the first month."
        />
        <TestimonialCard
          org="Greenfield Ventures"
          subhead="Savannah, USA"
          description="Greenfield's engineers use Boot.dev as a self-paced upskilling track that fits around sprint cycles, making it possible to grow technical depth without disrupting delivery."
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
          subhead="Sarah Chen, CS Instructor"
          quote="Boot.dev completely transformed how my students engage with programming. The gamified approach keeps them motivated in a way that textbooks never could."
        />
        <TestimonialCard
          org="Code for Teens Summer Camp"
          subhead="Dublin, Ireland"
          description="Campers arrive with zero programming experience and are writing real programs by week two. The structured curriculum lets instructors focus on coaching rather than building lesson plans from scratch."
        />
        <TestimonialCard
          org="Westside Academy"
          subhead="David Kim, AP CS Teacher"
          quote="Students actually ask to do more lessons outside of class."
          description="After evaluating a dozen platforms for the AP CS program, Westside settled on Boot.dev as the one that consistently held student attention beyond required coursework."
        />
        <TestimonialCard
          org="Girls Who Code Chapter"
          subhead="Priya Nair, Program Director"
          quote="The browser-based environment is a game changer. No setup, no configuration — students open a laptop and start coding immediately."
        />
        <TestimonialCard
          org="TechBridge After-School Program"
          subhead="Tacoma, USA"
          description="Serving students from under-resourced schools, TechBridge uses Boot.dev's self-paced model so each learner can progress at their own speed without holding back the rest of the cohort."
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
