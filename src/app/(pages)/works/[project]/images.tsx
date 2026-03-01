"use client";

import * as React from "react";
import Image from "next/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  images: string[];
};

const ProjectImages = ({ images }: Props) => {
  const [selectedImage, setSelectedImage] = React.useState<string | null>(null);

  return (
    <>
      {/* Grid */}
      <div className="flex flex-wrap gap-1">
        {images.map((src, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(src)}
            className="w-20 h-20 relative overflow-hidden flex-grow rounded-md border hover:scale-105 transition-transform duration-300"
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
        open={!!selectedImage}
        onOpenChange={() => setSelectedImage(null)}
      >
        <AnimatePresence>
          {selectedImage && (
            <DialogContent className="max-w-3xl p-0 overflow-hidden border-none bg-transparent shadow-none [&_button_svg]:stroke-white [&_button]:bg-black">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="relative w-full h-[70vh] rounded-xl overflow-hidden bg-black"
              >
                <Image
                  src={selectedImage}
                  alt="Expanded project image"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 800px"
                  priority
                />
              </motion.div>
            </DialogContent>
          )}
        </AnimatePresence>
      </Dialog>
    </>
  );
};

export default ProjectImages;
