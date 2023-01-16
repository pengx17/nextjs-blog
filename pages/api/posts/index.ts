import { VercelRequest, VercelResponse } from "@vercel/node";
import { getSortedPostsData } from "../../../lib/posts";

// See https://vercel.com/docs/serverless-functions/introduction
export default async function posts(req: VercelRequest, res: VercelResponse) {
  res.json({ posts: await getSortedPostsData() });
}
