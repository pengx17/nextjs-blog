import fsp from "fs/promises";
import matter from "gray-matter";

import path from "path";
import { cache } from "react";

export const postsDirectory = path.join(process.cwd(), "posts");

export const getSortedPostsData = cache(async () => {
  // Get file names under /posts
  const fileNames = await fsp.readdir(postsDirectory);
  const allPostsData = await Promise.all(
    fileNames.map(async (fileName) => {
      // Remove ".mdx" from file name to get id
      const id = fileName.replace(/\.mdx$/, "");

      // Read markdown file as string
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = await fsp.readFile(fullPath, "utf8");

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents);

      // Combine the data with the id
      return {
        id,
        fileName,
        ...(matterResult.data as {
          date: string;
          title: string;
          draft: boolean;
          [key: string]: any;
        }),
      };
    })
  );
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
});
