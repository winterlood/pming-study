import { app_types } from "@types";
import Link from "next/link";
import React from "react";
import style from "./StudyItem.module.scss";
import StudyStatusTag from "./StudyStatusTag";
import Tag from "./Tag";

// ANTD

interface Props extends app_types.ProcessedPageWithStudy {
  tag_kind: "END_DATE" | "STUDY_STATUS" | "APPLY_ABLE";
}

// COMPONENT

const StudyItem = (props: Props) => {
  const {
    study_id,
    study_introduce,
    study_name,
    study_status,
    udemy_lecture_thumbnail_url,
  } = props;
  const link = ["CLOSE", "INPROGRESS"].includes(study_status)
    ? `study/${study_id}/overview`
    : `study/${study_id}/recruit`;

  return (
    <Link href={link} passHref>
      <div className={style.container}>
        <div className={style.head}>
          <img src={udemy_lecture_thumbnail_url} />
        </div>

        <div className={style.body}>
          <div>
            {props.tag_kind === "END_DATE" && (
              <Tag type="default">{props.study_apply_end_date} 지원 마감</Tag>
            )}
            {props.tag_kind === "APPLY_ABLE" &&
              (["INPROGRESS", "CLOSE"].includes(props.study_status) ? (
                <Tag type="default">모집 마감</Tag>
              ) : (
                <Tag type="primary">참여 가능</Tag>
              ))}
            {props.tag_kind === "STUDY_STATUS" && (
              <>
                <StudyStatusTag
                  studyStatus={props.study_status}
                ></StudyStatusTag>
              </>
            )}
          </div>
          <div className={style.study_name}>{study_name}</div>
          <div className={style.study_introduce}>{study_introduce}</div>

          {props.tag_kind === "STUDY_STATUS" && (
            <Tag>{props.study_post_count}개의 포스트가 있습니다</Tag>
          )}
        </div>
      </div>
    </Link>
  );
};

export default StudyItem;
