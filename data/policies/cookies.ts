import type { LocalizedPolicy } from './types'

export const cookiePolicy: LocalizedPolicy = {
  en: {
    title: 'Cookie policy - Team Blaeu (Blaeu Privacy Response Team B.V.)',
    updated: 'February 17, 2026',
    sections: [
      {
        blocks: [
          {
            type: 'p',
            text: 'This page is free from (tracking) cookies or similar technologies. We delete access logs after 3 months.',
          },
        ],
      },
      {
        title: "Why We Don't Use Cookies",
        blocks: [
          {
            type: 'p',
            text: 'At Team Blaeu, we prioritize your privacy and data protection rights. We have designed our website to function without the need for cookies or similar tracking technologies. This means:',
          },
          {
            type: 'list',
            items: [
              'No tracking of your browsing behavior on our site',
              'No collection of personal data through cookies',
              'No third-party advertising cookies',
              'No unnecessary data storage on your device',
            ],
          },
        ],
      },
      {
        title: 'Server Logs',
        blocks: [
          {
            type: 'p',
            text: 'While we do maintain standard server logs for security and operational purposes, these logs are automatically deleted after 3 months. Server logs may include:',
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
            text: 'These logs are maintained solely for the purpose of ensuring the security and proper functioning of our website and are not used for tracking or profiling visitors.',
          },
        ],
      },
      {
        title: 'Privacy By Design: Local Storage Usage',
        blocks: [
          {
            type: 'p',
            text: 'We use local storage in your browser for the following specific purposes:',
          },
          {
            type: 'olist',
            items: [
              'Accessibility Preferences (accessibility-state): Our accessibility widget stores your accessibility preferences in local storage to remember your settings between visits. These preferences include text size, contrast mode, focus indicators, reduced motion settings, font family, widget position, dark mode, and your preferred language for keyboard shortcuts (English or Dutch). This allows us to optimize your WCAG preferences.',
              'Cookie Notice Acknowledgment (cookie-policy-shown): We record that (not when) you have viewed our cookie policy. This stops the blinking notification after your first visit, providing a better user experience while still meeting regulatory requirements to inform users about our Cookie Policy.',
              'Video Settings (dashjs_video_settings, dashjs_video_bitrate): We use the Dash.js component for displaying videos and store minimal technical information about your video codec and preferred bitrate. This allows us to optimize video loading and streaming quality when the same video appears multiple times on a page.',
            ],
          },
          {
            type: 'p',
            text: "Unlike cookies, local storage data stays on your device and is not sent to our servers with each request. You can clear local storage at any time through your browser settings or by using your browser's private/incognito mode.",
          },
        ],
      },
      {
        title: 'Your Rights',
        blocks: [
          {
            type: 'p',
            text: 'Under the General Data Protection Regulation (GDPR), you have rights regarding your personal data. For more information about how we handle personal data, please refer to our Privacy Statement.',
          },
          {
            type: 'p',
            small: true,
            text: 'If there is an inconsistency between the Dutch and English-language version of these regulations, the Dutch version takes precedence.',
          },
        ],
      },
    ],
  },
  nl: {
    title: 'Cookiebeleid - Team Blaeu (Blaeu Privacy Response Team B.V.)',
    updated: '17 februari 2026',
    sections: [
      {
        blocks: [
          {
            type: 'p',
            text: 'Deze pagina is vrij van (tracking) cookies of vergelijkbare technologieën. We verwijderen toegangslogboeken na 3 maanden.',
          },
        ],
      },
      {
        title: 'Waarom wij geen cookies gebruiken',
        blocks: [
          {
            type: 'p',
            text: 'Bij Team Blaeu geven wij prioriteit aan uw privacy en gegevensbeschermingsrechten. We hebben onze website ontworpen om te functioneren zonder cookies of vergelijkbare tracking-technologieën. Dit betekent:',
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
            text: 'Hoewel we standaard serverlogboeken bijhouden voor beveiligings- en operationele doeleinden, worden deze logboeken automatisch na 3 maanden verwijderd. Serverlogboeken kunnen bevatten:',
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
            text: 'Deze logboeken worden uitsluitend bijgehouden om de veiligheid en goede werking van onze website te waarborgen en worden niet gebruikt voor het volgen of profileren van bezoekers.',
          },
        ],
      },
      {
        title: 'Privacy by design: gebruik van local storage',
        blocks: [
          {
            type: 'p',
            text: 'We gebruiken local storage in uw browser voor de volgende specifieke doeleinden:',
          },
          {
            type: 'olist',
            items: [
              'Toegankelijkheidsvoorkeuren (accessibility-state): Onze toegankelijkheidswidget slaat uw toegankelijkheidsvoorkeuren op in local storage om uw instellingen tussen bezoeken te onthouden. Deze voorkeuren omvatten tekstgrootte, contrastmodus, focusindicatoren, instellingen voor verminderde beweging, lettertype, widgetpositie, donkere modus, en uw voorkeurstaal voor toetsenbordsnelkoppelingen (Nederlands of Engels). Dit stelt ons in staat om uw WCAG-voorkeuren te optimaliseren.',
              'Informatievereiste (cookie-policy-shown): We registreren dat (niet wanneer) u ons cookiebeleid heeft bekeken. Dit stopt de knipperende notificatie na uw eerste bezoek, wat zorgt voor een betere gebruikerservaring terwijl we nog steeds voldoen aan de wettelijke vereisten om gebruikers te informeren over ons Cookiebeleid.',
              "Video-instellingen (dashjs_video_settings, dashjs_video_bitrate): We gebruiken de Dash.js component voor het tonen van video's en slaan minimale technische informatie op over uw video codec en voorkeurs-bitrate. Dit stelt ons in staat om het laden van video's en de streamingkwaliteit te optimaliseren wanneer dezelfde video meerdere keren op een pagina verschijnt.",
            ],
          },
          {
            type: 'p',
            text: 'In tegenstelling tot cookies blijven local storage gegevens op uw apparaat en worden ze niet met elke aanvraag naar onze servers gestuurd. U kunt local storage op elk moment wissen via uw browserinstellingen of door gebruik te maken van de privé/incognito-modus van uw browser.',
          },
        ],
      },
      {
        title: 'Uw rechten',
        blocks: [
          {
            type: 'p',
            text: 'Onder de Algemene Verordening Gegevensbescherming (AVG) heeft u rechten met betrekking tot uw persoonsgegevens. Voor meer informatie over hoe wij met persoonsgegevens omgaan, verwijzen wij u naar onze Privacyverklaring.',
          },
        ],
      },
    ],
  },
}
