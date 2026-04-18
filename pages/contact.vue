<!--
 * @author Blaeu Privacy Response Team
 * @copyright Copyright © 2019 - 2026 Team Blaeu. Content is licensed under CC BY 4.0 unless otherwise noted. All Rights Reserved.
 * @license CC BY 4.0
-->
<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 flex flex-col">
    <tw-NavbarMinimal />

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
                <span class="text-gray-700 dark:text-gray-300" aria-current="page">Contact</span>
              </li>
            </ol>
          </nav>

          <h1
            class="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-3 leading-tight tracking-tight"
          >
            Contact
          </h1>

          <p class="text-sm text-gray-500 dark:text-gray-400">
            Blaeu Privacy Response Team B.V. — Rotterdam, The Netherlands
          </p>
        </header>

        <div class="space-y-10">
          <!-- Work with us -->
          <section aria-labelledby="work-heading">
            <h2
              id="work-heading"
              class="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 leading-tight tracking-tight"
            >
              Work with us
            </h2>
            <p class="text-sm text-gray-600 dark:text-gray-400 font-medium mb-3">
              Typically responds within one working day.
            </p>
            <p class="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              Expert consulting on EU regulatory affairs, AI Act compliance, AI governance, and data
              protection strategy for organisations operating in the EU. We work with Fortune 500
              companies, industry associations, and regulatory bodies.
            </p>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Engagements typically start with a scoping call. Most matters are billed on a
              fixed-fee or retainer basis.
            </p>
            <p class="text-gray-700 dark:text-gray-300">
              <a
                href="mailto:team@blaeu.com"
                class="text-gray-900 dark:text-gray-100 underline underline-offset-2 transition-colors duration-200 !p-0"
              >
                team@blaeu.com
              </a>
              <span class="mx-2 text-gray-300 dark:text-gray-600">|</span>
              <a
                href="https://www.linkedin.com/in/rvaneijk88"
                target="_blank"
                rel="noopener"
                class="no-external-icon text-gray-900 dark:text-gray-100 underline underline-offset-2 transition-colors duration-200 !p-0"
              >
                LinkedIn
                <i class="fa-solid fa-external-link fa-xs" aria-hidden="true"></i>
              </a>
            </p>
          </section>

          <hr class="border-gray-200 dark:border-gray-700" />

          <!-- Press & media -->
          <section aria-labelledby="press-heading">
            <h2
              id="press-heading"
              class="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 leading-tight tracking-tight"
            >
              Press &amp; media
            </h2>
            <p class="text-sm text-gray-600 dark:text-gray-400 font-medium mb-3">
              Typically responds within 24 hours.
            </p>
            <p class="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              Interview requests, expert quotes, and background briefings on EU regulatory affairs,
              AI regulation, and data protection. Rob van Eijk has been quoted in the New York
              Times, Bloomberg, and POLITICO.
            </p>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Available for comment on: EU AI Act enforcement, GDPR cross-border cases, adtech and
              real-time bidding, data protection authority investigations.
            </p>
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              <a
                href="mailto:team@blaeu.com"
                class="text-gray-900 dark:text-gray-100 underline underline-offset-2 transition-colors duration-200 !p-0"
              >
                team@blaeu.com
              </a>
              <span class="mx-2 text-gray-300 dark:text-gray-600">|</span>
              <a
                href="https://www.linkedin.com/in/rvaneijk88"
                target="_blank"
                rel="noopener"
                class="no-external-icon text-gray-900 dark:text-gray-100 underline underline-offset-2 transition-colors duration-200 !p-0"
              >
                LinkedIn
                <i class="fa-solid fa-external-link fa-xs" aria-hidden="true"></i>
              </a>
              <span class="mx-2 text-gray-300 dark:text-gray-600">|</span>
              <a
                href="/assets/pdf/media-kit.pdf"
                target="_blank"
                rel="noopener"
                class="no-external-icon text-gray-900 dark:text-gray-100 underline underline-offset-2 transition-colors duration-200 !p-0"
              >
                Media kit (PDF)
                <i class="fa-solid fa-external-link fa-xs" aria-hidden="true"></i>
              </a>
            </p>
          </section>

          <hr class="border-gray-200 dark:border-gray-700" />

          <!-- Registration -->
          <section aria-labelledby="registration-heading">
            <h2
              id="registration-heading"
              class="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 leading-tight tracking-tight"
            >
              Registration
            </h2>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Kamer van Koophandel (NL): 75599740
            </p>
          </section>
        </div>
      </article>
    </main>

    <tw-FooterMinimal />
  </div>
</template>

<script setup lang="ts">
  defineOptions({ name: 'ContactPage' })

  const title = 'Contact'
  const description =
    'Get in touch with Team Blaeu for expert consulting on EU regulatory affairs, AI Act compliance, and AI governance — or for press and media enquiries.'
  const pageUrl = 'https://blaeu.com/contact/'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description: description,
    url: pageUrl,
    about: {
      '@type': 'Organization',
      name: 'Team Blaeu',
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
        { '@type': 'ListItem', position: 2, name: 'Contact', item: pageUrl },
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
