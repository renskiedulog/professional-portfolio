import { sanityClient } from "@/lib/sanityClient";

const SiteVisitScript = async () => {
  const patch = sanityClient
    .patch("siteMetrics")
    .setIfMissing({ siteVisits: 0 })
    .inc({ siteVisits: 1 });

  await sanityClient.transaction().patch(patch).commit();

  return null;
};

export default SiteVisitScript;
