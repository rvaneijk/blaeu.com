export interface Service {
  slug: string
  title: string
  promise: string
  description: string
  intro: string
  experience: { text: string; url?: string }[]
}

export const services: Service[] = [
  {
    slug: 'expert-witness',
    title: 'Expert Witness & Legal Advisory',
    promise:
      'How adtech, AI, and tracking systems actually work, explained so it holds up in court.',
    description:
      'Expert reports and review of technical evidence on adtech, AI, and tracking systems in privacy disputes, from a former Dutch DPA technologist.',
    intro:
      "Typical engagements include an expert report on how a system processes personal data, a review of the other side's technical evidence, and support during hearings, written for judges, regulators, and counsel who are not technologists.",
    experience: [
      {
        text: 'Nine years as technologist and senior supervision officer at the Dutch Data Protection Authority (Autoriteit Persoonsgegevens)',
      },
      {
        text: 'PhD, Leiden University: Web Privacy Measurement in Real-Time Bidding Systems',
        url: 'https://ssrn.com/abstract=3319284',
      },
      {
        text: 'Talk, Overview of cookie case rulings: patterns of Benelux legal proceedings and lessons learned (Privacy-centric AdTech Summit, 2026)',
        url: 'https://vianederland.nl/event/privacy-centric-ad-tech-summit',
      },
      {
        text: "Panellist, roundtable on FPF's report Automated decision-making and profiling: lessons from court and DPA decisions (2022)",
        url: 'https://www.youtube.com/watch?v=icSjq1umcaw',
      },
    ],
  },
  {
    slug: 'pets-anonymisation',
    title: 'Privacy-Enhancing Technologies & Anonymisation',
    promise: 'Data sharing that stays useful and stands up to regulatory scrutiny.',
    description:
      'Anonymisation and pseudonymisation assessments, and reviews of data clean rooms and secure computation, tested against the EDPB guidelines.',
    intro:
      'Typical engagements include an anonymisation or pseudonymisation assessment of a data flow, an architecture review of a data clean room or secure-computation set-up, and a written position on whether the output is still personal data, tested against the EDPB anonymisation guidelines.',
    experience: [
      {
        text: 'From Pseudonymised to Anonymous Data: joint policy report with Cabinet SAMMAN (2026)',
        url: 'https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6972998',
      },
      {
        text: "Anonymous by contract? Applying the EDPB anonymisation flowchart to the DMA's Article 6(11) search-data measures (SSRN, 2026)",
        url: 'https://papers.ssrn.com/sol3/papers.cfm?abstract_id=7132283',
      },
      {
        text: 'Panellist, Privacy Preserving Technologies (PPT) in Sharing of Personal Data for AI Development and Regulatory Compliance (Privacy Symposium, Venice, 2025)',
        url: 'https://sites.grenadine.co/sites/iot/en/privacy-symposium-conference-2025/schedule/13651/Privacy%20Preserving%20Technologies%20%28PPT%29%20in%20Sharing%20of%20Personal%20Data%20for%20AI%20Development%20and%20Regulatory%20Compliance',
      },
      {
        text: 'Invited participant, OECD Data Free Flow with Trust: Community of Experts and Senior Officials Meeting (Paris, 2026)',
        url: 'https://www.oecd.org/en/about/programmes/data-free-flow-with-trust.html',
      },
    ],
  },
  {
    slug: 'regulatory-strategy',
    title: 'EU Regulatory Strategy & AI Governance',
    promise:
      'Compliance strategy built on how European regulators investigate, decide, and enforce.',
    description:
      'Regulatory strategy for privacy and AI products and data flows, drawing on nine years inside the Dutch Data Protection Authority.',
    intro:
      'Typical engagements include personal data qualification assessments, regulatory strategy for new products and data flows, and preparation for contact with a supervisory authority, drawing on nine years inside the Dutch Data Protection Authority.',
    experience: [
      {
        text: 'Co-editor, Unlocking Data Protection By Design & By Default: Lessons from the Enforcement of Article 25 GDPR (Future of Privacy Forum, 2023)',
        url: 'https://fpf.org/wp-content/uploads/2023/05/FPF-Article-25-GDPR-A4-FINAL-Digital.pdf',
      },
      {
        text: "Anonymous by contract? Applying the EDPB anonymisation flowchart to the DMA's Article 6(11) search-data measures (SSRN, 2026)",
        url: 'https://papers.ssrn.com/sol3/papers.cfm?abstract_id=7132283',
      },
      {
        text: 'Panellist, Ask the Authorities: two former regulators tell all (Publisher Privacy Symposium, 2024)',
      },
      {
        text: 'Invited expert, workshop on web standards for data protection in the EU (RegTech4AI / Maastricht Law and Tech Lab, 2026)',
        url: 'https://www.linkedin.com/posts/rvaneijk88_gdpr-gpc-omnibus-activity-7463248947831271424-Wl9H',
      },
      {
        text: 'Moderator, Chasing Shadows: can regulation keep up as online tracking continues to transform? (Data Protection Day 2026, EDPS and Council of Europe)',
        url: 'https://www.youtube.com/watch?v=UnkrPiCn5To',
      },
    ],
  },
]
