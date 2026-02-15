<!--
 * @author Blaeu Privacy Response Team
 * @copyright Copyright © 2019 - 2025 Team Blaeu. Content is licensed under CC BY 4.0 unless otherwise noted. All Rights Reserved.
 * @license CC BY 4.0
-->
<!-- 
  @component tw-Book
  @description A component that displays a featured book or publication with image, title, publication details,
  and a link to more information. Includes responsive layout and visual styling.
  @example
  <tw-Book 
    :book="{
      title: 'Book Title',
      publication: 'Publisher',
      image: '/path/to/image.jpg',
      alttext: 'Description of book cover',
      intro: 'Brief description of the book',
      link: 'https://example.com'
    }"
  />
-->
<template>
  <section id="book" class="pt-8 pb-8 bg-gray-50 font-amblelight">
    <div class="container mx-auto px-4">
      <h2 class="font-big-john text-3xl md:text-4xl font-bold text-gray-800 mb-4 text-center">
        Key Publication
      </h2>
      <div class="w-20 h-1 bg-brand-blue mx-auto mb-8"></div>

      <div class="max-w-6xl mx-auto">
        <div
          class="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 relative mb-6"
        >
          <div
            class="absolute inset-0 bg-brand-blue rounded-lg transform rotate-1 scale-105 opacity-5"
          ></div>
          <div class="relative">
            <div class="md:flex">
              <!-- Book Image - Reduced Size -->
              <div class="md:w-1/4 h-56 md:h-auto">
                <img
                  :src="book.image"
                  :alt="book.alttext"
                  class="w-full h-full object-cover"
                  width="400"
                  height="560"
                  loading="eager"
                  fetchpriority="high"
                />
              </div>

              <!-- Book Content -->
              <div class="md:w-3/4 p-8">
                <div class="flex flex-col h-full justify-between">
                  <div>
                    <div class="flex items-start justify-between mb-4">
                      <h3 class="text-2xl font-bold text-gray-900">{{ book.title }}</h3>
                      <span
                        class="inline-block px-3 py-1 bg-brand-gold text-black rounded-full text-sm font-medium"
                      >
                        {{ book.publication }}
                      </span>
                    </div>

                    <p class="text-brand-blue mb-2">{{ book.author }} ({{ book.date }})</p>

                    <div class="prose max-w-none mb-6">
                      <p>{{ book.intro }}</p>
                    </div>
                  </div>

                  <div class="mt-4">
                    <a
                      :href="book.link"
                      target="_blank"
                      rel="noopener"
                      class="inline-flex items-center bg-brand-gold text-black font-medium px-5 py-2 rounded-lg hover:bg-brand-blue hover:text-white transition duration-300"
                    >
                      View Publication
                      <svg
                        class="w-4 h-4 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        ></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
  import { reactive } from 'vue'

  const book = reactive({
    title: 'Web Privacy Measurement in Real-Time Bidding Systems',
    intro:
      'In my doctoral thesis, I investigated online advertising technologies that appear to track user behavior across websites. The research demonstrates how data flows between partners in RTB networks due to their specialized roles in the ad tech ecosystem. By applying network science algorithms, I developed methods to measure privacy implications in RTB. Additionally, I introduced a Graph-Based Methodological Approach (GBMA) that addresses variations in consent implementations across European jurisdictions.',
    author: 'Leiden University, Leiden Law School',
    date: '2019',
    link: 'https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3319284',
    image: '/assets/img/tiny_meijers.webp',
    alttext: 'Cover of Web Privacy Measurement in Real-Time Bidding Systems',
    publication: 'Doctoral Thesis',
  })
</script>
