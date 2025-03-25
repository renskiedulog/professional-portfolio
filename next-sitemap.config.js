/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: process.env.SITE_URL || "https://renato-dulog.vercel.app/", // Update with your domain
  generateRobotsTxt: true,
  sitemapSize: 5000,
  exclude: ["/studio/*"], // Exclude specific routes
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/" },
      { userAgent: "*", disallow: ["/studio"] },
    ],
  },
};

module.exports = config;
