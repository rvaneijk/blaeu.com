<!--
 * @author Blaeu Privacy Response Team
 * @copyright Copyright © 2019 - 2026 Team Blaeu. Content is licensed under CC BY 4.0 unless otherwise noted. All Rights Reserved.
 * @license CC BY 4.0
-->
<!--
  @component PolicyLanguageToggle
  @description EN / NL switch for the legal pages. Follows and updates the saved language
  preference, so the choice carries over between policy pages.
-->
<template>
  <div class="flex items-center gap-1 -ml-1" role="group" aria-label="Language / Taal">
    <template v-for="(option, index) in options" :key="option.value">
      <span v-if="index > 0" class="text-brand-gold" aria-hidden="true">/</span>
      <button
        type="button"
        :lang="option.value"
        :class="[
          'transition-colors !min-w-6 !min-h-6 !px-1 !py-0',
          lang === option.value
            ? 'font-semibold text-gray-900 dark:text-gray-100 underline decoration-2 underline-offset-2'
            : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200',
        ]"
        :aria-pressed="lang === option.value"
        :aria-label="option.label"
        @click="choose(option.value)"
      >
        {{ option.value.toUpperCase() }}
      </button>
    </template>
  </div>
</template>

<script setup lang="ts">
  import { onMounted } from 'vue'
  import { globalState } from '~/composables/globalState'
  import type { PolicyLang } from '~/data/policies/types'

  const lang = defineModel<PolicyLang>({ required: true })

  const options: { value: PolicyLang; label: string }[] = [
    { value: 'en', label: 'English' },
    { value: 'nl', label: 'Nederlands' },
  ]

  const choose = (value: PolicyLang): void => {
    lang.value = value
    globalState.languagePreference = value
  }

  // After hydration, so the prerendered English page matches on first paint
  const route = useRoute()

  onMounted(() => {
    const requested = route.query.lang
    if (requested === 'nl' || requested === 'en') choose(requested)
    else if (globalState.languagePreference === 'nl') lang.value = 'nl'
  })
</script>
