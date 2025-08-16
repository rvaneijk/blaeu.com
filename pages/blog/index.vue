<!--
 * @author Blaeu Privacy Response Team
 * @copyright Copyright © 2019 - 2025 Team Blaeu. Content is licensed under CC BY 4.0 unless otherwise noted. All Rights Reserved.
 * @license CC BY 4.0
-->
<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <tw-NavbarMinimal />

    <!-- Main content -->
    <main id="main-content" class="pt-28">
      <twResearchHighlights />
    </main>

    <!-- Footer -->
    <tw-FooterMinimal />
  </div>
</template>

<script setup>
  // Define component name to satisfy multi-word rule
  defineOptions({
    name: 'BlogPage',
  })

  // SEO meta
  useSeoMeta({
    title: 'Blog | Team Blaeu',
    description: 'Privacy insights and thought leadership from Team Blaeu.',
  })
</script>
