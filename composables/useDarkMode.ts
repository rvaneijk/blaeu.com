import { ref } from 'vue'

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

  try {
    const saved = localStorage.getItem('dark-mode')
    isDark.value = saved !== null ? saved === 'true' : false
  } catch {
    isDark.value = false
  }

  applyDarkClass(isDark.value)
}

function toggleDarkMode(): void {
  isDark.value = !isDark.value
  applyDarkClass(isDark.value)
  try {
    localStorage.setItem('dark-mode', String(isDark.value))
  } catch {
    // localStorage unavailable
  }
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
