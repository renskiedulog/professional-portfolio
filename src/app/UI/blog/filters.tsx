"use client";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const FilterBadge = ({
  label,
  isSelected,
  onClick,
}: {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}) => (
  <Badge
    variant={isSelected ? "default" : "outline"}
    className={`cursor-pointer text-sm font-normal ${isSelected ? "bg-primary text-primary-foreground" : ""}`}
    onClick={onClick}
  >
    {label}
    {isSelected && <X className="ml-1 h-3 w-3" />}
  </Badge>
);

const Filters = ({
  selectedFilters,
  setSelectedFilters,
  filters,
  removeParams,
}: {
  selectedFilters: string[];
  setSelectedFilters: (e: any) => void;
  filters: string[];
  removeParams: () => void;
}) => {
  const toggleFilter = (filterId: string) => {
    removeParams();
    setSelectedFilters((prev: any) =>
      prev.includes(filterId)
        ? prev.filter((id: any) => id !== filterId)
        : [...prev, filterId]
    );
  };

  const clearFilters = () => {
    setSelectedFilters([]);
  };

  return (
    <section className="pt-5">
      <div className="flex flex-wrap items-center mx-0 md:mx-5 justify-center gap-1.5 sm:gap-2">
        {filters?.map((filter, idx) => (
          <FilterBadge
            key={filter}
            label={filter}
            isSelected={selectedFilters.includes(filter)}
            onClick={() => toggleFilter(filter)}
          />
        ))}
        <AnimatePresence>
          {selectedFilters.length > 0 && (
            <motion.div
              key="clear-button"
              onClick={clearFilters}
              className="cursor-pointer"
              initial={{ opacity: 0, x: -20, filter: "blur(5px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -20, filter: "blur(5px)" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <Badge className="bg-red-600 text-sm font-normal hover:bg-red-400">
                Clear All
              </Badge>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Filters;
