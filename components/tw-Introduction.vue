<template>
  <section id="introduction" class="bg-white py-8">
    <div class="container mx-auto px-4">
      <div class="flex flex-wrap justify-center">
        <div class="intro-text-container">
          <div class="text-center pb-6">
            <p class="font-semibold text-xl mb-4 text-">Welcome to my personal page!</p>
            <p>I'm Rob van Eijk, the Founder and Principal of Blaeu Privacy Response Team B.V. (Team Blaeu), a consultancy specialized in legal aspects of data architectures and complex data flows. I am also the Managing Director for Europe at the Future of Privacy Forum (FPF). In this role, I lead <a href="https://fpf.org/eu" target="_blank" alt="FPF's operations in Europe" title="FPF's operations in Europe" class="custom-link">FPF's operations in Europe <i class="fa-solid fa-external-link fa-xs"></i></a>, have established a dedicated team in Brussels, and continuously engage with key stakeholders. This page is updated regularly and contains an overview of my work.</p><br />
			<!-- This is for your signature and surrounding spacing -->
			<div class="flex justify-center mt-8 w-full">
				<picture>
					<source srcset="/assets/img/tiny_me.webp" type="image/webp">
					<img alt="Hand written signature." class="image-shift w-1/2 h-auto rounded" src="/assets/img/tiny_me.png"> <!-- Removed the 'border' class -->
				</picture>
			</div>
			<!-- Horizontal Line -->
			<div class="flex justify-center mt-4 pt-4">
				<div class="w-1/6 h-0.5 bg-black"></div>
			</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.custom-link:hover {
  color: #b50000;
}
/* Default width for larger devices */
.intro-text-container {
  width: 66.66%; /* corresponds to w-4/6 in Tailwind */
  margin: 0 auto; 
}
/* Full width for small devices */
@media (max-width: 640px) { /* corresponds to sm breakpoint in Tailwind */
  .intro-text-container {
    width: 100%; /* corresponds to w-full in Tailwind */
  }
}
.image-shift {
    transform: translateX(43%);  /* Shifts the image by half of its width to the right */
}
@media (max-width: 896px) {
  .custom-link {
    color: #c53030;  /* This is the equivalent color of text-red-700 in Tailwind */
  }
}
</style>