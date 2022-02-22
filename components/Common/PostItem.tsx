import { app_types } from "@types";
import Link from "next/link";
import React from "react";
import style from "./PostItem.module.scss";
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
          />

          <div className={style.mask}>
            <div className={style.post_info_wrapper}>
              <div className={style.post_title}>{props.post_title}</div>
              <div className={style.post_last_edited_time}>
                {new Date(props.created_time).toLocaleString()} 작성
              </div>
              <div className={style.post_study_name}>
                <Tag>{props.related_study.study_name}</Tag>
              </div>
            </div>
          </div>

          <div className={style.tutor_wrapper}>
            <img src={props.related_study.mentor_profile_image_url} />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PostItem;
