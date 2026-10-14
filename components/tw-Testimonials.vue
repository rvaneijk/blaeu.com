<!--
 * @author Blaeu Privacy Response Team
 * @copyright Copyright © 2019 - 2026 Team Blaeu. Content is licensed under CC BY 4.0 unless otherwise noted. All Rights Reserved.
 * @license CC BY 4.0
-->
// tw-Testimonials.vue
<template>
  <section class="pb-8 bg-white dark:bg-gray-900 font-amblelight">
    <div class="container mx-auto px-4 border-t border-gray-200 dark:border-gray-700 pt-6">
      <div class="max-w-4xl mx-auto">
        <h2
          class="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100 leading-tight tracking-tight"
        >
          Endorsements
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Testimonial 1 -->
          <div class="border-l-4 border-brand-gold pl-5">
            <p class="italic mb-4 text-gray-700 dark:text-gray-300">
              "As head of Private Sector Oversight at the Dutch Data Protection Authority
              (Autoriteit Persoonsgegevens), I enjoyed working with Rob for many years. He is
              analytically strong, thoughtful and very diplomatic. He has great knowledge at the
              intersection of privacy and technology and knows how to connect and relate these
              worlds like no other. His dissertation on Real Time Bidding is the exemplary example
              of this. Finally, but also very important, Rob is just an incredibly nice and pleasant
              colleague that I wish everyone on his team."
            </p>

            <!-- Original Dutch toggle button -->
            <button
              class="mb-4 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              :aria-expanded="showTranslation1"
              :aria-label="showTranslation1 ? 'Hide Dutch original' : 'Show Dutch original'"
              @click="showTranslation1 = !showTranslation1"
            >
              {{ showTranslation1 ? 'Hide Original' : 'Original (in Dutch)' }}
              <i
                :class="showTranslation1 ? 'fas fa-chevron-up' : 'fas fa-chevron-down'"
                class="ml-1 fa-xs"
              ></i>
            </button>

            <!-- Dutch original dropdown -->
            <div
              v-if="showTranslation1"
              class="italic text-gray-700 dark:text-gray-300 text-sm mb-4 transition-all duration-300"
            >
              <em>[Dutch Original]</em>
              <br />
              "Als hoofd Toezicht Private sector bij de AP heb ik vele jaren met veel plezier met
              Rob samengewerkt. Hij is analytisch sterk, bedachtzaam en zeer diplomatiek. Hij
              beschikt over een grote kennis op het snijvlak van privacy en technologie en weet deze
              werelden als geen ander met elkaar te verbinden en erover te vertellen. Zijn
              proefschrift naar Real Time Bidding is daar het exemplarische voorbeeld van. Tot slot,
              maar ook zeer belangrijk, Rob is gewoon een ontzettende aardige en plezierige collega
              die ik iedereen in zijn team wens."
            </div>
            <div>
              <p class="font-semibold text-gray-900 dark:text-gray-100">Udo Oelen</p>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                Former Head of Private Sector Oversight, Dutch Data Protection Authority (Autoriteit
                Persoonsgegevens); Secretary of the Board, TNO
              </p>
            </div>
          </div>

          <!-- Testimonial 2 -->
          <div class="border-l-4 border-brand-gold pl-5">
            <p class="italic mb-4 text-gray-700 dark:text-gray-300">
              "I had the chance to work with Rob while I was at CNIL and we collaborated on several
              projects related to online tracking. Rob has a comprehensive view of the complex
              ecosystem that is the online advertising industry and also manages to know all the
              technical and legal details. Rob identifies the key challenges and successfully
              explains this highly complex topic to non-experts by providing useful examples. He can
              also design tools and write concise code to implement them."
            </p>
            <div>
              <p class="font-semibold text-gray-900 dark:text-gray-100">Vincent Toubiana</p>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                Head of LINC (Digital Innovation Lab), CNIL — Commission Nationale de l'Informatique
                et des Libertés
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  // Reactive state for translation toggles
  const showTranslation1 = ref(false)
</script>

<style scoped>
  /* Transition for smooth dropdown animation */
  .transition-all {
    transition: all 0.3s ease;
  }
</style>
