import { app_types, notion_types } from "@types";
import { convertStringProperty } from "./convert";
import { getPage, getPageListFromDatabase } from "./notion";

// GET ONE STUDY PAGE
const getProcssedStudyPage = (
  rawStudyPage: notion_types.PageWithStudy
): app_types.ProcessedPageWithStudy => {
  const {
    study_name,
    study_status,
    study_introduce,
    study_apply_end_date,
    study_start_date,
    study_max_member_count,
    udemy_lecture_name,
    udemy_lecture_thumbnail_url,
    udemy_lecture_url,
    mentor_name,
    mentor_profile_image_url,
    mentor_introduce,
    mentor_organization,
    mentor_github_url,
    mentor_email,
    mentor_kakao_id,
    apply_count,
  } = rawStudyPage.properties;

  return {
    ...rawStudyPage,
    study_id: rawStudyPage.id,
    study_created_time: rawStudyPage.created_time,
    study_last_edited_time: rawStudyPage.last_edited_time,
    study_name: study_name.title.map((it) => it.plain_text).join(" "),
    study_introduce: study_introduce[study_introduce.type]
      .map((it) => it.plain_text)
      .join(" "),
    study_status: study_status.select.name as app_types.StudyStatus,
    study_apply_end_date: study_apply_end_date.date.start,
    study_start_date: study_start_date.date.start,
    study_max_member_count: study_max_member_count.select
      ? study_max_member_count.select.name
      : "미정",
    udemy_lecture_name: udemy_lecture_name[udemy_lecture_name.type]
      .map((it) => it.plain_text)
      .join(" "),
    udemy_lecture_thumbnail_url: udemy_lecture_thumbnail_url.url,
    udemy_lecture_url: udemy_lecture_url.url,
    mentor_name: convertStringProperty(mentor_name),
    mentor_profile_image_url: convertStringProperty(mentor_profile_image_url),
    mentor_introduce: convertStringProperty(mentor_introduce),
    mentor_organization: convertStringProperty(mentor_organization),
    mentor_github_url: convertStringProperty(mentor_github_url),
    mentor_email: convertStringProperty(mentor_email),
    mentor_kakao_id: convertStringProperty(mentor_kakao_id),
    apply_count: convertStringProperty(apply_count),
  };
};

// GET ARRAY OF STUDY PAGE
const getProcessedStudyPageList = (
  rawStudyList: notion_types.PageWithStudy[]
): app_types.ProcessedPageWithStudy[] => {
  return rawStudyList.map((rawStudyItem: notion_types.PageWithStudy) => {
    return getProcssedStudyPage(rawStudyItem);
  });
};

/*
 * NOTION-API
 */
const STUDY_DATABASE_ID = process.env.NOTION_STUDY_DATABASE;

export const API_getRawStudyPageList = async (): Promise<
  notion_types.PageWithStudy[]
> => {
  const notion_res = await getPageListFromDatabase(STUDY_DATABASE_ID);
  return notion_res;
};

export const API_GetStartedStudyPageList = async (): Promise<
  app_types.ProcessedPageWithStudy[]
> => {
  const notion_res = await getPageListFromDatabase(STUDY_DATABASE_ID, {
    or: [
      {
        property: "study_status",
        select: {
          equals: "INPROGRESS",
        },
      },
      {
        property: "study_status",
        select: {
          equals: "CLOSE",
        },
      },
    ],
  });
  const processedStudyList = getProcessedStudyPageList(
    notion_res as unknown as notion_types.PageWithStudy[]
  );
  return processedStudyList;
};

export const API_GetStudyPageList = async (): Promise<
  app_types.ProcessedPageWithStudy[]
> => {
  const notion_res = await getPageListFromDatabase(STUDY_DATABASE_ID);
  const processedStudyList = getProcessedStudyPageList(
    notion_res as unknown as notion_types.PageWithStudy[]
  );
  return processedStudyList;
};

export const API_GetStudyPage = async (
  page_id: string
): Promise<app_types.ProcessedPageWithStudy> => {
  const raw_study_page = (await getPage(
    page_id
  )) as unknown as notion_types.PageWithStudy;

  const processedStudyPage = getProcssedStudyPage(raw_study_page);

  return processedStudyPage;
};

export const API_GetRawStudyPage = async (
  page_id: string
): Promise<notion_types.PageWithStudy> => {
  const raw_study_page = (await getPage(
    page_id
  )) as unknown as notion_types.PageWithStudy;
  return raw_study_page;
};
