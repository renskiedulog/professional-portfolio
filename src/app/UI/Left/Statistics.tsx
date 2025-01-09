import React from "react";
import AnimatedNumber from "../global-components/animated-number";

const Statistics = () => {
  const stats = [
    {
      value: 13,
      unit: "years",
      label: "Computer Literacy",
      duration: 1.5,
    },
    {
      value: 3,
      unit: "years",
      label: "Into Tech Industry",
      duration: 1,
    },
    {
      value: 20,
      unit: "+",
      label: "Websites Worked",
    },
    {
      value: 90,
      unit: "wpm",
      label: "Avg. Typing Speed",
    },
    {
      value: 5,
      unit: "hours",
      label: "Avg. Coding Hours Per Day ",
      duration: 1,
    },
  ];

  return (
    <div>
      <h2 className="font-bold text-primary/90 text-lg">Stats</h2>
      <div className="flex flex-wrap mt-1 gap-y-5 justify-center">
        {stats.map((stat, index) => (
          <div key={index} className="flex flex-col items-center basis-1/3">
            <div className="flex gap-0.5 items-end">
              <AnimatedNumber
                value={stat.value}
                duration={stat.duration || 2}
              />
              {stat.unit && (
                <span className="text-xs font-bold mb-1.5">{stat.unit}</span>
              )}
            </div>
            <p className="text-xs font-semibold text-muted-foreground text-center">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Statistics;
