import { app_types, notion_types } from "@types";
import { getPage, getPageListFromDatabase } from "./notion";
import { API_GetStudyPage, API_GetStudyPageList } from "./study-page";

/*
<< DOMAIN >>

1. Post List 페이지 
- study 페이지리스트 따로 받기
- summary post 페이지 리스트랑 조합하기

2. Post Detail 페이지
- study 페이지까지 한번에 다 받기

정리
- relation까지 조회하는 List는 사용 X
- 단일 페이지만 relation 조회한다.

필요 API
1. relation 미 포함 processed page list
2. relation 포함 detail page

*/

const getProcessedPostPageSummaryListWithRelatedStudy = async (
  rawPostPageList: notion_types.PageWithPost[]
): Promise<any | app_types.ProcessedPageWithStudyPost[]> => {
  const studyPageList: app_types.ProcessedPageWithStudy[] =
    await API_GetStudyPageList();

  const studyObject = {};
  studyPageList.forEach((studyPage) => {
    studyObject[studyPage.id] = studyPage;
  });

  return rawPostPageList.map((rawPostPage) => {
    const { post_title: rawPostTitle, related_study: rawRelatedStudy } =
      rawPostPage.properties;

    const post_title = rawPostTitle[rawPostTitle.type]
      .map((it) => it.plain_text)
      .join(" ");

    const related_study_list = rawRelatedStudy.relation.map(
      (it) => studyObject[it.id]
    );

    const related_study =
      related_study_list.length !== 0 ? related_study_list[0] : null;

    return {
      ...rawPostPage,
      post_title,
      related_study,
    };
  });
};

const getProcessedPostPageSummaryList = async (
  rawPostPageList: notion_types.PageWithPost[]
): Promise<any | app_types.ProcessedPageWithStudyPost[]> => {
  return rawPostPageList.map((rawPostPage) => {
    const { post_title: rawPostTitle } = rawPostPage.properties;

    const post_title = rawPostTitle[rawPostTitle.type]
      .map((it) => it.plain_text)
      .join(" ");

    return {
      ...rawPostPage,
      post_title,
    };
  });
};

const getProcssedPostPageDetail = async (
  rawPostPage: notion_types.PageWithPost
): Promise<app_types.ProcessedPageWithStudyPostWithRelatedStudy> => {
  const { post_title: rawPostTitle, related_study: rawRelatedStudy } =
    rawPostPage.properties;

  const related_study_page_id =
    rawRelatedStudy.relation.length !== 0
      ? rawRelatedStudy.relation[0].id
      : null;

  let related_study = null;

  if (related_study_page_id) {
    related_study = await API_GetStudyPage(related_study_page_id);
  }

  const post_title = rawPostTitle[rawPostTitle.type]
    .map((it) => it.plain_text)
    .join(" ");

  return {
    ...rawPostPage,
    post_title,
    related_study,
  };
};

/*
 * NOTION-API
 */
const POST_DATABASE_ID = process.env.NOTION_STUDY_POST_DATABASE;

export const API_GetRawPostPageList = async (): Promise<
  notion_types.PageWithPost[]
> => {
  const notion_res = (await getPageListFromDatabase(
    POST_DATABASE_ID
  )) as unknown as notion_types.PageWithPost[];

  return notion_res;
};

export const API_GetProcessedPostPageListByStudy = async (
  study_id
): Promise<app_types.ProcessedPageWithStudyPost[]> => {
  const notion_res = await getPageListFromDatabase(POST_DATABASE_ID, {
    property: "related_study",
    relation: {
      contains: study_id,
    },
  });
  const processedPostList = await getProcessedPostPageSummaryList(notion_res);
  return processedPostList;
};

export const API_GetProcessedPostPageList = async (): Promise<
  app_types.ProcessedPageWithStudyPost[]
> => {
  const notion_res = await getPageListFromDatabase(POST_DATABASE_ID);
  const processedPostList = await getProcessedPostPageSummaryList(notion_res);
  return processedPostList;
};

export const API_GetProcessedPostPage = async (
  page_id: string
): Promise<app_types.ProcessedPageWithStudyPostWithRelatedStudy> => {
  const raw_post_page = (await getPage(
    page_id
  )) as unknown as notion_types.PageWithPost;
  const processedPost = await getProcssedPostPageDetail(raw_post_page);
  return processedPost;
};
export const API_GetRawPostPage = async (
  page_id: string
): Promise<notion_types.PageWithPost> => {
  const raw_post_page = (await getPage(
    page_id
  )) as unknown as notion_types.PageWithPost;
  return raw_post_page;
};
