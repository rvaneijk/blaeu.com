<!--
 * @author Blaeu Privacy Response Team
 * @copyright Copyright © 2019 - 2026 Team Blaeu. Content is licensed under CC BY 4.0 unless otherwise noted. All Rights Reserved.
 * @license CC BY 4.0
-->
<template>
  <div
    ref="widgetRef"
    :class="[
      'accessibility-policy-widget',
      { 'accessibility-policy-widget-open': isOpen, 'policy-expanded': isPolicyExpanded },
      positionClass,
    ]"
  >
    <!-- No toggle button - will be controlled only through links -->

    <!-- Widget panel with controls -->
    <div
      id="accessibility-policy-controls"
      class="accessibility-policy-widget-panel"
      :class="{ open: isOpen, expanded: isPolicyExpanded }"
      role="dialog"
      aria-labelledby="accessibility-policy-widget-title"
    >
      <div class="accessibility-policy-widget-header">
        <h2 id="accessibility-policy-widget-title" class="accessibility-policy-widget-title">
          {{ currentLanguage === 'nl' ? 'Toegankelijkheidsverklaring' : 'Accessibility Statement' }}
        </h2>
        <button
          class="accessibility-policy-widget-close"
          aria-label="Close accessibility policy menu"
          @click="closeWidget"
        >
          <i class="fa-solid fa-xmark" aria-hidden="true"></i>
        </button>
      </div>

      <div class="accessibility-policy-widget-content">
        <!-- Language selector -->
        <div class="accessibility-policy-language-selector">
          <div class="inline-flex rounded-md shadow-sm" role="group" aria-label="Select language">
            <button
              :class="['language-button', currentLanguage === 'nl' ? 'active' : '']"
              :aria-pressed="currentLanguage === 'nl'"
              aria-label="Nederlands"
              @click="currentLanguage = 'nl'"
            >
              <span>NL</span>
            </button>
            <button
              :class="['language-button', currentLanguage === 'en' ? 'active' : '']"
              :aria-pressed="currentLanguage === 'en'"
              aria-label="English"
              @click="currentLanguage = 'en'"
            >
              <span>EN</span>
            </button>
          </div>
        </div>

        <!-- Summary Content -->
        <div v-if="!isPolicyExpanded" class="policy-summary">
          <!-- English Summary -->
          <div v-if="currentLanguage === 'en'" class="prose max-w-none text-gray-800">
            <p>
              We are committed to ensuring digital accessibility for people with disabilities. We
              continually improve the user experience for everyone and apply relevant accessibility
              standards.
            </p>
            <p class="text-gray-500 mt-2">Last Updated: April 12, 2025</p>
          </div>

          <!-- Dutch Summary -->
          <div v-else class="prose max-w-none text-gray-800">
            <p>
              Wij streven ernaar om digitale toegankelijkheid te waarborgen voor mensen met een
              beperking. We verbeteren voortdurend de gebruikerservaring voor iedereen en passen de
              relevante toegankelijkheidsnormen toe.
            </p>
            <p class="text-gray-500 mt-2">Laatst bijgewerkt: 12 april 2025</p>
          </div>

          <!-- View Complete Policy Button -->
          <button
            class="view-complete-policy"
            aria-expanded="false"
            aria-controls="full-policy-content"
            @click="expandPolicy"
          >
            {{
              currentLanguage === 'nl' ? 'Bekijk volledige verklaring' : 'View complete statement'
            }}
            <i class="fa-solid fa-chevron-right ml-1" aria-hidden="true"></i>
          </button>

          <!-- Download link in summary view -->
          <div class="download-link-summary">
            <a
              href="#"
              class="text-blue-700 hover:underline flex items-center justify-center text-sm"
              @click.prevent="downloadPolicy"
            >
              <i class="fa-solid fa-download mr-2" aria-hidden="true"></i>
              {{
                currentLanguage === 'nl'
                  ? 'Download toegankelijkheidsverklaring'
                  : 'Download accessibility statement'
              }}
            </a>
          </div>
        </div>

        <!-- Full Policy Content -->
        <div v-else id="full-policy-content" class="full-policy">
          <button class="back-to-summary" aria-label="Back to summary" @click="collapsePolicy">
            <i class="fa-solid fa-chevron-left mr-2" aria-hidden="true"></i>
            {{ currentLanguage === 'nl' ? 'Terug naar samenvatting' : 'Back to summary' }}
          </button>

          <div class="prose max-w-none text-gray-800">
            <p class="text-gray-500">
              {{ currentLanguage === 'nl' ? 'Laatst bijgewerkt' : 'Last updated' }}:
              {{ policy.updated }}
            </p>
            <PolicyContent :policy="policy" :heading-level="3" />
            <div class="download-link mt-6">
              <a
                href="#"
                class="text-blue-700 hover:underline flex items-center"
                @click.prevent="downloadPolicy"
              >
                <i class="fa-solid fa-download mr-2" aria-hidden="true"></i>
                {{
                  currentLanguage === 'nl'
                    ? 'Download toegankelijkheidsverklaring'
                    : 'Download accessibility statement'
                }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
  import { useNuxtApp } from '#app'
  import { globalState } from '~/composables/globalState'
  import PolicyContent from '~/components/PolicyContent.vue'
  import { accessibilityPolicy } from '~/data/policies/accessibility'
  import { policyToText, downloadTextFile } from '~/utils/policyText'
  import type { KeyboardEventHandler, MouseEventHandler } from '~/types/events'

  const isOpen = ref(false)
  const isPolicyExpanded = ref(false)
  // Use a computed property with getter/setter to sync with globalState
  const currentLanguage = computed({
    get: () => globalState.languagePreference,
    set: value => {
      globalState.languagePreference = value
    },
  })
  const policy = computed(() => accessibilityPolicy[currentLanguage.value === 'nl' ? 'nl' : 'en'])

  // Ensure immediate synchronization on component mount
  const forceLanguageSync = (): void => {
    // Force reactivity update by triggering a minimal state change
    const current = globalState.languagePreference
    globalState.languagePreference = current
  }
  const position = ref('bottom-right') // Default position
  let keyboardHandler: KeyboardEventHandler | null = null
  let documentClickHandler: MouseEventHandler | null = null

  const openAccessibilityPolicyHandler = (event: CustomEvent): void => {
    if (event.detail && event.detail.language) {
      currentLanguage.value = event.detail.language
    }

    isOpen.value = true

    if (event.detail && event.detail.expandPolicy) {
      isPolicyExpanded.value = true
    }

    if (globalState.widgetPosition) {
      position.value = globalState.widgetPosition
    }

    const { $announce } = useNuxtApp()
    if ($announce) {
      $announce('Accessibility statement opened', 'assertive')
    }
  }
  const widgetRef = ref<HTMLElement | null>(null)

  // Export methods for external use
  defineExpose({
    openWidget: (language?: 'en' | 'nl') => {
      if (language) {
        currentLanguage.value = language
      }
      // Remove hard-coded fallback - let globalState handle defaults
      isOpen.value = true

      // Update position from global state
      if (globalState.widgetPosition) {
        position.value = globalState.widgetPosition
      }

      // Announce to screen readers
      const { $announce } = useNuxtApp()
      if ($announce) {
        $announce('Accessibility statement opened', 'assertive')
      }
    },
    openFullPolicy: (language?: 'en' | 'nl') => {
      if (language) {
        currentLanguage.value = language
      }
      // Remove hard-coded fallback - let globalState handle defaults
      isOpen.value = true
      isPolicyExpanded.value = true

      // Update position from global state
      if (globalState.widgetPosition) {
        position.value = globalState.widgetPosition
      }

      // Announce to screen readers
      const { $announce } = useNuxtApp()
      if ($announce) {
        $announce('Complete accessibility statement expanded', 'assertive')
      }
    },
  })

  const positionClass = computed(() => {
    return `accessibility-policy-widget-${position.value}`
  })

  // No toggle function needed as widget is only controlled via links

  const closeWidget = (): void => {
    isOpen.value = false
    isPolicyExpanded.value = false
  }

  const expandPolicy = (): void => {
    isPolicyExpanded.value = true

    // Announce to screen readers
    const { $announce } = useNuxtApp()
    if ($announce) {
      $announce('Complete accessibility statement expanded', 'polite')
    }
  }

  const collapsePolicy = (): void => {
    isPolicyExpanded.value = false

    // Announce to screen readers
    const { $announce } = useNuxtApp()
    if ($announce) {
      $announce('Returned to accessibility statement summary', 'polite')
    }
  }

  /**
   * Generate Dutch accessibility statement content
   */
  const downloadPolicy = (): void => {
    const isNL = currentLanguage.value === 'nl'
    downloadTextFile(
      policyToText(policy.value, isNL ? 'Laatst bijgewerkt' : 'Last updated'),
      isNL ? 'toegankelijkheidsverklaring-blaeu.txt' : 'accessibility-statement-blaeu.txt'
    )

    const { $announce } = useNuxtApp()
    if ($announce) {
      $announce(
        isNL
          ? 'Toegankelijkheidsverklaring wordt gedownload'
          : 'Accessibility statement is being downloaded',
        'polite'
      )
    }
  }

  // Watch global state for position
  watch(
    () => globalState.widgetPosition,
    newValue => {
      if (position.value !== newValue) {
        position.value = newValue
      }
    }
  )

  // Watch for language changes in globalState
  watch(
    () => globalState.languagePreference,
    newValue => {
      if (currentLanguage.value !== newValue) {
        currentLanguage.value = newValue
      }
    }
  )

  onMounted(() => {
    // Force immediate language synchronization to prevent selector/content desync
    forceLanguageSync()

    // Get position from global state if available
    if (globalState.widgetPosition) {
      position.value = globalState.widgetPosition
    }

    // Set up position watcher to update CSS class
    watch(
      () => position.value,
      newPosition => {
        // Update the data attribute for any specific CSS targeting
        if (import.meta.client && document) {
          document.documentElement.setAttribute('data-accessibility-widget-position', newPosition)
        }
      },
      { immediate: true }
    )

    // Set up keyboard handler for Escape key to close widget or collapse policy
    keyboardHandler = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        if (isPolicyExpanded.value) {
          // If policy is expanded, collapse it first
          collapsePolicy()
        } else if (isOpen.value) {
          // Otherwise if widget is open, close it
          closeWidget()
        }
      }
    }
    document.addEventListener('keydown', keyboardHandler)

    // Set up click outside handler
    documentClickHandler = (e: Event): void => {
      if (
        isOpen.value &&
        widgetRef.value &&
        e.target instanceof Node &&
        !widgetRef.value.contains(e.target)
      ) {
        closeWidget()
      }
    }
    document.addEventListener('mousedown', documentClickHandler)

    document.addEventListener('open-accessibility-policy', openAccessibilityPolicyHandler)
  })

  onBeforeUnmount(() => {
    if (keyboardHandler) {
      document.removeEventListener('keydown', keyboardHandler)
    }
    if (documentClickHandler) {
      document.removeEventListener('mousedown', documentClickHandler)
    }
    document.removeEventListener('open-accessibility-policy', openAccessibilityPolicyHandler)
  })
</script>

<style scoped>
  .accessibility-policy-widget-panel {
    z-index: 5100;
  }

  .accessibility-policy-widget {
    position: fixed;
    z-index: 53; /* For the button itself - higher position between other widgets */
    font-family:
      system-ui,
      -apple-system,
      BlinkMacSystemFont,
      'Segoe UI',
      Roboto,
      Oxygen,
      Ubuntu,
      Cantarell,
      'Open Sans',
      'Helvetica Neue',
      sans-serif;
  }

  /* Position classes - only needed for left/right positioning since bottom is fixed */
  .accessibility-policy-widget-top-left,
  .accessibility-policy-widget-bottom-left {
    left: 20px;
  }

  .accessibility-policy-widget-top-right,
  .accessibility-policy-widget-bottom-right {
    right: 20px;
  }

  /* Bottom positioning is now handled in the main panel style */

  /* No toggle button styles needed */

  /* Widget panel */
  .accessibility-policy-widget-panel {
    position: fixed; /* Keep fixed for consistent positioning */
    width: 280px;
    background-color: white;
    border-radius: 12px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
    padding: 16px;
    display: none;
    flex-direction: column;
    gap: 16px;
    max-height: calc(100vh - 100px);
    overflow-y: auto;
    transition:
      width 0.3s ease,
      height 0.3s ease;
    z-index: 5100; /* Increased z-index to ensure it appears above all other elements */
    bottom: 80px !important; /* Fine-tuned position - moved 20px higher than standard widgets */
    /* Position is determined by position classes (.accessibility-policy-widget-top-left, etc.) */
  }

  .accessibility-policy-widget-panel.open {
    display: flex;
  }

  /* Expanded panel for full policy */
  .accessibility-policy-widget-panel.expanded {
    width: min(90vw, 500px);
    max-height: 80vh;
    overflow-y: auto;
  }

  /* Full screen in mobile mode */
  @media (max-width: 640px) {
    .accessibility-policy-widget-panel.expanded {
      position: fixed !important;
      width: 100vw !important;
      height: 100vh !important;
      max-height: 100vh !important;
      max-width: 100vw !important;
      top: 0 !important;
      left: 0 !important;
      right: 0 !important;
      bottom: 0 !important;
      border-radius: 0 !important;
      z-index: 9999 !important;
      margin: 0 !important;
      padding: 0 !important;
      transform: none !important;
      overflow: auto !important;
      inset: 0 !important;
    }

    /* Adjust accessibility policy content for mobile */
    .accessibility-policy-widget-panel.expanded .accessibility-policy-widget-header {
      position: sticky !important;
      top: 0 !important;
      background: white !important;
      padding: 1rem !important;
      z-index: 10 !important;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1) !important;
      width: 100% !important;
    }

    .accessibility-policy-widget-panel.expanded .accessibility-policy-widget-content {
      height: calc(100vh - 60px) !important;
      max-height: none !important;
      overflow-y: auto !important;
      padding: 1rem !important;
      padding-bottom: 5rem !important;
      padding-top: 0.5rem !important;
      width: 100% !important;
    }
  }

  /* Panel positioning */
  .accessibility-policy-widget-bottom-left .accessibility-policy-widget-panel {
    left: 20px;
  }

  .accessibility-policy-widget-bottom-right .accessibility-policy-widget-panel {
    right: 20px;
  }

  /* Panel header */
  .accessibility-policy-widget-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #eaeaea;
    padding-bottom: 12px;
    margin-bottom: 4px;
  }

  .accessibility-policy-widget-title {
    font-size: 16px;
    font-weight: 600;
    color: #333;
    margin: 0;
  }

  .accessibility-policy-widget-close {
    background: transparent;
    border: none;
    color: #777;
    cursor: pointer;
    padding: 4px;
    border-radius: 4px;
  }

  .accessibility-policy-widget-close:hover {
    color: #333;
    background-color: #f5f5f5;
  }

  .accessibility-policy-widget-close:focus-visible {
    outline: 2px solid #00a8e6;
    outline-offset: 2px;
  }

  /* Widget content */
  .accessibility-policy-widget-content {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  /* Language selector */
  .accessibility-policy-language-selector {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 8px;
  }

  .language-button {
    padding: 4px 8px;
    font-size: 12px;
    background-color: #f5f5f5;
    border: 1px solid #ddd;
    color: #555;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .language-button:first-child {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }

  .language-button:last-child {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }

  .language-button.active {
    background-color: #00a8e6;
    color: white;
    border-color: #00a8e6;
  }

  .language-button:hover:not(.active) {
    background-color: #e5e5e5;
  }

  .language-button:focus-visible {
    outline: 2px solid #00a8e6;
    outline-offset: 2px;
    position: relative;
    z-index: 1;
  }

  /* Policy content */
  .policy-summary {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .view-complete-policy {
    margin-top: 8px;
    padding: 8px;
    font-size: 14px;
    color: #00a8e6;
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.2s;
    width: 100%;
    border-radius: 4px;
  }

  /* Download link in summary view */
  .download-link-summary {
    margin-top: 4px;
    text-align: center;
    padding: 4px;
    border-top: 1px solid #f0f0f0;
  }

  .download-link-summary a {
    font-size: 13px;
    color: #00a8e6;
    padding: 6px;
    display: inline-flex;
    align-items: center;
    border-radius: 4px;
    transition: background-color 0.2s;
  }

  .download-link-summary a:hover {
    background-color: #f5f5f5;
  }

  .view-complete-policy:hover {
    color: #0095cc;
    background-color: #f5f5f5;
  }

  .view-complete-policy:focus-visible {
    outline: 2px solid #00a8e6;
    outline-offset: 2px;
  }

  /* Full policy view */
  .full-policy {
    max-height: calc(70vh - 120px);
    overflow-y: auto;
    padding-right: 8px;
  }

  @media (max-width: 640px) {
    .full-policy {
      max-height: calc(100vh - 12rem); /* Account for header, nav, etc. */
      padding-right: 0;
      padding-bottom: 4rem; /* Extra padding at bottom for scrolling */
    }

    /* Improve readability on mobile */
    .full-policy p {
      margin-bottom: 1rem;
      font-size: 15px;
      line-height: 1.5;
    }

    .full-policy h3 {
      margin-top: 1.5rem;
      margin-bottom: 1rem;
      font-size: 17px;
    }

    .full-policy ul,
    .full-policy ol {
      margin-bottom: 1rem;
      padding-left: 1.5rem;
      font-size: 15px;
    }

    .full-policy .back-to-summary {
      padding: 12px 8px;
      margin-bottom: 1.5rem;
      font-size: 16px;
    }
  }

  .back-to-summary {
    margin-bottom: 16px;
    padding: 8px;
    font-size: 14px;
    color: #00a8e6;
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    transition: color 0.2s;
    border-radius: 4px;
  }

  .back-to-summary:hover {
    color: #0095cc;
    background-color: #f5f5f5;
  }

  .back-to-summary:focus-visible {
    outline: 2px solid #00a8e6;
    outline-offset: 2px;
  }

  /* Download link */
  .download-link a {
    display: inline-flex;
    align-items: center;
    font-size: 14px;
    color: #00a8e6;
    text-decoration: none;
  }

  .download-link a:hover {
    text-decoration: underline;
  }

  .download-link a:focus-visible {
    outline: 2px solid #00a8e6;
    outline-offset: 2px;
  }

  /* Handle reduced motion preference */
  @media (prefers-reduced-motion: reduce) {
    .accessibility-policy-widget-panel {
      transition: none;
    }
  }

  /* No toggle button high contrast mode needed */

  :global(.high-contrast-mode) .language-button.active {
    background-color: #000;
    color: #fff;
    border: 1px solid #fff;
  }

  :global(.high-contrast-mode) .language-button:not(.active) {
    background-color: #fff;
    color: #000;
    border: 1px solid #000;
  }

  /* When widget is open, adjust position to ensure it doesn't go off-screen */
  .accessibility-policy-widget-open .accessibility-policy-widget-panel {
    max-width: calc(100vw - 40px);
  }
  /* Custom bullet styling */
  .custom-bullet-list {
    list-style: none;
    padding-left: 0;
    position: relative;
  }

  .custom-bullet-list li {
    padding-left: 1.2em;
    position: relative;
    text-indent: 0;
    margin-left: 0;
  }

  .custom-bullet-list li::before {
    content: '•';
    position: absolute;
    left: 1px; /* Aligns with the first letter of heading */
    color: #000;
    font-weight: bold;
  }
</style>
