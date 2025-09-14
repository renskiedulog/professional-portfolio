"use client";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";
import React, { useState } from "react";
import SearchResult from "./search-result";
import ManageRecommendations from "./manage-recommendations";

export default function ControllerTab() {
  const [searchType, setSearchType] = useState("anime");
  const [searchTerm, setSearchTerm] = useState("");
  const [limit, setLimit] = useState(20);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [lastSearchTerm, setLastSearchTerm] = useState("");

  const handleEnterPress = async (e: React.KeyboardEvent) => {
    if (lastSearchTerm === searchTerm) return;
    if (e.key !== "Enter" || loading) return;
    e.preventDefault();
    setLastSearchTerm(searchTerm);
    handleSearch();
  };

  const handleSearch = async (pageTransition?: boolean) => {
    setLoading(true);
    try {
      const res = await fetch("/api/recommendations/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ searchTerm, searchType, limit, page }),
      });

      if (!res.ok) throw new Error(`Error: ${res.status}`);

      const result = await res.json();
      setData((prev: any) => (pageTransition ? [...prev, ...result] : result));
    } catch (err) {
      console.error("Search request failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full flex-col gap-6 pt-5 pb-3">
      <Tabs defaultValue="add">
        <TabsList>
          <TabsTrigger value="add">Add</TabsTrigger>
          <TabsTrigger value="manage">Manage</TabsTrigger>
        </TabsList>
        <TabsContent value="add">
          <Card className="w-full bg-background p-5">
            <div className="max-w-xl mx-auto relative">
              <Input
                className="!border-black/20 border-2 rounded-full px-4 peer pl-9"
                type="text"
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for an anime, manga, or manhwa..."
                onKeyDown={handleEnterPress}
              />
              <Search
                className="absolute top-1/2 -translate-y-1/2 left-3 opacity-60 peer-focus:opacity-90"
                size={18}
              />
              <div className="absolute top-1/2 right-1 -translate-y-1/2 peer-focus:opacity-90 opacity-70">
                <Select
                  defaultValue="anime"
                  onValueChange={(value) => setSearchType(value)}
                >
                  <SelectTrigger className="max-w gap-1 border-0 outline-none ring-0 focus:ring-0 shadow-none">
                    <SelectValue placeholder="Anime" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="anime">Anime</SelectItem>
                    <SelectItem value="manga">Manga</SelectItem>
                    <SelectItem value="manhwa">Manhwa</SelectItem>
                    <SelectItem value="movie">Movie</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <SearchResult
              page={page}
              setPage={setPage}
              data={data}
              loading={loading}
              handleSearch={handleSearch}
              searchType={searchType}
            />
          </Card>
        </TabsContent>
        <TabsContent value="manage">
          <Card className="w-full bg-background p-5">
            <ManageRecommendations />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
