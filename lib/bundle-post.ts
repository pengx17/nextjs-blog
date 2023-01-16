import fsp from "fs/promises";
import { serialize } from "next-mdx-remote/serialize";
import path from "path";
import matter from "gray-matter";
import imageSize from "rehype-img-size";
import { cache } from "react";

import remarkGfm from "remark-gfm";
import { postsDirectory } from "./posts";

import rehypeShiki from "./rehype-shiki";

export const getPostData = cache(async (id: string) => {
  const fullPath = path.join(postsDirectory, `${id}.mdx`);
  const source = await fsp.readFile(fullPath, "utf8");
  const { content, data } = matter(source);

  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeShiki, [imageSize, { dir: "public" }]],
    },
  });

  return {
    source: mdxSource,
    frontmatter: data,
  };
});
