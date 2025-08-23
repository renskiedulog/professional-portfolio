import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

function ManageRecommendations() {
  const [recs, setRecs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

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

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this recommendation?"))
      return;
    setDeleting(id);
    try {
      // TODO: Implement delete API route and call it here
      // await fetch(`/api/recommendations/delete`, { method: "POST", body: JSON.stringify({ id }) });
      setRecs((prev) => prev.filter((rec) => rec._id !== id));
    } catch {
      alert("Failed to delete");
    } finally {
      setDeleting(null);
    }
  };

  if (loading) return <div>Loading recommendations...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!recs.length) return <div>No recommendations found.</div>;

  return <div></div>;
}

export default ManageRecommendations;
