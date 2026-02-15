<!--
 * @author Blaeu Privacy Response Team
 * @copyright Copyright © 2019 - 2025 Team Blaeu. Content is licensed under CC BY 4.0 unless otherwise noted. All Rights Reserved.
 * @license CC BY 4.0
-->
<template>
  <div
    ref="widgetRef"
    :class="[
      'cookie-policy-widget',
      { 'cookie-policy-widget-open': isOpen, 'policy-expanded': isPolicyExpanded },
      positionClass,
    ]"
  >
    <!-- Toggle button with accessible label using Font Awesome icon -->
    <button
      :class="[
        'cookie-policy-widget-toggle',
        { 'cookie-policy-widget-toggle-blinking': isBlinking },
        { 'cookie-policy-widget-toggle-open': isOpen },
      ]"
      :aria-expanded="isOpen ? 'true' : 'false'"
      :aria-label="isOpen ? 'Close cookie policy menu' : 'Open cookie policy menu'"
      aria-controls="cookie-policy-controls"
      @click="toggleWidget"
    >
      <i class="fa-solid fa-cookie-bite text-xl" aria-hidden="true"></i>
      <span class="sr-only">Cookie Policy</span>
    </button>

    <!-- Widget panel with controls -->
    <div
      id="cookie-policy-controls"
      class="cookie-policy-widget-panel"
      :class="{ open: isOpen, expanded: isPolicyExpanded }"
      role="dialog"
      aria-labelledby="cookie-policy-widget-title"
    >
      <div class="cookie-policy-widget-header">
        <h2 id="cookie-policy-widget-title" class="cookie-policy-widget-title">
          {{ currentLanguage === 'nl' ? 'Cookiebeleid' : 'Cookie Policy' }}
        </h2>
        <button
          class="cookie-policy-widget-close"
          aria-label="Close cookie policy menu"
          @click="closeWidget"
        >
          <i class="fa-solid fa-xmark" aria-hidden="true"></i>
        </button>
      </div>

      <div class="cookie-policy-widget-content">
        <!-- Language selector -->
        <div class="cookie-policy-language-selector">
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
            <p class="mb-1">
              This page is free from (tracking) cookies or similar technologies. We delete access
              logs after 3 months.
            </p>
            <p class="text-gray-500 mt-1 mb-0">Last Updated: April 11, 2025</p>
          </div>

          <!-- Dutch Summary -->
          <div v-else class="prose max-w-none text-gray-800">
            <p class="mb-1">
              Deze pagina is vrij van (tracking) cookies of vergelijkbare technologieën. We
              verwijderen toegangslogboeken na 3 maanden.
            </p>
            <p class="text-gray-500 mt-1 mb-0">Laatst bijgewerkt: 11 april 2025</p>
          </div>

          <!-- View Complete Policy Button -->
          <button
            class="view-complete-policy"
            aria-expanded="false"
            aria-controls="full-policy-content"
            @click="expandPolicy"
          >
            {{ currentLanguage === 'nl' ? 'Bekijk volledig beleid' : 'View complete policy' }}
            <i class="fa-solid fa-chevron-right ml-1" aria-hidden="true"></i>
          </button>

          <!-- Download link in summary view -->
          <div class="download-link-summary">
            <a
              href="#"
              class="text-brand-blue hover:underline flex items-center justify-center text-sm"
              @click.prevent="downloadPolicy"
            >
              <i class="fa-solid fa-download mr-1" aria-hidden="true"></i>
              {{ currentLanguage === 'nl' ? 'Download cookiebeleid' : 'Download cookie policy' }}
            </a>
          </div>
        </div>

        <!-- Full Policy Content -->
        <div v-else id="full-policy-content" class="full-policy">
          <button class="back-to-summary" aria-label="Back to summary" @click="collapsePolicy">
            <i class="fa-solid fa-chevron-left mr-2" aria-hidden="true"></i>
            {{ currentLanguage === 'nl' ? 'Terug naar samenvatting' : 'Back to summary' }}
          </button>

          <!-- English Full Content -->
          <div v-if="currentLanguage === 'en'" class="prose max-w-none text-gray-800">
            <p>
              This page is free from (tracking) cookies or similar technologies. We delete access
              logs after 3 months.
            </p>

            <p class="text-gray-500 mt-4">Last Updated: April 11, 2025</p>

            <h3 class="text-xl font-semibold mt-4 mb-2">Why We Don't Use Cookies</h3>
            <p>
              At Team Blaeu, we prioritize your privacy and data protection rights. We have designed
              our website to function without the need for cookies or similar tracking technologies.
              This means:
            </p>
            <ul class="custom-bullet-list">
              <li>No tracking of your browsing behavior on our site</li>
              <li>No collection of personal data through cookies</li>
              <li>No third-party advertising cookies</li>
              <li>No unnecessary data storage on your device</li>
            </ul>

            <h3 class="text-xl font-semibold mt-4 mb-2">Server Logs</h3>
            <p>
              While we do maintain standard server logs for security and operational purposes, these
              logs are automatically deleted after 3 months. Server logs may include:
            </p>
            <ul class="custom-bullet-list">
              <li>IP addresses</li>
              <li>Browser type and version</li>
              <li>Date and time of access</li>
              <li>Pages visited</li>
            </ul>
            <p>
              These logs are maintained solely for the purpose of ensuring the security and proper
              functioning of our website and are not used for tracking or profiling visitors.
            </p>

            <h3 class="text-xl font-semibold mt-4 mb-2">Privacy By Design: Local Storage Usage</h3>
            <p>We use local storage in your browser for the following specific purposes:</p>
            <ol class="list-decimal pl-6 space-y-2">
              <li>
                <strong>Accessibility Preferences (accessibility-state):</strong>
                Our accessibility widget stores your accessibility preferences in local storage to
                remember your settings between visits. These preferences include text size, contrast
                mode, focus indicators, reduced motion settings, font family, widget position, and
                your preferred language for keyboard shortcuts (English or Dutch). This allows us to
                optimize your WCAG preferences.
              </li>
              <li>
                <strong>Cookie Notice Acknowledgment (cookie-policy-shown):</strong>
                We record when you've viewed our cookie policy. This stops the blinking notification
                after your first visit, providing a better user experience while still meeting
                regulatory requirements to inform users about our Cookie Policy.
              </li>
              <li>
                <strong>Video Settings (dashjs_video_settings, dashjs_video_bitrate):</strong>
                We use the Dash.js component for displaying videos and store minimal technical
                information about your video codec and preferred bitrate. This allows us to optimize
                video loading and streaming quality when the same video appears multiple times on a
                page.
              </li>
            </ol>
            <p class="mt-2">
              Unlike cookies, local storage data stays on your device and is not sent to our servers
              with each request. You can clear local storage at any time through your browser
              settings or by using your browser's private/incognito mode.
            </p>

            <h3 class="text-xl font-semibold mt-6 mb-2">Your Rights</h3>
            <p>
              Under the General Data Protection Regulation (GDPR), you have rights regarding your
              personal data. For more information about how we handle personal data, please refer to
              our Privacy Statement.
            </p>

            <p class="text-sm text-gray-500 mt-6">
              If there is an inconsistency between the Dutch and English-language version of these
              regulations, the Dutch version takes precedence.
            </p>

            <div class="download-link mt-6">
              <a
                href="#"
                class="text-brand-blue hover:underline flex items-center"
                @click.prevent="downloadPolicy"
              >
                <i class="fa-solid fa-download mr-2" aria-hidden="true"></i>
                Download cookie policy
              </a>
            </div>
          </div>

          <!-- Dutch Full Content -->
          <div v-else class="prose max-w-none text-gray-800">
            <p>
              Deze pagina is vrij van (tracking) cookies of vergelijkbare technologieën. We
              verwijderen toegangslogboeken na 3 maanden.
            </p>

            <p class="text-gray-500 mt-4">Laatst bijgewerkt: 11 april 2025</p>

            <h3 class="text-xl font-semibold mt-4 mb-2">Waarom wij geen cookies gebruiken</h3>
            <p>
              Bij Team Blaeu geven wij prioriteit aan uw privacy en gegevensbeschermingsrechten. We
              hebben onze website ontworpen om te functioneren zonder cookies of vergelijkbare
              tracking-technologieën. Dit betekent:
            </p>
            <ul class="custom-bullet-list">
              <li>Geen tracking van uw surfgedrag op onze site</li>
              <li>Geen verzameling van persoonlijke gegevens via cookies</li>
              <li>Geen cookies van derden voor advertenties</li>
              <li>Geen onnodige gegevensopslag op uw apparaat</li>
            </ul>

            <h3 class="text-xl font-semibold mt-4 mb-2">Serverlogboeken</h3>
            <p>
              Hoewel we standaard serverlogboeken bijhouden voor beveiligings- en operationele
              doeleinden, worden deze logboeken automatisch na 3 maanden verwijderd. Serverlogboeken
              kunnen bevatten:
            </p>
            <ul class="custom-bullet-list">
              <li>IP-adressen</li>
              <li>Browsertype en -versie</li>
              <li>Datum en tijd van toegang</li>
              <li>Bezochte pagina's</li>
            </ul>
            <p>
              Deze logboeken worden uitsluitend bijgehouden om de veiligheid en goede werking van
              onze website te waarborgen en worden niet gebruikt voor het volgen of profileren van
              bezoekers.
            </p>

            <h3 class="text-xl font-semibold mt-4 mb-2">
              Privacy by design: gebruik van local storage
            </h3>
            <p>We gebruiken local storage in uw browser voor de volgende specifieke doeleinden:</p>
            <ol class="list-decimal pl-6 space-y-2">
              <li>
                <strong>Toegankelijkheidsvoorkeuren (accessibility-state):</strong>
                Onze toegankelijkheidswidget slaat uw toegankelijkheidsvoorkeuren op in local
                storage om uw instellingen tussen bezoeken te onthouden. Deze voorkeuren omvatten
                tekstgrootte, contrastmodus, focusindicatoren, instellingen voor verminderde
                beweging, lettertype, widgetpositie, en uw voorkeurstaal voor
                toetsenbordsnelkoppelingen (Nederlands of Engels). Dit stelt ons in staat om uw
                WCAG-voorkeuren te optimaliseren.
              </li>
              <li>
                <strong>Informatievereiste (cookie-policy-shown):</strong>
                We registreren dat (niet wanneer) u ons cookiebeleid heeft bekeken. Dit stopt de
                knipperende notificatie na uw eerste bezoek, wat zorgt voor een betere
                gebruikerservaring terwijl we nog steeds voldoen aan de wettelijke vereisten om
                gebruikers te informeren over ons Cookiebeleid.
              </li>
              <li>
                <strong>Video-instellingen (dashjs_video_settings, dashjs_video_bitrate):</strong>
                We gebruiken de Dash.js component voor het tonen van video's en slaan minimale
                technische informatie op over uw video codec en voorkeurs-bitrate. Dit stelt ons in
                staat om het laden van video's en de streamingkwaliteit te optimaliseren wanneer
                dezelfde video meerdere keren op een pagina verschijnt.
              </li>
            </ol>
            <p class="mt-2">
              In tegenstelling tot cookies blijven local storage gegevens op uw apparaat en worden
              ze niet met elke aanvraag naar onze servers gestuurd. U kunt local storage op elk
              moment wissen via uw browserinstellingen of door gebruik te maken van de
              privé/incognito-modus van uw browser.
            </p>

            <h3 class="text-xl font-semibold mt-4 mb-2">Uw rechten</h3>
            <p>
              Onder de Algemene Verordening Gegevensbescherming (AVG) heeft u rechten met betrekking
              tot uw persoonsgegevens. Voor meer informatie over hoe wij met persoonsgegevens
              omgaan, verwijzen wij u naar onze
              <a
                href="#"
                class="text-brand-blue hover:underline"
                @click.prevent="showPrivacyPolicy"
              >
                Privacyverklaring
              </a>
              .
            </p>

            <div class="download-link mt-6">
              <a
                href="#"
                class="text-brand-blue hover:underline flex items-center"
                @click.prevent="downloadPolicy"
              >
                <i class="fa-solid fa-download mr-2" aria-hidden="true"></i>
                Download cookiebeleid
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
  import { isHTMLElement, type KeyboardEventHandler, type MouseEventHandler } from '~/types/events'

  // Helper to safely create cookie bite icon (Trusted Types compatible)
  const createCookieIcon = (): HTMLElement => {
    const icon = document.createElement('i')
    icon.className = 'fa-solid fa-cookie-bite text-xl'
    icon.setAttribute('aria-hidden', 'true')
    return icon
  }

  // Helper to safely update toggle button icon
  const updateToggleButtonIcon = (toggleBtn: HTMLElement): void => {
    // Clear existing content
    toggleBtn.innerHTML = ''
    // Append new icon
    toggleBtn.appendChild(createCookieIcon())
  }

  const isOpen = ref(false)
  const isPolicyExpanded = ref(false)
  // Use computed property with getter/setter to sync with globalState
  const currentLanguage = computed({
    get: () => globalState.languagePreference,
    set: value => {
      globalState.languagePreference = value
    },
  })

  // Ensure immediate synchronization on component mount
  const forceLanguageSync = async (): Promise<void> => {
    // For static sites: Force reactivity update and ensure DOM updates
    const current = globalState.languagePreference
    globalState.languagePreference = current
    // Wait for DOM to update in static site context
    await nextTick()
  }
  const position = ref('bottom-right') // Default position
  const isBlinking = ref(false)
  const hasBeenOpenedBefore = ref(false)
  const isScrolledDown = ref(false)
  let keyboardHandler: KeyboardEventHandler | null = null
  let documentClickHandler: MouseEventHandler | null = null
  let scrollHandler: (() => void) | null = null
  const widgetRef = ref<HTMLElement | null>(null)

  // Export methods for external use
  defineExpose({
    openWidget: (language?: 'en' | 'nl') => {
      // If language is provided, use it; otherwise keep existing language from global state
      if (language) {
        currentLanguage.value = language
      }
      isOpen.value = true

      // Always store that widget has been opened in localStorage and update state
      if (process.client) {
        try {
          localStorage.setItem('cookie-policy-shown', 'true')
          hasBeenOpenedBefore.value = true

          // Stop blinking immediately when widget is opened
          isBlinking.value = false

          // Use $nextTick to avoid layout thrashing
          nextTick(() => {
            // Use ref-based DOM manipulation instead of querySelector for better performance
            const toggleBtn = document.querySelector('.cookie-policy-widget-toggle')
            if (isHTMLElement(toggleBtn)) {
              const baseColor = globalState.reduceMotion ? '#cc2200' : '#0055aa'
              // Apply all style changes at once to reduce reflows
              Object.assign(toggleBtn.style, {
                backgroundColor: baseColor,
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                outline: 'none',
              })
              updateToggleButtonIcon(toggleBtn)
            }
          })
        } catch (err) {
          // eslint-disable-next-line no-console
          console.error('Error writing to localStorage:', err)
        }
      }

      // Announce to screen readers
      const { $announce } = useNuxtApp()
      if ($announce) {
        $announce('Cookie policy menu opened', 'assertive')
      }
    },
    openFullPolicy: (language?: 'en' | 'nl') => {
      // If language is provided, use it; otherwise keep existing language from global state
      if (language) {
        currentLanguage.value = language
      }
      isOpen.value = true
      isPolicyExpanded.value = true

      // Always store that widget has been opened in localStorage and update state
      if (process.client) {
        try {
          localStorage.setItem('cookie-policy-shown', 'true')
          hasBeenOpenedBefore.value = true

          // Stop blinking immediately when widget is opened
          isBlinking.value = false

          // Use $nextTick to avoid layout thrashing
          nextTick(() => {
            // Use ref-based DOM manipulation instead of querySelector for better performance
            const toggleBtn = document.querySelector('.cookie-policy-widget-toggle')
            if (isHTMLElement(toggleBtn)) {
              const baseColor = globalState.reduceMotion ? '#cc2200' : '#0055aa'
              // Apply all style changes at once to reduce reflows
              Object.assign(toggleBtn.style, {
                backgroundColor: baseColor,
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                outline: 'none',
              })
              updateToggleButtonIcon(toggleBtn)
            }
          })
        } catch (err) {
          // eslint-disable-next-line no-console
          console.error('Error writing to localStorage:', err)
        }
      }

      // Announce to screen readers
      const { $announce } = useNuxtApp()
      if ($announce) {
        $announce('Complete cookie policy expanded', 'assertive')
      }
    },
  })

  const positionClass = computed(() => {
    return `cookie-policy-widget-${position.value}`
  })

  const toggleWidget = (): void => {
    isOpen.value = !isOpen.value

    // If widget is closed, reset expanded state
    if (!isOpen.value) {
      isPolicyExpanded.value = false
    } else {
      // Always store that widget has been opened in localStorage and update state
      if (process.client) {
        // Use requestAnimationFrame to defer non-critical operations
        requestAnimationFrame(() => {
          try {
            localStorage.setItem('cookie-policy-shown', 'true')
            hasBeenOpenedBefore.value = true

            // Stop blinking immediately when widget is opened
            isBlinking.value = false

            // Use nextTick to avoid layout thrashing
            nextTick(() => {
              // Reset the button appearance to ensure focus ring is removed
              const toggleBtn = document.querySelector('.cookie-policy-widget-toggle')
              if (isHTMLElement(toggleBtn)) {
                const baseColor = globalState.reduceMotion ? '#cc2200' : '#0055aa'
                // Batch style changes to reduce reflows
                Object.assign(toggleBtn.style, {
                  backgroundColor: baseColor,
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                  outline: 'none',
                })
                updateToggleButtonIcon(toggleBtn)
              }
            })
          } catch (err) {
            // eslint-disable-next-line no-console
            console.error('Error writing to localStorage:', err)
          }
        })
      }
    }

    // Announce to screen readers
    const { $announce } = useNuxtApp()
    if ($announce) {
      $announce(
        isOpen.value ? 'Cookie policy menu opened' : 'Cookie policy menu closed',
        'assertive'
      )
    }
  }

  const closeWidget = (): void => {
    isOpen.value = false
    isPolicyExpanded.value = false

    // Clear active widget in global state if this was the active one
    if (globalState.activeWidget === 'cookie') {
      globalState.activeWidget = null
    }
  }

  const expandPolicy = (): void => {
    isPolicyExpanded.value = true

    // Announce to screen readers
    const { $announce } = useNuxtApp()
    if ($announce) {
      $announce('Complete cookie policy expanded', 'polite')
    }
  }

  const collapsePolicy = (): void => {
    isPolicyExpanded.value = false

    // Announce to screen readers
    const { $announce } = useNuxtApp()
    if ($announce) {
      $announce('Returned to cookie policy summary', 'polite')
    }
  }

  const showPrivacyPolicy = (): void => {
    // Emit an event to show privacy policy modal
    const evt = new CustomEvent('show-privacy-policy', {
      detail: { language: currentLanguage.value },
    })
    document.dispatchEvent(evt)

    // Close this widget
    closeWidget()
  }

  const downloadPolicy = (): void => {
    // Determine language-specific content and filename
    const isNL = currentLanguage.value === 'nl'
    const fileName = isNL ? 'cookiebeleid-blaeu.txt' : 'cookie-policy-blaeu.txt'

    // Generate the content based on the selected language
    let content = ''

    if (isNL) {
      content = `COOKIEBELEID - TEAM BLAEU (BLAEU PRIVACY RESPONSE TEAM B.V.)
Laatst bijgewerkt: 11 april 2025

Deze pagina is vrij van (tracking) cookies of vergelijkbare technologieën. We verwijderen toegangslogboeken na 3 maanden.

WAAROM WIJ GEEN COOKIES GEBRUIKEN
Bij Team Blaeu geven wij prioriteit aan uw privacy en gegevensbeschermingsrechten. We hebben onze website ontworpen om te functioneren zonder cookies of vergelijkbare tracking-technologieën. Dit betekent:
- Geen tracking van uw surfgedrag op onze site
- Geen verzameling van persoonlijke gegevens via cookies
- Geen cookies van derden voor advertenties
- Geen onnodige gegevensopslag op uw apparaat

SERVERLOGBOEKEN
Hoewel we standaard serverlogboeken bijhouden voor beveiligings- en operationele doeleinden, worden deze logboeken automatisch na 3 maanden verwijderd. Serverlogboeken kunnen bevatten:
- IP-adressen
- Browsertype en -versie
- Datum en tijd van toegang
- Bezochte pagina's

Deze logboeken worden uitsluitend bijgehouden om de veiligheid en goede werking van onze website te waarborgen en worden niet gebruikt voor het volgen of profileren van bezoekers.

PRIVACY BY DESIGN: VIDEO COMPONENT
We gebruiken de Dash.js component voor het tonen van video's op onze website. Deze component hebben we dusdanig geconfigureerd dat we geen gebruik maken van cookies. We slaan de gebruikte video codec op in de local storage van de browser (bijvoorbeeld, dashjs_video_settings - codec: "video/mp4;codecs="avc1.42c01e""). Een video codec is een stuk software of hardware dat video-informatie comprimeert en decomprimeert. Als de video meerdere keren aanwezig is op een pagina, zoals op de homepage, dan laden we deze niet dubbel. Zo besparen we netwerkverkeer en is het laden van de pagina sneller.

PRIVACY BY DESIGN: LOCAL STORAGE GEBRUIK
We gebruiken local storage in uw browser voor de volgende specifieke doeleinden:

1. Toegankelijkheidsvoorkeuren (accessibility-state): Onze toegankelijkheidswidget slaat uw toegankelijkheidsvoorkeuren op in local storage om uw instellingen tussen bezoeken te onthouden. Deze voorkeuren omvatten tekstgrootte, contrastmodus, focusindicatoren, instellingen voor verminderde beweging, lettertype, links/rechtshandige widget-positionering, en uw voorkeurstaal voor toetsenbordsnelkoppelingen (Nederlands of Engels).

2. Informatievereiste (cookie-policy-shown): We registreren dat (niet wanneer) u ons cookiebeleid heeft bekeken. Dit stopt de knipperende notificatie na uw eerste bezoek, wat zorgt voor een betere gebruikerservaring terwijl we nog steeds voldoen aan de wettelijke vereisten om gebruikers te informeren over ons Cookiebeleid.

3. Video-instellingen (dashjs_video_settings, dashjs_video_bitrate): We gebruiken de Dash.js component voor het tonen van video's en slaan minimale technische informatie op over uw video codec en voorkeurs-bitrate. Dit stelt ons in staat om het laden van video's te optimaliseren wanneer dezelfde video meerdere keren op een pagina verschijnt.

UW RECHTEN
Onder de Algemene Verordening Gegevensbescherming (AVG) heeft u rechten met betrekking tot uw persoonsgegevens. Voor meer informatie over hoe wij met persoonsgegevens omgaan, verwijzen wij u naar onze Privacyverklaring.`
    } else {
      content = `COOKIE POLICY - TEAM BLAEU (BLAEU PRIVACY RESPONSE TEAM B.V.)
Last Updated: April 11, 2025

This page is free from (tracking) cookies or similar technologies. We delete access logs after 3 months.

WHY WE DON'T USE COOKIES
At Team Blaeu, we prioritize your privacy and data protection rights. We have designed our website to function without the need for cookies or similar tracking technologies. This means:
- No tracking of your browsing behavior on our site
- No collection of personal data through cookies
- No third-party advertising cookies
- No unnecessary data storage on your device

SERVER LOGS
While we do maintain standard server logs for security and operational purposes, these logs are automatically deleted after 3 months. Server logs may include:
- IP addresses
- Browser type and version
- Date and time of access
- Pages visited

These logs are maintained solely for the purpose of ensuring the security and proper functioning of our website and are not used for tracking or profiling visitors.

PRIVACY BY DESIGN: VIDEO COMPONENT
We use the Dash.js component for displaying videos on our website. We have configured this component in such a way that we do not use cookies. We store the used video codec in the local storage of the browser (e.g., dashjs_video_settings - codec: "video/mp4;codecs="avc1.42c01e""). A video codec is a piece of software or hardware that compresses and decompresses video information. If the video appears multiple times on a page, such as on the homepage, we don't load it twice. This saves network traffic and makes the page load faster.

PRIVACY BY DESIGN: LOCAL STORAGE USAGE
We use local storage in your browser for the following specific purposes:

1. Accessibility Preferences (accessibility-state): Our accessibility widget stores your accessibility preferences in local storage to remember your settings between visits. These preferences include text size, contrast mode, focus indicators, reduced motion settings, font family, left/right-handed widget positioning, and your preferred language for keyboard shortcuts (English or Dutch).

2. Cookie Notice Acknowledgment (cookie-policy-shown): We record when you've viewed our cookie policy. This stops the blinking notification after your first visit, providing a better user experience while still meeting regulatory requirements to inform users about our Cookie Policy.

3. Video Settings (dashjs_video_settings, dashjs_video_bitrate): We use the Dash.js component for displaying videos and store minimal technical information about your video codec and preferred bitrate. This allows us to optimize video loading when the same video appears multiple times on a page.

YOUR RIGHTS
Under the General Data Protection Regulation (GDPR), you have rights regarding your personal data. For more information about how we handle personal data, please refer to our Privacy Statement.

If there is an inconsistency between the Dutch and English-language version of these regulations, the Dutch version takes precedence.`
    }

    // Create a blob with the text content
    const blob = new Blob([content], { type: 'text/plain' })

    // Create a URL for the blob
    const url = URL.createObjectURL(blob)

    // Create a temporary link element
    const a = document.createElement('a')
    a.href = url
    a.download = fileName

    // Append to the body, click, and remove
    document.body.appendChild(a)
    a.click()

    // Clean up
    setTimeout(() => {
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }, 100)

    // Announce to screen readers
    const { $announce } = useNuxtApp()
    if ($announce) {
      $announce(
        isNL ? 'Cookiebeleid wordt gedownload' : 'Cookie policy is being downloaded',
        'polite'
      )
    }
  }

  // Watch global state for position - using the exact same simple approach as TermsWidget
  watch(
    () => globalState.widgetPosition,
    newValue => {
      if (position.value !== newValue) {
        position.value = newValue
      }
    }
  )

  // Simplified, direct state manipulation version
  const startBlinkingToggle = (): void => {
    // Fixed color values
    const normalBlinkColor = '#00A8E6' // Blue
    const normalBaseColor = '#0055aa' // Darker blue
    const reducedMotionBlinkColor = '#ff3300' // Bright red for reduced motion
    const reducedMotionBaseColor = '#cc2200' // Darker red for reduced motion

    // Get a reference to the button
    let toggleBtn = null

    // Reset button to base state
    const resetButtonToBaseState = (): void => {
      isBlinking.value = false
      toggleBtn = document.querySelector('.cookie-policy-widget-toggle')
      if (isHTMLElement(toggleBtn)) {
        const baseColor = globalState.reduceMotion ? '#cc2200' : '#0055aa'
        Object.assign(toggleBtn.style, {
          backgroundColor: baseColor,
          transform: '',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
          outline: 'none',
        })
        updateToggleButtonIcon(toggleBtn)
      }
    }

    // Update scroll state
    const updateScrollState = (): void => {
      const currentScrollY = window.scrollY
      const windowHeight = window.innerHeight || document.documentElement.clientHeight
      const backToTopVisible = currentScrollY > windowHeight

      if (isScrolledDown.value !== backToTopVisible) {
        isScrolledDown.value = backToTopVisible
        if (backToTopVisible) {
          isBlinking.value = false
        }
      }
    }

    // Apply visual blinking effects
    const applyBlinkingEffects = (): void => {
      toggleBtn = document.querySelector('.cookie-policy-widget-toggle')

      if (isHTMLElement(toggleBtn)) {
        if (isBlinking.value) {
          Object.assign(toggleBtn.style, {
            backgroundColor: globalState.reduceMotion ? reducedMotionBlinkColor : normalBlinkColor,
            transform: 'translateY(-8px)',
            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.4)',
            outline: '4px solid #ffcc00',
            outlineOffset: '4px',
          })
        } else {
          Object.assign(toggleBtn.style, {
            backgroundColor: globalState.reduceMotion ? reducedMotionBaseColor : normalBaseColor,
            transform: '',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
            outline: 'none',
            outlineOffset: '0',
          })
        }
        updateToggleButtonIcon(toggleBtn)
      }
    }

    // Get next delay based on settings
    const getNextDelay = (): number => {
      return globalState.reduceMotion ? 2000 : 1000
    }

    // Set up the toggle function
    const toggleBlinkingState = (): void => {
      if (hasBeenOpenedBefore.value) {
        resetButtonToBaseState()
        return
      }

      updateScrollState()
      const policyShown = hasBeenOpenedBefore.value

      if (!policyShown && !isScrolledDown.value) {
        isBlinking.value = !isBlinking.value
        applyBlinkingEffects()
        setTimeout(toggleBlinkingState, getNextDelay())
      } else if (isScrolledDown.value && !hasBeenOpenedBefore.value) {
        setTimeout(toggleBlinkingState, 1000)
      }
    }

    // Start the toggling with a short delay
    setTimeout(toggleBlinkingState, 100)
  }

  // Watch reduced motion setting to restart the blinking with updated timing
  watch(
    () => globalState.reduceMotion,
    _newValue => {
      // Restart blinking when reduced motion changes (if not already seen)
      if (process.client && !hasBeenOpenedBefore.value) {
        isBlinking.value = false // Reset state

        // Start with a short delay
        setTimeout(() => {
          startBlinkingToggle()
        }, 100)
      }
    }
  )

  // Define scroll handler in component scope for proper cleanup
  let lastScrollTime = 0
  const throttledScrollHandler = (): void => {
    const now = Date.now()
    if (now - lastScrollTime > 100) {
      // Throttle to max once per 100ms
      lastScrollTime = now
      if (scrollHandler) {
        scrollHandler()
      }
    }
  }

  // Define event handler functions in component scope for proper cleanup
  const privacyPolicyHandler = (event: Event): void => {
    // Update language if provided, otherwise use the global languagePreference
    const customEvent = event as CustomEvent
    if (customEvent.detail && customEvent.detail.language) {
      currentLanguage.value = customEvent.detail.language
    }
  }

  const closeAllWidgetsHandler = (event: CustomEvent): void => {
    // Check if we should ignore this widget
    if (event.detail && event.detail.except !== 'cookie') {
      closeWidget()
    }
  }

  const positionUpdateHandler = (event: CustomEvent): void => {
    if (event.detail && event.detail.position) {
      // Update the position
      position.value = event.detail.position

      // Update data attribute for CSS targeting
      document.documentElement.setAttribute('data-widget-position', event.detail.position)

      // Also update localStorage for persistence
      try {
        // Update primary storage
        const savedState = localStorage.getItem('accessibility-state')
        if (savedState) {
          const state = JSON.parse(savedState)
          state.widgetPosition = position.value
          localStorage.setItem('accessibility-state', JSON.stringify(state))
        }

        // Legacy storage updates for position removed
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Error updating position in localStorage:', err)
      }
    }
  }

  const openCookieWidgetHandler = (event: Event): void => {
    // First, trigger the close-all-widgets event
    const closeEvent = new CustomEvent('close-all-widgets', {
      detail: { except: 'cookie' },
    })
    document.dispatchEvent(closeEvent)

    // Update language if provided
    const customEvent = event as CustomEvent
    if (customEvent.detail && customEvent.detail.language) {
      currentLanguage.value = customEvent.detail.language
    }

    // Open widget
    isOpen.value = true

    // Update global state to track active widget
    globalState.activeWidget = 'cookie'

    // Always store that widget has been opened in localStorage and update state
    // Use requestAnimationFrame to defer localStorage operations
    requestAnimationFrame(() => {
      try {
        localStorage.setItem('cookie-policy-shown', 'true')
        hasBeenOpenedBefore.value = true

        // Stop blinking immediately when widget is opened
        isBlinking.value = false
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Error writing to localStorage:', err)
      }

      // Announce to screen readers
      const { $announce } = useNuxtApp()
      if ($announce) {
        $announce('Cookie policy menu opened', 'assertive')
      }
    })
  }

  const setupCookiePolicyCheck = (): void => {
    if (!process.client) return

    const checkCookiePolicyShown = (): void => {
      try {
        const storedValue = localStorage.getItem('cookie-policy-shown')
        hasBeenOpenedBefore.value = storedValue === 'true'
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Error reading from localStorage:', err)
        hasBeenOpenedBefore.value = false
      }
    }

    if (window.requestIdleCallback) {
      window.requestIdleCallback(checkCookiePolicyShown)
    } else {
      setTimeout(checkCookiePolicyShown, 0)
    }
  }

  const setupScrollHandling = (): void => {
    if (!process.client) return

    scrollHandler = (): void => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight || document.documentElement.clientHeight
      const backToTopVisible = scrollPosition > windowHeight

      if (isScrolledDown.value !== backToTopVisible) {
        isScrolledDown.value = backToTopVisible

        if (backToTopVisible) {
          isBlinking.value = false
          const toggleBtn = document.querySelector('.cookie-policy-widget-toggle')
          if (isHTMLElement(toggleBtn)) {
            const baseColor = globalState.reduceMotion ? '#cc2200' : '#0055aa'
            toggleBtn.style.backgroundColor = baseColor
            toggleBtn.style.transform = ''
            toggleBtn.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.2)'
            toggleBtn.style.outline = 'none'
            updateToggleButtonIcon(toggleBtn)
          }
        }
      }
    }

    const initialScrollPosition = window.scrollY
    const initialBackToTopVisible = initialScrollPosition > 300
    isScrolledDown.value = initialBackToTopVisible

    if (initialBackToTopVisible) {
      isBlinking.value = false
    }

    window.addEventListener('scroll', throttledScrollHandler)
    setTimeout(scrollHandler, 100)
  }

  const setupEventHandlers = (): void => {
    keyboardHandler = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        if (isPolicyExpanded.value) {
          collapsePolicy()
        } else if (isOpen.value) {
          closeWidget()
        }
      }
    }
    if (keyboardHandler) {
      document.addEventListener('keydown', keyboardHandler)
    }

    documentClickHandler = (e: Event): void => {
      if (
        isOpen.value &&
        widgetRef.value &&
        e.target instanceof Element &&
        !widgetRef.value.contains(e.target)
      ) {
        closeWidget()
      }
    }
    if (documentClickHandler) {
      document.addEventListener('mousedown', documentClickHandler)
    }

    document.addEventListener('show-privacy-policy', privacyPolicyHandler)
    document.addEventListener('close-all-widgets', closeAllWidgetsHandler)
    document.addEventListener('update-widget-position', positionUpdateHandler)
    document.addEventListener('open-cookie-widget', openCookieWidgetHandler)
  }

  onMounted(async () => {
    await forceLanguageSync()

    if (globalState.widgetPosition) {
      position.value = globalState.widgetPosition
    }

    setupCookiePolicyCheck()

    if (process.client) {
      isBlinking.value = !hasBeenOpenedBefore.value

      if (!hasBeenOpenedBefore.value && !isScrolledDown.value) {
        setTimeout(startBlinkingToggle, 1000)
      }
    }

    setupScrollHandling()
    setupEventHandlers()
  })

  // Add watcher for global language preference
  // No need to watch since we're now using a computed property directly
  // and we already update globalState directly from the handleLanguageChange function

  onBeforeUnmount(() => {
    // Clean up event listeners
    if (keyboardHandler) {
      document.removeEventListener('keydown', keyboardHandler)
    }
    if (documentClickHandler) {
      document.removeEventListener('mousedown', documentClickHandler)
    }
    document.removeEventListener('show-privacy-policy', privacyPolicyHandler)
    document.removeEventListener('close-all-widgets', closeAllWidgetsHandler)
    document.removeEventListener('update-widget-position', positionUpdateHandler)
    document.removeEventListener('open-cookie-widget', openCookieWidgetHandler)

    // Clean up scroll handler
    if (throttledScrollHandler) {
      window.removeEventListener('scroll', throttledScrollHandler)
    }

    // No cleanup needed for orientation handlers - removed for consistency with TermsWidget
  })
</script>

<style scoped>
  .cookie-policy-widget {
    position: fixed;
    z-index: 52 !important; /* Match z-index from main.css */
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

  /* Position widget between back-to-top and accessibility widget */
  .cookie-policy-widget-bottom-left {
    bottom: 78px !important; /* Fine-tuned to balance spacing between widgets */
    left: 20px !important;
  }

  .cookie-policy-widget-bottom-right {
    bottom: 78px !important; /* Fine-tuned to balance spacing between widgets */
    right: 20px !important;
  }

  /* Toggle button */
  .cookie-policy-widget-toggle {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #00a8e6;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    cursor: pointer;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transition: all 0.2s ease;
    font-size: 1.25rem;
    position: relative;
  }

  .cookie-policy-widget-toggle::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 50%;
    border: 1px solid rgba(255, 255, 255, 0.3);
    transition: all 0.2s ease;
  }

  .cookie-policy-widget-toggle:hover {
    background-color: #005bb8;
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.25);
  }

  .cookie-policy-widget-toggle:hover::after {
    border-color: rgba(255, 255, 255, 0.5);
  }

  .cookie-policy-widget-toggle:focus-visible {
    outline: 2px solid #ffcc00;
    outline-offset: 2px;
  }

  /* Style for toggle button when panel is open - match accessibility widget behavior */
  .cookie-policy-widget-toggle-open {
    background-color: #0095cc !important; /* Darker brand blue to indicate active state */
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.25);
    z-index: 5001 !important; /* Keep above the panel */
  }

  /* No CSS animations - all visual effects controlled via JS */
  .cookie-policy-widget-toggle-blinking {
    /* Base styles only - all animation done via direct DOM manipulation */
    position: relative;
    z-index: 60 !important; /* Increase z-index while blinking */
    transition: none !important; /* Disable transitions to prevent interference */
  }

  /* We keep the animation even with reduced motion preference since it's an important accessibility nudge
   and requirement 4 specifies it should not be dependent on reduced motion settings */

  /* Widget panel */
  .cookie-policy-widget-panel {
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
    z-index: 3000; /* Ensure it's higher than other widget buttons (52-54) and their panels (2000) */
  }

  .cookie-policy-widget-panel.open {
    display: flex;
  }

  /* Expanded panel for full policy - desktop view */
  .cookie-policy-widget-panel.expanded {
    width: min(90vw, 650px);
    height: max-content;
    max-height: 85vh; /* Slightly increased max-height for better content visibility */
    overflow-y: auto;
  }

  /* Full screen in mobile mode */
  @media (max-width: 640px) {
    .cookie-policy-widget-panel.expanded {
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

    /* Sticky header for mobile view */
    .cookie-policy-widget-panel.expanded .cookie-policy-widget-header {
      position: sticky !important;
      top: 0 !important;
      background: white !important;
      padding: 1rem !important;
      z-index: 10 !important;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1) !important;
      width: 100% !important;
    }

    /* Adjust cookie policy content for mobile */
    .cookie-policy-widget-panel.expanded .cookie-policy-widget-content {
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
  .cookie-policy-widget-top-left .cookie-policy-widget-panel {
    top: 60px;
    left: 0;
  }

  .cookie-policy-widget-top-right .cookie-policy-widget-panel {
    top: 60px;
    right: 0;
  }

  .cookie-policy-widget-bottom-left .cookie-policy-widget-panel {
    bottom: 60px; /* Adjusted position */
    left: 0;
  }

  .cookie-policy-widget-bottom-right .cookie-policy-widget-panel {
    bottom: 60px; /* Adjusted position */
    right: 0;
  }

  /* Panel header */
  .cookie-policy-widget-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #eaeaea;
    padding-bottom: 10px; /* Reduced from 12px */
    margin-bottom: 2px; /* Reduced from 4px */
  }

  .cookie-policy-widget-title {
    font-size: 16px;
    font-weight: 600;
    color: #333;
    margin: 0;
  }

  .cookie-policy-widget-close {
    background: transparent;
    border: none;
    color: #777;
    cursor: pointer;
    padding: 4px;
    border-radius: 4px;
  }

  .cookie-policy-widget-close:hover {
    color: #333;
    background-color: #f5f5f5;
  }

  .cookie-policy-widget-close:focus-visible {
    outline: 2px solid #00a8e6;
    outline-offset: 2px;
  }

  /* Widget content */
  .cookie-policy-widget-content {
    display: flex;
    flex-direction: column;
    gap: 12px; /* Reduced from 16px to match terms widget */
    padding-bottom: 0; /* Remove bottom padding */
  }

  /* Language selector */
  .cookie-policy-language-selector {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 4px; /* Reduced from 8px */
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
    margin-bottom: 0; /* Remove extra margin at bottom */
  }

  .view-complete-policy {
    margin-top: 6px;
    margin-bottom: 0;
    padding: 6px;
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
    margin-top: 2px;
    margin-bottom: 0;
    text-align: center;
    padding: 2px 4px 0 4px;
    border-top: 1px solid #f0f0f0;
  }

  .download-link-summary a {
    font-size: 13px;
    color: #00a8e6;
    padding: 4px;
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
    max-height: calc(70vh - 160px);
    overflow-y: auto;
    padding-right: 8px;
  }

  @media (max-width: 640px) {
    .full-policy {
      max-height: calc(100vh - 12rem); /* Account for header, nav, etc. */
      padding-right: 0;
      padding-bottom: 4rem; /* Extra padding at bottom for scrolling */
      width: 100%;
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
    }

    .full-policy .back-to-summary {
      padding: 12px 8px;
      margin-bottom: 1.5rem;
      font-size: 16px;
      width: 100%;
      display: flex;
      justify-content: flex-start;
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
    .cookie-policy-widget-toggle,
    .cookie-policy-widget-panel {
      transition: none;
    }
  }

  /* Handle high contrast mode */
  :global(.high-contrast-mode) .cookie-policy-widget-toggle {
    background-color: #000;
    color: #fff;
    border: 2px solid #fff;
  }

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
  .cookie-policy-widget-open .cookie-policy-widget-panel {
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
