<!--
 * @author Blaeu Privacy Response Team
 * @copyright Copyright © 2019 - 2026 Team Blaeu. Content is licensed under CC BY 4.0 unless otherwise noted. All Rights Reserved.
 * @license CC BY 4.0
-->
<template>
  <nav aria-label="Breadcrumb" class="mb-4 text-sm text-gray-600 dark:text-gray-400">
    <ol class="flex items-center gap-1.5">
      <li>
        <NuxtLink to="/" class="breadcrumb-link transition-colors" aria-label="Home">
          <i class="fas fa-house fa-sm text-brand-gold" aria-hidden="true"></i>
        </NuxtLink>
      </li>
      <li aria-hidden="true" class="text-gray-400 dark:text-gray-500">/</li>
      <li>
        <NuxtLink
          to="/blog"
          class="breadcrumb-link hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
        >
          Blog
        </NuxtLink>
      </li>
      <li aria-hidden="true" class="text-gray-400 dark:text-gray-500">/</li>
      <li>
        <span class="text-gray-700 dark:text-gray-300" aria-current="page">{{ title }}</span>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
  defineProps<{
    title: string
  }>()
</script>
