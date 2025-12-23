<!--
 * @author Blaeu Privacy Response Team
 * @copyright Copyright © 2019 - 2025 Team Blaeu. Content is licensed under CC BY 4.0 unless otherwise noted. All Rights Reserved.
 * @license CC BY 4.0
-->
<template>
  <div
    ref="widgetRef"
    :class="[
      'accessibility-policy-widget',
      { 'accessibility-policy-widget-open': isOpen, 'policy-expanded': isPolicyExpanded },
      positionClass,
    ]"
  >
    <!-- No toggle button - will be controlled only through links -->

    <!-- Widget panel with controls -->
    <div
      id="accessibility-policy-controls"
      class="accessibility-policy-widget-panel"
      :class="{ open: isOpen, expanded: isPolicyExpanded }"
      role="dialog"
      aria-labelledby="accessibility-policy-widget-title"
      style="z-index: 5100"
    >
      <div class="accessibility-policy-widget-header">
        <h2 id="accessibility-policy-widget-title" class="accessibility-policy-widget-title">
          {{ currentLanguage === 'nl' ? 'Toegankelijkheidsverklaring' : 'Accessibility Statement' }}
        </h2>
        <button
          class="accessibility-policy-widget-close"
          aria-label="Close accessibility policy menu"
          @click="closeWidget"
        >
          <i class="fa-solid fa-xmark" aria-hidden="true"></i>
        </button>
      </div>

      <div class="accessibility-policy-widget-content">
        <!-- Language selector -->
        <div class="accessibility-policy-language-selector">
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
              We are committed to ensuring digital accessibility for people with disabilities. We
              continually improve the user experience for everyone and apply relevant accessibility
              standards.
            </p>
            <p class="text-gray-500 mt-2">Last Updated: April 12, 2025</p>
          </div>

          <!-- Dutch Summary -->
          <div v-else class="prose max-w-none text-gray-800">
            <p>
              Wij streven ernaar om digitale toegankelijkheid te waarborgen voor mensen met een
              beperking. We verbeteren voortdurend de gebruikerservaring voor iedereen en passen de
              relevante toegankelijkheidsnormen toe.
            </p>
            <p class="text-gray-500 mt-2">Laatst bijgewerkt: 12 april 2025</p>
          </div>

          <!-- View Complete Policy Button -->
          <button
            class="view-complete-policy"
            aria-expanded="false"
            aria-controls="full-policy-content"
            @click="expandPolicy"
          >
            {{
              currentLanguage === 'nl' ? 'Bekijk volledige verklaring' : 'View complete statement'
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
                  ? 'Download toegankelijkheidsverklaring'
                  : 'Download accessibility statement'
              }}
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
              We are committed to ensuring digital accessibility for people with disabilities. We
              continually improve the user experience for everyone and apply the relevant
              accessibility standards.
            </p>

            <p class="text-gray-500 mt-4">Last Updated: April 12, 2025</p>

            <section class="mt-6">
              <h3 class="text-xl font-semibold mb-2 text-gray-800">Conformance Status</h3>
              <p>
                The Web Content Accessibility Guidelines (WCAG) defines requirements for designers
                and developers to improve accessibility for people with disabilities. It defines
                three levels of conformance: Level A, Level AA, and Level AAA.
              </p>
              <p class="mt-2">
                The website features two pages (homepage with silent video and a personal page) with
                no forms, input fields, or authentication mechanisms. This form-free approach
                significantly reduces potential accessibility barriers for users with disabilities.
                To the best of our knowledge, this website is fully conformant with WCAG 2.2 level A
                standards, with most AA and several AAA enhancements.
              </p>
            </section>

            <section class="mt-6">
              <h3 class="text-xl font-semibold mb-2 text-gray-800">Accessibility Features</h3>
              <p>This website includes the following accessibility features:</p>
              <ul class="custom-bullet-list mt-2 space-y-2">
                <li>Proper semantic HTML structure with landmark regions</li>
                <li>Keyboard-accessible navigation with enhanced focus indicators</li>
                <li>Skip to content link with enhanced visibility and multiple ways to navigate</li>
                <li>
                  ARIA attributes and live regions for screen readers with proper announcements
                </li>
                <li>
                  High color contrast exceeding AA standards (4.5:1 ratio) with AAA enhancements
                  (7:1 ratio)
                </li>
                <li>Responsive design optimized for all devices and orientations</li>
                <li>Complete text alternatives for all non-text content</li>
                <li>Accessible video player with controls and proper role designation</li>
                <li>
                  Comprehensive accessibility widget with user-controlled settings and preference
                  memory
                </li>
                <li>OpenDyslexic font option for users with reading difficulties</li>
                <li>Motion reduction controls that automatically pause videos and animations</li>
                <li>Support for prefers-reduced-motion and other user preferences</li>
                <li>Multilingual accessibility support with language toggle</li>
                <li>Downloadable accessibility statement in text format</li>
                <li>Enhanced target sizes for interactive elements (44×44px minimum)</li>
              </ul>
            </section>

            <section class="mt-6">
              <h3 class="text-xl font-semibold mb-2 text-gray-800">
                Compatibility with Assistive Technologies
              </h3>
              <p>
                Our website is designed to be compatible with the following assistive technologies:
              </p>
              <ul class="custom-bullet-list mt-2 space-y-1">
                <li>Screen readers (NVDA, VoiceOver, JAWS, TalkBack)</li>
                <li>Screen magnification software</li>
                <li>Speech recognition software</li>
                <li>Keyboard navigation with full functionality</li>
                <li>Browser accessibility settings and extensions</li>
                <li>Display preferences (reduced motion, high contrast)</li>
                <li>Assistive touch and pointer devices</li>
              </ul>
              <p class="mt-2">
                We strive to ensure compatibility with the latest versions of these technologies and
                regularly test with assistive technology users.
              </p>
            </section>

            <section class="mt-6">
              <h3 class="text-xl font-semibold mb-2 text-gray-800">Keyboard Shortcuts</h3>
              <p>The following keyboard shortcuts are available to help navigate the website:</p>

              <h4 class="text-lg font-medium mt-4 mb-2 text-gray-800">Primary Navigation</h4>
              <ul class="custom-bullet-list space-y-1">
                <li>
                  <strong>Alt + 1:</strong>
                  Skip to main content
                </li>
                <li>
                  <strong>Alt + 2:</strong>
                  Jump to navigation menu
                </li>
                <li>
                  <strong>Alt + 3:</strong>
                  Jump to footer/contact section
                </li>
              </ul>

              <h4 class="text-lg font-medium mt-4 mb-2 text-gray-800">Accessibility Features</h4>
              <ul class="custom-bullet-list space-y-1">
                <li>
                  <strong>Alt + A:</strong>
                  Toggle accessibility widget
                </li>
                <li>
                  <strong>Alt + F:</strong>
                  Toggle focus mode (highlight the currently focused element)
                </li>
                <li>
                  <strong>Alt + X:</strong>
                  Toggle high contrast mode
                </li>
                <li>
                  <strong>Alt + Z:</strong>
                  Toggle reduced motion (pauses videos and animations)
                </li>
              </ul>

              <h4 class="text-lg font-medium mt-4 mb-2 text-gray-800">Utility Shortcuts</h4>
              <ul class="custom-bullet-list space-y-1">
                <li>
                  <strong>Alt + 0:</strong>
                  Back to top
                </li>
                <li>
                  <strong>Alt + /:</strong>
                  Open keyboard shortcuts help dialog
                </li>
                <li>
                  <strong>Alt + L:</strong>
                  Switch to left-handed mode
                </li>
                <li>
                  <strong>Alt + R:</strong>
                  Switch to right-handed mode
                </li>
              </ul>

              <p class="mt-3 text-sm italic">
                Note: Some keyboard shortcuts may not work if they conflict with your browser or
                assistive technology shortcuts.
              </p>
            </section>

            <section class="mt-6">
              <h3 class="text-xl font-semibold mb-2 text-gray-800">Accessibility Widget</h3>
              <p>
                Our website includes an accessibility widget that allows you to customize your
                experience. You can:
              </p>
              <ul class="custom-bullet-list mt-2 space-y-1">
                <li>Adjust text size (increase or decrease)</li>
                <li>Switch to OpenDyslexic font for better readability</li>
                <li>Enable high contrast mode</li>
                <li>Enable enhanced focus indicators</li>
                <li>Reduce animations and motion (automatically pauses videos)</li>
                <li>Choose between left-handed or right-handed widget positioning</li>
                <li>Reset all settings to default</li>
              </ul>
              <p class="mt-2">
                Access the widget using the accessibility icon in the bottom right corner of the
                screen or by pressing
                <strong>Alt + A</strong>
                . Your preferences are saved between visits using browser local storage.
              </p>
            </section>

            <section class="mt-6">
              <h3 class="text-xl font-semibold mb-2 text-gray-800">WCAG 2.2 AAA Enhancements</h3>
              <p>Our website implements several WCAG 2.2 Level AAA success criteria, including:</p>
              <ul class="custom-bullet-list mt-2 space-y-1">
                <li>Enhanced contrast ratios (7:1 ratio) for text and interface elements</li>
                <li>Complete keyboard accessibility without timing requirements</li>
                <li>No animations that could trigger seizures or physical reactions</li>
                <li>Clear section headings to organize content</li>
                <li>Enhanced target sizes (44×44px) for all interactive elements</li>
                <li>Context changes that only occur on user request</li>
                <li>Comprehensive help documentation</li>
              </ul>
            </section>

            <section class="mt-6">
              <h3 class="text-xl font-semibold mb-2 text-gray-800">Feedback</h3>
              <p>
                We are continually working to improve our AAA compliance. We welcome your feedback
                on the accessibility of this website. If you encounter accessibility barriers or
                have suggestions for improvement, please contact us at team@blaeu.com.
              </p>
            </section>

            <section class="mt-6">
              <p class="text-sm text-gray-500 mt-8">
                If there is an inconsistency between the Dutch and English-language version of this
                statement, the Dutch version takes precedence.
              </p>
            </section>

            <div class="download-link mt-6">
              <a
                href="#"
                class="text-brand-blue hover:underline flex items-center"
                @click.prevent="downloadPolicy"
              >
                <i class="fa-solid fa-download mr-2" aria-hidden="true"></i>
                Download accessibility statement
              </a>
            </div>
          </div>

          <!-- Dutch Full Content -->
          <div v-else class="prose max-w-none text-gray-800">
            <p>
              Wij streven ernaar om digitale toegankelijkheid te waarborgen voor mensen met een
              beperking. We verbeteren voortdurend de gebruikerservaring voor iedereen en passen de
              relevante toegankelijkheidsnormen toe.
            </p>

            <p class="text-gray-500 mt-4">Laatst bijgewerkt: 12 april 2025</p>

            <section class="mt-6">
              <h3 class="text-xl font-semibold mb-2 text-gray-800">Conformiteitsstatus</h3>
              <p>
                De Web Content Accessibility Guidelines (WCAG) definieert eisen voor ontwerpers en
                ontwikkelaars om de toegankelijkheid voor mensen met een beperking te verbeteren.
                Het definieert drie conformiteitsniveaus: Niveau A, Niveau AA en Niveau AAA.
              </p>
              <p class="mt-2">
                De website bestaat uit twee pagina's (homepage met stille video en een persoonlijke
                pagina) zonder formulieren, invoervelden of authenticatiemechanismen. Deze
                formuliervrije aanpak vermindert aanzienlijk mogelijke toegankelijkheidsbarrières
                voor gebruikers met een beperking. Voor zover wij weten is deze website volledig
                conform WCAG 2.2 niveau A-standaarden, met de meeste AA- en verschillende
                AAA-verbeteringen.
              </p>
            </section>

            <section class="mt-6">
              <h3 class="text-xl font-semibold mb-2 text-gray-800">Toegankelijkheidsfuncties</h3>
              <p>Deze website bevat de volgende toegankelijkheidsfuncties:</p>
              <ul class="custom-bullet-list mt-2 space-y-2">
                <li>Juiste semantische HTML-structuur met herkenningspunten</li>
                <li>Toetsenbord-toegankelijke navigatie met verbeterde focusindicatoren</li>
                <li>
                  Doorspring-link naar inhoud met verbeterde zichtbaarheid en meerdere
                  navigatiemogelijkheden
                </li>
                <li>
                  ARIA-attributen en live-regio's voor schermlezers met correcte aankondigingen
                </li>
                <li>
                  Hoog kleurcontrast dat AA-standaarden overtreft (4.5:1 ratio) met
                  AAA-verbeteringen (7:1 ratio)
                </li>
                <li>Responsief ontwerp geoptimaliseerd voor alle apparaten en oriëntaties</li>
                <li>Volledige tekstalternatieven voor alle niet-tekstuele inhoud</li>
                <li>Toegankelijke videospeler met bediening en juiste rolbenaming</li>
                <li>
                  Uitgebreide toegankelijkheidswidget met door de gebruiker bestuurbare instellingen
                  en voorkeursgeheugen
                </li>
                <li>OpenDyslexic lettertype-optie voor gebruikers met leesmoeilijkheden</li>
                <li>Bewegingsreductie-besturing die automatisch video's en animaties pauzeert</li>
                <li>Ondersteuning voor prefers-reduced-motion en andere gebruikersvoorkeuren</li>
                <li>Meertalige toegankelijkheidsondersteuning met taalschakelaar</li>
                <li>Downloadbare toegankelijkheidsverklaring in tekstformaat</li>
                <li>Verbeterde doelgroottes voor interactieve elementen (minimaal 44×44px)</li>
              </ul>
            </section>

            <section class="mt-6">
              <h3 class="text-xl font-semibold mb-2 text-gray-800">
                Compatibiliteit met Hulptechnologieën
              </h3>
              <p>
                Onze website is ontworpen om compatibel te zijn met de volgende hulptechnologieën:
              </p>
              <ul class="custom-bullet-list mt-2 space-y-1">
                <li>Schermlezers (NVDA, VoiceOver, JAWS, TalkBack)</li>
                <li>Schermvergrotingssoftware</li>
                <li>Spraakherkenningssoftware</li>
                <li>Toetsenbordnavigatie met volledige functionaliteit</li>
                <li>Toegankelijkheidsinstellingen en -extensies van browsers</li>
                <li>Weergavevoorkeuren (verminderde beweging, hoog contrast)</li>
                <li>Ondersteunende aanraak- en aanwijsapparaten</li>
              </ul>
              <p class="mt-2">
                We streven ernaar compatibiliteit te garanderen met de nieuwste versies van deze
                technologieën en testen regelmatig met gebruikers van ondersteunende technologieën.
              </p>
            </section>

            <section class="mt-6">
              <h3 class="text-xl font-semibold mb-2 text-gray-800">Toetsenbordsnelkoppelingen</h3>
              <p>
                De volgende toetsenbordsnelkoppelingen zijn beschikbaar om door de website te
                navigeren:
              </p>

              <h4 class="text-lg font-medium mt-4 mb-2 text-gray-800">Primaire Navigatie</h4>
              <ul class="custom-bullet-list space-y-1">
                <li>
                  <strong>Alt + 1:</strong>
                  Spring naar hoofdinhoud
                </li>
                <li>
                  <strong>Alt + 2:</strong>
                  Spring naar navigatiemenu
                </li>
                <li>
                  <strong>Alt + 3:</strong>
                  Spring naar footer/contactgedeelte
                </li>
              </ul>

              <h4 class="text-lg font-medium mt-4 mb-2 text-gray-800">Toegankelijkheidsfuncties</h4>
              <ul class="custom-bullet-list space-y-1">
                <li>
                  <strong>Alt + A:</strong>
                  Toegankelijkheidswidget aan/uit
                </li>
                <li>
                  <strong>Alt + F:</strong>
                  Focusmodus aan/uit (markeert het momenteel gefocuste element)
                </li>
                <li>
                  <strong>Alt + X:</strong>
                  Hoog contrast modus aan/uit
                </li>
                <li>
                  <strong>Alt + Z:</strong>
                  Verminderde beweging aan/uit (pauzeert video's en animaties)
                </li>
              </ul>

              <h4 class="text-lg font-medium mt-4 mb-2 text-gray-800">Hulpsnelkoppelingen</h4>
              <ul class="custom-bullet-list space-y-1">
                <li>
                  <strong>Alt + 0:</strong>
                  Terug naar boven
                </li>
                <li>
                  <strong>Alt + /:</strong>
                  Open hulpdialoog voor toetsenbordsnelkoppelingen
                </li>
                <li>
                  <strong>Alt + L:</strong>
                  Schakel naar linkshandige modus
                </li>
                <li>
                  <strong>Alt + R:</strong>
                  Schakel naar rechtshandige modus
                </li>
              </ul>

              <p class="mt-3 text-sm italic">
                Opmerking: Sommige toetsenbordsnelkoppelingen werken mogelijk niet als ze
                conflicteren met snelkoppelingen van uw browser of ondersteunende technologie.
              </p>
            </section>

            <section class="mt-6">
              <h3 class="text-xl font-semibold mb-2 text-gray-800">Toegankelijkheidswidget</h3>
              <p>
                Onze website bevat een toegankelijkheidswidget waarmee u uw ervaring kunt aanpassen.
                U kunt:
              </p>
              <ul class="custom-bullet-list mt-2 space-y-1">
                <li>Tekstgrootte aanpassen (vergroten of verkleinen)</li>
                <li>Overschakelen naar OpenDyslexic lettertype voor betere leesbaarheid</li>
                <li>Hoog contrast modus inschakelen</li>
                <li>Verbeterde focusindicatoren inschakelen</li>
                <li>Animaties en beweging verminderen (pauzeert automatisch video's)</li>
                <li>Kies tussen links- of rechtshandige widget-positionering</li>
                <li>Alle instellingen terugzetten naar standaard</li>
              </ul>
              <p class="mt-2">
                Toegang tot de widget via het toegankelijkheidspictogram in de rechteronderhoek van
                het scherm of door op
                <strong>Alt + A</strong>
                te drukken. Uw voorkeuren worden tussen bezoeken opgeslagen via lokale
                browseropslag.
              </p>
            </section>

            <section class="mt-6">
              <h3 class="text-xl font-semibold mb-2 text-gray-800">WCAG 2.2 AAA Verbeteringen</h3>
              <p>
                Onze website implementeert verschillende WCAG 2.2 Niveau AAA-succescriteria,
                waaronder:
              </p>
              <ul class="custom-bullet-list mt-2 space-y-1">
                <li>
                  Verbeterde contrastverhoudingen (7:1 ratio) voor tekst en interface-elementen
                </li>
                <li>Volledige toetsenbordtoegankelijkheid zonder tijdsbeperkingen</li>
                <li>Geen animaties die aanvallen of fysieke reacties kunnen veroorzaken</li>
                <li>Duidelijke sectiekopjes om inhoud te organiseren</li>
                <li>Verbeterde doelgrootte (44×44px) voor alle interactieve elementen</li>
                <li>Contextwijzigingen die alleen optreden op verzoek van de gebruiker</li>
                <li>Uitgebreide helpdocumentatie</li>
              </ul>
            </section>

            <section class="mt-6">
              <h3 class="text-xl font-semibold mb-2 text-gray-800">Feedback</h3>
              <p>
                We werken voortdurend aan het verbeteren van onze AAA-compliance. Wij verwelkomen uw
                feedback over de toegankelijkheid van deze website. Als u toegankelijkheidsbarrières
                ondervindt of suggesties heeft voor verbetering, neem dan contact met ons op via
                team@blaeu.com.
              </p>
            </section>

            <div class="download-link mt-6">
              <a
                href="#"
                class="text-brand-blue hover:underline flex items-center"
                @click.prevent="downloadPolicy"
              >
                <i class="fa-solid fa-download mr-2" aria-hidden="true"></i>
                Download toegankelijkheidsverklaring
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
  import { useNuxtApp } from '#app'
  import { globalState } from '~/composables/globalState'
  import type { KeyboardEventHandler, MouseEventHandler } from '~/types/events'

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
    openWidget: (language?: 'en' | 'nl') => {
      if (language) {
        currentLanguage.value = language
      }
      // Remove hard-coded fallback - let globalState handle defaults
      isOpen.value = true

      // Update position from global state
      if (globalState.widgetPosition) {
        position.value = globalState.widgetPosition
      }

      // Announce to screen readers
      const { $announce } = useNuxtApp()
      if ($announce) {
        $announce('Accessibility statement opened', 'assertive')
      }
    },
    openFullPolicy: (language?: 'en' | 'nl') => {
      if (language) {
        currentLanguage.value = language
      }
      // Remove hard-coded fallback - let globalState handle defaults
      isOpen.value = true
      isPolicyExpanded.value = true

      // Update position from global state
      if (globalState.widgetPosition) {
        position.value = globalState.widgetPosition
      }

      // Announce to screen readers
      const { $announce } = useNuxtApp()
      if ($announce) {
        $announce('Complete accessibility statement expanded', 'assertive')
      }
    },
  })

  const positionClass = computed(() => {
    return `accessibility-policy-widget-${position.value}`
  })

  // No toggle function needed as widget is only controlled via links

  const closeWidget = (): void => {
    isOpen.value = false
    isPolicyExpanded.value = false
  }

  const expandPolicy = (): void => {
    isPolicyExpanded.value = true

    // Announce to screen readers
    const { $announce } = useNuxtApp()
    if ($announce) {
      $announce('Complete accessibility statement expanded', 'polite')
    }
  }

  const collapsePolicy = (): void => {
    isPolicyExpanded.value = false

    // Announce to screen readers
    const { $announce } = useNuxtApp()
    if ($announce) {
      $announce('Returned to accessibility statement summary', 'polite')
    }
  }

  /**
   * Generate Dutch accessibility statement content
   */
  const generateDutchContent = (): string => {
    return `TOEGANKELIJKHEIDSVERKLARING - TEAM BLAEU (BLAEU PRIVACY RESPONSE TEAM B.V.)
Laatst bijgewerkt: 12 april 2025

ONZE TOEWIJDING
Wij streven ernaar om digitale toegankelijkheid te waarborgen voor mensen met een beperking. We verbeteren voortdurend de gebruikerservaring voor iedereen en passen de relevante toegankelijkheidsnormen toe.

CONFORMITEITSSTATUS
De Web Content Accessibility Guidelines (WCAG) definieert eisen voor ontwerpers en ontwikkelaars om de toegankelijkheid voor mensen met een beperking te verbeteren. Het definieert drie conformiteitsniveaus: Niveau A, Niveau AA en Niveau AAA.

Voor zover wij weten is deze website volledig conform WCAG 2.2 niveau A-standaarden, met de meeste AA- en verschillende AAA-verbeteringen.

TOEGANKELIJKHEIDSFUNCTIES
Deze website bevat de volgende toegankelijkheidsfuncties:
- Juiste semantische HTML-structuur met herkenningspunten
- Toetsenbord-toegankelijke navigatie met verbeterde focusindicatoren
- Doorspring-link naar inhoud met verbeterde zichtbaarheid en meerdere navigatiemogelijkheden
- ARIA-attributen en live-regio's voor schermlezers met correcte aankondigingen
- Hoog kleurcontrast dat AA-standaarden overtreft (4.5:1 ratio) met AAA-verbeteringen (7:1 ratio)
- Responsief ontwerp geoptimaliseerd voor alle apparaten en oriëntaties
- Volledige tekstalternatieven voor alle niet-tekstuele inhoud
- Toegankelijke videospeler met bediening en juiste rolbenaming
- Uitgebreide toegankelijkheidswidget met door de gebruiker bestuurbare instellingen en voorkeursgeheugen
- OpenDyslexic lettertype-optie voor gebruikers met leesmoeilijkheden
- Bewegingsreductie-besturing die automatisch video's en animaties pauzeert
- Ondersteuning voor prefers-reduced-motion en andere gebruikersvoorkeuren
- Meertalige toegankelijkheidsondersteuning met taalschakelaar
- Downloadbare toegankelijkheidsverklaring in tekstformaat
- Verbeterde doelgroottes voor interactieve elementen (minimaal 44×44px)

COMPATIBILITEIT MET HULPTECHNOLOGIEËN
Onze website is ontworpen om compatibel te zijn met de volgende hulptechnologieën:
- Schermlezers (NVDA, VoiceOver, JAWS, TalkBack)
- Schermvergrotingssoftware
- Spraakherkenningssoftware
- Toetsenbordnavigatie met volledige functionaliteit
- Toegankelijkheidsinstellingen en -extensies van browsers
- Weergavevoorkeuren (verminderde beweging, hoog contrast)
- Ondersteunende aanraak- en aanwijsapparaten

We streven ernaar compatibiliteit te garanderen met de nieuwste versies van deze technologieën en testen regelmatig met gebruikers van ondersteunende technologieën.

TOETSENBORDSNELKOPPELINGEN
De volgende toetsenbordsnelkoppelingen zijn beschikbaar om door de website te navigeren:

Primaire Navigatie
- Alt + 1: Spring naar hoofdinhoud
- Alt + 2: Spring naar navigatiemenu
- Alt + 3: Spring naar footer/contactgedeelte

Toegankelijkheidsfuncties
- Alt + A: Toegankelijkheidswidget aan/uit
- Alt + F: Focusmodus aan/uit (markeert het momenteel gefocuste element)
- Alt + X: Hoog contrast modus aan/uit
- Alt + Z: Verminderde beweging aan/uit (pauzeert video's en animaties)

Hulpsnelkoppelingen
- Alt + 0: Terug naar boven
- Alt + /: Open hulpdialoog voor toetsenbordsnelkoppelingen
- Alt + L: Schakel naar linkshandige modus
- Alt + R: Schakel naar rechtshandige modus

Opmerking: Sommige toetsenbordsnelkoppelingen werken mogelijk niet als ze conflicteren met snelkoppelingen van uw browser of ondersteunende technologie.

TOEGANKELIJKHEIDSWIDGET
Onze website bevat een toegankelijkheidswidget waarmee u uw ervaring kunt aanpassen. U kunt:
- Tekstgrootte aanpassen (vergroten of verkleinen)
- Overschakelen naar OpenDyslexic lettertype voor betere leesbaarheid
- Hoog contrast modus inschakelen
- Verbeterde focusindicatoren inschakelen
- Animaties en beweging verminderen (pauzeert automatisch video's)
- Kies tussen links- of rechtshandige widget-positionering
- Alle instellingen terugzetten naar standaard

Toegang tot de widget via het toegankelijkheidspictogram in de rechteronderhoek van het scherm of door op Alt + A te drukken. Uw voorkeuren worden tussen bezoeken opgeslagen via lokale browseropslag.

WCAG 2.2 AAA VERBETERINGEN
Onze website implementeert verschillende WCAG 2.2 Niveau AAA-succescriteria, waaronder:
- Verbeterde contrastverhoudingen (7:1 ratio) voor tekst en interface-elementen
- Volledige toetsenbordtoegankelijkheid zonder tijdsbeperkingen
- Geen animaties die aanvallen of fysieke reacties kunnen veroorzaken
- Duidelijke sectiekopjes om inhoud te organiseren
- Verbeterde doelgrootte (44×44px) voor alle interactieve elementen
- Contextwijzigingen die alleen optreden op verzoek van de gebruiker
- Uitgebreide helpdocumentatie

Voor meer details over onze toegankelijkheidsnaleving kunt u ons volledige WCAG-beoordelingsrapport bekijken.

FEEDBACK
Wij verwelkomen uw feedback over de toegankelijkheid van deze website. Als u toegankelijkheidsbarrières ondervindt of suggesties heeft voor verbetering, neem dan contact met ons op via team@blaeu.com.

Bij een inconsistentie tussen de Nederlandse en Engelstalige versie van deze verklaring, heeft de Nederlandse versie voorrang.`
  }

  /**
   * Generate English accessibility statement content
   */
  const generateEnglishContent = (): string => {
    return `ACCESSIBILITY STATEMENT - TEAM BLAEU (BLAEU PRIVACY RESPONSE TEAM B.V.)
Last Updated: April 12, 2025

OUR COMMITMENT
We are committed to ensuring digital accessibility for people with disabilities. We continually improve the user experience for everyone and apply the relevant accessibility standards.

CONFORMANCE STATUS
The Web Content Accessibility Guidelines (WCAG) defines requirements for designers and developers to improve accessibility for people with disabilities. It defines three levels of conformance: Level A, Level AA, and Level AAA.

To the best of our knowledge, this website is fully conformant with WCAG 2.2 level A standards, with most AA and several AAA enhancements.

ACCESSIBILITY FEATURES
This website includes the following accessibility features:
- Proper semantic HTML structure with landmark regions
- Keyboard-accessible navigation with enhanced focus indicators
- Skip to content link with enhanced visibility and multiple ways to navigate
- ARIA attributes and live regions for screen readers with proper announcements
- High color contrast exceeding AA standards (4.5:1 ratio) with AAA enhancements (7:1 ratio)
- Responsive design optimized for all devices and orientations
- Complete text alternatives for all non-text content
- Accessible video player with controls and proper role designation
- Comprehensive accessibility widget with user-controlled settings and preference memory
- OpenDyslexic font option for users with reading difficulties
- Motion reduction controls that automatically pause videos and animations
- Support for prefers-reduced-motion and other user preferences
- Multilingual accessibility support with language toggle
- Downloadable accessibility statement in text format
- Enhanced target sizes for interactive elements (44×44px minimum)

COMPATIBILITY WITH ASSISTIVE TECHNOLOGIES
Our website is designed to be compatible with the following assistive technologies:
- Screen readers (NVDA, VoiceOver, JAWS, TalkBack)
- Screen magnification software
- Speech recognition software
- Keyboard navigation with full functionality
- Browser accessibility settings and extensions
- Display preferences (reduced motion, high contrast)
- Assistive touch and pointer devices

We strive to ensure compatibility with the latest versions of these technologies and regularly test with assistive technology users.

KEYBOARD SHORTCUTS
The following keyboard shortcuts are available to help navigate the website:

Primary Navigation
- Alt + 1: Skip to main content
- Alt + 2: Jump to navigation menu
- Alt + 3: Jump to footer/contact section

Accessibility Features
- Alt + A: Toggle accessibility widget
- Alt + F: Toggle focus mode (highlight the currently focused element)
- Alt + X: Toggle high contrast mode
- Alt + Z: Toggle reduced motion (pauses videos and animations)

Utility Shortcuts
- Alt + 0: Back to top
- Alt + /: Open keyboard shortcuts help dialog
- Alt + L: Switch to left-handed mode
- Alt + R: Switch to right-handed mode

Note: Some keyboard shortcuts may not work if they conflict with your browser or assistive technology shortcuts.

ACCESSIBILITY WIDGET
Our website includes an accessibility widget that allows you to customize your experience. You can:
- Adjust text size (increase or decrease)
- Switch to OpenDyslexic font for better readability
- Enable high contrast mode
- Enable enhanced focus indicators
- Reduce animations and motion (automatically pauses videos)
- Choose between left-handed or right-handed widget positioning
- Reset all settings to default

Access the widget using the accessibility icon in the bottom right corner of the screen or by pressing Alt + A. Your preferences are saved between visits using browser local storage.

WCAG 2.2 AAA ENHANCEMENTS
Our website implements several WCAG 2.2 Level AAA success criteria, including:
- Enhanced contrast ratios (7:1 ratio) for text and interface elements
- Complete keyboard accessibility without timing requirements
- No animations that could trigger seizures or physical reactions
- Clear section headings to organize content
- Enhanced target sizes (44×44px) for all interactive elements
- Context changes that only occur on user request
- Comprehensive help documentation

For more details on our accessibility compliance, you can view our full WCAG assessment report.

FEEDBACK
We welcome your feedback on the accessibility of this website. If you encounter accessibility barriers or have suggestions for improvement, please contact us at team@blaeu.com.

If there is an inconsistency between the Dutch and English-language version of this statement, the Dutch version takes precedence.`
  }

  /**
   * Create and trigger file download
   */
  const triggerFileDownload = (content: string, fileName: string): void => {
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)

    const a = document.createElement('a')
    a.href = url
    a.download = fileName

    document.body.appendChild(a)
    a.click()

    setTimeout(() => {
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }, 100)
  }

  const downloadPolicy = (): void => {
    const isNL = currentLanguage.value === 'nl'
    const fileName = isNL
      ? 'toegankelijkheidsverklaring-blaeu.txt'
      : 'accessibility-statement-blaeu.txt'

    const content = isNL ? generateDutchContent() : generateEnglishContent()

    triggerFileDownload(content, fileName)

    const { $announce } = useNuxtApp()
    if ($announce) {
      $announce(
        isNL
          ? 'Toegankelijkheidsverklaring wordt gedownload'
          : 'Accessibility statement is being downloaded',
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

    // Set up position watcher to update CSS class
    watch(
      () => position.value,
      newPosition => {
        // Update the data attribute for any specific CSS targeting
        if (process.client && document) {
          document.documentElement.setAttribute('data-accessibility-widget-position', newPosition)
        }
      },
      { immediate: true }
    )

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
    document.addEventListener('keydown', keyboardHandler)

    // Set up click outside handler
    documentClickHandler = (e: Event): void => {
      if (
        isOpen.value &&
        widgetRef.value &&
        e.target instanceof Node &&
        !widgetRef.value.contains(e.target)
      ) {
        closeWidget()
      }
    }
    document.addEventListener('mousedown', documentClickHandler)

    // Listen for accessibility policy widget open requests
    document.addEventListener('open-accessibility-policy', (event: CustomEvent) => {
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

      // Update position from global state
      if (globalState.widgetPosition) {
        position.value = globalState.widgetPosition
      }

      // Announce to screen readers
      const { $announce } = useNuxtApp()
      if ($announce) {
        $announce('Accessibility statement opened', 'assertive')
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
  })
</script>

<style scoped>
  .accessibility-policy-widget {
    position: fixed;
    z-index: 53; /* For the button itself - higher position between other widgets */
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

  /* Position classes - only needed for left/right positioning since bottom is fixed */
  .accessibility-policy-widget-top-left,
  .accessibility-policy-widget-bottom-left {
    left: 20px;
  }

  .accessibility-policy-widget-top-right,
  .accessibility-policy-widget-bottom-right {
    right: 20px;
  }

  /* Bottom positioning is now handled in the main panel style */

  /* No toggle button styles needed */

  /* Widget panel */
  .accessibility-policy-widget-panel {
    position: fixed; /* Keep fixed for consistent positioning */
    width: 280px;
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
    z-index: 5100; /* Increased z-index to ensure it appears above all other elements */
    bottom: 80px !important; /* Fine-tuned position - moved 20px higher than standard widgets */
    /* Position is determined by position classes (.accessibility-policy-widget-top-left, etc.) */
  }

  .accessibility-policy-widget-panel.open {
    display: flex;
  }

  /* Expanded panel for full policy */
  .accessibility-policy-widget-panel.expanded {
    width: min(90vw, 500px);
    max-height: 80vh;
    overflow-y: auto;
  }

  /* Full screen in mobile mode */
  @media (max-width: 640px) {
    .accessibility-policy-widget-panel.expanded {
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

    /* Adjust accessibility policy content for mobile */
    .accessibility-policy-widget-panel.expanded .accessibility-policy-widget-header {
      position: sticky !important;
      top: 0 !important;
      background: white !important;
      padding: 1rem !important;
      z-index: 10 !important;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1) !important;
      width: 100% !important;
    }

    .accessibility-policy-widget-panel.expanded .accessibility-policy-widget-content {
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
  .accessibility-policy-widget-bottom-left .accessibility-policy-widget-panel {
    left: 20px;
  }

  .accessibility-policy-widget-bottom-right .accessibility-policy-widget-panel {
    right: 20px;
  }

  /* Panel header */
  .accessibility-policy-widget-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #eaeaea;
    padding-bottom: 12px;
    margin-bottom: 4px;
  }

  .accessibility-policy-widget-title {
    font-size: 16px;
    font-weight: 600;
    color: #333;
    margin: 0;
  }

  .accessibility-policy-widget-close {
    background: transparent;
    border: none;
    color: #777;
    cursor: pointer;
    padding: 4px;
    border-radius: 4px;
  }

  .accessibility-policy-widget-close:hover {
    color: #333;
    background-color: #f5f5f5;
  }

  .accessibility-policy-widget-close:focus-visible {
    outline: 2px solid #00a8e6;
    outline-offset: 2px;
  }

  /* Widget content */
  .accessibility-policy-widget-content {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  /* Language selector */
  .accessibility-policy-language-selector {
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
    max-height: calc(70vh - 120px);
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
    .accessibility-policy-widget-panel {
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
  .accessibility-policy-widget-open .accessibility-policy-widget-panel {
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
