import type { LocalizedPolicy } from './types'

const listTokens = 'https://github.com/rvaneijk/list-tokens'
const privacyMeter = 'https://github.com/rvaneijk/privacy_meter_dev'
const sourceRepo = 'https://github.com/rvaneijk/blaeu.com'

export const aiPolicy: LocalizedPolicy = {
  en: {
    title: 'AI statement – Blaeu (Blaeu Privacy Response Team B.V.)',
    updated: '25 October 2026',
    sections: [
      {
        blocks: [
          {
            type: 'p',
            text: 'This statement describes how Blaeu uses AI.',
          },
        ],
      },
      {
        title: 'We use AI in the following workflows',
        blocks: [
          { type: 'p', strong: true, text: 'Writing' },
          {
            type: 'p',
            text: 'Rob van Eijk writes the texts on this website and in his publications himself, in Dutch or English. When writing, Blaeu uses AI as an aid for:',
          },
          {
            type: 'list',
            items: [
              'Checking spelling, grammar, and readability',
              'Translating from Dutch into English, followed by our own editing',
              'Reviewing a draft, for example for logically flawed reasoning',
            ],
          },
          {
            type: 'p',
            text: 'We read every source that AI points us to ourselves before we quote it or use it as a reference.',
          },
          {
            type: 'p',
            text: 'The main reason to start writing from our own ideas, mostly in Dutch, is to cultivate writing, thinking, and rewriting as skills. This is a basic principle.',
          },
          { type: 'p', strong: true, text: 'Research and teaching' },
          {
            type: 'p',
            text: `Blaeu uses AI tools to study developments in machine learning and large language models, and to teach classes about them. The source code of some tools is public, for example the [GGUF Token Lister](${listTokens}) or [Privacy Meter](${privacyMeter}) (Shokri R. et al.).`,
          },
          { type: 'p', strong: true, text: 'Website' },
          {
            type: 'p',
            text: `We have built the website blaeu.com with Claude Code since April 2025. Here AI writes almost all of the code. The source code is public. You can find the latest version on [GitHub](${sourceRepo}).`,
          },
          { type: 'p', strong: true, text: 'Cyber Verification Program (CVP)' },
          {
            type: 'p',
            text: 'Since October 2026, Blaeu has been admitted to the Cyber Verification Program (CVP) of Anthropic. We use the AI models made available through it for, among other things:',
          },
          {
            type: 'list',
            items: [
              'Analysis of tracking technologies on publicly accessible websites, for research',
              'Analysis of pseudonymisation and anonymisation methodologies, for expert witness and regulatory purposes',
              'Security of our own website',
            ],
          },
        ],
      },
      {
        title: 'What we do not use AI for',
        blocks: [
          {
            type: 'list',
            items: [
              'Confidential client information, such as case files and personal data',
              'Coming up with ideas and angles for texts',
            ],
          },
        ],
      },
      {
        title: 'When we say so',
        blocks: [
          {
            type: 'p',
            text: 'If AI wrote a text that we publish without substantially rewriting it, we say so with that text. For the writing aids we do not mention it per text. This statement covers them. We do not mark English translations of our own Dutch texts separately.',
          },
        ],
      },
      {
        title: 'Responsibility',
        blocks: [
          {
            type: 'p',
            text: 'We are responsible for everything we publish, with or without AI. Rob van Eijk reads and checks every text before it goes online and reviews every change to the code. This is the human review and editorial responsibility that Article 50(4) of the EU AI Act refers to.',
          },
        ],
      },
      {
        title: 'Tools',
        blocks: [
          {
            type: 'p',
            text: 'We choose a model for each task: frontier models from commercial providers, open-weights models, or open-source models. We also develop our own tools. For expert witness work, we collect crawl data ourselves, with our own crawler, on publicly accessible websites. This data does not come from clients. We analyse it with our own tools, sometimes with the help of AI.',
          },
          {
            type: 'p',
            text: 'This use changes over time. We update this statement when there is reason to.',
          },
        ],
      },
      {
        title: 'Questions',
        blocks: [
          {
            type: 'p',
            text: 'If you have questions about this statement, please email team@blaeu.com.',
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
    title: 'AI-verklaring – Blaeu (Blaeu Privacy Response Team B.V.)',
    updated: '25 oktober 2026',
    sections: [
      {
        blocks: [
          {
            type: 'p',
            text: 'Deze verklaring beschrijft hoe Blaeu AI gebruikt.',
          },
        ],
      },
      {
        title: 'We gebruiken AI in de volgende workflows',
        blocks: [
          { type: 'p', strong: true, text: 'Schrijven' },
          {
            type: 'p',
            text: 'Rob van Eijk schrijft de teksten op deze website en in zijn publicaties zelf, in het Nederlands of het Engels. Blaeu gebruikt bij het schrijven AI als hulpmiddel voor:',
          },
          {
            type: 'list',
            items: [
              'Spelling, grammatica en leesbaarheid controleren',
              'Vertalen van Nederlands naar Engels, gevolgd door eigen redactie',
              'Een concept controleren op bijvoorbeeld logisch foutieve redeneringen',
            ],
          },
          {
            type: 'p',
            text: 'Elke bron waar AI naar verwijst, lezen we zelf voordat we die citeren of als referentie gebruiken.',
          },
          {
            type: 'p',
            text: 'De hoofdreden om het schrijfproces te starten met eigen ideeën in (meestal) de Nederlandse taal is om het schrijven, denken en herschrijven als vaardigheden te koesteren. Dat is een basisprincipe.',
          },
          { type: 'p', strong: true, text: 'Onderzoek en trainingen' },
          {
            type: 'p',
            text: `Blaeu gebruikt AI-tools om de ontwikkelingen op het gebied van machine learning en grote taalmodellen te onderzoeken en om daarover trainingen te geven. De broncode van sommige tools is openbaar, bijvoorbeeld de [GGUF Token Lister](${listTokens}) of [Privacy Meter](${privacyMeter}) (Shokri R. et al.).`,
          },
          { type: 'p', strong: true, text: 'Website' },
          {
            type: 'p',
            text: `Sinds april 2025 bouwen we de website blaeu.com met Claude Code. Hier schrijft AI vrijwel alle code. De broncode is openbaar. U vindt de nieuwste versie op [GitHub](${sourceRepo}).`,
          },
          { type: 'p', strong: true, text: 'Cyber Verification Program (CVP)' },
          {
            type: 'p',
            text: 'Sinds oktober 2026 is Blaeu toegelaten tot het Cyber Verification Program (CVP) van Anthropic. De AI-modellen die daarmee ter beschikking staan, gebruiken we onder meer voor:',
          },
          {
            type: 'list',
            items: [
              'Analyse van tracking-technologieën op publiek toegankelijke websites, voor onderzoek',
              'Analyse van methodologieën voor pseudonimisering en anonimisering, voor werk als getuige-deskundige en voor regelgevingswerk',
              'Beveiliging van onze eigen website',
            ],
          },
        ],
      },
      {
        title: 'Waarvoor we AI niet gebruiken',
        blocks: [
          {
            type: 'list',
            items: [
              'Vertrouwelijke informatie van klanten, zoals dossiers en persoonsgegevens',
              'Ideeën en invalshoeken voor teksten bedenken',
            ],
          },
        ],
      },
      {
        title: 'Wanneer we het vermelden',
        blocks: [
          {
            type: 'p',
            text: 'Heeft AI een tekst geschreven die we zonder ingrijpende herziening publiceren, dan vermelden we dat bij die tekst. Voor de schrijfhulpmiddelen doen we dat niet per tekst. Daarvoor geldt deze verklaring. Engelse vertalingen van eigen Nederlandse teksten vermelden we niet apart.',
          },
        ],
      },
      {
        title: 'Verantwoordelijkheid',
        blocks: [
          {
            type: 'p',
            text: 'Voor alles wat we publiceren, met of zonder AI, zijn we zelf verantwoordelijk. Rob van Eijk leest en controleert elke tekst voordat die online komt en beoordeelt elke wijziging aan de code. Dat is de menselijke controle en redactionele verantwoordelijkheid waar artikel 50, lid 4, van de Europese AI-verordening naar verwijst.',
          },
        ],
      },
      {
        title: 'Tools',
        blocks: [
          {
            type: 'p',
            text: 'We kiezen per taak een model: frontiermodellen van commerciële aanbieders, open-weights-modellen of opensourcemodellen. Daarnaast ontwikkelen we eigen tools. Voor werk als getuige-deskundige verzamelen we crawldata zelf, met een eigen crawler, op publiek toegankelijke websites. Die gegevens komen niet van klanten. We analyseren ze met eigen tools, soms met hulp van AI.',
          },
          {
            type: 'p',
            text: 'Dit gebruik verandert met de tijd. We werken deze verklaring bij als daar aanleiding voor is.',
          },
        ],
      },
      {
        title: 'Vragen',
        blocks: [
          {
            type: 'p',
            text: 'Heeft u vragen over deze verklaring, mail dan naar team@blaeu.com.',
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
