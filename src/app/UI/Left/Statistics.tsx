import React from "react";
import AnimatedNumber from "../global-components/animated-number";

const Statistics = () => {
  return (
    <div>
      <h2 className="font-bold text-primary/90 text-lg">Stats</h2>
      <AnimatedNumber value={10000} duration={3} />
    </div>
  );
};

export default Statistics;
