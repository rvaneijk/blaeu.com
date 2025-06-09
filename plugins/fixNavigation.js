/**
 * @plugin fixNavigation.js
 * @description Fixes Nuxt navigation issues between pages
 * Resolves issues with client-side navigation when dashCache is present
 */
export default defineNuxtPlugin((nuxtApp) => {
  // Only run on client side
  if (process.client) {
    // Add a navigation hook to handle all navigations
    nuxtApp.hook('page:finish', () => {
      // Ensure we reset any cached transition states
      if (window.dashCache) {
        window.dashCache.inTransition = false;
      }
    });

    // Add another hook for failed navigations
    nuxtApp.hook('app:error', () => {
      // Reset transition state if there's an error
      if (window.dashCache) {
        window.dashCache.inTransition = false;
      }
    });

    // Intercept all navigation to ensure proper handling between pages
    document.addEventListener('click', (e) => {
      // Check if the click was on a link
      let target = e.target;
      while (target && target.tagName !== 'A') {
        target = target.parentNode;
        if (!target || target === document.body) break;
      }
      
      // If we found a link
      if (target && target.tagName === 'A') {
        const href = target.getAttribute('href');
        
        // Handle navigation between main pages (/, /rvaneijk)
        if ((href === '/' && window.location.pathname !== '/') || 
            (href === '/rvaneijk' && window.location.pathname !== '/rvaneijk')) {
          
          // Don't interfere with middle clicks or ctrl+click for new tabs
          if (e.ctrlKey || e.metaKey || e.which === 2) {
            return;
          }

          // For normal clicks, ensure we do a hard navigation
          e.preventDefault();
          window.location.href = href;
        }
      }
    });
  }
});