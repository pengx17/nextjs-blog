import fsp from "fs/promises";
import { serialize } from "next-mdx-remote/serialize";
import path from "path";
import matter from "gray-matter";
import remarkGfm from "remark-gfm";
import { postsDirectory } from "./posts";

import rehypeShiki from "./rehype-shiki";

export async function getPostData(id: string) {
  const fullPath = path.join(postsDirectory, `${id}.mdx`);
  const source = await fsp.readFile(fullPath, "utf8");
  const { content, data } = matter(source);

  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeShiki],
    },
  });

  return {
    source: mdxSource,
    frontmatter: data,
  };
}
