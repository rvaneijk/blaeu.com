<!-- tw-Footer.vue -->
<template>
  <footer id="about" aria-label="Contact information and resources" class="bg-[#4B5563] py-12 font-amblelight text-sm tracking-extra-tight text-white font-normal leading-6">
    <div class="container mx-auto px-4">
      <div 
        class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8"
      >
        <!-- Contact Information -->
        <nav class="pt-4" aria-labelledby="contact-heading">	
          <h3 id="contact-heading" class="text-xl font-semibold mb-4 text-[#ffcc00]">Contact</h3>
          <ul class="space-y-3">
            <li class="flex items-center">
              <span class="flex-shrink-0 w-7 flex justify-start">
                <i class="fa-solid fa-envelope text-[#ffcc00]" aria-hidden="true"></i>
              </span>
              <a href="mailto:rob@blaeu.com" class="hover:text-[#ffcc00] transition-colors inline-flex items-center">
                rob@blaeu.com
              </a>
            </li>
            <li class="flex items-center">
              <span class="flex-shrink-0 w-7 flex justify-start">
                <i class="fa-solid fa-key text-[#ffcc00]" aria-hidden="true"></i>
              </span>
              <a href="https://pgp.surfnet.nl/pks/lookup?search=9b9171334b4f58de&fingerprint=on&op=index" target="_blank" class="hover:text-[#ffcc00] transition-colors inline-flex items-center">
                PGP Key @SURFnet&nbsp;<i class="fa-solid fa-external-link fa-xs" aria-hidden="true"></i>
              </a>
            </li>
            <li class="flex items-center">
              <span class="flex-shrink-0 w-7 flex justify-start">
                <i class="fa-brands fa-linkedin text-[#ffcc00]" aria-hidden="true"></i>
              </span>
              <a href="https://www.linkedin.com/in/rvaneijk88" target="_blank" class="hover:text-[#ffcc00] transition-colors inline-flex items-center">
                LinkedIn&nbsp;<i class="fa-solid fa-external-link fa-xs" aria-hidden="true"></i>
              </a>
            </li>
          </ul>
        </nav>
        
        <!-- Thought Leadership -->
        <nav class="pt-4" aria-labelledby="socials-heading">
          <h3 id="socials-heading" class="text-xl font-semibold mb-4 text-[#ffcc00]">Thought Leadership</h3>
          <ul class="space-y-3">
            <li class="flex items-center">
              <span class="flex-shrink-0 w-7 flex justify-start">
                <i class="fa-brands fa-bluesky text-[#ffcc00]" aria-hidden="true"></i>
              </span>
              <a href="https://bsky.app/profile/rvaneijk.bsky.social" target="_blank" class="hover:text-[#ffcc00] transition-colors inline-flex items-center">
                Blue Sky&nbsp;<i class="fa-solid fa-external-link fa-xs" aria-hidden="true"></i>
              </a>
            </li>
            <li class="flex items-center">
              <span class="flex-shrink-0 w-7 flex justify-start">
                <i class="fa-brands fa-mastodon text-[#ffcc00]" aria-hidden="true"></i>
              </span>
              <a href="https://mastodon.nl/@rvaneijk" target="_blank" class="hover:text-[#ffcc00] transition-colors inline-flex items-center">
                Mastodon&nbsp;<i class="fa-solid fa-external-link fa-xs" aria-hidden="true"></i>
              </a>
            </li>
            <li class="flex items-center">
              <span class="flex-shrink-0 w-7 flex justify-start">
                <i class="fa-solid fa-graduation-cap text-[#ffcc00]" aria-hidden="true"></i>
              </span>
              <a href="https://scholar.google.nl/citations?user=p4VBH-4AAAAJ" target="_blank" class="hover:text-[#ffcc00] transition-colors inline-flex items-center">
                Google Scholar&nbsp;<i class="fa-solid fa-external-link fa-xs" aria-hidden="true"></i>
              </a>
            </li>
            <li class="flex items-center">
              <span class="flex-shrink-0 w-7 flex justify-start">
                <i class="fa-brands fa-github text-[#ffcc00]" aria-hidden="true"></i>
              </span>
              <a href="https://github.com/rvaneijk" target="_blank" class="hover:text-[#ffcc00] transition-colors inline-flex items-center">
                Code @GitHub&nbsp;<i class="fa-solid fa-external-link fa-xs" aria-hidden="true"></i>
              </a>
            </li>
            <li class="flex items-center">
              <span class="flex-shrink-0 w-7 flex justify-start">
                <i class="fa-brands fa-orcid text-[#ffcc00]" aria-hidden="true"></i>
              </span>
              <a href="https://orcid.org/0000-0002-2203-6819" target="_blank" class="hover:text-[#ffcc00] transition-colors inline-flex items-center">
                ORCID&nbsp;<i class="fa-solid fa-external-link fa-xs" aria-hidden="true"></i>
              </a>
            </li>
          </ul>
        </nav>
        
        <!-- About -->
        <section class="pt-4" aria-labelledby="roles-heading">
          <h3 id="roles-heading" class="text-xl font-semibold mb-4 text-[#ffcc00]">Professional Roles</h3>
          <p class="mb-4 leading-relaxed">
            I currently serve in dual professional capacities: as Managing Director Europe at Future of Privacy Forum (FPF) and as Founder of Team Blaeu (Blaeu Privacy Response Team B.V.).
          </p>
          <p class="mb-4 leading-relaxed">
            My work bridges privacy policy development with practical implementation, providing strategic guidance on data protection, privacy engineering, and ethical technology deployment.
          </p>
          <div class="mt-6">
            <a href="mailto:team@blaeu.com" class="bg-[#ffcc00] hover:bg-blue-600 text-black hover:text-white font-medium px-4 py-2 rounded-md transition-colors inline-flex items-center">
              <i class="fa-solid fa-envelope mr-2" aria-hidden="true"></i> Get in touch
            </a>
          </div>
        </section>
      </div>

      <!-- Horizontal line before copyright and accessibility -->
      <hr class="border-gray-700 mb-8" />
      
      <!-- Combined accessibility and copyright section -->
      <div>
        <!-- Accessibility links -->
        <div class="flex mb-4 text-sm text-gray-300">
          <div class="flex items-center mr-6">
            <span class="flex-shrink-0 w-7 flex justify-start">
              <i class="fa-solid fa-universal-access text-[#ffcc00]" aria-hidden="true"></i>
            </span>
            <a href="#" @click.prevent="openAccessibilityPolicyWidget()" class="hover:text-[#ffcc00] transition-colors inline-flex items-center">
              Accessibility
            </a>
          </div>
          <div class="flex items-center">
            <span class="flex-shrink-0 w-7 flex justify-start">
              <i class="fa-solid fa-keyboard text-[#ffcc00]" aria-hidden="true"></i>
            </span>
            <a href="#" @click.prevent="showKeyboardShortcuts" class="hover:text-[#ffcc00] transition-colors inline-flex items-center" title="Press Alt+/">
              Shortcuts
            </a>
          </div>
        </div>
        
        <!-- Copyright and disclaimer -->
        <div class="text-xs text-gray-300">
          <p class="mb-2">
            <span class="font-semibold">Copyright © 2025 Rob van Eijk</span> • Personal content is licensed under CC BY 4.0 unless otherwise noted.
          </p>

          <p>
            Opinions expressed are my own and do not necessarily reflect the views of Future of Privacy Forum or other affiliated organizations. For Team Blaeu's company information, please visit <a href="/" class="text-[#ffcc00] hover:underline">blaeu.com <i class="fa-solid fa-external-link fa-xs" aria-hidden="true"></i></a>.
          </p>
        </div>
      </div>
    </div>
    
    <!-- Accessibility Statement is now a global component -->
    
    <!-- Modal reference removed to fix hydration mismatch -->
    
    <!-- Accessibility Policy Widget -->
    <AccessibilityPolicyWidget />
  </footer>
</template>

<script setup>
import { ref } from 'vue';
import AccessibilityPolicyWidget from '~/components/AccessibilityPolicyWidget.vue';
import { globalState } from '~/composables/globalState';

// State management

// Helper function to determine browser language
const getBrowserLanguage = () => {
  let language = 'en';
  if (process.client) {
    const browserLang = navigator.language || navigator.userLanguage;
    language = browserLang.startsWith('nl') ? 'nl' : 'en';
  }
  return language;
};

// Methods
// Function below replaced by direct call to openAccessibilityPolicyWidget in template
// const showAccessibilityStatement = () => {
//   const language = getBrowserLanguage();
//   
//   // Trigger custom event for the accessibility policy widget (replacing statement)
//   const event = new CustomEvent('open-accessibility-policy', {
//     detail: { 
//       language: language,
//       expandPolicy: true
//     }
//   });
//   document.dispatchEvent(event);
// };

const showTerms = (language) => {
  // Update global language preference if provided
  if (language) {
    globalState.languagePreference = language;
  } else if (process.client) {
    // Use browser language as fallback
    globalState.languagePreference = getBrowserLanguage();
  }
  
  // Trigger custom event for the terms widget
  const event = new CustomEvent('open-terms-widget', {
    detail: { 
      expandPolicy: true
      // No need to pass language - widget will use globalState.languagePreference
    }
  });
  document.dispatchEvent(event);
};

const showPrivacyPolicy = (language) => {
  // Update global language preference if provided
  if (language) {
    globalState.languagePreference = language;
  } else if (process.client) {
    // Use browser language as fallback
    globalState.languagePreference = getBrowserLanguage();
  }
  
  // Trigger custom event for the privacy statement widget
  const event = new CustomEvent('open-privacy-widget', {
    detail: { 
      expandPolicy: true
      // No need to pass language - widget will use globalState.languagePreference
    }
  });
  document.dispatchEvent(event);
};

const showCookiePolicy = (language) => {
  // Update global language preference if provided
  if (language) {
    globalState.languagePreference = language;
  } else if (process.client) {
    // Use browser language as fallback
    globalState.languagePreference = getBrowserLanguage();
  }
  
  // Trigger custom event for the cookie policy widget
  const event = new CustomEvent('open-cookie-widget', {
    detail: { 
      expandPolicy: true
      // No need to pass language - widget will use globalState.languagePreference
    }
  });
  document.dispatchEvent(event);
};

const showKeyboardShortcuts = () => {
  // Do NOT update the language preference - keep the existing one
  // This ensures consistency with other widgets
  
  // Trigger custom event for the keyboard shortcuts widget
  const event = new CustomEvent('open-keyboard-shortcuts', {
    detail: {} // No need to pass language - widget will use globalState.languagePreference
  });
  document.dispatchEvent(event);
};

const openAccessibilityPolicyWidget = (language) => {
  // Only update language if explicitly provided
  if (language) {
    globalState.languagePreference = language;
  }
  // Otherwise keep existing preference from globalState
  
  // Trigger custom event for the accessibility policy widget
  const event = new CustomEvent('open-accessibility-policy', {
    detail: { 
      expandPolicy: false
      // No need to pass language - widget will use globalState.languagePreference
    }
  });
  document.dispatchEvent(event);
};
</script>