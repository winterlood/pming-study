import { notion_types } from "@types";
import React from "react";
import style from "./NotionText.module.scss";

// ANTD

// COMPS

// STATICS

// TYPES

interface Props extends notion_types.TextItemBase {}

// COMPONENT

const NotionText = (props: Props) => {
  return (
    <span
      className={[
        props.annotations.bold ? style.bold : "",
        props.annotations.code ? style.code : "",
        props.annotations.italic ? style.italic : "",
        props.annotations.strikethrough ? style.strikethrough : "",
        props.annotations.underline ? style.underline : "",
      ].join(" ")}
    >
      {props.plain_text}
    </span>
  );
};

export default NotionText;
