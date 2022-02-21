import { notion_types } from "@types";

export const convertStringProperty = (
  item: notion_types.PagePropertyItem
): string => {
  if (!item.type) return "";

  switch (item.type) {
    case "title": {
      return item["title"].map((it) => it.plain_text).join(" ");
    }
    case "rich_text": {
      return item["rich_text"].map((it) => it.plain_text).join(" ");
    }
    case "text": {
      return item[item.type].map((it) => it.plain_text).join(" ");
    }
    case "date": {
      return (item as notion_types.PageProperty["date"]).date.start;
    }
    case "select": {
      return (item as notion_types.PageProperty["select"]).select.name;
    }
    case "url": {
      return (item as notion_types.PageProperty["url"]).url;
    }
    case "rollup": {
      const rollupItem = item as notion_types.PageProperty["rollup"];
      if (rollupItem.rollup.type === "array") {
        return rollupItem.rollup.array
          .map((it) => convertStringProperty(it))
          .join(" ");
      } else if (rollupItem.rollup.type === "number") {
        return rollupItem.rollup.number;
      }
    }
  }
};
