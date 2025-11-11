import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export const metadata = {
  title: "Works - Under Construction",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/works`,
  },
};

const Page = () => {
  return (
    <div className="w-full min-h-[calc(100vh-40px)] flex items-center justify-center flex-col space-y-2 text-center px-5">
      <p>Very sorry. I still have to work on this page.</p>
      <h1 className="text-5xl font-black text-primary/90 dark:text-primary">
        Under Construction
      </h1>
      <Link
        prefetch={false}
        href="/"
        className="!mt-5"
        aria-label="Go Back To Homepage"
      >
        <Button>Go Back To Homepage</Button>
      </Link>
    </div>
  );
};

export default Page;
