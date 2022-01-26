import { global_types } from "@types";
import React, { ReactNode } from "react";
import withChildrenBlock from "../hoc/withChildrenBlock";
import style from "./BulletedListItem.module.scss";
import NotionText from "./NotionText";

// ANTD

// COMPS

// STATICS

// TYPES

interface Props extends global_types.BulletedListItem {
  childComponent: ReactNode;
}

// COMPONENT

const BulletedListItem = (props: Props) => {
  return (
    <ul className={style.container}>
      {props.bulleted_list_item.text.map((it, idx) => (
        <li className={style.li} key={props.id + "bullet" + idx}>
          <NotionText {...it} />
        </li>
      ))}
      <div className={style.child}>{props.childComponent}</div>
    </ul>
  );
};

export default withChildrenBlock(BulletedListItem);
