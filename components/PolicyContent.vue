<template>
  <div>
    <template v-for="(section, sIndex) in policy.sections" :key="sIndex">
      <component
        :is="headingTag"
        v-if="section.title"
        :class="headingLevel === 2 ? pageHeadingClass : widgetHeadingClass"
      >
        {{ section.title }}
      </component>

      <template v-for="(block, bIndex) in section.blocks" :key="bIndex">
        <ul v-if="block.type === 'list'" class="list-disc pl-6 space-y-2 mb-6">
          <li v-for="(item, iIndex) in block.items" :key="iIndex">{{ item }}</li>
        </ul>
        <ol v-else-if="block.type === 'olist'" class="list-decimal pl-5 space-y-4 mb-6">
          <li v-for="(item, iIndex) in block.items" :key="iIndex">{{ item }}</li>
        </ol>
        <p v-else :class="paragraphClass(block)">
          <template v-for="(line, lIndex) in toLines(block.text)" :key="lIndex">
            <br v-if="lIndex > 0" />
            <template v-for="(run, rIndex) in line" :key="rIndex">
              <a v-if="run.href" :href="run.href" :class="linkClass">{{ run.text }}</a>
              <template v-else>{{ run.text }}</template>
            </template>
          </template>
        </p>
      </template>
    </template>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import type { Policy, PolicyBlock } from '~/data/policies/types'

  interface Run {
    text: string
    href?: string
  }

  const props = withDefaults(
    defineProps<{
      policy: Policy
      headingLevel?: 2 | 3
    }>(),
    { headingLevel: 2 }
  )

  const headingTag = computed(() => (props.headingLevel === 2 ? 'h2' : 'h3'))
  const pageHeadingClass = 'text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-10 mb-4'
  const widgetHeadingClass = 'text-xl font-semibold mt-6 mb-3'
  const linkClass =
    'text-gray-900 dark:text-gray-100 underline underline-offset-2 hover:text-brand-gold transition-colors'

  const paragraphClass = (block: PolicyBlock): string => {
    if (block.strong) return 'font-medium mb-2'
    if (block.small) return 'text-sm text-gray-500 dark:text-gray-400 mt-6 mb-4'
    return 'mb-4'
  }

  const linkPattern =
    /(https?:\/\/[^\s]+?(?=[.,;)]?(?:\s|$))|[\w.+-]+@[\w-]+\.[\w.-]+?(?=[.,;)]?(?:\s|$)))/g

  const toRuns = (line: string): Run[] => {
    const runs: Run[] = []
    let last = 0
    for (const match of line.matchAll(linkPattern)) {
      const index = match.index ?? 0
      if (index > last) runs.push({ text: line.slice(last, index) })
      const value = match[0]
      runs.push({ text: value, href: value.includes('@') ? `mailto:${value}` : value })
      last = index + value.length
    }
    if (last < line.length) runs.push({ text: line.slice(last) })
    return runs
  }

  const toLines = (text?: string): Run[][] => (text ?? '').split('\n').map(toRuns)
</script>
