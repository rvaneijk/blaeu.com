import type { LocalizedPolicy } from './types'

const fingerprint = '6E9C 7952 DA11 3DB1 1F1A 9411 9B91 7133 4B4F 58DE'
const keyserver =
  'https://pgp.surfnet.nl/pks/lookup?search=6e9c7952da113db11f1a94119b9171334b4f58de&fingerprint=on&op=index'
const securityTxt = 'https://blaeu.com/.well-known/security.txt'
const cvdExample = 'https://coordinatedvulnerabilitydisclosure.org/example_policy/'

export const securityPolicy: LocalizedPolicy = {
  en: {
    title: 'Security policy – Blaeu (Blaeu Privacy Response Team B.V.)',
    updated: '26 October 2026',
    sections: [
      {
        blocks: [
          { type: 'p', strong: true, text: 'In short:' },
          {
            type: 'list',
            items: [
              'Report a security issue in blaeu.com to rob@blaeu.com.',
              'Encrypt sensitive details with our PGP key.',
              'We respond within three business days and take no legal action against you if you follow this policy.',
              'We pay no rewards for reports.',
              'Vulnerabilities we find in third-party systems are reported privately first and published only after the fix.',
            ],
          },
        ],
      },
      {
        title: 'Coordinated vulnerability disclosure',
        blocks: [
          {
            type: 'p',
            text: 'This is our coordinated vulnerability disclosure (CVD) policy, also known as a responsible disclosure policy.',
          },
          {
            type: 'p',
            text: 'At Blaeu, we consider the security of our systems a top priority. But no matter how much effort we put into system security, there can still be vulnerabilities present.',
          },
          {
            type: 'p',
            text: 'If you discover a vulnerability in blaeu.com, we would like to know about it so we can take steps to address it as quickly as possible. We would like to ask you to help us better protect our clients and our systems.',
          },
          { type: 'p', strong: true, text: 'Please do the following:' },
          {
            type: 'list',
            items: [
              'Email your findings to rob@blaeu.com. Encrypt your findings using our PGP key to prevent this critical information from falling into the wrong hands.',
              "Do not take advantage of the vulnerability or problem you have discovered, for example by downloading more data than necessary to demonstrate the vulnerability or viewing, deleting, or modifying other people's data.",
              'Do not reveal the problem to others until we have fixed it, and delete any confidential data obtained through the vulnerability as soon as we have fixed it.',
              'Do not use attacks on physical security, social engineering, distributed denial of service, spam, or applications of third parties.',
              'Provide enough information to reproduce the problem, so we can resolve it as quickly as possible. Usually, the IP address or the URL of the affected system and a description of the vulnerability will be enough, but complex vulnerabilities may require further explanation.',
            ],
          },
          { type: 'p', strong: true, text: 'What we promise:' },
          {
            type: 'list',
            items: [
              'We will respond to your report within three business days with our evaluation of the report and an expected resolution date.',
              'If you have followed the instructions above, we will not take any legal action against you about the report.',
              'We will handle your report with strict confidentiality, and not pass on your personal details to third parties without your permission, unless this is necessary to comply with a legal obligation. Reporting under a pseudonym is possible.',
              'We will keep you informed of the progress towards resolving the problem.',
            ],
          },
          {
            type: 'p',
            text: 'We strive to resolve all problems as quickly as possible, and we would like to play an active role in the ultimate publication on the problem after it is resolved.',
          },
          {
            type: 'p',
            text: 'We pay no rewards, and we do not list reporters on this website.',
          },
          {
            type: 'p',
            small: true,
            text: 'Security contact: Rob van Eijk, director, Blaeu Privacy Response Team B.V.',
          },
          {
            type: 'p',
            small: true,
            text: `Based on the [example CVD policy](${cvdExample}) by Floor Terra, licensed under CC BY 4.0.`,
          },
        ],
      },
      {
        title: 'Vulnerabilities in third-party systems and code',
        blocks: [
          {
            type: 'p',
            text: "Our work includes analysing software, websites, and data flows for research and for expert-witness work for clients. If that work reveals a vulnerability in someone else's system, we handle it as follows:",
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
    title: 'Beveiligingsbeleid – Blaeu (Blaeu Privacy Response Team B.V.)',
    updated: '26 oktober 2026',
    sections: [
      {
        blocks: [
          { type: 'p', strong: true, text: 'In het kort:' },
          {
            type: 'list',
            items: [
              'Meld een beveiligingsprobleem in blaeu.com via rob@blaeu.com.',
              'Versleutel gevoelige details met onze PGP-sleutel.',
              'We reageren binnen drie werkdagen en ondernemen geen juridische stappen als u zich aan dit beleid houdt.',
              'We betalen geen beloningen voor meldingen.',
              'Kwetsbaarheden die we in systemen van derden vinden, melden we eerst vertrouwelijk en publiceren we pas nadat ze zijn verholpen.',
            ],
          },
        ],
      },
      {
        title: 'Coordinated vulnerability disclosure',
        blocks: [
          {
            type: 'p',
            text: 'Dit is ons beleid voor coordinated vulnerability disclosure (CVD), ook bekend als responsible disclosure.',
          },
          {
            type: 'p',
            text: 'Bij Blaeu vinden we de veiligheid van onze systemen erg belangrijk. Ondanks onze zorg voor de beveiliging van onze systemen kan het voorkomen dat er toch een zwakke plek is.',
          },
          {
            type: 'p',
            text: 'Als u een zwakke plek in blaeu.com heeft gevonden, horen we dat graag, zodat we zo snel mogelijk maatregelen kunnen treffen. We willen graag met u samenwerken om onze klanten en onze systemen beter te kunnen beschermen.',
          },
          { type: 'p', strong: true, text: 'Wij vragen u:' },
          {
            type: 'list',
            items: [
              'Uw bevindingen te mailen naar rob@blaeu.com. Versleutel uw bevindingen met onze PGP-sleutel om te voorkomen dat de informatie in verkeerde handen valt.',
              'Het probleem niet te misbruiken door bijvoorbeeld meer data te downloaden dan nodig is om het lek aan te tonen of gegevens van derden in te kijken, verwijderen of aanpassen.',
              'Het probleem niet met anderen te delen totdat het is opgelost en alle vertrouwelijke gegevens die u via het lek heeft verkregen, te wissen zodra we het lek hebben gedicht.',
              'Geen gebruik te maken van aanvallen op fysieke beveiliging, social engineering, distributed denial of service, spam of applicaties van derden.',
              'Voldoende informatie te geven om het probleem te reproduceren, zodat we het zo snel mogelijk kunnen oplossen. Meestal is het IP-adres of de URL van het getroffen systeem en een omschrijving van de kwetsbaarheid voldoende, maar bij complexere kwetsbaarheden kan meer nodig zijn.',
            ],
          },
          { type: 'p', strong: true, text: 'Wat wij beloven:' },
          {
            type: 'list',
            items: [
              'We reageren binnen drie werkdagen op uw melding met onze beoordeling van de melding en een verwachte datum voor een oplossing.',
              'Als u zich aan bovenstaande voorwaarden heeft gehouden, zullen we geen juridische stappen tegen u ondernemen over de melding.',
              'We behandelen uw melding vertrouwelijk en zullen uw persoonlijke gegevens niet zonder uw toestemming met derden delen, tenzij dat noodzakelijk is om een wettelijke verplichting na te komen. Melden onder een pseudoniem is mogelijk.',
              'We houden u op de hoogte van de voortgang van het oplossen van het probleem.',
            ],
          },
          {
            type: 'p',
            text: 'We streven ernaar om alle problemen zo snel mogelijk op te lossen en we worden graag betrokken bij een eventuele publicatie over het probleem nadat het is opgelost.',
          },
          {
            type: 'p',
            text: 'We betalen geen beloningen en vermelden geen melders op deze website.',
          },
          {
            type: 'p',
            small: true,
            text: 'Beveiligingscontact: Rob van Eijk, directeur, Blaeu Privacy Response Team B.V.',
          },
          {
            type: 'p',
            small: true,
            text: `Gebaseerd op het [voorbeeld-CVD-beleid](${cvdExample}) van Floor Terra, gepubliceerd onder CC BY 4.0.`,
          },
        ],
      },
      {
        title: 'Kwetsbaarheden in systemen en code van derden',
        blocks: [
          {
            type: 'p',
            text: 'Ons werk omvat het analyseren van software, websites en datastromen, voor onderzoek en als deskundige voor opdrachtgevers. Brengt dat werk een kwetsbaarheid in het systeem van een ander aan het licht, dan handelen we als volgt:',
          },
          {
            type: 'olist',
            items: [
              'We melden de kwetsbaarheid eerst vertrouwelijk aan de leverancier of het verantwoordelijke CSIRT.',
              'We geven een redelijke termijn voor herstel, per geval afgesproken.',
              'We publiceren pas nadat de kwetsbaarheid is verholpen.',
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
