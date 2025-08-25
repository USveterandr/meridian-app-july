#!/usr/bin/env node

/**
 * Script to check deployment URLs for the Meridian app
 */

const https = require('https');
const http = require('http');

const urls = [
  'https://meridian-real-estate.pages.dev',
  'https://main.meridian-real-estate.pages.dev',
  'https://meridian-rd.com',
  'https://www.meridian-rd.com'
];

function checkUrl(url) {
  return new Promise((resolve) => {
    const client = url.startsWith('https:') ? https : http;
    
    const req = client.get(url, (res) => {
      resolve({
        url,
        status: res.statusCode,
        accessible: res.statusCode < 400
      });
    });
    
    req.on('error', () => {
      resolve({
        url,
        status: 'ERROR',
        accessible: false
      });
    });
    
    req.setTimeout(5000, () => {
      req.destroy();
      resolve({
        url,
        status: 'TIMEOUT',
        accessible: false
      });
    });
  });
}

async function checkAllUrls() {
  console.log('🔍 Checking Meridian app deployment URLs...\n');
  
  for (const url of urls) {
    try {
      const result = await checkUrl(url);
      const status = result.accessible ? '✅' : '❌';
      console.log(`${status} ${url} - Status: ${result.status}`);
    } catch (error) {
      console.log(`❌ ${url} - Error: ${error.message}`);
    }
  }
  
  console.log('\n📋 Summary:');
  console.log('- If any URL shows ✅, that\'s your app URL!');
  console.log('- Check your Cloudflare Pages dashboard for the exact URL');
  console.log('- The most likely URL is: https://meridian-real-estate.pages.dev');
}

checkAllUrls().catch(console.error);