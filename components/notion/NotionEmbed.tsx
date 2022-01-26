import { global_types } from "@types";
import React from "react";
import style from "./NotionEmbed.module.scss";

// ANTD

// COMPS

// STATICS

// TYPES

interface Props extends global_types.EmbedItem {}

// COMPONENT

const NotionEmbed = (props: Props) => {
  return (
    <div className={style.container}>
      <iframe src={props.embed.url} />
    </div>
  );
};

export default NotionEmbed;
