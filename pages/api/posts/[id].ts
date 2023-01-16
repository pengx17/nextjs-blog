import { VercelRequest, VercelResponse } from "@vercel/node";
import { getPostData } from "../../../lib/bundle-post";
import { getSortedPostsData } from "../../../lib/posts";

// See https://vercel.com/docs/serverless-functions/introduction
export default async function post(req: VercelRequest, res: VercelResponse) {
  const { id } = req.query;
  res.json(await getPostData(id as string));
}
