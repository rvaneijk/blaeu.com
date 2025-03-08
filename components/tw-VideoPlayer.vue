<!-- tw-VideoPlayer.vue -->
<template>
  <video 
    ref="videoPlayer"
    class="video-element"
    autoplay
    muted
    loop
    playsinline
    preload="metadata"
    :class="customClass"
  >
    <!-- Fallback for browsers that don't support DASH -->
    <source :src="fallbackSource" type="video/mp4">
    Your browser does not support the video tag.
  </video>
</template>

<script>
export default {
  name: 'VideoPlayer',
  props: {
    dashSource: {
      type: String,
      default: '/assets/dash/video/adaptive.mpd'
    },
    fallbackSource: {
      type: String,
      default: '/assets/dash/video/GettyImages-1368070487.mp4'
    },
    lazyLoad: {
      type: Boolean,
      default: false
    },
    rootMargin: {
      type: String,
      default: '200px 0px'
    },
    customClass: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      player: null,
      videoLoaded: false,
      observer: null,
      dashLoaded: false,
      currentQuality: 0
    }
  },
  mounted() {
    if (process.client) {
      if (this.lazyLoad && 'IntersectionObserver' in window) {
        this.setupIntersectionObserver();
      } else {
        this.initializePlayer();
      }
    }
  },
  methods: {
    setupIntersectionObserver() {
      this.observer = new IntersectionObserver((entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !this.videoLoaded) {
          this.initializePlayer();
          this.observer.disconnect();
        }
      }, {
        rootMargin: this.rootMargin
      });
      
      this.observer.observe(this.$refs.videoPlayer);
    },
    
    initializePlayer() {
      if (this.videoLoaded) return;
      this.videoLoaded = true;
      
      // Check if dash.js is already loaded globally
      if (window.dashjs && !this.dashLoaded) {
        this.setupDashPlayer(window.dashjs);
        return;
      }
      
      // If not already loaded, dynamically import it
      import(/* webpackChunkName: "dashjs" */ 'dashjs')
        .then(dashjs => {
          // Make dashjs available globally to prevent multiple imports
          window.dashjs = dashjs;
          this.setupDashPlayer(dashjs);
        })
        .catch(err => {
          console.error('Failed to load dash.js:', err);
          // The fallback source will be used automatically
        });
    },
    
    setupDashPlayer(dashjs) {
      if (this.dashLoaded) return;
      this.dashLoaded = true;

      // Create player instance
      this.player = dashjs.MediaPlayer().create();
      
      // Configure settings for video with improved caching
      this.player.updateSettings({
        streaming: {
          // Buffer settings
          buffer: {
            // Faster startup
            initialBufferLevel: 2,
            // Maintain this setting
            fastSwitchEnabled: true
          },
          // ABR settings
          abr: {
            // Set initial quality to high since it's a landing page
            initialBitrate: {
              video: 800
            }
          },
          // Retry settings
          retryAttempts: {
            MPD: 2,
            MediaSegment: 2
          },
          retryIntervals: {
            MPD: 500,
            MediaSegment: 500
          },
          // Add gap handling settings
          gaps: {
            jumpGaps: true,
            jumpLargeGaps: true,
            smallGapLimit: 1.5
          },
          // Add preload strategy for landing page
          preload: {
            enabled: true,
            prefetchAttempts: 1 // Try to prefetch segments ahead
          }
        }
      });
      
      // Initialize player with adaptive MPD
      this.player.initialize(
        this.$refs.videoPlayer, 
        this.dashSource, 
        true // autoplay
      );
      
      // Error handling with fallback
      this.player.on(dashjs.MediaPlayer.events.ERROR, (error) => {
        console.warn('DASH player error:', error);
        if (this.$refs.videoPlayer) {
          this.$refs.videoPlayer.src = this.fallbackSource;
        }
      });
      
      // Add quality switch monitoring
      this.player.on(dashjs.MediaPlayer.events.QUALITY_CHANGE_RENDERED, (e) => {
        this.currentQuality = e.newQuality;
        console.log('Quality changed to:', e.newQuality);
        
        // Emit event for parent components that might want to know about quality changes
        this.$emit('quality-change', {
          quality: e.newQuality,
          bitrate: this.player.getBitrateInfoListFor('video')[e.newQuality]?.bitrate / 1000 + ' kbps'
        });
      });
      
      // Emit event when player is ready
      this.$emit('player-ready', this.player);
    }
  },
  beforeUnmount() {
    // Clean up resources
    if (this.observer) {
      this.observer.disconnect();
    }
    if (this.player) {
      this.player.reset();
      this.player = null;
    }
  }
}
</script>

<style scoped>
.video-element {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>