<!--
 * @author Blaeu Privacy Response Team
 * @copyright Copyright © 2019 - 2026 Team Blaeu. Content is licensed under CC BY 4.0 unless otherwise noted. All Rights Reserved.
 * @license CC BY 4.0
-->
// tw-AboutUs.vue
<template>
  <section id="about-us" class="py-6 bg-white dark:bg-gray-900 font-sourcesans3 relative z-0">
    <div class="container mx-auto px-4">
      <h2
        class="section-accent text-3xl font-semibold mb-6 text-center text-gray-900 dark:text-gray-100 leading-tight"
      >
        About
      </h2>

      <div class="max-w-2xl mx-auto">
        <p class="text-lg mb-3 text-gray-800 dark:text-gray-300">
          I advise in-house legal and public affairs teams at multinational companies, law firms,
          industry associations, and regulators on EU privacy and AI regulation, working solo or
          with specialist partners depending on the engagement.
        </p>
        <p class="text-lg mb-4 text-gray-800 dark:text-gray-300">
          Recent work includes expert testimony in data protection proceedings, GDPR personal data
          assessments for multinational clients, and advising regulators on privacy-enhancing
          technologies (PETs) as safeguards.
        </p>
        <p class="text-sm text-gray-600 dark:text-gray-400 mb-6">
          <NuxtLink
            to="/team/rvaneijk/"
            class="inline-block !p-0 text-gray-900 dark:text-gray-100 underline underline-offset-2"
          >
            Full profile
          </NuxtLink>
          <span class="mx-2 text-gray-300 dark:text-gray-600" aria-hidden="true">|</span>
          <a
            href="https://www.linkedin.com/in/rvaneijk88"
            target="_blank"
            rel="noopener"
            class="inline-block !p-0 text-gray-900 dark:text-gray-100 underline underline-offset-2"
          >
            LinkedIn
          </a>
          <span class="mx-2 text-gray-300 dark:text-gray-600" aria-hidden="true">|</span>
          <a
            href="https://orcid.org/0000-0002-2203-6819"
            target="_blank"
            rel="noopener"
            class="inline-block !p-0 text-gray-900 dark:text-gray-100 underline underline-offset-2"
          >
            ORCID
          </a>
        </p>
      </div>
    </div>
  </section>
</template>
