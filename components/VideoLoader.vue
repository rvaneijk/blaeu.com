<!--
 * @author Blaeu Privacy Response Team
 * @copyright Copyright © 2019 - 2025 Team Blaeu. Content is licensed under CC BY 4.0 unless otherwise noted. All Rights Reserved.
 * @license CC BY 4.0
-->
<!--
  @component VideoLoader
  @description Loading placeholder and states for video components
  @props {boolean} isLoading - Whether video is currently loading
  @props {string} videoTitle - Accessible title for the loading video
  @props {boolean} decorative - Whether video is decorative (affects display)
-->
<template>
  <div
    v-if="isLoading && !decorative"
    class="video-loading-placeholder"
    :aria-label="`Loading ${sanitizedVideoTitle}`"
    role="status"
  >
    <div class="loading-content">
      <div class="loading-spinner" aria-hidden="true">
        <i class="fa-solid fa-spinner fa-spin"></i>
      </div>
      <p class="loading-text">Loading video...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { sanitizeTitle } from '@/utils/validation'

  // Define props interface
  interface Props {
    isLoading?: boolean
    videoTitle?: string
    decorative?: boolean
  }

  // Props with defaults
  const props = withDefaults(defineProps<Props>(), {
    isLoading: false,
    videoTitle: 'Video content',
    decorative: true,
  })

  // Computed properties
  const sanitizedVideoTitle = computed((): string => {
    return sanitizeTitle(props.videoTitle)
  })
</script>

<style scoped>
  .video-loading-placeholder {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #1a1a1a;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
  }

  .loading-content {
    text-align: center;
    color: white;
  }

  .loading-spinner {
    font-size: 2rem;
    margin-bottom: 1rem;
    color: #ffcc00;
  }

  .loading-text {
    font-size: 1rem;
    opacity: 0.8;
    margin: 0;
  }
</style>
