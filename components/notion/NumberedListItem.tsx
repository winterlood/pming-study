import { notion_types } from "@types";
import React, { ReactNode } from "react";
import withChildrenBlock from "hoc/withChildrenBlock";
import NotionText from "./NotionText";
import style from "./NumberedListItem.module.scss";

// ANTD

// COMPS

// STATICS

// TYPES

interface Props extends notion_types.NumberedItemList {
  childComponent: ReactNode;
}

// COMPONENT

const NumberedListItem = (props: Props) => {
  return (
    <ol className={style.container}>
      {props.numbered_list_item.text.map((it, idx) => (
        <li className={style.li} key={props.id + "number" + idx}>
          <NotionText {...it} />
        </li>
      ))}
      <div className={style.child}>{props.childComponent}</div>
    </ol>
  );
};

export default withChildrenBlock(NumberedListItem);
