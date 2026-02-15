<!--
 * @author Blaeu Privacy Response Team
 * @copyright Copyright © 2019 - 2025 Team Blaeu. Content is licensed under CC BY 4.0 unless otherwise noted. All Rights Reserved.
 * @license CC BY 4.0
-->
<template>
  <div
    ref="widgetRef"
    :class="[
      'responsible-disclosure-widget',
      { 'responsible-disclosure-widget-open': isOpen, 'policy-expanded': isPolicyExpanded },
      positionClass,
    ]"
  >
    <!-- No toggle button - will be controlled only through links -->

    <!-- Widget panel with controls -->
    <div
      id="responsible-disclosure-controls"
      class="responsible-disclosure-widget-panel"
      :class="{ open: isOpen, expanded: isPolicyExpanded }"
      role="dialog"
      aria-labelledby="responsible-disclosure-widget-title"
      style="z-index: 5400"
    >
      <div class="responsible-disclosure-widget-header">
        <h2 id="responsible-disclosure-widget-title" class="responsible-disclosure-widget-title">
          {{
            currentLanguage === 'nl'
              ? 'Responsible Disclosure Beleid'
              : 'Responsible Disclosure Policy'
          }}
        </h2>
        <button
          class="responsible-disclosure-widget-close"
          aria-label="Close responsible disclosure menu"
          @click="closeWidget"
        >
          <i class="fa-solid fa-xmark" aria-hidden="true"></i>
        </button>
      </div>

      <div class="responsible-disclosure-widget-content">
        <!-- Language selector -->
        <div class="responsible-disclosure-language-selector">
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
              At Team Blaeu, we consider the security of our systems a top priority. If you discover
              a vulnerability, we would like to know about it to take steps to address it as quickly
              as possible.
            </p>
            <p class="text-gray-500 mt-2">Last Updated: March 31, 2025</p>
          </div>

          <!-- Dutch Summary -->
          <div v-else class="prose max-w-none text-gray-800">
            <p>
              Bij Team Blaeu staat de beveiliging van onze systemen hoog in het vaandel. Als u een
              kwetsbaarheid ontdekt, horen wij dit graag zodat we snel maatregelen kunnen treffen.
            </p>
            <p class="text-gray-500 mt-2">Laatst bijgewerkt: 31 maart 2025</p>
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
              <i class="fa-solid fa-download mr-2" aria-hidden="true"></i>
              {{ currentLanguage === 'nl' ? 'Download beleid' : 'Download policy' }}
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
              At Team Blaeu, we consider the security of our systems a top priority. But no matter
              how much effort we put into system security, there can still be vulnerabilities
              present.
            </p>

            <p class="text-gray-500 mt-4">Last Updated: March 31, 2025</p>

            <p class="mt-4">
              If you discover a vulnerability, we would like to know about it to take steps to
              address it as quickly as possible. We want to ask you to help us better protect our
              clients and our systems.
            </p>

            <h3 class="text-xl font-semibold mt-6 mb-3">PLEASE DO THE FOLLOWING:</h3>
            <ul class="custom-bullet-list">
              <li>
                E-mail your findings to rob@blaeu.com. Encrypt your results using our PGP key to
                prevent this critical information from falling into the wrong hands,
              </li>
              <li>
                Do not take advantage of the vulnerability or problem you have discovered, for
                example, by downloading more data than necessary to demonstrate the vulnerability or
                deleting or modifying other people's data,
              </li>
              <li>Do not reveal the problem to others until we have resolved it,</li>
              <li>
                Do not use attacks on physical security, social engineering, distributed denial of
                service, spam or applications of third parties, and
              </li>
              <li>
                Do provide sufficient information to reproduce the problem to resolve it as quickly
                as possible. Usually, the I.P. address or the URL of the affected system and a
                description of the vulnerability will be sufficient, but complex vulnerabilities may
                require further explanation.
              </li>
            </ul>

            <h3 class="text-xl font-semibold mt-6 mb-3">WHAT WE PROMISE:</h3>
            <ul class="custom-bullet-list">
              <li>
                We will respond to your report within three business days with our evaluation of the
                information and an expected resolution date,
              </li>
              <li>
                If you have followed the instructions above, we will not take any legal action
                against you regarding the information,
              </li>
              <li>
                We will handle your report with strict confidentiality and not pass on your details
                to third parties without your permission,
              </li>
              <li>We will keep you informed of the progress towards resolving the problem,</li>
              <li>
                In the public information concerning the problem reported, we will give your name as
                the discoverer of the problem (unless you desire otherwise), and
              </li>
              <li>
                We offer a reward for every report of a security problem that we did not know about
                yet. As a token of our gratitude for your assistance, the reward amount will be
                determined based on the leak's severity and the report's quality. The minimum reward
                will be a Fifty Euro gift certificate.
              </li>
            </ul>

            <p class="mt-4">
              We strive to resolve all problems as quickly as possible, and we would like to play an
              active role in the ultimate publication of the issue after fixing it.
            </p>

            <div class="download-link mt-6">
              <a
                href="#"
                class="text-brand-blue hover:underline flex items-center"
                @click.prevent="downloadPolicy"
              >
                <i class="fa-solid fa-download mr-2" aria-hidden="true"></i>
                Download policy
              </a>
            </div>
          </div>

          <!-- Dutch Full Content -->
          <div v-else class="prose max-w-none text-gray-800">
            <p>
              Bij Team Blaeu staat de beveiliging van onze systemen hoog in het vaandel. Maar hoe
              goed wij ons best ook doen, er kunnen toch kwetsbaarheden voorkomen.
            </p>

            <p class="text-gray-500 mt-4">Laatst bijgewerkt: 31 maart 2025</p>

            <p class="mt-4">
              Als u een kwetsbaarheid ontdekt, horen wij dit graag zodat we snel maatregelen kunnen
              treffen. Wij willen graag met u samenwerken om onze klanten en onze systemen beter te
              beschermen.
            </p>

            <h3 class="text-xl font-semibold mt-6 mb-3">WIJ VRAGEN U:</h3>
            <ul class="custom-bullet-list">
              <li>
                Uw bevindingen te mailen naar rob@blaeu.com. Versleutel uw bevindingen met onze
                PGP-sleutel om te voorkomen dat deze gevoelige informatie in verkeerde handen valt,
              </li>
              <li>
                De kwetsbaarheid niet te misbruiken door bijvoorbeeld meer data te downloaden dan
                nodig is om het lek aan te tonen of gegevens van derden te bekijken, verwijderen of
                aanpassen,
              </li>
              <li>De kwetsbaarheid niet met anderen te delen totdat deze is verholpen,</li>
              <li>
                Geen gebruik te maken van aanvallen op fysieke beveiliging, social engineering,
                distributed denial of service, spam of applicaties van derden, en
              </li>
              <li>
                Voldoende informatie te geven om het probleem te reproduceren zodat wij het zo snel
                mogelijk kunnen verhelpen. Meestal is het IP-adres of de URL van het getroffen
                systeem en een beschrijving van de kwetsbaarheid voldoende, maar bij complexere
                kwetsbaarheden kan meer nodig zijn.
              </li>
            </ul>

            <h3 class="text-xl font-semibold mt-6 mb-3">WAT WIJ BELOVEN:</h3>
            <ul class="custom-bullet-list">
              <li>
                Wij reageren binnen drie werkdagen op uw melding met onze beoordeling van de melding
                en een verwachte datum voor een oplossing,
              </li>
              <li>
                Als u aan bovenstaande voorwaarden heeft voldaan, ondernemen wij geen juridische
                stappen tegen u betreffende de melding,
              </li>
              <li>
                Wij behandelen uw melding vertrouwelijk en delen uw persoonlijke gegevens niet
                zonder uw toestemming met derden,
              </li>
              <li>Wij houden u op de hoogte van de voortgang van het oplossen van het probleem,</li>
              <li>
                In berichtgeving over het gemelde probleem zullen wij, indien u dit wenst, uw naam
                vermelden als de ontdekker, en
              </li>
              <li>
                Wij bieden een beloning voor elke melding van een beveiligingsprobleem dat bij ons
                nog niet bekend is. Als blijk van waardering voor uw hulp wordt de hoogte van de
                beloning bepaald aan de hand van de ernst van het lek en de kwaliteit van de
                melding. De minimale beloning is een cadeaubon ter waarde van vijftig euro.
              </li>
            </ul>

            <p class="mt-4">
              Wij streven ernaar alle problemen zo snel mogelijk op te lossen en wij willen graag
              betrokken worden bij een eventuele publicatie over het probleem nadat het is opgelost.
            </p>

            <div class="download-link mt-6">
              <a
                href="#"
                class="text-brand-blue hover:underline flex items-center"
                @click.prevent="downloadPolicy"
              >
                <i class="fa-solid fa-download mr-2" aria-hidden="true"></i>
                Download beleid
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

  const isOpen = ref(false)
  const isPolicyExpanded = ref(false) // Start with summary view
  // Use a computed property with getter/setter to sync with globalState
  const currentLanguage = computed({
    get: () => globalState.languagePreference,
    set: value => {
      globalState.languagePreference = value
    },
  })

  // Ensure immediate synchronization on component mount
  const forceLanguageSync = (): void => {
    // Force reactivity update by triggering a minimal state change
    const current = globalState.languagePreference
    globalState.languagePreference = current
  }
  const position = ref('bottom-right') // Default position
  let keyboardHandler: KeyboardEventHandler | null = null
  let documentClickHandler: MouseEventHandler | null = null
  const widgetRef = ref<HTMLElement | null>(null)

  // Export methods for external use
  defineExpose({
    openWidget: (language?: string) => {
      // If language is provided, use it; otherwise keep existing language from global state
      if (language) {
        currentLanguage.value = language as 'en' | 'nl'
      }
      isOpen.value = true

      // Force panel position when opening
      nextTick(() => {
        const panel = document.querySelector('.responsible-disclosure-widget-panel')
        if (panel && isHTMLElement(panel)) {
          panel.style.setProperty('bottom', '-60px', 'important')
          panel.style.position = 'absolute' // Ensure position is absolute
        }
      })

      // Announce to screen readers
      const { $announce } = useNuxtApp()
      if ($announce) {
        $announce('Responsible disclosure menu opened', 'assertive')
      }
    },
    openFullPolicy: (language?: string) => {
      // If language is provided, use it; otherwise keep existing language from global state
      if (language) {
        currentLanguage.value = language as 'en' | 'nl'
      }
      isOpen.value = true
      isPolicyExpanded.value = true

      // Force panel position when opening
      nextTick(() => {
        const panel = document.querySelector('.responsible-disclosure-widget-panel')
        if (panel && isHTMLElement(panel)) {
          panel.style.setProperty('bottom', '-60px', 'important')
          panel.style.position = 'absolute' // Ensure position is absolute
        }
      })

      // Announce to screen readers
      const { $announce } = useNuxtApp()
      if ($announce) {
        $announce('Complete responsible disclosure policy expanded', 'assertive')
      }
    },
  })

  const positionClass = computed(() => {
    return `responsible-disclosure-widget-${position.value}`
  })

  // Add toggle function similar to PrivacyStatementWidget
  const toggleWidget = (): void => {
    isOpen.value = !isOpen.value

    // If widget is closed, reset expanded state
    if (!isOpen.value) {
      isPolicyExpanded.value = false
    }

    // Announce to screen readers
    const { $announce } = useNuxtApp()
    if ($announce) {
      $announce(
        isOpen.value ? 'Responsible disclosure menu opened' : 'Responsible disclosure menu closed',
        'assertive'
      )
    }
  }

  const closeWidget = (): void => {
    isOpen.value = false
    isPolicyExpanded.value = false

    // Clear active widget in global state if this was the active one
    if (globalState.activeWidget === 'disclosure') {
      globalState.activeWidget = null
    }
  }

  const expandPolicy = (): void => {
    isPolicyExpanded.value = true

    // Announce to screen readers
    const { $announce } = useNuxtApp()
    if ($announce) {
      $announce('Complete responsible disclosure policy expanded', 'polite')
    }
  }

  const collapsePolicy = (): void => {
    isPolicyExpanded.value = false

    // Announce to screen readers
    const { $announce } = useNuxtApp()
    if ($announce) {
      $announce('Returned to responsible disclosure summary', 'polite')
    }
  }

  const downloadPolicy = (): void => {
    // Determine language-specific content and filename
    const isNL = currentLanguage.value === 'nl'
    const fileName = isNL
      ? 'responsible-disclosure-beleid-blaeu.txt'
      : 'responsible-disclosure-policy-blaeu.txt'

    // Generate the content based on the selected language
    let content = ''

    if (isNL) {
      content = `RESPONSIBLE DISCLOSURE BELEID - TEAM BLAEU (BLAEU PRIVACY RESPONSE TEAM B.V.)
Laatst bijgewerkt: 31 maart 2025

Bij Team Blaeu staat de beveiliging van onze systemen hoog in het vaandel. Maar hoe goed wij ons best ook doen, er kunnen toch kwetsbaarheden voorkomen.

Als u een kwetsbaarheid ontdekt, horen wij dit graag zodat we snel maatregelen kunnen treffen. Wij willen graag met u samenwerken om onze klanten en onze systemen beter te beschermen.

WIJ VRAGEN U:
- Uw bevindingen te mailen naar rob@blaeu.com. Versleutel uw bevindingen met onze PGP-sleutel om te voorkomen dat deze gevoelige informatie in verkeerde handen valt,
- De kwetsbaarheid niet te misbruiken door bijvoorbeeld meer data te downloaden dan nodig is om het lek aan te tonen of gegevens van derden te bekijken, verwijderen of aanpassen,
- De kwetsbaarheid niet met anderen te delen totdat deze is verholpen,
- Geen gebruik te maken van aanvallen op fysieke beveiliging, social engineering, distributed denial of service, spam of applicaties van derden, en
- Voldoende informatie te geven om het probleem te reproduceren zodat wij het zo snel mogelijk kunnen verhelpen. Meestal is het IP-adres of de URL van het getroffen systeem en een beschrijving van de kwetsbaarheid voldoende, maar bij complexere kwetsbaarheden kan meer nodig zijn.

WAT WIJ BELOVEN:
- Wij reageren binnen drie werkdagen op uw melding met onze beoordeling van de melding en een verwachte datum voor een oplossing,
- Als u aan bovenstaande voorwaarden heeft voldaan, ondernemen wij geen juridische stappen tegen u betreffende de melding,
- Wij behandelen uw melding vertrouwelijk en delen uw persoonlijke gegevens niet zonder uw toestemming met derden,
- Wij houden u op de hoogte van de voortgang van het oplossen van het probleem,
- In berichtgeving over het gemelde probleem zullen wij, indien u dit wenst, uw naam vermelden als de ontdekker, en
- Wij bieden een beloning voor elke melding van een beveiligingsprobleem dat bij ons nog niet bekend is. Als blijk van waardering voor uw hulp wordt de hoogte van de beloning bepaald aan de hand van de ernst van het lek en de kwaliteit van de melding. De minimale beloning is een cadeaubon ter waarde van vijftig euro.

Wij streven ernaar alle problemen zo snel mogelijk op te lossen en wij willen graag betrokken worden bij een eventuele publicatie over het probleem nadat het is opgelost.`
    } else {
      content = `RESPONSIBLE DISCLOSURE POLICY - TEAM BLAEU (BLAEU PRIVACY RESPONSE TEAM B.V.
Last Updated: March 31, 2025

At Team Blaeu, we consider the security of our systems a top priority. But no matter how much effort we put into system security, there can still be vulnerabilities present.

If you discover a vulnerability, we would like to know about it to take steps to address it as quickly as possible. We want to ask you to help us better protect our clients and our systems.

PLEASE DO THE FOLLOWING:
- E-mail your findings to rob@blaeu.com. Encrypt your results using our PGP key to prevent this critical information from falling into the wrong hands,
- Do not take advantage of the vulnerability or problem you have discovered, for example, by downloading more data than necessary to demonstrate the vulnerability or deleting or modifying other people's data,
- Do not reveal the problem to others until we have resolved it,
- Do not use attacks on physical security, social engineering, distributed denial of service, spam or applications of third parties, and
- Do provide sufficient information to reproduce the problem to resolve it as quickly as possible. Usually, the I.P. address or the URL of the affected system and a description of the vulnerability will be sufficient, but complex vulnerabilities may require further explanation.

WHAT WE PROMISE:
- We will respond to your report within three business days with our evaluation of the information and an expected resolution date,
- If you have followed the instructions above, we will not take any legal action against you regarding the information,
- We will handle your report with strict confidentiality and not pass on your details to third parties without your permission,
- We will keep you informed of the progress towards resolving the problem,
- In the public information concerning the problem reported, we will give your name as the discoverer of the problem (unless you desire otherwise), and
- We offer a reward for every report of a security problem that we did not know about yet. As a token of our gratitude for your assistance, the reward amount will be determined based on the leak's severity and the report's quality. The minimum reward will be a Fifty Euro gift certificate.

We strive to resolve all problems as quickly as possible, and we would like to play an active role in the ultimate publication of the issue after fixing it.`
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
        isNL
          ? 'Responsible disclosure beleid wordt gedownload'
          : 'Responsible disclosure policy is being downloaded',
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

  onMounted(() => {
    // Force immediate language synchronization to prevent selector/content desync
    forceLanguageSync()

    // Get position from global state if available
    if (globalState.widgetPosition) {
      position.value = globalState.widgetPosition
    }

    // Language is already synced via computed property, no need to set explicitly

    // Force panel position to -60px from bottom (positions higher on page)
    nextTick(() => {
      // Get the panel element and directly set its bottom style
      const panel = document.querySelector('.responsible-disclosure-widget-panel')
      if (panel && isHTMLElement(panel)) {
        panel.style.setProperty('bottom', '-60px', 'important')
        panel.style.position = 'absolute' // Ensure position is absolute
      }
    })

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

    // Listen for close-all-widgets event
    document.addEventListener('close-all-widgets', (event: CustomEvent) => {
      // Check if we should ignore this widget
      if (event.detail && event.detail.except !== 'disclosure') {
        closeWidget()
      }
    })

    // Listen for disclosure widget open requests
    document.addEventListener('open-disclosure-widget', (event: CustomEvent) => {
      // Toggle the widget if it's already open - provides the second click closing behavior
      if (isOpen.value) {
        toggleWidget()
        return
      }

      // First, trigger the close-all-widgets event
      const closeEvent = new CustomEvent('close-all-widgets', {
        detail: { except: 'disclosure' },
      })
      document.dispatchEvent(closeEvent)

      // Update language if provided
      if (event.detail && event.detail.language) {
        currentLanguage.value = event.detail.language as 'en' | 'nl'
      }

      // Open widget
      isOpen.value = true

      // Update global state to track active widget
      globalState.activeWidget = 'disclosure'

      // Expand to full policy if requested
      if (event.detail && event.detail.expandPolicy) {
        isPolicyExpanded.value = true
      }

      // Force panel position when opening via event
      nextTick(() => {
        const panel = document.querySelector('.responsible-disclosure-widget-panel')
        if (panel && isHTMLElement(panel)) {
          panel.style.setProperty('bottom', '-60px', 'important')
          panel.style.position = 'absolute' // Ensure position is absolute
        }
      })

      // Announce to screen readers
      const { $announce } = useNuxtApp()
      if ($announce) {
        $announce('Responsible disclosure menu opened', 'assertive')
      }
    })
  })

  onBeforeUnmount(() => {
    // Clean up event listeners
    if (keyboardHandler) {
      document.removeEventListener('keydown', keyboardHandler)
    }
    if (documentClickHandler) {
      document.removeEventListener('mousedown', documentClickHandler)
    }
    // We can't properly remove event listeners added without named functions
    // But we can at least set the flag for future cleanup
    globalState.activeWidget = null
  })

  // Watch for language changes in globalState
  watch(
    () => globalState.languagePreference,
    newValue => {
      if (currentLanguage.value !== newValue) {
        currentLanguage.value = newValue
      }
    }
  )

  // No need for this watch anymore since our computed property setter
  // handles updating globalState.languagePreference automatically
</script>

<style scoped>
  .responsible-disclosure-widget {
    position: fixed;
    z-index: 52; /* For the button itself - higher position between other widgets */
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

  /* Position classes - positioned vertically with fixed spacing */
  .responsible-disclosure-widget-top-left {
    top: 140px; /* 20px for top + 60px for widget spacing + 60px for another widget */
    left: 20px;
  }

  .responsible-disclosure-widget-top-right {
    top: 140px; /* 20px for top + 60px for widget spacing + 60px for another widget */
    right: 20px;
  }

  .responsible-disclosure-widget-bottom-left {
    bottom: 140px; /* 20px for bottom + 60px for widget spacing + 60px for another widget */
    left: 20px;
  }

  .responsible-disclosure-widget-bottom-right {
    bottom: 140px; /* 20px for bottom + 60px for widget spacing + 60px for another widget */
    right: 20px;
  }

  /* No toggle button styles needed */

  /* Widget panel */
  .responsible-disclosure-widget-panel {
    position: absolute;
    width: 280px;
    background-color: white;
    border-radius: 12px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
    padding: 16px;
    display: none;
    flex-direction: column;
    gap: 16px;
    max-height: calc(80vh - 100px + 5em); /* Increased height by 5em */
    overflow-y: auto;
    overflow-x: hidden; /* Prevent horizontal scrolling */
    transition:
      width 0.3s ease,
      height 0.3s ease;
    z-index: 5200; /* Higher z-index to ensure it appears above all elements */
  }

  .responsible-disclosure-widget-panel.open {
    display: flex;
  }

  /* Expanded panel for full policy */
  .responsible-disclosure-widget-panel.expanded {
    width: min(90vw, 500px);
    max-height: 90vh; /* Increased from 80vh to 90vh to show more content */
    overflow-y: auto;
  }

  /* Full screen in mobile mode */
  @media (max-width: 640px) {
    .responsible-disclosure-widget-panel.expanded {
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

    /* Adjust responsible disclosure content for mobile */
    .responsible-disclosure-widget-panel.expanded .responsible-disclosure-widget-header {
      position: sticky !important;
      top: 0 !important;
      background: white !important;
      padding: 1rem !important;
      z-index: 10 !important;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1) !important;
      width: 100% !important;
    }

    .responsible-disclosure-widget-panel.expanded .responsible-disclosure-widget-content {
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
  .responsible-disclosure-widget-top-left .responsible-disclosure-widget-panel {
    top: 60px;
    left: 0;
  }

  .responsible-disclosure-widget-top-right .responsible-disclosure-widget-panel {
    top: 60px;
    right: 0;
  }

  .responsible-disclosure-widget-bottom-left .responsible-disclosure-widget-panel {
    bottom: -60px; /* Higher position on page */
    left: 0;
  }

  .responsible-disclosure-widget-bottom-right .responsible-disclosure-widget-panel {
    bottom: -60px; /* Higher position on page */
    right: 0;
  }

  /* Panel header */
  .responsible-disclosure-widget-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #eaeaea;
    padding-bottom: 12px;
    margin-bottom: 4px;
  }

  .responsible-disclosure-widget-title {
    font-size: 16px;
    font-weight: 600;
    color: #333;
    margin: 0;
  }

  .responsible-disclosure-widget-close {
    background: transparent;
    border: none;
    color: #777;
    cursor: pointer;
    padding: 4px;
    border-radius: 4px;
  }

  .responsible-disclosure-widget-close:hover {
    color: #333;
    background-color: #f5f5f5;
  }

  .responsible-disclosure-widget-close:focus-visible {
    outline: 2px solid #00a8e6;
    outline-offset: 2px;
  }

  /* Widget content */
  .responsible-disclosure-widget-content {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  /* Language selector */
  .responsible-disclosure-language-selector {
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
    max-height: calc(70vh - 120px + 5em); /* Increased height by 5em */
    overflow-y: auto;
    padding-right: 8px;
  }

  @media (max-width: 640px) {
    .full-policy {
      max-height: calc(
        100vh - 12rem + 5em
      ); /* Account for header, nav, etc. + increased height by 5em */
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
    .responsible-disclosure-widget-panel {
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
  .responsible-disclosure-widget-open .responsible-disclosure-widget-panel {
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
