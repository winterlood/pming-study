import { Client } from "@notionhq/client";
import { ListBlockChildrenResponse } from "@notionhq/client/build/src/api-endpoints";
import { global_types } from "@types";

const notion = new Client({
  auth: process.env.NOTION_ACCESS_TOKEN,
});

export const getDatabase = async (databaseId: string) => {
  const res = (await notion.databases.query({
    database_id: databaseId,
  })) as unknown as global_types.Database;
  return res;
};

export const getPagesFromDatabase = async (
  databaseId: string
): Promise<global_types.PageList> => {
  const res = (await notion.databases.query({
    database_id: databaseId,
  })) as unknown as global_types.Database;
  return res.results.map((it) => {
    const titleArray = it.properties.Name.title;
    const pageTitle = titleArray.length === 0 ? "" : titleArray[0].plain_text;
    const pageAnnotations =
      titleArray.length === 0 ? "" : titleArray[0].annotations;
    const pageCover = it.cover && it.cover.file.url;
    const study_lecture =
      it.properties.study_lecture.select &&
      it.properties.study_lecture.select.name;
    const study_topic_list =
      it.properties.study_topic.multi_select &&
      it.properties.study_topic.multi_select.map((it) => it.name);

    return {
      id: it.id,
      last_edited_time: it.last_edited_time,
      cover: pageCover,
      url: it.url,
      created_time: it.created_time,
      study_lecture,
      study_topic_list,
      pageTitle: pageTitle || it.id,
      pageAnnotations,
    };
  });
};

export const getPage = async (pageId: string) => {
  const res = await notion.pages.retrieve({
    page_id: pageId,
  });
  return res;
};

export const getBlocks = async (blockId): Promise<global_types.Block[]> => {
  console.log("getblocks called : ", blockId);
  let resResult: global_types.Block[] = [];
  const res = await notion.blocks.children.list({
    block_id: blockId,
    page_size: 100,
  });
  resResult = res.results as unknown as global_types.Block[];
  console.log(resResult.length);
  if (res.has_more) {
    console.log(res.has_more);
    console.log(res.next_cursor);
    const res2 = await notion.blocks.children.list({
      block_id: blockId,
      start_cursor: res.next_cursor,
      page_size: 100,
    });
    resResult = [
      ...resResult,
      ...(res2.results as unknown as global_types.Block[]),
    ];
  }
  console.log(resResult.length);
  return resResult;
};

export const RetrieveBlock = async (blockId) => {
  const res = await notion.blocks.retrieve({
    block_id: blockId,
  });
  return res;
};
