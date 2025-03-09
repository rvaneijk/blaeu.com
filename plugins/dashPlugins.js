// plugins/dashPlugins.js
// Add this file to your Nuxt plugins directory and register it in nuxt.config.js

export default ({ app }, inject) => {
  // Initialize DASH video cache container on client-side only
  if (process.client) {
    // Initialize TrustedTypes policy for video player
    if (window.trustedTypes && window.trustedTypes.createPolicy) {
      // Only create the policy if it doesn't exist yet
      if (!window.trustedTypes.getPolicy('videoPlayerPolicy')) {
        try {
          window.trustedTypes.createPolicy('videoPlayerPolicy', {
            createHTML: (string) => string
          });
          console.log('TrustedTypes policy created for video player');
        } catch (e) {
          console.warn('Failed to create TrustedTypes policy:', e);
        }
      }
    }
    
    // Create a global cache for DASH resources
    window.dashCache = {
      // Track if DASH.js is loaded
      dashJsLoaded: false,
      
      // Store player instances
      players: {},
      
      // Cache for video segments
      segments: new Map(),
      
      // Metrics for video performance
      metrics: {},
      
      // Helper method to register a player
      registerPlayer(id, player, source) {
        this.players[id] = {
          player,
          source,
          createdAt: Date.now()
        };
        
        console.log(`DASH player registered: ${id}`);
        return player;
      },
      
      // Helper method to get a cached player
      getPlayer(id) {
        return this.players[id]?.player || null;
      },
      
      // Get player by source URL
      getPlayerBySource(source) {
        for (const id in this.players) {
          if (this.players[id].source === source) {
            return this.players[id].player;
          }
        }
        return null;
      },
      
      // Report metrics about video loading
      reportMetrics(videoId, data) {
        if (!this.metrics[videoId]) {
          this.metrics[videoId] = [];
        }
        
        this.metrics[videoId].push({
          ...data,
          timestamp: Date.now()
        });
        
        console.log(`Video metrics reported for ${videoId}:`, data);
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
            console.log(`Removed old DASH player: ${id}`);
          }
        }
      },
      
      // Add segment to cache
      addSegment(url, data) {
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
              
              // Check if we have this segment cached
              if (url && url.includes('.m4s') && self.segments.has(url)) {
                console.log(`Serving cached segment: ${url}`);
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
    
    // Add a service worker for DASH video caching (if needed)
    // This is more advanced and would require additional setup
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      window.addEventListener('load', () => {
        // Register a service worker for caching video assets
        // navigator.serviceWorker.register('/dash-cache-sw.js')
        //   .then(registration => {
        //     console.log('DASH cache service worker registered:', registration);
        //   })
        //   .catch(error => {
        //     console.error('DASH cache service worker registration failed:', error);
        //   });
      });
    }
    
    // Add a simple hook to preload DASH.js
    setTimeout(() => {
      if (!window.dashCache.dashJsLoaded) {
        // Preload dash.js after a short delay
        import(/* webpackChunkName: "dashjs" */ 'dashjs')
          .then(dashjs => {
            window.dashjs = dashjs;
            window.dashCache.dashJsLoaded = true;
            console.log('DASH.js preloaded successfully');
            
            // Setup the Media Player Factory to use our custom XHR
            try {
              const MediaPlayerFactory = dashjs.MediaPlayerFactory;
              if (MediaPlayerFactory && MediaPlayerFactory.create) {
                // Patch the create method to use our caching
                const originalCreate = MediaPlayerFactory.create;
                MediaPlayerFactory.create = function(context, source, autoPlay) {
                  const player = originalCreate(context, source, autoPlay);
                  
                  if (player && window.dashCache) {
                    try {
                      player.setXHRLoader(window.dashCache.createXHRLoader());
                    } catch (e) {
                      console.warn('Could not set custom XHR loader:', e);
                    }
                  }
                  
                  return player;
                };
              }
            } catch (e) {
              console.warn('Could not patch MediaPlayerFactory:', e);
            }
          })
          .catch(err => {
            console.warn('Failed to preload DASH.js:', err);
          });
      }
    }, 1000); // Reduced wait to 1 second after page load for quicker DASH.js availability
    
    // Add a periodic cleanup for cache
    setInterval(() => {
      if (window.dashCache) {
        window.dashCache.clearOldSegments();
        window.dashCache.clearOldPlayers();
      }
    }, 300000); // Run every 5 minutes
  }
  
  // Inject the dashCache into the app context
  inject('dashCache', process.client ? window.dashCache : {});
};