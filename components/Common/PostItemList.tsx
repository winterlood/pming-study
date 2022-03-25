import { app_types } from "@types";
import Link from "next/link";
import React from "react";
import style from "./PostItemList.module.scss";
import EmptyBlock from "./EmptyBlock";
import PostItem from "./PostItem";

interface PropsBase {
  header?: boolean;
  postList: app_types.ProcessedPageWithStudyPostWithRelatedStudy[];
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

const PostItemList = (props: Props) => {
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
    if (props.postList.length === 0) {
      return (
        <div className={style.empty_wrapper}>
          <EmptyBlock type={"POST_ITEM"} />
        </div>
      );
    } else {
      return (
        <div className={style.list_wrapper}>
          {props.postList.map((it) => (
            <PostItem key={it.id} {...it} />
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

export default PostItemList;
