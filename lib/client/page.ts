import { global_types } from "@types";

interface PageMetaInfo {
  title: string;
  author: string;
  avatarUrl: string;
  createdTime: string;
  lastEditedTime: string;
  icon: string;
  coverImgUrl: string;
  lectureName: string;
}

export const getPageMetaInfo = (page: global_types.PageBase): PageMetaInfo => {
  const title = page.properties.Name.title.map((it) => it.plain_text).join(" ");
  const author =
    page.properties.author &&
    page.properties.author.people.map((it) => it.name).join(" ");
  const avatarUrl =
    page.properties.author &&
    page.properties.author.people.map((it) => it.avatar_url).join("");
  const createdTime = new Date(page.created_time).toLocaleDateString();
  const lastEditedTime = new Date(page.last_edited_time).toLocaleDateString();
  const icon = page.icon;
  const coverImgUrl = page.cover && page.cover.file.url;
  const lectureName =
    page.properties.study_lecture && page.properties.study_lecture.select.name;
  return {
    title,
    author,
    avatarUrl,
    createdTime,
    lastEditedTime,
    icon,
    coverImgUrl,
    lectureName,
  };
};
