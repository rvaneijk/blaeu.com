import type { LocalizedPolicy } from './types'

export const privacyPolicy: LocalizedPolicy = {
  en: {
    title: 'Privacy statement - Team Blaeu (Blaeu Privacy Response Team B.V.)',
    updated: 'March 31, 2025',
    sections: [
      {
        blocks: [
          {
            type: 'p',
            text: 'This is the privacy statement of Team Blaeu. You can contact us at:\n\nTeam Blaeu\nHalfrond 73, 3071 PP, Rotterdam, The Netherlands\nteam@blaeu.com',
          },
        ],
      },
      {
        title: 'We process the following personal data',
        blocks: [
          { type: 'p', strong: true, text: 'Client contact and case information' },
          {
            type: 'list',
            items: [
              "To provide legal services, we collect clients' names, contact details, and information relevant to their legal matters.",
              'We do this to perform a contract (if the person is the client) or because we have a legitimate interest in doing so (if the person represents the client).',
              'We retain this data for the duration of the matter plus 7 years.',
              'We may share this data with courts and others, such as lawyers of the other party, to perform our engagement with the client.',
            ],
          },
          { type: 'p', strong: true, text: 'Supplier information' },
          {
            type: 'list',
            items: [
              'To manage our business relationships, we collect company names, contact person details, and financial information of suppliers and service providers.',
              'We do this to perform the contract with our suppliers.',
              'We retain this data for the duration of the business relationship plus 7 years.',
            ],
          },
          { type: 'p', strong: true, text: 'Financial information' },
          {
            type: 'list',
            items: [
              'To process payments and comply with tax laws, we collect bank details and payment information.',
              'We do this to perform the contract with our client (sending invoices) and legal obligation (preparing and submitting tax statements).',
              'We retain this data for 7 years after the year an invoice is sent.',
              'We share some financial information with our tax consultant and with tax authorities.',
            ],
          },
          { type: 'p', text: 'We primarily collect data directly from you.' },
        ],
      },
      {
        title: 'Your rights',
        blocks: [
          {
            type: 'p',
            text: 'Under the GDPR, you have the rights to access, rectify, erase (in certain circumstances), restrict processing of, and transfer your data, as well as to object to processing based on legitimate interests and withdraw consent (where applicable). Team Blaeu does not engage in solely automated decision-making or profiling. To exercise these rights, contact us using the details above. You can also lodge a complaint with the Dutch Data Protection Authority (Autoriteit Persoonsgegevens).',
          },
          {
            type: 'p',
            small: true,
            text: 'If there is an inconsistency between the Dutch and English-language version of these regulations, the Dutch version takes precedence.',
          },
          {
            type: 'p',
            small: true,
            text: 'Questions about this privacy statement? Contact us at team@blaeu.com.',
          },
        ],
      },
    ],
  },
  nl: {
    title: 'Privacyverklaring - Team Blaeu (Blaeu Privacy Response Team B.V.)',
    updated: '31 maart 2025',
    sections: [
      {
        blocks: [
          {
            type: 'p',
            text: 'Dit is de privacyverklaring van Team Blaeu. U kunt contact met ons opnemen via:\n\nTeam Blaeu\nHalfrond 73, 3071 PP, Rotterdam, Nederland\nteam@blaeu.com',
          },
        ],
      },
      {
        title: 'Wij verwerken de volgende persoonsgegevens',
        blocks: [
          { type: 'p', strong: true, text: 'Klantcontact- en dossiergegevens' },
          {
            type: 'list',
            items: [
              'Om juridische diensten te verlenen, verzamelen wij namen, contactgegevens en informatie die relevant is voor de juridische kwesties van onze cliënten.',
              'Wij doen dit om een overeenkomst uit te voeren (als de persoon de cliënt is) of omdat wij een gerechtvaardigd belang hebben om dit te doen (als de persoon de cliënt vertegenwoordigt).',
              'Wij bewaren deze gegevens gedurende de duur van de zaak plus 7 jaar.',
              'Wij kunnen deze gegevens delen met rechtbanken en anderen, zoals advocaten van de andere partij, om onze opdracht voor de cliënt uit te voeren.',
            ],
          },
          { type: 'p', strong: true, text: 'Leveranciersinformatie' },
          {
            type: 'list',
            items: [
              'Om onze zakelijke relaties te beheren, verzamelen wij bedrijfsnamen, contactpersoongegevens en financiële informatie van leveranciers en dienstverleners.',
              'Wij doen dit om de overeenkomst met onze leveranciers uit te voeren.',
              'Wij bewaren deze gegevens gedurende de duur van de zakelijke relatie plus 7 jaar.',
            ],
          },
          { type: 'p', strong: true, text: 'Financiële informatie' },
          {
            type: 'list',
            items: [
              'Om betalingen te verwerken en te voldoen aan belastingwetgeving, verzamelen wij bankgegevens en betalingsinformatie.',
              'Wij doen dit om de overeenkomst met onze cliënt uit te voeren (facturen verzenden) en aan wettelijke verplichtingen te voldoen (belastingaangiften voorbereiden en indienen).',
              'Wij bewaren deze gegevens gedurende 7 jaar na het jaar waarin een factuur is verzonden.',
              'Wij delen sommige financiële informatie met onze belastingadviseur en met de belastingdienst.',
            ],
          },
          { type: 'p', text: 'Wij verzamelen gegevens voornamelijk rechtstreeks bij u.' },
        ],
      },
      {
        title: 'Uw rechten',
        blocks: [
          {
            type: 'p',
            text: 'Op grond van de AVG heeft u het recht op inzage, rectificatie, wissing (in bepaalde omstandigheden), beperking van de verwerking en overdraagbaarheid van uw gegevens, evenals het recht bezwaar te maken tegen verwerking op basis van gerechtvaardigde belangen en toestemming in te trekken (indien van toepassing). Team Blaeu doet niet aan volledig geautomatiseerde besluitvorming of profilering. Om deze rechten uit te oefenen, kunt u contact met ons opnemen via de bovenstaande gegevens. U kunt ook een klacht indienen bij de Autoriteit Persoonsgegevens.',
          },
          {
            type: 'p',
            small: true,
            text: 'Vragen over deze privacyverklaring? Neem contact met ons op via team@blaeu.com.',
          },
        ],
      },
    ],
  },
}
