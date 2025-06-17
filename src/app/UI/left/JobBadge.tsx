"use client";
import { useState } from "react";

const JobBadge = () => {
  const [looking, setLooking] = useState(false);

  return (
    <div className="w-full flex items-center justify-center !mt-2">
      <div
        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold transition ${
          looking ? "bg-green-600 text-white" : "bg-gray-200 text-gray-700"
        }`}
      >
        {looking ? "Open To Work" : "Focused on Current Role"}
      </div>
    </div>
  );
};

export default JobBadge;
