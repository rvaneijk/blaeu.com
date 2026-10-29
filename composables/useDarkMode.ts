import { ref, onMounted } from 'vue'
import { globalState } from '~/composables/globalState'

const isDark = ref(false)

let initialized = false

const CHOICE_KEY = 'color-scheme-chosen'

function hasChosen(): boolean {
  try {
    return localStorage.getItem(CHOICE_KEY) === '1'
  } catch {
    return false
  }
}

function applyDarkClass(dark: boolean): void {
  if (typeof document !== 'undefined') {
    document.documentElement.classList.toggle('dark', dark)
  }
}

function initDarkMode(): void {
  if (initialized || typeof window === 'undefined') return
  initialized = true

  isDark.value =
    hasChosen() || globalState.darkMode
      ? globalState.darkMode
      : window.matchMedia('(prefers-color-scheme: dark)').matches
  applyDarkClass(isDark.value)
}

function toggleDarkMode(): void {
  isDark.value = !isDark.value
  globalState.darkMode = isDark.value
  applyDarkClass(isDark.value)
  try {
    localStorage.setItem(CHOICE_KEY, '1')
  } catch {
    // Storage unavailable: the choice lasts for this page view only
  }
}

export function useDarkMode(): { isDark: typeof isDark; toggleDarkMode: typeof toggleDarkMode } {
  // After hydration, so the server-rendered toggle icon matches on first paint
  if (import.meta.client) {
    onMounted(initDarkMode)
  }

  return {
    isDark,
    toggleDarkMode,
  }
}
