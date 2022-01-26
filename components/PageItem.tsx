import { global_types } from "@types";
import Link from "next/link";
import React from "react";
import style from "./PageItem.module.scss";
import Tag from "./Tag";

// ANTD

// COMPS

// STATICS

// TYPES

// COMPONENT

const PageItem = (props: global_types.Page) => {
  return (
    <Link href={`/post/${props.id}`}>
      <a className={style.container}>
        <div className={style.inner_container}>
          <div className={style.head_wrapper}>
            <img
              src={
                props.cover ||
                "https://climate.onep.go.th/wp-content/uploads/2020/01/default-image.png"
              }
              alt={props.pageTitle}
            />
          </div>
          <div className={style.body_wrapper}>
            <h4>{props.pageTitle || "제목 없음"}</h4>
          </div>
          <div>
            {props.study_topic_list.map((it, idx) => (
              <Tag key={props.id + "tag" + idx}>{it}</Tag>
            ))}
          </div>
        </div>
      </a>
    </Link>
  );
};

export default PageItem;
