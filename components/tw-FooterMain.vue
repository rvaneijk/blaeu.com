<!-- tw-FooterMain.vue -->
<template>
    <section id="about" class="bg-[#4B5563] py-12 font-amblelight text-sm tracking-extra-tight text-white font-normal leading-6">
        <div class="container mx-auto px-4">
            <!-- Top row: Logo and primary sections -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <!-- Logo - moved to the left -->
                <div class="flex flex-col justify-start items-start">
                    <img src="/assets/png/logo_gray.png" alt="Blaeu Logo" class="h-24 mb-4">
                    <p class="text-sm text-gray-300 max-w-xs">
                        Privacy engineering and data protection consultancy specializing in complex data architectures.
                    </p>
                </div>
                
                <!-- Location section -->
                <div>
                    <h3 class="text-lg font-semibold mb-3">Location</h3>
                    <ul class="space-y-1">
                        <li class="flex items-center">
                            <i class="fa-solid fa-location-dot mr-3 text-[#ffcc00]"></i>
                            <span>p/a Element Offices, Suite 8.16</span>
                        </li>
                        <li class="pl-6">Wilhelminaplein 1-40</li>
                        <li class="pl-6">3072 DE, Rotterdam</li>
                        <li class="pl-6">The Netherlands</li>
                    </ul>
                </div>
                
                <!-- Contact section -->
                <div>
                    <h3 class="text-lg font-semibold mb-3">Contact</h3>
                    <ul class="space-y-1">
                        <li class="flex items-center">
                            <i class="fa-solid fa-envelope mr-3 text-[#ffcc00]"></i>
                            <a href="mailto:info@blaeu.com" class="hover:text-[#ffcc00] transition-colors">
                                info@blaeu.com
                            </a>
                        </li>
                        <li class="flex items-center">
                            <i class="fa-solid fa-phone mr-3 text-[#ffcc00]"></i>
                            <span>+31 651 411 914</span>
                        </li>
                    </ul>
          <div class="mt-6">
            <a href="mailto:info@blaeu.com" class="bg-[#ffcc00] hover:bg-blue-600 text-black hover:text-white font-medium px-4 py-2 rounded-md transition-colors inline-flex items-center">
              <i class="fa-solid fa-envelope mr-2"></i> Get in touch
            </a>
          </div>
                </div>
            </div>
            
            <!-- Bottom row: Registration, Legal, Security & Privacy -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <!-- Registration information -->
                <div>
                    <h3 class="text-lg font-semibold mb-3">Registration</h3>
                    <ul class="space-y-2">
                        <li class="flex items-start">
                            <i class="fa-solid fa-building mr-3 text-[#ffcc00] mt-1"></i>
                            <div>
                                <p>Kamer van Koophandel (NL):</p>
                                <p class="pl-6">75599740</p>
                            </div>
                        </li>
						</ul>
                </div>
                
                <!-- Legal section -->
                <div>
                    <h3 class="text-lg font-semibold mb-3">Legal</h3>
                    <ul class="space-y-1">
                        <li class="flex items-center">
                            <i class="fa-solid fa-file-shield mr-3 text-[#ffcc00]"></i>
                            <div>
                                <span>Privacy Statement </span>
                                <a href="#" @click.prevent="showPrivacy('en')" class="hover:text-[#ffcc00] transition-colors" title="English">EN</a>
                                <span class="mx-1">|</span>
                                <a href="#" @click.prevent="showPrivacy('nl')" class="hover:text-[#ffcc00] transition-colors" title="Nederlands">NL</a>
                            </div>
                        </li>
                        <li class="flex items-center">
                            <i class="fa-solid fa-cookie mr-3 text-[#ffcc00]"></i>
                            <div>
                                <span>Cookie Policy </span>
                                <a href="#" @click.prevent="showCookiePolicy('en')" class="hover:text-[#ffcc00] transition-colors" title="English">EN</a>
                                <span class="mx-1">|</span>
                                <a href="#" @click.prevent="showCookiePolicy('nl')" class="hover:text-[#ffcc00] transition-colors" title="Nederlands">NL</a>
                            </div>
                        </li>
                        <li class="flex items-center">
                            <i class="fa-solid fa-scale-balanced mr-3 text-[#ffcc00]"></i>
                            <div>
                                <span>General Terms and Conditions </span>
                                <a href="#" @click.prevent="showTerms('en')" class="hover:text-[#ffcc00] transition-colors" title="English">EN</a>
                                <span class="mx-1">|</span>
                                <a href="#" @click.prevent="showTerms('nl')" class="hover:text-[#ffcc00] transition-colors" title="Nederlands">NL</a>
                            </div>
                        </li>
                    </ul>
                </div>
                
                <!-- Security & Privacy section -->
                <div>
                    <h3 class="text-lg font-semibold mb-3">Security & Privacy</h3>
                    <ul class="space-y-1">
                        <li class="flex items-center">
                            <i class="fa-solid fa-key mr-3 text-[#ffcc00]"></i>
                            <a href="https://pgp.surfnet.nl/pks/lookup?search=9b9171334b4f58de&fingerprint=on&op=index" target="_blank" class="hover:text-[#ffcc00] transition-colors">
                                PGP Key <i class="fa-solid fa-external-link fa-xs"></i>
                            </a>
                        </li>
                        <li class="flex items-center">
                            <i class="fa-solid fa-shield-halved mr-3 text-[#ffcc00]"></i>
                            <div>
                                <span>Responsible Disclosure </span>
                                <a href="#" @click.prevent="showResponsibleDisclosure('en')" class="hover:text-[#ffcc00] transition-colors" title="English">EN</a>
                                <span class="mx-1">|</span>
                                <a href="#" @click.prevent="showResponsibleDisclosure('nl')" class="hover:text-[#ffcc00] transition-colors" title="Nederlands">NL</a>
                            </div>
                        </li>
                        <li class="flex items-center">
                            <i class="fa-solid fa-file-shield mr-3 text-[#ffcc00]"></i>
                            <div>
                                <span>Security.txt </span>
                                <a href="#" @click.prevent="showSecurityTxt('en')" class="hover:text-[#ffcc00] transition-colors" title="English">EN</a>
                                <span class="mx-1">|</span>
                                <a href="#" @click.prevent="showSecurityTxt('nl')" class="hover:text-[#ffcc00] transition-colors" title="Nederlands">NL</a>
                            </div>
                        </li>
                        <li class="flex items-center">
                            <i class="fa-brands fa-github mr-3 text-[#ffcc00]"></i>
                            <a href="https://github.com/rvaneijk/blaeu.com" target="_blank" class="hover:text-[#ffcc00] transition-colors">
                                Source Code <i class="fa-solid fa-external-link fa-xs"></i>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            
            <!-- Horizontal line before copyright -->
            <hr class="border-gray-700 mb-8" />
            
            <!-- Copyright and disclaimer -->
            <div>
                <div class="text-xs text-gray-300">
                    <p class="mb-2">
                        <span class="font-semibold">Copyright © 2025 Blaeu Privacy Response Team B.V.</span> (CC BY 4.0)
                    </p>

                    <p>
                        <span class="font-semibold">All Rights Reserved.</span> <span class="font-semibold">Video</span> provided by JuSun/Creatas Video via Getty Images. Licensed for commercial use. Fonts and other third-party components may be subject to their respective licenses. <span class="font-semibold">Fonts:</span> Amble Family (Apache License 2.0), Big John (SIL OFL 1.1), Dash.js (BSD License), Font Awesome (CC BY 4.0). <span class="font-semibold">Frameworks & Libraries:</span> Node.js components (Node.js contributors' terms), Nuxt.js components (MIT), Tailwind CSS (MIT),  TW Elements (GNU AGPL v3), and Vue.js (MIT).
                    </p>
                </div>
            </div>
        </div>
        
        <!-- Terms and Conditions Modal -->
        <TermsModal 
            :show="showTermsModal" 
            :initial-language="termsLanguage"
            @close="showTermsModal = false" 
        />

        <!-- Privacy Statement Modal -->
        <PrivacyModal 
            :show="showPrivacyModal" 
            :initial-language="privacyLanguage"
            @close="showPrivacyModal = false" 
        />
        
        <!-- Cookie Policy Modal -->
        <CookiePolicyModal 
            :show="showCookiePolicyModal" 
            :initial-language="cookiePolicyLanguage"
            @close="showCookiePolicyModal = false"
            @show-privacy="showPrivacy" 
        />
        
        <!-- Responsible Disclosure Modal -->
        <ResponsibleDisclosureModal
            :show="showResponsibleDisclosureModal"
            :initial-language="responsibleDisclosureLanguage"
            @close="showResponsibleDisclosureModal = false"
        />
        
        <!-- Security.txt Modal -->
        <SecurityTxtModal
            :show="showSecurityTxtModal"
            :initial-language="securityTxtLanguage"
            @close="showSecurityTxtModal = false"
        />
    </section>
</template>

<script>
import TermsModal from '~/components/TermsModal.vue'
import PrivacyModal from '~/components/PrivacyModal.vue'
import CookiePolicyModal from '~/components/CookiePolicyModal.vue'
import ResponsibleDisclosureModal from '~/components/ResponsibleDisclosureModal.vue'
import SecurityTxtModal from '~/components/SecurityTxtModal.vue'

export default {
    components: {
        TermsModal,
        PrivacyModal,
        CookiePolicyModal,
        ResponsibleDisclosureModal,
        SecurityTxtModal
    },
    data() {
        return {
            showTermsModal: false,
            showPrivacyModal: false,
            showCookiePolicyModal: false,
            showResponsibleDisclosureModal: false,
            showSecurityTxtModal: false,
            termsLanguage: 'nl',
            privacyLanguage: 'nl',
            cookiePolicyLanguage: 'nl',
            responsibleDisclosureLanguage: 'nl',
            securityTxtLanguage: 'nl'
        }
    },
    computed: {
        // Detect browser language to set initial language preference
        browserLanguage() {
            // Only run this on client side
            if (process.client) {
                const lang = navigator.language || navigator.userLanguage;
                return lang.startsWith('nl') ? 'nl' : 'en';
            }
            return 'nl'; // Default to Dutch on server-side
        }
    },
    mounted() {
        // Set language based on browser preference when component mounts
        this.termsLanguage = this.browserLanguage;
        this.privacyLanguage = this.browserLanguage;
        this.cookiePolicyLanguage = this.browserLanguage;
        this.responsibleDisclosureLanguage = this.browserLanguage;
        this.securityTxtLanguage = this.browserLanguage;
    },
    methods: {
        // Show terms in specific language
        showTerms(language) {
            this.termsLanguage = language;
            this.showTermsModal = true;
        },
        
        // Show privacy statement in specific language
        showPrivacy(language) {
            this.privacyLanguage = language;
            this.showPrivacyModal = true;
        },
        
        // Show cookie policy in specific language
        showCookiePolicy(language) {
            this.cookiePolicyLanguage = language;
            this.showCookiePolicyModal = true;
        },
        
        // Show responsible disclosure modal
        showResponsibleDisclosure(language) {
            this.responsibleDisclosureLanguage = language;
            this.showResponsibleDisclosureModal = true;
        },
        
        // Show security.txt modal
        showSecurityTxt(language) {
            this.securityTxtLanguage = language;
            this.showSecurityTxtModal = true;
        }
    }
}
</script>