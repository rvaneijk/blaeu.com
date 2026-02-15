<!--
 * @author Blaeu Privacy Response Team
 * @copyright Copyright © 2019 - 2026 Team Blaeu. Content is licensed under CC BY 4.0 unless otherwise noted. All Rights Reserved.
 * @license CC BY 4.0
-->
<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <tw-NavbarMinimal />

    <!-- Main content -->
    <main id="main-content" class="pt-28">
      <article class="max-w-4xl mx-auto px-4 py-8">
        <!-- Post Header -->
        <header class="mb-8">
          <BlogBreadcrumbs title="Data Protection Day 2026 Panel" />
          <h1 class="text-4xl font-bold text-gray-900 mb-4 leading-tight">
            Data Protection Day 2026: Can Regulatory Frameworks Keep Up with Online Tracking?
          </h1>

          <div class="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
            <div class="flex items-center gap-2">
              <i class="fas fa-user fa-sm text-gray-400"></i>
              <span>
                By
                <NuxtLink to="/team/rvaneijk" class="hover:text-[#ffcc00] transition-colors !p-0">
                  Rob van Eijk
                </NuxtLink>
              </span>
            </div>
            <div class="flex items-center gap-2">
              <i class="fas fa-calendar fa-sm text-gray-400"></i>
              <span>January 2026</span>
            </div>
            <div class="flex items-center gap-2">
              <i class="fas fa-microphone fa-sm text-gray-400"></i>
              <span>EDPS / Council of Europe, Brussels</span>
            </div>
            <div class="flex items-center gap-2">
              <i class="fas fa-clock fa-sm text-gray-400"></i>
              <span>10 min read</span>
            </div>
          </div>
        </header>

        <!-- Hero Image: AI-generated Rothko Abstract -->
        <div class="mb-8">
          <img
            src="/assets/blog/rothko-abstracts/data-protection-day-2026-panel.svg"
            alt="AI-generated Rothko-inspired abstract composition representing the Data Protection Day 2026 panel on regulatory frameworks and online tracking"
            class="w-full h-64 object-contain rounded-lg"
            width="1200"
            height="400"
          />
          <p class="blog-caption text-xs text-gray-500 mt-2 italic">
            Figure 1. This Rothko-inspired abstract composition represents the Data Protection Day
            2026 panel. The
            <span class="text-blue-600 font-medium">deep blue foundation</span>
            symbolizes EU regulatory frameworks and the ePrivacy Directive,
            <span class="text-yellow-700 font-medium">golden convergence areas</span>
            represent the consent-first principle under tension, while
            <span class="text-red-600 font-medium">red accents</span>
            express contested exemptions and the urgency of addressing emerging tracking
            technologies.
          </p>
        </div>

        <BlogTableOfContents />

        <!-- Article Content -->
        <div class="prose prose-lg max-w-none">
          <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Summary</h2>

          <p class="mb-4">
            This recap covers two related events from January 2026: (A) panel discussion in five
            parts and (B) privacy-enhancing technologies in digital advertising. What emerges from
            both is a central challenge: (C) looking ahead, enforcement must catch up with
            innovation, and regulators must understand the technical realities they aim to govern.
            On Data Protection Day 2026, Rob van Eijk (Future of Privacy Forum) moderated a panel
            examining whether regulatory frameworks can effectively address the rapidly evolving
            online tracking landscape. The European Data Protection Supervisor (EDPS) and the
            Council of Europe organized the event. The panel brought together Rosa Barcelo
            (McDermott Will &amp; Emery), Itxaso Dom&iacute;nguez de Olaz&aacute;bal (EDRi), and
            Cristiana Teixeira Santos (Utrecht University). The discussion surfaced fundamental
            tensions in Europe's approach to digital privacy. You can
            <a
              href="https://www.youtube.com/watch?v=UnkrPiCn5To"
              target="_blank"
              rel="noopener noreferrer"
              class="hover:text-[#ffcc00] transition-colors !p-0"
            >
              watch the panel recording on YouTube
              <i class="fa-solid fa-external-link fa-sm text-gray-600 ml-1" aria-hidden="true"></i>
            </a>
            .
          </p>

          <p class="mb-4">
            During the same week, the Lisbon Council hosted a High-Level Working Lunch examining
            privacy-enhancing technologies in digital advertising. The invitation-only gathering
            brought together stakeholders from industry, civil society, and regulators. Participants
            explored whether PETs represent a workaround to privacy rules or a path forward for
            European competitiveness.
          </p>

          <div class="bg-gray-100 p-6 rounded-lg mt-8">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">Key Takeaways</h2>

            <p class="mb-3 font-semibold">Data Protection Day 2026 Panel</p>
            <ul class="list-disc pl-6 space-y-2 mb-4">
              <li>
                The Digital Omnibus proposal risks creating a patchwork framework that shifts
                privacy protections toward a GDPR-centric model, potentially weakening specific
                safeguards for terminal equipment access
              </li>
              <li>
                Analytics exemptions create loopholes for invasive tracking technologies that
                collect granular behavioral data (URLs, scrolling, key presses, mouse positions)
                without consent
              </li>
              <li>
                One-click rejection buttons are largely cosmetic. Backend systems often fail to
                register or respect user decisions, continuing data collection despite rejection
              </li>
              <li>
                The problem is not lack of rules but lack of enforcement. Regulators need to work
                with computer scientists to audit the tracking stack and verify backend compliance
              </li>
              <li>
                Server-side tracking operates seamlessly on servers rather than browsers, making it
                harder to detect or block compared to traditional client-side cookies
              </li>
            </ul>

            <p class="mb-3 font-semibold">Lisbon Council Working Lunch</p>
            <ul class="list-disc pl-6 space-y-2 mb-4">
              <li>
                Privacy-enhancing technologies represent both a potential workaround to privacy
                rules and a path forward for European competitiveness
              </li>
              <li>
                Bottlenecks in the PETs ecosystem require examination of incentives needed to drive
                adoption while safeguarding personal data
              </li>
              <li>
                PETs are positioned as strategic innovation enablers beyond mere compliance tools in
                one of the fastest-growing data protection markets
              </li>
            </ul>

            <p class="text-sm italic mt-4">
              Both discussions converge on a common challenge. Europe's regulatory framework stands
              at a crossroads. The Digital Omnibus choices will determine whether the consent-first
              principle remains the cornerstone of digital privacy or gets diluted by exemptions and
              technological realities the original frameworks never anticipated. The path forward
              requires enforcement courage, technical expertise, and innovation that respects
              fundamental rights.
            </p>
          </div>

          <h2 class="text-2xl font-bold text-gray-900 mt-12 pt-8 border-t border-gray-200 mb-4">
            A: Data Protection Day 2026 Panel on Online Tracking Regulation
          </h2>

          <p class="mb-4">
            Van Eijk structured the panel around five interconnected themes that together reveal a
            regulatory landscape struggling to keep pace with evolving tracking technologies.
          </p>

          <h3 class="text-xl font-semibold text-gray-900 mt-6 mb-3">
            What Problem Is the Proposal Trying to Fix?
          </h3>

          <p class="mb-4">
            Van Eijk opened by noting Europe has spent over two decades trying to get cookie
            regulation right. From the original ePrivacy Directive in 2002, through the failed
            ePrivacy Regulation negotiations, to today's Digital Omnibus proposal packaged as
            simplification. He asked Domínguez de Olazábal what exactly the proposal is trying to
            fix.
          </p>

          <p class="mb-4">
            Dom&iacute;nguez de Olaz&aacute;bal opened with a sharp critique. Civil society expected
            the outcome might be a hybrid text combining different regulations. Instead, the Digital
            Omnibus arrived as a supposed solution claiming to fix ePrivacy. She warned the proposal
            represents deregulation that shifts protections toward a GDPR-centric model based on
            legitimate interest. This undermines the confidentiality of communications and specific
            safeguards for accessing terminal equipment.
          </p>

          <h3 class="text-xl font-semibold text-gray-900 mt-6 mb-3">
            The Shift in Legal Framework
          </h3>

          <p class="mb-4">
            Van Eijk bridged to the legal architecture. The proposal positions itself as
            simplification, but that framing is contested. He asked to unpack what's actually
            changing, starting with the consent-first principle central to ePrivacy. He then asked
            Barcelo whether the proposed amendments improve the business position and if the
            proposal strikes the right balance, noting that the Commission Staff Working Paper
            identifies Article 5.3 as causing substantial burden for businesses.
          </p>

          <p class="mb-4">
            Barcelo offered a contrasting business perspective, viewing the proposal as reasonably
            balanced and an evolution rather than a revolution. She noted that many proposed
            exceptions for security and analytics already reflect current practice by Data
            Protection Authorities in France and Germany. The changes create legal certainty through
            harmonization, though she warned this comes with a trade-off: fines will be harmonized
            upward to GDPR levels rather than the currently variable national penalties.
          </p>

          <h3 class="text-xl font-semibold text-gray-900 mt-6 mb-3">
            Analytics Exemptions Create Tracking Loopholes
          </h3>

          <p class="mb-4">
            Van Eijk bridged to the next theme. The proposal shifts the legal framework and attempts
            to balance business needs with user control. But much of the debate hinges on the
            exceptions carved out from consent requirements. He asked Santos whether the proposal
            changes anything for analytics and requested practical examples of first-party tools
            that may conflict with confidentiality principles.
          </p>

          <p class="mb-4">
            Santos delivered a detailed technical critique of the proposed analytics exemptions
            under Article 88a, paragraph 3c. The exemptions claim to limit collection to aggregated
            information for website operation. She warned these exemptions create loopholes for
            highly invasive tracking.
          </p>

          <p class="mb-4">
            She cited widely-used audience measurement services as concrete examples. These tools
            collect granular behavioral data including URLs visited, time spent, scrolling actions,
            key presses, mouse positions, browser and OS types, screen resolution, language, and IP
            addresses. This data is highly identifiable. Yet the new proposal could exempt it from
            consent requirements.
          </p>

          <p class="mb-4">
            Server-side tracking allows this data collection to happen directly on the server rather
            than the browser, making it seamless and harder to detect or block compared to
            traditional client-side cookies. Tools appear as standard first-party communication
            while collecting vast amounts of user behavior data.
          </p>

          <h3 class="text-xl font-semibold text-gray-900 mt-6 mb-3">
            The Cosmetic Compliance Problem
          </h3>

          <p class="mb-4">
            Van Eijk shifted focus. After discussing what requires consent and what doesn't, he
            turned to how consent actually works in practice. He asked Barcelo about the main
            challenges in standardizing machine-readable consent signals, then asked Santos about
            one-click rejection, dark patterns, consent fatigue, and backend compliance gaps.
          </p>

          <p class="mb-4">
            The panel dissected why current consent mechanisms fail in practice. Santos described
            one-click rejection buttons as largely cosmetic. User studies show that even when reject
            buttons exist, dark patterns nudge users toward acceptance. Shiny accept buttons
            contrast with dull reject buttons. Negative framing scares users by suggesting they'll
            lose site functionality if they reject cookies.
          </p>

          <p class="mb-4">
            More critically, the visual interface is only half the problem. Empirical research shows
            a frontend versus backend disconnect. Even when users successfully click reject or
            revoke consent, the backend often ignores these decisions. Systems fail to record
            choices correctly. Data collection continues. Systems don't communicate decisions
            downstream to third-party ad-tech actors.
          </p>

          <p class="mb-4">
            Dom&iacute;nguez de Olaz&aacute;bal added that the proposed exemptions undermine privacy
            signals like Global Privacy Control. If companies receive broad exceptions for media or
            audience measurement, they simply won't respect the user's signal to reject tracking.
            This renders the mechanism useless. Barcelo questioned how a single browser signal could
            satisfy GDPR's requirement for specific, granular consent. GDPR requires separating
            analytics from marketing consent. A single signal cannot achieve this without
            compromising functionality for users.
          </p>

          <p class="mb-4">
            Van Eijk observed that ePrivacy problems are dealt with in a fragmented landscape.
            Nudging is addressed in the Digital Services Act but applies to only a few actors. The
            Digital Fairness Act will extend some of these problems to B2B relationships. A much
            larger number of organizations will be subject to these new rules.
          </p>

          <h3 class="text-xl font-semibold text-gray-900 mt-6 mb-3">
            Enforcement Over Legislation
          </h3>

          <p class="mb-4">
            Van Eijk framed the final theme around technical neutrality and future-proofing. He
            noted that the discussion had assumed regulators understand the technologies they're
            regulating. But the tracking landscape has moved far beyond cookies. He asked Santos
            what new tracking technologies the proposal needs to contend with.
          </p>

          <p class="mb-4">
            A recurring theme throughout the panel was the problem isn't a lack of rules, but a lack
            of enforcement. The panelists emphasized that new legislative frameworks won't solve
            tracking problems. Regulators must enforce existing bans. Regulators must audit
            technical compliance.
          </p>

          <h3 class="text-xl font-semibold text-gray-900 mt-6 mb-3">Closing Recommendations</h3>

          <p class="mb-4">
            Van Eijk gave each panelist one final opportunity. If you had one message for
            policymakers working on this proposal, what would it be?
          </p>

          <p class="mb-4">
            Santos closed with a recommendation to policymakers. Regulators must work directly with
            computer scientists. The law cannot be effective if policymakers don't understand the
            technical reality of tracking. This includes server-side tracking, fingerprinting, and
            the backend tracking stack. Regulators need standardized technical mechanisms to audit
            backend systems. These mechanisms must verify that backend compliance matches frontend
            user choices.
          </p>

          <p class="mb-4">
            Dom&iacute;nguez de Olaz&aacute;bal stressed that policymakers should stop relying on
            company self-regulation. The focus must shift to strict enforcement of existing bans on
            tracking, rather than creating new loopholes or relying on cosmetic interface changes.
            Barcelo added that policymakers need courage to navigate this difficult legislative
            landscape while maintaining balance between business needs and user rights.
          </p>

          <h3 class="text-xl font-semibold text-gray-900 mt-6 mb-3">Audience Questions</h3>

          <p class="mb-4">
            Van Eijk bridged to audience questions by raising a question the Digital Omnibus doesn't
            address. What happens when the user isn't even making the decision? When AI agents shop,
            browse, and consent on our behalf, who is the user whose terminal equipment we're
            protecting? The ePrivacy framework assumes a human at the keyboard, but that assumption
            may have an expiration date.
          </p>

          <p class="mb-4">
            The audience questions surfaced additional concerns beyond the panel themes. One
            question addressed whether Europe needs a parallel internet infrastructure with European
            endpoints for data sovereignty. Dom&iacute;nguez de Olaz&aacute;bal responded that while
            European alternatives like Mastodon exist, a European flag doesn't automatically mean
            safer data practices.
          </p>

          <p class="mb-4">
            Another question raised the issue of data brokers selling tracking data to security
            services. Investigations revealed that agencies in the US and Europe purchase granular
            location data from brokers. Dom&iacute;nguez de Olaz&aacute;bal emphasized the lack of
            dedicated AdTech regulation and noted that the IAB's Transparency and Consent Framework
            has been ruled illegal. Santos pointed out that the US requires brokers to register and
            disclose their data practices, a requirement that doesn't exist in the EU. Van Eijk
            noted the risks, citing how abortion clinic location data purchased from brokers could
            have serious legal consequences.
          </p>

          <p class="mb-4">
            Questions also covered whether Data Intermediaries from the Data Governance Act could
            relieve tracking fatigue, and whether AdTech business models are fundamentally illegal
            or simply misaligned with data protection rules.
          </p>

          <h2 class="text-2xl font-bold text-gray-900 mt-12 pt-8 border-t border-gray-200 mb-4">
            B: Lisbon Council Working Lunch on Privacy-Enhancing Technologies
          </h2>

          <p class="mb-4">
            In a related session during the same week, the Lisbon Council hosted a High-Level
            Working Lunch on Privacy-Enhancing Technologies in Digital Advertising (
            <a
              href="https://lisboncouncil.net/newsandevents/privacy-enhancing-technologies/"
              target="_blank"
              rel="noopener noreferrer"
              class="hover:text-[#ffcc00] transition-colors !p-0"
            >
              Lisbon Council event page
              <i class="fa-solid fa-external-link fa-sm text-gray-600 ml-1" aria-hidden="true"></i>
            </a>
            ,
            <a
              href="http://web.archive.org/web/20260202114158/https://lisboncouncil.net/newsandevents/privacy-enhancing-technologies/"
              target="_blank"
              rel="noopener noreferrer"
              class="hover:text-[#ffcc00] transition-colors !p-0"
            >
              archived event page
              <i class="fa-solid fa-external-link fa-sm text-gray-600 ml-1" aria-hidden="true"></i>
            </a>
            ). The invitation-only gathering brought together representatives from FEDMA, Microsoft,
            the European Commission, The European Consumer Organisation, Zalando, Mozilla, IAB
            Europe, the Future of Privacy Forum, and the European Data Protection Board.
          </p>

          <p class="mb-4">
            The discussion explored whether privacy-enhancing technologies (PETs) represent a way
            around privacy rules or an important way forward for Europe's competitiveness.
            Participants examined the bottlenecks hindering the PETs ecosystem, the incentives
            needed to drive adoption while safeguarding personal data, and the real-world impact of
            PETs deployment.
          </p>

          <p class="mb-4">
            Europe shifts toward new data protection provisions in the Digital Omnibus. Industry
            increasingly positions PETs not just as compliance tools but as strategic innovation
            enablers. PETs represent one of the fastest-growing markets in data protection.
          </p>

          <h2 class="text-2xl font-bold text-gray-900 mt-12 pt-8 border-t border-gray-200 mb-4">
            C: Looking Ahead
          </h2>

          <p class="mb-4">
            The panel made clear that Europe's challenge isn't drafting better rules. The challenge
            is enforcing the ones we have. Server-side tracking proliferates. Analytics exemptions
            expand. Cosmetic compliance mechanisms multiply. The gap between what the law promises
            and what users experience continues to widen.
          </p>

          <p class="mb-4">
            The discussions at Data Protection Day 2026 and the Lisbon Council working lunch
            highlight the same crossroads. Will the Digital Omnibus strengthen privacy protections
            through genuine enforcement and technical auditing? Or will it dilute them through
            exemptions and a shift away from the consent-first principle? This principle has defined
            European digital privacy for nearly two decades. The answer depends less on legislative
            language than on regulators' courage to audit backend systems. Regulators must hold
            companies accountable for what happens after users click reject.
          </p>

          <BlogShareLinks :title="title" :url="pageUrl" />
        </div>
      </article>
    </main>

    <!-- Footer -->
    <tw-FooterMinimal />
  </div>
</template>

<script setup>
  defineOptions({
    name: 'DataProtectionDay2026PanelPage',
  })

  const title = 'Data Protection Day 2026: Can Regulatory Frameworks Keep Up with Online Tracking?'
  const description =
    'Panel moderation examining whether regulatory frameworks can effectively address the evolving online tracking landscape, featuring discussion on the Digital Omnibus proposal, ePrivacy Directive consent principles, analytics exemptions, and server-side tracking.'
  const ogImage = '/assets/blog/rothko-abstracts/data-protection-day-2026-panel.svg'
  const pageUrl = 'https://blaeu.com/blog/data-protection-day-2026-panel'
  const publishDate = '2026-01-28T10:00:00+01:00'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description: description,
    image: ogImage,
    url: pageUrl,
    datePublished: publishDate,
    dateModified: publishDate,
    author: {
      '@type': 'Person',
      name: 'Rob van Eijk',
      url: 'https://blaeu.com/team/rvaneijk',
      sameAs: ['https://www.linkedin.com/in/rvaneijk88', 'https://orcid.org/0000-0002-2203-6819'],
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
    keywords: [
      'Data Protection Day',
      'ePrivacy Directive',
      'Digital Omnibus',
      'online tracking',
      'consent',
      'server-side tracking',
      'privacy-enhancing technologies',
      'EDPS',
      'Council of Europe',
    ],
    about: [
      {
        '@type': 'Thing',
        name: 'ePrivacy Regulation',
      },
      {
        '@type': 'Thing',
        name: 'Online Tracking',
      },
      {
        '@type': 'Thing',
        name: 'Privacy-Enhancing Technologies',
      },
    ],
    mentions: [
      {
        '@type': 'Organization',
        name: 'European Data Protection Supervisor',
        url: 'https://edps.europa.eu',
      },
      {
        '@type': 'Organization',
        name: 'Council of Europe',
        url: 'https://www.coe.int',
      },
      {
        '@type': 'Organization',
        name: 'Lisbon Council',
        url: 'https://lisboncouncil.net',
      },
    ],
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://blaeu.com',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Blog',
          item: 'https://blaeu.com/blog',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Data Protection Day 2026 Panel',
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
      { name: 'author', content: 'Rob van Eijk' },
      {
        name: 'keywords',
        content:
          'Data Protection Day, ePrivacy Directive, Digital Omnibus, online tracking, consent, server-side tracking, privacy-enhancing technologies, EDPS',
      },

      { property: 'og:type', content: 'article' },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:image', content: ogImage },
      { property: 'og:url', content: pageUrl },
      { property: 'og:site_name', content: 'Team Blaeu' },
      { property: 'article:published_time', content: publishDate },
      { property: 'article:author', content: 'Rob van Eijk' },
      { property: 'article:section', content: 'Data Protection' },
      { property: 'article:tag', content: 'ePrivacy' },
      { property: 'article:tag', content: 'Data Protection' },
      { property: 'article:tag', content: 'Online Tracking' },

      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: ogImage },
      {
        name: 'twitter:image:alt',
        content: 'Data Protection Day 2026 panel abstract composition',
      },
    ],
    link: [{ rel: 'canonical', href: pageUrl }],
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(jsonLd),
      },
    ],
  })
</script>
