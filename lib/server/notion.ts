import { Client } from "@notionhq/client";
import { notion_types } from "@types";

export const notionClient = new Client({
  auth: process.env.NOTION_SERVER_SIDE_READ_ACCESS_TOKEN,
});

/*
 * COMMON API
 */
export const getDatabase = async (databaseId: string) => {
  const res = (await notionClient.databases.query({
    database_id: databaseId,
  })) as unknown as notion_types.Database;
  return res;
};

export const getPage = async (pageId: string) => {
  const res = await notionClient.pages.retrieve({
    page_id: pageId,
  });
  return res;
};

export const getPageListFromDatabase = async (
  databaseId: string,
  filter?: any
) => {
  const res = (await notionClient.databases.query({
    database_id: databaseId,
    filter: filter,
  })) as unknown as notion_types.Database;
  return res.results.filter((it) => it.properties.onboard.checkbox);
};

export const getBlocks = async (blockId): Promise<notion_types.Block[]> => {
  let resResult: notion_types.Block[] = [];
  const res = await notionClient.blocks.children.list({
    block_id: blockId,
    page_size: 100,
  });
  resResult = res.results as unknown as notion_types.Block[];

  if (res.has_more) {
    const res2 = await notionClient.blocks.children.list({
      block_id: blockId,
      start_cursor: res.next_cursor,
      page_size: 100,
    });
    resResult = [
      ...resResult,
      ...(res2.results as unknown as notion_types.Block[]),
    ];
  }
  return resResult;
};

export const getWholeBlock = async (id) => {
  const blocks = await getBlocks(id);
  const childBlocks = await Promise.all(
    blocks
      .filter((block) => block.has_children)
      .map(async (block) => {
        return {
          id: block.id,
          children: await getBlocks(block.id),
        };
      })
  );
  const blocksWithChildren = blocks.map((block) => {
    if (block.has_children && !block[block.type].children) {
      block[block.type]["children"] = childBlocks.find(
        (x) => x.id === block.id
      )?.children;
    }
    return block;
  });

  const ChildBlockhasChildren = blocksWithChildren
    .filter((block) => block.has_children)
    .reduce((acc, block) => {
      const ChildBlockWithChildren = block[block.type].children.filter(
        (child_block) => child_block.has_children
      );
      return acc.concat(ChildBlockWithChildren);
    }, []);

  const ChildBlockWithChildren = await Promise.all(
    ChildBlockhasChildren.map(async (block) => {
      return {
        id: block.id,
        children: await getBlocks(block.id),
      };
    })
  );

  const blocksWithDoubleDepthChildren = blocksWithChildren.map((block) => {
    if (block.has_children) {
      const block_children = block[block.type].children.map((child_block) => {
        if (child_block.has_children) {
          child_block[child_block.type]["children"] =
            ChildBlockWithChildren.find(
              (x) => x.id === child_block.id
            ).children;
        }
        return child_block;
      });

      block[block.type].children = block_children;
    }
    return block;
  });
  return blocksWithDoubleDepthChildren;
};
