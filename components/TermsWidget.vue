<!--
 * @author Blaeu Privacy Response Team
 * @copyright Copyright © 2019 - 2026 Team Blaeu. Content is licensed under CC BY 4.0 unless otherwise noted. All Rights Reserved.
 * @license CC BY 4.0
-->
<template>
  <div
    ref="widgetRef"
    :class="[
      'terms-widget',
      { 'terms-widget-open': isOpen, 'policy-expanded': isPolicyExpanded },
      positionClass,
    ]"
  >
    <!-- No toggle button since it will be opened via link only -->

    <!-- Widget panel with controls -->
    <div
      id="terms-controls"
      class="terms-widget-panel"
      :class="{ open: isOpen, expanded: isPolicyExpanded }"
      role="dialog"
      aria-labelledby="terms-widget-title"
    >
      <div class="terms-widget-header">
        <h2 id="terms-widget-title" class="terms-widget-title">
          {{ currentLanguage === 'nl' ? 'Algemene Voorwaarden' : 'General Terms and Conditions' }}
        </h2>
        <button
          class="terms-widget-close"
          aria-label="Close terms and conditions"
          @click="closeWidget"
        >
          <i class="fa-solid fa-xmark" aria-hidden="true"></i>
        </button>
      </div>

      <div class="terms-widget-content">
        <!-- Language selector -->
        <div class="terms-language-selector">
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

        <!-- Table of Contents removed per client request -->

        <!-- Summary Content -->
        <div v-if="!isPolicyExpanded" class="policy-summary">
          <!-- English Summary -->
          <div v-if="currentLanguage === 'en'" class="prose max-w-none text-gray-800">
            <p class="font-medium mb-3">In short:</p>
            <ul class="list-disc pl-6 space-y-1">
              <li>
                Blaeu Privacy Response Team B.V. (hereinafter: Team Blaeu) is a private limited
                company registered at the Dutch Chamber of Commerce under no. 75599740.
              </li>
              <li>Team Blaeu does not charge office costs.</li>
              <li>Team Blaeu bills on a monthly basis with a payment period of 30 days.</li>
              <li>
                Team Blaeu's liability is restricted to the fee already paid (max. EUR 5,000).
                Claims expire after one year.
              </li>
              <li>Team Blaeu does not accept liability for subcontractors.</li>
              <li>Dutch law applies. The court in Rotterdam, the Netherlands is competent.</li>
            </ul>
            <p class="text-gray-500 mt-3">Last Updated: March 1, 2025</p>
          </div>

          <!-- Dutch Summary -->
          <div v-else class="prose max-w-none text-gray-800">
            <p class="font-medium mb-3">In het kort:</p>
            <ul class="list-disc pl-6 space-y-1">
              <li>
                Blaeu Privacy Response Team B.V. (hierna: Team Blaeu) is een besloten vennootschap
                ingeschreven bij de Kamer van Koophandel onder nr. 75599740.
              </li>
              <li>Team Blaeu brengt geen kantoorkosten in rekening.</li>
              <li>Team Blaeu factureert maandelijks met een betalingstermijn van 30 dagen.</li>
              <li>
                De aansprakelijkheid van Team Blaeu is beperkt tot het reeds betaalde honorarium
                (max. EUR 5.000). Vorderingen vervallen na één jaar.
              </li>
              <li>Team Blaeu aanvaardt geen aansprakelijkheid voor onderaannemers.</li>
              <li>
                Nederlands recht is van toepassing. De rechtbank te Rotterdam, Nederland is bevoegd.
              </li>
            </ul>
            <p class="text-gray-500 mt-3">Laatst bijgewerkt: 1 maart 2025</p>
          </div>

          <!-- View Complete Statement Button -->
          <button
            class="view-complete-policy"
            aria-expanded="false"
            aria-controls="full-policy-content"
            @click="expandPolicy"
          >
            {{ currentLanguage === 'nl' ? 'Bekijk volledige voorwaarden' : 'View complete terms' }}
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
                  ? 'Download algemene voorwaarden'
                  : 'Download terms and conditions'
              }}
            </a>
          </div>
        </div>

        <!-- Full Terms and Conditions Content -->
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
                class="text-blue-700 hover:underline flex items-center text-sm"
                @click.prevent="downloadPolicy"
              >
                <i class="fa-solid fa-download mr-2" aria-hidden="true"></i>
                {{
                  currentLanguage === 'nl'
                    ? 'Download algemene voorwaarden'
                    : 'Download terms and conditions'
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
  import { ref, computed, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'
  import { useNuxtApp } from '#app'
  import { globalState } from '~/composables/globalState'
  import type { KeyboardEventHandler, MouseEventHandler } from '~/types/events'
  import { isHTMLElement } from '~/types/events'
  import PolicyContent from '~/components/PolicyContent.vue'
  import { termsPolicy } from '~/data/policies/terms'
  import { policyToText, downloadTextFile } from '~/utils/policyText'

  const isOpen = ref(false)
  const isPolicyExpanded = ref(false)
  // Use a computed property with getter/setter to sync with globalState
  const currentLanguage = computed({
    get: () => globalState.languagePreference,
    set: value => {
      globalState.languagePreference = value
    },
  })
  const policy = computed(() => termsPolicy[currentLanguage.value === 'nl' ? 'nl' : 'en'])

  // Ensure immediate synchronization on component mount
  const forceLanguageSync = (): void => {
    // Force reactivity update by triggering a minimal state change
    const current = globalState.languagePreference
    globalState.languagePreference = current
  }
  const position = ref('bottom-right') // Default position
  let keyboardHandler: KeyboardEventHandler | null = null
  let documentClickHandler: MouseEventHandler | null = null

  const closeAllWidgetsHandler = (event: CustomEvent): void => {
    if (event.detail && event.detail.except !== 'terms') {
      closeWidget()
    }
  }

  const openTermsWidgetHandler = (event: CustomEvent): void => {
    const closeEvent = new CustomEvent('close-all-widgets', {
      detail: { except: 'terms' },
    })
    document.dispatchEvent(closeEvent)

    globalState.activeWidget = 'terms'

    if (event.detail && event.detail.language) {
      currentLanguage.value = event.detail.language
    }

    isOpen.value = true

    if (event.detail && event.detail.expandPolicy) {
      isPolicyExpanded.value = true
    }

    if (event.detail && event.detail.section) {
      isPolicyExpanded.value = true
      nextTick(() => {
        scrollToSection(event.detail.section)
      })
    }

    const { $announce } = useNuxtApp()
    if ($announce) {
      $announce('Terms and conditions opened', 'assertive')
    }
  }
  const widgetRef = ref<HTMLElement | null>(null)

  // Export methods for external use
  defineExpose({
    openWidget: (language?: string) => {
      // If language is provided, use it; otherwise keep existing language from global state
      if (language) {
        currentLanguage.value = language as 'en' | 'nl'
      }
      isOpen.value = true
      // Announce to screen readers
      const { $announce } = useNuxtApp()
      if ($announce) {
        $announce('Terms and conditions opened', 'assertive')
      }
    },
    openFullPolicy: (language?: string) => {
      // If language is provided, use it; otherwise keep existing language from global state
      if (language) {
        currentLanguage.value = language as 'en' | 'nl'
      }
      isOpen.value = true
      isPolicyExpanded.value = true
      // Announce to screen readers
      const { $announce } = useNuxtApp()
      if ($announce) {
        $announce('Complete terms and conditions expanded', 'assertive')
      }
    },
  })

  const positionClass = computed(() => {
    return `terms-widget-${position.value}`
  })

  const closeWidget = (): void => {
    isOpen.value = false
    isPolicyExpanded.value = false

    // Clear active widget in global state if this was the active one
    if (globalState.activeWidget === 'terms') {
      globalState.activeWidget = null
    }
  }

  const expandPolicy = (): void => {
    isPolicyExpanded.value = true

    // Announce to screen readers
    const { $announce } = useNuxtApp()
    if ($announce) {
      $announce('Complete terms and conditions expanded', 'polite')
    }
  }

  const collapsePolicy = (): void => {
    isPolicyExpanded.value = false

    // Announce to screen readers
    const { $announce } = useNuxtApp()
    if ($announce) {
      $announce('Returned to terms and conditions summary', 'polite')
    }
  }

  const scrollToSection = (sectionId: string): void => {
    // Find the section element
    const sectionElement = document.getElementById(sectionId)
    if (sectionElement) {
      // Scroll to the section with smooth behavior
      sectionElement.scrollIntoView({ behavior: 'smooth' })

      // Add focus to the section for better accessibility
      nextTick(() => {
        sectionElement.setAttribute('tabindex', '-1')
        sectionElement.focus({ preventScroll: true })

        // Announce to screen readers
        const { $announce } = useNuxtApp()
        if ($announce) {
          const sectionName = sectionElement.textContent
          $announce(`Navigated to section: ${sectionName}`, 'polite')
        }
      })
    }
  }

  const downloadPolicy = (): void => {
    const isNL = currentLanguage.value === 'nl'
    downloadTextFile(
      policyToText(policy.value, isNL ? 'Laatst bijgewerkt' : 'Last updated'),
      isNL ? 'algemene-voorwaarden-blaeu.txt' : 'terms-and-conditions-blaeu.txt'
    )

    const { $announce } = useNuxtApp()
    if ($announce) {
      $announce(
        isNL
          ? 'Algemene voorwaarden worden gedownload'
          : 'Terms and conditions are being downloaded',
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

    // Set up keyboard handler for key interactions
    keyboardHandler = (e: KeyboardEvent): void => {
      // Handle Escape key to close/collapse
      if (e.key === 'Escape') {
        if (isPolicyExpanded.value) {
          // If policy is expanded, collapse it first
          collapsePolicy()
        } else if (isOpen.value) {
          // Otherwise if widget is open, close it
          closeWidget()
        }
      }

      // Alt+T easter egg removed
    }
    if (keyboardHandler) {
      document.addEventListener('keydown', keyboardHandler)
    }

    // Set up click outside handler
    documentClickHandler = (e: MouseEvent): void => {
      const target = e.target
      if (
        isOpen.value &&
        widgetRef.value &&
        target instanceof Element &&
        isHTMLElement(widgetRef.value) &&
        !widgetRef.value.contains(target)
      ) {
        closeWidget()
      }
    }
    if (documentClickHandler) {
      document.addEventListener('mousedown', documentClickHandler)
    }

    document.addEventListener('close-all-widgets', closeAllWidgetsHandler)
    document.addEventListener('open-terms-widget', openTermsWidgetHandler)
  })

  onBeforeUnmount(() => {
    if (keyboardHandler) {
      document.removeEventListener('keydown', keyboardHandler)
    }
    if (documentClickHandler) {
      document.removeEventListener('mousedown', documentClickHandler)
    }
    document.removeEventListener('close-all-widgets', closeAllWidgetsHandler)
    document.removeEventListener('open-terms-widget', openTermsWidgetHandler)
  })
</script>

<style scoped>
  .terms-widget-panel {
    z-index: 5300;
  }

  .terms-widget {
    position: fixed;
    z-index: 53 !important; /* Higher than cookie widget (52) and accessibility widget (51) - important to override any other styles */
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

  /* Position widget at same level as accessibility widget to align panels */
  .terms-widget-bottom-left {
    bottom: 20px !important; /* Same as accessibility widget (var(--widget-spacing)) */
    left: 20px !important;
  }

  .terms-widget-bottom-right {
    bottom: 20px !important; /* Same as accessibility widget (var(--widget-spacing)) */
    right: 20px !important;
  }

  /* Widget panel */
  .terms-widget-panel {
    position: absolute;
    width: 320px;
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
    z-index: 3000; /* Ensure it's higher than other widget buttons (52-53) and their panels (2000) */
  }

  .terms-widget-panel.open {
    display: flex;
  }

  /* Expanded panel for full policy */
  .terms-widget-panel.expanded {
    width: min(90vw, 650px);
    height: max-content;
    max-height: 85vh; /* Slightly increased max-height for better content visibility */
    overflow-y: auto;
  }

  /* Full screen in mobile mode */
  @media (max-width: 640px) {
    .terms-widget-panel.expanded {
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

    /* Adjust terms statement content for mobile */
    .terms-widget-panel.expanded .terms-widget-header {
      position: sticky !important;
      top: 0 !important;
      background: white !important;
      padding: 1rem !important;
      z-index: 10 !important;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1) !important;
      width: 100% !important;
    }

    .terms-widget-panel.expanded .terms-widget-content {
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
  .terms-widget-top-left .terms-widget-panel {
    top: 60px;
    left: 0;
  }

  .terms-widget-top-right .terms-widget-panel {
    top: 60px;
    right: 0;
  }

  .terms-widget-bottom-left .terms-widget-panel {
    bottom: 60px; /* Adjusted position as requested */
    left: 0;
  }

  .terms-widget-bottom-right .terms-widget-panel {
    bottom: 60px; /* Adjusted position as requested */
    right: 0;
  }

  /* Panel header */
  .terms-widget-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #eaeaea;
    padding-bottom: 12px;
    margin-bottom: 4px;
  }

  .terms-widget-title {
    font-size: 16px;
    font-weight: 600;
    color: #333;
    margin: 0;
  }

  .terms-widget-close {
    background: transparent;
    border: none;
    color: #777;
    cursor: pointer;
    padding: 4px;
    border-radius: 4px;
  }

  .terms-widget-close:hover {
    color: #333;
    background-color: #f5f5f5;
  }

  .terms-widget-close:focus-visible {
    outline: 2px solid #00a8e6;
    outline-offset: 2px;
  }

  /* Widget content */
  .terms-widget-content {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  /* Language selector */
  .terms-language-selector {
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

  /* Table of Contents */
  .toc-container {
    padding: 10px;
    background-color: #f8f9fa;
    border-radius: 8px;
    margin-bottom: 16px;
  }

  .toc-list {
    margin-top: 8px;
    padding-left: 16px;
    list-style-type: none;
  }

  .toc-list li {
    margin-bottom: 6px;
  }

  .toc-list a {
    color: #00a8e6;
    text-decoration: none;
    display: inline-block;
    padding: 4px 0;
    transition: color 0.2s;
  }

  .toc-list a:hover {
    color: #0095cc;
    text-decoration: underline;
  }

  .toc-list a:focus-visible {
    outline: 2px solid #00a8e6;
    outline-offset: 2px;
    border-radius: 4px;
  }

  /* Full policy view */
  .full-policy {
    max-height: calc(70vh - 160px);
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

    .toc-container {
      padding: 10px;
      margin-bottom: 16px;
    }

    .toc-list li {
      margin-bottom: 8px;
    }

    .toc-list a {
      padding: 6px 0;
      font-size: 15px;
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
    .terms-widget-panel {
      transition: none;
    }
  }

  /* Ensure bullets are always visible */
  .policy-summary ul,
  .full-policy ul {
    list-style-type: disc !important;
    padding-left: 1.5rem !important;
  }

  .policy-summary ul li,
  .full-policy ul li {
    display: list-item !important;
    list-style-type: disc !important;
    margin-left: 0 !important;
  }

  /* Handle high contrast mode */
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
  .terms-widget-open .terms-widget-panel {
    max-width: calc(100vw - 40px);
  }
</style>
