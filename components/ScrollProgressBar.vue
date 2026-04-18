<!--
 * @author Blaeu Privacy Response Team
 * @copyright Copyright © 2019 - 2026 Team Blaeu. Content is licensed under CC BY 4.0 unless otherwise noted. All Rights Reserved.
 * @license CC BY 4.0
-->
<template>
  <div
    role="progressbar"
    aria-label="Page scroll progress"
    :aria-valuenow="Math.round(progress)"
    aria-valuemin="0"
    aria-valuemax="100"
    class="scroll-progress-track"
  >
    <div ref="barEl" class="scroll-progress-bar"></div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, onUnmounted } from 'vue'

  const progress = ref(0)
  const barEl = ref<HTMLElement | null>(null)

  function updateProgress(): void {
    const scrollTop = window.scrollY
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    progress.value = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
    if (barEl.value) barEl.value.style.width = progress.value + '%'
  }

  onMounted(() => {
    window.addEventListener('scroll', updateProgress, { passive: true })
    updateProgress()
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', updateProgress)
  })
</script>

<style scoped>
  .scroll-progress-track {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background: transparent;
    z-index: 50;
  }
  .scroll-progress-bar {
    height: 100%;
    background: #00a8e6;
    transition: width 0.05s linear;
  }
</style>
