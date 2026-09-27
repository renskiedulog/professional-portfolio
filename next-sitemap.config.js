const { createClient } = require("@sanity/client");

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://renato-dulog.is-a.dev";

// Runs on postbuild, so every Sanity webhook redeploy refreshes the sitemap
const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-02-26",
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
});

/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl,
  generateRobotsTxt: true,
  sitemapSize: 9999999,
  generateIndexSitemap: false,
  experimental: {
    appDir: true,
  },
  exclude: [
    "/studio/*",
    "/extra/recommendations/settings",
    "/extra/recommendations/settings/*",
    // noindex pages (placeholders and forms)
    "/extra/current-specs",
    "/extra/dev-tools",
    "/extra/game-reviews",
    "/testimonials/add",
    // Agent files have their own sitemap (sitemap-agents.xml)
    "/llms.txt",
    "/llms-full.txt",
    "/sitemap-agents.xml",
    "/md/*",
    "/og-image.png",
  ],
  transform: async (config, path) => {
    return {
      loc: path,
      lastmod: new Date().toISOString(),
      changefreq: "daily",
      priority: 0.7,
    };
  },
  // Entries here override manifest entries with the same loc
  additionalPaths: async () => {
    const { blogs, projects } = await sanity.fetch(`{
      "blogs": *[_type == "blog" && !(_id in path("drafts.**")) && defined(slug.current) && defined(publishedAt) && publishedAt <= now()] { "slug": slug.current, _updatedAt },
      "projects": *[_type == "projects" && !(_id in path("drafts.**")) && defined(slug.current)] { "slug": slug.current, _updatedAt }
    }`);

    const newest = [...blogs, ...projects]
      .map((doc) => doc._updatedAt)
      .sort()
      .at(-1);

    return [
      { loc: "/", lastmod: new Date().toISOString() },
      { loc: "/works", lastmod: newest },
      { loc: "/blog", lastmod: newest },
      ...["anime", "manga", "manhwa", "movie"].map((type) => ({
        loc: `/extra/recommendations/${type}`,
        lastmod: new Date().toISOString(),
      })),

      ...blogs.map((blog) => ({
        loc: `/blog/${blog.slug}`,
        lastmod: blog._updatedAt,
        changefreq: "monthly",
      })),
      ...projects.map((project) => ({
        loc: `/works/${project.slug}`,
        lastmod: project._updatedAt,
        changefreq: "monthly",
      })),
    ];
  },

  robotsTxtOptions: {
    policies: [{ userAgent: "*", allow: "/", disallow: ["/studio"] }],
    additionalSitemaps: [`${siteUrl}/sitemap-agents.xml`],
  },
};

module.exports = config;
