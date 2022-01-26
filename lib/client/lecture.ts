import { global_types } from "@types";

export const getProcessedLectureList = (
  lectureList: global_types.Lecture[]
): global_types.ProcessedLectureItem[] => {
  return lectureList.map((it) => ({
    id: it.id,
    name: it.properties.Name.title.map((it) => it.plain_text).join(" "),
    thumbnailUrl: it.properties.thumbnail.url,
  }));
};
