<!-- CookiePolicyModal.vue -->
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
              {{ currentLanguage === 'nl' ? 'Cookiebeleid' : 'Cookie Policy' }}
            </h2>
            <p class="text-gray-600">Blaeu Privacy Response Team B.V. (Team Blaeu)</p>
          </div>
          
          <!-- English Content -->
          <div v-if="currentLanguage === 'en'" class="prose max-w-none text-gray-800">
            <p>
              This page is free from (tracking) cookies or similar technologies. We delete access logs after 3 months.
            </p>

            <p class="text-gray-500 mt-6">Last Updated: March 1, 2025</p>
            
            <h3 class="text-xl font-semibold mt-6 mb-3">Why We Don't Use Cookies</h3>
            <p>
              At Blaeu Privacy Response Team B.V., we prioritize your privacy and data protection rights. We have designed our website to function without the need for cookies or similar tracking technologies. This means:
            </p>
            <ul class="list-disc pl-6">
              <li>No tracking of your browsing behavior on our site</li>
              <li>No collection of personal data through cookies</li>
              <li>No third-party advertising cookies</li>
              <li>No unnecessary data storage on your device</li>
            </ul>
            
            <h3 class="text-xl font-semibold mt-6 mb-3">Server Logs</h3>
            <p>
              While we do maintain standard server logs for security and operational purposes, these logs are automatically deleted after 3 months. Server logs may include:
            </p>
            <ul class="list-disc pl-6">
              <li>IP addresses</li>
              <li>Browser type and version</li>
              <li>Date and time of access</li>
              <li>Pages visited</li>
            </ul>
            <p>
              These logs are maintained solely for the purpose of ensuring the security and proper functioning of our website and are not used for tracking or profiling visitors.
            </p>
            
            <h3 class="text-xl font-semibold mt-6 mb-3">Your Rights</h3>
            <p>
              Under the General Data Protection Regulation (GDPR), you have rights regarding your personal data. For more information about how we handle personal data, please refer to our <a href="#" @click.prevent="showPrivacyPolicy" class="text-blue-600 hover:underline">Privacy Statement</a>.
            </p>
            
          </div>
          
          <!-- Dutch Content -->
          <div v-else class="prose max-w-none text-gray-800">
            <p>
              Deze pagina is vrij van (tracking) cookies of vergelijkbare technologieën. We verwijderen toegangslogboeken na 3 maanden.
            </p>

            <p class="text-gray-500 mt-6">Laatst bijgewerkt: 1 maart 2025</p>
            
            <h3 class="text-xl font-semibold mt-6 mb-3">Waarom Wij Geen Cookies Gebruiken</h3>
            <p>
              Bij Blaeu Privacy Response Team B.V. geven wij prioriteit aan uw privacy en gegevensbeschermingsrechten. We hebben onze website ontworpen om te functioneren zonder cookies of vergelijkbare tracking-technologieën. Dit betekent:
            </p>
            <ul class="list-disc pl-6">
              <li>Geen tracking van uw surfgedrag op onze site</li>
              <li>Geen verzameling van persoonlijke gegevens via cookies</li>
              <li>Geen cookies van derden voor advertenties</li>
              <li>Geen onnodige gegevensopslag op uw apparaat</li>
            </ul>
            
            <h3 class="text-xl font-semibold mt-6 mb-3">Serverlogboeken</h3>
            <p>
              Hoewel we standaard serverlogboeken bijhouden voor beveiligings- en operationele doeleinden, worden deze logboeken automatisch na 3 maanden verwijderd. Serverlogboeken kunnen bevatten:
            </p>
            <ul class="list-disc pl-6">
              <li>IP-adressen</li>
              <li>Browsertype en -versie</li>
              <li>Datum en tijd van toegang</li>
              <li>Bezochte pagina's</li>
            </ul>
            <p>
              Deze logboeken worden uitsluitend bijgehouden om de veiligheid en goede werking van onze website te waarborgen en worden niet gebruikt voor het volgen of profileren van bezoekers.
            </p>
            
            <h3 class="text-xl font-semibold mt-6 mb-3">Uw Rechten</h3>
            <p>
              Onder de Algemene Verordening Gegevensbescherming (AVG) heeft u rechten met betrekking tot uw persoonsgegevens. Voor meer informatie over hoe wij met persoonsgegevens omgaan, verwijzen wij u naar onze <a href="#" @click.prevent="showPrivacyPolicy" class="text-blue-600 hover:underline">Privacyverklaring</a>.
            </p>
            
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
  emits: ['close', 'show-privacy'],
  data() {
    return {
      currentLanguage: this.initialLanguage
    }
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    showPrivacyPolicy() {
      this.$emit('show-privacy', this.currentLanguage);
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