<!--
 * @author Blaeu Privacy Response Team
 * @copyright Copyright © 2019 - 2026 Team Blaeu. Content is licensed under CC BY 4.0 unless otherwise noted. All Rights Reserved.
 * @license CC BY 4.0
-->
<!--
  @component tw-Footer
  @description Website footer component with contact information, social media links, 
  thought leadership profiles, accessibility features, and legal information.
  
  Includes multilingual support via globalState and interactive widgets for
  accessibility policy, privacy policy, terms, and keyboard shortcuts.
  
  @features
  - Contact information with email and PGP key
  - Social media links (LinkedIn, BlueSky, Mastodon)
  - Thought leadership profiles (Google Scholar, GitHub, ORCID)
  - Accessibility and keyboard shortcuts links
  - Copyright and licensing information
  - Responsive grid layout
  
  @accessibility
  - Proper semantic structure with nav elements
  - ARIA labels and heading hierarchy
  - External link indicators with icons
  - Keyboard navigation support
  
  @example Basic usage
  <tw-Footer />
-->
<template>
  <footer
    aria-label="Contact information and resources"
    class="bg-[#4B5563] py-6 font-amblelight text-sm tracking-extra-tight text-white font-normal leading-6"
  >
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <!-- Contact Information -->
        <nav aria-labelledby="contact-heading">
          <h3 id="contact-heading" class="text-xl font-semibold mb-3 text-[#FFD700]">Contact</h3>
          <ul class="footer-compact-list">
            <li class="flex items-center">
              <span class="flex-shrink-0 w-5 flex justify-start">
                <i class="fa-solid fa-envelope text-[#FFD700]" aria-hidden="true"></i>
              </span>
              <a
                href="mailto:rob@blaeu.com"
                class="hover:text-[#FFD700] transition-colors inline-flex items-center"
              >
                rob@blaeu.com
              </a>
            </li>
            <li class="flex items-center">
              <span class="flex-shrink-0 w-5 flex justify-start">
                <i class="fa-solid fa-key text-[#FFD700]" aria-hidden="true"></i>
              </span>
              <span class="footer-tooltip-wrap">
                <a
                  href="https://pgp.surfnet.nl/pks/lookup?search=9b9171334b4f58de&fingerprint=on&op=index"
                  target="_blank"
                  class="hover:text-[#FFD700] transition-colors inline-flex items-center"
                  aria-label="Download PGP public key from SURFnet (opens in new tab)"
                >
                  PGP Key @SURFnet&nbsp;
                  <i class="fa-solid fa-external-link fa-xs" aria-hidden="true"></i>
                </a>
                <span class="footer-tooltip-text">Download PGP public key</span>
              </span>
            </li>
          </ul>
        </nav>

        <!-- Social Media -->
        <nav aria-labelledby="socials-heading">
          <h3 id="socials-heading" class="text-xl font-semibold mb-3 text-[#FFD700]">
            Social Media
          </h3>
          <ul class="footer-compact-list">
            <li class="flex items-center">
              <span class="flex-shrink-0 w-5 flex justify-start">
                <i class="fa-brands fa-linkedin text-[#FFD700]" aria-hidden="true"></i>
              </span>
              <span class="footer-tooltip-wrap">
                <a
                  href="https://www.linkedin.com/in/rvaneijk88"
                  target="_blank"
                  class="hover:text-[#FFD700] transition-colors inline-flex items-center"
                  aria-label="Visit LinkedIn profile (opens in new tab)"
                >
                  LinkedIn&nbsp;
                  <i class="fa-solid fa-external-link fa-xs" aria-hidden="true"></i>
                </a>
                <span class="footer-tooltip-text">Visit LinkedIn profile</span>
              </span>
            </li>
            <li class="flex items-center">
              <span class="flex-shrink-0 w-5 flex justify-start">
                <i class="fa-brands fa-square-bluesky text-[#FFD700]" aria-hidden="true"></i>
              </span>
              <span class="footer-tooltip-wrap">
                <a
                  href="https://bsky.app/profile/rvaneijk.bsky.social"
                  target="_blank"
                  class="hover:text-[#FFD700] transition-colors inline-flex items-center"
                  aria-label="Visit Bluesky profile (opens in new tab)"
                >
                  Blue Sky&nbsp;
                  <i class="fa-solid fa-external-link fa-xs" aria-hidden="true"></i>
                </a>
                <span class="footer-tooltip-text">Visit Bluesky profile</span>
              </span>
            </li>
            <li class="flex items-center">
              <span class="flex-shrink-0 w-5 flex justify-start">
                <i class="fa-brands fa-mastodon text-[#FFD700]" aria-hidden="true"></i>
              </span>
              <span class="footer-tooltip-wrap">
                <a
                  href="https://mastodon.nl/@rvaneijk"
                  target="_blank"
                  class="hover:text-[#FFD700] transition-colors inline-flex items-center"
                  aria-label="Visit Mastodon profile (opens in new tab)"
                >
                  Mastodon&nbsp;
                  <i class="fa-solid fa-external-link fa-xs" aria-hidden="true"></i>
                </a>
                <span class="footer-tooltip-text">Visit Mastodon profile</span>
              </span>
            </li>
          </ul>
        </nav>

        <!-- Thought Leadership -->
        <nav aria-labelledby="socials-heading">
          <h3 id="socials-heading" class="text-xl font-semibold mb-3 text-[#FFD700]">
            Thought Leadership
          </h3>
          <ul class="footer-compact-list">
            <li class="flex items-center">
              <span class="flex-shrink-0 w-5 flex justify-start">
                <i class="fa-solid fa-graduation-cap text-[#FFD700]" aria-hidden="true"></i>
              </span>
              <span class="footer-tooltip-wrap">
                <a
                  href="https://scholar.google.nl/citations?user=p4VBH-4AAAAJ"
                  target="_blank"
                  class="hover:text-[#FFD700] transition-colors inline-flex items-center"
                  aria-label="View Google Scholar profile (opens in new tab)"
                >
                  Google Scholar&nbsp;
                  <i class="fa-solid fa-external-link fa-xs" aria-hidden="true"></i>
                </a>
                <span class="footer-tooltip-text">View academic citations</span>
              </span>
            </li>
            <li class="flex items-center">
              <span class="flex-shrink-0 w-5 flex justify-start">
                <i class="fa-brands fa-github text-[#FFD700]" aria-hidden="true"></i>
              </span>
              <span class="footer-tooltip-wrap">
                <a
                  href="https://github.com/rvaneijk"
                  target="_blank"
                  class="hover:text-[#FFD700] transition-colors inline-flex items-center"
                  aria-label="View source code on GitHub (opens in new tab)"
                >
                  Code @GitHub&nbsp;
                  <i class="fa-solid fa-external-link fa-xs" aria-hidden="true"></i>
                </a>
                <span class="footer-tooltip-text">View source code on GitHub</span>
              </span>
            </li>
            <li class="flex items-center">
              <span class="flex-shrink-0 w-5 flex justify-start">
                <i class="fa-brands fa-orcid text-[#FFD700]" aria-hidden="true"></i>
              </span>
              <span class="footer-tooltip-wrap">
                <a
                  href="https://orcid.org/0000-0002-2203-6819"
                  target="_blank"
                  class="hover:text-[#FFD700] transition-colors inline-flex items-center"
                  aria-label="View ORCID researcher profile (opens in new tab)"
                >
                  ORCID&nbsp;
                  <i class="fa-solid fa-external-link fa-xs" aria-hidden="true"></i>
                </a>
                <span class="footer-tooltip-text">Open Researcher &amp; Contributor ID</span>
              </span>
            </li>
          </ul>
        </nav>
      </div>

      <!-- Horizontal line before copyright and accessibility -->
      <hr class="border-gray-700 mb-4" />

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

    <!-- Accessibility Statement is now a global component -->

    <!-- Modal reference removed to fix hydration mismatch -->

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
  .footer-tooltip-wrap {
    position: relative;
    display: inline-flex;
  }
  .footer-tooltip-text {
    position: absolute;
    bottom: calc(100% + 6px);
    left: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
    background: #1f2937;
    color: #f9fafb;
    font-size: 0.75rem;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.15s;
    z-index: 10;
  }
  .footer-tooltip-text::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 4px solid transparent;
    border-top-color: #1f2937;
  }
  .footer-tooltip-wrap:hover .footer-tooltip-text,
  .footer-tooltip-wrap:focus-within .footer-tooltip-text {
    opacity: 1;
  }
</style>
