import { NotionAPI } from "notion-client";

const api = new NotionAPI();

export const getPageBlocks = async (pageId) => {
  try {
    const recordMap = await api.getPage(pageId);
    return recordMap;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

export const getPageInfo = async (pageId) => {
  const pageInfo = await api.getPage;
};
