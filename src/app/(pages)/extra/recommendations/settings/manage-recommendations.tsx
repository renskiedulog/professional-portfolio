import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

function ManageRecommendations() {
  const [recs, setRecs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [category, setCategory] = useState<string>("all");
  const [deleteMode, setDeleteMode] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    fetchRecs();
  }, []);

  const fetchRecs = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/recommendations/all");
      const data = await res.json();
      setRecs(data.recommendations || []);
    } catch (err) {
      setError("Failed to fetch recommendations");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (ids: string[]) => {
    if (
      !confirm("Are you sure you want to delete the selected recommendations?")
    )
      return;
    setDeleting("multi");
    try {
      const res = await fetch(`/api/recommendations/delete-multi`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids }),
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error?.error || "Failed to delete");
      }
      setRecs((prev) => prev.filter((rec) => !ids.includes(rec._id)));
      setSelected([]);
      setDeleteMode(false);
    } catch (err: any) {
      alert(err?.message || "Failed to delete");
    } finally {
      setDeleting(null);
    }
  };

  if (loading) return <div>Loading recommendations...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!recs.length) return <div>No recommendations found.</div>;

  // Filter recs by category
  const filteredRecs =
    category === "all" ? recs : recs.filter((rec) => rec.type === category);

  // Category toggles
  const categories = [
    { label: "All", value: "all" },
    { label: "Anime", value: "anime" },
    { label: "Manga", value: "manga" },
    { label: "Manhwa", value: "manhwa" },
    { label: "Movie", value: "movie" },
  ];

  return (
    <>
      <section className={`${!recs.length ? "mt-0" : "mt-5"}`}>
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          {categories.map((cat) => (
            <Button
              key={cat.value}
              variant={category === cat.value ? "default" : "outline"}
              size="sm"
              onClick={() => setCategory(cat.value)}
            >
              {cat.label}
            </Button>
          ))}
          <Button
            variant={deleteMode ? "destructive" : "destructive"}
            size="sm"
            className="ml-auto"
            onClick={() => {
              setDeleteMode((prev) => !prev);
              setSelected([]);
            }}
          >
            {deleteMode ? "Cancel" : "Delete Recommendations"}
          </Button>
          {deleteMode && selected.length > 0 && (
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleDelete(selected)}
              disabled={deleting === "multi"}
            >
              {deleting === "multi"
                ? "Deleting..."
                : `Delete Selected (${selected.length})`}
            </Button>
          )}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredRecs.map((rec) => {
            const checked = selected.includes(rec._id);
            return (
              <div
                key={rec._id}
                className={`relative rounded overflow-hidden group transition-all duration-150 cursor-pointer ${deleteMode && checked ? "ring-4 ring-red-300" : "ring-0"} ${deleteMode ? "hover:ring-2 hover:ring-red-200" : ""}`}
                onClick={() => {
                  if (!deleteMode) return;
                  setSelected((prev) =>
                    checked
                      ? prev.filter((id) => id !== rec._id)
                      : [...prev, rec._id]
                  );
                }}
                tabIndex={deleteMode ? 0 : -1}
                aria-checked={checked}
                role={deleteMode ? "button" : undefined}
              >
                {rec.image ? (
                  <img
                    src={rec.image}
                    alt={rec.title}
                    className="w-60 h-80 lg:h-60 object-cover"
                  />
                ) : (
                  <div className="w-60 h-80 lg:h-60 bg-gray-200 flex items-center justify-center text-gray-400">
                    No image
                  </div>
                )}
                <span className="absolute text-[10px] uppercase top-1.5 left-1.5 pb-0 line-clamp-2 text-white z-20 bg-black/60 px-2 py-1 rounded">
                  {rec.type}
                </span>
                <p className="absolute bottom-2 left-0 p-2 pb-0 line-clamp-2 text-white z-20">
                  {rec.title}
                </p>
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black/70" />
                {/* Delete Mode: Hide checkbox, use card click for selection */}
              </div>
            );
          })}
        </div>
        {filteredRecs.length === 0 && (
          <p className="text-gray-500 p-5 text-center w-full">
            No recommendations found.
          </p>
        )}
      </section>
    </>
  );
}

export default ManageRecommendations;
