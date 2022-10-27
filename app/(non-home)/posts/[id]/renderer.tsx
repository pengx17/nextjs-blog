"use client";

import { SWRConfig } from "swr";
import Date from "../../../../components/date";

import { createSectionWrapper, mdxComponents } from "../../../../components";
import { MDXRemote } from "next-mdx-remote";
import React from "react";

const WrappedH1 = createSectionWrapper("h1");

function localStorageProvider() {
  if (typeof window === "undefined") {
    return new Map();
  }
  // When initializing, we restore the data from `localStorage` into a map.
  const map = new Map(JSON.parse(localStorage.getItem("swr_cache") || "[]"));

  // Before unloading the app, we write back all the data into `localStorage`.
  window.addEventListener("beforeunload", () => {
    const appCache = JSON.stringify(Array.from(map.entries()));
    localStorage.setItem("swr_cache", appCache);
  });

  // We still use the map for write & read for performance.
  return map;
}

export const Renderer = ({ source, frontmatter }) => {
  return (
    <>
      <WrappedH1 className="text-4xl my-4 font-serif font-bold leading-snug">
        {frontmatter.title}
      </WrappedH1>
      <div className="text-gray-600 mb-8 ml-0.5">
        <Date dateString={frontmatter.date} />
      </div>
      <SWRConfig value={{ provider: localStorageProvider }}>
        <MDXRemote {...source} components={mdxComponents} />
      </SWRConfig>
    </>
  );
};
