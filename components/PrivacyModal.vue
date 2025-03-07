<!-- PrivacyModal.vue -->
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
          <button @click="closeModal" class="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
          
          <!-- Language selector -->
          <div class="flex justify-end mb-4">
            <div class="inline-flex rounded-md shadow-sm" role="group">
              <button 
                @click="currentLanguage = 'nl'" 
                :class="['px-3 py-2 text-sm font-medium flex items-center rounded-l-lg', 
                        currentLanguage === 'nl' 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-white text-gray-700 hover:bg-gray-100']"
                title="Nederlands">
                <span>Nederlands</span>
              </button>
              <button 
                @click="currentLanguage = 'en'" 
                :class="['px-3 py-2 text-sm font-medium flex items-center rounded-r-lg', 
                        currentLanguage === 'en' 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-white text-gray-700 hover:bg-gray-100']"
                title="English">
                <span>English</span>
              </button>
            </div>
          </div>
          
          <!-- Header -->
          <div class="mb-6">
            <h2 class="text-2xl font-bold text-gray-900">
              {{ currentLanguage === 'nl' ? 'Privacyverklaring' : 'Privacy Statement' }}
            </h2>
            <p class="text-gray-600">Blaeu Privacy Response Team B.V.</p>
          </div>
          
          <!-- English Content -->
          <div v-if="currentLanguage === 'en'" class="prose max-w-none text-gray-800">
            <p>This is the privacy statement of Blaeu Privacy Response Team B.V. (Hereinafter: Team Blaeu). You can contact us at:</p>
            
            <p class="ml-4">
              <br />Blaeu Privacy Response Team B.V.<br>
              Halfrond 73, 3071 PP, Rotterdam, The Netherlands<br>
              info@blaeu.com
            </p>
            
            <p class="text-gray-500"><br />Last Updated: March 1, 2025</p>
            
            <h3 class="text-xl font-semibold mt-6 mb-3">We process the following personal data:</h3>
            
            <div class="space-y-4">
              <div>
                <p class="font-medium">Client contact and case information</p>
                <ul class="list-disc pl-8">
                  <li>To provide legal services, we collect clients' names, contact details, and information relevant to their legal matters.</li>
                  <li>We do this to perform a contract (if the person is the client) or because we have a legitimate interest in doing so (if the person represents the client).</li>
                  <li>We retain this data for the duration of the matter plus 7 years.</li>
                  <li>We may share this data with courts and others, such as lawyers of the other party, to perform our engagement with the client.</li>
                </ul>
              </div>
              
              <div>
                <p class="font-medium">Supplier information</p>
                <ul class="list-disc pl-8">
                  <li>To manage our business relationships, we collect company names, contact person details, and financial information of suppliers and service providers.</li>
                  <li>We do this to perform the contract with our suppliers.</li>
                  <li>We retain this data for the duration of the business relationship plus 7 years.</li>
                </ul>
              </div>
              
              <div>
                <p class="font-medium">Financial information</p>
                <ul class="list-disc pl-8">
                  <li>To process payments and comply with tax laws, we collect bank details and payment information.</li>
                  <li>We do this to perform the contract with our client (sending invoices) and legal obligation (preparing and submitting tax statements).</li>
                  <li>We retain this data for 7 years after the year an invoice is sent.</li>
                  <li>We share some financial information with our tax consultant and with tax authorities.</li>
                </ul>
              </div>
            </div>
            
            <p class="mt-4">We primarily collect data directly from you.</p>
            
            <h3 class="text-xl font-semibold mt-6 mb-3">Your rights</h3>
            <p>Under the GDPR, you have the rights to access, rectify, erase (in certain circumstances), restrict processing of, and transfer your data, as well as to object to processing based on legitimate interests and withdraw consent (where applicable). Team Blaeu does not engage in solely automated decision-making or profiling. To exercise these rights, contact us using the details above. You can also lodge a complaint with the Dutch Data Protection Authority (Autoriteit Persoonsgegevens).</p>

            <p class="mt-4">If there is an inconsistency between the Dutch and English-language version of these regulations, the Dutch version takes precedence.</p>

          </div>
          
          <!-- Dutch Content -->
          <div v-else class="prose max-w-none text-gray-800">
            <p>Dit is de privacyverklaring van Blaeu Privacy Response Team B.V. (hierna: Team Blaeu). U kunt contact met ons opnemen via:</p>
            
            <p class="ml-4">
              <br />Blaeu Privacy Response Team B.V.<br>
              Halfrond 73, 3071 PP, Rotterdam, Nederland<br>
              info@blaeu.com
            </p>
            
            <p class="text-gray-500"><br />Laatst bijgewerkt: 1 maart 2025</p>
            
            <h3 class="text-xl font-semibold mt-6 mb-3">Wij verwerken de volgende persoonsgegevens:</h3>
            
            <div class="space-y-4">
              <div>
                <p class="font-medium">Klantcontact- en dossiergegevens</p>
                <ul class="list-disc pl-8">
                  <li>Om juridische diensten te verlenen, verzamelen wij namen, contactgegevens en informatie die relevant is voor de juridische kwesties van onze cliënten.</li>
                  <li>Wij doen dit om een overeenkomst uit te voeren (als de persoon de cliënt is) of omdat wij een gerechtvaardigd belang hebben om dit te doen (als de persoon de cliënt vertegenwoordigt).</li>
                  <li>Wij bewaren deze gegevens gedurende de duur van de zaak plus 7 jaar.</li>
                  <li>Wij kunnen deze gegevens delen met rechtbanken en anderen, zoals advocaten van de andere partij, om onze opdracht voor de cliënt uit te voeren.</li>
                </ul>
              </div>
              
              <div>
                <p class="font-medium">Leveranciersinformatie</p>
                <ul class="list-disc pl-8">
                  <li>Om onze zakelijke relaties te beheren, verzamelen wij bedrijfsnamen, contactpersoongegevens en financiële informatie van leveranciers en dienstverleners.</li>
                  <li>Wij doen dit om de overeenkomst met onze leveranciers uit te voeren.</li>
                  <li>Wij bewaren deze gegevens gedurende de duur van de zakelijke relatie plus 7 jaar.</li>
                </ul>
              </div>
              
              <div>
                <p class="font-medium">Financiële informatie</p>
                <ul class="list-disc pl-8">
                  <li>Om betalingen te verwerken en te voldoen aan belastingwetgeving, verzamelen wij bankgegevens en betalingsinformatie.</li>
                  <li>Wij doen dit om de overeenkomst met onze cliënt uit te voeren (facturen verzenden) en aan wettelijke verplichtingen te voldoen (belastingaangiften voorbereiden en indienen).</li>
                  <li>Wij bewaren deze gegevens gedurende 7 jaar na het jaar waarin een factuur is verzonden.</li>
                  <li>Wij delen sommige financiële informatie met onze belastingadviseur en met de belastingdienst.</li>
                </ul>
              </div>
            </div>
            
            <p class="mt-4">Wij verzamelen gegevens voornamelijk rechtstreeks bij u.</p>
            
            <h3 class="text-xl font-semibold mt-6 mb-3">Uw rechten</h3>
            <p>Op grond van de AVG heeft u het recht op inzage, rectificatie, wissing (in bepaalde omstandigheden), beperking van de verwerking en overdraagbaarheid van uw gegevens, evenals het recht bezwaar te maken tegen verwerking op basis van gerechtvaardigde belangen en toestemming in te trekken (indien van toepassing). Team Blaeu doet niet aan volledig geautomatiseerde besluitvorming of profilering. Om deze rechten uit te oefenen, kunt u contact met ons opnemen via de bovenstaande gegevens. U kunt ook een klacht indienen bij de Autoriteit Persoonsgegevens.</p>
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