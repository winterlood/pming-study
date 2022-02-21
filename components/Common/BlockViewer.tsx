import { notion_types } from "@types";
import Block from "components/notion/Block";
import React from "react";
import style from "./BlockViewer.module.scss";

// TYPES

interface Props {
  blocks: notion_types.Block[];
}

// COMPONENT

const BlockViewer = (props: Props) => {
  return (
    <article className={style.container}>
      {props.blocks.map((it, idx) => (
        <Block key={it.id} block={it} />
      ))}
    </article>
  );
};

export default BlockViewer;
