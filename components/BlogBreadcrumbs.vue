<!--
 * @author Blaeu Privacy Response Team
 * @copyright Copyright © 2019 - 2026 Team Blaeu. Content is licensed under CC BY 4.0 unless otherwise noted. All Rights Reserved.
 * @license CC BY 4.0
-->
<template>
  <nav aria-label="Breadcrumb" class="mb-4 text-sm text-gray-500">
    <ol class="flex items-center gap-1.5">
      <li>
        <NuxtLink to="/" class="breadcrumb-link hover:text-gray-900 transition-colors">
          Home
        </NuxtLink>
      </li>
      <li aria-hidden="true" class="text-gray-400">/</li>
      <li>
        <NuxtLink to="/blog" class="breadcrumb-link hover:text-gray-900 transition-colors">
          Blog
        </NuxtLink>
      </li>
      <li aria-hidden="true" class="text-gray-400">/</li>
      <li>
        <span class="text-gray-700" aria-current="page">{{ title }}</span>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
  defineProps<{
    title: string
  }>()
</script>
