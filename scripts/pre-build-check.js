const fs = require("fs")
const path = require("path")

// Pre-build environment check
function preBuildCheck() {
  console.log("🔍 Pre-Build Environment Check")
  console.log("================================")

  // Check Node.js version
  const nodeVersion = process.version
  console.log(`📦 Node.js version: ${nodeVersion}`)

  // Check if package.json exists
  const packageJsonPath = path.join(process.cwd(), "package.json")
  if (fs.existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"))
    console.log(`📋 Project: ${packageJson.name} v${packageJson.version}`)
    console.log(`🔧 Next.js version: ${packageJson.dependencies.next}`)
  }

  // Check if node_modules exists
  const nodeModulesPath = path.join(process.cwd(), "node_modules")
  if (fs.existsSync(nodeModulesPath)) {
    console.log("✅ Dependencies installed")
  } else {
    console.log("❌ Dependencies not installed. Run 'npm install' first.")
    return false
  }

  // Check critical files
  const criticalFiles = ["next.config.mjs", "tailwind.config.ts", "package.json", "app/layout.tsx", "app/page.tsx"]

  console.log("\n📁 Critical Files Check:")
  let allFilesExist = true

  criticalFiles.forEach((file) => {
    const filePath = path.join(process.cwd(), file)
    if (fs.existsSync(filePath)) {
      console.log(`✅ ${file}`)
    } else {
      console.log(`❌ ${file} - Missing!`)
      allFilesExist = false
    }
  })

  // Check environment variables
  console.log("\n🌍 Environment Variables:")
  const envVars = ["NODE_ENV", "NEXT_TELEMETRY_DISABLED"]
  envVars.forEach((envVar) => {
    const value = process.env[envVar]
    if (value) {
      console.log(`✅ ${envVar}: ${value}`)
    } else {
      console.log(`⚠️  ${envVar}: Not set`)
    }
  })

  // Memory check
  const memoryUsage = process.memoryUsage()
  console.log(`\n💾 Memory Usage: ${Math.round(memoryUsage.heapUsed / 1024 / 1024)} MB`)

  if (allFilesExist) {
    console.log("\n✅ Pre-build check passed! Ready to build.")
    return true
  } else {
    console.log("\n❌ Pre-build check failed! Please fix missing files.")
    return false
  }
}

// Run the check
const canBuild = preBuildCheck()
process.exit(canBuild ? 0 : 1)
