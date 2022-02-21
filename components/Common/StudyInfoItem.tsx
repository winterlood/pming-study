import { app_types } from "@types";
import React from "react";
import style from "./StudyInfoItem.module.scss";
import StudyStatusTag from "./StudyStatusTag";

// ANTD

// COMPS

// STATICS

// TYPES

interface Props extends app_types.ProcessedPageWithStudy {}

// COMPONENT

const StudyInfoItem = (props: Props) => {
  return (
    <div className={style.container}>
      <div className={[style.pc_only, style.study_img_wrapper].join(" ")}>
        <img src={props.udemy_lecture_thumbnail_url} />
      </div>
      <div className={style.info_wrapper}>
        <div className={style.study_info_wrapper}>
          <StudyStatusTag studyStatus={props.study_status} />
          <div className={style.study_name}>{props.study_name}</div>
          <div className={style.study_descript}>{props.study_introduce}</div>
        </div>
        <div
          className={[style.mobile_only, style.mobile_study_img_wrapper].join(
            " "
          )}
        >
          <img src={props.udemy_lecture_thumbnail_url} />
        </div>
        <div className={style.mentor_wrapper}>
          <div className={style.mentor_img_wrapper}>
            <img src={props.mentor_profile_image_url} />
          </div>
          <div className={style.mentor_info_wrapper}>
            <div className={style.mentor_name}>{props.mentor_name}</div>

            <div className={style.mentor_descript}>
              {props.mentor_introduce}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyInfoItem;
