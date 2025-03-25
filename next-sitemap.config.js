/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL || "https://renato-dulog.vercel.app/", // Update with your domain
  generateRobotsTxt: true,
  sitemapSize: 5000,
  exclude: ["/studio/*"],
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/" },
      { userAgent: "*", disallow: ["/studio"] },
    ],
  },
};

module.exports = config;
