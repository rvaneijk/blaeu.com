# blaeu.com

Source code for [blaeu.com](https://blaeu.com) — the website of Blaeu Privacy Response Team B.V., a privacy engineering and data protection consultancy based in Rotterdam, the Netherlands.

## Stack

| Layer     | Technology                             |
| --------- | -------------------------------------- |
| Framework | Nuxt 4 + Vue 3 + TypeScript            |
| Styling   | Tailwind CSS 4                         |
| Video     | MPEG-DASH adaptive streaming (dash.js) |
| Testing   | Vitest                                 |
| Hosting   | AWS Amplify (static site)              |

## Deployment Pipeline

A single command runs a 12-step automated pipeline:

```bash
npm run deploy:safe
```

| Step | What it does                                               |
| ---- | ---------------------------------------------------------- |
| 1    | Format codebase (Prettier)                                 |
| 2    | TypeScript check                                           |
| 3    | Functional test suite (Vitest, 4 GB memory cap)            |
| 4    | Lint (ESLint)                                              |
| 5    | Security audit (`npm audit`)                               |
| 6    | Generate RSS feed                                          |
| 7    | Static site generation (`nuxt generate`)                   |
| 8    | Inject Subresource Integrity (SRI) hashes into HTML        |
| 9    | Generate sitemap                                           |
| 10   | Extract CSP hashes and update `customHttp.yml` for Amplify |
| 11   | Sync source code to S3                                     |
| 12   | Deploy to AWS Amplify                                      |

Security steps 8–10 implement [CSP Level 3](https://www.w3.org/TR/CSP3/) with `script-src` hash allowlists and SRI verification on all external assets — fully automated on every deploy.

## Security

- **Content Security Policy (CSP3)**: Hash-based `script-src`, no `unsafe-inline`
- **Subresource Integrity (SRI)**: All third-party scripts and stylesheets
- **Responsible Disclosure**: [blaeu.com](https://blaeu.com) → footer → Responsible Disclosure
- **PGP Key**: Available at SURFnet keyserver

## Privacy by Design

Video is self-hosted with MPEG-DASH adaptive streaming rather than embedded via YouTube or Vimeo — eliminating third-party tracking pixels, cookies, and fingerprinting that would otherwise be outside our control. No external video CDN means no data leaves the user's session for a third party.

The same principle applies to fonts (self-hosted) and analytics (none) and social embeds (none). Fonts in use: Amble Family (Apache License 2.0), Big John (SIL OFL 1.1), Liberation™ Fonts (SIL OFL 1.1), OpenDyslexic (SIL OFL 1.1), Font Awesome (CC BY 4.0).

## Testing

~224 functional tests covering user-facing behaviour across all 6 pages. Tests verify what users experience, not implementation internals — keeping the suite maintainable and meaningful.

```bash
npm run test:ci:light  # Full suite, 4 GB memory cap
npm run test:coverage  # Coverage report
```

## Accessibility

Accessibility is treated as a first-class requirement, not an afterthought:

- **WCAG 2.1 AA compliance** targeted across all pages
- **`a11y.ts` plugin** — runtime accessibility layer (focus management, ARIA live regions, skip links)
- **`keyboardShortcuts.ts` plugin** — site-wide keyboard navigation with `Alt+/` shortcut overlay
- **AccessibilityWidget** — in-page controls for font size, contrast, motion, and dyslexic font (OpenDyslexic)
- **Accessibility Policy** — published and linked from every page footer
- **Automated auditing** via PageSpeed Insights API (`npm run audit:pages`) with interactive HTML reports covering Performance, Accessibility, Best Practices, and SEO scores per page

## Development

```bash
npm run dev          # Development server
npm run generate     # Static site build
npm run preview      # Preview generated output
npm run lint:fix     # Auto-fix lint issues
npm run typecheck    # TypeScript validation
npm run test:ci:light  # Run test suite
```

## License

Content is licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) unless otherwise noted.
Third-party components retain their respective licenses (see `LICENSE-*` files).
Copyright © 2019–2026 Team Blaeu. All Rights Reserved.
