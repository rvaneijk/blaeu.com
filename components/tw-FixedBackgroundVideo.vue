<!-- tw-FixedBackgroundVideo.vue -->
<template>
  <div class="fixed-video-container">
    <tw-VideoPlayer
      :dashSource="'/assets/dash/video/adaptive.mpd'"
      :fallbackSource="'/assets/dash/video/GettyImages-1368070487.mp4'"
      :lazyLoad="true"
      :useCachedPlayer="true"
      rootMargin="400px 0px"
      customClass="fixed-video"
      @dash-error="handleDashError"
      @dash-failed="handleDashFailed"
      @player-ready="handlePlayerReady"
    />
  </div>
</template>

<script>
export default {
  name: 'FixedBackgroundVideo',
  components: {
    'tw-VideoPlayer': () => import('~/components/tw-VideoPlayer.vue')
  },
  data() {
    return {
      videoStatus: 'loading'
    }
  },
  methods: {
    handleDashError(error) {
      console.warn('Background video DASH error:', error);
      this.videoStatus = 'fallback';
    },
    
    handleDashFailed(error) {
      console.error('Background video DASH failed:', error);
      this.videoStatus = 'fallback';
    },
    
    handlePlayerReady(player) {
      console.log('Background video player ready');
      this.videoStatus = 'ready';
      
      // If hero video already loaded and set up DASH, we can optimize some settings
      if (window && window.heroVideoLoaded) {
        // We know DASH is working, so we can optimize for second load
        try {
          player.updateSettings({
            streaming: {
              // Lower initial buffer for background video since we know DASH is working
              buffer: {
                initialBufferLevel: 1
              },
              // Can start with slightly lower quality for background since it's less critical
              abr: {
                initialBitrate: {
                  video: 1500 // Start with 1.5mbps
                }
              }
            }
          });
          
          // If we have advanced cache from dashPlugins, report metrics
          if (window.dashCache && typeof window.dashCache.reportMetrics === 'function') {
            window.dashCache.reportMetrics('background-video', {
              loadTime: Date.now(),
              source: 'dash',
              heroVideoPreloaded: true
            });
          }
        } catch (err) {
          console.warn('Could not update background video settings:', err);
        }
      }
    }
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