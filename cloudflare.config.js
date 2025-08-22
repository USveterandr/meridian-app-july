/**
 * Cloudflare Workers adapter for Next.js
 * This file configures the app for deployment on Cloudflare Workers
 */

export default {
  /**
   * Configure runtime for Cloudflare Workers
   */
  experimental: {
    runtime: 'experimental-edge',
  },
  
  /**
   * API routes that should run on the edge
   */
  api: {
    /**
     * Configure body parser for edge runtime
     */
    bodyParser: {
      sizeLimit: '1mb',
    },
    /**
     * Response size limit
     */
    responseLimit: '8mb',
  },
}