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
          <h3 id="contact-heading" class="text-xl font-semibold mb-3 text-brand-gold">Contact</h3>
          <ul class="footer-compact-list">
            <li class="flex items-center">
              <span class="flex-shrink-0 w-5 flex justify-start">
                <i class="fa-solid fa-envelope text-brand-gold" aria-hidden="true"></i>
              </span>
              <a
                href="mailto:team@blaeu.com"
                class="hover:text-gray-200 transition-colors inline-flex items-center whitespace-nowrap has-tooltip"
                data-tooltip="Compose email to team@blaeu.com"
              >
                team@blaeu.com
              </a>
            </li>
            <li class="flex items-center">
              <span class="flex-shrink-0 w-5 flex justify-start">
                <i class="fa-solid fa-key text-brand-gold" aria-hidden="true"></i>
              </span>
              <a
                href="https://pgp.surfnet.nl/pks/lookup?search=9b9171334b4f58de&fingerprint=on&op=index"
                target="_blank"
                class="no-external-icon hover:text-gray-200 transition-colors inline-flex items-center has-tooltip"
                data-tooltip="Our public PGP key on the SURFnet keyserver"
              >
                PGP Key @SURFnet
                <i class="fa-solid fa-external-link fa-xs" aria-hidden="true"></i>
              </a>
            </li>
          </ul>
        </nav>

        <!-- Social Media -->
        <nav aria-labelledby="socials-heading">
          <h3 id="socials-heading" class="text-xl font-semibold mb-3 text-brand-gold">
            Social Media
          </h3>
          <ul class="footer-compact-list">
            <li class="flex items-center">
              <span class="flex-shrink-0 w-5 flex justify-start">
                <i class="fa-brands fa-linkedin text-brand-gold" aria-hidden="true"></i>
              </span>
              <a
                href="https://www.linkedin.com/in/rvaneijk88"
                target="_blank"
                class="no-external-icon hover:text-gray-200 transition-colors inline-flex items-center"
              >
                LinkedIn
                <i class="fa-solid fa-external-link fa-xs" aria-hidden="true"></i>
              </a>
            </li>
            <li class="flex items-center">
              <span class="flex-shrink-0 w-5 flex justify-start">
                <i class="fa-brands fa-square-bluesky text-brand-gold" aria-hidden="true"></i>
              </span>
              <a
                href="https://bsky.app/profile/rvaneijk.bsky.social"
                target="_blank"
                class="no-external-icon hover:text-gray-200 transition-colors inline-flex items-center"
              >
                Blue Sky
                <i class="fa-solid fa-external-link fa-xs" aria-hidden="true"></i>
              </a>
            </li>
            <li class="flex items-center">
              <span class="flex-shrink-0 w-5 flex justify-start">
                <i class="fa-brands fa-mastodon text-brand-gold" aria-hidden="true"></i>
              </span>
              <a
                href="https://mastodon.nl/@rvaneijk"
                target="_blank"
                class="no-external-icon hover:text-gray-200 transition-colors inline-flex items-center"
              >
                Mastodon
                <i class="fa-solid fa-external-link fa-xs" aria-hidden="true"></i>
              </a>
            </li>
          </ul>
        </nav>

        <!-- Research -->
        <nav aria-labelledby="research-heading">
          <h3 id="research-heading" class="text-xl font-semibold mb-3 text-brand-gold">Research</h3>
          <ul class="footer-compact-list">
            <li class="flex items-center">
              <span class="flex-shrink-0 w-5 flex justify-start">
                <i class="fa-solid fa-graduation-cap text-brand-gold" aria-hidden="true"></i>
              </span>
              <a
                href="https://scholar.google.nl/citations?user=p4VBH-4AAAAJ"
                target="_blank"
                class="no-external-icon hover:text-gray-200 transition-colors inline-flex items-center has-tooltip"
                data-tooltip="Academic publications on Google Scholar"
              >
                Google Scholar
                <i class="fa-solid fa-external-link fa-xs" aria-hidden="true"></i>
              </a>
            </li>
            <li class="flex items-center">
              <span class="flex-shrink-0 w-5 flex justify-start">
                <i class="fa-brands fa-github text-brand-gold" aria-hidden="true"></i>
              </span>
              <a
                href="https://github.com/rvaneijk"
                target="_blank"
                class="no-external-icon hover:text-gray-200 transition-colors inline-flex items-center has-tooltip"
                data-tooltip="Source code and projects on GitHub"
              >
                Code @GitHub
                <i class="fa-solid fa-external-link fa-xs" aria-hidden="true"></i>
              </a>
            </li>
            <li class="flex items-center">
              <span class="flex-shrink-0 w-5 flex justify-start">
                <i class="fa-brands fa-orcid text-brand-gold" aria-hidden="true"></i>
              </span>
              <a
                href="https://orcid.org/0000-0002-2203-6819"
                target="_blank"
                class="no-external-icon hover:text-gray-200 transition-colors inline-flex items-center has-tooltip"
                data-tooltip="Research identity profile on ORCID"
              >
                ORCID
                <i class="fa-solid fa-external-link fa-xs" aria-hidden="true"></i>
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <hr class="border-gray-700 mb-4" />

      <div>
        <div class="flex flex-wrap gap-x-6 mb-3 text-sm text-gray-300">
          <div class="flex items-center">
            <span class="flex-shrink-0 w-5 flex justify-start">
              <i class="fa-solid fa-universal-access text-brand-gold" aria-hidden="true"></i>
            </span>
            <a
              href="#"
              class="hover:text-gray-200 transition-colors inline-flex items-center whitespace-nowrap has-tooltip"
              data-tooltip="Open accessibility policy and settings"
              @click.prevent="openAccessibilityPolicyWidget()"
            >
              Accessibility
            </a>
          </div>
          <div class="flex items-center">
            <span class="flex-shrink-0 w-5 flex justify-start">
              <i class="fa-solid fa-cookie-bite text-brand-gold" aria-hidden="true"></i>
            </span>
            <a
              href="#"
              class="hover:text-gray-200 transition-colors inline-flex items-center whitespace-nowrap has-tooltip"
              data-tooltip="View cookie policy"
              @click.prevent="openCookieWidget()"
            >
              Cookie Policy
            </a>
          </div>
          <div class="flex items-center">
            <span class="flex-shrink-0 w-5 flex justify-start">
              <i class="fa-solid fa-file-shield text-brand-gold" aria-hidden="true"></i>
            </span>
            <a
              href="#"
              class="hover:text-gray-200 transition-colors inline-flex items-center whitespace-nowrap has-tooltip"
              data-tooltip="View privacy statement"
              @click.prevent="openPrivacyWidget()"
            >
              Privacy
            </a>
          </div>
        </div>

        <div class="text-xs text-gray-300">
          <p class="mb-2">
            <span class="font-semibold">Copyright © 2019 - 2026 Team Blaeu.</span>
            Content is licensed under CC BY 4.0 unless otherwise noted. Team Blaeu is a registered
            trading name of Blaeu Privacy Response Team B.V.
          </p>
        </div>
      </div>
    </div>

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
