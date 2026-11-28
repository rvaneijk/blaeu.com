import type { LocalizedPolicy } from './types'

export const accessibilityPolicy: LocalizedPolicy = {
  en: {
    title: 'Accessibility statement – Blaeu (Blaeu Privacy Response Team B.V.)',
    updated: '24 October 2026',
    sections: [
      {
        blocks: [
          {
            type: 'p',
            text: 'This website should be usable for everyone, including people who use a screen reader, a keyboard only, larger text, or reduced motion.',
          },
        ],
      },
      {
        title: 'Conformance status',
        blocks: [
          {
            type: 'p',
            text: 'We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.2 at level AA. The site has no forms, logins, or input fields, which removes many common barriers. Automated checks with axe-core against WCAG 2.2 A and AA found no issues (October 2026). It has not been audited by a third party.',
          },
        ],
      },
      {
        title: 'What the site does',
        blocks: [
          {
            type: 'list',
            items: [
              'Semantic HTML with landmarks, headings in order, and a skip-to-content link',
              'Full keyboard navigation with visible focus',
              'Text alternatives for images',
              'Colour contrast that meets WCAG AA (at least 4.5:1 for body text)',
              'Respects your device settings for dark mode and reduced motion',
              'Every policy page in English and Dutch',
            ],
          },
        ],
      },
      {
        title: 'Adjusting the site',
        blocks: [
          {
            type: 'p',
            text: 'The accessibility icon in the navigation bar opens settings for text size, high contrast, a dyslexia-friendly font (OpenDyslexic), focus mode, and reduced motion. Alt + / lists all keyboard shortcuts. Your settings are stored only in your own browser.',
          },
        ],
      },
      {
        title: 'Feedback',
        blocks: [
          {
            type: 'p',
            text: 'If something on this website does not work for you, please email team@blaeu.com. We will reply within one working day and fix what we can.',
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
    title: 'Toegankelijkheidsverklaring – Blaeu (Blaeu Privacy Response Team B.V.)',
    updated: '24 oktober 2026',
    sections: [
      {
        blocks: [
          {
            type: 'p',
            text: 'Deze website moet voor iedereen bruikbaar zijn, ook voor mensen die een schermlezer, alleen een toetsenbord, grotere tekst of minder beweging gebruiken.',
          },
        ],
      },
      {
        title: 'Conformiteitsstatus',
        blocks: [
          {
            type: 'p',
            text: 'We streven naar conformiteit met de Web Content Accessibility Guidelines (WCAG) 2.2 op niveau AA. De website heeft geen formulieren, inlogfuncties of invoervelden, wat veel gebruikelijke drempels wegneemt. Geautomatiseerde controles met axe-core op WCAG 2.2 A en AA vonden geen problemen (oktober 2026). De website is niet door een derde partij getoetst.',
          },
        ],
      },
      {
        title: 'Wat de website doet',
        blocks: [
          {
            type: 'list',
            items: [
              'Semantische HTML met landmarks, koppen in de juiste volgorde en een link om naar de inhoud te springen',
              'Volledige bediening met het toetsenbord, met zichtbare focus',
              'Tekstalternatieven voor afbeeldingen',
              'Kleurcontrast dat voldoet aan WCAG AA (minimaal 4,5:1 voor lopende tekst)',
              'Volgt de instellingen van uw apparaat voor donkere modus en minder beweging',
              'Elke beleidspagina in het Nederlands en het Engels',
            ],
          },
        ],
      },
      {
        title: 'De website aanpassen',
        blocks: [
          {
            type: 'p',
            text: 'Het toegankelijkheidspictogram in de navigatiebalk opent instellingen voor tekstgrootte, hoog contrast, een dyslexievriendelijk lettertype (OpenDyslexic), focusmodus en minder beweging. Alt + / toont alle sneltoetsen. Uw instellingen worden alleen in uw eigen browser opgeslagen.',
          },
        ],
      },
      {
        title: 'Feedback',
        blocks: [
          {
            type: 'p',
            text: 'Werkt iets op deze website niet voor u, mail dan naar team@blaeu.com. We reageren binnen één werkdag en lossen op wat we kunnen.',
          },
          {
            type: 'p',
            small: true,
            text: 'Wijken de Nederlandse en de Engelse versie van deze verklaring van elkaar af, dan gaat de Nederlandse versie voor.',
          },
        ],
      },
    ],
  },
}
