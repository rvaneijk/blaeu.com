<!--
 * @author Blaeu Privacy Response Team
 * @copyright Copyright © 2019 - 2026 Team Blaeu. Content is licensed under CC BY 4.0 unless otherwise noted. All Rights Reserved.
 * @license CC BY 4.0
-->
<template>
  <div class="flex items-center gap-3 mt-4">
    <span class="text-sm share-label">Share:</span>
    <a
      :href="linkedInUrl"
      target="_blank"
      rel="noopener noreferrer"
      class="share-link"
      aria-label="Share on LinkedIn"
      title="Share on LinkedIn"
    >
      <i class="fa-brands fa-linkedin" aria-hidden="true"></i>
    </a>
    <a
      :href="blueskyUrl"
      target="_blank"
      rel="noopener noreferrer"
      class="share-link"
      aria-label="Share on Bluesky"
      title="Share on Bluesky"
    >
      <i class="fa-brands fa-bluesky" aria-hidden="true"></i>
    </a>
    <button
      class="share-link"
      aria-label="Share on Mastodon"
      title="Share on Mastodon"
      @click="shareOnMastodon"
    >
      <i class="fa-brands fa-mastodon" aria-hidden="true"></i>
    </button>
    <a :href="emailUrl" class="share-link" aria-label="Share via email" title="Share via email">
      <i class="fa-regular fa-envelope" aria-hidden="true"></i>
    </a>
    <button
      class="share-link"
      :aria-label="copied ? 'Link copied!' : 'Copy link'"
      :title="copied ? 'Link copied!' : 'Copy link'"
      @click="copyLink"
    >
      <i :class="copied ? 'fa-solid fa-check' : 'fa-solid fa-link'" aria-hidden="true"></i>
    </button>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue'

  const props = defineProps<{
    title: string
    url: string
  }>()

  const copied = ref(false)

  const linkedInUrl = computed(
    () => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(props.url)}`
  )

  const blueskyUrl = computed(
    () =>
      `https://bsky.app/intent/compose?text=${encodeURIComponent(props.title + ' ' + props.url)}`
  )

  const emailUrl = computed(
    () => `mailto:?subject=${encodeURIComponent(props.title)}&body=${encodeURIComponent(props.url)}`
  )

  function shareOnMastodon(): void {
    const instance = window.prompt('Enter your Mastodon instance (e.g. mastodon.social):')
    if (instance) {
      const host = instance.replace(/^https?:\/\//, '').replace(/\/+$/, '')
      const text = encodeURIComponent(props.title + ' ' + props.url)
      window.open(`https://${host}/share?text=${text}`, '_blank', 'noopener,noreferrer')
    }
  }

  async function copyLink(): Promise<void> {
    try {
      await navigator.clipboard.writeText(props.url)
      copied.value = true
      setTimeout(() => {
        copied.value = false
      }, 2000)
    } catch {
      // fallback: select a temporary input
      const input = document.createElement('input')
      input.value = props.url
      document.body.appendChild(input)
      input.select()
      document.execCommand('copy')
      document.body.removeChild(input)
      copied.value = true
      setTimeout(() => {
        copied.value = false
      }, 2000)
    }
  }
</script>

<style scoped>
  .share-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    border-radius: 9999px;
    color: #6b7280;
    transition: color 0.2s;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.1rem;
  }
  .share-link:hover {
    color: #ffd700;
  }
  .share-label {
    color: #6b7280;
  }
  .share-link i {
    color: inherit !important;
  }
</style>
