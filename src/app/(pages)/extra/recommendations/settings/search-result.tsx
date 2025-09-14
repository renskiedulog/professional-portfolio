import { Recommendation } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import React, { Dispatch, SetStateAction } from "react";
import { FaQuestion } from "react-icons/fa";
import AddRecommendationBtn from "./add-button";
import { Badge } from "@/components/ui/badge";

const SearchResult = ({
  data,
  page,
  setPage,
  loading,
  handleSearch,
  searchType,
}: {
  data: Recommendation;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  loading: boolean;
  handleSearch: (pageTransition?: boolean) => void;
  searchType: string;
}) => {
  console.log(searchType);
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen flex-col">
        <div className="dot-spinner">
          <div className="dot-spinner__dot before:bg-primary"></div>
          <div className="dot-spinner__dot before:bg-primary"></div>
          <div className="dot-spinner__dot before:bg-primary"></div>
          <div className="dot-spinner__dot before:bg-primary"></div>
          <div className="dot-spinner__dot before:bg-primary"></div>
          <div className="dot-spinner__dot before:bg-primary"></div>
          <div className="dot-spinner__dot before:bg-primary"></div>
          <div className="dot-spinner__dot before:bg-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <section className={`${!data ? "mt-0" : "mt-5"}`}>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {data?.data &&
          data?.data?.length > 0 &&
          data?.data?.map((item, idx) => {
            let pageSlug = searchType;
            if (searchType === "movie") {
              pageSlug = "anime";
            }

            return (
              <div key={idx} className="relative rounded overflow-hidden group">
                {item?.image && (
                  <Image
                    src={item?.image}
                    width={200}
                    height={300}
                    alt={item?.title}
                    unoptimized
                    className="w-60 h-80 lg:h-60 object-cover"
                  />
                )}
                {item?.title && (
                  <Badge className="absolute text-[10px] uppercase top-1.5 left-1.5 pb-0 line-clamp-2 text-white z-20">
                    {item?.type}
                  </Badge>
                )}
                {item?.title && (
                  <p className="absolute bottom-2 left-0 p-2 pb-0 line-clamp-2 text-white z-20">
                    {item?.title}
                  </p>
                )}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black/70" />
                {/* Button Options */}
                <div className="absolute top-0 left-0 z-40 w-full h-full flex justify-between items-start">
                  {/* Anime Info Link */}
                  <Link
                    href={`/extra/recommendations/${pageSlug}/${item?.id}`}
                    target="_blank"
                    className="w-16 h-14 pb-3 pr-3 aspect-square bg-black/80 rounded-br-full flex justify-center items-center group-hover:scale-100 scale-0 transition-all ease-in-out duration-200 origin-top-left hover:bg-blue-400"
                  >
                    <FaQuestion className="text-background dark:text-white" />
                  </Link>
                  {/* Add Button */}
                  <AddRecommendationBtn item={item} searchType={searchType} />
                </div>
              </div>
            );
          })}
      </div>
      {data?.data && data?.data?.length === 0 && (
        <p className="text-gray-500 p-5 text-center w-full">
          No results found.
        </p>
      )}
    </section>
  );
};

export default SearchResult;
