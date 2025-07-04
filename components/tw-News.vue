<!-- 
  @component tw-News
  @description Curated thought leadership section for landing page business development.
  Features 3-4 most impactful recent items with clear CTA to comprehensive archive.
  @example
  <tw-News />
-->
<template>
  <section id="news" class="py-16 bg-gray-50 font-amblelight" aria-labelledby="news-heading">
    <div class="container mx-auto px-4">
      <!-- Section header -->
      <div class="text-center mb-12">
        <h2 id="news-heading" class="text-3xl font-bold text-gray-900 mb-4">
          Recent Insights & Thought Leadership
        </h2>
        <p class="text-lg text-gray-600 max-w-3xl mx-auto">
          Shaping the conversation in AI, privacy, and security.
        </p>
      </div>

      <!-- Curated highlights grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
        
        <!-- Featured Research: AI Agents -->
        <article class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border-l-4 border-blue-600">
          <div class="flex items-start justify-between mb-3">
            <time datetime="2025-01-01" class="text-sm text-blue-800 font-semibold">
              2025
            </time>
            <span class="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
              Research
            </span>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-3 leading-tight">
            <a 
              href="https://fpf.org/blog/minding-mindful-machines-ai-agents-and-data-protection-considerations/" 
              target="_blank" 
              class="hover:text-blue-600 transition-colors duration-200"
              title="Read full research paper"
            >
              AI Agents & Data Protection Considerations
            </a>
          </h3>
          <p class="text-gray-600 text-sm mb-4">
            Co-authored research analyzing privacy implications of AI agents and regulatory compliance frameworks.
          </p>
          <div class="flex items-center justify-between">
            <span class="text-xs text-gray-500">
              Future of Privacy Forum
            </span>
            <a 
              href="https://fpf.org/blog/minding-mindful-machines-ai-agents-and-data-protection-considerations/" 
              target="_blank"
              class="text-blue-600 hover:text-blue-800 text-sm font-medium inline-flex items-center"
            >
              Read more<span class="sr-only"> about AI Agents & Data Protection Considerations research</span>
              <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </article>

        <!-- High-Profile Media: NOS Coverage -->
        <article class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border-l-4 border-red-600">
          <div class="flex items-start justify-between mb-3">
            <time datetime="2025-06-01" class="text-sm text-red-800 font-semibold">
              2025
            </time>
            <span class="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">
              Media
            </span>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-3 leading-tight">
            <a 
              href="https://nos.nl/artikel/2569805-onderzoekers-facebook-en-instagram-gebruikten-spionagetrucje-op-android-smartphones" 
              target="_blank" 
              class="hover:text-blue-600 transition-colors duration-200"
              title="Read NOS coverage"
            >
              Facebook/Instagram Research Coverage
            </a>
          </h3>
          <p class="text-gray-600 text-sm mb-4">
            Expert commentary on Facebook and Instagram tracking practices featured in major Dutch public broadcaster NOS.
          </p>
          <div class="flex items-center justify-between">
            <span class="text-xs text-gray-500">
              NOS Dutch Public Broadcasting
            </span>
            <a 
              href="https://nos.nl/artikel/2569805-onderzoekers-facebook-en-instagram-gebruikten-spionagetrucje-op-android-smartphones" 
              target="_blank"
              class="text-blue-600 hover:text-blue-800 text-sm font-medium inline-flex items-center"
            >
              Read more<span class="sr-only"> about Facebook/Instagram Research Coverage on NOS</span>
              <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </article>

        <!-- Significant Speaking: OECD Paris -->
        <article class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border-l-4 border-purple-600">
          <div class="flex items-start justify-between mb-3">
            <time datetime="2025-03-01" class="text-sm text-purple-800 font-semibold">
              2025
            </time>
            <span class="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">
              Speaking
            </span>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-3 leading-tight">
            <a 
              href="https://www.linkedin.com/pulse/opening-remarks-evolution-consent-technologies-rob-van-eijk-7i8ne" 
              target="_blank" 
              class="hover:text-blue-600 transition-colors duration-200"
              title="View speaking engagement details"
            >
              OECD Consent Technologies Roundtable
            </a>
          </h3>
          <p class="text-gray-600 text-sm mb-4">
            Keynote moderation of OECD roundtable on emerging consent practices in the digital ecosystem, Paris.
          </p>
          <div class="flex items-center justify-between">
            <span class="text-xs text-gray-500">
              OECD Paris
            </span>
            <a 
              href="https://www.linkedin.com/pulse/opening-remarks-evolution-consent-technologies-rob-van-eijk-7i8ne" 
              target="_blank"
              class="text-blue-600 hover:text-blue-800 text-sm font-medium inline-flex items-center"
            >
              Read more<span class="sr-only"> about OECD Consent Technologies Roundtable</span>
              <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </article>

        <!-- Technical Implementation -->
        <article class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border-l-4 border-green-600">
          <div class="flex items-start justify-between mb-3">
            <time datetime="2025-02-01" class="text-sm text-green-800 font-semibold">
              2025
            </time>
            <span class="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
              Technical
            </span>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-3 leading-tight">
            <a 
              href="https://github.com/rvaneijk/url-checker-sanitized/blob/main/doc/blog.md" 
              target="_blank" 
              class="hover:text-blue-600 transition-colors duration-200"
              title="Read technical implementation"
            >
              AI-Learning: Email Security System
            </a>
          </h3>
          <p class="text-gray-600 text-sm mb-4">
            Hands-on AI implementation demonstrating enterprise-grade email security systems and best practices.
          </p>
          <div class="flex items-center justify-between">
            <span class="text-xs text-gray-500">
              Technical blog
            </span>
            <a 
              href="https://github.com/rvaneijk/url-checker-sanitized/blob/main/doc/blog.md" 
              target="_blank"
              class="text-blue-600 hover:text-blue-800 text-sm font-medium inline-flex items-center"
            >
              Read more<span class="sr-only"> about AI-Learning Email Security System implementation</span>
              <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </article>
      </div>

      <!-- Strategic View All CTA -->
      <div class="text-center">
        <div class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 max-w-2xl mx-auto">
          <p class="text-gray-600 mb-6">
            Explore the complete collection of research publications, media coverage, speaking engagements, and expert panel participation.
          </p>
          <a 
            href="/rvaneijk#media" 
            class="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            Explore All Publications & Appearances
            <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// No JavaScript needed for curated static content
</script>

<style scoped>
/* Clean, focused styling for business development landing page */
.line-clamp-3 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>