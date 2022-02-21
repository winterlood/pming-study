import { app_types } from "@types";
import React from "react";
import style from "./LectureItem.module.scss";

// ANTD

// COMPS

// STATICS

// TYPES

interface Props extends app_types.ProcessedLectureItem {}

// COMPONENT

const LectureItem = (props: Props) => {
  return (
    <div className={style.container}>
      <div className={style.head}>
        <img src={props.thumbnailUrl} />
      </div>
      <div className={style.body}>{props.name}</div>
    </div>
  );
};

export default LectureItem;
