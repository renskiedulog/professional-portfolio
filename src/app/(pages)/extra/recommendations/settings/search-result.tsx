import { Recommendation } from "@/lib/types";
import { PlusIcon } from "lucide-react";
import Image from "next/image";
import React, { Dispatch, KeyboardEvent, SetStateAction } from "react";
import { FaQuestion } from "react-icons/fa";

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
                <p className="absolute bottom-2 left-0 p-2 pb-0 line-clamp-2 text-white z-20">
                  {item?.title}
                </p>
              )}
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black/70" />
              {/* Button Options */}
              <div className="absolute top-0 left-0 z-40 w-full h-full flex justify-between items-end">
                <div className="w-20 h-16 pt-3 pr-5 bg-black/40 rounded-tr-full flex justify-center items-center group-hover:scale-100 scale-0 transition-all ease-in-out duration-200 origin-bottom-left">
                  <FaQuestion className="text-background" />
                </div>
                <div className="w-20 h-16 pt-3 pl-5 bg-black/40 rounded-tl-full flex justify-center items-center group-hover:scale-100 scale-0 transition-all ease-in-out duration-200 origin-bottom-right">
                  <PlusIcon className="text-background" />
                </div>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default SearchResult;
