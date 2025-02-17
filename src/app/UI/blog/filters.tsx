"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

const filterOptions = [
  { id: "new", label: "New Arrivals" },
  { id: "sale", label: "Sale" },
  { id: "inStock", label: "In Stock" },
  { id: "topRated", label: "Top Rated" },
]

const FilterBadge = ({ label, isSelected, onClick }) => (
  <Badge
    variant={isSelected ? "default" : "outline"}
    className={`mr-2 mb-2 cursor-pointer text-sm font-normal ${isSelected ? "bg-primary text-primary-foreground" : ""}`}
    onClick={onClick}
  >
    {label}
    {isSelected && <X className="ml-1 h-3 w-3" />}
  </Badge>
)

const Filters = () => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])

  const toggleFilter = (filterId: string) => {
    setSelectedFilters((prev) => (prev.includes(filterId) ? prev.filter((id) => id !== filterId) : [...prev, filterId]))
  }

  const clearFilters = () => {
    setSelectedFilters([])
  }

  return (
    <section className="py-5">
      <div className="flex flex-wrap items-center">
        {filterOptions.map((filter) => (
          <FilterBadge
            key={filter.id}
            label={filter.label}
            isSelected={selectedFilters.includes(filter.id)}
            onClick={() => toggleFilter(filter.id)}
          />
        ))}
        {selectedFilters.length > 0 && (
          <Button variant="ghost" onClick={clearFilters} className="mb-2">
            Clear All
          </Button>
        )}
      </div>
    </section>
  )
}

export default Filters

