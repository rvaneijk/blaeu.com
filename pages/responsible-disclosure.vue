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
                  Responsible Disclosure Policy
                </span>
              </li>
            </ol>
          </nav>

          <h1
            class="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4 leading-tight tracking-tight"
          >
            {{ lang === 'en' ? 'Responsible Disclosure Policy' : 'Responsible Disclosure Beleid' }}
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
              <i class="fas fa-envelope fa-sm text-brand-gold" aria-hidden="true"></i>
              <a
                href="mailto:rob@blaeu.com"
                class="flex items-center underline underline-offset-2 transition-colors !p-0"
              >
                rob@blaeu.com
              </a>
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
              <span class="text-gray-400">/</span>
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
        <div v-if="lang === 'en'" class="text-gray-700 dark:text-gray-300 leading-relaxed">
          <p class="mb-4">
            At Team Blaeu, we consider the security of our systems a top priority. But no matter how
            much effort we put into system security, there can still be vulnerabilities present.
          </p>

          <p class="mb-4">
            If you discover a vulnerability, we would like to know about it to take steps to address
            it as quickly as possible. We want to ask you to help us better protect our clients and
            our systems.
          </p>

          <h2
            class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 leading-tight tracking-tight"
          >
            Please do the following
          </h2>
          <ul class="list-disc pl-6 space-y-2 mb-6">
            <li>
              E-mail your findings to
              <a
                href="mailto:rob@blaeu.com"
                class="text-gray-900 dark:text-gray-100 underline underline-offset-2 transition-colors !p-0"
              >
                rob@blaeu.com
              </a>
              . Encrypt your results using our
              <a
                href="https://pgp.surfnet.nl/pks/lookup?search=9b9171334b4f58de&fingerprint=on&op=index"
                target="_blank"
                rel="noopener noreferrer"
                class="no-external-icon text-gray-900 dark:text-gray-100 underline underline-offset-2 transition-colors !p-0"
              >
                PGP key
                <i class="fa-solid fa-external-link fa-xs" aria-hidden="true"></i>
              </a>
              to prevent this critical information from falling into the wrong hands.
            </li>
            <li>
              Do not take advantage of the vulnerability or problem you have discovered, for
              example, by downloading more data than necessary to demonstrate the vulnerability or
              deleting or modifying other people's data.
            </li>
            <li>Do not reveal the problem to others until we have resolved it.</li>
            <li>
              Do not use attacks on physical security, social engineering, distributed denial of
              service, spam or applications of third parties.
            </li>
            <li>
              Do provide sufficient information to reproduce the problem to resolve it as quickly as
              possible. Usually, the IP address or the URL of the affected system and a description
              of the vulnerability will be sufficient, but complex vulnerabilities may require
              further explanation.
            </li>
          </ul>

          <h2
            class="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-16 mb-4 leading-tight tracking-tight"
          >
            What we promise
          </h2>
          <ul class="list-disc pl-6 space-y-2 mb-6">
            <li>
              We will respond to your report within three business days with our evaluation of the
              information and an expected resolution date.
            </li>
            <li>
              If you have followed the instructions above, we will not take any legal action against
              you regarding the information.
            </li>
            <li>
              We will handle your report with strict confidentiality and not pass on your details to
              third parties without your permission.
            </li>
            <li>We will keep you informed of the progress towards resolving the problem.</li>
            <li>
              In the public information concerning the problem reported, we will give your name as
              the discoverer of the problem (unless you desire otherwise).
            </li>
            <li>
              We offer a reward for every report of a security problem that we did not know about
              yet. The reward amount will be determined based on the leak's severity and the
              report's quality. The minimum reward will be a fifty euro gift certificate.
            </li>
          </ul>

          <p class="mb-4">
            We strive to resolve all problems as quickly as possible, and we would like to play an
            active role in the ultimate publication of the issue after fixing it.
          </p>

          <p class="text-sm text-gray-500 dark:text-gray-400 mt-6">
            To report a vulnerability, contact
            <a
              href="mailto:rob@blaeu.com"
              class="text-gray-900 dark:text-gray-100 underline underline-offset-2 transition-colors !p-0"
            >
              rob@blaeu.com
            </a>
            .
          </p>
        </div>

        <!-- Dutch content -->
        <div v-else class="text-gray-700 dark:text-gray-300 leading-relaxed">
          <p class="mb-4">
            Bij Team Blaeu staat de beveiliging van onze systemen hoog in het vaandel. Maar hoe goed
            wij ons best ook doen, er kunnen toch kwetsbaarheden voorkomen.
          </p>

          <p class="mb-4">
            Als u een kwetsbaarheid ontdekt, horen wij dit graag zodat we snel maatregelen kunnen
            treffen. Wij willen graag met u samenwerken om onze klanten en onze systemen beter te
            beschermen.
          </p>

          <h2
            class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 leading-tight tracking-tight"
          >
            Wij vragen u
          </h2>
          <ul class="list-disc pl-6 space-y-2 mb-6">
            <li>
              Uw bevindingen te mailen naar
              <a
                href="mailto:rob@blaeu.com"
                class="text-gray-900 dark:text-gray-100 underline underline-offset-2 transition-colors !p-0"
              >
                rob@blaeu.com
              </a>
              . Versleutel uw bevindingen met onze
              <a
                href="https://pgp.surfnet.nl/pks/lookup?search=9b9171334b4f58de&fingerprint=on&op=index"
                target="_blank"
                rel="noopener noreferrer"
                class="no-external-icon text-gray-900 dark:text-gray-100 underline underline-offset-2 transition-colors !p-0"
              >
                PGP-sleutel
                <i class="fa-solid fa-external-link fa-xs" aria-hidden="true"></i>
              </a>
              om te voorkomen dat deze gevoelige informatie in verkeerde handen valt.
            </li>
            <li>
              De kwetsbaarheid niet te misbruiken door bijvoorbeeld meer data te downloaden dan
              nodig is om het lek aan te tonen of gegevens van derden te bekijken, verwijderen of
              aanpassen.
            </li>
            <li>De kwetsbaarheid niet met anderen te delen totdat deze is verholpen.</li>
            <li>
              Geen gebruik te maken van aanvallen op fysieke beveiliging, social engineering,
              distributed denial of service, spam of applicaties van derden.
            </li>
            <li>
              Voldoende informatie te geven om het probleem te reproduceren zodat wij het zo snel
              mogelijk kunnen verhelpen. Meestal is het IP-adres of de URL van het getroffen systeem
              en een beschrijving van de kwetsbaarheid voldoende, maar bij complexere kwetsbaarheden
              kan meer nodig zijn.
            </li>
          </ul>

          <h2
            class="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-16 mb-4 leading-tight tracking-tight"
          >
            Wat wij beloven
          </h2>
          <ul class="list-disc pl-6 space-y-2 mb-6">
            <li>
              Wij reageren binnen drie werkdagen op uw melding met onze beoordeling van de melding
              en een verwachte datum voor een oplossing.
            </li>
            <li>
              Als u aan bovenstaande voorwaarden heeft voldaan, ondernemen wij geen juridische
              stappen tegen u betreffende de melding.
            </li>
            <li>
              Wij behandelen uw melding vertrouwelijk en delen uw persoonlijke gegevens niet zonder
              uw toestemming met derden.
            </li>
            <li>Wij houden u op de hoogte van de voortgang van het oplossen van het probleem.</li>
            <li>
              In berichtgeving over het gemelde probleem zullen wij, indien u dit wenst, uw naam
              vermelden als de ontdekker.
            </li>
            <li>
              Wij bieden een beloning voor elke melding van een beveiligingsprobleem dat bij ons nog
              niet bekend is. De hoogte van de beloning wordt bepaald aan de hand van de ernst van
              het lek en de kwaliteit van de melding. De minimale beloning is een cadeaubon ter
              waarde van vijftig euro.
            </li>
          </ul>

          <p class="mb-4">
            Wij streven ernaar alle problemen zo snel mogelijk op te lossen en wij willen graag
            betrokken worden bij een eventuele publicatie over het probleem nadat het is opgelost.
          </p>

          <p class="text-sm text-gray-500 dark:text-gray-400 mt-6">
            Om een kwetsbaarheid te melden, neem contact op via
            <a
              href="mailto:rob@blaeu.com"
              class="text-gray-900 dark:text-gray-100 underline underline-offset-2 transition-colors !p-0"
            >
              rob@blaeu.com
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
  defineOptions({ name: 'ResponsibleDisclosurePage' })

  const lang = ref<'en' | 'nl'>('en')

  const title = 'Responsible Disclosure Policy'
  const description =
    'Responsible disclosure policy for Team Blaeu: report security vulnerabilities confidentially. We respond within three business days and reward valid reports.'
  const pageUrl = 'https://blaeu.com/responsible-disclosure/'

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
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Responsible Disclosure Policy',
          item: pageUrl,
        },
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
