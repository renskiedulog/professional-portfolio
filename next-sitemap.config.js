/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://renato-dulog.is-a.dev",
  generateRobotsTxt: true,
  sitemapSize: 9999999,
  generateIndexSitemap: false,
  experimental: {
    appDir: true,
  },
  exclude: ["/studio/*"],
  transform: async (config, path) => {
    return {
      loc: path,
      lastmod: new Date().toISOString(),
      changefreq: "daily",
      priority: 0.7,
    };
  },
  additionalPaths: async () => {
    const slugs = await fetch(
      "https://renato-dulog.is-a.dev/api/get-blogs"
    ).then((res) => res.json());

    return [
      { loc: "/", lastmod: new Date().toISOString() },
      { loc: "/works", lastmod: new Date().toISOString() },
      { loc: "/blog", lastmod: new Date().toISOString() },

      ...slugs.map((blog) => ({
        loc: `/blog/${blog.slug}`,
        lastmod: new Date().toISOString(),
      })),
    ];
  },

  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/" },
      { userAgent: "*", disallow: ["/studio"] },
    ],
  },
};

module.exports = config;
