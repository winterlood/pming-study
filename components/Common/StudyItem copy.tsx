import { app_types } from "@types";
import Link from "next/link";
import React from "react";
import style from "./StudyItem.module.scss";
import Tag from "./Tag";

// ANTD

// COMPS

// STATICS

// TYPES

interface Props extends app_types.ProcessedPageWithStudy {}

// COMPONENT

const StudyItem = (props: Props) => {
  const { study_id, study_name, study_status, udemy_lecture_thumbnail_url } =
    props;
  const link = ["CLOSE", "INPROGRESS"].includes(study_status)
    ? `study/${study_id}/overview`
    : `study/${study_id}/recruit`;

  return (
    <div className={style.container}>
      <Link href={link} passHref>
        <div className={style.head}>
          <img src={udemy_lecture_thumbnail_url} />
        </div>
      </Link>

      <div className={style.body}>
        <Link href={link} passHref>
          <span className={style.study_name}>{study_name}</span>
        </Link>
        <div>
          <Tag type="default">{props.study_apply_end_date} 지원 마감</Tag>
        </div>
      </div>
    </div>
  );
};

export default StudyItem;
