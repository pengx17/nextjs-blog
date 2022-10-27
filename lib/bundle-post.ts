import fsp from "fs/promises";
import { bundleMDX } from "mdx-bundler";
import path from "path";
import remarkGfm from "remark-gfm";
import { postsDirectory } from "./posts";

import rehypeShiki from "./rehype-shiki";

export async function getPostData(id: string) {
  const fullPath = path.join(postsDirectory, `${id}.mdx`);
  const source = await fsp.readFile(fullPath, "utf8");

  const { code, frontmatter } = await bundleMDX({
    source,
    mdxOptions(options) {
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        remarkGfm as any,
      ];
      options.rehypePlugins = [...(options.rehypePlugins ?? []), rehypeShiki];
      return options;
    },
  });

  return {
    source: code,
    frontmatter,
  };
}
