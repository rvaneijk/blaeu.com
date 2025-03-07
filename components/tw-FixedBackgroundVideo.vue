<!-- tw-FixedBackgroundVideo.vue -->
<template>
  <div class="fixed-video-container">
    <tw-VideoPlayer
      :dashSource="'/assets/dash/video/adaptive.mpd'"
      :fallbackSource="'/assets/dash/video/GettyImages-1368070487.mp4'"
      :lazyLoad="true"
      rootMargin="400px 0px"
      customClass="fixed-video"
    />
  </div>
</template>

<script>
export default {
  name: 'FixedBackgroundVideo',
  components: {
    'tw-VideoPlayer': () => import('~/components/tw-VideoPlayer.vue')
  }
}
</script>

<style scoped>
.fixed-video-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: -10; /* Place it behind all content */
  overflow: hidden;
  pointer-events: none; /* Allow interaction with content above */
}

.fixed-video {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
}
</style>