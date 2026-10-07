import type { LocalizedPolicy } from './types'

export const accessibilityPolicy: LocalizedPolicy = {
  en: {
    title: 'Accessibility statement - Team Blaeu (Blaeu Privacy Response Team B.V.)',
    updated: 'April 12, 2025',
    sections: [
      {
        blocks: [
          {
            type: 'p',
            text: 'We are committed to ensuring digital accessibility for people with disabilities. We continually improve the user experience for everyone and apply the relevant accessibility standards.',
          },
        ],
      },
      {
        title: 'Conformance Status',
        blocks: [
          {
            type: 'p',
            text: 'The Web Content Accessibility Guidelines (WCAG) defines requirements for designers and developers to improve accessibility for people with disabilities. It defines three levels of conformance: Level A, Level AA, and Level AAA.',
          },
          {
            type: 'p',
            text: 'The website features multiple pages (including a homepage with silent video, a personal profile page, a blog, and a recordings page) with no forms, input fields, or authentication mechanisms. This form-free approach significantly reduces potential accessibility barriers for users with disabilities. To the best of our knowledge, this website is fully conformant with WCAG 2.2 level A standards, with most AA and several AAA enhancements.',
          },
        ],
      },
      {
        title: 'Accessibility Features',
        blocks: [
          { type: 'p', text: 'This website includes the following accessibility features:' },
          {
            type: 'list',
            items: [
              'Proper semantic HTML structure with landmark regions',
              'Keyboard-accessible navigation with enhanced focus indicators',
              'Skip to content link with enhanced visibility and multiple ways to navigate',
              'ARIA attributes and live regions for screen readers with proper announcements',
              'High color contrast exceeding AA standards (4.5:1 ratio) with AAA enhancements (7:1 ratio)',
              'Responsive design optimized for all devices and orientations',
              'Complete text alternatives for all non-text content',
              'Accessible video player with controls and proper role designation',
              'Comprehensive accessibility widget with user-controlled settings and preference memory',
              'OpenDyslexic font option for users with reading difficulties',
              'Motion reduction controls that automatically pause videos and animations',
              'Support for prefers-reduced-motion and other user preferences',
              'Multilingual accessibility support with language toggle',
              'Downloadable accessibility statement in text format',
              'Enhanced target sizes for interactive elements (44×44px minimum)',
            ],
          },
        ],
      },
      {
        title: 'Compatibility with Assistive Technologies',
        blocks: [
          {
            type: 'p',
            text: 'Our website is designed to be compatible with the following assistive technologies:',
          },
          {
            type: 'list',
            items: [
              'Screen readers (NVDA, VoiceOver, JAWS, TalkBack)',
              'Screen magnification software',
              'Speech recognition software',
              'Keyboard navigation with full functionality',
              'Browser accessibility settings and extensions',
              'Display preferences (reduced motion, high contrast)',
              'Assistive touch and pointer devices',
            ],
          },
          {
            type: 'p',
            text: 'We strive to ensure compatibility with the latest versions of these technologies and regularly test with assistive technology users.',
          },
        ],
      },
      {
        title: 'Keyboard Shortcuts',
        blocks: [
          {
            type: 'p',
            text: 'The following keyboard shortcuts are available to help navigate the website:',
          },
          { type: 'p', strong: true, text: 'Primary Navigation' },
          {
            type: 'list',
            items: [
              'Alt + 0: Back to top',
              'Alt + 1: Skip to main content',
              'Alt + 2: Jump to navigation menu',
              'Alt + 9: Jump to last section',
            ],
          },
          { type: 'p', strong: true, text: 'Accessibility Features' },
          {
            type: 'list',
            items: [
              'Alt + /: Open keyboard shortcuts help dialog',
              'Alt + A: Toggle accessibility widget',
              'Alt + D: Toggle dyslexia-friendly font',
              'Alt + F: Toggle focus mode (highlight the currently focused element)',
              'Alt + X: Toggle high contrast mode',
              'Alt + Z: Toggle reduced motion (pauses videos and animations)',
            ],
          },
          { type: 'p', strong: true, text: 'Widget Shortcuts' },
          {
            type: 'list',
            items: [
              'Alt + C: Open cookie policy',
              'Alt + K: Toggle keyboard shortcuts',
              'Alt + P: Open privacy statement',
              'Alt + T: Open terms of use',
            ],
          },
          {
            type: 'p',
            small: true,
            text: 'Note: Some keyboard shortcuts may not work if they conflict with your browser or assistive technology shortcuts.',
          },
        ],
      },
      {
        title: 'Accessibility Widget',
        blocks: [
          {
            type: 'p',
            text: 'Our website includes an accessibility widget that allows you to customize your experience. You can:',
          },
          {
            type: 'list',
            items: [
              'Adjust text size (increase or decrease)',
              'Switch to OpenDyslexic font for better readability',
              'Enable high contrast mode',
              'Enable enhanced focus indicators',
              'Reduce animations and motion (automatically pauses videos)',
              'Reset all settings to default',
            ],
          },
          {
            type: 'p',
            text: 'Access the widget using the accessibility icon in the navigation bar or by pressing Alt + A. Your preferences are saved between visits using browser local storage.',
          },
        ],
      },
      {
        title: 'WCAG 2.2 AAA Enhancements',
        blocks: [
          {
            type: 'p',
            text: 'Our website implements several WCAG 2.2 Level AAA success criteria, including:',
          },
          {
            type: 'list',
            items: [
              'Enhanced contrast ratios (7:1 ratio) for text and interface elements',
              'Complete keyboard accessibility without timing requirements',
              'No animations that could trigger seizures or physical reactions',
              'Clear section headings to organize content',
              'Enhanced target sizes (44×44px) for all interactive elements',
              'Context changes that only occur on user request',
              'Comprehensive help documentation',
            ],
          },
        ],
      },
      {
        title: 'Feedback',
        blocks: [
          {
            type: 'p',
            text: 'We are continually working to improve our AAA compliance. We welcome your feedback on the accessibility of this website. If you encounter accessibility barriers or have suggestions for improvement, please contact us at team@blaeu.com.',
          },
          {
            type: 'p',
            small: true,
            text: 'If there is an inconsistency between the Dutch and English-language version of this statement, the Dutch version takes precedence.',
          },
        ],
      },
    ],
  },
  nl: {
    title: 'Toegankelijkheidsverklaring - Team Blaeu (Blaeu Privacy Response Team B.V.)',
    updated: '12 april 2025',
    sections: [
      {
        blocks: [
          {
            type: 'p',
            text: 'Wij streven ernaar om digitale toegankelijkheid te waarborgen voor mensen met een beperking. We verbeteren voortdurend de gebruikerservaring voor iedereen en passen de relevante toegankelijkheidsnormen toe.',
          },
        ],
      },
      {
        title: 'Conformiteitsstatus',
        blocks: [
          {
            type: 'p',
            text: 'De Web Content Accessibility Guidelines (WCAG) definiëren eisen voor ontwerpers en ontwikkelaars om de toegankelijkheid voor mensen met een beperking te verbeteren. De WCAG definiëren drie conformiteitsniveaus: Niveau A, Niveau AA en Niveau AAA.',
          },
          {
            type: 'p',
            text: "De website bestaat uit meerdere pagina's (waaronder een homepage met stille video, een persoonlijk profiel, een blog en een opnamepagina) zonder formulieren, invoervelden of authenticatiemechanismen. Deze formuliervrije aanpak vermindert aanzienlijk mogelijke toegankelijkheidsbarrières voor gebruikers met een beperking. Voor zover wij weten is deze website volledig conform WCAG 2.2 niveau A-standaarden, met de meeste AA- en verschillende AAA-verbeteringen.",
          },
        ],
      },
      {
        title: 'Toegankelijkheidsfuncties',
        blocks: [
          { type: 'p', text: 'Deze website bevat de volgende toegankelijkheidsfuncties:' },
          {
            type: 'list',
            items: [
              'Juiste semantische HTML-structuur met herkenningspunten',
              'Toetsenbord-toegankelijke navigatie met verbeterde focusindicatoren',
              'Doorspring-link naar inhoud met verbeterde zichtbaarheid en meerdere navigatiemogelijkheden',
              "ARIA-attributen en live-regio's voor schermlezers met correcte aankondigingen",
              'Hoog kleurcontrast dat AA-standaarden overtreft (4.5:1 ratio) met AAA-verbeteringen (7:1 ratio)',
              'Responsief ontwerp geoptimaliseerd voor alle apparaten en oriëntaties',
              'Volledige tekstalternatieven voor alle niet-tekstuele inhoud',
              'Toegankelijke videospeler met bediening en juiste rolbenaming',
              'Uitgebreide toegankelijkheidswidget met door de gebruiker bestuurbare instellingen en voorkeursgeheugen',
              'OpenDyslexic lettertype-optie voor gebruikers met leesmoeilijkheden',
              "Bewegingsreductie-besturing die automatisch video's en animaties pauzeert",
              'Ondersteuning voor prefers-reduced-motion en andere gebruikersvoorkeuren',
              'Meertalige toegankelijkheidsondersteuning met taalschakelaar',
              'Downloadbare toegankelijkheidsverklaring in tekstformaat',
              'Verbeterde doelgroottes voor interactieve elementen (minimaal 44×44px)',
            ],
          },
        ],
      },
      {
        title: 'Compatibiliteit met Hulptechnologieën',
        blocks: [
          {
            type: 'p',
            text: 'Onze website is ontworpen om compatibel te zijn met de volgende hulptechnologieën:',
          },
          {
            type: 'list',
            items: [
              'Schermlezers (NVDA, VoiceOver, JAWS, TalkBack)',
              'Schermvergrotingssoftware',
              'Spraakherkenningssoftware',
              'Toetsenbordnavigatie met volledige functionaliteit',
              'Toegankelijkheidsinstellingen en -extensies van browsers',
              'Weergavevoorkeuren (verminderde beweging, hoog contrast)',
              'Ondersteunende aanraak- en aanwijsapparaten',
            ],
          },
          {
            type: 'p',
            text: 'We streven ernaar compatibiliteit te garanderen met de nieuwste versies van deze technologieën en testen regelmatig met gebruikers van ondersteunende technologieën.',
          },
        ],
      },
      {
        title: 'Toetsenbordsnelkoppelingen',
        blocks: [
          {
            type: 'p',
            text: 'De volgende toetsenbordsnelkoppelingen zijn beschikbaar om door de website te navigeren:',
          },
          { type: 'p', strong: true, text: 'Primaire Navigatie' },
          {
            type: 'list',
            items: [
              'Alt + 0: Terug naar boven',
              'Alt + 1: Spring naar hoofdinhoud',
              'Alt + 2: Spring naar navigatiemenu',
              'Alt + 9: Spring naar laatste sectie',
            ],
          },
          { type: 'p', strong: true, text: 'Toegankelijkheidsfuncties' },
          {
            type: 'list',
            items: [
              'Alt + /: Open hulpdialoog voor toetsenbordsnelkoppelingen',
              'Alt + A: Toegankelijkheidswidget aan/uit',
              'Alt + D: Dyslexievriendelijk lettertype aan/uit',
              'Alt + F: Focusmodus aan/uit (markeert het momenteel gefocuste element)',
              'Alt + X: Hoog contrast modus aan/uit',
              "Alt + Z: Verminderde beweging aan/uit (pauzeert video's en animaties)",
            ],
          },
          { type: 'p', strong: true, text: 'Widgetsnelkoppelingen' },
          {
            type: 'list',
            items: [
              'Alt + C: Open cookiebeleid',
              'Alt + K: Toetsenbordsnelkoppelingen aan/uit',
              'Alt + P: Open privacyverklaring',
              'Alt + T: Open gebruiksvoorwaarden',
            ],
          },
          {
            type: 'p',
            small: true,
            text: 'Opmerking: Sommige toetsenbordsnelkoppelingen werken mogelijk niet als ze conflicteren met snelkoppelingen van uw browser of ondersteunende technologie.',
          },
        ],
      },
      {
        title: 'Toegankelijkheidswidget',
        blocks: [
          {
            type: 'p',
            text: 'Onze website bevat een toegankelijkheidswidget waarmee u uw ervaring kunt aanpassen. U kunt:',
          },
          {
            type: 'list',
            items: [
              'Tekstgrootte aanpassen (vergroten of verkleinen)',
              'Overschakelen naar OpenDyslexic lettertype voor betere leesbaarheid',
              'Hoog contrast modus inschakelen',
              'Verbeterde focusindicatoren inschakelen',
              "Animaties en beweging verminderen (pauzeert automatisch video's)",
              'Alle instellingen terugzetten naar standaard',
            ],
          },
          {
            type: 'p',
            text: 'Toegang tot de widget via het toegankelijkheidspictogram in de navigatiebalk of door op Alt + A te drukken. Uw voorkeuren worden tussen bezoeken opgeslagen via lokale browseropslag.',
          },
        ],
      },
      {
        title: 'WCAG 2.2 AAA Verbeteringen',
        blocks: [
          {
            type: 'p',
            text: 'Onze website implementeert verschillende WCAG 2.2 Niveau AAA-succescriteria, waaronder:',
          },
          {
            type: 'list',
            items: [
              'Verbeterde contrastverhoudingen (7:1 ratio) voor tekst en interface-elementen',
              'Volledige toetsenbordtoegankelijkheid zonder tijdsbeperkingen',
              'Geen animaties die aanvallen of fysieke reacties kunnen veroorzaken',
              'Duidelijke sectiekopjes om inhoud te organiseren',
              'Verbeterde doelgrootte (44×44px) voor alle interactieve elementen',
              'Contextwijzigingen die alleen optreden op verzoek van de gebruiker',
              'Uitgebreide helpdocumentatie',
            ],
          },
        ],
      },
      {
        title: 'Feedback',
        blocks: [
          {
            type: 'p',
            text: 'We werken voortdurend aan het verbeteren van onze AAA-compliance. Wij verwelkomen uw feedback over de toegankelijkheid van deze website. Als u toegankelijkheidsbarrières ondervindt of suggesties heeft voor verbetering, neem dan contact met ons op via team@blaeu.com.',
          },
        ],
      },
    ],
  },
}
