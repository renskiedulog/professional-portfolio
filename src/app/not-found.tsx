import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className="w-full min-h-[calc(100vh-40px)] flex items-center justify-center flex-col space-y-2 text-center px-5">
      <p>
        It seems like there isn't a page for this link. Let's go back shall we?
      </p>
      <h1 className="text-5xl font-black text-primary/90 dark:text-primary">
        Page Not Found.
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

export default NotFound;
