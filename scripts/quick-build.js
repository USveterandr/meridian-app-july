const { execSync } = require("child_process")
const fs = require("fs")
const path = require("path")

function quickBuild() {
  console.log("⚡ Quick Build Process")
  console.log("====================")

  try {
    // Set environment variables
    process.env.NODE_ENV = "production"
    process.env.NEXT_TELEMETRY_DISABLED = "1"

    console.log("🔧 Environment: production")
    console.log("📊 Telemetry: disabled")

    // Quick dependency check
    const nodeModulesPath = path.join(process.cwd(), "node_modules")
    if (!fs.existsSync(nodeModulesPath)) {
      console.log("\n📦 Installing dependencies...")
      execSync("npm ci --silent", { stdio: "inherit" })
    }

    // Clean build directory
    const buildDir = path.join(process.cwd(), ".next")
    if (fs.existsSync(buildDir)) {
      console.log("\n🧹 Cleaning previous build...")
      fs.rmSync(buildDir, { recursive: true, force: true })
    }

    // Build
    console.log("\n🔨 Building project...")
    const startTime = Date.now()

    execSync("npm run build", { stdio: "inherit" })

    const buildTime = Date.now() - startTime
    console.log(`\n✅ Build completed in ${Math.round(buildTime / 1000)}s`)

    // Quick analysis
    if (fs.existsSync(buildDir)) {
      console.log("✅ Build directory created successfully")

      const staticDir = path.join(buildDir, "static")
      if (fs.existsSync(staticDir)) {
        console.log("✅ Static assets generated")
      }

      const serverDir = path.join(buildDir, "server")
      if (fs.existsSync(serverDir)) {
        console.log("✅ Server build generated")
      }
    }

    console.log("\n🎉 Quick build completed successfully!")
  } catch (error) {
    console.error("❌ Quick build failed:", error.message)
    process.exit(1)
  }
}

// Run quick build
quickBuild()
