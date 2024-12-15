import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import React from "react";

const characters = [
  {
    label: "Avid Gamer",
    description:
      "I'm constantly seeking new gaming challenges, whether it's a fresh game or a tough opponent. I thrive on pushing my limits, especially in critical thinking games that sharpen my problem-solving abilities.",
  },
  {
    label: "Problem Solver",
    description:
      "I love tackling problems head-on. No matter how complex, I thrive when I can come up with creative solutions and find a way to make things work.",
  },
  {
    label: "Left Brained",
    description:
      "I'm a logical thinker who enjoys structure and patterns. I excel when there's a clear path and I can break things down step by step.",
  },
  {
    label: "Burning Passion",
    description:
      "When something sparks my interest, I become completely consumed by it. My drive and enthusiasm are unstoppable when I'm pursuing something I care about.",
  },
  {
    label: "Voracious Mind",
    description:
      "I'm constantly craving new knowledge. I never stop learning, always searching for the next thing to expand my mind and satisfy my curiosity.",
  },
  {
    label: "Meticulous Moron",
    description:
      "I tend to get lost in the details, sometimes overthinking even the simplest tasks. But when I do, I make sure everything is just right—often to my own confusion.",
  },
  {
    label: "Focus Fiend",
    description:
      "Once I'm focused on something, nothing can pull me away. I dive in headfirst and don’t stop until it’s finished, no matter how long it takes.",
  },
  {
    label: "Tech Savvy",
    description:
      "I can easily adapt to any device. The computer feels like an extension of myself—whether it's a smartphone, tablet, or desktop, I can navigate and master it effortlessly.",
  },
  {
    label: "Kaizen",
    description:
      "I believe in continuous improvement, no matter how small the step. Every day is an opportunity to refine my skills and make incremental progress toward better results.",
  },
  {
    label: "Anxious Communicator",
    description: "I tend to carefully think through everything I want to say before speaking, often considering how to convey my message in the best way. While this can make me seem hesitant at times, it ensures I communicate thoughtfully and clearly."
  }
  
];

const Characteristics = () => {
  return (
    <div>
      <h2 className="font-bold text-primary/90">Characteristics</h2>
      <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1">
        {characters?.length > 0 &&
          characters?.map((char, idx) => (
            <Tooltip key={idx}>
              <TooltipTrigger asChild>
                <div className="text-sm hover:underline cursor-help" key={idx}>
                  {char?.label}
                </div>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p>{char?.description}</p>
              </TooltipContent>
            </Tooltip>
          ))}
      </div>
    </div>
  );
};

export default Characteristics;
