<template>
  <section id="introduction" class="bg-white py-8">
    <div class="container mx-auto px-4">
      <div class="flex flex-wrap justify-center">
        <div class="intro-text-container">
          <div class="text-center pb-6">
            <p class="font-semibold text-xl mb-4 text-">Welcome to my personal page!</p>
            <p>I'm Rob van Eijk, the Founder and CEO of Blaeu Privacy Response Team B.V. (Team Blaeu), a consultancy specialized in legal aspects of data architectures and complex data flows. I am also the Managing Director for Europe at the Future of Privacy Forum (FPF). In this role, I lead <a href="https://fpf.org/eu" target="_blank" alt="FPF's operations in Europe" title="FPF's operations in Europe" class="custom-link">FPF's operations in Europe <i class="fa-solid fa-external-link fa-xs"></i></a>, have established a dedicated team in Brussels, and continuously engage with key stakeholders.</p><br />
            <p>Before joining FPF, I spent nearly a decade at the Dutch Data Protection Authority. There, I served as a Senior Supervision Officer and (Lead) Technologist. I've had the privilege of representing the Dutch DPA at various international forums, such as the Technology Expert group of the European Data Protection Board (EDPB), the Article 29 Working Party (WP29), and twice as a technical expert in court (<a href="https://linkeddata.overheid.nl/front/portal/document-viewer?ext-id=ECLI:NL:RBDHA:2016:14088" target="_blank" alt="ECLI:NL:RBDHA:2016:14088" title="ECLI:NL:RBDHA:2016:14088" class="custom-link">ECLI:NL:RBDHA:2016:14088 <i class="fa-solid fa-external-link fa-xs"></i></a>). I took an active role in major multi-stakeholder negotiations concerning <a href="https://www.w3.org/TR/tracking-dnt/" target="_blank" alt="digital privacy standards" title="digital privacy standards" class="custom-link">digital privacy standards <i class="fa-solid fa-external-link fa-xs"></i></a> on behalf of European Data Protection Authorities.</p><br />
			<p>My background is rooted in technology, and I've earned an M.Sc. from the <a href="https://liacs.leidenuniv.nl/" target="_blank" alt="Leiden Institute of Advanced Computer Science" title="Leiden Institute of Advanced Computer Science" class="custom-link">Leiden Institute of Advanced Computer Science <i class="fa-solid fa-external-link fa-xs"></i></a> and a Ph.D. from <a href="https://www.universiteitleiden.nl/en/law/institute-for-the-interdisciplinary-study-of-the-law" target="_blank" alt="Leiden Law School" title="Leiden Law School" class="custom-link">Leiden Law School <i class="fa-solid fa-external-link fa-xs"></i></a>, where I delved into online advertising and real-time bidding. From 2021 to 2023, I expanded my horizons as a guest professor at Leiden University, sharing my insights on Explainable AI at the <a href="https://web.archive.org/web/20160120031046/http://www.universiteitleiden.nl/en/science/leiden-centre-of-data-science" target="_blank" alt="Leiden Centre of Data Science" title="Leiden Centre of Data Science" class="custom-link">Leiden Centre of Data Science <i class="fa-solid fa-external-link fa-xs"></i></a> and contributing to the <a href="https://web.archive.org/web/20200908000416/https://www.universiteitleiden.nl/cpl/legal-technologies" target="_blank" alt="Leiden Legal Technologies Program" title="Leiden Legal Technologies Program" class="custom-link">Leiden Legal Technologies Program <i class="fa-solid fa-external-link fa-xs"></i></a>.</p><br />
			<p>Outside of work and academia, I'm passionate about cycling and open-water swimming. I've completed renowned cycling challenges like <a href="https://www.liege-bastogne-liege.be/en/" target="_blank" alt="Liège-Bastogne-Liège" title="Liège-Bastogne-Liège" class="custom-link">Liège-Bastogne-Liège <i class="fa-solid fa-external-link fa-xs"></i></a> and the <a href="https://marmottegranfondoalpes.com/en/" target="_blank" alt="Marmotte Granfondo Alpes" title="Marmotte Granfondo Alpes" class="custom-link">Marmotte Granfondo Alpes <i class="fa-solid fa-external-link fa-xs"></i></a> on two occasions.</p><br />
			<p>This page is updated regularly and contains an overview of my work divided into two sections: tiles with <a href="#aggregator" title="Jump to Highlights" class="custom-link">Highlights <i class="fa-solid fa-external-link fa-xs"></i></a> and a tabular overview of <a href="#tabular" title="Jump to Publications & Other Work" class="custom-link">Publications & Other Work <i class="fa-solid fa-external-link fa-xs"></i></a>. For a quick preview or to get a taste of a cross-section of my work, I recommend looking at the tab Popular. It contains links to, e.g., a mobile/web application, infographics, and recordings of interviews for television, radio, and podcasts.</p>
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