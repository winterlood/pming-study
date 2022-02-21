import { app_types } from "@types";
import StudyItem from "components/Common/StudyItem";
import Link from "next/link";
import React, { ReactNode } from "react";
import style from "./ItemGrid.module.scss";
import PostItem from "./PostItem";

// ANTD

// COMPS

// STATICS

// TYPES

interface PropsBase {
  title: string;
  detailPath: string;
  gridItemType: "STUDY" | "POST";
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

type Props = PropsWithStudyItem | PropsWithPostItem;

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
