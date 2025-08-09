import { Recommendation } from "@/lib/types";
import Image from "next/image";
import React, { Dispatch, KeyboardEvent, SetStateAction } from "react";

const SearchResult = ({
  data,
  page,
  setPage,
  loading,
  handleSearch,
}: {
  data: Recommendation;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  loading: boolean;
  handleSearch: (pageTransition?: boolean) => void;
}) => {
  console.log(data);
  if (loading) {
    return "Loading...";
  }

  return (
    <section className="mt-5">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {data?.data &&
          data?.data?.length > 0 &&
          data?.data?.map((item, idx) => (
            <div key={idx} className="relative rounded overflow-hidden">
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
                <p className="absolute bottom-2 left-0 p-2 pb-0 line-clamp-2 text-white z-20">
                  {item?.title}
                </p>
              )}
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black/70" />
            </div>
          ))}
      </div>
    </section>
  );
};

export default SearchResult;
