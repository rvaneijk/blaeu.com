<template>
  <div class="w-full">
    <!-- Full-width video container with height constraint -->
    <div class="w-screen relative overflow-hidden h-screen">
      <tw-VideoPlayer
        :dashSource="'/assets/dash/video/adaptive.mpd'"
        :fallbackSource="'/assets/dash/video/GettyImages-1368070487.mp4'"
        :lazyLoad="false"
        :useCachedPlayer="true"
        customClass="w-full h-full object-cover"
        @dash-error="handleDashError"
        @dash-failed="handleDashFailed"
        @player-ready="handlePlayerReady"
        @quality-change="handleQualityChange"
      />
      
      <!-- Elegant scroll indicator with FontAwesome -->
      <div class="absolute bottom-8 left-0 right-0 flex flex-col items-center z-20">
        <div class="text-white text-sm font-light tracking-widest mb-2 opacity-80">EXPLORE</div>
        <!-- Click handler for smooth scrolling to About section -->
        <a href="#about-us" @click.prevent="scrollToAbout" class="cursor-pointer">
          <i class="fas fa-chevron-down text-white text-2xl opacity-80 animate-bounce-subtle"></i>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DashVideo',
  components: {
    'tw-VideoPlayer': () => import('~/components/tw-VideoPlayer.vue')
  },
  data() {
    return {
      videoStatus: 'loading',
      currentQuality: null
    }
  },
  methods: {
    scrollToAbout(event) {
      event.preventDefault();
      const aboutSection = document.querySelector('#about-us');
      if (aboutSection) {
        // Using scrollIntoView for better browser compatibility
        aboutSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    },
    
    handleDashError(error) {
      console.warn('Hero video DASH error:', error);
      this.videoStatus = 'fallback';
    },
    
    handleDashFailed(error) {
      console.error('Hero video DASH failed:', error);
      this.videoStatus = 'fallback';
    },
    
    handleQualityChange(qualityInfo) {
      this.currentQuality = qualityInfo;
      console.log('Hero video quality changed:', qualityInfo);
    },
    
    handlePlayerReady(player) {
      console.log('Hero video player ready');
      this.videoStatus = 'ready';
      
      // Store a flag to indicate hero video was loaded
      if (window) {
        window.heroVideoLoaded = true;
        
        // Preload background video dash manifest
        this.preloadBackgroundVideo();
        
        // If we have advanced cache from dashPlugins, report metrics
        if (window.dashCache && typeof window.dashCache.reportMetrics === 'function') {
          window.dashCache.reportMetrics('hero-video', {
            loadTime: Date.now(),
            source: 'dash'
          });
        }
      }
    },
    
    preloadBackgroundVideo() {
      // Preload the background video manifest
      const preloadLink = document.createElement('link');
      preloadLink.rel = 'preload';
      preloadLink.href = '/assets/dash/video/adaptive.mpd';
      preloadLink.as = 'fetch';
      preloadLink.crossOrigin = 'anonymous';
      document.head.appendChild(preloadLink);
      
      // Optionally preload some initial segments if we know their URL pattern
      // This is advanced and requires knowledge of your DASH segment naming
      if (window.dashCache && window.dashCache.addSegment) {
        // We could potentially fetch and cache initial segments here
        // But this requires detailed knowledge of your DASH setup
        console.log('Background video manifest preloaded');
      }
    }
  }
}
</script>

<style scoped>
@keyframes bounce-subtle {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(6px);
  }
}

.animate-bounce-subtle {
  animation: bounce-subtle 2s infinite cubic-bezier(0.45, 0, 0.55, 1);
}
</style>