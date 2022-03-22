import { app_types } from "@types";
import Link from "next/link";
import React from "react";
import style from "./StudyItemList.module.scss";
import StudyItem from "components/Common/StudyItem";
import EmptyBlock from "./EmptyBlock";

interface PropsBase {
  header?: boolean;
  tag_kind: "END_DATE" | "STUDY_STATUS" | "APPLY_ABLE";
  studyList: app_types.ProcessedPageWithStudy[];
}

interface PropsWithHeader extends PropsBase {
  header: true;
  title: string;
  detailPath: string;
}

interface PropsWithNoHeader extends PropsBase {
  header?: false;
}

type Props = PropsWithHeader | PropsWithNoHeader;

const StudyItemList = (props: Props) => {
  const renderHeader = () => {
    if (props.header) {
      return (
        <div className={style.head_wrapper}>
          <div className={style.left_col}>
            <h3>{props.title}</h3>
          </div>
          <div className={style.right_col}>
            <Link href={props.detailPath} passHref>
              <a>더 보기</a>
            </Link>
          </div>
        </div>
      );
    } else {
      return null;
    }
  };

  const renderList = () => {
    if (props.studyList.length === 0) {
      return (
        <div className={style.empty_wrapper}>
          <EmptyBlock type={"STUDY_ITEM"} />
        </div>
      );
    } else {
      return (
        <div className={style.grid_wrapper}>
          {props.studyList.map((it) => (
            <StudyItem key={it.id} {...it} tag_kind={props.tag_kind} />
          ))}
        </div>
      );
    }
  };

  return (
    <div className={style.container}>
      <div>{renderHeader()}</div>
      <div className={style.body}>{renderList()}</div>
    </div>
  );
};

export default StudyItemList;
