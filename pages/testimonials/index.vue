<template>
  <div class="bg-gray-850 pt-12 text-gray-200">
    <!-- Docs section -->
    <div class="mx-auto max-w-4xl px-8 py-16">
      <div class="mb-10 text-center">
        <h2 class="mb-3 text-3xl font-semibold text-gray-100 lg:text-5xl">
          Customer Success Stories
        </h2>
        <p class="mx-auto max-w-2xl text-gray-400">
          Not every organization will offer a quotable testimonial. This section flexes
          around what's actually available — so there's always something meaningful to show.
        </p>
      </div>

      <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div class="border border-gray-500 bg-gray-800/30 p-6">
          <div class="mb-3 uppercase tracking-widest text-gold">Type 1 — Testimonial</div>
          <h3 class="mb-2 text-xl font-semibold text-gray-100">Attributed quote</h3>
          <p class="text-gray-400">
            A direct quote from an individual at an organization. Attribution can be a named
            person, a role, or a generic spokesperson when confidentiality is required.
          </p>
        </div>
        <div class="border border-gray-500 bg-gray-800/30 p-6">
          <div class="mb-3 uppercase tracking-widest text-gold">Type 2 — Micro Case Study</div>
          <h3 class="mb-2 text-xl font-semibold text-gray-100">Org-level narrative</h3>
          <p class="text-gray-400">
            A short paragraph describing how an organization uses the platform and what
            changed. No individual quoted — only an org name and optionally a department byline.
          </p>
        </div>
        <div class="border border-gray-500 bg-gray-800/30 p-6">
          <div class="mb-3 uppercase tracking-widest text-gold">Type 3 — Combined</div>
          <h3 class="mb-2 text-xl font-semibold text-gray-100">Quote + context</h3>
          <p class="text-gray-400">
            A brief quote paired with explanatory prose from Boot.dev. Useful when only a
            few words were provided — the added context fills in what the quote alone can't convey.
          </p>
        </div>
      </div>

      <div class="mt-8 border border-dashed border-gray-600 p-5 text-gray-400">
        <span class="font-medium text-gray-300">On the heading:</span>
        "What X Has Told Us" works when all entries are direct quotes. When the mix includes
        case studies or anonymous proof, the title would be adjusted.
      </div>
    </div>

    <!-- Divider -->
    <div class="h-[23px] w-full bg-center bg-[url('/images/woodendivider.webp')]"></div>

    <!-- Companies strip -->
    <div class="flex flex-col items-center text-center mt-12">
      <h2 class="max-w-xs text-balance text-3xl leading-16 text-gray-100 lg:max-w-2xl lg:text-4xl pt-8 mb-0">
        What Companies Have Told Us
      </h2>
    </div>
    <div class="mx-auto max-w-[1600px] px-6 pt-[26px] pb-10">
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
      <h2 class="max-w-xs text-balance text-3xl leading-16 text-gray-100 lg:max-w-2xl lg:text-4xl">
        What Schools Have Told Us
      </h2>
    </div>
    <div class="mx-auto max-w-[1600px] px-6 pt-[26px] pb-10">
      <TestimonialStrip class="px-4">
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
