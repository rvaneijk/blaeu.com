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
                <span class="text-gray-700 dark:text-gray-300" aria-current="page">Research</span>
              </li>
            </ol>
          </nav>

          <h1
            class="section-accent-left text-[2rem] font-semibold text-gray-900 dark:text-gray-100 mb-3 leading-tight"
          >
            Research
          </h1>
        </header>

        <p class="text-xl text-gray-800 dark:text-gray-300 leading-relaxed mb-10">
          I trained in computer science at the Leiden Institute of Advanced Computer Science and
          earned my PhD at Leiden Law School. My research is web privacy measurement: crawling
          websites, recording which third parties receive data, and classifying the tracking and
          real-time bidding systems behind them. This is the technical work behind my casework,
          expert reports, and press quotes.
        </p>

        <div class="space-y-6">
          <section
            aria-labelledby="thesis-heading"
            class="rounded-lg bg-gray-50 dark:bg-gray-800 p-6"
          >
            <h2
              id="thesis-heading"
              class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3 leading-tight"
            >
              Theses
            </h2>
            <p class="text-gray-800 dark:text-gray-300 mb-2 leading-relaxed">
              Doctoral thesis, Faculty of Law, Leiden University, defended
              29&nbsp;January&nbsp;2019:
              <em>
                Web Privacy Measurement in Real-Time Bidding Systems: A Graph-Based Approach to RTB
                System Classification
              </em>
            </p>
            <p class="text-gray-800 dark:text-gray-300 mb-2 leading-relaxed">
              Researched at eLaw (Center for Law and Digital Technologies) and the Dual PhD Centre,
              alongside my work at the Dutch DPA.
            </p>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">
              SIKS Dissertation Series 2019-01. ISBN 978-94-028-1323-4. CC BY-NC-SA 4.0
            </p>
            <p class="mb-4">
              <a
                href="https://scholarlypublications.universiteitleiden.nl/handle/1887/68261"
                target="_blank"
                rel="noopener"
                class="inline-block !p-0 text-gray-900 dark:text-gray-100 underline underline-offset-2"
              >
                Thesis in the Leiden repository
              </a>
            </p>
            <p class="text-gray-800 dark:text-gray-300 leading-relaxed">
              Earlier: Master's thesis
              <em>Web Tracking Detection System</em>
              (Leiden Institute of Advanced Computer Science, 2011).
            </p>
          </section>

          <section aria-labelledby="tools-heading">
            <h2
              id="tools-heading"
              class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3 leading-tight"
            >
              Tools and data
            </h2>
            <p class="text-gray-800 dark:text-gray-300 mb-4 leading-relaxed">
              Single-purpose tools and datasets behind published findings.
            </p>
            <ul class="space-y-4">
              <li
                v-for="tool in tools"
                :key="tool.url"
                class="rounded-lg bg-gray-50 dark:bg-gray-800 p-6"
              >
                <p class="mb-2">
                  <a
                    :href="tool.url"
                    target="_blank"
                    rel="noopener"
                    class="text-lg font-bold text-gray-900 dark:text-gray-100 hover:underline underline-offset-2 !p-0"
                  >
                    {{ tool.name }}
                  </a>
                </p>
                <p class="text-gray-800 dark:text-gray-300 mb-3 leading-relaxed">
                  {{ tool.text }}
                  <em v-if="tool.cite">{{ tool.cite }}</em>
                  <template v-if="tool.cite">{{ ' (2024).' }}</template>
                </p>
                <ul class="flex flex-wrap gap-1.5" aria-label="Details">
                  <li
                    v-for="tag in tool.tags"
                    :key="tag"
                    class="px-2 py-0.5 text-xs rounded border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-300"
                  >
                    {{ tag }}
                  </li>
                </ul>
              </li>
            </ul>
            <p class="mt-4 text-gray-800 dark:text-gray-300">
              More on
              <a
                href="https://github.com/rvaneijk"
                target="_blank"
                rel="noopener"
                class="inline-block !p-0 text-gray-900 dark:text-gray-100 underline underline-offset-2"
              >
                github.com/rvaneijk
              </a>
            </p>
          </section>

          <section
            aria-labelledby="publications-heading"
            class="rounded-lg bg-gray-50 dark:bg-gray-800 p-6"
          >
            <h2
              id="publications-heading"
              class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3 leading-tight"
            >
              Publications
            </h2>
            <p class="text-gray-800 dark:text-gray-300 leading-relaxed">
              The
              <NuxtLink
                to="/portfolio/#scholarly"
                class="inline-block !p-0 text-gray-900 dark:text-gray-100 underline underline-offset-2"
              >
                portfolio
              </NuxtLink>
              lists all scholarly works, including the crawl datasets deposited with DANS. Author
              profiles:
              <a
                href="https://orcid.org/0000-0002-2203-6819"
                target="_blank"
                rel="noopener"
                class="inline-block !p-0 text-gray-900 dark:text-gray-100 underline underline-offset-2"
              >
                ORCID
              </a>
              <span class="mx-2 text-gray-300 dark:text-gray-600" aria-hidden="true">|</span>
              <a
                href="https://scholar.google.nl/citations?user=p4VBH-4AAAAJ"
                target="_blank"
                rel="noopener"
                class="inline-block !p-0 text-gray-900 dark:text-gray-100 underline underline-offset-2"
              >
                Google Scholar
              </a>
            </p>
          </section>
        </div>
      </article>
    </main>

    <tw-Footer />
  </div>
</template>

<script setup lang="ts">
  const tools = [
    {
      name: 'openWPM-to-Neo4j',
      url: 'https://github.com/rvaneijk/openWPM-to-Neo4j',
      text: 'Loads an OpenWPM crawl database (SQLite) into a Neo4j graph for analysis. Written during my doctoral research.',
      tags: ['Python', '2017'],
    },
    {
      name: '231106-crawl',
      url: 'https://github.com/rvaneijk/231106-crawl',
      text: 'Crawl data of Dutch political party websites, collected in November 2023 and used for the tracking-cookie findings reported by NOS.',
      tags: ['Crawl data (HTML)', '2023'],
    },
    {
      name: 'list-tokens (GGUF Token Lister)',
      url: 'https://github.com/rvaneijk/list-tokens',
      text: 'Lists the tokens in the vocabulary section of a GGUF model file. Used for the Future of Privacy Forum report',
      cite: 'Technologist Roundtable: Key Issues in AI and Data Protection',
      tags: ['Python', '2024'],
    },
  ]

  defineOptions({ name: 'ResearchPage' })

  const title = 'Research'
  const ogTitle = 'Research | Blaeu'
  const description =
    'Web privacy measurement and tracking detection: doctoral thesis, public tools, and crawl data by Rob van Eijk.'
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
      name: 'Blaeu',
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
