// Build monitoring script
const fs = require("fs")
const path = require("path")

function monitorBuild() {
  console.log("📊 Build Monitor Started")
  console.log("========================")

  // Check if build directory exists
  const buildDir = path.join(process.cwd(), ".next")
  if (fs.existsSync(buildDir)) {
    console.log("✅ Build directory found")

    // Check for key files
    const keyFiles = [".next/BUILD_ID", ".next/static", ".next/server"]

    keyFiles.forEach((file) => {
      const filePath = path.join(process.cwd(), file)
      if (fs.existsSync(filePath)) {
        console.log(`✅ ${file} exists`)
      } else {
        console.log(`❌ ${file} missing`)
      }
    })
  } else {
    console.log("❌ Build directory not found")
  }

  // Memory usage
  const memUsage = process.memoryUsage()
  console.log("\n💾 Memory Usage:")
  console.log(`RSS: ${Math.round(memUsage.rss / 1024 / 1024)} MB`)
  console.log(`Heap Used: ${Math.round(memUsage.heapUsed / 1024 / 1024)} MB`)
  console.log(`Heap Total: ${Math.round(memUsage.heapTotal / 1024 / 1024)} MB`)

  console.log("\n🎉 Build monitoring complete!")
}

monitorBuild()
