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
          <button @click="closeModal" class="absolute top-4 right-4 z-10 text-black hover:text-b bg-black-600 hover:bg-blue-700 rounded-full p-2 flex items-center justify-center transition duration-300">
            <svg class="w-5 h-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="black" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <!-- Language selector and Download button -->
          <div class="flex justify-between items-center mb-4 mr-12">
            <!-- Download button -->
            <button 
              @click="downloadPolicy" 
              class="flex items-center px-4 py-2 bg-[#ffcc00] text-black rounded-md hover:bg-[#e6b800] transition duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download
            </button>
            
            <!-- Language selector -->
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
              {{ currentLanguage === 'nl' ? 'Cookiebeleid' : 'Cookie Policy' }}
            </h2>
            <p class="text-gray-600">Blaeu Privacy Response Team B.V. (Team Blaeu)</p>
          </div>
          
          <!-- English Content -->
          <div v-if="currentLanguage === 'en'" class="prose max-w-none text-gray-800">
            <p>
              This page is free from (tracking) cookies or similar technologies. We delete access logs after 3 months.
            </p>

            <p class="text-gray-500 mt-6">Last Updated: March 28, 2025</p>
            
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

            <h3 class="text-xl font-semibold mt-6 mb-3">Privacy By Design: Video Component</h3>
            <p>
              We use the Dash.js component for displaying videos on our website. We have configured this component in such a way that we do not use cookies. We store the used video codec in the local storage of the browser (e.g., dashjs_video_settings - codec: "video/mp4;codecs=\"avc1.42c01e\""). A video codec is a piece of software or hardware that compresses and decompresses video information. If the video appears multiple times on a page, such as on the homepage, we don't load it twice. This saves network traffic and makes the page load faster.
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

            <p class="text-gray-500 mt-6">Laatst bijgewerkt: 28 maart 2025</p>
            
            <h3 class="text-xl font-semibold mt-6 mb-3">Waarom wij geen cookies gebruiken</h3>
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

            <h3 class="text-xl font-semibold mt-6 mb-3">Privacy by design: video component</h3>
            <p>
              We gebruiken de Dash.js component voor het tonen van video's op onze website. Deze component hebben we dusdanig geconfigureerd dat we geen gebruik maken van cookies. We slaan de gebruikte video codec op in de local storage van de browser (bijvoorbeeld, dashjs_video_settings - codec: "video/mp4;codecs=\"avc1.42c01e\""). Een video codec is een stuk software of hardware dat video-informatie comprimeert en decomprimeert. Als de video meerdere keren aanwezig is op een pagina, zoals op de homepage, dan laden we deze niet dubbel. Zo besparen we netwerkverkeer en is het laden van de pagina sneller.
            </p>
       
            <h3 class="text-xl font-semibold mt-6 mb-3">Uw rechten</h3>
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
    },
    downloadPolicy() {
      // Determine language-specific content and filename
      const isNL = this.currentLanguage === 'nl';
      const fileName = isNL ? 'cookiebeleid-blaeu.txt' : 'cookie-policy-blaeu.txt';
      
      // Generate the content based on the selected language
      let content = '';
      
      if (isNL) {
        content = `COOKIEBELEID - BLAEU PRIVACY RESPONSE TEAM B.V.
Laatst bijgewerkt: 28 maart 2025

Deze pagina is vrij van (tracking) cookies of vergelijkbare technologieën. We verwijderen toegangslogboeken na 3 maanden.

WAAROM WIJ GEEN COOKIES GEBRUIKEN
Bij Blaeu Privacy Response Team B.V. geven wij prioriteit aan uw privacy en gegevensbeschermingsrechten. We hebben onze website ontworpen om te functioneren zonder cookies of vergelijkbare tracking-technologieën. Dit betekent:
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
We gebruiken de Dash.js component voor het tonen van video's op onze website. Deze component hebben we dusdanig geconfigureerd dat we geen gebruik maken van cookies. We slaan de gebruikte video codec op in de local storage van de browser (bijvoorbeeld, dashjs_video_settings - codec: "video/mp4;codecs=\"avc1.42c01e\""). Een video codec is een stuk software of hardware dat video-informatie comprimeert en decomprimeert. Als de video meerdere keren aanwezig is op een pagina, zoals op de homepage, dan laden we deze niet dubbel. Zo besparen we netwerkverkeer en is het laden van de pagina sneller.

UW RECHTEN
Onder de Algemene Verordening Gegevensbescherming (AVG) heeft u rechten met betrekking tot uw persoonsgegevens. Voor meer informatie over hoe wij met persoonsgegevens omgaan, verwijzen wij u naar onze Privacyverklaring.`;
      } else {
        content = `COOKIE POLICY - BLAEU PRIVACY RESPONSE TEAM B.V.
Last Updated: March 28, 2025

This page is free from (tracking) cookies or similar technologies. We delete access logs after 3 months.

WHY WE DON'T USE COOKIES
At Blaeu Privacy Response Team B.V., we prioritize your privacy and data protection rights. We have designed our website to function without the need for cookies or similar tracking technologies. This means:
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
We use the Dash.js component for displaying videos on our website. We have configured this component in such a way that we do not use cookies. We store the used video codec in the local storage of the browser (e.g., dashjs_video_settings - codec: "video/mp4;codecs=\"avc1.42c01e\""). A video codec is a piece of software or hardware that compresses and decompresses video information. If the video appears multiple times on a page, such as on the homepage, we don't load it twice. This saves network traffic and makes the page load faster.

YOUR RIGHTS
Under the General Data Protection Regulation (GDPR), you have rights regarding your personal data. For more information about how we handle personal data, please refer to our Privacy Statement.`;
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