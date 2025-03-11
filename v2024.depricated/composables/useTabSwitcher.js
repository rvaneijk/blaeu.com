// useTabSwitcher.js
import { ref, computed } from 'vue';

/**
 * A composable function to handle tab switching logic.
 * 
 * @param {Array} tabs - An array of tab labels.
 * @param {Array} components - An array of corresponding Vue components for each tab.
 * @returns An object containing reactive properties and methods for tab switching.
 */
export function useTabSwitcher(tabs, components) {
  // Reactive reference for the currently active tab index, default is 0 (first tab).
  const currentTab = ref(0);

  /**
   * Method to change the current active tab.
   * 
   * @param {number} index - The index of the tab to be activated.
   */
  const changeTab = (index) => {
    currentTab.value = index;  // Updates the current tab index.
    // Additional logic can be added here if necessary.
  };

  /**
   * Computes CSS classes for a tab based on whether it is active or not.
   * 
   * @param {number} index - The index of the tab.
   * @returns An object with CSS classes to be bound to the tab.
   */
  const tabClasses = (index) => ({
    'block p-4 rounded-lg': true,  // Common classes for all tabs.
    'active': currentTab.value === index  // 'active' class if the tab is the current tab.
  });

  // A computed property to determine the current component to be displayed based on the active tab.
  const currentComponent = computed(() => components[currentTab.value]);

  // Returning the reactive properties and methods.
  return {
    currentTab,
    currentComponent,
    changeTab,
    tabClasses
  };
}
