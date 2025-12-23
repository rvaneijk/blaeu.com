<!--
 * @author Blaeu Privacy Response Team
 * @copyright Copyright © 2019 - 2025 Team Blaeu. Content is licensed under CC BY 4.0 unless otherwise noted. All Rights Reserved.
 * @license CC BY 4.0
-->
<template>
  <div
    class="bg-gray-50 p-6 rounded-lg shadow-md flex flex-col border-l-4 border-brand-blue"
    role="listitem"
  >
    <!-- Header with icon and title -->
    <div class="flex items-center mb-4">
      <div :class="[iconBgClass, 'w-10 h-10 rounded-full flex items-center justify-center mr-3']">
        <slot name="icon">
          <component
            :is="iconComponent"
            :class="[iconColorClass, iconSizeClass]"
            v-bind="iconProps"
          />
        </slot>
      </div>
      <h3 class="text-xl font-semibold">{{ title }}</h3>
    </div>

    <!-- Description -->
    <p class="mb-4">{{ description }}</p>

    <!-- Statistics/Content -->
    <div class="text-sm space-y-2 flex-grow">
      <div v-for="(statistic, index) in statistics" :key="index">
        {{ statistic }}
      </div>
    </div>

    <!-- Footer with category and action -->
    <div class="flex justify-between items-center mt-4">
      <div>
        <span
          :class="[
            categoryBgClass,
            categoryTextClass,
            'inline-block px-3 py-1 rounded-full text-xs',
          ]"
        >
          {{ category }}
        </span>
      </div>
      <a
        :href="modalTarget"
        class="inline-flex items-center text-brand-blue hover:text-[#0095CC] px-2 py-1 border border-transparent hover:border-brand-blue rounded transition-all duration-200"
        role="button"
        :aria-label="`Read more about ${title.toLowerCase()}`"
        aria-haspopup="dialog"
        @click.prevent="handleModalClick"
        @keydown.enter.prevent="handleModalClick"
      >
        <span>Read more</span>
        <svg
          class="w-4 h-4 ml-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5l7 7-7 7"
          ></path>
        </svg>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
  interface MediaTileProps {
    title: string
    description: string
    icon: string
    iconType?: 'svg' | 'fontawesome'
    iconBgColor?: string
    iconColor?: string
    category: string
    categoryBgColor?: string
    categoryTextColor?: string
    statistics: string[]
    modalHandler: () => void
    modalTarget: string
  }

  const props = withDefaults(defineProps<MediaTileProps>(), {
    iconType: 'svg',
    iconBgColor: 'bg-purple-100',
    iconColor: 'text-purple-600',
    categoryBgColor: 'bg-blue-100',
    categoryTextColor: 'text-blue-800',
  })

  // Computed properties for styling
  const iconBgClass = computed(() => props.iconBgColor)
  const iconColorClass = computed(() => props.iconColor)
  const iconSizeClass = computed(() => 'h-5 w-5')
  const categoryBgClass = computed(() => props.categoryBgColor)
  const categoryTextClass = computed(() => props.categoryTextColor)

  // Icon component logic
  const iconComponent = computed(() => {
    if (props.iconType === 'fontawesome') {
      return 'i'
    }
    return 'svg'
  })

  const iconProps = computed(() => {
    if (props.iconType === 'fontawesome') {
      return {
        class: props.icon,
      }
    }

    // Default SVG props for video icon (from original Popular Media tile)
    return {
      xmlns: 'http://www.w3.org/2000/svg',
      fill: 'none',
      viewBox: '0 0 24 24',
      stroke: 'currentColor',
      'aria-hidden': 'true',
    }
  })

  // Handle modal click
  const handleModalClick = (): void => {
    props.modalHandler()
  }
</script>
