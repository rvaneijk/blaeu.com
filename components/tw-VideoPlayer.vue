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
      dashLoaded: false
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
        'streaming': {
          'abr': {
            'autoSwitchBitrate': {
              'video': true
            },
            // Start with lower bitrate for faster initial loading
            'initialBitrate': {
              'video': 800
            },
            'bandwidthSafetyFactor': 0.9,
            'useDefaultABRRules': true
          },
          'fastSwitchEnabled': true,
          // Improve buffer settings for static SPA
          'stableBufferTime': 20,
          'bufferTimeAtTopQualityLongForm': 30,
          'bufferToKeep': 20,
          // Enable caching for better performance
          'lastBitrateCachingInfo': {
            enabled: true,
            ttl: 360000
          },
          'lastMediaSettingsCachingInfo': {
            enabled: true,
            ttl: 360000
          },
          // Reduce server requests
          'fragmentRequestTimeout': 20000,
          // Use browser cache more effectively
          'retryAttempts': {
            'MPD': 3,
            'XLinkExpansion': 1,
            'MediaSegment': 3,
            'InitializationSegment': 3,
            'BitstreamSwitchingSegment': 3
          },
          'cacheLoadThresholds': {
            'video': 50,
            'audio': 5
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