<!--
 * @author Blaeu Privacy Response Team
 * @copyright Copyright © 2019 - 2025 Team Blaeu. Content is licensed under CC BY 4.0 unless otherwise noted. All Rights Reserved.
 * @license CC BY 4.0
-->
<template>
  <div class="bg-white p-3 sm:p-4 rounded-lg shadow-sm border border-gray-200 animate-pulse">
    <!-- Mobile: Stack vertically, Desktop: Horizontal layout -->
    <div class="flex flex-col sm:flex-row sm:items-start gap-3">
      <!-- Header with icon and title (mobile: horizontal, desktop: icon only) -->
      <div class="flex items-center gap-3 sm:flex-col sm:gap-1">
        <!-- Icon skeleton -->
        <div
          class="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0"
        >
          <i class="fa-solid fa-circle text-gray-300 text-sm sm:text-base"></i>
        </div>
        <!-- Mobile title skeleton -->
        <div class="sm:hidden h-5 bg-gray-200 rounded w-32"></div>
      </div>

      <!-- Content -->
      <div class="flex-grow sm:flex-grow">
        <!-- Desktop title skeleton (hidden on mobile) -->
        <div class="hidden sm:block h-6 bg-gray-200 rounded w-48 mb-2"></div>

        <!-- Description skeleton -->
        <div class="space-y-2 mb-3">
          <div class="h-4 bg-gray-200 rounded w-full"></div>
          <div class="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>

        <!-- Publication details skeleton -->
        <div class="space-y-1 mb-3">
          <div class="h-3 bg-gray-200 rounded w-2/3"></div>
          <div class="h-3 bg-gray-200 rounded w-1/2"></div>
        </div>

        <!-- Metadata section skeleton -->
        <div class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3">
          <!-- Category badge skeleton -->
          <div class="h-6 bg-gray-200 rounded-full w-20"></div>
          <!-- Year and publisher skeleton -->
          <div class="flex items-center gap-3">
            <div class="h-3 bg-gray-200 rounded w-16 hidden sm:block"></div>
            <div class="h-3 bg-gray-200 rounded w-12"></div>
          </div>
        </div>

        <!-- Action links skeleton -->
        <div class="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <div class="h-8 bg-gray-200 rounded w-24"></div>
          <div class="h-8 bg-gray-200 rounded w-20"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  // No props needed for skeleton component
</script>

<style scoped>
  /* Enhanced pulse animation for better visual feedback */
  .animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  @keyframes pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.7;
    }
  }

  /* Ensure skeleton elements have consistent spacing */
  .bg-gray-200 {
    background-color: #e5e7eb;
  }

  /* Slightly slower, more gentle pulse for better UX */
  @media (prefers-reduced-motion: reduce) {
    .animate-pulse {
      animation: none;
    }

    .bg-gray-200 {
      background-color: #f3f4f6;
    }
  }
</style>
