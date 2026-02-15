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
          <BlogBreadcrumbs title="Addressing Bias in AI Systems" />
          <h1 class="text-4xl font-bold text-gray-900 mb-4 leading-tight">
            Addressing Bias in AI Systems: A Holistic Approach to Detection, Reporting, and
            Mitigation
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
              <span>October 2023</span>
            </div>
            <div class="flex items-center gap-2">
              <i class="fas fa-users fa-sm text-gray-400"></i>
              <span>FPF PPML Workshop</span>
            </div>
            <div class="flex items-center gap-2">
              <i class="fas fa-clock fa-sm text-gray-400"></i>
              <span>9 min read</span>
            </div>
          </div>
        </header>

        <!-- Hero Image: AI-generated Rothko Abstract -->
        <div class="mb-8">
          <img
            src="/assets/blog/rothko-abstracts/addressing-bias-ai-systems-2023.svg"
            alt="AI-generated Rothko-inspired abstract composition representing bias detection in AI systems"
            class="w-full h-64 object-contain rounded-lg"
            width="1200"
            height="400"
          />
          <p class="blog-caption text-xs text-gray-500 mt-2 italic">
            <strong>Figure 1.</strong>
            This Rothko-inspired abstract composition represents addressing bias in AI systems
            through holistic methodology. The
            <span class="text-blue-600 font-medium">systematic blue foundation</span>
            symbolizes comprehensive analysis and methodical assessment frameworks,
            <span class="text-yellow-700 font-medium">central golden areas</span>
            represent successful bias detection and mitigation achievements, while
            <span class="text-teal-700 font-medium">inclusive teal fields</span>
            express intersectionality considerations and the multidimensional approach needed for
            fair AI system evaluation.
          </p>
        </div>

        <BlogTableOfContents />

        <!-- Article Content -->
        <div class="prose prose-lg max-w-none">
          <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Summary</h2>

          <p class="mb-4">
            This blog post summarizes insights from a Future of Privacy Forum workshop on Privacy
            Preserving Machine Learning (PPML) held on May 25, 2023, where experts from Holistic AI
            presented on performing bias assessments in AI systems. The post explores practical
            approaches to identifying and addressing unfair treatment in machine learning
            applications used in recruitment, judicial systems, and other critical domains.
          </p>

          <p class="mb-4">
            The content covers five key questions for bias assessment, a three-phase cyclical
            framework (assessment, reporting, and mitigation), and the challenges posed by data
            collection regulations like GDPR and NYC Local Law 144. Special attention is given to
            intersectionality considerations and the trade-offs between performance, privacy, and
            fairness in AI system development.
          </p>

          <div class="bg-gray-100 p-6 rounded-lg mt-8">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">Key Takeaways:</h2>
            <ol class="list-decimal pl-6 space-y-2">
              <li>
                <strong>Bias in AI:</strong>
                Bias, as defined in this context, refers to the unfair treatment of individuals or
                groups by AI systems. Bias can be introduced through inappropriate training data, a
                poor training pipeline, or a discriminatory interface.
              </li>
              <li>
                <strong>Key Questions:</strong>
                To better understand potential bias, five key questions were proposed: What is the
                data's provenance? How representative is the data? Is the data balanced? Has
                intersectionality been considered? Are sensitive attributes present in the data?
              </li>
              <li>
                <strong>Approach to Tackling Bias:</strong>
                A three-phase process - assessment, reporting, and mitigation - was presented to
                address bias in AI systems systematically. The process is cyclical to analyze and
                enhance AI system fairness continually.
              </li>
              <li>
                <strong>Trade-offs in Bias Mitigation:</strong>
                Addressing bias is a multifaceted challenge with potential trade-offs. Efforts to
                reduce bias could compromise system performance, privacy, and even other bias
                measures.
              </li>
              <li>
                <strong>Sensitive Data and Regulation Challenges:</strong>
                Sensitive attributes, like race, gender, and age, are often unavailable due to
                regulations or individuals' reluctance to provide such data. This absence, however,
                does not necessarily eliminate bias.
              </li>
              <li>
                <strong>Intersectionality:</strong>
                The importance of considering intersectionality was highlighted as demographic data
                alone often overlooks intersectional attributes, which may lead to further bias in
                AI systems.
              </li>
              <li>
                <strong>Impact of Legislation:</strong>
                Laws such as the New York City Local Law 144 and the GDPR in Europe have significant
                impacts on how data, especially sensitive attributes, is collected and used,
                affecting the bias in AI systems.
              </li>
            </ol>
          </div>

          <p class="mb-4">
            On 25 May 2023, the
            <a
              href="https://fpf.org/"
              class="hover:text-[#ffcc00] transition-colors !p-0"
              target="_blank"
              rel="noopener noreferrer"
            >
              Future of Privacy Forum
            </a>
            <i class="fa-solid fa-external-link fa-sm text-gray-600" aria-hidden="true"></i>
            organized a workshop on the state-of-play of Privacy Preserving Machine Learning (PPML).
            <a
              href="https://www.linkedin.com/in/lindsaylevinecarignan/"
              class="hover:text-[#ffcc00] transition-colors !p-0"
              target="_blank"
              rel="noopener noreferrer"
            >
              Lindsay Levine Carignan
            </a>
            <i class="fa-solid fa-external-link fa-sm text-gray-600" aria-hidden="true"></i>
            , Head of Customer Success at Holistic AI, and
            <a
              href="https://www.linkedin.com/in/nigel-kingsman-9138621/"
              class="hover:text-[#ffcc00] transition-colors !p-0"
              target="_blank"
              rel="noopener noreferrer"
            >
              Nigel Kingsman
            </a>
            <i class="fa-solid fa-external-link fa-sm text-gray-600" aria-hidden="true"></i>
            AI Audit and Assurance Office at Holistic AI took the floor with a presentation on the
            question: how to perform a bias assessment? This post summarizes what I learned from the
            presenters while preparing and moderating the workshop. The presenters were tasked to
            explain a complex technical topic to a non-technical audience. In passing, I will
            elaborate on some of the key concepts presented.
          </p>

          <h2 class="text-2xl font-bold text-gray-900 mt-12 pt-8 border-t border-gray-200 mb-4">
            What is Bias?
          </h2>

          <p class="mb-4">
            Bias, as defined in this write-up, is looking at the risk that the system treats
            individuals or groups unfairly. For example, when using machine learning in applications
            like recruitment or the judicial system. In these cases, it is especially important to
            ensure that algorithms do not discriminate and, instead, treat everyone equally.
            Artificial Intelligence (AI) systems can exhibit bias due to, e.g., inappropriate
            training data, a poor training pipeline, or a discriminatory interface.
          </p>

          <h2 class="text-2xl font-bold text-gray-900 mt-12 pt-8 border-t border-gray-200 mb-4">
            Key Questions to Ask a Data Scientist about Potential Bias
          </h2>

          <p class="mb-4">
            To better understand potential bias, Carignan suggested learning about algorithmic
            aspects, e.g., (1) data provenance (origin), (2) representativeness (does it reflect the
            population), and (3) balance (are score categories representative). Also, it is
            essential to know (4) whether intersectionality was considered and (5) whether sensitive
            attributes were present in the data at all. These aspects help people without a
            technical background in machine learning to initiate a conversation with data scientists
            about algorithms. We arrived at the following five example questions to start a
            discussion on bias:
          </p>

          <ul class="list-disc pl-6 mb-6">
            <li>What is the provenance of data?</li>
            <li>How representative is the data?</li>
            <li>Is the data balanced?</li>
            <li>Has intersectionality been considered?</li>
            <li>Are sensitive attributes present in the data?</li>
          </ul>

          <p class="mb-4">
            Below, we will explore how to perform a bias assessment with these example questions in
            mind.
          </p>

          <h2 class="text-2xl font-bold text-gray-900 mt-12 pt-8 border-t border-gray-200 mb-4">
            Performing a Bias Assessment
          </h2>

          <p class="mb-4">
            Kingsman offered an insightful view of addressing bias in AI systems and the trade-offs
            involved in this process. He argued that tackling bias is not only essential but also
            challenging and multifaceted, as it can potentially affect system performance, privacy,
            and even other bias measures. He explored the various strategies employed by Holistic AI
            in addressing biases in AI systems. The procedure was divided into three primary phases:
            (1) assessment, (2) reporting, and (3) mitigation. These phases are part of a cyclic
            process that aims to analyze and enhance AI systems' fairness continually, from its
            detection to reporting and mitigation. The holistic cycle ensures constant evaluation
            and enhancement of AI systems to reduce bias and improve fairness.
          </p>

          <h3 class="text-xl font-semibold text-gray-900 mt-6 mb-3">Phase 1: Assessment</h3>

          <p class="mb-4">
            In the assessment phase, Kingsman explained how he discovered potential biases by
            leveraging expert reviews and technical analysis. Here, experts meticulously study the
            system's function, application context, and stakeholders involved, while technical
            analysis includes simulating datasets to highlight biased behaviors in the AI system.
          </p>

          <p class="mb-4">
            Kingsman stressed that, in some cases, direct access to the client's model is
            advantageous for testing across a more comprehensive dataset.
          </p>

          <p class="mb-4">
            He delved into two main paradigms of bias: (1) equality of outcome and (2) equality of
            opportunity. The former looks at prediction outcomes, whereas the latter considers
            conditioning assessments based on some features, such as qualifications in a recruitment
            context.
          </p>

          <p class="mb-4">
            More specifically, equality of outcome focuses on ensuring that the distribution of
            positive outcomes among different groups aligned with their respective application
            rates, irrespective of qualifications. On the other hand, equality of opportunity
            conditions bias assessment based on specific candidate attributes or qualifications.
          </p>

          <p class="mb-4">
            Kingsman emphasized that reducing bias did not come without trade-offs. He noted that
            system performance or efficacy often had to be compromised to minimize bias.
            Furthermore, debiasing could potentially lead to increased privacy risks because of the
            need to collect sensitive attributes to measure and reduce bias. He also warned that
            efforts to improve one bias measure might worsen another due to the many different bias
            measures that exist.
          </p>

          <p class="mb-4">
            He highlighted standard metrics such as Disparate Impact and Statistical Parity (for
            Equality of Outcome) and Equal Opportunity Difference and Average Odds Difference (for
            Equality of Opportunity). Let me remark on the difference between the two terms in each
            set of metrics. Disparate Impact identifies unintentional discrimination from neutral
            data processing, while Statistical Parity aims to equalize outcomes across demographic
            groups—however, neither guarantees complete fairness. Equal Opportunity Difference
            focuses on favorable outcomes (correct positive predictions), while Average Odds
            Difference considers both favorable and unfavorable outcomes (both correct and incorrect
            predictions).
          </p>

          <h3 class="text-xl font-semibold text-gray-900 mt-6 mb-3">Phase 2: Reporting</h3>

          <p class="mb-4">
            When discussing the reporting phase, Kingsman introduced two risk concepts: inherent and
            residual risks. The inherent risk represented risks the system might have without any
            technical mitigations or robust procedures, while residual risks were those that
            remained after implementing mitigations and procedures. An important goal was to lower
            each identified risk as much as possible by implementing appropriate procedures and
            technical mitigations.
          </p>

          <h3 class="text-xl font-semibold text-gray-900 mt-6 mb-3">Phase 3: Mitigation</h3>

          <p class="mb-4">
            Kingsman addressed mitigation strategies, focusing on how they can modify the machine
            learning pipeline in three phases: (a) pre-processing, (b) in-processing, and (c)
            post-processing. Pre-processing, such as oversampling data, is useful when the dataset
            is already biased. In-processing involves changing the model-building algorithm, which
            could be expensive as it requires model retraining. Post-processing is usually the
            cheapest method, as it involves changes after the model is trained, but it might be less
            effective.
          </p>

          <h3 class="text-xl font-semibold text-gray-900 mt-6 mb-3">
            Training Pipeline and System Accessibility
          </h3>

          <p class="mb-4">
            Kingsman also highlighted the significance of employing a robust training pipeline. He
            mentioned the importance of collecting samples accurately, using appropriate targets
            during training, and employing methods to decrease bias along the way. Additionally, he
            emphasized the often overlooked aspect of system accessibility, where assumptions about
            users' resources or language proficiency could result in discrimination against specific
            individuals.
          </p>

          <h2 class="text-2xl font-bold text-gray-900 mt-12 pt-8 border-t border-gray-200 mb-4">
            How Does Bias Manifest in AI Systems?
          </h2>

          <p class="mb-4">
            Lindsay Carignan's intervention focused on understanding bias in AI and the challenges
            posed by data collection methods and regulations. She (further) explored the
            limitations, challenges, and five key questions to ask when conducting a bias
            assessment.
          </p>

          <h3 class="text-xl font-semibold text-gray-900 mt-6 mb-3">Sensitive Data Collection</h3>

          <p class="mb-4">
            Carignan observed that sensitive attributes like race, gender, and age were often not
            readily available. This was due to restrictions like the General Data Protection
            Regulation (GDPR) or individuals' unwillingness to provide such data. When such data was
            collected, it usually represented a small subset of the total population, sometimes less
            than 1%.
          </p>

          <h3 class="text-xl font-semibold text-gray-900 mt-6 mb-3">
            Data Set Size and Intersectionality
          </h3>

          <p class="mb-4">
            Carignan explained that demographic data, like gender, was easier to collect, but
            intersectional attributes, e.g., a Black woman over 40, were more challenging due to
            reduced sample sizes. If you're looking at male-female, you start seeing a drop-off when
            it comes to ethnicity. For example, when using
            <a
              href="https://www.eeoc.gov/data/eeo-1-data-collection"
              class="hover:text-[#ffcc00] transition-colors !p-0"
              target="_blank"
              rel="noopener noreferrer"
            >
              EEOC categories
            </a>
            <i class="fa-solid fa-external-link fa-sm text-gray-600" aria-hidden="true"></i>
            (classifications used in an Equal Employment Opportunity Compliance report of employees'
            race, gender, and job classifications). She also highlighted underrepresentation in data
            sets, e.g., data on Native Americans, Pacific Islanders, or Hawaiian often accounted for
            less than 2% of the total.
          </p>

          <h3 class="text-xl font-semibold text-gray-900 mt-6 mb-3">
            Limitations of Bias Assessments
          </h3>

          <p class="mb-4">
            Bias assessments often have a narrow focus, meaning they could overlook other crucial
            aspects of AI systems such as efficacy (how well the model performed), privacy (how well
            the model protected user data), and robustness (how well the model handled different
            conditions or adversities). Additionally, optimizing a model for one bias metric may
            have negatively affected others, demonstrating the complexity and trade-offs involved in
            minimizing bias.
          </p>

          <p class="mb-4">
            Furthermore, Carignan pointed out that not collecting sensitive attribute data didn't
            necessarily remove bias since biased outcomes could still occur in their absence. She
            specifically highlighted the challenges posed by the availability of sensitive
            attributes and the impact of regulations such as (a) in the United States, the
            <a
              href="https://rules.cityofnewyork.us/rule/automated-employment-decision-tools-updated/"
              class="hover:text-[#ffcc00] transition-colors !p-0"
              target="_blank"
              rel="noopener noreferrer"
            >
              New York City Local Law 144 (NYC Local Law 144)
            </a>
            <i class="fa-solid fa-external-link fa-sm text-gray-600" aria-hidden="true"></i>
            as well as proposed legislation regarding automated employment decision tools in places
            like California, New Jersey, New York, and (b) (proposed) legislation regarding
            automated decisions in Europe under the GDPR and the proposed AI Act. In these cases,
            it's especially important to ensure that algorithms do not discriminate and instead
            treat everyone equally.
          </p>

          <p class="mb-4">
            The NYC Local Law 144 was mentioned as an example that affects the data sets obtained
            from vendors. She explained that, under this legislation, data sets often only contained
            sensitive attribute information for a small portion, sometimes as low as 20%, of the
            population. But often, it can even be under 1% of the total population that is going
            through their AI system containing sensitive attributes. Additionally, Carignan noted
            that NYC Local Law 144 initially focused on separate categories such as male, female,
            and different ethnicities but later recognized the importance of considering
            intersectionality to address bias effectively. In fact, a version of disparate impact is
            used by the NYC Local Law 144 (see Phase 1: Assessment – Equality of Outcome).
          </p>

          <p class="mb-4">
            In closing, I am grateful that
            <a
              href="https://www.cpdpconferences.org/"
              class="hover:text-[#ffcc00] transition-colors !p-0"
              target="_blank"
              rel="noopener noreferrer"
            >
              CPDP Conferences
            </a>
            <i class="fa-solid fa-external-link fa-sm text-gray-600" aria-hidden="true"></i>
            facilitated the recording of the workshop. You can
            <a
              href="https://www.youtube.com/watch?v=uzkgvRFFZjY"
              class="hover:text-[#ffcc00] transition-colors !p-0"
              target="_blank"
              rel="noopener noreferrer"
            >
              watch the workshop recording
            </a>
            <i class="fa-solid fa-external-link fa-sm text-gray-600" aria-hidden="true"></i>
            .
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
  // Define component name to satisfy multi-word rule
  defineOptions({
    name: 'AddressingBiasAiSystemsPage',
  })

  // Enhanced SEO meta with comprehensive optimization
  const title =
    'Addressing Bias in AI Systems: A Holistic Approach to Detection, Reporting, and Mitigation'
  const description =
    'Recap of the FPF workshop on bias assessment in AI systems, covering a three-phase framework for detection, reporting, and mitigation, intersectionality challenges, and the impact of GDPR and NYC Local Law 144.'
  const ogImage = '/assets/blog/rothko-abstracts/addressing-bias-ai-systems-2023.svg'
  const pageUrl = 'https://blaeu.com/blog/addressing-bias-ai-systems'
  const publishDate = '2023-05-25T00:00:00.000Z'

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
      'AI bias',
      'machine learning fairness',
      'algorithmic bias',
      'AI ethics',
      'bias detection',
      'AI assessment',
      'intersectionality',
      'GDPR AI',
      'NYC Local Law 144',
      'responsible AI',
    ],
    about: [
      {
        '@type': 'Thing',
        name: 'Algorithmic Bias Detection',
      },
      {
        '@type': 'Thing',
        name: 'Machine Learning Fairness',
      },
      {
        '@type': 'Thing',
        name: 'AI Ethics Assessment',
      },
    ],
    mentions: [
      {
        '@type': 'Person',
        name: 'Lindsay Levine Carignan',
        jobTitle: 'Head of Customer Success at Holistic AI',
      },
      {
        '@type': 'Person',
        name: 'Nigel Kingsman',
        jobTitle: 'AI Audit and Assurance Office at Holistic AI',
      },
      {
        '@type': 'Organization',
        name: 'Future of Privacy Forum',
        url: 'https://fpf.org',
      },
      {
        '@type': 'Organization',
        name: 'Holistic AI',
        description: 'AI bias assessment company',
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
          name: 'Addressing Bias in AI Systems',
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
          'AI bias, machine learning fairness, algorithmic bias, AI ethics, bias detection, intersectionality, GDPR AI, responsible AI',
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
      { property: 'article:section', content: 'AI Ethics' },
      { property: 'article:tag', content: 'AI Bias' },
      { property: 'article:tag', content: 'Machine Learning' },
      { property: 'article:tag', content: 'AI Ethics' },

      // Twitter Card tags
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: ogImage },
      { name: 'twitter:image:alt', content: 'Addressing Bias in AI Systems abstract composition' },
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
