/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://renato-dulog.is-a.dev/", // Update with your domain
  generateRobotsTxt: true,
  sitemapSize: 9999999,
  generateIndexSitemap: false,
  exclude: ["/studio/*"],
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/" },
      { userAgent: "*", disallow: ["/studio"] },
    ],
  },
  additionalPaths: async () => {
    return [
      {
        loc: "/blog",
        lastmod: new Date().toISOString(),
      },
    ];
  },
};

module.exports = config;
