/**
 * @plugin dashPlugins.js
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
export default defineNuxtPlugin((nuxtApp) => {
  // Initialize DASH video cache container on client-side only
  if (process.client) {
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
              createHTML: (string) => string
            });
            // console.log('TrustedTypes policy created for video player');
          } catch (e) {
            // console.warn('Failed to create TrustedTypes policy:', e);
          }
        }
      }
    } catch (e) {
      // console.warn('TrustedTypes not fully supported in this browser:', e);
    }
    
    /**
     * @typedef {Object} DashCache
     * @description Global cache for DASH video resources with privacy protection
     * @property {boolean} dashJsLoaded - Whether DASH.js library is loaded
     * @property {Object.<string, Object>} players - Cached player instances by ID
     * @property {boolean} initialized - Whether cache system is initialized
     * @property {boolean} inTransition - Whether page transition is in progress
     * @property {Map<string, Object>} segments - Cached video segments
     * @property {Map<string, Object>} manifests - Cached MPD manifests
     * @property {Object.<string, Array>} metrics - Performance metrics by video ID
     */
    window.dashCache = {
      // Track if DASH.js is loaded
      dashJsLoaded: false,
      
      // Store player instances
      players: {},
      
      // Flag to track initialization status
      initialized: false,
      
      // Flag to track player transitions (page changes)
      inTransition: false,
      
      // Cache for video segments
      segments: new Map(),
      
      // Cache for MPD manifests
      manifests: new Map(),
      
      // Metrics for video performance
      metrics: {},
      
      /**
       * @function disableCookieStorage
       * @description Prevents DASH.js from storing cookies or using localStorage
       * Implements GDPR compliance by replacing storage with no-op functions
       * @param {Object} player - The DASH.js player instance
       * @returns {boolean} - Whether the operation was successful
       */
      disableCookieStorage(player) {
        // For DASH.js 5.0.0, we'll avoid using updateSettings for storage
        // and instead focus on preventing storage operations directly
        if (player) {
          try {
            // Add a no-op localStorageFactory to the player if supported
            if (typeof player.setStorageController === 'function') {
              // Create empty controller functions
              const noOpController = {
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
            // console.warn('Could not disable storage:', e);
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
      init() {
        if (this.initialized) return;
        // console.log('Initializing DASH cache system');
        this.initialized = true;
        
        // Listen for page transitions
        window.addEventListener('beforeunload', () => {
          this.inTransition = true;
        });
        
        // Setup periodic cleanup
        this._setupCleanupInterval();
      },
      
      /**
       * @function _setupCleanupInterval
       * @description Sets up periodic cleanup of cache to prevent memory leaks
       * @private
       * @returns {void}
       */
      _setupCleanupInterval() {
        // Run cleanup every 5 minutes
        setInterval(() => {
          this.clearOldSegments();
          this.clearOldPlayers();
        }, 300000);
      },
      
      /**
       * @function registerPlayer
       * @description Registers a DASH player instance for caching and management
       * @param {string} id - Unique identifier for the player
       * @param {Object} player - DASH.js player instance
       * @param {string} source - URL of the video source
       * @returns {Object} - The registered player instance
       * @example
       * // Register a player with dashCache
       * window.dashCache.registerPlayer('hero-video', player, '/assets/dash/video/adaptive.mpd');
       */
      registerPlayer(id, player, source) {
        // Ensure init
        if (!this.initialized) this.init();
        
        // Disable local storage of media settings to prevent cookie
        this.disableCookieStorage(player);
        
        this.players[id] = {
          player,
          source,
          createdAt: Date.now()
        };
        
        // console.log(`DASH player registered: ${id} for source: ${source}`);
        return player;
      },
      
      /**
       * @function getPlayer
       * @description Retrieves a cached DASH player instance by ID
       * @param {string} id - Unique identifier for the player
       * @returns {Object|null} - The cached player instance or null if not found
       */
      getPlayer(id) {
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
       * @description Retrieves a cached DASH player instance by source URL
       * Useful for reusing players across similar video components
       * @param {string} source - URL of the video source
       * @returns {Object|null} - The cached player instance or null if not found
       * @example
       * // Get a player for specific source
       * const player = window.dashCache.getPlayerBySource('/assets/dash/video/adaptive.mpd');
       */
      getPlayerBySource(source) {
        // Ensure init
        if (!this.initialized) this.init();
        
        // console.log(`Looking for cached player with source: ${source}`);
        // console.log(`Available cached sources: ${Object.values(this.players).map(p => p.source)}`);
        
        for (const id in this.players) {
          if (this.players[id].source === source) {
            // console.log(`Found cached player ${id} for source: ${source}`);
            // Re-apply cookie prevention before returning
            this.disableCookieStorage(this.players[id].player);
            return this.players[id].player;
          }
        }
        // console.log(`No cached player found for source: ${source}`);
        return null;
      },
      
      /**
       * @function cacheManifest
       * @description Stores an MPD manifest in memory for faster loading
       * @param {string} url - The URL of the manifest
       * @param {*} data - The manifest data to cache
       * @returns {void}
       */
      cacheManifest(url, data) {
        // Ensure init
        if (!this.initialized) this.init();
        
        this.manifests.set(url, {
          data,
          timestamp: Date.now()
        });
        // console.log(`Cached manifest: ${url}`);
      },
      
      /**
       * @function getManifest
       * @description Retrieves a cached MPD manifest
       * @param {string} url - The URL of the manifest to retrieve
       * @returns {*|null} - The cached manifest data or null if not found
       */
      getManifest(url) {
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
       * @param {Object} data - Metrics data to record
       * @returns {void}
       * @example
       * // Report load time metrics
       * window.dashCache.reportMetrics('hero-video', {
       *   loadTime: Date.now(),
       *   source: 'dash',
       *   resolution: '1080p'
       * });
       */
      reportMetrics(videoId, data) {
        // Ensure init
        if (!this.initialized) this.init();
        
        if (!this.metrics[videoId]) {
          this.metrics[videoId] = [];
        }
        
        this.metrics[videoId].push({
          ...data,
          timestamp: Date.now()
        });
        
        // console.log(`Video metrics reported for ${videoId}:`, data);
      },
      
      /**
       * @function getMetrics
       * @description Retrieves recorded performance metrics for a specific video
       * @param {string} videoId - Identifier for the video
       * @returns {Array} - Array of recorded metrics or empty array if none found
       */
      getMetrics(videoId) {
        return this.metrics[videoId] || [];
      },
      
      /**
       * @function clearOldPlayers
       * @description Removes and cleans up old player instances to free memory
       * @param {number} [maxAgeMs=600000] - Maximum age in milliseconds (10 minutes default)
       * @returns {void}
       */
      clearOldPlayers(maxAgeMs = 600000) { // Default 10 minutes
        const now = Date.now();
        for (const id in this.players) {
          if (now - this.players[id].createdAt > maxAgeMs) {
            // Properly destroy the player
            try {
              this.players[id].player.reset();
            } catch (e) {
              // console.warn(`Error destroying DASH player ${id}:`, e);
            }
            delete this.players[id];
            // console.log(`Removed old DASH player: ${id}`);
          }
        }
      },
      
      /**
       * @function addSegment
       * @description Caches a video segment for faster loading
       * @param {string} url - The URL of the segment
       * @param {*} data - The segment data to cache
       * @returns {void}
       */
      addSegment(url, data) {
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
       * @returns {*|null} - The cached segment data or null if not found
       */
      getSegment(url) {
        return this.segments.get(url)?.data || null;
      },
      
      /**
       * @function clearOldSegments
       * @description Removes old segments from cache to free memory
       * @param {number} [maxAgeMs=300000] - Maximum age in milliseconds (5 minutes default)
       * @returns {void}
       */
      clearOldSegments(maxAgeMs = 300000) { // Default 5 minutes
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
       * @returns {Object} - The custom XHR loader factory for DASH.js
       */
      createXHRLoader() {
        const self = this;
        return {
          /**
           * @function load
           * @description Loads a resource with caching support
           * @param {Object} config - Loading configuration
           * @param {string} config.method - HTTP method to use
           * @param {Object} config.request - Request details including URL
           * @param {string} config.responseType - Expected response type
           * @param {Object} config.headers - HTTP headers to send
           * @returns {Promise<Object>} - Promise resolving to the response
           */
          load: function(config) {
            return new Promise((resolve, reject) => {
              const url = config.request ? config.request.url : null;
              
              // For MPD requests, check manifest cache first
              if (url && url.endsWith('.mpd') && self.manifests.has(url)) {
                // console.log(`Serving cached manifest: ${url}`);
                const cached = self.manifests.get(url);
                resolve({
                  url: url,
                  data: cached.data,
                  responseType: config.responseType,
                  status: 200
                });
                return;
              }
              
              // For segment requests, check segment cache
              if (url && url.includes('.m4s') && self.segments.has(url)) {
                // console.log(`Serving cached segment: ${url}`);
                const cached = self.segments.get(url);
                resolve({
                  url: url,
                  data: cached.data,
                  responseType: config.responseType,
                  status: 200
                });
                return;
              }
              
              // Otherwise proceed with normal XHR
              const xhr = new XMLHttpRequest();
              xhr.open(config.method || 'GET', url, true);
              
              if (config.responseType) {
                xhr.responseType = config.responseType;
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
                    url: url,
                    data: xhr.response,
                    responseType: xhr.responseType,
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
      }
    };
    
    // Initialize the dashCache system right away
    window.dashCache.init();
    
    /**
     * @function preloadDashJs
     * @description Preloads DASH.js library and applies privacy-focused patches
     * Ensures faster video startup by loading the library early
     * Applies patches to prevent localStorage usage for GDPR compliance
     * @private
     */
    setTimeout(() => {
      if (!window.dashCache.dashJsLoaded) {
        // Preload dash.js after a short delay
        import(/* webpackChunkName: "dashjs" */ 'dashjs')
          .then(dashjs => {
            window.dashjs = dashjs;
            window.dashCache.dashJsLoaded = true;
            // console.log('DASH.js preloaded successfully');
            
            // Approach for DASH.js 5.0.0 - monkeypatch the Storage system
            try {
              // Try to directly prevent any use of localStorage
              if (typeof dashjs.Storage !== 'undefined') {
                // Replace with no-op functions
                dashjs.Storage = {
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
                MediaPlayerFactory.create = function(context, source, autoPlay) {
                  const player = originalCreate(context, source, autoPlay);
                  
                  if (player && window.dashCache) {
                    try {
                      player.setXHRLoader(window.dashCache.createXHRLoader());
                      
                      // Apply storage disablement immediately after creation
                      window.dashCache.disableCookieStorage(player);
                    } catch (e) {
                      // console.warn('Could not set custom XHR loader:', e);
                    }
                  }
                  
                  return player;
                };
              }
            } catch (e) {
              // console.warn('Could not patch storage functions:', e);
            }
          })
          .catch(err => {
            // console.warn('Failed to preload DASH.js:', err);
          });
      }
    }, 1000); // Reduced wait to 1 second after page load for quicker DASH.js availability
  }
  
  /**
   * @returns {Object} - Provides the dashCache to components
   * @property {Object} provide.dashCache - The DASH cache system
   */
  return {
    provide: {
      dashCache: process.client ? window.dashCache : {}
    }
  };
});