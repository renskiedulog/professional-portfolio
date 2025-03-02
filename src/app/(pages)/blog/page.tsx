"use client";
import Container from "@/app/UI/global-components/container";
import BackButton from "@/app/UI/global-components/back-button";
import BlurFade from "@/app/UI/animation-wrappers/fade";
import { Filter, Search, XIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Filters from "@/app/UI/blog/filters";
import BrowseSection from "./browseSection";

const blogs = [
  {
    description:
      "asp;dojkaspdouaqwoqrhjalsdfnaklsfh aklsjhdfa jsfhao. iroaqiuyqo yfoashdfaldjshasdkljahsldhasld",
    slug: "another-example-blog",
    author: {
      name: "Renato Dulog",
      image:
        "https://cdn.sanity.io/images/0l8qvi2n/portfolio/66bbca211e1e2685e98daa07e9c287863c568c65-600x600.png",
    },
    publishedAt: "2025-02-26T09:32:15.423Z",
    mainImage:
      "https://cdn.sanity.io/images/0l8qvi2n/portfolio/f289cfc19af344b510a3484ca4d93517b020db24-703x463.jpg",
    categories: [
      {
        _id: "1b3516e6-19b7-4d4b-8f32-83cc7587f290",
        title: "Technology",
        slug: null,
      },
      {
        _id: "a187b946-b6ae-4d74-9d31-5a9fbb033a24",
        title: "Example",
        slug: null,
      },
    ],
    _id: "20cd3624-7d31-4e0c-a24b-73b98d268d9b",
    title: "Another Example Blog Just For Me To Test It Out",
  },
  {
    description:
      "Explore the latest advancements in edge computing and how it's transforming industries by bringing data processing closer to the source. Learn about its benefits, real-world applications, and the challenges businesses face in adopting this cutting-edge technology.",
    slug: "example-title-of-an-example-blog",
    author: {
      name: "Renato Dulog",
      image:
        "https://cdn.sanity.io/images/0l8qvi2n/portfolio/66bbca211e1e2685e98daa07e9c287863c568c65-600x600.png",
    },
    publishedAt: "2025-02-25T16:00:00.000Z",
    mainImage:
      "https://cdn.sanity.io/images/0l8qvi2n/portfolio/f289cfc19af344b510a3484ca4d93517b020db24-703x463.jpg",
    categories: [
      {
        _id: "1b3516e6-19b7-4d4b-8f32-83cc7587f290",
        title: "Technology",
        slug: null,
      },
    ],
    _id: "8a694aed-4381-47b0-8e02-e676558c3d37",
    title: "The Rise of Edge Computing: Transforming Data Processing",
  },
];

const page = () => {
  const [toggleFilter, setToggleFilter] = useState(false);
  // const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   const fetchBlogs = async () => {
  //     try {
  //       const res = await fetch("/api/get-blogs");
  //       const data = await res.json();
  //       setBlogs(data);
  //     } catch (error) {
  //       console.error("Error fetching blogs:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchBlogs();
  // }, []);

  return (
    <Container>
      <BlurFade className="px-3 sm:px-5" key="blog-page" yOffset={0}>
        {/* Navigation Bar */}
        <div className="w-full flex justify-between">
          <BackButton href="/" />
          {/* Filter Options */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <Input
                type="text"
                className="h-max w-[120px] sm:w-[150px] bg-white dark:bg-primary/10 sm:text-base text-sm pl-8 peer focus:w-[180px] sm:focus:w-[300px] transition-all duration-200 ease-in-out"
                placeholder="Search..."
              />
              <Search
                size={18}
                className="absolute top-1/2 left-2 -translate-y-1/2 text-gray-400 opacity-50 transition-opacity duration-300 ease-in-out peer-focus:opacity-100"
              />
            </div>
            <button
              className="items-center gap-2"
              onClick={() => setToggleFilter((prev) => !prev)}
            >
              {!toggleFilter ? (
                <BlurFade key="filter" duration={0.1} yOffset={0}>
                  <Filter
                    size={20}
                    className="opacity-70 cursor-pointer hover:scale-110 transition duration-200 ease-in-out"
                  />
                </BlurFade>
              ) : (
                <BlurFade key="close" duration={0.1} yOffset={0}>
                  <XIcon
                    size={20}
                    className="opacity-70 cursor-pointer hover:scale-110 transition duration-200 ease-in-out"
                  />
                </BlurFade>
              )}
            </button>
          </div>
        </div>
        <div className="pt-5">
          {toggleFilter && (
            <BlurFade key="filter" duration={0.3} yOffset={0}>
              <Filters />
            </BlurFade>
          )}
          {/* Blog Posts */}
          <BrowseSection loading={false} blogs={blogs} />
        </div>
      </BlurFade>
    </Container>
  );
};

export default page;
