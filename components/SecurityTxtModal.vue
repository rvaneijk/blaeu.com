<!-- SecurityTxtModal.vue -->
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
              @click="downloadSecurityTxt" 
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
            <h2 class="text-2xl font-bold text-gray-900">Security.txt</h2>
            <p class="text-gray-600">Blaeu Privacy Response Team B.V.</p>
          </div>
          
          <!-- English Content -->
          <div v-if="currentLanguage === 'en'" class="prose max-w-none text-gray-800">
            <p class="text-gray-500 my-4">Last Updated: December 28, 2024</p>

            <p>This is the security.txt information for Blaeu Privacy Response Team B.V.</p>

            <p>Security.txt is a standard that allows websites to define security policies and contact information for security researchers. Below is the security.txt file for Blaeu Privacy Response Team B.V.</p>
            
            <div class="bg-gray-50 p-4 my-6">
              <p>Contact: mailto:rob@blaeu.com</p>
              <p>Expires: 2025-12-29T22:00:00.000Z</p>
              <p>Encryption: https://pgp.surfnet.nl/pks/lookup?search=6e9c7952da113db11f1a94119b9171334b4f58de&fingerprint=on&op=index</p>
              <p>Preferred-Languages: en, nl</p>
              <p>Canonical: https://blaeu.com/.well-known/security.txt</p>
              <p>Policy: https://blaeu.com/.well-known/responsible_disclosure_policy.txt</p>
            </div>
            
            <h3 class="text-xl font-semibold mt-6 mb-3">What This Means:</h3>
            <ul class="list-disc pl-6">
              <li><strong>Contact:</strong> Security researchers should contact us at rob@blaeu.com to report security vulnerabilities.</li>
              <li><strong>Expires:</strong> This security.txt file is valid until December 29, 2025.</li>
              <li><strong>Encryption:</strong> For secure communication, you can use our PGP key available at the provided URL.</li>
              <li><strong>Preferred Languages:</strong> We can communicate in English and Dutch.</li>
              <li><strong>Canonical:</strong> The official location of this security.txt file.</li>
              <li><strong>Policy:</strong> Our responsible disclosure policy can be found at the provided URL.</li>
            </ul>
            
            <p class="mt-4">If you discover a security vulnerability, please follow our responsible disclosure policy and report it to us using the contact information above.</p>
          </div>

          <!-- Dutch content -->
          <div v-else class="prose max-w-none text-gray-800">
            <p class="text-gray-500 my-4">Laatst bijgewerkt: 28 december 2024</p>

            <p>Dit is de security.txt informatie voor Blaeu Privacy Response Team B.V.</p>
 
            <p>Security.txt is een standaard die websites in staat stelt om beveiligingsbeleid en contactinformatie voor beveiligingsonderzoekers te definiëren. Hieronder staat het security.txt bestand voor Blaeu Privacy Response Team B.V.</p>
            
            <div class="bg-gray-50 p-4 my-6">
              <p>Contact: mailto:rob@blaeu.com</p>
              <p>Expires: 2025-12-29T22:00:00.000Z</p>
              <p>Encryption: https://pgp.surfnet.nl/pks/lookup?search=6e9c7952da113db11f1a94119b9171334b4f58de&fingerprint=on&op=index</p>
              <p>Preferred-Languages: en, nl</p>
              <p>Canonical: https://blaeu.com/.well-known/security.txt</p>
              <p>Policy: https://blaeu.com/.well-known/responsible_disclosure_policy.txt</p>
            </div>
            
            <h3 class="text-xl font-semibold mt-6 mb-3">Wat Dit Betekent:</h3>
            <ul class="list-disc pl-6">
              <li><strong>Contact:</strong> Beveiligingsonderzoekers kunnen contact met ons opnemen via rob@blaeu.com om beveiligingskwetsbaarheden te melden.</li>
              <li><strong>Expires:</strong> Dit security.txt bestand is geldig tot 29 december 2025.</li>
              <li><strong>Encryption:</strong> Voor beveiligde communicatie kunt u onze PGP-sleutel gebruiken die beschikbaar is op de aangegeven URL.</li>
              <li><strong>Preferred Languages:</strong> We kunnen communiceren in het Engels en Nederlands.</li>
              <li><strong>Canonical:</strong> De officiële locatie van dit security.txt bestand.</li>
              <li><strong>Policy:</strong> Ons responsible disclosure beleid is te vinden op de aangegeven URL.</li>
            </ul>
            
            <p class="mt-4">Als u een beveiligingskwetsbaarheid ontdekt, volg dan ons responsible disclosure beleid en meldt het aan ons via de bovenstaande contactgegevens.</p>
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
    downloadSecurityTxt() {
      // Determine language-specific filename (content is the same in both languages)
      const isNL = this.currentLanguage === 'nl';
      const fileName = isNL ? 'security-txt-blaeu.txt' : 'security-txt-blaeu.txt';
      
      // Generate the raw security.txt content (this doesn't change based on language)
      const content = `Contact: mailto:rob@blaeu.com
Expires: 2025-12-29T22:00:00.000Z
Encryption: https://pgp.surfnet.nl/pks/lookup?search=6e9c7952da113db11f1a94119b9171334b4f58de&fingerprint=on&op=index
Preferred-Languages: en, nl
Canonical: https://blaeu.com/.well-known/security.txt
Policy: https://blaeu.com/.well-known/responsible_disclosure_policy.txt`;

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