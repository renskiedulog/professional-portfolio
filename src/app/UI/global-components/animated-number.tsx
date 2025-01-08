"use client";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  useInView,
} from "framer-motion";
import { useEffect, useRef } from "react";

const AnimatedNumber = ({
  value,
  duration = 2,
}: {
  value: number;
  duration?: number;
}) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) =>
    Math.floor(latest).toLocaleString()
  ); // Format the value
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: "all" });

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, {
        duration,
        ease: "easeOut",
      });
      return controls.stop;
    }
  }, [isInView, count, value, duration]);

  return (
    <motion.div ref={ref} className="text-3xl font-bold text-primary/90">
      {rounded}
    </motion.div>
  );
};

export default AnimatedNumber;
