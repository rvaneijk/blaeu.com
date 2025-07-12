/**
 * @plugin keyboardShortcuts.js
 * @description Provides keyboard shortcut functionality for the application
 * Implements accessibility-focused keyboard navigation including:
 * - Section navigation (Alt+1, Alt+2, etc.)
 * - Accessibility feature toggles (Alt+A, Alt+F, Alt+X, Alt+Z)
 * - Keyboard shortcuts help dialog (Alt+/)
 * - Navigation to top/bottom of page (Alt+0, Alt+9)
 * - Widget toggles for privacy policy, terms, etc.
 */
import { globalState } from '~/composables/globalState';

export default defineNuxtPlugin((nuxtApp) => {
  if (process.client) {
    // Note: Styles are now loaded from external CSS file at /assets/css/keyboard-shortcuts.css
    
    // Store for tracking which element had focus before opening a dialog
    let previousFocus = null;
    let keyboardShortcutsInitialized = false;
    
    // Helper function to announce actions to screen readers
    const announceAction = (message) => {
      const { $announce } = nuxtApp;
      if ($announce) {
        $announce(message, 'polite');
      }
    };
    
    // Function to generate and download keyboard shortcuts
    const downloadShortcuts = (isNL) => {
      if (process.client) {
        // Set up content based on language
        const fileName = isNL ? 'toetsenbordsnelkoppelingen-blaeu.txt' : 'keyboard-shortcuts-blaeu.txt';
        
        // Generate the content based on selected language
        let content = '';
        
        if (isNL) {
          content = `TOETSENBORDSNELKOPPELINGEN - TEAM BLAEU (BLAEU PRIVACY RESPONSE TEAM B.V.)

STANDAARD NAVIGATIE
- Alt+0: Ga naar bovenkant pagina
- Alt+1: Spring naar hoofdinhoud
- Alt+2: Spring naar navigatiemenu
- Alt+9: Spring naar Contact

HOMEPAGINA SECTIES
- Alt+3: Over ons
- Alt+4: Diensten
- Alt+5: Getuigenissen
- Alt+6: Contact

PERSOONLIJKE PAGINA SECTIES
- Alt+3: Mijn Boek
- Alt+4: Onderzoekspublicaties
- Alt+5: Media & Thought Leadership
- Alt+6: Contact

TOEGANKELIJKHEIDSFUNCTIES
- Alt+A: Toegankelijkheidswidget aan/uit
- Alt+K: Toetsenbordsnelkoppelingen aan/uit
- Alt+F: Focusmodus aan/uit
- Alt+X: Hoog contrast modus aan/uit
- Alt+Z: Verminderde beweging aan/uit

HULPSNELKOPPELINGEN
- Alt+B: Terug naar boven
- Alt+/: Open deze snelkoppelingendialoog

STANDAARD BROWSERSNELKOPPELINGEN
- Tab: Vooruit bewegen door focusbare elementen
- Shift+Tab: Achteruit bewegen door focusbare elementen
- Enter: Activeer het gefocuste element
- Space: Activeer knoppen en schakel formulierelementen`;
        } else {
          content = `KEYBOARD SHORTCUTS - TEAM BLAEU (BLAEU PRIVACY RESPONSE TEAM B.V.)

STANDARD NAVIGATION
- Alt+0: Go to top of page
- Alt+1: Skip to main content
- Alt+2: Jump to navigation menu
- Alt+9: Jump to Contact

HOME PAGE SECTIONS
- Alt+3: About Us
- Alt+4: Services
- Alt+5: Testimonials
- Alt+6: Contact

PERSONAL PAGE SECTIONS
- Alt+3: My Book
- Alt+4: Research Publications
- Alt+5: Media & Thought Leadership
- Alt+6: Contact

ACCESSIBILITY FEATURES
- Alt+A: Toggle accessibility widget
- Alt+K: Toggle keyboard shortcuts
- Alt+F: Toggle focus mode
- Alt+X: Toggle high contrast mode
- Alt+Z: Toggle reduce motion

UTILITY SHORTCUTS
- Alt+B: Back to top
- Alt+/: Open this shortcuts dialog

STANDARD BROWSER SHORTCUTS
- Tab: Move forward through focusable elements
- Shift+Tab: Move backward through focusable elements
- Enter: Activate the focused element
- Space: Activate buttons and toggle form controls`;
        }
        
        // Create a blob with the text content
        const blob = new Blob([content], { type: 'text/plain' });
        
        // Create a URL for the blob
        const url = URL.createObjectURL(blob);
        
        // Create a temporary link element
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        
        // Append to the body, click, and remove
        document.body.appendChild(a);
        a.click();
        
        // Clean up
        setTimeout(() => {
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
          
          // Announce to screen readers
          announceAction(isNL 
            ? 'Toetsenbordsnelkoppelingen worden gedownload' 
            : 'Keyboard shortcuts are downloading');
        }, 100);
      }
    };
    
    // Function to show keyboard shortcuts
    const showKeyboardShortcuts = () => {
      // Try to find the widget first
      const widgetElement = document.querySelector('keyboard-shortcuts-widget');
      if (widgetElement) {
        // Handle Vue instance if present
        if (widgetElement.__vueParentComponent && widgetElement.__vueParentComponent.ctx) {
          const widgetInstance = widgetElement.__vueParentComponent.ctx;
          if (widgetInstance.openWidget) {
            widgetInstance.openWidget();
            return;
          }
        }
      }
      
      // If widget not found, try with custom event (will be caught by the widget)
      try {
        // Save current focus
        previousFocus = document.activeElement;
        
        // Dispatch event to show keyboard shortcuts widget
        const event = new CustomEvent('open-keyboard-shortcuts', {
          detail: {
            language: document.documentElement.lang === 'nl' ? 'nl' : 'en',
          }
        });
        document.dispatchEvent(event);
        
        // Announce to screen readers
        announceAction('Keyboard shortcuts opened');
      } catch (err) {
        console.warn('Error opening keyboard shortcuts widget:', err);
      }
    };
    
    // Function to toggle focus mode
    const toggleFocusMode = () => {
      const htmlElement = document.documentElement;
      const hasFocusMode = htmlElement.classList.contains('focus-mode');
      
      if (hasFocusMode) {
        htmlElement.classList.remove('focus-mode');
        // Also remove enhanced-focus class to ensure consistency
        htmlElement.classList.remove('enhanced-focus');
        
        // Update global state
        globalState.focusMode = false;
        
        // Update the accessibility widget's checkbox if it exists
        const focusCheckbox = document.getElementById('focus-mode');
        if (focusCheckbox) {
          focusCheckbox.checked = false;
        }
        
        announceAction('Focus mode disabled');
      } else {
        htmlElement.classList.add('focus-mode');
        // Also add enhanced-focus class to ensure consistency
        htmlElement.classList.add('enhanced-focus');
        
        // Update global state
        globalState.focusMode = true;
        
        // Update the accessibility widget's checkbox if it exists
        const focusCheckbox = document.getElementById('focus-mode');
        if (focusCheckbox) {
          focusCheckbox.checked = true;
        }
        
        announceAction('Focus mode enabled - focus indicators enhanced');
      }
    };
    
    // Function to toggle high contrast mode
    const toggleHighContrast = () => {
      const htmlElement = document.documentElement;
      const hasHighContrast = htmlElement.classList.contains('high-contrast-mode');
      
      if (hasHighContrast) {
        htmlElement.classList.remove('high-contrast-mode');
        
        // Update global state
        globalState.highContrast = false;
        
        // Find all widgets on the page and update them
        const accessibilityWidgets = document.querySelectorAll('.accessibility-widget');
        accessibilityWidgets.forEach(widget => {
          // Find radio buttons for contrast in the widget
          const defaultContrastButton = widget.querySelector('button[aria-label="Default contrast"]');
          const highContrastButton = widget.querySelector('button[aria-label="High contrast"]');
          
          // Update button states if found
          if (defaultContrastButton && highContrastButton) {
            defaultContrastButton.classList.add('active');
            highContrastButton.classList.remove('active');
            defaultContrastButton.setAttribute('aria-checked', 'true');
            highContrastButton.setAttribute('aria-checked', 'false');
          }
        });
        
        announceAction('High contrast mode disabled');
      } else {
        htmlElement.classList.add('high-contrast-mode');
        
        // Update global state
        globalState.highContrast = true;
        
        // Find all widgets on the page and update them
        const accessibilityWidgets = document.querySelectorAll('.accessibility-widget');
        accessibilityWidgets.forEach(widget => {
          // Find radio buttons for contrast in the widget
          const defaultContrastButton = widget.querySelector('button[aria-label="Default contrast"]');
          const highContrastButton = widget.querySelector('button[aria-label="High contrast"]');
          
          // Update button states if found
          if (defaultContrastButton && highContrastButton) {
            defaultContrastButton.classList.remove('active');
            highContrastButton.classList.add('active');
            defaultContrastButton.setAttribute('aria-checked', 'false');
            highContrastButton.setAttribute('aria-checked', 'true');
          }
        });
        
        announceAction('High contrast mode enabled');
      }
    };
    
    // Function to toggle reduce motion
    const toggleReduceMotion = () => {
      const htmlElement = document.documentElement;
      const hasReducedMotion = htmlElement.classList.contains('reduce-motion');
      
      if (hasReducedMotion) {
        htmlElement.classList.remove('reduce-motion');
        
        // Update global state
        globalState.reduceMotion = false;
        
        // Play all videos when reduce motion is disabled
        const videos = document.querySelectorAll('video');
        videos.forEach(video => {
          if (video && typeof video.play === 'function') {
            video.play().catch(err => { /* console.warn('Could not play video:', err) */ });
          }
        });
        
        // Update the accessibility widget's checkbox if it exists
        const reduceMotionCheckbox = document.getElementById('reduce-motion');
        if (reduceMotionCheckbox) {
          reduceMotionCheckbox.checked = false;
        }
        
        // Dispatch an event to notify components of reduce motion change
        try {
          const reduceMotionEvent = new Event('reduceMotionChange');
          document.dispatchEvent(reduceMotionEvent);
        } catch (err) {
          // console.warn('Error dispatching reduceMotionChange event:', err);
        }
        
        announceAction('Reduced motion disabled, videos playing');
      } else {
        htmlElement.classList.add('reduce-motion');
        
        // Update global state
        globalState.reduceMotion = true;
        
        // Pause all videos when reduce motion is enabled
        const videos = document.querySelectorAll('video');
        videos.forEach(video => {
          if (video && typeof video.pause === 'function') {
            video.pause();
          }
        });
        
        // Update the accessibility widget's checkbox if it exists
        const reduceMotionCheckbox = document.getElementById('reduce-motion');
        if (reduceMotionCheckbox) {
          reduceMotionCheckbox.checked = true;
        }
        
        // Dispatch an event to notify components of reduce motion change
        try {
          const reduceMotionEvent = new Event('reduceMotionChange');
          document.dispatchEvent(reduceMotionEvent);
        } catch (err) {
          // console.warn('Error dispatching reduceMotionChange event:', err);
        }
        
        announceAction('Reduced motion enabled, videos paused');
      }
    };
    
    // Function to toggle video captions - removed
    
    // Helper function to set up the caption system - removed
    
    // Main keyboard shortcut handler function
    const handleKeyboardShortcuts = (e) => {
      // Only handle Alt key combinations
      if (e.altKey) {
        // Get references to key elements
        const accessibilityWidgetButton = document.querySelector('.accessibility-widget-toggle');
        const mainContent = document.getElementById('main-content');
        const navigation = document.querySelector('nav[aria-label="Main Navigation"]');
        const footer = document.querySelector('footer');
        const shortcutsDialog = document.getElementById('keyboard-shortcuts-dialog');
        const backToTopButton = document.querySelector('.back-to-top-btn');
        
        switch (e.key) {
          // Primary Navigation
          case '1':
            if (mainContent) {
              e.preventDefault();
              mainContent.focus();
              mainContent.scrollIntoView({ behavior: 'smooth' });
              announceAction('Jumped to main content');
            }
            break;
            
          case 'k':
          case 'K':
            e.preventDefault();
            // Dispatch a custom toggle event for keyboard shortcuts
            document.dispatchEvent(new CustomEvent('toggle-keyboard-shortcuts'));
            break;
            
          case '2':
            e.preventDefault();
            // Force scroll down a bit to make navbar visible if at top of page
            if (window.scrollY < 100) {
              window.scrollTo({ top: 100, behavior: 'smooth' });
              // Give time for the navbar to become visible
              setTimeout(() => {
                // Both main page and personal page have nav elements with aria-label="Main Navigation"
                // Main page has both a mobile and desktop version
                const navigation = document.querySelector('nav[aria-label="Main Navigation"]');
                if (navigation) {
                  // Check if we're in mobile view and the mobile menu is closed
                  const isMobileView = window.innerWidth < 768;
                  const mobileMenuButton = document.querySelector('#mobile-menu-button');
                  const mobileMenuClosed = mobileMenuButton && mobileMenuButton.getAttribute('aria-expanded') === 'false';
                  
                  // If mobile view and menu is closed, first open the menu
                  if (isMobileView && mobileMenuClosed && mobileMenuButton) {
                    mobileMenuButton.click();
                    setTimeout(() => {
                      // After menu opens, focus on the first menu item
                      const firstMenuItem = document.querySelector('#mobile-menu a[role="menuitem"]');
                      if (firstMenuItem) {
                        firstMenuItem.focus();
                        navigation.scrollIntoView({ behavior: 'smooth' });
                        announceAction('Opened mobile menu, use Tab to navigate menu items');
                      }
                    }, 300); // Small delay to allow menu to open
                    return;
                  }
                  
                  // Regular desktop navigation or mobile menu already open
                  const firstFocusableElement = navigation.querySelector('a, button, [tabindex="0"]');
                  if (firstFocusableElement) {
                    firstFocusableElement.focus();
                    navigation.scrollIntoView({ behavior: 'smooth' });
                    announceAction('Jumped to navigation menu, use Tab to navigate menu items');
                  } else {
                    // Fallback to focusing the navigation itself if no focusable elements
                    navigation.focus();
                    navigation.scrollIntoView({ behavior: 'smooth' });
                    announceAction('Jumped to navigation menu');
                  }
                } else {
                  // Fallback to navbar element if specific nav isn't found
                  const navbar = document.querySelector('nav');
                  if (navbar) {
                    // Check if we're in mobile view with a closed menu
                    const isMobileView = window.innerWidth < 768;
                    const mobileMenuButton = document.querySelector('#mobile-menu-button');
                    const mobileMenuClosed = mobileMenuButton && mobileMenuButton.getAttribute('aria-expanded') === 'false';
                    
                    // If mobile view and menu is closed, first open the menu
                    if (isMobileView && mobileMenuClosed && mobileMenuButton) {
                      mobileMenuButton.click();
                      setTimeout(() => {
                        // After menu opens, focus on the first menu item
                        const firstMenuItem = document.querySelector('#mobile-menu a[role="menuitem"]');
                        if (firstMenuItem) {
                          firstMenuItem.focus();
                          navbar.scrollIntoView({ behavior: 'smooth' });
                          announceAction('Opened mobile menu, use Tab to navigate menu items');
                        }
                      }, 300); // Small delay to allow menu to open
                      return;
                    }
                    
                    // Focus on the first focusable element inside the navbar
                    const firstFocusableElement = navbar.querySelector('a, button, [tabindex="0"]');
                    if (firstFocusableElement) {
                      firstFocusableElement.focus();
                      navbar.scrollIntoView({ behavior: 'smooth' });
                      announceAction('Jumped to navigation menu, use Tab to navigate menu items');
                    } else {
                      navbar.focus();
                      announceAction('Jumped to navigation menu');
                    }
                  }
                }
              }, 500);
            } else {
              // Already scrolled down, navbar should be visible
              // Both main page and personal page have nav elements with aria-label="Main Navigation"
              // Main page has both a mobile and desktop version
              const navigation = document.querySelector('nav[aria-label="Main Navigation"]');
              if (navigation) {
                // Check if we're in mobile view and the mobile menu is closed
                const isMobileView = window.innerWidth < 768;
                const mobileMenuButton = document.querySelector('#mobile-menu-button');
                const mobileMenuClosed = mobileMenuButton && mobileMenuButton.getAttribute('aria-expanded') === 'false';
                
                // If mobile view and menu is closed, first open the menu
                if (isMobileView && mobileMenuClosed && mobileMenuButton) {
                  mobileMenuButton.click();
                  setTimeout(() => {
                    // After menu opens, focus on the first menu item
                    const firstMenuItem = document.querySelector('#mobile-menu a[role="menuitem"]');
                    if (firstMenuItem) {
                      firstMenuItem.focus();
                      navigation.scrollIntoView({ behavior: 'smooth' });
                      announceAction('Opened mobile menu, use Tab to navigate menu items');
                    }
                  }, 300); // Small delay to allow menu to open
                  return;
                }
                
                // Regular desktop navigation or mobile menu already open
                const firstFocusableElement = navigation.querySelector('a, button, [tabindex="0"]');
                if (firstFocusableElement) {
                  firstFocusableElement.focus();
                  navigation.scrollIntoView({ behavior: 'smooth' });
                  announceAction('Jumped to navigation menu, use Tab to navigate menu items');
                } else {
                  // Fallback to focusing the navigation itself if no focusable elements
                  navigation.focus();
                  navigation.scrollIntoView({ behavior: 'smooth' });
                  announceAction('Jumped to navigation menu');
                }
              } else {
                // Fallback to navbar element if specific nav isn't found
                const navbar = document.querySelector('nav');
                if (navbar) {
                  // Check if we're in mobile view with a closed menu
                  const isMobileView = window.innerWidth < 768;
                  const mobileMenuButton = document.querySelector('#mobile-menu-button');
                  const mobileMenuClosed = mobileMenuButton && mobileMenuButton.getAttribute('aria-expanded') === 'false';
                  
                  // If mobile view and menu is closed, first open the menu
                  if (isMobileView && mobileMenuClosed && mobileMenuButton) {
                    mobileMenuButton.click();
                    setTimeout(() => {
                      // After menu opens, focus on the first menu item
                      const firstMenuItem = document.querySelector('#mobile-menu a[role="menuitem"]');
                      if (firstMenuItem) {
                        firstMenuItem.focus();
                        navbar.scrollIntoView({ behavior: 'smooth' });
                        announceAction('Opened mobile menu, use Tab to navigate menu items');
                      }
                    }, 300); // Small delay to allow menu to open
                    return;
                  }
                  
                  // Focus on the first focusable element inside the navbar
                  const firstFocusableElement = navbar.querySelector('a, button, [tabindex="0"]');
                  if (firstFocusableElement) {
                    firstFocusableElement.focus();
                    navbar.scrollIntoView({ behavior: 'smooth' });
                    announceAction('Jumped to navigation menu, use Tab to navigate menu items');
                  } else {
                    navbar.focus();
                    announceAction('Jumped to navigation menu');
                  }
                }
              }
            }
            break;
            

          case '9':
            e.preventDefault();
            // Find the contact section - it has id="about" in both homepage and personal page
            const contactSection = document.getElementById('about');
            if (contactSection) {
              contactSection.scrollIntoView({ behavior: 'smooth' });
              
              // Find the first focusable element in the contact section
              const firstFocusableElement = contactSection.querySelector('a, button, [tabindex="0"]');
              if (firstFocusableElement) {
                firstFocusableElement.focus();
              } else {
                contactSection.focus();
              }
              
              announceAction('Jumped to last section');
            } else if (footer) {
              // Fallback to footer if contact section not found
              footer.scrollIntoView({ behavior: 'smooth' });
              footer.focus();
              announceAction('Jumped to last section');
            }
            break;
          
          // Accessibility Features
          case 'a':
          case 'A':
            if (accessibilityWidgetButton) {
              e.preventDefault();
              accessibilityWidgetButton.click();
              announceAction('Toggled accessibility widget');
            }
            break;
            
          case 'i':
          case 'I':
            e.preventDefault();
            // Open accessibility policy widget
            try {
              const event = new CustomEvent('open-accessibility-policy', {
                detail: { 
                  language: document.documentElement.lang === 'nl' ? 'nl' : 'en',
                  expandPolicy: false // Show summary view initially
                }
              });
              document.dispatchEvent(event);
              announceAction('Accessibility statement opened');
            } catch (err) {
              console.error('Error opening accessibility policy widget:', err);
            }
            break;
            
          case 'f':
          case 'F':
            e.preventDefault();
            toggleFocusMode();
            break;
            
          case 'x':
          case 'X':
            e.preventDefault();
            toggleHighContrast();
            break;
            
          case 'z':
          case 'Z':
            e.preventDefault();
            toggleReduceMotion();
            break;
            
          // Easter eggs (not in shortcuts list)
          case 'c':
          case 'C':
            e.preventDefault();
            // Toggle cookie policy widget
            try {
              const event = new CustomEvent('open-cookie-widget', {
                detail: { language: document.documentElement.lang === 'nl' ? 'nl' : 'en' }
              });
              document.dispatchEvent(event);
              announceAction('Cookie policy toggled');
            } catch (err) {
              console.error('Error toggling cookie policy widget:', err);
            }
            break;
            
          // Right-handed shortcut
          case 'r':
          case 'R':
            e.preventDefault();
            // Set widget position to bottom-right
            globalState.widgetPosition = 'bottom-right';
            
            // Update HTML data attribute immediately for CSS targeting
            document.documentElement.setAttribute('data-widget-position', 'bottom-right');
            
            // Update back-to-top button directly with important styles, in addition to event
            const backToTopBtnRight = document.querySelector('.back-to-top-container');
            if (backToTopBtnRight) {
              backToTopBtnRight.style.setProperty('right', '20px', 'important');
              backToTopBtnRight.style.setProperty('left', 'auto', 'important');
              backToTopBtnRight.classList.remove('left-aligned');
              backToTopBtnRight.classList.add('right-aligned');
              backToTopBtnRight.setAttribute('data-position', 'right');
              // console.log('Back-to-top button directly updated to right position');
            }
            
            // Dispatch an event to update all widgets
            try {
              const event = new CustomEvent('update-widget-position', { 
                detail: { position: 'bottom-right' } 
              });
              document.dispatchEvent(event);
              announceAction('Switched to right-handed mode');
            } catch (err) {
              console.error('Error switching to right-handed mode:', err);
            }
            break;
            
          // Dyslexic-friendly mode shortcut
          case 'd':
          case 'D':
            e.preventDefault();
            // Toggle dyslexic-friendly mode
            try {
              const event = new CustomEvent('toggle-dyslexic-mode');
              document.dispatchEvent(event);
              announceAction('Dyslexic-friendly mode toggled');
            } catch (err) {
              console.error('Error toggling dyslexic-friendly mode:', err);
            }
            break;
            
          case 'p':
          case 'P':
            e.preventDefault();
            // Toggle privacy statement widget
            try {
              const event = new CustomEvent('open-privacy-widget', {
                detail: { language: document.documentElement.lang === 'nl' ? 'nl' : 'en' }
              });
              document.dispatchEvent(event);
              announceAction('Privacy statement toggled');
            } catch (err) {
              console.error('Error toggling privacy statement widget:', err);
            }
            break;
            
          case 't':
          case 'T':
            e.preventDefault();
            // Toggle terms and conditions widget
            try {
              const event = new CustomEvent('open-terms-widget', {
                detail: { language: document.documentElement.lang === 'nl' ? 'nl' : 'en' }
              });
              document.dispatchEvent(event);
              announceAction('Terms and conditions toggled');
            } catch (err) {
              console.error('Error toggling terms widget:', err);
            }
            break;
            
          // Left-handed shortcut
          case 'l':
          case 'L':
            e.preventDefault();
            // Set widget position to bottom-left
            globalState.widgetPosition = 'bottom-left';
            
            // Update HTML data attribute immediately for CSS targeting
            document.documentElement.setAttribute('data-widget-position', 'bottom-left');
            
            // Update back-to-top button directly with important styles, in addition to event
            const backToTopBtnLeft = document.querySelector('.back-to-top-container');
            if (backToTopBtnLeft) {
              backToTopBtnLeft.style.setProperty('left', '20px', 'important');
              backToTopBtnLeft.style.setProperty('right', 'auto', 'important');
              backToTopBtnLeft.classList.remove('right-aligned');
              backToTopBtnLeft.classList.add('left-aligned');
              backToTopBtnLeft.setAttribute('data-position', 'left');
              // console.log('Back-to-top button directly updated to left position');
            }
            
            // Dispatch an event to update all widgets
            try {
              const event = new CustomEvent('update-widget-position', { 
                detail: { position: 'bottom-left' } 
              });
              document.dispatchEvent(event);
              announceAction('Switched to left-handed mode');
            } catch (err) {
              console.error('Error switching to left-handed mode:', err);
            }
            break;
            
          // Utility Shortcuts
          case '0':
            e.preventDefault();
            // Find the "Home" link in the navbar
            const homeLink = document.querySelector('a[href="#top"]');
            if (homeLink) {
              homeLink.click();
              announceAction('Navigated to top section');
            } else {
              // Fallback to scrolling to top
              window.scrollTo({ top: 0, behavior: 'smooth' });
              announceAction('Scrolled to top of page');
            }
            break;
            
            
          case '/':
            e.preventDefault();
            // Dispatch a custom toggle event for keyboard shortcuts
            document.dispatchEvent(new CustomEvent('toggle-keyboard-shortcuts'));
            break;
        }
      }
    };
    
    // Function to initialize keyboard shortcuts
    const initKeyboardShortcuts = () => {
      if (!keyboardShortcutsInitialized) {
        // Add keyboard event listener
        document.addEventListener('keydown', handleKeyboardShortcuts);
        
        keyboardShortcutsInitialized = true;
        // console.log('Keyboard shortcuts initialized');
      }
    };
    
    // Initialize on page load
    if (document.readyState === 'complete') {
      initKeyboardShortcuts();
    } else {
      window.addEventListener('load', initKeyboardShortcuts);
    }
    
    // Expose method to trigger keyboard shortcuts
    nuxtApp.provide('showKeyboardShortcuts', () => {
      // Use the unified function for showing keyboard shortcuts
      showKeyboardShortcuts();
    });
    
    // Captions method removed
  }
});