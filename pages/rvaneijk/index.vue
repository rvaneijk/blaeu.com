<template>
  <div class="min-h-screen bg-gray-50">
    <tw-navbar />
    <!-- H1 tag -->
    <h1 class="sr-only">Rob van Eijk | Privacy Executive & Strategic Technology Leader</h1>
    <div class="pt-16">
      <tw-hero />
      <tw-SectionConnectorSolid />
      <tw-book />
      <tw-SectionConnectorSolid />
	  <twResearchHighlights :blogs="blogs" />
      <tw-SectionConnectorSolid />
      <twMediaHighlights class="mb-0" />
      <tw-footer />
   </div>
  </div>
</template>

<script setup>
import twNavbar from '~/components/tw-Navbar.vue';
import SectionConnectorSolid from '~/components/tw-SectionConnectorSolid.vue';
import twHero from '~/components/tw-Hero.vue';
import twExecutiveLeadership from '~/components/tw-ExecutiveLeadership.vue';
import twBook from '~/components/tw-Book.vue';
import twResearchHighlights from '~/components/tw-ResearchHighlights.vue';
import twMediaHighlights from '~/components/tw-MediaHighlights.vue';
import twBlogposts from '~/components/tw-Blogposts.vue';
import twCareerTimeline from '~/components/tw-CareerTimeline.vue';
import twFooter from '~/components/tw-Footer.vue';

// Enhanced description with executive focus and keywords
const description = 'Rob van Eijk - Senior privacy executive and C-suite advisor with expertise in data protection, regulatory affairs, and AI governance, specializing in privacy engineering.';
const ogTitle = 'Rob van Eijk | Privacy Executive & Technology Leader';
const profileImageWebp = 'https://blaeu.com/assets/img/rvaneijk-profile.webp';
const profileImageJpg = 'https://blaeu.com/assets/img/rvaneijk-profile.jpg'; // Fallback
const twitterCardWebp = profileImageWebp; // Use same image for Twitter
const twitterCardJpg = profileImageJpg; // Fallback
const mySite = 'https://blaeu.com/rvaneijk';

// JSON-LD structured data for personal brand with executive emphasis
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  'name': 'Rob van Eijk',
  'url': mySite,
  'image': profileImageJpg,
  'jobTitle': 'Founder & Managing Director Europe',
  'worksFor': [
    {
      '@type': 'Organization',
      'name': 'Team Blaeu',
      'url': 'https://blaeu.com'
    },
    {
      '@type': 'Organization',
      'name': 'Future of Privacy Forum',
      'url': 'https://fpf.org'
    }
  ],
  'description': description,
  'knowsAbout': [
    'Privacy Leadership',
    'Regulatory Strategy',
    'Data Protection',
    'Privacy by Design',
    'AI Governance',
    'Executive Management',
    'Privacy Engineering',
    'GDPR Compliance',
    'Data Ethics',
    'Online Privacy',
    'AdTech',
    'AI Ethics',
    'Real-Time Bidding',
    'Machine Learning',
    'Online Tracking Technologies',
    'De-identification Techniques',
    'Data Anonymization',
    'Privacy by Design',
    'Data Protection Law'
  ],
  'alumniOf': [
    {
      '@type': 'CollegeOrUniversity',
      'name': 'Leiden University'
    },
    {
      '@type': 'CollegeOrUniversity',
      'name': 'TU Delft'
    }
  ],
  // Social media profiles from footer
  'sameAs': [
    'https://www.linkedin.com/in/rvaneijk88',
    'https://bsky.app/profile/rvaneijk.bsky.social',
    'https://mastodon.nl/@rvaneijk',
    'https://orcid.org/0000-0002-2203-6819',
    'https://scholar.google.nl/citations?user=p4VBH-4AAAAJ',
    'https://github.com/rvaneijk',
    'https://fpf.org/person/rob-van-eijk/'
  ],
  'email': 'rob@blaeu.com',
  'hasOccupation': {
    '@type': 'Occupation',
    'name': 'Privacy Executive',
    'occupationCategory': 'Executive Leadership',
    'skills': 'Privacy Engineering, Technology Governance, AI Ethics, Data Strategy'
  },
  'author': [
    {
      '@type': 'Book',
      'name': 'Web Privacy Measurement in Real-Time Bidding Systems',
      'url': 'https://ssrn.com/abstract=3319284',
      'datePublished': '2019',
      'publisher': {
        '@type': 'Organization',
        'name': 'Leiden University'
      },
      'description': 'Research on privacy engineering, data protection, and online tracking technologies in Real-Time Bidding systems',
      'sameAs': 'https://scholar.google.nl/citations?view_op=view_citation&hl=nl&user=p4VBH-4AAAAJ&citation_for_view=p4VBH-4AAAAJ:roLk4NBRz8UC',
      'citation': 10
    }
  ],
  // Research Publications from the tabs shown in your document + Google Scholar metrics
  'publication': [
    {
      '@type': 'ScholarlyArticle',
      'headline': 'The impact of user location on cookie notices (inside and outside of the European Union)',
      'datePublished': '2019',
      'publisher': {
        '@type': 'Organization',
        'name': 'Workshop on Technology and Consumer Protection (ConPro 19)'
      },
      'author': [
        {
          '@type': 'Person',
          'name': 'Rob van Eijk'
        },
        {
          '@type': 'Person',
          'name': 'Hadi Asghari'
        },
        {
          '@type': 'Person',
          'name': 'Philipp Winter'
        },
        {
          '@type': 'Person',
          'name': 'Arvind Narayanan'
        }
      ],
      'url': 'https://ssrn.com/abstract=3361360',
      'sameAs': 'https://scholar.google.nl/citations?view_op=view_citation&hl=nl&user=p4VBH-4AAAAJ&citation_for_view=p4VBH-4AAAAJ:Se3iqnhoufwC',
      'citation': 54
    },
    {
      '@type': 'ScholarlyArticle',
      'headline': 'A constraint-based approach to context',
      'datePublished': '2013',
      'publisher': {
        '@type': 'Organization',
        'name': 'Modeling and Using Context. CONTEXT 2013'
      },
      'author': [
        {
          '@type': 'Person',
          'name': 'A. van Wissen'
        },
        {
          '@type': 'Person',
          'name': 'B. Kamphorst'
        },
        {
          '@type': 'Person',
          'name': 'Rob van Eijk'
        }
      ],
      'url': 'https://doi.org/10.1007/978-3-642-40972-1_13',
      'sameAs': 'https://scholar.google.nl/citations?view_op=view_citation&hl=nl&user=p4VBH-4AAAAJ&citation_for_view=p4VBH-4AAAAJ:u-x6o8ySG0sC',
      'citation': 28
    },
    {
      '@type': 'ScholarlyArticle',
      'headline': 'Confidential Computing and Privacy: Policy Implications of Trusted Execution Environments',
      'datePublished': '2024-07',
      'publisher': {
        '@type': 'Organization',
        'name': 'Future of Privacy Forum'
      },
      'author': [
        {
          '@type': 'Person',
          'name': 'S. Adams'
        },
        {
          '@type': 'Person',
          'name': 'S. Gray'
        },
        {
          '@type': 'Person',
          'name': 'A. Massey'
        },
        {
          '@type': 'Person',
          'name': 'Rob van Eijk'
        }
      ],
      'url': 'https://fpf.org/wp-content/uploads/2024/07/FPF-Confidential-Computing-Digital.pdf'
    },
    {
      '@type': 'ScholarlyArticle',
      'headline': 'Technologist Roundtable: Key Issues in AI and Data Protection',
      'datePublished': '2024-12',
      'publisher': {
        '@type': 'Organization',
        'name': 'Future of Privacy Forum'
      },
      'author': [
        {
          '@type': 'Person',
          'name': 'Rob van Eijk'
        },
        {
          '@type': 'Person',
          'name': 'S. Gray'
        },
        {
          '@type': 'Person',
          'name': 'M. Smith'
        }
      ],
      'url': 'https://fpf.org/wp-content/uploads/2024/12/Post-Event-Summary-and-Takeaways-_-FPF-Roundtable-on-AI-and-Privacy-1-2.pdf'
    },
    {
      '@type': 'ScholarlyArticle',
      'headline': 'Microtargeting: On the critical connection between ethics and ad-technology',
      'datePublished': '2023',
      'author': [
        {
          '@type': 'Person',
          'name': 'Rob van Eijk'
        }
      ],
      'url': 'https://www.linkedin.com/pulse/microtargeting-critical-connection-between-ethics-rob-van-eijk-igeye'
    }
  ],
  'memberOf': [
    {
      '@type': 'ProfessionalService',
      'name': 'Media Expert',
      'description': 'Regular speaker at privacy and technology conferences including CPDP.ai, IAPP, and forums worldwide',
      'sameAs': 'https://www.youtube.com/watch?v=cPhl2P-It4E'
    },
    {
      '@type': 'ProfessionalService',
      'name': 'Keynote Speaker', 
      'description': 'Delivers expert presentations at industry conferences and regulatory bodies across Europe',
      'sameAs': 'https://edaasummit.eu/#1694528110173-a34d43f9-e572'
    },
    {
      '@type': 'ProfessionalService',
      'name': 'Professional Trainer',
      'description': 'Developer and instructor for professional training on privacy, adtech, machine learning, and data protection topics',
      'sameAs': 'https://fpf.org/training/'
    },
    {
      '@type': 'EducationalOrganization',
      'name': 'Academic Instructor',
      'description': 'Guest professor and instructor in academic programs focusing on law, technology, and privacy topics at Leiden University, and others',
      'sameAs': 'https://www.universiteitleiden.nl/en/events/2024/02/elaw-summer-school-regulating-ai-and-data-in-the-age-of-eu-digital-reforms---24-28-june-leiden'
    }
  ],
  'subjectOf': [
    {
      '@type': 'CreativeWork',
      'name': 'Media Mentions',
      'description': 'Quoted in publications including The New York Times, Bloomberg, POLITICO, Euronews, MLEX, and NOS',
      'sameAs': 'https://www.thedrum.com/news/2024/10/25/adland-alert-linkedin-pinterest-come-under-legal-fire-ad-tracking-practices'
    }
  ],
  'affiliation': [
    {
      '@type': 'Organization',
      'name': 'Alpine Privacy Days Program Committee',
      'description': 'Active participation in program committee for privacy conferences',
      'sameAs': 'https://www.alpineprivacydays.net'
    },
    {
      '@type': 'Organization',
      'name': 'Brussels Privacy Symposium Program Committee',
      'description': 'Active participation in program committee for privacy symposia',
      'sameAs': 'https://fpf.org/fpf-event/brussels-privacy-symposium-2025/'
    },
    {
      '@type': 'Organization',
      'name': 'W3C Working Groups',
      'description': 'Participation in standardization working groups for privacy technologies',
      'sameAs': 'https://www.w3.org/invited-experts/list/?initial=v'
    }
  ],
  'teaches': [
    {
      '@type': 'Course',
      'name': 'Leiden Legal Technologies Program',
      'provider': {
        '@type': 'Organization',
        'name': 'Leiden University'
      },
      'sameAs': 'https://www.leidenlawconference.nl/legal-courses/2024/elaw-summer-school-2024-regulating-ai-and-data-in-the-age-of-eu-digital-reforms/'
    }
  ],
  'award': [
    {
      '@type': 'Thing',
      'name': 'Google Scholar Citations',
      'description': '96 total citations, h-index: 3, i10-index: 3',
      'sameAs': 'https://scholar.google.nl/citations?user=p4VBH-4AAAAJ'
    }
  ],
  'breadcrumb': {
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Home',
        'item': 'https://blaeu.com'
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': 'Rob van Eijk',
        'item': 'https://blaeu.com/rvaneijk'
      }
    ]
  }
};

useHead({
  htmlAttrs: { lang: 'en' },
  charset: 'utf-8',
  title: 'Rob van Eijk | Privacy Executive & Technology Leader',
  meta: [
    // Basic meta tags
    { name: 'description', content: description },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'author', content: 'Rob van Eijk' },
    { name: 'robots', content: 'index, follow' },
    
    // Open Graph Profile tags
    { property: 'og:site_name', content: mySite },
    { property: 'og:type', content: 'profile' },
    { property: 'og:url', content: mySite },
    { property: 'og:title', content: ogTitle },
    { property: 'og:description', content: description },
    { property: 'og:profile:first_name', content: 'Rob' },
    { property: 'og:profile:last_name', content: 'van Eijk' },
    { property: 'og:profile:username', content: 'rvaneijk' },
    { property: 'og:profile:gender', content: 'male' },
    
    // Open Graph Image tags with WebP and JPG fallbacks
    { property: 'og:image', content: profileImageWebp },
    { property: 'og:image:alt', content: 'Rob van Eijk - Privacy Executive & Technology Leader' },
    { property: 'og:image:type', content: 'image/webp' },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:image', content: profileImageJpg },
    { property: 'og:image:type', content: 'image/jpeg' },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:locale', content: 'en_US' },
    
    // Twitter Card tags with WebP and JPG fallbacks
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: ogTitle },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: twitterCardWebp },
    { name: 'twitter:image:alt', content: 'Rob van Eijk - Privacy Executive' },
    { name: 'twitter:image', content: 'https://blaeu.com/assets/img/rvaneijk-profile.jpg' },
    { name: 'twitter:image:width', content: '1200' },
    { name: 'twitter:image:height', content: '630' },
    
    // Mastodon verification
    { name: 'mastodon:creator', content: '@rvaneijk@mastodon.nl' },
    { name: 'mastodon:verified', content: 'true' },
    
    // Enhanced professional categories and expertise keywords
    { name: 'keywords', content: 'privacy executive, managing director, data protection officer, strategic leadership, C-suite advisor, board advisory, Rob van Eijk, regulatory affairs, technology governance, AI ethics, data strategy, privacy engineering, GDPR expert, responsible innovation, online privacy, adtech, keynote speaker, privacy consultant, W3C working groups, real-time bidding, web privacy measurement, data anonymization, de-identification, cookie notices, user location impact' },
    
    // Research highlights meta tags
    { property: 'article:tag', content: 'privacy technology' },
    { property: 'article:tag', content: 'data protection' },
    { property: 'article:tag', content: 'AI governance' },
    { property: 'article:tag', content: 'privacy engineering' },
    { property: 'article:tag', content: 'real-time bidding' },
    { property: 'article:tag', content: 'online tracking technologies' },
    { property: 'article:tag', content: 'cookie notices' },
    { property: 'article:tag', content: 'user location impact' },
    { property: 'article:tag', content: 'context-based approach' },
    { property: 'article:tag', content: 'confidential computing' },
    
    // Publication and professional experience tags
    { property: 'book:author', content: 'Rob van Eijk' },
    { property: 'book:isbn', content: 'Web Privacy Measurement in Real-Time Bidding Systems' },
    { property: 'book:release_date', content: '2019' },
    
    // Academic and educational tags
    { property: 'education:school', content: 'Leiden University' },
    { property: 'education:field_of_study', content: 'Privacy Engineering' },
    
    // Professional activities
    { property: 'profession:role', content: 'Keynote Speaker' },
    { property: 'profession:role', content: 'Media Expert' },
    { property: 'profession:role', content: 'Panel Expert' },
    { property: 'profession:role', content: 'Academic Instructor' },
    { property: 'profession:role', content: 'Professional Trainer' },
    { property: 'profession:role', content: 'Program Committee Member' },
    
    // Media presence tags
    { property: 'media:featured_in', content: 'The New York Times' },
    { property: 'media:featured_in', content: 'Bloomberg' },
    { property: 'media:featured_in', content: 'POLITICO' },
    { property: 'media:featured_in', content: 'Euronews' },
    { property: 'media:featured_in', content: 'The Drum' },
    
    // Research Publication Tags
    { property: 'article:published_time', content: '2024-12-01' }, // For the latest paper
    { property: 'article:author', content: 'Rob van Eijk' },
    
    // Google Scholar metrics
    { property: 'scholar:citations', content: '96' },
    { property: 'scholar:h_index', content: '3' },
    { property: 'scholar:i10_index', content: '3' },
    
    // Preloading hints for performance
    { property: 'resource:priority', content: 'high' },
    
    // Expertise areas mentioned in UI
    { property: 'expertise:area', content: 'Privacy Leadership' },
    { property: 'expertise:area', content: 'Privacy by Design' },
    { property: 'expertise:area', content: 'Data Protection' },
    { property: 'expertise:area', content: 'AI Ethics' },
    { property: 'expertise:area', content: 'AdTech' },
    { property: 'expertise:area', content: 'Web Privacy Measurement' },
    { property: 'expertise:area', content: 'De-identification Techniques' },
    { property: 'expertise:area', content: 'Cookie Notices Research' },
    { property: 'expertise:area', content: 'Confidential Computing' }
  ],
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    { rel: 'canonical', href: mySite },
    // Mastodon verification link
    { rel: 'me', href: 'https://mastodon.nl/@rvaneijk' },
    // Preload critical resources
    { rel: 'preload', href: profileImageWebp, as: 'image', type: 'image/webp' },
    // Link to profile's author page for improved author discoverability
    { rel: 'author', href: 'https://blaeu.com/rvaneijk' },
    // Link to publications
    { rel: 'publication', href: 'https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3319284', title: 'Web Privacy Measurement in Real-Time Bidding Systems' },
    { rel: 'publication', href: 'https://ssrn.com/abstract=3361360', title: 'The impact of user location on cookie notices (inside and outside of the European Union)' },
    { rel: 'publication', href: 'https://doi.org/10.1007/978-3-642-40972-1_13', title: 'A constraint-based approach to context' },
    // Scholar profile
    { rel: 'me', href: 'https://scholar.google.nl/citations?user=p4VBH-4AAAAJ', title: 'Google Scholar Profile' },
    // Links to research categories
    { rel: 'related', href: 'https://blaeu.com/rvaneijk/research/ai-data-protection', title: 'AI and Data Protection Research' },
    { rel: 'related', href: 'https://blaeu.com/rvaneijk/research/adtech', title: 'AdTech Research' },
    { rel: 'related', href: 'https://blaeu.com/rvaneijk/research/privacy-engineering', title: 'Privacy Engineering Research' }
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(jsonLd)
    }
  ]
});
</script>

<script>
  import { ref } from 'vue';
  import blogPosts from "/assets/content.json";

  // Using a ref to make the blogs reactive
  const blogs = ref(blogPosts);

  export default {
    components: {
      twBlogposts, // Referenced component name
    }
  };
</script>

<style>
/* Improve core web vitals with better text rendering */
body {
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Improve accessibility for focus states */
:focus-visible {
  outline: 2px solid #ffcc00;
  outline-offset: 2px;
}
</style>