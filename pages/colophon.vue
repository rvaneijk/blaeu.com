<!--
 * @author Blaeu Privacy Response Team
 * @copyright Copyright © 2019 - 2026 Team Blaeu. Content is licensed under CC BY 4.0 unless otherwise noted. All Rights Reserved.
 * @license CC BY 4.0
-->
<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 flex flex-col">
    <main id="main-content" class="pt-12 flex-1">
      <article class="max-w-2xl mx-auto px-4 py-8">
        <header class="mb-8">
          <nav aria-label="Breadcrumb" class="mb-4 text-sm text-gray-400 dark:text-gray-500">
            <ol class="flex items-center gap-1.5">
              <li>
                <NuxtLink to="/" class="breadcrumb-link transition-colors !px-0 !min-w-0">
                  Home
                </NuxtLink>
              </li>
              <li aria-hidden="true" class="text-gray-400">/</li>
              <li>
                <span class="text-gray-700 dark:text-gray-300" aria-current="page">
                  {{ lang === 'en' ? 'Colophon' : 'Colofon' }}
                </span>
              </li>
            </ol>
          </nav>

          <h1
            class="section-accent-left text-[2rem] font-semibold text-gray-900 dark:text-gray-100 mb-4 leading-tight"
          >
            {{ lang === 'en' ? 'Colophon' : 'Colofon' }}
          </h1>
          <p class="text-lg text-gray-600 dark:text-gray-400 mb-4">
            {{
              lang === 'en'
                ? 'How this website is made, and with what.'
                : 'Hoe we deze website maken en waarmee.'
            }}
          </p>
          <PolicyLanguageToggle v-model="lang" class="text-sm text-gray-600 dark:text-gray-400" />
        </header>

        <div
          v-if="lang === 'en'"
          lang="en"
          class="prose prose-lg dark:prose-invert prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-3 prose-li:my-1 marker:text-gray-600 dark:marker:text-gray-400"
        >
          <h2>Source code</h2>
          <!-- prettier-ignore -->
          <p>
            The site is a static Nuxt build, hosted in the EU by <a href="https://www.statichost.eu" target="_blank">statichost.eu</a>.
            The source and the deployment pipeline are public:
            <a href="https://github.com/rvaneijk/blaeu.com" target="_blank">github.com/rvaneijk/blaeu.com</a>
          </p>
          <!-- prettier-ignore -->
          <p>
            How we use AI for writing, research, and this website: see our <NuxtLink to="/ai/">AI statement</NuxtLink>.
          </p>

          <h2>Style guide</h2>
          <!-- prettier-ignore -->
          <p>
            For Dutch texts we follow the <a href="https://www.spaink.net/2026/03/28/ftm-stijlgids/" target="_blank"><em>FTM-stijlgids</em></a> by Karin Spaink.
          </p>

          <h2>Photography</h2>
          <p>
            Homepage photo: Rob van Eijk moderating at Data Protection Day 2026, Brussels. Photo:
            @EDPS Hadrien Duré. Used with permission of the European Data Protection Supervisor.
          </p>
          <p>
            About page photo: Rob van Eijk speaking at Leiden University. Photo: @Leiden University.
          </p>

          <h2>Fonts</h2>
          <ul>
            <li>Source Sans 3 (SIL OFL 1.1)</li>
            <li>OpenDyslexic (SIL OFL 1.1)</li>
            <li>
              Font Awesome Free icons (CC BY 4.0), delivered as a webfont (SIL OFL 1.1) with its
              stylesheet (MIT)
            </li>
          </ul>

          <h2>Frameworks and libraries</h2>
          <ul>
            <li>Nuxt (MIT)</li>
            <li>Nuxt Image (MIT)</li>
            <li>Tailwind CSS (MIT)</li>
            <li>Vue.js (MIT)</li>
            <li>Vue Router (MIT)</li>
          </ul>
          <!-- prettier-ignore -->
          <p>
            Third-party components keep their own licences. The full texts are in the <a href="https://github.com/rvaneijk/blaeu.com" target="_blank">source repository</a> (the LICENSE files).
          </p>
        </div>
        <div
          v-else
          lang="nl"
          class="prose prose-lg dark:prose-invert prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-3 prose-li:my-1 marker:text-gray-600 dark:marker:text-gray-400"
        >
          <h2>Broncode</h2>
          <!-- prettier-ignore -->
          <p>
            De website is een statische site, gebouwd met Nuxt. Hij draait in de EU, bij <a href="https://www.statichost.eu" target="_blank">statichost.eu</a>.
            De broncode en de scripts waarmee we de website publiceren, zijn openbaar:
            <a href="https://github.com/rvaneijk/blaeu.com" target="_blank">github.com/rvaneijk/blaeu.com</a>.
          </p>
          <!-- prettier-ignore -->
          <p>
            Hoe we AI gebruiken bij schrijven, onderzoek en deze website, staat in onze <NuxtLink to="/ai/">AI-verklaring</NuxtLink>.
          </p>

          <h2>Stijlgids</h2>
          <!-- prettier-ignore -->
          <p>
            Voor Nederlandse teksten volgen we de <a href="https://www.spaink.net/2026/03/28/ftm-stijlgids/" target="_blank"><em>FTM-stijlgids</em></a> van Karin Spaink.
          </p>

          <h2>Fotografie</h2>
          <p>
            Foto op de homepage: Rob van Eijk als moderator op Data Protection Day 2026 in Brussel.
            Foto: @EDPS Hadrien Duré. We gebruiken de foto met toestemming van de Europese
            Toezichthouder voor gegevensbescherming (EDPS).
          </p>
          <p>
            Foto op de pagina ‘About’: Rob van Eijk tijdens een lezing aan de Universiteit Leiden.
            Foto: @Leiden University.
          </p>

          <h2>Lettertypen</h2>
          <ul>
            <li>Source Sans 3 (SIL OFL 1.1)</li>
            <li>OpenDyslexic (SIL OFL 1.1)</li>
            <li>
              Font Awesome Free-iconen (CC BY 4.0), geleverd als webfont (SIL OFL 1.1) met de
              bijbehorende stylesheet (MIT)
            </li>
          </ul>

          <h2>Frameworks en bibliotheken</h2>
          <ul>
            <li>Nuxt (MIT)</li>
            <li>Nuxt Image (MIT)</li>
            <li>Tailwind CSS (MIT)</li>
            <li>Vue.js (MIT)</li>
            <li>Vue Router (MIT)</li>
          </ul>
          <!-- prettier-ignore -->
          <p>
            Componenten van derden houden hun eigen licentie. De volledige teksten staan in de <a href="https://github.com/rvaneijk/blaeu.com" target="_blank">broncode</a> (de LICENSE-bestanden).
          </p>
        </div>
      </article>
    </main>

    <tw-Footer />
  </div>
</template>

<script setup lang="ts">
  import type { PolicyLang } from '~/data/policies/types'

  defineOptions({ name: 'ColophonPage' })

  const lang = ref<PolicyLang>('en')

  const description =
    'How blaeu.com is built and hosted in the EU, with the public source code, photo credits, fonts, and frameworks.'
  const pageUrl = 'https://blaeu.com/colophon/'

  useHead({
    htmlAttrs: { lang: 'en' },
    title: 'Colophon | Blaeu',
    meta: [
      { name: 'description', content: description },
      { name: 'robots', content: 'index, follow' },
      { property: 'og:title', content: 'Colophon | Blaeu' },
      { property: 'og:description', content: description },
      { property: 'og:url', content: pageUrl },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'Blaeu' },
      { property: 'og:image', content: 'https://blaeu.com/assets/img/og-image.webp' },
      { property: 'og:image:alt', content: 'Blaeu logo' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:image', content: 'https://blaeu.com/assets/img/twitter-card.webp' },
    ],
    link: [{ rel: 'canonical', href: pageUrl }],
  })
</script>
