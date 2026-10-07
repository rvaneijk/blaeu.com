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
                <span class="text-gray-700 dark:text-gray-300" aria-current="page">Research</span>
              </li>
            </ol>
          </nav>

          <h1
            class="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-3 leading-tight tracking-tight"
          >
            Research
          </h1>
        </header>

        <div class="space-y-10">
          <section aria-labelledby="profile-heading">
            <h2
              id="profile-heading"
              class="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 leading-tight tracking-tight"
            >
              Technical profile
            </h2>
            <p class="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              My academic background includes computer science (Leiden Institute of Advanced
              Computer Science). My research is web privacy measurement: crawling websites,
              recording which third parties receive data, and classifying the tracking and real-time
              bidding systems behind them. The material below is the technical work that sits behind
              my casework, expert reports and press quotes.
            </p>
          </section>

          <hr class="border-gray-200 dark:border-gray-700" />

          <section aria-labelledby="thesis-heading">
            <h2
              id="thesis-heading"
              class="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 leading-tight tracking-tight"
            >
              Thesis
            </h2>
            <p class="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              <em>
                Web Privacy Measurement in Real-Time Bidding Systems. A Graph-Based Approach to RTB
                System Classification.
              </em>
              Doctoral thesis, Leiden University, 2019.
            </p>
            <p class="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              <a
                href="https://scholarlypublications.universiteitleiden.nl/handle/1887/68261"
                target="_blank"
                rel="noopener"
                class="no-external-icon text-gray-900 dark:text-gray-100 underline underline-offset-2 transition-colors duration-200 !p-0"
              >
                Thesis in the Leiden repository
                <i class="fa-solid fa-external-link fa-xs" aria-hidden="true"></i>
              </a>
            </p>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Earlier work:
              <em>Web Tracking Detection System</em>
              , Master's thesis, Leiden Institute of Advanced Computer Science, 2011.
            </p>
          </section>

          <hr class="border-gray-200 dark:border-gray-700" />

          <section aria-labelledby="tools-heading">
            <h2
              id="tools-heading"
              class="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 leading-tight tracking-tight"
            >
              Tools and data
            </h2>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Small, single-purpose public repositories. They are provided as published, most
              without a formal licence or recent maintenance.
            </p>
            <ul class="list-none p-0">
              <li class="mb-5">
                <p class="text-gray-900 dark:text-gray-100 font-semibold">
                  <a
                    href="https://github.com/rvaneijk/openWPM-to-Neo4j"
                    target="_blank"
                    rel="noopener"
                    class="no-external-icon text-gray-900 dark:text-gray-100 underline underline-offset-2 transition-colors duration-200 !p-0"
                  >
                    openWPM-to-Neo4j
                    <i class="fa-solid fa-external-link fa-xs" aria-hidden="true"></i>
                  </a>
                </p>
                <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Python script that loads an OpenWPM crawl database (SQLite) into a Neo4j graph for
                  analysis. Written in 2017 during my doctoral research.
                </p>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  Python · no licence specified · published January 2017
                </p>
              </li>
              <li class="mb-5">
                <p class="text-gray-900 dark:text-gray-100 font-semibold">
                  <a
                    href="https://github.com/rvaneijk/231106-crawl"
                    target="_blank"
                    rel="noopener"
                    class="no-external-icon text-gray-900 dark:text-gray-100 underline underline-offset-2 transition-colors duration-200 !p-0"
                  >
                    231106-crawl
                    <i class="fa-solid fa-external-link fa-xs" aria-hidden="true"></i>
                  </a>
                </p>
                <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Crawl data of Dutch political party websites collected in November 2023, used for
                  the tracking-cookie findings reported by NOS. The repository has no README.
                </p>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  Data (HTML, zip archives) · no licence specified · last updated November 2023
                </p>
              </li>
              <li class="mb-5">
                <p class="text-gray-900 dark:text-gray-100 font-semibold">
                  <a
                    href="https://github.com/rvaneijk/list-tokens"
                    target="_blank"
                    rel="noopener"
                    class="no-external-icon text-gray-900 dark:text-gray-100 underline underline-offset-2 transition-colors duration-200 !p-0"
                  >
                    list-tokens (GGUF Token Lister)
                    <i class="fa-solid fa-external-link fa-xs" aria-hidden="true"></i>
                  </a>
                </p>
                <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Python script that lists tokens from the vocabulary section of a GGUF model file.
                  Used for the Future of Privacy Forum report
                  <em>Technologist Roundtable: Key Issues in AI and Data Protection</em>
                  (2024).
                </p>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  Python · permissive licence notice in the README · last updated November 2024
                </p>
              </li>
            </ul>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
              More at
              <a
                href="https://github.com/rvaneijk"
                target="_blank"
                rel="noopener"
                class="no-external-icon text-gray-900 dark:text-gray-100 underline underline-offset-2 transition-colors duration-200 !p-0"
              >
                github.com/rvaneijk
                <i class="fa-solid fa-external-link fa-xs" aria-hidden="true"></i>
              </a>
              .
            </p>
          </section>

          <hr class="border-gray-200 dark:border-gray-700" />

          <section aria-labelledby="publications-heading">
            <h2
              id="publications-heading"
              class="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 leading-tight tracking-tight"
            >
              Publications
            </h2>
            <p class="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              Scholarly works, including the crawl datasets deposited with DANS, are listed in the
              <NuxtLink
                to="/portfolio"
                class="text-gray-900 dark:text-gray-100 underline underline-offset-2 transition-colors duration-200 !p-0"
              >
                portfolio
              </NuxtLink>
              . Author profiles:
              <a
                href="https://orcid.org/0000-0002-2203-6819"
                target="_blank"
                rel="noopener"
                class="no-external-icon text-gray-900 dark:text-gray-100 underline underline-offset-2 transition-colors duration-200 !p-0"
              >
                ORCID
                <i class="fa-solid fa-external-link fa-xs" aria-hidden="true"></i>
              </a>
              <span class="mx-2 text-gray-300 dark:text-gray-600">|</span>
              <a
                href="https://scholar.google.nl/citations?user=p4VBH-4AAAAJ"
                target="_blank"
                rel="noopener"
                class="no-external-icon text-gray-900 dark:text-gray-100 underline underline-offset-2 transition-colors duration-200 !p-0"
              >
                Google Scholar
                <i class="fa-solid fa-external-link fa-xs" aria-hidden="true"></i>
              </a>
            </p>
          </section>
        </div>
      </article>
    </main>

    <tw-FooterMinimal />
  </div>
</template>

<script setup lang="ts">
  defineOptions({ name: 'ResearchPage' })

  const title = 'Research'
  const ogTitle = 'Research | Web Privacy Measurement | Team Blaeu'
  const description =
    'Web privacy measurement and tracking detection: doctoral thesis, public tools and crawl data by Rob van Eijk.'
  const pageUrl = 'https://blaeu.com/research/'

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
