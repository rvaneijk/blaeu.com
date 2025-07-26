<!--
 * @author Blaeu Privacy Response Team
 * @copyright Copyright © 2019 - 2025 Team Blaeu. Content is licensed under CC BY 4.0 unless otherwise noted. All Rights Reserved.
 * @license CC BY 4.0
-->
<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Simple unified navigation -->
    <tw-NavbarSimple />

    <!-- Main content -->
    <main id="main-content" class="pt-28">
      
      <!-- Hero Section -->
      <section id="top" class="py-16 bg-white">
        <div class="container mx-auto px-4">
          <h1 class="text-4xl font-bold text-gray-900 mb-4">Simple Navigation Demo</h1>
          <p class="text-xl text-gray-600">
            This demonstrates the minimal working unified navigation system.
          </p>
        </div>
      </section>

      <!-- About Section -->
      <section id="about-us" class="py-16 bg-gray-100">
        <div class="container mx-auto px-4">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">About Us</h2>
          <p class="text-gray-600">About section content here.</p>
        </div>
      </section>

      <!-- Services Section -->
      <section id="expertise" class="py-16 bg-white">
        <div class="container mx-auto px-4">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Our Services</h2>
          <p class="text-gray-600">Services section content here.</p>
        </div>
      </section>

      <!-- News Section -->
      <section id="news" class="py-16 bg-gray-100">
        <div class="container mx-auto px-4">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Latest News</h2>
          <p class="text-gray-600">News section content here.</p>
        </div>
      </section>

      <!-- Contact Section -->
      <section id="about" class="py-16 bg-blue-50">
        <div class="container mx-auto px-4">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Contact Us</h2>
          <p class="text-gray-600">Contact information here.</p>
        </div>
      </section>

    </main>
  </div>
</template>

<script setup>
useSeoMeta({
  title: 'Simple Navigation Test',
  description: 'Test page for simple unified navigation',
  robots: 'noindex, nofollow'
})
</script>