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
    <!-- Fallback for browsers that don't support DASH - only render when needed -->
    <source v-if="dashFailed" :src="fallbackSource" type="video/mp4">
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
    },
    useCachedPlayer: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      player: null,
      videoLoaded: false,
      observer: null,
      dashLoaded: false,
      dashFailed: false,
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
      
      // Try advanced cache from dashPlugins first
      if (this.useCachedPlayer && window.dashCache && typeof window.dashCache.getPlayerBySource === 'function') {
        const cachedPlayer = window.dashCache.getPlayerBySource(this.dashSource);
        if (cachedPlayer) {
          console.log('Using dashCache player for source:', this.dashSource);
          this.player = cachedPlayer;
          try {
            // Reattach to the new video element
            this.player.attachView(this.$refs.videoPlayer);
            this.dashLoaded = true;
            this.$emit('player-ready', this.player);
            return;
          } catch (err) {
            console.warn('Failed to reuse dashCache player:', err);
            // Continue with fallback caching strategy
          }
        }
      }
      
      // Fallback to simple window cache if advanced cache failed
      if (this.useCachedPlayer && window.cachedDashPlayer && window.cachedDashSource === this.dashSource) {
        console.log('Using simple cached DASH player instance');
        this.player = window.cachedDashPlayer;
        // Reattach to the new video element
        try {
          this.player.attachSource(this.dashSource);
          this.player.attachView(this.$refs.videoPlayer);
          this.dashLoaded = true;
          // Emit event when player is ready
          this.$emit('player-ready', this.player);
          return;
        } catch (err) {
          console.warn('Failed to reuse cached player:', err);
          // Continue with normal initialization if reattachment fails
        }
      }
      
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
          // Set dashFailed flag to trigger the fallback source rendering
          this.dashFailed = true;
          // The fallback source will be used automatically
          this.$emit('dash-failed', {
            error: err,
            message: 'Failed to load dash.js library'
          });
        });
    },
    
    setupDashPlayer(dashjs) {
      if (this.dashLoaded) return;
      
      try {
        // Create player instance
        this.player = dashjs.MediaPlayer().create();
        
        // Configure settings for video with improved caching
        this.player.updateSettings({
          streaming: {
            buffer: {
              // Faster startup
              initialBufferLevel: 2,
              fastSwitchEnabled: true,
              // Increase buffer size for smoother playback
              bufferTimeAtTopQuality: 8,
              bufferTimeAtTopQualityLongForm: 12
            },
            abr: {
              // Set initial quality to high since it's a landing page
              initialBitrate: {
                video: 3000 // 3mbps
              },
              autoSwitchBitrate: {
                video: true
              }
            },
            retryAttempts: {
              MPD: 3,
              MediaSegment: 3
            },
            retryIntervals: {
              MPD: 500,
              MediaSegment: 500
            },
            gaps: {
              jumpGaps: true,
              jumpLargeGaps: true,
              smallGapLimit: 1.5
            }
          }
        });
        
        // Error handling with fallback and detailed logging
        this.player.on(dashjs.MediaPlayer.events.ERROR, (error) => {
          console.warn('DASH player error:', error);
          
          // Emit the error event
          this.$emit('dash-error', {
            error: error,
            message: 'DASH player encountered an error'
          });
          
          // Only fallback to MP4 if there's a critical error
          if (error.error && error.error.code && (
              error.error.code === 'MEDIA_ERR_SRC_NOT_SUPPORTED' || 
              error.error.code === 'MANIFEST_LOADER_LOADING_FAILURE' ||
              error.error.code === 'MANIFEST_LOADER_PARSING_FAILURE')) {
            
            if (this.$refs.videoPlayer) {
              console.log('Falling back to MP4 source');
              // Set dashFailed flag to trigger the fallback source rendering
              this.dashFailed = true;
              // Destroy DASH.js player before switching to MP4
              this.player.reset();
              this.player = null;
              // Don't set src directly - use v-if with dashFailed flag instead
            }
          }
        });
        
        // Add quality switch monitoring
        this.player.on(dashjs.MediaPlayer.events.QUALITY_CHANGE_RENDERED, (e) => {
          this.currentQuality = e.newQuality;
          
          // Initialize with default values
          let qualityLabel = 'Unknown';
          let bitrateKbps = 0;
          
          // Debug information
          // console.log('Quality change event data:', e);
          
          // Try different methods to get bitrate info
          let bitrateInfo = null;
          
          // First method - getBitrateInfoListFor
          if (this.player.getBitrateInfoListFor) {
            bitrateInfo = this.player.getBitrateInfoListFor('video');
            // console.log('Bitrate info from getBitrateInfoListFor:', bitrateInfo);
          }
          
          // Alternative method - getQualityFor
          const qualityFor = this.player.getQualityFor ? this.player.getQualityFor('video') : null;
          // console.log('Quality from getQualityFor:', qualityFor);
          
          // Another alternative - getAverageThroughput
          const throughput = this.player.getAverageThroughput ? this.player.getAverageThroughput('video') : null;
          // console.log('Throughput from getAverageThroughput:', throughput);
          
          // Create quality info object
          const qualityInfo = {
            quality: e.newQuality || 0,  // voor DEBUG in console: haal ' || 0' weg
            qualityLabel: qualityLabel,
            bitrate: bitrateKbps
          };
          
          // Try to extract bitrate info
          if (bitrateInfo && bitrateInfo[e.newQuality]) {
            bitrateKbps = Math.round(bitrateInfo[e.newQuality].bitrate / 1000);
            qualityInfo.bitrate = bitrateKbps;
            
            // Set quality label based on bitrate ranges
            if (bitrateKbps > 3000) qualityLabel = 'HD';
            else if (bitrateKbps > 1500) qualityLabel = 'Medium';
            else if (bitrateKbps > 800) qualityLabel = 'Low';
            else qualityLabel = 'Mobile';
            
            qualityInfo.qualityLabel = qualityLabel;
            // console.log(`Quality changed to: ${qualityLabel} (${bitrateKbps} kbps)`);
          } else if (throughput) {
            // Fallback to throughput if available
            bitrateKbps = Math.round(throughput / 1000);
            qualityInfo.bitrate = bitrateKbps;
            
            // Estimate quality label based on throughput
            if (bitrateKbps > 3000) qualityLabel = 'Estimated HD';
            else if (bitrateKbps > 1500) qualityLabel = 'Estimated Medium';
            else if (bitrateKbps > 800) qualityLabel = 'Estimated Low';
            else qualityLabel = 'Estimated Mobile';
            
            qualityInfo.qualityLabel = qualityLabel;
            // console.log(`Quality estimated from throughput: ${qualityLabel} (${bitrateKbps} kbps)`);
          } else {
            // Last resort - use quality index with predefined labels
            const qualityLabels = ['Auto', 'Low', 'Medium', 'High', 'HD'];
            qualityLabel = qualityLabels[e.newQuality] || `Quality ${e.newQuality}`;
            qualityInfo.qualityLabel = qualityLabel;
            // console.log(`Quality index ${e.newQuality}: Using preset label "${qualityLabel}"`);
          }
          
          // Emit event for parent components
          this.$emit('quality-change', qualityInfo);
        });
        
        // Initialize player with adaptive MPD
        this.player.initialize(
          this.$refs.videoPlayer, 
          this.dashSource, 
          true // autoplay
        );
        
        // Store player in global cache for potential reuse
        if (this.useCachedPlayer) {
          window.cachedDashPlayer = this.player;
          window.cachedDashSource = this.dashSource;
          
          // Also store in advanced cache if available
          if (window.dashCache && typeof window.dashCache.registerPlayer === 'function') {
            try {
              // Generate a unique ID for this player
              const playerId = 'dash-player-' + Date.now();
              window.dashCache.registerPlayer(playerId, this.player, this.dashSource);
            } catch (err) {
              console.warn('Failed to register player with dashCache:', err);
            }
          }
        }
        
        this.dashLoaded = true;
        
        // Emit event when player is ready
        this.$emit('player-ready', this.player);
        
      } catch (err) {
        console.error('Failed to setup DASH player:', err);
        // Set dashFailed flag to trigger the fallback source rendering
        this.dashFailed = true;
        
        this.$emit('dash-failed', {
          error: err,
          message: 'Failed to setup DASH player'
        });
      }
    },
    
    // Method to manually switch quality
    setQuality(qualityIndex) {
      if (this.player) {
        try {
          // In dashjs 5.0.0, check which method is available
          if (typeof this.player.setQualityFor === 'function') {
            this.player.setQualityFor('video', qualityIndex);
          } else if (typeof this.player.setQuality === 'function') {
            this.player.setQuality('video', qualityIndex);
          } else {
            console.warn('Unable to set quality: API method not found');
          }
        } catch (err) {
          console.warn('Error setting quality:', err);
        }
      }
    }
  },
  beforeUnmount() {
    // Clean up resources
    if (this.observer) {
      this.observer.disconnect();
    }
    
    // Only destroy the player if it's not being cached
    if (this.player && (!this.useCachedPlayer || 
        (window.cachedDashPlayer !== this.player && 
         (!window.dashCache || !window.dashCache.getPlayerBySource || 
          window.dashCache.getPlayerBySource(this.dashSource) !== this.player)))) {
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