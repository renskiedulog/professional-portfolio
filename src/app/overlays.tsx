"use client";

import { usePathname } from "next/navigation";

const Overlays = () => {
  const pathname = usePathname();

  if (pathname.startsWith("/studio")) return null;

  return (
    <>
      <div className="z-0 fixed bottom-0 inset-x-0 h-12 w-full bg-background to-transparent backdrop-blur-lg [-webkit-mask-image:linear-gradient(to_top,black,transparent)] dark:bg-background" />
    </>
  );
};

export default Overlays;
