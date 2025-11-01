import React from "react";
import { FcFolder, FcOpenedFolder } from "react-icons/fc";

const Files = () => {
  const files = [
    { title: "Resume", link: "" },
    { title: "OJT Cert", link: "" },
    { title: "JS Events", link: "" },
    { title: "Scholarship", link: "" },
  ];

  return (
    <div>
      <h2 className="font-bold text-primary/90">Files</h2>
      <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-4 gap-2 sm:gap-x-0 gap-y-2 mt-2 sm:mt-0">
        {files.map((file, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center cursor-pointer group w-max group"
          >
            <FcFolder
              size={50}
              className="group-hover:hidden transition duration-300"
            />
            <FcOpenedFolder
              size={50}
              className="hidden group-hover:block transition duration-300"
            />
            <span className="text-gray-800 text-xs font-semibold text-center group-hover:opacity-80">
              {file.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Files;
