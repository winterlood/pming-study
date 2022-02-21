import { app_types, notion_types } from "@types";

export const getProcessedPage = (
  page: notion_types.Page
): app_types.ProcessedPage => {
  const archived = page.archived;
  const id = page.id;
  const created_time = page.created_time;
  const last_edited_time = page.lasted_edited_time;
  const cover = page.cover && page.cover.file.url;
  const icon = page.icon;
  return {
    archived,
    id,
    created_time,
    last_edited_time,
    cover,
    icon,
    properties: page.properties,
  };
};
