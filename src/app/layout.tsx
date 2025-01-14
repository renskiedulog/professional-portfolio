import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme-provider";
import { AnimatePresence } from "framer-motion";
import { TooltipProvider } from "@/components/ui/tooltip";
import { StorageProvider } from "./UI/global-components/storage-provider";
import NavigationBar from "./UI/global-components/navigation-bar";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Web Portfolio",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative`}
      >
        {/* Light */}
        <div className="dark:hidden block fixed -z-10 h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
        {/* Dark */}
        <div className="dark:block hidden fixed bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        {/* Breakpoints */}
        {/* <div className="dark:bg-white dark:text-black bg-slate-700 text-white text-xs fixed top-2 left-2 w-8 aspect-square flex items-center justify-center rounded-full z-50 border-white/50 border group">
          <div className="block sm:hidden">SM</div>
          <div className="hidden sm:block md:hidden">MD</div>
          <div className="hidden md:block lg:hidden">LG</div>
          <div className="hidden lg:block xl:hidden">XL</div>
          <div className="hidden xl:block 2xl:hidden">2XL</div>
        </div> */}

        {/* Content */}
        <main className="max-w-5xl mx-auto py-5 relative">
          <Analytics />
          <SpeedInsights/>
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
                <div className="z-0 fixed bottom-0 inset-x-0 h-12 w-full bg-background to-transparent backdrop-blur-lg [-webkit-mask-image:linear-gradient(to_top,black,transparent)] dark:bg-background" />
              </TooltipProvider>
            </ThemeProvider>
          </StorageProvider>
        </main>
      </body>
    </html>
  );
}
