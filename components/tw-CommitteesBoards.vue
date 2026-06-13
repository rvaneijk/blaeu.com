<!--
 * @author Blaeu Privacy Response Team
 * @copyright Copyright © 2019 - 2026 Team Blaeu. Content is licensed under CC BY 4.0 unless otherwise noted. All Rights Reserved.
 * @license CC BY 4.0
-->
<template>
  <div class="py-4" role="listitem">
    <a
      href="#committees-details"
      class="portfolio-link font-bold text-gray-900 dark:text-gray-100 hover:text-brand-gold transition-colors duration-200"
      role="button"
      aria-haspopup="dialog"
      @click.prevent="openCommitteesModal"
      @keydown.enter.prevent="openCommitteesModal"
    >
      Committees &amp; Boards
    </a>
    <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
      16 advisory boards, standards committees, and W3C working groups
    </p>
  </div>
</template>

<script setup lang="ts">
  import { inject, computed } from 'vue'
  import type { MediaContentData } from '~/data/schema/media-content.schema'
  import committeesData from '~/data/committees-boards.json'

  const data = committeesData as MediaContentData

  const _committeesStats = computed(() => {
    const totalItems = data.totalItems
    const totalYears = data.sections.length

    const organizations = data.sections
      .flatMap(section => section.items.map(item => item.venue || ''))
      .filter(Boolean)

    const hasW3C = organizations.some(
      org => org.toLowerCase().includes('w3c') || org.toLowerCase().includes('world wide web')
    )

    const hasStandards = organizations.some(
      org =>
        org.toLowerCase().includes('standard') ||
        org.toLowerCase().includes('committee') ||
        org.toLowerCase().includes('working group')
    )

    const stats = [
      `${totalItems} advisory boards, standards committees, and governance groups`,
      `Active across ${totalYears} time periods`,
    ]

    if (hasW3C) {
      stats.push('W3C standardization working groups')
    } else if (hasStandards) {
      stats.push('Standards committees and working groups')
    }

    return stats
  })

  const openCommitteesModal = inject<() => void>('openCommitteesModal', () => {})
</script>
