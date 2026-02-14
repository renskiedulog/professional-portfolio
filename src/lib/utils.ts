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
  if (msg.startsWith("added")) return "Added";

  return "Other";
};

export const toKebabCase = (str: string) => {
  return str
    .trim()
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase();
};

export function getDuration(start: Date, end: Date | null) {
  const effectiveEnd = end ?? new Date();

  let totalMonths =
    (effectiveEnd.getFullYear() - start.getFullYear()) * 12 +
    (effectiveEnd.getMonth() - start.getMonth());

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  return { years, months };
}
