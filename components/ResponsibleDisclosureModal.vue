<!-- ResponsibleDisclosureModal.vue -->
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
              @click="downloadDisclosurePolicy" 
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
              {{ currentLanguage === 'nl' ? 'Responsible Disclosure Beleid' : 'Responsible Disclosure Policy' }}
            </h2>
            <p class="text-gray-600">Team Blaeu (Blaeu Privacy Response Team B.V.)</p>
          </div>
          
          <!-- English Content -->
          <div v-if="currentLanguage === 'en'" class="prose max-w-none text-gray-800">
            <p class="text-gray-500 my-4">Last Updated: March 31, 2025</p>

            <p>At Team Blaeu, we consider the security of our systems a top priority. But no matter how much effort we put into system security, there can still be vulnerabilities present.</p>
            
            <p>If you discover a vulnerability, we would like to know about it to take steps to address it as quickly as possible. We want to ask you to help us better protect our clients and our systems.</p>
            
            <h3 class="text-xl font-semibold mt-6 mb-3">PLEASE DO THE FOLLOWING:</h3>
            <ul class="list-disc pl-6">
              <li>E-mail your findings to team@blaeu.com. Encrypt your results using our PGP key to prevent this critical information from falling into the wrong hands,</li>
              <li>Do not take advantage of the vulnerability or problem you have discovered, for example, by downloading more data than necessary to demonstrate the vulnerability or deleting or modifying other people's data,</li>
              <li>Do not reveal the problem to others until we have resolved it,</li>
              <li>Do not use attacks on physical security, social engineering, distributed denial of service, spam or applications of third parties, and</li>
              <li>Do provide sufficient information to reproduce the problem to resolve it as quickly as possible. Usually, the I.P. address or the URL of the affected system and a description of the vulnerability will be sufficient, but complex vulnerabilities may require further explanation.</li>
            </ul>
            
            <h3 class="text-xl font-semibold mt-6 mb-3">WHAT WE PROMISE:</h3>
            <ul class="list-disc pl-6">
              <li>We will respond to your report within three business days with our evaluation of the information and an expected resolution date,</li>
              <li>If you have followed the instructions above, we will not take any legal action against you regarding the information,</li>
              <li>We will handle your report with strict confidentiality and not pass on your details to third parties without your permission,</li>
              <li>We will keep you informed of the progress towards resolving the problem,</li>
              <li>In the public information concerning the problem reported, we will give your name as the discoverer of the problem (unless you desire otherwise), and</li>
              <li>We offer a reward for every report of a security problem that we did not know about yet. As a token of our gratitude for your assistance, the reward amount will be determined based on the leak's severity and the report's quality. The minimum reward will be a Fifty Euro gift certificate.</li>
            </ul>
            
            <p class="mt-4">We strive to resolve all problems as quickly as possible, and we would like to play an active role in the ultimate publication of the issue after fixing it.</p>
          </div>

          <!-- Dutch content -->
          <div v-else class="prose max-w-none text-gray-800">

            <p class="text-gray-500 my-4">Laatst bijgewerkt: 31 maart 2025</p>

            <p>Bij Team Blaeu staat de beveiliging van onze systemen hoog in het vaandel. Maar hoe goed wij ons best ook doen, er kunnen toch kwetsbaarheden voorkomen.</p>
  
            <p>Als u een kwetsbaarheid ontdekt, horen wij dit graag zodat we snel maatregelen kunnen treffen. Wij willen graag met u samenwerken om onze klanten en onze systemen beter te beschermen.</p>
            
            <h3 class="text-xl font-semibold mt-6 mb-3">WIJ VRAGEN U:</h3>
            <ul class="list-disc pl-6">
              <li>Uw bevindingen te mailen naar team@blaeu.com. Versleutel uw bevindingen met onze PGP-sleutel om te voorkomen dat deze gevoelige informatie in verkeerde handen valt,</li>
              <li>De kwetsbaarheid niet te misbruiken door bijvoorbeeld meer data te downloaden dan nodig is om het lek aan te tonen of gegevens van derden te bekijken, verwijderen of aanpassen,</li>
              <li>De kwetsbaarheid niet met anderen te delen totdat deze is verholpen,</li>
              <li>Geen gebruik te maken van aanvallen op fysieke beveiliging, social engineering, distributed denial of service, spam of applicaties van derden, en</li>
              <li>Voldoende informatie te geven om het probleem te reproduceren zodat wij het zo snel mogelijk kunnen verhelpen. Meestal is het IP-adres of de URL van het getroffen systeem en een beschrijving van de kwetsbaarheid voldoende, maar bij complexere kwetsbaarheden kan meer nodig zijn.</li>
            </ul>
            
            <h3 class="text-xl font-semibold mt-6 mb-3">WAT WIJ BELOVEN:</h3>
            <ul class="list-disc pl-6">
              <li>Wij reageren binnen drie werkdagen op uw melding met onze beoordeling van de melding en een verwachte datum voor een oplossing,</li>
              <li>Als u aan bovenstaande voorwaarden heeft voldaan, ondernemen wij geen juridische stappen tegen u betreffende de melding,</li>
              <li>Wij behandelen uw melding vertrouwelijk en delen uw persoonlijke gegevens niet zonder uw toestemming met derden,</li>
              <li>Wij houden u op de hoogte van de voortgang van het oplossen van het probleem,</li>
              <li>In berichtgeving over het gemelde probleem zullen wij, indien u dit wenst, uw naam vermelden als de ontdekker, en</li>
              <li>Wij bieden een beloning voor elke melding van een beveiligingsprobleem dat bij ons nog niet bekend is. Als blijk van waardering voor uw hulp wordt de hoogte van de beloning bepaald aan de hand van de ernst van het lek en de kwaliteit van de melding. De minimale beloning is een cadeaubon ter waarde van vijftig euro.</li>
            </ul>
            
            <p class="mt-4">Wij streven ernaar alle problemen zo snel mogelijk op te lossen en wij willen graag betrokken worden bij een eventuele publicatie over het probleem nadat het is opgelost.</p>
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
    },
    downloadDisclosurePolicy() {
      // Determine language-specific content and filename
      const isNL = this.currentLanguage === 'nl';
      const fileName = isNL ? 'responsible-disclosure-beleid-blaeu.txt' : 'responsible-disclosure-policy-blaeu.txt';
      
      // Generate the content based on the selected language
      let content = '';
      
      if (isNL) {
        content = `RESPONSIBLE DISCLOSURE BELEID - TEAM BLAEU (BLAEU PRIVACY RESPONSE TEAM B.V.)
Laatst bijgewerkt: 31 maart 2025

Bij Team Blaeu staat de beveiliging van onze systemen hoog in het vaandel. Maar hoe goed wij ons best ook doen, er kunnen toch kwetsbaarheden voorkomen.

Als u een kwetsbaarheid ontdekt, horen wij dit graag zodat we snel maatregelen kunnen treffen. Wij willen graag met u samenwerken om onze klanten en onze systemen beter te beschermen.

WIJ VRAGEN U:
- Uw bevindingen te mailen naar team@blaeu.com. Versleutel uw bevindingen met onze PGP-sleutel om te voorkomen dat deze gevoelige informatie in verkeerde handen valt,
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

Wij streven ernaar alle problemen zo snel mogelijk op te lossen en wij willen graag betrokken worden bij een eventuele publicatie over het probleem nadat het is opgelost.`;
      } else {
        content = `RESPONSIBLE DISCLOSURE POLICY - TEAM BLAEU (BLAEU PRIVACY RESPONSE TEAM B.V.
Last Updated: March 31, 2025

At Team Blaeu, we consider the security of our systems a top priority. But no matter how much effort we put into system security, there can still be vulnerabilities present.

If you discover a vulnerability, we would like to know about it to take steps to address it as quickly as possible. We want to ask you to help us better protect our clients and our systems.

PLEASE DO THE FOLLOWING:
- E-mail your findings to team@blaeu.com. Encrypt your results using our PGP key to prevent this critical information from falling into the wrong hands,
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

We strive to resolve all problems as quickly as possible, and we would like to play an active role in the ultimate publication of the issue after fixing it.`;
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