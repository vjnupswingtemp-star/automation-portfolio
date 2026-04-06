/** @type {import('next-sitemap').IConfig} */
module.exports = {
  // ← Replace with your production domain before deploying
  siteUrl: process.env.SITE_URL || 'https://example.com',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
    ],
  },
  // Single-page site — only one URL to index
  generateIndexSitemap: false,
}
