# Local Testing Server for Nuxt Static Site

This document explains how to test your custom HTTP headers locally with your Nuxt static site.

## Prerequisites

- Node.js installed
- A Nuxt project with static site generation (`npm run generate`)
- Custom HTTP headers configuration (in `./doc/customHttp.yml`)

## Setup

1. The necessary dependencies (express, js-yaml, micromatch) are already installed in your project.

2. The `local-server.js` file in your project root already contains the following improved implementation:

```javascript
const express = require('express');
const fs = require('fs');
const yaml = require('js-yaml');
const path = require('path');
const micromatch = require('micromatch');

const app = express();
const PORT = 3000;

// Load custom headers configuration
let customHeadersConfig;
try {
  customHeadersConfig = yaml.load(fs.readFileSync('./doc/customHttp.yml', 'utf8'));
  console.log('Successfully loaded headers configuration');
} catch (error) {
  console.error('Error loading headers configuration:', error);
  process.exit(1);
}

// Function to apply headers based on pattern matching
function applyHeaders(req, res, next) {
  const url = req.path;
  
  // Apply specific pattern headers
  for (const patternObj of customHeadersConfig.customHeaders) {
    const pattern = patternObj.pattern;
    
    try {
      // Use micromatch for glob pattern matching
      if (micromatch.isMatch(url, pattern)) {
        // Apply headers for this pattern
        for (const header of patternObj.headers) {
          res.setHeader(header.key, header.value);
        }
      }
    } catch (error) {
      console.warn(`Pattern matching error for pattern ${pattern}:`, error.message);
    }
  }
  
  next();
}

// Apply custom headers middleware
app.use(applyHeaders);

// Serve static files from your Nuxt generate output directory
app.use(express.static(path.join(__dirname, '.output/public')));

// For SPA routing - serve index.html for all non-file routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '.output/public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Testing CSP headers locally. Check network tab in DevTools.`);
});
```

## Usage

1. Generate your Nuxt static site:

```bash
npm run generate
```

2. Start the local testing server:

```bash
node local-server.js
```

3. Open your browser and navigate to:

```
http://localhost:3000
```

4. Open Developer Tools (F12 or Ctrl+Shift+I / Cmd+Option+I)

5. Go to the Network tab

6. Refresh the page and click on a request to view its headers

## Testing Specific Headers

### Content Security Policy (CSP)

To specifically test CSP headers:

1. Look for the `Content-Security-Policy` header in the Network tab
2. You can also use the browser's CSP reporting functionality:
   - In Chrome: Open DevTools > Console tab to see CSP violations
   - In Firefox: Open DevTools > Security tab to see CSP information

### CORS Headers

To test CORS headers:

1. Look for headers like `Access-Control-Allow-Origin` in the Network tab
2. Create a simple test page on a different port to test cross-origin requests

### Cache Control

To test caching headers:

1. Look for the `Cache-Control` header in the Network tab
2. Refresh the page multiple times to see caching behavior
3. Use the Network tab's "Disable cache" option to test uncached responses

## Troubleshooting

- **Headers not showing up**: Make sure your glob patterns in customHttp.yml correctly match your URL paths.
- **Pattern matching errors**: Check console for warnings about pattern matching errors.
- **CORS issues**: Check that your `Access-Control-Allow-Origin` header is correctly set.
- **CSP blocking resources**: Review the console for CSP violation messages to see which directives need adjustment.
- **Invalid glob patterns**: If a pattern isn't matching as expected, check the micromatch documentation (linked below) for proper syntax.

## Resources

- [MDN: HTTP Headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers)
- [MDN: Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [Express.js Documentation](https://expressjs.com/)
- [Micromatch Documentation](https://github.com/micromatch/micromatch)
- [js-yaml Documentation](https://github.com/nodeca/js-yaml)
