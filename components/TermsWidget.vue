<template>
  <div 
    :class="[
      'terms-widget', 
      { 'terms-widget-open': isOpen, 'policy-expanded': isPolicyExpanded },
      positionClass
    ]"
    ref="widgetRef"
  >
    <!-- No toggle button since it will be opened via link only -->

    <!-- Widget panel with controls -->
    <div 
      id="terms-controls"
      class="terms-widget-panel"
      :class="{ 'open': isOpen, 'expanded': isPolicyExpanded }"
      role="dialog"
      aria-labelledby="terms-widget-title"
      style="z-index: 5300;"
    >
      <div class="terms-widget-header">
        <h2 id="terms-widget-title" class="terms-widget-title">
          {{ currentLanguage === 'nl' ? 'Algemene Voorwaarden' : 'General Terms and Conditions' }}
        </h2>
        <button 
          class="terms-widget-close" 
          @click="closeWidget"
          aria-label="Close terms and conditions menu"
        >
          <i class="fa-solid fa-xmark" aria-hidden="true"></i>
        </button>
      </div>
      
      <div class="terms-widget-content">
        <!-- Language selector -->
        <div class="terms-language-selector">
          <div class="inline-flex rounded-md shadow-sm" role="group" aria-label="Select language">
            <button 
              @click="currentLanguage = 'nl'" 
              :class="['language-button', currentLanguage === 'nl' ? 'active' : '']"
              :aria-pressed="currentLanguage === 'nl'"
              aria-label="Nederlands"
            >
              <span>NL</span>
            </button>
            <button 
              @click="currentLanguage = 'en'" 
              :class="['language-button', currentLanguage === 'en' ? 'active' : '']"
              :aria-pressed="currentLanguage === 'en'"
              aria-label="English"
            >
              <span>EN</span>
            </button>
          </div>
        </div>

        <!-- Summary Content -->
        <div v-if="!isPolicyExpanded" class="policy-summary">
          <!-- English Summary -->
          <div v-if="currentLanguage === 'en'" class="prose max-w-none text-gray-800">
            <div class="mb-6">
              <p>In short:</p>
              <ul class="custom-bullet-list mt-2 space-y-1">
                <li>Blaeu Privacy Response Team B.V. (herinafter: Team Blaeu) is a private limited company registered at the Dutch Chamber of Commerce under no. 75599740.</li>
                <li>Team Blaeu does not charge office costs.</li>
                <li>Team Blaeu bills on a monthly basis with a payment period of 30 days.</li>
                <li>Team Blaeu's liability is restricted to the fee already paid (max. EUR 5,000). Claims expire after one year.</li>
                <li>Team Blaeu does not accept liability for subcontractors.</li>
                <li>Dutch law applies. The court in Rotterdam, the Netherlands is competent.</li>
              </ul>
            <p class="text-gray-500 mt-4">Last Updated: March 1, 2025</p>
            </div>
          </div>
          
          <!-- Dutch Summary -->
          <div v-else class="prose max-w-none text-gray-800">
           <div class="mb-6">
              <p>In het kort:</p>
              <ul class="custom-bullet-list mt-2 space-y-1">
                <li>Blaeu Privacy Response Team B.V. (hierna: Team Blaeu) is een besloten vennootschap ingeschreven bij de Kamer van Koophandel onder nr. 75599740.</li>
                <li>Team Blaeu brengt geen kantoorkosten in rekening.</li>
                <li>Team Blaeu factureert maandelijks met een betalingstermijn van 30 dagen.</li>
                <li>De aansprakelijkheid van Team Blaeu is beperkt tot het reeds betaalde honorarium (max. EUR 5.000). Vorderingen vervallen na één jaar.</li>
                <li>Team Blaeu aanvaardt geen aansprakelijkheid voor onderaannemers.</li>
                <li>Nederlands recht is van toepassing. De rechtbank te Rotterdam, Nederland is bevoegd.</li>
              </ul>
            <p class="text-gray-500 mt-4">Laatst bijgewerkt: 1 maart 2025</p>
            </div>
          </div>

          <!-- View Complete Terms Button -->
          <button 
            @click="expandPolicy" 
            class="view-complete-policy"
            aria-expanded="false"
            aria-controls="full-policy-content"
          >
            {{ currentLanguage === 'nl' ? 'Bekijk volledige voorwaarden' : 'View complete terms' }}
            <i class="fa-solid fa-chevron-right ml-1" aria-hidden="true"></i>
          </button>
          
          <!-- Download link in summary view -->
          <div class="download-link-summary">
            <a href="#" @click.prevent="downloadPolicy" class="text-blue-600 hover:underline flex items-center justify-center text-sm">
              <i class="fa-solid fa-download mr-2" aria-hidden="true"></i>
              {{ currentLanguage === 'nl' ? 'Download algemene voorwaarden' : 'Download terms and conditions' }}
            </a>
          </div>
        </div>

        <!-- Full Terms Content -->
        <div v-else id="full-policy-content" class="full-policy">
          <button 
            @click="collapsePolicy" 
            class="back-to-summary"
            aria-label="Back to summary"
          >
            <i class="fa-solid fa-chevron-left mr-2" aria-hidden="true"></i>
            {{ currentLanguage === 'nl' ? 'Terug naar samenvatting' : 'Back to summary' }}
          </button>

          <!-- Dutch Content -->
          <div v-if="currentLanguage === 'nl'" class="prose max-w-none text-gray-800">
           <div class="mb-6">
              <p>In het kort:</p>
              <ul class="custom-bullet-list mt-2 space-y-1">
                <li>Blaeu Privacy Response Team B.V. (hierna: Team Blaeu) is een besloten vennootschap ingeschreven bij de Kamer van Koophandel onder nr. 75599740.</li>
                <li>Team Blaeu brengt geen kantoorkosten in rekening.</li>
                <li>Team Blaeu factureert maandelijks met een betalingstermijn van 30 dagen.</li>
                <li>De aansprakelijkheid van Team Blaeu is beperkt tot het reeds betaalde honorarium (max. EUR 5.000). Vorderingen vervallen na één jaar.</li>
                <li>Team Blaeu aanvaardt geen aansprakelijkheid voor onderaannemers.</li>
                <li>Nederlands recht is van toepassing. De rechtbank te Rotterdam, Nederland is bevoegd.</li>
              </ul>
            <p class="text-gray-500 mt-4">Laatst bijgewerkt: 1 maart 2025</p>
            </div>
            
            <ol class="list-decimal pl-5 space-y-2  mt-2">
              <li>Blaeu Privacy Response Team B.V. (hierna: Team Blaeu) is een besloten vennootschap naar Nederlands recht. Team Blaeu is gevestigd in Rotterdam en is ingeschreven bij de Kamer van Koophandel onder nummer 75599740.</li>
              
              <li>Deze Algemene Voorwaarden zijn van toepassing op alle rechtsverhoudingen tussen Team Blaeu en de opdrachtgever, tenzij partijen voorafgaand aan de totstandkoming van een overeenkomst schriftelijk anders zijn overeengekomen. Team Blaeu sluit de toepasselijkheid van eventuele door de opdrachtgever gehanteerde algemene voorwaarden uit.</li>
              
              <li>Team Blaeu kan bij de uitvoering van een opdracht derden inschakelen. Team Blaeu zal bij het inschakelen van derden de nodige zorgvuldigheid in acht nemen. Team Blaeu is niet aansprakelijk jegens de opdrachtgever voor enige tekortkoming van deze derden. De opdrachtgever geeft Team Blaeu de bevoegdheid om namens de opdrachtgever een door die persoon bedongen aansprakelijkheidsbeperking te aanvaarden. Alle opdrachten worden geacht te zijn uitgevoerd door Team Blaeu en niet door een specifiek aan Team Blaeu verbonden persoon. De artikelen 7:404 en 7:407 lid 2 van het Burgerlijk Wetboek worden hierbij uitgesloten.</li>
              
              <li>Voor de uitvoering van een opdracht is de opdrachtgever het honorarium verschuldigd vermeerderd met verschotten (zoals reiskosten) en btw, tenzij vrijgesteld van btw, bijvoorbeeld op basis van artikel 44 van de Europese btw-richtlijn 2006/112/EG.</li>
              
              <li>Team Blaeu zal de opdrachtgever maandelijks factureren, tenzij schriftelijk anders overeengekomen. De betalingstermijn is 30 dagen vanaf de factuurdatum. Indien de betaling niet binnen de overeengekomen termijn is ontvangen, wordt de opdrachtgever geacht zonder voorafgaande ingebrekestelling in verzuim te zijn en heeft Team Blaeu het recht de wettelijke rente en eventuele gerechtelijke en buitengerechtelijke (incasso)kosten in rekening te brengen.</li>
              
              <li>Iedere aansprakelijkheid van Team Blaeu jegens de opdrachtgever en derden voor schade die voortvloeit uit of verband houdt met de uitvoering van een opdracht, is beperkt tot het reeds betaalde honorarium voor de werkzaamheden waarop de schade betrekking heeft, met een maximum van EUR 5.000. Elke vordering tot schadevergoeding vervalt na verloop van één jaar vanaf de dag volgend op de dag waarop de opdrachtgever bekend werd of redelijkerwijs bekend had kunnen zijn met het bestaan van de schade.</li>
              
              <li>De opdrachtgever vrijwaart Team Blaeu voor alle aanspraken van derden die op enigerlei wijze verband houden met de werkzaamheden van Team Blaeu voor de opdrachtgever. De opdrachtgever vergoedt aan Team Blaeu alle kosten van juridische bijstand en alle schade in verband met deze claims. Deze bepaling is niet van toepassing voor zover een claim het gevolg is van opzet of bewuste roekeloosheid van Team Blaeu</li>
              
              <li>Deze Algemene Voorwaarden zijn mede gemaakt ten behoeve van de personen die voor Team Blaeu werkzaam zijn of waren of die bij de uitvoering van enige opdracht door Team Blaeu waren betrokken.</li>
              
              <li>Op de rechtsverhouding tussen Team Blaeu en haar opdrachtgever is Nederlands recht van toepassing. Geschillen tussen Team Blaeu en een opdrachtgever worden uitsluitend beslecht door de bevoegde rechter te Rotterdam, Nederland. In geval van een discrepantie tussen de Nederlandse en Engelse versie van deze Algemene Voorwaarden, prevaleert de Nederlandse versie.</li>
              
              <li>De in rekening te brengen tarieven worden behoudens inhoudelijke tariefaanpassingen telkens met ingang van 1 januari aangepast overeenkomstig de consumentenprijsindex voor alle huishoudens over de daaraan voorafgaande periode oktober/oktober, met dien verstande dat de bedragen worden afgerond op een veelvoud van vijf euro.</li>
              
              <li>Team Blaeu behoudt de eigendom van alle door haar geleverde zaken, totdat de koper volledig aan al zijn betalingsverplichtingen heeft voldaan.</li>
            </ol>

            <!-- Download link in complete terms view -->
            <div class="download-link-complete mt-6">
              <a href="#" @click.prevent="downloadPolicy" class="text-blue-600 hover:underline flex items-center text-sm">
                <i class="fa-solid fa-download mr-2" aria-hidden="true"></i>
                Download algemene voorwaarden
              </a>
            </div>
          </div>
          
          <!-- English Content -->
          <div v-else class="prose max-w-none text-gray-800">
            <div class="mb-6">
              <p>In short:</p>
              <ul class="custom-bullet-list mt-2 space-y-1">
                <li>Blaeu Privacy Response Team B.V. (herinafter: Team Blaeu) is a private limited company registered at the Dutch Chamber of Commerce under no. 75599740.</li>
                <li>Team Blaeu does not charge office costs.</li>
                <li>Team Blaeu bills on a monthly basis with a payment period of 30 days.</li>
                <li>Team Blaeu's liability is restricted to the fee already paid (max. EUR 5,000). Claims expire after one year.</li>
                <li>Team Blaeu does not accept liability for subcontractors.</li>
                <li>Dutch law applies. The court in Rotterdam, the Netherlands is competent.</li>
              </ul>
            <p class="text-gray-500 mt-4">Last Updated: March 1, 2025</p>
            </div>
            
            <ol class="list-decimal pl-5 space-y-2  mt-2">
              <li>Blaeu Privacy Response Team B.V. (Team Blaeu) is a private limited company under Dutch law. Team Blaeu is located in Rotterdam and is registered at the Dutch Chamber of Commerce under no. 75599740.</li>
              
              <li>These General Terms and Conditions apply to all legal relationships between Team Blaeu and the client, unless the parties have agreed otherwise in writing prior to the conclusion of an agreement. Team Blaeu excludes the applicability of any general terms and conditions used by the client.</li>
              
              <li>Team Blaeu may engage third parties in the course of the performance of an assignment. Team Blaeu shall apply the necessary care when engaging third parties. Team Blaeu shall not be liable vis-à-vis the client for any actions of those third parties. The client gives Team Blaeu authority to accept on behalf of the client a limitation of liability stipulated by such person. All assignments are deemed to be performed by Team Blaeu, and not by a specific person associated with Team Blaeu Sections 7:404 and 7:407 subsection 2 of the Dutch Civil Code (Burgerlijk Wetboek) are herewith excluded.</li>
              
              <li>For the performance of an assignment, the client will be due the fee plus disbursements (such as travel costs) and VAT payable, unless exempt from VAT, e.g., on the basis of Article 44 of the European VAT Directive 2006/112/EC.</li>
              
              <li>Team Blaeu will bill the client on a monthly basis, unless agreed otherwise in writing. The payment period is 30 days from the invoice date. If the payment has not been received within the agreed term, the client will be deemed to be in default without prior notice and Team Blaeu will have the right to charge the statutory interest (wettelijke rente) and any judicial and extrajudicial (collection) costs (gerechtelijke- en buitengerechtelijke (incasso)kosten).</li>
              
              <li>Any liability on the part of Team Blaeu vis-à-vis the client and third parties for damages resulting from or related to the performance of an assignment, shall be limited to the already paid fee for the activities in relation to which the damage has occurred, with a maximum of EUR 5,000. Each claim for damages shall expire after a period of one year from the day following the day on which the client became aware or could reasonably be aware of the existence of the damages.</li>
              
              <li>The client shall indemnify Team Blaeu for any claims of third parties which are in any way related to the activities of Team Blaeu for the client. The client shall reimburse to Team Blaeu all costs of legal defence and all damages in relation to these claims. This provision does not apply to the extent a claim is the result of the intent or recklessness (opzet of bewuste roekeloosheid) of Team Blaeu</li>
              
              <li>These General Terms and Conditions are also made for the benefit of the persons who are or were working for Team Blaeu or who were engaged during the performance of any assignment by Team Blaeu</li>
              
              <li>Dutch law shall govern the legal relationship between Team Blaeu and its client. The complaints procedure of Team Blaeu applies to each engagement. Any dispute between Team Blaeu and a client shall be resolved exclusively by the competent court of Rotterdam, the Netherlands. In the event of any discrepancy between the Dutch and English versions of these General Terms and Conditions, the Dutch version shall prevail.</li>
              
              <li>The rates to be charged, except for substantive rate adjustments, are adjusted as of January 1 of each year in accordance with the consumer price index for all households over the preceding period October/October, on the understanding that the amounts are rounded to a multiple of five euros.</li>
              
              <li>Team Blaeu retains ownership of all items delivered by it until the buyer has fully met all payment obligations.</li>

            <p class="text-sm text-gray-500 mt-6">If there is an inconsistency between the Dutch and English-language version of these regulations, the Dutch version takes precedence.</p>

            </ol>

            <!-- Download link in complete terms view -->
            <div class="download-link-complete mt-6">
              <a href="#" @click.prevent="downloadPolicy" class="text-blue-600 hover:underline flex items-center text-sm">
                <i class="fa-solid fa-download mr-2" aria-hidden="true"></i>
                Download terms and conditions
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch, nextTick } from 'vue';
import { globalState } from '~/composables/globalState';

// Async load extended styles
if (process.client) {
  const loadExtendedStyles = () => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/assets/css/terms-widget-extended.css';
    link.media = 'print';
    link.onload = () => { link.media = 'all'; };
    document.head.appendChild(link);
  };
  
  // Load styles when component is likely to be used
  setTimeout(loadExtendedStyles, 1000);
}

const isOpen = ref(false);
const isPolicyExpanded = ref(false);
// Use a computed property with getter/setter to sync with globalState
const currentLanguage = computed({
  get: () => globalState.languagePreference,
  set: (value) => { globalState.languagePreference = value; }
});

// Ensure immediate synchronization on component mount
const forceLanguageSync = async () => {
  // For static sites: Force reactivity update and ensure DOM updates
  const current = globalState.languagePreference;
  globalState.languagePreference = current;
  // Wait for DOM to update in static site context
  await nextTick();
};
const position = ref('bottom-right'); // Default position
let keyboardHandler = null;
let documentClickHandler = null;
const widgetRef = ref(null);

// Export methods for external use
defineExpose({
  openWidget: (language) => {
    // If language is provided, use it; otherwise keep existing language from global state
    // This should never forcibly set a language if not provided
    if (language) {
      currentLanguage.value = language;
    }
    // Otherwise it will use existing value from globalState via the computed property
    
    isOpen.value = true;
    // Announce to screen readers
    const { $announce } = useNuxtApp();
    if ($announce) {
      $announce('Terms and conditions opened', 'assertive');
    }
  },
  openFullPolicy: (language) => {
    // If language is provided, use it; otherwise keep existing language from global state
    if (language) {
      currentLanguage.value = language;
    }
    isOpen.value = true;
    isPolicyExpanded.value = true;
    // Announce to screen readers
    const { $announce } = useNuxtApp();
    if ($announce) {
      $announce('Complete terms and conditions expanded', 'assertive');
    }
  }
});

const positionClass = computed(() => {
  return `terms-widget-${position.value}`;
});

// No longer need toggleWidget since there's no toggle button

const closeWidget = () => {
  isOpen.value = false;
  isPolicyExpanded.value = false;
  
  // Clear active widget in global state if this was the active one
  if (globalState.activeWidget === 'terms') {
    globalState.activeWidget = null;
  }
};

const expandPolicy = () => {
  isPolicyExpanded.value = true;
  
  // Announce to screen readers
  const { $announce } = useNuxtApp();
  if ($announce) {
    $announce('Complete terms and conditions expanded', 'polite');
  }
};

const collapsePolicy = () => {
  isPolicyExpanded.value = false;
  
  // Announce to screen readers
  const { $announce } = useNuxtApp();
  if ($announce) {
    $announce('Returned to terms and conditions summary', 'polite');
  }
};

const scrollToSection = (sectionId) => {
  // Find the section element
  const sectionElement = document.getElementById(sectionId);
  if (sectionElement) {
    // Scroll to the section with smooth behavior
    sectionElement.scrollIntoView({ behavior: 'smooth' });
    
    // Add focus to the section for better accessibility
    nextTick(() => {
      sectionElement.setAttribute('tabindex', '-1');
      sectionElement.focus({ preventScroll: true });
      
      // Announce to screen readers
      const { $announce } = useNuxtApp();
      if ($announce) {
        const sectionName = sectionElement.textContent;
        $announce(`Navigated to section: ${sectionName}`, 'polite');
      }
    });
  }
};

const downloadPolicy = () => {
  // Determine language-specific content and filename
  const isNL = currentLanguage.value === 'nl';
  const fileName = isNL ? 'algemene-voorwaarden-blaeu.txt' : 'terms-and-conditions-blaeu.txt';
  
  // Generate the content based on the selected language
  let content = '';
  
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

11. Team Blaeu behoudt de eigendom van alle door haar geleverde zaken, totdat de koper volledig aan al zijn betalingsverplichtingen heeft voldaan.`;
      } else {
        content = `GENERAL TERMS AND CONDITIONS - TEAM BLAEU (BLAEU PRIVACY RESPONSE TEAM B.V.)
Updated on March 1, 2025

IN SHORT:
- Blaeu Privacy Response Team B.V. (herinafter: Team Blaeu) is a private limited company registered at the Dutch Chamber of Commerce under no. 75599740.
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

If there is an inconsistency between the Dutch and English-language version of these regulations, the Dutch version takes precedence.`;
  }

  // Create a blob with the text content
  const blob = new Blob([content], { type: 'text/plain' });
  
  // Create a URL for the blob
  const url = URL.createObjectURL(blob);
  
  // Create a temporary link element
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  
  // Append to the body, click, and remove
  document.body.appendChild(a);
  a.click();
  
  // Clean up
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 100);
  
  // Announce to screen readers
  const { $announce } = useNuxtApp();
  if ($announce) {
    $announce(
      isNL ? 'Algemene voorwaarden worden gedownload' : 'Terms and conditions are being downloaded',
      'polite'
    );
  }
};

// Watch global state for position
watch(() => globalState.widgetPosition, (newValue) => {
  if (position.value !== newValue) {
    position.value = newValue;
  }
});

// Watch for language changes in globalState
watch(() => globalState.languagePreference, (newValue) => {
  if (currentLanguage.value !== newValue) {
    currentLanguage.value = newValue;
  }
});

onMounted(async () => {
  // Force immediate language synchronization to prevent selector/content desync
  await forceLanguageSync();
  
  // Get position from global state if available
  if (globalState.widgetPosition) {
    position.value = globalState.widgetPosition;
  }
  
  // Remove explicit language setting - let computed property handle it
  // This prevents conflicts in static site navigation
  
  // Set up keyboard handler for key interactions
  keyboardHandler = (e) => {
    // Handle Escape key to close/collapse
    if (e.key === 'Escape') {
      if (isPolicyExpanded.value) {
        // If policy is expanded, collapse it first
        collapsePolicy();
      } else if (isOpen.value) {
        // Otherwise if widget is open, close it
        closeWidget();
      }
    }
  };
  document.addEventListener('keydown', keyboardHandler);
  
  // Set up click outside handler
  documentClickHandler = (e) => {
    if (isOpen.value && widgetRef.value && !widgetRef.value.contains(e.target)) {
      closeWidget();
    }
  };
  document.addEventListener('mousedown', documentClickHandler);
  
  // Listen for close-all-widgets event
  document.addEventListener('close-all-widgets', (event) => {
    // Check if we should ignore this widget
    if (event.detail && event.detail.except !== 'terms') {
      closeWidget();
    }
  });
  
  // Listen for terms widget open requests
  document.addEventListener('open-terms-widget', (event) => {
    // First, trigger the close-all-widgets event
    const closeEvent = new CustomEvent('close-all-widgets', {
      detail: { except: 'terms' }
    });
    document.dispatchEvent(closeEvent);
    
    // Only update language if explicitly provided in event
    // Otherwise keep existing preference from globalState
    if (event.detail && event.detail.language) {
      currentLanguage.value = event.detail.language;
      // The computed setter will update globalState.languagePreference
    }
    // If not provided, currentLanguage will continue to use existing globalState.languagePreference
    
    // Open widget
    isOpen.value = true;
    
    // Update global state to track active widget
    globalState.activeWidget = 'terms';
    
    // Expand to full policy if requested
    if (event.detail && event.detail.expandPolicy) {
      isPolicyExpanded.value = true;
    }
    
    // Jump to section if specified
    if (event.detail && event.detail.section) {
      isPolicyExpanded.value = true;
      nextTick(() => {
        scrollToSection(event.detail.section);
      });
    }
    
    // Announce to screen readers
    const { $announce } = useNuxtApp();
    if ($announce) {
      $announce('Terms and conditions opened', 'assertive');
    }
  });
});

onBeforeUnmount(() => {
  // Clean up event listeners
  document.removeEventListener('keydown', keyboardHandler);
  document.removeEventListener('mousedown', documentClickHandler);
  document.removeEventListener('open-terms-widget', null);
});

// No need for this watch anymore since our computed property setter
// handles updating globalState.languagePreference automatically
</script>

<style scoped>
/* Critical styles only - needed for proper widget positioning and visibility */
.terms-widget {
  position: fixed;
  z-index: 54 !important;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.terms-widget-bottom-left {
  bottom: 20px !important;
  left: 20px !important;
}

.terms-widget-bottom-right {
  bottom: 20px !important;
  right: 20px !important;
}

/* Essential panel styles - must be synchronous for proper display control */
.terms-widget-panel {
  position: absolute;
  width: 320px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  padding: 16px;
  display: none; /* Hidden by default - critical! */
  flex-direction: column;
  gap: 16px;
  max-height: calc(100vh - 100px);
  overflow-y: auto;
  z-index: 3000;
}

.terms-widget-panel.open {
  display: flex; /* Show when open - critical! */
}

.terms-widget-panel.expanded {
  width: min(90vw, 650px);
  max-height: 85vh;
}

/* Panel positioning - critical for proper placement */
.terms-widget-bottom-left .terms-widget-panel {
  bottom: 60px;
  left: 0;
}

.terms-widget-bottom-right .terms-widget-panel {
  bottom: 60px;
  right: 0;
}

/* Essential header and button styles */
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

.terms-widget-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>

