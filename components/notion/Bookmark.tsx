import { notion_types } from "@types";
import React from "react";
import style from "./Bookmark.module.scss";

// ANTD

// COMPS

// STATICS

// TYPES

interface Props extends notion_types.BookmarkItem {}

// COMPONENT

const Bookmark = (props: Props) => {
  return (
    <a
      className={style.link}
      target={"_blank"}
      rel="noreferrer"
      href={props.bookmark.url}
    >
      {props.bookmark.url}
    </a>
  );
};

export default Bookmark;
