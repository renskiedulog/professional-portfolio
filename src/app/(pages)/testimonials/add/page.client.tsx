"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Loader2, Plus } from "lucide-react";
import { getGitHubProfile } from "@/lib/github";

export default function ClientTestimonialsAddPage() {
  const [form, setForm] = useState({
    github: "",
    name: "",
    position: "",
    testimonial: "",
    linkedin: "",
    portfolio: "",
    photo: "",
  });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [fetchingGithub, setFetchingGithub] = useState(false);

  // --- Submission limit ---
  useEffect(() => {
    const submissions = JSON.parse(
      localStorage.getItem("testimonial_submissions") || "[]"
    );
    const today = new Date().toDateString();
    const countToday = submissions.filter(
      (d: string) => new Date(d).toDateString() === today
    ).length;
    if (countToday >= 3) setBlocked(true);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (name === "github" && value) {
      fetchGithubData(value);
    }
  };

  // --- Fetch GitHub data ---
  const fetchGithubData = async (url: string) => {
    if (!url) return;
    setFetchingGithub(true);
    try {
      const match = url.match(/^https?:\/\/github\.com\/([^\/?#]+)\/?/i);
      const username = match ? match[1] : null;
      if (!username) throw new Error("Invalid GitHub URL");

      const data = await getGitHubProfile(username);
      if (data) {
        setForm((prev) => ({
          ...prev,
          name: prev.name || data.name || "",
          portfolio: prev.portfolio || data.blog || "",
          photo: prev.photo || data.avatar_url || "",
        }));
      }
    } catch (err) {
      console.error("GitHub fetch error:", err);
    } finally {
      setFetchingGithub(false);
    }
  };

  // --- Handle submit ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (blocked) return;

    setLoading(true);
    try {
      const res = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (data.success) {
        const submissions = JSON.parse(
          localStorage.getItem("testimonial_submissions") || "[]"
        );
        localStorage.setItem(
          "testimonial_submissions",
          JSON.stringify([...submissions, new Date().toISOString()])
        );
        setDone(true);
      } else {
        alert("Failed to submit testimonial: " + data.error);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to submit testimonial.");
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h2 className="text-2xl font-semibold mb-2">✅ Thank you!</h2>
        <p>Your testimonial has been submitted for review.</p>
      </div>
    );
  }

  if (blocked) {
    return (
      <div className="text-center p-10 text-red-600">
        🚫 You’ve reached the submission limit (3 per day). Try again tomorrow.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
      <Card className="p-2">
        <CardHeader>
          <CardTitle className="text-center text-xl font-semibold">
            Add Testimonial
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* GitHub URL */}
          <Input
            type="url"
            name="github"
            placeholder="GitHub profile link (optional)"
            value={form.github}
            onChange={handleChange}
          />

          {fetchingGithub && (
            <p className="text-sm text-gray-500">Fetching GitHub info…</p>
          )}

          {/* Photo upload */}
          <label className="relative w-24 h-24 cursor-pointer rounded-full overflow-hidden border border-gray-300 hover:opacity-80 transition">
            {form.photo ? (
              <img
                src={form.photo}
                alt={form.name || "Avatar preview"}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                Upload
              </div>
            )}
            <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-black bg-opacity-20 opacity-0 hover:opacity-100 text-white transition">
              <Plus className="w-5 h-5" />
            </div>
            <input
              type="file"
              name="photo"
              accept="image/*"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = () => {
                    setForm((prev) => ({
                      ...prev,
                      photo: reader.result as string,
                    }));
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
          </label>

          {/* Name, Position, Testimonial */}
          <Input
            type="text"
            name="name"
            placeholder="Full name"
            value={form.name}
            onChange={handleChange}
          />
          <Input
            type="text"
            name="position"
            placeholder="Position / Title"
            value={form.position}
            onChange={handleChange}
          />
          <Textarea
            name="testimonial"
            placeholder="Your testimonial..."
            value={form.testimonial}
            onChange={handleChange}
            required
          />

          {/* LinkedIn & Portfolio */}
          <Input
            type="url"
            name="linkedin"
            placeholder="LinkedIn Profile (optional)"
            value={form.linkedin}
            onChange={handleChange}
          />
          <Input
            type="url"
            name="portfolio"
            placeholder="Portfolio / Website (optional)"
            value={form.portfolio}
            onChange={handleChange}
          />
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {loading ? "Submitting..." : "Submit Testimonial"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
