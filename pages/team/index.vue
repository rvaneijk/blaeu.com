<!--
 * @author Blaeu Privacy Response Team
 * @copyright Copyright © 2019 - 2026 Team Blaeu. Content is licensed under CC BY 4.0 unless otherwise noted. All Rights Reserved.
 * @license CC BY 4.0
-->
<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Main content -->
    <main id="main-content" class="pt-12">
      <section class="py-12 bg-white dark:bg-gray-900">
        <div class="container mx-auto px-4 text-center">
          <h1 class="text-[2rem] font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Rob van Eijk
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-400 mb-8">
            AI, Privacy &amp; EU Regulatory Affairs
          </p>
          <NuxtLink
            to="/team/rvaneijk/"
            class="inline-block !p-0 text-gray-900 dark:text-gray-100 underline underline-offset-2"
          >
            Full profile
            <span aria-hidden="true">&rarr;</span>
          </NuxtLink>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <!--
    <tw-Footer />
-->
  </div>
</template>

<script setup lang="ts">
  // SEO meta
  useSeoMeta({
    title: 'Team | Blaeu',
    description: 'Rob van Eijk: expert witness and EU regulatory strategy on privacy and AI.',
    robots: 'noindex, nofollow',
  })
</script>
