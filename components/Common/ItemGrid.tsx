import { app_types } from "@types";
import { Skeleton } from "antd";
import StudyItem from "components/Common/StudyItem";
import Link from "next/link";
import React from "react";
import style from "./ItemGrid.module.scss";
import PostItem from "./PostItem";

// ANTD

// COMPS

// STATICS

// TYPES

interface PropsBase {
  title: string;
  detailPath: string;
  gridItemType: "STUDY" | "POST" | "SKELETON";
  noHeader?: boolean;
}

interface PropsWithStudyItem extends PropsBase {
  gridItemType: "STUDY";
  gridItemList: app_types.ProcessedPageWithStudy[];
}

interface PropsWithPostItem extends PropsBase {
  gridItemType: "POST";
  gridItemList: app_types.ProcessedPageWithStudyPostWithRelatedStudy[];
}

interface PropsWithSkeleton extends PropsBase {
  gridItemType: "SKELETON";
}

type Props = PropsWithStudyItem | PropsWithPostItem | PropsWithSkeleton;

const renderGridItemList = (
  gridItemType: PropsBase["gridItemType"],
  gridItemList:
    | PropsWithStudyItem["gridItemList"]
    | PropsWithPostItem["gridItemList"]
) => {
  if (gridItemType === "STUDY") {
    return gridItemList.map((it) => <StudyItem key={it.id} {...it} />);
  }

  if (gridItemType === "POST") {
    return gridItemList.map((it) => <PostItem key={it.id} {...it} />);
  }

  if (gridItemType === "SKELETON") {
    return Array(5)
      .fill(0)
      .map((it, idx) => (
        <Skeleton.Input
          key={idx}
          active
          style={{
            width: "100%",
            height: "100%",
            minHeight: "170px",
            borderRadius: "5px",
          }}
        ></Skeleton.Input>
      ));
  }
};

const ItemGrid = (props: Props) => {
  return (
    <div className={style.container}>
      {!props.noHeader && (
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
      )}

      <div className={style.body_wrapper}>
        {renderGridItemList(props.gridItemType, props.gridItemList)}
      </div>
    </div>
  );
};

export default ItemGrid;
