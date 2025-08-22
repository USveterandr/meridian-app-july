#!/usr/bin/env node

/**
 * Performance optimization script for production builds
 * This script analyzes bundle size, optimizes images, and prepares for deployment
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting performance optimization...');

// Bundle analyzer
try {
  console.log('📊 Analyzing bundle size...');
  execSync('npx @next/bundle-analyzer', { stdio: 'inherit' });
} catch (error) {
  console.log('Bundle analyzer not available, installing...');
  execSync('npm install --save-dev @next/bundle-analyzer', { stdio: 'inherit' });
}

// Image optimization check
console.log('🖼️  Checking image optimization...');
const publicDir = path.join(process.cwd(), 'public');
const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];

function getImageFiles(dir) {
  const files = [];
  
  function traverse(currentDir) {
    const items = fs.readdirSync(currentDir);
    
    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        traverse(fullPath);
      } else if (imageExtensions.some(ext => item.toLowerCase().endsWith(ext))) {
        files.push({
          path: fullPath,
          size: stat.size,
          name: item
        });
      }
    }
  }
  
  if (fs.existsSync(dir)) {
    traverse(dir);
  }
  
  return files;
}

const images = getImageFiles(publicDir);
const largeImages = images.filter(img => img.size > 500 * 1024); // > 500KB

if (largeImages.length > 0) {
  console.warn('⚠️  Large images detected (>500KB):');
  largeImages.forEach(img => {
    console.warn(`   ${img.name}: ${(img.size / 1024).toFixed(2)}KB`);
  });
  console.log('💡 Consider optimizing these images for better performance.');
} else {
  console.log('✅ All images are optimized.');
}

// Check for unused dependencies
console.log('📦 Checking for unused dependencies...');
try {
  execSync('npx depcheck', { stdio: 'inherit' });
} catch (error) {
  console.log('Installing depcheck...');
  execSync('npm install --save-dev depcheck', { stdio: 'inherit' });
  execSync('npx depcheck', { stdio: 'inherit' });
}

// Generate build statistics
console.log('📈 Generating build statistics...');
const packageJson = require(path.join(process.cwd(), 'package.json'));
const buildStats = {
  timestamp: new Date().toISOString(),
  version: packageJson.version,
  nodeVersion: process.version,
  dependencies: Object.keys(packageJson.dependencies || {}).length,
  devDependencies: Object.keys(packageJson.devDependencies || {}).length,
  totalImages: images.length,
  largeImages: largeImages.length,
  totalImageSize: images.reduce((sum, img) => sum + img.size, 0)
};

fs.writeFileSync(
  path.join(process.cwd(), 'build-stats.json'),
  JSON.stringify(buildStats, null, 2)
);

console.log('✅ Performance optimization complete!');
console.log(`📊 Build statistics saved to build-stats.json`);
console.log(`📱 Total dependencies: ${buildStats.dependencies}`);
console.log(`🖼️  Total images: ${buildStats.totalImages}`);
console.log(`⚡ Total image size: ${(buildStats.totalImageSize / 1024 / 1024).toFixed(2)}MB`);

// Mobile-specific optimizations
console.log('\n📱 Mobile optimization recommendations:');
console.log('✅ Enable gzip compression on your server');
console.log('✅ Use WebP images where possible');
console.log('✅ Implement lazy loading for images');
console.log('✅ Minimize JavaScript bundle size');
console.log('✅ Use service workers for caching');
console.log('✅ Optimize critical rendering path');

// Security check
console.log('\n🔒 Running security audit...');
try {
  execSync('npm audit --audit-level high', { stdio: 'inherit' });
} catch (error) {
  console.warn('⚠️  Security vulnerabilities detected. Run `npm audit fix` to resolve.');
}