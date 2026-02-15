<!--
 * @author Blaeu Privacy Response Team
 * @copyright Copyright © 2019 - 2026 Team Blaeu. Content is licensed under CC BY 4.0 unless otherwise noted. All Rights Reserved.
 * @license CC BY 4.0
-->
<template>
  <nav
    v-if="tocItems.length >= 2"
    aria-label="Table of contents"
    class="toc mb-8 rounded-lg border border-gray-200 bg-gray-50 p-5"
  >
    <h2 class="toc-heading text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">
      Table of Contents
    </h2>
    <ol class="list-none m-0 p-0 space-y-1.5">
      <li v-for="item in tocItems" :key="item.id" :class="{ 'ml-4': item.level === 3 }">
        <a
          :href="'#' + item.id"
          class="toc-link text-sm text-gray-600 hover:text-gray-900 transition-colors"
          @click.prevent="scrollTo(item.id)"
        >
          {{ item.text }}
        </a>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue'

  interface TocItem {
    id: string
    text: string
    level: number
  }

  const tocItems = ref<TocItem[]>([])

  function slugify(text: string): string {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  function scrollTo(id: string): void {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  onMounted(() => {
    const article = document.querySelector('article')
    if (!article) return
    const headings = article.querySelectorAll('h2, h3')
    headings.forEach(h => {
      const text = h.textContent?.trim() || ''
      const id = slugify(text)
      h.id = id
      h.style.scrollMarginTop = '8rem'
      tocItems.value.push({ id, text, level: h.tagName === 'H2' ? 2 : 3 })
    })
  })
</script>
