#!/usr/bin/env node

/**
 * Content Update Script
 * Quick way to update dynamic content from command line
 * 
 * Usage:
 *   node scripts/update-content.js --artists 1500 --listeners 4000
 *   node scripts/update-content.js --spots-used 300
 */

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const options = {};

// Parse arguments
args.forEach((arg) => {
  if (arg.startsWith('--')) {
    const [key, value] = arg.substring(2).split('=');
    options[key] = value || true;
  }
});

// Update SocialProof component
function updateSocialProof(artists, listeners) {
  const filePath = path.join(__dirname, '../components/SocialProof.tsx');
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Update default props
  content = content.replace(
    /artistCount = \d+/,
    `artistCount = ${artists}`
  );
  content = content.replace(
    /listenerCount = \d+/,
    `listenerCount = ${listeners}`
  );
  
  fs.writeFileSync(filePath, content);
  console.log(`✅ Updated SocialProof: ${artists} artists, ${listeners} listeners`);
}

// Update UrgencyBadge in home page
function updateUrgencyBadge(used, total = 500) {
  const filePath = path.join(__dirname, '../app/page.tsx');
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Update progress value
  content = content.replace(
    /progressValue=\{\d+\}/,
    `progressValue={${used}}`
  );
  content = content.replace(
    /progressMax=\{\d+\}/,
    `progressMax={${total}}`
  );
  
  fs.writeFileSync(filePath, content);
  console.log(`✅ Updated UrgencyBadge: ${used}/${total} spots used`);
}

// Update stats API
function updateStatsAPI(artists, listeners) {
  const filePath = path.join(__dirname, '../app/api/stats/route.ts');
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Update mock data
  content = content.replace(
    /artists: \d+,/,
    `artists: ${artists},`
  );
  content = content.replace(
    /listeners: \d+,/,
    `listeners: ${listeners},`
  );
  
  fs.writeFileSync(filePath, content);
  console.log(`✅ Updated Stats API: ${artists} artists, ${listeners} listeners`);
}

// Main execution
if (options.artists || options.listeners) {
  const artists = parseInt(options.artists) || 1247;
  const listeners = parseInt(options.listeners) || 3891;
  
  updateSocialProof(artists, listeners);
  updateStatsAPI(artists, listeners);
}

if (options['spots-used']) {
  const used = parseInt(options['spots-used']);
  const total = parseInt(options['spots-total']) || 500;
  updateUrgencyBadge(used, total);
}

if (Object.keys(options).length === 0) {
  console.log(`
Content Update Script

Usage:
  node scripts/update-content.js --artists=1500 --listeners=4000
  node scripts/update-content.js --spots-used=300 --spots-total=500

Options:
  --artists=<number>      Update artist count
  --listeners=<number>    Update listener count
  --spots-used=<number>   Update early access spots used
  --spots-total=<number>  Update early access spots total (default: 500)
  `);
}
