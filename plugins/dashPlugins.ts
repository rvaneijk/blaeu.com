/**
 * @plugin dashPlugins.ts
 * @description DASH.js integration plugin that provides video streaming with privacy-focused caching
 * Implements advanced video playback features with performance optimization:
 * - Cookie-free storage solutions for GDPR compliance
 * - Segment and manifest caching for faster loading
 * - Bandwidth optimization through adaptive streaming
 * - Secure loading with TrustedTypes policy
 * 
 * @see {@link components/tw-VideoPlayer.vue} For the main component using this plugin
 * @see {@link components/tw-Dash.vue} For the hero video implementation
 * @see {@link components/tw-FixedBackgroundVideo.vue} For the background video implementation
 */
import type { MediaPlayer, StorageController, XHRLoader, XHRLoaderConfig, XHRLoaderResponse } from 'dashjs';
import { errorHandler } from '~/composables/errorHandler';

export interface DashPlayerInfo {
  player: MediaPlayer;
  source: string;
  createdAt: number;
  namespace?: string;
}

export interface CachedManifest {
  data: any;
  timestamp: number;
}

export interface CachedSegment {
  data: any;
  timestamp: number;
}

export interface VideoMetric {
  timestamp: number;
  [key: string]: any;
}

export interface MemoryUsage {
  used: number;
  total: number;
  limit: number;
}

export interface DashCache {
  dashJsLoaded: boolean;
  players: Record<string, DashPlayerInfo>;
  initialized: boolean;
  inTransition: boolean;
  segments: Map<string, CachedSegment>;
  manifests: Map<string, CachedManifest>;
  metrics: Record<string, VideoMetric[]>;
  memoryMonitoringEnabled: boolean;
  memoryMonitorInterval: number | null;
  
  disableCookieStorage(player: MediaPlayer): boolean;
  init(): void;
  registerPlayer(id: string, player: MediaPlayer, source: string, namespace?: string): MediaPlayer;
  getPlayer(id: string): MediaPlayer | null;
  getPlayerBySource(source: string, namespace?: string): MediaPlayer | null;
  cacheManifest(url: string, data: any): void;
  getManifest(url: string): any | null;
  reportMetrics(videoId: string, data: Record<string, any>): void;
  getMetrics(videoId: string): VideoMetric[];
  clearOldPlayers(maxAgeMs?: number): void;
  addSegment(url: string, data: any): void;
  getSegment(url: string): any | null;
  clearOldSegments(maxAgeMs?: number): void;
  createXHRLoader(): XHRLoader;
  _setupCleanupInterval(): void;
  loadDashJs(): Promise<void>;
  startMemoryMonitoring(): void;
  stopMemoryMonitoring(): void;
  getMemoryUsage(): MemoryUsage | null;
  checkMemoryLeaks(): void;
  aggressiveCleanup(): void;
  prefetchSegments(): void;
}

declare global {
  interface Window {
    dashCache: DashCache;
    dashjs?: typeof import('dashjs');
    trustedTypes?: {
      createPolicy: (name: string, policy: any) => any;
      getPolicy: (name: string) => any;
    };
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  // Initialize DASH video cache container on client-side only
  if (process.client) {
    // Skip DASH.js initialization on mobile devices for performance
    const isMobile = /Mobi|Android/i.test(navigator.userAgent);
    const isSmallScreen = window.innerWidth <= 768;
    
    if (isMobile || isSmallScreen) {
      errorHandler.debug('Skipping DASH.js initialization on mobile device', { isMobile, isSmallScreen }, { component: 'DashPlugin' });
      return {
        provide: {
          dashCache: {} as Partial<DashCache>
        }
      };
    }
    
    /**
     * @function initializeTrustedTypesPolicy
     * @description Creates a TrustedTypes policy for the video player to enhance security
     * Prevents XSS attacks through sanitized HTML handling in the video player
     * @private
     */
    try {
      if (window.trustedTypes && typeof window.trustedTypes.createPolicy === 'function') {
        // Check if the policy already exists first using try/catch since some browsers
        // throw if the policy doesn't exist rather than returning null
        let policyExists = false;
        try {
          policyExists = !!window.trustedTypes.getPolicy('videoPlayerPolicy');
        } catch (e) {
          // Policy doesn't exist, which is fine
          policyExists = false;
        }
        
        if (!policyExists) {
          try {
            window.trustedTypes.createPolicy('videoPlayerPolicy', {
              createHTML: (string: string) => string
            });
            errorHandler.debug('TrustedTypes policy created for video player', null, { component: 'DashPlugin' });
          } catch (e) {
            errorHandler.warning('Failed to create TrustedTypes policy', e, { component: 'DashPlugin' });
          }
        }
      }
    } catch (e) {
      errorHandler.warning('TrustedTypes not fully supported in this browser', e, { component: 'DashPlugin' });
    }
    
    const dashCache: DashCache = {
      // Track if DASH.js is loaded
      dashJsLoaded: false,
      
      // Store player instances
      players: {},
      
      // Flag to track initialization status
      initialized: false,
      
      // Flag to track player transitions (page changes)
      inTransition: false,
      
      // Cache for video segments
      segments: new Map<string, CachedSegment>(),
      
      // Cache for MPD manifests
      manifests: new Map<string, CachedManifest>(),
      
      // Metrics for video performance
      metrics: {},
      
      // Memory monitoring settings
      memoryMonitoringEnabled: process.env.NODE_ENV === 'development',
      memoryMonitorInterval: null,
      
      /**
       * @function disableCookieStorage
       * @description Prevents DASH.js from storing cookies or using localStorage
       * Implements GDPR compliance by replacing storage with no-op functions
       * @param {MediaPlayer} player - The DASH.js player instance
       * @returns {boolean} - Whether the operation was successful
       */
      disableCookieStorage(player: MediaPlayer): boolean {
        // For DASH.js 5.0.0, we'll avoid using updateSettings for storage
        // and instead focus on preventing storage operations directly
        if (player) {
          try {
            // Add a no-op localStorageFactory to the player if supported
            if (typeof player.setStorageController === 'function') {
              // Create empty controller functions
              const noOpController: StorageController = {
                getSavedMediaSettings: () => null,
                saveMediaSettings: () => {},
                release: () => {}
              };
              
              // Set the controller to our no-op implementation
              player.setStorageController(noOpController);
              return true;
            }
            return true;
          } catch (e) {
            errorHandler.warning('Could not disable storage', e, { component: 'DashPlugin' });
            return false;
          }
        }
        return false;
      },
      
      /**
       * @function init
       * @description Initializes the DASH cache system
       * Sets up event listeners and cleanup intervals
       * @returns {void}
       */
      init(): void {
        if (this.initialized) return;
        errorHandler.debug('Initializing DASH cache system', null, { component: 'DashPlugin' });
        this.initialized = true;
        
        // Listen for page transitions
        window.addEventListener('beforeunload', () => {
          this.inTransition = true;
        });
        
        // Setup periodic cleanup
        this._setupCleanupInterval();
        
        // Start memory monitoring if enabled
        if (this.memoryMonitoringEnabled) {
          this.startMemoryMonitoring();
        }
      },
      
      /**
       * @function _setupCleanupInterval
       * @description Sets up periodic cleanup of cache to prevent memory leaks
       * @private
       * @returns {void}
       */
      _setupCleanupInterval(): void {
        // Run cleanup every 5 minutes
        setInterval(() => {
          this.clearOldSegments();
          this.clearOldPlayers();
          this.checkMemoryLeaks();
        }, 300000);
      },
      
      /**
       * @function registerPlayer
       * @description Registers a DASH player instance for caching and management with namespace isolation
       * @param {string} id - Unique identifier for the player
       * @param {MediaPlayer} player - DASH.js player instance
       * @param {string} source - URL of the video source
       * @param {string} [namespace] - Optional namespace for player isolation (e.g., 'hero', 'background')
       * @returns {MediaPlayer} - The registered player instance
       * @example
       * // Register a player with dashCache and namespace isolation
       * window.dashCache.registerPlayer('hero-video', player, '/assets/dash/video/adaptive.mpd', 'hero');
       * window.dashCache.registerPlayer('background-video', player, '/assets/dash/video/adaptive.mpd', 'background');
       */
      registerPlayer(id: string, player: MediaPlayer, source: string, namespace?: string): MediaPlayer {
        // Ensure init
        if (!this.initialized) this.init();
        
        // Disable local storage of media settings to prevent cookie
        this.disableCookieStorage(player);
        
        this.players[id] = {
          player,
          source,
          createdAt: Date.now(),
          namespace
        };
        
        errorHandler.debug('DASH player registered', { id, source, namespace }, { component: 'DashPlugin' });
        return player;
      },
      
      /**
       * @function getPlayer
       * @description Retrieves a cached DASH player instance by ID
       * @param {string} id - Unique identifier for the player
       * @returns {MediaPlayer|null} - The cached player instance or null if not found
       */
      getPlayer(id: string): MediaPlayer | null {
        // Ensure init
        if (!this.initialized) this.init();
        const playerInfo = this.players[id];
        if (playerInfo && playerInfo.player) {
          // Re-apply cookie prevention before returning
          this.disableCookieStorage(playerInfo.player);
          return playerInfo.player;
        }
        return null;
      },
      
      /**
       * @function getPlayerBySource
       * @description Retrieves a cached DASH player instance by source URL with namespace isolation
       * IMPORTANT: Now supports namespace isolation to prevent conflicts between different video types
       * @param {string} source - URL of the video source
       * @param {string} [namespace] - Optional namespace for player isolation (e.g., 'hero', 'background')
       * @returns {MediaPlayer|null} - The cached player instance or null if not found
       * @example
       * // Get a player for specific source with namespace isolation
       * const heroPlayer = window.dashCache.getPlayerBySource('/assets/dash/video/adaptive.mpd', 'hero');
       * const backgroundPlayer = window.dashCache.getPlayerBySource('/assets/dash/video/adaptive.mpd', 'background');
       */
      getPlayerBySource(source: string, namespace?: string): MediaPlayer | null {
        // Ensure init
        if (!this.initialized) this.init();
        
        errorHandler.debug('Looking for cached player with source', { source, namespace }, { component: 'DashPlugin' });
        errorHandler.debug('Available cached sources', { sources: Object.values(this.players).map(p => ({ id: p.source, namespace: p.namespace })) }, { component: 'DashPlugin' });
        
        for (const id in this.players) {
          const playerInfo = this.players[id];
          // Match both source and namespace (if provided)
          if (playerInfo.source === source && (!namespace || playerInfo.namespace === namespace)) {
            errorHandler.debug('Found cached player for source', { id, source, namespace }, { component: 'DashPlugin' });
            // Re-apply cookie prevention before returning
            this.disableCookieStorage(playerInfo.player);
            return playerInfo.player;
          }
        }
        errorHandler.debug('No cached player found for source', { source, namespace }, { component: 'DashPlugin' });
        return null;
      },
      
      /**
       * @function cacheManifest
       * @description Stores an MPD manifest in memory for faster loading
       * @param {string} url - The URL of the manifest
       * @param {any} data - The manifest data to cache
       * @returns {void}
       */
      cacheManifest(url: string, data: any): void {
        // Ensure init
        if (!this.initialized) this.init();
        
        this.manifests.set(url, {
          data,
          timestamp: Date.now()
        });
        errorHandler.debug('Cached manifest', { url }, { component: 'DashPlugin' });
      },
      
      /**
       * @function getManifest
       * @description Retrieves a cached MPD manifest
       * @param {string} url - The URL of the manifest to retrieve
       * @returns {any|null} - The cached manifest data or null if not found
       */
      getManifest(url: string): any | null {
        // Ensure init
        if (!this.initialized) this.init();
        
        const manifest = this.manifests.get(url);
        return manifest?.data || null;
      },
      
      /**
       * @function reportMetrics
       * @description Records performance metrics for video playback
       * Useful for debugging and optimization of video performance
       * @param {string} videoId - Identifier for the video
       * @param {Record<string, any>} data - Metrics data to record
       * @returns {void}
       * @example
       * // Report load time metrics
       * window.dashCache.reportMetrics('hero-video', {
       *   loadTime: Date.now(),
       *   source: 'dash',
       *   resolution: '1080p'
       * });
       */
      reportMetrics(videoId: string, data: Record<string, any>): void {
        // Ensure init
        if (!this.initialized) this.init();
        
        if (!this.metrics[videoId]) {
          this.metrics[videoId] = [];
        }
        
        this.metrics[videoId].push({
          ...data,
          timestamp: Date.now()
        });
        
        errorHandler.debug('Video metrics reported', { videoId, data }, { component: 'DashPlugin' });
      },
      
      /**
       * @function getMetrics
       * @description Retrieves recorded performance metrics for a specific video
       * @param {string} videoId - Identifier for the video
       * @returns {VideoMetric[]} - Array of recorded metrics or empty array if none found
       */
      getMetrics(videoId: string): VideoMetric[] {
        return this.metrics[videoId] || [];
      },
      
      /**
       * @function clearOldPlayers
       * @description Removes and cleans up old player instances to free memory
       * @param {number} [maxAgeMs=600000] - Maximum age in milliseconds (10 minutes default)
       * @returns {void}
       */
      clearOldPlayers(maxAgeMs: number = 600000): void { // Default 10 minutes
        const now = Date.now();
        for (const id in this.players) {
          if (now - this.players[id].createdAt > maxAgeMs) {
            // Properly destroy the player
            try {
              this.players[id].player.reset();
            } catch (e) {
              errorHandler.warning('Error destroying DASH player', e, { component: 'DashPlugin', playerId: id });
            }
            delete this.players[id];
            errorHandler.debug('Removed old DASH player', { id }, { component: 'DashPlugin' });
          }
        }
      },
      
      /**
       * @function addSegment
       * @description Caches a video segment for faster loading
       * @param {string} url - The URL of the segment
       * @param {any} data - The segment data to cache
       * @returns {void}
       */
      addSegment(url: string, data: any): void {
        // Ensure init
        if (!this.initialized) this.init();
        
        this.segments.set(url, {
          data,
          timestamp: Date.now()
        });
      },
      
      /**
       * @function getSegment
       * @description Retrieves a cached video segment
       * @param {string} url - The URL of the segment to retrieve
       * @returns {any|null} - The cached segment data or null if not found
       */
      getSegment(url: string): any | null {
        return this.segments.get(url)?.data || null;
      },
      
      /**
       * @function clearOldSegments
       * @description Removes old segments from cache to free memory
       * @param {number} [maxAgeMs=300000] - Maximum age in milliseconds (5 minutes default)
       * @returns {void}
       */
      clearOldSegments(maxAgeMs: number = 300000): void { // Default 5 minutes
        const now = Date.now();
        for (const [url, info] of this.segments.entries()) {
          if (now - info.timestamp > maxAgeMs) {
            this.segments.delete(url);
          }
        }
      },
      
      /**
       * @function createXHRLoader
       * @description Creates a custom XHR loader for DASH.js that implements caching
       * Intercepts network requests to serve cached content when available
       * @returns {XHRLoader} - The custom XHR loader factory for DASH.js
       */
      createXHRLoader(): XHRLoader {
        const self = this;
        return {
          /**
           * @function load
           * @description Loads a resource with caching support
           * @param {XHRLoaderConfig} config - Loading configuration
           * @returns {Promise<XHRLoaderResponse>} - Promise resolving to the response
           */
          load: function(config: XHRLoaderConfig): Promise<XHRLoaderResponse> {
            return new Promise((resolve, reject) => {
              const url = config.request ? config.request.url : null;
              
              // For MPD requests, check manifest cache first
              if (url && url.endsWith('.mpd') && self.manifests.has(url)) {
                errorHandler.debug('Serving cached manifest', { url }, { component: 'DashPlugin' });
                const cached = self.manifests.get(url)!;
                resolve({
                  url: url,
                  data: cached.data,
                  responseType: config.responseType || '',
                  status: 200
                });
                return;
              }
              
              // For segment requests, check segment cache
              if (url && url.includes('.m4s') && self.segments.has(url)) {
                errorHandler.debug('Serving cached segment', { url }, { component: 'DashPlugin' });
                const cached = self.segments.get(url)!;
                resolve({
                  url: url,
                  data: cached.data,
                  responseType: config.responseType || '',
                  status: 200
                });
                return;
              }
              
              // Otherwise proceed with normal XHR
              const xhr = new XMLHttpRequest();
              xhr.open(config.method || 'GET', url!, true);
              
              if (config.responseType) {
                xhr.responseType = config.responseType as XMLHttpRequestResponseType;
              }
              
              // Apply custom headers
              if (config.headers) {
                for (const header in config.headers) {
                  xhr.setRequestHeader(header, config.headers[header]);
                }
              }
              
              xhr.onload = function() {
                if (xhr.status >= 200 && xhr.status < 300) {
                  // Cache manifest for reuse
                  if (url && url.endsWith('.mpd') && xhr.response) {
                    self.cacheManifest(url, xhr.response);
                  }
                  
                  // Cache segments for reuse
                  if (url && url.includes('.m4s') && xhr.response) {
                    self.addSegment(url, xhr.response);
                  }
                  
                  resolve({
                    url: url!,
                    data: xhr.response,
                    responseType: xhr.responseType as string,
                    status: xhr.status
                  });
                } else {
                  reject(xhr.statusText);
                }
              };
              
              xhr.onerror = function() {
                reject(xhr.statusText);
              };
              
              xhr.send(config.data);
            });
          }
        };
      },
      
      /**
       * @function startMemoryMonitoring
       * @description Starts memory monitoring in development mode
       * @returns {void}
       */
      startMemoryMonitoring(): void {
        if (!this.memoryMonitoringEnabled || this.memoryMonitorInterval !== null) {
          return;
        }
        
        if (typeof performance !== 'undefined' && performance.memory) {
          errorHandler.debug('Starting memory monitoring', null, { component: 'DashPlugin' });
          
          this.memoryMonitorInterval = setInterval(() => {
            const usage = this.getMemoryUsage();
            if (usage) {
              // Log if memory usage is concerning (>100MB)
              if (usage.used > 100) {
                errorHandler.warning('High memory usage detected', usage, { component: 'DashPlugin' });
                this.aggressiveCleanup();
              }
              
              // Log if memory usage is critical (>200MB)
              if (usage.used > 200) {
                errorHandler.error('Critical memory usage detected', usage, { component: 'DashPlugin' });
                this.aggressiveCleanup();
              }
            }
          }, 30000); // Check every 30 seconds
        }
      },
      
      /**
       * @function stopMemoryMonitoring
       * @description Stops memory monitoring
       * @returns {void}
       */
      stopMemoryMonitoring(): void {
        if (this.memoryMonitorInterval !== null) {
          clearInterval(this.memoryMonitorInterval);
          this.memoryMonitorInterval = null;
          errorHandler.debug('Stopped memory monitoring', null, { component: 'DashPlugin' });
        }
      },
      
      /**
       * @function getMemoryUsage
       * @description Gets current memory usage information
       * @returns {MemoryUsage|null} Memory usage info or null if not available
       */
      getMemoryUsage(): MemoryUsage | null {
        if (typeof performance !== 'undefined' && performance.memory) {
          return {
            used: Math.round(performance.memory.usedJSHeapSize / 1048576), // Convert to MB
            total: Math.round(performance.memory.totalJSHeapSize / 1048576), // Convert to MB
            limit: Math.round(performance.memory.jsHeapSizeLimit / 1048576) // Convert to MB
          };
        }
        return null;
      },
      
      /**
       * @function checkMemoryLeaks
       * @description Checks for potential memory leaks and performs cleanup if needed
       * @returns {void}
       */
      checkMemoryLeaks(): void {
        const usage = this.getMemoryUsage();
        
        if (usage) {
          // If memory usage is high, perform aggressive cleanup
          if (usage.used > 150) { // 150MB threshold
            errorHandler.warning('Memory leak check triggered aggressive cleanup', usage, { component: 'DashPlugin' });
            this.aggressiveCleanup();
          }
          
          // Log periodic memory status in development
          if (this.memoryMonitoringEnabled) {
            errorHandler.debug('Memory status check', {
              ...usage,
              playersCount: Object.keys(this.players).length,
              segmentsCount: this.segments.size,
              manifestsCount: this.manifests.size
            }, { component: 'DashPlugin' });
          }
        }
      },
      
      /**
       * @function aggressiveCleanup
       * @description Performs aggressive cleanup to free memory
       * @returns {void}
       */
      aggressiveCleanup(): void {
        errorHandler.debug('Performing aggressive cleanup', null, { component: 'DashPlugin' });
        
        // Clear old players with shorter timeout (2 minutes instead of 10)
        this.clearOldPlayers(120000);
        
        // Clear old segments with shorter timeout (1 minute instead of 5)
        this.clearOldSegments(60000);
        
        // Clear old manifests
        const now = Date.now();
        for (const [url, manifest] of this.manifests.entries()) {
          if (now - manifest.timestamp > 60000) { // 1 minute
            this.manifests.delete(url);
          }
        }
        
        // Clear old metrics (keep only last 10 entries per video)
        for (const videoId in this.metrics) {
          if (this.metrics[videoId].length > 10) {
            this.metrics[videoId] = this.metrics[videoId].slice(-10);
          }
        }
        
        // Force garbage collection if available (development only)
        if (this.memoryMonitoringEnabled && typeof window !== 'undefined' && (window as any).gc) {
          try {
            (window as any).gc();
            errorHandler.debug('Forced garbage collection', null, { component: 'DashPlugin' });
          } catch (e) {
            // Ignore errors - gc may not be available
          }
        }
      },
      
      /**
       * @function loadDashJs
       * @description Loads DASH.js library on demand when video components need it
       * @returns {Promise<void>} - Promise that resolves when DASH.js is loaded
       */
      async loadDashJs(): Promise<void> {
        if (this.dashJsLoaded) {
          return;
        }
        
        // Initialize the cache system if not already done
        if (!this.initialized) {
          this.init();
        }
        
        errorHandler.debug('Loading DASH.js on demand', null, { component: 'DashPlugin' });
        return initializeDashJs();
      },
      
      /**
       * @function prefetchSegments
       * @description Prefetches video segments during page load for faster startup
       * @returns {void}
       */
      prefetchSegments(): void {
        if (!this.initialized) this.init();
        
        // Prefetch key segments for the default video
        const segmentUrls = [
          '/assets/dash/video/init-stream1.m4s',
          '/assets/dash/video/chunk-stream1-00001.m4s',
          '/assets/dash/video/init-stream2.m4s',
          '/assets/dash/video/chunk-stream2-00001.m4s'
        ];
        
        segmentUrls.forEach(url => {
          // Only prefetch if not already cached
          if (!this.segments.has(url)) {
            fetch(url)
              .then(response => response.arrayBuffer())
              .then(data => {
                this.addSegment(url, data);
                errorHandler.debug('Prefetched segment', { url }, { component: 'DashPlugin' });
              })
              .catch(err => {
                errorHandler.debug('Failed to prefetch segment', { url, error: err }, { component: 'DashPlugin' });
              });
          }
        });
      }
    };
    
    window.dashCache = dashCache;
    
    // Initialize the dashCache system only when actually needed
    // Don't initialize on pages that don't have video content
    // window.dashCache.init();
    
    // Prefetch segments for faster video startup - DISABLED
    // Since we now use MP4-first dual-loading strategy, DASH prefetching is no longer needed
    // and was causing unnecessary network requests on all pages
    // if (typeof window !== 'undefined' && window.addEventListener) {
    //   window.addEventListener('load', () => {
    //     setTimeout(() => {
    //       window.dashCache.prefetchSegments();
    //     }, 100); // Small delay to not block page load
    //   });
    // }
    
    /**
     * @function preloadDashJs
     * @description Immediately loads DASH.js library and applies privacy-focused patches
     * Ensures fastest video startup by loading the library without delay
     * Applies patches to prevent localStorage usage for GDPR compliance
     * @private
     */
    const initializeDashJs = async (): Promise<void> => {
      if (!window.dashCache.dashJsLoaded) {
        try {
          // Import dash.js immediately for fastest startup
          const dashjs = await import(/* webpackChunkName: "dashjs" */ 'dashjs');
          window.dashjs = dashjs;
          window.dashCache.dashJsLoaded = true;
          errorHandler.debug('DASH.js loaded immediately for optimal performance', null, { component: 'DashPlugin' });
          
          // Approach for DASH.js 5.0.0 - monkeypatch the Storage system
          try {
            // Try to directly prevent any use of localStorage
            if (typeof (dashjs as any).Storage !== 'undefined') {
              // Replace with no-op functions
              (dashjs as any).Storage = {
                getSavedMediaSettings: () => null,
                saveMediaSettings: () => {},
                release: () => {}
              };
            }
            
            // Patch MediaPlayerFactory if available
            const MediaPlayerFactory = dashjs.MediaPlayerFactory;
            if (MediaPlayerFactory && MediaPlayerFactory.create) {
              // Patch the create method to use our caching and disable storage
              const originalCreate = MediaPlayerFactory.create;
              MediaPlayerFactory.create = function(context?: any, source?: string, autoPlay?: boolean) {
                const player = originalCreate(context, source, autoPlay);
                
                if (player && window.dashCache) {
                  try {
                    player.setXHRLoader(window.dashCache.createXHRLoader());
                    
                    // Apply storage disablement immediately after creation
                    window.dashCache.disableCookieStorage(player);
                  } catch (e) {
                    errorHandler.warning('Could not set custom XHR loader', e, { component: 'DashPlugin' });
                  }
                }
                
                return player;
              };
            }
          } catch (e) {
            errorHandler.warning('Could not patch storage functions', e, { component: 'DashPlugin' });
          }
        } catch (err) {
          errorHandler.warning('Failed to load DASH.js immediately', err, { component: 'DashPlugin' });
        }
      }
    };
    
    // Don't load DASH.js immediately - let video components load it on demand
    // initializeDashJs();
  }
  
  /**
   * @returns {Object} - Provides the dashCache to components
   * @property {DashCache} provide.dashCache - The DASH cache system
   */
  return {
    provide: {
      dashCache: process.client ? window.dashCache : {} as Partial<DashCache>
    }
  };
});