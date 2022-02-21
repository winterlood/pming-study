import React, { useEffect, useState } from "react";
import style from "./PostGrid.module.scss";
import { app_types } from "@types";
import PostItem from "components/Common/PostItem";
import ItemGrid from "components/Common/ItemGrid";
import Tag from "components/Common/Tag";
import StudyStatusTag from "components/Common/StudyStatusTag";
import Link from "next/link";

// GLOBAL TYPES

interface StudyPostData extends app_types.ProcessedPageWithStudy {
  postList: app_types.ProcessedPageWithStudyPostWithRelatedStudy[];
}

interface Props {
  pageFilter: "study" | "total";
  studyPostData: StudyPostData[];
}

const PostWithStudyItem = (props: StudyPostData) => {
  return (
    <div className={style.PostWithStudyItem}>
      <div className={style.head}>
        <div className={style.tag_wrapper}>
          <StudyStatusTag studyStatus={props.study_status} />
        </div>
        <div className={style.title_wrapper}>{props.study_name}</div>
        <div className={style.info_wrapper}></div>
      </div>
      <div className={style.body}>
        <ItemGrid
          title={""}
          detailPath={""}
          gridItemType={"POST"}
          noHeader
          gridItemList={props.postList.slice(0, 3)}
        />
      </div>
      <div className={style.footer}>
        <Link href={`/study/${props.id}`} passHref>
          <a>스터디 전체 보기</a>
        </Link>
      </div>
    </div>
  );
};

// TYPES

type State =
  | { pageFilter: "study"; data: StudyPostData[] }
  | {
      pageFilter: "total";
      data: app_types.ProcessedPageWithStudyPostWithRelatedStudy[];
    };
const initialState: State = { pageFilter: "study", data: [] };

const PostGrid = (props: Props) => {
  const [state, setState] = useState<State>(initialState);
  useEffect(() => {
    if (props.pageFilter === "study") {
      setState({ pageFilter: props.pageFilter, data: props.studyPostData });
    } else {
      setState({
        pageFilter: props.pageFilter,
        data: props.studyPostData.map((it) => it.postList).flat(),
      });
    }
  }, [props]);

  return (
    <div className={style.container}>
      {state.pageFilter === "study" ? (
        <div className={style.study_list_wrapper}>
          {state.data.map((it) => (
            <PostWithStudyItem key={it.id} {...it} />
          ))}
        </div>
      ) : (
        <ItemGrid
          title={""}
          detailPath={""}
          gridItemType={"POST"}
          noHeader
          gridItemList={state.data}
        />
      )}
    </div>
  );
};

export default PostGrid;
