import React from "react";
import AnimatedNumber from "../global-components/animated-number";

const Statistics = () => {
  return (
    <div>
      <h2 className="font-bold text-primary/90 text-lg">Stats</h2>
      <div className="grid grid-cols-3 mt-1">
        <div className="flex flex-col items-center">
          <div className="flex gap-0.5 items-end">
            <AnimatedNumber value={13} />
            <span className="text-xs font-bold mb-1.5">years</span>
          </div>
          <p className="text-xs font-semibold text-muted-foreground text-center">
            Computer Literacy
          </p>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex gap-0.5 items-end">
            <AnimatedNumber value={2} />
            <span className="text-xs font-bold mb-1.5">years</span>
          </div>
          <p className="text-xs font-semibold text-muted-foreground text-center">
            Into Tech Industry
          </p>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex gap-0.5 items-end">
            <AnimatedNumber value={95} />
          </div>
          <p className="text-xs font-semibold text-muted-foreground text-center">
            Tech Literacy
          </p>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
