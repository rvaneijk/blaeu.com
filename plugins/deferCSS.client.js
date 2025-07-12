export default defineNuxtPlugin(() => {
  // Load non-critical CSS files asynchronously after page load
  if (process.client) {
    const loadCSS = (href, media = 'all') => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      link.media = 'print'; // Load as print to avoid render blocking
      link.onload = () => { link.media = media; }; // Switch to actual media when loaded
      document.head.appendChild(link);
    };

    // Defer loading until after initial render
    setTimeout(() => {
      // Load FontAwesome CSS files from public assets
      loadCSS('/assets/css/fontawesome-v6.7.2.css');
      loadCSS('/assets/css/fontawesome-additions.css');
    }, 100);
  }
});