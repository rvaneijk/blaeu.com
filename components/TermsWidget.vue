<!--
 * @author Blaeu Privacy Response Team
 * @copyright Copyright © 2019 - 2025 Team Blaeu. Content is licensed under CC BY 4.0 unless otherwise noted. All Rights Reserved.
 * @license CC BY 4.0
-->
<template>
  <div
    ref="widgetRef"
    :class="[
      'terms-widget',
      { 'terms-widget-open': isOpen, 'policy-expanded': isPolicyExpanded },
      positionClass,
    ]"
  >
    <!-- No toggle button since it will be opened via link only -->

    <!-- Widget panel with controls -->
    <div
      id="terms-controls"
      class="terms-widget-panel"
      :class="{ open: isOpen, expanded: isPolicyExpanded }"
      role="dialog"
      aria-labelledby="terms-widget-title"
      style="z-index: 5300"
    >
      <div class="terms-widget-header">
        <h2 id="terms-widget-title" class="terms-widget-title">
          {{ currentLanguage === 'nl' ? 'Algemene Voorwaarden' : 'General Terms and Conditions' }}
        </h2>
        <button
          class="terms-widget-close"
          aria-label="Close terms and conditions"
          @click="closeWidget"
        >
          <i class="fa-solid fa-xmark" aria-hidden="true"></i>
        </button>
      </div>

      <div class="terms-widget-content">
        <!-- Language selector -->
        <div class="terms-language-selector">
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
            <p class="font-medium mb-3">In short:</p>
            <ul class="list-disc pl-6 space-y-1 text-sm">
              <li>
                Blaeu Privacy Response Team B.V. (hereinafter: Team Blaeu) is a private limited
                company registered at the Dutch Chamber of Commerce under no. 75599740.
              </li>
              <li>Team Blaeu does not charge office costs.</li>
              <li>Team Blaeu bills on a monthly basis with a payment period of 30 days.</li>
              <li>
                Team Blaeu's liability is restricted to the fee already paid (max. EUR 5,000).
                Claims expire after one year.
              </li>
              <li>Team Blaeu does not accept liability for subcontractors.</li>
              <li>Dutch law applies. The court in Rotterdam, the Netherlands is competent.</li>
            </ul>
            <p class="text-gray-500 mt-3">Last Updated: March 1, 2025</p>
          </div>

          <!-- Dutch Summary -->
          <div v-else class="prose max-w-none text-gray-800">
            <p class="font-medium mb-3">In het kort:</p>
            <ul class="list-disc pl-6 space-y-1 text-sm">
              <li>
                Blaeu Privacy Response Team B.V. (hierna: Team Blaeu) is een besloten vennootschap
                ingeschreven bij de Kamer van Koophandel onder nr. 75599740.
              </li>
              <li>Team Blaeu brengt geen kantoorkosten in rekening.</li>
              <li>Team Blaeu factureert maandelijks met een betalingstermijn van 30 dagen.</li>
              <li>
                De aansprakelijkheid van Team Blaeu is beperkt tot het reeds betaalde honorarium
                (max. EUR 5.000). Vorderingen vervallen na één jaar.
              </li>
              <li>Team Blaeu aanvaardt geen aansprakelijkheid voor onderaannemers.</li>
              <li>
                Nederlands recht is van toepassing. De rechtbank te Rotterdam, Nederland is bevoegd.
              </li>
            </ul>
            <p class="text-gray-500 mt-3">Laatst bijgewerkt: 1 maart 2025</p>
          </div>

          <!-- View Complete Statement Button -->
          <button
            class="view-complete-policy"
            aria-expanded="false"
            aria-controls="full-policy-content"
            @click="expandPolicy"
          >
            {{ currentLanguage === 'nl' ? 'Bekijk volledige voorwaarden' : 'View complete terms' }}
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
                  ? 'Download algemene voorwaarden'
                  : 'Download terms and conditions'
              }}
            </a>
          </div>
        </div>

        <!-- Full Terms and Conditions Content -->
        <div v-else id="full-policy-content" class="full-policy">
          <button class="back-to-summary" aria-label="Back to summary" @click="collapsePolicy">
            <i class="fa-solid fa-chevron-left mr-2" aria-hidden="true"></i>
            {{ currentLanguage === 'nl' ? 'Terug naar samenvatting' : 'Back to summary' }}
          </button>

          <!-- English Content -->
          <div v-if="currentLanguage === 'en'" class="prose max-w-none text-gray-800">
            <div class="mb-6">
              <p>In short:</p>
              <ul class="list-disc pl-6 space-y-1 text-sm">
                <li>
                  Blaeu Privacy Response Team B.V. (hereinafter: Team Blaeu) is a private limited
                  company registered at the Dutch Chamber of Commerce under no. 75599740.
                </li>
                <li>Team Blaeu does not charge office costs.</li>
                <li>Team Blaeu bills on a monthly basis with a payment period of 30 days.</li>
                <li>
                  Team Blaeu's liability is restricted to the fee already paid (max. EUR 5,000).
                  Claims expire after one year.
                </li>
                <li>Team Blaeu does not accept liability for subcontractors.</li>
                <li>Dutch law applies. The court in Rotterdam, the Netherlands is competent.</li>
              </ul>
              <p class="text-gray-500 mt-4">Last Updated: March 1, 2025</p>
            </div>

            <ol class="list-decimal pl-5 space-y-2 mt-2">
              <li>
                Blaeu Privacy Response Team B.V. (Team Blaeu) is a private limited company under
                Dutch law. Team Blaeu is located in Rotterdam and is registered at the Dutch Chamber
                of Commerce under no. 75599740.
              </li>

              <li>
                These General Terms and Conditions apply to all legal relationships between Team
                Blaeu and the client, unless the parties have agreed otherwise in writing prior to
                the conclusion of an agreement. Team Blaeu excludes the applicability of any general
                terms and conditions used by the client.
              </li>

              <li>
                Team Blaeu may engage third parties in the course of the performance of an
                assignment. Team Blaeu shall apply the necessary care when engaging third parties.
                Team Blaeu shall not be liable vis-à-vis the client for any actions of those third
                parties. The client gives Team Blaeu authority to accept on behalf of the client a
                limitation of liability stipulated by such person. All assignments are deemed to be
                performed by Team Blaeu, and not by a specific person associated with Team Blaeu
                Sections 7:404 and 7:407 subsection 2 of the Dutch Civil Code (Burgerlijk Wetboek)
                are herewith excluded.
              </li>

              <li>
                For the performance of an assignment, the client will be due the fee plus
                disbursements (such as travel costs) and VAT payable, unless exempt from VAT, e.g.,
                on the basis of Article 44 of the European VAT Directive 2006/112/EC.
              </li>

              <li>
                Team Blaeu will bill the client on a monthly basis, unless agreed otherwise in
                writing. The payment period is 30 days from the invoice date. If the payment has not
                been received within the agreed term, the client will be deemed to be in default
                without prior notice and Team Blaeu will have the right to charge the statutory
                interest (wettelijke rente) and any judicial and extrajudicial (collection) costs
                (gerechtelijke- en buitengerechtelijke (incasso)kosten).
              </li>

              <li>
                Any liability on the part of Team Blaeu vis-à-vis the client and third parties for
                damages resulting from or related to the performance of an assignment, shall be
                limited to the already paid fee for the activities in relation to which the damage
                has occurred, with a maximum of EUR 5,000. Each claim for damages shall expire after
                a period of one year from the day following the day on which the client became aware
                or could reasonably be aware of the existence of the damages.
              </li>

              <li>
                The client shall indemnify Team Blaeu for any claims of third parties which are in
                any way related to the activities of Team Blaeu for the client. The client shall
                reimburse to Team Blaeu all costs of legal defence and all damages in relation to
                these claims. This provision does not apply to the extent a claim is the result of
                the intent or recklessness (opzet of bewuste roekeloosheid) of Team Blaeu
              </li>

              <li>
                These General Terms and Conditions are also made for the benefit of the persons who
                are or were working for Team Blaeu or who were engaged during the performance of any
                assignment by Team Blaeu
              </li>

              <li>
                Dutch law shall govern the legal relationship between Team Blaeu and its client. The
                complaints procedure of Team Blaeu applies to each engagement. Any dispute between
                Team Blaeu and a client shall be resolved exclusively by the competent court of
                Rotterdam, the Netherlands. In the event of any discrepancy between the Dutch and
                English versions of these General Terms and Conditions, the Dutch version shall
                prevail.
              </li>

              <li>
                The rates to be charged, except for substantive rate adjustments, are adjusted as of
                January 1 of each year in accordance with the consumer price index for all
                households over the preceding period October/October, on the understanding that the
                amounts are rounded to a multiple of five euros.
              </li>

              <li>
                Team Blaeu retains ownership of all items delivered by it until the buyer has fully
                met all payment obligations.
              </li>
            </ol>

            <p class="text-sm text-gray-500 mt-6">
              If there is an inconsistency between the Dutch and English-language version of these
              regulations, the Dutch version takes precedence.
            </p>

            <div class="download-link-complete mt-6">
              <a
                href="#"
                class="text-brand-blue hover:underline flex items-center text-sm"
                @click.prevent="downloadPolicy"
              >
                <i class="fa-solid fa-download mr-2" aria-hidden="true"></i>
                Download terms and conditions
              </a>
            </div>
          </div>

          <!-- Dutch Content -->
          <div v-else class="prose max-w-none text-gray-800">
            <div class="mb-6">
              <p>In het kort:</p>
              <ul class="list-disc pl-6 space-y-1 text-sm">
                <li>
                  Blaeu Privacy Response Team B.V. (hierna: Team Blaeu) is een besloten vennootschap
                  ingeschreven bij de Kamer van Koophandel onder nr. 75599740.
                </li>
                <li>Team Blaeu brengt geen kantoorkosten in rekening.</li>
                <li>Team Blaeu factureert maandelijks met een betalingstermijn van 30 dagen.</li>
                <li>
                  De aansprakelijkheid van Team Blaeu is beperkt tot het reeds betaalde honorarium
                  (max. EUR 5.000). Vorderingen vervallen na één jaar.
                </li>
                <li>Team Blaeu aanvaardt geen aansprakelijkheid voor onderaannemers.</li>
                <li>
                  Nederlands recht is van toepassing. De rechtbank te Rotterdam, Nederland is
                  bevoegd.
                </li>
              </ul>
              <p class="text-gray-500 mt-4">Laatst bijgewerkt: 1 maart 2025</p>
            </div>

            <ol class="list-decimal pl-5 space-y-2 mt-2">
              <li>
                Blaeu Privacy Response Team B.V. (hierna: Team Blaeu) is een besloten vennootschap
                naar Nederlands recht. Team Blaeu is gevestigd in Rotterdam en is ingeschreven bij
                de Kamer van Koophandel onder nummer 75599740.
              </li>

              <li>
                Deze Algemene Voorwaarden zijn van toepassing op alle rechtsverhoudingen tussen Team
                Blaeu en de opdrachtgever, tenzij partijen voorafgaand aan de totstandkoming van een
                overeenkomst schriftelijk anders zijn overeengekomen. Team Blaeu sluit de
                toepasselijkheid van eventuele door de opdrachtgever gehanteerde algemene
                voorwaarden uit.
              </li>

              <li>
                Team Blaeu kan bij de uitvoering van een opdracht derden inschakelen. Team Blaeu zal
                bij het inschakelen van derden de nodige zorgvuldigheid in acht nemen. Team Blaeu is
                niet aansprakelijk jegens de opdrachtgever voor enige tekortkoming van deze derden.
                De opdrachtgever geeft Team Blaeu de bevoegdheid om namens de opdrachtgever een door
                die persoon bedongen aansprakelijkheidsbeperking te aanvaarden. Alle opdrachten
                worden geacht te zijn uitgevoerd door Team Blaeu en niet door een specifiek aan Team
                Blaeu verbonden persoon. De artikelen 7:404 en 7:407 lid 2 van het Burgerlijk
                Wetboek worden hierbij uitgesloten.
              </li>

              <li>
                Voor de uitvoering van een opdracht is de opdrachtgever het honorarium verschuldigd
                vermeerderd met verschotten (zoals reiskosten) en btw, tenzij vrijgesteld van btw,
                bijvoorbeeld op basis van artikel 44 van de Europese btw-richtlijn 2006/112/EG.
              </li>

              <li>
                Team Blaeu zal de opdrachtgever maandelijks factureren, tenzij schriftelijk anders
                overeengekomen. De betalingstermijn is 30 dagen vanaf de factuurdatum. Indien de
                betaling niet binnen de overeengekomen termijn is ontvangen, wordt de opdrachtgever
                geacht zonder voorafgaande ingebrekestelling in verzuim te zijn en heeft Team Blaeu
                het recht de wettelijke rente en eventuele gerechtelijke en buitengerechtelijke
                (incasso)kosten in rekening te brengen.
              </li>

              <li>
                Iedere aansprakelijkheid van Team Blaeu jegens de opdrachtgever en derden voor
                schade die voortvloeit uit of verband houdt met de uitvoering van een opdracht, is
                beperkt tot het reeds betaalde honorarium voor de werkzaamheden waarop de schade
                betrekking heeft, met een maximum van EUR 5.000. Elke vordering tot schadevergoeding
                vervalt na verloop van één jaar vanaf de dag volgend op de dag waarop de
                opdrachtgever bekend werd of redelijkerwijs bekend had kunnen zijn met het bestaan
                van de schade.
              </li>

              <li>
                De opdrachtgever vrijwaart Team Blaeu voor alle aanspraken van derden die op
                enigerlei wijze verband houden met de werkzaamheden van Team Blaeu voor de
                opdrachtgever. De opdrachtgever vergoedt aan Team Blaeu alle kosten van juridische
                bijstand en alle schade in verband met deze claims. Deze bepaling is niet van
                toepassing voor zover een claim het gevolg is van opzet of bewuste roekeloosheid van
                Team Blaeu
              </li>

              <li>
                Deze Algemene Voorwaarden zijn mede gemaakt ten behoeve van de personen die voor
                Team Blaeu werkzaam zijn of waren of die bij de uitvoering van enige opdracht door
                Team Blaeu waren betrokken.
              </li>

              <li>
                Op de rechtsverhouding tussen Team Blaeu en haar opdrachtgever is Nederlands recht
                van toepassing. Geschillen tussen Team Blaeu en een opdrachtgever worden uitsluitend
                beslecht door de bevoegde rechter te Rotterdam, Nederland. In geval van een
                discrepantie tussen de Nederlandse en Engelse versie van deze Algemene Voorwaarden,
                prevaleert de Nederlandse versie.
              </li>

              <li>
                De in rekening te brengen tarieven worden behoudens inhoudelijke tariefaanpassingen
                telkens met ingang van 1 januari aangepast overeenkomstig de consumentenprijsindex
                voor alle huishoudens over de daaraan voorafgaande periode oktober/oktober, met dien
                verstande dat de bedragen worden afgerond op een veelvoud van vijf euro.
              </li>

              <li>
                Team Blaeu behoudt de eigendom van alle door haar geleverde zaken, totdat de koper
                volledig aan al zijn betalingsverplichtingen heeft voldaan.
              </li>
            </ol>

            <div class="download-link mt-6">
              <a
                href="#"
                class="text-brand-blue hover:underline flex items-center text-sm"
                @click.prevent="downloadPolicy"
              >
                <i class="fa-solid fa-download mr-2" aria-hidden="true"></i>
                Download algemene voorwaarden
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
        $announce('Terms and conditions opened', 'assertive')
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
        $announce('Complete terms and conditions expanded', 'assertive')
      }
    },
  })

  const positionClass = computed(() => {
    return `terms-widget-${position.value}`
  })

  const closeWidget = (): void => {
    isOpen.value = false
    isPolicyExpanded.value = false

    // Clear active widget in global state if this was the active one
    if (globalState.activeWidget === 'terms') {
      globalState.activeWidget = null
    }
  }

  const expandPolicy = (): void => {
    isPolicyExpanded.value = true

    // Announce to screen readers
    const { $announce } = useNuxtApp()
    if ($announce) {
      $announce('Complete terms and conditions expanded', 'polite')
    }
  }

  const collapsePolicy = (): void => {
    isPolicyExpanded.value = false

    // Announce to screen readers
    const { $announce } = useNuxtApp()
    if ($announce) {
      $announce('Returned to terms and conditions summary', 'polite')
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
    const fileName = isNL ? 'algemene-voorwaarden-blaeu.txt' : 'terms-and-conditions-blaeu.txt'

    // Generate the content based on the selected language
    let content = ''

    if (isNL) {
      content = `ALGEMENE VOORWAARDEN - TEAM BLAEU (BLAEU PRIVACY RESPONSE TEAM B.V.)
Bijgewerkt op 1 maart 2025

IN HET KORT:
- Blaeu Privacy Response Team B.V. (hierna: Team Blaeu) is een besloten vennootschap ingeschreven bij de Kamer van Koophandel onder nr. 75599740.
- Team Blaeu brengt geen kantoorkosten in rekening.
- Team Blaeu factureert maandelijks met een betalingstermijn van 30 dagen.
- De aansprakelijkheid van Team Blaeu is beperkt tot het reeds betaalde honorarium (max. EUR 5.000). Vorderingen vervallen na één jaar.
- Team Blaeu aanvaardt geen aansprakelijkheid voor onderaannemers.
- Nederlands recht is van toepassing. De rechtbank te Rotterdam, Nederland is bevoegd.

Deze algemene voorwaarden worden hieronder verder uitgewerkt. In geval van een conflict tussen deze samenvatting en de precieze bewoording hieronder, prevaleert de precieze bewoording.

VOLLEDIGE ALGEMENE VOORWAARDEN:

1. Blaeu Privacy Response Team B.V. (hierna: Team Blaeu) is een besloten vennootschap naar Nederlands recht. Blaeu Privacy Response Team B.V. is gevestigd in Rotterdam en is ingeschreven bij de Kamer van Koophandel onder nummer 75599740.

2. Deze Algemene Voorwaarden zijn van toepassing op alle rechtsverhoudingen tussen Team Blaeu en de opdrachtgever, tenzij partijen voorafgaand aan de totstandkoming van een overeenkomst schriftelijk anders zijn overeengekomen. Team Blaeu sluit de toepasselijkheid van eventuele door de opdrachtgever gehanteerde algemene voorwaarden uit.

3. Team Blaeu kan bij de uitvoering van een opdracht derden inschakelen. Team Blaeu zal bij het inschakelen van derden de nodige zorgvuldigheid in acht nemen. Team Blaeu is niet aansprakelijk jegens de opdrachtgever voor enige tekortkoming van deze derden. De opdrachtgever geeft Team Blaeu de bevoegdheid om namens de opdrachtgever een door die persoon bedongen aansprakelijkheidsbeperking te aanvaarden. Alle opdrachten worden geacht te zijn uitgevoerd door Team Blaeu en niet door een specifiek aan Team Blaeu verbonden persoon. De artikelen 7:404 en 7:407 lid 2 van het Burgerlijk Wetboek worden hierbij uitgesloten.

4. Voor de uitvoering van een opdracht is de opdrachtgever het honorarium verschuldigd vermeerderd met verschotten (zoals reiskosten) en btw, tenzij vrijgesteld van btw, bijvoorbeeld op basis van artikel 44 van de Europese btw-richtlijn 2006/112/EG.

5. Team Blaeu zal de opdrachtgever maandelijks factureren, tenzij schriftelijk anders overeengekomen. De betalingstermijn is 30 dagen vanaf de factuurdatum. Indien de betaling niet binnen de overeengekomen termijn is ontvangen, wordt de opdrachtgever geacht zonder voorafgaande ingebrekestelling in verzuim te zijn en heeft Team Blaeu het recht de wettelijke rente en eventuele gerechtelijke en buitengerechtelijke (incasso)kosten in rekening te brengen.

6. Iedere aansprakelijkheid van Team Blaeu jegens de opdrachtgever en derden voor schade die voortvloeit uit of verband houdt met de uitvoering van een opdracht, is beperkt tot het reeds betaalde honorarium voor de werkzaamheden waarop de schade betrekking heeft, met een maximum van EUR 5.000. Elke vordering tot schadevergoeding vervalt na verloop van één jaar vanaf de dag volgend op de dag waarop de opdrachtgever bekend werd of redelijkerwijs bekend had kunnen zijn met het bestaan van de schade.

7. De opdrachtgever vrijwaart Team Blaeu voor alle aanspraken van derden die op enigerlei wijze verband houden met de werkzaamheden van Team Blaeu voor de opdrachtgever. De opdrachtgever vergoedt aan Team Blaeu alle kosten van juridische bijstand en alle schade in verband met deze claims. Deze bepaling is niet van toepassing voor zover een claim het gevolg is van opzet of bewuste roekeloosheid van Team Blaeu.

8. Deze Algemene Voorwaarden zijn mede gemaakt ten behoeve van de personen die voor Team Blaeu werkzaam zijn of waren of die bij de uitvoering van enige opdracht door Team Blaeu waren betrokken.

9. Op de rechtsverhouding tussen Team Blaeu en haar opdrachtgever is Nederlands recht van toepassing. De klachtenprocedure van Team Blaeu is van toepassing op iedere opdracht. Geschillen tussen Team Blaeu en een opdrachtgever worden uitsluitend beslecht door de bevoegde rechter te Rotterdam, Nederland. In geval van een discrepantie tussen de Nederlandse en Engelse versie van deze Algemene Voorwaarden, prevaleert de Nederlandse versie.

10. De in rekening te brengen tarieven worden behoudens inhoudelijke tariefaanpassingen telkens met ingang van 1 januari aangepast overeenkomstig de consumentenprijsindex voor alle huishoudens over de daaraan voorafgaande periode oktober/oktober, met dien verstande dat de bedragen worden afgerond op een veelvoud van vijf euro.

11. Team Blaeu behoudt de eigendom van alle door haar geleverde zaken, totdat de koper volledig aan al zijn betalingsverplichtingen heeft voldaan.`
    } else {
      content = `GENERAL TERMS AND CONDITIONS - TEAM BLAEU (BLAEU PRIVACY RESPONSE TEAM B.V.)
Updated on March 1, 2025

IN SHORT:
- Blaeu Privacy Response Team B.V. (hereinafter: Team Blaeu) is a private limited company registered at the Dutch Chamber of Commerce under no. 75599740.
- Team Blaeu does not charge office costs.
- Team Blaeu bills on a monthly basis with a payment period of 30 days.
- Team Blaeu's liability is restricted to the fee already paid (max. EUR 5,000). Claims expire after one year.
- Team Blaeu does not accept liability for subcontractors.
- Dutch law applies. The court in Rotterdam, the Netherlands is competent.

These terms and conditions are further worked out below. In the case of a conflict between this summary and the precise wording below, the precise wording prevails.

FULL TERMS AND CONDITIONS:

1. Blaeu Privacy Response Team B.V. (Team Blaeu) is a private limited company under Dutch law. Blaeu Privacy Response Team B.V. is located in Rotterdam and is registered at the Dutch Chamber of Commerce under no. 75599740.

2. These General Terms and Conditions apply to all legal relationships between Team Blaeu and the client, unless the parties have agreed otherwise in writing prior to the conclusion of an agreement. Team Blaeu excludes the applicability of any general terms and conditions used by the client.

3. Team Blaeu may engage third parties in the course of the performance of an assignment. Team Blaeu shall apply the necessary care when engaging third parties. Team Blaeu shall not be liable vis-à-vis the client for any actions of those third parties. The client gives Team Blaeu authority to accept on behalf of the client a limitation of liability stipulated by such person. All assignments are deemed to be performed by Team Blaeu, and not by a specific person associated with Team Blaeu Sections 7:404 and 7:407 subsection 2 of the Dutch Civil Code (Burgerlijk Wetboek) are herewith excluded.

4. For the performance of an assignment, the client will be due the fee plus disbursements (such as travel costs) and VAT payable, unless exempt from VAT, e.g., on the basis of Article 44 of the European VAT Directive 2006/112/EC.

5. Team Blaeu will bill the client on a monthly basis, unless agreed otherwise in writing. The payment period is 30 days from the invoice date. If the payment has not been received within the agreed term, the client will be deemed to be in default without prior notice and Team Blaeu will have the right to charge the statutory interest (wettelijke rente) and any judicial and extrajudicial (collection) costs (gerechtelijke- en buitengerechtelijke (incasso)kosten).

6. Any liability on the part of Team Blaeu vis-à-vis the client and third parties for damages resulting from or related to the performance of an assignment, shall be limited to the already paid fee for the activities in relation to which the damage has occurred, with a maximum of EUR 5,000. Each claim for damages shall expire after a period of one year from the day following the day on which the client became aware or could reasonably be aware of the existence of the damages.

7. The client shall indemnify Team Blaeu for any claims of third parties which are in any way related to the activities of Team Blaeu for the client. The client shall reimburse to Team Blaeu all costs of legal defence and all damages in relation to these claims. This provision does not apply to the extent a claim is the result of the intent or recklessness (opzet of bewuste roekeloosheid) of Team Blaeu.

8. These General Terms and Conditions are also made for the benefit of the persons who are or were working for Team Blaeu or who were engaged during the performance of any assignment by Team Blaeu.

9. Dutch law shall govern the legal relationship between Team Blaeu and its client. The complaints procedure of Team Blaeu applies to each engagement. Any dispute between Team Blaeu and a client shall be resolved exclusively by the competent court of Rotterdam, the Netherlands. In the event of any discrepancy between the Dutch and English versions of these General Terms and Conditions, the Dutch version shall prevail.

10. The rates to be charged, except for substantive rate adjustments, are adjusted as of January 1 of each year in accordance with the consumer price index for all households over the preceding period October/October, on the understanding that the amounts are rounded to a multiple of five euros.

11. Team Blaeu retains ownership of all items delivered by it until the buyer has fully met all payment obligations.

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
        isNL
          ? 'Algemene voorwaarden worden gedownload'
          : 'Terms and conditions are being downloaded',
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
      if (event.detail && event.detail.except !== 'terms') {
        closeWidget()
      }
    })

    // Listen for terms widget open requests
    document.addEventListener('open-terms-widget', event => {
      // First, trigger the close-all-widgets event
      const closeEvent = new CustomEvent('close-all-widgets', {
        detail: { except: 'terms' },
      })
      document.dispatchEvent(closeEvent)

      // Update global state to track active widget
      globalState.activeWidget = 'terms'

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
        $announce('Terms and conditions opened', 'assertive')
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
  .terms-widget {
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
  .terms-widget-bottom-left {
    bottom: 20px !important; /* Same as accessibility widget (var(--widget-spacing)) */
    left: 20px !important;
  }

  .terms-widget-bottom-right {
    bottom: 20px !important; /* Same as accessibility widget (var(--widget-spacing)) */
    right: 20px !important;
  }

  /* Widget panel */
  .terms-widget-panel {
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

  .terms-widget-panel.open {
    display: flex;
  }

  /* Expanded panel for full policy */
  .terms-widget-panel.expanded {
    width: min(90vw, 650px);
    height: max-content;
    max-height: 85vh; /* Slightly increased max-height for better content visibility */
    overflow-y: auto;
  }

  /* Full screen in mobile mode */
  @media (max-width: 640px) {
    .terms-widget-panel.expanded {
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

    /* Adjust terms statement content for mobile */
    .terms-widget-panel.expanded .terms-widget-header {
      position: sticky !important;
      top: 0 !important;
      background: white !important;
      padding: 1rem !important;
      z-index: 10 !important;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1) !important;
      width: 100% !important;
    }

    .terms-widget-panel.expanded .terms-widget-content {
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
  .terms-widget-top-left .terms-widget-panel {
    top: 60px;
    left: 0;
  }

  .terms-widget-top-right .terms-widget-panel {
    top: 60px;
    right: 0;
  }

  .terms-widget-bottom-left .terms-widget-panel {
    bottom: 60px; /* Adjusted position as requested */
    left: 0;
  }

  .terms-widget-bottom-right .terms-widget-panel {
    bottom: 60px; /* Adjusted position as requested */
    right: 0;
  }

  /* Panel header */
  .terms-widget-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #eaeaea;
    padding-bottom: 12px;
    margin-bottom: 4px;
  }

  .terms-widget-title {
    font-size: 16px;
    font-weight: 600;
    color: #333;
    margin: 0;
  }

  .terms-widget-close {
    background: transparent;
    border: none;
    color: #777;
    cursor: pointer;
    padding: 4px;
    border-radius: 4px;
  }

  .terms-widget-close:hover {
    color: #333;
    background-color: #f5f5f5;
  }

  .terms-widget-close:focus-visible {
    outline: 2px solid #00a8e6;
    outline-offset: 2px;
  }

  /* Widget content */
  .terms-widget-content {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  /* Language selector */
  .terms-language-selector {
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
    .terms-widget-panel {
      transition: none;
    }
  }

  /* Ensure bullets are always visible */
  .policy-summary ul,
  .full-policy ul {
    list-style-type: disc !important;
    padding-left: 1.5rem !important;
  }

  .policy-summary ul li,
  .full-policy ul li {
    display: list-item !important;
    list-style-type: disc !important;
    margin-left: 0 !important;
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
  .terms-widget-open .terms-widget-panel {
    max-width: calc(100vw - 40px);
  }
</style>
