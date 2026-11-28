import type { LocalizedPolicy } from './types'

export const cookiePolicy: LocalizedPolicy = {
  en: {
    title: 'Cookie policy – Blaeu (Blaeu Privacy Response Team B.V.)',
    updated: '24 October 2026',
    sections: [
      {
        blocks: [
          {
            type: 'p',
            text: 'This website is free from (tracking) cookies or similar technologies. We delete access logs after three months.',
          },
        ],
      },
      {
        title: 'Why we do not use cookies',
        blocks: [
          {
            type: 'p',
            text: 'At Blaeu, we prioritise your privacy and data protection rights. We have designed our website to function without the need for cookies or similar tracking technologies. This means:',
          },
          {
            type: 'list',
            items: [
              'No tracking of your browsing behaviour on our site',
              'No collection of personal data through cookies',
              'No third-party advertising cookies',
              'No unnecessary data storage on your device',
            ],
          },
        ],
      },
      {
        title: 'Server logs',
        blocks: [
          {
            type: 'p',
            text: 'While we do maintain standard server logs for security and operational purposes, these logs are automatically deleted after three months. Server logs may include:',
          },
          {
            type: 'list',
            items: [
              'IP addresses',
              'Browser type and version',
              'Date and time of access',
              'Pages visited',
            ],
          },
          {
            type: 'p',
            text: 'We keep these logs only to keep our website secure and working properly. We do not use them to track or profile visitors.',
          },
        ],
      },
      {
        title: 'Privacy by design: local storage',
        blocks: [
          {
            type: 'p',
            text: 'We use local storage in your browser for the following specific purposes:',
          },
          {
            type: 'olist',
            items: [
              'Accessibility preferences (accessibility-state): our accessibility widget stores your accessibility preferences in local storage to remember your settings between visits. These preferences include text size, contrast mode, focus indicators, reduced motion settings, font family, widget position, dark mode, and your preferred language for the policy pages (English or Dutch).',
              'Colour scheme choice (color-scheme-chosen): when you switch between light and dark mode, we store that you made a choice, so the site stops following your device setting. This value contains no personal data and never leaves your browser.',
            ],
          },
          {
            type: 'p',
            text: "Unlike cookies, local storage data stays on your device and is not sent to our servers with each request. You can clear local storage at any time through your browser settings or by using your browser's private/incognito mode.",
          },
        ],
      },
      {
        title: 'Your rights',
        blocks: [
          {
            type: 'p',
            text: 'Under the General Data Protection Regulation (GDPR), you have rights regarding your personal data. For more information about how we handle personal data, please refer to our privacy statement.',
          },
          {
            type: 'p',
            small: true,
            text: 'If there is an inconsistency between the Dutch and English-language version of this policy, the Dutch version takes precedence.',
          },
        ],
      },
    ],
  },
  nl: {
    title: 'Cookiebeleid – Blaeu (Blaeu Privacy Response Team B.V.)',
    updated: '24 oktober 2026',
    sections: [
      {
        blocks: [
          {
            type: 'p',
            text: 'Deze website is vrij van (tracking) cookies of vergelijkbare technologieën. We verwijderen toegangslogboeken na drie maanden.',
          },
        ],
      },
      {
        title: 'Waarom we geen cookies gebruiken',
        blocks: [
          {
            type: 'p',
            text: 'Bij Blaeu geven we prioriteit aan uw privacy en gegevensbeschermingsrechten. We hebben onze website ontworpen om te functioneren zonder cookies of vergelijkbare tracking-technologieën. Dat betekent:',
          },
          {
            type: 'list',
            items: [
              'Geen tracking van uw surfgedrag op onze site',
              'Geen verzameling van persoonsgegevens via cookies',
              'Geen cookies van derden voor advertenties',
              'Geen onnodige gegevensopslag op uw apparaat',
            ],
          },
        ],
      },
      {
        title: 'Serverlogboeken',
        blocks: [
          {
            type: 'p',
            text: 'We houden standaard serverlogboeken bij voor beveiliging en beheer, en verwijderen ze automatisch na drie maanden. Serverlogboeken kunnen bevatten:',
          },
          {
            type: 'list',
            items: [
              'IP-adressen',
              'Browsertype en -versie',
              'Datum en tijd van toegang',
              "Bezochte pagina's",
            ],
          },
          {
            type: 'p',
            text: 'We houden deze logboeken alleen bij om onze website veilig te houden en goed te laten werken. We gebruiken ze niet om bezoekers te volgen of te profileren.',
          },
        ],
      },
      {
        title: 'Privacy by design: gebruik van local storage',
        blocks: [
          {
            type: 'p',
            text: 'We gebruiken *local storage* in uw browser voor de volgende specifieke doeleinden:',
          },
          {
            type: 'olist',
            items: [
              "Toegankelijkheidsvoorkeuren (accessibility-state): onze toegankelijkheidswidget slaat uw toegankelijkheidsvoorkeuren op in local storage om uw instellingen tussen bezoeken te onthouden. Die voorkeuren omvatten tekstgrootte, contrastmodus, focusindicatoren, instellingen voor verminderde beweging, lettertype, widgetpositie, donkere modus en uw voorkeurstaal voor de beleidspagina's (Nederlands of Engels).",
              'Keuze kleurenschema (color-scheme-chosen): als u wisselt tussen lichte en donkere modus, slaan we op dat u een keuze heeft gemaakt, zodat de website niet langer de instelling van uw apparaat volgt. Die waarde bevat geen persoonsgegevens en verlaat uw browser nooit.',
            ],
          },
          {
            type: 'p',
            text: 'In tegenstelling tot cookies blijven gegevens in local storage op uw apparaat en worden ze niet met elke aanvraag naar onze servers gestuurd. U kunt local storage op elk moment wissen via uw browserinstellingen of door de privé- of incognitomodus van uw browser te gebruiken.',
          },
        ],
      },
      {
        title: 'Uw rechten',
        blocks: [
          {
            type: 'p',
            text: 'Op grond van de Algemene Verordening Gegevensbescherming (AVG) heeft u rechten over uw persoonsgegevens. Hoe we met persoonsgegevens omgaan, leest u in onze privacyverklaring.',
          },
        ],
      },
    ],
  },
}
