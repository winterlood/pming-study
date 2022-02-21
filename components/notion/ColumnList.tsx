import { notion_types } from "@types";
import React from "react";
import Column from "./Column";
import style from "./ColumnList.module.scss";

// ANTD

// COMPS

// STATICS

// TYPES

interface Props extends notion_types.ColumnListItem {}
// COMPONENT

const ColumnList = (props: Props) => {
  console.log(style.container);
  return (
    <div className={style.container}>
      {props.column_list.children.map((it) => (
        <Column key={it.id} {...it} />
      ))}
    </div>
  );
};

export default ColumnList;
