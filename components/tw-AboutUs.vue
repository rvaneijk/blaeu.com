<!--
 * @author Blaeu Privacy Response Team
 * @copyright Copyright © 2019 - 2026 Team Blaeu. Content is licensed under CC BY 4.0 unless otherwise noted. All Rights Reserved.
 * @license CC BY 4.0
-->
// tw-AboutUs.vue
<template>
  <section id="about-us" class="py-6 bg-white dark:bg-gray-900 font-amblelight relative z-0">
    <div class="container mx-auto px-4">
      <h2
        class="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-gray-100 leading-tight tracking-tight"
      >
        About
      </h2>

      <div class="max-w-4xl mx-auto">
        <div class="flex flex-col md:flex-row items-center gap-8 mb-0">
          <!-- Profile image on the left for medium screens and above -->
          <div class="md:w-1/3 md:self-stretch">
            <img
              src="/assets/img/tiny_welcome.webp"
              alt="Rob van Eijk - Founder of Team Blaeu"
              class="w-full h-full object-cover object-top"
              loading="lazy"
              width="400"
              height="500"
              @error="onImgError"
            />
          </div>

          <!-- About text with credential block -->
          <div class="md:w-2/3">
            <h3
              class="text-2xl font-bold mb-1 text-gray-900 dark:text-gray-100 leading-tight tracking-tight"
            >
              Rob van Eijk, PhD
            </h3>
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">
              Founder, Blaeu Privacy Response Team ·
              <a
                href="https://www.linkedin.com/in/rvaneijk88"
                target="_blank"
                rel="noopener"
                class="no-external-icon underline underline-offset-2 transition-colors !p-0"
              >
                LinkedIn
                <i class="fa-solid fa-external-link fa-xs" aria-hidden="true"></i>
              </a>
              ·
              <a
                href="https://orcid.org/0000-0002-2203-6819"
                target="_blank"
                rel="noopener"
                class="no-external-icon underline underline-offset-2 transition-colors !p-0"
              >
                ORCID
                <i class="fa-solid fa-external-link fa-xs" aria-hidden="true"></i>
              </a>
            </p>
            <p class="text-lg mb-2 text-gray-700 dark:text-gray-300">
              Through Team Blaeu, I advise in-house legal and public affairs teams at Fortune 500
              companies, law firms, and regulatory bodies on EU privacy and AI regulation, working
              solo or with specialist partners depending on the engagement. A PhD on Real Time
              Bidding and nine years at the Dutch DPA inform how the work gets done.
            </p>
            <p class="text-sm mb-4 text-gray-500 dark:text-gray-400">
              My recent work includes expert testimony in data protection proceedings, personal data
              qualification assessments under GDPR for multinational clients, and advising
              regulatory bodies on Privacy-Enhancing Technologies (PETs) as protective measures.
            </p>
            <div class="flex flex-wrap gap-x-4 gap-y-1 mb-6">
              <NuxtLink
                to="/contact"
                class="inline-flex items-center px-5 py-2 border border-gray-900 dark:border-gray-100 text-gray-900 dark:text-gray-100 hover:bg-gray-900 hover:text-white dark:hover:bg-gray-100 dark:hover:text-gray-900 font-semibold transition-colors duration-200 text-sm"
              >
                Work with me
              </NuxtLink>
              <NuxtLink
                to="/team/rvaneijk/"
                class="inline-flex items-center px-5 py-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors duration-200 underline underline-offset-2 !p-0 self-center"
              >
                Full profile &rarr;
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  const onImgError = (e: Event): void => {
    ;(e.target as HTMLImageElement).setAttribute('data-error', '1')
  }
</script>
