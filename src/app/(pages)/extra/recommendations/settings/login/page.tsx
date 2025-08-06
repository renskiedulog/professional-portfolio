"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Container from "@/app/UI/global-components/container";
import BackButton from "@/app/UI/global-components/back-button";
import BlurFade from "@/app/UI/animation-wrappers/fade";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/recommendations-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/extra/recommendations/settings");
    } else {
      setError("Incorrect password");
    }
  };

  return (
    <Container as="main" className="pb-20 sm:pb-10">
      <BlurFade className="px-3 sm:px-5">
        {/* Navigation Bar */}
        <div className="w-full flex justify-between">
          <BackButton href="/" label="Homepage" />
        </div>
        <div className="w-full min-h-[calc(100vh-150px)] flex items-center justify-center flex-col space-y-2 text-center px-5">
          <p>
            You need to verify your identity to access the recommendations
            settings.
          </p>
          <h1 className="text-5xl font-black text-primary/90 dark:text-primary">
            Welcome Back.
          </h1>
          <form
            className="flex gap-3 pt-2 w-full max-w-md"
            onSubmit={handleSubmit}
          >
            <Input
              autoFocus
              type="password"
              value={password}
              placeholder="Enter password"
              className="w-full"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" className="min-w-32">
              Login
            </Button>
            {error && <p>{error}</p>}
          </form>
        </div>
      </BlurFade>
    </Container>
  );
}
