<!--
 * @author Blaeu Privacy Response Team
 * @copyright Copyright © 2019 - 2026 Team Blaeu. Content is licensed under CC BY 4.0 unless otherwise noted. All Rights Reserved.
 * @license CC BY 4.0
-->
<!--
  @component ShowAllSection
  @description Clamps a long list to a preview height with a "Show all" button.
  Focusing anything inside expands it, so keyboard users never land on hidden links.
-->
<template>
  <div>
    <div
      :id="contentId"
      :class="['relative', { [`${previewClass} overflow-hidden`]: !expanded }]"
      @focusin="expanded = true"
    >
      <slot />
      <div
        v-if="!expanded"
        class="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white dark:from-gray-900 pointer-events-none"
        aria-hidden="true"
      ></div>
    </div>
    <button
      type="button"
      class="mt-3 text-sm font-semibold text-gray-900 dark:text-gray-100 underline underline-offset-2"
      :aria-expanded="expanded"
      :aria-controls="contentId"
      @click="expanded = !expanded"
    >
      {{ expanded ? 'Show less' : `Show all ${count}` }}
    </button>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  const props = withDefaults(defineProps<{ id: string; count: number; previewClass?: string }>(), {
    previewClass: 'max-h-[28rem]',
  })

  const expanded = ref(false)
  const contentId = `${props.id}-list`
</script>
