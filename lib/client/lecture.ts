import { app_types, notion_types } from "@types";

// API -> APP ITEM으로 변환
export const getProcessedLectureList = (
  lectureList: notion_types.Lecture[]
): app_types.ProcessedLectureItem[] => {
  return lectureList.map((it) => ({
    id: it.id,
    name: it.properties.Name.title.map((it) => it.plain_text).join(" "),
    thumbnailUrl: it.properties.thumbnail.url,
  }));
};

export const getClassifiedList = (lectureList: notion_types.Lecture[]) => {
  return lectureList;
};
