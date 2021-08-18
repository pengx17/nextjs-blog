import { getLinkPreview } from "link-preview-js";

export default async function linkPreviewHandler(req, res) {
  const { url } = req.query;
  console.info("fetching " + url);
  const data = await getLinkPreview(url, {
    timeout: 10000,
    imagesPropertyType: "og",
    headers: {
      "user-agent": "googlebot",
    },
  });
  res.json(data);
}
