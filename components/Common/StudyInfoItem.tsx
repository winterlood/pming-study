import { app_types } from "@types";
import React from "react";
import MentorSummaryBox from "./MentorSummaryBox";
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
        <MentorSummaryBox
          mentor_name={props.mentor_name}
          mentor_introduce={props.mentor_introduce}
          mentor_profile_image_url={props.mentor_profile_image_url}
        />
      </div>
    </div>
  );
};

export default StudyInfoItem;
