import { NotionAPI } from "notion-client";

const api = new NotionAPI();

export const getPageBlocks = async (pageId) => {
  const recordMap = await api.getPage(pageId);
  return recordMap;
};

export const getPageInfo = async (pageId) => {
  const pageInfo = await api.getPage;
};
