"use client";

import * as React from "react";
import Image from "next/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  images: string[];
};

const ProjectImages = ({ images }: Props) => {
  const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null);

  const prev = () =>
    setSelectedIndex((i) =>
      i !== null ? (i - 1 + images.length) % images.length : null,
    );
  const next = () =>
    setSelectedIndex((i) => (i !== null ? (i + 1) % images.length : null));

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedIndex]);

  return (
    <>
      {/* Grid */}
      <div className="flex flex-wrap gap-1">
        {images.map((src, index) => (
          <button
            key={index}
            onClick={() => setSelectedIndex(index)}
            className="w-20 h-20 relative overflow-hidden flex-grow max-w-24 rounded-md border hover:scale-105 transition-transform duration-300"
          >
            <Image
              src={src}
              alt={`Project image ${index + 1}`}
              fill
              className="object-cover"
              sizes="160px"
            />
          </button>
        ))}
      </div>

      {/* Dialog */}
      <Dialog
        open={selectedIndex !== null}
        onOpenChange={() => setSelectedIndex(null)}
      >
        <AnimatePresence>
          {selectedIndex !== null && (
            <DialogContent className="max-w-3xl p-0 overflow-hidden border-none bg-transparent shadow-none [&_button_svg]:stroke-white [&_button]:bg-black">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="relative w-full h-[70vh] rounded-xl overflow-hidden bg-black"
              >
                <Image
                  src={images[selectedIndex]}
                  alt="Expanded project image"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 800px"
                  priority
                />

                {images.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        prev();
                      }}
                      className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-1.5 rounded-full bg-black/60 hover:bg-white/20 transition-colors"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-6 h-6 stroke-white" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        next();
                      }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-1.5 rounded-full bg-black/60 hover:bg-white/20 transition-colors"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-6 h-6 stroke-white" />
                    </button>

                  </>
                )}
              </motion.div>
            </DialogContent>
          )}
        </AnimatePresence>
      </Dialog>
    </>
  );
};

export default ProjectImages;
