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
                <NuxtLink to="/" class="breadcrumb-link transition-colors" aria-label="Home">
                  <i class="fas fa-house fa-sm text-brand-gold" aria-hidden="true"></i>
                </NuxtLink>
              </li>
              <li aria-hidden="true" class="text-gray-400">/</li>
              <li>
                <span class="text-gray-700 dark:text-gray-300" aria-current="page">
                  Privacy Statement
                </span>
              </li>
            </ol>
          </nav>

          <h1
            class="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4 leading-tight tracking-tight"
          >
            {{ lang === 'en' ? 'Privacy Statement' : 'Privacyverklaring' }}
          </h1>

          <div
            class="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4"
          >
            <div class="flex items-center gap-2">
              <i class="fas fa-calendar fa-sm text-brand-gold" aria-hidden="true"></i>
              <span>
                {{ lang === 'en' ? 'Last updated' : 'Laatst bijgewerkt' }}:
                {{ privacyPolicy[lang].updated }}
              </span>
            </div>
            <div class="flex items-center gap-2">
              <i class="fas fa-building fa-sm text-brand-gold" aria-hidden="true"></i>
              <span>Blaeu Privacy Response Team B.V.</span>
            </div>
            <div class="flex items-center gap-2" role="group" aria-label="Language selection">
              <i class="fas fa-language fa-sm text-brand-gold" aria-hidden="true"></i>
              <button
                :class="
                  lang === 'en'
                    ? 'font-semibold text-gray-900 dark:text-gray-100 underline decoration-2 underline-offset-2'
                    : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                "
                :aria-pressed="lang === 'en'"
                aria-label="English"
                class="transition-colors"
                @click="lang = 'en'"
              >
                EN
              </button>
              <span class="text-brand-gold">/</span>
              <button
                :class="
                  lang === 'nl'
                    ? 'font-semibold text-gray-900 dark:text-gray-100 underline decoration-2 underline-offset-2'
                    : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                "
                :aria-pressed="lang === 'nl'"
                aria-label="NL - Nederlands"
                class="transition-colors"
                @click="lang = 'nl'"
              >
                NL
              </button>
            </div>
          </div>
        </header>

        <!-- English content -->
        <div class="prose prose-lg dark:prose-invert">
          <PolicyContent :policy="privacyPolicy[lang]" :heading-level="2" />
        </div>
      </article>
    </main>

    <tw-FooterMinimal />
  </div>
</template>

<script setup lang="ts">
  import { privacyPolicy } from '~/data/policies/privacy'

  defineOptions({ name: 'PrivacyPage' })

  const lang = ref<'en' | 'nl'>('en')

  const title = 'Privacy Statement'
  const description =
    'Privacy statement for Team Blaeu (Blaeu Privacy Response Team B.V.) explaining how personal data is collected, used, and protected in accordance with GDPR.'
  const pageUrl = 'https://blaeu.com/privacy/'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description: description,
    url: pageUrl,
    dateModified: '2025-03-31',
    inLanguage: ['en', 'nl'],
    about: {
      '@type': 'Organization',
      '@id': 'https://blaeu.com/#organization',
      name: 'Team Blaeu',
      url: 'https://blaeu.com',
    },
    publisher: {
      '@type': 'Organization',
      '@id': 'https://blaeu.com/#organization',
      name: 'Team Blaeu',
      url: 'https://blaeu.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://blaeu.com/assets/img/logo.png',
      },
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://blaeu.com' },
        { '@type': 'ListItem', position: 2, name: 'Privacy Statement', item: pageUrl },
      ],
    },
  }

  useHead({
    htmlAttrs: { lang: 'en' },
    title: `${title} | Team Blaeu`,
    meta: [
      { name: 'description', content: description },
      { name: 'robots', content: 'index, follow' },
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:url', content: pageUrl },
      { property: 'og:site_name', content: 'Team Blaeu' },
      { property: 'og:image:alt', content: 'Team Blaeu logo and branding' },
      { property: 'og:image', content: 'https://blaeu.com/assets/img/og-image.webp' },
      { property: 'og:image:type', content: 'image/webp' },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:image', content: 'https://blaeu.com/assets/img/og-image.jpg' },
      { property: 'og:image:type', content: 'image/jpeg' },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:locale', content: 'en_US' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: 'https://blaeu.com/assets/img/twitter-card.webp' },
      { name: 'twitter:image:alt', content: 'Team Blaeu logo and branding' },
    ],
    link: [{ rel: 'canonical', href: pageUrl }],
    script: [{ type: 'application/ld+json', innerHTML: JSON.stringify(jsonLd) }],
  })
</script>
