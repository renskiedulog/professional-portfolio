import BlurFade from "@/app/UI/animation-wrappers/fade";
import BackButton from "@/app/UI/global-components/back-button";
import Container from "@/app/UI/global-components/container";
import { Button } from "@/components/ui/button";

import Link from "next/link";

export const metadata = {
  title: "Services",
};

const WorksPage = () => {
  return (
    <Container as="main">
      <BlurFade className="px-3 sm:px-5">
        {/* Navigation Bar */}
        <div className="w-full flex justify-between">
          <BackButton href="/" />
        </div>
        <div>
          {/* <Heading className="w-full text-center my-5">
            Personal Projects
          </Heading> */}
          <div className="w-full min-h-[calc(80vh-40px)] flex items-center justify-center flex-col space-y-2 text-center px-5">
            <p className="text-sm md:text-base">
              I'm currently working on this page to offer the best services I
              can.
            </p>
            <h1 className="text-4xl md:text-5xl font-black text-primary/90 dark:text-primary">
              Under Construction.
            </h1>
            <div className="flex justify-between items-center gap-5">
              <Link prefetch={false} href="/" className="!mt-5">
                <Button>Go Back To Homepage</Button>
              </Link>
              <Link prefetch={false} href="/blog" className="!mt-5">
                <Button variant="secondary">Browse My Blogs</Button>
              </Link>
            </div>
          </div>
        </div>
      </BlurFade>
    </Container>
  );
};

export default WorksPage;
