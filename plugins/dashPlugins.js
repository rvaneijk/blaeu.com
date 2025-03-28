// plugins/dashPlugins.js - Updated for Nuxt 3 with improved Chrome compatibility and cookie prevention
export default defineNuxtPlugin((nuxtApp) => {
  // Initialize DASH video cache container on client-side only
  if (process.client) {
    // Initialize TrustedTypes policy for video player with better error handling
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
            console.warn('Failed to create TrustedTypes policy:', e);
          }
        }
      }
    } catch (e) {
      console.warn('TrustedTypes not fully supported in this browser:', e);
    }
    
    // Create a global cache for DASH resources
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
      
      // Helper function to disable cookies for any player
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
            console.warn('Could not disable storage:', e);
            return false;
          }
        }
        return false;
      },
      
      // Init the cache system - call this directly to ensure it's ready
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
      
      _setupCleanupInterval() {
        // Run cleanup every 5 minutes
        setInterval(() => {
          this.clearOldSegments();
          this.clearOldPlayers();
        }, 300000);
      },
      
      // Helper method to register a player
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
      
      // Helper method to get a cached player
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
      
      // Get player by source URL
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
      
      // Cache an MPD manifest
      cacheManifest(url, data) {
        // Ensure init
        if (!this.initialized) this.init();
        
        this.manifests.set(url, {
          data,
          timestamp: Date.now()
        });
        // console.log(`Cached manifest: ${url}`);
      },
      
      // Get a cached manifest
      getManifest(url) {
        // Ensure init
        if (!this.initialized) this.init();
        
        const manifest = this.manifests.get(url);
        return manifest?.data || null;
      },
      
      // Report metrics about video loading
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
      
      // Get metrics for analysis
      getMetrics(videoId) {
        return this.metrics[videoId] || [];
      },
      
      // Clear old players (call periodically if needed)
      clearOldPlayers(maxAgeMs = 600000) { // Default 10 minutes
        const now = Date.now();
        for (const id in this.players) {
          if (now - this.players[id].createdAt > maxAgeMs) {
            // Properly destroy the player
            try {
              this.players[id].player.reset();
            } catch (e) {
              console.warn(`Error destroying DASH player ${id}:`, e);
            }
            delete this.players[id];
            // console.log(`Removed old DASH player: ${id}`);
          }
        }
      },
      
      // Add segment to cache
      addSegment(url, data) {
        // Ensure init
        if (!this.initialized) this.init();
        
        this.segments.set(url, {
          data,
          timestamp: Date.now()
        });
      },
      
      // Get segment from cache
      getSegment(url) {
        return this.segments.get(url)?.data || null;
      },
      
      // Clear old segments
      clearOldSegments(maxAgeMs = 300000) { // Default 5 minutes
        const now = Date.now();
        for (const [url, info] of this.segments.entries()) {
          if (now - info.timestamp > maxAgeMs) {
            this.segments.delete(url);
          }
        }
      },
      
      // Create a custom XHR factory for DASH to use that adds caching
      createXHRLoader() {
        const self = this;
        return {
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
    
    // Add a simple hook to preload DASH.js
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
                      console.warn('Could not set custom XHR loader:', e);
                    }
                  }
                  
                  return player;
                };
              }
            } catch (e) {
              console.warn('Could not patch storage functions:', e);
            }
          })
          .catch(err => {
            console.warn('Failed to preload DASH.js:', err);
          });
      }
    }, 1000); // Reduced wait to 1 second after page load for quicker DASH.js availability
  }
  
  // Provide the dashCache to components in Nuxt 3 style
  return {
    provide: {
      dashCache: process.client ? window.dashCache : {}
    }
  };
});