import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (isoString: string): string => {
  const date = new Date(isoString);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(date);
};

export const classifyCommit = (message: string) => {
  const msg = message.toLowerCase();

  if (msg.startsWith("feat")) return "Feature";
  if (msg.startsWith("fix")) return "Bug Fix";
  if (msg.startsWith("refactor")) return "Refactor";
  if (msg.startsWith("chore")) return "Chore";
  if (msg.startsWith("docs")) return "Docs";
  if (msg.startsWith("perf")) return "Performance";

  if (msg.startsWith("added")) return "Added"; // NEW TYPE

  return "Other";
};
