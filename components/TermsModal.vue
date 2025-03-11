<!-- TermsModal.vue -->
<template>
  <div>
    <!-- Modal backdrop -->
    <div v-if="show" 
         class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
         @click="closeModal">
      <!-- Modal container -->
      <div class="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-90vh overflow-y-auto" @click.stop>
        <div class="relative p-6">
          <!-- Close button -->
          <button @click="closeModal" class="absolute top-4 right-4 z-10 text-black hover:text-b bg-black-600 hover:bg-blue-700 rounded-full p-2 flex items-center justify-center transition duration-300">
            <svg class="w-5 h-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="black" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <!-- Language selector with proper spacing and visibility -->
          <div class="flex justify-end mb-4 mr-12">
            <div class="inline-flex rounded-md shadow-sm" role="group">
              <button 
                @click="currentLanguage = 'nl'" 
                :class="['px-3 py-2 text-sm font-medium flex items-center rounded-l-lg', 
                        currentLanguage === 'nl' 
                          ? 'bg-black text-white' 
                          : 'bg-white text-black hover:bg-gray-300']"
                title="Nederlands">
                <span>Nederlands</span>
              </button>
              <button 
                @click="currentLanguage = 'en'" 
                :class="['px-3 py-2 text-sm font-medium flex items-center rounded-r-lg', 
                        currentLanguage === 'en' 
                          ? 'bg-black text-white' 
                          : 'bg-white text-black hover:bg-gray-300']"
                title="English">
                <span>English</span>
              </button>
            </div>
          </div>
           
          <!-- Header -->
          <div class="mb-6">
            <h2 class="text-2xl font-bold text-gray-900">
              {{ currentLanguage === 'nl' ? 'Algemene voorwaarden' : 'General Terms and Conditions' }}
            </h2>
            <p class="text-gray-600">Blaeu Privacy Response Team B.V.</p>
          </div>
          
          <!-- Dutch Content -->
          <div v-if="currentLanguage === 'nl'" class="prose max-w-none text-gray-800">
            <div class="mb-6">
              <p>Deze zijn bijgewerkt op 1 maart 2025. In het kort:</p>
              <ul class="list-disc pl-5 mt-2 space-y-1">
                <li>Blaeu Privacy Response Team B.V. (hierna: Team Blaeu) is een besloten vennootschap ingeschreven bij de Kamer van Koophandel onder nr. 75599740.</li>
                <li>Team Blaeu brengt geen kantoorkosten in rekening.</li>
                <li>Team Blaeu factureert maandelijks met een betalingstermijn van 30 dagen.</li>
                <li>De aansprakelijkheid van Team Blaeu is beperkt tot het verzekerde bedrag plus eigen risico, of indien geen verzekeringsuitkering, tot het reeds betaalde honorarium (max. EUR 5.000). Vorderingen vervallen na één jaar.</li>
                <li>Team Blaeu aanvaardt geen aansprakelijkheid voor onderaannemers.</li>
                <li>Nederlands recht is van toepassing. De rechtbank te Rotterdam, Nederland is bevoegd.</li>
              </ul>
              <p class="mt-4">Deze algemene voorwaarden worden hieronder verder uitgewerkt. In geval van een conflict tussen deze samenvatting en de precieze bewoording hieronder, prevaleert de precieze bewoording.</p>
            </div>
            
            <ol class="list-decimal pl-5 space-y-2">
              <li>Blaeu Privacy Response Team B.V. (hierna: Team Blaeu) is een besloten vennootschap naar Nederlands recht. Blaeu Privacy Response Team B.V. is gevestigd in Rotterdam en is ingeschreven bij de Kamer van Koophandel onder nummer 75599740.</li>
              
              <li>Deze Algemene Voorwaarden zijn van toepassing op alle rechtsverhoudingen tussen Team Blaeu en de opdrachtgever, tenzij partijen voorafgaand aan de totstandkoming van een overeenkomst schriftelijk anders zijn overeengekomen. Team Blaeu sluit de toepasselijkheid van eventuele door de opdrachtgever gehanteerde algemene voorwaarden uit.</li>
              
              <li>Team Blaeu kan bij de uitvoering van een opdracht derden inschakelen. Team Blaeu zal bij het inschakelen van derden de nodige zorgvuldigheid in acht nemen. Team Blaeu is niet aansprakelijk jegens de opdrachtgever voor enige tekortkoming van deze derden. De opdrachtgever geeft Team Blaeu de bevoegdheid om namens de opdrachtgever een door die persoon bedongen aansprakelijkheidsbeperking te aanvaarden. Alle opdrachten worden geacht te zijn uitgevoerd door Team Blaeu en niet door een specifiek aan Team Blaeu verbonden persoon. De artikelen 7:404 en 7:407 lid 2 van het Burgerlijk Wetboek worden hierbij uitgesloten.</li>
              
              <li>Voor de uitvoering van een opdracht is de opdrachtgever het honorarium verschuldigd vermeerderd met verschotten (zoals reiskosten) en btw, tenzij vrijgesteld van btw, bijvoorbeeld op basis van artikel 44 van de Europese btw-richtlijn 2006/112/EG.</li>
              
              <li>Team Blaeu zal de opdrachtgever maandelijks factureren, tenzij schriftelijk anders overeengekomen. De betalingstermijn is 30 dagen vanaf de factuurdatum. Indien de betaling niet binnen de overeengekomen termijn is ontvangen, wordt de opdrachtgever geacht zonder voorafgaande ingebrekestelling in verzuim te zijn en heeft Team Blaeu het recht de wettelijke rente en eventuele gerechtelijke en buitengerechtelijke (incasso)kosten in rekening te brengen.</li>
              
              <li>Iedere aansprakelijkheid van Team Blaeu jegens de opdrachtgever en derden voor schade die voortvloeit uit of verband houdt met de uitvoering van een opdracht, is beperkt tot het bedrag dat in het desbetreffende geval wordt uitgekeerd onder de toepasselijke beroepsaansprakelijkheidsverzekering van Team Blaeu, vermeerderd met het bedrag van het toepasselijke eigen risico dat onder die verzekering voor rekening van Team Blaeu komt. Indien en voor zover geen uitkering plaatsvindt onder een dergelijke verzekering, is de aansprakelijkheid van Team Blaeu beperkt tot het reeds betaalde honorarium voor de werkzaamheden waarop de schade betrekking heeft, met een maximum van EUR 5.000. Elke vordering tot schadevergoeding vervalt na verloop van één jaar vanaf de dag volgend op de dag waarop de opdrachtgever bekend werd of redelijkerwijs bekend had kunnen zijn met het bestaan van de schade.</li>
              
              <li>De opdrachtgever vrijwaart Team Blaeu voor alle aanspraken van derden die op enigerlei wijze verband houden met de werkzaamheden van Team Blaeu voor de opdrachtgever. De opdrachtgever vergoedt aan Team Blaeu alle kosten van juridische bijstand en alle schade in verband met deze claims. Deze bepaling is niet van toepassing voor zover een claim het gevolg is van opzet of bewuste roekeloosheid van Team Blaeu</li>
              
              <li>Deze Algemene Voorwaarden zijn mede gemaakt ten behoeve van de personen die voor Team Blaeu werkzaam zijn of waren of die bij de uitvoering van enige opdracht door Team Blaeu waren betrokken.</li>
              
              <li>Op de rechtsverhouding tussen Team Blaeu en haar opdrachtgever is Nederlands recht van toepassing. De klachtenprocedure van Team Blaeu is van toepassing op iedere opdracht. Geschillen tussen Team Blaeu en een opdrachtgever worden uitsluitend beslecht door de bevoegde rechter te Rotterdam, Nederland. In geval van een discrepantie tussen de Nederlandse en Engelse versie van deze Algemene Voorwaarden, prevaleert de Nederlandse versie.</li>
              
              <li>De in rekening te brengen tarieven worden behoudens inhoudelijke tariefaanpassingen telkens met ingang van 1 januari aangepast overeenkomstig de consumentenprijsindex voor alle huishoudens over de daaraan voorafgaande periode oktober/oktober, met dien verstande dat de bedragen worden afgerond op een veelvoud van vijf euro.</li>
              
              <li>Team Blaeu behoudt de eigendom van alle door haar geleverde zaken, totdat de koper volledig aan al zijn betalingsverplichtingen heeft voldaan.</li>
            </ol>
          </div>
          
          <!-- English Content -->
          <div v-else class="prose max-w-none text-gray-800">
            <div class="mb-6">
              <p>These were updated on March 1, 2025. In short:</p>
              <ul class="list-disc pl-5 mt-2 space-y-1">
                <li>Blaeu Privacy Response Team B.V. (herinafter: Team Blaeu) is a private limited company registered at the Dutch Chamber of Commerce under no. 75599740.</li>
                <li>Team Blaeu does not charge office costs.</li>
                <li>Team Blaeu bills on a monthly basis with a payment period of 30 days.</li>
                <li>Team Blaeu's liability is restricted to the insured amount plus deductible, or if no insurance payout, to the fee already paid (max. EUR 5,000). Claims expire after one year.</li>
                <li>Team Blaeu does not accept liability for subcontractors.</li>
                <li>Dutch law applies. The court in Rotterdam, the Netherlands is competent.</li>
              </ul>
              <p class="mt-4">These terms and conditions are further worked out below. In the case of a conflict between this summary and the precise wording below, the precise wording prevails.</p>
            </div>
            
            <ol class="list-decimal pl-5 space-y-2">
              <li>Blaeu Privacy Response Team B.V. (Team Blaeu) is a private limited company under Dutch law. Blaeu Privacy Response Team B.V. is located in Rotterdam and is registered at the Dutch Chamber of Commerce under no. 75599740.</li>
              
              <li>These General Terms and Conditions apply to all legal relationships between Team Blaeu and the client, unless the parties have agreed otherwise in writing prior to the conclusion of an agreement. Team Blaeu excludes the applicability of any general terms and conditions used by the client.</li>
              
              <li>Team Blaeu may engage third parties in the course of the performance of an assignment. Team Blaeu shall apply the necessary care when engaging third parties. Team Blaeu shall not be liable vis-à-vis the client for any actions of those third parties. The client gives Team Blaeu authority to accept on behalf of the client a limitation of liability stipulated by such person. All assignments are deemed to be performed by Team Blaeu, and not by a specific person associated with Team Blaeu Sections 7:404 and 7:407 subsection 2 of the Dutch Civil Code (Burgerlijk Wetboek) are herewith excluded.</li>
              
              <li>For the performance of an assignment, the client will be due the fee plus disbursements (such as travel costs) and VAT payable, unless exempt from VAT, e.g., on the basis of Article 44 of the European VAT Directive 2006/112/EC.</li>
              
              <li>Team Blaeu will bill the client on a monthly basis, unless agreed otherwise in writing. The payment period is 30 days from the invoice date. If the payment has not been received within the agreed term, the client will be deemed to be in default without prior notice and Team Blaeu will have the right to charge the statutory interest (wettelijke rente) and any judicial and extrajudicial (collection) costs (gerechtelijke- en buitengerechtelijke (incasso)kosten).</li>
              
              <li>Any liability on the part of Team Blaeu vis-à-vis the client and third parties for damages resulting from or related to the performance of an assignment, shall be limited to the amount that is paid out in that specific case under the applicable indemnity insurance of Team Blaeu, increased by the amount of the applicable deductible (eigen risico) which under that insurance shall be borne by Team Blaeu If and to the extent that no amount shall be paid under such an insurance, any liability of Team Blaeu is limited to the already paid fee for the activities in relation to which the damage has occurred, with a maximum of EUR 5,000. Each claim for damages shall expire after a period of one year from the day following the day on which the client became aware or could reasonably be aware of the existence of the damages.</li>
              
              <li>The client shall indemnify Team Blaeu for any claims of third parties which are in any way related to the activities of Team Blaeu for the client. The client shall reimburse to Team Blaeu all costs of legal defence and all damages in relation to these claims. This provision does not apply to the extent a claim is the result of the intent or recklessness (opzet of bewuste roekeloosheid) of Team Blaeu</li>
              
              <li>These General Terms and Conditions are also made for the benefit of the persons who are or were working for Team Blaeu or who were engaged during the performance of any assignment by Team Blaeu</li>
              
              <li>Dutch law shall govern the legal relationship between Team Blaeu and its client. The complaints procedure of Team Blaeu applies to each engagement. Any dispute between Team Blaeu and a client shall be resolved exclusively by the competent court of Rotterdam, the Netherlands. In the event of any discrepancy between the Dutch and English versions of these General Terms and Conditions, the Dutch version shall prevail.</li>
              
              <li>The rates to be charged, except for substantive rate adjustments, are adjusted as of January 1 of each year in accordance with the consumer price index for all households over the preceding period October/October, on the understanding that the amounts are rounded to a multiple of five euros.</li>
              
              <li>Team Blaeu retains ownership of all items delivered by it until the buyer has fully met all payment obligations.</li>

            <p class="mt-4">If there is an inconsistency between the Dutch and English-language version of these regulations, the Dutch version takes precedence.</p>

            </ol>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    initialLanguage: {
      type: String,
      default: 'nl', // Default to Dutch, but can be overridden
      validator: (value) => ['nl', 'en'].includes(value)
    }
  },
  data() {
    return {
      currentLanguage: this.initialLanguage
    }
  },
  methods: {
    closeModal() {
      this.$emit('close');
    }
  },
  watch: {
    show(newVal) {
      if (newVal) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
    },
    initialLanguage(newVal) {
      this.currentLanguage = newVal;
    }
  },
  beforeUnmount() {
    document.body.style.overflow = 'auto';
  }
}
</script>

<style scoped>
.max-h-90vh {
  max-height: 90vh;
}
</style>