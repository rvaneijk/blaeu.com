<!--
 * @author Blaeu Privacy Response Team
 * @copyright Copyright © 2019 - 2026 Team Blaeu. Content is licensed under CC BY 4.0 unless otherwise noted. All Rights Reserved.
 * @license CC BY 4.0
-->
<!--
  @component tw-Footer
  @description The one site footer: brand, visiting addresses, policy links
  and the legal line (entity, KvK, VAT).
-->
<template>
  <footer
    id="site-footer"
    aria-label="Site information and legal"
    class="relative overflow-hidden bg-gray-900 dark:bg-[#0b0f17] pt-8 pb-24 lg:pb-8 font-sourcesans3 text-base text-white font-normal leading-6"
  >
    <!-- The favicon mark, large and faded: a quiet brand element on every page -->
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="1 6 30 20"
      class="hidden xl:block absolute right-10 top-8 w-40 opacity-30 pointer-events-none"
    >
      <circle cx="11" cy="16" r="10" fill="#29ABE2" />
      <circle cx="26" cy="16" r="5" fill="#F7C21D" />
    </svg>
    <div class="relative max-w-[52rem] mx-auto px-4">
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-x-6 lg:gap-x-12 gap-y-8 mb-8">
        <div class="col-span-2 lg:col-span-1">
          <img
            src="/assets/img/logo-wordmark.webp"
            alt="Blaeu Logo"
            class="h-10 mb-2"
            loading="lazy"
          />
          <p class="text-gray-400">AI, Privacy &amp; EU Regulatory Affairs</p>
        </div>

        <section aria-labelledby="footer-addresses-heading" class="col-span-2 lg:col-span-1">
          <h2 id="footer-addresses-heading" class="text-base font-semibold text-white mb-2">
            Offices
          </h2>
          <p class="text-gray-400 py-1">
            <span class="block">Brussels, Amsterdam, The&nbsp;Hague, Rotterdam</span>
            <span class="block">By appointment</span>
          </p>
          <NuxtLink
            to="/contact/#offices"
            class="inline-block !py-1 !px-0 !min-h-0 !min-w-0 text-gray-200 hover:text-white hover:underline underline-offset-2 transition-colors"
          >
            Visiting addresses
            <span aria-hidden="true">&rarr;</span>
          </NuxtLink>
        </section>

        <nav aria-labelledby="footer-legal-heading" class="col-span-2">
          <h2 id="footer-legal-heading" class="text-base font-semibold text-white mb-2">Legal</h2>
          <ul class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 lg:gap-x-12">
            <li>
              <NuxtLink
                to="/privacy/"
                class="inline-block !py-1 !px-0 !min-h-0 !min-w-0 text-gray-200 hover:text-white hover:underline underline-offset-2 transition-colors"
              >
                Privacy statement
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/terms/"
                class="inline-block !py-1 !px-0 !min-h-0 !min-w-0 text-gray-200 hover:text-white hover:underline underline-offset-2 transition-colors"
              >
                Terms and conditions
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/cookies/"
                class="inline-block !py-1 !px-0 !min-h-0 !min-w-0 text-gray-200 hover:text-white hover:underline underline-offset-2 transition-colors"
              >
                Cookie policy
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/security/"
                class="inline-block !py-1 !px-0 !min-h-0 !min-w-0 text-gray-200 hover:text-white hover:underline underline-offset-2 transition-colors"
              >
                Security policy
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/accessibility/"
                class="inline-block !py-1 !px-0 !min-h-0 !min-w-0 text-gray-200 hover:text-white hover:underline underline-offset-2 transition-colors"
              >
                Accessibility statement
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/ai/"
                class="inline-block !py-1 !px-0 !min-h-0 !min-w-0 text-gray-200 hover:text-white hover:underline underline-offset-2 transition-colors"
              >
                AI statement
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/colophon/"
                class="inline-block !py-1 !px-0 !min-h-0 !min-w-0 text-gray-200 hover:text-white hover:underline underline-offset-2 transition-colors"
              >
                Colophon
              </NuxtLink>
            </li>
          </ul>
        </nav>
      </div>

      <div class="border-t border-gray-700 pt-4 text-sm text-gray-400 space-y-1">
        <p>Content licensed under CC BY 4.0 unless otherwise noted</p>
        <p>This site uses no cookies or trackers and makes no third-party requests</p>
        <p>
          Chamber of Commerce (KvK) number&nbsp;75599740 | VAT number&nbsp;NL860336190B01 |
          ©&nbsp;2019–2026 Blaeu Privacy Response Team B.V.
        </p>
      </div>
    </div>

    <AccessibilityWidget />
    <KeyboardShortcutsWidget />
  </footer>
</template>

<script setup lang="ts">
  const { AccessibilityWidget, KeyboardShortcutsWidget } = useFooterWidgets()
</script>
