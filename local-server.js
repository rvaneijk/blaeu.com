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
  // console.log('Successfully loaded headers configuration');
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
      const isMatch = micromatch.isMatch(url, pattern);
      if (isMatch) {
        // Apply headers for this pattern
        for (const header of patternObj.headers) {
          res.setHeader(header.key, header.value);
        }
      }
    } catch (error) {
      // console.warn(`Pattern matching error for pattern ${pattern}:`, error.message);
    }
  }
  
  // For cross-origin image requests, explicitly set CORS headers
  if (url.includes('/assets/img/')) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    
    // Special handling for specific profile image
    if (url.includes('rvaneijk-profile')) {
      res.setHeader('Timing-Allow-Origin', '*');
      res.setHeader('X-Content-Type-Options', 'nosniff');
      res.setHeader('Content-Type', 'image/webp');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    }
  }
  
  next();
}

// Apply custom headers middleware
app.use(applyHeaders);

// Serve static files from your Nuxt generate output directory
app.use(express.static(path.join(__dirname, '.output/public')));

// For SPA routing - serve index.html for all non-file routes
// Use a simple string path to avoid path-to-regexp issues
app.use((req, res, next) => {
  // If the request doesn't match a static file, serve the index.html
  const filePath = path.join(__dirname, '.output/public', req.path);
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      // File doesn't exist, serve index.html
      return res.sendFile(path.join(__dirname, '.output/public', 'index.html'));
    }
    // File exists, let the static middleware handle it
    next();
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Testing CSP headers locally. Check network tab in DevTools.`);
});