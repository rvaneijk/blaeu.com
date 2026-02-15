<!--
 * @author Blaeu Privacy Response Team
 * @copyright Copyright © 2019 - 2026 Team Blaeu. Content is licensed under CC BY 4.0 unless otherwise noted. All Rights Reserved.
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
    class="bg-[#4B5563] py-6 font-amblelight text-sm tracking-extra-tight text-white font-normal leading-6"
  >
    <div class="container mx-auto px-4">
      <!-- Top row: Logo and primary sections -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <!-- Logo - moved to the left -->
        <div class="flex flex-col justify-start items-start">
          <img src="/assets/png/logo_transparent.png" alt="Blaeu Logo" class="h-24 mb-3" />
          <p class="text-sm text-gray-300 max-w-xs">
            Privacy engineering and data protection consultancy specializing in complex data
            architectures.
          </p>
        </div>

        <!-- Location section -->
        <section aria-labelledby="location-heading">
          <h3 id="location-heading" class="text-lg font-semibold mb-2">Location</h3>
          <ul class="footer-compact-list">
            <li class="flex items-center">
              <span class="flex-shrink-0 w-5 flex justify-start">
                <i class="fa-solid fa-location-dot text-brand-gold" aria-hidden="true"></i>
              </span>
              <a
                href="#"
                class="hover:text-brand-gold transition-colors inline-flex items-center"
                @click.prevent="openPrivacyWidget()"
              >
                p/a Element Offices
              </a>
            </li>
            <li class="flex items-center">
              <span class="flex-shrink-0 w-5 flex justify-start"></span>
              <a
                href="#"
                class="hover:text-brand-gold transition-colors inline-flex items-center"
                @click.prevent="openPrivacyWidget()"
              >
                Wilhelminaplein 1-40
              </a>
            </li>
            <li class="flex items-center">
              <span class="flex-shrink-0 w-5 flex justify-start"></span>
              <a
                href="#"
                class="hover:text-brand-gold transition-colors inline-flex items-center"
                @click.prevent="openPrivacyWidget()"
              >
                3072 DE, Rotterdam
              </a>
            </li>
            <li class="flex items-center">
              <span class="flex-shrink-0 w-5 flex justify-start"></span>
              <a
                href="#"
                class="hover:text-brand-gold transition-colors inline-flex items-center"
                @click.prevent="openPrivacyWidget()"
              >
                The Netherlands
              </a>
            </li>
          </ul>
        </section>

        <!-- Contact section with about ID for navigation -->
        <section id="about" aria-labelledby="contact-heading-main">
          <h3 id="contact-heading-main" class="text-lg font-semibold mb-2">Contact</h3>
          <ul class="footer-compact-list">
            <li class="flex items-center">
              <span class="flex-shrink-0 w-5 flex justify-start">
                <i class="fa-solid fa-envelope text-brand-gold" aria-hidden="true"></i>
              </span>
              <a
                href="mailto:team@blaeu.com"
                class="hover:text-brand-gold transition-colors inline-flex items-center"
              >
                team@blaeu.com
              </a>
            </li>
          </ul>
          <div class="mt-4">
            <a
              href="mailto:team@blaeu.com"
              class="bg-brand-gold hover:bg-brand-blue text-black hover:text-white font-medium px-4 py-2 rounded-md transition-colors inline-flex items-center"
            >
              <i class="fa-solid fa-envelope mr-2" aria-hidden="true"></i>
              Get in touch
            </a>
          </div>
        </section>
      </div>

      <!-- Bottom row: Registration, Legal, Security & Privacy -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <!-- Registration information -->
        <section aria-labelledby="registration-heading">
          <h3 id="registration-heading" class="text-lg font-semibold mb-2">Registration</h3>
          <ul class="footer-compact-list">
            <li class="flex items-start">
              <span class="flex-shrink-0 w-7 flex justify-start mt-1">
                <i class="fa-solid fa-building text-brand-gold" aria-hidden="true"></i>
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
          <h3 id="legal-heading" class="text-lg font-semibold mb-2">Legal</h3>
          <ul class="footer-compact-list">
            <li class="flex items-center">
              <span class="flex-shrink-0 w-5 flex justify-start">
                <i class="fa-solid fa-scale-balanced text-brand-gold" aria-hidden="true"></i>
              </span>
              <a
                href="#"
                class="hover:text-brand-gold transition-colors inline-flex items-center"
                @click.prevent="openTermsWidget()"
              >
                General Terms and Conditions
              </a>
            </li>
            <li class="flex items-center">
              <span class="flex-shrink-0 w-5 flex justify-start">
                <i class="fa-solid fa-file-shield text-brand-gold" aria-hidden="true"></i>
              </span>
              <a
                href="#"
                class="hover:text-brand-gold transition-colors inline-flex items-center"
                @click.prevent="openPrivacyWidget()"
              >
                Privacy Statement
              </a>
            </li>
            <li class="flex items-center">
              <span class="flex-shrink-0 w-5 flex justify-start">
                <i class="fa-solid fa-cookie text-brand-gold" aria-hidden="true"></i>
              </span>
              <a
                href="#"
                class="hover:text-brand-gold transition-colors inline-flex items-center"
                @click.prevent="openCookieWidget()"
              >
                Cookie Policy
              </a>
            </li>
          </ul>
        </nav>

        <!-- Security & Privacy section -->
        <nav aria-labelledby="security-heading">
          <h3 id="security-heading" class="text-lg font-semibold mb-2">Security & Privacy</h3>
          <ul class="footer-compact-list">
            <li class="flex items-center">
              <span class="flex-shrink-0 w-5 flex justify-start">
                <i class="fa-solid fa-shield-halved text-brand-gold" aria-hidden="true"></i>
              </span>
              <a
                href="#"
                class="hover:text-brand-gold transition-colors inline-flex items-center"
                @click.prevent="openResponsibleDisclosureWidget()"
              >
                Responsible Disclosure
              </a>
            </li>
            <li class="flex items-center">
              <span class="flex-shrink-0 w-5 flex justify-start">
                <i class="fa-solid fa-key text-brand-gold" aria-hidden="true"></i>
              </span>
              <a
                href="https://pgp.surfnet.nl/pks/lookup?search=9b9171334b4f58de&fingerprint=on&op=index"
                target="_blank"
                class="hover:text-brand-gold transition-colors inline-flex items-center"
              >
                PGP Key @SURFnet&nbsp;
                <i class="fa-solid fa-external-link fa-xs" aria-hidden="true"></i>
              </a>
            </li>
            <li class="flex items-center">
              <span class="flex-shrink-0 w-5 flex justify-start">
                <i class="fa-brands fa-github text-brand-gold" aria-hidden="true"></i>
              </span>
              <a
                href="https://github.com/rvaneijk/blaeu.com"
                target="_blank"
                class="hover:text-brand-gold transition-colors inline-flex items-center"
              >
                Website Source Code&nbsp;
                <i class="fa-solid fa-external-link fa-xs" aria-hidden="true"></i>
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <!-- Horizontal line before copyright -->
      <hr class="border-gray-700 mb-4" />

      <!-- Combined accessibility and copyright section -->
      <div>
        <!-- Accessibility links -->
        <div class="flex mb-3 text-sm text-gray-300">
          <div class="flex items-center mr-6">
            <span class="flex-shrink-0 w-5 flex justify-start">
              <i class="fa-solid fa-universal-access text-brand-gold" aria-hidden="true"></i>
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
            <span class="flex-shrink-0 w-5 flex justify-start">
              <i class="fa-solid fa-keyboard text-brand-gold" aria-hidden="true"></i>
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
            <span class="font-semibold">Copyright © 2019 - 2026 Team Blaeu.</span>
            Content is licensed under CC BY 4.0 unless otherwise noted. Team Blaeu is a registered
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
            Amble Family (Apache License 2.0), Big John (SIL OFL 1.1), Liberation(tm) Fonts (SIL OFL
            1.1), OpenDyslexic (SIL OFL 1.1), Font Awesome (CC BY 4.0).
            <span class="font-semibold">Frameworks & Libraries:</span>
            Dash.js (BSD License), Node.js components (Node.js contributors' terms), Nuxt.js
            components (MIT), Tailwind CSS (MIT), and Vue.js (MIT).
          </p>
        </div>
      </div>
    </div>

    <!-- All modal references removed to fix hydration mismatches -->

    <!-- Accessibility Statement removed - using AccessibilityPolicyWidget instead -->

    <!-- All Footer Widgets from composable -->
    <AccessibilityWidget />
    <AccessibilityPolicyWidget />
    <CookiePolicyWidget />
    <KeyboardShortcutsWidget />
    <PrivacyStatementWidget />
    <ResponsibleDisclosureWidget />
    <TermsWidget />
  </footer>
</template>

<script setup lang="ts">
  import { computed } from 'vue'

  // Use the footer widgets composable for clean, centralized widget management
  const {
    AccessibilityWidget,
    AccessibilityPolicyWidget,
    CookiePolicyWidget,
    KeyboardShortcutsWidget,
    PrivacyStatementWidget,
    ResponsibleDisclosureWidget,
    TermsWidget,
    showKeyboardShortcuts,
    openCookieWidget,
    openAccessibilityPolicyWidget,
    openPrivacyWidget,
    openTermsWidget,
    openResponsibleDisclosureWidget,
  } = useFooterWidgets()

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
</script>

<style scoped>
  .footer-compact-list li {
    margin-bottom: -1px !important;
  }

  .footer-compact-list li a.inline-flex.items-center {
    min-height: 32px !important;
    padding: 4px 8px !important;
    line-height: 1.3 !important;
  }

  /* Ensure proper alignment for location section */
  .footer-compact-list li.flex.items-center {
    display: flex !important;
    align-items: center !important;
  }

  .footer-compact-list li .flex-shrink-0.w-5 {
    width: 1.25rem !important;
    flex-shrink: 0 !important;
    display: flex !important;
    justify-content: flex-start !important;
  }
</style>
