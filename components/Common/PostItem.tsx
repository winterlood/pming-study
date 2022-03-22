import { app_types } from "@types";
import Link from "next/link";
import React from "react";
import MentorSummaryBox from "./MentorSummaryBox";
import style from "./PostItem.module.scss";
import StudyStatusTag from "./StudyStatusTag";
import Tag from "./Tag";

// ANTD

// COMPS

// STATICS

// TYPES

interface Props extends app_types.ProcessedPageWithStudyPostWithRelatedStudy {}

// COMPONENT

const PostItem = (props: Props) => {
  return (
    <div className={style.container}>
      <Link href={`/study/${props.related_study.id}/overview`}>
        <div className={style.head}>
          <Tag type="default">{props.related_study.study_name}</Tag>
        </div>
      </Link>
      <Link href={`/post/${props.id}`} passHref>
        <div className={style.body}>
          <div className={style.post_title}>{props.post_title}</div>
          <div className={style.last_edited_time}>
            {new Date(props.created_time).toLocaleString()} 작성
          </div>
          <div className={style.preview}>{props.preview}</div>
        </div>
      </Link>
    </div>
  );
};

export default PostItem;
