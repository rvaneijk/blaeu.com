/**
 * @module composables/globalState
 * @description Centralized state management for the application, focused on accessibility settings.
 * Provides reactive state that persists user preferences across page navigation and sessions.
 * This is the source of truth for all accessibility-related settings.
 * @author Blaeu Privacy Response Team
 * @version 1.0.0
 */
import { reactive, watchEffect } from 'vue';

/**
 * @typedef {Object} GlobalState
 * @description Defines the structure of the global state object with comprehensive accessibility settings
 * @property {number} currentTab - Current active tab index
 * @property {boolean} reduceMotion - Whether animations should be reduced and videos paused
 * @property {boolean} highContrast - Whether high contrast mode is enabled for better visibility
 * @property {boolean} focusMode - Whether focus indicators should be enhanced for keyboard users
 * @property {boolean} videoCaptions - Whether video captions should be displayed
 * @property {string} fontFamily - Font family preference ('default' or 'dyslexic')
 * @property {number} fontSizeLevel - Font size adjustment (-2 to 3, 0 is default)
 * @property {string} widgetPosition - Position for floating widgets ('bottom-left' or 'bottom-right')
 * @property {string} languagePreference - Language for all widgets and content ('nl' or 'en')
 * @property {string|null} activeWidget - Currently active widget (for auto-closing)
 * @see {@link components/AccessibilityWidget.vue} Main component using these settings
 */

/**
 * @constant {GlobalState} initialState
 * @description Default state with accessibility and language preferences
 * This defines the baseline values that are used when no saved preferences exist
 */
let initialState = {
  currentTab: 5,
  // Accessibility settings
  reduceMotion: false,
  highContrast: false,
  focusMode: false,
  videoCaptions: false,
  // Additional accessibility settings
  fontFamily: 'default',   // Possible values: 'default', 'dyslexic'
  fontSizeLevel: 0,        // Ranges from -2 to 3 (0 is default)
  widgetPosition: 'bottom-right', // Possible values: 'bottom-left', 'bottom-right'
  // Language preference for all widgets and content
  languagePreference: 'en', // Default language ('nl' or 'en') - will be updated with browser language on client
  // Active widget tracking (for auto-closing other widgets)
  activeWidget: null, // Can be 'privacy', 'cookie', 'terms', 'disclosure', 'accessibility', etc.
};

// Try to load accessibility settings from localStorage
if (process.client && localStorage) {
  try {
    // First try to get state from the primary storage key
    const savedState = localStorage.getItem('accessibility-state');
    
    // If primary storage not found, check the legacy key as fallback
    // @deprecated 'accessibility-preferences' is deprecated, use 'accessibility-state' instead
    const legacyPrefs = !savedState ? localStorage.getItem('accessibility-preferences') : null;
    
    if (savedState) {
      const parsedState = JSON.parse(savedState);
      
      // Check for the separate keyboard-shortcuts-language key and migrate it
      let languagePreference = parsedState.languagePreference || parsedState.keyboardShortcutsLanguage || 'nl';
      
      // If not in parsedState, check for the separate localStorage key
      if (!parsedState.languagePreference && !parsedState.keyboardShortcutsLanguage) {
        try {
          // First try to get from separate localStorage key
          const separateLanguagePref = localStorage.getItem('keyboard-shortcuts-language');
          if (separateLanguagePref && ['nl', 'en'].includes(separateLanguagePref)) {
            languagePreference = separateLanguagePref;
            // console.info('Migrating keyboard-shortcuts-language to accessibility-state');
          } 
          // Then try to use browser language if available
          else if (process.client && navigator && navigator.language) {
            const browserLang = navigator.language.toLowerCase();
            if (browserLang.startsWith('nl')) {
              languagePreference = 'nl';
            } else {
              languagePreference = 'en';
            }
          }
        } catch (e) {
          console.error('Error checking for language preferences:', e);
        }
      }
      
      initialState = {
        ...initialState,
        reduceMotion: parsedState.reduceMotion || false,
        highContrast: parsedState.highContrast || false,
        focusMode: parsedState.focusMode || false,
        // Add additional settings with defaults if not present
        fontFamily: parsedState.fontFamily || 'default',
        fontSizeLevel: parsedState.fontSizeLevel !== undefined ? parsedState.fontSizeLevel : 0,
        widgetPosition: parsedState.widgetPosition || 'bottom-right',
        languagePreference: languagePreference
      };
      
      // Initialize HTML data attribute for widget position immediately
      const widgetPosition = parsedState.widgetPosition || 'bottom-right';
      document.documentElement.setAttribute('data-widget-position', widgetPosition);
    } else if (legacyPrefs) {
      // Migrate from legacy preferences format
      // @deprecated This migration path will be removed in a future version
      // console.info('Migrating from deprecated accessibility-preferences to accessibility-state');
      const prefs = JSON.parse(legacyPrefs);
      
      initialState = {
        ...initialState,
        reduceMotion: false, // Default reduceMotion, not using legacy value
        highContrast: false, // Default contrast, not using legacy value
        focusMode: false, // Default value, not using legacy value
        fontFamily: 'default', // Default font, not using legacy value
        fontSizeLevel: 0, // Default font size, not using legacy value
        widgetPosition: 'bottom-right' // Default position, not using legacy value
      };
      
      // Set default widget position
      const widgetPosition = 'bottom-right'; // Using default, not from legacy
      document.documentElement.setAttribute('data-widget-position', widgetPosition);
      
      // Check for the separate keyboard-shortcuts-language key
      let languagePreference = 'en'; // Default to English
      try {
        const separateLanguagePref = localStorage.getItem('keyboard-shortcuts-language');
        if (separateLanguagePref && ['nl', 'en'].includes(separateLanguagePref)) {
          languagePreference = separateLanguagePref;
          // console.info('Including keyboard-shortcuts-language in migration');
        } else if (process.client && navigator && navigator.language) {
          // Use browser language as fallback
          const browserLang = navigator.language.toLowerCase();
          if (browserLang.startsWith('nl')) {
            languagePreference = 'nl';
          }
        }
      } catch (e) {
        console.error('Error checking for language preferences during migration:', e);
      }
      
      // Immediately update the new storage format to migrate the user
      localStorage.setItem('accessibility-state', JSON.stringify({
        reduceMotion: initialState.reduceMotion,
        highContrast: initialState.highContrast,
        focusMode: initialState.focusMode,
        fontFamily: initialState.fontFamily,
        fontSizeLevel: initialState.fontSizeLevel,
        widgetPosition: initialState.widgetPosition,
        languagePreference: languagePreference
      }));
    } else {
      // If no saved state, set default widget position as data attribute
      document.documentElement.setAttribute('data-widget-position', 'bottom-right');
      
      // Set language preference based on browser language
      if (process.client && navigator && navigator.language) {
        const browserLang = navigator.language.toLowerCase();
        if (browserLang.startsWith('nl')) {
          initialState.languagePreference = 'nl';
        } else {
          initialState.languagePreference = 'en';
        }
      }
    }
  } catch (e) {
    console.error('Error loading accessibility state:', e);
    // Set default widget position as data attribute in case of error
    document.documentElement.setAttribute('data-widget-position', 'bottom-right');
  }
}

/**
 * Create a reactive global state object that can be imported across components
 * @constant {GlobalState} globalState
 * @description Reactive state object that components can import and use
 * Changes to this object will trigger component updates and be persisted
 * @example
 * // In a component:
 * import { globalState } from '~/composables/globalState';
 * 
 * // Read a value
 * const useHighContrast = computed(() => globalState.highContrast);
 * 
 * // Update a value
 * function toggleContrast() {
 *   globalState.highContrast = !globalState.highContrast;
 * }
 */
export const globalState = reactive(initialState);

/**
 * @function setupLocalStoragePersistence
 * @description Sets up automatic persistence to localStorage whenever state changes
 * Only persists accessibility-related settings, not temporary UI state
 * Updates DOM attributes for direct CSS targeting based on settings
 * @private
 */
if (process.client) {
  watchEffect(() => {
    const stateToSave = {
      // Accessibility settings
      reduceMotion: globalState.reduceMotion,
      highContrast: globalState.highContrast,
      focusMode: globalState.focusMode,
      videoCaptions: globalState.videoCaptions,
      // Additional settings
      fontFamily: globalState.fontFamily,
      fontSizeLevel: globalState.fontSizeLevel,
      widgetPosition: globalState.widgetPosition,
      // Language setting
      languagePreference: globalState.languagePreference
    };
    localStorage.setItem('accessibility-state', JSON.stringify(stateToSave));
    
    // Also set a data attribute on the HTML element for CSS targeting
    if (globalState.widgetPosition) {
      document.documentElement.setAttribute('data-widget-position', globalState.widgetPosition);
    }
  });

  // Add a special force update mechanism for language synchronization
  globalState.forceLanguageUpdate = () => {
    // Trigger a micro-update to force all computed properties to re-evaluate
    const current = globalState.languagePreference;
    globalState.languagePreference = '';
    // Use nextTick to ensure the empty state is processed
    import('vue').then(({ nextTick }) => {
      nextTick(() => {
        globalState.languagePreference = current;
      });
    });
  };
}