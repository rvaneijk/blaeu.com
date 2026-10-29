<!--
 * @author Blaeu Privacy Response Team
 * @copyright Copyright © 2019 - 2026 Team Blaeu. Content is licensed under CC BY 4.0 unless otherwise noted. All Rights Reserved.
 * @license CC BY 4.0
-->
<template>
  <div aria-hidden="true" :class="['scroll-progress-track', { 'is-visible': isLongPage }]">
    <div ref="barEl" class="scroll-progress-bar"></div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, onUnmounted } from 'vue'

  // Shown only where it helps: pages longer than four screens. On desktop that is the
  // portfolio and recordings; on a phone, every long page.
  const LONG_PAGE_SCREENS = 4

  const isLongPage = ref(false)
  const barEl = ref<HTMLElement | null>(null)
  let observer: ResizeObserver | null = null

  function update(): void {
    const docHeight = document.documentElement.scrollHeight
    const scrollable = docHeight - window.innerHeight
    isLongPage.value = docHeight > window.innerHeight * LONG_PAGE_SCREENS
    const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0
    if (barEl.value) barEl.value.style.width = progress + '%'
  }

  onMounted(() => {
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update, { passive: true })
    observer = new ResizeObserver(update)
    observer.observe(document.body)
    update()
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', update)
    window.removeEventListener('resize', update)
    observer?.disconnect()
  })
</script>

<style scoped>
  .scroll-progress-track {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background: transparent;
    z-index: 50;
  }
  .scroll-progress-track.is-visible {
    display: block;
  }
  .scroll-progress-bar {
    width: 0;
    height: 100%;
    background: #00a8e6;
    transition: width 0.05s linear;
  }
  @media (prefers-reduced-motion: reduce) {
    .scroll-progress-bar {
      transition: none;
    }
  }
</style>
