/**
 * @author Blaeu Privacy Response Team
 * @copyright Copyright © 2019 - 2025 Team Blaeu. Content is licensed under CC BY 4.0 unless otherwise noted. All Rights Reserved.
 * @license CC BY 4.0
 */

import { computed, type Ref } from 'vue'
import { globalState } from '~/composables/globalState'

interface UseModalBackToTopReturn {
  positionClass: Readonly<Ref<string>>
  containerClasses: Readonly<Ref<string[]>>
}

/**
 * Composable for modal back-to-top button positioning that responds to global accessibility settings
 */
export const useModalBackToTop = (): UseModalBackToTopReturn => {
  // Compute positioning class based on accessibility widget position
  const positionClass = computed(() => {
    const isLeftSide = globalState.widgetPosition?.includes('left')
    return isLeftSide ? 'left-5' : 'right-5'
  })

  // Combined classes for the back-to-top container
  const containerClasses = computed(() => [
    'fixed z-50 transition-all duration-300',
    positionClass.value,
  ])

  return {
    positionClass,
    containerClasses,
  }
}
