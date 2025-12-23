<!--
 * @author Blaeu Privacy Response Team
 * @copyright Copyright © 2019 - 2025 Team Blaeu. Content is licensed under CC BY 4.0 unless otherwise noted. All Rights Reserved.
 * @license CC BY 4.0
-->
<template>
  <div
    ref="widgetRef"
    :class="[
      'privacy-statement-widget',
      { 'privacy-statement-widget-open': isOpen, 'policy-expanded': isPolicyExpanded },
      positionClass,
    ]"
  >
    <!-- No toggle button since it will be opened via link only -->

    <!-- Widget panel with controls -->
    <div
      id="privacy-statement-controls"
      class="privacy-statement-widget-panel"
      :class="{ open: isOpen, expanded: isPolicyExpanded }"
      role="dialog"
      aria-labelledby="privacy-statement-widget-title"
      style="z-index: 5200"
    >
      <div class="privacy-statement-widget-header">
        <h2 id="privacy-statement-widget-title" class="privacy-statement-widget-title">
          {{ currentLanguage === 'nl' ? 'Privacyverklaring' : 'Privacy Statement' }}
        </h2>
        <button
          class="privacy-statement-widget-close"
          aria-label="Close privacy statement"
          @click="closeWidget"
        >
          <i class="fa-solid fa-xmark" aria-hidden="true"></i>
        </button>
      </div>

      <div class="privacy-statement-widget-content">
        <!-- Language selector -->
        <div class="privacy-statement-language-selector">
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
            <p>
              This privacy statement explains how Team Blaeu (Blaeu Privacy Response Team B.V.)
              collects, uses, and protects your personal data in accordance with applicable privacy
              laws, including GDPR.
            </p>
            <p class="text-gray-500 mt-2">Last Updated: March 31, 2025</p>
          </div>

          <!-- Dutch Summary -->
          <div v-else class="prose max-w-none text-gray-800">
            <p>
              Deze privacyverklaring legt uit hoe Team Blaeu (Blaeu Privacy Response Team B.V.) uw
              persoonsgegevens verzamelt, gebruikt en beschermt in overeenstemming met de
              toepasselijke privacywetgeving, waaronder de AVG.
            </p>
            <p class="text-gray-500 mt-2">Laatst bijgewerkt: 31 maart 2025</p>
          </div>

          <!-- View Complete Statement Button -->
          <button
            class="view-complete-policy"
            aria-expanded="false"
            aria-controls="full-policy-content"
            @click="expandPolicy"
          >
            {{
              currentLanguage === 'nl'
                ? 'Bekijk volledige privacyverklaring'
                : 'View complete privacy statement'
            }}
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
              {{
                currentLanguage === 'nl'
                  ? 'Download privacyverklaring'
                  : 'Download privacy statement'
              }}
            </a>
          </div>
        </div>

        <!-- Full Privacy Statement Content -->
        <div v-else id="full-policy-content" class="full-policy">
          <button class="back-to-summary" aria-label="Back to summary" @click="collapsePolicy">
            <i class="fa-solid fa-chevron-left mr-2" aria-hidden="true"></i>
            {{ currentLanguage === 'nl' ? 'Terug naar samenvatting' : 'Back to summary' }}
          </button>

          <!-- English Content -->
          <div v-if="currentLanguage === 'en'" class="prose max-w-none text-gray-800">
            <p>This is the privacy statement of Team Blaeu. You can contact us at:</p>

            <p class="ml-4">
              <br />
              Team Blaeu
              <br />
              Halfrond 73, 3071 PP, Rotterdam, The Netherlands
              <br />
              team@blaeu.com
            </p>

            <p class="text-gray-500">
              <br />
              Last Updated: March 31, 2025
            </p>

            <h3 class="text-xl font-semibold mt-6 mb-3">We process the following personal data:</h3>

            <div class="space-y-4">
              <div>
                <p class="font-medium">Client contact and case information</p>
                <ul class="list-disc pl-8">
                  <li>
                    To provide legal services, we collect clients' names, contact details, and
                    information relevant to their legal matters.
                  </li>
                  <li>
                    We do this to perform a contract (if the person is the client) or because we
                    have a legitimate interest in doing so (if the person represents the client).
                  </li>
                  <li>We retain this data for the duration of the matter plus 7 years.</li>
                  <li>
                    We may share this data with courts and others, such as lawyers of the other
                    party, to perform our engagement with the client.
                  </li>
                </ul>
              </div>

              <div>
                <p class="font-medium">Supplier information</p>
                <ul class="list-disc pl-8">
                  <li>
                    To manage our business relationships, we collect company names, contact person
                    details, and financial information of suppliers and service providers.
                  </li>
                  <li>We do this to perform the contract with our suppliers.</li>
                  <li>
                    We retain this data for the duration of the business relationship plus 7 years.
                  </li>
                </ul>
              </div>

              <div>
                <p class="font-medium">Financial information</p>
                <ul class="list-disc pl-8">
                  <li>
                    To process payments and comply with tax laws, we collect bank details and
                    payment information.
                  </li>
                  <li>
                    We do this to perform the contract with our client (sending invoices) and legal
                    obligation (preparing and submitting tax statements).
                  </li>
                  <li>We retain this data for 7 years after the year an invoice is sent.</li>
                  <li>
                    We share some financial information with our tax consultant and with tax
                    authorities.
                  </li>
                </ul>
              </div>
            </div>

            <p class="mt-4">We primarily collect data directly from you.</p>

            <h3 class="text-xl font-semibold mt-6 mb-3">Your rights</h3>
            <p>
              Under the GDPR, you have the rights to access, rectify, erase (in certain
              circumstances), restrict processing of, and transfer your data, as well as to object
              to processing based on legitimate interests and withdraw consent (where applicable).
              Team Blaeu does not engage in solely automated decision-making or profiling. To
              exercise these rights, contact us using the details above. You can also lodge a
              complaint with the Dutch Data Protection Authority (Autoriteit Persoonsgegevens).
            </p>

            <p class="text-sm text-gray-500 mt-6">
              If there is an inconsistency between the Dutch and English-language version of these
              regulations, the Dutch version takes precedence.
            </p>

            <div class="download-link mt-6">
              <a
                href="#"
                class="text-brand-blue hover:underline flex items-center text-sm"
                @click.prevent="downloadPolicy"
              >
                <i class="fa-solid fa-download mr-2" aria-hidden="true"></i>
                Download privacy statement
              </a>
            </div>
          </div>

          <!-- Dutch Content -->
          <div v-else class="prose max-w-none text-gray-800">
            <p>Dit is de privacyverklaring van Team Blaeu. U kunt contact met ons opnemen via:</p>

            <p class="ml-4">
              <br />
              Team Blaeu
              <br />
              Halfrond 73, 3071 PP, Rotterdam, Nederland
              <br />
              team@blaeu.com
            </p>

            <p class="text-gray-500">
              <br />
              Laatst bijgewerkt: 31 maart 2025
            </p>

            <h3 class="text-xl font-semibold mt-6 mb-3">
              Wij verwerken de volgende persoonsgegevens:
            </h3>

            <div class="space-y-4">
              <div>
                <p class="font-medium">Klantcontact- en dossiergegevens</p>
                <ul class="list-disc pl-8">
                  <li>
                    Om juridische diensten te verlenen, verzamelen wij namen, contactgegevens en
                    informatie die relevant is voor de juridische kwesties van onze cliënten.
                  </li>
                  <li>
                    Wij doen dit om een overeenkomst uit te voeren (als de persoon de cliënt is) of
                    omdat wij een gerechtvaardigd belang hebben om dit te doen (als de persoon de
                    cliënt vertegenwoordigt).
                  </li>
                  <li>Wij bewaren deze gegevens gedurende de duur van de zaak plus 7 jaar.</li>
                  <li>
                    Wij kunnen deze gegevens delen met rechtbanken en anderen, zoals advocaten van
                    de andere partij, om onze opdracht voor de cliënt uit te voeren.
                  </li>
                </ul>
              </div>

              <div>
                <p class="font-medium">Leveranciersinformatie</p>
                <ul class="list-disc pl-8">
                  <li>
                    Om onze zakelijke relaties te beheren, verzamelen wij bedrijfsnamen,
                    contactpersoongegevens en financiële informatie van leveranciers en
                    dienstverleners.
                  </li>
                  <li>Wij doen dit om de overeenkomst met onze leveranciers uit te voeren.</li>
                  <li>
                    Wij bewaren deze gegevens gedurende de duur van de zakelijke relatie plus 7
                    jaar.
                  </li>
                </ul>
              </div>

              <div>
                <p class="font-medium">Financiële informatie</p>
                <ul class="list-disc pl-8">
                  <li>
                    Om betalingen te verwerken en te voldoen aan belastingwetgeving, verzamelen wij
                    bankgegevens en betalingsinformatie.
                  </li>
                  <li>
                    Wij doen dit om de overeenkomst met onze cliënt uit te voeren (facturen
                    verzenden) en aan wettelijke verplichtingen te voldoen (belastingaangiften
                    voorbereiden en indienen).
                  </li>
                  <li>
                    Wij bewaren deze gegevens gedurende 7 jaar na het jaar waarin een factuur is
                    verzonden.
                  </li>
                  <li>
                    Wij delen sommige financiële informatie met onze belastingadviseur en met de
                    belastingdienst.
                  </li>
                </ul>
              </div>
            </div>

            <p class="mt-4">Wij verzamelen gegevens voornamelijk rechtstreeks bij u.</p>

            <h3 class="text-xl font-semibold mt-6 mb-3">Uw rechten</h3>
            <p>
              Op grond van de AVG heeft u het recht op inzage, rectificatie, wissing (in bepaalde
              omstandigheden), beperking van de verwerking en overdraagbaarheid van uw gegevens,
              evenals het recht bezwaar te maken tegen verwerking op basis van gerechtvaardigde
              belangen en toestemming in te trekken (indien van toepassing). Team Blaeu doet niet
              aan volledig geautomatiseerde besluitvorming of profilering. Om deze rechten uit te
              oeferen, kunt u contact met ons opnemen via de bovenstaande gegevens. U kunt ook een
              klacht indienen bij de Autoriteit Persoonsgegevens.
            </p>

            <div class="download-link mt-6">
              <a
                href="#"
                class="text-brand-blue hover:underline flex items-center text-sm"
                @click.prevent="downloadPolicy"
              >
                <i class="fa-solid fa-download mr-2" aria-hidden="true"></i>
                Download privacyverklaring
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
  const isPolicyExpanded = ref(false)
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
      // Announce to screen readers
      const { $announce } = useNuxtApp()
      if ($announce) {
        $announce('Privacy statement opened', 'assertive')
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
        $announce('Complete privacy statement expanded', 'assertive')
      }
    },
  })

  const positionClass = computed(() => {
    return `privacy-statement-widget-${position.value}`
  })

  const _toggleWidget = (): void => {
    isOpen.value = !isOpen.value

    // If widget is closed, reset expanded state
    if (!isOpen.value) {
      isPolicyExpanded.value = false
    }

    // Announce to screen readers
    const { $announce } = useNuxtApp()
    if ($announce) {
      $announce(isOpen.value ? 'Privacy statement opened' : 'Privacy statement closed', 'assertive')
    }
  }

  const closeWidget = (): void => {
    isOpen.value = false
    isPolicyExpanded.value = false

    // Clear active widget in global state if this was the active one
    if (globalState.activeWidget === 'privacy') {
      globalState.activeWidget = null
    }
  }

  const expandPolicy = (): void => {
    isPolicyExpanded.value = true

    // Announce to screen readers
    const { $announce } = useNuxtApp()
    if ($announce) {
      $announce('Complete privacy statement expanded', 'polite')
    }
  }

  const collapsePolicy = (): void => {
    isPolicyExpanded.value = false

    // Announce to screen readers
    const { $announce } = useNuxtApp()
    if ($announce) {
      $announce('Returned to privacy statement summary', 'polite')
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
    // Determine language-specific content and filename
    const isNL = currentLanguage.value === 'nl'
    const fileName = isNL ? 'privacyverklaring-blaeu.txt' : 'privacy-statement-blaeu.txt'

    // Generate the content based on the selected language
    let content = ''

    if (isNL) {
      content = `PRIVACYVERKLARING - TEAM BLAEU (BLAEU PRIVACY RESPONSE TEAM B.V.)
Laatst bijgewerkt: 31 maart 2025

Dit is de privacyverklaring van Team Blaeu (Blaeu Privacy Response Team B.V.). U kunt contact met ons opnemen via:

Team Blaeu
Halfrond 73, 3071 PP, Rotterdam, Nederland
team@blaeu.com

WIJ VERWERKEN DE VOLGENDE PERSOONSGEGEVENS:

1. Klantcontact- en dossiergegevens
   - Om juridische diensten te verlenen, verzamelen wij namen, contactgegevens en informatie die relevant is voor de juridische kwesties van onze cliënten.
   - Wij doen dit om een overeenkomst uit te voeren (als de persoon de cliënt is) of omdat wij een gerechtvaardigd belang hebben om dit te doen (als de persoon de cliënt vertegenwoordigt).
   - Wij bewaren deze gegevens gedurende de duur van de zaak plus 7 jaar.
   - Wij kunnen deze gegevens delen met rechtbanken en anderen, zoals advocaten van de andere partij, om onze opdracht voor de cliënt uit te voeren.

2. Leveranciersinformatie
   - Om onze zakelijke relaties te beheren, verzamelen wij bedrijfsnamen, contactpersoongegevens en financiële informatie van leveranciers en dienstverleners.
   - Wij doen dit om de overeenkomst met onze leveranciers uit te voeren.
   - Wij bewaren deze gegevens gedurende de duur van de zakelijke relatie plus 7 jaar.

3. Financiële informatie
   - Om betalingen te verwerken en te voldoen aan belastingwetgeving, verzamelen wij bankgegevens en betalingsinformatie.
   - Wij doen dit om de overeenkomst met onze cliënt uit te voeren (facturen verzenden) en aan wettelijke verplichtingen te voldoen (belastingaangiften voorbereiden en indienen).
   - Wij bewaren deze gegevens gedurende 7 jaar na het jaar waarin een factuur is verzonden.
   - Wij delen sommige financiële informatie met onze belastingadviseur en met de belastingdienst.

Wij verzamelen gegevens voornamelijk rechtstreeks bij u.

UW RECHTEN:
Op grond van de AVG heeft u het recht op inzage, rectificatie, wissing (in bepaalde omstandigheden), beperking van de verwerking en overdraagbaarheid van uw gegevens, evenals het recht bezwaar te maken tegen verwerking op basis van gerechtvaardigde belangen en toestemming in te trekken (indien van toepassing). Team Blaeu doet niet aan volledig geautomatiseerde besluitvorming of profilering. Om deze rechten uit te oefenen, kunt u contact met ons opnemen via de bovenstaande gegevens. U kunt ook een klacht indienen bij de Autoriteit Persoonsgegevens.`
    } else {
      content = `PRIVACY STATEMENT - TEAM BLAEU (BLAEU PRIVACY RESPONSE TEAM B.V.)
Last Updated: March 31, 2025

This is the privacy statement of Team Blaeu (Blaeu Privacy Response Team B.V.). You can contact us at:

Team Blaeu
Halfrond 73, 3071 PP, Rotterdam, The Netherlands
team@blaeu.com

WE PROCESS THE FOLLOWING PERSONAL DATA:

1. Client contact and case information
   - To provide legal services, we collect clients' names, contact details, and information relevant to their legal matters.
   - We do this to perform a contract (if the person is the client) or because we have a legitimate interest in doing so (if the person represents the client).
   - We retain this data for the duration of the matter plus 7 years.
   - We may share this data with courts and others, such as lawyers of the other party, to perform our engagement with the client.

2. Supplier information
   - To manage our business relationships, we collect company names, contact person details, and financial information of suppliers and service providers.
   - We do this to perform the contract with our suppliers.
   - We retain this data for the duration of the business relationship plus 7 years.

3. Financial information
   - To process payments and comply with tax laws, we collect bank details and payment information.
   - We do this to perform the contract with our client (sending invoices) and legal obligation (preparing and submitting tax statements).
   - We retain this data for 7 years after the year an invoice is sent.
   - We share some financial information with our tax consultant and with tax authorities.

We primarily collect data directly from you.

YOUR RIGHTS:
Under the GDPR, you have the rights to access, rectify, erase (in certain circumstances), restrict processing of, and transfer your data, as well as to object to processing based on legitimate interests and withdraw consent (where applicable). Team Blaeu does not engage in solely automated decision-making or profiling. To exercise these rights, contact us using the details above. You can also lodge a complaint with the Dutch Data Protection Authority (Autoriteit Persoonsgegevens).

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
        isNL ? 'Privacyverklaring wordt gedownload' : 'Privacy statement is being downloaded',
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

    // Listen for close-all-widgets event
    document.addEventListener('close-all-widgets', event => {
      // Check if we should ignore this widget
      if (event.detail && event.detail.except !== 'privacy') {
        closeWidget()
      }
    })

    // Listen for privacy widget open requests
    document.addEventListener('open-privacy-widget', event => {
      // First, trigger the close-all-widgets event
      const closeEvent = new CustomEvent('close-all-widgets', {
        detail: { except: 'privacy' },
      })
      document.dispatchEvent(closeEvent)

      // Update global state to track active widget
      globalState.activeWidget = 'privacy'

      // Update language if provided, otherwise use global language preference
      if (event.detail && event.detail.language) {
        currentLanguage.value = event.detail.language
      }

      // Open widget
      isOpen.value = true

      // Expand to full policy if requested
      if (event.detail && event.detail.expandPolicy) {
        isPolicyExpanded.value = true
      }

      // Jump to section if specified
      if (event.detail && event.detail.section) {
        isPolicyExpanded.value = true
        nextTick(() => {
          scrollToSection(event.detail.section)
        })
      }

      // Announce to screen readers
      const { $announce } = useNuxtApp()
      if ($announce) {
        $announce('Privacy statement opened', 'assertive')
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
    // Event listeners with functions are automatically cleaned up
  })
</script>

<style scoped>
  .privacy-statement-widget {
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
  .privacy-statement-widget-bottom-left {
    bottom: 20px !important; /* Same as accessibility widget (var(--widget-spacing)) */
    left: 20px !important;
  }

  .privacy-statement-widget-bottom-right {
    bottom: 20px !important; /* Same as accessibility widget (var(--widget-spacing)) */
    right: 20px !important;
  }

  /* Widget panel */
  .privacy-statement-widget-panel {
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

  .privacy-statement-widget-panel.open {
    display: flex;
  }

  /* Expanded panel for full policy */
  .privacy-statement-widget-panel.expanded {
    width: min(90vw, 650px);
    height: max-content;
    max-height: 85vh; /* Slightly increased max-height for better content visibility */
    overflow-y: auto;
  }

  /* Full screen in mobile mode */
  @media (max-width: 640px) {
    .privacy-statement-widget-panel.expanded {
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

    /* Adjust privacy statement content for mobile */
    .privacy-statement-widget-panel.expanded .privacy-statement-widget-header {
      position: sticky !important;
      top: 0 !important;
      background: white !important;
      padding: 1rem !important;
      z-index: 10 !important;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1) !important;
      width: 100% !important;
    }

    .privacy-statement-widget-panel.expanded .privacy-statement-widget-content {
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
  .privacy-statement-widget-top-left .privacy-statement-widget-panel {
    top: 60px;
    left: 0;
  }

  .privacy-statement-widget-top-right .privacy-statement-widget-panel {
    top: 60px;
    right: 0;
  }

  .privacy-statement-widget-bottom-left .privacy-statement-widget-panel {
    bottom: 60px; /* Adjusted position as requested */
    left: 0;
  }

  .privacy-statement-widget-bottom-right .privacy-statement-widget-panel {
    bottom: 60px; /* Adjusted position as requested */
    right: 0;
  }

  /* Panel header */
  .privacy-statement-widget-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #eaeaea;
    padding-bottom: 12px;
    margin-bottom: 4px;
  }

  .privacy-statement-widget-title {
    font-size: 16px;
    font-weight: 600;
    color: #333;
    margin: 0;
  }

  .privacy-statement-widget-close {
    background: transparent;
    border: none;
    color: #777;
    cursor: pointer;
    padding: 4px;
    border-radius: 4px;
  }

  .privacy-statement-widget-close:hover {
    color: #333;
    background-color: #f5f5f5;
  }

  .privacy-statement-widget-close:focus-visible {
    outline: 2px solid #00a8e6;
    outline-offset: 2px;
  }

  /* Widget content */
  .privacy-statement-widget-content {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  /* Language selector */
  .privacy-statement-language-selector {
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
    .privacy-statement-widget-panel {
      transition: none;
    }
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
  .privacy-statement-widget-open .privacy-statement-widget-panel {
    max-width: calc(100vw - 40px);
  }
</style>
