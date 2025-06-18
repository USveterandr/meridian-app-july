/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://master.d22afasxl39ryh.amplifyapp.com",
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ["/api/*", "/admin/*", "/_next/*"],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/", "/_next/"],
      },
    ],
  },
  transform: async (config, path) => {
    // Custom priority for important pages
    const priorities = {
      "/": 1.0,
      "/properties": 0.9,
      "/sell": 0.8,
      "/invest": 0.8,
      "/incentives": 0.7,
      "/about": 0.6,
      "/contact": 0.6,
    }

    return {
      loc: path,
      changefreq: path === "/" ? "daily" : "weekly",
      priority: priorities[path] || 0.5,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    }
  },
}
