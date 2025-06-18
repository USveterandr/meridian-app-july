const { execSync } = require("child_process")
const fs = require("fs")
const path = require("path")

async function buildAndAnalyze() {
  console.log("🚀 Starting Build and Analysis Process")
  console.log("=====================================")

  try {
    // Step 1: Pre-build check
    console.log("\n📋 Step 1: Pre-build check...")
    try {
      execSync("node scripts/pre-build-check.js", { stdio: "inherit" })
    } catch (error) {
      console.log("❌ Pre-build check failed")
      return
    }

    // Step 2: Clean previous build
    console.log("\n🧹 Step 2: Cleaning previous build...")
    const buildDir = path.join(process.cwd(), ".next")
    if (fs.existsSync(buildDir)) {
      fs.rmSync(buildDir, { recursive: true, force: true })
      console.log("✅ Previous build cleaned")
    } else {
      console.log("✅ No previous build to clean")
    }

    // Step 3: Install dependencies (if needed)
    console.log("\n📦 Step 3: Checking dependencies...")
    const nodeModulesPath = path.join(process.cwd(), "node_modules")
    if (!fs.existsSync(nodeModulesPath)) {
      console.log("Installing dependencies...")
      execSync("npm ci", { stdio: "inherit" })
    } else {
      console.log("✅ Dependencies already installed")
    }

    // Step 4: Build the project
    console.log("\n🔨 Step 4: Building the project...")
    const startTime = Date.now()

    try {
      execSync("npm run build", { stdio: "inherit" })
      const buildTime = Date.now() - startTime
      console.log(`✅ Build completed in ${Math.round(buildTime / 1000)}s`)
    } catch (error) {
      console.log("❌ Build failed")
      console.error(error.message)
      return
    }

    // Step 5: Analyze build
    console.log("\n📊 Step 5: Analyzing build...")
    try {
      await analyzeBuild()
    } catch (error) {
      console.log("⚠️  Build analysis failed:", error.message)
    }

    // Step 6: Generate sitemap (if configured)
    console.log("\n🗺️  Step 6: Generating sitemap...")
    try {
      execSync("npm run postbuild", { stdio: "inherit" })
      console.log("✅ Sitemap generated")
    } catch (error) {
      console.log("⚠️  Sitemap generation skipped")
    }

    console.log("\n🎉 Build and analysis completed successfully!")
  } catch (error) {
    console.error("❌ Build process failed:", error.message)
    process.exit(1)
  }
}

async function analyzeBuild() {
  const buildDir = path.join(process.cwd(), ".next")

  if (!fs.existsSync(buildDir)) {
    throw new Error("Build directory not found")
  }

  console.log("📊 Build Analysis:")
  console.log("==================")

  // Check if static directory exists
  const staticDir = path.join(buildDir, "static")
  if (!fs.existsSync(staticDir)) {
    console.log("⚠️  Static directory not found - this might be a server-only build")
    return
  }

  // Analyze chunks
  const chunksDir = path.join(staticDir, "chunks")
  if (fs.existsSync(chunksDir)) {
    const chunks = fs.readdirSync(chunksDir).filter((f) => f.endsWith(".js"))

    if (chunks.length > 0) {
      const totalSize = chunks.reduce((acc, chunk) => {
        const filePath = path.join(chunksDir, chunk)
        const stats = fs.statSync(filePath)
        return acc + stats.size
      }, 0)

      console.log(`📦 Total JS bundle size: ${(totalSize / 1024 / 1024).toFixed(2)} MB`)

      // Find largest chunks
      const chunkSizes = chunks
        .map((chunk) => {
          const filePath = path.join(chunksDir, chunk)
          const stats = fs.statSync(filePath)
          return { name: chunk, size: stats.size }
        })
        .sort((a, b) => b.size - a.size)

      console.log("\n🔍 Top 5 largest chunks:")
      chunkSizes.slice(0, 5).forEach((chunk, index) => {
        console.log(`  ${index + 1}. ${chunk.name}: ${(chunk.size / 1024).toFixed(2)} KB`)
      })

      // Performance recommendations
      console.log("\n💡 Performance Recommendations:")
      if (totalSize > 5 * 1024 * 1024) {
        console.log("  ⚠️  Bundle size is large (>5MB). Consider code splitting.")
      } else {
        console.log("  ✅ Bundle size is reasonable (<5MB)")
      }

      if (chunkSizes[0]?.size > 1024 * 1024) {
        console.log("  ⚠️  Largest chunk is over 1MB. Consider optimization.")
      } else {
        console.log("  ✅ Chunk sizes are reasonable (<1MB)")
      }
    } else {
      console.log("⚠️  No JavaScript chunks found")
    }
  } else {
    console.log("⚠️  Chunks directory not found")
  }

  // Check for other build artifacts
  const buildManifest = path.join(buildDir, "build-manifest.json")
  if (fs.existsSync(buildManifest)) {
    console.log("✅ Build manifest found")
  }

  const serverDir = path.join(buildDir, "server")
  if (fs.existsSync(serverDir)) {
    console.log("✅ Server build found")
  }

  console.log("\n🚀 Build optimization tips:")
  console.log("  • Enable gzip compression on your server")
  console.log("  • Use CDN for static assets")
  console.log("  • Implement image optimization")
  console.log("  • Consider lazy loading for non-critical components")
}

// Run the build and analysis
buildAndAnalyze()
