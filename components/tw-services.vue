<!--
 * @author Blaeu Privacy Response Team
 * @copyright Copyright © 2019 - 2026 Team Blaeu. Content is licensed under CC BY 4.0 unless otherwise noted. All Rights Reserved.
 * @license CC BY 4.0
-->
// tw-Services.vue
<template>
  <section id="expertise" class="py-8 bg-white dark:bg-gray-900 font-sourcesans3 scroll-mt-0">
    <div class="container mx-auto px-4">
      <h2
        class="section-accent text-3xl font-semibold mb-6 text-center text-gray-900 dark:text-gray-100 leading-tight"
      >
        What I do
      </h2>
      <p class="text-lg text-gray-800 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
        From regulatory strategy and expert evidence to privacy-enhancing technologies, I work
        hands-on with clients across industry and the public sector.
      </p>

      <!-- Services grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Service 1: Expert Witness -->
        <div class="py-6 md:px-6">
          <h3 class="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100 leading-tight">
            Expert Witness & Legal Advisory
          </h3>
          <ul class="flex flex-wrap gap-1.5 mb-3" aria-label="Topics">
            <li
              class="px-2 py-0.5 text-xs rounded border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-300"
            >
              GDPR
            </li>
            <li
              class="px-2 py-0.5 text-xs rounded border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-300"
            >
              Adtech
            </li>
            <li
              class="px-2 py-0.5 text-xs rounded border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-300"
            >
              AI
            </li>
          </ul>
          <p class="text-lg text-gray-800 dark:text-gray-300">
            Independent explanations of how adtech auctions, AI models, and tracking systems work,
            written so they hold up in court.
          </p>
          <NuxtLink
            to="/services/expert-witness/"
            class="inline-block !p-0 text-gray-900 dark:text-gray-100 underline underline-offset-2 mt-3 text-sm"
          >
            More on expert witness work
            <span aria-hidden="true">&rarr;</span>
          </NuxtLink>
        </div>

        <!-- Service 2: PETs & Anonymisation -->
        <div class="py-6 md:px-6">
          <h3 class="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100 leading-tight">
            Privacy-Enhancing Technologies &amp; Anonymisation
          </h3>
          <ul class="flex flex-wrap gap-1.5 mb-3" aria-label="Topics">
            <li
              class="px-2 py-0.5 text-xs rounded border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-300"
            >
              PETs
            </li>
            <li
              class="px-2 py-0.5 text-xs rounded border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-300"
            >
              Anonymisation
            </li>
            <li
              class="px-2 py-0.5 text-xs rounded border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-300"
            >
              GDPR
            </li>
            <li
              class="px-2 py-0.5 text-xs rounded border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-300"
            >
              DMA
            </li>
          </ul>
          <p class="text-lg text-gray-800 dark:text-gray-300">
            Design and review of data-sharing set-ups (pseudonymisation, anonymisation, data clean
            rooms, secure computation) that hold up against the EDPB anonymisation test.
          </p>
          <NuxtLink
            to="/services/pets-anonymisation/"
            class="inline-block !p-0 text-gray-900 dark:text-gray-100 underline underline-offset-2 mt-3 text-sm"
          >
            More on PETs and anonymisation
            <span aria-hidden="true">&rarr;</span>
          </NuxtLink>
        </div>

        <!-- Service 3: EU Regulatory Strategy -->
        <div class="py-6 md:px-6">
          <h3 class="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100 leading-tight">
            EU Regulatory Strategy & AI Governance
          </h3>
          <ul class="flex flex-wrap gap-1.5 mb-3" aria-label="Topics">
            <li
              class="px-2 py-0.5 text-xs rounded border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-300"
            >
              GDPR
            </li>
            <li
              class="px-2 py-0.5 text-xs rounded border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-300"
            >
              AI Act
            </li>
            <li
              class="px-2 py-0.5 text-xs rounded border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-300"
            >
              DMA
            </li>
            <li
              class="px-2 py-0.5 text-xs rounded border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-300"
            >
              PETs
            </li>
          </ul>
          <p class="text-lg text-gray-800 dark:text-gray-300">
            GDPR and AI Act strategy, from personal data qualifications to governance frameworks,
            grounded in how European regulators investigate and decide.
          </p>
          <NuxtLink
            to="/services/regulatory-strategy/"
            class="inline-block !p-0 text-gray-900 dark:text-gray-100 underline underline-offset-2 mt-3 text-sm"
          >
            More on EU regulatory strategy
            <span aria-hidden="true">&rarr;</span>
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>
