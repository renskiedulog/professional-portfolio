import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme-provider";
import { AnimatePresence } from "framer-motion";
import { TooltipProvider } from "@/components/ui/tooltip";
import { StorageProvider } from "./UI/global-components/storage-provider";
import NavigationBar from "./UI/global-components/navigation-bar";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "sonner";
import Overlays from "./overlays";
import BreadcrumbJsonLd from "./UI/global-components/breadcrumb-jsonld";
import {
  OG_IMAGE,
  personSchema,
  SITE_DESCRIPTION,
  SITE_TITLE,
  SITE_URL,
} from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: "%s | Renato Dulog",
    default: SITE_TITLE,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    siteName: "Renato Dulog | Developer Portfolio",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: SITE_TITLE,
      },
    ],
    type: "website",
    locale: "en_PH",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
  },
  // No canonical/og:url here: children would inherit the homepage URL.
  // Every page sets its own through pageMetadata().
  authors: [{ name: "Renato Dulog", url: SITE_URL }],
  other: {
    preconnect: "https://avatars.githubusercontent.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <BreadcrumbJsonLd />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative`}
      >
        {/* Light */}
        <div className="dark:hidden block fixed -z-10 h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />
        {/* Dark */}
        <div className="dark:block hidden fixed bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
        {/* Content */}
        <main className="relative">
          <Analytics />
          <SpeedInsights />
          <StorageProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem
              disableTransitionOnChange
            >
              <TooltipProvider>
                <NavigationBar />
                <AnimatePresence mode="wait">{children}</AnimatePresence>
                <Overlays />
              </TooltipProvider>
            </ThemeProvider>
          </StorageProvider>
        </main>
        <Toaster />
      </body>
    </html>
  );
}
