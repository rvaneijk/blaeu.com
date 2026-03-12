<!--
 * @author Blaeu Privacy Response Team
 * @copyright Copyright © 2019 - 2026 Team Blaeu. Content is licensed under CC BY 4.0 unless otherwise noted. All Rights Reserved.
 * @license CC BY 4.0
-->
<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 flex flex-col">
    <tw-NavbarMinimal />

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
                {{
                  lang === 'en'
                    ? 'Last updated: March 31, 2025'
                    : 'Laatst bijgewerkt: 31 maart 2025'
                }}
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
        <div v-if="lang === 'en'" class="prose prose-lg dark:prose-invert">
          <p class="mb-4">
            This is the privacy statement of Team Blaeu. You can contact us at:
            <br />
            <br />
            Team Blaeu
            <br />
            p.a. Elements Offices
            <br />
            Wilhelminaplein 1-40, 3072 DE, Rotterdam, The Netherlands
            <br />
            <a
              href="mailto:team@blaeu.com"
              class="text-gray-900 dark:text-gray-100 underline underline-offset-2 hover:text-brand-gold transition-colors"
            >
              team@blaeu.com
            </a>
          </p>

          <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            We process the following personal data
          </h2>

          <div class="space-y-6 mb-6">
            <div>
              <p class="font-medium mb-2">Client contact and case information</p>
              <ul class="list-disc pl-6 space-y-2">
                <li>
                  To provide legal services, we collect clients' names, contact details, and
                  information relevant to their legal matters.
                </li>
                <li>
                  We do this to perform a contract (if the person is the client) or because we have
                  a legitimate interest in doing so (if the person represents the client).
                </li>
                <li>We retain this data for the duration of the matter plus 7 years.</li>
                <li>
                  We may share this data with courts and others, such as lawyers of the other party,
                  to perform our engagement with the client.
                </li>
              </ul>
            </div>

            <div>
              <p class="font-medium mb-2">Supplier information</p>
              <ul class="list-disc pl-6 space-y-2">
                <li>
                  To manage our business relationships, we collect company names, contact person
                  details, and financial information of suppliers and service providers.
                </li>
                <li>We do this to perform the contract with our suppliers.</li>
                <li>
                  We retain this data for the duration of the business relationship plus 7 years.
                </li>
              </ul>
            </div>

            <div>
              <p class="font-medium mb-2">Financial information</p>
              <ul class="list-disc pl-6 space-y-2">
                <li>
                  To process payments and comply with tax laws, we collect bank details and payment
                  information.
                </li>
                <li>
                  We do this to perform the contract with our client (sending invoices) and legal
                  obligation (preparing and submitting tax statements).
                </li>
                <li>We retain this data for 7 years after the year an invoice is sent.</li>
                <li>
                  We share some financial information with our tax consultant and with tax
                  authorities.
                </li>
              </ul>
            </div>
          </div>

          <p class="mb-4">We primarily collect data directly from you.</p>

          <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-16 mb-4">
            Your rights
          </h2>
          <p class="mb-4">
            Under the GDPR, you have the rights to access, rectify, erase (in certain
            circumstances), restrict processing of, and transfer your data, as well as to object to
            processing based on legitimate interests and withdraw consent (where applicable). Team
            Blaeu does not engage in solely automated decision-making or profiling. To exercise
            these rights, contact us using the details above. You can also lodge a complaint with
            the Dutch Data Protection Authority (Autoriteit Persoonsgegevens).
          </p>

          <p class="text-sm text-gray-500 dark:text-gray-400 mt-6 mb-4">
            If there is an inconsistency between the Dutch and English-language version of these
            regulations, the Dutch version takes precedence.
          </p>

          <p class="text-sm text-gray-500 dark:text-gray-400 mt-6">
            Questions about this privacy statement? Contact us at
            <a
              href="mailto:team@blaeu.com"
              class="text-gray-900 dark:text-gray-100 underline underline-offset-2 hover:text-brand-gold transition-colors"
            >
              team@blaeu.com
            </a>
            .
          </p>
        </div>

        <!-- Dutch content -->
        <div v-else class="prose prose-lg dark:prose-invert">
          <p class="mb-4">
            Dit is de privacyverklaring van Team Blaeu. U kunt contact met ons opnemen via:
            <br />
            <br />
            Team Blaeu
            <br />
            p.a. Elements Offices
            <br />
            Wilhelminaplein 1-40, 3072 DE, Rotterdam, Nederland
            <br />
            <a
              href="mailto:team@blaeu.com"
              class="text-gray-900 dark:text-gray-100 underline underline-offset-2 hover:text-brand-gold transition-colors"
            >
              team@blaeu.com
            </a>
          </p>

          <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Wij verwerken de volgende persoonsgegevens
          </h2>

          <div class="space-y-6 mb-6">
            <div>
              <p class="font-medium mb-2">Klantcontact- en dossiergegevens</p>
              <ul class="list-disc pl-6 space-y-2">
                <li>
                  Om juridische diensten te verlenen, verzamelen wij namen, contactgegevens en
                  informatie die relevant is voor de juridische kwesties van onze cliënten.
                </li>
                <li>
                  Wij doen dit om een overeenkomst uit te voeren (als de persoon de cliënt is) of
                  omdat wij een gerechtvaardigd belang hebben om dit te doen (als de persoon de
                  cliënt vertegenwoordigt).
                </li>
                <li>Wij bewaren deze gegevens gedurende de duur van de zaak plus 7 jaar.</li>
                <li>
                  Wij kunnen deze gegevens delen met rechtbanken en anderen, zoals advocaten van de
                  andere partij, om onze opdracht voor de cliënt uit te voeren.
                </li>
              </ul>
            </div>

            <div>
              <p class="font-medium mb-2">Leveranciersinformatie</p>
              <ul class="list-disc pl-6 space-y-2">
                <li>
                  Om onze zakelijke relaties te beheren, verzamelen wij bedrijfsnamen,
                  contactpersoongegevens en financiële informatie van leveranciers en
                  dienstverleners.
                </li>
                <li>Wij doen dit om de overeenkomst met onze leveranciers uit te voeren.</li>
                <li>
                  Wij bewaren deze gegevens gedurende de duur van de zakelijke relatie plus 7 jaar.
                </li>
              </ul>
            </div>

            <div>
              <p class="font-medium mb-2">Financiële informatie</p>
              <ul class="list-disc pl-6 space-y-2">
                <li>
                  Om betalingen te verwerken en te voldoen aan belastingwetgeving, verzamelen wij
                  bankgegevens en betalingsinformatie.
                </li>
                <li>
                  Wij doen dit om de overeenkomst met onze cliënt uit te voeren (facturen verzenden)
                  en aan wettelijke verplichtingen te voldoen (belastingaangiften voorbereiden en
                  indienen).
                </li>
                <li>
                  Wij bewaren deze gegevens gedurende 7 jaar na het jaar waarin een factuur is
                  verzonden.
                </li>
                <li>
                  Wij delen sommige financiële informatie met onze belastingadviseur en met de
                  belastingdienst.
                </li>
              </ul>
            </div>
          </div>

          <p class="mb-4">Wij verzamelen gegevens voornamelijk rechtstreeks bij u.</p>

          <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-16 mb-4">
            Uw rechten
          </h2>
          <p class="mb-4">
            Op grond van de AVG heeft u het recht op inzage, rectificatie, wissing (in bepaalde
            omstandigheden), beperking van de verwerking en overdraagbaarheid van uw gegevens,
            evenals het recht bezwaar te maken tegen verwerking op basis van gerechtvaardigde
            belangen en toestemming in te trekken (indien van toepassing). Team Blaeu doet niet aan
            volledig geautomatiseerde besluitvorming of profilering. Om deze rechten uit te oefenen,
            kunt u contact met ons opnemen via de bovenstaande gegevens. U kunt ook een klacht
            indienen bij de Autoriteit Persoonsgegevens.
          </p>

          <p class="text-sm text-gray-500 dark:text-gray-400 mt-6">
            Vragen over deze privacyverklaring? Neem contact met ons op via
            <a
              href="mailto:team@blaeu.com"
              class="text-gray-900 dark:text-gray-100 underline underline-offset-2 hover:text-brand-gold transition-colors"
            >
              team@blaeu.com
            </a>
            .
          </p>
        </div>
      </article>
    </main>

    <tw-FooterMinimal />
  </div>
</template>

<script setup lang="ts">
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
      name: 'Team Blaeu',
      url: 'https://blaeu.com',
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
