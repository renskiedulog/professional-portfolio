"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2, Plus } from "lucide-react";
import { getGitHubProfile } from "@/lib/github";
import Container from "@/app/UI/global-components/container";
import BlurFade from "@/app/UI/animation-wrappers/fade";
import BackButton from "@/app/UI/global-components/back-button";
import { TestimonialCard } from "@/app/UI/content/testimonials";
import Heading from "@/app/UI/global-components/heading";
import Link from "next/link";

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
      <div className="w-full min-h-[calc(100vh-40px)] flex items-center justify-center flex-col space-y-2 text-center px-5">
        <p>
          Thank you for taking the time to share your testimonial. Your thoughts
          are the testament of my efforts.
        </p>
        <h1 className="text-5xl font-black text-primary/90 dark:text-primary">
          Testimonial Submitted!
        </h1>
        <i className="max-w-2xl text-xs">
          To maintain the integrity of the site, I will be checking your
          submission and verify it's contents. Your testimonial will be shown
          afterwards. Once again, I appreciate the support.
        </i>
        <Link
          prefetch={false}
          href="/"
          className="!mt-5"
          aria-label="Go Back To Homepage"
        >
          <Button>Go Back To Homepage</Button>
        </Link>
      </div>
    );
  }

  if (blocked) {
    return (
      <div className="w-full min-h-[calc(100vh-40px)] flex items-center justify-center flex-col space-y-2 text-center px-5">
        <p>
          You’ve reached the daily submission limit. Please try again tomorrow
          to share more of your thoughts.
        </p>
        <h1 className="text-5xl font-black">Submission Limit Reached</h1>
        <Link
          prefetch={false}
          href="/"
          className="!mt-5"
          aria-label="Go Back To Homepage"
        >
          <Button>Go Back To Homepage</Button>
        </Link>
      </div>
    );
  }

  return (
    <Container as="main" className="relative py-6 px-4 sm:px-6 md:px-8 pb-20">
      <BlurFade key="testimonial-add-page">
        <div className="w-full flex justify-between mb-6">
          <BackButton href="/" label="Homepage" />
        </div>

        {/* Live Preview */}
        {form && (
          <div className="max-w-xl mx-auto space-y-4 mb-8">
            <Heading as="h1" className="text-center">
              Live Preview
            </Heading>
            <div className="border rounded-md p-4">
              <TestimonialCard
                testimonial={{
                  ...form,
                  displayName: form.name,
                  displayPhoto: form.photo,
                  displayBio: form.position,
                }}
              />
            </div>
          </div>
        )}

        <Heading className="mx-auto max-w-xl mb-2 text-center">
          Testimonial Form
        </Heading>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="max-w-xl mx-auto space-y-6 w-full"
        >
          {/* GitHub */}
          <div className="space-y-1 w-full">
            <Input
              type="url"
              name="github"
              placeholder="GitHub profile link (optional)"
              value={form.github}
              onChange={handleChange}
              className="w-full"
            />
            {fetchingGithub && (
              <p className="text-sm text-gray-500">Fetching GitHub info…</p>
            )}
          </div>

          {/* Avatar Upload */}
          <div className="flex flex-col items-center justify-center">
            <label className="relative w-28 h-28 cursor-pointer rounded-full overflow-hidden border border-gray-300 hover:opacity-80 transition">
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
            <p className="mt-1.5 text-sm opacity-80 text-center">
              You can also override the github image by hovering and clicking
              the photo.
            </p>
          </div>

          {/* Personal Info */}
          <div className="space-y-3 w-full">
            <Input
              type="text"
              name="name"
              placeholder="Full name"
              value={form.name}
              onChange={handleChange}
              className="w-full"
            />
            <Input
              type="text"
              name="position"
              placeholder="Position / Title"
              value={form.position}
              onChange={handleChange}
              className="w-full"
            />
            <Textarea
              name="testimonial"
              placeholder="Your testimonial..."
              value={form.testimonial}
              onChange={handleChange}
              required
              className="w-full resize-none h-32"
            />
          </div>

          {/* Optional Links */}
          <div className="space-y-3 w-full">
            <Input
              type="url"
              name="linkedin"
              placeholder="LinkedIn Profile (optional)"
              value={form.linkedin}
              onChange={handleChange}
              className="w-full"
            />
            <Input
              type="url"
              name="portfolio"
              placeholder="Portfolio / Website (optional)"
              value={form.portfolio}
              onChange={handleChange}
              className="w-full"
            />
          </div>

          {/* Submit Button */}
          <div className="w-full">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {loading ? "Submitting..." : "Submit Testimonial"}
            </Button>
          </div>
        </form>
      </BlurFade>
    </Container>
  );
}
