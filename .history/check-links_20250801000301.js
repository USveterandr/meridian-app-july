const fs = require('fs');
const path = require('path');

// List of paths to check, derived from header.tsx and footer.tsx
const pathsToCheck = [
  // Header links
  '/',
  '/properties',
  '/sell',
  '/invest',
  '/incentives',
  '/login',
  '/register',
  // Footer links - EMPRESA
  '/about',
  '/contact',
  '/careers',
  '/press',
  '/blog',
  // Footer links - PROPIEDADES
  '/properties/houses',
  '/properties/apartments',
  '/properties/commercial',
  '/properties/hotels',
  // Footer links - SERVICIOS
  '/sell', // Duplicate, but okay
  '/invest', // Duplicate
  '/incentives', // Duplicate
  '/legal',
  '/financing',
  // Footer links - SOPORTE
  '/help',
  '/buyer-guide',
  '/seller-guide',
  '/faq',
  '/reports',
  // Footer bottom links
  '/terms',
  '/privacy',
  // Additional pages from file list that might be linked or directly accessible
  '/dashboard',
  '/authenticate-cedula',
  '/verify-email',
  // Property pages might be linked from /properties
  // Assuming they are accessible if /properties works, but good to check key ones
  '/properties/houses', // Already listed
  '/properties/apartments', // Already listed
  '/properties/commercial', // Already listed
  '/properties/hotels', // Already listed
];

// Function to check a single path
async function checkPath(path) {
  const url = `http://localhost:3000${path}`;
  try {
    const response = await fetch(url);
    if (response.ok) {
      console.log(`✅ ${path}: ${response.status} ${response.statusText}`);
    } else {
      console.log(`❌ ${path}: ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    console.log(`❌ ${path}: Error - ${error.message}`);
  }
}

// Main function to check all paths
async function checkAllPaths() {
  console.log(`Starting link checks for ${pathsToCheck.length} paths...`);
  console.log("Make sure your Next.js app is running on http://localhost:3000");
  console.log("----------------------------------------------------");

  for (const path of pathsToCheck) {
    await checkPath(path);
    // Add a small delay to avoid overwhelming the server
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  console.log("----------------------------------------------------");
  console.log("Link check complete.");
}

checkAllPaths();
