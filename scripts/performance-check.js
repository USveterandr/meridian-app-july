const fs = require("fs")
const path = require("path")

// Performance check script
function checkBuildPerformance() {
  const buildDir = path.join(process.cwd(), ".next")
  const staticDir = path.join(buildDir, "static")

  if (!fs.existsSync(buildDir)) {
    console.log("❌ Build directory not found. Run npm run build first.")
    return
  }

  console.log("📊 Build Performance Analysis:")
  console.log("================================")

  // Check bundle sizes
  const chunks = fs.readdirSync(path.join(staticDir, "chunks")).filter((f) => f.endsWith(".js"))
  const totalSize = chunks.reduce((acc, chunk) => {
    const filePath = path.join(staticDir, "chunks", chunk)
    const stats = fs.statSync(filePath)
    return acc + stats.size
  }, 0)

  console.log(`📦 Total JS bundle size: ${(totalSize / 1024 / 1024).toFixed(2)} MB`)

  // Check largest chunks
  const chunkSizes = chunks
    .map((chunk) => {
      const filePath = path.join(staticDir, "chunks", chunk)
      const stats = fs.statSync(filePath)
      return { name: chunk, size: stats.size }
    })
    .sort((a, b) => b.size - a.size)

  console.log("\n🔍 Largest chunks:")
  chunkSizes.slice(0, 5).forEach((chunk) => {
    console.log(`  ${chunk.name}: ${(chunk.size / 1024).toFixed(2)} KB`)
  })

  // Performance recommendations
  console.log("\n💡 Performance Recommendations:")
  if (totalSize > 5 * 1024 * 1024) {
    console.log("  ⚠️  Bundle size is large. Consider code splitting.")
  }
  if (chunkSizes[0]?.size > 1024 * 1024) {
    console.log("  ⚠️  Largest chunk is over 1MB. Consider optimization.")
  }

  console.log("  ✅ Enable gzip compression on your server")
  console.log("  ✅ Use CDN for static assets")
  console.log("  ✅ Implement lazy loading for images")
}

checkBuildPerformance()
