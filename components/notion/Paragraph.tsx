import { notion_types } from "@types";
import React from "react";
import withChildrenBlock from "hoc/withChildrenBlock";
import NotionText from "./NotionText";
import style from "./Paragraph.module.scss";

// ANTD

// COMPS

// STATICS

// TYPES

interface Props
  extends notion_types.ParagraphItem,
    notion_types.BlockItemBase {}

// COMPONENT

const Paragraph = (props: Props) => {
  return (
    <>
      <div className={style.container}>
        {props.paragraph.text.map((it, idx) => (
          <NotionText key={props.id + "-" + idx} {...it} />
        ))}
      </div>

      <div className={style.children}>
        {props.childComponent && props.childComponent}
      </div>
    </>
  );
};

export default withChildrenBlock(Paragraph);
