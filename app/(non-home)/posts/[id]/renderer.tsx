"use client";

import Date from "../../../../components/date";

import { createSectionWrapper, mdxComponents } from "../../../../components";
import { MDXRemote } from "next-mdx-remote";
import React from "react";

const WrappedH1 = createSectionWrapper("h1");

export const Renderer = ({ source, frontmatter }) => {
  return (
    <>
      <WrappedH1 className="text-4xl my-4 font-serif font-bold leading-snug">
        {frontmatter.title}
      </WrappedH1>
      <div className="text-gray-600 mb-8 ml-0.5">
        <Date dateString={frontmatter.date} />
      </div>
      <MDXRemote {...source} components={mdxComponents} />
    </>
  );
};
