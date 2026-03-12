<!--
 * @author Blaeu Privacy Response Team
 * @copyright Copyright © 2019 - 2026 Team Blaeu. Content is licensed under CC BY 4.0 unless otherwise noted. All Rights Reserved.
 * @license CC BY 4.0
-->
<!--
  @component tw-FooterMinimal
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
  <tw-FooterMinimal />
-->
<template>
  <footer
    aria-label="Contact information and resources"
    class="bg-[#4B5563] py-2 font-amblelight text-sm tracking-extra-tight text-white font-normal leading-6"
  >
    <div class="container mx-auto px-4">
      <!-- Combined accessibility and copyright section -->
      <div>
        <!-- Policy links -->
        <div class="flex flex-wrap gap-x-6 mb-2 text-sm text-gray-300">
          <div class="flex items-center">
            <span class="flex-shrink-0 w-5 flex justify-start">
              <i class="fa-solid fa-universal-access text-[#FFD700]" aria-hidden="true"></i>
            </span>
            <a
              href="#"
              class="hover:text-white transition-colors inline-flex items-center whitespace-nowrap has-tooltip"
              data-tooltip="Open accessibility policy and settings"
              @click.prevent="openAccessibilityPolicyWidget()"
            >
              Accessibility
            </a>
          </div>
          <div class="flex items-center">
            <span class="flex-shrink-0 w-5 flex justify-start">
              <i class="fa-solid fa-cookie-bite text-[#FFD700]" aria-hidden="true"></i>
            </span>
            <a
              href="#"
              class="hover:text-white transition-colors inline-flex items-center whitespace-nowrap has-tooltip"
              data-tooltip="View cookie policy"
              @click.prevent="openCookieWidget()"
            >
              Cookie Policy
            </a>
          </div>
          <div class="flex items-center">
            <span class="flex-shrink-0 w-5 flex justify-start">
              <i class="fa-solid fa-file-shield text-[#FFD700]" aria-hidden="true"></i>
            </span>
            <a
              href="#"
              class="hover:text-white transition-colors inline-flex items-center whitespace-nowrap has-tooltip"
              data-tooltip="View privacy statement"
              @click.prevent="openPrivacyWidget()"
            >
              Privacy
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
    openAccessibilityPolicyWidget,
    openCookieWidget,
    openPrivacyWidget,
  } = useFooterWidgets()
</script>

<style scoped>
  footer {
    padding-top: 1.25rem !important;
    padding-bottom: 1.25rem !important;
  }

  .footer-compact-list li {
    margin-bottom: -1px !important;
  }

  .footer-compact-list li a.inline-flex.items-center {
    min-height: 32px !important;
    padding: 4px 8px !important;
    line-height: 1.3 !important;
  }

  .has-tooltip {
    position: relative;
  }

  .has-tooltip::after {
    content: attr(data-tooltip);
    position: absolute;
    bottom: calc(100% + 6px);
    left: 50%;
    transform: translateX(-50%);
    background: #111827;
    color: #f9fafb;
    font-size: 0.7rem;
    line-height: 1.3;
    white-space: nowrap;
    padding: 4px 8px;
    border-radius: 4px;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.15s ease;
    z-index: 50;
  }

  @media (min-width: 768px) {
    .has-tooltip:hover::after,
    .has-tooltip:focus-visible::after {
      opacity: 1;
    }
  }
</style>
