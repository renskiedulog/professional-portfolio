import React from "react";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { getSanityImageUrl } from "@/sanity/lib/sanity";

export const PortableTextComponents = {
  types: {
    image: ({ value }: { value: any }) => (
      <div className="my-6">
        <Image
          src={getSanityImageUrl(value.asset)}
          alt={value.alt || "Blog Image"}
          width={1200}
          height={600}
          className="rounded-lg w-full h-auto"
        />
      </div>
    ),
    youtube: ({ value }: { value: any }) => {
      const extractVideoId = (url: string) => {
        const match = url.match(
          /(?:youtube\.com\/(?:[^\/]+\/[^\/]+|(?:v|e(?:mbed)?)|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/
        );
        return match ? match[1] : null;
      };
      const videoId = extractVideoId(value.url);

      return videoId ? (
        <div className="my-6 aspect-w-16 aspect-video">
          <iframe
            className="w-full h-full rounded-lg"
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video"
            allowFullScreen
          />
        </div>
      ) : null;
    },
    border: ({ children }: { children: React.ReactNode }) => (
      <div className="w-full h-0.5 bg-primary/10 rounded-lg my-2" />
    ),
    button: ({ value }: { value: any }) => (
      <div>
        {value?.href ? (
          <Link
            href={value.href}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition"
          >
            {value.text || "Click Here"}
          </Link>
        ) : (
          <button
            rel="noopener noreferrer"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition"
          >
            {value.text || "Click Here"}
          </button>
        )}
      </div>
    ),
  },
  marks: {
    link: ({ children, value }: { children: React.ReactNode; value: any }) => (
      <Link
        href={value.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 underline hover:text-blue-700"
      >
        {children}
      </Link>
    ),
    strong: ({ children }: { children: React.ReactNode }) => (
      <strong className="font-semibold text-gray-800">{children}</strong>
    ),
  },
  block: {
    h1: ({ children }: { children: React.ReactNode }) => (
      <h1 className="text-4xl font-extrabold mt-6 pb-2">{children}</h1>
    ),
    h2: ({ children }: { children: React.ReactNode }) => (
      <h2 className="text-3xl font-bold mt-5 pb-2">{children}</h2>
    ),
    h3: ({ children }: { children: React.ReactNode }) => (
      <h3 className="text-2xl font-semibold mt-4 pb-2">{children}</h3>
    ),
    normal: ({ children }: { children: React.ReactNode }) => {
      if (children[0]?.length === 0) return <br />;
      return <p className="text-gray-700 leading-relaxed">{children}</p>;
    },
    blockquote: ({ children }: { children: React.ReactNode }) => (
      <blockquote className="border-l-4 border-gray-500 italic pl-4 my-4 text-gray-600">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: { children: React.ReactNode }) => (
      <ul className="list-disc list-inside mt-2">{children}</ul>
    ),
    number: ({ children }: { children: React.ReactNode }) => (
      <ol className="list-decimal list-inside mt-2">{children}</ol>
    ),
  },
};

export default PortableTextComponents;
