import { ref } from 'vue'
import { globalState } from '~/composables/globalState'

const isDark = ref(false)

let initialized = false

function applyDarkClass(dark: boolean): void {
  if (typeof document !== 'undefined') {
    document.documentElement.classList.toggle('dark', dark)
  }
}

function initDarkMode(): void {
  if (initialized || typeof window === 'undefined') return
  initialized = true

  isDark.value = globalState.darkMode
  applyDarkClass(isDark.value)
}

function toggleDarkMode(): void {
  isDark.value = !isDark.value
  globalState.darkMode = isDark.value
  applyDarkClass(isDark.value)
}

export function useDarkMode(): { isDark: typeof isDark; toggleDarkMode: typeof toggleDarkMode } {
  if (process.client) {
    initDarkMode()
  }

  return {
    isDark,
    toggleDarkMode,
  }
}
