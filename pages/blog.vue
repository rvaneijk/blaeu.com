<!--
 * @author Blaeu Privacy Response Team
 * @copyright Copyright © 2019 - 2025 Team Blaeu. Content is licensed under CC BY 4.0 unless otherwise noted. All Rights Reserved.
 * @license CC BY 4.0
-->
<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <tw-NavbarSimple />

    <!-- Main content -->
    <main id="main-content" class="pt-28">
      <section class="py-16 bg-white">
        <div class="container mx-auto px-4 text-center">
          <h1 class="text-4xl font-bold text-gray-900 mb-4">Blog</h1>
          <p class="text-xl text-gray-600 mb-8">
            Privacy insights and thought leadership from Team Blaeu.
          </p>
          <div class="text-gray-500">
            <p>Blog posts coming soon - we have 5 drafts in preparation.</p>
          </div>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <tw-FooterMain />
  </div>
</template>

<script setup>
// Import footer component
import twFooterMain from '~/components/tw-FooterMain.vue'

// Define component name to satisfy multi-word rule
defineOptions({
  name: 'BlogPage'
})

// SEO meta
useSeoMeta({
  title: 'Blog | Team Blaeu',
  description: 'Privacy insights and thought leadership from Team Blaeu.',
  robots: 'noindex, nofollow' // Under development
})
</script>