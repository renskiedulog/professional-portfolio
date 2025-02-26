import React from "react";
import Image from "next/image";
import Link from "next/link";

export const PortableTextComponents = {
  types: {
    image: ({ value }: { value: any }) => (
      <div className="my-6">
        <Image
          src={value.asset.url}
          alt={value.alt || "Blog Image"}
          width={800}
          height={450}
          className="rounded-lg"
        />
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
      <h1 className="text-3xl font-bold mt-6">{children}</h1>
    ),
    h2: ({ children }: { children: React.ReactNode }) => (
      <h2 className="text-2xl font-semibold mt-5">{children}</h2>
    ),
    h3: ({ children }: { children: React.ReactNode }) => (
      <h3 className="text-xl font-medium mt-4">{children}</h3>
    ),
    normal: ({ children }: { children: React.ReactNode }) => (
      <p className="text-gray-700 leading-relaxed">{children}</p>
    ),
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
