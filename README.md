# blaeu.com

Source code for [blaeu.com](https://blaeu.com), the website of Blaeu Privacy Response Team B.V., a privacy engineering and data protection consultancy in Rotterdam, the Netherlands.

## Stack

| Layer     | Technology                    |
| --------- | ----------------------------- |
| Framework | Nuxt 4, Vue 3, and TypeScript |
| Styling   | Tailwind CSS 4                |
| Testing   | Vitest                        |
| Hosting   | Static site on statichost.eu  |

## Deployment pipeline

One command runs the whole pipeline:

```bash
npm run deploy:safe
```

| Step | What it does                                                |
| ---- | ----------------------------------------------------------- |
| 1    | Format the codebase (Prettier)                              |
| 2    | TypeScript check                                            |
| 3    | Functional test suite (Vitest, 4 GB memory cap)             |
| 4    | Lint (ESLint)                                               |
| 5    | Security audit of dependencies                              |
| 6    | Static site generation                                      |
| 7    | Strip preview drafts                                        |
| 8    | Add Subresource Integrity (SRI) hashes to the HTML          |
| 9    | Generate the sitemap                                        |
| 10   | Generate `llms-full.txt`                                    |
| 11   | Extract CSP hashes and write the statichost.eu headers file |
| 12   | Sync the source code to this repository                     |
| 13   | Deploy the static site                                      |

## Security

- **Content Security Policy (CSP Level 3)**: steps 8 to 11 keep the policy current on every deploy. Scripts and inline styles run only if their hash is on the allowlist. The policy contains no `unsafe-inline`, `unsafe-eval`, or `unsafe-hashes`.
- **Subresource Integrity (SRI)**: every script and stylesheet carries an integrity hash.

## Privacy by design

The site sets no cookies, runs no analytics or trackers, and makes no third-party requests. It hosts its own fonts and images. Recordings link out to their original platform, and the site shows only self-hosted thumbnails, so a visitor reaches that platform only after clicking through.

Fonts in use: Source Sans 3 (SIL OFL 1.1), OpenDyslexic (SIL OFL 1.1), and Font Awesome (icons CC BY 4.0, fonts SIL OFL 1.1).

## Testing

About 220 functional tests cover pages, components, composables, and data files. The tests check what a visitor sees, which keeps the suite small and easy to maintain.

```bash
npm run test:ci:light  # Full suite, 4 GB memory cap
npm run test:coverage  # Coverage report
```

## Accessibility

The site targets WCAG 2.2 level AA on every page.

- **`a11y.ts` plugin**: focus management, ARIA live regions, and skip links.
- **`keyboardShortcuts.ts` plugin**: site-wide keyboard navigation. Press `Alt+/` for the list of shortcuts.
- **Accessibility widget**: visitors can change the text size, contrast, and motion, and switch to a dyslexia-friendly font (OpenDyslexic).
- **Accessibility statement**: linked from the footer of every page.
- **Page audits**: `npm run audit:pages` runs the PageSpeed Insights API and writes an HTML report with Performance, Accessibility, Best Practices, and SEO scores per page.

## License

Content is licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) unless otherwise noted.
Third-party components keep their own licenses (see the `LICENSE-*` files).
Copyright © 2019–2026 Team Blaeu. All Rights Reserved.
