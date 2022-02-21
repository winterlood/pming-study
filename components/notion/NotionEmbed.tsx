import { notion_types } from "@types";
import React from "react";
import style from "./NotionEmbed.module.scss";

// ANTD

// COMPS

// STATICS

// TYPES

interface Props extends notion_types.EmbedItem {}

// COMPONENT

const NotionEmbed = (props: Props) => {
  return (
    <div className={style.container}>
      <iframe src={props.embed.url} />
    </div>
  );
};

export default NotionEmbed;
