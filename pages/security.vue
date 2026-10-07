<!--
 * @author Blaeu Privacy Response Team
 * @copyright Copyright © 2019 - 2026 Team Blaeu. Content is licensed under CC BY 4.0 unless otherwise noted. All Rights Reserved.
 * @license CC BY 4.0
-->
<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 flex flex-col">
    <main id="main-content" class="pt-12 flex-1">
      <article class="max-w-2xl mx-auto px-4 py-8 text-lg">
        <header class="mb-10">
          <nav aria-label="Breadcrumb" class="mb-4 text-sm text-gray-400 dark:text-gray-500">
            <ol class="flex items-center gap-1.5">
              <li>
                <NuxtLink to="/" class="breadcrumb-link transition-colors" aria-label="Home">
                  <i class="fas fa-house fa-sm text-brand-gold" aria-hidden="true"></i>
                </NuxtLink>
              </li>
              <li aria-hidden="true" class="text-gray-400 dark:text-gray-500">/</li>
              <li>
                <span class="text-gray-700 dark:text-gray-300" aria-current="page">Security</span>
              </li>
            </ol>
          </nav>

          <h1
            class="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-3 leading-tight tracking-tight"
          >
            Security
          </h1>
        </header>

        <div class="space-y-10">
          <section aria-labelledby="reporting-heading">
            <h2
              id="reporting-heading"
              class="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 leading-tight tracking-tight"
            >
              Reporting a vulnerability in this website
            </h2>
            <p class="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              If you find a security issue in blaeu.com, please email
              <a
                href="mailto:rob@blaeu.com"
                class="text-gray-900 dark:text-gray-100 underline underline-offset-2 transition-colors duration-200 !p-0"
              >
                rob@blaeu.com
              </a>
              . Encrypt with the PGP key below if the details are sensitive. Please do not access
              other people's data, degrade the service, or disclose the issue publicly before it is
              fixed. This is not a bug bounty programme and no rewards are offered.
            </p>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Security contact: Rob van Eijk, director, Blaeu Privacy Response Team B.V.
            </p>
          </section>

          <hr class="border-gray-200 dark:border-gray-700" />

          <section aria-labelledby="thirdparty-heading">
            <h2
              id="thirdparty-heading"
              class="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 leading-tight tracking-tight"
            >
              Vulnerabilities in third-party systems and code
            </h2>
            <p class="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              Our work includes analysing software, websites and data flows for research and for
              expert-witness work for clients. If that work reveals a vulnerability in someone
              else's system, we handle it as follows:
            </p>
            <ol
              class="list-decimal pl-5 mb-4 space-y-1 text-gray-700 dark:text-gray-300 leading-relaxed"
            >
              <li>Report it first to the vendor or the responsible CSIRT, privately.</li>
              <li>Allow a reasonable time to fix it, agreed case by case.</li>
              <li>Publish only after the fix.</li>
            </ol>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
              For client engagements this happens within the confidentiality terms of the engagement
              and applicable law.
            </p>
          </section>

          <hr class="border-gray-200 dark:border-gray-700" />

          <section aria-labelledby="pgp-heading">
            <h2
              id="pgp-heading"
              class="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 leading-tight tracking-tight"
            >
              PGP key and security.txt
            </h2>
            <p class="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              Fingerprint:
              <code class="text-sm break-all">
                6E9C 7952 DA11 3DB1 1F1A 9411 9B91 7133 4B4F 58DE
              </code>
            </p>
            <p class="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              <a
                href="https://pgp.surfnet.nl/pks/lookup?search=6e9c7952da113db11f1a94119b9171334b4f58de&fingerprint=on&op=index"
                target="_blank"
                rel="noopener"
                class="no-external-icon text-gray-900 dark:text-gray-100 underline underline-offset-2 transition-colors duration-200 !p-0"
              >
                Public key (SURFnet keyserver)
                <i class="fa-solid fa-external-link fa-xs" aria-hidden="true"></i>
              </a>
              <span class="mx-2 text-gray-300 dark:text-gray-600">|</span>
              <a
                href="/.well-known/security.txt"
                class="text-gray-900 dark:text-gray-100 underline underline-offset-2 transition-colors duration-200 !p-0"
              >
                security.txt
              </a>
            </p>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">Languages: English, Dutch.</p>
          </section>
        </div>
      </article>
    </main>

    <tw-FooterMinimal />
  </div>
</template>

<script setup lang="ts">
  defineOptions({ name: 'SecurityPage' })

  const title = 'Security'
  const ogTitle = 'Security and Coordinated Disclosure | Team Blaeu'
  const description =
    'How to report a security issue in blaeu.com, and how Team Blaeu handles vulnerabilities found in third-party systems.'
  const pageUrl = 'https://blaeu.com/security/'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description: description,
    url: pageUrl,
    author: { '@id': 'https://blaeu.com/team/rvaneijk/#person' },
    publisher: {
      '@type': 'Organization',
      '@id': 'https://blaeu.com/#organization',
      name: 'Team Blaeu',
      url: 'https://blaeu.com',
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://blaeu.com' },
        { '@type': 'ListItem', position: 2, name: title, item: pageUrl },
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
      { property: 'og:title', content: ogTitle },
      { property: 'og:description', content: description },
      { property: 'og:url', content: pageUrl },
      { property: 'og:site_name', content: 'Team Blaeu' },
      { property: 'og:image:alt', content: 'Team Blaeu logo and branding' },
      { property: 'og:image', content: 'https://blaeu.com/assets/img/og-image.webp' },
      { property: 'og:image:type', content: 'image/webp' },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:locale', content: 'en_US' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: ogTitle },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: 'https://blaeu.com/assets/img/twitter-card.webp' },
      { name: 'twitter:image:alt', content: 'Team Blaeu logo and branding' },
    ],
    link: [{ rel: 'canonical', href: pageUrl }],
    script: [{ type: 'application/ld+json', innerHTML: JSON.stringify(jsonLd) }],
  })
</script>
