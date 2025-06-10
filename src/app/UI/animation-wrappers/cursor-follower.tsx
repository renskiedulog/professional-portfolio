"use client";

import { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";

type CursorFollowerProps = {
  hovered: boolean;
  children: React.ReactNode;
};

export default function CursorFollower({
  hovered,
  children,
}: CursorFollowerProps) {
  // Motion values to track cursor position
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth the cursor movement with spring
  const springX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30 });

  useEffect(() => {
    const move = (event: MouseEvent) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-50 bg-primary border border-white flex items-center justify-center text-white select-none"
      style={{
        translateX: springX,
        translateY: springY,
      }}
      animate={{
        width: hovered ? 320 : 20,
        height: hovered ? 320 : 20,
        borderRadius: hovered ? 12 : 999,
        borderColor: hovered ? "white" : "transparent",
        transition: {
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: hovered ? 0.5 : 0,
        },
      }}
    >
      {/* AnimatePresence to fade in/out the content inside */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{
              duration: hovered ? 0.3 : 0, // fade in with 0.3s, fade out instantly
              delay: hovered ? 0.5 : 0,
            }}
            className="px-6 text-center max-w-xs"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
