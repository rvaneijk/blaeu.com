<!--
 * @author Blaeu Privacy Response Team
 * @copyright Copyright © 2019 - 2025 Team Blaeu. Content is licensed under CC BY 4.0 unless otherwise noted. All Rights Reserved.
 * @license CC BY 4.0
-->
<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <tw-NavbarMinimal />
    <ScrollProgressBar />

    <!-- Main content -->
    <main id="main-content" class="pt-28">
      <article class="max-w-4xl mx-auto px-4 py-8">
        <!-- Post Header -->
        <header class="mb-8">
          <BlogBreadcrumbs title="Microtargeting Ethics" />
          <h1
            class="text-4xl font-bold text-gray-900 mb-4 leading-tight"
            style="font-size: 2.25rem"
          >
            Microtargeting: On the Critical Connection Between Ethics and Ad-Technology
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
              <span>November 2023</span>
            </div>
            <div class="flex items-center gap-2">
              <i class="fas fa-microphone fa-sm text-gray-400"></i>
              <span>EDAA Summit 2023 Keynote</span>
            </div>
            <div class="flex items-center gap-2">
              <i class="fas fa-clock fa-sm text-gray-400"></i>
              <span>13 min read</span>
            </div>
          </div>
        </header>

        <!-- Hero Image: AI-generated Rothko Abstract -->
        <div class="mb-8">
          <img
            src="/assets/blog/rothko-abstracts/microtargeting-2023.svg"
            alt="AI-generated Rothko-inspired abstract composition representing microtargeting ethics in ad-technology"
            class="w-full h-64 object-contain rounded-lg"
            width="1200"
            height="400"
          />
          <p class="blog-caption text-xs text-gray-500 mt-2 italic">
            <strong>Figure 1.</strong>
            This Rothko-inspired abstract composition represents the critical intersection of ethics
            and ad-technology in microtargeting. The
            <span class="text-red-600 font-medium">prominent red concerns</span>
            symbolize critical democratic vulnerabilities and privacy violations,
            <span class="text-blue-600 font-medium">stabilizing blue areas</span>
            represent fair distribution principles and democratic values, while
            <span class="text-yellow-700 font-medium">golden regulatory fields</span>
            express ethical standards and the governance needed to protect democratic processes from
            unlawful data collection.
          </p>
        </div>

        <BlogTableOfContents />

        <!-- Article Content -->
        <div class="prose prose-lg max-w-none">
          <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Summary</h2>

          <p class="mb-4">
            This blog post presents the complete transcript of my keynote address delivered at the
            EDAA Summit 2023 on November 14, 2023, titled "Ethics in Technology: The Way Forward for
            Online Advertisers." The presentation examines the ethical and legal complexities of
            microtargeting in online advertising, particularly focusing on political campaigns and
            data protection violations discovered in Dutch political parties' websites during the
            2023 parliamentary election.
          </p>

          <p class="mb-4">
            The keynote addresses the roles and responsibilities of three main actors in the digital
            advertising landscape: publishers, advertisers, and platforms. Drawing from research
            conducted with the Dutch Broadcasting Foundation NOS, the presentation reveals
            significant cookie law violations by major Dutch political parties and explores the
            broader implications for democratic processes, data protection, and the need for ethical
            advertising practices that respect privacy rights and democratic values. An update
            section discusses subsequent developments, including the Dutch DPA's firm response to
            these violations and the enactment of EU Regulation 2024/900 on political advertising
            transparency.
          </p>

          <div class="bg-gray-100 p-6 rounded-lg mt-8">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">Key Takeaways:</h2>
            <ul class="list-disc pl-6 space-y-2">
              <li>
                Dutch political parties violated cookie laws by placing tracking cookies without
                user consent during the 2023 election
              </li>
              <li>
                Data Subject Access Requests have major implications for adtech companies in
                real-time bidding
              </li>
              <li>
                Fairness in advertising requires Equal Opportunity, Demographic Parity, and
                Equitable Outcomes
              </li>
              <li>
                Ethical advertising practices must uphold privacy, fairness, and democratic values
              </li>
            </ul>
          </div>

          <p class="mb-4">
            On November 14, 2023, the European Interactive Digital Advertising Alliance held its
            EDAA Summit 2023. For this event, they requested that I deliver a forward-looking
            keynote speech on "Ethics in Technology: The Way Forward for Online Advertisers." Here
            is a transcript of my keynote address.
          </p>

          <h2 class="text-2xl font-bold text-gray-900 mt-12 pt-8 border-t border-gray-200 mb-4">
            Microtargeting
          </h2>

          <p class="mb-4">
            Hello, everyone. It's a pleasure to be here to discuss an increasingly relevant topic in
            our digital age: the ethical and legal complexities surrounding microtargeting in online
            advertising, particularly within the context of political campaigns. Recent developments
            have brought to light significant concerns about how political parties use
            microtargeting techniques, which involve collecting sensitive data to target specific
            groups of voters with tailored messages. These practices raise questions about
            fundamental rights, data protection, and the broader implications for the integrity of
            our democratic processes.
          </p>

          <p class="mb-4">
            Today, we aim to address the need to prevent unlawful data collection and foster ethical
            advertising practices that respect individual privacy rights and the democratic values
            we cherish. I will dissect the roles and responsibilities of the three main actors in
            this landscape: the publishers who display the ads, the advertisers who create and
            target these ads, and the platforms that facilitate this interaction. Let's start with
            the publishers.
          </p>

          <p class="mb-4">
            On 22 November 2023, Dutch voters cast their ballots in the parliamentary election. It
            will not be a surprise to you that Dutch political parties spend part of their budget on
            online campaigns. Political parties use digital advertisements to reach voters;
            microtargeting has been part of the mix for years. Recent research conducted by the
            Dutch Broadcasting Foundation NOS has uncovered significant data protection and privacy
            law breaches among various Dutch political parties, particularly using website tracking
            cookies. The most prominent violators, as identified by the research, include
            BoerBurgerBeweging (BBB), Forum for Democracy (FvD), SGP, and Volt, all of whom have
            been found to store marketing cookies in the website visitor's browser without prior
            user consent.
          </p>

          <p class="mb-4">
            Since 2012, the law mandates that such tracking cookies, which are typically used for
            targeted and behavioral advertising, can only be placed with informed consent. However,
            these four parties have been caught placing cookies before obtaining consent, a clear
            violation of the Cookie and Data Protection Act. I contributed to the research conducted
            by the Dutch Broadcasting Foundation NOS. I analyzed the extent to which pixels,
            scripts, and iframes resulted in tracking cookies before consent was provided. A simple
            way to do this is through visualizing what happens when you visit a webpage. While
            loading the webpage, the browser will call on various servers on the web. These requests
            will often not offer content for download on that server but instead, cause a redirect
            to somewhere else on the web. The resulting visualization, or RequestMap, provides an
            excellent first view of where to look for identifiers to track people's browsing
            behavior. Such actions raise concerns over user privacy and the ethical use of data for
            political advertising.
          </p>

          <p class="mb-4">
            It was interesting to see that it matters whether you are logged in to other web
            services, e.g., Twitter, LinkedIn, or YouTube, before visiting a political party's
            website. If logged in, the embedded social media scripts sometimes pull in tracking
            cookies, primarily when implemented in an iframe. In response to the findings, three
            political parties acknowledged the mistakes, attributing them to errors rather than
            intentional lawbreaking. One party stated their commitment to resolving the issue, while
            another spokesperson highlighted their efforts to comply with GDPR, expressing
            unawareness of the error.
          </p>

          <p class="mb-4">
            The Dutch Data Protection Authority (AP) expressed shock and disappointment, especially
            considering their prior efforts to remind political parties of the cookie and privacy
            regulations at the start of the election campaign. They have demanded clarifications
            from the involved parties. It is worth noting that it is not the first time the DPA has
            sent warning letters. In addition to these specific instances of cookie misuse, 13 of
            the 17 surveyed parties also use Google Analytics. GA is being scrutinized for privacy
            concerns in many European countries. Regulators across Europe, including the EDPS and
            authorities from Finland, France, Italy, Norway, Austria, and Sweden, have issued about
            a dozen rulings on Google Analytics. These rulings primarily concern illegal data
            transfers to the United States via cookies and IP addresses, a less pressing issue since
            the European Commission's new adequacy decision this summer.
          </p>

          <p class="mb-4">
            It is important to note that the rules for cookies differ throughout the EU due to the
            European Directive's nature, which leaves little room for transposing regulations into
            national law. The use of analytics in the Netherlands is a particular case due to an
            exemption of the consent requirement under the Dutch Telecommunications Act. I quote:
            "The provisions for informed consent shall not apply if the storage or access is
            strictly necessary to provide the information society service requested by the
            subscriber or user or – and this is the important bit – provided that this has no or
            little impact on the privacy of the subscriber or user concerned - to obtain information
            on the quality or effectiveness of an information society service provided." In other
            words, the requirements for informed consent do not apply if they have minimal or no
            impact on the privacy of the involved website visitor; consent is not necessary for
            processing data on the quality or effectiveness of the provided information society
            service.
          </p>

          <p class="mb-4">
            Even though analytics cookies stored in a website visitor's browser are exempt from the
            consent requirements, this does not imply that they are unregulated. The Dutch
            legislation explicitly states that the use of cookies for collecting, combining, or
            analyzing data about a user's interaction with multiple digital services, intending to
            treat the user differently, is assumed to constitute the processing of personal data
            under GDPR definitions. In other words, the reference to the GDPR implies that a lawful
            ground is still required and other rights for data subjects are in play, such as
            providing information about all parties with whom the cookie was shared. An example is
            the recent civil case against Criteo in the Netherlands. The Dutch court ruled that "a
            technology company may not store tracking cookies on a person's computer or other
            devices without his consent because it violates fundamental rights and the GDPR." The
            judgment also refers to the recent judgment of the European Court of Justice in RW vs.
            österreichisches Post (Case C-154/21).
          </p>

          <p class="mb-4">
            Imagine a Data Subject Access Request. Under the European Court of Justice ruling, a
            data controller is obliged - for instance, in a Data Subject Access Request- to disclose
            to the data subject the identity of those recipients when personal data have been or
            will be disclosed to recipients. I cannot overstate the implications of this ruling for
            specialized adtech companies in real-time bidding systems as it implies dozens,
            potentially hundreds of recipients for a single advertisement.
          </p>

          <p class="mb-4">
            As debates around personalized political advertising and privacy continue, the European
            Union is considering stricter regulations on microtargeting, including bans on ads based
            on sensitive criteria like ethnicity or religion, and demanding greater transparency in
            such practices. In the following keynote by Mr. Sandro Gozi, we will learn more about
            the upcoming regulation on the transparency and targeting of political advertising.
          </p>

          <p class="mb-4">
            Now, let's turn to the advertisers. Historically, much attention has been paid to the
            publishers, in contrast to the advertisers. Advertisers have not yet been an object of
            interest for scrutiny by DPAs or an object of a class action case. In my example of the
            political ad campaigns in the Netherlands, Dutch political parties determine the purpose
            and the means. In doing so, they are (very likely) data controllers as defined in the
            GDPR, either by themselves or a joint controller with the publishers. We've seen the
            complexity of joint controllers play out in the European Court Ruling on Fashion ID
            (case C-40/17), which deals with informed consent and social media plugins, similar to
            the ones mentioned earlier in the research conducted by the Dutch Broadcasting
            Foundation NOS on political websites.
          </p>

          <p class="mb-4">
            In 2010, the predecessor of the European Data Protection Board, the Article 29 Working
            Party, already concluded in its Opinion on online behavioral advertising that – quote:
            "when a data subject clicks through on an ad and visits the advertisers' website, the
            advertiser can track which campaign resulted in the click-through. Suppose the
            advertiser captures the targeting information (e.g., certain demographic data such as
            "young mothers" or an interest group such as "extreme sports fan") and combines it with
            the data subject's onsite surfing behavior or registration data. In that case, the
            advertiser is an independent data controller for this data processing part." End of
            quote. The same is true for capturing information about a website visitor on a political
            party website. I think you may agree that visiting a political website in the weeks
            before a National Parliamentary Election only elevates the sensitivity of the data
            points, especially since websites of political parties cannot be viewed in isolation.
          </p>

          <p class="mb-4">
            Outside of publishers and advertisers, I now turn to the social media platforms. All
            parties in the research conducted by the Dutch Broadcasting Foundation NOS have a
            presence on social media platforms. The impact on fundamental rights and privacy on
            platforms may be more significant than that caused by visiting single websites. This is
            due to network effects on the platform that can negatively impact entire groups and
            amplify societal harms, for example, by contributing to disinformation campaigns or
            discriminating against certain groups. Online platforms are susceptible to such
            practices, presenting a higher societal risk.
          </p>

          <p class="mb-4">
            It is this fundamental risk in a democratic society that led to strict rules for
            advertising in the Digital Services Act. It is this risk to our democracy that led the
            European legislators to draw lines in the sand with an explicit prohibition on using
            special categories of personal data in targeted advertising. Earlier this year, a group
            of researchers at Meta published a paper titled:
            <a
              href="https://arxiv.org/abs/2306.03293"
              class="hover:text-[#ffcc00] transition-colors !p-0"
              target="_blank"
              rel="noopener noreferrer"
            >
              "Towards Fairness in Personalized Ads Using Impression Variance Aware Reinforcement
              Learning."
            </a>
            <i class="fa-solid fa-external-link fa-sm text-gray-600" aria-hidden="true"></i>
            The authors aim to address the principle of fairness in personalized advertising. The
            objective is to minimize algorithmic bias and ensure that the delivery of ads is fair
            across different demographic groups without compromising privacy.
          </p>

          <p class="mb-4">
            To better understand the ethical aspects, I will explain three core concepts the authors
            used. First, Equal Opportunity. This is about the principle that individuals who qualify
            for a desirable outcome should have an equal chance of being correctly classified for
            that outcome. In the context of fairness in advertising systems, this means that if an
            individual is part of the target audience for an ad, their personal characteristics,
            such as race or gender, should not influence whether they are shown the ad. In simple
            terms, if two individuals are equally suitable for a political advertisement, they
            should have the same likelihood of seeing the political ad, regardless of their
            backgrounds.
          </p>

          <p class="mb-4">
            Second, Demographic Parity. This refers to a concept that suggests a predictor (like an
            algorithm) should be independent of sensitive attributes (like race or gender). For a
            prediction to satisfy demographic parity, the probability of a positive outcome (like
            being shown an ad) should be the same regardless of these sensitive attributes. In other
            words: Demographic Parity refers to the outcome of a prediction (like whether or not
            someone is shown an ad) being uncorrelated with sensitive data points. It requires the
            proportion of each demographic group receiving the ad to be the same.
          </p>

          <p class="mb-4">
            Third, Equitable Outcomes. This refers to a fairness principle where an algorithm's
            outcome respects the context's qualitative aspects. This means that even if the
            probability of receiving an ad impression is equal across different groups, it should
            also be relevant and valuable to the individuals receiving it. The ethical principle
            goes beyond equal opportunity and demographic parity by ensuring that the actual receipt
            of ads (the outcomes) is fair, even beyond the initial qualification or targeting
            criteria. This means that ads are delivered to users regardless of their demographic
            group if they have shown interest in the advertised category.
          </p>

          <p class="mb-4">
            The authors' work demonstrates the critical connection between ethics and
            microtargeting. The work connects these three concepts by trying to design a system that
            adjusts the distribution of ad impressions to align with these fairness principles. The
            authors propose a methodology to ensure the ads reach a diverse audience fairly and
            justly without being biased towards or against any particular group. In my view, this is
            a great example of a new path forward for online advertising.
          </p>

          <p class="mb-4">
            In closing, I hope this talk contributes to the beginning of an answer to the question:
            What is the critical connection between ethics and ad technology? I hope it contributes
            to ethical data practices in online advertising. Such a commitment extends beyond mere
            compliance with legal standards; it's about upholding the values of privacy, fairness,
            and democracy in our increasingly digital world.
          </p>

          <p class="mb-4">Thank you for your attention.</p>

          <div class="bg-gray-100 p-6 rounded-lg mt-8">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">
              Update: Key Developments Since the EDAA Summit
            </h2>

            <p class="mb-4">
              Two significant developments have occurred since delivering this keynote that
              underscore the urgency and relevance of the ethical concerns I raised about
              microtargeting in political advertising.
            </p>

            <p class="mb-4">
              First, the Dutch Data Protection Authority (Autoriteit Persoonsgegevens) responded
              decisively to the cookie law violations I documented in my research with the Dutch
              Broadcasting Foundation NOS. In their
              <a
                href="https://nos.nl/collectie/13960/artikel/2497054-partijen-overtreden-cookiewet-met-plaatsen-volgcookies"
                class="hover:text-[#ffcc00] transition-colors !p-0"
                target="_blank"
                rel="noopener noreferrer"
              >
                official statement
              </a>
              <i class="fa-solid fa-external-link fa-sm text-gray-600" aria-hidden="true"></i>
              , the DPA declared: "Zonder iemands toestemming volg-cookies gebruiken, is absoluut
              niet toegestaan. We willen opheldering van deze politieke partijen." ("Using tracking
              cookies without someone's consent is absolutely not permitted. We want clarification
              from these political parties.") This firm stance validates the serious nature of the
              privacy violations we uncovered and demonstrates that regulatory authorities are
              taking these breaches of democratic trust seriously.
            </p>

            <p class="mb-4">
              Second, the European Union has enacted
              <a
                href="https://eur-lex.europa.eu/EN/legal-content/summary/transparency-and-targeting-of-political-advertising.html"
                class="hover:text-[#ffcc00] transition-colors !p-0"
                target="_blank"
                rel="noopener noreferrer"
              >
                Regulation (EU) 2024/900 on the transparency and targeting of political advertising
              </a>
              <i class="fa-solid fa-external-link fa-sm text-gray-600" aria-hidden="true"></i>
              , which becomes applicable on October 10, 2025. This landmark legislation directly
              addresses many of the ethical concerns I raised in my keynote. The regulation
              introduces strict transparency requirements, mandating that political advertisements
              clearly identify who paid for them and whether targeting techniques were used.
              Crucially, it prohibits the use of special categories of sensitive data—including
              political opinions and racial origin—for targeting political ads, and requires
              explicit, separate consent for any targeting based on personal data.
            </p>

            <p class="mb-0">
              These developments represent a significant step toward the ethical advertising
              practices I advocated for in my keynote.
            </p>
          </div>

          <BlogShareLinks :title="title" :url="pageUrl" />
        </div>
      </article>
    </main>

    <!-- Footer -->
    <tw-FooterMinimal />
  </div>
</template>

<script setup>
  // Define component name to satisfy multi-word rule
  defineOptions({
    name: 'MicrotargetingEthicsAdTechnologyPage',
  })

  // Enhanced SEO meta with comprehensive optimization
  const title = 'Microtargeting: On the Critical Connection Between Ethics and Ad-Technology'
  const description =
    'EDAA Summit 2023 keynote transcript on microtargeting ethics, featuring NOS research findings on Dutch political party cookie violations during the 2023 election and the implications for democratic processes.'
  const ogImage = '/assets/blog/rothko-abstracts/microtargeting-2023.svg'
  const pageUrl = 'https://blaeu.com/blog/microtargeting-ethics-ad-technology'
  const publishDate = '2023-11-14T00:00:00.000Z'

  // JSON-LD structured data for blog article
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
      'microtargeting',
      'political advertising',
      'digital advertising ethics',
      'cookie law violations',
      'GDPR compliance',
      'political privacy',
      'ad technology ethics',
      'Dutch Data Protection Authority',
      'EU Regulation 2024/900',
      'democratic processes',
    ],
    about: [
      {
        '@type': 'Thing',
        name: 'Political Microtargeting',
      },
      {
        '@type': 'Thing',
        name: 'Digital Advertising Ethics',
      },
      {
        '@type': 'Thing',
        name: 'Privacy in Political Campaigns',
      },
    ],
    mentions: [
      {
        '@type': 'Organization',
        name: 'Dutch Broadcasting Foundation NOS',
        description: 'Research partner on political party cookie violations',
      },
      {
        '@type': 'Organization',
        name: 'European Interactive Digital Advertising Alliance',
        url: 'https://edaa.eu',
        description: 'EDAA Summit 2023 organizer',
      },
      {
        '@type': 'Organization',
        name: 'Dutch Data Protection Authority',
        description: 'Regulatory authority responding to violations',
      },
    ],
    speakingEvent: {
      '@type': 'Event',
      name: 'EDAA Summit 2023',
      location: 'Brussels',
      startDate: '2023-11-14',
    },
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
          name: 'Microtargeting Ethics',
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
          'microtargeting, political advertising, digital advertising ethics, cookie law violations, GDPR compliance, ad technology ethics',
      },

      // Open Graph tags
      { property: 'og:type', content: 'article' },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:image', content: ogImage },
      { property: 'og:url', content: pageUrl },
      { property: 'og:site_name', content: 'Team Blaeu' },
      { property: 'article:published_time', content: publishDate },
      { property: 'article:author', content: 'Rob van Eijk' },
      { property: 'article:section', content: 'Digital Privacy' },
      { property: 'article:tag', content: 'Microtargeting' },
      { property: 'article:tag', content: 'Political Advertising' },
      { property: 'article:tag', content: 'Ad Technology Ethics' },

      // Twitter Card tags
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: ogImage },
      {
        name: 'twitter:image:alt',
        content: 'Microtargeting ethics in ad-technology abstract composition',
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
