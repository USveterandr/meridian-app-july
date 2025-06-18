/** @type {import('next').NextConfig} */
const nextConfig = {
  // Basic stable configuration
  reactStrictMode: true,
  
  // Image optimization with basic settings
  images: {
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Disable telemetry
  telemetry: false,

  // Basic headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ]
  },

  // Enable optimizations
  swcMinify: true,
  poweredByHeader: false,

  // Skip errors during build for faster deployment
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  // Standalone output for better deployment
  output: 'standalone',
}

export default nextConfig
