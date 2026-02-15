<!--
 * @author Blaeu Privacy Response Team
 * @copyright Copyright © 2019 - 2025 Team Blaeu. Content is licensed under CC BY 4.0 unless otherwise noted. All Rights Reserved.
 * @license CC BY 4.0
-->
<template>
  <div class="mt-8 p-6 bg-gray-50 rounded-lg border-2 border-brand-grey">
    <h2 class="text-2xl font-bold text-gray-900 mb-6">
      About the "AI-Learning by Building" Series
    </h2>

    <p class="text-gray-700 leading-relaxed mb-6 text-sm">
      This post is part of my ongoing "AI-Learning by Building" series, where I explore practical AI
      applications through hands-on projects. Each project tackles different technical challenges
      using AI assistance to implement solutions that typically require specialized expertise.
    </p>

    <p class="text-gray-700 leading-relaxed mb-6 text-sm">
      While each project stands alone, they share a common approach: leveraging AI assistance to
      accelerate development and tackle sophisticated technical challenges. Throughout this series,
      AI consistently helps with algorithm implementation, debugging, configuration parsing, and
      testing approaches—enabling the creation of professional-grade solutions across domains.
    </p>

    <p class="text-gray-900 font-semibold mb-4 text-sm">Projects in this series include:</p>

    <ul class="space-y-3 mb-6 list-disc ml-6">
      <li v-for="project in projects" :key="project.id" class="text-gray-700 text-sm">
        <NuxtLink
          :to="project.url"
          class="hover:text-[#ffcc00] transition-colors font-semibold !p-0"
        >
          {{ project.title }}
        </NuxtLink>
        <span class="text-gray-600">– {{ project.description }}</span>
      </li>
    </ul>

    <p class="text-gray-700 leading-relaxed mb-6 text-sm">
      AI-Assisted Disclaimer: The ideas in my writing are my own. I used Claude (Anthropic) and
      Grammarly to proofread the blog drafts at various stages of the writing process and for
      feature development, e.g. data analysis, the key takeaways and summary sections.
    </p>
  </div>
</template>

<script setup>
  // Define component name to satisfy multi-word rule
  defineOptions({
    name: 'TwAISeriesNote',
  })

  // Projects data - centralized for easy updates
  const projects = [
    {
      id: 'email-security',
      title: 'Email Security System',
      description:
        'Real-time email protection with AI-assisted threat detection for scanning links before they reach your inbox.',
      url: '/blog/email-security-system',
    },
    {
      id: 'parametric-eq',
      title: 'Parametric EQ Fine-tuning',
      description:
        'Audio optimization system using AI to find optimal settings for classical music listening.',
      url: '/blog/parametric-eq-classical-music',
    },
    {
      id: 'multi-tier-backup',
      title: 'Multi-Tier Backup System',
      description:
        'Complete data protection solution combining file management, data integrity, and cloud infrastructure with AI-guided technical balance.',
      url: '/blog/multi-tier-backup',
    },
    {
      id: 'ai-deployment',
      title: 'Unified AI Model Deployment',
      description:
        'Flexible infrastructure patterns for AI model access, accommodating deployment needs from local privacy to enterprise scalability.',
      url: '/blog/ai-model-deployment-patterns',
    },
    {
      id: 'ocr-vision',
      title: 'OCR to Vision AI Understanding',
      description:
        'Enhanced document processing that bridges traditional OCR with modern Vision AI capabilities for historical materials.',
      url: '/blog/ocr-vision-ai-understanding',
    },
    {
      id: 'ai-prompting-trap',
      title: 'The AI Prompting Trap',
      description:
        'How language choices accidentally trigger over-engineering and practical frameworks for controlling AI complexity in development projects.',
      url: '/blog/ai-prompting-trap-over-engineering',
    },
  ]
</script>
