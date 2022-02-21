import { notion_types } from "@types";
export const getOpenGraphImage = (blocks: notion_types.Block[]) => {
  const openGraphBlock = blocks.find((it) => it.type === "image");
  if (openGraphBlock) {
    if (openGraphBlock.type === "external") {
      return openGraphBlock.image.external.url;
    } else {
      return openGraphBlock.image.file.url;
    }
  }
};
