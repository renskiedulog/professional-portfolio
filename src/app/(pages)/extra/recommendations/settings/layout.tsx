import { pageMetadata } from "@/lib/site";

// Admin area (settings + login), keep out of search results
export const metadata = pageMetadata({
  title: "Recommendations Settings",
  description: "Private area for managing recommendations.",
  path: "/extra/recommendations/settings",
  noindex: true,
});

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
