import { getPageBlocks } from "lib/server/get-page-blocks";

export default async function handler(req, res) {
  const { page_id } = req.query;
  const blocks = await getPageBlocks(page_id);
  res.status(200).json(blocks);
}
