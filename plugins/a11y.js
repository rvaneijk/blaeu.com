/**
 * @module plugins/a11y
 * @description Comprehensive accessibility plugin that manages site-wide accessibility features
 * Implements WCAG 2.2 AA compliance features including:
 * - Cross-origin image attribute management for secure resource loading
 * - Reduced motion implementation for users with vestibular disorders
 * - High contrast mode for users with visual impairments
 * - Focus enhancement for keyboard navigation users
 * - Screen reader announcements for dynamic content changes
 * - Caption support for videos to ensure multimedia accessibility
 * - Font adjustments for dyslexic users (OpenDyslexic font)
 * - Font size adjustments for users with visual impairments
 * 
 * Automatically synchronizes accessibility settings across page navigation and
 * provides a global screen reader announcement system compliant with ARIA best practices.
 * 
 * @author Blaeu Privacy Response Team
 * @version 1.1.0
 * @see {@link components/AccessibilityWidget.vue} UI component that controls these settings
 * @see {@link components/tw-VideoPlayer.vue} Video component with a11y integration
 * @see {@link composables/globalState.js} State management for accessibility settings
 */
export default defineNuxtPlugin((nuxtApp) => {
  /**
   * @function fixCrossOriginImageIssues
   * @description Adds crossorigin="anonymous" attribute to images loaded from specific domains
   * This ensures proper CORS handling for images used in various contexts including
   * preloaded images, Open Graph images, and standard img elements
   */
  const fixCrossOriginImageIssues = () => {
    // List of domains that need crossorigin attributes
    const imageDomains = ['blaeu.com'];
    
    // Add crossorigin attribute to image tags that point to specific domains
    const addCrossOriginToImages = () => {
      if (!process.client) return;
      
      try {
        // Locate preloaded images in meta/link tags and fix them
        const headLinks = document.querySelectorAll('link[rel="preload"][as="image"]');
        headLinks.forEach(link => {
          const href = link.getAttribute('href');
          if (href && imageDomains.some(domain => href.includes(domain))) {
            if (!link.hasAttribute('crossorigin')) {
              link.setAttribute('crossorigin', 'anonymous');
            }
          }
        });
        
        // Locate open graph and other meta images
        const metaTags = document.querySelectorAll('meta[property^="og:image"], meta[name^="twitter:image"]');
        const imageUrls = new Set();
        metaTags.forEach(meta => {
          const content = meta.getAttribute('content');
          if (content && imageDomains.some(domain => content.includes(domain))) {
            imageUrls.add(content);
          }
        });
        
        // Now locate image tags and fix them
        const images = document.querySelectorAll('img');
        images.forEach(img => {
          const src = img.getAttribute('src');
          if (src && (imageDomains.some(domain => src.includes(domain)) || imageUrls.has(src))) {
            if (!img.hasAttribute('crossorigin')) {
              img.setAttribute('crossorigin', 'anonymous');
            }
          }
        });
      } catch (e) {
        // console.warn('Error fixing cross-origin images:', e);
      }
    };
    
    // Run image fixes on load and observe DOM changes
    if (process.client) {
      // Run immediately
      setTimeout(addCrossOriginToImages, 0);
      
      // Run on load
      window.addEventListener('load', addCrossOriginToImages);
      
      // Setup mutation observer to watch for new images
      try {
        const observer = new MutationObserver(mutations => {
          let needsCheck = false;
          
          mutations.forEach(mutation => {
            if (mutation.type === 'childList') {
              mutation.addedNodes.forEach(node => {
                if (node.nodeName === 'IMG' || 
                    node.nodeName === 'LINK' || 
                    (node.querySelectorAll && (
                      node.querySelectorAll('img').length > 0 || 
                      node.querySelectorAll('link[rel="preload"][as="image"]').length > 0
                    ))
                ) {
                  needsCheck = true;
                }
              });
            }
          });
          
          if (needsCheck) {
            addCrossOriginToImages();
          }
        });
        
        // Start observing with a slight delay to ensure DOM is ready
        setTimeout(() => {
          observer.observe(document.documentElement, { 
            childList: true, 
            subtree: true 
          });
        }, 100);
      } catch (e) {
        // console.warn('Error setting up mutation observer:', e);
      }
    }
  };
  
  /**
   * @function handleNavigation
   * @description Handles navigation events by reapplying accessibility fixes
   * Called during router navigation events to ensure cross-origin image
   * attributes are properly maintained as the DOM changes
   */
  const handleNavigation = () => {
    // Fix cross-origin image issues
    setTimeout(fixCrossOriginImageIssues, 10);
  };
  
  /**
   * @function initAccessibilitySettings
   * @description Initializes accessibility settings from localStorage and applies them to the DOM
   * Reads saved user preferences and applies them consistently across page loads
   * Handles configuration for all accessibility features:
   * - Reduced motion (for vestibular disorders)
   * - High contrast mode (for visual impairments) 
   * - Focus mode (for keyboard navigation users)
   * - Video captions (for hearing impaired users)
   * - Font family (OpenDyslexic font for dyslexic users)
   * - Font size adjustments (for visual impairments)
   * 
   * Also manages backward compatibility with legacy storage formats
   * @returns {void}
   * @example
   * // Initialize all accessibility settings from localStorage
   * initAccessibilitySettings();
   * 
   * @throws {Error} If localStorage access fails or JSON parsing errors occur
   */
  const initAccessibilitySettings = () => {
    if (process.client) {
      try {
        // First try to get state from the primary storage key
        const savedState = localStorage.getItem('accessibility-state');
        
        // Check for legacy preferences format as fallback
        // @deprecated 'accessibility-preferences' will be removed in a future version
        const legacyPrefs = !savedState ? localStorage.getItem('accessibility-preferences') : null;
        
        if (savedState) {
          const state = JSON.parse(savedState);
          
          // Legacy format synchronization removed - no longer needed
          // We've fully migrated to using only 'accessibility-state'
          
          // Apply saved settings to DOM
          if (state.reduceMotion) {
            document.documentElement.classList.add('reduce-motion');
            
            // Also pause all videos immediately
            setTimeout(() => {
              const videos = document.querySelectorAll('video');
              videos.forEach(video => {
                if (video && typeof video.pause === 'function') {
                  video.pause();
                }
              });
              
              // Dispatch an event to notify components of reduce motion change
              try {
                const reduceMotionEvent = new Event('reduceMotionChange');
                document.dispatchEvent(reduceMotionEvent);
              } catch (err) {
                // console.warn('Error dispatching reduceMotionChange event:', err);
              }
            }, 100);
          }
          
          if (state.highContrast) {
            document.documentElement.classList.add('high-contrast-mode');
          }
          
          if (state.focusMode) {
            document.documentElement.classList.add('focus-mode');
            document.documentElement.classList.add('enhanced-focus');
          }
          
          if (state.videoCaptions) {
            // Check if there are any videos on the page before applying captions
            const videos = document.querySelectorAll('video');
            
            if (videos.length > 0) {
              // Only add captions-enabled class if videos exist on the page
              document.documentElement.classList.add('captions-enabled');
              
              // Function to apply captions to all videos
              const applyCaptions = () => {
                // Re-query videos as they may have been dynamically added
                const currentVideos = document.querySelectorAll('video');
                
                // Only proceed if we have videos
                if (currentVideos.length === 0) return;
                
                currentVideos.forEach(video => {
                  const tracks = video.textTracks;
                  if (tracks && tracks.length > 0) {
                    for (let i = 0; i < tracks.length; i++) {
                      if (tracks[i].kind === 'captions') {
                        tracks[i].mode = 'showing';
                      }
                    }
                  }
                  
                  // For DASH players that might be attached to videos
                  if (video.dashPlayer && video.dashPlayer.setTextTrack) {
                    try {
                      video.dashPlayer.setTextTrack(0); // Enable first track
                    } catch (e) {
                      // console.warn('Could not set DASH text track:', e);
                    }
                  }
                });
                
                // Also dispatch a global captions event
                try {
                  const captionsEvent = new CustomEvent('captionsChange', { 
                    detail: { enabled: true } 
                  });
                  document.dispatchEvent(captionsEvent);
                } catch (err) {
                  // console.warn('Error dispatching captionsChange event:', err);
                }
              };
            
            // Apply captions multiple times with staggered timeouts
            // This helps catch videos that load asynchronously
            applyCaptions(); // Immediate
            setTimeout(applyCaptions, 100);  // Short delay
            setTimeout(applyCaptions, 500);  // Medium delay
            setTimeout(applyCaptions, 1000); // Longer delay
            setTimeout(applyCaptions, 2000); // Extra long delay for slow loading videos
            
            // Add a mutation observer to catch new videos being added to the DOM
            try {
              const captionObserver = new MutationObserver(mutations => {
                let videoAdded = false;
                
                mutations.forEach(mutation => {
                  if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach(node => {
                      if (node.nodeName === 'VIDEO' || 
                          (node.querySelectorAll && node.querySelectorAll('video').length > 0)) {
                        videoAdded = true;
                      }
                    });
                  }
                });
                
                if (videoAdded) {
                  // If a new video was added, apply captions again
                  setTimeout(applyCaptions, 10);
                }
              });
              
              // Start observing the entire document
              captionObserver.observe(document.documentElement, { 
                childList: true, 
                subtree: true 
              });
              
              // Set up a cleanup for the observer
              window.addEventListener('beforeunload', () => {
                captionObserver.disconnect();
              });
            } catch (e) {
              // console.warn('Error setting up caption observer:', e);
            }
            } // End of if (videos.length > 0) block
          } // End of if (state.videoCaptions) block
          
          // Apply font family setting
          if (state.fontFamily === 'dyslexic') {
            document.documentElement.classList.add('dyslexic-font');
          }
          
          // Apply font size level
          if (state.fontSizeLevel !== undefined && state.fontSizeLevel !== 0) {
            // Remove any existing font size classes
            document.documentElement.classList.remove(
              'font-size-decrease-2', 
              'font-size-decrease-1', 
              'font-size-increase-1', 
              'font-size-increase-2', 
              'font-size-increase-3'
            );
            
            // Apply appropriate class based on level
            const fontSizeLevel = state.fontSizeLevel;
            if (fontSizeLevel !== 0) {
              const directionName = fontSizeLevel > 0 ? 'increase' : 'decrease';
              const level = Math.abs(fontSizeLevel);
              document.documentElement.classList.add(`font-size-${directionName}-${level}`);
            }
          }
        } else if (legacyPrefs) {
          // Migration path from legacy format
          // @deprecated This migration path will be removed in a future update
          try {
            console.info('Migrating from deprecated accessibility-preferences to accessibility-state');
            const prefs = JSON.parse(legacyPrefs);
            
            // Convert the legacy format to the new state format
            const migratedState = {
              reduceMotion: false, // Using default, not reading from legacy
              highContrast: false, // Using default, not reading from legacy
              focusMode: false, // Default value, not reading from legacy
              videoCaptions: false, // Using default, not reading from legacy
              fontFamily: 'default', // Using default, not reading from legacy
              fontSizeLevel: 0, // Using default, not reading from legacy
              widgetPosition: 'bottom-right' // Default position, not reading from legacy
            };
            
            // Save the migrated state
            localStorage.setItem('accessibility-state', JSON.stringify(migratedState));
            
            // Apply settings from the migrated state
            if (migratedState.reduceMotion) {
              document.documentElement.classList.add('reduce-motion');
              
              // Pause all videos
              setTimeout(() => {
                const videos = document.querySelectorAll('video');
                videos.forEach(video => {
                  if (video && typeof video.pause === 'function') {
                    video.pause();
                  }
                });
                
                // Dispatch event
                try {
                  const reduceMotionEvent = new Event('reduceMotionChange');
                  document.dispatchEvent(reduceMotionEvent);
                } catch (err) {
                  // console.warn('Error dispatching reduceMotionChange event:', err);
                }
              }, 100);
            }
            
            if (migratedState.highContrast) {
              document.documentElement.classList.add('high-contrast-mode');
            }
            
            if (migratedState.focusMode) {
              document.documentElement.classList.add('focus-mode');
              document.documentElement.classList.add('enhanced-focus');
            }
            
            // Apply other migrated settings...
          } catch (err) {
            console.error('Error migrating from legacy accessibility preferences:', err);
          }
        }
      } catch (e) {
        console.error('Error applying accessibility settings:', e);
      }
    }
  };
  
  // Function to handle accessibility reset events
  const handleAccessibilityReset = () => {
    if (process.client) {
      // Remove all accessibility-related classes
      document.documentElement.classList.remove(
        'high-contrast-mode',
        'focus-mode',
        'enhanced-focus',
        'reduce-motion',
        'captions-enabled',
        'dyslexic-font',
        'font-size-decrease-2', 
        'font-size-decrease-1', 
        'font-size-increase-1', 
        'font-size-increase-2', 
        'font-size-increase-3'
      );
      
      // Try to load from localStorage again to ensure we have the latest settings
      initAccessibilitySettings();
    }
  };
  
  // Run the setup at appropriate times
  if (process.client) {
    // Listen for accessibility reset events
    document.addEventListener('accessibilityReset', handleAccessibilityReset);
    
    // Ensure initialization runs multiple times with staggered timing
    // This helps catch videos that load dynamically or with delays
    const runInitialization = () => {
      // Run immediately
      initAccessibilitySettings();
      
      // Run again after a small delay for elements that load dynamically
      setTimeout(initAccessibilitySettings, 100);
      
      // Run again after the page has had time to fully render
      setTimeout(initAccessibilitySettings, 500);
      
      // Run one last time to catch any late-loading elements
      setTimeout(initAccessibilitySettings, 1000);
    };
    
    // Initial setup
    setTimeout(fixCrossOriginImageIssues, 0);
    setTimeout(runInitialization, 0);
    
    // Run on load events
    window.addEventListener('load', fixCrossOriginImageIssues);
    window.addEventListener('load', runInitialization);
    document.addEventListener('DOMContentLoaded', fixCrossOriginImageIssues);
    document.addEventListener('DOMContentLoaded', runInitialization);
    
    // Handle router events
    if (nuxtApp.$router) {
      nuxtApp.$router.beforeEach(() => {
        handleNavigation();
        return true;
      });
      
      nuxtApp.$router.afterEach(() => {
        handleNavigation();
        runInitialization();
      });
    }
    
    // Handle page changes
    nuxtApp.hook('page:start', handleNavigation);
    nuxtApp.hook('page:finish', () => {
      handleNavigation();
      runInitialization();
    });
    
    // Create a MutationObserver to detect when new videos are added to the DOM
    try {
      const videoObserver = new MutationObserver(mutations => {
        let videoAdded = false;
        
        mutations.forEach(mutation => {
          if (mutation.type === 'childList') {
            mutation.addedNodes.forEach(node => {
              if (node.nodeName === 'VIDEO' || 
                  (node.querySelectorAll && node.querySelectorAll('video').length > 0)) {
                videoAdded = true;
              }
            });
          }
        });
        
        if (videoAdded) {
          // If a video was added, apply accessibility settings again
          setTimeout(initAccessibilitySettings, 10);
        }
      });
      
      // Start observing with a slight delay to ensure DOM is ready
      setTimeout(() => {
        videoObserver.observe(document.documentElement, { 
          childList: true, 
          subtree: true 
        });
      }, 200);
    } catch (e) {
      // console.warn('Error setting up video observer:', e);
    }
  }

  /**
   * @typedef {Object} Announcer
   * @description Provides an accessible announcement system for screen readers
   * Creates ARIA live regions in the DOM for announcing dynamic content changes
   * to assistive technologies. Implements WCAG 4.1.3 Status Messages (AA)
   * and follows WAI-ARIA best practices for live regions.
   * @property {Function} polite - Announces message in polite mode (non-interrupting)
   * @property {Function} assertive - Announces message in assertive mode (interrupting)
   */
  
  /**
   * @type {Announcer}
   * @description Implementation of the announcer system for screen readers
   * Creates and manages ARIA live regions dynamically as needed
   */
  const announcer = {
    /**
     * @function polite
     * @description Announces a message in polite mode (non-interrupting)
     * Used for status updates that don't require immediate attention
     * @param {string} message - The message to announce to screen readers
     * @returns {void}
     * @example
     * // Announce a status update that doesn't interrupt user
     * announcer.polite('Your preferences have been saved');
     */
    polite: (message) => {
      if (process.client) {
        const div = document.getElementById('announcer-polite') || 
          (() => {
            const el = document.createElement('div');
            el.id = 'announcer-polite';
            el.setAttribute('aria-live', 'polite');
            el.setAttribute('aria-atomic', 'true');
            el.className = 'sr-announcer';
            document.body.appendChild(el);
            return el;
          })();
        div.textContent = message;
      }
    },
    
    /**
     * @function assertive
     * @description Announces a message in assertive mode (interrupting)
     * Used for important changes that require immediate attention
     * @param {string} message - The message to announce to screen readers
     * @returns {void}
     * @example
     * // Announce an important message that interrupts the current context
     * announcer.assertive('Error: Your session has expired');
     */
    assertive: (message) => {
      if (process.client) {
        const div = document.getElementById('announcer-assertive') || 
          (() => {
            const el = document.createElement('div');
            el.id = 'announcer-assertive';
            el.setAttribute('aria-live', 'assertive');
            el.setAttribute('aria-atomic', 'true');
            el.className = 'sr-announcer';
            document.body.appendChild(el);
            return el;
          })();
        div.textContent = message;
      }
    }
  };
  
  /**
   * @returns {Object} Plugin exports with provided methods
   * @property {Object} provide - Methods provided to Nuxt application
   * @property {Function} provide.announce - Screen reader announcement method
   */
  return {
    provide: {
      /**
       * @function announce
       * @description Global method to announce messages to screen readers
       * Uses ARIA live regions to make dynamic content changes accessible
       * @param {string} message - The message to announce to screen readers
       * @param {('polite'|'assertive')} [type='polite'] - The announcement mode:
       *   - 'polite': Non-interrupting (default, for most updates)
       *   - 'assertive': Interrupting (for critical information)
       * @returns {void}
       * @example
       * // In a component method:
       * this.$announce('Settings saved successfully');
       * 
       * // For critical notifications:
       * this.$announce('Form submission failed', 'assertive');
       */
      announce: (message, type = 'polite') => {
        if (type === 'assertive') {
          announcer.assertive(message);
        } else {
          announcer.polite(message);
        }
      }
    }
  };
});