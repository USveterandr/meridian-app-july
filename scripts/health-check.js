// Health check script for deployment verification
const http = require("http")

function healthCheck() {
  const options = {
    hostname: "localhost",
    port: 3000,
    path: "/",
    method: "GET",
    timeout: 5000,
  }

  const req = http.request(options, (res) => {
    console.log(`✅ Health check passed: ${res.statusCode}`)
    process.exit(0)
  })

  req.on("error", (err) => {
    console.log(`❌ Health check failed: ${err.message}`)
    process.exit(1)
  })

  req.on("timeout", () => {
    console.log("❌ Health check timeout")
    req.destroy()
    process.exit(1)
  })

  req.end()
}

// Run health check
console.log("🔍 Running health check...")
healthCheck()
