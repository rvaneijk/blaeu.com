// scripts/add-sri.js
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

/**
 * Post-build script to add SRI integrity attributes to all assets.
 */
async function addIntegrityHashes() {
  console.log('🔒 Adding SRI integrity hashes to static assets...');
  
  try {
    // Get the dist directory path
    const distDir = path.resolve(process.cwd(), '.output/public');
    
    if (!fs.existsSync(distDir)) {
      console.error(`❌ Directory not found: ${distDir}`);
      return;
    }
    
    // Find all HTML files
    const htmlFiles = findFilesRecursively(distDir, '.html');
    
    let modified = 0;
    let assetsProcessed = 0;
    
    // Process each HTML file
    for (const htmlFile of htmlFiles) {
      let htmlContent = fs.readFileSync(htmlFile, 'utf8');
      let fileModified = false;
      
      // Process script tags
      const scriptRegex = /<script[^>]*src="([^"]*)"[^>]*>/g;
      let match;
      
      // First pass - collect all resource paths and calculate hashes
      const resourceHashes = {};
      
      // Find all resources in script tags
      while ((match = scriptRegex.exec(htmlContent)) !== null) {
        const src = match[1];
        if (!src.startsWith('http') && !src.includes('integrity')) {
          const cleanSrc = src.split('?')[0];
          const filePath = path.join(distDir, cleanSrc);
          
          if (fs.existsSync(filePath)) {
            const content = fs.readFileSync(filePath);
            const hash = crypto.createHash('sha384').update(content).digest('base64');
            resourceHashes[cleanSrc] = hash;
          }
        }
      }
      
      // Find all resources in link tags
      const linkRegex = /<link[^>]*href="([^"]*)"[^>]*>/g;
      while ((match = linkRegex.exec(htmlContent)) !== null) {
        const href = match[1];
        if (!href.startsWith('http') && !href.includes('integrity') && 
            (match[0].includes('as="script"') || 
             match[0].includes('rel="modulepreload"') || 
             match[0].includes('rel="prefetch"') ||
             match[0].includes('rel="stylesheet"'))) {
          
          const cleanHref = href.split('?')[0];
          const filePath = path.join(distDir, cleanHref);
          
          if (fs.existsSync(filePath)) {
            const content = fs.readFileSync(filePath);
            const hash = crypto.createHash('sha384').update(content).digest('base64');
            resourceHashes[cleanHref] = hash;
          }
        }
      }
      
      // Now apply the integrity hashes to all matching resources
      // For script tags
      htmlContent = htmlContent.replace(
        /<script([^>]*)src="([^"]*)"([^>]*)>/g, 
        (match, before, src, after) => {
          const cleanSrc = src.split('?')[0];
          if (resourceHashes[cleanSrc]) {
            assetsProcessed++;
            fileModified = true;
            if (match.includes('integrity=')) return match;
            
            if (match.includes('crossorigin')) {
              return `<script${before}src="${src}"${after} integrity="sha384-${resourceHashes[cleanSrc]}">`;
            } else {
              return `<script${before}src="${src}"${after} crossorigin="anonymous" integrity="sha384-${resourceHashes[cleanSrc]}">`;
            }
          }
          return match;
        }
      );
      
      // For link tags
      htmlContent = htmlContent.replace(
        /<link([^>]*)href="([^"]*)"([^>]*)>/g, 
        (match, before, href, after) => {
          const cleanHref = href.split('?')[0];
          if (resourceHashes[cleanHref] && 
              (match.includes('as="script"') || 
               match.includes('rel="modulepreload"') || 
               match.includes('rel="prefetch"') ||
               match.includes('rel="stylesheet"'))) {
            
            assetsProcessed++;
            fileModified = true;
            if (match.includes('integrity=')) return match;
            
            if (match.includes('crossorigin')) {
              return `<link${before}href="${href}"${after} integrity="sha384-${resourceHashes[cleanHref]}">`;
            } else {
              return `<link${before}href="${href}"${after} crossorigin="anonymous" integrity="sha384-${resourceHashes[cleanHref]}">`;
            }
          }
          return match;
        }
      );
      
      // Write back the modified HTML
      if (fileModified) {
        fs.writeFileSync(htmlFile, htmlContent);
        modified++;
      }
    }
    
    console.log(`✅ Added SRI integrity hashes to ${modified} HTML files (${assetsProcessed} assets processed).`);
  } catch (error) {
    console.error('❌ Error generating SRI hashes:', error);
  }
}

/**
 * Find files recursively in a directory with a specific extension
 */
function findFilesRecursively(dir, ext) {
  let results = [];
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      results = results.concat(findFilesRecursively(filePath, ext));
    } else if (path.extname(file) === ext) {
      results.push(filePath);
    }
  }
  
  return results;
}

// Run the function
addIntegrityHashes();