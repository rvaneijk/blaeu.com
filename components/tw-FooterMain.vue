<!--
 * @author Blaeu Privacy Response Team
 * @copyright Copyright © 2019 - 2025 Team Blaeu. Content is licensed under CC BY 4.0 unless otherwise noted. All Rights Reserved.
 * @license CC BY 4.0
-->
<!-- 
  @component tw-FooterMain
  @description Main footer component with company information, navigation links,
  and legal document links. Includes address information, privacy policy links,
  and accessibility features with proper ARIA attributes.
-->
<template>
  <footer
    id="site-footer"
    aria-label="Site information and legal"
    class="bg-[#4B5563] py-12 font-amblelight text-sm tracking-extra-tight text-white font-normal leading-6"
  >
    <div class="container mx-auto px-4">
      <!-- Top row: Logo and primary sections -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <!-- Logo - moved to the left -->
        <div class="flex flex-col justify-start items-start">
          <img src="/assets/png/logo_gray.png" alt="Blaeu Logo" class="h-24 mb-4" />
          <p class="text-sm text-gray-300 max-w-xs">
            Privacy engineering and data protection consultancy specializing in complex data
            architectures.
          </p>
        </div>

        <!-- Location section -->
        <section aria-labelledby="location-heading">
          <h3 id="location-heading" class="text-lg font-semibold mb-3">Location</h3>
          <address class="not-italic">
            <ul class="space-y-1">
              <li class="flex items-center">
                <span class="flex-shrink-0 w-7 flex justify-start">
                  <i class="fa-solid fa-location-dot text-[#ffcc00]" aria-hidden="true"></i>
                </span>
                <span>p/a Element Offices</span>
              </li>
              <li class="pl-7">Wilhelminaplein 1-40</li>
              <li class="pl-7">3072 DE, Rotterdam</li>
              <li class="pl-7">The Netherlands</li>
            </ul>
          </address>
        </section>

        <!-- Contact section with about ID for navigation -->
        <section id="about" aria-labelledby="contact-heading-main">
          <h3 id="contact-heading-main" class="text-lg font-semibold mb-3">Contact</h3>
          <ul class="space-y-1">
            <li class="flex items-center">
              <span class="flex-shrink-0 w-7 flex justify-start">
                <i class="fa-solid fa-envelope text-[#ffcc00]" aria-hidden="true"></i>
              </span>
              <a
                href="mailto:team@blaeu.com"
                class="hover:text-[#ffcc00] transition-colors inline-flex items-center"
              >
                team@blaeu.com
              </a>
            </li>
          </ul>
          <div class="mt-6">
            <a
              href="mailto:team@blaeu.com"
              class="bg-[#ffcc00] hover:bg-blue-600 text-black hover:text-white font-medium px-4 py-2 rounded-md transition-colors inline-flex items-center"
            >
              <i class="fa-solid fa-envelope mr-2" aria-hidden="true"></i>
              Get in touch
            </a>
          </div>
        </section>
      </div>

      <!-- Bottom row: Registration, Legal, Security & Privacy -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <!-- Registration information -->
        <section aria-labelledby="registration-heading">
          <h3 id="registration-heading" class="text-lg font-semibold mb-3">Registration</h3>
          <ul class="space-y-2">
            <li class="flex items-start">
              <span class="flex-shrink-0 w-7 flex justify-start mt-1">
                <i class="fa-solid fa-building text-[#ffcc00]" aria-hidden="true"></i>
              </span>
              <div>
                <p>Kamer van Koophandel (NL):</p>
                <p class="pl-6">75599740</p>
              </div>
            </li>
          </ul>
        </section>

        <!-- Legal section -->
        <nav aria-labelledby="legal-heading">
          <h3 id="legal-heading" class="text-lg font-semibold mb-3">Legal</h3>
          <ul class="space-y-1">
            <li class="flex items-center">
              <span class="flex-shrink-0 w-7 flex justify-start">
                <i class="fa-solid fa-scale-balanced text-[#ffcc00]" aria-hidden="true"></i>
              </span>
              <a
                href="#"
                class="hover:text-[#ffcc00] transition-colors inline-flex items-center"
                @click.prevent="openTermsWidget()"
              >
                General Terms and Conditions
              </a>
            </li>
            <li class="flex items-center">
              <span class="flex-shrink-0 w-7 flex justify-start">
                <i class="fa-solid fa-file-shield text-[#ffcc00]" aria-hidden="true"></i>
              </span>
              <a
                href="#"
                class="hover:text-[#ffcc00] transition-colors inline-flex items-center"
                @click.prevent="openPrivacyWidget()"
              >
                Privacy Statement
              </a>
            </li>
            <li class="flex items-center">
              <span class="flex-shrink-0 w-7 flex justify-start">
                <i class="fa-solid fa-cookie text-[#ffcc00]" aria-hidden="true"></i>
              </span>
              <a
                href="#"
                class="hover:text-[#ffcc00] transition-colors inline-flex items-center"
                @click.prevent="openCookieWidget()"
              >
                Cookie Policy
              </a>
            </li>
          </ul>
        </nav>

        <!-- Security & Privacy section -->
        <nav aria-labelledby="security-heading">
          <h3 id="security-heading" class="text-lg font-semibold mb-3">Security & Privacy</h3>
          <ul class="space-y-1">
            <li class="flex items-center">
              <span class="flex-shrink-0 w-7 flex justify-start">
                <i class="fa-solid fa-shield-halved text-[#ffcc00]" aria-hidden="true"></i>
              </span>
              <a
                href="#"
                class="hover:text-[#ffcc00] transition-colors inline-flex items-center"
                @click.prevent="openResponsibleDisclosureWidget()"
              >
                Responsible Disclosure
              </a>
            </li>
            <li class="flex items-center">
              <span class="flex-shrink-0 w-7 flex justify-start">
                <i class="fa-solid fa-key text-[#ffcc00]" aria-hidden="true"></i>
              </span>
              <a
                href="https://pgp.surfnet.nl/pks/lookup?search=9b9171334b4f58de&fingerprint=on&op=index"
                target="_blank"
                class="hover:text-[#ffcc00] transition-colors inline-flex items-center"
              >
                PGP Key @SURFnet&nbsp;
                <i class="fa-solid fa-external-link fa-xs" aria-hidden="true"></i>
              </a>
            </li>
            <li class="flex items-center">
              <span class="flex-shrink-0 w-7 flex justify-start">
                <i class="fa-brands fa-github text-[#ffcc00]" aria-hidden="true"></i>
              </span>
              <a
                href="https://github.com/rvaneijk/blaeu.com"
                target="_blank"
                class="hover:text-[#ffcc00] transition-colors inline-flex items-center"
              >
                Website Source Code&nbsp;
                <i class="fa-solid fa-external-link fa-xs" aria-hidden="true"></i>
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <!-- Horizontal line before copyright -->
      <hr class="border-gray-700 mb-8" />

      <!-- Combined accessibility and copyright section -->
      <div>
        <!-- Accessibility links -->
        <div class="flex mb-4 text-sm text-gray-300">
          <div class="flex items-center mr-6">
            <span class="flex-shrink-0 w-7 flex justify-start">
              <i class="fa-solid fa-universal-access text-[#ffcc00]" aria-hidden="true"></i>
            </span>
            <a
              href="#"
              class="hover:text-[#ffcc00] transition-colors inline-flex items-center"
              @click.prevent="openAccessibilityPolicyWidget()"
            >
              Accessibility
            </a>
          </div>
          <div class="flex items-center">
            <span class="flex-shrink-0 w-7 flex justify-start">
              <i class="fa-solid fa-keyboard text-[#ffcc00]" aria-hidden="true"></i>
            </span>
            <a
              href="#"
              class="hover:text-[#ffcc00] transition-colors inline-flex items-center"
              title="Press Alt+/"
              @click.prevent="showKeyboardShortcuts"
            >
              Shortcuts
            </a>
          </div>
        </div>

        <!-- Copyright and disclaimer -->
        <div class="text-xs text-gray-300">
          <p class="mb-2">
            <span class="font-semibold">Copyright © 2019 - 2025 Team Blaeu</span>
            . Content is licensed under CC BY 4.0 unless otherwise noted. Team Blaeu is a registered
            trading name of Blaeu Privacy Response Team B.V.
          </p>

          <p>
            <span class="font-semibold">All Rights Reserved.</span>
            <span class="font-semibold">Video</span>
            provided by JuSun/Creatas Video via Getty Images. Licensed for commercial use. Fonts and
            other third-party components may be subject to their respective licenses.
            <span class="font-semibold">AI-Assisted Development:</span>
            Website source code enhanced with Claude (Anthropic) for feature development, error
            resolution, and systematic code quality improvements.
            <span class="font-semibold">Fonts:</span>
            Amble Family (Apache License 2.0), Big John (SIL OFL 1.1), OpenDyslexic (SIL OFL 1.1),
            Font Awesome (CC BY 4.0).
            <span class="font-semibold">Frameworks & Libraries:</span>
            Dash.js (BSD License), Node.js components (Node.js contributors' terms), Nuxt.js
            components (MIT), Tailwind CSS (MIT), and Vue.js (MIT).
          </p>
        </div>
      </div>
    </div>

    <!-- All modal references removed to fix hydration mismatches -->

    <!-- Accessibility Statement removed - using AccessibilityPolicyWidget instead -->

    <!-- Responsible Disclosure Widget -->
    <ResponsibleDisclosureWidget />

    <!-- Accessibility Policy Widget -->
    <AccessibilityPolicyWidget />
  </footer>
</template>

<script setup lang="ts">
  import { computed, defineAsyncComponent } from 'vue'
  // Convert widgets to lazy loading for better bundle optimization
  const ResponsibleDisclosureWidget = defineAsyncComponent(
    () => import('~/components/ResponsibleDisclosureWidget.vue')
  )
  const AccessibilityPolicyWidget = defineAsyncComponent(
    () => import('~/components/AccessibilityPolicyWidget.vue')
  )
  import { globalState } from '~/composables/globalState'

  /**
   * Detects the user's browser language for localization
   * @returns {string} Detected language code ('nl' or 'en')
   */
  const _browserLanguage = computed((): string => {
    // Only run this on client side
    if (process.client) {
      const nav = navigator as { language?: string; userLanguage?: string }
      const lang = nav.language || nav.userLanguage || 'en'
      return lang.startsWith('nl') ? 'nl' : 'en'
    }
    return 'en' // Default to English on server-side
  })

  // Methods
  // Helper function to validate language
  const validateLanguage = (lang?: string): 'en' | 'nl' => {
    return lang === 'nl' ? 'nl' : 'en'
  }

  const showKeyboardShortcuts = (): void => {
    // Do NOT update the language preference - keep the existing one
    // This ensures consistency with other widgets

    // Emit a custom event to open the keyboard shortcuts widget
    const event = new CustomEvent('open-keyboard-shortcuts', {
      detail: {}, // No need to pass language - widget will use globalState.languagePreference
    })
    document.dispatchEvent(event)
  }

  const openCookieWidget = (language?: string): void => {
    // Only update language if explicitly provided
    if (language) {
      globalState.languagePreference = validateLanguage(language)
    }

    // Emit a custom event to open the cookie policy widget
    const event = new CustomEvent('open-cookie-widget', {
      detail: {
        // Don't pass language parameter - widget will use globalState.languagePreference
        expandPolicy: false, // Show summary view instead of full policy
      },
    })
    document.dispatchEvent(event)
  }

  const openPrivacyWidget = (language?: string): void => {
    // Only update language if explicitly provided
    if (language) {
      globalState.languagePreference = validateLanguage(language)
    }

    // Emit a custom event to open the privacy statement widget to summary view
    const event = new CustomEvent('open-privacy-widget', {
      detail: {
        // Don't pass language parameter - widget will use globalState.languagePreference
        expandPolicy: false, // Show summary view instead of full policy
      },
    })
    document.dispatchEvent(event)
  }

  const openTermsWidget = (language?: string): void => {
    // Only update language if explicitly provided
    // Otherwise keep existing preference from globalState
    if (language) {
      globalState.languagePreference = validateLanguage(language)
    }

    // Emit a custom event to open the terms widget
    const event = new CustomEvent('open-terms-widget', {
      detail: {
        // Don't pass language parameter - widget will use globalState.languagePreference
        expandPolicy: false, // Show summary view instead of full policy
      },
    })
    document.dispatchEvent(event)
  }

  const openResponsibleDisclosureWidget = (language?: string): void => {
    // Only update language if explicitly provided
    if (language) {
      globalState.languagePreference = validateLanguage(language)
    }

    // Emit a custom event to open the responsible disclosure widget
    const event = new CustomEvent('open-disclosure-widget', {
      detail: {
        // Don't pass language parameter - widget will use globalState.languagePreference
        expandPolicy: false, // Show summary view instead of full policy
      },
    })
    document.dispatchEvent(event)
  }

  const openAccessibilityPolicyWidget = (language?: string): void => {
    // Only update language if explicitly provided
    if (language) {
      globalState.languagePreference = validateLanguage(language)
    }

    // Emit a custom event to open the accessibility policy widget
    const event = new CustomEvent('open-accessibility-policy', {
      detail: {
        // Don't pass language parameter - widget will use globalState.languagePreference
        expandPolicy: false, // Show summary view instead of full policy
      },
    })
    document.dispatchEvent(event)
  }
</script>
