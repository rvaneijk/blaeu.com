<!--
 * @author Blaeu Privacy Response Team
 * @copyright Copyright © 2019 - 2025 Team Blaeu. Content is licensed under CC BY 4.0 unless otherwise noted. All Rights Reserved.
 * @license CC BY 4.0
-->
<!--
  @component VideoControls
  @description Custom accessible overlay controls for video playback including play/pause, mute, and captions
  @props {boolean} isPlaying - Current playing state
  @props {boolean} isMuted - Current mute state 
  @props {boolean} captionsEnabled - Current captions state
  @props {boolean} showCaptions - Whether to show captions toggle button
  @emits play-pause - Toggle video playback
  @emits toggle-mute - Toggle video mute state
  @emits toggle-captions - Toggle video captions
-->
<template>
  <div class="video-overlay-controls">
    <button
      class="video-control-btn"
      :aria-label="isPlaying ? 'Pause video' : 'Play video'"
      @click="$emit('play-pause')"
    >
      <i :class="[isPlaying ? 'fa-solid fa-pause' : 'fa-solid fa-play']" aria-hidden="true"></i>
    </button>

    <button
      class="video-control-btn"
      :aria-label="isMuted ? 'Unmute video' : 'Mute video'"
      @click="$emit('toggle-mute')"
    >
      <i
        :class="[isMuted ? 'fa-solid fa-volume-xmark' : 'fa-solid fa-volume-high']"
        aria-hidden="true"
      ></i>
    </button>

    <button
      v-if="showCaptions"
      class="video-control-btn"
      :aria-label="captionsEnabled ? 'Disable captions' : 'Enable captions'"
      :class="{ 'captions-active': captionsEnabled }"
      @click="$emit('toggle-captions')"
    >
      <i class="fa-solid fa-closed-captioning" aria-hidden="true"></i>
    </button>
  </div>
</template>

<script setup lang="ts">
  // Define props interface
  interface Props {
    isPlaying?: boolean
    isMuted?: boolean
    captionsEnabled?: boolean
    showCaptions?: boolean
  }

  // Define emits interface
  interface Emits {
    (event: 'play-pause'): void
    (event: 'toggle-mute'): void
    (event: 'toggle-captions'): void
  }

  // Props with defaults
  withDefaults(defineProps<Props>(), {
    isPlaying: false,
    isMuted: true,
    captionsEnabled: false,
    showCaptions: false,
  })

  // Define emits
  defineEmits<Emits>()
</script>

<style scoped>
  .video-overlay-controls {
    position: absolute;
    bottom: 1rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 1rem;
    background-color: rgba(0, 0, 0, 0.7);
    padding: 0.75rem;
    border-radius: 2rem;
    z-index: 5;
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  .video-control-btn {
    background-color: rgba(255, 255, 255, 0.2);
    color: white;
    border: none;
    border-radius: 50%;
    width: 3rem;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .video-control-btn:hover,
  .video-control-btn:focus {
    background-color: rgba(255, 255, 255, 0.4);
  }

  .video-control-btn:focus-visible {
    outline: 3px solid #ffcc00;
    outline-offset: 2px;
  }

  .video-control-btn.captions-active {
    background-color: rgba(255, 204, 0, 0.8);
    color: #000;
  }

  .video-control-btn.captions-active:hover,
  .video-control-btn.captions-active:focus {
    background-color: rgba(255, 204, 0, 1);
  }

  .video-control-btn i {
    font-size: 1.25rem;
    color: inherit;
    filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.8));
  }

  .video-control-btn.captions-active i {
    filter: none;
  }

  @media (max-width: 640px) {
    .video-control-btn {
      width: 3.5rem;
      height: 3.5rem;
    }
  }
</style>
