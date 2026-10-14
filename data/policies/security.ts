import type { LocalizedPolicy } from './types'

const fingerprint = '6E9C 7952 DA11 3DB1 1F1A 9411 9B91 7133 4B4F 58DE'
const keyserver =
  'https://pgp.surfnet.nl/pks/lookup?search=6e9c7952da113db11f1a94119b9171334b4f58de&fingerprint=on&op=index'
const securityTxt = 'https://blaeu.com/.well-known/security.txt'

export const securityPolicy: LocalizedPolicy = {
  en: {
    title: 'Security Policy - Team Blaeu (Blaeu Privacy Response Team B.V.)',
    updated: 'October 7, 2026',
    sections: [
      {
        blocks: [
          { type: 'p', strong: true, text: 'In short:' },
          {
            type: 'list',
            items: [
              'Report a security issue in blaeu.com to rob@blaeu.com.',
              'Encrypt sensitive details with our PGP key.',
              'This is not a bug bounty programme; no rewards are offered.',
              'Vulnerabilities we find in third-party systems are reported privately first and published only after the fix.',
            ],
          },
        ],
      },
      {
        title: 'Reporting a vulnerability in this website',
        blocks: [
          {
            type: 'p',
            text: "If you find a security issue in blaeu.com, please email rob@blaeu.com. Encrypt with the PGP key below if the details are sensitive. Please do not access other people's data, degrade the service, or disclose the issue publicly before it is fixed. This is not a bug bounty programme and no rewards are offered.",
          },
          {
            type: 'p',
            small: true,
            text: 'Security contact: Rob van Eijk, director, Blaeu Privacy Response Team B.V.',
          },
        ],
      },
      {
        title: 'Vulnerabilities in third-party systems and code',
        blocks: [
          {
            type: 'p',
            text: "Our work includes analysing software, websites and data flows for research and for expert-witness work for clients. If that work reveals a vulnerability in someone else's system, we handle it as follows:",
          },
          {
            type: 'olist',
            items: [
              'Report it first to the vendor or the responsible CSIRT, privately.',
              'Allow a reasonable time to fix it, agreed case by case.',
              'Publish only after the fix.',
            ],
          },
          {
            type: 'p',
            small: true,
            text: 'For client engagements this happens within the confidentiality terms of the engagement and applicable law.',
          },
        ],
      },
      {
        title: 'PGP key and security.txt',
        blocks: [
          { type: 'p', text: `Fingerprint: ${fingerprint}` },
          { type: 'p', text: `[Public key on the SURFnet keyserver](${keyserver})` },
          { type: 'p', text: `Machine-readable contact details: [security.txt](${securityTxt})` },
          { type: 'p', small: true, text: 'Languages: English, Dutch.' },
        ],
      },
    ],
  },
  nl: {
    title: 'Beveiligingsbeleid - Team Blaeu (Blaeu Privacy Response Team B.V.)',
    updated: '7 oktober 2026',
    sections: [
      {
        blocks: [
          { type: 'p', strong: true, text: 'In het kort:' },
          {
            type: 'list',
            items: [
              'Meld een beveiligingsprobleem in blaeu.com via rob@blaeu.com.',
              'Versleutel gevoelige details met onze PGP-sleutel.',
              'Dit is geen bug bounty-programma; er worden geen beloningen gegeven.',
              'Kwetsbaarheden die wij in systemen van derden vinden, melden wij eerst vertrouwelijk en publiceren wij pas nadat ze zijn verholpen.',
            ],
          },
        ],
      },
      {
        title: 'Een kwetsbaarheid in deze website melden',
        blocks: [
          {
            type: 'p',
            text: 'Vindt u een beveiligingsprobleem in blaeu.com, mail dan naar rob@blaeu.com. Versleutel uw bericht met de PGP-sleutel hieronder als de details gevoelig zijn. Raadpleeg geen gegevens van anderen, verstoor de dienst niet en maak het probleem niet openbaar voordat het is verholpen. Dit is geen bug bounty-programma en er worden geen beloningen gegeven.',
          },
          {
            type: 'p',
            small: true,
            text: 'Beveiligingscontact: Rob van Eijk, directeur, Blaeu Privacy Response Team B.V.',
          },
        ],
      },
      {
        title: 'Kwetsbaarheden in systemen en code van derden',
        blocks: [
          {
            type: 'p',
            text: 'Ons werk omvat het analyseren van software, websites en datastromen, voor onderzoek en als deskundige voor opdrachtgevers. Brengt dat werk een kwetsbaarheid in het systeem van een ander aan het licht, dan handelen wij als volgt:',
          },
          {
            type: 'olist',
            items: [
              'Wij melden de kwetsbaarheid eerst vertrouwelijk aan de leverancier of het verantwoordelijke CSIRT.',
              'Wij geven een redelijke termijn voor herstel, per geval afgesproken.',
              'Wij publiceren pas nadat de kwetsbaarheid is verholpen.',
            ],
          },
          {
            type: 'p',
            small: true,
            text: 'Bij opdrachten voor klanten gebeurt dit binnen de geheimhoudingsafspraken van de opdracht en het toepasselijke recht.',
          },
        ],
      },
      {
        title: 'PGP-sleutel en security.txt',
        blocks: [
          { type: 'p', text: `Vingerafdruk: ${fingerprint}` },
          { type: 'p', text: `[Publieke sleutel op de SURFnet-keyserver](${keyserver})` },
          { type: 'p', text: `Machineleesbare contactgegevens: [security.txt](${securityTxt})` },
          { type: 'p', small: true, text: 'Talen: Engels, Nederlands.' },
        ],
      },
    ],
  },
}
