<!--
 * @author Blaeu Privacy Response Team
 * @copyright Copyright © 2019 - 2025 Team Blaeu. Content is licensed under CC BY 4.0 unless otherwise noted. All Rights Reserved.
 * @license CC BY 4.0
-->
<template>
  <div
    class="bg-gray-50 p-6 rounded-lg shadow-md flex flex-col border-l-4 border-brand-grey"
    role="listitem"
  >
    <h3 class="text-xl font-semibold text-gray-900 mb-2">Committees & Boards</h3>
    <div class="mb-3">
      <span class="inline-block px-2 py-1 bg-brand-grey text-white rounded text-xs">
        governance
      </span>
    </div>
    <p class="mb-4 text-gray-700 text-sm leading-relaxed">
      Active participation in advisory boards, standards committees, and governance groups in
      privacy and technology.
    </p>
    <div class="text-sm space-y-2 flex-grow text-gray-600">
      <div v-for="stat in committeesStats" :key="stat">{{ stat }}</div>
    </div>
    <div class="mt-4">
      <a
        href="#committees-details"
        class="inline-flex items-center gap-2 text-brand-grey hover:text-gray-800 text-sm font-medium transition-colors duration-200"
        role="button"
        aria-haspopup="dialog"
        @click.prevent="openCommitteesModal"
        @keydown.enter.prevent="openCommitteesModal"
      >
        <i class="fas fa-users fa-xs text-brand-gold" aria-hidden="true"></i>
        View Governance Portfolio
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { inject, computed } from 'vue'
  import type { MediaContentData } from '~/data/schema/media-content.schema'
  import committeesData from '~/data/committees-boards.json'

  // Load and process committees data
  const data = committeesData as MediaContentData

  // Generate dynamic statistics from actual JSON data
  const committeesStats = computed(() => {
    const totalItems = data.totalItems
    const totalYears = data.sections.length

    // Extract unique organization types from venue data
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
      `${totalItems} committee and board positions`,
      `Active across ${totalYears} time periods`,
    ]

    if (hasW3C) {
      stats.push('W3C standardization working groups')
    } else if (hasStandards) {
      stats.push('Standards committees and working groups')
    }

    return stats
  })

  // Get the modal handler from parent component via injection
  const openCommitteesModal = inject<() => void>('openCommitteesModal', () => {
    // Fallback function when modal handler is not provided
  })
</script>
