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
                <NuxtLink to="/#expertise" class="breadcrumb-link transition-colors !px-0 !min-w-0">
                  Services
                </NuxtLink>
              </li>
              <li aria-hidden="true" class="text-gray-400">/</li>
              <li>
                <span class="text-gray-700 dark:text-gray-300" aria-current="page">
                  {{ service.title }}
                </span>
              </li>
            </ol>
          </nav>

          <h1
            class="section-accent-left text-[2rem] font-semibold text-gray-900 dark:text-gray-100 mb-4 leading-tight"
          >
            {{ service.title }}
          </h1>
          <p class="text-xl text-gray-800 dark:text-gray-300">{{ service.promise }}</p>
        </header>

        <p class="text-lg text-gray-800 dark:text-gray-300 mb-6 leading-relaxed">
          {{ service.intro }}
        </p>

        <div class="flex flex-wrap items-center gap-x-4 gap-y-2 mb-12">
          <a
            :href="`mailto:team@blaeu.com?subject=${encodeURIComponent(`Scoping call: ${service.title}`)}`"
            aria-label="Book a scoping call by email (team@blaeu.com)"
            class="no-hover inline-flex items-center px-5 py-2.5 bg-brand-gold text-black font-semibold rounded hover:bg-gray-900 hover:text-white transition-colors duration-200"
          >
            <i class="fa-solid fa-envelope mr-2" aria-hidden="true"></i>
            Book a scoping call
          </a>
          <span class="text-sm text-gray-600 dark:text-gray-400">
            Opens your email app: team@blaeu.com
          </span>
        </div>

        <section aria-labelledby="experience-heading" class="mb-10">
          <h2
            id="experience-heading"
            class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3 leading-tight"
          >
            Relevant experience
          </h2>
          <ul class="list-disc pl-6 space-y-2 text-lg text-gray-800 dark:text-gray-300">
            <li v-for="item in service.experience" :key="item.text">
              <a
                v-if="item.url"
                :href="item.url"
                target="_blank"
                rel="noopener"
                class="!p-0 text-gray-900 dark:text-gray-100 underline underline-offset-2"
              >
                {{ item.text }}
              </a>
              <template v-else>{{ item.text }}</template>
            </li>
          </ul>
          <NuxtLink
            to="/portfolio/"
            class="inline-block !p-0 text-gray-900 dark:text-gray-100 underline underline-offset-2 mt-4"
          >
            Full track record
            <span aria-hidden="true">&rarr;</span>
          </NuxtLink>
        </section>

        <nav
          aria-labelledby="other-services-heading"
          class="mt-12 pt-6 border-t border-gray-200 dark:border-gray-700"
        >
          <h2
            id="other-services-heading"
            class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3 leading-tight"
          >
            Other services
          </h2>
          <ul class="space-y-1">
            <li v-for="other in otherServices" :key="other.slug">
              <NuxtLink
                :to="`/services/${other.slug}/`"
                class="inline-flex items-center !min-h-6 !min-w-0 !px-0 !py-0.5 text-gray-900 dark:text-gray-100 underline underline-offset-2 text-lg"
              >
                {{ other.title }}
              </NuxtLink>
            </li>
          </ul>
        </nav>
      </article>
    </main>

    <tw-Footer />
  </div>
</template>

<script setup lang="ts">
  import { createError } from '#app'
  import { services } from '~/data/services'

  defineOptions({ name: 'ServicePage' })

  const route = useRoute()
  const found = services.find(s => s.slug === route.params.slug)
  if (!found) {
    throw createError({ statusCode: 404, statusMessage: 'Service not found', fatal: true })
  }
  const service = found
  const otherServices = services.filter(s => s.slug !== service.slug)

  const pageUrl = `https://blaeu.com/services/${service.slug}/`
  const ogTitle = `${service.title} | Blaeu`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.description,
    url: pageUrl,
    serviceType: service.title,
    areaServed: { '@type': 'Place', name: 'European Union' },
    provider: { '@id': 'https://blaeu.com/#organization' },
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://blaeu.com' },
      { '@type': 'ListItem', position: 2, name: service.title, item: pageUrl },
    ],
  }

  useHead({
    htmlAttrs: { lang: 'en' },
    title: ogTitle,
    meta: [
      { name: 'description', content: service.description },
      { name: 'robots', content: 'index, follow' },
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: ogTitle },
      { property: 'og:description', content: service.description },
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
      { name: 'twitter:description', content: service.description },
      { name: 'twitter:image', content: 'https://blaeu.com/assets/img/twitter-card.webp' },
      { name: 'twitter:image:alt', content: 'Blaeu logo' },
    ],
    link: [{ rel: 'canonical', href: pageUrl }],
    script: [
      { type: 'application/ld+json', innerHTML: JSON.stringify(jsonLd) },
      { type: 'application/ld+json', innerHTML: JSON.stringify(breadcrumbLd) },
    ],
  })
</script>
