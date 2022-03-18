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
      <Link href={`/post/${props.id}`} passHref>
        <div className={style.head}>
          <img
            className={style.lecture_img}
            src={props.related_study.udemy_lecture_thumbnail_url}
            alt={props.post_title}
          />
          <div className={style.mask}>
            <div className={style.post_info_wrapper}>
              <StudyStatusTag studyStatus={props.related_study.study_status} />
              <div className={style.study_name}>
                {props.related_study.study_name}
              </div>
            </div>
          </div>
        </div>
      </Link>
      <div className={style.body}>
        <Link href={`/post/${props.id}`} passHref>
          <div className={style.post_title}>{props.post_title}</div>
        </Link>
        <div className={style.post_last_edited_time}>
          {new Date(props.created_time).toLocaleString()} 작성
        </div>
        <div className={style.mentor_wrapper}>
          <div className={style.image_wrapper}>
            <img src={props.related_study.mentor_profile_image_url} />
          </div>
          {props.related_study.mentor_name} 멘토
        </div>
      </div>
    </div>
  );
};

export default PostItem;
