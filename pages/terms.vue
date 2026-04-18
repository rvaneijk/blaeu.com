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
                  {{ lang === 'en' ? 'General Terms and Conditions' : 'Algemene Voorwaarden' }}
                </span>
              </li>
            </ol>
          </nav>

          <h1
            class="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4 leading-tight tracking-tight"
          >
            {{ lang === 'en' ? 'General Terms and Conditions' : 'Algemene Voorwaarden' }}
          </h1>

          <div
            class="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4"
          >
            <div class="flex items-center gap-2">
              <i class="fas fa-calendar fa-sm text-brand-gold" aria-hidden="true"></i>
              <span>
                {{
                  lang === 'en' ? 'Last updated: March 1, 2025' : 'Laatst bijgewerkt: 1 maart 2025'
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
          <p class="font-medium mb-3">In short:</p>
          <ul class="list-disc pl-6 space-y-1 mb-6">
            <li>
              Blaeu Privacy Response Team B.V. (hereinafter: Team Blaeu) is a private limited
              company registered at the Dutch Chamber of Commerce under no. 75599740.
            </li>
            <li>Team Blaeu does not charge office costs.</li>
            <li>Team Blaeu bills on a monthly basis with a payment period of 30 days.</li>
            <li>
              Team Blaeu's liability is restricted to the fee already paid (max. EUR 5,000). Claims
              expire after one year.
            </li>
            <li>Team Blaeu does not accept liability for subcontractors.</li>
            <li>Dutch law applies. The court in Rotterdam, the Netherlands is competent.</li>
          </ul>

          <p class="text-sm text-gray-500 dark:text-gray-400 mb-8">
            These terms and conditions are further worked out below. In the case of a conflict
            between this summary and the precise wording below, the precise wording prevails.
          </p>

          <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-8 mb-4">
            Full Terms and Conditions
          </h2>

          <ol class="list-decimal pl-5 space-y-4">
            <li>
              Blaeu Privacy Response Team B.V. (Team Blaeu) is a private limited company under Dutch
              law. Team Blaeu is located in Rotterdam and is registered at the Dutch Chamber of
              Commerce under no. 75599740.
            </li>
            <li>
              These General Terms and Conditions apply to all legal relationships between Team Blaeu
              and the client, unless the parties have agreed otherwise in writing prior to the
              conclusion of an agreement. Team Blaeu excludes the applicability of any general terms
              and conditions used by the client.
            </li>
            <li>
              Team Blaeu may engage third parties in the course of the performance of an assignment.
              Team Blaeu shall apply the necessary care when engaging third parties. Team Blaeu
              shall not be liable vis-à-vis the client for any actions of those third parties. The
              client gives Team Blaeu authority to accept on behalf of the client a limitation of
              liability stipulated by such person. All assignments are deemed to be performed by
              Team Blaeu, and not by a specific person associated with Team Blaeu. Sections 7:404
              and 7:407 subsection 2 of the Dutch Civil Code (Burgerlijk Wetboek) are herewith
              excluded.
            </li>
            <li>
              For the performance of an assignment, the client will be due the fee plus
              disbursements (such as travel costs) and VAT payable, unless exempt from VAT, e.g., on
              the basis of Article 44 of the European VAT Directive 2006/112/EC.
            </li>
            <li>
              Team Blaeu will bill the client on a monthly basis, unless agreed otherwise in
              writing. The payment period is 30 days from the invoice date. If the payment has not
              been received within the agreed term, the client will be deemed to be in default
              without prior notice and Team Blaeu will have the right to charge the statutory
              interest (wettelijke rente) and any judicial and extrajudicial (collection) costs
              (gerechtelijke- en buitengerechtelijke (incasso)kosten).
            </li>
            <li>
              Any liability on the part of Team Blaeu vis-à-vis the client and third parties for
              damages resulting from or related to the performance of an assignment, shall be
              limited to the already paid fee for the activities in relation to which the damage has
              occurred, with a maximum of EUR 5,000. Each claim for damages shall expire after a
              period of one year from the day following the day on which the client became aware or
              could reasonably be aware of the existence of the damages.
            </li>
            <li>
              The client shall indemnify Team Blaeu for any claims of third parties which are in any
              way related to the activities of Team Blaeu for the client. The client shall reimburse
              to Team Blaeu all costs of legal defence and all damages in relation to these claims.
              This provision does not apply to the extent a claim is the result of the intent or
              recklessness (opzet of bewuste roekeloosheid) of Team Blaeu.
            </li>
            <li>
              These General Terms and Conditions are also made for the benefit of the persons who
              are or were working for Team Blaeu or who were engaged during the performance of any
              assignment by Team Blaeu.
            </li>
            <li>
              Dutch law shall govern the legal relationship between Team Blaeu and its client. The
              complaints procedure of Team Blaeu applies to each engagement. Any dispute between
              Team Blaeu and a client shall be resolved exclusively by the competent court of
              Rotterdam, the Netherlands. In the event of any discrepancy between the Dutch and
              English versions of these General Terms and Conditions, the Dutch version shall
              prevail.
            </li>
            <li>
              The rates to be charged, except for substantive rate adjustments, are adjusted as of
              January 1 of each year in accordance with the consumer price index for all households
              over the preceding period October/October, on the understanding that the amounts are
              rounded to a multiple of five euros.
            </li>
            <li>
              Team Blaeu retains ownership of all items delivered by it until the buyer has fully
              met all payment obligations.
            </li>
          </ol>

          <p class="text-sm text-gray-500 dark:text-gray-400 mt-8">
            If there is an inconsistency between the Dutch and English-language version of these
            regulations, the Dutch version takes precedence.
          </p>

          <p class="text-sm text-gray-500 dark:text-gray-400 mt-4">
            Questions about these terms? Contact us at
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
          <p class="font-medium mb-3">In het kort:</p>
          <ul class="list-disc pl-6 space-y-1 mb-6">
            <li>
              Blaeu Privacy Response Team B.V. (hierna: Team Blaeu) is een besloten vennootschap
              ingeschreven bij de Kamer van Koophandel onder nr. 75599740.
            </li>
            <li>Team Blaeu brengt geen kantoorkosten in rekening.</li>
            <li>Team Blaeu factureert maandelijks met een betalingstermijn van 30 dagen.</li>
            <li>
              De aansprakelijkheid van Team Blaeu is beperkt tot het reeds betaalde honorarium (max.
              EUR 5.000). Vorderingen vervallen na één jaar.
            </li>
            <li>Team Blaeu aanvaardt geen aansprakelijkheid voor onderaannemers.</li>
            <li>
              Nederlands recht is van toepassing. De rechtbank te Rotterdam, Nederland is bevoegd.
            </li>
          </ul>

          <p class="text-sm text-gray-500 dark:text-gray-400 mb-8">
            Deze algemene voorwaarden worden hieronder verder uitgewerkt. In geval van een conflict
            tussen deze samenvatting en de precieze bewoording hieronder, prevaleert de precieze
            bewoording.
          </p>

          <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-8 mb-4">
            Volledige Algemene Voorwaarden
          </h2>

          <ol class="list-decimal pl-5 space-y-4">
            <li>
              Blaeu Privacy Response Team B.V. (hierna: Team Blaeu) is een besloten vennootschap
              naar Nederlands recht. Team Blaeu is gevestigd in Rotterdam en is ingeschreven bij de
              Kamer van Koophandel onder nummer 75599740.
            </li>
            <li>
              Deze Algemene Voorwaarden zijn van toepassing op alle rechtsverhoudingen tussen Team
              Blaeu en de opdrachtgever, tenzij partijen voorafgaand aan de totstandkoming van een
              overeenkomst schriftelijk anders zijn overeengekomen. Team Blaeu sluit de
              toepasselijkheid van eventuele door de opdrachtgever gehanteerde algemene voorwaarden
              uit.
            </li>
            <li>
              Team Blaeu kan bij de uitvoering van een opdracht derden inschakelen. Team Blaeu zal
              bij het inschakelen van derden de nodige zorgvuldigheid in acht nemen. Team Blaeu is
              niet aansprakelijk jegens de opdrachtgever voor enige tekortkoming van deze derden. De
              opdrachtgever geeft Team Blaeu de bevoegdheid om namens de opdrachtgever een door die
              persoon bedongen aansprakelijkheidsbeperking te aanvaarden. Alle opdrachten worden
              geacht te zijn uitgevoerd door Team Blaeu en niet door een specifiek aan Team Blaeu
              verbonden persoon. De artikelen 7:404 en 7:407 lid 2 van het Burgerlijk Wetboek worden
              hierbij uitgesloten.
            </li>
            <li>
              Voor de uitvoering van een opdracht is de opdrachtgever het honorarium verschuldigd
              vermeerderd met verschotten (zoals reiskosten) en btw, tenzij vrijgesteld van btw,
              bijvoorbeeld op basis van artikel 44 van de Europese btw-richtlijn 2006/112/EG.
            </li>
            <li>
              Team Blaeu zal de opdrachtgever maandelijks factureren, tenzij schriftelijk anders
              overeengekomen. De betalingstermijn is 30 dagen vanaf de factuurdatum. Indien de
              betaling niet binnen de overeengekomen termijn is ontvangen, wordt de opdrachtgever
              geacht zonder voorafgaande ingebrekestelling in verzuim te zijn en heeft Team Blaeu
              het recht de wettelijke rente en eventuele gerechtelijke en buitengerechtelijke
              (incasso)kosten in rekening te brengen.
            </li>
            <li>
              Iedere aansprakelijkheid van Team Blaeu jegens de opdrachtgever en derden voor schade
              die voortvloeit uit of verband houdt met de uitvoering van een opdracht, is beperkt
              tot het reeds betaalde honorarium voor de werkzaamheden waarop de schade betrekking
              heeft, met een maximum van EUR 5.000. Elke vordering tot schadevergoeding vervalt na
              verloop van één jaar vanaf de dag volgend op de dag waarop de opdrachtgever bekend
              werd of redelijkerwijs bekend had kunnen zijn met het bestaan van de schade.
            </li>
            <li>
              De opdrachtgever vrijwaart Team Blaeu voor alle aanspraken van derden die op enigerlei
              wijze verband houden met de werkzaamheden van Team Blaeu voor de opdrachtgever. De
              opdrachtgever vergoedt aan Team Blaeu alle kosten van juridische bijstand en alle
              schade in verband met deze claims. Deze bepaling is niet van toepassing voor zover een
              claim het gevolg is van opzet of bewuste roekeloosheid van Team Blaeu.
            </li>
            <li>
              Deze Algemene Voorwaarden zijn mede gemaakt ten behoeve van de personen die voor Team
              Blaeu werkzaam zijn of waren of die bij de uitvoering van enige opdracht door Team
              Blaeu waren betrokken.
            </li>
            <li>
              Op de rechtsverhouding tussen Team Blaeu en haar opdrachtgever is Nederlands recht van
              toepassing. De klachtenprocedure van Team Blaeu is van toepassing op iedere opdracht.
              Geschillen tussen Team Blaeu en een opdrachtgever worden uitsluitend beslecht door de
              bevoegde rechter te Rotterdam, Nederland. In geval van een discrepantie tussen de
              Nederlandse en Engelse versie van deze Algemene Voorwaarden, prevaleert de Nederlandse
              versie.
            </li>
            <li>
              De in rekening te brengen tarieven worden behoudens inhoudelijke tariefaanpassingen
              telkens met ingang van 1 januari aangepast overeenkomstig de consumentenprijsindex
              voor alle huishoudens over de daaraan voorafgaande periode oktober/oktober, met dien
              verstande dat de bedragen worden afgerond op een veelvoud van vijf euro.
            </li>
            <li>
              Team Blaeu behoudt de eigendom van alle door haar geleverde zaken, totdat de koper
              volledig aan al zijn betalingsverplichtingen heeft voldaan.
            </li>
          </ol>

          <p class="text-sm text-gray-500 dark:text-gray-400 mt-8">
            In geval van een discrepantie tussen de Nederlandse en Engelse versie van deze Algemene
            Voorwaarden, prevaleert de Nederlandse versie.
          </p>

          <p class="text-sm text-gray-500 dark:text-gray-400 mt-4">
            Vragen over deze algemene voorwaarden? Neem contact met ons op via
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
  defineOptions({ name: 'TermsPage' })

  const lang = ref<'en' | 'nl'>('en')

  const title = 'General Terms and Conditions'
  const description =
    'General terms and conditions for Team Blaeu (Blaeu Privacy Response Team B.V.) covering service agreements, liability, payment terms, and applicable law.'
  const pageUrl = 'https://blaeu.com/terms/'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description: description,
    url: pageUrl,
    dateModified: '2025-03-01',
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
        { '@type': 'ListItem', position: 2, name: 'General Terms and Conditions', item: pageUrl },
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
