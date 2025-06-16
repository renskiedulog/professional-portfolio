"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PortableText } from "@portabletext/react";
import { ChevronDown } from "lucide-react";
import PortableTextComponents from "@/app/UI/sanity/portableTextComponents";
import { Item } from "./page";

const QuestionCards = ({ questions }: { questions: Item[] }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="w-full flex flex-col gap-2 mt-5 items-center md:mb-20">
      {questions?.map((item, index) => (
        <motion.div
          key={`question-card-${index}`}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            delay: index * 0.15,
            duration: 0.5,
            ease: "easeOut",
          }}
          className="bg-background/50 border rounded p-4 max-w-3xl w-full"
        >
          {/* Question Toggle */}
          <button
            onClick={() =>
              setOpenIndex((prev) => (prev === index ? null : index))
            }
            className="w-full flex justify-between items-center text-left gap-5"
          >
            <h2 className="text-base sm:text-lg font-semibold">
              {item.question}
            </h2>
            <motion.div
              animate={{ rotate: openIndex === index ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown className="w-5 h-5 text-gray-600" />
            </motion.div>
          </button>

          {/* Animated Answer */}
          <AnimatePresence initial={false}>
            {openIndex === index && (
              <motion.div
                key="answer"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="overflow-hidden mt-3 text-primary/80 dark:text-primary"
              >
                <PortableText
                  value={item.answer}
                  components={PortableTextComponents as any}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
};

export default QuestionCards;
