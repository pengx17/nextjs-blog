import { type getPostData } from "./bundle-post";
import { type getSortedPostsData } from "./posts";

export const getPosts: typeof getSortedPostsData = async () => {
  const res = await fetch("http://localhost:3000" + "/api/posts");
  const { posts } = await res.json();
  return posts;
};

export const getPostById: typeof getPostData = async (id) => {
  const start = performance.now();
  const res = await fetch("http://localhost:3000" + "/api/posts/" + id);
  console.log("get post by id", id, performance.now() - start);
  return res.json();
};
