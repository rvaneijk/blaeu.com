<!--
 * @author Blaeu Privacy Response Team
 * @copyright Copyright © 2019 - 2026 Team Blaeu. Content is licensed under CC BY 4.0 unless otherwise noted. All Rights Reserved.
 * @license CC BY 4.0
-->
<!--
  @component tw-FooterSimple
  @description Simple footer component with minimal content but full widget functionality.
  Uses useFooterWidgets composable for clean widget management.
  
  @features
  - Accessibility and keyboard shortcuts links
  - Copyright and licensing information
  - Full widget functionality via composable
  
  @accessibility
  - Proper semantic structure
  - ARIA labels and heading hierarchy
  - Keyboard navigation support
  
  @example Basic usage
  <tw-FooterSimple />
-->
<template>
  <footer
    aria-label="Contact information and resources"
    class="bg-[#4B5563] py-6 font-amblelight text-sm tracking-extra-tight text-white font-normal leading-6"
  >
    <div class="container mx-auto px-4">
      <!-- Combined accessibility and copyright section -->
      <div>
        <!-- Accessibility links -->
        <div class="flex mb-3 text-sm text-gray-300">
          <div class="flex items-center mr-6">
            <span class="flex-shrink-0 w-5 flex justify-start">
              <i class="fa-solid fa-universal-access text-[#FFD700]" aria-hidden="true"></i>
            </span>
            <a
              href="#"
              class="hover:text-[#FFD700] transition-colors inline-flex items-center"
              @click.prevent="openAccessibilityPolicyWidget()"
            >
              Accessibility
            </a>
          </div>
          <div class="flex items-center">
            <span class="flex-shrink-0 w-5 flex justify-start">
              <i class="fa-solid fa-keyboard text-[#FFD700]" aria-hidden="true"></i>
            </span>
            <a
              href="#"
              class="hover:text-[#FFD700] transition-colors inline-flex items-center"
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
    openAccessibilityPolicyWidget,
  } = useFooterWidgets()
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
</style>
