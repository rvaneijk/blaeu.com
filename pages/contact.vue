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
                <NuxtLink to="/" class="breadcrumb-link transition-colors !px-0 !min-w-0">
                  Home
                </NuxtLink>
              </li>
              <li aria-hidden="true" class="text-gray-400 dark:text-gray-500">/</li>
              <li>
                <span class="text-gray-700 dark:text-gray-300" aria-current="page">Contact</span>
              </li>
            </ol>
          </nav>

          <h1
            class="section-accent-left text-[2rem] font-semibold text-gray-900 dark:text-gray-100 mb-3 leading-tight"
          >
            Contact
          </h1>
        </header>

        <div class="space-y-6">
          <!-- Work with me -->
          <section
            aria-labelledby="work-heading"
            class="rounded-lg bg-gray-50 dark:bg-gray-800 p-6"
          >
            <h2
              id="work-heading"
              class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3 leading-tight"
            >
              Work with me
            </h2>
            <p class="text-gray-800 dark:text-gray-300 mb-3 leading-relaxed">
              Expert evidence, privacy-enhancing technologies and anonymisation, and EU regulatory
              strategy for multinational companies, law firms, industry associations, and
              regulators.
            </p>
            <p class="text-gray-800 dark:text-gray-300 mb-3 leading-relaxed">
              I bill most matters at a fixed fee or on retainer. I work in English and Dutch.
            </p>
            <p class="text-gray-800 dark:text-gray-300 mb-5 leading-relaxed">
              Engagements start with a scoping call. Email me and I usually reply within one working
              day.
            </p>
            <a
              href="mailto:team@blaeu.com?subject=Scoping%20call"
              aria-label="Email team@blaeu.com to book a scoping call"
              class="no-hover inline-flex items-center px-5 py-2.5 bg-brand-gold text-black font-semibold rounded hover:bg-gray-900 hover:text-white transition-colors duration-200"
            >
              <i class="fa-solid fa-envelope mr-2" aria-hidden="true"></i>
              team@blaeu.com
            </a>
          </section>

          <!-- Press & media -->
          <section
            aria-labelledby="press-heading"
            class="rounded-lg bg-gray-50 dark:bg-gray-800 p-6"
          >
            <h2
              id="press-heading"
              class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3 leading-tight"
            >
              Press &amp; media
            </h2>
            <p class="text-gray-800 dark:text-gray-300 mb-3 leading-relaxed">
              Interview requests, expert quotes, and background briefings on EU AI Act enforcement,
              GDPR cross-border cases, adtech and real-time bidding, and data protection authority
              investigations. For press deadlines I usually reply within 24 hours.
            </p>
            <a
              href="mailto:rob@blaeu.com?subject=Press%20request"
              aria-label="Email rob@blaeu.com with a press request"
              class="no-hover inline-flex items-center px-5 py-2.5 border border-gray-900 dark:border-gray-100 text-gray-900 dark:text-gray-100 font-semibold rounded hover:bg-gray-900 hover:text-white dark:hover:bg-gray-100 dark:hover:text-gray-900 transition-colors duration-200"
            >
              <i class="fa-solid fa-envelope mr-2" aria-hidden="true"></i>
              rob@blaeu.com
            </a>
            <p class="mt-4">
              <a
                href="/assets/pdf/media-kit.pdf"
                download
                target="_blank"
                rel="noopener"
                class="inline-block !p-0 text-gray-900 dark:text-gray-100 underline underline-offset-2"
              >
                Media kit (PDF)
              </a>
              <span class="mx-2 text-gray-300 dark:text-gray-600" aria-hidden="true">|</span>
              <a
                href="https://www.linkedin.com/in/rvaneijk88"
                target="_blank"
                rel="noopener"
                class="inline-block !p-0 text-gray-900 dark:text-gray-100 underline underline-offset-2"
              >
                LinkedIn
              </a>
            </p>
          </section>

          <!-- Security reports -->
          <section
            aria-labelledby="security-heading"
            class="rounded-lg bg-gray-50 dark:bg-gray-800 p-6"
          >
            <h2
              id="security-heading"
              class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3 leading-tight"
            >
              Security reports
            </h2>
            <p class="text-gray-800 dark:text-gray-300 mb-4 leading-relaxed">
              To report a security issue, email me. Encrypt sensitive details with the PGP key.
            </p>
            <a
              href="mailto:rob@blaeu.com?subject=Security%20report"
              aria-label="Email rob@blaeu.com with a security report"
              class="no-hover inline-flex items-center px-5 py-2.5 border border-gray-900 dark:border-gray-100 text-gray-900 dark:text-gray-100 font-semibold rounded hover:bg-gray-900 hover:text-white dark:hover:bg-gray-100 dark:hover:text-gray-900 transition-colors duration-200"
            >
              <i class="fa-solid fa-envelope mr-2" aria-hidden="true"></i>
              rob@blaeu.com
            </a>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-4 mb-1">PGP fingerprint</p>
            <code
              class="block font-mono text-sm text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-900 px-3 py-2 mb-3"
            >
              6E9C 7952 DA11 3DB1 1F1A 9411 9B91 7133 4B4F 58DE
            </code>
            <p>
              <NuxtLink
                to="/security/"
                class="inline-block !p-0 text-gray-900 dark:text-gray-100 underline underline-offset-2"
              >
                Security policy
                <span aria-hidden="true">&rarr;</span>
              </NuxtLink>
            </p>
          </section>

          <!-- Visiting addresses -->
          <section
            id="offices"
            aria-labelledby="addresses-heading"
            class="rounded-lg bg-gray-50 dark:bg-gray-800 p-6"
          >
            <h2
              id="addresses-heading"
              class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3 leading-tight"
            >
              Visiting addresses (by appointment)
            </h2>
            <div class="grid gap-4 sm:grid-cols-2 text-gray-800 dark:text-gray-300">
              <address class="not-italic">
                <span class="block font-semibold text-gray-900 dark:text-gray-100">Brussels</span>
                p/a Tribes Brussels European Quarter
                <br />
                Avenue Marnix 13-17
                <br />
                1000 Brussels
              </address>
              <address class="not-italic">
                <span class="block font-semibold text-gray-900 dark:text-gray-100">Amsterdam</span>
                p/a Tribes Amsterdam Zuidas SOM
                <br />
                Claude Debussylaan 7
                <br />
                1082&nbsp;MC Amsterdam
              </address>
              <address class="not-italic">
                <span class="block font-semibold text-gray-900 dark:text-gray-100">The Hague</span>
                p/a Tribes The Hague Central Station
                <br />
                Kalvermarkt 53
                <br />
                2511&nbsp;CB The Hague
              </address>
              <address class="not-italic">
                <span class="block font-semibold text-gray-900 dark:text-gray-100">Rotterdam</span>
                p/a Element Offices
                <br />
                Wilhelminaplein 1-40
                <br />
                3072&nbsp;DE Rotterdam
              </address>
            </div>
          </section>
        </div>
      </article>
    </main>

    <tw-Footer />
  </div>
</template>

<script setup lang="ts">
  defineOptions({ name: 'ContactPage' })

  const title = 'Contact'
  const ogTitle = 'Contact | Blaeu'
  const description =
    'Contact Rob van Eijk about expert witness work, anonymisation, or EU regulatory strategy. Press and security contacts are on this page too.'
  const pageUrl = 'https://blaeu.com/contact/'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description: description,
    url: pageUrl,
    about: {
      '@type': 'Organization',
      '@id': 'https://blaeu.com/#organization',
      name: 'Blaeu',
      url: 'https://blaeu.com',
      email: 'team@blaeu.com',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Rotterdam',
        addressCountry: 'NL',
      },
    },
    publisher: {
      '@type': 'Organization',
      '@id': 'https://blaeu.com/#organization',
      name: 'Blaeu',
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
        { '@type': 'ListItem', position: 2, name: 'Contact', item: pageUrl },
      ],
    },
  }

  useHead({
    htmlAttrs: { lang: 'en' },
    title: `${title} | Blaeu`,
    meta: [
      { name: 'description', content: description },
      { name: 'robots', content: 'index, follow' },
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: ogTitle },
      { property: 'og:description', content: description },
      { property: 'og:url', content: pageUrl },
      { property: 'og:site_name', content: 'Blaeu' },
      { property: 'og:image:alt', content: 'Blaeu logo' },
      { property: 'og:image', content: 'https://blaeu.com/assets/img/og-image.webp' },
      { property: 'og:image:type', content: 'image/webp' },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:image', content: 'https://blaeu.com/assets/img/og-image.jpg' },
      { property: 'og:image:type', content: 'image/jpeg' },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:locale', content: 'en_GB' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: ogTitle },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: 'https://blaeu.com/assets/img/twitter-card.webp' },
      { name: 'twitter:image:alt', content: 'Blaeu logo' },
    ],
    link: [{ rel: 'canonical', href: pageUrl }],
    script: [{ type: 'application/ld+json', innerHTML: JSON.stringify(jsonLd) }],
  })
</script>
