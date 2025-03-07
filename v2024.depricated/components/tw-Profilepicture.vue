// tw-Profilepicture.vue
<template>
   <section id="profile" class="bg-white w-full">
        <!-- Overview content -->
        <div class="container mx-auto">
            <div class="flex flex-col items-center">
                <div class="w-full text-center">
                    <h3 class="font-big-john relative mb-0 pb-0 pt-10 font-bold uppercase text-3xl text-header portfolio-title text-black">Portfolio</h3>
                </div>
            </div>
        </div>

        <!-- Profile Picture content -->
        <div class="container mx-auto"><br ><br >
            <div class="flex flex-wrap">
                <div class="w-full sm:w-1/3 flex-none padding: 1rem">
                    <!-- Placeholder for any content you want on the left side -->
                </div>
                <div class="w-full sm:w-1/3 flex-none padding: 1rem">
                    <picture>
                        <source srcset="/assets/img/tiny_welcome.webp" type="image/webp">
                        <img alt="Profile picture Rob van Eijk" class="w-4/6 object-cover rounded-md mx-auto md:w-2/6 lg:w-1/6" src="/assets/img/tiny_welcome.png">
                    </picture>
                </div>
                <div class="w-full sm:w-1/3 flex-none padding: 1rem">
                    <!-- Placeholder for any content you want on the right side -->
                </div>
            </div>
        </div><br ><br >

        <!-- Socials content -->
		<div class="container mx-auto">
			<div class="flex flex-col items-center py-6">
				<div class="flex space-x-3 justify-center">
					<a rel="me" href="https://mastodon.nl/@rvaneijk" target="_blank" title="Mastodon"><i class="fa-brands fa-mastodon text-2xl text-black"></i></a>					
					<a href="https://www.linkedin.com/in/rvaneijk88" target="_blank" title="LinkedIn"><i class="fa-brands fa-linkedin text-2xl text-black"></i></a>
					<a href="https://github.com/rvaneijk" target="_blank" title="Github"><i class="fa-brands fa-github text-2xl text-black"></i></a>
					<a href="https://orcid.org/0000-0002-2203-6819" target="_blank" title="ORCID"><i class="fa-brands fa-orcid text-2xl text-black"></i></a>
					<a href="https://scholar.google.nl/citations?user=p4VBH-4AAAAJ" target="_blank" title="Google Scholar"><i class="fa-brands fa-google-scholar text-2xl text-black"></i></a>
					<a href="https://fpf.org/person/rob-van-eijk/" target="_blank" title="Blog @Future of Privacy Forum"><i class="fa-solid fa-blog text-2xl text-black"></i></a>
					<a href="mailto:rob@blaeu.com" target="_blank" title="Email address"><i class="fa-solid fa-envelope text-2xl text-black"></i></a>
					<a href="https://pgp.surfnet.nl/pks/lookup?search=9b9171334b4f58de&fingerprint=on&op=index" target="_blank" title="PGP Key"><i class="fa-solid fa-key text-2xl text-black"></i></a>
					<a href="https://blaeu.com/assets/rss/rvaneijk.xml" target="_blank" title="RSS file"><i class="fa-solid fa-rss text-2xl text-black"></i></a>
				</div>
			</div>
		</div>
    </section>
</template>

<style scoped>
    .portfolio-title::after {
        content: "";
        display: block;
        height: 2px;
        width: 65%;  /* For the smallest screens */
        background-color: currentColor;
        margin: 0.5em auto;
    }

    /* Medium screen adjustments */
    @media (min-width: 640px) {  /* Adjust this breakpoint value if necessary */
        .portfolio-title::after {
            width: 27%;
        }
    }

    /* Large screen adjustments */
    @media (min-width: 1024px) {  /* Adjust this breakpoint value if necessary */
        .portfolio-title::after {
            width: 13%;
        }
    }
</style>